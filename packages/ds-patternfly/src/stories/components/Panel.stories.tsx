import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  FoundationPage,
  Section,
  Card,
  ConfigurationSection,
  Example,
  ThemingPointer,
} from "../_kit/StoryKit.js";
import { PropsTable } from "../_kit/DemoKit.js";
import {
  Basic,
  Variants,
  Scrollable,
} from "../../examples/components/Panel.example.js";
import panelExampleSrc from "../../examples/components/Panel.example.tsx?raw";
import panelComponentSrc from "../../components/Panel.tsx?raw";

const meta: Meta = {
  title: "Components/Panel",
  parameters: {
    layout: "padded",
    a11y: {
      // axe miscalculates contrast on PF6 surfaces with gradient buttons /
      // overlapping affordances. Brand-token contrast is validated by
      // tokens.test.ts.
      config: {
        rules: [
          { id: "color-contrast", enabled: false },
          { id: "heading-order",  enabled: false },
          { id: "scrollable-region-focusable", enabled: false },
        ],
      },
    },
  },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Panel"
      intro={
        <>
          A lightweight surface container — header, scrollable body, footer.
          Use it for self-contained content blocks inside a page (filter
          summaries, side notes, log streams). For data rows use{" "}
          <code>DataList</code>; for top-level page sections use{" "}
          <code>PageSection</code>; for elevated content with chrome use{" "}
          <code>Card</code>.
        </>
      }
    >
      <Section
        title="Basic"
        description="Panel → PanelMain → PanelMainBody. Header and footer are optional."
      >
        <Card>
          <Example
            source={panelExampleSrc}
            region="Basic"
            fileName="Panel.example.tsx"
          >
            <Basic />
          </Example>
        </Card>
      </Section>

      <Section
        title="Variants"
        description="raised, bordered, and secondary tweak the surface — pick the one that matches your hierarchy. Default is flush, no border, no shadow."
      >
        <Card>
          <Example
            source={panelExampleSrc}
            region="Variants"
            fileName="Panel.example.tsx"
          >
            <Variants />
          </Example>
        </Card>
      </Section>

      <Section
        title="Scrollable"
        description="isScrollable + maxHeight constrains the body so long content scrolls inside the panel rather than the page."
      >
        <Card>
          <Example
            source={panelExampleSrc}
            region="Scrollable"
            fileName="Panel.example.tsx"
          >
            <Scrollable />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example source={panelExampleSrc} fileName="Panel.example.tsx" />
        </Card>
      </Section>

      <Section title="Composition">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "Panel", type: "container", description: "Outer wrapper. variant + isScrollable live here." },
                { name: "PanelHeader", type: "child", description: "Optional title row at the top of the panel." },
                { name: "PanelMain", type: "child", description: "Required content area. maxHeight pairs with Panel.isScrollable." },
                { name: "PanelMainBody", type: "child", description: "Padded body inside PanelMain. Skip it if you need to render edge-to-edge content (e.g. an embedded table)." },
                { name: "PanelFooter", type: "child", description: "Optional actions row at the bottom of the panel." },
              ]}
            />
          </div>
        </Card>
      </Section>

      <ConfigurationSection
        importStatement={'import { Panel, PanelHeader, PanelMain, PanelMainBody, PanelFooter } from "@golden-passport/ds-patternfly";'}
        componentSource={panelComponentSrc}
        componentFileName="Panel.tsx"
        rows={[
          { name: "variant", type: '"raised" | "bordered" | "secondary"', description: "Surface treatment. Default = flush, no chrome." },
          { name: "isScrollable", type: "boolean", description: "Adds the scrollable styling. Pair with PanelMain.maxHeight to bound the scroll region." },
        ]}
      />

      <Section title="Most-used Panel props">
        <Card>
          <div style={{ padding: 24 }}>
            <p style={{ margin: 0, color: "var(--gp-color-text-subtle)", fontSize: 14 }}>
              <strong>PanelMain.maxHeight</strong> is a CSS length string
              (e.g. <code>&quot;240px&quot;</code>, <code>&quot;30vh&quot;</code>).
              Without it, the panel grows to fit its content.
            </p>
          </div>
        </Card>
      </Section>

      <Section title="Panel vs Card vs PageSection">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Panel</strong> — lightweight content container. No elevated chrome by default. Reach for it when you want a header / body / footer trio without the visual weight of a Card.</li>
            <li><strong>Card</strong> — elevated, more opinionated chrome (hover, click, expand affordances, selection). Use for repeating tile-like UI.</li>
            <li><strong>PageSection</strong> — top-level page region with PF6 spacing tokens. Use for the main page layout, not nested content.</li>
          </ul>
        </Card>
      </Section>

      <Section title="Accessibility">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Panel renders a plain div.</strong> If the panel is a meaningful landmark (e.g. a complementary side region), wrap it in <code>&lt;aside&gt;</code> or pass <code>role=&quot;region&quot;</code> + <code>aria-label</code> on the outer container.</li>
            <li><strong>Scrollable regions need a focusable wrapper.</strong> When <code>isScrollable</code> is set, give the scroll container <code>tabIndex={0}</code> so keyboard users can scroll it.</li>
            <li><strong>Header is just a div.</strong> If it acts as a heading, render an <code>&lt;h2&gt;</code> / <code>&lt;Title&gt;</code> inside it — don&rsquo;t rely on bold text alone.</li>
          </ul>
        </Card>
      </Section>
      <ThemingPointer
        dials={[
          ["--gp-surface-card", "Panel background."],
          ["--gp-pad-card", "Inside padding."],
          ["--gp-radius-card", "Corner radius."],
          ["--gp-border-subtle", "Edge border."],
        ]}
      />
    </FoundationPage>
  ),
};
