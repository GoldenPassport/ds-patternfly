import type { Meta, StoryObj } from "@storybook/react-vite";
import { FoundationPage, Section, Card, Example } from "../_kit/StoryKit.js";
import { PropsTable } from "../_kit/DemoKit.js";
import { chartA11yParams } from "./_chartKit.js";
import {
  SingleSeries,
  MultipleSeries,
} from "../../examples/charts/AreaChart.example.js";
import areaChartExampleSrc from "../../examples/charts/AreaChart.example.tsx?raw";

const meta: Meta = {
  title: "Charts/Area chart",
  parameters: { layout: "padded", a11y: chartA11yParams },
};
export default meta;

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
          <Example
            source={areaChartExampleSrc}
            region="SingleSeries"
            fileName="AreaChart.example.tsx"
            height={260}
          >
            <SingleSeries />
          </Example>
        </Card>
      </Section>

      <Section title="Multiple series">
        <Card>
          <Example
            source={areaChartExampleSrc}
            region="MultipleSeries"
            fileName="AreaChart.example.tsx"
            height={260}
          >
            <MultipleSeries />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example source={areaChartExampleSrc} fileName="AreaChart.example.tsx" />
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
