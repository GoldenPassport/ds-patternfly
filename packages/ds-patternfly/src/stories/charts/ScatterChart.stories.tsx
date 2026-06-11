import type { Meta, StoryObj } from "@storybook/react-vite";
import { FoundationPage, Section, Card, Example } from "../_kit/StoryKit.js";
import { PropsTable } from "../_kit/DemoKit.js";
import { BasicWithSizeDimension } from "../../examples/charts/ScatterChart.example.js";
import scatterChartExampleSrc from "../../examples/charts/ScatterChart.example.tsx?raw";
import { chartA11yParams } from "./_chartKit.js";

const meta: Meta = {
  title: "Charts/Scatter chart",
  parameters: { layout: "padded", a11y: chartA11yParams },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Scatter chart"
      intro={
        <>
          Points on an X/Y plane — for distributions, correlations, and
          outlier detection. Use when each point is a discrete record
          and you want users to spot clusters or anomalies. Size /
          colour can encode a third dimension.
        </>
      }
    >
      <Section title="Basic with size dimension">
        <Card>
          <Example
            source={scatterChartExampleSrc}
            region="BasicWithSizeDimension"
            fileName="ScatterChart.example.tsx"
            height={280}
          >
            <BasicWithSizeDimension />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example source={scatterChartExampleSrc} fileName="ScatterChart.example.tsx" />
        </Card>
      </Section>

      <Section title="Most-used props">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "data", type: "{ x, y, size?, symbol? }[]", description: "Each point. size scales the marker; symbol picks a shape (circle / square / diamond / …)." },
                { name: "size", type: "number | (datum) => number", description: "Default marker size when not on the datum." },
                { name: "symbol", type: '"circle" | "diamond" | …', description: "Shape of every marker — useful when patterns matter (colour-blind, print)." },
                { name: "containerComponent", type: "ChartVoronoiContainer", description: "Hover-anywhere tooltips — essential for scatters where exact pixel hits are rare." },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section title="Rules">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Cap density at &lt; 2,000 points</strong>. Beyond that, switch to a heatmap / density plot — individual points disappear into overlap.</li>
            <li><strong>Add jitter</strong> when many points share an X. Pure stacks read as a single dot.</li>
            <li><strong>Encode dimensions sparingly.</strong> X + Y + colour + size + shape = unreadable. Pick 2–3.</li>
            <li><strong>Outliers deserve labels.</strong> Annotate the worst point directly — users come to a scatter to find anomalies.</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
