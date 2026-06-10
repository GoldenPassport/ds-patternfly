/**
 * Checkbox — a two- or three-state boolean control.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useId, useState } from "react";
import { Checkbox } from "../../_lib.js";

// Element ids derive from useId() so any number of instances can coexist
// on one page without duplicate-id clashes.

// #region States
export function States() {
  const id = useId();
  const [checked, setChecked] = useState(true);

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <Checkbox id={`${id}-default`} label="Default" isChecked={checked} onChange={(_, v) => setChecked(v)} />
      <Checkbox id={`${id}-disabled`} label="Disabled" isDisabled isChecked={false} onChange={() => {}} />
      <Checkbox id={`${id}-disabled-checked`} label="Disabled + checked" isDisabled isChecked onChange={() => {}} />
      <Checkbox
        id={`${id}-indeterminate`}
        label="Indeterminate (parent of mixed children)"
        isChecked={null}
        onChange={() => {}}
      />
    </div>
  );
}
// #endregion

// #region WithDescription
export function WithDescription() {
  const id = useId();
  const [checked, setChecked] = useState(true);

  return (
    <Checkbox
      id={`${id}-summary`}
      label="Send weekly summary"
      description="A digest of activity from the last 7 days."
      isChecked={checked}
      onChange={(_, v) => setChecked(v)}
    />
  );
}
// #endregion

// #region MultiSelectGroup
export function MultiSelectGroup() {
  const id = useId();
  const [email, setEmail] = useState(true);
  const [sms, setSms] = useState(false);

  return (
    <fieldset style={{ border: "none", margin: 0, padding: 0 }}>
      <legend style={{ padding: 0, marginBottom: 8, color: "var(--gp-color-text-regular)" }}>
        Notify me about
      </legend>
      <div style={{ display: "grid", gap: 8 }}>
        <Checkbox id={`${id}-email`} label="Email" isChecked={email} onChange={(_, v) => setEmail(v)} />
        <Checkbox id={`${id}-sms`} label="SMS" isChecked={sms} onChange={(_, v) => setSms(v)} />
      </div>
    </fieldset>
  );
}
// #endregion

export default function CheckboxExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <States />
      <WithDescription />
      <MultiSelectGroup />
    </div>
  );
}
