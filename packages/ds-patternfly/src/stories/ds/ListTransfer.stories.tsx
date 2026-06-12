import type { Meta, StoryObj } from "@storybook/react-vite";
import { ListTransfer } from "@golden-passport/ds-patternfly";
import {
  FoundationPage,
  Section,
  Card,
  ConfigurationSection,
  Example,
} from "../_kit/StoryKit.js";
import { Permissions } from "../../examples/ds/ListTransfer.example.js";
import listTransferExampleSrc from "../../examples/ds/ListTransfer.example.tsx?raw";
import listTransferComponentSrc from "../../components/ds/ListTransfer.tsx?raw";
import propsData from "./listTransfer.props.json";

const meta: Meta<typeof ListTransfer> = {
  title: "Building blocks/Forms/ListTransfer",
  component: ListTransfer,
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="ListTransfer"
      intro={
        <>
          The dual list selector — two side-by-side lists with controls for
          moving items between an Available pane and a Chosen pane
          (select-some / move-all, both directions). Controlled by the two
          partitions: ListTransfer owns the transient per-item selection and
          the move logic, and fires <code>onChange</code> with the new
          partition. Use for permissions, column pickers, allow-lists.
        </>
      }
    >
      <Section title="Permissions picker" description="Select rows in either pane and use the controls to move them; the two arrays stay in your state.">
        <Card>
          <Example source={listTransferExampleSrc} region="Permissions" fileName="ListTransfer.example.tsx">
            <Permissions />
          </Example>
        </Card>
      </Section>

      <Section title="Full example" description="The complete example file behind the demo above. The same file ships in the MCP docs catalog.">
        <Card>
          <Example source={listTransferExampleSrc} fileName="ListTransfer.example.tsx" />
        </Card>
      </Section>

      <ConfigurationSection
        importStatement={propsData.import}
        rows={propsData.rows}
        componentSource={listTransferComponentSrc}
        componentFileName="ListTransfer.tsx"
      />
    </FoundationPage>
  ),
};
