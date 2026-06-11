import type { Meta, StoryObj } from "@storybook/react-vite";
import { FoundationPage, Section, Card, Example } from "../_kit/StoryKit.js";
import { PropsTable } from "../_kit/DemoKit.js";
import { chartA11yParams } from "./_chartKit.js";
import { TwoSeriesWithTooltip } from "../../examples/charts/LineChart.example.js";
import lineChartExampleSrc from "../../examples/charts/LineChart.example.tsx?raw";

const meta: Meta = {
  title: "Charts/Line chart",
  parameters: { layout: "padded", a11y: chartA11yParams },
};
export default meta;

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
          <Example
            source={lineChartExampleSrc}
            region="TwoSeriesWithTooltip"
            fileName="LineChart.example.tsx"
            height={280}
          >
            <TwoSeriesWithTooltip />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example source={lineChartExampleSrc} fileName="LineChart.example.tsx" />
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
