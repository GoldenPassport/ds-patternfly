/**
 * ListManager (@patternfly/react-component-groups) — a reusable selectable +
 * reorderable list, the visible body of a column-management or preferences
 * modal. Embed it inline (e.g. inside a Drawer) when you don't want the full
 * ColumnManagementModal.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 *
 * Note: ListManager's drag-and-drop overlay portals into
 * `document.getElementById("root")` — make sure your app mounts in a
 * `<div id="root">` (the typical Vite / CRA default).
 */
import { useState } from "react";
import ListManager, {
  type ListManagerItem,
} from "@patternfly/react-component-groups/dist/dynamic/ListManager";

// Mirrors PF6's canonical ColumnExample for ListManager
// (https://www.patternfly.org/component-groups/helpers/list-manager).
// `isShown` in the upstream sample maps to `isSelected` on the installed
// ListManagerItem — same semantic.
const DEFAULT_COLUMNS: ListManagerItem[] = [
  { key: "id",          title: "ID",           isShownByDefault: true,  isSelected: true,  isUntoggleable: true },
  { key: "publishDate", title: "Publish date", isShownByDefault: true,  isSelected: true },
  { key: "impact",      title: "Impact",       isShownByDefault: true,  isSelected: true },
  { key: "score",       title: "Score",        isShownByDefault: false, isSelected: false },
];

// #region ColumnExample
export function ColumnExample() {
  const [columns, setColumns] = useState(DEFAULT_COLUMNS);

  return (
    <ListManager
      columns={columns}
      enableDragDrop
      onOrderChange={setColumns}
      onSelect={(col) =>
        setColumns((prev) =>
          prev.map((c) =>
            c.key === col.key ? { ...c, isSelected: !!col.isSelected } : c,
          ),
        )
      }
      onSelectAll={(newColumns) => setColumns(newColumns)}
      onSave={(newColumns) => {
        setColumns(newColumns);
        alert("Changes saved!");
      }}
      onCancel={() => alert("Changes cancelled!")}
    />
  );
}
// #endregion

export default function ListManagerExample() {
  return <ColumnExample />;
}
