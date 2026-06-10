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
  Basic,
  DetachedToggle,
  Truncate,
} from "../../examples/components/ExpandableSection.example.js";
import expandableSectionExampleSrc from "../../examples/components/ExpandableSection.example.tsx?raw";

const meta: Meta = {
  title: "Components/ExpandableSection",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="ExpandableSection"
      intro={
        <>
          A single &ldquo;Show more&rdquo; block — a collapsible region
          with a labelled toggle. Use for progressive disclosure within
          flat content: optional advanced settings, expanded detail in a
          list row, supporting context that doesn&rsquo;t need to be
          visible by default. For multiple stacked sections, use{" "}
          <code>Accordion</code>.
        </>
      }
    >
      <Section title="Basic">
        <Card>
          <Example
            source={expandableSectionExampleSrc}
            region="Basic"
            fileName="ExpandableSection.example.tsx"
          >
            <Basic />
          </Example>
        </Card>
      </Section>

      <Section
        title="Detached toggle"
        description="ExpandableSectionToggle renders the toggle separately from the content. Use when the toggle and content can't be siblings (the toggle is in a card header, the content is in the body, etc.). Pair via toggleId + contentId."
      >
        <Card>
          <Example
            source={expandableSectionExampleSrc}
            region="DetachedToggle"
            fileName="ExpandableSection.example.tsx"
          >
            <DetachedToggle />
          </Example>
        </Card>
      </Section>

      <Section
        title="Truncate-to-N-lines variant"
        description="variant='truncate' clamps the body to a fixed line count when collapsed; the toggle reveals the full content. Useful for long paragraphs / descriptions where you want a teaser, not a hidden block."
      >
        <Card>
          <Example
            source={expandableSectionExampleSrc}
            region="Truncate"
            fileName="ExpandableSection.example.tsx"
          >
            <Truncate />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example
            source={expandableSectionExampleSrc}
            fileName="ExpandableSection.example.tsx"
          />
        </Card>
      </Section>

      <Section title="Most-used props">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "isExpanded", type: "boolean", description: "Open / closed state. Controlled — pair with onToggle." },
                { name: "onToggle", type: "(event, isExpanded) => void", description: "Fired when the toggle is clicked. Note the event arg — drives keyboard accessibility automatically." },
                { name: "toggleText", type: "string", description: "Text on the toggle button. Pattern: change between 'Show more' and 'Show less' based on isExpanded." },
                { name: "toggleContent", type: "ReactNode", description: "Custom toggle content (icon + text, etc.) — overrides toggleText." },
                { name: "variant", type: '"default" | "truncate"', description: "default = full chrome; truncate = clamp body to N lines (with truncateMaxLines)." },
                { name: "truncateMaxLines", type: "number", description: "Lines to clamp the body to when variant='truncate' and collapsed." },
                { name: "isDetached", type: "boolean", description: "Render only the content (no built-in toggle). Pair with ExpandableSectionToggle elsewhere via toggleId + contentId." },
                { name: "toggleId / contentId", type: "string", description: "Required for the detached variant — wires aria-controls + aria-labelledby between the toggle and content." },
                { name: "isIndented", type: "boolean", description: "Indent the body (and the toggle's caret column) — useful when the section sits inside a wider stack of indented controls." },
                { name: "isWidthLimited", type: "boolean", description: "Cap the section width — keep long content readable." },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section title="ExpandableSection vs Accordion">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>ExpandableSection</strong> — one collapsible block. Use for &ldquo;Show more&rdquo;-style progressive disclosure inside otherwise-flat content.</li>
            <li><strong>Accordion</strong> — multiple stacked sections sharing one expand/collapse pattern. Use for FAQs, settings groups.</li>
            <li><strong>Truncate variant vs full hide</strong> — pick truncate when the body is text the reader can scan in collapsed form; pick default (full hide) when the body is a form, table, or unrelated detail.</li>
          </ul>
        </Card>
      </Section>

      <Section title="Accessibility">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Use <code>toggleWrapper</code></strong> when the section is a meaningful subsection — gives screen-reader users a heading to navigate.</li>
            <li><strong>Update <code>toggleText</code> based on state.</strong> &ldquo;Show more&rdquo; → &ldquo;Show less&rdquo; reads better than a static label that doesn&rsquo;t reflect the current state.</li>
            <li><strong>Detached needs matching ids.</strong> Without <code>toggleId</code> / <code>contentId</code> the screen reader can&rsquo;t link the toggle to the body it controls.</li>
            <li><strong>Don&rsquo;t hide critical content.</strong> Required form fields, errors, and key status information shouldn&rsquo;t live behind a collapsed toggle.</li>
          </ul>
        </Card>
      </Section>
      <ThemingPointer
        dials={[
          ["--gp-text-default", "Toggle text."],
          ["--gp-focus-ring", "Toggle focus-ring."],
          ["--gp-motion-duration", "Expand / collapse duration."],
        ]}
      />
    </FoundationPage>
  ),
};
