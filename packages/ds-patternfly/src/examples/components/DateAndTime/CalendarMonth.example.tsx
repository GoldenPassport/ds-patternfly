/**
 * CalendarMonth — a standalone month-view calendar rendered inline or in a modal.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import {
  Button,
  ButtonVariant,
  CalendarMonth,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalVariant,
} from "../../_lib.js";
import { AngleLeftIcon, AngleRightIcon } from "@patternfly/react-icons";

// ---------- Date helpers (DD/MM/YYYY default) ----------

const pad = (n: number) => String(n).padStart(2, "0");

// DD/MM/YYYY for the trigger label — matches the lib's default
// formatting convention from DatePicker.
const fmtDDMMYYYY = (d: Date) =>
  `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;

/**
 * CalendarPanel — the lib calendar recipe. Replaces PF6 CalendarMonth's
 * stock header (Month MenuToggle + Year input + month nav buttons) with
 * a single "label" Button + adaptive arrows. Three views the header
 * toggles between (matches the iOS/Android native picker pattern):
 *
 *   - **days**   — PF6 CalendarMonth (with its own header hidden via
 *                  CSS); arrows step *month*; label shows "May 2026".
 *                  Click label → months view.
 *   - **months** — 3×4 grid of month tiles; arrows step *year*; label
 *                  shows "2026". Picking a tile sets the month + flips
 *                  back to days. Click label → years view.
 *   - **years**  — 3×4 grid of years (decade + 2 outliers); arrows
 *                  step the *decade* (±10); label shows "2020 – 2029".
 *                  Picking a year sets it + flips back to months.
 *                  Click label → back to months.
 */
