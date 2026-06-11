/**
 * DataViewTable (@patternfly/react-data-view) — the table renderer for Data
 * view. Accepts `columns` + `rows` arrays, handles selection wiring, and
 * dispatches head / body content for loading / empty / error states.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import {
  DataView,
  DataViewTable,
  useDataViewSelection,
} from "@patternfly/react-data-view";
import { Label } from "../_lib.js";

type Workflow = { id: string; name: string; status: "Active" | "Paused" | "Failed"; owner: string };

const ROWS: Workflow[] = [
  { id: "wf-1", name: "Quarterly review",   status: "Active", owner: "ada" },
  { id: "wf-2", name: "Nightly build",      status: "Active", owner: "grace" },
  { id: "wf-3", name: "Backup pipeline",    status: "Paused", owner: "ada" },
  { id: "wf-4", name: "Audit export",       status: "Failed", owner: "linus" },
];

const statusColor = (s: Workflow["status"]) =>
  s === "Active" ? "green" : s === "Paused" ? "grey" : "red";

// #region SelectableTable
export function SelectableTable() {
  const selection = useDataViewSelection({
    matchOption: (a: Workflow, b: Workflow) => a.id === b.id,
  });

  const columns = [
    { cell: "Name",   props: { width: 40 as const } },
    { cell: "Status", props: { width: 20 as const } },
    { cell: "Owner",  props: { width: 20 as const } },
  ];

  const rows = ROWS.map((r) => ({
    id: r.id,
    row: [
      <strong>{r.name}</strong>,
      <Label color={statusColor(r.status)} isCompact>
        {r.status}
      </Label>,
      r.owner,
    ],
  }));

  return (
    <>
      <DataView selection={selection}>
        <DataViewTable
          aria-label="Workflows"
          columns={columns}
          rows={rows}
        />
      </DataView>
      <p style={{ marginTop: 8, color: "var(--gp-color-text-subtle)", fontSize: 13 }}>
        Selected: <strong>{selection.selected.length}</strong> row(s)
      </p>
    </>
  );
}
// #endregion

export default function DataViewTableExample() {
  return <SelectableTable />;
}
