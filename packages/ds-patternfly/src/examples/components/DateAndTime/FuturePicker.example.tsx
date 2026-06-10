/**
 * FuturePicker — two-tab control for scheduling future work.
 *
 * "Wait" collects a relative offset (days / hours / minutes / seconds)
 * and emits an ISO-8601 duration like PT2H30M or P1DT4H. "Specific
 * date" uses an inline calendar validated to disable today + any past
 * day. This file carries the lib calendar primitives (CalendarPanel,
 * BottomSheet, useMobileViewport) so the example is self-contained.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import React, { useEffect, useId, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  Button,
  ButtonVariant,
  CalendarMonth,
  InputGroup,
  InputGroupItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalVariant,
  Popover,
  Tab,
  TabContent,
  TabContentBody,
  TabTitleText,
  Tabs,
  TextInput,
} from "../../_lib.js";
import {
  AngleLeftIcon,
  AngleRightIcon,
  CalendarAltIcon,
  MinusIcon,
  PlusIcon,
  TimesIcon,
} from "@patternfly/react-icons";

// Element ids derive from useId() so any number of instances can coexist
// on one page without duplicate-id clashes.

// ---------- ISO-8601 duration helper ----------
// Encodes a {days, hours, minutes} record as a PT/P duration string
// (https://en.wikipedia.org/wiki/ISO_8601#Durations). Days roll up
// into the date portion `P<d>D`; hours / minutes land in the time
// portion `T<h>H<m>M`. Returns `PT0M` when everything is zero so the
// output is always a valid ISO duration.
//
// Examples:
//   { days: 0, hours: 2, minutes: 30, seconds: 0  } → "PT2H30M"
//   { days: 0, hours: 0, minutes: 0,  seconds: 15 } → "PT15S"
//   { days: 1, hours: 0, minutes: 0,  seconds: 0  } → "P1D"
//   { days: 1, hours: 4, minutes: 0,  seconds: 0  } → "P1DT4H"
function formatIsoDuration({
  days,
  hours,
  minutes,
  seconds,
}: {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}): string {
  if (!days && !hours && !minutes && !seconds) return "PT0S";
  const datePart = days > 0 ? `${days}D` : "";
  const timeParts =
    (hours > 0 ? `${hours}H` : "") +
    (minutes > 0 ? `${minutes}M` : "") +
    (seconds > 0 ? `${seconds}S` : "");
  return `P${datePart}${timeParts ? `T${timeParts}` : ""}`;
}

// ---------- ISO-8601 date helper (CalendarMonth returns a Date) ----------
const pad2 = (n: number) => String(n).padStart(2, "0");
const fmtISODate = (d: Date) =>
  `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;

/**
 * Disable any day strictly before tomorrow (so the inline calendar
 * matches the FuturePicker intent — today + earlier are off-limits).
 * PF6's CalendarMonth `validators` receive a candidate Date and return
 * false to disable.
 */
function isAtLeastTomorrow(date: Date): boolean {
  const tomorrow = new Date();
  tomorrow.setHours(0, 0, 0, 0);
  tomorrow.setDate(tomorrow.getDate() + 1);
  return date.getTime() >= tomorrow.getTime();
}

interface FuturePickerValue {
  /** "wait" → relative offset from now; "date" → absolute future date. */
  mode: "wait" | "date";
  /**
   * ISO-8601 duration (e.g. `PT2H30M`, `P1DT4H`) — present only when
   * mode is "wait".
   */
  duration?: string;
  /**
   * Absolute date in `YYYY-MM-DD` — present only when mode is "date".
   */
  date?: string;
}

interface FuturePickerProps {
  /** Receives the active value whenever the user edits. */
  onChange?: (value: FuturePickerValue) => void;
}

/**
 * Tracks a `(max-width: …)` match. Re-evaluates on resize so the lib
 * date picker flips between Popover (desktop) and bottom-sheet
 * (mobile) when the viewport crosses the breakpoint mid-session.
 */
