import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  FoundationPage,
  Section,
  Card,
  ConfigurationSection,
  Example,
} from "../_kit/StoryKit.js";
import { ListAndDetail } from "../../examples/patterns/PrimaryDetail.example.js";
import primaryDetailExampleSrc from "../../examples/patterns/PrimaryDetail.example.tsx?raw";
import primaryDetailComponentSrc from "../../components/ds/PrimaryDetailLayout.tsx?raw";

const meta: Meta = {
  title: "Patterns/Primary-detail",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Primary-detail"
      intro={
        <>
          A two-pane layout — a list of items on the leading edge (the
          primary), a content view on the trailing edge (the detail).
          Collapses to a single column with a &ldquo;back to list&rdquo;
          affordance below the <code>md</code> breakpoint. The headline
          pattern for record-browsing UIs: inbox, settings, user lists.
          <br /><br />
          See the live demo under <strong>Patterns / Primary-detail / Demo</strong>{" "}
          for an interactive example built from the lib&rsquo;s{" "}
          <code>PrimaryDetailLayout</code> component.
        </>
      }
    >
      <Section
        title="Shape"
        description="PrimaryDetailLayout takes a generic items array, a renderListItem function, a renderDetail function, and controlled selection."
      >
        <Card>
          <Example
            source={primaryDetailExampleSrc}
            region="ListAndDetail"
            fileName="PrimaryDetail.example.tsx"
          >
            <ListAndDetail />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example
            source={primaryDetailExampleSrc}
            fileName="PrimaryDetail.example.tsx"
          />
        </Card>
      </Section>

      <Section title="Rules">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Controlled selection.</strong> Track <code>selectedId</code> in the parent — typically synced to <code>?id=…</code> in the URL so direct-link / back-button work.</li>
            <li><strong>List is scrollable independently.</strong> Don&rsquo;t bind it to the page scroll — long detail content shouldn&rsquo;t push the list out of view.</li>
            <li><strong>Empty detail.</strong> When nothing is selected, render an EmptyState with a clear instruction (&ldquo;Select an item to see details&rdquo;) rather than a blank pane.</li>
            <li><strong>Responsive collapse.</strong> Below <code>md</code>, show list OR detail (not both). On detail, the &ldquo;back to list&rdquo; button returns to the list view.</li>
            <li><strong>Sort + filter in the list pane.</strong> The list&rsquo;s toolbar is the right home for filters — the detail pane stays focused on the selected item.</li>
          </ul>
        </Card>
      </Section>

      <ConfigurationSection
        importStatement={'import { PrimaryDetailLayout, primaryDetailLayoutEnLabels } from "@golden-passport/ds-patternfly";'}
        componentSource={primaryDetailComponentSrc}
        componentFileName="PrimaryDetailLayout.tsx"
        rows={[
          { name: "items*", type: "readonly T[]", description: "The collection rendered in the primary (list) pane." },
          { name: "getItemId*", type: "(item: T) => string", description: "Stable id for an item — used as the React key and selection identity." },
          { name: "selectedId*", type: "string | null", description: "Currently selected item id. null means \"no selection\" — the detail pane renders an EmptyState." },
          { name: "onSelect*", type: "(id: string) => void", description: "Called when the user selects an item (click / Enter / Space). Keep selection in the parent, typically URL-synced." },
          { name: "renderListItem*", type: "(item: T, isSelected: boolean) => ReactNode", description: "Renders a single item in the list pane. Wrap your content however you like." },
          { name: "renderDetail*", type: "(item: T) => ReactNode", description: "Renders the detail pane for the selected item." },
          { name: "labels*", type: "PrimaryDetailLayoutLabels", description: "i18n contract — listAriaLabel, detailAriaLabel, backToList, emptyDetailTitle, emptyDetailBody. Provide primaryDetailLayoutEnLabels or a translated object." },
        ]}
      />

      <Section title="Accessibility">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>List + detail are both required regions.</strong> Pass <code>listAriaLabel</code> and <code>detailAriaLabel</code> through the <code>labels</code> prop — they map to ARIA landmarks.</li>
            <li><strong>Selection announces.</strong> The detail pane&rsquo;s heading changes on select; pair with focus management so keyboard users land on the detail without re-Tabbing.</li>
            <li><strong>Back to list button</strong> below <code>md</code> needs to be Tab-reachable on the first focusable position of the detail view.</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
