/**
 * Bulk selection pattern — the toolbar + select-all + per-row checkbox
 * triplet for "select many, act on many" lists.
 *
 * BulkSelect comes from @patternfly/react-component-groups (installed
 * alongside the lib).
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useId, useState } from "react";
import {
  Button,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
  Tr,
} from "@golden-passport/ds-patternfly";
import BulkSelect, { BulkSelectValue } from "@patternfly/react-component-groups/dist/dynamic/BulkSelect";

type Workflow = { id: string; name: string; status: string };
const ROWS: Workflow[] = Array.from({ length: 14 }).map((_, i) => ({
  id: `wf-${i + 1}`,
  name: `Workflow ${i + 1}`,
  status: ["Active", "Paused", "Failed"][i % 3] ?? "Active",
}));
const PAGE = 5;

// #region FullPattern
export function FullPattern() {
  const toolbarId = useId();
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const start = (page - 1) * PAGE;
  const pageRows = ROWS.slice(start, start + PAGE);
  const pageSelectedCount = pageRows.filter((r) => selected.has(r.id)).length;
  const pageSelected = pageSelectedCount === pageRows.length;
  const pagePartial = pageSelectedCount > 0 && !pageSelected;

  const onBulk = (v: BulkSelectValue) => {
    setSelected((p) => {
      const next = new Set(p);
      switch (v) {
        case "all":
          ROWS.forEach((r) => next.add(r.id));
          break;
        case "none":
          next.clear();
          break;
        case "page":
          pageRows.forEach((r) => next.add(r.id));
          break;
        case "nonePage":
          pageRows.forEach((r) => next.delete(r.id));
          break;
      }
      return next;
    });
  };

  const toggleRow = (id: string) =>
    setSelected((p) => {
      const next = new Set(p);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <>
      <Toolbar id={`${toolbarId}-bulk-toolbar`}>
        <ToolbarContent>
          <ToolbarItem>
            <BulkSelect
              isDataPaginated
              canSelectAll
              pageCount={pageRows.length}
              totalCount={ROWS.length}
              selectedCount={selected.size}
              pageSelected={pageSelected}
              pagePartiallySelected={pagePartial}
              onSelect={onBulk}
            />
          </ToolbarItem>
          {selected.size > 0 && (
            <>
              <ToolbarItem variant="separator" />
              <ToolbarItem>
                <Button variant="secondary">Run {selected.size}</Button>
              </ToolbarItem>
              <ToolbarItem>
                <Button variant="danger">Delete {selected.size}</Button>
              </ToolbarItem>
            </>
          )}
          <ToolbarItem align={{ default: "alignEnd" }}>
            <Button variant="link" onClick={() => setPage((p) => (p < 3 ? p + 1 : 1))}>
              Page {page} of 3 →
            </Button>
          </ToolbarItem>
        </ToolbarContent>
      </Toolbar>
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
                  onSelect: () => toggleRow(r.id),
                  isSelected: selected.has(r.id),
                }}
              />
              <Td dataLabel="Name">{r.name}</Td>
              <Td dataLabel="Status">{r.status}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
}
// #endregion

export default function BulkSelectionExample() {
  return <FullPattern />;
}
