/**
 * FuturePicker — the exported DateField restricted to future dates with
 * `futureOnly` (today and earlier are disabled). Same calendar engine and
 * controlled `Date | null` API as DateField — just a future-only floor. For
 * scheduling, expiries, and "remind me on…" pickers.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useState } from "react";
import { DateField, FormGroup } from "@golden-passport/ds-patternfly";

// #region LiveDemo
export function LiveDemo() {
  const [date, setDate] = useState<Date | null>(null);
  return (
    <FormGroup label="Remind me on" fieldId="future-remind">
      <DateField value={date} onChange={setDate} ariaLabel="Reminder date" futureOnly />
    </FormGroup>
  );
}
// #endregion

// #region ModalVersion
export function ModalVersion() {
  const [date, setDate] = useState<Date | null>(null);
  return (
    <FormGroup label="Expires on" fieldId="future-expires">
      <DateField
        display="modal"
        value={date}
        onChange={setDate}
        ariaLabel="Expiry date"
        modalTitle="Pick an expiry date"
        futureOnly
      />
    </FormGroup>
  );
}
// #endregion

export default function FuturePickerExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <LiveDemo />
      <ModalVersion />
    </div>
  );
}
