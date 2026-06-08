import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Chart,
  ChartAxis,
  ChartGroup,
  ChartLine,
  ChartThemeColor,
  getCustomTheme,
} from "@patternfly/react-charts/victory";
import { FoundationPage, Section, Card, CodeBlock } from "../_storyKit.js";
import { DemoFrame, PropsTable } from "../../components/DemoKit.js";
import { chartA11yParams } from "./_chartKit.js";

const meta: Meta = {
  title: "Charts/Themes",
  parameters: { layout: "padded", a11y: chartA11yParams },
};
export default meta;

const data1 = [{ x: 1, y: 1 }, { x: 2, y: 3 }, { x: 3, y: 5 }, { x: 4, y: 4 }, { x: 5, y: 6 }];
const data2 = [{ x: 1, y: 2 }, { x: 2, y: 4 }, { x: 3, y: 3 }, { x: 4, y: 5 }, { x: 5, y: 7 }];

// Build a custom theme once at module scope.
const customTheme = getCustomTheme(ChartThemeColor.blue, {
  area: { style: { data: { strokeWidth: 3 } } },
  line: { style: { data: { strokeWidth: 3 } } },
});

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Themes"
      intro={
        <>
          PF6 charts ship a default theme that maps to PF6 design tokens.
          Set <code>themeColor</code> to switch palettes (blue, green,
          multi, etc); use <code>getCustomTheme</code> to override
          specific style props (stroke width, label fonts, padding).
          Define custom themes once at module scope — passing a fresh
          object each render trashes Victory&rsquo;s diffing.
        </>
      }
    >
      <Section title="Default vs custom">
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16, gridTemplateColumns: "1fr 1fr" }}>
            <div>
              <div style={{ marginBottom: 4, color: "var(--gp-color-text-subtle)", fontSize: 13 }}>
                Default theme, themeColor=&quot;blue&quot;
              </div>
              <DemoFrame height={220}>
                <Chart
                  ariaTitle="Default theme"
                  themeColor="blue"
                  height={200}
                  padding={{ left: 60, right: 20, top: 20, bottom: 50 }}
                >
                  <ChartAxis />
                  <ChartAxis dependentAxis showGrid />
                  <ChartGroup>
                    <ChartLine data={data1} />
                    <ChartLine data={data2} />
                  </ChartGroup>
                </Chart>
              </DemoFrame>
            </div>
            <div>
              <div style={{ marginBottom: 4, color: "var(--gp-color-text-subtle)", fontSize: 13 }}>
                getCustomTheme — bolder strokes
              </div>
              <DemoFrame height={220}>
                <Chart
                  ariaTitle="Custom theme"
                  theme={customTheme}
                  height={200}
                  padding={{ left: 60, right: 20, top: 20, bottom: 50 }}
                >
                  <ChartAxis />
                  <ChartAxis dependentAxis showGrid />
                  <ChartGroup>
                    <ChartLine data={data1} />
                    <ChartLine data={data2} />
                  </ChartGroup>
                </Chart>
              </DemoFrame>
            </div>
          </div>
          <div style={{ padding: 24 }}>
            <CodeBlock>{`import { getCustomTheme, ChartThemeColor } from "@patternfly/react-charts/victory";

// Build once at module scope.
const bold = getCustomTheme(ChartThemeColor.blue, {
  area: { style: { data: { strokeWidth: 3 } } },
  line: { style: { data: { strokeWidth: 3 } } },
});

<Chart theme={bold} ariaTitle="...">{/* … */}</Chart>`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section title="Most-used hooks">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "themeColor", type: "string", description: "Palette name (blue / green / cyan / gold / gray / multi / multiOrdered / multiUnordered / orange / purple)." },
                { name: "theme", type: "VictoryThemeDefinition", description: "Override the whole theme. Use getCustomTheme to start from a PF6 base." },
                { name: "getCustomTheme(themeColor, overrides)", type: "fn", description: "Build a theme that merges PF6 defaults with your overrides." },
                { name: "ChartThemeColor", type: "enum-like const", description: "Use as keys to getCustomTheme — single source of truth for palette identifiers." },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section title="Patterns">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>One theme per dashboard.</strong> Inconsistent themes across charts make a page feel built by 5 teams.</li>
            <li><strong>Brand alignment.</strong> If your brand has a non-PF colour, build a theme from <code>multi</code> + your accent colour rather than overriding every chart.</li>
            <li><strong>Dark mode</strong> — PF6&rsquo;s <code>.pf-theme-dark</code> selector handles surface tokens; chart palettes inherit. Verify contrast on dark backgrounds.</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
