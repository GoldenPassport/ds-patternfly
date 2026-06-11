/**
 * ValidatedTextArea — the multi-line sibling of ValidatedTextField. Same
 * controlled + validators API over a base TextArea: own the `value`, surface
 * errors on blur (or per `validateOn`), and derive the PF `validated` state.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useState } from "react";
import {
  ValidatedTextArea,
  required,
  minLength,
  maxLength,
} from "../_lib.js";

// #region Basic
export function Basic() {
  const [value, setValue] = useState("");

  return (
    <ValidatedTextArea
      label="Notes"
      value={value}
      onChange={setValue}
      rows={3}
      placeholder="Anything we should know?"
      helperText="Optional — internal notes only."
    />
  );
}
// #endregion

// #region WithValidation
export function WithValidation() {
  const [value, setValue] = useState("");

  return (
    <ValidatedTextArea
      label="Description"
      value={value}
      onChange={setValue}
      isRequired
      rows={4}
      validators={[
        required("A description is required"),
        minLength(10),
        maxLength(280),
      ]}
      helperText="Between 10 and 280 characters."
    />
  );
}
// #endregion

export default function ValidatedTextAreaExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <Basic />
      <WithValidation />
    </div>
  );
}
