import type { Meta, StoryObj } from "@storybook/react-vite";
import { EmptyStatePanel } from "@golden-passport/ds-patternfly";
import {
  FoundationPage,
  Section,
  Card,
  ConfigurationSection,
  Example,
} from "../_kit/StoryKit.js";
import { FirstRun, NoResults } from "../../examples/ds/EmptyStatePanel.example.js";
import emptyExampleSrc from "../../examples/ds/EmptyStatePanel.example.tsx?raw";
import emptyComponentSrc from "../../components/ds/EmptyStatePanel.tsx?raw";
import propsData from "./emptyStatePanel.props.json";

const meta: Meta<typeof EmptyStatePanel> = {
  title: "Building blocks/Feedback/EmptyStatePanel",
  component: EmptyStatePanel,
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="EmptyStatePanel"
      intro={
        <>
          The "nothing here yet" panel — an icon, a title, optional body, and
          a primary call-to-action that gets the user started (plus optional
          secondary actions). The dedicated empty-state lego block; it's{" "}
          <code>StatusPanel</code>'s <code>empty</code> variant under a
          self-describing name. For error / unauthorized / maintenance states,
          use <code>StatusPanel</code> directly. Drop it into the{" "}
          <code>emptyState</code> slot of <code>DataTable</code>,{" "}
          <code>CardGrid</code>, or <code>ListView</code>.
        </>
      }
    >
      <Section title="First run" description="An empty collection with a clear primary action to create the first item.">
        <Card>
          <Example source={emptyExampleSrc} region="FirstRun" fileName="EmptyStatePanel.example.tsx">
            <FirstRun />
          </Example>
        </Card>
      </Section>

      <Section title="No results" description="A search/filter miss — swap the icon (SearchIcon), shrink it, and offer to clear filters.">
        <Card>
          <Example source={emptyExampleSrc} region="NoResults" fileName="EmptyStatePanel.example.tsx">
            <NoResults />
          </Example>
        </Card>
      </Section>

      <Section title="Full example" description="The complete example file behind the demos above. The same file ships in the MCP docs catalog.">
        <Card>
          <Example source={emptyExampleSrc} fileName="EmptyStatePanel.example.tsx" />
        </Card>
      </Section>

      <ConfigurationSection
        importStatement={propsData.import}
        rows={propsData.rows}
        componentSource={emptyComponentSrc}
        componentFileName="EmptyStatePanel.tsx"
      />
    </FoundationPage>
  ),
};
