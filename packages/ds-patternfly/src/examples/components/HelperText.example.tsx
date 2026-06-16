/**
 * HelperText — short, supplemental text beneath a form field describing
 * expected input, validation rules, or current validation status.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { HelperText, HelperTextItem } from "@golden-passport/ds-patternfly";

// #region SingleHelper
export function SingleHelper() {
  return (
    <HelperText>
      <HelperTextItem>Use 8 or more characters.</HelperTextItem>
    </HelperText>
  );
}
// #endregion

// #region ValidationStates
export function ValidationStates() {
  return (
    <HelperText>
      <HelperTextItem variant="default">Default state</HelperTextItem>
      <HelperTextItem variant="success">Looks good</HelperTextItem>
      <HelperTextItem variant="warning">Could be stronger</HelperTextItem>
      <HelperTextItem variant="error">Required</HelperTextItem>
    </HelperText>
  );
}
// #endregion

export default function HelperTextExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <SingleHelper />
      <ValidationStates />
    </div>
  );
}
