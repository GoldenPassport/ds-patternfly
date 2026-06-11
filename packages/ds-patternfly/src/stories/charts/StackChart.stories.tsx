import type { Meta, StoryObj } from "@storybook/react-vite";
import { FoundationPage, Section, Card, Example } from "../_kit/StoryKit.js";
import { PropsTable } from "../_kit/DemoKit.js";
import { StackedBar, StackedArea } from "../../examples/charts/StackChart.example.js";
import stackChartExampleSrc from "../../examples/charts/StackChart.example.tsx?raw";
import { chartA11yParams } from "./_chartKit.js";

const meta: Meta = {
  title: "Charts/Stack chart",
  parameters: { layout: "padded", a11y: chartA11yParams },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Stack chart"
      intro={
        <>
          Cumulative composition over a categorical or time axis — useful
          when you care about the total <em>and</em> the contribution of
          each segment. Works with both ChartBar and ChartArea children.
          Avoid when comparing segments to each other matters more than
          totals — use grouped Bar instead.
        </>
      }
    >
      <Section title="Stacked bar">
        <Card>
          <Example
            source={stackChartExampleSrc}
            region="StackedBar"
            fileName="StackChart.example.tsx"
            height={280}
          >
            <StackedBar />
          </Example>
        </Card>
      </Section>

      <Section title="Stacked area">
        <Card>
          <Example
            source={stackChartExampleSrc}
            region="StackedArea"
            fileName="StackChart.example.tsx"
            height={280}
          >
            <StackedArea />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example source={stackChartExampleSrc} fileName="StackChart.example.tsx" />
        </Card>
      </Section>

      <Section title="Most-used props">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "ChartStack", type: "container", description: "Wraps any number of ChartBar / ChartArea / ChartLine children — each becomes a stacked layer in the order passed." },
                { name: "themeColor", type: "string", description: "Use 'multi' so layers get distinct colours by default." },
                { name: "horizontal", type: "boolean (on Chart)", description: "Flip for horizontal stacked bars (long labels on the y-axis)." },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section title="Stack vs Grouped">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Stack when the total matters.</strong> Day-over-day cumulative volume; the segment breakdown is secondary.</li>
            <li><strong>Group when segment-to-segment compare matters.</strong> &ldquo;Did API outperform Worker on Wednesday?&rdquo; — stacking hides that question.</li>
            <li><strong>Don&rsquo;t stack &gt; 5 layers.</strong> Beyond that, each layer&rsquo;s thickness becomes visually noisy.</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
