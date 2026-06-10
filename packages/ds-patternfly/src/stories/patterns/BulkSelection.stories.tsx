import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Button,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
} from "@patternfly/react-core";
import {
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@patternfly/react-table";
import BulkSelect, { BulkSelectValue } from "@patternfly/react-component-groups/dist/dynamic/BulkSelect";
import { FoundationPage, Section, Card, CodeBlock } from "../_kit/StoryKit.js";
import { DemoFrame, PropsTable } from "../_kit/DemoKit.js";

const meta: Meta = {
  title: "Patterns/Bulk selection",
  parameters: {
    layout: "padded",
    a11y: {
      // BulkSelect renders a MenuToggle that confuses contrast resolver.
      config: { rules: [{ id: "color-contrast", enabled: false }] },
    },
  },
};
export default meta;

type Workflow = { id: string; name: string; status: string };
const ROWS: Workflow[] = Array.from({ length: 14 }).map((_, i) => ({
  id: `wf-${i + 1}`,
  name: `Workflow ${i + 1}`,
  status: ["Active", "Paused", "Failed"][i % 3] ?? "Active",
}));
const PAGE = 5;

export const Overview: StoryObj = {
  render: () => {
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
      <FoundationPage
        title="Bulk selection"
        intro={
          <>
            The standard toolbar + checkbox triplet for &ldquo;select many,
            act on many&rdquo;. One BulkSelect dropdown for select-all /
            select-page / clear; per-row checkboxes for granular pick;
            bulk-action buttons in the toolbar that only appear when
            selection is non-empty.
          </>
        }
      >
        <Section
          title="Full pattern"
          description="BulkSelect drives header state; rows expose per-row checkboxes; toolbar renders bulk actions when count > 0."
        >
          <Card>
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <DemoFrame>
                <Toolbar id="bulk-toolbar">
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
              </DemoFrame>
              <CodeBlock>{`<Toolbar>
  <ToolbarContent>
    <ToolbarItem>
      <BulkSelect
        isDataPaginated
        canSelectAll
        pageCount={pageRows.length}
        totalCount={total}
        selectedCount={selected.size}
        pageSelected={allPageSelected}
        pagePartiallySelected={somePageSelected}
        onSelect={handleBulk}
      />
    </ToolbarItem>
    {selected.size > 0 && (
      <>
        <ToolbarItem><Button variant="secondary">Run {selected.size}</Button></ToolbarItem>
        <ToolbarItem><Button variant="danger">Delete {selected.size}</Button></ToolbarItem>
      </>
    )}
  </ToolbarContent>
</Toolbar>`}</CodeBlock>
            </div>
          </Card>
        </Section>

        <Section title="Rules">
          <Card>
            <div style={{ padding: 24 }}>
              <PropsTable
                rows={[
                  { name: "selection state", type: "Set<id>", description: "Track selected IDs at the page level so they survive pagination / refetch." },
                  { name: "bulk actions visibility", type: "conditional", description: "Render bulk-action buttons only when count > 0. Hidden actions reduce visual noise when nothing's selected." },
                  { name: "destructive bulks", type: "WarningModal", description: "Bulk delete / bulk disable goes through a confirmation. The count appears in the body ('Delete 12 workflows?') so users can sanity-check before committing." },
                  { name: "selection across pages", type: "explicit", description: "When selectedCount > pageCount, surface a 'X selected across N pages' banner with a 'Clear selection' link." },
                  { name: "stable IDs", type: "stable", description: "Sort / filter must not mutate row IDs — otherwise selection breaks across pagination." },
                ]}
              />
            </div>
          </Card>
        </Section>

        <Section title="Accessibility">
          <Card>
            <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
              <li><strong>Announce count changes</strong> in a polite live region — &ldquo;3 rows selected&rdquo;. Without it, blind users don&rsquo;t know bulk-select worked.</li>
              <li><strong>The per-row checkbox needs context.</strong> Th.select for the all-row header + Td.select for each row — PF6 wires the aria-labels automatically.</li>
              <li><strong>Destructive bulk actions</strong> need typed-confirm for catastrophic counts (e.g. &ldquo;Delete 1,000 workflows&rdquo;). Use WarningModal&rsquo;s <code>confirmationText</code>.</li>
            </ul>
          </Card>
        </Section>
      </FoundationPage>
    );
  },
};
