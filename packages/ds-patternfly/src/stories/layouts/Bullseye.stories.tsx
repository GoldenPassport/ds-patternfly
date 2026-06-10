import type { Meta, StoryObj } from "@storybook/react-vite";
import { Bullseye } from "@golden-passport/ds-patternfly";
import { FoundationPage, Section, Card, CodeBlock } from "../_kit/StoryKit.js";
import { Box, DemoFrame, PropsTable } from "./_layoutKit.js";

const meta: Meta = {
  title: "Layouts/Bullseye",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Bullseye"
      intro={
        <>
          Centers a single child both vertically and horizontally within its
          parent. The most common use case is empty states, loading
          spinners, and error screens where there&apos;s exactly one block of
          content and it should sit dead center of whatever space is
          available.
        </>
      }
    >
      <Section title="Live demo">
        <Card>
          <div style={{ padding: 24 }}>
            <DemoFrame height={240}>
              <Bullseye>
                <Box label="centered" style={{ minWidth: 160 }} />
              </Bullseye>
            </DemoFrame>
          </div>
        </Card>
      </Section>

      <Section title="Code">
        <Card>
          <div style={{ padding: 24 }}>
            <CodeBlock>{`import { Bullseye } from "@golden-passport/ds-patternfly";

<Bullseye>
  <EmptyState>...</EmptyState>
</Bullseye>`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section title="Props">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                {
                  name: "children",
                  type: "ReactNode",
                  description: "The single element to center. Bullseye is intentionally one-child shaped.",
                },
                {
                  name: "component",
                  type: "ElementType",
                  description: <>Override the rendered tag (defaults to <code>div</code>).</>,
                },
                {
                  name: "className",
                  type: "string",
                  description: "Additional classes — rarely needed.",
                },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section
        title="When to use it"
        description="The decision is usually one-line."
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
            <li><strong>Empty states</strong> — &quot;No tasks yet&quot; with an action button.</li>
            <li><strong>Loading spinners</strong> — full-pane loading states.</li>
            <li><strong>Error screens</strong> — 404 / permission-denied messages.</li>
            <li><strong>Modals and dialogs</strong> — when the dialog content needs to be centered within the backdrop.</li>
            <li><strong>Not for general centering of headers or rows</strong> — use Level or Flex with align/justify props.</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
