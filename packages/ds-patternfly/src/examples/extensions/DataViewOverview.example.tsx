/**
 * DataView (@patternfly/react-data-view) — a pre-wired Table + Toolbar +
 * Pagination + Selection package. The hooks (useDataViewSelection,
 * useDataViewPagination, useDataViewSort) own the state and produce the
 * props each piece expects.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useId } from "react";
import {
  DataView,
  DataViewTable,
  DataViewToolbar,
  useDataViewPagination,
  useDataViewSelection,
} from "@patternfly/react-data-view";
import { Pagination } from "@golden-passport/ds-patternfly";

type Workflow = { id: string; name: string; status: string; owner: string };

const ALL: Workflow[] = Array.from({ length: 23 }).map((_, i) => ({
  id: `wf-${i + 1}`,
  name: `Workflow ${i + 1}`,
  status: ["Active", "Paused", "Failed"][i % 3] ?? "Active",
  owner: ["ada", "grace", "linus"][i % 3] ?? "ada",
}));

// #region ComposedDataView
export function ComposedDataView() {
  const id = useId();
  const pagination = useDataViewPagination({ perPage: 5 });
  const selection = useDataViewSelection({
    matchOption: (a: Workflow, b: Workflow) => a.id === b.id,
  });

  const start = (pagination.page - 1) * pagination.perPage;
  const pageRows = ALL.slice(start, start + pagination.perPage);

  const columns = ["Name", "Status", "Owner"];
  const rows = pageRows.map((r) => ({
    id: r.id,
    row: [r.name, r.status, r.owner],
  }));

  return (
    <DataView selection={selection}>
      <DataViewToolbar
        pagination={
          <Pagination
            itemCount={ALL.length}
            page={pagination.page}
            perPage={pagination.perPage}
            onSetPage={pagination.onSetPage}
            onPerPageSelect={pagination.onPerPageSelect}
            widgetId={`${id}-pagination`}
            isCompact
          />
        }
      />
      <DataViewTable
        aria-label="Workflows data view"
        columns={columns}
        rows={rows}
      />
    </DataView>
  );
}
// #endregion

export default function DataViewOverviewExample() {
  return <ComposedDataView />;
}
