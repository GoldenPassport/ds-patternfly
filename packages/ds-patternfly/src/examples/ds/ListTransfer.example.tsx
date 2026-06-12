/**
 * ListTransfer — the dual list selector: move items between an Available and
 * a Chosen pane. Controlled by the two partitions; the component owns the
 * per-item selection + move logic.
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
  type ListTransferLabels,
  type TransferItem,
} from "../_lib.js";

const LABELS: ListTransferLabels = {
  ...listTransferEnLabels,
  availableTitle: "Available permissions",
  chosenTitle: "Granted permissions",
};

// #region Permissions
export function Permissions() {
  const [available, setAvailable] = useState<TransferItem[]>([
    { id: "read", text: "Read tasks" },
    { id: "write", text: "Write tasks" },
    { id: "delete", text: "Delete tasks" },
    { id: "members", text: "Manage members" },
    { id: "billing", text: "Manage billing" },
  ]);
  const [chosen, setChosen] = useState<TransferItem[]>([
    { id: "read-wf", text: "Read workflows" },
  ]);

  return (
    <ListTransfer
      labels={LABELS}
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

export default function ListTransferExample() {
  return <Permissions />;
}
