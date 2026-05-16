import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { TextInput, FormSelect, FormSelectOption } from "@patternfly/react-core";
import { FieldBuilder } from "@patternfly/react-component-groups/dist/dynamic/FieldBuilder";
import { FoundationPage, Section, Card, CodeBlock } from "../_storyKit.js";
import { DemoFrame, PropsTable } from "../_demoKit.js";

const meta: Meta = {
  title: "Component groups/Helpers/Field Builder",
  parameters: { layout: "padded" },
};
export default meta;

type EnvVar = { key: string; value: string };

export const Overview: StoryObj = {
  render: () => {
    const [vars, setVars] = useState<EnvVar[]>([
      { key: "API_URL", value: "https://api.example.com" },
      { key: "LOG_LEVEL", value: "info" },
    ]);

    const update = (i: number, patch: Partial<EnvVar>) =>
      setVars((prev) => prev.map((v, idx) => (idx === i ? { ...v, ...patch } : v)));

    return (
      <FoundationPage
        title="Field Builder"
        intro={
          <>
            A two-column repeater for dynamic form rows — env vars,
            tags, key/value pairs, conditions. Manages the
            add / remove / focus-management chrome; you supply the
            inputs via a render prop.
          </>
        }
      >
        <Section
          title="Key / value editor"
          description="Two columns. State is owned by the parent — the component renders rows by `rowCount` and calls back on add / remove."
        >
          <Card>
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <DemoFrame>
                <FieldBuilder
                  label="Environment variables"
                  firstColumnLabel="Name"
                  secondColumnLabel="Value"
                  rowCount={vars.length}
                  rowGroupLabelPrefix="Variable"
                  onAddRow={() => setVars((p) => [...p, { key: "", value: "" }])}
                  onRemoveRow={(_e, i) => setVars((p) => p.filter((_, idx) => idx !== i))}
                  addButtonContent="Add variable"
                >
                  {(helpers, i) => [
                    <TextInput
                      key={`k-${i}`}
                      ref={helpers.focusRef as React.Ref<HTMLInputElement>}
                      aria-label={helpers.firstColumnAriaLabel}
                      value={vars[i]?.key ?? ""}
                      onChange={(_e, v) => update(i, { key: v })}
                    />,
                    <TextInput
                      key={`v-${i}`}
                      aria-label={helpers.secondColumnAriaLabel ?? ""}
                      value={vars[i]?.value ?? ""}
                      onChange={(_e, v) => update(i, { value: v })}
                    />,
                  ]}
                </FieldBuilder>
              </DemoFrame>
              <CodeBlock>{`<FieldBuilder
  label="Environment variables"
  firstColumnLabel="Name"
  secondColumnLabel="Value"
  rowCount={vars.length}
  onAddRow={() => setVars(p => [...p, { key: "", value: "" }])}
  onRemoveRow={(_e, i) => setVars(p => p.filter((_, idx) => idx !== i))}
>
  {(helpers, i) => [
    <TextInput key={\`k-\${i}\`} ref={helpers.focusRef} aria-label={helpers.firstColumnAriaLabel} value={vars[i].key} onChange={...} />,
    <TextInput key={\`v-\${i}\`} aria-label={helpers.secondColumnAriaLabel} value={vars[i].value} onChange={...} />,
  ]}
</FieldBuilder>`}</CodeBlock>
            </div>
          </Card>
        </Section>

        <Section
          title="Single column"
          description="Return one child to render a single-column variant — tags, conditions, anything one-input-per-row."
        >
          <Card>
            <div style={{ padding: 24 }}>
              <DemoFrame>
                <SingleColumnDemo />
              </DemoFrame>
            </div>
          </Card>
        </Section>

        <Section title="Most-used props">
          <Card>
            <div style={{ padding: 24 }}>
              <PropsTable
                rows={[
                  { name: "rowCount", type: "number", description: "Required — derive from your state array length." },
                  { name: "firstColumnLabel", type: "ReactNode", description: "Required — column header for the first column." },
                  { name: "secondColumnLabel", type: "ReactNode", description: "Column header for the second column. Omit to render a single-column variant." },
                  { name: "children", type: "(helpers: FieldRowHelpers, index: number) => ReactNode", description: "Render-prop — return 1 element (single column) or [el1, el2] (two columns) per row. helpers.focusRef wires focus management." },
                  { name: "onAddRow", type: "(event) => void", description: "Append a row to your state." },
                  { name: "onRemoveRow", type: "(event, index) => void", description: "Remove the row at `index` from your state." },
                  { name: "rowGroupLabelPrefix", type: "string", description: "Per-row label prefix (default 'Row'). Used for aria-labels and announcements." },
                  { name: "addButtonContent", type: "ReactNode", description: "Custom 'Add' button label (default 'Add another')." },
                  { name: "removeButtonAriaLabel", type: "(rowNumber, prefix) => string", description: "Localize / customize the remove button aria-label." },
                  { name: "onAddRowAnnouncement / onRemoveRowAnnouncement", type: "(rowNumber, prefix) => string", description: "Customize the live-region announcement when rows are added / removed." },
                  { name: "fieldBuilderIdPrefix", type: "string", description: "Required when multiple FieldBuilders share a page — keeps row group ids unique." },
                ]}
              />
            </div>
          </Card>
        </Section>

        <Section title="Accessibility">
          <Card>
            <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
              <li><strong>Use <code>helpers.focusRef</code></strong> on the first input of each row — it auto-focuses the new row when the user clicks Add and shifts focus appropriately on Remove.</li>
              <li><strong>Use <code>helpers.firstColumnAriaLabel</code></strong> on each input — it carries both the column name and the row index so screen-reader users know &ldquo;Name, row 3&rdquo;.</li>
              <li><strong>Localize the prefixes.</strong> <code>rowGroupLabelPrefix</code> defaults to &ldquo;Row&rdquo; — translate it for non-English locales.</li>
              <li><strong>Persist edits on row removal carefully.</strong> Removing the row the user is editing without warning loses unsaved changes — consider a confirm step or undo.</li>
            </ul>
          </Card>
        </Section>
      </FoundationPage>
    );
  },
};

function SingleColumnDemo() {
  const [tags, setTags] = useState<string[]>(["urgent", "billing"]);
  return (
    <FieldBuilder
      label="Tags"
      firstColumnLabel="Tag"
      rowCount={tags.length}
      rowGroupLabelPrefix="Tag"
      onAddRow={() => setTags((p) => [...p, ""])}
      onRemoveRow={(_e, i) => setTags((p) => p.filter((_, idx) => idx !== i))}
      addButtonContent="Add tag"
    >
      {(helpers, i) => (
        <TextInput
          ref={helpers.focusRef as React.Ref<HTMLInputElement>}
          aria-label={helpers.firstColumnAriaLabel}
          value={tags[i] ?? ""}
          onChange={(_e, v) =>
            setTags((p) => p.map((t, idx) => (idx === i ? v : t)))
          }
        />
      )}
    </FieldBuilder>
  );
}

// Suppress unused-import lint when the FormSelect demo isn't shown.
void FormSelect;
void FormSelectOption;
