/**
 * Table — tabular data with sortable, selectable, and expandable rows,
 * plus the standard Toolbar + Pagination composition.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useId, useMemo, useState } from "react";
import {
  Button,
  Label,
  Pagination,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
  Tr,
  type ISortBy,
} from "../_lib.js";

type Workflow = {
  id: string;
  name: string;
  status: "Active" | "Paused" | "Failed";
  owner: string;
  runs: number;
  lastRun: string;
};

const ROWS: Workflow[] = [
  { id: "wf-1", name: "Quarterly review",   status: "Active", owner: "ada",  runs: 142, lastRun: "12m ago" },
  { id: "wf-2", name: "Nightly build",      status: "Active", owner: "grace", runs: 921, lastRun: "5h ago" },
  { id: "wf-3", name: "Backup pipeline",    status: "Paused", owner: "ada",  runs: 47,  lastRun: "3d ago" },
  { id: "wf-4", name: "Audit export",       status: "Failed", owner: "linus", runs: 3,   lastRun: "1d ago" },
  { id: "wf-5", name: "Index rebuilder",    status: "Active", owner: "grace", runs: 88,  lastRun: "2h ago" },
  { id: "wf-6", name: "Notify on incident", status: "Active", owner: "linus", runs: 14,  lastRun: "1h ago" },
];

const statusColor = (s: Workflow["status"]) =>
  s === "Active" ? "green" : s === "Paused" ? "grey" : "red";

// #region Basic
export function Basic() {
  return (
    <Table aria-label="Workflows" variant="compact">
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Status</Th>
          <Th>Owner</Th>
          <Th>Runs</Th>
          <Th>Last run</Th>
        </Tr>
      </Thead>
      <Tbody>
        {ROWS.map((r) => (
          <Tr key={r.id}>
            <Td dataLabel="Name"><strong>{r.name}</strong></Td>
            <Td dataLabel="Status">
              <Label color={statusColor(r.status)} isCompact>{r.status}</Label>
            </Td>
            <Td dataLabel="Owner">{r.owner}</Td>
            <Td dataLabel="Runs">{r.runs}</Td>
            <Td dataLabel="Last run">{r.lastRun}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
// #endregion

// #region Sortable
export function Sortable() {
  const [sortBy, setSortBy] = useState<ISortBy>({ index: 1, direction: "asc" });
  const sorted = useMemo(() => {
    const cols: (keyof Workflow)[] = ["id", "name", "status", "owner", "runs"];
    const key = cols[sortBy.index ?? 1] ?? "name";
    const dir = sortBy.direction === "desc" ? -1 : 1;
    return [...ROWS].sort((a, b) => {
      const av = a[key];
      const bv = b[key];
      if (typeof av === "number" && typeof bv === "number") return (av - bv) * dir;
      return String(av).localeCompare(String(bv)) * dir;
    });
  }, [sortBy]);

  return (
    <Table aria-label="Sortable workflows" variant="compact">
      <Thead>
        <Tr>
          <Th sort={{ sortBy, onSort: (_e, i, dir) => setSortBy({ index: i, direction: dir }), columnIndex: 0 }}>ID</Th>
          <Th sort={{ sortBy, onSort: (_e, i, dir) => setSortBy({ index: i, direction: dir }), columnIndex: 1 }}>Name</Th>
          <Th sort={{ sortBy, onSort: (_e, i, dir) => setSortBy({ index: i, direction: dir }), columnIndex: 2 }}>Status</Th>
          <Th sort={{ sortBy, onSort: (_e, i, dir) => setSortBy({ index: i, direction: dir }), columnIndex: 3 }}>Owner</Th>
          <Th sort={{ sortBy, onSort: (_e, i, dir) => setSortBy({ index: i, direction: dir }), columnIndex: 4 }}>Runs</Th>
        </Tr>
      </Thead>
      <Tbody>
        {sorted.map((r) => (
          <Tr key={r.id}>
            <Td dataLabel="ID">{r.id}</Td>
            <Td dataLabel="Name">{r.name}</Td>
            <Td dataLabel="Status"><Label color={statusColor(r.status)} isCompact>{r.status}</Label></Td>
            <Td dataLabel="Owner">{r.owner}</Td>
            <Td dataLabel="Runs">{r.runs}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
// #endregion

// #region Selectable
export function Selectable() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const allSelected = selected.size === ROWS.length;
  const someSelected = selected.size > 0 && !allSelected;
  const toggleAll = () =>
    setSelected(allSelected ? new Set() : new Set(ROWS.map((r) => r.id)));
  const toggleRow = (id: string) =>
    setSelected((p) => {
      const n = new Set(p);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });

  return (
    <>
      <Table aria-label="Selectable workflows" variant="compact">
        <Thead>
          <Tr>
            <Th
              select={{
                onSelect: (_e, isSelecting) => {
                  if (isSelecting) toggleAll();
                  else setSelected(new Set());
                },
                isSelected: allSelected,
                isHeaderSelectDisabled: false,
              }}
              aria-label="Select all rows"
            />
            <Th>Name</Th>
            <Th>Status</Th>
            <Th>Owner</Th>
          </Tr>
        </Thead>
        <Tbody>
          {ROWS.map((r, rowIndex) => (
            <Tr key={r.id}>
              <Td
                select={{
                  rowIndex,
                  onSelect: () => toggleRow(r.id),
                  isSelected: selected.has(r.id),
                }}
              />
              <Td dataLabel="Name">{r.name}</Td>
              <Td dataLabel="Status">
                <Label color={statusColor(r.status)} isCompact>{r.status}</Label>
              </Td>
              <Td dataLabel="Owner">{r.owner}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <p style={{ marginTop: 8, color: "var(--gp-color-text-subtle)", fontSize: 13 }}>
        {selected.size === 0 ? "No rows selected." : `${selected.size} row(s) selected${someSelected ? " (partial)" : ""}.`}
      </p>
    </>
  );
}
// #endregion

// #region ExpandableRows
export function ExpandableRows() {
  const id = useId();
  const [expanded, setExpanded] = useState<Set<string>>(new Set(["wf-2"]));
  const toggleExpand = (rowId: string) =>
    setExpanded((p) => {
      const n = new Set(p);
      if (n.has(rowId)) n.delete(rowId);
      else n.add(rowId);
      return n;
    });

  return (
    <Table aria-label="Expandable workflows" variant="compact" isExpandable>
      <Thead>
        <Tr>
          <Th screenReaderText="Row expansion" />
          <Th>Name</Th>
          <Th>Status</Th>
          <Th>Owner</Th>
        </Tr>
      </Thead>
      {ROWS.slice(0, 3).map((r, rowIndex) => (
        <Tbody key={r.id} isExpanded={expanded.has(r.id)}>
          <Tr>
            <Td
              expand={{
                rowIndex,
                isExpanded: expanded.has(r.id),
                onToggle: () => toggleExpand(r.id),
                expandId: `${id}-${r.id}-expand`,
              }}
            />
            <Td dataLabel="Name">{r.name}</Td>
            <Td dataLabel="Status">
              <Label color={statusColor(r.status)} isCompact>{r.status}</Label>
            </Td>
            <Td dataLabel="Owner">{r.owner}</Td>
          </Tr>
          <Tr isExpanded={expanded.has(r.id)}>
            <Td colSpan={4}>
              <div style={{ padding: 12, color: "var(--gp-color-text-subtle)" }}>
                <strong>{r.runs}</strong> total runs · last run{" "}
                <strong>{r.lastRun}</strong> · drop the run history
                table here.
              </div>
            </Td>
          </Tr>
        </Tbody>
      ))}
    </Table>
  );
}
// #endregion

// #region WithToolbarAndPagination
export function WithToolbarAndPagination() {
  const id = useId();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const paged = ROWS.slice((page - 1) * perPage, page * perPage);

  return (
    <>
      <Toolbar id={`${id}-toolbar`}>
        <ToolbarContent>
          <ToolbarItem>
            <strong style={{ color: "var(--gp-color-text-regular)" }}>
              Workflows ({ROWS.length})
            </strong>
          </ToolbarItem>
          <ToolbarItem variant="separator" />
          <ToolbarItem>
            <Button variant="primary">Create</Button>
          </ToolbarItem>
          <ToolbarItem align={{ default: "alignEnd" }}>
            <Pagination
              itemCount={ROWS.length}
              page={page}
              perPage={perPage}
              onSetPage={(_e, p) => setPage(p)}
              onPerPageSelect={(_e, pp, p) => {
                setPerPage(pp);
                setPage(p);
              }}
              widgetId={`${id}-table-top`}
              isCompact
            />
          </ToolbarItem>
        </ToolbarContent>
      </Toolbar>
      <Table aria-label="Toolbar workflows" variant="compact">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Status</Th>
            <Th>Owner</Th>
            <Th>Runs</Th>
            <Th>Last run</Th>
          </Tr>
        </Thead>
        <Tbody>
          {paged.map((r) => (
            <Tr key={r.id}>
              <Td dataLabel="Name">{r.name}</Td>
              <Td dataLabel="Status">
                <Label color={statusColor(r.status)} isCompact>{r.status}</Label>
              </Td>
              <Td dataLabel="Owner">{r.owner}</Td>
              <Td dataLabel="Runs">{r.runs}</Td>
              <Td dataLabel="Last run">{r.lastRun}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
}
// #endregion

export default function TableExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <Basic />
      <Sortable />
      <Selectable />
      <ExpandableRows />
      <WithToolbarAndPagination />
    </div>
  );
}
