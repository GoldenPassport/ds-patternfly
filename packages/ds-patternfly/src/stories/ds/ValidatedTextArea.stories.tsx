import { useState, type ComponentProps } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ValidatedTextArea, required, minLength, maxLength } from "@golden-passport/ds-patternfly";
import {
  FoundationPage,
  Section,
  Card,
  ConfigurationSection,
  Example,
} from "../_kit/StoryKit.js";
import {
  Basic,
  WithValidation,
} from "../../examples/ds/ValidatedTextArea.example.js";
import validatedTextAreaExampleSrc from "../../examples/ds/ValidatedTextArea.example.tsx?raw";
import validatedTextAreaComponentSrc from "../../components/ds/ValidatedTextArea.tsx?raw";
import propsData from "./validatedTextArea.props.json";

const meta: Meta<typeof ValidatedTextArea> = {
  title: "Building blocks/Forms/ValidatedTextArea",
  component: ValidatedTextArea,
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="ValidatedTextArea"
      intro={
        <>
          The multi-line sibling of <code>ValidatedTextField</code>. Same
          controlled + <code>validators</code> API over a base TextArea: own the{" "}
          <code>value</code>, surface errors on blur (or per{" "}
          <code>validateOn</code>), and the PF <code>validated</code> state +{" "}
          <code>aria-describedby</code> are derived for you.
        </>
      }
    >
      <Section title="Basic" description="A controlled multi-line field with helper text — no validators.">
        <Card>
          <Example source={validatedTextAreaExampleSrc} region="Basic" fileName="ValidatedTextArea.example.tsx">
            <Basic />
          </Example>
        </Card>
      </Section>

      <Section title="With validation" description="Compose validators (required, minLength, maxLength); the first failing one's message shows on blur.">
        <Card>
          <Example source={validatedTextAreaExampleSrc} region="WithValidation" fileName="ValidatedTextArea.example.tsx">
            <WithValidation />
          </Example>
        </Card>
      </Section>

      <Section title="Full example" description="The complete example file behind the demos above. The same file ships in the MCP docs catalog.">
        <Card>
          <Example source={validatedTextAreaExampleSrc} fileName="ValidatedTextArea.example.tsx" />
        </Card>
      </Section>

      <ConfigurationSection
        importStatement={propsData.import}
        rows={propsData.rows}
        componentSource={validatedTextAreaComponentSrc}
        componentFileName="ValidatedTextArea.tsx"
      />
    </FoundationPage>
  ),
};

export const Playground: StoryObj<typeof ValidatedTextArea> = {
  args: {
    label: "Description",
    placeholder: "Describe the item…",
    isRequired: true,
    rows: 4,
    autoResize: false,
    validateOn: "blur",
    isDisabled: false,
    helperText: "Between 10 and 280 characters.",
  },
  argTypes: {
    label: { control: "text" },
    placeholder: { control: "text" },
    helperText: { control: "text" },
    isRequired: { control: "boolean" },
    isDisabled: { control: "boolean" },
    autoResize: { control: "boolean" },
    rows: { control: { type: "number", min: 1, max: 12 } },
    validateOn: { control: "inline-radio", options: ["blur", "change"] },
    value: { control: false },
    onChange: { control: false },
    validators: { control: false },
    fieldId: { control: false },
  },
  render: (args) => <PlaygroundField {...args} />,
};

function PlaygroundField(args: ComponentProps<typeof ValidatedTextArea>) {
  const [value, setValue] = useState("");
  return (
    <ValidatedTextArea
      {...args}
      value={value}
      onChange={setValue}
      validators={[required("A description is required"), minLength(10), maxLength(280)]}
    />
  );
}
