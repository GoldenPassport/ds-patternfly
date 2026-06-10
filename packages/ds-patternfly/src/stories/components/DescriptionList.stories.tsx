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
  DefaultVertical,
  Horizontal,
  TwoColumn,
  Compact,
  TermHelpPopover,
  IconsOnTerms,
} from "../../examples/components/DescriptionList.example.js";
import descriptionListExampleSrc from "../../examples/components/DescriptionList.example.tsx?raw";

const meta: Meta = {
  title: "Components/DescriptionList",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="DescriptionList"
      intro={
        <>
          Term / definition pairs — the canonical &ldquo;key facts&rdquo;
          renderer. Use on detail screens, settings panels, and anywhere a
          fixed set of attributes need stacked or columnar presentation.
          Renders as a <code>&lt;dl&gt;</code> for proper screen-reader
          semantics.
        </>
      }
    >
      <Section
        title="Default (vertical)"
        description="Default layout — terms stacked above their descriptions in a single column. Each pair gets DescriptionListGroup → DescriptionListTerm + DescriptionListDescription."
      >
        <Card>
          <Example
            source={descriptionListExampleSrc}
            region="DefaultVertical"
            fileName="DescriptionList.example.tsx"
          >
            <DefaultVertical />
          </Example>
        </Card>
      </Section>

      <Section
        title="Horizontal"
        description="isHorizontal puts the term and description side-by-side. The most common layout for detail-screen attribute panels."
      >
        <Card>
          <Example
            source={descriptionListExampleSrc}
            region="Horizontal"
            fileName="DescriptionList.example.tsx"
          >
            <Horizontal />
          </Example>
        </Card>
      </Section>

      <Section
        title="Two-column"
        description="columnModifier sets the number of columns at each breakpoint. Use { default: '2Col' } for two columns; combine breakpoints to flip from one column on mobile to two on desktop."
      >
        <Card>
          <Example
            source={descriptionListExampleSrc}
            region="TwoColumn"
            fileName="DescriptionList.example.tsx"
          >
            <TwoColumn />
          </Example>
        </Card>
      </Section>

      <Section
        title="Compact"
        description="isCompact tightens row padding — pair with isHorizontal for dense detail panels."
      >
        <Card>
          <Example
            source={descriptionListExampleSrc}
            region="Compact"
            fileName="DescriptionList.example.tsx"
          >
            <Compact />
          </Example>
        </Card>
      </Section>

      <Section
        title="Term with help popover"
        description="Wrap DescriptionListTerm in a Popover trigger for inline term help — explains a non-obvious attribute without polluting the description with a help paragraph."
      >
        <Card>
          <Example
            source={descriptionListExampleSrc}
            region="TermHelpPopover"
            fileName="DescriptionList.example.tsx"
          >
            <TermHelpPopover />
          </Example>
        </Card>
      </Section>

      <Section
        title="Icons on terms"
        description="Pass icon to DescriptionListTerm for a leading glyph — useful when the same term type repeats across panels (resource type icon, capability icon)."
      >
        <Card>
          <Example
            source={descriptionListExampleSrc}
            region="IconsOnTerms"
            fileName="DescriptionList.example.tsx"
          >
            <IconsOnTerms />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example
            source={descriptionListExampleSrc}
            fileName="DescriptionList.example.tsx"
          />
        </Card>
      </Section>

      <Section title="Composition">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "DescriptionList", type: "container", description: "<dl> wrapper. Owns isHorizontal, isCompact, isFluid, columnModifier, displaySize." },
                { name: "DescriptionListGroup", type: "child", description: "Each term/description pair. Always wraps a Term + Description." },
                { name: "DescriptionListTerm", type: "child", description: "<dt>. Optional icon prop for a leading glyph." },
                { name: "DescriptionListDescription", type: "child", description: "<dd>. Plain text, links, or button-as-link." },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section title="Most-used DescriptionList props">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "isHorizontal", type: "boolean", description: "Term and description side-by-side instead of stacked. The most common detail-screen layout." },
                { name: "isCompact", type: "boolean", description: "Tighter row spacing for dense panels." },
                { name: "isFluid", type: "boolean", description: "Term column adopts the natural width of its content (no fixed term width)." },
                { name: "isAutoFit", type: "boolean", description: "Auto-distribute groups across the available width via CSS grid auto-fit." },
                { name: "isInlineGrid", type: "boolean", description: "Use display:inline-grid for layout — sometimes useful for non-stretching wrappers." },
                { name: "columnModifier", type: 'BreakpointObject<"1Col" | "2Col" | "3Col">', description: "Per-breakpoint column count. e.g. { default: '1Col', lg: '2Col' }." },
                { name: "displaySize", type: '"default" | "lg" | "2xl"', description: "Bumps the term + description font sizes for hero detail panels." },
                { name: "horizontalTermWidthModifier", type: "BreakpointObject<...>", description: "Override the horizontal term column width (e.g. for long terms or short descriptions)." },
                { name: "termWidth", type: "string", description: "Explicit term-column width (any CSS length)." },
                { name: "orientation", type: "BreakpointObject<'vertical' | 'horizontal'>", description: "Per-breakpoint orientation — switch from horizontal on desktop to vertical on mobile." },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section title="When to use">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Detail screens</strong> — the &ldquo;Properties&rdquo; / &ldquo;About&rdquo; panel of a resource page.</li>
            <li><strong>Settings groups</strong> — when each setting has a label and a value (read-mode / edit-mode toggles often start here).</li>
            <li><strong>Card bodies</strong> — quick stats with labels.</li>
            <li><strong>Don&rsquo;t use for tabular data</strong> — rows of identical attributes across many records belong in a Table.</li>
          </ul>
        </Card>
      </Section>

      <Section title="Accessibility">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Render as <code>&lt;dl&gt;</code> via the component</strong> — screen readers navigate dl/dt/dd as term/definition pairs.</li>
            <li><strong>Pass <code>aria-label</code> on the DescriptionList</strong> when the surrounding section doesn&rsquo;t already name it.</li>
            <li><strong>Keep terms short.</strong> Multi-word terms hurt scanability; if the term needs explanation, use a help popover.</li>
          </ul>
        </Card>
      </Section>
      <ThemingPointer
        dials={[
          ["--gp-text-default", "Description text."],
          ["--gp-text-subtle", "Term label colour."],
          ["--gp-gap-form", "Vertical rhythm between term/desc pairs."],
        ]}
      />
    </FoundationPage>
  ),
};
