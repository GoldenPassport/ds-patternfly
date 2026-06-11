/**
 * BulkSelectToolbar recipe — the lib's exported bulk-select bar: a split
 * checkbox + dropdown (all / page / none), a derived "{n} selected" status,
 * and contextual bulk actions. Fully controlled.
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
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "../_lib.js";

type Workflow = { id: string; name: string; status: string };
const ROWS: Workflow[] = Array.from({ length: 5 }).map((_, i) => ({
  id: `wf-${i + 1}`,
  name: `Workflow ${i + 1}`,
  status: ["Active", "Paused", "Failed"][i % 3] ?? "Active",
}));

// #region FullPattern
export function FullPattern() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const pageSelectedCount = ROWS.filter((r) => selected.has(r.id)).length;

  const setMany = (ids: string[], on: boolean) =>
    setSelected((prev) => {
      const next = new Set(prev);
      ids.forEach((id) => (on ? next.add(id) : next.delete(id)));
      return next;
    });

  return (
    <>
      <BulkSelectToolbar
        labels={bulkSelectToolbarEnLabels}
        selectedCount={selected.size}
        totalCount={ROWS.length}
        pageCount={ROWS.length}
        pageSelected={pageSelectedCount === ROWS.length}
        pagePartiallySelected={pageSelectedCount > 0 && pageSelectedCount < ROWS.length}
        onSelectAll={() => setMany(ROWS.map((r) => r.id), true)}
        onSelectPage={() => setMany(ROWS.map((r) => r.id), true)}
        onSelectNone={() => setSelected(new Set())}
        actions={
          <>
            <Button variant="secondary">Run {selected.size}</Button>
            <Button variant="danger">Delete {selected.size}</Button>
          </>
        }
      />
      <Table aria-label="Workflows" variant="compact">
        <Thead>
          <Tr>
            <Th screenReaderText="Row select" />
            <Th>Name</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {ROWS.map((r, rowIndex) => (
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
    </>
  );
}
// #endregion

export default function BulkSelectToolbarExample() {
  return <FullPattern />;
}
