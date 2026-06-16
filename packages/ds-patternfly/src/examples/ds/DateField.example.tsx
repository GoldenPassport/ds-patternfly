/**
 * DateField — pick a single date, as a text input + popover calendar
 * (default) or an always-visible inline calendar. Controlled by a Date | null.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useState } from "react";
import { DateField, FormGroup } from "@golden-passport/ds-patternfly";

// #region Popover
export function Popover() {
  const [date, setDate] = useState<Date | null>(null);
  return (
    <FormGroup label="Due date" fieldId="due-date">
      <DateField value={date} onChange={setDate} ariaLabel="Due date" />
    </FormGroup>
  );
}
// #endregion

// #region Flat
export function Flat() {
  const [date, setDate] = useState<Date | null>(new Date());
  return <DateField display="flat" value={date} onChange={setDate} ariaLabel="Pick a date" />;
}
// #endregion

// #region Bounded
export function Bounded() {
  const [date, setDate] = useState<Date | null>(null);
  const today = new Date();
  const inThirtyDays = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30);
  return (
    <FormGroup label="Within the next 30 days" fieldId="bounded-date">
      <DateField
        value={date}
        onChange={setDate}
        minDate={today}
        maxDate={inThirtyDays}
        ariaLabel="Date within 30 days"
      />
    </FormGroup>
  );
}
// #endregion

// #region Modal
export function ModalPicker() {
  const [date, setDate] = useState<Date | null>(null);
  return (
    <FormGroup label="Start date" fieldId="modal-date">
      <DateField
        display="modal"
        value={date}
        onChange={setDate}
        ariaLabel="Start date"
        modalTitle="Pick a start date"
      />
    </FormGroup>
  );
}
// #endregion

// #region FutureOnly
export function FutureOnly() {
  const [date, setDate] = useState<Date | null>(null);
  // futureOnly disables today + earlier; allowRelative adds an "In…" tab to
  // pick a relative offset that resolves to an absolute date.
  return (
    <FormGroup label="Remind me on" fieldId="future-date">
      <DateField
        value={date}
        onChange={setDate}
        ariaLabel="Reminder date"
        futureOnly
        allowRelative
      />
    </FormGroup>
  );
}
// #endregion

export default function DateFieldExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <Popover />
      <Flat />
      <ModalPicker />
      <Bounded />
      <FutureOnly />
    </div>
  );
}
