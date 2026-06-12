import type { Meta, StoryObj } from "@storybook/react-vite";
import { TreeNavigation } from "@golden-passport/ds-patternfly";
import {
  FoundationPage,
  Section,
  Card,
  ConfigurationSection,
  Example,
} from "../_kit/StoryKit.js";
import {
  Selectable,
  WithSearch,
} from "../../examples/ds/TreeNavigation.example.js";
import treeExampleSrc from "../../examples/ds/TreeNavigation.example.tsx?raw";
import treeComponentSrc from "../../components/ds/TreeNavigation.tsx?raw";
import propsData from "./treeNavigation.props.json";

const meta: Meta<typeof TreeNavigation> = {
  title: "Building blocks/Navigation/TreeNavigation",
  component: TreeNavigation,
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="TreeNavigation"
      intro={
        <>
          A controlled hierarchical navigation tree from a nested{" "}
          <code>data</code> array of <code>{`{ id, name, children }`}</code>{" "}
          nodes. Selection is a simple controlled <code>selectedId</code> —
          TreeNavigation maps your nodes to PF's data items and derives the
          active item for you. Use for file trees, nav hierarchies, and
          category pickers.
        </>
      }
    >
      <Section title="Selectable" description="Controlled selection; click a node to select it. hasGuides adds the nested indentation lines.">
        <Card>
          <Example source={treeExampleSrc} region="Selectable" fileName="TreeNavigation.example.tsx">
            <Selectable />
          </Example>
        </Card>
      </Section>

      <Section title="With search" description="hasSearch adds a filter field above the tree.">
        <Card>
          <Example source={treeExampleSrc} region="WithSearch" fileName="TreeNavigation.example.tsx">
            <WithSearch />
          </Example>
        </Card>
      </Section>

      <Section title="Full example" description="The complete example file behind the demos above. The same file ships in the MCP docs catalog.">
        <Card>
          <Example source={treeExampleSrc} fileName="TreeNavigation.example.tsx" />
        </Card>
      </Section>

      <ConfigurationSection
        importStatement={propsData.import}
        rows={propsData.rows}
        componentSource={treeComponentSrc}
        componentFileName="TreeNavigation.tsx"
      />
    </FoundationPage>
  ),
};
