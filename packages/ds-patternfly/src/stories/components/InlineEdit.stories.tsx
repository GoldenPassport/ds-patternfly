import { useEffect, useRef, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Button,
  Flex,
  FlexItem,
  TextArea,
  TextInput,
} from "@patternfly/react-core";
import {
  CheckIcon,
  PencilAltIcon,
  TimesIcon,
} from "@patternfly/react-icons";
import { FoundationPage, Section, Card, CodeBlock, ThemingPointer } from "../_storyKit.js";
import { DemoFrame, PropsTable } from "../../components/DemoKit.js";

const meta: Meta = {
  title: "Components/Forms/Inline edit",
  parameters: { layout: "padded" },
};
export default meta;

/**
 * Composed inline-edit pattern. PatternFly publishes this as a recipe rather
 * than a single component in 6.4.3, so this page documents the canonical
 * shape: a read view with a pencil affordance, an edit view with a control
 * + check / times buttons, Enter-to-save and Escape-to-cancel.
 */
function InlineText({
  value,
  onSave,
  ariaLabel,
  placeholder,
  multiline = false,
}: {
  value: string;
  onSave: (next: string) => void;
  ariaLabel: string;
  placeholder?: string;
  multiline?: boolean;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  const start = () => {
    setDraft(value);
    setEditing(true);
  };
  const commit = () => {
    onSave(draft.trim());
    setEditing(false);
  };
  const cancel = () => {
    setDraft(value);
    setEditing(false);
  };

  if (!editing) {
    return (
      <Flex
        alignItems={{ default: "alignItemsCenter" }}
        spaceItems={{ default: "spaceItemsSm" }}
      >
        <FlexItem>
          <span style={{ color: value ? "var(--gp-color-text-regular)" : "var(--gp-color-text-subtle)" }}>
            {value || placeholder || "—"}
          </span>
        </FlexItem>
        <FlexItem>
          <Button
            variant="plain"
            aria-label={`Edit ${ariaLabel}`}
            onClick={start}
            icon={<PencilAltIcon />}
          />
        </FlexItem>
      </Flex>
    );
  }

  return (
    <Flex
      alignItems={{ default: multiline ? "alignItemsFlexStart" : "alignItemsCenter" }}
      spaceItems={{ default: "spaceItemsSm" }}
    >
      <FlexItem grow={{ default: "grow" }}>
        {multiline ? (
          <TextArea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            aria-label={ariaLabel}
            value={draft}
            onChange={(_e, v) => setDraft(v)}
            onKeyDown={(e) => {
              if (e.key === "Escape") cancel();
              if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) commit();
            }}
            rows={3}
          />
        ) : (
          <TextInput
            ref={inputRef as React.RefObject<HTMLInputElement>}
            aria-label={ariaLabel}
            value={draft}
            onChange={(_e, v) => setDraft(v)}
            onKeyDown={(e) => {
              if (e.key === "Escape") cancel();
              if (e.key === "Enter") commit();
            }}
          />
        )}
      </FlexItem>
      <FlexItem>
        <Button
          variant="plain"
          aria-label={`Save ${ariaLabel}`}
          onClick={commit}
          icon={<CheckIcon />}
        />
      </FlexItem>
      <FlexItem>
        <Button
          variant="plain"
          aria-label={`Cancel editing ${ariaLabel}`}
          onClick={cancel}
          icon={<TimesIcon />}
        />
      </FlexItem>
    </Flex>
  );
}

