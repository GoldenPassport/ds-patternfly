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
  runValidators,
} from "@golden-passport/ds-patternfly";

// Define each field's validators once, then reuse them for both the field
// (which surfaces the error message) and the submit guard below — so there's
// a single source of truth instead of a parallel hand-rolled check.
const nameValidators = [required("Enter your name")];
const emailValidators = [required("Enter your email"), email()];

// #region BasicForm
export function BasicForm() {
  const [name, setName] = useState("");
  const [addr, setAddr] = useState("");

  // Disable submit until every field passes its own validators — reuse the
  // exported runValidators rather than re-deriving validity here.
  const isSubmitDisabled =
    runValidators(name, nameValidators) !== null ||
    runValidators(addr, emailValidators) !== null;

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
        validators={nameValidators}
      />
      <ValidatedTextField
        label="Email"
        type="email"
        value={addr}
        onChange={setAddr}
        isRequired
        helperText="We'll send notifications here."
        validators={emailValidators}
      />
    </FormScaffold>
  );
}
// #endregion

export default function FormScaffoldExample() {
  return <BasicForm />;
}
