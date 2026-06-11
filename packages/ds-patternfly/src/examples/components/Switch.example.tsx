/**
 * Switch — a boolean toggle that applies its change immediately.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useId, useState } from "react";
import { Switch } from "../_lib.js";

// #region States
export function States() {
  const id = useId();
  const [on, setOn] = useState(true);
  const [auto, setAuto] = useState(false);

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <Switch id={`${id}-notifications`} label="Email notifications" isChecked={on} onChange={(_, v) => setOn(v)} />
      <Switch id={`${id}-autosave`} label="Auto-save drafts" isChecked={auto} onChange={(_, v) => setAuto(v)} />
      <Switch id={`${id}-disabled-off`} label="Disabled (off)" isChecked={false} onChange={() => {}} isDisabled />
      <Switch id={`${id}-disabled-on`} label="Disabled (on)" isChecked onChange={() => {}} isDisabled />
    </div>
  );
}
// #endregion

export default function SwitchExample() {
  return <States />;
}
