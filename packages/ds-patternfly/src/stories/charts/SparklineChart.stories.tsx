import type { Meta, StoryObj } from "@storybook/react-vite";
import { FoundationPage, Section, Card, Example } from "../_kit/StoryKit.js";
import { PropsTable } from "../_kit/DemoKit.js";
import { KpiTileWithSparkline } from "../../examples/charts/SparklineChart.example.js";
import sparklineChartExampleSrc from "../../examples/charts/SparklineChart.example.tsx?raw";
import { chartA11yParams } from "./_chartKit.js";

const meta: Meta = {
  title: "Charts/Sparkline chart",
  parameters: { layout: "padded", a11y: chartA11yParams },
};
export default meta;

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
          <Example
            source={sparklineChartExampleSrc}
            region="KpiTileWithSparkline"
            fileName="SparklineChart.example.tsx"
          >
            <KpiTileWithSparkline />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example source={sparklineChartExampleSrc} fileName="SparklineChart.example.tsx" />
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
