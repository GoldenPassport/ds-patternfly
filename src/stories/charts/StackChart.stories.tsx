import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Chart,
  ChartArea,
  ChartAxis,
  ChartBar,
  ChartStack,
} from "@patternfly/react-charts/victory";
import { FoundationPage, Section, Card, CodeBlock } from "../_storyKit.js";
import { DemoFrame, PropsTable } from "../_demoKit.js";
import { chartA11yParams } from "./_chartKit.js";

const meta: Meta = {
  title: "Charts/Stack chart",
  parameters: { layout: "padded", a11y: chartA11yParams },
};
export default meta;

const x = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const a = x.map((d, i) => ({ x: d, y: 3 + (i % 3) }));
const b = x.map((d, i) => ({ x: d, y: 2 + (i % 2) }));
const c = x.map((d, i) => ({ x: d, y: 4 + ((i + 1) % 3) }));

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
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame height={280}>
              <Chart
                ariaTitle="Runs by service"
                ariaDesc="Stacked counts for API, Worker, Queue by day."
                themeColor="multi"
                height={260}
                domainPadding={{ x: [40, 40] }}
                padding={{ left: 60, right: 20, top: 20, bottom: 60 }}
                legendData={[{ name: "API" }, { name: "Worker" }, { name: "Queue" }]}
                legendPosition="bottom"
              >
                <ChartAxis />
                <ChartAxis dependentAxis showGrid />
                <ChartStack>
                  <ChartBar data={a} />
                  <ChartBar data={b} />
                  <ChartBar data={c} />
                </ChartStack>
              </Chart>
            </DemoFrame>
            <CodeBlock>{`<Chart themeColor="multi" ariaTitle="Runs by service" domainPadding={{ x: [40, 40] }}>
  <ChartAxis />
  <ChartAxis dependentAxis showGrid />
  <ChartStack>
    <ChartBar data={api} />
    <ChartBar data={worker} />
    <ChartBar data={queue} />
  </ChartStack>
</Chart>`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section title="Stacked area">
        <Card>
          <div style={{ padding: 24 }}>
            <DemoFrame height={280}>
              <Chart
                ariaTitle="Cumulative throughput"
                themeColor="multi"
                height={260}
                padding={{ left: 60, right: 20, top: 20, bottom: 50 }}
              >
                <ChartAxis />
                <ChartAxis dependentAxis showGrid />
                <ChartStack>
                  <ChartArea data={a} interpolation="monotoneX" />
                  <ChartArea data={b} interpolation="monotoneX" />
                  <ChartArea data={c} interpolation="monotoneX" />
                </ChartStack>
              </Chart>
            </DemoFrame>
          </div>
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
