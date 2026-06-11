/**
 * FormScaffold — the standard form frame: your fields as `children`, then a
 * branded submit / cancel ActionGroup. Wires the submit handler (native submit
 * prevented) and a disabled-submit guard, so you focus on the fields.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useState } from "react";
import {
  FormScaffold,
  formScaffoldEnLabels,
  ValidatedTextField,
  required,
  email,
} from "../_lib.js";

// #region BasicForm
export function BasicForm() {
  const [name, setName] = useState("");
  const [addr, setAddr] = useState("");

  // Disable submit until both fields are filled and the email looks valid.
  const isSubmitDisabled =
    name.trim() === "" || addr.trim() === "" || !/.+@.+\..+/.test(addr);

  return (
    <FormScaffold
      labels={formScaffoldEnLabels}
      onSubmit={() => {
        // eslint-disable-next-line no-alert
        alert(`Saved ${name} <${addr}>`);
      }}
      onCancel={() => {
        setName("");
        setAddr("");
      }}
      isSubmitDisabled={isSubmitDisabled}
    >
      <ValidatedTextField
        label="Full name"
        value={name}
        onChange={setName}
        isRequired
        helperText="As it should appear to your team."
        validators={[required("Enter your name")]}
      />
      <ValidatedTextField
        label="Email"
        type="email"
        value={addr}
        onChange={setAddr}
        isRequired
        helperText="We'll send notifications here."
        validators={[required("Enter your email"), email()]}
      />
    </FormScaffold>
  );
}
// #endregion

export default function FormScaffoldExample() {
  return <BasicForm />;
}
