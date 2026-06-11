import type { Meta, StoryObj } from "@storybook/react-vite";
import { ListManager } from "@golden-passport/ds-patternfly";
import {
  FoundationPage,
  Section,
  Card,
  ConfigurationSection,
  Example,
} from "../_kit/StoryKit.js";
import { ManagedTable } from "../../examples/recipes/ListManager.example.js";
import listManagerExampleSrc from "../../examples/recipes/ListManager.example.tsx?raw";
import listManagerComponentSrc from "../../components/ds/ListManager.tsx?raw";
import propsData from "./listManager.props.json";

const meta: Meta<typeof ListManager> = {
  title: "Recipes/ListManager",
  component: ListManager,
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="ListManager"
      intro={
        <>
          The page scaffold for a managed collection — it composes a{" "}
          <code>PageHeader</code>, a toolbar row (<code>FilterToolbar</code> +{" "}
          <code>BulkSelectToolbar</code> on the left, <code>Pagination</code>{" "}
          on the right), the list body, and footer pagination. ListManager
          owns the consistent vertical rhythm and toolbar arrangement; you
          bring the pieces and the data.
        </>
      }
    >
      <Section title="Managed table" description="Header + search/facets + bulk select + pagination over a live, filtered, paginated table — the four recipes working together.">
        <Card>
          <Example source={listManagerExampleSrc} region="ManagedTable" fileName="ListManager.example.tsx">
            <ManagedTable />
          </Example>
        </Card>
      </Section>

      <Section title="Full example" description="The complete example file behind the demo above — every recipe composed end-to-end. The same file ships in the MCP docs catalog.">
        <Card>
          <Example source={listManagerExampleSrc} fileName="ListManager.example.tsx" />
        </Card>
      </Section>

      <ConfigurationSection
        importStatement={propsData.import}
        rows={propsData.rows}
        componentSource={listManagerComponentSrc}
        componentFileName="ListManager.tsx"
      />
    </FoundationPage>
  ),
};
