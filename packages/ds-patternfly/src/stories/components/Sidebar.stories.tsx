import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Sidebar,
  SidebarContent,
  SidebarPanel,
} from "@patternfly/react-core";
import { FoundationPage, Section, Card, CodeBlock } from "../../components/StoryKit.js";
import { DemoFrame, PropsTable } from "../../components/DemoKit.js";

const meta: Meta = {
  title: "Components/Sidebar",
  parameters: { layout: "padded" },
};
export default meta;

const filler = (
  <>
    <p style={{ marginTop: 0 }}>
      The main content area expands to fill remaining width.
    </p>
    <p>Resize the window to see the panel keep its share.</p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
      dapibus nulla id augue dictum commodo.
    </p>
  </>
);

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
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame height={220}>
              <Sidebar>
                <SidebarPanel
                  style={{
                    background: "var(--gp-color-bg-secondary-default)",
                    padding: 16,
                  }}
                >
                  <strong style={{ color: "var(--gp-color-text-regular)" }}>
                    Filters
                  </strong>
                  <ul
                    style={{
                      margin: 8,
                      padding: 0,
                      listStyle: "none",
                      color: "var(--gp-color-text-subtle)",
                      lineHeight: 1.8,
                    }}
                  >
                    <li>Status</li>
                    <li>Owner</li>
                    <li>Created date</li>
                  </ul>
                </SidebarPanel>
                <SidebarContent style={{ padding: 16, color: "var(--gp-color-text-subtle)" }}>
                  {filler}
                </SidebarContent>
              </Sidebar>
            </DemoFrame>
            <CodeBlock>{`<Sidebar>
  <SidebarPanel>{/* Filter rail / settings menu / TOC */}</SidebarPanel>
  <SidebarContent>{/* Main content — flexes to fill */}</SidebarContent>
</Sidebar>`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section
        title="Sticky panel"
        description="variant='sticky' pins the panel to the viewport while content scrolls. Add tabIndex on the Sidebar so keyboard users can scroll the content region."
      >
        <Card>
          <div style={{ padding: 24 }}>
            <DemoFrame height={220}>
              <Sidebar style={{ height: "100%", overflow: "auto" }} tabIndex={0}>
                <SidebarPanel
                  variant="sticky"
                  style={{
                    background: "var(--gp-color-bg-secondary-default)",
                    padding: 16,
                  }}
                >
                  <strong style={{ color: "var(--gp-color-text-regular)" }}>
                    Sticky filters
                  </strong>
                </SidebarPanel>
                <SidebarContent style={{ padding: 16, color: "var(--gp-color-text-subtle)" }}>
                  <p style={{ marginTop: 0 }}>Scroll me!</p>
                  {Array.from({ length: 12 }).map((_, i) => (
                    <p key={i}>Row {i + 1} — content keeps scrolling.</p>
                  ))}
                </SidebarContent>
              </Sidebar>
            </DemoFrame>
          </div>
        </Card>
      </Section>

      <Section
        title="Right-anchored panel + gutter"
        description="isPanelRight flips the panel to the trailing edge (right in LTR). hasGutter adds space between panel and content."
      >
        <Card>
          <div style={{ padding: 24 }}>
            <DemoFrame height={220}>
              <Sidebar isPanelRight hasGutter>
                <SidebarPanel
                  style={{
                    background: "var(--gp-color-bg-secondary-default)",
                    padding: 16,
                  }}
                >
                  <strong style={{ color: "var(--gp-color-text-regular)" }}>
                    Side notes
                  </strong>
                </SidebarPanel>
                <SidebarContent style={{ padding: 16, color: "var(--gp-color-text-subtle)" }}>
                  {filler}
                </SidebarContent>
              </Sidebar>
            </DemoFrame>
          </div>
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

      <Section title="Most-used Sidebar props">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "orientation", type: '"vertical" | "horizontal"', description: "Default vertical (panel on the side). Horizontal puts the panel above content for narrow viewports." },
                { name: "isPanelRight", type: "boolean", description: "Render the panel on the trailing edge (right in LTR) instead of the leading edge." },
                { name: "hasGutter", type: "boolean", description: "Adds spacing between panel and content." },
                { name: "tabIndex", type: "number", description: "Make the Sidebar wrapper focusable (typically 0) so keyboard users can scroll a height-bounded variant." },
              ]}
            />
            <p style={{ marginTop: 16, marginBottom: 0, color: "var(--gp-color-text-subtle)", fontSize: 14 }}>
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
