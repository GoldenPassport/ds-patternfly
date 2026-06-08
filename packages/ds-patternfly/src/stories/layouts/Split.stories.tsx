import type { Meta, StoryObj } from "@storybook/react-vite";
import { Split, SplitItem } from "@patternfly/react-core";
import { FoundationPage, Section, Card, CodeBlock } from "../../components/StoryKit.js";
import { Box, DemoFrame, PropsTable } from "./_layoutKit.js";

const meta: Meta = {
  title: "Layouts/Split",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Split"
      intro={
        <>
          A horizontal row where one item fills remaining space and the
          others stay intrinsic. The classic use is a sidebar + content
          area, or a row with a flexible label that expands to push trailing
          icons to the end.
        </>
      }
    >
      <Section
        title="One filled item"
        description="Mark exactly one SplitItem with isFilled."
      >
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame>
              <Split hasGutter>
                <SplitItem><Box label="sidebar" style={{ minWidth: 120 }} /></SplitItem>
                <SplitItem isFilled>
                  <Box label="main content — fills remaining width" />
                </SplitItem>
              </Split>
            </DemoFrame>
            <CodeBlock>{`<Split hasGutter>
  <SplitItem>{sidebar}</SplitItem>
  <SplitItem isFilled>{content}</SplitItem>
</Split>`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section
        title="Filled middle"
        description="Filled item can be in any position."
      >
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame>
              <Split hasGutter>
                <SplitItem><Box label="leading icon" style={{ minWidth: 80 }} /></SplitItem>
                <SplitItem isFilled><Box label="flexible label" /></SplitItem>
                <SplitItem><Box label="action" style={{ minWidth: 80 }} /></SplitItem>
              </Split>
            </DemoFrame>
          </div>
        </Card>
      </Section>

      <Section title="Props">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "hasGutter", type: "boolean", description: "Adds the standard spacer between items." },
                { name: "isWrappable", type: "boolean", description: "Allow items to wrap to a new line on narrow viewports." },
                { name: "component", type: "ElementType", description: <>Override the rendered tag (defaults to <code>div</code>).</> },
              ]}
            />
            <p style={{ marginTop: 16, marginBottom: 0, color: "var(--gp-color-text-subtle)", fontSize: 14 }}>
              SplitItem accepts <code>isFilled</code> to mark the item that fills remaining space. Mark exactly one.
            </p>
          </div>
        </Card>
      </Section>

      <Section
        title="Split vs Flex with grow"
        description="Either works; Split is the clearer expression of intent."
      >
        <Card>
          <div style={{ padding: 24, color: "var(--gp-color-text-regular)" }}>
            <p style={{ margin: 0 }}>
              You can build the same layout with <code>Flex</code> and a
              <code> FlexItem grow=&#123;{`{ default: "grow" }`}&#125;</code>,
              but Split states the intent (&quot;one item fills, others
              don&apos;t&quot;) more directly. Reach for Flex only if you need
              direction/alignment control beyond row + center.
            </p>
          </div>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
