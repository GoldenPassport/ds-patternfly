/**
 * Bullseye — centers a single child both vertically and horizontally within
 * its parent. The classic use is empty states, loading spinners, and error
 * screens.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import type { CSSProperties } from "react";
import { Bullseye } from "@golden-passport/ds-patternfly";

// Shaded placeholder block so the centered content is visible in the demo.
// In a real app this is your empty state / spinner / error message.
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

// #region LiveDemo
export function LiveDemo() {
  return (
    <Bullseye>
      <Box label="centered" style={{ minWidth: 160 }} />
    </Bullseye>
  );
}
// #endregion

export default function BullseyeExample() {
  return (
    <div style={{ height: 240 }}>
      <LiveDemo />
    </div>
  );
}
