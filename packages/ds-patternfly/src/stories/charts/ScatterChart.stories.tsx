import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Chart,
  ChartAxis,
  ChartScatter,
  ChartVoronoiContainer,
} from "@patternfly/react-charts/victory";
import { FoundationPage, Section, Card, CodeBlock } from "../_storyKit.js";
import { DemoFrame, PropsTable } from "../_demoKit.js";
import { chartA11yParams } from "./_chartKit.js";

const meta: Meta = {
  title: "Charts/Scatter chart",
  parameters: { layout: "padded", a11y: chartA11yParams },
};
export default meta;

const data = Array.from({ length: 24 }).map((_, i) => ({
  x: 1 + (i % 8) + Math.random() * 0.6,
  y: 1 + Math.floor(i / 8) * 2 + Math.random() * 2,
  size: 3 + (i % 4),
}));

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
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame height={280}>
              <Chart
                ariaTitle="Latency vs payload size"
                ariaDesc="Each point is a request; size encodes retry count."
                height={260}
                padding={{ left: 60, right: 20, top: 20, bottom: 60 }}
                containerComponent={
                  <ChartVoronoiContainer
                    labels={({ datum }: { datum: { x: number; y: number; size: number } }) =>
                      `payload ${datum.x.toFixed(1)} KB, latency ${datum.y.toFixed(1)} ms, retries ${datum.size - 3}`
                    }
                    constrainToVisibleArea
                  />
                }
              >
                <ChartAxis label="Payload (KB)" />
                <ChartAxis dependentAxis label="Latency (ms)" showGrid />
                <ChartScatter data={data} />
              </Chart>
            </DemoFrame>
            <CodeBlock>{`<Chart ariaTitle="Latency vs payload" containerComponent={<ChartVoronoiContainer labels={fmt} />}>
  <ChartAxis label="Payload (KB)" />
  <ChartAxis dependentAxis label="Latency (ms)" showGrid />
  <ChartScatter data={points /* { x, y, size? }[] */} />
</Chart>`}</CodeBlock>
          </div>
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
