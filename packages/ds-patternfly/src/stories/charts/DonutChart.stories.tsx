import type { Meta, StoryObj } from "@storybook/react-vite";
import { FoundationPage, Section, Card, Example } from "../_kit/StoryKit.js";
import { PropsTable } from "../_kit/DemoKit.js";
import { chartA11yParams } from "./_chartKit.js";
import { CentredTotal } from "../../examples/charts/DonutChart.example.js";
import donutChartExampleSrc from "../../examples/charts/DonutChart.example.tsx?raw";

const meta: Meta = {
  title: "Charts/Donut chart",
  parameters: { layout: "padded", a11y: chartA11yParams },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Donut chart"
      intro={
        <>
          A pie with a hole for centre text — &ldquo;163 workflows&rdquo;
          big number + slice breakdown. Cap at ~6 slices; beyond that
          it&rsquo;s legible as a Bar but unreadable as a donut. The hole
          is the killer feature: it puts the topline number front and
          centre.
        </>
      }
    >
      <Section title="Centred total">
        <Card>
          <Example
            source={donutChartExampleSrc}
            region="CentredTotal"
            fileName="DonutChart.example.tsx"
            height={280}
          >
            <CentredTotal />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example source={donutChartExampleSrc} fileName="DonutChart.example.tsx" />
        </Card>
      </Section>

      <Section title="Most-used props">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "data", type: "{ x, y }[]", description: "Slice data." },
                { name: "title", type: "string", description: "Big centre text — usually the total." },
                { name: "subTitle", type: "string", description: "Small caption under the title." },
                { name: "labels", type: "(args) => string", description: "Tooltip / accessible-label formatter per slice." },
                { name: "donutHeight / innerRadius", type: "number", description: "Tweak the hole size. Default reads well for most dashboards." },
                { name: "themeColor", type: "string", description: "Palette. Use 'multi' for categorical, single colour for monochrome." },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section title="Patterns">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Always pair with a legend</strong> when slices &gt; 2. Colour alone is hard to read at small sizes.</li>
            <li><strong>Highlight the &ldquo;at risk&rdquo; slice.</strong> When one wedge represents failures / errors, colour it red regardless of position so users scan to it.</li>
            <li><strong>Don&rsquo;t use for time series.</strong> Donuts compare composition at a single point in time. Trends go in Area / Line.</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
