/**
 * SelectableToggleGroup — a pill-shaped row of toggleable options (view
 * switcher / inline radio or checkbox set). The exported lego block owns the
 * per-item id wiring and the single- vs multi-select state transitions; you
 * pass `items` and the controlled `value` / `onChange`.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useState } from "react";
import { SelectableToggleGroup } from "@golden-passport/ds-patternfly";
import { ColumnsIcon, ListIcon, TableIcon } from "@patternfly/react-icons";

// #region SingleSelect
export function SingleSelect() {
  const [view, setView] = useState("list");
  return (
    <SelectableToggleGroup
      ariaLabel="View density"
      value={view}
      onChange={setView}
      items={[
        { id: "list", text: "List" },
        { id: "grid", text: "Grid" },
        { id: "compact", text: "Compact" },
      ]}
    />
  );
}
// #endregion

// #region MultiSelect
export function MultiSelect() {
  const [settings, setSettings] = useState<string[]>(["wrap"]);
  return (
    <SelectableToggleGroup
      selectionMode="multiple"
      ariaLabel="Editor settings"
      value={settings}
      onChange={setSettings}
      items={[
        { id: "wrap", text: "Wrap" },
        { id: "minimap", text: "Minimap" },
        { id: "linenums", text: "Line numbers" },
      ]}
    />
  );
}
// #endregion

// #region WithIcons
export function WithIcons() {
  const [view, setView] = useState("grid");
  return (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      {/* icon + text */}
      <SelectableToggleGroup
        ariaLabel="View mode (icon + text)"
        value={view}
        onChange={setView}
        items={[
          { id: "list", text: "List", icon: <ListIcon /> },
          { id: "grid", text: "Grid", icon: <ColumnsIcon /> },
          { id: "table", text: "Table", icon: <TableIcon /> },
        ]}
      />
      {/* icon only — each option needs an ariaLabel */}
      <SelectableToggleGroup
        ariaLabel="View mode (icon only)"
        value={view}
        onChange={setView}
        items={[
          { id: "list", ariaLabel: "List", icon: <ListIcon /> },
          { id: "grid", ariaLabel: "Grid", icon: <ColumnsIcon /> },
          { id: "table", ariaLabel: "Table", icon: <TableIcon /> },
        ]}
      />
    </div>
  );
}
// #endregion

// #region Compact
export function Compact() {
  const [view, setView] = useState("list");
  return (
    <SelectableToggleGroup
      isCompact
      ariaLabel="Compact view mode"
      value={view}
      onChange={setView}
      items={[
        { id: "list", text: "List" },
        { id: "grid", text: "Grid" },
        { id: "table", text: "Table" },
      ]}
    />
  );
}
// #endregion

export default function ToggleGroupExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <SingleSelect />
      <MultiSelect />
      <WithIcons />
      <Compact />
    </div>
  );
}
