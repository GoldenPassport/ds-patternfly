import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  FoundationPage,
  Section,
  Card,
  ConfigurationSection,
  Example,
  ThemingPointer,
} from "../../_kit/StoryKit.js";
import {
  Basic,
  Elevated,
  ValidatedStates,
} from "../../../examples/components/Forms/TextInput.example.js";
import textInputExampleSrc from "../../../examples/components/Forms/TextInput.example.tsx?raw";
import textInputComponentSrc from "../../../components/base/TextInput.tsx?raw";

const meta: Meta = {
  title: "Components/Forms/TextInput",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="TextInput"
      intro={
        <>
          Single-line text input. The most common form field — wrap in a
          FormGroup to get the label, helper text, and validation
          indicator wired up correctly.
        </>
      }
    >
      <Section title="Basic">
        <Card>
          <Example
            source={textInputExampleSrc}
            region="Basic"
            fileName="TextInput.example.tsx"
          >
            <Basic />
          </Example>
        </Card>
      </Section>

      <Section
        title="Elevated"
        description='Inputs default to a transparent background — they adopt whatever container they sit on. For inputs that should read as elevated above the page (hero search, standalone create form, spotlight surface), opt in with the gp-is-elevated class.'
      >
        <Card>
          <Example
            source={textInputExampleSrc}
            region="Elevated"
            fileName="TextInput.example.tsx"
          >
            <Elevated />
          </Example>
          <p style={{ margin: "0 16px 16px", color: "var(--gp-color-text-subtle)", fontSize: 14 }}>
            Surface resolves via <code>--gp-color-bg-elevated</code>:
            white in light mode (lift from cream page), gray-800 in
            dark mode (lift from gray-900 page).
          </p>
        </Card>
      </Section>

      <Section title="Validated states">
        <Card>
          <Example
            source={textInputExampleSrc}
            region="ValidatedStates"
            fileName="TextInput.example.tsx"
          >
            <ValidatedStates />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example source={textInputExampleSrc} fileName="TextInput.example.tsx" />
        </Card>
      </Section>

      <ConfigurationSection
        importStatement={'import { TextInput } from "@golden-passport/ds-patternfly";'}
        componentSource={textInputComponentSrc}
        componentFileName="TextInput.tsx"
        rows={[
          { name: "id", type: "string", description: "Required. Wired to the FormGroup label via fieldId." },
          { name: "value", type: "string", description: "Controlled value. Pair with onChange." },
          { name: "onChange", type: "(event, value: string) => void", description: "Note the argument order — event first, then string value." },
          { name: "type", type: '"text" | "email" | "url" | "password" | "tel" | "number" | "search" | "date" | "time" | "datetime-local"', description: 'Native HTML input type. Use "email" / "url" / "tel" for the right mobile keyboard.' },
          { name: "validated", type: '"default" | "success" | "warning" | "error"', description: "Visual state. Pair with HelperText variant for matching helper text color and icon." },
          { name: "isDisabled", type: "boolean", description: "Removes from tab order." },
          { name: "isReadOnly", type: "boolean", description: "Stays focusable but the value can't change. Use for fields shown for reference but not editable now." },
          { name: "placeholder", type: "string", description: "Hint text. Never substitute for a label — placeholder disappears as soon as the user types." },
        ]}
      />

      <Section title="Accessibility">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Always wrap in FormGroup.</strong> FormGroup handles label, isRequired indicator, error state, and aria-invalid wiring.</li>
            <li><strong>Wire aria-describedby</strong> to a HelperText id when you have helper or error text — without it, screen readers don&apos;t announce the helper.</li>
            <li><strong>Use the right type.</strong> <code>type=&quot;email&quot;</code> brings up the email keyboard on mobile and triggers browser validation; <code>type=&quot;number&quot;</code> ditto for numeric. Don&apos;t default to text for everything.</li>
            <li><strong>Don&apos;t use placeholder as a label.</strong> Placeholder fails users with cognitive disabilities (it disappears) and translation tools (it&apos;s often not translated). Always use FormGroup&apos;s label.</li>
          </ul>
        </Card>
      </Section>

      <ThemingPointer
        dials={[
          ["--gp-control-pad-y", "Vertical padding — drives the 36px field height."],
          ["--gp-control-pad-x", "Horizontal padding inside the input."],
          ["--gp-radius-control", "Corner radius (shared with buttons + selects)."],
          ["--gp-border-default", "Resting border colour."],
          ["--gp-focus-ring", "Focus-ring colour."],
        ]}
      />

    </FoundationPage>
  ),
};
