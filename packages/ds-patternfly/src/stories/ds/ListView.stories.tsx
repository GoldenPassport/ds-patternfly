import type { Meta, StoryObj } from "@storybook/react-vite";
import { ListView } from "@golden-passport/ds-patternfly";
import {
  FoundationPage,
  Section,
  Card,
  ConfigurationSection,
  Example,
} from "../_kit/StoryKit.js";
import { Selectable, Empty } from "../../examples/ds/ListView.example.js";
import listViewExampleSrc from "../../examples/ds/ListView.example.tsx?raw";
import listViewComponentSrc from "../../components/ds/ListView.tsx?raw";
import propsData from "./listView.props.json";

const meta: Meta<typeof ListView> = {
  title: "Building blocks/Data/ListView",
  component: ListView,
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="ListView"
      intro={
        <>
          A selectable list of rows from an <code>items</code> array — each
          with a title, optional description, extra content, and per-row
          actions. Wraps the base DataList with single-select wiring and an
          empty-state slot. The richer sibling of the base SimpleList
          (multi-cell rows + actions).
        </>
      }
    >
      <Section title="Selectable rows" description="Controlled selectedId + onSelect; rows carry a status label and a Run action.">
        <Card>
          <Example source={listViewExampleSrc} region="Selectable" fileName="ListView.example.tsx">
            <Selectable />
          </Example>
        </Card>
      </Section>

      <Section title="Empty state" description="Pass an emptyState (e.g. a StatusPanel) shown when items is empty.">
        <Card>
          <Example source={listViewExampleSrc} region="Empty" fileName="ListView.example.tsx">
            <Empty />
          </Example>
        </Card>
      </Section>

      <Section title="Full example" description="The complete example file behind the demos above. The same file ships in the MCP docs catalog.">
        <Card>
          <Example source={listViewExampleSrc} fileName="ListView.example.tsx" />
        </Card>
      </Section>

      <ConfigurationSection
        importStatement={propsData.import}
        rows={propsData.rows}
        componentSource={listViewComponentSrc}
        componentFileName="ListView.tsx"
      />
    </FoundationPage>
  ),
};
