/**
 * Status (@patternfly/react-component-groups) — a standardized icon + label
 * pair for object state (Healthy / Degraded / Failed / Unknown), with
 * popover and link variants for explanatory detail.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { Status } from "@patternfly/react-component-groups/dist/dynamic/Status";

// #region Plain
export function Plain() {
  return (
    <div style={{ display: "grid", gap: 8 }}>
      <Status status="success" label="Healthy" />
      <Status status="info"    label="Provisioning" />
      <Status status="warning" label="Degraded" />
      <Status status="danger"  label="Failed" />
      <Status status="custom"  label="Unknown" />
    </div>
  );
}
// #endregion

// #region PopoverVariant
export function PopoverVariant() {
  return (
    <Status
      status="danger"
      label="Failed"
      variant="popover"
      popoverProps={{
        headerContent: "Why this failed",
        bodyContent:
          "The container exited with code 137 (OOMKilled). Increase the memory limit and retry.",
      }}
    />
  );
}
// #endregion

// #region IconOnly
export function IconOnly() {
  return (
    <div style={{ display: "flex", gap: 16 }}>
      <Status status="success" label="Healthy" iconOnly iconTitle="Healthy" />
      <Status status="warning" label="Degraded" iconOnly iconTitle="Degraded" />
      <Status status="danger"  label="Failed"  iconOnly iconTitle="Failed" />
    </div>
  );
}
// #endregion

export default function StatusExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <Plain />
      <PopoverVariant />
      <IconOnly />
    </div>
  );
}
