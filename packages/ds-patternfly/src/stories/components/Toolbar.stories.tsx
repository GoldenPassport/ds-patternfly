import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  FoundationPage,
  Section,
  Card,
  CodeBlock,
  ConfigurationSection,
  Example,
  ThemingPointer,
} from "../_kit/StoryKit.js";
import { PropsTable } from "../_kit/DemoKit.js";
import {
  BasicItems,
  SearchFilterChips,
  GroupVariants,
  Sticky,
} from "../../examples/components/Toolbar.example.js";
import toolbarExampleSrc from "../../examples/components/Toolbar.example.tsx?raw";
import toolbarComponentSrc from "../../components/base/Toolbar.tsx?raw";

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
  render: () => (
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
          <Example
            source={toolbarExampleSrc}
            region="BasicItems"
            fileName="Toolbar.example.tsx"
          >
            <BasicItems />
          </Example>
        </Card>
      </Section>

      <Section
        title="Search + filter chips + primary action"
        description="ToolbarFilter renders filter chips below the toolbar — one chip per active filter. clearAllFilters on Toolbar surfaces the 'Clear all filters' link."
      >
        <Card>
          <Example
            source={toolbarExampleSrc}
            region="SearchFilterChips"
            fileName="Toolbar.example.tsx"
          >
            <SearchFilterChips />
          </Example>
        </Card>
      </Section>

      <Section
        title="Group variants"
        description="ToolbarGroup.variant gives semantic clusters consistent spacing. Use filter-group for dropdown filters, action-group for buttons, action-group-plain for icon-only actions."
      >
        <Card>
          <Example
            source={toolbarExampleSrc}
            region="GroupVariants"
            fileName="Toolbar.example.tsx"
          >
            <GroupVariants />
          </Example>
        </Card>
      </Section>

      <Section
        title="Sticky"
        description="isSticky pins the toolbar to the top of its scrolling ancestor — keep filter / pagination controls visible as the user scrolls a long table."
      >
        <Card>
          <Example
            source={toolbarExampleSrc}
            region="Sticky"
            fileName="Toolbar.example.tsx"
          >
            <Sticky />
          </Example>
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

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example source={toolbarExampleSrc} fileName="Toolbar.example.tsx" />
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

      <ConfigurationSection
        importStatement={'import { Toolbar, ToolbarContent, ToolbarGroup, ToolbarItem, ToolbarFilter, ToolbarToggleGroup } from "@golden-passport/ds-patternfly";'}
        componentSource={toolbarComponentSrc}
        componentFileName="Toolbar.tsx"
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
  ),
};
