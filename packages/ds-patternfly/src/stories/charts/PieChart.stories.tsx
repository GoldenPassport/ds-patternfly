import type { Meta, StoryObj } from "@storybook/react-vite";
import { FoundationPage, Section, Card, Example } from "../_kit/StoryKit.js";
import { PropsTable } from "../_kit/DemoKit.js";
import { Basic } from "../../examples/charts/PieChart.example.js";
import pieChartExampleSrc from "../../examples/charts/PieChart.example.tsx?raw";
import { chartA11yParams } from "./_chartKit.js";

const meta: Meta = {
  title: "Charts/Pie chart",
  parameters: { layout: "padded", a11y: chartA11yParams },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Pie chart"
      intro={
        <>
          Composition of a whole — slices that sum to 100%. Prefer Donut
          over Pie when you have a meaningful centre value to surface;
          Pie is right when slice comparison itself is the point.
        </>
      }
    >
      <Section title="Basic">
        <Card>
          <Example
            source={pieChartExampleSrc}
            region="Basic"
            fileName="PieChart.example.tsx"
            height={300}
          >
            <Basic />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example source={pieChartExampleSrc} fileName="PieChart.example.tsx" />
        </Card>
      </Section>

      <Section title="Most-used props">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "data", type: "{ x, y }[]", description: "Required — slice data. Values should sum meaningfully." },
                { name: "labels", type: "(args) => string", description: "Tooltip / accessible-label formatter. Include the percentage." },
                { name: "legendData", type: "{ name }[]", description: "Per-slice legend; bake the count or percentage into the name." },
                { name: "legendPosition", type: '"bottom" | "right"', description: "Right works well with portrait pies; bottom for landscape." },
                { name: "padAngle", type: "number", description: "Pixel gap between slices — gives the chart breathing room when slices have similar colours." },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section title="Pie vs Donut">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Pie</strong> — when the slices are the point. No centre value.</li>
            <li><strong>Donut</strong> — when you also want a topline number (&ldquo;163 workflows&rdquo;) in the middle.</li>
            <li><strong>Bar</strong> — when there are more than 6 slices, or comparing magnitudes precisely matters. Humans read bar lengths better than wedge angles.</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
