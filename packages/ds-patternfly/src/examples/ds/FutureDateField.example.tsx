/**
 * FutureDateField — a DateField restricted to future dates (today and earlier
 * are disabled). Same flat / popover display + controlled Date | null API.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useState } from "react";
import { FormGroup, FutureDateField } from "../_lib.js";

// #region ScheduleReminder
export function ScheduleReminder() {
  const [date, setDate] = useState<Date | null>(null);
  return (
    <FormGroup label="Remind me on" fieldId="remind-date">
      <FutureDateField value={date} onChange={setDate} ariaLabel="Reminder date" />
    </FormGroup>
  );
}
// #endregion

// #region FlatFuture
export function FlatFuture() {
  const [date, setDate] = useState<Date | null>(null);
  return <FutureDateField display="flat" value={date} onChange={setDate} ariaLabel="Pick a future date" />;
}
// #endregion

// #region ModalFuture
export function ModalFuture() {
  const [date, setDate] = useState<Date | null>(null);
  return (
    <FormGroup label="Expires on" fieldId="expires-date">
      <FutureDateField
        display="modal"
        value={date}
        onChange={setDate}
        ariaLabel="Expiry date"
        modalTitle="Pick an expiry date"
      />
    </FormGroup>
  );
}
// #endregion

export default function FutureDateFieldExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <ScheduleReminder />
      <FlatFuture />
      <ModalFuture />
    </div>
  );
}
