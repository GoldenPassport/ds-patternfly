import type { Meta, StoryObj } from "@storybook/react-vite";
import { Level, LevelItem } from "@patternfly/react-core";
import { FoundationPage, Section, Card, CodeBlock } from "../../components/StoryKit.js";
import { Box, DemoFrame, PropsTable } from "./_layoutKit.js";

const meta: Meta = {
  title: "Layouts/Level",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Level"
      intro={
        <>
          A single horizontal row that distributes its children with{" "}
          <code>justify-content: space-between</code>. Use it for headers,
          footers, and any row where one or two items sit at the edges with
          space (or other items) between them.
        </>
      }
    >
      <Section
        title="Two ends"
        description="The most common pattern: title on the left, actions on the right."
      >
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame>
              <Level>
                <LevelItem>
                  <strong style={{ fontSize: 18 }}>Tasks</strong>
                </LevelItem>
                <LevelItem>
                  <Box label="Create task" />
                </LevelItem>
              </Level>
            </DemoFrame>
            <CodeBlock>{`<Level>
  <LevelItem><Title>Tasks</Title></LevelItem>
  <LevelItem><Button>Create task</Button></LevelItem>
</Level>`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section
        title="Three+ items"
        description="Items distribute evenly across the row."
      >
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame>
              <Level>
                <LevelItem><Box label="left" /></LevelItem>
                <LevelItem><Box label="middle" /></LevelItem>
                <LevelItem><Box label="right" /></LevelItem>
              </Level>
            </DemoFrame>
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
                  type: "ReactNode (LevelItem children)",
                  description: "Wrap each top-level item in <LevelItem> for correct spacing.",
                },
                {
                  name: "className",
                  type: "string",
                  description: "Additional classes — rarely needed.",
                },
              ]}
            />
            <p style={{ marginTop: 16, marginBottom: 0, color: "var(--gp-color-text-subtle)", fontSize: 14 }}>
              Level intentionally has a tiny prop surface — alignment is fixed, the only knob you turn is the children.
            </p>
          </div>
        </Card>
      </Section>

      <Section
        title="Level vs Flex vs Split"
        description="They look similar; here's how they differ."
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
            <li><strong>Level</strong> — fixed <code>space-between</code>, no other knobs. The right tool for a header bar.</li>
            <li><strong>Split</strong> — one item fills, the rest stay intrinsic. Right for sidebar + content rows.</li>
            <li><strong>Flex</strong> — full alignment/justification/direction control. Right when neither of the above fits.</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
