/**
 * DurationPicker — "run again after" scheduling with the exported DateField.
 * `allowRelative` + `relativeMode="duration"` add a Wait tab whose days/hours/
 * minutes steppers emit an ISO-8601 duration (e.g. "PT2H30M") via
 * `onDurationChange`, while the Specific date tab emits an absolute Date via
 * `onChange`. So the result is a discriminated union — a duration OR a date.
 * Set `relativeOnly` to drop the calendar and offer the duration alone.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useState } from "react";
import { DateField, FormGroup } from "@golden-passport/ds-patternfly";

// The picker can yield either kind of value — type both.
type RunAgainAfter =
  | { kind: "duration"; duration: string }
  | { kind: "date"; date: Date };

const HELP =
  "Fire this task after a relative wait, or on a specific date.";

const resultBox = {
  margin: 0,
  padding: 12,
  background: "var(--gp-color-bg-secondary-default)",
  borderRadius: 6,
  fontSize: 13,
  color: "var(--gp-color-text-regular)",
} as const;

function describe(r: RunAgainAfter | null): string {
  if (!r) return "// nothing picked yet";
  return r.kind === "duration"
    ? `duration → ${r.duration}`
    : `date → ${r.date.toDateString()}`;
}

// #region DurationOrDate
export function DurationOrDate() {
  const [result, setResult] = useState<RunAgainAfter | null>(null);
  return (
    <FormGroup label="Run again after" fieldId="run-after">
      <div style={{ display: "grid", gap: 16 }}>
        <DateField
          value={result?.kind === "date" ? result.date : null}
          // Show the chosen duration in the field when no date is set.
          {...(result?.kind === "duration" ? { durationValue: result.duration } : {})}
          // Specific date tab → a Date.
          onChange={(date) => setResult(date ? { kind: "date", date } : null)}
          // Wait tab → an ISO-8601 duration string.
          onDurationChange={(duration) => setResult({ kind: "duration", duration })}
          ariaLabel="Run again after"
          modalTitle="Schedule"
          allowRelative
          relativeMode="duration"
          relativeTabLabel="Wait"
          relativeHelpText={HELP}
        />
        <pre style={resultBox} aria-live="polite">
          {describe(result)}
        </pre>
      </div>
    </FormGroup>
  );
}
// #endregion

// #region DurationOnly
export function DurationOnly() {
  const [duration, setDuration] = useState("PT0S");
  // relativeOnly drops the calendar — a pure duration picker.
  return (
    <FormGroup label="Retry delay" fieldId="retry-delay">
      <div style={{ display: "grid", gap: 16 }}>
        <DateField
          value={null}
          {...(duration !== "PT0S" ? { durationValue: duration } : {})}
          onChange={() => {}}
          ariaLabel="Retry delay"
          modalTitle="Retry delay"
          allowRelative
          relativeOnly
          relativeMode="duration"
          relativeTabLabel="Wait"
          onDurationChange={setDuration}
        />
        <pre style={resultBox} aria-live="polite">
          {duration}
        </pre>
      </div>
    </FormGroup>
  );
}
// #endregion

export default function DurationPickerExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <DurationOrDate />
      <DurationOnly />
    </div>
  );
}
