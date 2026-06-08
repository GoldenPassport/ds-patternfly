import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Button,
  ButtonVariant,
  CalendarMonth,
  DatePicker,
  FormGroup,
  HelperText,
  HelperTextItem,
  InputGroup,
  InputGroupItem,
  Popover,
  TextInput,
} from "@patternfly/react-core";
import {
  AngleLeftIcon,
  AngleRightIcon,
  CalendarAltIcon,
  TimesIcon,
} from "@patternfly/react-icons";
import { FoundationPage, Section, Card, CodeBlock } from "../../_storyKit.js";
import { DemoFrame, PropsTable } from "../../../components/DemoKit.js";

const meta: Meta = {
  title: "Components/Forms/Date and time/DatePicker",
  parameters: { layout: "padded" },
};
export default meta;

// ---------- Date helpers used across the page ----------

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
const fmtMMDDYYYY = (d: Date) =>
  `${pad(d.getMonth() + 1)}/${pad(d.getDate())}/${d.getFullYear()}`;
const parseMMDDYYYY = (s: string): Date => {
  const m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!m) return new Date("invalid");
  return new Date(Number(m[3]), Number(m[1]) - 1, Number(m[2]));
};
const fmtISO = (d: Date) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const parseISO = (s: string): Date => {
  const m = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (!m) return new Date("invalid");
  return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
};

// French month names — illustrates i18n month-list customization.
const monthsFR = [
  "janvier",
  "février",
  "mars",
  "avril",
  "mai",
  "juin",
  "juillet",
  "août",
  "septembre",
  "octobre",
  "novembre",
  "décembre",
];

/**
 * Portal a `gp-stepper-stack` (internal-stepper recipe from
 * Components/Forms/NumberInput) into the year FormControl rendered
 * by PF6 CalendarMonth, so the year input gains compact ▲▼ carets
 * inside the field — same UX the Forms/NumberInput story documents.
 *
 * PF6 CalendarMonth renders the year as a bare TextInput[type=number]
 * with no render-prop / slot. We find the FormControl span at mount
 * time, portal the stepper inside it, and dispatch a native `input`
 * event with a 4-digit year on click so CalendarMonth's internal
 * controlled state updates.
 */
function useYearInternalStepper(scope: React.RefObject<HTMLDivElement | null>) {
  const [formControl, setFormControl] = useState<HTMLElement | null>(null);
  const yearInputRef = useRef<HTMLInputElement | null>(null);

  // rAF poll until found — matches the working FuturePicker hook.
  // CalendarMonth renders synchronously at popover open, but state
  // commitment of the ref attachment can lag by a tick under some
  // React + Popper interleaving, so we re-try until the DOM resolves.
  useLayoutEffect(() => {
    if (!scope.current) return;
    let rafId = 0;
    const find = () => {
      const root = scope.current;
      if (!root) return;
      const fc = root.querySelector<HTMLElement>(
        ".pf-v6-c-calendar-month__header-year .pf-v6-c-form-control",
      );
      const input =
        fc?.querySelector<HTMLInputElement>('input[type="number"]') ?? null;
      if (fc && input) {
        yearInputRef.current = input;
        setFormControl(fc);
      } else {
        rafId = requestAnimationFrame(find);
      }
    };
    rafId = requestAnimationFrame(find);
    return () => cancelAnimationFrame(rafId);
  }, [scope]);

  // Cleanup state when the FormControl detaches (popover close).
  // Without this, a stale ref would block the next open's portal.
  useEffect(() => {
    if (!formControl) return;
    const obs = new MutationObserver(() => {
      if (!document.body.contains(formControl)) {
        setFormControl(null);
        yearInputRef.current = null;
      }
    });
    obs.observe(document.body, { childList: true, subtree: true });
    return () => obs.disconnect();
  }, [formControl]);

  const step = (delta: number) => {
    const yearInput = yearInputRef.current;
    if (!yearInput) return;
    const current = Number(yearInput.value) || new Date().getFullYear();
    const next = String(current + delta).padStart(4, "0");
    const setter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      "value",
    )?.set;
    setter?.call(yearInput, next);
    yearInput.dispatchEvent(new Event("input", { bubbles: true }));
  };

  return { formControl, step };
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
 * Default-section date picker — adapts between Popover (md+ desktop)
 * and a bottom-anchored Sheet (below md, mobile/touch). Same
 * CalendarPanel runs in both shells.
 */
function DefaultDatePicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (next: string) => void;
}) {
  const isMobile = useMobileViewport();
  const [sheetOpen, setSheetOpen] = useState(false);
  const parsed = parseDDMMYYYY(value);
  const valid = !Number.isNaN(parsed.getTime());

  const calendar = (
    <CalendarPanel
      {...(valid ? { date: parsed } : {})}
      onChange={(d) => {
        onChange(fmtDDMMYYYY(d));
        if (isMobile) setSheetOpen(false);
      }}
    />
  );

  const triggerStyle = {
    borderRadius:
      "var(--gp-radius-control, var(--pf-v6-c-button--BorderRadius))",
    aspectRatio: "1",
    paddingInline: 0,
  } as const;

  return (
    <>
      <InputGroup style={{ maxWidth: 240 }}>
        <InputGroupItem isFill>
          <TextInput
            id="due"
            value={value}
            onChange={(_e, v) => onChange(v)}
            placeholder="DD/MM/YYYY"
            aria-label="Due date"
          />
        </InputGroupItem>
        <InputGroupItem>
          {isMobile ? (
            <Button
              variant={ButtonVariant.tertiary}
              aria-label="Open date picker"
              icon={<CalendarAltIcon />}
              onClick={() => setSheetOpen(true)}
              style={triggerStyle}
            />
          ) : (
            <Popover
              headerContent="Pick a date"
              bodyContent={calendar}
              hasAutoWidth
              showClose={false}
              // Preferred position is bottom-end (popover right edge
              // aligned with the trigger so the caret sits under the
              // calendar button). `flipBehavior` lists every fallback
              // Popper should try when the preferred edge runs out of
              // viewport room — both block-axis (top/bottom) and
              // inline-axis (-start/-end) variants. Popper picks the
              // first that fits.
              position="bottom-end"
              flipBehavior={[
                "bottom-end",
                "bottom",
                "bottom-start",
                "top-end",
                "top",
                "top-start",
              ]}
              // Keep at least 8px clear of every viewport edge as the
              // popover slides toward a corner. Default would let the
              // popover hug the edge.
              distance={8}
              appendTo={() => document.body}
              elementToFocus=".pf-v6-c-calendar-month__date.pf-m-selected, .pf-v6-c-calendar-month__date.pf-m-current"
            >
              <Button
                variant={ButtonVariant.tertiary}
                aria-label="Open date picker"
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
          ariaLabel="Pick a date"
        >
          {calendar}
        </BottomSheet>
      )}
    </>
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
  const anyDayValid = (rangeStart: Date, rangeEnd: Date): boolean => {
    if (!validators?.length) return true;
    const cursor = new Date(rangeStart);
    while (cursor.getTime() <= rangeEnd.getTime()) {
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

  // Touch-friendly nav arrow — pill (fully rounded), 44×44 hit area
  // for WCAG 2.5.5. The pill radius matches the close button on the
  // bottom sheet so the chrome reads as a single consistent system.
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
        // Flex-wrap chips — each pill sizes to its label width (no
        // grid stretch) so the corners stay semicircular. Centred in
        // the host so 12 months distribute evenly. minBlockSize keeps
        // the popover the same height as the days grid.
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
        // Flex-wrap year pills — matches the months chip layout.
        // 10 in-decade pills sit at content width with semicircular
        // ends; the previous-decade tail + next-decade head are kept
        // at 45% opacity so users can drift across decade boundaries
        // without using the arrows.
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

export const Overview: StoryObj = {
  render: () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [v, setV] = useState("");
    const [rangeStart, setRangeStart] = useState("");
    const [rangeEnd, setRangeEnd] = useState("");
    const [usDate, setUsDate] = useState("");
    const [isoDate, setIsoDate] = useState("");
    // Custom-trigger recipe state
    const [primaryDate, setPrimaryDate] = useState<Date>(new Date());
    const [secondaryDate, setSecondaryDate] = useState<Date>(new Date());
    const [linkDate, setLinkDate] = useState<Date>(new Date());

    return (
      <FoundationPage
        title="DatePicker"
        intro={
          <>
            A text input paired with a popover calendar. Users can type a
            date directly or pick from the calendar — both inputs stay in
            sync. Use it inside forms where a date is one of several fields.
            The lib defaults the display format to <code>DD/MM/YYYY</code>{" "}
            (rest-of-world convention); US-style and other formats are a
            one-prop swap.
          </>
        }
      >
        <Section
          title="Default — DD/MM/YYYY"
          description="Lib default. Built from a TextInput + a lib `Button` trigger (matches the icon-button styling from Components/Button) + a Popover containing an inline CalendarMonth. Click the calendar icon to open."
        >
          <Card>
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <DemoFrame>
                <FormGroup label="Due date" fieldId="due" isRequired>
                  <DefaultDatePicker value={v} onChange={setV} />
                </FormGroup>
              </DemoFrame>
              <CodeBlock>{`// Built from primitives so the trigger Button can be any variant
// (here: tertiary, matches the Components/Button icon-only row).
// The Popover hosts an inline CalendarMonth; selecting a day
// writes the formatted string back into the TextInput.

import {
  Button, ButtonVariant, CalendarMonth, InputGroup,
  InputGroupItem, Popover, TextInput,
} from "@patternfly/react-core";
import { CalendarAltIcon } from "@patternfly/react-icons";

<InputGroup>
  <InputGroupItem isFill>
    <TextInput value={value} onChange={(_, v) => setValue(v)}
      placeholder="DD/MM/YYYY" aria-label="Due date" />
  </InputGroupItem>
  <InputGroupItem>
    <Popover
      headerContent="Pick a date"
      bodyContent={
        <CalendarMonth
          date={parse(value)}
          onChange={(_, d) => setValue(fmt(d))}
        />
      }
      hasAutoWidth showClose={false}
      position="bottom-end" appendTo={() => document.body}
    >
      <Button
        variant={ButtonVariant.tertiary}
        aria-label="Open date picker"
        icon={<CalendarAltIcon />}
        style={{
          borderRadius: "var(--gp-radius-control)",
          aspectRatio: "1",
          paddingInline: 0,
        }}
      />
    </Popover>
  </InputGroupItem>
</InputGroup>`}</CodeBlock>
              <p
                style={{
                  margin: 0,
                  color: "var(--gp-color-text-subtle)",
                  fontSize: 14,
                }}
              >
                <strong>Why not just <code>&lt;DatePicker&gt;</code>?</strong>{" "}
                PF6&apos;s built-in <code>DatePicker</code> hard-codes the
                trigger to a <code>variant=&quot;control&quot;</code> button.
                Composing from primitives lets the trigger be{" "}
                <em>any</em> variant (tertiary here, but primary / secondary
                / plain are all valid) so the calendar opener picks up the
                lib&apos;s standard icon-button styling — same as the rest
                of the form row. PF6&apos;s native <code>&lt;DatePicker&gt;</code>{" "}
                is still demoed in the sections below for cases where you
                want its bundled keyboard / typing validation.
              </p>
            </div>
          </Card>
        </Section>

        <Section
          title="Custom CTA — primary, outline, or arbitrary"
          description='PF6&apos;s standard DatePicker uses a fixed control-variant button to open the calendar. When the date picker is the primary action of a region (hero scheduler, empty-state CTA), use the recipe below — a styled Button + Popover + CalendarMonth combination. Pick any Button variant or arbitrary chrome.'
        >
          <Card>
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <DemoFrame>
                <div
                  style={{
                    display: "flex",
                    gap: 16,
                    flexWrap: "wrap",
                    alignItems: "center",
                  }}
                >
                  {/* Primary — strongest CTA. CalendarPopout handles
                      the responsive shell (Popover on desktop, bottom
                      Sheet on mobile) + the three-view CalendarPanel. */}
                  <div>
                    <CalendarPopout
                      date={primaryDate}
                      onChange={setPrimaryDate}
                    >
                      <Button variant="primary" icon={<CalendarAltIcon />}>
                        Schedule
                      </Button>
                    </CalendarPopout>
                    <div
                      style={{
                        marginTop: 8,
                        fontSize: 14,
                        color: "var(--gp-color-text-subtle)",
                      }}
                    >
                      {primaryDate.toLocaleDateString()}
                    </div>
                  </div>

                  {/* Secondary / outline. */}
                  <div>
                    <CalendarPopout
                      date={secondaryDate}
                      onChange={setSecondaryDate}
                    >
                      <Button variant="secondary" icon={<CalendarAltIcon />}>
                        Choose date
                      </Button>
                    </CalendarPopout>
                    <div
                      style={{
                        marginTop: 8,
                        fontSize: 14,
                        color: "var(--gp-color-text-subtle)",
                      }}
                    >
                      {secondaryDate.toLocaleDateString()}
                    </div>
                  </div>

                  {/* Link / inline. */}
                  <div>
                    <CalendarPopout
                      date={linkDate}
                      onChange={setLinkDate}
                    >
                      <Button variant="link" icon={<CalendarAltIcon />}>
                        Set deadline
                      </Button>
                    </CalendarPopout>
                    <div
                      style={{
                        marginTop: 8,
                        fontSize: 14,
                        color: "var(--gp-color-text-subtle)",
                      }}
                    >
                      {linkDate.toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </DemoFrame>
              <CodeBlock>{`// Lib recipe — CalendarPopout wraps any Button trigger in the
// responsive shell (Popover on desktop, bottom-anchored Sheet on
// mobile) + the three-view CalendarPanel (days / months / years).
// The trigger Button keeps its own variant, label, and icon — pick
// any you want.

<CalendarPopout date={date} onChange={setDate}>
  <Button variant="primary" icon={<CalendarAltIcon />}>Schedule</Button>
</CalendarPopout>

<CalendarPopout date={date} onChange={setDate}>
  <Button variant="link" icon={<CalendarAltIcon />}>Set deadline</Button>
</CalendarPopout>`}</CodeBlock>
              <p
                style={{
                  margin: 0,
                  color: "var(--gp-color-text-subtle)",
                  fontSize: 14,
                }}
              >
                <strong>What CalendarPopout handles for you:</strong> the
                desktop popover with auto-flip near viewport edges + caret
                under the trigger; the mobile bottom-sheet with focus
                trap, Escape close, body-scroll lock + 44px tap-targets;
                the three-view CalendarPanel (days / months / years) with
                adaptive arrows and a single Month-Year label that cycles
                between views. Bring your own trigger Button — variant,
                icon, and label are all yours to set.
              </p>
            </div>
          </Card>
        </Section>

        <Section
          title="Format variants"
          description="Same component, three regional conventions — pick the dateFormat / dateParse pair that matches your locale."
        >
          <Card>
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <DemoFrame>
                <div style={{ display: "grid", gap: 12 }}>
                  <FormGroup label="US — MM/DD/YYYY" fieldId="us">
                    <LibDatePicker
                      id="us"
                      value={usDate}
                      onChange={setUsDate}
                      dateFormat={fmtMMDDYYYY}
                      dateParse={parseMMDDYYYY}
                      placeholder="MM/DD/YYYY"
                      ariaLabel="US format date"
                      buttonAriaLabel="Open date picker"
                    />
                  </FormGroup>
                  <FormGroup label="ISO — YYYY-MM-DD" fieldId="iso">
                    <LibDatePicker
                      id="iso"
                      value={isoDate}
                      onChange={setIsoDate}
                      dateFormat={fmtISO}
                      dateParse={parseISO}
                      placeholder="YYYY-MM-DD"
                      ariaLabel="ISO format date"
                      buttonAriaLabel="Open date picker"
                    />
                  </FormGroup>
                </div>
              </DemoFrame>
            </div>
          </Card>
        </Section>

        <Section
          title="Min / max — disabled dates"
          description='Restrict the selectable range. Validators return an empty string for valid dates and an error message for invalid ones — surfaced on the calendar (cells disabled) and on the input. Mirrors PF6&apos;s "min and max date" example.'
        >
          <Card>
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <DemoFrame>
                <FormGroup
                  label="Booking — today through 30 days out"
                  fieldId="booking"
                  isRequired
                >
                  <LibDatePicker
                    id="booking"
                    value={v}
                    onChange={setV}
                    ariaLabel="Booking date"
                    buttonAriaLabel="Open date picker"
                    validators={[
                      (date) =>
                        date >= today &&
                        date.getTime() <=
                          today.getTime() + 30 * 24 * 60 * 60 * 1000,
                    ]}
                  />
                </FormGroup>
              </DemoFrame>
              <CodeBlock>{`const today = new Date();
today.setHours(0, 0, 0, 0);
const maxDate = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);

<DatePicker
  validators={[
    (d) =>
      d < today           ? "Date is in the past" :
      d > maxDate         ? "Date is more than 30 days out" :
      "",
  ]}
  ...
/>`}</CodeBlock>
              <p
                style={{
                  margin: 0,
                  color: "var(--gp-color-text-subtle)",
                  fontSize: 14,
                }}
              >
                Each validator runs on every calendar cell. Cells whose
                validator returns a non-empty string render as disabled and
                are unselectable. The first error string also surfaces under
                the input when the user types an invalid date manually.
              </p>
            </div>
          </Card>
        </Section>

        <Section
          title="Excluded dates — holidays / OOO"
          description='Pass an array of YYYY-MM-DD strings (or Date objects) and a single validator that checks set membership. Common use cases: public holidays, blackout windows, scheduled out-of-office days. Excluded dates render as disabled in the calendar AND fail input validation if typed manually.'
        >
          <Card>
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <DemoFrame>
                <FormGroup
                  label="Available booking dates"
                  fieldId="excluded"
                  isRequired
                >
                  <LibDatePicker
                    id="excluded"
                    value={v}
                    onChange={setV}
                    ariaLabel="Booking date (excluded list)"
                    buttonAriaLabel="Open date picker"
                    validators={[
                      // Set-membership check on YYYY-MM-DD strings — O(1)
                      // per cell, fast on large lists. Returning `false`
                      // disables the cell in the calendar.
                      (date) => {
                        const excluded = new Set([
                          "2026-01-01", // New Year's Day
                          "2026-01-26", // OOO
                          "2026-04-03", // Good Friday
                          "2026-04-06", // Easter Monday
                          "2026-12-25", // Christmas Day
                          "2026-12-26", // Boxing Day
                        ]);
                        const iso = `${date.getFullYear()}-${pad(
                          date.getMonth() + 1,
                        )}-${pad(date.getDate())}`;
                        return !excluded.has(iso);
                      },
                    ]}
                  />
                </FormGroup>
              </DemoFrame>
              <CodeBlock>{`// Define the excluded list once — outside render to avoid re-creation.
const excludedDates = new Set([
  "2026-01-01",   // New Year's Day
  "2026-01-26",   // OOO
  "2026-04-03",   // Good Friday
  "2026-04-06",   // Easter Monday
  "2026-12-25",   // Christmas Day
  "2026-12-26",   // Boxing Day
]);

const isExcluded = (date: Date): boolean => {
  const iso = \`\${date.getFullYear()}-\${pad(date.getMonth() + 1)}-\${pad(date.getDate())}\`;
  return excludedDates.has(iso);
};

<DatePicker
  validators={[
    (date) => isExcluded(date) ? "Unavailable" : "",
  ]}
  ...
/>`}</CodeBlock>
              <p
                style={{
                  margin: 0,
                  color: "var(--gp-color-text-subtle)",
                  fontSize: 14,
                }}
              >
                <strong>Pattern notes:</strong> normalise to a single string
                form (ISO YYYY-MM-DD here) so set membership is O(1)
                regardless of list length. Composes with the Min/Max
                validator above — pass both functions in the array and PF6
                runs them in order. The error message you return ("Unavailable",
                "Holiday", "Out of office") surfaces under the input when a
                user types an excluded date manually, so consider
                customising per-context.
              </p>
            </div>
          </Card>
        </Section>

        <Section
          title="Date range"
          description='Two paired DatePickers — start + end. The end picker disables anything before the start. Same pattern as PF6&apos;s "Date and time range picker" example.'
        >
          <Card>
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <DemoFrame>
                <FormGroup label="Trip dates" fieldId="trip" isRequired>
                  <div
                    style={{
                      display: "flex",
                      gap: 12,
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    <LibDatePicker
                      value={rangeStart}
                      onChange={setRangeStart}
                      placeholder="From"
                      ariaLabel="Trip start date"
                      buttonAriaLabel="Open start date picker"
                    />
                    <span
                      style={{
                        color: "var(--gp-color-text-subtle)",
                        fontFamily: "var(--gp-font-family)",
                      }}
                    >
                      to
                    </span>
                    <LibDatePicker
                      value={rangeEnd}
                      onChange={setRangeEnd}
                      placeholder="To"
                      ariaLabel="Trip end date"
                      buttonAriaLabel="Open end date picker"
                      validators={[
                        (date) => {
                          if (!rangeStart) return true;
                          const start = parseDDMMYYYY(rangeStart);
                          if (Number.isNaN(start.getTime())) return true;
                          return date >= start;
                        },
                      ]}
                      // Highlight the span between start and the cell
                      // hovered/selected on the end picker.
                      {...(rangeStart &&
                      !Number.isNaN(parseDDMMYYYY(rangeStart).getTime())
                        ? { rangeStart: parseDDMMYYYY(rangeStart) }
                        : {})}
                    />
                  </div>
                </FormGroup>
              </DemoFrame>
              <CodeBlock>{`<div style={{ display: "flex", gap: 12, alignItems: "center" }}>
  <DatePicker
    value={start} onChange={(_, v) => setStart(v)}
    dateFormat={fmt} dateParse={parse}
    aria-label="Trip start" buttonAriaLabel="Open start date picker"
  />
  <span>to</span>
  <DatePicker
    value={end} onChange={(_, v) => setEnd(v)}
    dateFormat={fmt} dateParse={parse}
    aria-label="Trip end" buttonAriaLabel="Open end date picker"
    validators={[(d) => d < parse(start) ? "End must be after start" : ""]}
    rangeStart={parse(start)}   // calendar highlights the span
  />
</div>`}</CodeBlock>
            </div>
          </Card>
        </Section>

        <Section
          title="i18n — custom month / weekday names"
          description='monthFormat and weekdayFormat are functions — return a localized string and the calendar shows it. The calendar also accepts a `locale` BCP47 string for browser-driven defaults.'
        >
          <Card>
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <DemoFrame>
                <FormGroup label="Date — French month names" fieldId="fr">
                  {/* prev/nextMonthAriaLabel live on CalendarMonth, not
                      DatePicker — PF6 v6 doesn't pass them through, so
                      they'd leak to the DOM as unknown attrs. Leave the
                      defaults in place; consumers needing fully-translated
                      arrows should build a custom Button + Popover +
                      CalendarMonth (see the "Custom trigger" recipe). */}
                  <LibDatePicker
                    id="fr"
                    value={v}
                    onChange={setV}
                    placeholder="JJ/MM/AAAA"
                    ariaLabel="Date (français)"
                    buttonAriaLabel="Ouvrir le sélecteur de date"
                    monthFormat={(d) => monthsFR[d.getMonth()] ?? ""}
                    locale="fr-FR"
                  />
                </FormGroup>
              </DemoFrame>
              <CodeBlock>{`const monthsFR = ["janvier","février","mars",...,"décembre"];

<DatePicker
  dateFormat={fmt}
  monthFormat={(d) => monthsFR[d.getMonth()]}
  locale="fr-FR"
  prevMonthAriaLabel="Mois précédent"
  nextMonthAriaLabel="Mois suivant"
  invalidFormatText="Format invalide. Utiliser JJ/MM/AAAA."
  buttonAriaLabel="Ouvrir le sélecteur de date"
  ...
/>`}</CodeBlock>
            </div>
          </Card>
        </Section>

        <Section
          title="Popover escape — appendTo"
          description="When the DatePicker sits inside a Card, Modal, or any container with overflow constraints, the calendar popover can be clipped. Pass appendTo to portal it to a higher container (or document.body) so it renders unconstrained and stays viewport-aware."
        >
          <Card>
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <DemoFrame>
                <FormGroup label="Date — popover escapes the card" fieldId="escape">
                  <LibDatePicker
                    id="escape"
                    value={v}
                    onChange={setV}
                    ariaLabel="Escape demo"
                    buttonAriaLabel="Open date picker"
                  />
                </FormGroup>
              </DemoFrame>
              <CodeBlock>{`<DatePicker
  appendTo={() => document.body}      // popover renders at body
  popoverProps={{ position: "bottom-end" }}
  ...
/>`}</CodeBlock>
              <p
                style={{
                  margin: 0,
                  color: "var(--gp-color-text-subtle)",
                  fontSize: 14,
                }}
              >
                <strong>Recommended default for cards / modals.</strong>{" "}
                Without <code>appendTo</code>, the popover lives inside the
                form-control wrapper and will be clipped by any parent with{" "}
                <code>overflow: hidden</code> or <code>overflow: auto</code>.
                PF6&apos;s positioner (Popper.js) is viewport-aware: when
                you scroll near a screen edge, the popover auto-flips to
                stay on-screen.
              </p>
            </div>
          </Card>
        </Section>

        <Section
          title="With validation"
          description="Validators feed into both the calendar (disabled cells) and the input (helper text)."
        >
          <Card>
            <div style={{ padding: 24 }}>
              <DemoFrame>
                <FormGroup label="Future date only" fieldId="future">
                  <LibDatePicker
                    id="future"
                    value={v}
                    onChange={setV}
                    ariaLabel="Future date"
                    buttonAriaLabel="Open date picker"
                    validators={[(date) => date >= today]}
                  />
                  <HelperText>
                    <HelperTextItem>
                      Past dates are disabled in the calendar and rejected
                      on the input.
                    </HelperTextItem>
                  </HelperText>
                </FormGroup>
              </DemoFrame>
            </div>
          </Card>
        </Section>

        <Section
          title="Mobile behaviour"
          description={
            <>
              Below the <code>md</code> breakpoint, LibDatePicker swaps
              its popover for a bottom sheet. The mechanics are the
              same for every popover-shaped picker in this section —
              see <strong>Date and time → Overview → Mobile behaviour</strong>{" "}
              for the full write-up.
            </>
          }
        >
          <Card>
            <div
              style={{
                padding: 24,
                color: "var(--gp-color-text-subtle)",
                fontSize: 14,
              }}
            >
              Resize the canvas below the md breakpoint (the Storybook
              viewport picker has a <em>mobile</em> preset) and re-open
              any LibDatePicker on the page to see the sheet in action.
            </div>
          </Card>
        </Section>

        <Section title="Most-used props">
          <Card>
            <div style={{ padding: 24 }}>
              <PropsTable
                rows={[
                  { name: "value", type: "string", description: "Controlled string value. Format matches dateFormat." },
                  { name: "onChange", type: "(event, value: string, date?: Date) => void", description: "Fires on input edit or calendar pick. String + Date both provided when valid." },
                  { name: "dateFormat / dateParse", type: "(date) => string  /  (string) => Date", description: 'Customize display + parsing. Lib default is DD/MM/YYYY; PF6 ships ISO YYYY-MM-DD if you don\'t pass either.' },
                  { name: "validators", type: "((date: Date) => string)[]", description: "Each fn returns empty string for valid, or error message. First error wins. Calendar cells disabled when their date fails any validator." },
                  { name: "rangeStart", type: "Date", description: "Highlight the span between rangeStart and the calendar's hovered/selected date — for paired range pickers." },
                  { name: "minDate / maxDate", type: "Date", description: "Hard bounds — calendar restricts navigation and selection. Often easier than writing validators by hand." },
                  { name: "monthFormat / weekdayFormat / longWeekdayFormat / dayFormat", type: "(date) => ReactNode", description: "i18n customization — supply localized strings." },
                  { name: "locale", type: "string", description: 'BCP47 ("en-GB", "fr-FR", "ja-JP"). Drives Intl-driven defaults when format functions are omitted.' },
                  { name: "weekStart", type: "0 | 1 | ... | 6", description: "Which weekday is column 1. 0 = Sunday (default), 1 = Monday." },
                  { name: "invalidFormatText", type: "string", description: "Error message for unparseable input. i18n." },
                  { name: "buttonAriaLabel", type: "string", description: "Required. Names the calendar trigger button. i18n." },
                  { name: "appendTo", type: "HTMLElement | () => HTMLElement | 'inline'", description: "Where to portal the popover. Pass `() => document.body` when sitting inside cards/modals to escape overflow clipping." },
                ]}
              />
            </div>
          </Card>
        </Section>

        <Section title="Accessibility">
          <Card>
            <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
              <li><strong>buttonAriaLabel is required.</strong> The calendar trigger is icon-only — without an aria-label it&apos;s nameless to AT.</li>
              <li><strong>Both input modes work.</strong> Typing the date directly is fully keyboard-accessible and faster than the calendar for users who know the date — don&apos;t hide the input.</li>
              <li><strong>Validators announce via FormGroup helper text.</strong> Wire the validator&apos;s error string to a HelperText element with variant=&quot;error&quot; for proper AT announcement.</li>
              <li><strong>Localize all user-facing strings.</strong> Placeholder, buttonAriaLabel, prevMonthAriaLabel, nextMonthAriaLabel, invalidFormatText. Plus monthFormat / weekdayFormat for the calendar grid itself.</li>
              <li><strong>Lib styling.</strong> Today&apos;s date gets a brand-coloured outline; weekend cells get a subtle tint. Both are CSS-driven from the lib stylesheet — no per-component config needed.</li>
            </ul>
          </Card>
        </Section>
      </FoundationPage>
    );
  },
};
