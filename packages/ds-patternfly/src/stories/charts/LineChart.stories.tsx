import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Chart,
  ChartAxis,
  ChartGroup,
  ChartLine,
  ChartVoronoiContainer,
} from "@patternfly/react-charts/victory";
import { FoundationPage, Section, Card, CodeBlock } from "../../components/StoryKit.js";
import { DemoFrame, PropsTable } from "../../components/DemoKit.js";
import { chartA11yParams } from "./_chartKit.js";

const meta: Meta = {
  title: "Charts/Line chart",
  parameters: { layout: "padded", a11y: chartA11yParams },
};
export default meta;

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const series = (n: number) => days.map((x, i) => ({ x, y: n + (i % 4) * 1.5 + (i % 2 === 0 ? 1 : 0) }));

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Line chart"
      intro={
        <>
          The classic trend visualization — values over time. Use Line
          when emphasis is the rate of change; switch to Area when the
          cumulative total matters. Multiple series read cleanly in Line
          (cross-overs visible); Area stacks better for compositional
          totals.
        </>
      }
    >
      <Section title="Two series with tooltip">
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame height={280}>
              <Chart
                ariaTitle="Latency by env"
                ariaDesc="Prod vs staging latency over the past week."
                themeColor="multi"
                height={260}
                padding={{ left: 60, right: 20, top: 20, bottom: 60 }}
                legendData={[{ name: "Prod" }, { name: "Staging" }]}
                legendPosition="bottom"
                containerComponent={
                  <ChartVoronoiContainer
                    labels={({ datum }: { datum: { x: string; y: number; childName?: string } }) =>
                      `${datum.childName ?? "series"} ${datum.x}: ${datum.y.toFixed(1)}`
                    }
                    constrainToVisibleArea
                  />
                }
              >
                <ChartAxis />
                <ChartAxis dependentAxis showGrid />
                <ChartGroup>
                  <ChartLine data={series(2)} name="Prod" interpolation="monotoneX" />
                  <ChartLine data={series(4)} name="Staging" interpolation="monotoneX" />
                </ChartGroup>
              </Chart>
            </DemoFrame>
            <CodeBlock>{`<Chart
  ariaTitle="Latency by env"
  themeColor="multi"
  legendData={[{ name: "Prod" }, { name: "Staging" }]}
  legendPosition="bottom"
  containerComponent={<ChartVoronoiContainer labels={({ datum }) => \`\${datum.childName}: \${datum.y}\`} />}
>
  <ChartAxis />
  <ChartAxis dependentAxis showGrid />
  <ChartGroup>
    <ChartLine data={prod} name="Prod" interpolation="monotoneX" />
    <ChartLine data={staging} name="Staging" interpolation="monotoneX" />
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
                { name: "data", type: "{ x, y }[]", description: "Series data." },
                { name: "name", type: "string", description: "Series identifier — used by the voronoi tooltip and accessibility labels." },
                { name: "interpolation", type: 'enum', description: "linear | monotoneX | stepBefore | stepAfter | … Most apps default to monotoneX." },
                { name: "style", type: "{ data?, labels? }", description: "Per-line stroke / dash overrides. Most apps stick with the theme." },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section title="Tooltips">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Use ChartVoronoiContainer</strong> for hover-anywhere tooltips. Bare ChartTooltip needs per-point hover targets which are pixel-thin and frustrating.</li>
            <li><strong>Label by series + x-value.</strong> &ldquo;Prod Tue: 3.5&rdquo; — both signals matter when lines cross.</li>
            <li><strong>constrainToVisibleArea</strong> — keeps tooltips inside the plot when hovering near the edges.</li>
          </ul>
        </Card>
      </Section>

      <Section title="Beta features">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Stepped + thresholded variants</strong> are still beta in PF6 charts. The interpolation = stepBefore / stepAfter works, but the threshold overlay API may change.</li>
            <li><strong>Annotations</strong> — release markers, deploy lines. Compose <code>ChartLine</code> alongside <code>ChartThreshold</code> for now.</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
