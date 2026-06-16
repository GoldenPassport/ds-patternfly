import type { Meta, StoryObj } from "@storybook/react-vite";
import { TimeField } from "@golden-passport/ds-patternfly";
import {
  FoundationPage,
  Section,
  Card,
  ConfigurationSection,
  Example,
} from "../_kit/StoryKit.js";
import {
  Basic,
  TwentyFourHour,
  Bounded,
} from "../../examples/ds/TimeField.example.js";
import timeFieldExampleSrc from "../../examples/ds/TimeField.example.tsx?raw";
import timeFieldComponentSrc from "../../components/ds/TimeField.tsx?raw";
import propsData from "./timeField.props.json";

const meta: Meta<typeof TimeField> = {
  title: "Building blocks/Forms/TimeField",
  component: TimeField,
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="TimeField"
      intro={
        <>
          The time-of-day picker lego block — a text input with a popover of
          suggested times, controlled by a string <code>value</code>. Type a
          time or pick one; 24- or 12-hour via <code>is24Hour</code>, with an
          optional selectable range (<code>minTime</code> / <code>maxTime</code>
          ). Pair it with <code>DateField</code> for a date-and-time entry.
        </>
      }
    >
      <Section title="Basic (12-hour)" description="Default 12-hour time with AM/PM. Type a time or pick from the popover.">
        <Card>
          <Example source={timeFieldExampleSrc} region="Basic" fileName="TimeField.example.tsx">
            <Basic />
          </Example>
        </Card>
      </Section>

      <Section title="24-hour + step" description="is24Hour switches to 24-hour time; stepMinutes sets the spacing of suggested times.">
        <Card>
          <Example source={timeFieldExampleSrc} region="TwentyFourHour" fileName="TimeField.example.tsx">
            <TwentyFourHour />
          </Example>
        </Card>
      </Section>

      <Section title="Bounded range" description="minTime / maxTime restrict the selectable range (e.g. business hours).">
        <Card>
          <Example source={timeFieldExampleSrc} region="Bounded" fileName="TimeField.example.tsx">
            <Bounded />
          </Example>
        </Card>
      </Section>

      <Section title="Full example" description="The complete example file behind the demos above. The same file ships in the MCP docs catalog.">
        <Card>
          <Example source={timeFieldExampleSrc} fileName="TimeField.example.tsx" />
        </Card>
      </Section>

      <ConfigurationSection
        importStatement={propsData.import}
        rows={propsData.rows}
        componentSource={timeFieldComponentSrc}
        componentFileName="TimeField.tsx"
      />
    </FoundationPage>
  ),
};
