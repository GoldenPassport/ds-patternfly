import type { Meta, StoryObj } from "@storybook/react-vite";
import { FoundationPage, Section, Card, CodeBlock } from "../_kit/StoryKit.js";
import { PropsTable } from "../_kit/DemoKit.js";

const meta: Meta = {
  title: "Charts/Box plot chart",
  parameters: { layout: "padded" },
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
          <div style={{ padding: 24 }}>
            <CodeBlock>{`import { Chart, ChartAxis } from "@patternfly/react-charts/victory";
import { VictoryBoxPlot } from "victory-box-plot";

const data = [
  { x: "p50", min: 1,  q1: 2, median: 3, q3: 4, max: 5 },
  { x: "p95", min: 2,  q1: 3, median: 5, q3: 7, max: 9 },
  { x: "p99", min: 3,  q1: 5, median: 8, q3: 12, max: 18 },
];

<Chart
  ariaTitle="API latency"
  ariaDesc="p50/p95/p99 latency distributions across last hour."
  domainPadding={{ x: [40, 40] }}
  padding={{ left: 60, right: 20, top: 20, bottom: 50 }}
>
  <ChartAxis />
  <ChartAxis dependentAxis showGrid />
  <VictoryBoxPlot
    boxWidth={20}
    data={data}
    style={{
      min: { stroke: "var(--pf-t--global--icon--color--regular)" },
      max: { stroke: "var(--pf-t--global--icon--color--regular)" },
      q1:  { fill:   "var(--pf-t--chart--color--blue--400)" },
      q3:  { fill:   "var(--pf-t--chart--color--blue--400)" },
      median: { stroke: "var(--pf-t--global--text--color--regular)" },
    }}
  />
</Chart>`}</CodeBlock>
          </div>
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
