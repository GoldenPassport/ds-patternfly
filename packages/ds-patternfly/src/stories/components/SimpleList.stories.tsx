import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  FoundationPage,
  Section,
  Card,
  ConfigurationSection,
  Example,
} from "../_kit/StoryKit.js";
import { PropsTable } from "../_kit/DemoKit.js";
import {
  Basic,
  Grouped,
  Links,
} from "../../examples/components/SimpleList.example.js";
import simpleListExampleSrc from "../../examples/components/SimpleList.example.tsx?raw";
import simpleListComponentSrc from "../../components/base/SimpleList.tsx?raw";

const meta: Meta = {
  title: "Components/SimpleList",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
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
          <Example
            source={simpleListExampleSrc}
            region="Basic"
            fileName="SimpleList.example.tsx"
          >
            <Basic />
          </Example>
        </Card>
      </Section>

      <Section
        title="Grouped"
        description="SimpleListGroup wraps a sub-section with a heading. Useful for picker menus that need section breaks (Recent / All / Archived)."
      >
        <Card>
          <Example
            source={simpleListExampleSrc}
            region="Grouped"
            fileName="SimpleList.example.tsx"
          >
            <Grouped />
          </Example>
        </Card>
      </Section>

      <Section
        title="Links"
        description="Pass component='a' + href to render items as anchors instead of buttons. Use when the list drives navigation (and right-click / middle-click should open in new tab) rather than in-page state."
      >
        <Card>
          <Example
            source={simpleListExampleSrc}
            region="Links"
            fileName="SimpleList.example.tsx"
          >
            <Links />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example
            source={simpleListExampleSrc}
            fileName="SimpleList.example.tsx"
          />
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

      <ConfigurationSection
        importStatement={'import { SimpleList, SimpleListGroup, SimpleListItem } from "@golden-passport/ds-patternfly";'}
        componentSource={simpleListComponentSrc}
        componentFileName="SimpleList.tsx"
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
  ),
};
