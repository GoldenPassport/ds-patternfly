import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  FoundationPage,
  Section,
  Card,
  ConfigurationSection,
  Example,
  ThemingPointer,
} from "../_kit/StoryKit.js";
import { PropsTable } from "../_kit/DemoKit.js";
import {
  Basic,
  Sortable,
  Selectable,
  ExpandableRows,
  WithToolbarAndPagination,
} from "../../examples/components/Table.example.js";
import tableExampleSrc from "../../examples/components/Table.example.tsx?raw";
import tableComponentSrc from "../../components/base/Table.tsx?raw";

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

export const Overview: StoryObj = {
  render: () => (
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
          <Example
            source={tableExampleSrc}
            region="Basic"
            fileName="Table.example.tsx"
          >
            <Basic />
          </Example>
        </Card>
      </Section>

      <Section
        title="Sortable"
        description="Pass `sort={{ sortBy, onSort, columnIndex }}` on each Th. PF6 manages the sort glyph + aria-sort; you handle the data sort."
      >
        <Card>
          <Example
            source={tableExampleSrc}
            region="Sortable"
            fileName="Table.example.tsx"
          >
            <Sortable />
          </Example>
        </Card>
      </Section>

      <Section
        title="Selectable"
        description="Th.select on the header for the all-rows checkbox; Td.select on each row for per-row. Track selection state externally."
      >
        <Card>
          <Example
            source={tableExampleSrc}
            region="Selectable"
            fileName="Table.example.tsx"
          >
            <Selectable />
          </Example>
        </Card>
      </Section>

      <Section
        title="Expandable rows"
        description="Wrap each row + its expanded content in a Tbody with isExpanded; the Td.expand toggle drives state."
      >
        <Card>
          <Example
            source={tableExampleSrc}
            region="ExpandableRows"
            fileName="Table.example.tsx"
          >
            <ExpandableRows />
          </Example>
        </Card>
      </Section>

      <Section
        title="With Toolbar + Pagination"
        description="The standard 'real-world' shape — Toolbar above (filters, bulk actions, count), Pagination below."
      >
        <Card>
          <Example
            source={tableExampleSrc}
            region="WithToolbarAndPagination"
            fileName="Table.example.tsx"
          >
            <WithToolbarAndPagination />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example source={tableExampleSrc} fileName="Table.example.tsx" />
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

      <ConfigurationSection
        importStatement={'import { Table, Thead, Tbody, Tr, Th, Td, ActionsColumn, type ISortBy } from "@golden-passport/ds-patternfly";'}
        componentSource={tableComponentSrc}
        componentFileName="Table.tsx"
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
  ),
};
