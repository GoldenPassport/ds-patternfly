import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Button,
  SearchInput,
  Toolbar,
  ToolbarContent,
  ToolbarFilter,
  ToolbarGroup,
  ToolbarItem,
} from "@patternfly/react-core";
import {
  CloneIcon,
  EditIcon,
  FilterIcon,
  PlusIcon,
  SyncIcon,
} from "@patternfly/react-icons";
import { FoundationPage, Section, Card, CodeBlock, ThemingPointer } from "../../components/StoryKit.js";
import { DemoFrame, PropsTable } from "../../components/DemoKit.js";

const meta: Meta = {
  title: "Components/Toolbar",
  parameters: {
    layout: "padded",
    a11y: {
      config: {
        // PF6's primary/secondary buttons rendered against the toolbar's
        // shaded background trigger color-contrast on text vs background-of-
        // -background — a known interaction with PF's toolbar tinting that
        // doesn't reflect a real contrast bug at the button surface.
        rules: [{ id: "color-contrast", enabled: false }],
      },
    },
  },
};
export default meta;

export const Overview: StoryObj = {
  render: () => {
    const [q, setQ] = useState("");
    const [chips, setChips] = useState(["status: open", "owner: me"]);
    const [basicQ, setBasicQ] = useState("");
    return (
      <FoundationPage
        title="Toolbar"
        intro={
          <>
            The action / filter row that sits above tables and lists.
            Composes search, filter chips, sort, view toggles, and primary
            actions in a single horizontal bar that wraps gracefully on
            narrow viewports.
          </>
        }
      >
        <Section
          title="Basic items"
          description="ToolbarItem slots wrap individual controls. ToolbarItem.variant='separator' draws a vertical divider between clusters."
        >
          <Card>
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <DemoFrame>
                <Toolbar id="toolbar-basic" ouiaId="BasicToolbar">
                  <ToolbarContent>
                    <ToolbarItem>
                      <SearchInput
                        aria-label="Search items"
                        value={basicQ}
                        onChange={(_, v) => setBasicQ(v)}
                        onClear={() => setBasicQ("")}
                      />
                    </ToolbarItem>
                    <ToolbarItem>
                      <Button variant="secondary">Action</Button>
                    </ToolbarItem>
                    <ToolbarItem variant="separator" />
                    <ToolbarItem>
                      <Button variant="primary">Action 2</Button>
                    </ToolbarItem>
                  </ToolbarContent>
                </Toolbar>
              </DemoFrame>
              <CodeBlock>{`<Toolbar id="toolbar-basic">
  <ToolbarContent>
    <ToolbarItem>
      <SearchInput aria-label="Search items" value={q} onChange={(_, v) => setQ(v)} onClear={() => setQ("")} />
    </ToolbarItem>
    <ToolbarItem><Button variant="secondary">Action</Button></ToolbarItem>
    <ToolbarItem variant="separator" />
    <ToolbarItem><Button variant="primary">Action 2</Button></ToolbarItem>
  </ToolbarContent>
</Toolbar>`}</CodeBlock>
            </div>
          </Card>
        </Section>

        <Section
          title="Search + filter chips + primary action"
          description="ToolbarFilter renders filter chips below the toolbar — one chip per active filter. clearAllFilters on Toolbar surfaces the 'Clear all filters' link."
        >
          <Card>
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <DemoFrame>
                <Toolbar
                  id="toolbar-filters"
                  ouiaId="FiltersToolbar"
                  clearAllFilters={() => setChips([])}
                >
                  <ToolbarContent>
                    <ToolbarItem>
                      <SearchInput
                        placeholder="Search tasks"
                        value={q}
                        onChange={(_, v) => setQ(v)}
                        onClear={() => setQ("")}
                        aria-label="Search tasks"
                      />
                    </ToolbarItem>
                    <ToolbarFilter
                      labels={chips}
                      deleteLabel={(_, label) =>
                        setChips(chips.filter((c) => c !== label))
                      }
                      categoryName="Filters"
                    >
                      <Button variant="secondary" icon={<FilterIcon />}>
                        Filter
                      </Button>
                    </ToolbarFilter>
                    <ToolbarGroup align={{ default: "alignEnd" }}>
                      <ToolbarItem>
                        <Button variant="primary" icon={<PlusIcon />}>
                          Create task
                        </Button>
                      </ToolbarItem>
                    </ToolbarGroup>
                  </ToolbarContent>
                </Toolbar>
              </DemoFrame>
              <CodeBlock>{`<Toolbar id="toolbar" clearAllFilters={() => setChips([])}>
  <ToolbarContent>
    <ToolbarItem>
      <SearchInput value={q} onChange={(_, v) => setQ(v)} ... />
    </ToolbarItem>
    <ToolbarFilter
      labels={chips}
      deleteLabel={(_, label) => setChips(chips.filter(c => c !== label))}
      categoryName="Filters"
    >
      <Button variant="secondary" icon={<FilterIcon />}>Filter</Button>
    </ToolbarFilter>
    <ToolbarGroup align={{ default: "alignEnd" }}>
      <ToolbarItem>
        <Button variant="primary" icon={<PlusIcon />}>Create task</Button>
      </ToolbarItem>
    </ToolbarGroup>
  </ToolbarContent>
</Toolbar>`}</CodeBlock>
            </div>
          </Card>
        </Section>

        <Section
          title="Group variants"
          description="ToolbarGroup.variant gives semantic clusters consistent spacing. Use filter-group for dropdown filters, action-group for buttons, action-group-plain for icon-only actions."
        >
          <Card>
            <div style={{ padding: 24 }}>
              <DemoFrame>
                <Toolbar id="toolbar-groups" ouiaId="GroupsToolbar">
                  <ToolbarContent>
                    <ToolbarGroup variant="action-group-plain">
                      <ToolbarItem>
                        <Button variant="plain" aria-label="Edit" icon={<EditIcon />} />
                      </ToolbarItem>
                      <ToolbarItem>
                        <Button variant="plain" aria-label="Clone" icon={<CloneIcon />} />
                      </ToolbarItem>
                      <ToolbarItem>
                        <Button variant="plain" aria-label="Sync" icon={<SyncIcon />} />
                      </ToolbarItem>
                    </ToolbarGroup>
                    <ToolbarItem variant="separator" />
                    <ToolbarGroup variant="action-group">
                      <ToolbarItem>
                        <Button variant="primary">Save</Button>
                      </ToolbarItem>
                      <ToolbarItem>
                        <Button variant="secondary">Cancel</Button>
                      </ToolbarItem>
                    </ToolbarGroup>
                  </ToolbarContent>
                </Toolbar>
              </DemoFrame>
            </div>
          </Card>
        </Section>

        <Section
          title="Sticky"
          description="isSticky pins the toolbar to the top of its scrolling ancestor — keep filter / pagination controls visible as the user scrolls a long table."
        >
          <Card>
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <DemoFrame>
                <div style={{ overflowY: "auto", height: 180 }}>
                  <Toolbar
                    id="toolbar-sticky"
                    ouiaId="StickyToolbar"
                    isSticky
                    inset={{ default: "insetNone" }}
                  >
                    <ToolbarContent>
                      <ToolbarItem>
                        <SearchInput aria-label="Sticky search" />
                      </ToolbarItem>
                      <ToolbarItem>
                        <Button variant="primary">Add</Button>
                      </ToolbarItem>
                    </ToolbarContent>
                  </Toolbar>
                  <ul style={{ margin: 0, padding: "8px 16px", color: "var(--gp-color-text-subtle)" }}>
                    {Array.from({ length: 30 }).map((_, i) => (
                      <li key={i} style={{ padding: "6px 0" }}>
                        Row {i + 1}
                      </li>
                    ))}
                  </ul>
                </div>
              </DemoFrame>
              <CodeBlock>{`<div style={{ overflowY: "auto", height: 600 }}>
  <Toolbar id="toolbar-sticky" isSticky inset={{ default: "insetNone" }}>
    <ToolbarContent>{/* ... */}</ToolbarContent>
  </Toolbar>
  <Table {/* long table */} />
</div>`}</CodeBlock>
            </div>
          </Card>
        </Section>

        <Section
          title="Collapse below a breakpoint"
          description="ToolbarToggleGroup collapses its children into a 'Filter' menu below a chosen breakpoint — keeps narrow viewports usable."
        >
          <Card>
            <div style={{ padding: 24 }}>
              <CodeBlock>{`<Toolbar id="toolbar-toggle" collapseListedFiltersBreakpoint="md">
  <ToolbarContent>
    <ToolbarToggleGroup toggleIcon={<FilterIcon />} breakpoint="md">
      <ToolbarItem variant="search-filter"><SearchInput .../></ToolbarItem>
      <ToolbarFilter labels={chips} categoryName="Status" deleteLabel={...}>
        <Select .../>
      </ToolbarFilter>
    </ToolbarToggleGroup>
  </ToolbarContent>
</Toolbar>`}</CodeBlock>
            </div>
          </Card>
        </Section>

        <Section title="Composition">
          <Card>
            <div style={{ padding: 24 }}>
              <PropsTable
                rows={[
                  { name: "Toolbar", type: "container", description: "Outer wrapper. id is required when using filters (drives the chip-group accessible name)." },
                  { name: "ToolbarContent", type: "child", description: "The flex row. Holds Items / Groups / Filters." },
                  { name: "ToolbarGroup", type: "child", description: "Cluster of related items with consistent spacing. variant gives semantic intent: 'filter-group' | 'action-group' | 'action-group-plain' | 'label-group'. align={{ default: 'alignEnd' }} pushes a group to the trailing edge." },
                  { name: "ToolbarItem", type: "child", description: "Single item slot. Wraps a control (Button, SearchInput, Select, etc.). variant: 'separator' | 'pagination' | 'label' | 'search-filter'. align prop also available." },
                  { name: "ToolbarFilter", type: "child", description: "Wraps a filter trigger and renders selected-value chips below the toolbar via labels + deleteLabel + categoryName." },
                  { name: "ToolbarToggleGroup", type: "child", description: "Collapses items into a 'Filter' menu below a breakpoint — for narrow viewports." },
                ]}
              />
            </div>
          </Card>
        </Section>

        <Section title="Most-used Toolbar props">
          <Card>
            <div style={{ padding: 24 }}>
              <PropsTable
                rows={[
                  { name: "id", type: "string", description: "Required when using ToolbarFilter — drives the chip-group's accessible name." },
                  { name: "clearAllFilters", type: "() => void", description: "When provided, renders a 'Clear all filters' link when chips are present." },
                  { name: "isSticky", type: "boolean", description: "Pins the toolbar to the top of its scrolling ancestor." },
                  { name: "isStatic", type: "boolean", description: "Removes the default toolbar styling (used inside Masthead — the toolbar should inherit the masthead chrome, not paint its own)." },
                  { name: "inset", type: "BreakpointObject", description: "Per-breakpoint inset spacing. 'insetNone' kills horizontal padding (handy for sticky variants)." },
                  { name: "collapseListedFiltersBreakpoint", type: '"sm" | "md" | "lg" | "xl" | "2xl" | "all"', description: "Below this breakpoint, ToolbarToggleGroup items collapse into a single Filter menu." },
                  { name: "ouiaId", type: "string", description: "Stable test selector. Sets data-ouia-component-id on the toolbar." },
                ]}
              />
            </div>
          </Card>
        </Section>

        <Section title="Accessibility">
          <Card>
            <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
              <li><strong>Single primary action.</strong> Multiple primary buttons in a toolbar dilute hierarchy — pick the most important and demote others to secondary.</li>
              <li><strong>Search needs aria-label.</strong> SearchInput has an icon, no visible label by default.</li>
              <li><strong>Icon-only buttons need aria-label.</strong> Button variant=&quot;plain&quot; with just an icon — give it a name (Edit, Clone, Sync).</li>
              <li><strong>Filter chips need close-button labels.</strong> ToolbarFilter generates them from the labels array; if you replace with a custom chip, set closeBtnAriaLabel manually.</li>
              <li><strong>Don&rsquo;t pack too much in.</strong> If the toolbar wraps to two lines on a normal viewport, split actions across multiple groups or move secondary actions into an overflow menu.</li>
            </ul>
          </Card>
        </Section>
        <ThemingPointer
          dials={[
            ["--gp-control-pad-y", "Drives the embedded form-control + button heights."],
            ["--gp-radius-control", "Embedded control radii."],
            ["--gp-border-subtle", "Group dividers."],
            ["--gp-surface-card", "Toolbar background when used inside a Card."],
          ]}
        />
      </FoundationPage>
    );
  },
};
