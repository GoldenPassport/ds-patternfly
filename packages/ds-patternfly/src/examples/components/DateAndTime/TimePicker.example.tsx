/**
 * TimePicker — the exported TimeField lego block: a text input for
 * time-of-day with a popover of suggested times, controlled by a string
 * value. 24- or 12-hour.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useId, useState } from "react";
import { FormGroup, TimeField } from "@golden-passport/ds-patternfly";

// #region Basic24Hour
export function Basic24Hour() {
  const id = useId();
  const [time, setTime] = useState("");
  return (
    <FormGroup label="Start time" fieldId={id} isRequired>
      <TimeField id={id} value={time} onChange={setTime} is24Hour stepMinutes={15} />
    </FormGroup>
  );
}
// #endregion

// #region TwelveHour
export function TwelveHour() {
  const id = useId();
  const [time, setTime] = useState("");
  return (
    <FormGroup label="Reminder time" fieldId={id}>
      <TimeField id={id} value={time} onChange={setTime} />
    </FormGroup>
  );
}
// #endregion

export default function TimePickerExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <Basic24Hour />
      <TwelveHour />
    </div>
  );
}
