import React, {
  useEffect,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import {
  Button,
  CalendarMonth,
  InputGroup,
  InputGroupItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  NumberInput,
  Popover,
  Tab,
  TabTitleText,
  Tabs,
  TextInput,
} from "../base/index.js";
import AngleLeftIcon from "@patternfly/react-icons/dist/esm/icons/angle-left-icon";
import AngleRightIcon from "@patternfly/react-icons/dist/esm/icons/angle-right-icon";
import CalendarAltIcon from "@patternfly/react-icons/dist/esm/icons/calendar-alt-icon";
import MinusIcon from "@patternfly/react-icons/dist/esm/icons/minus-icon";
import PlusIcon from "@patternfly/react-icons/dist/esm/icons/plus-icon";
import TimesIcon from "@patternfly/react-icons/dist/esm/icons/times-icon";

/** Local-time ISO date (yyyy-MM-dd) — the unambiguous wire/display format. */
function toISO(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
function fromISO(s: string): Date {
  const m = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (!m) return new Date("invalid");
  return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
}
/** Midnight of a date, for inclusive day-range comparisons. */
function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}
/** Midnight, `n` days from today (local). */
function addDays(n: number): Date {
  const t = new Date();
  return new Date(t.getFullYear(), t.getMonth(), t.getDate() + n);
}

/**
 * Tracks a `(max-width: …)` match so the picker flips between Popover
 * (desktop) and a bottom-anchored Sheet (mobile) when the viewport crosses
 * the breakpoint mid-session.
 */
function useMobileViewport(maxWidth = "47.98rem"): boolean {
  const [match, setMatch] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia(`(max-width: ${maxWidth})`);
    setMatch(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setMatch(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [maxWidth]);
  return match;
}

/**
 * Bottom-anchored sheet for mobile pickers. Renders via portal into `<body>`
 * using the native `<dialog>` element so focus trap, Escape-to-close, and an
 * inert background come for free. Slide-up/down is pure CSS (gp-bottom-sheet).
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
  children: ReactNode;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);

  // Pin the body in place while the sheet is open and restore scroll on close,
  // so the user lands back at the trigger they tapped (Safari resets otherwise).
  useEffect(() => {
    if (!open || typeof document === "undefined") return;
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

  // Native <dialog> backdrops fire a click on the dialog itself when the
  // pointer is outside the content — compare against the bounding rect.
  const onClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const { clientX: x, clientY: y } = e;
    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
      onClose();
    }
  };

  if (typeof document === "undefined") return null;

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
        variant="plain"
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

interface CalendarPanelProps {
  date?: Date;
  validators?: Array<(d: Date) => boolean>;
  rangeStart?: Date;
  monthFormat?: (d: Date) => string;
  locale?: string;
  onChange: (d: Date) => void;
}

/**
 * Three-view calendar: days (PF6 CalendarMonth with its stock header hidden),
 * months (3×4 grid, arrows step the year), and years (3×4 decade grid, arrows
 * step the decade). The label button toggles days → months → years. Disabled
 * spans are derived from `validators` so arrows/tiles grey out when empty.
 */
function CalendarPanel({
  date,
  validators,
  rangeStart,
  monthFormat,
  locale,
  onChange,
}: CalendarPanelProps) {
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
    monthFormat?.(d) ?? d.toLocaleString(locale ?? undefined, { month: "long" });
  const shortMonth = (d: Date) =>
    monthFormat?.(d) ?? d.toLocaleString(locale ?? undefined, { month: "short" });

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

  return (
    <div
      className={`gp-libcal${showSelection ? "" : " gp-libcal--no-selection"}`}
      style={{ inlineSize: "22rem", maxInlineSize: "22rem", boxSizing: "border-box" }}
    >
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 8,
          paddingBlockEnd: "var(--pf-t--global--spacer--sm, 0.5rem)",
          marginBlockEnd: "var(--pf-t--global--spacer--md, 1rem)",
          minBlockSize: "2.25rem",
        }}
      >
        <Button
          variant="plain"
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
          variant="tertiary"
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
          variant="plain"
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
                variant={idx === internalDate.getMonth() ? "primary" : "tertiary"}
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
                variant={y === internalDate.getFullYear() ? "primary" : "tertiary"}
                isDisabled={!enabled}
                onClick={() => {
                  setDisplayedMonth(new Date(y, internalDate.getMonth(), 1));
                  setView("months");
                }}
                style={{ ...gridTileStyle, opacity: inDecade ? 1 : 0.45 }}
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

interface CalendarPopoutProps {
  date?: Date;
  validators?: Array<(d: Date) => boolean>;
  rangeStart?: Date;
  monthFormat?: (d: Date) => string;
  locale?: string;
  ariaLabel: string;
  allowRelative?: boolean;
  relativeTabLabel: string;
  dateTabLabel: string;
  isAllowed: (d: Date) => boolean;
  relativeMode?: "date" | "duration";
  onDuration?: (iso: string) => void;
  relativeHelpText?: string;
  relativeOnly?: boolean;
  onChange: (d: Date) => void;
  children: ReactElement<{ onClick?: () => void }>;
}

/**
 * Responsive shell around a trigger: Popover on desktop, bottom Sheet on
 * mobile, both hosting the same PickerSurface.
 */
function CalendarPopout({
  date,
  validators,
  rangeStart,
  monthFormat,
  locale,
  ariaLabel,
  allowRelative,
  relativeTabLabel,
  dateTabLabel,
  isAllowed,
  relativeMode,
  onDuration,
  relativeHelpText,
  relativeOnly,
  onChange,
  children,
}: CalendarPopoutProps) {
  const isMobile = useMobileViewport();
  const [sheetOpen, setSheetOpen] = useState(false);
  const calendar = (
    <PickerSurface
      {...(date ? { date } : {})}
      {...(validators ? { validators } : {})}
      {...(rangeStart ? { rangeStart } : {})}
      {...(monthFormat ? { monthFormat } : {})}
      {...(locale ? { locale } : {})}
      {...(allowRelative ? { allowRelative } : {})}
      {...(relativeMode ? { relativeMode } : {})}
      {...(onDuration ? { onDuration } : {})}
      {...(relativeHelpText ? { relativeHelpText } : {})}
      {...(relativeOnly ? { relativeOnly } : {})}
      relativeTabLabel={relativeTabLabel}
      dateTabLabel={dateTabLabel}
      isAllowed={isAllowed}
      onChange={(d) => {
        onChange(d);
        if (isMobile) setSheetOpen(false);
      }}
    />
  );

  if (isMobile) {
    const triggerWithClick = React.cloneElement(children, {
      onClick: () => setSheetOpen(true),
    });
    return (
      <>
        {triggerWithClick}
        <BottomSheet
          open={sheetOpen}
          onClose={() => setSheetOpen(false)}
          ariaLabel={ariaLabel}
        >
          {calendar}
        </BottomSheet>
      </>
    );
  }

  return (
    <Popover
      headerContent={ariaLabel}
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
 * Relative-offset entry: "in N weeks + N days". Resolves the offset to an
 * absolute Date (midnight, today + offset) and emits it through the same
 * onChange as the calendar — so the field's value stays a `Date`. The live
 * line shows the day the offset lands on.
 */
function RelativeOffsetPanel({
  isAllowed,
  onChange,
  weeksLabel = "Weeks",
  daysLabel = "Days",
}: {
  isAllowed: (d: Date) => boolean;
  onChange: (d: Date) => void;
  weeksLabel?: string;
  daysLabel?: string;
}) {
  const [weeks, setWeeks] = useState(0);
  const [days, setDays] = useState(1);
  const resolved = addDays(weeks * 7 + days);
  const allowed = (weeks > 0 || days > 0) && isAllowed(resolved);

  const emit = (w: number, d: number) => {
    const total = w * 7 + d;
    if (total < 1) return;
    const next = addDays(total);
    if (isAllowed(next)) onChange(next);
  };
  const stepper = (
    label: string,
    val: number,
    set: (n: number) => void,
    other: "weeks" | "days",
  ) => (
    <div style={{ display: "grid", gap: 4 }}>
      <span style={{ fontSize: 13, color: "var(--gp-color-text-subtle)" }}>{label}</span>
      <NumberInput
        value={val}
        min={0}
        inputName={label}
        inputAriaLabel={label}
        minusBtnAriaLabel={`Decrease ${label}`}
        plusBtnAriaLabel={`Increase ${label}`}
        onMinus={() => {
          const n = Math.max(0, val - 1);
          set(n);
          emit(other === "weeks" ? weeks : n, other === "weeks" ? n : days);
        }}
        onPlus={() => {
          const n = val + 1;
          set(n);
          emit(other === "weeks" ? weeks : n, other === "weeks" ? n : days);
        }}
        onChange={(e) => {
          const n = Math.max(0, Number((e.target as HTMLInputElement).value) || 0);
          set(n);
          emit(other === "weeks" ? weeks : n, other === "weeks" ? n : days);
        }}
      />
    </div>
  );

  return (
    <div style={{ display: "grid", gap: 16, padding: "1rem 0" }}>
      <div style={{ display: "flex", gap: 16 }}>
        {stepper(weeksLabel, weeks, setWeeks, "days")}
        {stepper(daysLabel, days, setDays, "weeks")}
      </div>
      <div style={{ fontSize: 14, color: "var(--gp-color-text-subtle)" }} aria-live="polite">
        {allowed ? `→ ${toISO(resolved)}` : "Pick how far out"}
      </div>
    </div>
  );
}

/** Encode a {days, hours, minutes} offset as an ISO-8601 duration. */
function encodeDuration({
  days,
  hours,
  minutes,
}: {
  days: number;
  hours: number;
  minutes: number;
}): string {
  if (!days && !hours && !minutes) return "PT0S";
  const datePart = days > 0 ? `${days}D` : "";
  const timePart =
    (hours > 0 ? `${hours}H` : "") + (minutes > 0 ? `${minutes}M` : "");
  return `P${datePart}${timePart ? `T${timePart}` : ""}`;
}

/** A single labelled 0..∞ stepper. */
function OffsetStepper({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
}) {
  return (
    <div style={{ display: "grid", gap: 4 }}>
      <span style={{ fontSize: 13, color: "var(--gp-color-text-subtle)" }}>{label}</span>
      <NumberInput
        value={value}
        min={0}
        inputName={label}
        inputAriaLabel={label}
        minusBtnAriaLabel={`Decrease ${label}`}
        plusBtnAriaLabel={`Increase ${label}`}
        onMinus={() => onChange(Math.max(0, value - 1))}
        onPlus={() => onChange(value + 1)}
        onChange={(e) =>
          onChange(Math.max(0, Number((e.target as HTMLInputElement).value) || 0))
        }
      />
    </div>
  );
}

const stepperTriggerStyle = {
  borderRadius: "var(--gp-radius-control, var(--pf-v6-c-button--BorderRadius))",
  aspectRatio: "1",
  paddingInline: 0,
} as const;

/**
 * A labelled −/+ stepper row: tertiary outline buttons flanking a centred
 * numeric text input. (Plain Button + TextInput, not PF NumberInput, so the
 * brand-stroke outline stays consistent across resting / hover / focus /
 * disabled — NumberInput drops its border when disabled.)
 */
function StepperRow({
  label,
  ariaLabel,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  ariaLabel: string;
  value: number;
  min: number;
  max: number;
  onChange: (n: number) => void;
}) {
  const clamp = (v: number) => Math.max(min, Math.min(max, v));
  return (
    <div style={{ display: "grid", gap: 4, fontSize: 13 }}>
      <span>{label}</span>
      <InputGroup>
        <InputGroupItem>
          <Button
            variant="tertiary"
            aria-label={`Decrease ${label.toLowerCase()}`}
            icon={<MinusIcon />}
            isDisabled={value <= min}
            onClick={() => onChange(clamp(value - 1))}
            style={stepperTriggerStyle}
          />
        </InputGroupItem>
        <InputGroupItem isFill>
          <TextInput
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={value}
            onChange={(_e, v) => {
              if (v === "") return;
              const n = Number(v);
              if (Number.isNaN(n)) return;
              onChange(clamp(n));
            }}
            aria-label={ariaLabel}
            style={{ textAlign: "center" }}
          />
        </InputGroupItem>
        <InputGroupItem>
          <Button
            variant="tertiary"
            aria-label={`Increase ${label.toLowerCase()}`}
            icon={<PlusIcon />}
            isDisabled={value >= max}
            onClick={() => onChange(clamp(value + 1))}
            style={stepperTriggerStyle}
          />
        </InputGroupItem>
      </InputGroup>
    </div>
  );
}

/**
 * Relative-duration entry: days / hours / minutes → an ISO-8601 duration
 * (e.g. "PT2H30M", "P1DT4H"), emitted through `onDuration` on every edit. A
 * centred column of labelled −/+ stepper rows under an optional helper line —
 * for "fire this in N" scheduling where the offset itself is the value.
 */
function RelativeDurationPanel({
  onDuration,
  helpText,
  daysLabel = "Days",
  hoursLabel = "Hours",
  minutesLabel = "Minutes",
}: {
  onDuration: (iso: string) => void;
  helpText?: string;
  daysLabel?: string;
  hoursLabel?: string;
  minutesLabel?: string;
}) {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const commit = (d: number, h: number, m: number) => {
    setDays(d);
    setHours(h);
    setMinutes(m);
    onDuration(encodeDuration({ days: d, hours: h, minutes: m }));
  };
  const empty = !days && !hours && !minutes;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        padding: "1rem 0",
      }}
    >
      {helpText ? (
        <p
          style={{
            margin: 0,
            inlineSize: "100%",
            fontSize: 13,
            lineHeight: 1.5,
            color: "var(--gp-color-text-subtle)",
            textAlign: "center",
          }}
        >
          {helpText}
        </p>
      ) : null}
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr)", gap: 12, inlineSize: "14rem" }}>
        <StepperRow label={daysLabel} ariaLabel="Days to wait" value={days} min={0} max={365} onChange={(n) => commit(n, hours, minutes)} />
        <StepperRow label={hoursLabel} ariaLabel="Hours to wait" value={hours} min={0} max={23} onChange={(n) => commit(days, n, minutes)} />
        <StepperRow label={minutesLabel} ariaLabel="Minutes to wait" value={minutes} min={0} max={59} onChange={(n) => commit(days, hours, n)} />
      </div>
      <div style={{ inlineSize: "14rem", textAlign: "center", fontSize: 14, color: "var(--gp-color-text-subtle)" }} aria-live="polite">
        {empty ? "Pick a duration" : `→ ${encodeDuration({ days, hours, minutes })}`}
      </div>
    </div>
  );
}

