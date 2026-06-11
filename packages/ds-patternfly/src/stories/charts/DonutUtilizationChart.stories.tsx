import type { Meta, StoryObj } from "@storybook/react-vite";
import { FoundationPage, Section, Card, Example } from "../_kit/StoryKit.js";
import { PropsTable } from "../_kit/DemoKit.js";
import { chartA11yParams } from "./_chartKit.js";
import { ThreeUtilizations } from "../../examples/charts/DonutUtilizationChart.example.js";
import donutUtilizationChartExampleSrc from "../../examples/charts/DonutUtilizationChart.example.tsx?raw";

const meta: Meta = {
  title: "Charts/Donut utilization chart",
  parameters: { layout: "padded", a11y: chartA11yParams },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Donut utilization chart"
      intro={
        <>
          The single-metric variant of Donut — a percentage filled arc
          with a centred count. Use for &ldquo;78% of disk used&rdquo;,
          &ldquo;62% of seats provisioned&rdquo;. Pair with{" "}
          <em>thresholds</em> for at-a-glance warning / danger banding.
        </>
      }
    >
      <Section title="Three utilizations">
        <Card>
          <Example
            source={donutUtilizationChartExampleSrc}
            region="ThreeUtilizations"
            fileName="DonutUtilizationChart.example.tsx"
            height={260}
          >
            <ThreeUtilizations />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example
            source={donutUtilizationChartExampleSrc}
            fileName="DonutUtilizationChart.example.tsx"
          />
        </Card>
      </Section>

      <Section title="Most-used props">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "data", type: "{ x, y }", description: "Single datum. y is the percentage (0–100)." },
                { name: "title / subTitle", type: "string", description: "Centre big number + small caption." },
                { name: "thresholds", type: "{ value: number; color?: string }[]", description: "Bands at which the arc colour changes. Default = warning at 60, danger at 90." },
                { name: "invert", type: "boolean", description: "Flip the colour meaning when high values are good (e.g. capacity remaining, not used)." },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section title="Patterns">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Match thresholds to your alert rules.</strong> If you page at 90% disk, the chart should turn red at 90% too — consistent visual language.</li>
            <li><strong>Use <code>invert</code></strong> when you&rsquo;re showing &ldquo;X% of seats unused&rdquo; etc — high should look bad, low should look good.</li>
            <li><strong>Render the raw values too.</strong> &ldquo;72% (3.6 / 5 TB)&rdquo; gives users both relative and absolute context.</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
