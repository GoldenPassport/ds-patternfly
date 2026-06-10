import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  PropertiesSidePanel,
  PropertyItem,
} from "@patternfly/react-catalog-view-extension";
import { Button } from "@patternfly/react-core";
import "@patternfly/react-catalog-view-extension/dist/css/react-catalog-view-extension.css";
import { FoundationPage, Section, Card, CodeBlock } from "../_kit/StoryKit.js";
import { DemoFrame, PropsTable } from "../_kit/DemoKit.js";

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
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame>
              <div style={{ maxWidth: 280 }}>
                <PropertiesSidePanel>
                  <PropertyItem label="Version"        value="6.4.0" />
                  <PropertyItem label="Maintainer"     value="Acme" />
                  <PropertyItem label="Support level"  value="Community" />
                  <PropertyItem label="Last updated"   value="2026-04-29" />
                  <PropertyItem
                    label="Documentation"
                    value={<a href="#docs">Read the docs ›</a>}
                  />
                  <Button variant="primary" isBlock>
                    Install
                  </Button>
                </PropertiesSidePanel>
              </div>
            </DemoFrame>
            <CodeBlock>{`<PropertiesSidePanel>
  <PropertyItem label="Version"       value="6.4.0" />
  <PropertyItem label="Maintainer"    value="Acme" />
  <PropertyItem label="Support level" value="Community" />
  <Button variant="primary" isBlock>Install</Button>
</PropertiesSidePanel>`}</CodeBlock>
          </div>
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
