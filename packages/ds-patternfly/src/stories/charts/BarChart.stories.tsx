import type { Meta, StoryObj } from "@storybook/react-vite";
import { Chart, ChartAxis, ChartBar, ChartGroup } from "@patternfly/react-charts/victory";
import { FoundationPage, Section, Card, CodeBlock } from "../_storyKit.js";
import { DemoFrame, PropsTable } from "../_demoKit.js";
import { chartA11yParams } from "./_chartKit.js";

const meta: Meta = {
  title: "Charts/Bar chart",
  parameters: { layout: "padded", a11y: chartA11yParams },
};
export default meta;

const data1 = [{ x: "Active", y: 142 }, { x: "Paused", y: 18 }, { x: "Failed", y: 3 }];
const data2 = [{ x: "Active", y: 120 }, { x: "Paused", y: 22 }, { x: "Failed", y: 5 }];

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Bar chart"
      intro={
        <>
          Discrete categorical comparison — counts per status, totals per
          region. Use vertical bars for short labels; switch to
          horizontal when labels are long or there are &gt; 6 categories.
        </>
      }
    >
      <Section title="Grouped bars">
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame height={260}>
              <Chart
                ariaTitle="Workflow counts"
                ariaDesc="Active, paused, failed across this week and last."
                themeColor="multi"
                height={240}
                domainPadding={{ x: [40, 40] }}
                padding={{ left: 60, right: 20, top: 20, bottom: 50 }}
              >
                <ChartAxis />
                <ChartAxis dependentAxis showGrid />
                <ChartGroup offset={11}>
                  <ChartBar data={data1} />
                  <ChartBar data={data2} />
                </ChartGroup>
              </Chart>
            </DemoFrame>
            <CodeBlock>{`<Chart ariaTitle="Workflow counts" themeColor="multi" domainPadding={{ x: [40, 40] }}>
  <ChartAxis />
  <ChartAxis dependentAxis showGrid />
  <ChartGroup offset={11}>
    <ChartBar data={thisWeek} />
    <ChartBar data={lastWeek} />
  </ChartGroup>
</Chart>`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section title="Horizontal">
        <Card>
          <div style={{ padding: 24 }}>
            <DemoFrame height={260}>
              <Chart
                ariaTitle="Status (horizontal)"
                horizontal
                height={240}
                domainPadding={{ y: [40, 40] }}
                padding={{ left: 100, right: 20, top: 20, bottom: 50 }}
              >
                <ChartAxis />
                <ChartAxis dependentAxis showGrid />
                <ChartGroup>
                  <ChartBar data={data1} />
                </ChartGroup>
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
                { name: "data", type: "{ x, y }[]", description: "Series." },
                { name: "horizontal", type: "boolean", description: "Set on the Chart wrapper to flip axes — long labels read better horizontal." },
                { name: "domainPadding", type: "{ x?: number[]; y?: number[] }", description: "Space at the bar-axis ends so end bars don't get clipped." },
                { name: "ChartGroup.offset", type: "number", description: "Pixel spacing between grouped bar columns." },
                { name: "barWidth", type: "number", description: "Override bar width for compact / dense layouts." },
              ]}
            />
          </div>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
