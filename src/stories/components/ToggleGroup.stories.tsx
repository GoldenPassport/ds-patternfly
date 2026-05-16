import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ToggleGroup, ToggleGroupItem } from "@patternfly/react-core";
import {
  ColumnsIcon,
  ListIcon,
  TableIcon,
} from "@patternfly/react-icons";
import { FoundationPage, Section, Card, CodeBlock } from "../_storyKit.js";
import { DemoFrame, PropsTable } from "../_demoKit.js";

const meta: Meta = {
  title: "Components/ToggleGroup",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => {
    const [single, setSingle] = useState("toggle-list");
    const [multi, setMulti] = useState<string[]>(["wrap"]);
    const [view, setView] = useState("toggle-grid");

    const toggleMulti = (id: string) =>
      setMulti((prev) =>
        prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
      );

    return (
      <FoundationPage
        title="ToggleGroup"
        intro={
          <>
            A pill-shaped row of mutually-exclusive (or independently
            toggleable) options — the canonical view-switcher / inline
            radio. Use for view-mode toggles (list / grid / table), filter
            modes, and small sets of related boolean settings.
          </>
        }
      >
        <Section
          title="Single-select"
          description="Track one selected id; clicking a different item replaces the selection. Allow toggling the active one off too if your UX wants 'no selection' to be valid."
        >
          <Card>
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <DemoFrame>
                <ToggleGroup aria-label="View density">
                  {[
                    { id: "toggle-list", text: "List" },
                    { id: "toggle-grid", text: "Grid" },
                    { id: "toggle-compact", text: "Compact" },
                  ].map((it) => (
                    <ToggleGroupItem
                      key={it.id}
                      text={it.text}
                      buttonId={it.id}
                      isSelected={single === it.id}
                      onChange={(_e) =>
                        setSingle(single === it.id ? "" : it.id)
                      }
                    />
                  ))}
                </ToggleGroup>
              </DemoFrame>
              <CodeBlock>{`const [selected, setSelected] = useState("toggle-list");

<ToggleGroup aria-label="View density">
  {items.map(it => (
    <ToggleGroupItem
      key={it.id}
      text={it.text}
      buttonId={it.id}
      isSelected={selected === it.id}
      onChange={() => setSelected(selected === it.id ? "" : it.id)}
    />
  ))}
</ToggleGroup>`}</CodeBlock>
            </div>
          </Card>
        </Section>

        <Section
          title="Multi-select"
          description="Track an array of selected ids; each item toggles independently. Use for inline boolean settings clusters."
        >
          <Card>
            <div style={{ padding: 24 }}>
              <DemoFrame>
                <ToggleGroup aria-label="Editor settings">
                  {[
                    { id: "wrap", text: "Wrap" },
                    { id: "minimap", text: "Minimap" },
                    { id: "linenums", text: "Line numbers" },
                  ].map((it) => (
                    <ToggleGroupItem
                      key={it.id}
                      text={it.text}
                      buttonId={`multi-${it.id}`}
                      isSelected={multi.includes(it.id)}
                      onChange={() => toggleMulti(it.id)}
                    />
                  ))}
                </ToggleGroup>
              </DemoFrame>
            </div>
          </Card>
        </Section>

        <Section
          title="With icons"
          description="ToggleGroupItem.icon adds a leading glyph; pair with text or use icon-only (with aria-label) for compact view-switchers."
        >
          <Card>
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <DemoFrame>
                <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                  <ToggleGroup aria-label="View mode (icon + text)">
                    {[
                      { id: "toggle-list", text: "List", icon: <ListIcon /> },
                      { id: "toggle-grid", text: "Grid", icon: <ColumnsIcon /> },
                      { id: "toggle-table", text: "Table", icon: <TableIcon /> },
                    ].map((it) => (
                      <ToggleGroupItem
                        key={it.id}
                        text={it.text}
                        icon={it.icon}
                        buttonId={`vt-${it.id}`}
                        isSelected={view === it.id}
                        onChange={() => setView(it.id)}
                      />
                    ))}
                  </ToggleGroup>
                  <ToggleGroup aria-label="View mode (icon only)">
                    {[
                      { id: "toggle-list", aria: "List", icon: <ListIcon /> },
                      { id: "toggle-grid", aria: "Grid", icon: <ColumnsIcon /> },
                      { id: "toggle-table", aria: "Table", icon: <TableIcon /> },
                    ].map((it) => (
                      <ToggleGroupItem
                        key={it.id}
                        aria-label={it.aria}
                        icon={it.icon}
                        buttonId={`vi-${it.id}`}
                        isSelected={view === it.id}
                        onChange={() => setView(it.id)}
                      />
                    ))}
                  </ToggleGroup>
                </div>
              </DemoFrame>
            </div>
          </Card>
        </Section>

        <Section
          title="Compact"
          description="isCompact tightens padding — use inside Toolbars and dense settings panels."
        >
          <Card>
            <div style={{ padding: 24 }}>
              <DemoFrame>
                <ToggleGroup aria-label="Compact view mode" isCompact>
                  {[
                    { id: "compact-list", text: "List" },
                    { id: "compact-grid", text: "Grid" },
                    { id: "compact-table", text: "Table" },
                  ].map((it) => (
                    <ToggleGroupItem
                      key={it.id}
                      text={it.text}
                      buttonId={it.id}
                      isSelected={false}
                    />
                  ))}
                </ToggleGroup>
              </DemoFrame>
            </div>
          </Card>
        </Section>

        <Section title="Most-used props">
          <Card>
            <div style={{ padding: 24 }}>
              <PropsTable
                rows={[
                  { name: "ToggleGroup.aria-label", type: "string", description: "Required — names the group." },
                  { name: "ToggleGroup.isCompact", type: "boolean", description: "Tighter padding." },
                  { name: "ToggleGroup.areAllGroupsDisabled", type: "boolean", description: "Disable every item in the group." },
                  { name: "ToggleGroupItem.text", type: "ReactNode", description: "Visible label." },
                  { name: "ToggleGroupItem.icon", type: "ReactNode", description: "Leading glyph." },
                  { name: "ToggleGroupItem.buttonId", type: "string", description: "Required — used by isSelected matching and DOM identity." },
                  { name: "ToggleGroupItem.isSelected", type: "boolean", description: "Selected state. Drives aria-pressed." },
                  { name: "ToggleGroupItem.onChange", type: "(event, isSelected) => void", description: "Fires on click. Note the event is the first arg." },
                  { name: "ToggleGroupItem.isDisabled", type: "boolean", description: "Disable a single item." },
                  { name: "ToggleGroupItem.aria-label", type: "string", description: "Required when icon-only (no text)." },
                ]}
              />
            </div>
          </Card>
        </Section>

        <Section title="When to use">
          <Card>
            <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
              <li><strong>View-mode switchers</strong> — list / grid / table icons in toolbars.</li>
              <li><strong>Inline radio replacements</strong> — small sets (2–4) of mutually exclusive options when a stacked Radio group would be too tall.</li>
              <li><strong>Boolean cluster settings</strong> — &ldquo;Wrap / Minimap / Line numbers&rdquo; in editor toolbars.</li>
              <li><strong>Don&rsquo;t use for large lists</strong> — once you exceed 4–5 items, use Tabs (mutually exclusive views) or Checkbox group (multiple booleans).</li>
            </ul>
          </Card>
        </Section>

        <Section title="Accessibility">
          <Card>
            <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
              <li><strong>aria-label is required on the group</strong> — names the cluster as a region.</li>
              <li><strong>Icon-only items need aria-label per item</strong> — the icon alone doesn&rsquo;t announce.</li>
              <li><strong>buttonId must be unique per group</strong> — used both as DOM id and the matching key for isSelected.</li>
              <li><strong>Keyboard:</strong> Tab between items, Space / Enter to toggle.</li>
            </ul>
          </Card>
        </Section>
      </FoundationPage>
    );
  },
};
