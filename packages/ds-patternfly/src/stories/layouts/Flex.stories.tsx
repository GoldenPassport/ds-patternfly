import type { Meta, StoryObj } from "@storybook/react-vite";
import { Flex, FlexItem } from "@patternfly/react-core";
import { FoundationPage, Section, Card, CodeBlock } from "../_kit/StoryKit.js";
import { Box, DemoFrame, PropsTable } from "./_layoutKit.js";

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
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame>
              <Flex spaceItems={{ default: "spaceItemsMd" }}>
                <FlexItem><Box label="A" /></FlexItem>
                <FlexItem><Box label="B" /></FlexItem>
                <FlexItem><Box label="C" /></FlexItem>
              </Flex>
            </DemoFrame>
            <CodeBlock>{`<Flex spaceItems={{ default: "spaceItemsMd" }}>
  <FlexItem>A</FlexItem>
  <FlexItem>B</FlexItem>
  <FlexItem>C</FlexItem>
</Flex>`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section
        title="Pushing items apart"
        description="alignSelf or justifyContent at the container level."
      >
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame>
              <Flex
                justifyContent={{ default: "justifyContentSpaceBetween" }}
                alignItems={{ default: "alignItemsCenter" }}
              >
                <FlexItem><Box label="left" /></FlexItem>
                <FlexItem><Box label="center" /></FlexItem>
                <FlexItem><Box label="right" /></FlexItem>
              </Flex>
            </DemoFrame>
            <CodeBlock>{`<Flex
  justifyContent={{ default: "justifyContentSpaceBetween" }}
  alignItems={{ default: "alignItemsCenter" }}
>
  <FlexItem>left</FlexItem>
  <FlexItem>center</FlexItem>
  <FlexItem>right</FlexItem>
</Flex>`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section
        title="Column direction"
        description="Switch the main axis to vertical."
      >
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame>
              <Flex
                direction={{ default: "column" }}
                spaceItems={{ default: "spaceItemsSm" }}
              >
                <FlexItem><Box label="top" /></FlexItem>
                <FlexItem><Box label="middle" /></FlexItem>
                <FlexItem><Box label="bottom" /></FlexItem>
              </Flex>
            </DemoFrame>
            <CodeBlock>{`<Flex direction={{ default: "column" }} spaceItems={{ default: "spaceItemsSm" }}>
  <FlexItem>top</FlexItem>
  <FlexItem>middle</FlexItem>
  <FlexItem>bottom</FlexItem>
</Flex>`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section
        title="Filling remaining space"
        description="A FlexItem with grow={{ default: 'grow' }} expands."
      >
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame>
              <Flex spaceItems={{ default: "spaceItemsMd" }}>
                <FlexItem><Box label="fixed" /></FlexItem>
                <FlexItem grow={{ default: "grow" }}>
                  <Box label="grows to fill" />
                </FlexItem>
                <FlexItem><Box label="fixed" /></FlexItem>
              </Flex>
            </DemoFrame>
          </div>
        </Card>
      </Section>

      <Section title="Key props">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
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
          </div>
        </Card>
      </Section>

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