function useMobileViewport(maxWidth = "47.98rem"): boolean {
  const [match, setMatch] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${maxWidth})`);
    setMatch(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setMatch(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [maxWidth]);
  return match;
}

/**
 * Bottom-anchored sheet for mobile date / option pickers. Renders via
 * portal into `<body>` using the native `<dialog>` element so we get
 * focus trap, Escape-to-close, and inert background for free without
 * pulling in a focus-trap library.
 *
 * Closes on: Escape key (native), backdrop click, programmatic
 * `onClose` from the consumer (e.g. after selecting a date).
 */
function BottomSheet({
  open,
  onClose,
  ariaLabel,
  children,
}: {
  open: boolean;
  onClose: () => void;
  ariaLabel: string;
  children: React.ReactNode;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    // Open / close the native dialog — the slide-up entrance + slide-
    // down exit are pure CSS (translate transition + `@starting-style`
    // for the entry-from state + `transition-behavior: allow-discrete`
    // on overlay/display so the discrete-property changes during
    // show/close animate).
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);

  // Lock the host page from scrolling while the sheet is open AND
  // preserve the user's scroll position. `overflow: hidden` alone
  // doesn't always preserve scroll on mobile — Safari in particular
  // can reset to 0 when the body becomes non-scrollable, leaving the
  // user at the top of the page when they close the sheet. The
  // position-fixed-with-negative-top trick pins the body in place at
  // its current visual position and restores scrollY on close, so
  // the user lands back at the trigger button they tapped.
  useEffect(() => {
    if (!open) return;
    const body = document.body;
    const docEl = document.documentElement;
    const scrollY = window.scrollY || docEl.scrollTop;
    const prev = {
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyInlineSize: body.style.width,
      bodyOverflow: body.style.overflow,
      htmlOverflow: docEl.style.overflow,
    };
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    body.style.overflow = "hidden";
    docEl.style.overflow = "hidden";
    return () => {
      body.style.position = prev.bodyPosition;
      body.style.top = prev.bodyTop;
      body.style.width = prev.bodyInlineSize;
      body.style.overflow = prev.bodyOverflow;
      docEl.style.overflow = prev.htmlOverflow;
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  // Backdrop click — native <dialog> backdrops fire as a click on the
  // dialog itself when outside the content. Compare bounding rect.
  const onClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;
    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
      onClose();
    }
  };

  if (!open && typeof window === "undefined") return null;

  return createPortal(
    <dialog
      ref={dialogRef}
      className="gp-bottom-sheet"
      aria-label={ariaLabel}
      onClose={onClose}
      onCancel={onClose}
      onClick={onClick}
    >
      <Button
        variant={ButtonVariant.plain}
        aria-label="Close"
        icon={<TimesIcon />}
        onClick={onClose}
        className="gp-bottom-sheet__close"
      />
      <div className="gp-bottom-sheet__body">{children}</div>
    </dialog>,
    document.body,
  );
}

/**
 * Custom calendar panel that replaces PF6 CalendarMonth's stock header
 * (Month MenuToggle + Year input + month nav buttons) with a single
 * "label" Button + adaptive arrows. Three views the header toggles
 * between (matches the iOS/Android native picker pattern):
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
 *
 * `internalDate` drives PF6 CalendarMonth's `date` prop so we control
 * which month it renders without touching its hidden header.
 */
function CalendarPanel({
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
  // Track the displayed month (year + month, day always 1) separately
  // from the *selected* value. Decoupling these means the user can
  // navigate to August / September / etc. without the calendar
  // pretending each month has day 22 selected just because today is
  // the 22nd. Today's "pf-m-current" indicator (computed internally
  // by PF6 against `new Date()`) still highlights today only when
  // the current month is displayed.
  const [displayedMonth, setDisplayedMonth] = useState<Date>(() => {
    const seed = date ?? new Date();
    return new Date(seed.getFullYear(), seed.getMonth(), 1);
  });
  const [view, setView] = useState<"days" | "months" | "years">("days");

  // Re-sync displayed month when the parent updates its `date` prop
  // (e.g. user types a date manually into the TextInput).
  useEffect(() => {
    if (date)
      setDisplayedMonth(new Date(date.getFullYear(), date.getMonth(), 1));
  }, [date]);

  // What gets passed to PF6 CalendarMonth's `date` prop. If the user
  // has a real selection AND it falls in the displayed month, pass
  // that selection (PF6 marks it pf-m-selected). Otherwise pass the
  // displayed month's day 1 — but suppress the resulting day-1
  // selection styling via the `gp-libcal--no-selection` class below.
  const selectionInDisplayedMonth =
    date &&
    date.getMonth() === displayedMonth.getMonth() &&
    date.getFullYear() === displayedMonth.getFullYear()
      ? date
      : null;
  const calendarDate = selectionInDisplayedMonth ?? displayedMonth;
  const showSelection = selectionInDisplayedMonth !== null;
  // Anchor used by header labels + the months/years grids. Mirrors the
  // displayed month except `decadeStart` math etc.
  const internalDate = displayedMonth;

  const longMonth = (d: Date) =>
    monthFormat?.(d) ??
    d.toLocaleString(locale ?? undefined, { month: "long" });
  const shortMonth = (d: Date) =>
    monthFormat?.(d) ??
    d.toLocaleString(locale ?? undefined, { month: "short" });

  // Header label adapts per view.
  const decadeStart = Math.floor(internalDate.getFullYear() / 10) * 10;
  const headerLabel =
    view === "days"
      ? `${longMonth(internalDate)} ${internalDate.getFullYear()}`
      : view === "months"
        ? String(internalDate.getFullYear())
        : `${decadeStart} – ${decadeStart + 9}`;

  // Arrows step: month / year / decade per view. Always normalises to
  // day = 1 so the navigation anchor never carries a "selected" day
  // into months where the user hasn't actually picked anything.
  const step = (delta: number) => {
    setDisplayedMonth((prev) => {
      const next = new Date(prev.getFullYear(), prev.getMonth(), 1);
      if (view === "days") next.setMonth(next.getMonth() + delta);
      else if (view === "months") next.setFullYear(next.getFullYear() + delta);
      else next.setFullYear(next.getFullYear() + delta * 10);
      return next;
    });
  };

  // Validator helpers — disable arrows + tiles when the target span
  // contains no valid date. Cheap because we short-circuit on the
  // first valid day. Always returns true when no validators are
  // configured.
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
  // Is there ANY valid day in the result of stepping by `delta` from
  // the currently displayed month/year/decade? Used to disable arrows.
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
    // years view — step a decade
    const start = decadeStart + delta * 10;
    return anyDayValid(new Date(start, 0, 1), new Date(start + 9, 11, 31));
  };
  const canBack = canStep(-1);
  const canForward = canStep(+1);

  // Label toggle: days → months → years → months → days.
  const onLabelClick = () => {
    setView((v) =>
      v === "days" ? "months" : v === "months" ? "years" : "months",
    );
  };

  const monthsForYear = Array.from({ length: 12 }, (_, m) => {
    const d = new Date(internalDate.getFullYear(), m, 1);
    return { idx: m, label: shortMonth(d) };
  });

  // 12 years: previous-decade tail, current decade (10), next-decade head.
  // The outliers ({Start-1, Start+10}) sit dimmed but stay clickable so
  // users can drift across decade boundaries without using the arrows.
  const yearsInGrid = Array.from({ length: 12 }, (_, i) => decadeStart - 1 + i);

  // Header nav buttons match the DS field height (2.25rem = 36px from
  // --gp-control-pad-y), same as every other icon-only button in the
  // lib (NumberInput steppers, DatePicker calendar trigger, etc.).
  // Touch friendliness flows from the dial — bumping --gp-control-pad-y
  // enlarges every control system-wide.
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

  // Shared tile style for months + years grids — pill / circular
  // (pill radius on a square tile = circle), 44×44+ touch target
  // (WCAG 2.5.5), centred label, day-cell-matched font size so
  // type weight reads identical across views.
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
      // Default sizing: shrink-wrap to the calendar's natural width
      // (so the popover via `hasAutoWidth` lands at ~22rem on desktop),
      // capped at 22rem so a wide host can't sprawl it. The
      // `.gp-bottom-sheet__body .gp-libcal` override switches this
      // to `inline-size: 100%` for the mobile sheet so the calendar
      // fills the sheet width edge-to-edge.
      style={{
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
            // Match the nav arrows' 2.25rem so the header row sits at
            // one consistent height (same as every other lib control).
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
            // Selecting a day: pin the displayed month to it and
            // bubble the date up. The parent's `date` prop coming
            // back makes `showSelection` go true → pf-m-selected
            // styling unmasks for the clicked day.
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
                  setDisplayedMonth(new Date(internalDate.getFullYear(), idx, 1));
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

/**
 * Render the picker body — used as the Popover content. Pulled out
 * from `FuturePicker` so the trigger (InputGroup + calendar button)
 * can compose this alongside its own popover open state.
 *
 *   - **Wait** — three NumberInputs (days / hours / minutes) compose
 *     into an ISO-8601 duration string `P[<d>D][T<h>H<m>M]`.
 *   - **Specific date** — inline PF6 CalendarMonth with a validator
 *     that disables today + any past day. Returns an ISO `YYYY-MM-DD`.
 *
 * Each tab carries its own state so flipping back and forth doesn't
 * lose work. The `onChange` callback fires with whichever tab is
 * currently active and that tab's current value.
 */
function FuturePickerPanel({ onChange }: FuturePickerProps) {
  // Tab-panel ids derive from useId() so multiple panels can coexist.
  const panelId = useId();
  const [tab, setTab] = useState<"wait" | "date">("wait");
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(2);
  const [minutes, setMinutes] = useState(30);
  const [seconds, setSeconds] = useState(0);
  const [date, setDate] = useState<Date | undefined>();

  const duration = useMemo(
    () => formatIsoDuration({ days, hours, minutes, seconds }),
    [days, hours, minutes, seconds],
  );

  // Push value upstream on every change in the active tab.
  const emit = (next: FuturePickerValue) => onChange?.(next);

  // Fills the host (popover / bottom sheet) — the inner Tabs strip
  // spans 100% so the user's tap targets are full-width on every
  // screen. Inner content (CalendarPanel at 22rem, the centred
  // StepperInput column at 14rem) keeps its own width inside the
  // wider tab body.
  return (
    <div style={{ display: "grid", gap: 12, inlineSize: "100%" }}>
      <Tabs
        activeKey={tab}
        onSelect={(_e, key) => {
          const t = key as "wait" | "date";
          setTab(t);
          emit(
            t === "wait"
              ? { mode: "wait", duration }
              : date
                ? { mode: "date", date: fmtISODate(date) }
                : { mode: "date" },
          );
        }}
        aria-label="Future picker mode"
      >
        <Tab eventKey="wait" title={<TabTitleText>Wait</TabTitleText>} />
        <Tab eventKey="date" title={<TabTitleText>Specific date</TabTitleText>} />
      </Tabs>

      {/* Tab panels — we render both, only one is shown via Tabs/TabContent. */}
      <TabContent
        id={`${panelId}-wait`}
        eventKey="wait"
        activeKey={tab}
        hidden={tab !== "wait"}
      >
        <TabContentBody hasPadding>
          {/* Centre the Days / Hours / Minutes column inside the tab so
              the inputs read as a focused stack rather than start-
              aligned content. */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 12,
            }}
          >
          <p
            style={{
              margin: 0,
              // Span the full tab width (the centring flex parent
              // doesn't constrain children unless we cap them); the
              // paragraph reads at the same column the Tabs strip
              // above occupies.
              inlineSize: "100%",
              fontSize: 13,
              lineHeight: 1.5,
              color: "var(--gp-color-text-subtle)",
              textAlign: "center",
            }}
          >
            Fire this task after a relative wait. If working hours or
            holidays are configured, the wait skips closed periods.
          </p>
          {/* Four labelled stepper rows — explicit InputGroup
              composition (Button tertiary + TextInput + Button
              tertiary). The tertiary variant + the lib's global CSS
              gives a transparent-bg, brand-stroke outline that stays
              consistent across resting, hover, focus, and disabled
              states without PF6's NumberInput hiding borders on
              disabled (which the previous NumberInput-based variant
              suffered from). */}
          {(() => {
            const clamp = (v: number, lo: number, hi: number) =>
              Math.max(lo, Math.min(hi, v));
            const emitWait = (next: {
              d?: number;
              h?: number;
              m?: number;
              s?: number;
            }) =>
              emit({
                mode: "wait",
                duration: formatIsoDuration({
                  days: next.d ?? days,
                  hours: next.h ?? hours,
                  minutes: next.m ?? minutes,
                  seconds: next.s ?? seconds,
                }),
              });
            const triggerStyle = {
              borderRadius:
                "var(--gp-radius-control, var(--pf-v6-c-button--BorderRadius))",
              aspectRatio: "1",
              paddingInline: 0,
            } as const;
            const fields: Array<{
              key: string;
              label: string;
              ariaLabel: string;
              value: number;
              min: number;
              max: number;
              set: (n: number) => void;
              emitKey: "d" | "h" | "m" | "s";
            }> = [
              { key: "days", label: "Days", ariaLabel: "Days to wait", value: days, min: 0, max: 365, set: setDays, emitKey: "d" },
              { key: "hours", label: "Hours", ariaLabel: "Hours to wait", value: hours, min: 0, max: 23, set: setHours, emitKey: "h" },
              { key: "minutes", label: "Minutes", ariaLabel: "Minutes to wait", value: minutes, min: 0, max: 59, set: setMinutes, emitKey: "m" },
              { key: "seconds", label: "Seconds", ariaLabel: "Seconds to wait", value: seconds, min: 0, max: 59, set: setSeconds, emitKey: "s" },
            ];
            return (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(0, 1fr)",
                  gap: 12,
                  inlineSize: "14rem",
                }}
              >
                {fields.map((f) => (
                  // Plain span (not <label>) — a <label> wrapping the
                  // InputGroup would re-fire click events on its
                  // labelled input, which here would chain into the
                  // ± buttons (click + also fires -).
                  <div
                    key={f.key}
                    style={{ display: "grid", gap: 4, fontSize: 13 }}
                  >
                    <span>{f.label}</span>
                    <InputGroup>
                      <InputGroupItem>
                        <Button
                          variant={ButtonVariant.tertiary}
                          aria-label={`Decrease ${f.label.toLowerCase()}`}
                          icon={<MinusIcon />}
                          isDisabled={f.value <= f.min}
                          onClick={() => {
                            const next = clamp(f.value - 1, f.min, f.max);
                            f.set(next);
                            emitWait({ [f.emitKey]: next });
                          }}
                          style={triggerStyle}
                        />
                      </InputGroupItem>
                      <InputGroupItem isFill>
                        {/* type="text" + inputMode="numeric" — hides
                            the browser's native ± spinner so only the
                            lib ± Buttons drive the value. */}
                        <TextInput
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          value={f.value}
                          onChange={(_e, v) => {
                            if (v === "") return;
                            const n = Number(v);
                            if (Number.isNaN(n)) return;
                            const next = clamp(n, f.min, f.max);
                            f.set(next);
                            emitWait({ [f.emitKey]: next });
                          }}
                          aria-label={f.ariaLabel}
                          style={{ textAlign: "center" }}
                        />
                      </InputGroupItem>
                      <InputGroupItem>
                        <Button
                          variant={ButtonVariant.tertiary}
                          aria-label={`Increase ${f.label.toLowerCase()}`}
                          icon={<PlusIcon />}
                          isDisabled={f.value >= f.max}
                          onClick={() => {
                            const next = clamp(f.value + 1, f.min, f.max);
                            f.set(next);
                            emitWait({ [f.emitKey]: next });
                          }}
                          style={triggerStyle}
                        />
                      </InputGroupItem>
                    </InputGroup>
                  </div>
                ))}
              </div>
            );
          })()}
          </div>
        </TabContentBody>
      </TabContent>

      <TabContent
        id={`${panelId}-date`}
        eventKey="date"
        activeKey={tab}
        hidden={tab !== "date"}
      >
        {/* Drop the TabContentBody's `hasPadding` here — PF6's
            built-in 16px inline padding expands the tab body to
            352 + 32 = 384 px to fit the calendar, which overflows
            the ModalBody's content area on the right and reads as
            an off-centre calendar. The CalendarPanel already
            includes its own internal gutters (header + DoW row),
            so it doesn't need extra padding from the tab body.
            Centre via flex on a sibling wrapper. */}
        <TabContentBody>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingBlockStart: "var(--pf-t--global--spacer--sm, 0.5rem)",
            }}
          >
            <CalendarPanel
              {...(date ? { date } : {})}
              validators={[isAtLeastTomorrow]}
              onChange={(d) => {
                setDate(d);
                emit({ mode: "date", date: fmtISODate(d) });
              }}
            />
          </div>
        </TabContentBody>
      </TabContent>
    </div>
  );
}

/** Compact summary for the trigger input — "Wait PT2H30M" / "2026-06-01". */
function describe(value: FuturePickerValue | null): string {
  if (!value) return "";
  if (value.mode === "wait") return `Wait ${value.duration ?? "PT0M"}`;
  return value.date ?? "";
}

/**
 * Public component — TextInput + calendar-button trigger that opens a
 * Popover containing the `FuturePickerPanel` tabs. Matches the PF6
 * DatePicker UX (https://www.patternfly.org/components/date-and-time/date-picker):
 * the user reads / edits via a familiar form-control input and the
 * "scheduler" widget lives behind a small calendar icon.
 *
 * The Popover handles outside-click and Escape close natively.
 */
function FuturePicker({ onChange }: FuturePickerProps) {
  const inputId = useId();
  const [value, setValue] = useState<FuturePickerValue | null>(null);
  const isMobile = useMobileViewport();
  const [sheetOpen, setSheetOpen] = useState(false);
  const handlePanelChange = (next: FuturePickerValue) => {
    setValue(next);
    onChange?.(next);
  };

  // Desktop panel — locked-size box so the popover doesn't resize
  // when the user flips between Wait and Specific date tabs. Fixed
  // block-size (not just min) so the shorter tab can't render at a
  // different height than the taller one.
  const desktopPanel = (
    <div
      style={{
        inlineSize: "24rem",
        maxInlineSize: "24rem",
        blockSize: "28rem",
        minBlockSize: "28rem",
      }}
    >
      <FuturePickerPanel onChange={handlePanelChange} />
    </div>
  );

  // Mobile panel — fills the bottom-sheet body and pulls the Tabs
  // strip UP into the same row as the close button so the user sees
  // their tab choices immediately at sheet open (without the 4rem of
  // breathing room the calendar sheet body reserves for its day
  // grid). Negative margin counter-acts the body's padding-block-start
  // so the Tabs sit right under the sheet's top edge, beside the
  // pill close button. Inline-end margin keeps the Tabs clear of the
  // close button's 44px hit area.
  const mobilePanel = (
    <div
      style={{
        inlineSize: "100%",
        marginBlockStart: "calc(var(--gp-pad-popover, 1rem) * -1.5)",
        marginInlineEnd: "3.5rem",
        // Fixed block-size (NOT just `min-block-size`) so both tabs
        // share the exact same dialog height — `min` would only floor
        // and let the taller tab inflate the dialog while the other
        // tab leaves it shorter. 38rem comfortably exceeds the natural
        // heights of both Wait (steppers + paragraph) and Specific
        // date (CalendarPanel) at mobile container-query cell sizes.
        blockSize: "30rem",
        minBlockSize: "30rem",
      }}
    >
      <FuturePickerPanel onChange={handlePanelChange} />
    </div>
  );

  const triggerStyle = {
    borderRadius:
      "var(--gp-radius-control, var(--pf-v6-c-button--BorderRadius))",
    aspectRatio: "1",
    paddingInline: 0,
  } as const;

  return (
    <>
      <InputGroup style={{ maxWidth: 320 }}>
        <InputGroupItem isFill>
          <TextInput
            id={inputId}
            value={describe(value)}
            onChange={() => undefined}
            aria-label="Selected future schedule"
            placeholder="Pick a wait or date"
            readOnly
          />
        </InputGroupItem>
        <InputGroupItem>
          {isMobile ? (
            <Button
              variant={ButtonVariant.tertiary}
              aria-label="Open future picker"
              icon={<CalendarAltIcon />}
              onClick={() => setSheetOpen(true)}
              style={triggerStyle}
            />
          ) : (
            <Popover
              headerContent="Schedule"
              bodyContent={desktopPanel}
              hasAutoWidth
              showClose={false}
              position="bottom-end"
              flipBehavior={[
                "bottom-end",
                "bottom",
                "bottom-start",
                "top-end",
                "top",
                "top-start",
              ]}
              distance={8}
              appendTo={() => document.body}
            >
              <Button
                variant={ButtonVariant.tertiary}
                aria-label="Open future picker"
                icon={<CalendarAltIcon />}
                style={triggerStyle}
              />
            </Popover>
          )}
        </InputGroupItem>
      </InputGroup>
      {isMobile && (
        <BottomSheet
          open={sheetOpen}
          onClose={() => setSheetOpen(false)}
          ariaLabel="Schedule"
        >
          {mobilePanel}
        </BottomSheet>
      )}
    </>
  );
}

// #region LiveDemo
export function LiveDemo() {
  const [last, setLast] = useState<FuturePickerValue | null>(null);

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <FuturePicker onChange={setLast} />
      <pre
        style={{
          margin: 0,
          padding: 12,
          background: "var(--gp-color-bg-secondary-default)",
          borderRadius: 6,
          fontSize: 13,
          color: "var(--gp-color-text-regular)",
        }}
        aria-live="polite"
      >
        {last
          ? JSON.stringify(last, null, 2)
          : "// onChange payload appears here"}
      </pre>
    </div>
  );
}
// #endregion

// #region ModalVersion
export function ModalVersion() {
  // Same FuturePickerPanel hosted inside a PF6 Modal with an explicit
  // Apply / Cancel commit step. Draft state lives inside the modal
  // until Apply commits it upstream; Cancel discards.
  const modalId = useId();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalValue, setModalValue] = useState<FuturePickerValue | null>(null);
  const [draft, setDraft] = useState<FuturePickerValue | null>(null);
  const openModal = () => {
    setDraft(modalValue);
    setModalOpen(true);
  };

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Button variant="secondary" onClick={openModal}>
          {modalValue ? `Schedule: ${describe(modalValue)}` : "Schedule…"}
        </Button>
        {modalValue ? (
          <Button variant="link" onClick={() => setModalValue(null)}>
            Clear
          </Button>
        ) : null}
      </div>

      <Modal
        variant={ModalVariant.small}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby={`${modalId}-title`}
        aria-describedby={`${modalId}-body`}
        // Tighten the modal so the FuturePickerPanel sits snugly
        // without a wide gutter on either side. The panel is
        // internally capped at 24rem; 26rem covers it plus the
        // dialog inline padding.
        style={
          {
            "--pf-v6-c-modal-box--Width": "26rem",
          } as React.CSSProperties
        }
      >
        <ModalHeader title="Schedule" labelId={`${modalId}-title`} />
        {/* Lock the body to a fixed height so flipping between Wait
            (4 stepper rows) and Specific date (calendar grid) doesn't
            reflow the modal. The calendar view is the tallest of the
            two — pin the body so both tabs settle on the same dialog
            height and the Apply / Cancel footer stays put. */}
        <ModalBody id={`${modalId}-body`} style={{ minBlockSize: "28.5rem" }}>
          <FuturePickerPanel onChange={setDraft} />
        </ModalBody>
        <ModalFooter>
          <Button
            variant="primary"
            isDisabled={!draft}
            onClick={() => {
              if (draft) setModalValue(draft);
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

export default function FuturePickerExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <LiveDemo />
      <ModalVersion />
    </div>
  );
}
