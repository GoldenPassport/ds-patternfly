import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChartBullet } from "@patternfly/react-charts/victory";
import { FoundationPage, Section, Card, CodeBlock } from "../_kit/StoryKit.js";
import { DemoFrame, PropsTable } from "../_kit/DemoKit.js";
import { chartA11yParams } from "./_chartKit.js";

const meta: Meta = {
  title: "Charts/Bullet chart",
  parameters: { layout: "padded", a11y: chartA11yParams },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Bullet chart"
      intro={
        <>
          A single-metric performance chart — actual value, target,
          qualitative bands (poor / acceptable / good). Compact: fits in
          a card or table cell. Use for SLA dashboards, budget vs
          actual, capacity usage with thresholds.
        </>
      }
    >
      <Section title="Basic">
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame height={200}>
              <ChartBullet
                ariaTitle="SLA: API latency"
                ariaDesc="P99 latency vs 250ms SLA target."
                title="API latency"
                subTitle="p99 (ms)"
                primarySegmentedMeasureData={[{ name: "Actual", y: 180 }]}
                comparativeWarningMeasureData={[{ name: "Warning", y: 200 }]}
                comparativeErrorMeasureData={[{ name: "SLA", y: 250 }]}
                qualitativeRangeData={[
                  { name: "Range", y: 150 },
                  { name: "Range", y: 220 },
                  { name: "Range", y: 300 },
                ]}
                maxDomain={{ y: 300 }}
                height={200}
                width={500}
                padding={{ left: 100, right: 50, top: 60, bottom: 60 }}
              />
            </DemoFrame>
            <CodeBlock>{`<ChartBullet
  ariaTitle="SLA: API latency"
  ariaDesc="P99 latency vs 250ms SLA target."
  title="API latency"
  subTitle="p99 (ms)"
  primarySegmentedMeasureData={[{ name: "Actual", y: 180 }]}
  comparativeWarningMeasureData={[{ name: "Warning", y: 200 }]}
  comparativeErrorMeasureData={[{ name: "SLA", y: 250 }]}
  qualitativeRangeData={[
    { name: "OK",   y: 150 },
    { name: "Warn", y: 220 },
    { name: "Bad",  y: 300 },
  ]}
  maxDomain={{ y: 300 }}
/>`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section title="Most-used props">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "primarySegmentedMeasureData", type: "{ name, y }[]", description: "The actual value(s) — drawn as a solid bar." },
                { name: "comparativeErrorMeasureData", type: "{ name, y }[]", description: "The hard target / SLA — drawn as a tick at that value." },
                { name: "comparativeWarningMeasureData", type: "{ name, y }[]", description: "A soft target / warning threshold." },
                { name: "qualitativeRangeData", type: "{ name, y }[]", description: "Background bands (poor / acceptable / good). Cumulative — pass increasing y values." },
                { name: "maxDomain", type: "{ y: number }", description: "Cap the axis. Without it, Victory infers from data and bands may render cropped." },
                { name: "title / subTitle", type: "string", description: "Labels at the leading edge." },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section title="Accessibility">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Bullet charts compress a lot of meaning.</strong> The ariaDesc should spell it out — &ldquo;Actual 180 ms; warning at 200 ms; SLA breach at 250 ms.&rdquo;</li>
            <li><strong>Pair with the number.</strong> Render the actual value as text next to or below the chart — sighted users scan, blind users hear.</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
