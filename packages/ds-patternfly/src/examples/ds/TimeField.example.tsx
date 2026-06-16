/**
 * TimeField — the time-of-day picker lego block. Controlled by a string value;
 * 24- or 12-hour, with an optional selectable range.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useState } from "react";
import { FormGroup, TimeField } from "@golden-passport/ds-patternfly";

// #region Basic
export function Basic() {
  const [time, setTime] = useState("");
  return (
    <FormGroup label="Reminder time" fieldId="reminder-time">
      <TimeField value={time} onChange={setTime} ariaLabel="Reminder time" />
    </FormGroup>
  );
}
// #endregion

// #region TwentyFourHour
export function TwentyFourHour() {
  const [time, setTime] = useState("");
  return (
    <FormGroup label="Start time" fieldId="start-time" isRequired>
      <TimeField value={time} onChange={setTime} ariaLabel="Start time" is24Hour stepMinutes={15} />
    </FormGroup>
  );
}
// #endregion

// #region Bounded
export function Bounded() {
  const [time, setTime] = useState("");
  return (
    <FormGroup label="Within business hours" fieldId="bounded-time">
      <TimeField
        value={time}
        onChange={setTime}
        ariaLabel="Appointment time"
        is24Hour
        minTime="09:00"
        maxTime="17:00"
        stepMinutes={30}
      />
    </FormGroup>
  );
}
// #endregion

export default function TimeFieldExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <Basic />
      <TwentyFourHour />
      <Bounded />
    </div>
  );
}
