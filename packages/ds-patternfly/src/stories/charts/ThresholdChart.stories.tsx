import type { Meta, StoryObj } from "@storybook/react-vite";
import { FoundationPage, Section, Card, Example } from "../_kit/StoryKit.js";
import { PropsTable } from "../_kit/DemoKit.js";
import { MetricWithThresholds } from "../../examples/charts/ThresholdChart.example.js";
import thresholdChartExampleSrc from "../../examples/charts/ThresholdChart.example.tsx?raw";
import { chartA11yParams } from "./_chartKit.js";

const meta: Meta = {
  title: "Charts/Threshold chart",
  parameters: { layout: "padded", a11y: chartA11yParams },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Threshold chart"
      intro={
        <>
          A line chart with horizontal threshold overlays — warning,
          danger, SLA targets. Renders the metric and the alert
          thresholds in the same view so users see breaches in
          context. Use for latency-vs-SLA, error-rate-vs-budget, any
          &ldquo;we set a target; did we hit it?&rdquo; chart.
        </>
      }
    >
      <Section title="Metric + warning + danger">
        <Card>
          <Example
            source={thresholdChartExampleSrc}
            region="MetricWithThresholds"
            fileName="ThresholdChart.example.tsx"
            height={280}
          >
            <MetricWithThresholds />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example source={thresholdChartExampleSrc} fileName="ThresholdChart.example.tsx" />
        </Card>
      </Section>

      <Section title="Most-used props">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "data", type: "{ x, y }[]", description: "Threshold line points. For a horizontal threshold, every y is the same constant." },
                { name: "name", type: "string", description: "Identifier for legend + tooltip association." },
                { name: "style.data.stroke", type: "CSS colour", description: "Threshold colour. Use status tokens (warning / danger) so the meaning carries." },
                { name: "style.data.strokeDasharray", type: "string", description: "Dashed thresholds read as 'limit lines' vs solid metric lines. Try '5,5'." },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section title="Rules">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Use status colours.</strong> Warning gold, danger red — same tokens as Alert / Status so the visual language carries.</li>
            <li><strong>Dash the thresholds</strong> so they read as &ldquo;limit lines&rdquo; not &ldquo;another series&rdquo;.</li>
            <li><strong>Label breaches.</strong> When the metric crosses the danger line, annotate the X-value — that&rsquo;s usually what the user opens the page to find.</li>
            <li><strong>Match thresholds to alerts.</strong> If your monitoring pages at 260 ms p99, the chart threshold should be 260 ms too.</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
