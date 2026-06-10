import type { Meta, StoryObj } from "@storybook/react-vite";
import { Stack, StackItem } from "@patternfly/react-core";
import { FoundationPage, Section, Card, CodeBlock } from "../_kit/StoryKit.js";
import { Box, DemoFrame, PropsTable } from "./_layoutKit.js";

const meta: Meta = {
  title: "Layouts/Stack",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Stack"
      intro={
        <>
          The vertical equivalent of Split — children stack top-to-bottom,
          and exactly one item can be marked <code>isFilled</code> to expand
          and consume remaining vertical space. The classic use is a page
          chrome layout: header, scrolling body, footer.
        </>
      }
    >
      <Section
        title="Page chrome"
        description="Header (intrinsic), scrolling body (filled), footer (intrinsic)."
      >
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame height={320}>
              <Stack hasGutter style={{ height: "100%" }}>
                <StackItem><Box label="header" /></StackItem>
                <StackItem isFilled>
                  <div
                    style={{
                      background: "var(--gp-color-bg-primary-default)",
                      border: "1px solid var(--gp-color-border-subtle)",
                      borderRadius: "var(--gp-radius-sm)",
                      padding: 24,
                      height: "100%",
                      color: "var(--gp-color-text-regular)",
                    }}
                  >
                    body — fills remaining height
                  </div>
                </StackItem>
                <StackItem><Box label="footer" /></StackItem>
              </Stack>
            </DemoFrame>
            <CodeBlock>{`<Stack hasGutter style={{ height: "100%" }}>
  <StackItem>{header}</StackItem>
  <StackItem isFilled>{body}</StackItem>
  <StackItem>{footer}</StackItem>
</Stack>`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section
        title="Vertical list with gutters"
        description="Without isFilled, items just stack with gutter spacing."
      >
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame>
              <Stack hasGutter>
                <StackItem><Box label="row 1" /></StackItem>
                <StackItem><Box label="row 2" /></StackItem>
                <StackItem><Box label="row 3" /></StackItem>
              </Stack>
            </DemoFrame>
          </div>
        </Card>
      </Section>

      <Section title="Props">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "hasGutter", type: "boolean", description: "Adds the standard spacer between rows." },
                { name: "component", type: "ElementType", description: <>Override the rendered tag (defaults to <code>div</code>).</> },
              ]}
            />
            <p style={{ marginTop: 16, marginBottom: 0, color: "var(--gp-color-text-subtle)", fontSize: 14 }}>
              StackItem accepts <code>isFilled</code> to mark the item that fills remaining vertical space. Mark exactly one for chrome layouts; omit for plain stacks.
            </p>
          </div>
        </Card>
      </Section>

      <Section
        title="Stack vs Flex column"
        description="Both can stack things vertically; Stack is the clearer choice for page chrome."
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
            <li><strong>Stack</strong> — vertical flow, optional one-item-fills behavior. The right tool for header/body/footer page chrome.</li>
            <li><strong>Flex direction column</strong> — when you need fine-grained alignment/justification or wrap behavior in addition to vertical flow.</li>
            <li><strong>Stack inside a Bullseye</strong> — vertical content centered as a single block (e.g. an empty state with title, description, and CTA stacked).</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
