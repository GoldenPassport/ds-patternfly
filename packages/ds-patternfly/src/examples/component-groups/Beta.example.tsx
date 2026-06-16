/**
 * Beta — "Beta" / "Tech preview" / "New" qualifier tags for features that
 * aren't generally available. Not a separate component (in
 * @patternfly/react-component-groups or elsewhere) — the convention is a
 * Label with a consistent colour and copy.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { Label, LabelGroup } from "@golden-passport/ds-patternfly";

// #region Conventions
export function Conventions() {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <strong style={{ color: "var(--gp-color-text-regular)" }}>
          Workflow templates
        </strong>
        <Label color="yellow" isCompact>Beta</Label>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <strong style={{ color: "var(--gp-color-text-regular)" }}>
          AI suggestions
        </strong>
        <Label color="orange" isCompact>Tech preview</Label>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <strong style={{ color: "var(--gp-color-text-regular)" }}>
          Run history
        </strong>
        <Label color="blue" isCompact>New</Label>
      </div>
    </div>
  );
}
// #endregion

// #region StackedExample
export function StackedExample() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <strong style={{ color: "var(--gp-color-text-regular)" }}>
        Cross-region replication
      </strong>
      <LabelGroup numLabels={3} isCompact>
        <Label color="yellow" isCompact>Beta</Label>
        <Label color="purple" isCompact>Premium</Label>
      </LabelGroup>
    </div>
  );
}
// #endregion

export default function BetaExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <Conventions />
      <StackedExample />
    </div>
  );
}
