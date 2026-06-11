import { useState, type ComponentProps } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ValidatedTextField, required, minLength } from "@golden-passport/ds-patternfly";
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
} from "../../examples/ds/ValidatedTextField.example.js";
import validatedTextFieldExampleSrc from "../../examples/ds/ValidatedTextField.example.tsx?raw";
import validatedTextFieldComponentSrc from "../../components/ds/ValidatedTextField.tsx?raw";
import propsData from "./validatedTextField.props.json";

const meta: Meta<typeof ValidatedTextField> = {
  title: "Building blocks/Forms/ValidatedTextField",
  component: ValidatedTextField,
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="ValidatedTextField"
      intro={
        <>
          A labelled, validated single-line text field. Fully controlled — you
          own the <code>value</code> and update it from <code>onChange</code> —
          with composable <code>validators</code> (required, minLength, email,
          …). Errors surface on blur by default; the PF <code>validated</code>{" "}
          state, the error/helper message, and <code>aria-describedby</code> are
          all derived for you.
        </>
      }
    >
      <Section title="Basic" description="A controlled field with helper text and a placeholder — no validators.">
        <Card>
          <Example source={validatedTextFieldExampleSrc} region="Basic" fileName="ValidatedTextField.example.tsx">
            <Basic />
          </Example>
        </Card>
      </Section>

      <Section title="With validation" description="Compose validators; the first failing one's message shows on blur. Required pairs the visual asterisk with a required() validator.">
        <Card>
          <Example source={validatedTextFieldExampleSrc} region="WithValidation" fileName="ValidatedTextField.example.tsx">
            <WithValidation />
          </Example>
        </Card>
      </Section>

      <Section title="Full example" description="The complete example file behind the demos above. The same file ships in the MCP docs catalog.">
        <Card>
          <Example source={validatedTextFieldExampleSrc} fileName="ValidatedTextField.example.tsx" />
        </Card>
      </Section>

      <ConfigurationSection
        importStatement={propsData.import}
        rows={propsData.rows}
        componentSource={validatedTextFieldComponentSrc}
        componentFileName="ValidatedTextField.tsx"
      />
    </FoundationPage>
  ),
};

export const Playground: StoryObj<typeof ValidatedTextField> = {
  args: {
    label: "Username",
    placeholder: "e.g. ada",
    isRequired: true,
    type: "text",
    validateOn: "blur",
    isDisabled: false,
    helperText: "At least 3 characters.",
  },
  argTypes: {
    label: { control: "text" },
    placeholder: { control: "text" },
    helperText: { control: "text" },
    isRequired: { control: "boolean" },
    isDisabled: { control: "boolean" },
    type: { control: "select", options: ["text", "email", "password", "tel", "url", "number"] },
    validateOn: { control: "inline-radio", options: ["blur", "change"] },
    value: { control: false },
    onChange: { control: false },
    validators: { control: false },
    fieldId: { control: false },
  },
  render: (args) => <PlaygroundField {...args} />,
};

function PlaygroundField(args: ComponentProps<typeof ValidatedTextField>) {
  const [value, setValue] = useState("");
  return (
    <ValidatedTextField
      {...args}
      value={value}
      onChange={setValue}
      validators={[required("Username is required"), minLength(3)]}
    />
  );
}
