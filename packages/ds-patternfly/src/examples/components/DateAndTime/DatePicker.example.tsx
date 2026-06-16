/**
 * DatePicker — the lib's DateField lego block: a text input + a popover
 * calendar (three-view days → months → years, with a mobile bottom-sheet),
 * controlled by a `Date | null`. Everything below is just configuration —
 * the calendar engine lives in the exported component.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useState } from "react";
import { DateField, FormGroup, HelperText, HelperTextItem } from "@golden-passport/ds-patternfly";

// #region Default
export function Default() {
  const [date, setDate] = useState<Date | null>(null);
  return (
    <FormGroup label="Due date" isRequired>
      <DateField value={date} onChange={setDate} ariaLabel="Due date" />
    </FormGroup>
  );
}
// #endregion

// #region Flat
export function Flat() {
  const [date, setDate] = useState<Date | null>(null);
  return <DateField display="flat" value={date} onChange={setDate} ariaLabel="Pick a date" />;
}
// #endregion

// #region Modal
export function Modal() {
  const [date, setDate] = useState<Date | null>(null);
  return (
    <FormGroup label="Start date">
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

// #region MinMax
export function MinMax() {
  const today = new Date();
  const in30 = new Date();
  in30.setDate(in30.getDate() + 30);
  const [date, setDate] = useState<Date | null>(null);
  return (
    <FormGroup label="Booking — today through 30 days out" isRequired>
      <DateField
        value={date}
        onChange={setDate}
        ariaLabel="Booking date"
        minDate={today}
        maxDate={in30}
      />
    </FormGroup>
  );
}
// #endregion

// #region ExcludedDates
export function ExcludedDates() {
  const [date, setDate] = useState<Date | null>(null);
  // A consumer-supplied predicate — return false to disable a day. Here, a set
  // of public holidays. The component greys these out in every view.
  const holidays = new Set([
    "2026-01-01",
    "2026-04-03",
    "2026-12-25",
    "2026-12-26",
  ]);
  return (
    <FormGroup label="Available booking dates" isRequired>
      <DateField
        value={date}
        onChange={setDate}
        ariaLabel="Booking date (holidays excluded)"
        validators={[
          (d) => {
            const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
            return !holidays.has(iso);
          },
        ]}
      />
    </FormGroup>
  );
}
// #endregion

// #region DateRange
export function DateRange() {
  const [start, setStart] = useState<Date | null>(null);
  const [end, setEnd] = useState<Date | null>(null);
  return (
    <FormGroup label="Trip dates" isRequired>
      <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
        <DateField value={start} onChange={setStart} ariaLabel="Trip start date" placeholder="From" />
        <span style={{ color: "var(--gp-color-text-subtle)" }}>to</span>
        <DateField
          value={end}
          onChange={setEnd}
          ariaLabel="Trip end date"
          placeholder="To"
          {...(start ? { minDate: start, rangeStart: start } : {})}
        />
      </div>
    </FormGroup>
  );
}
// #endregion

// #region I18n
export function I18n() {
  const [date, setDate] = useState<Date | null>(null);
  return (
    <FormGroup label="Date — French month names">
      <DateField value={date} onChange={setDate} ariaLabel="Date (français)" locale="fr-FR" />
    </FormGroup>
  );
}
// #endregion

// #region WithValidation
export function WithValidation() {
  const today = new Date();
  const [date, setDate] = useState<Date | null>(null);
  return (
    <FormGroup label="Future date only">
      <DateField value={date} onChange={setDate} ariaLabel="Future date" minDate={today} />
      <HelperText>
        <HelperTextItem>
          Past dates are disabled in the calendar and rejected on the input.
        </HelperTextItem>
      </HelperText>
    </FormGroup>
  );
}
// #endregion

export default function DatePickerExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <Default />
      <Flat />
      <Modal />
      <MinMax />
      <ExcludedDates />
      <DateRange />
      <I18n />
      <WithValidation />
    </div>
  );
}
