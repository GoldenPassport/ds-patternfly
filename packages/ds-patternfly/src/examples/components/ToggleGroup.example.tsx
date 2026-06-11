/**
 * ToggleGroup — a pill-shaped row of toggleable options (view switcher /
 * inline radio).
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useId, useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "../_lib.js";
import {
  ColumnsIcon,
  ListIcon,
  TableIcon,
} from "@patternfly/react-icons";

// #region SingleSelect
export function SingleSelect() {
  const id = useId();
  const [single, setSingle] = useState("list");

  return (
    <ToggleGroup aria-label="View density">
      {[
        { id: "list", text: "List" },
        { id: "grid", text: "Grid" },
        { id: "compact", text: "Compact" },
      ].map((it) => (
        <ToggleGroupItem
          key={it.id}
          text={it.text}
          buttonId={`${id}-${it.id}`}
          isSelected={single === it.id}
          onChange={(_e) =>
            setSingle(single === it.id ? "" : it.id)
          }
        />
      ))}
    </ToggleGroup>
  );
}
// #endregion

// #region MultiSelect
export function MultiSelect() {
  const id = useId();
  const [multi, setMulti] = useState<string[]>(["wrap"]);

  const toggleMulti = (itemId: string) =>
    setMulti((prev) =>
      prev.includes(itemId) ? prev.filter((p) => p !== itemId) : [...prev, itemId],
    );

  return (
    <ToggleGroup aria-label="Editor settings">
      {[
        { id: "wrap", text: "Wrap" },
        { id: "minimap", text: "Minimap" },
        { id: "linenums", text: "Line numbers" },
      ].map((it) => (
        <ToggleGroupItem
          key={it.id}
          text={it.text}
          buttonId={`${id}-${it.id}`}
          isSelected={multi.includes(it.id)}
          onChange={() => toggleMulti(it.id)}
        />
      ))}
    </ToggleGroup>
  );
}
// #endregion

// #region WithIcons
export function WithIcons() {
  const id = useId();
  const [view, setView] = useState("grid");

  return (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      <ToggleGroup aria-label="View mode (icon + text)">
        {[
          { id: "list", text: "List", icon: <ListIcon /> },
          { id: "grid", text: "Grid", icon: <ColumnsIcon /> },
          { id: "table", text: "Table", icon: <TableIcon /> },
        ].map((it) => (
          <ToggleGroupItem
            key={it.id}
            text={it.text}
            icon={it.icon}
            buttonId={`${id}-vt-${it.id}`}
            isSelected={view === it.id}
            onChange={() => setView(it.id)}
          />
        ))}
      </ToggleGroup>
      <ToggleGroup aria-label="View mode (icon only)">
        {[
          { id: "list", aria: "List", icon: <ListIcon /> },
          { id: "grid", aria: "Grid", icon: <ColumnsIcon /> },
          { id: "table", aria: "Table", icon: <TableIcon /> },
        ].map((it) => (
          <ToggleGroupItem
            key={it.id}
            aria-label={it.aria}
            icon={it.icon}
            buttonId={`${id}-vi-${it.id}`}
            isSelected={view === it.id}
            onChange={() => setView(it.id)}
          />
        ))}
      </ToggleGroup>
    </div>
  );
}
// #endregion

// #region Compact
export function Compact() {
  const id = useId();

  return (
    <ToggleGroup aria-label="Compact view mode" isCompact>
      {[
        { id: "list", text: "List" },
        { id: "grid", text: "Grid" },
        { id: "table", text: "Table" },
      ].map((it) => (
        <ToggleGroupItem
          key={it.id}
          text={it.text}
          buttonId={`${id}-${it.id}`}
          isSelected={false}
        />
      ))}
    </ToggleGroup>
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
