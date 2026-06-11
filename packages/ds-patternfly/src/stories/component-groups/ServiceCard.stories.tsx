import type { Meta, StoryObj } from "@storybook/react-vite";
import { FoundationPage, Section, Card, Example } from "../_kit/StoryKit.js";
import { PropsTable } from "../_kit/DemoKit.js";
import { Basic } from "../../examples/component-groups/ServiceCard.example.js";
import serviceCardExampleSrc from "../../examples/component-groups/ServiceCard.example.tsx?raw";

const meta: Meta = {
  title: "Component groups/Content containers/Service card",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Service card"
      intro={
        <>
          A standardized tile for a service / capability — icon, title,
          description, optional helper text and footer. Use it on landing
          pages and product hubs where users pick a service to enter.
          Always pair with <code>Gallery</code> for the responsive grid.
        </>
      }
    >
      <Section title="Basic">
        <Card>
          <Example
            source={serviceCardExampleSrc}
            region="Basic"
            fileName="ServiceCard.example.tsx"
          >
            <Basic />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example source={serviceCardExampleSrc} fileName="ServiceCard.example.tsx" />
        </Card>
      </Section>

      <Section title="Most-used props">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "title", type: "string", description: "Required — the service name." },
                { name: "description", type: "ReactNode", description: "Required — short blurb describing what the service does." },
                { name: "icon", type: "ReactNode", description: "Required — service icon (PF icon component recommended)." },
                { name: "subtitle", type: "ReactNode", description: "Optional one-line context under the title." },
                { name: "helperText", type: "ReactNode", description: "Optional small note above the footer (e.g. 'Beta', '3 pending')." },
                { name: "footer", type: "ReactElement | null", description: "Footer slot — typically a primary action Button or a link." },
                { name: "isStacked", type: "boolean", description: "Stack the icon above the title instead of inline." },
                { name: "isFullHeight", type: "boolean", description: "Fill the available vertical space — keeps card heights consistent across a Gallery row." },
                { name: "ouiaId", type: "string | number", description: "Stable test selector." },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section title="Accessibility">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>The icon is decorative.</strong> Don&rsquo;t rely on it for meaning — the title carries the accessible name.</li>
            <li><strong>Use <code>isFullHeight</code> in a Gallery</strong> so card heights match — otherwise visually-impaired users zooming in get jagged rows that disrupt scanning.</li>
            <li><strong>Footer actions need clear labels.</strong> &ldquo;Open&rdquo; on its own is fine in context; for screen readers, use <code>aria-label</code> to disambiguate (&ldquo;Open Settings&rdquo;) when many cards share the same footer copy.</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
