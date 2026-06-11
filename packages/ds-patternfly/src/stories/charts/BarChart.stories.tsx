import type { Meta, StoryObj } from "@storybook/react-vite";
import { FoundationPage, Section, Card, Example } from "../_kit/StoryKit.js";
import { PropsTable } from "../_kit/DemoKit.js";
import { chartA11yParams } from "./_chartKit.js";
import {
  GroupedBars,
  Horizontal,
} from "../../examples/charts/BarChart.example.js";
import barChartExampleSrc from "../../examples/charts/BarChart.example.tsx?raw";

const meta: Meta = {
  title: "Charts/Bar chart",
  parameters: { layout: "padded", a11y: chartA11yParams },
};
export default meta;

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
          <Example
            source={barChartExampleSrc}
            region="GroupedBars"
            fileName="BarChart.example.tsx"
            height={260}
          >
            <GroupedBars />
          </Example>
        </Card>
      </Section>

      <Section title="Horizontal">
        <Card>
          <Example
            source={barChartExampleSrc}
            region="Horizontal"
            fileName="BarChart.example.tsx"
            height={260}
          >
            <Horizontal />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example source={barChartExampleSrc} fileName="BarChart.example.tsx" />
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
