import type { Meta, StoryObj } from "@storybook/react-vite";
import { FoundationPage, Section, Card, Example } from "../_kit/StoryKit.js";
import { PropsTable } from "../_kit/DemoKit.js";
import { chartA11yParams } from "./_chartKit.js";
import { Recipe } from "../../examples/charts/BoxPlotChart.example.js";
import boxPlotChartExampleSrc from "../../examples/charts/BoxPlotChart.example.tsx?raw";

const meta: Meta = {
  title: "Charts/Box plot chart",
  parameters: { layout: "padded", a11y: chartA11yParams },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Box plot chart"
      intro={
        <>
          A statistical distribution chart — min, Q1, median, Q3, max
          per category. Use for latency distributions, error-rate spread,
          performance regression detection. PF6 doesn&rsquo;t ship a
          dedicated <code>ChartBoxPlot</code> wrapper, so compose Victory&rsquo;s
          <code>VictoryBoxPlot</code> directly inside a PF6 themed
          <code>Chart</code>.
        </>
      }
    >
      <Section title="Recipe">
        <Card>
          <Example
            source={boxPlotChartExampleSrc}
            region="Recipe"
            fileName="BoxPlotChart.example.tsx"
            height={260}
          >
            <Recipe />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example source={boxPlotChartExampleSrc} fileName="BoxPlotChart.example.tsx" />
        </Card>
      </Section>

      <Section title="Data shape">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "x", type: "string | number", description: "Category label." },
                { name: "min / q1 / median / q3 / max", type: "number", description: "Five-number summary. Compute server-side from your raw sample." },
                { name: "outliers", type: "number[]", description: "Optional — points beyond the whiskers, plotted as dots." },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section title="Rules">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Don&rsquo;t use for tiny samples.</strong> A box plot needs at least 20 raw points per category to be meaningful — fall back to scatter or single-bar for small N.</li>
            <li><strong>Label the medians.</strong> The visual is dense; an annotation on the median value helps non-stat users orient.</li>
            <li><strong>Pair with a percentile legend.</strong> Not everyone reads quartiles fluently — explain &ldquo;box = middle 50%&rdquo;.</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
