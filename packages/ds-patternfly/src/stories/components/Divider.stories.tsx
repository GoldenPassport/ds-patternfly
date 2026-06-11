import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  FoundationPage,
  Section,
  Card,
  ConfigurationSection,
  Example,
} from "../_kit/StoryKit.js";
import {
  Horizontal,
  Vertical,
  Inset,
} from "../../examples/components/Divider.example.js";
import dividerExampleSrc from "../../examples/components/Divider.example.tsx?raw";
import dividerComponentSrc from "../../components/base/Divider.tsx?raw";

const meta: Meta = {
  title: "Components/Divider",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Divider"
      intro={
        <>
          A horizontal or vertical rule used to separate blocks of content.
          Renders as a semantic <code>&lt;hr&gt;</code> by default — screen
          readers announce it as a separator, sighted users see a line.
        </>
      }
    >
      <Section title="Horizontal (default)">
        <Card>
          <Example
            source={dividerExampleSrc}
            region="Horizontal"
            fileName="Divider.example.tsx"
          >
            <Horizontal />
          </Example>
        </Card>
      </Section>

      <Section title="Vertical" description="Use orientation prop and place inside a flex/grid container.">
        <Card>
          <Example
            source={dividerExampleSrc}
            region="Vertical"
            fileName="Divider.example.tsx"
          >
            <Vertical />
          </Example>
        </Card>
      </Section>

      <Section title="Inset" description="Indent the divider from the container edges per breakpoint.">
        <Card>
          <Example
            source={dividerExampleSrc}
            region="Inset"
            fileName="Divider.example.tsx"
          >
            <Inset />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example source={dividerExampleSrc} fileName="Divider.example.tsx" />
        </Card>
      </Section>

      <ConfigurationSection
        importStatement={'import { Divider } from "@golden-passport/ds-patternfly";'}
        componentSource={dividerComponentSrc}
        componentFileName="Divider.tsx"
        rows={[
          {
            name: "component",
            type: '"hr" | "li" | "div"',
            description: 'Rendered tag. Use "li" inside menus, "div" only when neither hr nor li are semantically appropriate.',
          },
          {
            name: "orientation",
            type: '{ default?: "horizontal" | "vertical", sm?, md?, lg?, xl?, "2xl"? }',
            description: "Per-breakpoint orientation. Vertical dividers need a flex/grid parent with explicit height.",
          },
          {
            name: "inset",
            type: '{ default?: "insetNone" | "insetXs" | ... | "inset3xl", per breakpoint }',
            description: "Indent from the start/end edges of the parent.",
          },
        ]}
      />

      <Section
        title="When to use it"
        description="Dividers signal a content boundary, not visual decoration."
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
            <li><strong>Use a Divider when…</strong> two adjacent content blocks belong to different topics or sections, and whitespace alone isn&apos;t enough to communicate the boundary.</li>
            <li><strong>Don&apos;t use a Divider when…</strong> heading hierarchy or card containers already separate the content. Stacking visual separators dilutes them.</li>
            <li><strong>Inside menus:</strong> use <code>component=&quot;li&quot;</code> so the menu&apos;s list semantics aren&apos;t broken.</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
