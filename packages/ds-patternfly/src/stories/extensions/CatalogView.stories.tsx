import type { Meta, StoryObj } from "@storybook/react-vite";
import { FoundationPage, Section, Card, Example } from "../_kit/StoryKit.js";
import { PropsTable } from "../_kit/DemoKit.js";
import { TileGrid } from "../../examples/extensions/CatalogView.example.js";
import catalogViewExampleSrc from "../../examples/extensions/CatalogView.example.tsx?raw";

const meta: Meta = {
  title: "Extensions/Catalog view/Catalog view",
  parameters: {
    layout: "padded",
    a11y: {
      // The catalog tile uses positioned overlays + gradients that confuse
      // axe's contrast resolver; tokens.test.ts validates real contrast.
      config: { rules: [{ id: "color-contrast", enabled: false }] },
    },
  },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Catalog view"
      intro={
        <>
          A grid of selectable / linkable cards for catalogs — services,
          plugins, marketplace items. The pattern combines{" "}
          <code>CatalogTile</code> (the card), <code>CatalogItemHeader</code>{" "}
          (in-detail header), <code>FilterSidePanel</code> (left-rail facets),
          <code>PropertiesSidePanel</code> (right-rail metadata), and{" "}
          <code>VerticalTabs</code> (left-rail nav). All from{" "}
          <code>@patternfly/react-catalog-view-extension</code>.
        </>
      }
    >
      <Section
        title="Tile grid"
        description="Pair CatalogTile with a responsive Gallery — each tile is independently focusable and linkable."
      >
        <Card>
          <Example
            source={catalogViewExampleSrc}
            region="TileGrid"
            fileName="CatalogView.example.tsx"
          >
            <TileGrid />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example source={catalogViewExampleSrc} fileName="CatalogView.example.tsx" />
        </Card>
      </Section>

      <Section title="Pieces of a catalog page">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>CatalogTile</strong> — the card itself. Title, vendor, description, optional icon, badges, footer. Behaves as a link when <code>href</code> is set.</li>
            <li><strong>CatalogItemHeader</strong> — the page header on a single-item detail view (icon + title + vendor). Use when you click a tile and land on its detail page.</li>
            <li><strong>FilterSidePanel</strong> — left rail of facet checkboxes (vendor, type, status). Pairs with <code>FilterSidePanelCategory</code> + <code>FilterSidePanelCategoryItem</code>.</li>
            <li><strong>PropertiesSidePanel</strong> — right rail of metadata (version, support, expires-on) on a detail page. Pairs with <code>PropertyItem</code>.</li>
            <li><strong>VerticalTabs</strong> — left rail of sub-navigation (Overview / Configuration / Permissions). Pairs with <code>VerticalTabsTab</code>.</li>
          </ul>
        </Card>
      </Section>

      <Section title="Most-used CatalogTile props">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "title", type: "string | ReactNode", description: "Tile title — required." },
                { name: "description", type: "string | ReactNode", description: "Body text. Truncates at the tile boundary." },
                { name: "vendor", type: "string | ReactNode", description: "Subtitle / provider line (e.g. 'Provided by Acme')." },
                { name: "icon", type: "ReactNode", description: "Custom icon node (alternative to iconImg / iconClass)." },
                { name: "iconImg", type: "string", description: "URL of an icon image." },
                { name: "iconClass", type: "string", description: "CSS class for a font-icon (exclusive with iconImg)." },
                { name: "iconAlt", type: "string", description: "Alt text for iconImg." },
                { name: "href", type: "string", description: "Destination URL. Renders the tile as an anchor." },
                { name: "onClick", type: "(event) => void", description: "Click handler. Use href + onClick together to instrument analytics." },
                { name: "featured", type: "boolean", description: "Required — flag the tile as featured (highlighted)." },
                { name: "isSelected", type: "boolean", description: "Selected visual state. Pair with onClick for picker UIs." },
                { name: "badges", type: "ReactNode[]", description: "Trailing badges (e.g. CatalogTileBadge with a star / lock icon)." },
                { name: "footer", type: "string | ReactNode", description: "Bottom slot — link, install button, price tag." },
              ]}
            />
          </div>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
