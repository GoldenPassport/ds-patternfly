import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Chart,
  ChartArea,
  ChartAxis,
  ChartGroup,
  ChartVoronoiContainer,
} from "@patternfly/react-charts/victory";
import { FoundationPage, Section, Card, CodeBlock } from "../../components/StoryKit.js";
import { DemoFrame, PropsTable } from "../../components/DemoKit.js";
import { chartA11yParams } from "./_chartKit.js";

const meta: Meta = {
  title: "Charts/Area chart",
  parameters: { layout: "padded", a11y: chartA11yParams },
};
export default meta;

const single = [
  { x: "Mon", y: 1 }, { x: "Tue", y: 3 }, { x: "Wed", y: 2 },
  { x: "Thu", y: 4 }, { x: "Fri", y: 7 }, { x: "Sat", y: 5 }, { x: "Sun", y: 6 },
];
const series2 = single.map((p) => ({ ...p, y: p.y + 2 }));

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Area chart"
      intro={
        <>
          A filled line — emphasises cumulative volume over time. Use for
          a single series&rsquo; total (run volume, request count); stack
          variants compare contribution across categories. For pure
          trend, prefer Line.
        </>
      }
    >
      <Section title="Single series">
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame height={260}>
              <Chart
                ariaTitle="Run volume"
                ariaDesc="Runs per day, Monday through Sunday."
                height={240}
                padding={{ left: 60, right: 20, top: 20, bottom: 50 }}
                containerComponent={
                  <ChartVoronoiContainer
                    labels={({ datum }: { datum: { x: string; y: number } }) =>
                      `${datum.x}: ${datum.y}`
                    }
                    constrainToVisibleArea
                  />
                }
              >
                <ChartAxis />
                <ChartAxis dependentAxis showGrid />
                <ChartGroup>
                  <ChartArea data={single} interpolation="monotoneX" />
                </ChartGroup>
              </Chart>
            </DemoFrame>
            <CodeBlock>{`<Chart ariaTitle="Run volume" ariaDesc="Runs per day, Mon through Sun." height={240}>
  <ChartAxis />
  <ChartAxis dependentAxis showGrid />
  <ChartGroup>
    <ChartArea data={data} interpolation="monotoneX" />
  </ChartGroup>
</Chart>`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section title="Multiple series">
        <Card>
          <div style={{ padding: 24 }}>
            <DemoFrame height={260}>
              <Chart
                ariaTitle="Run volume by env"
                ariaDesc="Run counts for production and staging."
                themeColor="multi"
                height={240}
                padding={{ left: 60, right: 20, top: 20, bottom: 50 }}
              >
                <ChartAxis />
                <ChartAxis dependentAxis showGrid />
                <ChartGroup>
                  <ChartArea data={single} interpolation="monotoneX" />
                  <ChartArea data={series2} interpolation="monotoneX" />
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
                { name: "data", type: "{ x, y }[]", description: "Required — series data." },
                { name: "interpolation", type: '"linear" | "monotoneX" | "stepBefore" | "stepAfter" | …', description: "How to smooth the line. monotoneX is usually the right default." },
                { name: "style", type: "{ data, labels }", description: "Override fill / stroke / opacity. Most apps stick with the theme defaults." },
                { name: "themeColor", type: '"blue" | "green" | "multi" | …', description: "Set on the wrapping Chart, not the ChartArea — applies to every series." },
              ]}
            />
          </div>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
