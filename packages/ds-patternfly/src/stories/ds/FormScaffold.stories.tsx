import type { Meta, StoryObj } from "@storybook/react-vite";
import { FormScaffold } from "@golden-passport/ds-patternfly";
import {
  FoundationPage,
  Section,
  Card,
  ConfigurationSection,
  Example,
} from "../_kit/StoryKit.js";
import { BasicForm } from "../../examples/ds/FormScaffold.example.js";
import formScaffoldExampleSrc from "../../examples/ds/FormScaffold.example.tsx?raw";
import formScaffoldComponentSrc from "../../components/ds/FormScaffold.tsx?raw";
import propsData from "./formScaffold.props.json";

const meta: Meta<typeof FormScaffold> = {
  title: "Building blocks/Forms/FormScaffold",
  component: FormScaffold,
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="FormScaffold"
      intro={
        <>
          The standard form frame: drop your fields in as <code>children</code>,
          and FormScaffold supplies the branded submit / cancel ActionGroup. It
          prevents the native submit and wires a disabled-submit guard, so you
          focus on the fields — typically the <code>Validated*</code> lego
          blocks.
        </>
      }
    >
      <Section
        title="Basic form"
        description="Compose ValidatedTextField fields as children; pass onSubmit, onCancel, and isSubmitDisabled. Submit stays disabled until the fields are valid."
      >
        <Card>
          <Example
            source={formScaffoldExampleSrc}
            region="BasicForm"
            fileName="FormScaffold.example.tsx"
          >
            <BasicForm />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demo above. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example source={formScaffoldExampleSrc} fileName="FormScaffold.example.tsx" />
        </Card>
      </Section>

      <ConfigurationSection
        importStatement={propsData.import}
        rows={propsData.rows}
        componentSource={formScaffoldComponentSrc}
        componentFileName="FormScaffold.tsx"
      />
    </FoundationPage>
  ),
};
