import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  FoundationPage,
  Section,
  Card,
  ConfigurationSection,
  Example,
} from "../_kit/StoryKit.js";
import {
  Basic as BasicDemo,
  Grouped,
  VerticalIconList,
} from "../../examples/components/ActionList.example.js";
import actionListExampleSrc from "../../examples/components/ActionList.example.tsx?raw";
import actionListComponentSrc from "../../components/ActionList.tsx?raw";

const meta: Meta = {
  title: "Components/ActionList",
  parameters: { layout: "padded" },
};
export default meta;

// ──────────────────────────────────────────────────────────────────
// Story: Basic — horizontal action row (form footers, modal footers)
// ──────────────────────────────────────────────────────────────────

export const Basic: StoryObj = {
  render: () => (
    <FoundationPage
      title="ActionList"
      intro={
        <>
          A spacing/layout primitive for groups of action buttons.{" "}
          <code>ActionList</code> handles the gap; you supply{" "}
          <code>ActionListItem</code>s containing real{" "}
          <code>Button</code>s. Use <code>ActionListGroup</code> to
          cluster related actions with extra space between groups.
          Most-used flags: <code>isVertical</code> (stack
          top-to-bottom — used inside Compass sidebars),{" "}
          <code>isIconList</code> (tighter spacing for icon-only
          buttons).
        </>
      }
    >
      <Section
        title="Basic horizontal action row"
        description="The default — a horizontal flex of items. Drop into a modal/form footer."
      >
        <Card>
          <Example
            source={actionListExampleSrc}
            region="Basic"
            fileName="ActionList.example.tsx"
          >
            <BasicDemo />
          </Example>
        </Card>
      </Section>

      <Section
        title="Grouped — primary + secondary clusters"
        description="ActionListGroup adds a wider gap between groups, signalling that the actions belong to different tasks."
      >
        <Card>
          <Example
            source={actionListExampleSrc}
            region="Grouped"
            fileName="ActionList.example.tsx"
          >
            <Grouped />
          </Example>
        </Card>
      </Section>

      <Section
        title="Vertical icon list — Compass sidebar shape"
        description="isVertical stacks the items top-to-bottom; isIconList tightens spacing and centres icon-only Buttons. This is the exact shape used in the Compass pattern's sidebars."
      >
        <Card>
          <Example
            source={actionListExampleSrc}
            region="VerticalIconList"
            fileName="ActionList.example.tsx"
          >
            <VerticalIconList />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example source={actionListExampleSrc} fileName="ActionList.example.tsx" />
        </Card>
      </Section>

      <ConfigurationSection
        importStatement={'import { ActionList, ActionListGroup, ActionListItem } from "@golden-passport/ds-patternfly";'}
        componentSource={actionListComponentSrc}
        componentFileName="ActionList.tsx"
        rows={[
          {
            name: "isVertical",
            type: "boolean",
            description:
              "Stack items top-to-bottom. Used for icon rails inside Compass sidebars.",
          },
          {
            name: "isIconList",
            type: "boolean",
            description:
              "Tighter gap and centred items, intended for icon-only Buttons.",
          },
          {
            name: "children",
            type: "ActionListItem | ActionListGroup",
            description:
              "Wrap each child Button in ActionListItem. Cluster related items in ActionListGroup for extra inter-group gap.",
          },
        ]}
      />

      <Section title="When to use ActionList vs Toolbar vs Flex">
        <Card>
          <ul
            style={{
              margin: 0,
              padding: "16px 24px 16px 40px",
              color: "var(--gp-color-text-regular)",
              lineHeight: 1.8,
            }}
          >
            <li>
              <strong>ActionList</strong> — small clusters of buttons
              with a clear single task: form footer, modal footer,
              sidebar rail. PF6 owns the gap token.
            </li>
            <li>
              <strong>Toolbar</strong> — page chrome with filters,
              search, pagination. Has slots for groups, item
              alignment, and overflow.
            </li>
            <li>
              <strong>Flex</strong> — bespoke arrangements that don&apos;t
              fit either pattern. You own the spacing.
            </li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
