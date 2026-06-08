import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  ActionGroup,
  Button,
  Form,
  FormGroup,
  FormHelperText,
  FormSection,
  HelperText,
  HelperTextItem,
  TextInput,
} from "@patternfly/react-core";
import { FoundationPage, Section, Card, CodeBlock, ThemingPointer } from "../../_storyKit.js";
import { DemoFrame, PropsTable } from "../../../components/DemoKit.js";

const meta: Meta = {
  title: "Components/Forms/Form",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => {
    const [name, setName] = useState("");
    return (
      <FoundationPage
        title="Form"
        intro={
          <>
            The container that organizes form fields with consistent spacing,
            label/helper-text positioning, and submit-button alignment.
            Compose with <code>FormGroup</code>, <code>FormSection</code>,
            <code>FormHelperText</code>, and <code>ActionGroup</code> rather
            than building any of those from scratch.
          </>
        }
      >
        <Section title="Anatomy">
          <Card>
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <DemoFrame>
                <Form
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <FormSection title="Profile">
                    <FormGroup label="Full name" isRequired fieldId="name">
                      <TextInput
                        id="name"
                        value={name}
                        onChange={(_, v) => setName(v)}
                        aria-describedby="name-helper"
                      />
                      <FormHelperText>
                        <HelperText id="name-helper">
                          <HelperTextItem>Visible on your profile.</HelperTextItem>
                        </HelperText>
                      </FormHelperText>
                    </FormGroup>
                  </FormSection>
                  <ActionGroup>
                    <Button type="submit" variant="primary">Save</Button>
                    <Button variant="link">Cancel</Button>
                  </ActionGroup>
                </Form>
              </DemoFrame>
              <CodeBlock>{`<Form onSubmit={handleSubmit}>
  <FormSection title="Profile">
    <FormGroup label="Full name" isRequired fieldId="name">
      <TextInput id="name" value={name} onChange={(_, v) => setName(v)}
        aria-describedby="name-helper" />
      <FormHelperText>
        <HelperText id="name-helper">
          <HelperTextItem>Visible on your profile.</HelperTextItem>
        </HelperText>
      </FormHelperText>
    </FormGroup>
  </FormSection>
  <ActionGroup>
    <Button type="submit" variant="primary">Save</Button>
    <Button variant="link">Cancel</Button>
  </ActionGroup>
</Form>`}</CodeBlock>
            </div>
          </Card>
        </Section>

        <Section title="Composition pieces">
          <Card>
            <div style={{ padding: 24 }}>
              <PropsTable
                rows={[
                  { name: "Form", type: "container", description: "Outer <form> wrapper. Apply onSubmit here, not on individual buttons." },
                  { name: "FormSection", type: "child", description: "Group related FormGroups under an optional title for long forms." },
                  { name: "FormGroup", type: "child", description: "One field. Owns label, isRequired indicator, and validated state." },
                  { name: "FormHelperText", type: "child", description: "Wrapper for HelperText placed inside a FormGroup. Pass aria-describedby on the input to wire it up." },
                  { name: "FormAlert", type: "child", description: "Top-of-form alert area for cross-field errors (e.g. 'Could not save')." },
                  { name: "ActionGroup", type: "child", description: "Footer for submit/cancel buttons. Aligns and spaces them correctly." },
                ]}
              />
            </div>
          </Card>
        </Section>

        <Section title="Form props">
          <Card>
            <div style={{ padding: 24 }}>
              <PropsTable
                rows={[
                  { name: "isHorizontal", type: "boolean", description: "Switch from stacked (label on top) to horizontal (label on the left). Use horizontal for dense settings forms." },
                  { name: "maxWidth", type: "string", description: 'Cap on form width — readability gets bad past 720px. Default unset; set explicitly for long forms (e.g. "640px").' },
                  { name: "onSubmit", type: "(event) => void", description: "The submit handler. Always call event.preventDefault() to keep the browser from reloading." },
                ]}
              />
            </div>
          </Card>
        </Section>

        <Section title="Accessibility">
          <Card>
            <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
              <li><strong>One <code>&lt;form&gt;</code> per logical action.</strong> Don&apos;t nest forms — browsers allow only one and silently drop the inner one.</li>
              <li><strong>Submit on Enter inside a single TextInput is normal.</strong> If a form has multiple TextInputs and you don&apos;t want Enter to submit, set <code>type=&quot;button&quot;</code> on every Button — Form&apos;s default Button type is &quot;submit&quot;.</li>
              <li><strong>Always wire aria-describedby.</strong> Without it, screen readers announce the input&apos;s label but skip the helper text.</li>
              <li><strong>Use FormAlert for cross-field errors</strong> (e.g. &quot;Email and password don&apos;t match&quot;), not for per-field validation — that lives in FormGroup&apos;s validated prop.</li>
            </ul>
          </Card>
        </Section>

        <ThemingPointer
          dials={[
            ["--gp-control-pad-y", "Vertical padding inside every form-control / menu-toggle / control button. Default 0.375rem → 36px field."],
            ["--gp-radius-control", "Corner radius on inputs, selects, buttons."],
            ["--gp-gap-form", "Vertical rhythm between FormGroup children."],
            ["--gp-gap-label", "Gap between a label and its input."],
          ]}
        />

      </FoundationPage>
    );
  },
};
