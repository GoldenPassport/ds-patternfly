/**
 * ValidatedSelect — a labelled, validated single-select built on the base
 * FormSelect. Same controlled + validators API as the text fields: pass
 * `options`, own the `value`, surface errors on blur (or per `validateOn`).
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useState } from "react";
import {
  ValidatedSelect,
  required,
  type SelectChoice,
} from "../_lib.js";

const ROLE_OPTIONS: SelectChoice[] = [
  { value: "", label: "Choose a role…", isPlaceholder: true },
  { value: "owner", label: "Owner" },
  { value: "editor", label: "Editor" },
  { value: "viewer", label: "Viewer" },
];

// #region Basic
export function Basic() {
  const [value, setValue] = useState("editor");

  return (
    <ValidatedSelect
      label="Role"
      value={value}
      onChange={setValue}
      options={ROLE_OPTIONS}
      helperText="Controls what this member can do."
    />
  );
}
// #endregion

// #region WithValidation
export function WithValidation() {
  const [value, setValue] = useState("");

  return (
    <ValidatedSelect
      label="Role"
      value={value}
      onChange={setValue}
      options={ROLE_OPTIONS}
      isRequired
      validators={[required("Pick a role to continue")]}
      helperText="Required."
    />
  );
}
// #endregion

export default function ValidatedSelectExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <Basic />
      <WithValidation />
    </div>
  );
}
