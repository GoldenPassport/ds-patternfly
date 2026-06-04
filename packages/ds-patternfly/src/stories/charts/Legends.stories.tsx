import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Chart,
  ChartArea,
  ChartAxis,
  ChartGroup,
  ChartLegend,
} from "@patternfly/react-charts/victory";
import { FoundationPage, Section, Card, CodeBlock } from "../_storyKit.js";
import { DemoFrame, PropsTable } from "../_demoKit.js";
import { chartA11yParams } from "./_chartKit.js";

const meta: Meta = {
  title: "Charts/Legends",
  parameters: { layout: "padded", a11y: chartA11yParams },
};
export default meta;

const a = [{ x: 1, y: 2 }, { x: 2, y: 4 }, { x: 3, y: 3 }, { x: 4, y: 5 }];
const b = a.map((p) => ({ ...p, y: p.y + 1 }));
const c = a.map((p) => ({ ...p, y: p.y + 2 }));

const legendData = [{ name: "API" }, { name: "Worker" }, { name: "Queue" }];

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Legends"
      intro={
        <>
          The colour-to-series key. Drop a <code>ChartLegend</code> inside a
          chart, or pass <code>legendData</code> + <code>legendPosition</code>{" "}
          on the Chart wrapper and PF6 places it for you. Always include a
          legend when there&rsquo;s more than one series.
        </>
      }
    >
      <Section title="Legend at the bottom">
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame height={300}>
              <Chart
                ariaTitle="Throughput by service"
                ariaDesc="API, Worker, and Queue throughput."
                themeColor="multi"
                height={280}
                padding={{ left: 60, right: 20, top: 20, bottom: 80 }}
                legendData={legendData}
                legendPosition="bottom"
              >
                <ChartAxis />
                <ChartAxis dependentAxis showGrid />
                <ChartGroup>
                  <ChartArea data={a} />
                  <ChartArea data={b} />
                  <ChartArea data={c} />
                </ChartGroup>
              </Chart>
            </DemoFrame>
            <CodeBlock>{`<Chart
  ariaTitle="…"
  themeColor="multi"
  legendData={[{ name: "API" }, { name: "Worker" }, { name: "Queue" }]}
  legendPosition="bottom"
>
  <ChartGroup>{/* series */}</ChartGroup>
</Chart>`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section title="Standalone ChartLegend">
        <Card>
          <div style={{ padding: 24 }}>
            <DemoFrame height={80}>
              <ChartLegend
                data={legendData}
                orientation="horizontal"
                height={60}
                width={300}
              />
            </DemoFrame>
          </div>
        </Card>
      </Section>

      <Section title="Most-used props">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "legendData", type: "{ name, symbol? }[]", description: "On the Chart wrapper — auto-placed legend that aligns colours with series." },
                { name: "legendPosition", type: '"bottom" | "right"', description: "Where the legend sits relative to the plot area." },
                { name: "legendOrientation", type: '"horizontal" | "vertical"', description: "Override the orientation. Default depends on legendPosition." },
                { name: "ChartLegend.data", type: "{ name, symbol? }[]", description: "Standalone legend data. Use when you need the legend somewhere outside the chart's auto-placement." },
                { name: "ChartLegend.colorScale", type: "string[]", description: "Override colours. Pair with custom themeColor on charts that share the legend." },
                { name: "ChartLegend.itemsPerRow", type: "number", description: "Wrap long legends across multiple rows." },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section title="Rules">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Order the legend like the data.</strong> Most-recent / largest first; users scan top-down.</li>
            <li><strong>Match legend names to data labels exactly.</strong> &ldquo;API requests&rdquo; in the legend, &ldquo;API requests&rdquo; in the tooltip.</li>
            <li><strong>Interactive legends</strong> — when supported, click-to-toggle is delightful for &gt; 3 series. Wire onClick via <code>events</code>.</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
