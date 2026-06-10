/**
 * TimePicker — a text input for time-of-day selection with a popover
 * suggesting common times in the configured step.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useId, useState } from "react";
import { FormGroup, TimePicker } from "../../_lib.js";

// Element ids derive from useId() so any number of instances can coexist
// on one page without duplicate-id clashes.

// #region Basic24Hour
export function Basic24Hour() {
  const id = useId();
  const [t, setT] = useState("");

  return (
    <FormGroup label="Start time" fieldId={id} isRequired>
      <TimePicker
        id={id}
        time={t}
        onChange={(_, value) => setT(value)}
        is24Hour
        stepMinutes={15}
      />
    </FormGroup>
  );
}
// #endregion

// #region TwelveHour
export function TwelveHour() {
  const id = useId();
  const [t, setT] = useState("");

  return (
    <FormGroup label="Reminder time" fieldId={id}>
      <TimePicker id={id} time={t} onChange={(_, value) => setT(value)} />
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
