import type { Meta, StoryObj } from "@storybook/react-vite";
import { FoundationPage, Section, Card, Example } from "../_kit/StoryKit.js";
import { PropsTable } from "../_kit/DemoKit.js";
import {
  Basic,
  FullChrome,
  WithTabs,
} from "../../examples/component-groups/PageHeader.example.js";
import pageHeaderExampleSrc from "../../examples/component-groups/PageHeader.example.tsx?raw";

const meta: Meta = {
  title: "Component groups/Content containers/Page header",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Page header"
      intro={
        <>
          A standard top-of-page header — title, subtitle, optional
          breadcrumbs, an action menu, an icon, and a status label slot.
          Use it as the first child of every PageSection so titles
          render consistently across the app. For app-shell chrome
          (logo, nav), use <code>Masthead</code> instead.
        </>
      }
    >
      <Section title="Basic">
        <Card>
          <Example
            source={pageHeaderExampleSrc}
            region="Basic"
            fileName="PageHeader.example.tsx"
          >
            <Basic />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full chrome"
        description="Breadcrumbs, icon, status label, and an action menu — the standard 'detail page' header."
      >
        <Card>
          <Example
            source={pageHeaderExampleSrc}
            region="FullChrome"
            fileName="PageHeader.example.tsx"
          >
            <FullChrome />
          </Example>
        </Card>
      </Section>

      <Section
        title="With tabs"
        description="Detail-page pattern: PageHeader, a Tabs navigation strip, and the active TabContent panel stacked with the DS section dial (--gp-pad-section) between them. Works whenever a single 'thing' has multiple views (Details / YAML / Events, etc)."
      >
        <Card>
          <Example
            source={pageHeaderExampleSrc}
            region="WithTabs"
            fileName="PageHeader.example.tsx"
          >
            <WithTabs />
          </Example>
          <p
            style={{
              margin: 0,
              padding: "0 24px 24px",
              color: "var(--gp-color-text-subtle)",
              fontSize: 14,
            }}
          >
            Flex column stacks header → tabs → content. The Tabs
            render at PF6&apos;s default padding (same as the
            standalone <strong>Components / Tabs</strong> story)
            — they inherit the host card&apos;s inline padding,
            so the labels naturally align with the breadcrumb /
            body column. Only one inline style on the Tabs:{" "}
            <code>marginBlockEnd: var(--gp-pad-section)</code>{" "}
            for the rhythm to the body content below. Tabs render
            as <code>&lt;nav&gt;</code> via <code>component=&quot;nav&quot;</code>{" "}
            so the <code>aria-label</code> is a valid landmark.
            <code>tabContentId</code> wires each Tab to its panel
            for screen readers; only the active panel renders
            via the <code>hidden</code> prop.
          </p>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example source={pageHeaderExampleSrc} fileName="PageHeader.example.tsx" />
        </Card>
      </Section>

      <Section title="Most-used props">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "title", type: "ReactNode", description: "The h1 of the page. Renders inside an `<h1>` by default." },
                { name: "subtitle", type: "ReactNode", description: "One-line context under the title — what the page is for." },
                { name: "breadcrumbs", type: "ReactNode", description: "Slot for a Breadcrumb component above the title." },
                { name: "icon", type: "ReactNode", description: "Decorative icon next to the title with a visual divider." },
                { name: "label", type: "ReactNode", description: "Status / state label rendered next to the title (e.g. <Label>Active</Label>)." },
                { name: "actionMenu", type: "ReactNode", description: "Trailing menu / button — typically a kebab Dropdown or a primary action Button." },
                { name: "linkProps", type: "{ label, isExternal?, ...ButtonProps }", description: "Optional link below the subtitle (docs, runbook). Pass `component='a'` + `href` for a real anchor." },
                { name: "headingClassname", type: "string", description: "Custom class on the inner `<h1>` — useful for app-specific typography overrides." },
                { name: "ouiaId", type: "string | number", description: "Stable test selector." },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section title="Accessibility">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>One <code>title</code> per page.</strong> PageHeader renders an h1 — don&rsquo;t render another in the same view.</li>
            <li><strong>Action menus need an aria-label.</strong> Pass it through to the `MenuToggle` inside <code>actionMenu</code> so screen readers announce what the kebab opens.</li>
            <li><strong>Decorative icons are aria-hidden.</strong> Don&rsquo;t rely on the <code>icon</code> slot for meaning — use a <code>label</code> if you need to communicate state.</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
