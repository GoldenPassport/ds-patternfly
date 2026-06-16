/**
 * Tooltip — a small floating label shown on hover or focus.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { Button, Tooltip } from "@golden-passport/ds-patternfly";

// #region Basic
export function Basic() {
  return (
    <Tooltip content="Saves the current draft">
      <Button>Save</Button>
    </Tooltip>
  );
}
// #endregion

// #region Positions
export function Positions() {
  return (
    <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
      <Tooltip content="On top" position="top">
        <Button variant="secondary">Top</Button>
      </Tooltip>
      <Tooltip content="On the right" position="right">
        <Button variant="secondary">Right</Button>
      </Tooltip>
      <Tooltip content="On the bottom" position="bottom">
        <Button variant="secondary">Bottom</Button>
      </Tooltip>
      <Tooltip content="On the left" position="left">
        <Button variant="secondary">Left</Button>
      </Tooltip>
    </div>
  );
}
// #endregion

export default function TooltipExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <Basic />
      <Positions />
    </div>
  );
}
