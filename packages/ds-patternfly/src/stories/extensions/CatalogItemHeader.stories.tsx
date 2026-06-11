import type { Meta, StoryObj } from "@storybook/react-vite";
import { FoundationPage, Section, Card, Example } from "../_kit/StoryKit.js";
import { PropsTable } from "../_kit/DemoKit.js";
import { Default, CustomNodes } from "../../examples/extensions/CatalogItemHeader.example.js";
import catalogItemHeaderExampleSrc from "../../examples/extensions/CatalogItemHeader.example.tsx?raw";

const meta: Meta = {
  title: "Extensions/Catalog view/Catalog item header",
  parameters: {
    layout: "padded",
    a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } },
  },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Catalog item header"
      intro={
        <>
          The page header for a single catalog item — large icon, title,
          vendor line. Render it at the top of the catalog item&rsquo;s
          detail page so users know what they clicked into.
        </>
      }
    >
      <Section title="Default">
        <Card>
          <Example
            source={catalogItemHeaderExampleSrc}
            region="Default"
            fileName="CatalogItemHeader.example.tsx"
          >
            <Default />
          </Example>
        </Card>
      </Section>

      <Section
        title="With a custom icon node"
        description="Pass a React node as title / vendor when you need composed content (badges, links, status pills)."
      >
        <Card>
          <Example
            source={catalogItemHeaderExampleSrc}
            region="CustomNodes"
            fileName="CatalogItemHeader.example.tsx"
          >
            <CustomNodes />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example source={catalogItemHeaderExampleSrc} fileName="CatalogItemHeader.example.tsx" />
        </Card>
      </Section>

      <Section title="Most-used props">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "title", type: "string | ReactNode", description: "Required — page title." },
                { name: "vendor", type: "string | ReactNode", description: "Subtitle / provider line." },
                { name: "iconImg", type: "string", description: "URL for an icon image." },
                { name: "iconClass", type: "string", description: "CSS class for a font icon (exclusive with iconImg)." },
                { name: "className", type: "string", description: "Additional class on the wrapper." },
              ]}
            />
            <p style={{ marginTop: 16, marginBottom: 0, color: "var(--gp-color-text-subtle)", fontSize: 14 }}>
              CatalogItemHeader does not provide a slot for actions — render
              your install / launch button as a separate sibling next to the
              header.
            </p>
          </div>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
