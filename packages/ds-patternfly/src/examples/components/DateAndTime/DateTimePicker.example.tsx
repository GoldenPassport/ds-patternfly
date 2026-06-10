/**
 * DateTimePicker — paired DatePicker + TimePicker under one FormGroup.
 *
 * PF6 doesn't ship a single "date and time" component — the recommended
 * pattern is two paired controls: a date input and a time input,
 * side-by-side. This file carries the full lib date-picker recipe
 * (LibDatePicker + CalendarPanel + responsive Popover/BottomSheet shell)
 * so the example is self-contained.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import React, { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  Button,
  ButtonVariant,
  CalendarMonth,
  FormGroup,
  InputGroup,
  InputGroupItem,
  Popover,
  TextInput,
  TimePicker,
} from "../../_lib.js";
import {
  AngleLeftIcon,
  AngleRightIcon,
  CalendarAltIcon,
  TimesIcon,
} from "@patternfly/react-icons";

// Element ids derive from useId() so any number of instances can coexist
// on one page without duplicate-id clashes.

// ---------- Date helpers ----------

// Default display format: DD/MM/YYYY (rest-of-world convention).
// US-style is MM/DD/YYYY — switchable via the formats demo below.
const pad = (n: number) => String(n).padStart(2, "0");
const fmtDDMMYYYY = (d: Date) =>
  `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
const parseDDMMYYYY = (s: string): Date => {
  const m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!m) return new Date("invalid");
  return new Date(Number(m[3]), Number(m[2]) - 1, Number(m[1]));
};

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
 * Reusable wrapper that hosts a CalendarPanel inside the lib's
 * responsive shell — Popover on desktop, bottom-anchored Sheet on
 * mobile — around any trigger element passed as children. Used by
 * both the Default-section date picker (with an InputGroup TextInput
 * trigger) and the Custom CTA section (with primary / secondary /
 * link Button triggers).
 */
function CalendarPopout({
  date,
  validators,
  rangeStart,
  monthFormat,
  locale,
  onChange,
  children,
}: {
  date?: Date;
  validators?: Array<(d: Date) => boolean>;
  rangeStart?: Date;
  monthFormat?: (d: Date) => string;
  locale?: string;
  onChange: (next: Date) => void;
  children: React.ReactElement<{ onClick?: () => void }>;
}) {
  const isMobile = useMobileViewport();
  const [sheetOpen, setSheetOpen] = useState(false);
  const calendar = (
    <CalendarPanel
      {...(date ? { date } : {})}
      {...(validators ? { validators } : {})}
      {...(rangeStart ? { rangeStart } : {})}
      {...(monthFormat ? { monthFormat } : {})}
      {...(locale ? { locale } : {})}
      onChange={(d) => {
        onChange(d);
        if (isMobile) setSheetOpen(false);
      }}
    />
  );

  if (isMobile) {
    // Touch path — clone the trigger with our onClick so the Button
    // opens the bottom sheet instead of a popover. Trigger Buttons
    // already carry their own props (variant, icon, label); we only
    // overlay click behaviour.
    const triggerWithClick = React.cloneElement(children, {
      onClick: () => setSheetOpen(true),
    });
    return (
      <>
        {triggerWithClick}
        <BottomSheet
          open={sheetOpen}
          onClose={() => setSheetOpen(false)}
          ariaLabel="Pick a date"
        >
          {calendar}
        </BottomSheet>
      </>
    );
  }

  return (
    <Popover
      headerContent="Pick a date"
      bodyContent={calendar}
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
      elementToFocus=".pf-v6-c-calendar-month__date.pf-m-selected, .pf-v6-c-calendar-month__date.pf-m-current"
    >
      {children}
    </Popover>
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
 * Lib-style date picker — TextInput + InputGroup + a tertiary icon
 * Button that opens an inline CalendarMonth in a Popover. Used by the
 * Default, Min/Max, Excluded, Date range, and i18n sections so each
 * shares the same trigger Button styling (matches the Button story's
 * tertiary icon-only row with the brand-dial control radius).
 *
 * Validators here follow PF6 CalendarMonth's signature:
 * `(date: Date) => boolean` — return `false` to disable a cell.
 */
function LibDatePicker({
  value,
  onChange,
  validators,
  rangeStart,
  monthFormat,
  locale,
  ariaLabel,
  buttonAriaLabel,
  placeholder = "DD/MM/YYYY",
  id,
  dateFormat = fmtDDMMYYYY,
  dateParse = parseDDMMYYYY,
}: {
  value: string;
  onChange: (next: string) => void;
  validators?: Array<(d: Date) => boolean>;
  rangeStart?: Date;
  monthFormat?: (d: Date) => string;
  locale?: string;
  ariaLabel: string;
  buttonAriaLabel: string;
  placeholder?: string;
  id?: string;
  /** Format a Date to the input's string form. Defaults to DD/MM/YYYY. */
  dateFormat?: (d: Date) => string;
  /** Parse the input's string form back to a Date. Defaults to DD/MM/YYYY. */
  dateParse?: (s: string) => Date;
}) {
  const parsed = dateParse(value);
  const valid = !Number.isNaN(parsed.getTime());
  return (
    <InputGroup style={{ maxWidth: 240 }}>
      <InputGroupItem isFill>
        <TextInput
          {...(id ? { id } : {})}
          value={value}
          onChange={(_e, v) => onChange(v)}
          placeholder={placeholder}
          aria-label={ariaLabel}
        />
      </InputGroupItem>
      <InputGroupItem>
        {/* CalendarPopout = the responsive shell (Popover desktop /
            bottom Sheet mobile) + the three-view CalendarPanel.
            Section-specific props (validators / rangeStart / monthFormat
            / locale) flow through to CalendarPanel. */}
        <CalendarPopout
          {...(valid ? { date: parsed } : {})}
          {...(validators ? { validators } : {})}
          {...(rangeStart ? { rangeStart } : {})}
          {...(monthFormat ? { monthFormat } : {})}
          {...(locale ? { locale } : {})}
          onChange={(d) => onChange(dateFormat(d))}
        >
          <Button
            variant={ButtonVariant.tertiary}
            aria-label={buttonAriaLabel}
            icon={<CalendarAltIcon />}
            style={{
              borderRadius:
                "var(--gp-radius-control, var(--pf-v6-c-button--BorderRadius))",
              aspectRatio: "1",
              paddingInline: 0,
            }}
          />
        </CalendarPopout>
      </InputGroupItem>
    </InputGroup>
  );
}

// #region SideBySide
export function SideBySide() {
  const id = useId();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  return (
    <FormGroup label="Schedule for" isRequired fieldId={id}>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <LibDatePicker
          id={id}
          value={date}
          onChange={setDate}
          ariaLabel="Schedule date"
          buttonAriaLabel="Open date picker"
        />
        <TimePicker
          time={time}
          onChange={(_, v) => setTime(v)}
          is24Hour
          stepMinutes={15}
        />
      </div>
    </FormGroup>
  );
}
// #endregion

export default function DateTimePickerExample() {
  return <SideBySide />;
}
