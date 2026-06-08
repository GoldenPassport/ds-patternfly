import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Button,
  DataList,
  DataListAction,
  DataListCell,
  DataListCheck,
  DataListContent,
  DataListItem,
  DataListItemCells,
  DataListItemRow,
  DataListToggle,
} from "@patternfly/react-core";
import { CodeBranchIcon } from "@patternfly/react-icons";
import { FoundationPage, Section, Card, CodeBlock, ThemingPointer } from "../../components/StoryKit.js";
import { DemoFrame, PropsTable } from "../../components/DemoKit.js";

const meta: Meta = {
  title: "Components/DataList",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => {
    const [checked, setChecked] = useState<Record<string, boolean>>({});
    const [expanded, setExpanded] = useState<string[]>(["row-1"]);

    const toggleExpand = (id: string) =>
      setExpanded((prev) =>
        prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
      );

    return (
      <FoundationPage
        title="DataList"
        intro={
          <>
            A row-based list with structured cells, optional checkboxes,
            actions, and per-row expandable detail. Use it as the
            pre-Table workhorse — when each row is more than a few
            cells of tabular data but doesn&rsquo;t need a sortable /
            filterable column header chrome. For dense tabular data, use{" "}
            <code>Table</code> from <code>@patternfly/react-table</code>{" "}
            instead.
          </>
        }
      >
        <Section
          title="Basic"
          description="DataList → DataListItem → DataListItemRow → DataListItemCells. Each row needs aria-labelledby pointing at a cell that names it."
        >
          <Card>
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <DemoFrame>
                <DataList aria-label="Basic data list">
                  {[
                    { id: "basic-1", title: "Workflow A", desc: "Triggered hourly · 4 steps" },
                    { id: "basic-2", title: "Workflow B", desc: "Triggered on push · 2 steps" },
                    { id: "basic-3", title: "Workflow C", desc: "Triggered manually · 6 steps" },
                  ].map((r) => (
                    <DataListItem key={r.id} aria-labelledby={r.id}>
                      <DataListItemRow>
                        <DataListItemCells
                          dataListCells={[
                            <DataListCell key="title">
                              <span id={r.id}><strong>{r.title}</strong></span>
                            </DataListCell>,
                            <DataListCell key="desc">{r.desc}</DataListCell>,
                          ]}
                        />
                      </DataListItemRow>
                    </DataListItem>
                  ))}
                </DataList>
              </DemoFrame>
              <CodeBlock>{`<DataList aria-label="Basic data list">
  <DataListItem aria-labelledby="row-id">
    <DataListItemRow>
      <DataListItemCells
        dataListCells={[
          <DataListCell key="title">
            <span id="row-id"><strong>Workflow A</strong></span>
          </DataListCell>,
          <DataListCell key="desc">Triggered hourly · 4 steps</DataListCell>,
        ]}
      />
    </DataListItemRow>
  </DataListItem>
</DataList>`}</CodeBlock>
            </div>
          </Card>
        </Section>

        <Section
          title="With checkboxes + actions"
          description="DataListCheck for per-row selection (use for bulk operations); DataListAction for trailing controls (kebab menu, primary button). Both sit at the row level alongside DataListItemCells."
        >
          <Card>
            <div style={{ padding: 24 }}>
              <DemoFrame>
                <DataList aria-label="Selectable data list">
                  {[
                    { id: "sel-1", title: "Build pipeline" },
                    { id: "sel-2", title: "Test pipeline" },
                    { id: "sel-3", title: "Deploy pipeline" },
                  ].map((r) => (
                    <DataListItem key={r.id} aria-labelledby={r.id}>
                      <DataListItemRow>
                        <DataListCheck
                          aria-labelledby={r.id}
                          name={`check-${r.id}`}
                          isChecked={!!checked[r.id]}
                          onChange={(_e, c) =>
                            setChecked((p) => ({ ...p, [r.id]: c }))
                          }
                        />
                        <DataListItemCells
                          dataListCells={[
                            <DataListCell key="title">
                              <span id={r.id}><strong>{r.title}</strong></span>
                            </DataListCell>,
                            <DataListCell key="desc">Idle · last run 2h ago</DataListCell>,
                          ]}
                        />
                        <DataListAction
                          aria-labelledby={`${r.id} ${r.id}-action`}
                          id={`${r.id}-action`}
                          aria-label="Actions"
                        >
                          <Button variant="primary">Run</Button>
                          <Button variant="secondary">Logs</Button>
                        </DataListAction>
                      </DataListItemRow>
                    </DataListItem>
                  ))}
                </DataList>
              </DemoFrame>
            </div>
          </Card>
        </Section>

        <Section
          title="Expandable"
          description="DataListToggle reveals a DataListContent body under the row. Track expanded ids in state; isExpanded on both the item and toggle keeps them synchronized."
        >
          <Card>
            <div style={{ padding: 24 }}>
              <DemoFrame>
                <DataList aria-label="Expandable data list">
                  {[
                    { id: "row-1", title: "Workflow A", body: "Steps: build → test → deploy → notify" },
                    { id: "row-2", title: "Workflow B", body: "Steps: validate → publish" },
                  ].map((r) => (
                    <DataListItem
                      key={r.id}
                      aria-labelledby={r.id}
                      isExpanded={expanded.includes(r.id)}
                    >
                      <DataListItemRow>
                        <DataListToggle
                          onClick={() => toggleExpand(r.id)}
                          isExpanded={expanded.includes(r.id)}
                          id={`${r.id}-toggle`}
                          aria-controls={`${r.id}-content`}
                        />
                        <DataListItemCells
                          dataListCells={[
                            <DataListCell isIcon key="icon">
                              <CodeBranchIcon />
                            </DataListCell>,
                            <DataListCell key="title">
                              <span id={r.id}><strong>{r.title}</strong></span>
                            </DataListCell>,
                            <DataListCell key="meta">Last run 1h ago</DataListCell>,
                          ]}
                        />
                      </DataListItemRow>
                      <DataListContent
                        aria-label={`${r.title} details`}
                        id={`${r.id}-content`}
                        isHidden={!expanded.includes(r.id)}
                      >
                        <p style={{ margin: 0 }}>{r.body}</p>
                      </DataListContent>
                    </DataListItem>
                  ))}
                </DataList>
              </DemoFrame>
            </div>
          </Card>
        </Section>

        <Section
          title="Compact"
          description="isCompact tightens row padding — use when DataList sits inside a card, drawer, or anywhere with constrained vertical space."
        >
          <Card>
            <div style={{ padding: 24 }}>
              <DemoFrame>
                <DataList aria-label="Compact data list" isCompact>
                  {["Run #1284", "Run #1283", "Run #1282", "Run #1281"].map(
                    (t, i) => (
                      <DataListItem key={i} aria-labelledby={`compact-${i}`}>
                        <DataListItemRow>
                          <DataListItemCells
                            dataListCells={[
                              <DataListCell key="t">
                                <span id={`compact-${i}`}>{t}</span>
                              </DataListCell>,
                              <DataListCell key="d">Succeeded · 1m 42s</DataListCell>,
                            ]}
                          />
                        </DataListItemRow>
                      </DataListItem>
                    ),
                  )}
                </DataList>
              </DemoFrame>
            </div>
          </Card>
        </Section>

        <Section title="Composition">
          <Card>
            <div style={{ padding: 24 }}>
              <PropsTable
                rows={[
                  { name: "DataList", type: "container", description: "Outer wrapper. aria-label is required. isCompact / gridBreakpoint / wrapModifier control layout." },
                  { name: "DataListItem", type: "child", description: "A single row. aria-labelledby required (points at a cell id). isExpanded controls expansion." },
                  { name: "DataListItemRow", type: "child", description: "The visible row chrome. Holds DataListCheck / DataListToggle / DataListItemCells / DataListAction in that order." },
                  { name: "DataListCheck", type: "child", description: "Per-row checkbox (selection)." },
                  { name: "DataListToggle", type: "child", description: "Expand/collapse caret. Pair with isExpanded on the parent DataListItem and aria-controls pointing at DataListContent.id." },
                  { name: "DataListItemCells", type: "child", description: "The row's cell array (passed via the dataListCells prop, not as children)." },
                  { name: "DataListCell", type: "child", description: "A single cell. Optional isIcon / isFilled / alignRight / width modifiers." },
                  { name: "DataListAction", type: "child", description: "Trailing action slot — kebab menus, primary buttons. aria-labelledby points at the row id + action id." },
                  { name: "DataListContent", type: "child", description: "Body revealed by DataListToggle. id required (paired with the toggle's aria-controls). isHidden mirrors the expanded state." },
                ]}
              />
            </div>
          </Card>
        </Section>

        <Section title="Most-used DataList props">
          <Card>
            <div style={{ padding: 24 }}>
              <PropsTable
                rows={[
                  { name: "aria-label", type: "string", description: "Required — names the list." },
                  { name: "isCompact", type: "boolean", description: "Tighter row padding." },
                  { name: "wrapModifier", type: '"nowrap" | "truncate" | "breakWord"', description: "How long cell content wraps inside cells." },
                  { name: "gridBreakpoint", type: '"none" | "always" | "sm" | "md" | "lg" | "xl" | "2xl"', description: "Below this breakpoint, cells stack vertically (responsive layout)." },
                  { name: "selectedDataListItemId", type: "string", description: "Used with onSelectableRowChange / single-select rows. Activates the selected-row styling on the matching DataListItem.id." },
                  { name: "onSelectableRowChange", type: "(event, id) => void", description: "Single-select row handler — pair with isSelectable on each DataListItemRow + DataListItem.id." },
                ]}
              />
            </div>
          </Card>
        </Section>

        <Section title="DataList vs Table">
          <Card>
            <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
              <li><strong>DataList</strong> — flexible row layout, per-row expand, freeform cell content. No column headers, no sorting / filtering chrome. Use for moderate data volumes (≤ a few hundred rows) with rich per-row content.</li>
              <li><strong>Table</strong> (from <code>@patternfly/react-table</code>) — column headers, sortable / filterable / selectable rows, sticky-header support, virtualisation. Use for tabular data, large volumes, or when the user needs to re-sort by column.</li>
              <li><strong>SimpleList</strong> — single-line items only, light selection model. For navigation lists / pickers, not data display.</li>
            </ul>
          </Card>
        </Section>

        <Section title="Accessibility">
          <Card>
            <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
              <li><strong>Every row needs <code>aria-labelledby</code></strong> pointing at a cell id that names it. Without this, screen readers announce "list item" with no context.</li>
              <li><strong>DataListAction needs a compound aria-labelledby</strong> — &ldquo;<code>{`{rowId} {actionId}`}</code>&rdquo; — so the action button announces both the row identity and the action group.</li>
              <li><strong>Expand toggle needs <code>aria-controls</code></strong> matching the DataListContent.id, and the content's <code>isHidden</code> needs to reflect the actual visibility.</li>
              <li><strong>Use <code>DataListCheck.aria-labelledby</code></strong> pointing at the row id so the checkbox announces what it selects.</li>
            </ul>
          </Card>
        </Section>
        <ThemingPointer
          dials={[
            ["--gp-border-subtle", "Row dividers."],
            ["--gp-surface-card", "Row background."],
            ["--gp-focus-ring", "Selectable-row focus-ring."],
          ]}
        />
      </FoundationPage>
    );
  },
};
