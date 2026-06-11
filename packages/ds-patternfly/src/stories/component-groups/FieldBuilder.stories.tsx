import type { Meta, StoryObj } from "@storybook/react-vite";
import { FoundationPage, Section, Card, Example } from "../_kit/StoryKit.js";
import { PropsTable } from "../_kit/DemoKit.js";
import {
  KeyValueEditor,
  SingleColumn,
} from "../../examples/component-groups/FieldBuilder.example.js";
import fieldBuilderExampleSrc from "../../examples/component-groups/FieldBuilder.example.tsx?raw";

const meta: Meta = {
  title: "Component groups/Helpers/Field Builder",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
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
          <Example
            source={fieldBuilderExampleSrc}
            region="KeyValueEditor"
            fileName="FieldBuilder.example.tsx"
          >
            <KeyValueEditor />
          </Example>
        </Card>
      </Section>

      <Section
        title="Single column"
        description="Return one child to render a single-column variant — tags, conditions, anything one-input-per-row."
      >
        <Card>
          <Example
            source={fieldBuilderExampleSrc}
            region="SingleColumn"
            fileName="FieldBuilder.example.tsx"
          >
            <SingleColumn />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example source={fieldBuilderExampleSrc} fileName="FieldBuilder.example.tsx" />
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
  ),
};
