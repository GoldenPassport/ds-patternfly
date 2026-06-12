import { DateField, type DateFieldProps } from "./DateField.js";

/** Midnight tomorrow (local) — the first allowed day for a future-only field. */
function startOfTomorrow(): Date {
  const t = new Date();
  return new Date(t.getFullYear(), t.getMonth(), t.getDate() + 1);
}

/**
 * FutureDateField — a DateField restricted to future dates (today and
 * earlier are disabled). Same flat / popover display + controlled `Date |
 * null` API; `minDate` defaults to tomorrow, override it to set a different
 * floor (e.g. "no sooner than next week"). For scheduling, expiries, and
 * "remind me on…" pickers.
 */
export interface FutureDateFieldProps extends Omit<DateFieldProps, "minDate"> {
  /** Earliest selectable date. Defaults to tomorrow (future-only). */
  minDate?: Date;
}

export function FutureDateField({ minDate, ...rest }: FutureDateFieldProps) {
  return <DateField minDate={minDate ?? startOfTomorrow()} {...rest} />;
}
