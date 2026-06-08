import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Chart,
  ChartAxis,
  ChartGroup,
  ChartLine,
  ChartThreshold,
} from "@patternfly/react-charts/victory";
import { FoundationPage, Section, Card, CodeBlock } from "../../components/StoryKit.js";
import { DemoFrame, PropsTable } from "../../components/DemoKit.js";
import { chartA11yParams } from "./_chartKit.js";

const meta: Meta = {
  title: "Charts/Threshold chart",
  parameters: { layout: "padded", a11y: chartA11yParams },
};
export default meta;

const series = [
  { x: "Mon", y: 80 },  { x: "Tue", y: 120 }, { x: "Wed", y: 210 },
  { x: "Thu", y: 180 }, { x: "Fri", y: 280 }, { x: "Sat", y: 240 }, { x: "Sun", y: 170 },
];
const warningLine = series.map((p) => ({ x: p.x, y: 200 }));
const dangerLine = series.map((p) => ({ x: p.x, y: 260 }));

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Threshold chart"
      intro={
        <>
          A line chart with horizontal threshold overlays — warning,
          danger, SLA targets. Renders the metric and the alert
          thresholds in the same view so users see breaches in
          context. Use for latency-vs-SLA, error-rate-vs-budget, any
          &ldquo;we set a target; did we hit it?&rdquo; chart.
        </>
      }
    >
      <Section title="Metric + warning + danger">
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame height={280}>
              <Chart
                ariaTitle="P99 latency vs thresholds"
                ariaDesc="P99 latency over the week with warning threshold at 200ms and danger threshold at 260ms."
                themeColor="multi"
                height={260}
                padding={{ left: 60, right: 20, top: 20, bottom: 60 }}
                legendData={[{ name: "p99 (ms)" }, { name: "Warning" }, { name: "Danger" }]}
                legendPosition="bottom"
              >
                <ChartAxis />
                <ChartAxis dependentAxis showGrid />
                <ChartGroup>
                  <ChartLine data={series} name="p99 (ms)" interpolation="monotoneX" />
                  <ChartThreshold
                    data={warningLine}
                    name="Warning"
                    style={{ data: { stroke: "var(--pf-t--chart--color--gold--400, #f0ab00)" } }}
                  />
                  <ChartThreshold
                    data={dangerLine}
                    name="Danger"
                    style={{ data: { stroke: "var(--pf-t--chart--color--red--400, #c9190b)" } }}
                  />
                </ChartGroup>
              </Chart>
            </DemoFrame>
            <CodeBlock>{`<Chart ariaTitle="…" legendData={[{ name: "p99 (ms)" }, { name: "Warning" }, { name: "Danger" }]}>
  <ChartAxis />
  <ChartAxis dependentAxis showGrid />
  <ChartGroup>
    <ChartLine data={metric} name="p99 (ms)" />
    <ChartThreshold
      data={warningLine}
      name="Warning"
      style={{ data: { stroke: "var(--pf-t--chart--color--gold--400)" } }}
    />
    <ChartThreshold
      data={dangerLine}
      name="Danger"
      style={{ data: { stroke: "var(--pf-t--chart--color--red--400)" } }}
    />
  </ChartGroup>
</Chart>`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section title="Most-used props">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "data", type: "{ x, y }[]", description: "Threshold line points. For a horizontal threshold, every y is the same constant." },
                { name: "name", type: "string", description: "Identifier for legend + tooltip association." },
                { name: "style.data.stroke", type: "CSS colour", description: "Threshold colour. Use status tokens (warning / danger) so the meaning carries." },
                { name: "style.data.strokeDasharray", type: "string", description: "Dashed thresholds read as 'limit lines' vs solid metric lines. Try '5,5'." },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section title="Rules">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Use status colours.</strong> Warning gold, danger red — same tokens as Alert / Status so the visual language carries.</li>
            <li><strong>Dash the thresholds</strong> so they read as &ldquo;limit lines&rdquo; not &ldquo;another series&rdquo;.</li>
            <li><strong>Label breaches.</strong> When the metric crosses the danger line, annotate the X-value — that&rsquo;s usually what the user opens the page to find.</li>
            <li><strong>Match thresholds to alerts.</strong> If your monitoring pages at 260 ms p99, the chart threshold should be 260 ms too.</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
