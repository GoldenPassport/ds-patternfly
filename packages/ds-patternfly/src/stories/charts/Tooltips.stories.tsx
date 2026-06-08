import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Chart,
  ChartArea,
  ChartAxis,
  ChartGroup,
  ChartLegendTooltip,
  createContainer,
  ChartVoronoiContainer,
} from "@patternfly/react-charts/victory";
import { FoundationPage, Section, Card, CodeBlock } from "../../components/StoryKit.js";
import { DemoFrame, PropsTable } from "../../components/DemoKit.js";
import { chartA11yParams } from "./_chartKit.js";

const meta: Meta = {
  title: "Charts/Tooltips",
  parameters: { layout: "padded", a11y: chartA11yParams },
};
export default meta;

const x = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const a = x.map((d, i) => ({ x: d, y: 2 + i }));
const b = x.map((d, i) => ({ x: d, y: 5 - (i % 3) }));

// Cursor + voronoi combination for hover-anywhere + crosshair.
const CursorVoronoiContainer = createContainer("voronoi", "cursor");

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Tooltips"
      intro={
        <>
          Hover affordances that surface exact values. The two most-used
          patterns are <code>ChartVoronoiContainer</code> (hover anywhere
          in the plot area; nearest point wins) and{" "}
          <code>createContainer(&quot;voronoi&quot;, &quot;cursor&quot;)</code>{" "}
          (voronoi + crosshair line for time-series). Bare per-point
          hover targets are pixel-thin and frustrating — avoid them.
        </>
      }
    >
      <Section title="ChartVoronoiContainer">
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame height={280}>
              <Chart
                ariaTitle="Throughput with tooltips"
                ariaDesc="Hover anywhere — the nearest point's series + value appears."
                themeColor="multi"
                height={260}
                padding={{ left: 60, right: 20, top: 20, bottom: 60 }}
                legendData={[{ name: "API" }, { name: "Worker" }]}
                legendPosition="bottom"
                containerComponent={
                  <ChartVoronoiContainer
                    labels={({ datum }: { datum: { x: string; y: number; childName?: string } }) =>
                      `${datum.childName ?? ""} ${datum.x}: ${datum.y}`
                    }
                    constrainToVisibleArea
                  />
                }
              >
                <ChartAxis />
                <ChartAxis dependentAxis showGrid />
                <ChartGroup>
                  <ChartArea data={a} name="API" interpolation="monotoneX" />
                  <ChartArea data={b} name="Worker" interpolation="monotoneX" />
                </ChartGroup>
              </Chart>
            </DemoFrame>
            <CodeBlock>{`<Chart
  containerComponent={
    <ChartVoronoiContainer
      labels={({ datum }) => \`\${datum.childName} \${datum.x}: \${datum.y}\`}
      constrainToVisibleArea
    />
  }
>
  {/* series */}
</Chart>`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section title="ChartLegendTooltip + voronoi+cursor">
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame height={280}>
              <Chart
                ariaTitle="Throughput with cursor tooltip"
                ariaDesc="Crosshair tracks the x-position; tooltip shows all series at that x."
                themeColor="multi"
                height={260}
                padding={{ left: 60, right: 20, top: 20, bottom: 60 }}
                legendData={[{ name: "API" }, { name: "Worker" }]}
                legendPosition="bottom"
                containerComponent={
                  <CursorVoronoiContainer
                    cursorDimension="x"
                    labels={({ datum }: { datum: { x: string; y: number } }) =>
                      `${datum.y}`
                    }
                    labelComponent={
                      <ChartLegendTooltip
                        legendData={[{ name: "API" }, { name: "Worker" }]}
                        title={(datum: { x?: string | number }) => String(datum.x ?? "")}
                      />
                    }
                    mouseFollowTooltips
                    voronoiDimension="x"
                  />
                }
              >
                <ChartAxis />
                <ChartAxis dependentAxis showGrid />
                <ChartGroup>
                  <ChartArea data={a} name="API" interpolation="monotoneX" />
                  <ChartArea data={b} name="Worker" interpolation="monotoneX" />
                </ChartGroup>
              </Chart>
            </DemoFrame>
            <CodeBlock>{`const CursorVoronoi = createContainer("voronoi", "cursor");

<Chart
  containerComponent={
    <CursorVoronoi
      cursorDimension="x"
      voronoiDimension="x"
      mouseFollowTooltips
      labels={({ datum }) => \`\${datum.y}\`}
      labelComponent={
        <ChartLegendTooltip legendData={legendData} title={(d) => d.x} />
      }
    />
  }
>
  {/* … */}
</Chart>`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section title="Most-used props">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "labels", type: "(args) => string", description: "Formatter for the tooltip text. Include series name + x + y." },
                { name: "constrainToVisibleArea", type: "boolean", description: "Keep tooltips inside the plot — without it, tooltips near edges get clipped." },
                { name: "mouseFollowTooltips", type: "boolean", description: "Tooltip follows the cursor rather than anchoring to the data point." },
                { name: "voronoiDimension", type: '"x" | "y"', description: "Restrict the voronoi hit-test to one axis — 'x' is right for time-series (any vertical hover snaps to that x)." },
                { name: "cursorDimension", type: '"x" | "y"', description: "Which axis the crosshair tracks." },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section title="Rules">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Use voronoi for line / area / scatter.</strong> Hovering near a point should snap to that point — exact-pixel-hover is hostile.</li>
            <li><strong>Use cursor+voronoi for time-series</strong> with multiple series so users compare values at the same x.</li>
            <li><strong>Don&rsquo;t put critical info only in the tooltip.</strong> Touch / keyboard users may never see it. Annotate key points in the chart itself.</li>
            <li><strong>constrainToVisibleArea</strong> on every voronoi — without it edge tooltips clip behind chart chrome.</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
