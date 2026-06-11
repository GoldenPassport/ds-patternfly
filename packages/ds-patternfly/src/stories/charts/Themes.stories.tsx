import type { Meta, StoryObj } from "@storybook/react-vite";
import { FoundationPage, Section, Card, Example } from "../_kit/StoryKit.js";
import { PropsTable } from "../_kit/DemoKit.js";
import { DefaultVsCustom } from "../../examples/charts/Themes.example.js";
import themesExampleSrc from "../../examples/charts/Themes.example.tsx?raw";
import { chartA11yParams } from "./_chartKit.js";

const meta: Meta = {
  title: "Charts/Themes",
  parameters: { layout: "padded", a11y: chartA11yParams },
};
export default meta;

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
          <Example
            source={themesExampleSrc}
            region="DefaultVsCustom"
            fileName="Themes.example.tsx"
            height={250}
          >
            <DefaultVsCustom />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example source={themesExampleSrc} fileName="Themes.example.tsx" />
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
