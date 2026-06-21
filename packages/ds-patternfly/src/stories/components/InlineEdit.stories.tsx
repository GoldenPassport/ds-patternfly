import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  FoundationPage,
  Section,
  Card,
  ConfigurationSection,
  Example,
  ThemingPointer,
} from "../_kit/StoryKit.js";
import {
  SingleLineField,
  EmptyState,
  Multiline,
} from "../../examples/components/InlineEdit.example.js";
import inlineEditExampleSrc from "../../examples/components/InlineEdit.example.tsx?raw";
import inlineEditFieldComponentSrc from "../../components/ds/InlineEditField.tsx?raw";

const meta: Meta = {
  title: "Components/Forms/Inline edit",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => {
    return (
      <FoundationPage
        title="Inline edit"
        intro={
          <>
            A read-by-default field that switches to edit mode on demand —
            pencil to start, check to save, X to cancel. Use it for
            single-field metadata edits where opening a modal would be
            heavy: titles, owners, descriptions, tags. PatternFly ships
            this as a composed pattern in 6.4.3 (no dedicated component),
            so the lib exports it as <code>InlineEditField</code> — the
            canonical shape, ready to drop in.
          </>
        }
      >
        <Section
          title="Single-line field"
          description="Read view shows the value next to a pencil. Click pencil → TextInput appears with check / times. Enter saves, Escape cancels."
        >
          <Card>
            <Example
              source={inlineEditExampleSrc}
              region="SingleLineField"
              fileName="InlineEdit.example.tsx"
            >
              <SingleLineField />
            </Example>
          </Card>
        </Section>

        <Section
          title="Empty state"
          description="When the value is empty, render the placeholder in a subtle tone. The pencil still opens the editor."
        >
          <Card>
            <Example
              source={inlineEditExampleSrc}
              region="EmptyState"
              fileName="InlineEdit.example.tsx"
            >
              <EmptyState />
            </Example>
          </Card>
        </Section>

        <Section
          title="Multiline"
          description="Pass multiline to render a TextArea for long text. Cmd/Ctrl + Enter saves; bare Enter inserts a newline."
        >
          <Card>
            <Example
              source={inlineEditExampleSrc}
              region="Multiline"
              fileName="InlineEdit.example.tsx"
            >
              <Multiline />
            </Example>
          </Card>
        </Section>

        <Section
          title="Full example"
          description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
        >
          <Card>
            <Example
              source={inlineEditExampleSrc}
              fileName="InlineEdit.example.tsx"
            />
          </Card>
        </Section>

        <ConfigurationSection
          importStatement={'import { InlineEditField } from "@golden-passport/ds-patternfly";'}
          componentSource={inlineEditFieldComponentSrc}
          componentFileName="InlineEditField.tsx"
          description="InlineEditField owns the read / edit toggle, the affordances, the save / cancel keys, and the draft + focus bookkeeping. You hold the committed value and persist it from onSave."
          rows={[
            { name: "value", type: "string", description: "Committed value rendered in read mode." },
            { name: "onSave", type: "(next: string) => void", description: "Fired when the user commits — wire it to your state / API." },
            { name: "ariaLabel", type: "string", description: "Required. Accessible name; also seeds the edit / save / cancel button labels." },
            { name: "placeholder", type: "string", description: "Shown in subtle text when value is empty. The pencil still triggers edit mode." },
            { name: "multiline", type: "boolean", description: "Render a TextArea instead of TextInput. Cmd/Ctrl + Enter saves, Enter inserts a newline." },
            { name: "rows", type: "number", description: "Row count for the multiline control (default 3)." },
            { name: "trimOnSave", type: "boolean", description: "Trim surrounding whitespace before saving (default true)." },
          ]}
        />

        <Section title="Accessibility">
          <Card>
            <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
              <li><strong>The input auto-focuses on enter-edit.</strong> InlineEditField focuses the control for you — without it, keyboard users would have to Tab into the field they just opened.</li>
              <li><strong>Enter saves, Escape cancels.</strong> Standard editor keys — users expect them. For multiline, switch to Cmd/Ctrl + Enter so plain Enter still inserts newlines.</li>
              <li><strong>Each control needs an aria-label.</strong> Pencil, check, X — all icon-only buttons. Bake the field name into the label (&ldquo;Edit title&rdquo;, &ldquo;Save title&rdquo;) so the announcement carries context.</li>
              <li><strong>Don&rsquo;t auto-save on blur.</strong> Blur-saves are surprising — users expect to be able to click away and discard their edit. Make Save explicit.</li>
              <li><strong>Surface validation under the input.</strong> If the value can fail validation, render <code>HelperText</code> with <code>variant=&quot;error&quot;</code> below the editor and disable the Save button until valid.</li>
            </ul>
          </Card>
        </Section>
        <ThemingPointer
          dials={[
            ["--gp-control-pad-y", "Edit-mode field height."],
            ["--gp-radius-control", "Edit-mode field + button radius."],
            ["--gp-focus-ring", "Focus-ring on the inline editor."],
          ]}
        />
      </FoundationPage>
    );
  },
};