interface PickerSurfaceProps extends CalendarPanelProps {
  allowRelative?: boolean;
  relativeTabLabel: string;
  dateTabLabel: string;
  isAllowed: (d: Date) => boolean;
  /** Relative tab output: a resolved date ("date") or an ISO duration. */
  relativeMode?: "date" | "duration";
  /** Fired with the ISO-8601 duration when relativeMode is "duration". */
  onDuration?: (iso: string) => void;
  /** Helper line above the duration steppers. */
  relativeHelpText?: string;
  /** Show only the relative panel — drop the calendar tab entirely. */
  relativeOnly?: boolean;
}

/**
 * The calendar surface shared by every display:
 * - default — the calendar alone;
 * - `allowRelative` — the relative panel and the calendar in two tabs (pinned
 *   to the calendar's width so the popover/modal doesn't resize on switch; in
 *   duration mode the relative "Wait" tab leads);
 * - `relativeOnly` — only the relative panel, no calendar / no tabs.
 */
function PickerSurface({
  allowRelative,
  relativeTabLabel,
  dateTabLabel,
  isAllowed,
  relativeMode = "date",
  onDuration,
  relativeHelpText,
  relativeOnly,
  onChange,
  ...calProps
}: PickerSurfaceProps) {
  const durationMode = relativeMode === "duration" && !!onDuration;
  const showRelative = allowRelative || relativeOnly;
  const [tab, setTab] = useState<string>(durationMode ? "relative" : "date");

  if (!showRelative) {
    return <CalendarPanel {...calProps} onChange={onChange} />;
  }

  const relBody = durationMode ? (
    <RelativeDurationPanel
      onDuration={onDuration}
      {...(relativeHelpText ? { helpText: relativeHelpText } : {})}
    />
  ) : (
    <RelativeOffsetPanel isAllowed={isAllowed} onChange={onChange} />
  );

  // Duration-only / relative-only: a single panel, no calendar tab.
  if (relativeOnly) {
    return <div style={{ minInlineSize: "18rem" }}>{relBody}</div>;
  }

  const calBody = (
    <div style={{ paddingBlockStart: "1rem" }}>
      <CalendarPanel {...calProps} onChange={onChange} />
    </div>
  );
  const dateTitle = <TabTitleText>{dateTabLabel}</TabTitleText>;
  const relTitle = <TabTitleText>{relativeTabLabel}</TabTitleText>;

  // Render the two <Tab>s as direct static children (not an array/fragment) so
  // PF's Tabs doesn't warn about missing keys; the order flips by branch.
  return (
    // Pin to the calendar's width (22rem) so the popover/modal stays one size
    // across both tabs; the narrower stepper column centres within it.
    <div style={{ inlineSize: "22rem", maxInlineSize: "22rem", boxSizing: "border-box" }}>
      {durationMode ? (
        <Tabs activeKey={tab} onSelect={(_e, k) => setTab(String(k))} aria-label="Picker mode">
          <Tab eventKey="relative" title={relTitle}>{relBody}</Tab>
          <Tab eventKey="date" title={dateTitle}>{calBody}</Tab>
        </Tabs>
      ) : (
        <Tabs activeKey={tab} onSelect={(_e, k) => setTab(String(k))} aria-label="Picker mode">
          <Tab eventKey="date" title={dateTitle}>{calBody}</Tab>
          <Tab eventKey="relative" title={relTitle}>{relBody}</Tab>
        </Tabs>
      )}
    </div>
  );
}