export const Overview: StoryObj = {
  render: () => {
    const [title, setTitle] = useState("Quarterly review");
    const [owner, setOwner] = useState("Ada Lovelace");
    const [empty, setEmpty] = useState("");
    const [notes, setNotes] = useState(
      "Action items captured from the planning session.",
    );

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
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <DemoFrame>
                <div style={{ display: "grid", gap: 12, padding: 8 }}>
                  <div>
                    <div
                      style={{
                        fontSize: 12,
                        color: "var(--gp-color-text-subtle)",
                        marginBottom: 4,
                      }}
                    >
                      Title
                    </div>
                    <InlineText
                      value={title}
                      onSave={setTitle}
                      ariaLabel="title"
                    />
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 12,
                        color: "var(--gp-color-text-subtle)",
                        marginBottom: 4,
                      }}
                    >
                      Owner
                    </div>
                    <InlineText
                      value={owner}
                      onSave={setOwner}
                      ariaLabel="owner"
                    />
                  </div>
                </div>
              </DemoFrame>
              <CodeBlock>{`<InlineText
  value={title}
  onSave={setTitle}
  ariaLabel="title"
/>`}</CodeBlock>
            </div>
          </Card>
        </Section>

        <Section
          title="Empty state"
          description="When the value is empty, render the placeholder in a subtle tone. The pencil still opens the editor."
        >
          <Card>
            <div style={{ padding: 24 }}>
              <DemoFrame>
                <div style={{ padding: 8 }}>
                  <div
                    style={{
                      fontSize: 12,
                      color: "var(--gp-color-text-subtle)",
                      marginBottom: 4,
                    }}
                  >
                    Description
                  </div>
                  <InlineText
                    value={empty}
                    onSave={setEmpty}
                    placeholder="Add a description"
                    ariaLabel="description"
                  />
                </div>
              </DemoFrame>
            </div>
          </Card>
        </Section>

        <Section
          title="Multiline"
          description="Swap TextInput for TextArea when the field accepts long text. Cmd/Ctrl + Enter saves; bare Enter inserts a newline."
        >
          <Card>
            <div style={{ padding: 24 }}>
              <DemoFrame>
                <div style={{ padding: 8 }}>
                  <div
                    style={{
                      fontSize: 12,
                      color: "var(--gp-color-text-subtle)",
                      marginBottom: 4,
                    }}
                  >
                    Notes
                  </div>
                  <InlineText
                    value={notes}
                    onSave={setNotes}
                    ariaLabel="notes"
                    multiline
                  />
                </div>
              </DemoFrame>
            </div>
          </Card>
        </Section>

        <Section
          title="Recipe"
          description="The full implementation — drop into your codebase as a single component and reuse."
        >
          <Card>
            <div style={{ padding: 24 }}>
              <CodeBlock>{`function InlineText({ value, onSave, ariaLabel, placeholder }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const inputRef = useRef(null);

  useEffect(() => { if (editing) inputRef.current?.focus(); }, [editing]);

  const start  = () => { setDraft(value); setEditing(true); };
  const commit = () => { onSave(draft.trim()); setEditing(false); };
  const cancel = () => { setDraft(value); setEditing(false); };

  if (!editing) {
    return (
      <Flex spaceItems={{ default: "spaceItemsSm" }} alignItems={{ default: "alignItemsCenter" }}>
        <FlexItem>{value || placeholder || "—"}</FlexItem>
        <FlexItem>
          <Button variant="plain" aria-label={\`Edit \${ariaLabel}\`} onClick={start} icon={<PencilAltIcon />} />
        </FlexItem>
      </Flex>
    );
  }

  return (
    <Flex spaceItems={{ default: "spaceItemsSm" }} alignItems={{ default: "alignItemsCenter" }}>
      <FlexItem grow={{ default: "grow" }}>
        <TextInput
          ref={inputRef}
          aria-label={ariaLabel}
          value={draft}
          onChange={(_e, v) => setDraft(v)}
          onKeyDown={(e) => {
            if (e.key === "Escape") cancel();
            if (e.key === "Enter")  commit();
          }}
        />
      </FlexItem>
      <FlexItem>
        <Button variant="plain" aria-label={\`Save \${ariaLabel}\`}   onClick={commit} icon={<CheckIcon />} />
      </FlexItem>
      <FlexItem>
        <Button variant="plain" aria-label={\`Cancel editing \${ariaLabel}\`} onClick={cancel} icon={<TimesIcon />} />
      </FlexItem>
    </Flex>
  );
}`}</CodeBlock>
            </div>
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
