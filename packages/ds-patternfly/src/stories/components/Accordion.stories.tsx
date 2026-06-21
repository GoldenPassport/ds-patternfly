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
  SingleExpand,
  MultipleExpand,
  Bordered,
  DefinitionList,
} from "../../examples/components/Accordion.example.js";
import accordionExampleSrc from "../../examples/components/Accordion.example.tsx?raw";
import accordionComponentSrc from "../../components/ds/AccordionPanel.tsx?raw";

const meta: Meta = {
  title: "Components/Accordion",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Accordion"
      intro={
        <>
          Vertically stacked, expandable sections. Use for FAQs, settings
          groups, and any list where each row can carry a body of detail
          the user opens on demand. Pick <strong>single-expand</strong>{" "}
          when sections are mutually exclusive (only one open at a time);
          pick <strong>multiple-expand</strong> when users want to compare
          sections side-by-side.
        </>
      }
    >
      <Section
        title="Single-expand"
        description="Track one expanded id; opening another collapses the previous. The most common shape — keeps the page short and focuses attention."
      >
        <Card>
          <Example
            source={accordionExampleSrc}
            region="SingleExpand"
            fileName="Accordion.example.tsx"
          >
            <SingleExpand />
          </Example>
        </Card>
      </Section>

      <Section
        title="Multiple-expand"
        description="Track an array of expanded ids — toggle adds / removes from the list. Use when users may want to compare sections, or when each section is independent."
      >
        <Card>
          <Example
            source={accordionExampleSrc}
            region="MultipleExpand"
            fileName="Accordion.example.tsx"
          >
            <MultipleExpand />
          </Example>
        </Card>
      </Section>

      <Section
        title="Bordered (cards-style)"
        description="isBordered draws an outer border and divides each item — looks like a stack of mini-cards. Good when the accordion is the only content on a section and needs its own visual container."
      >
        <Card>
          <Example
            source={accordionExampleSrc}
            region="Bordered"
            fileName="Accordion.example.tsx"
          >
            <Bordered />
          </Example>
        </Card>
      </Section>

      <Section
        title="Definition list semantics"
        description="asDefinitionList (default true) renders the accordion as <dl>/<dt>/<dd>. Use this for term/definition content (glossary, FAQ where toggle = term and content = definition). Pass false for general accordions where the toggle is an action label rather than a term."
      >
        <Card>
          <Example
            source={accordionExampleSrc}
            region="DefinitionList"
            fileName="Accordion.example.tsx"
          >
            <DefinitionList />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example source={accordionExampleSrc} fileName="Accordion.example.tsx" />
        </Card>
      </Section>

      <Section title="Composition">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "Accordion", type: "container", description: "Outer wrapper. Owns asDefinitionList, isBordered, displaySize, headingLevel." },
                { name: "AccordionItem", type: "child", description: "A single section. isExpanded controls visibility." },
                { name: "AccordionToggle", type: "child", description: "The clickable header. id is required (paired with the content's aria-labelledby)." },
                { name: "AccordionContent", type: "child", description: "The collapsible body. id is required for screen-reader association. isFixed locks the body to a max-height with internal scroll." },
              ]}
            />
          </div>
        </Card>
      </Section>

      <ConfigurationSection
        importStatement={'import { AccordionPanel } from "@golden-passport/ds-patternfly";'}
        componentSource={accordionComponentSrc}
        componentFileName="AccordionPanel.tsx"
        rows={[
          { name: "items", type: "AccordionPanelItem[]", description: "The sections: { id?, title, content, isDisabled? }. The id is optional (auto-generated) unless you control expansion." },
          { name: "multiple", type: "boolean", description: "Allow several sections open at once. Default false (single-open — opening one closes the rest)." },
          { name: "defaultExpanded", type: "string | string[]", description: "Initially-expanded id(s) — uncontrolled." },
          { name: "expanded / onExpandedChange", type: "string | string[]  /  (next) => void", description: "Controlled expansion — drive the open id(s) yourself." },
          { name: "isBordered", type: "boolean", description: "Outline each item as a card." },
          { name: "asDefinitionList", type: "boolean", description: "Render as a semantic <dl> for term/description pairs." },
        ]}
      />

      <Section title="Accordion vs ExpandableSection">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Accordion</strong> — multiple stacked sections that share a single expand/collapse pattern. Use for FAQs, settings groups, lists where each row has a body.</li>
            <li><strong>ExpandableSection</strong> — a single collapsible block. Use for &ldquo;Show more&rdquo;-style progressive disclosure within otherwise-flat content.</li>
            <li><strong>Don&rsquo;t nest accordions.</strong> Two levels of expand/collapse is hard to navigate. Use a TreeView or Drawer instead.</li>
          </ul>
        </Card>
      </Section>

      <Section title="Accessibility">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Each toggle needs an id</strong> and the matching content needs an id — PF6 wires aria-labelledby + aria-controls between them.</li>
            <li><strong>Keep toggles short.</strong> Long titles wrap awkwardly and announce as one giant string.</li>
            <li><strong>Don&rsquo;t collapse error-state items by default.</strong> If a section contains an unresolved error, expand it on mount so the user sees the issue.</li>
          </ul>
        </Card>
      </Section>
      <ThemingPointer
        dials={[
          ["--gp-border-subtle", "Row dividers between items."],
          ["--gp-text-default", "Toggle text colour."],
          ["--gp-motion-duration", "Expand / collapse duration."],
          ["--gp-focus-ring", "Toggle focus-ring colour."],
        ]}
      />
    </FoundationPage>
  ),
};
