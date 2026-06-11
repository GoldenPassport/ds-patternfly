import type { Meta, StoryObj } from "@storybook/react-vite";
import { ConfirmModal } from "@golden-passport/ds-patternfly";
import {
  FoundationPage,
  Section,
  Card,
  ConfigurationSection,
  Example,
} from "../_kit/StoryKit.js";
import { Confirm, DangerConfirm } from "../../examples/ds/ConfirmModal.example.js";
import confirmModalExampleSrc from "../../examples/ds/ConfirmModal.example.tsx?raw";
import confirmModalComponentSrc from "../../components/ds/ConfirmModal.tsx?raw";
import propsData from "./confirmModal.props.json";

const meta: Meta<typeof ConfirmModal> = {
  title: "Building blocks/Feedback/ConfirmModal",
  component: ConfirmModal,
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="ConfirmModal"
      intro={
        <>
          A small controlled confirmation dialog: title, body, and a confirm /
          cancel footer. You own <code>isOpen</code> — wire it to a trigger.
          Set <code>variant="danger"</code> for destructive actions, which
          turns the confirm button red.
        </>
      }
    >
      <Section
        title="Confirm"
        description="The default primary confirmation — press the button to open the dialog."
      >
        <Card>
          <Example
            source={confirmModalExampleSrc}
            region="Confirm"
            fileName="ConfirmModal.example.tsx"
          >
            <Confirm />
          </Example>
        </Card>
      </Section>

      <Section
        title="Danger confirm"
        description="variant='danger' for destructive actions — the confirm button turns red."
      >
        <Card>
          <Example
            source={confirmModalExampleSrc}
            region="DangerConfirm"
            fileName="ConfirmModal.example.tsx"
          >
            <DangerConfirm />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example source={confirmModalExampleSrc} fileName="ConfirmModal.example.tsx" />
        </Card>
      </Section>

      <ConfigurationSection
        importStatement={propsData.import}
        rows={propsData.rows}
        componentSource={confirmModalComponentSrc}
        componentFileName="ConfirmModal.tsx"
      />
    </FoundationPage>
  ),
};
