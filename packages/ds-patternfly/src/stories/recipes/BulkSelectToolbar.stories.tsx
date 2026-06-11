import type { Meta, StoryObj } from "@storybook/react-vite";
import { BulkSelectToolbar } from "@golden-passport/ds-patternfly";
import {
  FoundationPage,
  Section,
  Card,
  ConfigurationSection,
  Example,
} from "../_kit/StoryKit.js";
import { FullPattern } from "../../examples/recipes/BulkSelectToolbar.example.js";
import bulkExampleSrc from "../../examples/recipes/BulkSelectToolbar.example.tsx?raw";
import bulkComponentSrc from "../../components/ds/BulkSelectToolbar.tsx?raw";
import propsData from "./bulkSelectToolbar.props.json";

const meta: Meta<typeof BulkSelectToolbar> = {
  title: "Recipes/BulkSelectToolbar",
  component: BulkSelectToolbar,
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="BulkSelectToolbar"
      intro={
        <>
          The "select many, act on many" toolbar — a split checkbox +
          dropdown (select all / page / none), a derived "{`{n}`} selected"
          status, and bulk actions that appear once a selection exists. Fully
          controlled: you own the selection and pass counts + handlers; the
          split checkbox reflects page-selected and partial state.
        </>
      }
    >
      <Section title="Bulk select + actions" description="Toggle rows or use the split control; the action buttons appear once something is selected.">
        <Card>
          <Example source={bulkExampleSrc} region="FullPattern" fileName="BulkSelectToolbar.example.tsx">
            <FullPattern />
          </Example>
        </Card>
      </Section>

      <Section title="Full example" description="The complete example file behind the demo above. The same file ships in the MCP docs catalog.">
        <Card>
          <Example source={bulkExampleSrc} fileName="BulkSelectToolbar.example.tsx" />
        </Card>
      </Section>

      <ConfigurationSection
        importStatement={propsData.import}
        rows={propsData.rows}
        componentSource={bulkComponentSrc}
        componentFileName="BulkSelectToolbar.tsx"
      />
    </FoundationPage>
  ),
};
