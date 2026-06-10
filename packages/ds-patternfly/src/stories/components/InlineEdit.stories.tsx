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
  SingleLineField,
  EmptyState,
  Multiline,
} from "../../examples/components/InlineEdit.example.js";
import inlineEditExampleSrc from "../../examples/components/InlineEdit.example.tsx?raw";

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
            so the recipe below is the canonical shape — drop it into a
            component file and reuse.
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
          description="Swap TextInput for TextArea when the field accepts long text. Cmd/Ctrl + Enter saves; bare Enter inserts a newline."
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
          description="The complete recipe — the InlineText implementation plus every demo above, ready to drop into your codebase. The same file ships in the MCP docs catalog."
        >
          <Card>
            <Example
              source={inlineEditExampleSrc}
              fileName="InlineEdit.example.tsx"
            />
          </Card>
        </Section>

        <Section title="Most-used props">
          <Card>
            <div style={{ padding: 24 }}>
              <PropsTable
                rows={[
                  { name: "value", type: "string", description: "Current value rendered in read mode." },
                  { name: "onSave", type: "(next: string) => void", description: "Fired when the user commits — wire it to your state / API. Trim the value before persisting." },
                  { name: "ariaLabel", type: "string", description: "Accessible name for the input + edit / save / cancel buttons. Required." },
                  { name: "placeholder", type: "string", description: "Shown in subtle text when value is empty. The pencil still triggers edit mode." },
                  { name: "multiline", type: "boolean", description: "Render a TextArea instead of TextInput. Cmd/Ctrl + Enter saves, Enter inserts a newline." },
                ]}
              />
              <p style={{ marginTop: 16, marginBottom: 0, color: "var(--gp-color-text-subtle)", fontSize: 14 }}>
                <strong>Why a recipe, not a component?</strong> PatternFly 6.4.3
                doesn&rsquo;t ship a dedicated <code>InlineEdit</code>; the
                pattern is small enough that owning the implementation in your
                app is preferable to wrapping it in a generic component prop
                surface that has to handle every edge case.
              </p>
            </div>
          </Card>
        </Section>

        <Section title="Accessibility">
          <Card>
            <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
              <li><strong>Auto-focus the input on enter-edit.</strong> The recipe uses a ref + useEffect — without it, keyboard users have to Tab into the field they just opened.</li>
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
