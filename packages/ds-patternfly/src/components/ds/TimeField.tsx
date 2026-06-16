import { TimePicker } from "../base/index.js";

/**
 * TimeField — the time-of-day picker lego block. A text input with a popover
 * of suggested times (in the configured step), controlled by a string value
 * (`"14:30"`, `"2:30 PM"`). 24- or 12-hour, with an optional selectable
 * range. The friendlier, fully-controlled wrapper over the base TimePicker:
 * simplified `value` / `onChange`, an `ariaLabel`, and a DS default that
 * portals the popover to `document.body` so it never clips inside cards or
 * modals.
 */
export interface TimeFieldProps {
  /** Controlled time string (format follows `is24Hour` / `delimiter`). */
  value: string;
  /** Fired with the new time string on every edit. */
  onChange: (time: string) => void;
  /** Use 24-hour time (default 12-hour with AM/PM). */
  is24Hour?: boolean;
  /** Minutes between suggested times in the popover (e.g. 15, 30). */
  stepMinutes?: number;
  /** Earliest selectable time (same string format as `value`). */
  minTime?: string;
  /** Latest selectable time. */
  maxTime?: string;
  /** Separator between hours and minutes (default ":"). */
  delimiter?: string;
  /** Placeholder text. */
  placeholder?: string;
  /** Accessible name for the input. */
  ariaLabel?: string;
  /** Field id (pairs with a FormGroup `fieldId`). */
  id?: string;
  /** Control width (CSS length, e.g. "10rem"). */
  width?: string;
  /** Disable the control. */
  isDisabled?: boolean;
}

export function TimeField({
  value,
  onChange,
  is24Hour,
  stepMinutes,
  minTime,
  maxTime,
  delimiter,
  placeholder,
  ariaLabel,
  id,
  width,
  isDisabled,
}: TimeFieldProps) {
  return (
    <TimePicker
      time={value}
      onChange={(_e, time) => onChange(time)}
      isDisabled={!!isDisabled}
      // Portal the suggestions popover so it escapes overflow-clipped
      // containers (cards, modals) — the DS default.
      menuAppendTo={() => document.body}
      {...(id ? { id } : {})}
      {...(is24Hour ? { is24Hour } : {})}
      {...(stepMinutes != null ? { stepMinutes } : {})}
      {...(minTime ? { minTime } : {})}
      {...(maxTime ? { maxTime } : {})}
      {...(delimiter ? { delimiter } : {})}
      {...(placeholder ? { placeholder } : {})}
      {...(width ? { width } : {})}
      {...(ariaLabel ? { "aria-label": ariaLabel } : {})}
    />
  );
}
