import type { Meta, StoryObj } from "@storybook/react-vite";
import { FoundationPage, Section, Card, Example } from "../_kit/StoryKit.js";
import { PropsTable } from "../_kit/DemoKit.js";
import { PaginatedList } from "../../examples/component-groups/BulkSelect.example.js";
import bulkSelectExampleSrc from "../../examples/component-groups/BulkSelect.example.tsx?raw";

const meta: Meta = {
  title: "Component groups/Controls/Bulk select",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Bulk select"
      intro={
        <>
          A toolbar dropdown for selecting all items, none, or just the
          current page — wraps a <code>Dropdown</code> + a checkbox
          toggle and emits the user&rsquo;s choice as a typed value. Use it
          above any selectable list / table that paginates.
        </>
      }
    >
      <Section
        title="Paginated list"
        description="When `isDataPaginated` is set, the menu offers Select all (entire dataset), Select page (this page only), and Deselect variants."
      >
        <Card>
          <Example
            source={bulkSelectExampleSrc}
            region="PaginatedList"
            fileName="BulkSelect.example.tsx"
          >
            <PaginatedList />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example source={bulkSelectExampleSrc} fileName="BulkSelect.example.tsx" />
        </Card>
      </Section>

      <Section title="Most-used props">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "selectedCount", type: "number", description: "Required — drives the checkbox state and the visible count label." },
                { name: "totalCount", type: "number", description: "Total across all pages. Required when `canSelectAll` is set." },
                { name: "pageCount", type: "number", description: "Items on the current page. Required when `isDataPaginated`." },
                { name: "pageSelected", type: "boolean", description: "True when every visible row is selected — toggles the checkbox to checked." },
                { name: "pagePartiallySelected", type: "boolean", description: "True when some (but not all) visible rows are selected — renders the indeterminate dash." },
                { name: "isDataPaginated", type: "boolean", description: "Adds the page-aware menu options (Select page, Deselect page)." },
                { name: "canSelectAll", type: "boolean", description: "Show the Select all (entire dataset) option." },
                { name: "onSelect", type: "(value: 'all' | 'none' | 'page' | 'nonePage') => void", description: "Required — handle each menu choice. Use the exported `BulkSelectValue` enum for type safety." },
                { name: "menuToggleCheckboxProps", type: "object", description: "Pass-through to the inner MenuToggleCheckbox (e.g. aria-label override)." },
                { name: "ouiaId", type: "string", description: "Stable test selector." },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section title="Accessibility">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>The checkbox toggle has an aria-label by default,</strong> but if you localize the toolbar, override it via <code>menuToggleCheckboxProps</code>.</li>
            <li><strong>Pair with a live region.</strong> When the user picks &ldquo;Select all&rdquo; on a 5,000-row dataset, announce the count change so screen readers don&rsquo;t silently miss it.</li>
            <li><strong>Keep `selectedCount` consistent</strong> with the actual checked rows in your table — the count shown in the toolbar is the user&rsquo;s only feedback that bulk-select worked.</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
