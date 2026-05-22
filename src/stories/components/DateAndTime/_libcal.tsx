/**
 * Shared calendar primitives used by every Date and time picker story
 * (DatePicker / DateTimePicker / etc.). Lives outside `.stories.tsx`
 * so Storybook doesn't pick the exports up as additional stories.
 *
 * Exposes:
 *   - `LibDatePicker`   — TextInput + tertiary icon Button trigger,
 *                          opens a responsive Popover/Sheet calendar.
 *   - `CalendarPopout`  — same shell but with any Button trigger.
 *   - `CalendarPanel`   — the three-view (days/months/years) panel.
 *   - `BottomSheet`     — bottom-anchored sheet for mobile.
 *   - `useMobileViewport` / `useYearInternalStepper` — supporting hooks.
 *   - DD/MM/YYYY helpers — `pad`, `fmtDDMMYYYY`, `parseDDMMYYYY`.
 */

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  Button,
  ButtonVariant,
  CalendarMonth,
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

// ---------- Date helpers (DD/MM/YYYY default) ----------

export const pad = (n: number) => String(n).padStart(2, "0");
export const fmtDDMMYYYY = (d: Date) =>
  `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
export const parseDDMMYYYY = (s: string): Date => {
  const m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!m) return new Date("invalid");
  return new Date(Number(m[3]), Number(m[2]) - 1, Number(m[1]));
};

// ---------- Year stepper portal (used by CalendarPanel) ----------

export function useYearInternalStepper(
  scope: React.RefObject<HTMLDivElement | null>,
) {
  const [formControl, setFormControl] = useState<HTMLElement | null>(null);
  const yearInputRef = useRef<HTMLInputElement | null>(null);

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

// ---------- Viewport detection ----------

export function useMobileViewport(maxWidth = "47.98rem"): boolean {
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

// ---------- BottomSheet ----------

export function BottomSheet({
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
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);

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

  // Backdrop click — `<dialog>` opened with `showModal` exposes the
  // backdrop as the dialog element itself (event.target === dialog).
  // Clicks on visible content land on a descendant, so the equality
  // check cleanly differentiates the two. Avoids the rect-based check
  // which would mis-fire on programmatic `Element.click()` (clientX/Y
  // default to 0) and accidentally close the sheet on tab switches in
  // testing tooling.
  const onClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === e.currentTarget) onClose();
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

// ---------- CalendarPanel ----------

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

  const navBtnStyle = {
    borderRadius: "var(--gp-radius-pill, 999px)",
    aspectRatio: "1",
    blockSize: "auto",
    minBlockSize: "2.75rem",
    minInlineSize: "2.75rem",
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
        inlineSize: "100%",
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
          minBlockSize: "2.75rem",
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
            minBlockSize: "2.75rem",
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

// ---------- CalendarPopout ----------

export function CalendarPopout({
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

// ---------- LibDatePicker ----------

export function LibDatePicker({
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
  dateFormat?: (d: Date) => string;
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
