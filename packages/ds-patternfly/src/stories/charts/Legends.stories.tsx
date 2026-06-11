import type { Meta, StoryObj } from "@storybook/react-vite";
import { FoundationPage, Section, Card, Example } from "../_kit/StoryKit.js";
import { PropsTable } from "../_kit/DemoKit.js";
import { chartA11yParams } from "./_chartKit.js";
import {
  LegendAtTheBottom,
  StandaloneChartLegend,
} from "../../examples/charts/Legends.example.js";
import legendsExampleSrc from "../../examples/charts/Legends.example.tsx?raw";

const meta: Meta = {
  title: "Charts/Legends",
  parameters: { layout: "padded", a11y: chartA11yParams },
};
export default meta;

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
          <Example
            source={legendsExampleSrc}
            region="LegendAtTheBottom"
            fileName="Legends.example.tsx"
            height={300}
          >
            <LegendAtTheBottom />
          </Example>
        </Card>
      </Section>

      <Section title="Standalone ChartLegend">
        <Card>
          <Example
            source={legendsExampleSrc}
            region="StandaloneChartLegend"
            fileName="Legends.example.tsx"
            height={80}
          >
            <StandaloneChartLegend />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example source={legendsExampleSrc} fileName="Legends.example.tsx" />
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
