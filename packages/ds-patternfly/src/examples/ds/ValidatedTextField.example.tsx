/**
 * ValidatedTextField — a labelled, validated single-line text field. Fully
 * controlled: own the `value`, update it from `onChange`, and pass composable
 * `validators` (required, minLength, email, …) from the lib. Errors surface on
 * blur by default and the PF `validated` state + message are derived for you.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useState } from "react";
import {
  ValidatedTextField,
  required,
  minLength,
  email,
} from "../_lib.js";

// #region Basic
export function Basic() {
  const [value, setValue] = useState("");

  return (
    <ValidatedTextField
      label="Display name"
      value={value}
      onChange={setValue}
      placeholder="e.g. Ada Lovelace"
      helperText="The name shown on your public profile."
    />
  );
}
// #endregion

// #region WithValidation
export function WithValidation() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <ValidatedTextField
        label="Username"
        value={name}
        onChange={setName}
        isRequired
        validators={[required("Username is required"), minLength(3)]}
        helperText="At least 3 characters."
      />
      <ValidatedTextField
        label="Email address"
        type="email"
        value={address}
        onChange={setAddress}
        isRequired
        validators={[required("Email is required"), email()]}
        placeholder="you@example.com"
        helperText="We'll only use this for account recovery."
      />
    </div>
  );
}
// #endregion

export default function ValidatedTextFieldExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <Basic />
      <WithValidation />
    </div>
  );
}
