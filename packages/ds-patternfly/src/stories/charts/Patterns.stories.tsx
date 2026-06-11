import type { Meta, StoryObj } from "@storybook/react-vite";
import { FoundationPage, Section, Card, Example } from "../_kit/StoryKit.js";
import { PatternFills } from "../../examples/charts/Patterns.example.js";
import patternsExampleSrc from "../../examples/charts/Patterns.example.tsx?raw";
import { chartA11yParams } from "./_chartKit.js";

const meta: Meta = {
  title: "Charts/Patterns",
  parameters: { layout: "padded", a11y: chartA11yParams },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Patterns"
      intro={
        <>
          SVG fill patterns (diagonal stripes, dots, crosshatch) as a
          second signal alongside colour. Use them when colour-blind
          accessibility matters, when printing in monochrome, or when
          the chart will be screen-shot to slides where reader colour
          fidelity isn&rsquo;t guaranteed.
        </>
      }
    >
      <Section
        title="Pattern fills"
        description="Define <pattern> elements once in an SVG <defs>, then reference them as fills on chart series via style.data.fill."
      >
        <Card>
          <Example
            source={patternsExampleSrc}
            region="PatternFills"
            fileName="Patterns.example.tsx"
            height={280}
          >
            <PatternFills />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example source={patternsExampleSrc} fileName="Patterns.example.tsx" />
        </Card>
      </Section>

      <Section title="Rules">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Use patterns sparingly.</strong> Two or three distinct patterns per chart — more and the eye loses the signal.</li>
            <li><strong>Pair pattern + colour.</strong> Pattern is a redundant cue; the colour still helps for everyone else.</li>
            <li><strong>Define patterns once.</strong> Drop a single <code>&lt;defs&gt;</code> block at app root so every chart can reference them.</li>
            <li><strong>Make patterns dense enough.</strong> Thin stripes disappear at small chart sizes — test at the smallest size the chart renders.</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