/**
 * DateField — the date picker lego block. Pick a single date, displayed as a
 * text input with a popover calendar (`display="popover"`, the default), an
 * always-visible inline calendar (`display="flat"`), or a trigger button that
 * opens the calendar in a modal with Apply / Cancel (`display="modal"`).
 *
 * The calendar is a three-view picker (days → months → years) that adapts to a
 * bottom sheet on touch viewports. Controlled by a `Date | null` value;
 * restrict selectable days with `minDate` / `maxDate`, `futureOnly` (today and
 * earlier disabled), or arbitrary `validators` (return `false` to disable a
 * day — e.g. exclude holidays). With `allowRelative`, adds a relative-offset
 * tab beside the calendar; `relativeMode="duration"` makes that tab emit an
 * ISO-8601 duration (`onDurationChange`) instead of a date — so the field can
 * yield a `Date` (via `onChange`) or a duration string, or both. Use
 * `relativeOnly` to drop the calendar and offer only the relative entry.
 */
export interface DateFieldProps {
  /** Controlled value, or null for no selection. */
  value: Date | null;
  /** Fired with the new date (or null when the input is cleared). */
  onChange: (date: Date | null) => void;
  /** How to render. Default "popover". */
  display?: "popover" | "flat" | "modal";
  /** Earliest selectable date (inclusive). */
  minDate?: Date;
  /** Latest selectable date (inclusive). */
  maxDate?: Date;
  /**
   * Restrict to future dates — today and earlier are disabled. Shorthand for
   * `minDate={tomorrow}`; an explicit `minDate` overrides it (e.g. "no sooner
   * than next week"). For scheduling, expiries, "remind me on…" pickers.
   */
  futureOnly?: boolean;
  /**
   * Arbitrary day-disabling predicates — each returns `false` to disable a
   * day. Combined with `minDate`/`maxDate`. Use for excluded dates, weekends,
   * blackout windows, etc.
   */
  validators?: Array<(d: Date) => boolean>;
  /** Highlight the span from this date to the hovered/selected day. */
  rangeStart?: Date;
  /** BCP-47 locale for month names (e.g. "fr-FR"). */
  locale?: string;
  /** Override month-name rendering (takes priority over `locale`). */
  monthFormat?: (d: Date) => string;
  /** Disable the control. */
  isDisabled?: boolean;
  /** Accessible name (popover input / modal trigger / sheet). */
  ariaLabel?: string;
  /** Placeholder text (popover input / empty modal trigger). */
  placeholder?: string;
  /** Modal title (display="modal"). Also names the popover/sheet header. */
  modalTitle?: string;
  /** Modal apply-button text (display="modal"). */
  applyText?: string;
  /** Modal cancel-button text (display="modal"). */
  cancelText?: string;
  /**
   * Offer a relative "in N weeks/days" tab beside the calendar. The chosen
   * offset resolves to an absolute date (today + offset) and flows through
   * `onChange` like any other selection — useful for scheduling / reminders.
   */
  allowRelative?: boolean;
  /** Tab label for the relative-offset entry (allowRelative). Default "In…". */
  relativeTabLabel?: string;
  /** Tab label for the calendar (allowRelative). Default "Specific date". */
  dateTabLabel?: string;
  /**
   * What the relative "In…" tab produces (with `allowRelative`):
   * - `"date"` (default) — a weeks/days offset that resolves to an absolute
   *   date, emitted via `onChange`.
   * - `"duration"` — a days/hours/minutes offset emitted as an ISO-8601
   *   duration string (e.g. `"PT2H30M"`) via `onDurationChange`.
   */
  relativeMode?: "date" | "duration";
  /** Fired with the ISO-8601 duration when `relativeMode="duration"`. */
  onDurationChange?: (duration: string) => void;
  /** Optional helper line above the duration steppers (relativeMode="duration"). */
  relativeHelpText?: string;
  /**
   * Show *only* the relative entry — drop the calendar tab. With
   * `relativeMode="duration"` this is a pure duration picker (emits via
   * `onDurationChange`); without it, a pure relative-date picker. Omit it to
   * offer both the relative tab and the calendar (the default when
   * `allowRelative` is set).
   */
  relativeOnly?: boolean;
  /**
   * Controlled duration to display in the field when no date is selected
   * (the value last emitted by `onDurationChange`). Lets the input/trigger
   * reflect a chosen duration like `"PT2H30M"` instead of sitting empty.
   */
  durationValue?: string;
}

