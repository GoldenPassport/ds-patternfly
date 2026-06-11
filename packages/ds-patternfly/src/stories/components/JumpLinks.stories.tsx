import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  FoundationPage,
  Section,
  Card,
  Example,
  ThemingPointer,
} from "../_kit/StoryKit.js";
import { PropsTable } from "../_kit/DemoKit.js";
import {
  HorizontalBasic,
  VerticalScrollSpy,
  VerticalSubSections,
  Centered,
} from "../../examples/components/JumpLinks.example.js";
import jumpLinksExampleSrc from "../../examples/components/JumpLinks.example.tsx?raw";

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
          <Example
            source={jumpLinksExampleSrc}
            region="HorizontalBasic"
            fileName="JumpLinks.example.tsx"
          >
            <HorizontalBasic />
          </Example>
        </Card>
      </Section>

      <Section
        title="Vertical with label + scroll-spy"
        description="isVertical lays the strip out as a sidebar TOC. label renders a visible heading (used as the nav's accessible name). scrollableSelector enables active-section tracking as the user scrolls."
      >
        <Card>
          <Example
            source={jumpLinksExampleSrc}
            region="VerticalScrollSpy"
            fileName="JumpLinks.example.tsx"
            height={320}
          >
            <VerticalScrollSpy />
          </Example>
        </Card>
      </Section>

      <Section
        title="Vertical with sub-sections"
        description="Nest a JumpLinksList inside a JumpLinksItem to create sub-anchors. expandable collapses the outer items into a toggle on small viewports."
      >
        <Card>
          <Example
            source={jumpLinksExampleSrc}
            region="VerticalSubSections"
            fileName="JumpLinks.example.tsx"
            height={260}
          >
            <VerticalSubSections />
          </Example>
        </Card>
      </Section>

      <Section
        title="Centered"
        description="isCentered horizontally centres the link list — useful for marketing-style long pages where the trail sits above the hero."
      >
        <Card>
          <Example
            source={jumpLinksExampleSrc}
            region="Centered"
            fileName="JumpLinks.example.tsx"
          >
            <Centered />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example source={jumpLinksExampleSrc} fileName="JumpLinks.example.tsx" />
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
