import { useState, type ReactNode } from "react";
import {
  Button,
  CalendarMonth,
  DatePicker,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "../base/index.js";
import CalendarAltIcon from "@patternfly/react-icons/dist/esm/icons/calendar-alt-icon";

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
 * DateField — the date picker lego block. Pick a single date, displayed as a
 * text input with a popover calendar (`display="popover"`, the default), an
 * always-visible inline calendar (`display="flat"`), or a trigger button that
 * opens the calendar in a modal with Apply / Cancel (`display="modal"`).
 * Controlled by a `Date | null` value; restrict the selectable range with
 * `minDate` / `maxDate` (out-of-range days are disabled in every display).
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
  /** Disable the control. */
  isDisabled?: boolean;
  /** Accessible name (popover input / modal trigger). */
  ariaLabel?: string;
  /** Placeholder text (popover input / empty modal trigger). */
  placeholder?: string;
  /** Message shown when an out-of-range date is typed (popover). */
  rangeError?: ReactNode;
  /** Modal title (display="modal"). */
  modalTitle?: string;
  /** Modal apply-button text (display="modal"). */
  applyText?: string;
  /** Modal cancel-button text (display="modal"). */
  cancelText?: string;
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
  modalTitle = "Select a date",
  applyText = "Apply",
  cancelText = "Cancel",
}: DateFieldProps) {
  // Modal-only transient state (hooks run unconditionally).
  const [isOpen, setIsOpen] = useState(false);
  const [draft, setDraft] = useState<Date | null>(value);

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
    // the popover input / modal trigger name only.
    return (
      <CalendarMonth
        {...(value ? { date: value } : {})}
        onChange={(_e, date) => onChange(date)}
        validators={[isAllowed]}
        {...(min ? { rangeStart: min } : {})}
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
          {value ? toISO(value) : (placeholder ?? "Select a date")}
        </Button>
        <Modal
          variant="small"
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          aria-label={modalTitle}
        >
          <ModalHeader title={modalTitle} />
          <ModalBody>
            <CalendarMonth
              {...(draft ? { date: draft } : {})}
              onChange={(_e, date) => setDraft(date)}
              validators={[isAllowed]}
              {...(min ? { rangeStart: min } : {})}
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
