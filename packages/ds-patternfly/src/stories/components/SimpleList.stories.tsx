import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  SimpleList,
  SimpleListGroup,
  SimpleListItem,
} from "@golden-passport/ds-patternfly";
import { FoundationPage, Section, Card, CodeBlock } from "../_kit/StoryKit.js";
import { DemoFrame, PropsTable } from "../_kit/DemoKit.js";

const meta: Meta = {
  title: "Components/SimpleList",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => {
    const [active, setActive] = useState<number>(0);
    return (
      <FoundationPage
        title="SimpleList"
        intro={
          <>
            A single-select list of items — the lightweight cousin of{" "}
            <code>DataList</code>. Use for in-page navigation lists,
            picker menus inside Drawers / Popovers, and side-rail
            selectors. Built-in keyboard navigation (arrow keys + Enter)
            and aria-selected wiring.
          </>
        }
      >
        <Section
          title="Basic"
          description="Pass SimpleListItem children with isActive on the selected one. PF6 wires the keyboard nav and announces aria-selected automatically."
        >
          <Card>
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <DemoFrame>
                <SimpleList
                  aria-label="Workspace picker"
                  onSelect={(_e, item) => {
                    const idx = Number(
                      (item as { props: { itemId?: number } }).props.itemId,
                    );
                    if (!Number.isNaN(idx)) setActive(idx);
                  }}
                >
                  {["Acme", "Beta Lab", "Globex", "Initech"].map((w, i) => (
                    <SimpleListItem
                      key={w}
                      itemId={i}
                      isActive={active === i}
                    >
                      {w}
                    </SimpleListItem>
                  ))}
                </SimpleList>
              </DemoFrame>
              <CodeBlock>{`const [active, setActive] = useState(0);

<SimpleList
  aria-label="Workspace picker"
  onSelect={(_, item) => setActive(item.props.itemId)}
>
  {workspaces.map((w, i) => (
    <SimpleListItem key={w} itemId={i} isActive={active === i}>
      {w}
    </SimpleListItem>
  ))}
</SimpleList>`}</CodeBlock>
            </div>
          </Card>
        </Section>

        <Section
          title="Grouped"
          description="SimpleListGroup wraps a sub-section with a heading. Useful for picker menus that need section breaks (Recent / All / Archived)."
        >
          <Card>
            <div style={{ padding: 24 }}>
              <DemoFrame>
                <SimpleList aria-label="Grouped pickers">
                  <SimpleListGroup title="Recent" id="recent-group">
                    <SimpleListItem isActive>Acme</SimpleListItem>
                    <SimpleListItem>Beta Lab</SimpleListItem>
                  </SimpleListGroup>
                  <SimpleListGroup title="All workspaces" id="all-group">
                    <SimpleListItem>Globex</SimpleListItem>
                    <SimpleListItem>Initech</SimpleListItem>
                    <SimpleListItem>Massive Dynamic</SimpleListItem>
                  </SimpleListGroup>
                </SimpleList>
              </DemoFrame>
            </div>
          </Card>
        </Section>

        <Section
          title="Links"
          description="Pass component='a' + href to render items as anchors instead of buttons. Use when the list drives navigation (and right-click / middle-click should open in new tab) rather than in-page state."
        >
          <Card>
            <div style={{ padding: 24 }}>
              <DemoFrame>
                <SimpleList aria-label="Documentation links">
                  <SimpleListItem component="a" href="#getting-started">
                    Getting started
                  </SimpleListItem>
                  <SimpleListItem component="a" href="#workflows">
                    Building workflows
                  </SimpleListItem>
                  <SimpleListItem component="a" href="#triggers">
                    Triggers reference
                  </SimpleListItem>
                </SimpleList>
              </DemoFrame>
            </div>
          </Card>
        </Section>

        <Section
          title="Composition"
        >
          <Card>
            <div style={{ padding: 24 }}>
              <PropsTable
                rows={[
                  { name: "SimpleList", type: "container", description: "Outer wrapper. Required aria-label. onSelect fires when any item is picked." },
                  { name: "SimpleListGroup", type: "child", description: "Optional section under a heading. id pairs with the group title for aria-labelledby." },
                  { name: "SimpleListItem", type: "child", description: "A single item. isActive marks selection; component='a' + href turns it into an anchor; itemId is your own identifier returned by onSelect." },
                ]}
              />
            </div>
          </Card>
        </Section>

        <Section title="Most-used props">
          <Card>
            <div style={{ padding: 24 }}>
              <PropsTable
                rows={[
                  { name: "aria-label", type: "string", description: "Required — names the list." },
                  { name: "onSelect", type: "(event, item) => void", description: "Fires when an item is activated. Inspect item.props.itemId / item.props.children to discriminate." },
                  { name: "isControlled", type: "boolean", description: "Set true when you manage isActive yourself; PF6's internal default-active behaviour disables." },
                  { name: "SimpleListItem.itemId", type: "string | number", description: "Identifier returned by onSelect — your own discriminator." },
                  { name: "SimpleListItem.isActive", type: "boolean", description: "Marks the active selection." },
                  { name: "SimpleListItem.component", type: '"button" | "a" | ElementType', description: "Render as button (default — for in-page state) or anchor (for navigation)." },
                  { name: "SimpleListItem.href", type: "string", description: "When component='a', the href." },
                  { name: "SimpleListItem.isDisabled", type: "boolean", description: "Disable a row." },
                ]}
              />
            </div>
          </Card>
        </Section>

        <Section title="When to use">
          <Card>
            <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
              <li><strong>SimpleList</strong> — single-select picker / navigation list. Single line per item, no per-row metadata.</li>
              <li><strong>DataList</strong> — multi-cell rows with optional per-row actions / checkboxes / expansion.</li>
              <li><strong>Nav</strong> — primary app navigation. Has its own active-state styling and drives router changes.</li>
              <li><strong>List</strong> — prose-flow lists in body content. Not interactive.</li>
            </ul>
          </Card>
        </Section>

        <Section title="Accessibility">
          <Card>
            <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
              <li><strong>aria-label is required</strong> — names the list region for screen readers.</li>
              <li><strong>Keyboard:</strong> Tab into the list, arrow keys to navigate, Enter to activate. Focus visibly tracks the highlighted item.</li>
              <li><strong>Use anchors for navigation</strong> (component='a' + href) so right-click / middle-click / keyboard shortcuts work as users expect.</li>
              <li><strong>Group titles get heading semantics via SimpleListGroup.id</strong> — pair with descriptive titles so screen readers can navigate between sections.</li>
            </ul>
          </Card>
        </Section>
      </FoundationPage>
    );
  },
};
