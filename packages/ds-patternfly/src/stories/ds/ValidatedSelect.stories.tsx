import { useState, type ComponentProps } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ValidatedSelect, required, type SelectChoice } from "@golden-passport/ds-patternfly";
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
} from "../../examples/ds/ValidatedSelect.example.js";
import validatedSelectExampleSrc from "../../examples/ds/ValidatedSelect.example.tsx?raw";
import validatedSelectComponentSrc from "../../components/ds/ValidatedSelect.tsx?raw";
import propsData from "./validatedSelect.props.json";

const PLAYGROUND_OPTIONS: SelectChoice[] = [
  { value: "", label: "Choose a role…", isPlaceholder: true },
  { value: "owner", label: "Owner" },
  { value: "editor", label: "Editor" },
  { value: "viewer", label: "Viewer" },
];

const meta: Meta<typeof ValidatedSelect> = {
  title: "Building blocks/Forms/ValidatedSelect",
  component: ValidatedSelect,
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="ValidatedSelect"
      intro={
        <>
          A labelled, validated single-select built on the base FormSelect.
          Same controlled + <code>validators</code> API as the text fields:
          pass <code>options</code>, own the <code>value</code>, and surface
          errors on blur (or per <code>validateOn</code>). Include a
          placeholder row with value <code>""</code> if you want one.
        </>
      }
    >
      <Section title="Basic" description="A controlled select with a placeholder row and helper text — no validators.">
        <Card>
          <Example source={validatedSelectExampleSrc} region="Basic" fileName="ValidatedSelect.example.tsx">
            <Basic />
          </Example>
        </Card>
      </Section>

      <Section title="With validation" description="A required() validator forces a non-placeholder choice; its message shows on blur.">
        <Card>
          <Example source={validatedSelectExampleSrc} region="WithValidation" fileName="ValidatedSelect.example.tsx">
            <WithValidation />
          </Example>
        </Card>
      </Section>

      <Section title="Full example" description="The complete example file behind the demos above. The same file ships in the MCP docs catalog.">
        <Card>
          <Example source={validatedSelectExampleSrc} fileName="ValidatedSelect.example.tsx" />
        </Card>
      </Section>

      <ConfigurationSection
        importStatement={propsData.import}
        rows={propsData.rows}
        componentSource={validatedSelectComponentSrc}
        componentFileName="ValidatedSelect.tsx"
      />
    </FoundationPage>
  ),
};

export const Playground: StoryObj<typeof ValidatedSelect> = {
  args: {
    label: "Role",
    isRequired: true,
    validateOn: "blur",
    isDisabled: false,
    helperText: "Required.",
  },
  argTypes: {
    label: { control: "text" },
    helperText: { control: "text" },
    isRequired: { control: "boolean" },
    isDisabled: { control: "boolean" },
    validateOn: { control: "inline-radio", options: ["blur", "change"] },
    value: { control: false },
    onChange: { control: false },
    options: { control: false },
    validators: { control: false },
    fieldId: { control: false },
  },
  render: (args) => <PlaygroundField {...args} />,
};

function PlaygroundField(args: ComponentProps<typeof ValidatedSelect>) {
  const [value, setValue] = useState("");
  return (
    <ValidatedSelect
      {...args}
      value={value}
      onChange={setValue}
      options={PLAYGROUND_OPTIONS}
      validators={[required("Pick a role to continue")]}
    />
  );
}
