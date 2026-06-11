import type { Meta, StoryObj } from "@storybook/react-vite";
import { FoundationPage, Section, Card as DocCard, Example } from "../_kit/StoryKit.js";
import { PropsTable } from "../_kit/DemoKit.js";
import {
  Basic,
  WithDividers,
  WithActions,
  Expandable,
} from "../../examples/component-groups/MultiContentCard.example.js";
import multiContentCardExampleSrc from "../../examples/component-groups/MultiContentCard.example.tsx?raw";

const meta: Meta = {
  title: "Component groups/Content containers/Multi-content card",
  parameters: { layout: "padded" },
};
export default meta;

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
          <Example
            source={multiContentCardExampleSrc}
            region="Basic"
            fileName="MultiContentCard.example.tsx"
          >
            <Basic />
          </Example>
        </DocCard>
      </Section>

      <Section
        title="With dividers"
        description="A richer composition — each child Card uses a header, an icon + brand action line, body copy, and a footer (links or a 'Learn more' action). `withDividers` separates them with a vertical rule; `isExpandable` wraps the row in a titled toggle."
      >
        <DocCard>
          <Example
            source={multiContentCardExampleSrc}
            region="WithDividers"
            fileName="MultiContentCard.example.tsx"
          >
            <WithDividers />
          </Example>
        </DocCard>
      </Section>

      <Section
        title="With actions"
        description="Pass an `actions` slot (a kebab Dropdown) rendered next to the toggle, and use status `Label`s for each card's action line. Use when the grouped card needs its own overflow menu (edit, refresh, remove)."
      >
        <DocCard>
          <Example
            source={multiContentCardExampleSrc}
            region="WithActions"
            fileName="MultiContentCard.example.tsx"
          >
            <WithActions />
          </Example>
        </DocCard>
      </Section>

      <Section
        title="Expandable"
        description="`isExpandable` adds a toggle that reveals the `toggleContent` slot. Use it to keep secondary detail collapsed by default."
      >
        <DocCard>
          <Example
            source={multiContentCardExampleSrc}
            region="Expandable"
            fileName="MultiContentCard.example.tsx"
          >
            <Expandable />
          </Example>
        </DocCard>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <DocCard>
          <Example source={multiContentCardExampleSrc} fileName="MultiContentCard.example.tsx" />
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
