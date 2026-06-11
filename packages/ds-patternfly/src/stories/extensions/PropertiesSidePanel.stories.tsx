import type { Meta, StoryObj } from "@storybook/react-vite";
import { FoundationPage, Section, Card, Example } from "../_kit/StoryKit.js";
import { PropsTable } from "../_kit/DemoKit.js";
import { StandardLayout } from "../../examples/extensions/PropertiesSidePanel.example.js";
import propertiesSidePanelExampleSrc from "../../examples/extensions/PropertiesSidePanel.example.tsx?raw";

const meta: Meta = {
  title: "Extensions/Catalog view/Properties side panel",
  parameters: {
    layout: "padded",
    a11y: {
      config: {
        rules: [
          { id: "color-contrast", enabled: false },
          { id: "heading-order", enabled: false },
        ],
      },
    },
  },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Properties side panel"
      intro={
        <>
          The right rail of metadata on a catalog detail page — version,
          maintainer, support level, expires-on. Pair{" "}
          <code>PropertiesSidePanel</code> with one or more{" "}
          <code>PropertyItem</code> children, and stack actions (Install,
          Subscribe) at the bottom.
        </>
      }
    >
      <Section title="Standard layout">
        <Card>
          <Example
            source={propertiesSidePanelExampleSrc}
            region="StandardLayout"
            fileName="PropertiesSidePanel.example.tsx"
          >
            <StandardLayout />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example
            source={propertiesSidePanelExampleSrc}
            fileName="PropertiesSidePanel.example.tsx"
          />
        </Card>
      </Section>

      <Section title="Most-used props">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "label", type: "string | ReactNode", description: "PropertyItem.label — required. The metadata key." },
                { name: "value", type: "string | ReactNode", description: "PropertyItem.value — required. Pass a node for links / status pills." },
              ]}
            />
            <p style={{ marginTop: 16, marginBottom: 0, color: "var(--gp-color-text-subtle)", fontSize: 14 }}>
              <strong>PropertiesSidePanel</strong> takes children only. Drop
              PropertyItem rows above any action buttons.
            </p>
          </div>
        </Card>
      </Section>

      <Section title="Accessibility">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Render inside a labelled aside</strong> (<code>&lt;aside aria-label=&quot;Item details&quot;&gt;</code>) so screen-reader users can navigate straight to the metadata block.</li>
            <li><strong>Avoid large blocks of prose</strong> in <code>value</code> — keep entries short. The panel is a key/value summary, not a description.</li>
            <li><strong>Anchor real actions at the bottom.</strong> Buttons inside the panel should align under the metadata, not float in the middle.</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
