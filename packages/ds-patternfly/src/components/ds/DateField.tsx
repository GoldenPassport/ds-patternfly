import type { ReactNode } from "react";
import { CalendarMonth, DatePicker } from "../base/index.js";

/** Local-time ISO date (yyyy-MM-dd) — the unambiguous wire format. */
function toISO(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
function fromISO(s: string): Date {
  return new Date(`${s}T00:00:00`);
}
/** Midnight of a date, for inclusive day-range comparisons. */
function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

/**
 * DateField — the date picker lego block. Pick a single date, displayed
 * either as a text input with a popover calendar (`display="popover"`, the
 * default) or as an always-visible inline calendar (`display="flat"`).
 * Controlled by a `Date | null` value; restrict the selectable range with
 * `minDate` / `maxDate` (out-of-range days are disabled in both displays).
 */
export interface DateFieldProps {
  /** Controlled value, or null for no selection. */
  value: Date | null;
  /** Fired with the new date (or null when the input is cleared). */
  onChange: (date: Date | null) => void;
  /** How to render. Default "popover". */
  display?: "popover" | "flat";
  /** Earliest selectable date (inclusive). */
  minDate?: Date;
  /** Latest selectable date (inclusive). */
  maxDate?: Date;
  /** Disable the control. */
  isDisabled?: boolean;
  /** Accessible name (popover input / flat calendar). */
  ariaLabel?: string;
  /** Placeholder for the popover input. */
  placeholder?: string;
  /** Message shown when an out-of-range date is typed (popover). */
  rangeError?: ReactNode;
}

export function DateField({
  value,
  onChange,
  display = "popover",
  minDate,
  maxDate,
  isDisabled,
  ariaLabel,
  placeholder,
  rangeError = "Date is outside the allowed range",
}: DateFieldProps) {
  const min = minDate ? startOfDay(minDate) : undefined;
  const max = maxDate ? startOfDay(maxDate) : undefined;
  const isAllowed = (d: Date): boolean => {
    const day = startOfDay(d).getTime();
    if (min && day < min.getTime()) return false;
    if (max && day > max.getTime()) return false;
    return true;
  };

  if (display === "flat") {
    // CalendarMonth renders a roleless <div>; ARIA prohibits aria-label
    // there (its day buttons are individually labelled). `ariaLabel` is
    // the popover input's name only.
    return (
      <CalendarMonth
        {...(value ? { date: value } : {})}
        onChange={(_e, date) => onChange(date)}
        validators={[isAllowed]}
        {...(min ? { rangeStart: min } : {})}
      />
    );
  }

  return (
    <DatePicker
      value={value ? toISO(value) : ""}
      placeholder={placeholder ?? "YYYY-MM-DD"}
      dateFormat={toISO}
      dateParse={fromISO}
      onChange={(_e, _v, date) => onChange(date ?? null)}
      validators={[(d) => (isAllowed(d) ? "" : String(rangeError))]}
      isDisabled={!!isDisabled}
      {...(ariaLabel ? { "aria-label": ariaLabel } : {})}
      {...(min ? { rangeStart: min } : {})}
    />
  );
}
