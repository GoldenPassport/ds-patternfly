import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  FoundationPage,
  Section,
  Card,
  ConfigurationSection,
  Example,
} from "../../_kit/StoryKit.js";
import {
  LiveDemo,
  ModalVersion,
} from "../../../examples/components/DateAndTime/FuturePicker.example.js";
import futurePickerExampleSrc from "../../../examples/components/DateAndTime/FuturePicker.example.tsx?raw";
import dateFieldComponentSrc from "../../../components/ds/DateField.tsx?raw";

const meta: Meta = {
  title: "Components/Forms/Date and time/FuturePicker",
  parameters: {
    layout: "padded",
    a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } },
  },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="FuturePicker"
      intro={
        <>
          A future-only date picker — the exported <code>DateField</code> with{" "}
          <code>futureOnly</code>, which disables today and earlier (
          <code>minDate</code> defaults to tomorrow; override it for a later
          floor). Same calendar engine and controlled <code>Date | null</code>{" "}
          API as DateField. For scheduling, expiries, and &ldquo;remind me
          on…&rdquo; pickers.
        </>
      }
    >
      <Section
        title="Live demo (popover)"
        description="Today and earlier are disabled; only tomorrow onward is selectable."
      >
        <Card>
          <Example source={futurePickerExampleSrc} region="LiveDemo" fileName="FuturePicker.example.tsx">
            <LiveDemo />
          </Example>
        </Card>
      </Section>

      <Section
        title="Modal version"
        description="display='modal' opens the future-only calendar in a dialog with Apply / Cancel — for confirm-style flows where picking the date is a deliberate step."
      >
        <Card>
          <Example source={futurePickerExampleSrc} region="ModalVersion" fileName="FuturePicker.example.tsx">
            <ModalVersion />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example source={futurePickerExampleSrc} fileName="FuturePicker.example.tsx" />
        </Card>
      </Section>

      <ConfigurationSection
        importStatement={'import { DateField } from "@golden-passport/ds-patternfly";'}
        componentSource={dateFieldComponentSrc}
        componentFileName="DateField.tsx"
        rows={[
          { name: "value", type: "Date | null", description: "Controlled value, or null for no selection." },
          { name: "onChange", type: "(date: Date | null) => void", description: "Fired with the chosen future date." },
          { name: "futureOnly", type: "boolean", description: "Disable today and earlier (minDate defaults to tomorrow). Shorthand for future-date pickers." },
          { name: "minDate", type: "Date", description: "Earliest selectable date — overrides futureOnly's tomorrow default for a later floor." },
          { name: "display", type: '"popover" | "flat" | "modal"', description: "Input + popover (default), inline calendar, or a modal trigger with Apply/Cancel." },
        ]}
      />

      <Section title="Accessibility">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Past dates disabled.</strong> Today and earlier are unselectable in the calendar and rejected on typed input.</li>
            <li><strong>Both input modes work.</strong> Typing an ISO date is fully keyboard-accessible alongside the calendar.</li>
            <li><strong>Mobile bottom sheet.</strong> Below the md breakpoint the popover becomes a focus-trapped bottom sheet.</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
