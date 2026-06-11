import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  FoundationPage,
  Section,
  Card,
  ConfigurationSection,
  Example,
} from "../_kit/StoryKit.js";
import { LiveDemo } from "../../examples/layouts/Bullseye.example.js";
import bullseyeExampleSrc from "../../examples/layouts/Bullseye.example.tsx?raw";
import bullseyeComponentSrc from "../../components/Bullseye.tsx?raw";

const meta: Meta = {
  title: "Layouts/Bullseye",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Bullseye"
      intro={
        <>
          Centers a single child both vertically and horizontally within its
          parent. The most common use case is empty states, loading
          spinners, and error screens where there&apos;s exactly one block of
          content and it should sit dead center of whatever space is
          available.
        </>
      }
    >
      <Section title="Live demo">
        <Card>
          <Example
            source={bullseyeExampleSrc}
            region="LiveDemo"
            fileName="Bullseye.example.tsx"
            height={240}
          >
            <LiveDemo />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example source={bullseyeExampleSrc} fileName="Bullseye.example.tsx" />
        </Card>
      </Section>

      <ConfigurationSection
        importStatement={'import { Bullseye } from "@golden-passport/ds-patternfly";'}
        componentSource={bullseyeComponentSrc}
        componentFileName="Bullseye.tsx"
        rows={[
          {
            name: "children",
            type: "ReactNode",
            description: "The single element to center. Bullseye is intentionally one-child shaped.",
          },
          {
            name: "component",
            type: "ElementType",
            description: <>Override the rendered tag (defaults to <code>div</code>).</>,
          },
          {
            name: "className",
            type: "string",
            description: "Additional classes — rarely needed.",
          },
        ]}
      />

      <Section
        title="When to use it"
        description="The decision is usually one-line."
      >
        <Card>
          <ul
            style={{
              margin: 0,
              padding: "16px 24px 16px 40px",
              color: "var(--gp-color-text-regular)",
              lineHeight: 1.8,
            }}
          >
            <li><strong>Empty states</strong> — &quot;No tasks yet&quot; with an action button.</li>
            <li><strong>Loading spinners</strong> — full-pane loading states.</li>
            <li><strong>Error screens</strong> — 404 / permission-denied messages.</li>
            <li><strong>Modals and dialogs</strong> — when the dialog content needs to be centered within the backdrop.</li>
            <li><strong>Not for general centering of headers or rows</strong> — use Level or Flex with align/justify props.</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
