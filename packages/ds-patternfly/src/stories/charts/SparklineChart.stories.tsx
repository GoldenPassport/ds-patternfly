import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Chart,
  ChartArea,
  ChartGroup,
  ChartVoronoiContainer,
} from "@patternfly/react-charts/victory";
import { FoundationPage, Section, Card, CodeBlock } from "../_storyKit.js";
import { DemoFrame, PropsTable } from "../_demoKit.js";
import { chartA11yParams } from "./_chartKit.js";

const meta: Meta = {
  title: "Charts/Sparkline chart",
  parameters: { layout: "padded", a11y: chartA11yParams },
};
export default meta;

const data = Array.from({ length: 24 }).map((_, i) => ({
  x: i,
  y: 30 + Math.sin(i / 3) * 12 + (i % 5) * 2,
}));

const Sparkline = ({ data: d, label, value, change }: { data: { x: number; y: number }[]; label: string; value: string; change: string }) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "1fr 120px",
      alignItems: "center",
      gap: 16,
      padding: 12,
      border: "1px solid var(--gp-color-border-subtle)",
      borderRadius: 8,
    }}
  >
    <div>
      <div style={{ color: "var(--gp-color-text-subtle)", fontSize: 13 }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 600, color: "var(--gp-color-text-regular)" }}>{value}</div>
      <div style={{ fontSize: 12, color: "var(--gp-color-text-subtle)" }}>{change}</div>
    </div>
    <Chart
      ariaTitle={label}
      ariaDesc={`${label} sparkline.`}
      height={50}
      width={120}
      padding={2}
      domainPadding={{ y: [2, 2] }}
      containerComponent={
        <ChartVoronoiContainer
          labels={({ datum }: { datum: { x: number; y: number } }) => `${datum.y.toFixed(0)}`}
          constrainToVisibleArea
        />
      }
    >
      <ChartGroup>
        <ChartArea data={d} interpolation="monotoneX" />
      </ChartGroup>
    </Chart>
  </div>
);

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Sparkline chart"
      intro={
        <>
          A miniature, axis-less Line / Area — sits inside a table cell or
          KPI tile to show recent trend at a glance. The point is
          shape, not values. PF6 doesn&rsquo;t ship a dedicated{" "}
          <code>ChartSparkline</code>; compose with{" "}
          <code>Chart + ChartArea</code> and zero out the padding.
        </>
      }
    >
      <Section title="KPI tile with sparkline">
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 12 }}>
            <DemoFrame>
              <div style={{ display: "grid", gap: 12, maxWidth: 480 }}>
                <Sparkline
                  data={data}
                  label="API requests"
                  value="2.4k"
                  change="+12% vs last hour"
                />
                <Sparkline
                  data={data.map((p) => ({ ...p, y: 30 - p.y / 2 }))}
                  label="Error rate"
                  value="0.4%"
                  change="-0.2% vs last hour"
                />
              </div>
            </DemoFrame>
            <CodeBlock>{`function Sparkline({ data, label, value, change }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 120px", alignItems: "center", gap: 16 }}>
      <div>
        <div style={{ fontSize: 13, color: "var(--gp-color-text-subtle)" }}>{label}</div>
        <div style={{ fontSize: 22, fontWeight: 600 }}>{value}</div>
        <div style={{ fontSize: 12 }}>{change}</div>
      </div>
      <Chart
        ariaTitle={label}
        ariaDesc={\`\${label} sparkline\`}
        height={50}
        width={120}
        padding={2}
      >
        <ChartGroup>
          <ChartArea data={data} interpolation="monotoneX" />
        </ChartGroup>
      </Chart>
    </div>
  );
}`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section title="Rules">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "no axes", type: "—", description: "Skip ChartAxis entirely. The point is shape, not values." },
                { name: "tight padding", type: "padding={2}", description: "Push the line edge-to-edge inside the SVG." },
                { name: "fixed dimensions", type: "height/width", description: "Sparklines belong in a known container size. Don't rely on resize observer for these — the surrounding KPI tile owns the layout." },
                { name: "tooltip for exact values", type: "ChartVoronoiContainer", description: "Sparklines don't show numbers; tooltips fill the gap on hover." },
                { name: "headline number is the message", type: "—", description: "The sparkline supports the headline number. Without it, the chart is unreadable on its own." },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section title="Accessibility">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Always render the headline number as text.</strong> The sparkline is decorative reinforcement.</li>
            <li><strong>ariaDesc should summarise the trend</strong> (&ldquo;Increasing over the past 24 hours&rdquo;) — sparklines are pure shape.</li>
            <li><strong>Don&rsquo;t cram into a tiny cell.</strong> &lt; 80px wide is unreadable; use a 24-hour summary text instead.</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
