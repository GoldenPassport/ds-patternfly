/**
 * ColumnManagementModal (@patternfly/react-component-groups) — a pre-built
 * modal for showing / hiding table columns, with untoggleable "always-on"
 * columns and optional drag-and-drop reorder.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useState } from "react";
import ColumnManagementModal, {
  type ColumnManagementModalColumn,
} from "@patternfly/react-component-groups/dist/dynamic/ColumnManagementModal";
import { Button } from "../_lib.js";

const initial: ColumnManagementModalColumn[] = [
  { key: "name",    title: "Name",    isShown: true,  isShownByDefault: true,  isUntoggleable: true },
  { key: "status",  title: "Status",  isShown: true,  isShownByDefault: true },
  { key: "owner",   title: "Owner",   isShown: true,  isShownByDefault: true },
  { key: "created", title: "Created", isShown: false, isShownByDefault: false },
  { key: "updated", title: "Updated", isShown: false, isShownByDefault: false },
  { key: "tags",    title: "Tags",    isShown: false, isShownByDefault: false },
];

// #region ToggleColumns
export function ToggleColumns() {
  const [open, setOpen] = useState(false);
  const [cols, setCols] = useState(initial);

  return (
    <>
      <div style={{ display: "grid", gap: 8 }}>
        <Button onClick={() => setOpen(true)}>Manage columns</Button>
        <p style={{ margin: 0, color: "var(--gp-color-text-subtle)", fontSize: 13 }}>
          Currently visible:{" "}
          {cols.filter((c) => c.isShown).map((c) => c.title).join(", ")}
        </p>
      </div>
      <ColumnManagementModal
        isOpen={open}
        onClose={() => setOpen(false)}
        appliedColumns={cols}
        applyColumns={(next) => {
          setCols(next);
          setOpen(false);
        }}
        title="Manage columns"
        description="Pick which columns appear in the workflows table."
      />
    </>
  );
}
// #endregion

export default function ColumnManagementModalExample() {
  return <ToggleColumns />;
}
