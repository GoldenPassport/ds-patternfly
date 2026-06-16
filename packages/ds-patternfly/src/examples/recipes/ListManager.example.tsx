/**
 * ListManager recipe — the lib's exported page scaffold for a managed
 * collection: a PageHeader, a toolbar row (FilterToolbar + BulkSelectToolbar
 * left, Pagination right), the list body, and footer pagination. ListManager
 * owns the layout; you bring the pieces and the data.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useState } from "react";
import {
  BulkSelectToolbar,
  bulkSelectToolbarEnLabels,
  Button,
  FilterToolbar,
  filterToolbarEnLabels,
  ListManager,
  PageHeader,
  Pagination,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  type FilterDef,
} from "@golden-passport/ds-patternfly";

type Workflow = { id: string; name: string; status: string };
const ALL: Workflow[] = Array.from({ length: 23 }).map((_, i) => ({
  id: `wf-${i + 1}`,
  name: `Workflow ${i + 1}`,
  status: ["Active", "Paused", "Failed"][i % 3] ?? "Active",
}));
const FILTERS: FilterDef[] = [
  {
    key: "status",
    label: "Status",
    options: [
      { value: "Active", label: "Active" },
      { value: "Paused", label: "Paused" },
      { value: "Failed", label: "Failed" },
    ],
  },
];

// #region ManagedTable
export function ManagedTable() {
  const [search, setSearch] = useState("");
  const [values, setValues] = useState<Record<string, string[]>>({});
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const statuses = values.status ?? [];
  const filtered = ALL.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) &&
      (statuses.length === 0 || statuses.includes(r.status)),
  );
  const start = (page - 1) * perPage;
  const pageRows = filtered.slice(start, start + perPage);
  const pageSelectedCount = pageRows.filter((r) => selected.has(r.id)).length;

  const setMany = (ids: string[], on: boolean) =>
    setSelected((prev) => {
      const next = new Set(prev);
      ids.forEach((id) => (on ? next.add(id) : next.delete(id)));
      return next;
    });

  return (
    <ListManager
      header={
        <PageHeader
          title="Workflows"
          subtitle="Manage triggers, runs, and history."
          actions={<Button variant="primary">Create</Button>}
        />
      }
      toolbar={
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", alignItems: "center" }}>
          <BulkSelectToolbar
            labels={bulkSelectToolbarEnLabels}
            selectedCount={selected.size}
            totalCount={filtered.length}
            pageCount={pageRows.length}
            pageSelected={pageSelectedCount === pageRows.length && pageRows.length > 0}
            pagePartiallySelected={pageSelectedCount > 0 && pageSelectedCount < pageRows.length}
            onSelectAll={() => setMany(filtered.map((r) => r.id), true)}
            onSelectPage={() => setMany(pageRows.map((r) => r.id), true)}
            onSelectNone={() => setSelected(new Set())}
            actions={<Button variant="danger">Delete {selected.size}</Button>}
          />
          <FilterToolbar
            labels={filterToolbarEnLabels}
            searchValue={search}
            onSearchChange={(v) => {
              setSearch(v);
              setPage(1);
            }}
            filters={FILTERS}
            values={values}
            onChange={(key, next) => {
              setValues((v) => ({ ...v, [key]: next }));
              setPage(1);
            }}
            onClearAll={() => {
              setSearch("");
              setValues({});
            }}
          />
        </div>
      }
      toolbarEnd={
        <Pagination
          titles={{ paginationAriaLabel: "Workflows pagination (top)" }}
          itemCount={filtered.length}
          page={page}
          perPage={perPage}
          onSetPage={(_e, p) => setPage(p)}
          onPerPageSelect={(_e, pp) => {
            setPerPage(pp);
            setPage(1);
          }}
          isCompact
        />
      }
      footer={
        <Pagination
          titles={{ paginationAriaLabel: "Workflows pagination (bottom)" }}
          itemCount={filtered.length}
          page={page}
          perPage={perPage}
          onSetPage={(_e, p) => setPage(p)}
          onPerPageSelect={(_e, pp) => {
            setPerPage(pp);
            setPage(1);
          }}
          variant="bottom"
        />
      }
    >
      <Table aria-label="Workflows" variant="compact">
        <Thead>
          <Tr>
            <Th screenReaderText="Row select" />
            <Th>Name</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {pageRows.map((r, rowIndex) => (
            <Tr key={r.id}>
              <Td
                select={{
                  rowIndex,
                  onSelect: () => setMany([r.id], !selected.has(r.id)),
                  isSelected: selected.has(r.id),
                }}
              />
              <Td dataLabel="Name">{r.name}</Td>
              <Td dataLabel="Status">{r.status}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </ListManager>
  );
}
// #endregion

export default function ListManagerExample() {
  return <ManagedTable />;
}
