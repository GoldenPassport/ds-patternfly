/**
 * ShortcutGrid (@patternfly/react-component-groups) — a grid of keyboard
 * shortcut hints for a help panel or a "Press ? for shortcuts" modal.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import ShortcutGrid from "@patternfly/react-component-groups/dist/dynamic/ShortcutGrid";
import Shortcut from "@patternfly/react-component-groups/dist/dynamic/Shortcut";

// #region Default
export function Default() {
  return (
    <ShortcutGrid
      shortcuts={[
        { keys: ["Cmd", "K"], description: "Open quick search" },
        { keys: ["Cmd", "/"], description: "Toggle the help panel" },
        { keys: ["G", "I"], description: "Go to inbox" },
        { keys: ["G", "S"], description: "Go to settings" },
        { keys: ["?"],     description: "Show this shortcut grid" },
        { keys: ["Esc"],   description: "Close any open dialog" },
      ]}
    />
  );
}
// #endregion

// #region SingleShortcut
export function SingleShortcut() {
  return (
    <Shortcut keys={["Cmd", "Shift", "P"]} description="Open command palette" showSymbols />
  );
}
// #endregion

export default function ShortcutGridExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <Default />
      <SingleShortcut />
    </div>
  );
}