export function DateField({
  value,
  onChange,
  display = "popover",
  minDate,
  maxDate,
  futureOnly,
  validators,
  rangeStart,
  locale,
  monthFormat,
  isDisabled,
  ariaLabel,
  placeholder,
  modalTitle = "Select a date",
  applyText = "Apply",
  cancelText = "Cancel",
  allowRelative,
  relativeTabLabel = "In…",
  dateTabLabel = "Specific date",
  relativeMode,
  onDurationChange,
  relativeHelpText,
  relativeOnly,
  durationValue,
}: DateFieldProps) {
  // Field text: the date if one is selected, else a chosen duration, else empty.
  const displayValue = value ? toISO(value) : (durationValue ?? "");
  // Modal-only transient state (hooks run unconditionally).
  const [isOpen, setIsOpen] = useState(false);
  const [draft, setDraft] = useState<Date | null>(value);
  // Text mirror for the popover input so partial typing isn't clobbered.
  const [text, setText] = useState(displayValue);
  useEffect(() => {
    setText(displayValue);
  }, [displayValue]);

  const min = minDate
    ? startOfDay(minDate)
    : futureOnly
      ? addDays(1)
      : undefined;
  const max = maxDate ? startOfDay(maxDate) : undefined;
  const inRange = (d: Date): boolean => {
    const day = startOfDay(d).getTime();
    if (min && day < min.getTime()) return false;
    if (max && day > max.getTime()) return false;
    return true;
  };
  // The full validator list passed to the calendar: range + caller predicates.
  const allValidators: Array<(d: Date) => boolean> = [
    inRange,
    ...(validators ?? []),
  ];
  const isAllowed = (d: Date) => allValidators.every((v) => v(d));
  const highlight = rangeStart ?? min;

  const sharedCalProps = {
    validators: allValidators,
    ...(highlight ? { rangeStart: highlight } : {}),
    ...(monthFormat ? { monthFormat } : {}),
    ...(locale ? { locale } : {}),
  };
  // Surface = calendar (+ optional relative tab). Shared by every display.
  const surfaceProps = {
    ...sharedCalProps,
    ...(allowRelative ? { allowRelative } : {}),
    ...(relativeMode ? { relativeMode } : {}),
    ...(onDurationChange ? { onDuration: onDurationChange } : {}),
    ...(relativeHelpText ? { relativeHelpText } : {}),
    ...(relativeOnly ? { relativeOnly } : {}),
    relativeTabLabel,
    dateTabLabel,
    isAllowed,
  };

  if (display === "flat") {
    return (
      <PickerSurface
        {...(value ? { date: value } : {})}
        {...surfaceProps}
        onChange={(d) => onChange(d)}
      />
    );
  }

  if (display === "modal") {
    const open = () => {
      setDraft(value);
      setIsOpen(true);
    };
    const apply = () => {
      onChange(draft);
      setIsOpen(false);
    };
    return (
      <>
        <Button
          variant="secondary"
          icon={<CalendarAltIcon />}
          onClick={open}
          isDisabled={!!isDisabled}
          {...(ariaLabel ? { "aria-label": ariaLabel } : {})}
        >
          {displayValue || placeholder || "Select a date"}
        </Button>
        <Modal
          variant="small"
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          aria-label={modalTitle}
        >
          <ModalHeader title={modalTitle} />
          <ModalBody>
            <PickerSurface
              {...(draft ? { date: draft } : {})}
              {...surfaceProps}
              onChange={(d) => setDraft(d)}
            />
          </ModalBody>
          <ModalFooter>
            <Button variant="primary" onClick={apply} isDisabled={!draft}>
              {applyText}
            </Button>
            <Button variant="link" onClick={() => setIsOpen(false)}>
              {cancelText}
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }

  // popover — text input + a tertiary icon trigger opening the responsive
  // calendar. Typing an ISO date that parses + passes validators commits it.
  const onText = (v: string) => {
    setText(v);
    if (v === "") {
      onChange(null);
      return;
    }
    const d = fromISO(v);
    if (!Number.isNaN(d.getTime()) && isAllowed(d)) onChange(d);
  };

  return (
    <InputGroup style={{ maxWidth: 240 }}>
      <InputGroupItem isFill>
        <TextInput
          value={text}
          onChange={(_e, v) => onText(v)}
          placeholder={placeholder ?? "YYYY-MM-DD"}
          isDisabled={!!isDisabled}
          {...(ariaLabel ? { "aria-label": ariaLabel } : {})}
        />
      </InputGroupItem>
      <InputGroupItem>
        <CalendarPopout
          {...(value ? { date: value } : {})}
          {...surfaceProps}
          ariaLabel={modalTitle}
          onChange={(d) => onChange(d)}
        >
          <Button
            variant="tertiary"
            aria-label={ariaLabel ?? "Open date picker"}
            icon={<CalendarAltIcon />}
            isDisabled={!!isDisabled}
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
