/**
 * CloseButton (@patternfly/react-component-groups) — a standardized X button
 * with consistent icon, hit-target, and aria-label for dismissable surfaces
 * (drawers, panels, toasts, custom widgets).
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { CloseButton } from "@patternfly/react-component-groups/dist/dynamic/CloseButton";

// #region Basic
export function Basic() {
  return <CloseButton onClick={() => alert("dismissed")} />;
}
// #endregion

// #region InsideACustomPanel
export function InsideACustomPanel() {
  return (
    <div
      style={{
        position: "relative",
        padding: "16px 48px 16px 16px",
        background: "var(--gp-color-bg-secondary-default)",
        border: "1px solid var(--gp-color-border-subtle)",
        borderRadius: 8,
        color: "var(--gp-color-text-regular)",
      }}
    >
      <strong>Heads up</strong>
      <p style={{ margin: "4px 0 0", color: "var(--gp-color-text-subtle)" }}>
        A custom inline notice — the close button sits absolutely
        positioned in the top-right corner.
      </p>
      <span style={{ position: "absolute", top: 8, right: 8 }}>
        <CloseButton onClick={() => alert("dismissed")} />
      </span>
    </div>
  );
}
// #endregion

export default function CloseButtonExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <Basic />
      <InsideACustomPanel />
    </div>
  );
}
