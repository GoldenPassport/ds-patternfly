import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@golden-passport/ds-patternfly";
import ColumnManagementModal, {
  type ColumnManagementModalColumn,
} from "@patternfly/react-component-groups/dist/dynamic/ColumnManagementModal";
import { FoundationPage, Section, Card, CodeBlock } from "../_kit/StoryKit.js";
import { DemoFrame, PropsTable } from "../_kit/DemoKit.js";

const meta: Meta = {
  title: "Component groups/Helpers/Column management modal",
  parameters: { layout: "padded" },
};
export default meta;

const initial: ColumnManagementModalColumn[] = [
  { key: "name",    title: "Name",    isShown: true,  isShownByDefault: true,  isUntoggleable: true },
  { key: "status",  title: "Status",  isShown: true,  isShownByDefault: true },
  { key: "owner",   title: "Owner",   isShown: true,  isShownByDefault: true },
  { key: "created", title: "Created", isShown: false, isShownByDefault: false },
  { key: "updated", title: "Updated", isShown: false, isShownByDefault: false },
  { key: "tags",    title: "Tags",    isShown: false, isShownByDefault: false },
];

export const Overview: StoryObj = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [cols, setCols] = useState(initial);

    return (
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
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <DemoFrame>
                <div style={{ display: "grid", gap: 8 }}>
                  <Button onClick={() => setOpen(true)}>Manage columns</Button>
                  <p style={{ margin: 0, color: "var(--gp-color-text-subtle)", fontSize: 13 }}>
                    Currently visible:{" "}
                    {cols.filter((c) => c.isShown).map((c) => c.title).join(", ")}
                  </p>
                </div>
              </DemoFrame>
              <ColumnManagementModal
                isOpen={open}
                onClose={() => setOpen(false)}
                appliedColumns={cols}
                applyColumns={(next) => {
                  setCols(next);
                  setOpen(false);
                }}
                title="Manage columns"
                description="Pick which columns appear in the workflows table."
              />
              <CodeBlock>{`<ColumnManagementModal
  isOpen={open}
  onClose={close}
  appliedColumns={columns}
  applyColumns={setColumns}
  title="Manage columns"
  enableDragDrop
/>`}</CodeBlock>
            </div>
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
    );
  },
};
