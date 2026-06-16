import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  FoundationPage,
  Section,
  Card,
  ConfigurationSection,
  Example,
} from "../../_kit/StoryKit.js";
import {
  Basic24Hour,
  TwelveHour,
} from "../../../examples/components/DateAndTime/TimePicker.example.js";
import timePickerExampleSrc from "../../../examples/components/DateAndTime/TimePicker.example.tsx?raw";
import timeFieldComponentSrc from "../../../components/ds/TimeField.tsx?raw";

const meta: Meta = {
  title: "Components/Forms/Date and time/TimePicker",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="TimePicker"
      intro={
        <>
          The time picker is the exported <code>TimeField</code> lego block: a
          text input for time-of-day with a popover of suggested times in the
          configured step, controlled by a string <code>value</code>. Supports
          12-hour and 24-hour modes; pick the one that matches your
          locale&apos;s convention. Pair it with <code>DateField</code> for
          date-and-time entry.
        </>
      }
    >
      <Section title="Basic (24-hour)">
        <Card>
          <Example
            source={timePickerExampleSrc}
            region="Basic24Hour"
            fileName="TimePicker.example.tsx"
          >
            <Basic24Hour />
          </Example>
        </Card>
      </Section>

      <Section title="12-hour">
        <Card>
          <Example
            source={timePickerExampleSrc}
            region="TwelveHour"
            fileName="TimePicker.example.tsx"
          >
            <TwelveHour />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example
            source={timePickerExampleSrc}
            fileName="TimePicker.example.tsx"
          />
        </Card>
      </Section>

      <ConfigurationSection
        importStatement={'import { TimeField } from "@golden-passport/ds-patternfly";'}
        componentSource={timeFieldComponentSrc}
        componentFileName="TimeField.tsx"
        rows={[
          { name: "value", type: "string", description: "Controlled time string (format follows is24Hour / delimiter)." },
          { name: "onChange", type: "(time: string) => void", description: "Fired with the new time string on every edit." },
          { name: "is24Hour", type: "boolean", description: "24-hour clock. Default false (12-hour with AM/PM)." },
          { name: "stepMinutes", type: "number", description: "Granularity for the popover suggestions (15 = quarter-hours)." },
          { name: "minTime / maxTime", type: "string", description: "Restrict the selectable range (same string format as value)." },
          { name: "delimiter", type: "string", description: 'Separator between hours and minutes. Default ":".' },
          { name: "ariaLabel", type: "string", description: "Accessible name for the input." },
          { name: "id", type: "string", description: "Field id — pairs with a FormGroup fieldId." },
          { name: "width / isDisabled", type: "string / boolean", description: "Control width and disabled state." },
        ]}
      />

      <Section title="Accessibility">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Match the brand&apos;s clock convention.</strong> 24-hour is the default in most of Europe, Asia, and military/medical settings; 12-hour is standard in the US and parts of Latin America.</li>
            <li><strong>Localize error messages.</strong> Both invalidFormatErrorMessage and invalidMinMaxErrorMessage are user-facing strings.</li>
            <li><strong>Keyboard:</strong> Type freely; the popover is optional. Arrow keys navigate suggestions when open.</li>
          </ul>
        </Card>
      </Section>

    </FoundationPage>
  ),
};
