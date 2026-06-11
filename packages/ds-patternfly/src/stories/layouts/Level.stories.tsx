import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  FoundationPage,
  Section,
  Card,
  ConfigurationSection,
  Example,
} from "../_kit/StoryKit.js";
import {
  TwoEnds,
  ThreeOrMoreItems,
} from "../../examples/layouts/Level.example.js";
import levelExampleSrc from "../../examples/layouts/Level.example.tsx?raw";
import levelComponentSrc from "../../components/Level.tsx?raw";

const meta: Meta = {
  title: "Layouts/Level",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Level"
      intro={
        <>
          A single horizontal row that distributes its children with{" "}
          <code>justify-content: space-between</code>. Use it for headers,
          footers, and any row where one or two items sit at the edges with
          space (or other items) between them.
        </>
      }
    >
      <Section
        title="Two ends"
        description="The most common pattern: title on the left, actions on the right."
      >
        <Card>
          <Example
            source={levelExampleSrc}
            region="TwoEnds"
            fileName="Level.example.tsx"
          >
            <TwoEnds />
          </Example>
        </Card>
      </Section>

      <Section
        title="Three+ items"
        description="Items distribute evenly across the row."
      >
        <Card>
          <Example
            source={levelExampleSrc}
            region="ThreeOrMoreItems"
            fileName="Level.example.tsx"
          >
            <ThreeOrMoreItems />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example source={levelExampleSrc} fileName="Level.example.tsx" />
        </Card>
      </Section>

      <ConfigurationSection
        importStatement={'import { Level, LevelItem } from "@golden-passport/ds-patternfly";'}
        componentSource={levelComponentSrc}
        componentFileName="Level.tsx"
        description={
          <>
            How to import the component and every prop it accepts. Level
            intentionally has a tiny prop surface — alignment is fixed, the
            only knob you turn is the children.
          </>
        }
        rows={[
          {
            name: "children",
            type: "ReactNode (LevelItem children)",
            description: "Wrap each top-level item in <LevelItem> for correct spacing.",
          },
          {
            name: "className",
            type: "string",
            description: "Additional classes — rarely needed.",
          },
        ]}
      />

      <Section
        title="Level vs Flex vs Split"
        description="They look similar; here's how they differ."
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
            <li><strong>Level</strong> — fixed <code>space-between</code>, no other knobs. The right tool for a header bar.</li>
            <li><strong>Split</strong> — one item fills, the rest stay intrinsic. Right for sidebar + content rows.</li>
            <li><strong>Flex</strong> — full alignment/justification/direction control. Right when neither of the above fits.</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
