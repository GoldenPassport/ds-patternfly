import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Chart,
  ChartArea,
  ChartAxis,
  ChartGroup,
} from "@patternfly/react-charts/victory";
import { FoundationPage, Section, Card, CodeBlock } from "../../components/StoryKit.js";
import { DemoFrame, PropsTable } from "../../components/DemoKit.js";
import { chartA11yParams } from "./_chartKit.js";

const meta: Meta = {
  title: "Charts/Resize observer",
  parameters: { layout: "padded", a11y: chartA11yParams },
};
export default meta;

const data = [
  { x: 1, y: 1 }, { x: 2, y: 3 }, { x: 3, y: 2 }, { x: 4, y: 5 }, { x: 5, y: 4 },
];

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Resize observer"
      intro={
        <>
          Charts default to a fixed <code>width</code> + <code>height</code>{" "}
          in pixels. To make a chart fluid (fill its container, resize as
          the window changes), wrap it in a sized parent and let PF6&rsquo;s
          built-in <code>containerComponent</code> watch for resize via{" "}
          <code>ResizeObserver</code>. Pass <code>height</code> only; let
          width come from the container.
        </>
      }
    >
      <Section
        title="Container-driven width"
        description="Resize the Storybook canvas — the chart fills the width of its bounded parent."
      >
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame height={260}>
              <div style={{ width: "100%", height: 240 }}>
                <Chart
                  ariaTitle="Resizable area"
                  ariaDesc="A chart that fills the width of its container."
                  height={240}
                  padding={{ left: 60, right: 20, top: 20, bottom: 50 }}
                  // Omit `width` — Victory's default container reads from layout.
                >
                  <ChartAxis />
                  <ChartAxis dependentAxis showGrid />
                  <ChartGroup>
                    <ChartArea data={data} interpolation="monotoneX" />
                  </ChartGroup>
                </Chart>
              </div>
            </DemoFrame>
            <CodeBlock>{`<div style={{ width: "100%", height: 240 }}>
  <Chart
    ariaTitle="Resizable area"
    height={240}
    /* don't set width — let the container drive it */
  >
    {/* … */}
  </Chart>
</div>`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section title="Most-used pattern">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "parent has width", type: "CSS", description: "Wrap the chart in a div with a real width (100%, flex item, grid cell). Charts that sit inside an inline-block parent get 0 width." },
                { name: "set height", type: "number", description: "Always pass an explicit height — autoheight needs aspect ratio knowledge Victory doesn't have." },
                { name: "omit width", type: "—", description: "Don't pass width; the container measures and forwards." },
                { name: "domainPadding", type: "{ x, y }", description: "Without it, last bars / first points get clipped at narrow widths. Add ~20px each end as a safety." },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section title="Rules">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Re-render on resize is cheap.</strong> Victory&rsquo;s SVG reflows naturally — no manual debounce required for typical dashboard sizes.</li>
            <li><strong>Aspect ratio.</strong> If your design system mandates a 16:9 chart, compute height from container width in a small wrapper hook.</li>
            <li><strong>Don&rsquo;t resize on tab blur.</strong> Charts that animate-resize while the user can&rsquo;t see them waste CPU — pause via IntersectionObserver if you care.</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
