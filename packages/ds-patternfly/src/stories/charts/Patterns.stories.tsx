import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Chart,
  ChartAxis,
  ChartBar,
  ChartGroup,
} from "@patternfly/react-charts/victory";
import { FoundationPage, Section, Card, CodeBlock } from "../_storyKit.js";
import { DemoFrame } from "../../components/DemoKit.js";
import { chartA11yParams } from "./_chartKit.js";

const meta: Meta = {
  title: "Charts/Patterns",
  parameters: { layout: "padded", a11y: chartA11yParams },
};
export default meta;

const data1 = [
  { x: "Q1", y: 40 }, { x: "Q2", y: 70 }, { x: "Q3", y: 55 }, { x: "Q4", y: 80 },
];
const data2 = data1.map((p) => ({ ...p, y: p.y + 12 }));

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Patterns"
      intro={
        <>
          SVG fill patterns (diagonal stripes, dots, crosshatch) as a
          second signal alongside colour. Use them when colour-blind
          accessibility matters, when printing in monochrome, or when
          the chart will be screen-shot to slides where reader colour
          fidelity isn&rsquo;t guaranteed.
        </>
      }
    >
      <Section
        title="Pattern fills"
        description="Define <pattern> elements once in an SVG <defs>, then reference them as fills on chart series via style.data.fill."
      >
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame height={280}>
              <svg width={0} height={0} style={{ position: "absolute" }}>
                <defs>
                  <pattern id="diag" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
                    <rect width="6" height="6" fill="var(--pf-t--chart--color--blue--400, #06c)" />
                    <line x1="0" y1="0" x2="0" y2="6" stroke="white" strokeWidth="2" />
                  </pattern>
                  <pattern id="dots" patternUnits="userSpaceOnUse" width="6" height="6">
                    <rect width="6" height="6" fill="var(--pf-t--chart--color--purple--400, #5752d1)" />
                    <circle cx="3" cy="3" r="1.2" fill="white" />
                  </pattern>
                </defs>
              </svg>
              <Chart
                ariaTitle="Quarterly revenue (patterned)"
                ariaDesc="Two products by quarter, distinguished by diagonal vs dotted fill."
                height={260}
                domainPadding={{ x: [40, 40] }}
                padding={{ left: 60, right: 20, top: 20, bottom: 60 }}
                legendData={[{ name: "Pro" }, { name: "Enterprise" }]}
                legendPosition="bottom"
              >
                <ChartAxis />
                <ChartAxis dependentAxis showGrid />
                <ChartGroup offset={14}>
                  <ChartBar data={data1} style={{ data: { fill: "url(#diag)" } }} />
                  <ChartBar data={data2} style={{ data: { fill: "url(#dots)" } }} />
                </ChartGroup>
              </Chart>
            </DemoFrame>
            <CodeBlock>{`<svg width={0} height={0} style={{ position: "absolute" }}>
  <defs>
    <pattern id="diag" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
      <rect width="6" height="6" fill="var(--pf-t--chart--color--blue--400)" />
      <line x1="0" y1="0" x2="0" y2="6" stroke="white" strokeWidth="2" />
    </pattern>
  </defs>
</svg>

<Chart ariaTitle="…">
  <ChartGroup>
    <ChartBar data={pro}        style={{ data: { fill: "url(#diag)" } }} />
    <ChartBar data={enterprise} style={{ data: { fill: "url(#dots)" } }} />
  </ChartGroup>
</Chart>`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section title="Rules">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Use patterns sparingly.</strong> Two or three distinct patterns per chart — more and the eye loses the signal.</li>
            <li><strong>Pair pattern + colour.</strong> Pattern is a redundant cue; the colour still helps for everyone else.</li>
            <li><strong>Define patterns once.</strong> Drop a single <code>&lt;defs&gt;</code> block at app root so every chart can reference them.</li>
            <li><strong>Make patterns dense enough.</strong> Thin stripes disappear at small chart sizes — test at the smallest size the chart renders.</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
