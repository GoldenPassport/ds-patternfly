/**
 * Stack — vertical layout where children stack top-to-bottom and exactly one
 * item can be marked isFilled to consume remaining vertical space.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { Stack, StackItem } from "../_lib.js";

// Shaded placeholder block so the layout regions are visible in the demo.
// In a real app these are your header / footer / row contents.
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

// #region PageChrome
export function PageChrome() {
  return (
    <Stack hasGutter style={{ height: "100%" }}>
      <StackItem><Box label="header" /></StackItem>
      <StackItem isFilled>
        <div
          style={{
            background: "var(--gp-color-bg-primary-default)",
            border: "1px solid var(--gp-color-border-subtle)",
            borderRadius: "var(--gp-radius-sm)",
            padding: 24,
            height: "100%",
            color: "var(--gp-color-text-regular)",
          }}
        >
          body — fills remaining height
        </div>
      </StackItem>
      <StackItem><Box label="footer" /></StackItem>
    </Stack>
  );
}
// #endregion

// #region VerticalList
export function VerticalList() {
  return (
    <Stack hasGutter>
      <StackItem><Box label="row 1" /></StackItem>
      <StackItem><Box label="row 2" /></StackItem>
      <StackItem><Box label="row 3" /></StackItem>
    </Stack>
  );
}
// #endregion

export default function StackExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <div style={{ height: 320 }}>
        <PageChrome />
      </div>
      <VerticalList />
    </div>
  );
}
