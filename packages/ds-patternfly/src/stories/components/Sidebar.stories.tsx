import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  FoundationPage,
  Section,
  Card,
  CodeBlock,
  ConfigurationSection,
  Example,
} from "../_kit/StoryKit.js";
import { PropsTable } from "../_kit/DemoKit.js";
import {
  Basic,
  StickyPanel,
  RightAnchoredGutter,
} from "../../examples/components/Sidebar.example.js";
import sidebarExampleSrc from "../../examples/components/Sidebar.example.tsx?raw";
import sidebarComponentSrc from "../../components/base/Sidebar.tsx?raw";

const meta: Meta = {
  title: "Components/Sidebar",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Sidebar"
      intro={
        <>
          A two-column layout primitive — a fixed-width SidebarPanel next
          to a flexible SidebarContent. Use it for in-page side panels:
          filter trails, settings menus, table of contents, secondary
          navigation. For app-level sidebars (the kind that holds primary
          Nav), use <code>PageSidebar</code> on Page instead — that&rsquo;s
          a different component meant for shell-level layout.
        </>
      }
    >
      <Section
        title="Basic"
        description="A two-column flex layout. Panel sits on the leading edge by default; content takes the remaining width."
      >
        <Card>
          <Example
            source={sidebarExampleSrc}
            region="Basic"
            fileName="Sidebar.example.tsx"
            height={220}
          >
            <Basic />
          </Example>
        </Card>
      </Section>

      <Section
        title="Sticky panel"
        description="variant='sticky' pins the panel to the viewport while content scrolls. Add tabIndex on the Sidebar so keyboard users can scroll the content region."
      >
        <Card>
          <Example
            source={sidebarExampleSrc}
            region="StickyPanel"
            fileName="Sidebar.example.tsx"
            height={220}
          >
            <StickyPanel />
          </Example>
        </Card>
      </Section>

      <Section
        title="Right-anchored panel + gutter"
        description="isPanelRight flips the panel to the trailing edge (right in LTR). hasGutter adds space between panel and content."
      >
        <Card>
          <Example
            source={sidebarExampleSrc}
            region="RightAnchoredGutter"
            fileName="Sidebar.example.tsx"
            height={220}
          >
            <RightAnchoredGutter />
          </Example>
        </Card>
      </Section>

      <Section
        title="Responsive panel width"
        description="Pass per-breakpoint widths via SidebarPanel.width. Tokens like width_25 / width_33 / width_50 / width_66 / width_75 / width_100 cover the standard fractions."
      >
        <Card>
          <div style={{ padding: 24 }}>
            <CodeBlock>{`<Sidebar>
  <SidebarPanel width={{ default: 'width_50', lg: 'width_33', xl: 'width_25' }}>
    {/* panel */}
  </SidebarPanel>
  <SidebarContent>{/* main */}</SidebarContent>
</Sidebar>`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example source={sidebarExampleSrc} fileName="Sidebar.example.tsx" />
        </Card>
      </Section>

      <Section title="Composition">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "Sidebar", type: "container", description: "Outer two-column wrapper. orientation prop controls the split axis." },
                { name: "SidebarPanel", type: "child", description: "The fixed-width side panel. variant='sticky' pins it on scroll; 'default' scrolls with content. width prop accepts a BreakpointObject of width tokens." },
                { name: "SidebarContent", type: "child", description: "The flexible content area. Flexes to fill remaining space." },
              ]}
            />
          </div>
        </Card>
      </Section>

      <ConfigurationSection
        importStatement={'import { Sidebar, SidebarPanel, SidebarContent } from "@golden-passport/ds-patternfly";'}
        componentSource={sidebarComponentSrc}
        componentFileName="Sidebar.tsx"
        rows={[
          { name: "orientation", type: '"vertical" | "horizontal"', description: "Default vertical (panel on the side). Horizontal puts the panel above content for narrow viewports." },
          { name: "isPanelRight", type: "boolean", description: "Render the panel on the trailing edge (right in LTR) instead of the leading edge." },
          { name: "hasGutter", type: "boolean", description: "Adds spacing between panel and content." },
          { name: "tabIndex", type: "number", description: "Make the Sidebar wrapper focusable (typically 0) so keyboard users can scroll a height-bounded variant." },
        ]}
      />

      <Section title="Most-used Sidebar props">
        <Card>
          <div style={{ padding: 24 }}>
            <p style={{ margin: 0, color: "var(--gp-color-text-subtle)", fontSize: 14 }}>
              <strong>SidebarPanel.variant:</strong>{" "}
              <code>&quot;default&quot;</code> scrolls with the page;{" "}
              <code>&quot;sticky&quot;</code> pins to the viewport.
            </p>
          </div>
        </Card>
      </Section>

      <Section title="Sidebar vs PageSidebar vs Drawer">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Sidebar</strong> — in-page two-column layout. Filter rails, TOCs, settings menus. Always visible.</li>
            <li><strong>PageSidebar</strong> (on Page) — app-shell side panel that holds primary Nav. Collapsible via the masthead toggle.</li>
            <li><strong>Drawer</strong> — slide-in side panel that overlays / pushes content. Detail views, edit forms, contextual help. Triggered by user action.</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
