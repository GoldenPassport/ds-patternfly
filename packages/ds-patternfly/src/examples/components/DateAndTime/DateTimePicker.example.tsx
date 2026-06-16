/**
 * DateTimePicker — a date + a time under one FormGroup, composed from the
 * exported DateField (the calendar engine) and TimeField. The consumer owns
 * the two values; each control owns its own UI.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useId, useState } from "react";
import { DateField, FormGroup, TimeField } from "@golden-passport/ds-patternfly";

// #region SideBySide
export function SideBySide() {
  const id = useId();
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState("");

  return (
    <FormGroup label="Schedule for" isRequired fieldId={id}>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <DateField value={date} onChange={setDate} ariaLabel="Schedule date" />
        <TimeField
          value={time}
          onChange={setTime}
          ariaLabel="Schedule time"
          is24Hour
          stepMinutes={15}
        />
      </div>
    </FormGroup>
  );
}
// #endregion

export default function DateTimePickerExample() {
  return <SideBySide />;
}
