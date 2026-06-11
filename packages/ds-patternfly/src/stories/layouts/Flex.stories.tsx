import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  FoundationPage,
  Section,
  Card,
  ConfigurationSection,
  Example,
} from "../_kit/StoryKit.js";
import {
  BasicRow,
  PushingItemsApart,
  ColumnDirection,
  FillingRemainingSpace,
} from "../../examples/layouts/Flex.example.js";
import flexExampleSrc from "../../examples/layouts/Flex.example.tsx?raw";
import flexComponentSrc from "../../components/base/Flex.tsx?raw";

const meta: Meta = {
  title: "Layouts/Flex",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Flex"
      intro={
        <>
          The general-purpose flex container. Wraps CSS flexbox in a
          token-aware API where spacing, direction, alignment, and
          justification are all set per breakpoint. Use it whenever a layout
          is essentially a row or column of items and none of the more
          specialized layouts (Level, Split, Stack) fit.
        </>
      }
    >
      <Section
        title="Basic row"
        description="Default direction is row, with no gap. Add spaceItems to introduce spacing."
      >
        <Card>
          <Example
            source={flexExampleSrc}
            region="BasicRow"
            fileName="Flex.example.tsx"
          >
            <BasicRow />
          </Example>
        </Card>
      </Section>

      <Section
        title="Pushing items apart"
        description="alignSelf or justifyContent at the container level."
      >
        <Card>
          <Example
            source={flexExampleSrc}
            region="PushingItemsApart"
            fileName="Flex.example.tsx"
          >
            <PushingItemsApart />
          </Example>
        </Card>
      </Section>

      <Section
        title="Column direction"
        description="Switch the main axis to vertical."
      >
        <Card>
          <Example
            source={flexExampleSrc}
            region="ColumnDirection"
            fileName="Flex.example.tsx"
          >
            <ColumnDirection />
          </Example>
        </Card>
      </Section>

      <Section
        title="Filling remaining space"
        description="A FlexItem with grow={{ default: 'grow' }} expands."
      >
        <Card>
          <Example
            source={flexExampleSrc}
            region="FillingRemainingSpace"
            fileName="Flex.example.tsx"
          >
            <FillingRemainingSpace />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example source={flexExampleSrc} fileName="Flex.example.tsx" />
        </Card>
      </Section>

      <ConfigurationSection
        importStatement={'import { Flex, FlexItem } from "@golden-passport/ds-patternfly";'}
        componentSource={flexComponentSrc}
        componentFileName="Flex.tsx"
        rows={[
          {
            name: "spaceItems",
            type: "{ default?, sm?, md?, lg?, xl?, '2xl'? }",
            description: "Per-breakpoint gap between items. Values like spaceItemsSm, spaceItemsMd.",
          },
          {
            name: "spacer",
            type: "Same shape",
            description: "Per-item spacer (margin) — set on a FlexItem to override the container.",
          },
          {
            name: "direction",
            type: "{ default?: 'row' | 'column' | 'rowReverse' | 'columnReverse', ... }",
            description: "Main axis direction, per breakpoint.",
          },
          {
            name: "alignItems",
            type: "{ default?: 'alignItemsCenter' | 'alignItemsFlexStart' | ... }",
            description: "Cross-axis alignment.",
          },
          {
            name: "justifyContent",
            type: "{ default?: 'justifyContentSpaceBetween' | ... }",
            description: "Main-axis distribution.",
          },
          {
            name: "flexWrap",
            type: "{ default?: 'wrap' | 'nowrap' | 'wrapReverse', ... }",
            description: "Allow items to wrap to a new row.",
          },
          {
            name: "gap / rowGap / columnGap",
            type: "Same shape",
            description: "Modern gap-based spacing — overrides spacer/spaceItems on the relevant axis.",
          },
        ]}
      />

      <Section
        title="When to prefer specialized layouts"
        description="Flex is the catch-all. Reach for these when the shape matches:"
      >
        <Card>
          <ul
            style={{
              margin: 0,
              padding: "16px 24px 16px 40px",
              color: "var(--gp-color-text-regular)",
              lineHeight: 1.8,
            }}
          >
            <li><strong>Just a row with space-between?</strong> → <code>Level</code>.</li>
            <li><strong>One item must fill, others stay intrinsic?</strong> → <code>Split</code> (row) or <code>Stack</code> (column).</li>
            <li><strong>Vertical-only flow with consistent gutters?</strong> → <code>Stack</code> with <code>hasGutter</code>.</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
