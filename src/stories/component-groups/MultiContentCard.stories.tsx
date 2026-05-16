import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card, CardBody, CardTitle } from "@patternfly/react-core";
import MultiContentCard from "@patternfly/react-component-groups/dist/dynamic/MultiContentCard";
import { FoundationPage, Section, Card as DocCard, CodeBlock } from "../_storyKit.js";
import { DemoFrame, PropsTable } from "../_demoKit.js";

const meta: Meta = {
  title: "Component groups/Content containers/Multi-content card",
  parameters: { layout: "padded" },
};
export default meta;

const tile = (title: string, body: string) => (
  <Card isPlain>
    <CardTitle>{title}</CardTitle>
    <CardBody>{body}</CardBody>
  </Card>
);

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Multi-content card"
      intro={
        <>
          A card that hosts multiple equally-weighted Card children in a row,
          optionally separated by dividers and toggled via an expandable
          footer. Use it for dashboard summary tiles where 2–4 sub-cards
          belong together (e.g. status / counts / health) without
          introducing a separate Grid.
        </>
      }
    >
      <Section
        title="Basic"
        description="Pass an array of Card elements via the `cards` prop. Each card sits in its own column with consistent gutters."
      >
        <DocCard>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame>
              <MultiContentCard
                cards={[
                  tile("Active", "12 in flight"),
                  tile("Queued", "4 waiting"),
                  tile("Failed", "1 needs review"),
                ]}
              />
            </DemoFrame>
            <CodeBlock>{`<MultiContentCard
  cards={[
    <Card><CardTitle>Active</CardTitle><CardBody>12 in flight</CardBody></Card>,
    <Card><CardTitle>Queued</CardTitle><CardBody>4 waiting</CardBody></Card>,
    <Card><CardTitle>Failed</CardTitle><CardBody>1 needs review</CardBody></Card>,
  ]}
/>`}</CodeBlock>
          </div>
        </DocCard>
      </Section>

      <Section
        title="With dividers"
        description="`withDividers` separates each child card with a vertical rule. Use when the cards represent independent dimensions rather than a continuous narrative."
      >
        <DocCard>
          <div style={{ padding: 24 }}>
            <DemoFrame>
              <MultiContentCard
                withDividers
                cards={[
                  tile("Today", "247 events"),
                  tile("This week", "1,832 events"),
                  tile("This month", "8,104 events"),
                ]}
              />
            </DemoFrame>
          </div>
        </DocCard>
      </Section>

      <Section
        title="Expandable"
        description="`isExpandable` adds a toggle that reveals the `toggleContent` slot. Use it to keep secondary detail collapsed by default."
      >
        <DocCard>
          <div style={{ padding: 24 }}>
            <DemoFrame>
              <MultiContentCard
                isExpandable
                toggleText="Show details"
                toggleContent={
                  <div style={{ padding: 16, color: "var(--gp-color-text-subtle)" }}>
                    Detailed breakdown lives here. Replace with a chart, a
                    table, or whatever the user opens to see.
                  </div>
                }
                cards={[
                  tile("CPU", "62%"),
                  tile("Memory", "41%"),
                  tile("Disk", "78%"),
                ]}
              />
            </DemoFrame>
          </div>
        </DocCard>
      </Section>

      <Section title="Most-used props">
        <DocCard>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "cards", type: "(ReactElement | { content: ReactElement; dividerVariant?: 'left' | 'right' })[]", description: "The child cards. Wrap an entry in `{ content, dividerVariant }` to add a single-side divider." },
                { name: "withDividers", type: "boolean", description: "Add a vertical rule between every child card." },
                { name: "isExpandable", type: "boolean", description: "Render an expand toggle that reveals the `toggleContent` slot." },
                { name: "defaultExpanded", type: "boolean", description: "Open the expandable section by default." },
                { name: "toggleText", type: "ReactNode", description: "Label for the expand toggle." },
                { name: "toggleContent", type: "ReactElement", description: "Content rendered inside the expandable section." },
                { name: "actions", type: "ReactElement", description: "Actions row rendered alongside the toggle (kebab menu, primary button)." },
                { name: "isToggleRightAligned", type: "boolean", description: "Pin the toggle to the trailing edge instead of the leading edge." },
                { name: "ouiaId", type: "string | number", description: "Stable test selector." },
              ]}
            />
          </div>
        </DocCard>
      </Section>
    </FoundationPage>
  ),
};
