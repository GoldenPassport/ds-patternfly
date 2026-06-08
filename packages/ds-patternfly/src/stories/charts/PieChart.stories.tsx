import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChartContainer, ChartPie } from "@patternfly/react-charts/victory";
import { FoundationPage, Section, Card, CodeBlock } from "../../components/StoryKit.js";
import { DemoFrame, PropsTable } from "../../components/DemoKit.js";
import { chartA11yParams } from "./_chartKit.js";

const meta: Meta = {
  title: "Charts/Pie chart",
  parameters: { layout: "padded", a11y: chartA11yParams },
};
export default meta;

const data = [
  { x: "Pro",        y: 60 },
  { x: "Enterprise", y: 25 },
  { x: "Free",       y: 15 },
];

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
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame height={300}>
              {/* responsive={false} renders the chart at its fixed
                  width×height instead of scaling to fill the container —
                  otherwise the SVG stretches to the frame width and its
                  height balloons, overflowing onto the code block below. */}
              <ChartPie
                ariaTitle="Plan distribution"
                ariaDesc="60% Pro, 25% Enterprise, 15% Free."
                data={data}
                labels={({ datum }: { datum: { x: string; y: number } }) =>
                  `${datum.x}: ${datum.y}%`
                }
                themeColor="multi"
                height={260}
                width={440}
                legendData={data.map((d) => ({ name: `${d.x} (${d.y}%)` }))}
                legendPosition="right"
                padding={{ top: 10, bottom: 10, left: 10, right: 160 }}
                containerComponent={<ChartContainer responsive={false} />}
              />
            </DemoFrame>
            <CodeBlock>{`<ChartPie
  ariaTitle="Plan distribution"
  ariaDesc="60% Pro, 25% Enterprise, 15% Free."
  data={data}
  labels={({ datum }) => \`\${datum.x}: \${datum.y}%\`}
  themeColor="multi"
  legendData={data.map(d => ({ name: \`\${d.x} (\${d.y}%)\` }))}
  legendPosition="right"
/>`}</CodeBlock>
          </div>
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
