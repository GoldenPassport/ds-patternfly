import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  VerticalTabs,
  VerticalTabsTab,
} from "@patternfly/react-catalog-view-extension";
import "@patternfly/react-catalog-view-extension/dist/css/react-catalog-view-extension.css";
import { FoundationPage, Section, Card, CodeBlock } from "../_kit/StoryKit.js";
import { DemoFrame, PropsTable } from "../_kit/DemoKit.js";

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

const tabs = ["Overview", "Configuration", "Permissions", "Logs", "Activity"];

export const Overview: StoryObj = {
  render: () => {
    const [active, setActive] = useState("Overview");
    return (
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
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <DemoFrame>
                <div style={{ display: "flex", gap: 24 }}>
                  <div style={{ minWidth: 180 }}>
                    <VerticalTabs>
                      {tabs.map((t) => (
                        <VerticalTabsTab
                          key={t}
                          title={t}
                          href={`#${t.toLowerCase()}`}
                          active={active === t}
                          onActivate={() => setActive(t)}
                        />
                      ))}
                    </VerticalTabs>
                  </div>
                  <div style={{ flex: 1, color: "var(--gp-color-text-regular)" }}>
                    <strong>{active}</strong>
                    <p style={{ marginTop: 8, color: "var(--gp-color-text-subtle)" }}>
                      Render the active tab&rsquo;s panel here.
                    </p>
                  </div>
                </div>
              </DemoFrame>
              <CodeBlock>{`<VerticalTabs>
  {tabs.map(t => (
    <VerticalTabsTab
      key={t}
      title={t}
      href={\`#\${t.toLowerCase()}\`}
      active={active === t}
      onActivate={() => setActive(t)}
    />
  ))}
</VerticalTabs>`}</CodeBlock>
            </div>
          </Card>
        </Section>

        <Section
          title="Nested"
          description="VerticalTabsTab accepts children — nest VerticalTabsTab elements to build sub-rails. Pair with `restrictTabs` on the outer VerticalTabs to collapse non-active branches."
        >
          <Card>
            <div style={{ padding: 24 }}>
              <DemoFrame>
                <div style={{ minWidth: 200 }}>
                  {/* The extension renders each VerticalTabsTab as <li>;
                      nested VerticalTabsTab children must be wrapped in a
                      sub-VerticalTabs (<ul>) so the markup stays valid
                      (<li> can't appear directly inside <li>). */}
                  <VerticalTabs restrictTabs activeTab>
                    <VerticalTabsTab title="Overview" active />
                    <VerticalTabsTab title="Configuration" hasActiveDescendant>
                      <VerticalTabs>
                        <VerticalTabsTab title="General" active />
                        <VerticalTabsTab title="Networking" />
                        <VerticalTabsTab title="Storage" />
                      </VerticalTabs>
                    </VerticalTabsTab>
                    <VerticalTabsTab title="Permissions" />
                  </VerticalTabs>
                </div>
              </DemoFrame>
            </div>
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
    );
  },
};
