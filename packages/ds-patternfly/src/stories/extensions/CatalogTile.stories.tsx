import type { Meta, StoryObj } from "@storybook/react-vite";
import { FoundationPage, Section, Card, Example } from "../_kit/StoryKit.js";
import { PropsTable } from "../_kit/DemoKit.js";
import {
  FeaturedAndStandard,
  Selectable,
  WithFooter,
} from "../../examples/extensions/CatalogTile.example.js";
import catalogTileExampleSrc from "../../examples/extensions/CatalogTile.example.tsx?raw";

const meta: Meta = {
  title: "Extensions/Catalog view/Catalog tile",
  parameters: {
    layout: "padded",
    a11y: {
      config: {
        rules: [
          { id: "color-contrast", enabled: false },
          { id: "button-name", enabled: false },
        ],
      },
    },
  },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Catalog tile"
      intro={
        <>
          A single tile in a catalog grid — title, vendor, description,
          optional icon, badges, footer. Renders as a link when{" "}
          <code>href</code> is set; renders as a selectable card when paired
          with <code>isSelected</code> + <code>onClick</code>.
        </>
      }
    >
      <Section
        title="Featured + standard"
        description="`featured` is required — set true to highlight an entry-point tile, false for the rest."
      >
        <Card>
          <Example
            source={catalogTileExampleSrc}
            region="FeaturedAndStandard"
            fileName="CatalogTile.example.tsx"
          >
            <FeaturedAndStandard />
          </Example>
        </Card>
      </Section>

      <Section
        title="Selectable"
        description="Use isSelected + onClick (instead of href) to make the tile a picker. Set the focused tile's id on click."
      >
        <Card>
          <Example
            source={catalogTileExampleSrc}
            region="Selectable"
            fileName="CatalogTile.example.tsx"
          >
            <Selectable />
          </Example>
        </Card>
      </Section>

      <Section
        title="With a footer"
        description="The footer slot is the natural home for primary CTAs (Install, Subscribe, Try)."
      >
        <Card>
          <Example
            source={catalogTileExampleSrc}
            region="WithFooter"
            fileName="CatalogTile.example.tsx"
          >
            <WithFooter />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example source={catalogTileExampleSrc} fileName="CatalogTile.example.tsx" />
        </Card>
      </Section>

      <Section title="Most-used CatalogTile props">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "title", type: "string | ReactNode", description: "Required — tile title." },
                { name: "description", type: "string | ReactNode", description: "Body text. Truncates to fit the tile." },
                { name: "vendor", type: "string | ReactNode", description: "Provider / subtitle line." },
                { name: "icon", type: "ReactNode", description: "Custom icon JSX (alternative to iconImg / iconClass)." },
                { name: "iconImg", type: "string", description: "URL for an icon image." },
                { name: "iconAlt", type: "string", description: "Alt text for iconImg." },
                { name: "iconClass", type: "string", description: "CSS class for a font icon (exclusive with iconImg)." },
                { name: "href", type: "string", description: "Renders the tile as an anchor when set." },
                { name: "onClick", type: "(event) => void", description: "Click handler — pair with href + onClick for analytics, or use without href + isSelected for picker UI." },
                { name: "featured", type: "boolean", description: "Required — flag the tile as featured (highlighted)." },
                { name: "isSelected", type: "boolean", description: "Selected visual state for picker UIs." },
                { name: "badges", type: "ReactNode[]", description: "Trailing badges (CatalogTileBadge with icons inside)." },
                { name: "footer", type: "string | ReactNode", description: "Bottom slot — primary CTA, link, price." },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section title="Most-used CatalogTileBadge props">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "children", type: "ReactNode", description: "Typically a PF Icon element." },
                { name: "title", type: "string", description: "Tooltip + accessible name. Required for screen-reader users." },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section title="Accessibility">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Always pass <code>title</code> on CatalogTileBadge</strong> — icons alone aren&rsquo;t announced.</li>
            <li><strong>Use <code>iconAlt</code> with iconImg</strong> if the image carries meaning. For purely decorative product icons, an empty alt is fine — the title carries the accessible name.</li>
            <li><strong>Don&rsquo;t mix link + selectable</strong> in the same grid. Pick one interaction model so users don&rsquo;t guess what clicking does.</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
