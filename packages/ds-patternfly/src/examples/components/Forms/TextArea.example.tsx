/**
 * TextArea — multi-line text input.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useId, useState } from "react";
import { FormGroup, TextArea } from "@golden-passport/ds-patternfly";

// Element ids derive from useId() so any number of instances can coexist
// on one page without duplicate-id clashes.

// #region Basic
export function Basic() {
  const id = useId();
  const [value, setValue] = useState("");

  return (
    <FormGroup label="Description" fieldId={`${id}-desc`}>
      <TextArea
        id={`${id}-desc`}
        value={value}
        onChange={(_, v) => setValue(v)}
        rows={4}
        placeholder="What does this project do?"
        aria-label="Description"
      />
    </FormGroup>
  );
}
// #endregion

// #region AutoResizing
export function AutoResizing() {
  const id = useId();

  return (
    <FormGroup label="Notes (auto-resizes)" fieldId={`${id}-notes`}>
      <TextArea
        id={`${id}-notes`}
        autoResize
        aria-label="Notes"
        placeholder="Type and watch this grow"
      />
    </FormGroup>
  );
}
// #endregion

export default function TextAreaExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <Basic />
      <AutoResizing />
    </div>
  );
}
