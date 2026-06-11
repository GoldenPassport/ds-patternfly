import type { Meta, StoryObj } from "@storybook/react-vite";
import { FoundationPage, Section, Card, Example } from "../_kit/StoryKit.js";
import { PropsTable } from "../_kit/DemoKit.js";
import {
  VoronoiTooltip,
  CursorLegendTooltip,
} from "../../examples/charts/Tooltips.example.js";
import tooltipsExampleSrc from "../../examples/charts/Tooltips.example.tsx?raw";
import { chartA11yParams } from "./_chartKit.js";

const meta: Meta = {
  title: "Charts/Tooltips",
  parameters: { layout: "padded", a11y: chartA11yParams },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Tooltips"
      intro={
        <>
          Hover affordances that surface exact values. The two most-used
          patterns are <code>ChartVoronoiContainer</code> (hover anywhere
          in the plot area; nearest point wins) and{" "}
          <code>createContainer(&quot;voronoi&quot;, &quot;cursor&quot;)</code>{" "}
          (voronoi + crosshair line for time-series). Bare per-point
          hover targets are pixel-thin and frustrating — avoid them.
        </>
      }
    >
      <Section title="ChartVoronoiContainer">
        <Card>
          <Example
            source={tooltipsExampleSrc}
            region="VoronoiTooltip"
            fileName="Tooltips.example.tsx"
            height={280}
          >
            <VoronoiTooltip />
          </Example>
        </Card>
      </Section>

      <Section title="ChartLegendTooltip + voronoi+cursor">
        <Card>
          <Example
            source={tooltipsExampleSrc}
            region="CursorLegendTooltip"
            fileName="Tooltips.example.tsx"
            height={280}
          >
            <CursorLegendTooltip />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example source={tooltipsExampleSrc} fileName="Tooltips.example.tsx" />
        </Card>
      </Section>

      <Section title="Most-used props">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "labels", type: "(args) => string", description: "Formatter for the tooltip text. Include series name + x + y." },
                { name: "constrainToVisibleArea", type: "boolean", description: "Keep tooltips inside the plot — without it, tooltips near edges get clipped." },
                { name: "mouseFollowTooltips", type: "boolean", description: "Tooltip follows the cursor rather than anchoring to the data point." },
                { name: "voronoiDimension", type: '"x" | "y"', description: "Restrict the voronoi hit-test to one axis — 'x' is right for time-series (any vertical hover snaps to that x)." },
                { name: "cursorDimension", type: '"x" | "y"', description: "Which axis the crosshair tracks." },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section title="Rules">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Use voronoi for line / area / scatter.</strong> Hovering near a point should snap to that point — exact-pixel-hover is hostile.</li>
            <li><strong>Use cursor+voronoi for time-series</strong> with multiple series so users compare values at the same x.</li>
            <li><strong>Don&rsquo;t put critical info only in the tooltip.</strong> Touch / keyboard users may never see it. Annotate key points in the chart itself.</li>
            <li><strong>constrainToVisibleArea</strong> on every voronoi — without it edge tooltips clip behind chart chrome.</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
