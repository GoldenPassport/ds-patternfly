import { useEffect, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { FoundationPage, Section, Card, CodeBlock, Example } from "../_kit/StoryKit.js";
import { PropsTable } from "../_kit/DemoKit.js";
import { ColumnExample } from "../../examples/component-groups/ListManager.example.js";
import listManagerExampleSrc from "../../examples/component-groups/ListManager.example.tsx?raw";

/**
 * ListManager's underlying @patternfly/react-drag-drop DragDropContainer
 * portals its drag-overlay into `document.getElementById("root")` (PF6's
 * hardcoded assumption from the marketing-site preview). Storybook uses
 * `#storybook-root`, so the portal target is null at render time and the
 * component throws on mount.
 *
 * Workaround: gate the render on a state flag that flips true after we
 * inject a `<div id="root">` in a layout effect — that way ListManager
 * only mounts AFTER the portal target exists in the DOM.
 */
function useEnsureRootMount(): boolean {
  const [ready, setReady] = useState(
    typeof document !== "undefined" && !!document.getElementById("root"),
  );
  useEffect(() => {
    if (typeof document === "undefined") return undefined;
    let injected: HTMLDivElement | null = null;
    if (!document.getElementById("root")) {
      injected = document.createElement("div");
      injected.id = "root";
      // The drag overlay renders here while a row is being dragged.
      // Pointer-events stay none so the hidden mount can't intercept
      // clicks on the actual story UI.
      injected.style.position = "fixed";
      injected.style.inset = "0";
      injected.style.pointerEvents = "none";
      injected.style.zIndex = "9999";
      document.body.appendChild(injected);
    }
    setReady(true);
    return () => {
      if (injected && injected.parentElement) {
        injected.parentElement.removeChild(injected);
      }
    };
  }, []);
  return ready;
}

function GatedColumnExample() {
  const ready = useEnsureRootMount();

  // Hold the ListManager out of the tree until #root exists, otherwise
  // DragDropContainer's createPortal crashes on first render.
  if (!ready) {
    return <div style={{ minHeight: 320 }} aria-hidden />;
  }
  return <ColumnExample />;
}

const meta: Meta = {
  title: "Component groups/Helpers/List manager",
  // `!test` opts the story out of the vitest browser harness: the harness
  // takes a snapshot before layout effects run, so our injected `#root`
  // portal target isn't in the DOM yet and ListManager crashes. The
  // Storybook GUI render uses the same `useEnsureRootMount` pattern but
  // gets to run effects before serializing, so the live demo works there.
  tags: ["!test"],
  parameters: {
    layout: "padded",
    a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } },
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
        title="Column example"
        description="Live port of PF6's canonical ColumnExample (https://www.patternfly.org/component-groups/helpers/list-manager). Reorder via drag-and-drop or per-row move buttons, toggle checkboxes to show / hide, lock the ID column via `isUntoggleable`. Save / Cancel alert from the demo handlers."
      >
        <Card>
          {/* PF6's `pf-m-plain` button paints a circular hover/focus
              background. On the draggable-handle button the circle
              competes visually with the 6-dot drag icon — flatten it
              so only the cursor + icon colour change on hover. */}
          <style
            dangerouslySetInnerHTML={{
              __html: [
                ".pf-v6-c-data-list__item-draggable-button {",
                "  background: transparent !important;",
                "  box-shadow: none !important;",
                "}",
                ".pf-v6-c-data-list__item-draggable-button:hover,",
                ".pf-v6-c-data-list__item-draggable-button:focus,",
                ".pf-v6-c-data-list__item-draggable-button:focus-visible,",
                ".pf-v6-c-data-list__item-draggable-button:active {",
                "  background: transparent !important;",
                "  box-shadow: none !important;",
                "}",
                /* PF6 also paints the hover via the ::before pseudo. */
                ".pf-v6-c-data-list__item-draggable-button::before {",
                "  background: transparent !important;",
                "}",
              ].join("\n"),
            }}
          />
          <Example
            source={listManagerExampleSrc}
            region="ColumnExample"
            fileName="ListManager.example.tsx"
          >
            <GatedColumnExample />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example source={listManagerExampleSrc} fileName="ListManager.example.tsx" />
        </Card>
      </Section>

      <Section
        title="Recipe"
        description="Minimal wiring — same handlers, applied to a smaller column set."
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
