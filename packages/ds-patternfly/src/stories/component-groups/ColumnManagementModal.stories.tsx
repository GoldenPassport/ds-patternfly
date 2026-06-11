import type { Meta, StoryObj } from "@storybook/react-vite";
import { FoundationPage, Section, Card, Example } from "../_kit/StoryKit.js";
import { PropsTable } from "../_kit/DemoKit.js";
import { ToggleColumns } from "../../examples/component-groups/ColumnManagementModal.example.js";
import columnManagementModalExampleSrc from "../../examples/component-groups/ColumnManagementModal.example.tsx?raw";

const meta: Meta = {
  title: "Component groups/Helpers/Column management modal",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Column management modal"
      intro={
        <>
          A pre-built modal for showing / hiding table columns — checkbox
          list, optional drag-and-drop reorder, untoggleable
          &ldquo;always-on&rdquo; columns. Wire it up to a kebab item
          in your table&rsquo;s toolbar.
        </>
      }
    >
      <Section title="Toggle columns">
        <Card>
          <Example
            source={columnManagementModalExampleSrc}
            region="ToggleColumns"
            fileName="ColumnManagementModal.example.tsx"
          >
            <ToggleColumns />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example
            source={columnManagementModalExampleSrc}
            fileName="ColumnManagementModal.example.tsx"
          />
        </Card>
      </Section>

      <Section title="Most-used props">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "isOpen", type: "boolean", description: "Controlled — show/hide." },
                { name: "onClose", type: "(event) => void", description: "Cancel / dismiss handler." },
                { name: "appliedColumns", type: "ColumnManagementModalColumn[]", description: "Current column state — feed your table's column array." },
                { name: "applyColumns", type: "(next: ColumnManagementModalColumn[]) => void", description: "Called when the user clicks Save with the new column array." },
                { name: "enableDragDrop", type: "boolean", description: "Allow reordering by drag-and-drop. Pair with table column ordering logic." },
                { name: "title", type: "string", description: "Modal title (default 'Manage columns')." },
                { name: "description", type: "string", description: "Optional intro text under the title." },
                { name: "ouiaId", type: "string | number", description: "Stable test selector." },
              ]}
            />
            <p style={{ marginTop: 16, marginBottom: 0, color: "var(--gp-color-text-subtle)", fontSize: 14 }}>
              <strong>ColumnManagementModalColumn</strong>:{" "}
              <code>{`{ key, title, isShown, isShownByDefault, isUntoggleable }`}</code>.
              Mark always-on columns (Name, ID) <code>isUntoggleable</code> so
              users can&rsquo;t accidentally hide them.
            </p>
          </div>
        </Card>
      </Section>

      <Section title="Accessibility">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Persist the user&rsquo;s choice.</strong> Save column visibility to localStorage / user prefs — losing it on every reload is a poor experience.</li>
            <li><strong>Keep at least one column untoggleable.</strong> Disabling all columns leaves an empty table — unhelpful and confusing.</li>
            <li><strong>Drag-and-drop needs a keyboard alternative.</strong> If you enable reorder, expose move-up / move-down buttons too — drag-only is inaccessible.</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
