import type { Meta, StoryObj } from "@storybook/react-vite";
import { Chart, ChartBar, ChartGroup } from "@patternfly/react-charts/victory";
import { FoundationPage, Section, Card, CodeBlock } from "../_storyKit.js";
import { DemoFrame } from "../../components/DemoKit.js";
import { chartA11yParams } from "./_chartKit.js";

const meta: Meta = {
  title: "Charts/Colors for charts",
  parameters: { layout: "padded", a11y: chartA11yParams },
};
export default meta;

const COLORS = [
  "blue", "cyan", "gold", "gray", "green", "multi", "multiOrdered", "multiUnordered", "orange", "purple",
] as const;

const series = [10, 20, 30, 40];

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Colors for charts"
      intro={
        <>
          PF6 ships ten named theme colours. Pass <code>themeColor</code>{" "}
          on any Chart wrapper to switch palettes — categorical
          (multi), monochrome (blue / green / etc), or semantic
          (status colours wired through Themes). Keep palettes
          consistent within a dashboard so users don&rsquo;t re-learn
          which series is which on each chart.
        </>
      }
    >
      <Section title="Built-in palettes">
        <Card>
          <div style={{ padding: 24, display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
            {COLORS.map((c) => (
              <div key={c}>
                <div style={{ marginBottom: 4, color: "var(--gp-color-text-subtle)", fontSize: 13 }}>
                  themeColor=&quot;{c}&quot;
                </div>
                <DemoFrame height={150}>
                  <Chart ariaTitle={`Palette ${c}`} themeColor={c} height={130} padding={20}>
                    <ChartGroup>
                      <ChartBar data={series.map((y, i) => ({ x: i + 1, y }))} />
                      <ChartBar data={series.map((y, i) => ({ x: i + 1, y: y + 5 }))} />
                      <ChartBar data={series.map((y, i) => ({ x: i + 1, y: y + 10 }))} />
                    </ChartGroup>
                  </Chart>
                </DemoFrame>
              </div>
            ))}
          </div>
        </Card>
      </Section>

      <Section title="Usage">
        <Card>
          <div style={{ padding: 24 }}>
            <CodeBlock>{`<Chart themeColor="blue" ariaTitle="Q1 revenue" ariaDesc="...">
  <ChartGroup>
    <ChartBar data={revenueData} />
  </ChartGroup>
</Chart>`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section title="Rules">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Monochrome for trend / single dimension.</strong> Blue, green, gold — when the chart is about one thing changing over time.</li>
            <li><strong>Multi for categorical compare.</strong> Use <code>multi</code> when slices / series are conceptually distinct (Sales / Marketing / Eng).</li>
            <li><strong>multiOrdered</strong> for series with implicit order (Low / Med / High).</li>
            <li><strong>Stay consistent across the dashboard.</strong> A given series should look the same across every chart that mentions it — re-learning a legend per chart is exhausting.</li>
            <li><strong>Pair with patterns</strong> when colour-blind support matters. See the <em>Patterns</em> chart page.</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
