import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  FoundationPage,
  Section,
  Card,
  ConfigurationSection,
  Example,
  ThemingPointer,
} from "../../_kit/StoryKit.js";
import { PropsTable } from "../../_kit/DemoKit.js";
import { Anatomy } from "../../../examples/components/Forms/Form.example.js";
import formExampleSrc from "../../../examples/components/Forms/Form.example.tsx?raw";
import formComponentSrc from "../../../components/base/Form.tsx?raw";

const meta: Meta = {
  title: "Components/Forms/Form",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
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
          <Example
            source={formExampleSrc}
            region="Anatomy"
            fileName="Form.example.tsx"
          >
            <Anatomy />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example source={formExampleSrc} fileName="Form.example.tsx" />
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

      <ConfigurationSection
        importStatement={'import { Form, FormGroup, FormSection, FormHelperText, FormAlert, ActionGroup } from "@golden-passport/ds-patternfly";'}
        componentSource={formComponentSrc}
        componentFileName="Form.tsx"
        rows={[
          { name: "isHorizontal", type: "boolean", description: "Switch from stacked (label on top) to horizontal (label on the left). Use horizontal for dense settings forms." },
          { name: "maxWidth", type: "string", description: 'Cap on form width — readability gets bad past 720px. Default unset; set explicitly for long forms (e.g. "640px").' },
          { name: "onSubmit", type: "(event) => void", description: "The submit handler. Always call event.preventDefault() to keep the browser from reloading." },
        ]}
      />

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
  ),
};
