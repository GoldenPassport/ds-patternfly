/**
 * Severity (@patternfly/react-component-groups) — a standardized severity
 * indicator (critical / important / moderate / minor / none / undefined)
 * for security dashboards, vulnerability scanners, and alert triage UIs.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { Severity } from "@patternfly/react-component-groups/dist/dynamic/Severity";

// #region AllSeverities
export function AllSeverities() {
  return (
    <div style={{ display: "grid", gap: 8 }}>
      <Severity severity="critical"  label="Critical" />
      <Severity severity="important" label="Important" />
      <Severity severity="moderate"  label="Moderate" />
      <Severity severity="minor"     label="Minor" />
      <Severity severity="none"      label="None" />
      <Severity severity="undefined" label="Undefined" />
    </div>
  );
}
// #endregion

// #region IconOnly
export function IconOnly() {
  return (
    <div style={{ display: "flex", gap: 16 }}>
      <Severity severity="critical"  label="Critical"  labelHidden />
      <Severity severity="important" label="Important" labelHidden />
      <Severity severity="moderate"  label="Moderate"  labelHidden />
      <Severity severity="minor"     label="Minor"     labelHidden />
    </div>
  );
}
// #endregion

export default function SeverityExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <AllSeverities />
      <IconOnly />
    </div>
  );
}
