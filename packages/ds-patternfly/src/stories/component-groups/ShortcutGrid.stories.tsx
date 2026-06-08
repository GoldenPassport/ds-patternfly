import type { Meta, StoryObj } from "@storybook/react-vite";
import ShortcutGrid from "@patternfly/react-component-groups/dist/dynamic/ShortcutGrid";
import Shortcut from "@patternfly/react-component-groups/dist/dynamic/Shortcut";
import { FoundationPage, Section, Card, CodeBlock } from "../../components/StoryKit.js";
import { DemoFrame, PropsTable } from "../../components/DemoKit.js";

const meta: Meta = {
  title: "Component groups/Helpers/Shortcut grid",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Shortcut grid"
      intro={
        <>
          A grid of keyboard-shortcut hints — &ldquo;Cmd+K to search&rdquo;,
          &ldquo;G then I for inbox&rdquo;. Use it inside a help panel or
          a &ldquo;Press ? for shortcuts&rdquo; modal so power users can
          discover and learn the keymap.
        </>
      }
    >
      <Section
        title="Default"
        description="ShortcutGrid takes an array of Shortcut props. Each entry renders the keys + a description in a Grid cell."
      >
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame>
              <ShortcutGrid
                shortcuts={[
                  { keys: ["Cmd", "K"], description: "Open quick search" },
                  { keys: ["Cmd", "/"], description: "Toggle the help panel" },
                  { keys: ["G", "I"], description: "Go to inbox" },
                  { keys: ["G", "S"], description: "Go to settings" },
                  { keys: ["?"],     description: "Show this shortcut grid" },
                  { keys: ["Esc"],   description: "Close any open dialog" },
                ]}
              />
            </DemoFrame>
            <CodeBlock>{`<ShortcutGrid
  shortcuts={[
    { keys: ["Cmd", "K"], description: "Open quick search" },
    { keys: ["G", "I"],   description: "Go to inbox" },
    { keys: ["?"],        description: "Show this shortcut grid" },
  ]}
/>`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section
        title="Single Shortcut"
        description="Use Shortcut directly when you just need to render one chord — e.g. inline in a tooltip or alongside a button."
      >
        <Card>
          <div style={{ padding: 24 }}>
            <DemoFrame>
              <Shortcut keys={["Cmd", "Shift", "P"]} description="Open command palette" showSymbols />
            </DemoFrame>
          </div>
        </Card>
      </Section>

      <Section title="Most-used ShortcutGrid props">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "shortcuts", type: "ShortcutProps[]", description: "Required — list of shortcuts to render. Each row becomes one Grid cell." },
                { name: "gridItemProps", type: "GridItemProps", description: "Pass-through to each GridItem (e.g. width, span)." },
                { name: "ouiaId", type: "string | number", description: "Stable test selector." },
              ]}
            />
            <p style={{ marginTop: 16, marginBottom: 0, color: "var(--gp-color-text-subtle)", fontSize: 14 }}>
              Inherits the rest of <code>GridProps</code> — most useful:{" "}
              <code>hasGutter</code>, <code>span</code> overrides per breakpoint.
            </p>
          </div>
        </Card>
      </Section>

      <Section title="Most-used Shortcut props">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "keys", type: "string[]", description: "Required — the keys in order. e.g. ['Cmd', 'K']." },
                { name: "description", type: "ReactNode", description: "Human-readable explanation of what the shortcut does." },
                { name: "showSymbols", type: "boolean", description: "Render glyph forms for modifier keys (⌘, ⇧, ⌥, ⌃) instead of text." },
                { name: "hover / click / rightClick / drag / dragAndDrop", type: "boolean", description: "Show a mouse-action glyph alongside the keys (e.g. for 'Shift + click to multi-select')." },
                { name: "ouiaId", type: "string | number", description: "Stable test selector." },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section title="Accessibility">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Localize key names.</strong> &ldquo;Cmd&rdquo; on macOS, &ldquo;Ctrl&rdquo; on Windows / Linux — detect platform and pass the right key labels.</li>
            <li><strong>Use <code>showSymbols</code> sparingly.</strong> ⌘ ⇧ ⌥ are crisp for power users but opaque to newcomers. Prefer text + symbol together when discoverability matters.</li>
            <li><strong>Show keys consistently.</strong> Always order modifiers first (Cmd before letter). Mixed orderings are confusing.</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
