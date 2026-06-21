/**
 * DualListSelector — two side-by-side lists with controls for moving items
 * between them (permission pickers, role assignment, membership). The exported
 * ListTransfer lego block owns the per-item selection + move logic; you pass
 * the `available` / `chosen` partitions and update them from `onChange`.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useState } from "react";
import {
  ListTransfer,
  listTransferEnLabels,
  type TransferItem,
} from "@golden-passport/ds-patternfly";

// #region Basic
export function Basic() {
  const [available, setAvailable] = useState<TransferItem[]>([
    { id: "read-tasks", text: "Read tasks" },
    { id: "write-tasks", text: "Write tasks" },
    { id: "delete-tasks", text: "Delete tasks" },
    { id: "manage-members", text: "Manage members" },
    { id: "manage-billing", text: "Manage billing" },
  ]);
  const [chosen, setChosen] = useState<TransferItem[]>([
    { id: "read-workflows", text: "Read workflows" },
  ]);

  return (
    <ListTransfer
      labels={listTransferEnLabels}
      available={available}
      chosen={chosen}
      onChange={(next) => {
        setAvailable(next.available);
        setChosen(next.chosen);
      }}
    />
  );
}
// #endregion

export default function DualListSelectorExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <Basic />
    </div>
  );
}
