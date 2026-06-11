/**
 * Level — single horizontal row that distributes its children with
 * justify-content: space-between. The classic use is a header bar with a
 * title on the left and actions on the right.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { Level, LevelItem } from "../_lib.js";

// Shaded placeholder block so the row items are visible in the demo.
// In a real app these are your titles / buttons / metadata.
function Box({ label }: { label: string }) {
  return (
    <div
      style={{
        background: "var(--gp-color-brand-default)",
        color: "var(--gp-color-brand-on)",
        padding: "12px 16px",
        borderRadius: "var(--gp-radius-sm)",
        fontSize: 14,
        textAlign: "center",
      }}
    >
      {label}
    </div>
  );
}

// #region TwoEnds
export function TwoEnds() {
  return (
    <Level>
      <LevelItem>
        <strong style={{ fontSize: 18 }}>Tasks</strong>
      </LevelItem>
      <LevelItem>
        <Box label="Create task" />
      </LevelItem>
    </Level>
  );
}
// #endregion

// #region ThreeOrMoreItems
export function ThreeOrMoreItems() {
  return (
    <Level>
      <LevelItem><Box label="left" /></LevelItem>
      <LevelItem><Box label="middle" /></LevelItem>
      <LevelItem><Box label="right" /></LevelItem>
    </Level>
  );
}
// #endregion

export default function LevelExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <TwoEnds />
      <ThreeOrMoreItems />
    </div>
  );
}
