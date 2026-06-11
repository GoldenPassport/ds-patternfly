import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  FoundationPage,
  Section,
  Card,
  ConfigurationSection,
  Example,
} from "../_kit/StoryKit.js";
import {
  OneFilledItem,
  FilledMiddle,
} from "../../examples/layouts/Split.example.js";
import splitExampleSrc from "../../examples/layouts/Split.example.tsx?raw";
import splitComponentSrc from "../../components/base/Split.tsx?raw";

const meta: Meta = {
  title: "Layouts/Split",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Split"
      intro={
        <>
          A horizontal row where one item fills remaining space and the
          others stay intrinsic. The classic use is a sidebar + content
          area, or a row with a flexible label that expands to push trailing
          icons to the end.
        </>
      }
    >
      <Section
        title="One filled item"
        description="Mark exactly one SplitItem with isFilled."
      >
        <Card>
          <Example
            source={splitExampleSrc}
            region="OneFilledItem"
            fileName="Split.example.tsx"
          >
            <OneFilledItem />
          </Example>
        </Card>
      </Section>

      <Section
        title="Filled middle"
        description="Filled item can be in any position."
      >
        <Card>
          <Example
            source={splitExampleSrc}
            region="FilledMiddle"
            fileName="Split.example.tsx"
          >
            <FilledMiddle />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example source={splitExampleSrc} fileName="Split.example.tsx" />
        </Card>
      </Section>

      <ConfigurationSection
        importStatement={'import { Split, SplitItem } from "@golden-passport/ds-patternfly";'}
        componentSource={splitComponentSrc}
        componentFileName="Split.tsx"
        description={
          <>
            How to import the component and every prop it accepts. SplitItem
            accepts <code>isFilled</code> to mark the item that fills
            remaining space. Mark exactly one.
          </>
        }
        rows={[
          { name: "hasGutter", type: "boolean", description: "Adds the standard spacer between items." },
          { name: "isWrappable", type: "boolean", description: "Allow items to wrap to a new line on narrow viewports." },
          { name: "component", type: "ElementType", description: <>Override the rendered tag (defaults to <code>div</code>).</> },
        ]}
      />

      <Section
        title="Split vs Flex with grow"
        description="Either works; Split is the clearer expression of intent."
      >
        <Card>
          <div style={{ padding: 24, color: "var(--gp-color-text-regular)" }}>
            <p style={{ margin: 0 }}>
              You can build the same layout with <code>Flex</code> and a
              <code> FlexItem grow=&#123;{`{ default: "grow" }`}&#125;</code>,
              but Split states the intent (&quot;one item fills, others
              don&apos;t&quot;) more directly. Reach for Flex only if you need
              direction/alignment control beyond row + center.
            </p>
          </div>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
