import type { Meta, StoryObj } from "@storybook/react-vite";
import { JumpLinks, JumpLinksItem, JumpLinksList } from "@patternfly/react-core";
import { FoundationPage, Section, Card, CodeBlock, ThemingPointer } from "../_storyKit.js";
import { DemoFrame, PropsTable } from "../_demoKit.js";

const meta: Meta = {
  title: "Components/Jump links",
  parameters: {
    layout: "padded",
    a11y: {
      config: {
        // The scrollable demo container is intentionally scrollable for the
        // scroll-spy demo; in real apps the surrounding page provides scroll.
        rules: [
          { id: "scrollable-region-focusable", enabled: false },
          { id: "color-contrast", enabled: false },
        ],
      },
    },
  },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Jump links"
      intro={
        <>
          A list of in-page anchors that scroll to specific sections — a
          table of contents for long pages. The active link tracks the
          currently-visible section as the user scrolls. Use on settings
          pages, long-form documentation, or any view broken into named
          sections.
        </>
      }
    >
      <Section
        title="Horizontal (basic)"
        description="Items go directly under JumpLinks — no inner list wrapper. aria-label names the nav region."
      >
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame>
              <JumpLinks aria-label="Jump to section">
                <JumpLinksItem href="#a">Overview</JumpLinksItem>
                <JumpLinksItem href="#b" isActive>
                  Specs
                </JumpLinksItem>
                <JumpLinksItem href="#c">Reviews</JumpLinksItem>
                <JumpLinksItem href="#d">FAQ</JumpLinksItem>
              </JumpLinks>
            </DemoFrame>
            <CodeBlock>{`<JumpLinks aria-label="Jump to section">
  <JumpLinksItem href="#a">Overview</JumpLinksItem>
  <JumpLinksItem href="#b" isActive>Specs</JumpLinksItem>
  <JumpLinksItem href="#c">Reviews</JumpLinksItem>
</JumpLinks>`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section
        title="Vertical with label + scroll-spy"
        description="isVertical lays the strip out as a sidebar TOC. label renders a visible heading (used as the nav's accessible name). scrollableSelector enables active-section tracking as the user scrolls."
      >
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame height={320}>
              <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 16, height: "100%" }}>
                <JumpLinks
                  isVertical
                  label="Sections"
                  scrollableSelector="#jl-scroll"
                >
                  <JumpLinksItem href="#sec-1">General</JumpLinksItem>
                  <JumpLinksItem href="#sec-2">Notifications</JumpLinksItem>
                  <JumpLinksItem href="#sec-3">Integrations</JumpLinksItem>
                  <JumpLinksItem href="#sec-4">Billing</JumpLinksItem>
                </JumpLinks>
                <div
                  id="jl-scroll"
                  style={{
                    overflowY: "auto",
                    padding: 16,
                    color: "var(--gp-color-text-regular)",
                  }}
                >
                  {[
                    { id: "sec-1", title: "General" },
                    { id: "sec-2", title: "Notifications" },
                    { id: "sec-3", title: "Integrations" },
                    { id: "sec-4", title: "Billing" },
                  ].map((s) => (
                    <section key={s.id} id={s.id} style={{ marginBottom: 24 }}>
                      <h3 style={{ marginTop: 0 }}>{s.title}</h3>
                      <p style={{ color: "var(--gp-color-text-subtle)" }}>
                        Section content — scroll to update the active jump
                        link on the left.
                      </p>
                      <div style={{ height: 120 }} />
                    </section>
                  ))}
                </div>
              </div>
            </DemoFrame>
            <CodeBlock>{`<JumpLinks
  isVertical
  label="Sections"
  scrollableSelector="#page-scroll"
>
  <JumpLinksItem href="#general">General</JumpLinksItem>
  <JumpLinksItem href="#notifications">Notifications</JumpLinksItem>
  <JumpLinksItem href="#integrations">Integrations</JumpLinksItem>
</JumpLinks>

<div id="page-scroll">
  <section id="general"><h3>General</h3>...</section>
  ...
</div>`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section
        title="Vertical with sub-sections"
        description="Nest a JumpLinksList inside a JumpLinksItem to create sub-anchors. expandable collapses the outer items into a toggle on small viewports."
      >
        <Card>
          <div style={{ padding: 24 }}>
            <DemoFrame height={260}>
              <JumpLinks
                isVertical
                label="With subsections"
                expandable={{ default: "expandable", md: "nonExpandable" }}
              >
                <JumpLinksItem href="#x1">Inactive section</JumpLinksItem>
                <JumpLinksItem href="#x2">
                  Section with active sub-section
                  <JumpLinksList aria-label="Sub-sections">
                    <JumpLinksItem href="#x2a" isActive>
                      Active sub-section
                    </JumpLinksItem>
                    <JumpLinksItem href="#x2b">Sub-section</JumpLinksItem>
                    <JumpLinksItem href="#x2c">Sub-section</JumpLinksItem>
                  </JumpLinksList>
                </JumpLinksItem>
                <JumpLinksItem href="#x3">Inactive section</JumpLinksItem>
              </JumpLinks>
            </DemoFrame>
          </div>
        </Card>
      </Section>

      <Section
        title="Centered"
        description="isCentered horizontally centres the link list — useful for marketing-style long pages where the trail sits above the hero."
      >
        <Card>
          <div style={{ padding: 24 }}>
            <DemoFrame>
              <JumpLinks isCentered aria-label="Jump to centred section">
                <JumpLinksItem href="#c1">Inactive</JumpLinksItem>
                <JumpLinksItem href="#c2" isActive>
                  Active
                </JumpLinksItem>
                <JumpLinksItem href="#c3">Inactive</JumpLinksItem>
              </JumpLinks>
            </DemoFrame>
          </div>
        </Card>
      </Section>

      <Section title="Composition">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "JumpLinks", type: "container", description: "Outer wrapper. Owns vertical/horizontal orientation, scroll-spy behaviour, label." },
                { name: "JumpLinksItem", type: "child", description: "A single link. href points at a section id; isActive marks the current section. May contain a nested JumpLinksList for sub-sections." },
                { name: "JumpLinksList", type: "child", description: "Nested list for sub-anchors — used inside a JumpLinksItem to render a second-level set." },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section title="Most-used props">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "label", type: "ReactNode", description: "Visible heading shown above the link list (vertical) or alongside it (horizontal). Becomes the nav region's accessible name." },
                { name: "aria-label", type: "string", description: "Required when label is omitted — names the nav region for screen readers." },
                { name: "isVertical", type: "boolean", description: "Vertical orientation — sidebar TOC layout. Default is horizontal." },
                { name: "isCentered", type: "boolean", description: "Horizontally centre the link list (horizontal variant only)." },
                { name: "scrollableSelector", type: "string", description: "CSS selector of the scrolling container. Required for scroll-spy in custom-scroll layouts. Defaults to window scroll." },
                { name: "offset", type: "number", description: "Pixels to subtract from each section's offsetTop when computing active state. Use to account for sticky headers." },
                { name: "expandable", type: 'BreakpointObject<"expandable" | "nonExpandable">', description: "Collapse the link list into a toggle below a breakpoint — for narrow viewports." },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section title="Accessibility">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Always name the nav region.</strong> Use <code>label</code> for a visible heading, or <code>aria-label</code> when nothing visible names it.</li>
            <li><strong>Each section needs a real id.</strong> Jump links are anchor links — the target element&rsquo;s id must match the href fragment.</li>
            <li><strong>Sticky-header offset matters.</strong> Without <code>offset</code>, the active link flips just before the section actually reaches the visual top — confusing for users.</li>
            <li><strong>Don&rsquo;t duplicate Nav.</strong> Jump links are for in-page sections; Nav is for cross-page navigation. Keep them visually distinct.</li>
          </ul>
        </Card>
      </Section>
      <ThemingPointer
        dials={[
          ["--gp-anchor-color", "Jump-link text colour."],
          ["--gp-focus-ring", "Focus-ring colour."],
          ["--gp-border-default", "Active-item indicator."],
        ]}
      />
    </FoundationPage>
  ),
};
