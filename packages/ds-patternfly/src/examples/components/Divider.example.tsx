/**
 * Divider — horizontal or vertical rule separating blocks of content.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { Divider } from "../_lib.js";

// #region Horizontal
export function Horizontal() {
  return (
    <div style={{ display: "grid", gap: 16, color: "var(--gp-color-text-regular)" }}>
      <div>Section above</div>
      <Divider />
      <div>Section below</div>
    </div>
  );
}
// #endregion

// #region Vertical
export function Vertical() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        color: "var(--gp-color-text-regular)",
        height: 60,
      }}
    >
      <span>Left</span>
      <Divider orientation={{ default: "vertical" }} />
      <span>Middle</span>
      <Divider orientation={{ default: "vertical" }} />
      <span>Right</span>
    </div>
  );
}
// #endregion

// #region Inset
export function Inset() {
  return (
    <div style={{ color: "var(--gp-color-text-regular)" }}>
      Section above
      <Divider inset={{ default: "insetMd", md: "insetXl" }} />
      Section below
    </div>
  );
}
// #endregion

export default function DividerExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <Horizontal />
      <Vertical />
      <Inset />
    </div>
  );
}
