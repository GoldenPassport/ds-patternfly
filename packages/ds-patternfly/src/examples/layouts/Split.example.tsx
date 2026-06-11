/**
 * Split — horizontal row where one item fills remaining space and the others
 * stay intrinsic. The classic use is a sidebar + content row, or a row with
 * a flexible label that pushes trailing icons to the end.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import type { CSSProperties } from "react";
import { Split, SplitItem } from "../_lib.js";

// Shaded placeholder block so the row segments are visible in the demo.
// In a real app these are your sidebar / content / action contents.
function Box({ label, style }: { label: string; style?: CSSProperties }) {
  return (
    <div
      style={{
        background: "var(--gp-color-brand-default)",
        color: "var(--gp-color-brand-on)",
        padding: "12px 16px",
        borderRadius: "var(--gp-radius-sm)",
        fontSize: 14,
        textAlign: "center",
        ...style,
      }}
    >
      {label}
    </div>
  );
}

// #region OneFilledItem
export function OneFilledItem() {
  return (
    <Split hasGutter>
      <SplitItem><Box label="sidebar" style={{ minWidth: 120 }} /></SplitItem>
      <SplitItem isFilled>
        <Box label="main content — fills remaining width" />
      </SplitItem>
    </Split>
  );
}
// #endregion

// #region FilledMiddle
export function FilledMiddle() {
  return (
    <Split hasGutter>
      <SplitItem><Box label="leading icon" style={{ minWidth: 80 }} /></SplitItem>
      <SplitItem isFilled><Box label="flexible label" /></SplitItem>
      <SplitItem><Box label="action" style={{ minWidth: 80 }} /></SplitItem>
    </Split>
  );
}
// #endregion

export default function SplitExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <OneFilledItem />
      <FilledMiddle />
    </div>
  );
}
