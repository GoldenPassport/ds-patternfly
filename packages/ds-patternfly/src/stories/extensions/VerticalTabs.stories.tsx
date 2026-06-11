import type { Meta, StoryObj } from "@storybook/react-vite";
import { FoundationPage, Section, Card, Example } from "../_kit/StoryKit.js";
import { PropsTable } from "../_kit/DemoKit.js";
import { Default, Nested } from "../../examples/extensions/VerticalTabs.example.js";
import verticalTabsExampleSrc from "../../examples/extensions/VerticalTabs.example.tsx?raw";

const meta: Meta = {
  title: "Extensions/Catalog view/Vertical tabs",
  parameters: {
    layout: "padded",
    a11y: {
      config: {
        rules: [
          { id: "color-contrast", enabled: false },
          { id: "listitem", enabled: false },
        ],
      },
    },
  },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Vertical tabs"
      intro={
        <>
          A left-rail tab list — common as the secondary nav inside a
          catalog item detail page (Overview / Configuration / Permissions
          / Logs). Less heavyweight than <code>PageSidebar</code>,
          cleaner than horizontal Tabs when you have ≥ 4 entries.
        </>
      }
    >
      <Section
        title="Default"
        description="Track the active tab in state; pass `active` and `onActivate` per VerticalTabsTab."
      >
        <Card>
          <Example
            source={verticalTabsExampleSrc}
            region="Default"
            fileName="VerticalTabs.example.tsx"
          >
            <Default />
          </Example>
        </Card>
      </Section>

      <Section
        title="Nested"
        description="VerticalTabsTab accepts children — nest VerticalTabsTab elements to build sub-rails. Pair with `restrictTabs` on the outer VerticalTabs to collapse non-active branches."
      >
        <Card>
          <Example
            source={verticalTabsExampleSrc}
            region="Nested"
            fileName="VerticalTabs.example.tsx"
          >
            <Nested />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example
            source={verticalTabsExampleSrc}
            fileName="VerticalTabs.example.tsx"
          />
        </Card>
      </Section>

      <Section title="Most-used VerticalTabs props">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "restrictTabs", type: "boolean", description: "Hide non-active branches — only the active tab, its parents, siblings, and direct children render." },
                { name: "activeTab", type: "boolean", description: "Set on the outer VerticalTabs when one of its direct children is active (used in restrictTabs mode)." },
                { name: "className", type: "string", description: "Additional class on the outer ul." },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section title="Most-used VerticalTabsTab props">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "title", type: "string | ReactNode", description: "Tab label." },
                { name: "active", type: "boolean", description: "Mark this tab as active." },
                { name: "hasActiveDescendant", type: "boolean", description: "Mark this tab as a parent of the active tab (restrictTabs mode)." },
                { name: "shown", type: "boolean", description: "Force a tab to render even when restrictTabs would hide it." },
                { name: "onActivate", type: "() => void", description: "Activation handler — typically updates the active tab in state." },
                { name: "href", type: "string", description: "Destination URL — render the tab as a real link for back-button friendliness." },
                { name: "component", type: "ElementType | ComponentType", description: "Override the rendered element (default <a>) — pass your router's Link." },
                { name: "wrapStyle", type: '"wrap" | "truncate" | "nowrap"', description: "How long titles overflow." },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section title="Accessibility">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Wrap in a labelled nav</strong> (<code>&lt;nav aria-label=&quot;Item sections&quot;&gt;</code>) so the rail is a navigation landmark.</li>
            <li><strong>Use real links.</strong> Pass <code>href</code> + your router&rsquo;s component so the back button moves between tabs naturally.</li>
            <li><strong>Update <code>active</code> on route change,</strong> not just on click — otherwise direct-link entries land with no tab highlighted.</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
