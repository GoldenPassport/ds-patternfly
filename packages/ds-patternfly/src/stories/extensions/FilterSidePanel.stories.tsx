import type { Meta, StoryObj } from "@storybook/react-vite";
import { FoundationPage, Section, Card, Example } from "../_kit/StoryKit.js";
import { PropsTable } from "../_kit/DemoKit.js";
import { TwoCategories } from "../../examples/extensions/FilterSidePanel.example.js";
import filterSidePanelExampleSrc from "../../examples/extensions/FilterSidePanel.example.tsx?raw";

const meta: Meta = {
  title: "Extensions/Catalog view/Filter side panel",
  parameters: {
    layout: "padded",
    a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } },
  },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Filter side panel"
      intro={
        <>
          The left rail of facet checkboxes for a catalog page — vendor,
          type, status, region. Pair <code>FilterSidePanel</code> with one
          or more <code>FilterSidePanelCategory</code> blocks; each
          category has a Show-X-more affordance baked in.
        </>
      }
    >
      <Section
        title="Two categories"
        description="Each category groups related facet checkboxes. State is owned by the parent — the items are controlled."
      >
        <Card>
          <Example
            source={filterSidePanelExampleSrc}
            region="TwoCategories"
            fileName="FilterSidePanel.example.tsx"
          >
            <TwoCategories />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example
            source={filterSidePanelExampleSrc}
            fileName="FilterSidePanel.example.tsx"
          />
        </Card>
      </Section>

      <Section title="Most-used FilterSidePanelCategory props">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "title", type: "string | ReactNode", description: "Category heading." },
                { name: "maxShowCount", type: "number", description: "Render only the first N items; the rest collapse behind a 'Show X more' link." },
                { name: "leeway", type: "number", description: "Minimum N for the 'Show X more' link to appear (so a 4-with-cap-of-3 stays expanded)." },
                { name: "showAll", type: "boolean", description: "Controlled override — true to force expanded state." },
                { name: "onShowAllToggle", type: "(event) => void", description: "Fired when the user toggles Show more / Show less." },
                { name: "showText / hideText", type: "string", description: "Localize the Show / Hide labels." },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section title="Most-used FilterSidePanelCategoryItem props">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "checked", type: "boolean", description: "Controlled checkbox state." },
                { name: "onClick", type: "(event) => void", description: "Toggle handler." },
                { name: "count", type: "number", description: "Optional count of matching items, rendered as a trailing chip." },
                { name: "icon", type: "ReactNode", description: "Optional leading icon (e.g. provider logo)." },
                { name: "children", type: "ReactNode", description: "Item label." },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section title="Accessibility">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Wrap the panel in a labelled landmark</strong> (<code>&lt;aside aria-label=&quot;Filters&quot;&gt;</code>) so screen-reader users can jump to it directly.</li>
            <li><strong>Update the result count live.</strong> When a checkbox toggles, announce &ldquo;Showing 23 results&rdquo; in a polite live region — without it, blind users don&rsquo;t know the filter applied.</li>
            <li><strong>Localize Show-more strings.</strong> <code>showText</code> defaults to English (&ldquo;Show 3 more&rdquo;); pass your locale&rsquo;s strings.</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
