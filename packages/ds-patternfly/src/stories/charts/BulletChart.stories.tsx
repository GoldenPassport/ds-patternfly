import type { Meta, StoryObj } from "@storybook/react-vite";
import { FoundationPage, Section, Card, Example } from "../_kit/StoryKit.js";
import { PropsTable } from "../_kit/DemoKit.js";
import { chartA11yParams } from "./_chartKit.js";
import { Basic } from "../../examples/charts/BulletChart.example.js";
import bulletChartExampleSrc from "../../examples/charts/BulletChart.example.tsx?raw";

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
          <Example
            source={bulletChartExampleSrc}
            region="Basic"
            fileName="BulletChart.example.tsx"
            height={200}
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
          <Example source={bulletChartExampleSrc} fileName="BulletChart.example.tsx" />
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