export function CalendarPanel({
  date,
  validators,
  rangeStart,
  monthFormat,
  locale,
  onChange,
}: {
  date?: Date;
  validators?: Array<(d: Date) => boolean>;
  rangeStart?: Date;
  monthFormat?: (d: Date) => string;
  locale?: string;
  onChange: (d: Date) => void;
}) {
  const [displayedMonth, setDisplayedMonth] = useState<Date>(() => {
    const seed = date ?? new Date();
    return new Date(seed.getFullYear(), seed.getMonth(), 1);
  });
  const [view, setView] = useState<"days" | "months" | "years">("days");

  useEffect(() => {
    if (date)
      setDisplayedMonth(new Date(date.getFullYear(), date.getMonth(), 1));
  }, [date]);

  const selectionInDisplayedMonth =
    date &&
    date.getMonth() === displayedMonth.getMonth() &&
    date.getFullYear() === displayedMonth.getFullYear()
      ? date
      : null;
  const calendarDate = selectionInDisplayedMonth ?? displayedMonth;
  const showSelection = selectionInDisplayedMonth !== null;
  const internalDate = displayedMonth;

  const longMonth = (d: Date) =>
    monthFormat?.(d) ??
    d.toLocaleString(locale ?? undefined, { month: "long" });
  const shortMonth = (d: Date) =>
    monthFormat?.(d) ??
    d.toLocaleString(locale ?? undefined, { month: "short" });

  const decadeStart = Math.floor(internalDate.getFullYear() / 10) * 10;
  const headerLabel =
    view === "days"
      ? `${longMonth(internalDate)} ${internalDate.getFullYear()}`
      : view === "months"
        ? String(internalDate.getFullYear())
        : `${decadeStart} – ${decadeStart + 9}`;

  const step = (delta: number) => {
    setDisplayedMonth((prev) => {
      const next = new Date(prev.getFullYear(), prev.getMonth(), 1);
      if (view === "days") next.setMonth(next.getMonth() + delta);
      else if (view === "months") next.setFullYear(next.getFullYear() + delta);
      else next.setFullYear(next.getFullYear() + delta * 10);
      return next;
    });
  };

  const anyDayValid = (rangeStartDate: Date, rangeEndDate: Date): boolean => {
    if (!validators?.length) return true;
    const cursor = new Date(rangeStartDate);
    while (cursor.getTime() <= rangeEndDate.getTime()) {
      if (validators.every((v) => v(cursor))) return true;
      cursor.setDate(cursor.getDate() + 1);
    }
    return false;
  };
  const monthRange = (year: number, month: number): [Date, Date] => [
    new Date(year, month, 1),
    new Date(year, month + 1, 0),
  ];
  const yearRange = (year: number): [Date, Date] => [
    new Date(year, 0, 1),
    new Date(year, 11, 31),
  ];
  const canStep = (delta: number): boolean => {
    if (!validators?.length) return true;
    if (view === "days") {
      const m = displayedMonth.getMonth() + delta;
      const y = displayedMonth.getFullYear();
      const next = new Date(y, m, 1);
      return anyDayValid(...monthRange(next.getFullYear(), next.getMonth()));
    }
    if (view === "months") {
      const y = displayedMonth.getFullYear() + delta;
      return anyDayValid(...yearRange(y));
    }
    const start = decadeStart + delta * 10;
    return anyDayValid(new Date(start, 0, 1), new Date(start + 9, 11, 31));
  };
  const canBack = canStep(-1);
  const canForward = canStep(+1);

  const onLabelClick = () => {
    setView((v) =>
      v === "days" ? "months" : v === "months" ? "years" : "months",
    );
  };

  const monthsForYear = Array.from({ length: 12 }, (_, m) => {
    const d = new Date(internalDate.getFullYear(), m, 1);
    return { idx: m, label: shortMonth(d) };
  });
  const yearsInGrid = Array.from({ length: 12 }, (_, i) => decadeStart - 1 + i);

  // Header nav arrows + center label match the DS field height
  // (2.25rem = 36px from --gp-control-pad-y) — same scale as every
  // other icon-only button in the lib.
  const navBtnStyle = {
    borderRadius: "var(--gp-radius-pill, 999px)",
    aspectRatio: "1",
    blockSize: "2.25rem",
    minBlockSize: "2.25rem",
    minInlineSize: "2.25rem",
    padding: 0,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  } as const;

  const gridTileStyle = {
    borderRadius: "var(--gp-radius-pill, 999px)",
    aspectRatio: "1",
    blockSize: "auto",
    minBlockSize: "3rem",
    paddingInline: 0,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    fontSize: "var(--pf-t--global--font--size--sm)",
  } as const;

  return (
    <div
      className={`gp-libcal${showSelection ? "" : " gp-libcal--no-selection"}`}
      style={{
        // Fixed 22rem on desktop popover / modal contexts. PF6's
        // `Popover hasAutoWidth` sizes its content box to whatever
        // the calendar reports; a fluid `100%` would resolve to 0
        // and collapse the grid.
        inlineSize: "22rem",
        maxInlineSize: "22rem",
        boxSizing: "border-box",
      }}
    >
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 8,
          paddingBlockEnd: "var(--pf-t--global--spacer--sm, 0.5rem)",
          marginBlockEnd: "var(--pf-t--global--spacer--md, 1rem)",
          // Header row height matches the DS field height (2.25rem)
          // so the nav controls line up with the rest of the lib.
          minBlockSize: "2.25rem",
        }}
      >
        <Button
          variant={ButtonVariant.plain}
          aria-label={
            view === "days"
              ? "Previous month"
              : view === "months"
                ? "Previous year"
                : "Previous decade"
          }
          icon={<AngleLeftIcon />}
          isDisabled={!canBack}
          onClick={() => step(-1)}
          style={navBtnStyle}
        />
        <Button
          variant={ButtonVariant.tertiary}
          aria-label={
            view === "days"
              ? `Switch to month picker (currently ${headerLabel})`
              : view === "months"
                ? `Switch to year picker (currently ${headerLabel})`
                : `Back to month picker (currently ${headerLabel})`
          }
          onClick={onLabelClick}
          style={{
            flex: 1,
            blockSize: "2.25rem",
            minBlockSize: "2.25rem",
            whiteSpace: "nowrap",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius:
              "var(--gp-radius-control, var(--pf-v6-c-button--BorderRadius))",
          }}
        >
          {headerLabel}
        </Button>
        <Button
          variant={ButtonVariant.plain}
          aria-label={
            view === "days"
              ? "Next month"
              : view === "months"
                ? "Next year"
                : "Next decade"
          }
          icon={<AngleRightIcon />}
          isDisabled={!canForward}
          onClick={() => step(+1)}
          style={navBtnStyle}
        />
      </header>

      {view === "days" ? (
        <CalendarMonth
          date={calendarDate}
          {...(validators ? { validators } : {})}
          {...(rangeStart ? { rangeStart } : {})}
          {...(monthFormat ? { monthFormat } : {})}
          {...(locale ? { locale } : {})}
          onChange={(_e, d) => {
            setDisplayedMonth(new Date(d.getFullYear(), d.getMonth(), 1));
            onChange(d);
          }}
          onMonthChange={(_e, newDate) => {
            if (newDate)
              setDisplayedMonth(
                new Date(newDate.getFullYear(), newDate.getMonth(), 1),
              );
          }}
        />
      ) : view === "months" ? (
        <div
          role="grid"
          aria-label="Pick a month"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 8,
            padding: 8,
            alignContent: "flex-start",
            minBlockSize: "20rem",
          }}
        >
          {monthsForYear.map(({ idx, label }) => {
            const enabled = anyDayValid(
              ...monthRange(internalDate.getFullYear(), idx),
            );
            return (
              <Button
                key={idx}
                variant={
                  idx === internalDate.getMonth()
                    ? ButtonVariant.primary
                    : ButtonVariant.tertiary
                }
                isDisabled={!enabled}
                onClick={() => {
                  setDisplayedMonth(
                    new Date(internalDate.getFullYear(), idx, 1),
                  );
                  setView("days");
                }}
                style={gridTileStyle}
              >
                {label}
              </Button>
            );
          })}
        </div>
      ) : (
        <div
          role="grid"
          aria-label="Pick a year"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 8,
            padding: 8,
            alignContent: "flex-start",
            minBlockSize: "20rem",
          }}
        >
          {yearsInGrid.map((y) => {
            const inDecade = y >= decadeStart && y <= decadeStart + 9;
            const enabled = anyDayValid(...yearRange(y));
            return (
              <Button
                key={y}
                variant={
                  y === internalDate.getFullYear()
                    ? ButtonVariant.primary
                    : ButtonVariant.tertiary
                }
                isDisabled={!enabled}
                onClick={() => {
                  setDisplayedMonth(new Date(y, internalDate.getMonth(), 1));
                  setView("months");
                }}
                style={{
                  ...gridTileStyle,
                  opacity: inDecade ? 1 : 0.45,
                }}
              >
                {y}
              </Button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// #region InlineCalendar
export function InlineCalendar() {
  const [date, setDate] = useState<Date>(new Date());

  return <CalendarPanel date={date} onChange={setDate} />;
}
// #endregion

// #region ModalCalendar
export function ModalCalendar() {
  // The modal commits its `draft` selection only on Apply; Cancel
  // discards.
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalDate, setModalDate] = useState<Date | undefined>();
  const [draft, setDraft] = useState<Date | undefined>();
  const openModal = () => {
    setDraft(modalDate ?? new Date());
    setModalOpen(true);
  };

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Button variant="secondary" onClick={openModal}>
          {modalDate ? `Date: ${fmtDDMMYYYY(modalDate)}` : "Choose a date"}
        </Button>
        {modalDate ? (
          <Button variant="link" onClick={() => setModalDate(undefined)}>
            Clear
          </Button>
        ) : null}
      </div>

      <Modal
        variant={ModalVariant.small}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="cal-modal-title"
        aria-describedby="cal-modal-body"
        // Tighten the modal to fit the calendar snugly. The
        // small variant maxes out at ~35rem (560px) which
        // leaves a wide gutter on either side of the 22rem
        // CalendarPanel on bigger screens. Cap via PF6's
        // own Width custom property so the modal still
        // shrinks correctly on narrow viewports. 26rem ≈
        // panel (22rem) + body inline padding.
        style={
          {
            "--pf-v6-c-modal-box--Width": "26rem",
          } as CSSProperties
        }
      >
        <ModalHeader title="Pick a date" labelId="cal-modal-title" />
        <ModalBody id="cal-modal-body">
          {/* Lock the body to the calendar's worst-case
              height across all three views (days / months /
              years) so flicking between them doesn't reflow
              the modal. The months + years grids are the
              slightly-taller pair (3rem touch-target tiles
              on a 4-row layout) vs the days grid (6 rows ×
              2.25rem day cells from the --gp-control-pad-y
              dial). 24.75rem covers the months/years worst
              case with a touch of buffer; the calendar
              sits centred via the flex justify-content.

              Top padding adds breathing room between the
              modal header (Pick a date + X close) and the
              calendar's internal nav arrows below — without
              it the two button rows sit close enough to
              read as one cluttered strip. */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              minBlockSize: "24.75rem",
              paddingBlockStart: "var(--pf-t--global--spacer--md, 1rem)",
            }}
          >
            <CalendarPanel
              {...(draft ? { date: draft } : {})}
              onChange={(d) => setDraft(d)}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="primary"
            isDisabled={!draft}
            onClick={() => {
              if (draft) setModalDate(draft);
              setModalOpen(false);
            }}
          >
            Apply
          </Button>
          <Button variant="link" onClick={() => setModalOpen(false)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
// #endregion

export default function CalendarMonthExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <InlineCalendar />
      <ModalCalendar />
    </div>
  );
}
