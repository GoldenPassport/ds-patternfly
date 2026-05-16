import type { Meta, StoryObj } from "@storybook/react-vite";
import { FoundationPage, Section, Card, CodeBlock } from "../_storyKit.js";
import { PropsTable } from "../_demoKit.js";

const meta: Meta = {
  title: "Component groups/Helpers/List manager",
  parameters: {
    layout: "padded",
    a11y: {
      // ListManager mounts @patternfly/react-drag-drop which calls
      // createPortal against a document target — incompatible with the
      // browser test runner's mount lifecycle. Render this story as
      // code-only documentation; verify the live component in the
      // playground app.
      config: { rules: [{ id: "color-contrast", enabled: false }] },
    },
  },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="List manager"
      intro={
        <>
          A reusable selectable + reorderable list — the visible body of a
          column-management or preferences modal. Use the standalone
          ListManager when you want to embed the same UI inline (e.g.
          inside a Drawer) rather than launching the full{" "}
          <code>ColumnManagementModal</code>.
        </>
      }
    >
      <Section
        title="Recipe"
        description="ListManager pulls in @patternfly/react-drag-drop, which mounts a portal in onMount. The example below is documented as code; see the playground app for a live demo."
      >
        <Card>
          <div style={{ padding: 24 }}>
            <CodeBlock>{`import { useState } from "react";
import ListManager, {
  type ListManagerItem,
} from "@patternfly/react-component-groups/dist/dynamic/ListManager";

const initial: ListManagerItem[] = [
  { key: "name",    title: "Name",    isSelected: true,  isShownByDefault: true },
  { key: "status",  title: "Status",  isSelected: true,  isShownByDefault: true },
  { key: "owner",   title: "Owner",   isSelected: true,  isShownByDefault: true },
  { key: "created", title: "Created", isSelected: false, isShownByDefault: false },
];

function ColumnPicker() {
  const [items, setItems] = useState(initial);
  return (
    <ListManager
      columns={items}
      enableDragDrop
      onSelect={(col) =>
        setItems(p => p.map(c => c.key === col.key ? { ...c, isSelected: !c.isSelected } : c))
      }
      onOrderChange={setItems}
      onSave={persist}
      onCancel={dismiss}
    />
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
                { name: "columns", type: "ListManagerItem[]", description: "Required — the items to display. Each item has key, title, isSelected, isShownByDefault, isUntoggleable." },
                { name: "onSelect", type: "(item) => void", description: "Single-item selection toggle." },
                { name: "onSelectAll", type: "(items) => void", description: "Bulk select toggle (used by the header checkbox)." },
                { name: "onOrderChange", type: "(items) => void", description: "Fired after reorder — pass the new array order." },
                { name: "onSave", type: "(items) => void", description: "Persist handler when the embedded Save button is used." },
                { name: "onCancel", type: "() => void", description: "Reset / dismiss handler." },
                { name: "enableDragDrop", type: "boolean", description: "Allow drag-and-drop reordering." },
                { name: "dataListAriaLabel", type: "string", description: "Override the inner DataList's aria-label." },
                { name: "ouiaId", type: "string | number", description: "Stable test selector." },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section title="ListManager vs ColumnManagementModal">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>ListManager</strong> — bare list. Use inline (drawer, side panel, settings page).</li>
            <li><strong>ColumnManagementModal</strong> — wraps ListManager inside a Modal with title + description. Use as a kebab item on a table toolbar.</li>
          </ul>
        </Card>
      </Section>

      <Section title="Accessibility">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Pass <code>dataListAriaLabel</code></strong> — the underlying DataList needs a name so screen readers don&rsquo;t announce &ldquo;list with N items&rdquo; without context.</li>
            <li><strong>Drag-and-drop needs a keyboard fallback.</strong> The component provides up / down keyboard reorder when items are focused.</li>
            <li><strong>Untoggleable items still appear in the list</strong> — visually disabled. Don&rsquo;t hide them; the user needs to see why they can&rsquo;t turn off the always-on column.</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
