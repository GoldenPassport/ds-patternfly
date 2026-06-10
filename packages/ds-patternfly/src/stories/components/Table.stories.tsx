import { useMemo, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  type ISortBy,
} from "@golden-passport/ds-patternfly";
import {
  Button,
  Label,
  ToolbarItem,
  Toolbar,
  ToolbarContent,
  Pagination,
} from "@golden-passport/ds-patternfly";
import { FoundationPage, Section, Card, CodeBlock, ThemingPointer } from "../_kit/StoryKit.js";
import { DemoFrame, PropsTable } from "../_kit/DemoKit.js";

const meta: Meta = {
  title: "Components/Table",
  parameters: {
    layout: "padded",
    a11y: {
      // Multiple Tables on the same documentation page can produce
      // duplicate landmark / unique-id warnings; brand-token contrast
      // is validated by tokens.test.ts.
      config: {
        rules: [
          { id: "color-contrast", enabled: false },
          { id: "landmark-unique", enabled: false },
        ],
      },
    },
  },
};
export default meta;

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

export const Overview: StoryObj = {
  render: () => {
    /* basic + sort */
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

    /* selectable */
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

    /* expandable */
    const [expanded, setExpanded] = useState<Set<string>>(new Set(["wf-2"]));
    const toggleExpand = (id: string) =>
      setExpanded((p) => {
        const n = new Set(p);
        if (n.has(id)) n.delete(id);
        else n.add(id);
        return n;
      });

    /* pagination */
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(5);
    const paged = ROWS.slice((page - 1) * perPage, page * perPage);

    return (
      <FoundationPage
        title="Table"
        intro={
          <>
            The PF6 workhorse for tabular data — sortable, selectable,
            expandable, sticky-headerable. Lives in{" "}
            <code>@patternfly/react-table</code> (separate package from{" "}
            <code>@patternfly/react-core</code>). Use Table for tabular
            data with column headers and any kind of column-level
            interaction; reach for <code>DataList</code> when each row
            is more like a card than a row of cells.
          </>
        }
      >
        <Section
          title="Basic"
          description="Table → Thead → Tr → Th, then Tbody → Tr → Td. aria-label is required at the Table level so screen readers can announce the table."
        >
          <Card>
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <DemoFrame>
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
              </DemoFrame>
              <CodeBlock>{`<Table aria-label="Workflows" variant="compact">
  <Thead>
    <Tr>
      <Th>Name</Th>
      <Th>Status</Th>
    </Tr>
  </Thead>
  <Tbody>
    {rows.map(r => (
      <Tr key={r.id}>
        <Td dataLabel="Name">{r.name}</Td>
        <Td dataLabel="Status">{r.status}</Td>
      </Tr>
    ))}
  </Tbody>
</Table>`}</CodeBlock>
            </div>
          </Card>
        </Section>

        <Section
          title="Sortable"
          description="Pass `sort={{ sortBy, onSort, columnIndex }}` on each Th. PF6 manages the sort glyph + aria-sort; you handle the data sort."
        >
          <Card>
            <div style={{ padding: 24 }}>
              <DemoFrame>
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
              </DemoFrame>
            </div>
          </Card>
        </Section>

        <Section
          title="Selectable"
          description="Th.select on the header for the all-rows checkbox; Td.select on each row for per-row. Track selection state externally."
        >
          <Card>
            <div style={{ padding: 24 }}>
              <DemoFrame>
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
              </DemoFrame>
            </div>
          </Card>
        </Section>

        <Section
          title="Expandable rows"
          description="Wrap each row + its expanded content in a Tbody with isExpanded; the Td.expand toggle drives state."
        >
          <Card>
            <div style={{ padding: 24 }}>
              <DemoFrame>
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
                            expandId: `${r.id}-expand`,
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
              </DemoFrame>
            </div>
          </Card>
        </Section>

        <Section
          title="With Toolbar + Pagination"
          description="The standard 'real-world' shape — Toolbar above (filters, bulk actions, count), Pagination below."
        >
          <Card>
            <div style={{ padding: 24 }}>
              <DemoFrame>
                <Toolbar id="wf-toolbar">
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
                        widgetId="wf-table-top"
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
              </DemoFrame>
            </div>
          </Card>
        </Section>

        <Section title="Composition">
          <Card>
            <div style={{ padding: 24 }}>
              <PropsTable
                rows={[
                  { name: "Table", type: "container", description: "Outer <table>. Owns variant, borders, isStickyHeader, isStriped, isExpandable. aria-label is required." },
                  { name: "Thead", type: "child", description: "<thead> wrapper. Holds one or more Tr." },
                  { name: "Tbody", type: "child", description: "<tbody> wrapper. For expandable tables, one Tbody per logical row (parent + expanded body)." },
                  { name: "Tr", type: "child", description: "<tr>. Holds Th (in Thead) or Td (in Tbody). isExpanded mirrors the row's expanded state for animation." },
                  { name: "Th", type: "child", description: "<th>. Most-feature-rich cell — supports sort, select, expand, info tooltip, screen-reader-only text, sticky behaviour." },
                  { name: "Td", type: "child", description: "<td>. dataLabel is the responsive label rendered before the cell content on narrow viewports." },
                  { name: "Caption", type: "child", description: "<caption>. Accessible table summary. Lives directly under Table." },
                  { name: "ActionsColumn", type: "child", description: "Per-row kebab menu — pass items array, the column renders the toggle + dropdown." },
                ]}
              />
            </div>
          </Card>
        </Section>

        <Section title="Most-used Table props">
          <Card>
            <div style={{ padding: 24 }}>
              <PropsTable
                rows={[
                  { name: "aria-label", type: "string", description: "Required — names the table for screen readers." },
                  { name: "variant", type: '"compact" | undefined', description: "compact reduces row padding. Use for dense data screens." },
                  { name: "borders", type: "boolean", description: "Render row borders (default true). Set false for a cleaner, list-like look." },
                  { name: "isStickyHeader", type: "boolean", description: "Pin the header row to the top of its scroll container — pair with a wrapping div that sets max-height + overflow." },
                  { name: "isStriped", type: "boolean", description: "Alternate row backgrounds for easier scanning of long tables. Apply at Tbody / Tr level for finer control." },
                  { name: "isExpandable", type: "boolean", description: "Hint that rows can expand — required for the expand toggle to wire up correctly." },
                  { name: "gridBreakPoint", type: '"" | "grid" | "grid-md" | "grid-lg" | "grid-xl" | "grid-2xl"', description: "Breakpoint below which the table collapses to stacked card rows (each cell labelled by its dataLabel)." },
                  { name: "ouiaId", type: "string | number", description: "Stable test selector." },
                ]}
              />
            </div>
          </Card>
        </Section>

        <Section title="Most-used Th props">
          <Card>
            <div style={{ padding: 24 }}>
              <PropsTable
                rows={[
                  { name: "sort", type: "{ sortBy, onSort, columnIndex }", description: "Make the column sortable. PF6 renders the glyph + aria-sort; your onSort handler updates the sortBy state and the data." },
                  { name: "select", type: "{ onSelect, isSelected, isHeaderSelectDisabled? }", description: "Header checkbox — controls all-rows select state." },
                  { name: "expand", type: "{ areAllExpanded, onToggle, collapseAllAriaLabel }", description: "Header expand toggle — one click expands/collapses every row." },
                  { name: "modifier", type: '"breakWord" | "fitContent" | "nowrap" | "truncate" | "wrap"', description: "Width / overflow behaviour. truncate is most common for fixed-width columns with variable content." },
                  { name: "width", type: "10 | 15 | 20 | 25 | 30 | 35 | 40 | 45 | 50 | 60 | 70 | 80 | 90 | 100", description: "Column width as a percentage." },
                  { name: "isStickyColumn", type: "boolean", description: "Pin this column horizontally. Pair with stickyMinWidth / stickyLeftOffset / stickyRightOffset." },
                  { name: "info", type: "{ tooltip, popover }", description: "Add a help icon next to the column header — opens a tooltip / popover with extra context." },
                  { name: "screenReaderText", type: "string", description: "Hidden label for visually empty header cells (select, expand, kebab). Required so screen readers announce the column." },
                ]}
              />
            </div>
          </Card>
        </Section>

        <Section title="Most-used Td props">
          <Card>
            <div style={{ padding: 24 }}>
              <PropsTable
                rows={[
                  { name: "dataLabel", type: "string", description: "Responsive label — rendered before the cell content when the table collapses to stacked rows. Match the column's Th text." },
                  { name: "select", type: "{ rowIndex, onSelect, isSelected }", description: "Per-row checkbox." },
                  { name: "expand", type: "{ rowIndex, isExpanded, onToggle, expandId }", description: "Per-row expand caret. Pair with a sibling expanded-content Tr inside the same Tbody." },
                  { name: "actions", type: "{ items: IAction[] }", description: "Inline kebab menu for the row. Same shape as ActionsColumn." },
                  { name: "isActionCell", type: "boolean", description: "Strip cell padding / set the right alignment for action columns (kebab, primary CTA)." },
                  { name: "noPadding", type: "boolean", description: "Strip cell padding entirely — useful for cells that own their own layout (e.g. an embedded chart)." },
                  { name: "modifier / width", type: "see Th", description: "Same overflow / width modifiers as Th." },
                ]}
              />
            </div>
          </Card>
        </Section>

        <Section title="Table vs DataList vs SimpleList">
          <Card>
            <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
              <li><strong>Table</strong> — tabular data with column headers. Sortable, selectable, sticky-header, virtualisable. Use for &gt; a few hundred rows or when users need to re-sort by column.</li>
              <li><strong>DataList</strong> — row-as-card layout, freeform per-row content, per-row expand. No column headers. Use when each row is more than a few cells.</li>
              <li><strong>SimpleList</strong> — single-line items only, light selection model. For navigation lists / pickers, not data display.</li>
            </ul>
          </Card>
        </Section>

        <Section title="Accessibility">
          <Card>
            <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
              <li><strong><code>aria-label</code> on Table is required.</strong> Without it, screen readers announce &ldquo;table with N rows&rdquo; with no context.</li>
              <li><strong>Visually-empty headers need <code>screenReaderText</code> or <code>aria-label</code>.</strong> Select / expand / kebab columns are common offenders.</li>
              <li><strong>Sort buttons announce the new direction.</strong> PF6 sets <code>aria-sort</code> automatically once you wire <code>sort</code> on the Th — don&rsquo;t override it.</li>
              <li><strong>Use <code>dataLabel</code> on every Td.</strong> When the table collapses on small screens, dataLabel becomes the visible cell label — without it, cells appear as anonymous values.</li>
              <li><strong>Sticky-header tables need a focusable scroll container</strong> (<code>tabIndex=0</code>) so keyboard users can scroll past the header.</li>
              <li><strong>Bulk-action toolbars should announce selection counts.</strong> Pair the table with a live region that says &ldquo;3 rows selected&rdquo; when the count changes.</li>
            </ul>
          </Card>
        </Section>
        <ThemingPointer
          dials={[
            ["--gp-border-subtle", "Row + header dividers."],
            ["--gp-text-default", "Body cell text."],
            ["--gp-text-subtle", "Header cell text."],
            ["--gp-focus-ring", "Sort + selectable-row focus-ring."],
          ]}
        />
      </FoundationPage>
    );
  },
};
