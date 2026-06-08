import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChartDonutUtilization } from "@patternfly/react-charts/victory";
import { FoundationPage, Section, Card, CodeBlock } from "../../components/StoryKit.js";
import { DemoFrame, PropsTable } from "../../components/DemoKit.js";
import { chartA11yParams } from "./_chartKit.js";

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
          <div style={{ padding: 24, display: "grid", gap: 16, gridTemplateColumns: "repeat(3, 1fr)" }}>
            <DemoFrame height={260}>
              <ChartDonutUtilization
                ariaTitle="CPU utilization"
                ariaDesc="35% of CPU capacity used."
                data={{ x: "CPU", y: 35 }}
                title="35%"
                subTitle="CPU"
                thresholds={[{ value: 60 }, { value: 90 }]}
                height={240}
                width={240}
              />
            </DemoFrame>
            <DemoFrame height={260}>
              <ChartDonutUtilization
                ariaTitle="Memory utilization"
                ariaDesc="72% of memory used — past the warning threshold."
                data={{ x: "Memory", y: 72 }}
                title="72%"
                subTitle="Memory"
                thresholds={[{ value: 60 }, { value: 90 }]}
                height={240}
                width={240}
              />
            </DemoFrame>
            <DemoFrame height={260}>
              <ChartDonutUtilization
                ariaTitle="Disk utilization"
                ariaDesc="92% of disk used — past the danger threshold."
                data={{ x: "Disk", y: 92 }}
                title="92%"
                subTitle="Disk"
                thresholds={[{ value: 60 }, { value: 90 }]}
                height={240}
                width={240}
              />
            </DemoFrame>
          </div>
          <div style={{ padding: 24 }}>
            <CodeBlock>{`<ChartDonutUtilization
  ariaTitle="Disk utilization"
  ariaDesc="92% of disk used."
  data={{ x: "Disk", y: 92 }}
  title="92%"
  subTitle="Disk"
  thresholds={[{ value: 60 }, { value: 90 }]}
/>`}</CodeBlock>
          </div>
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
