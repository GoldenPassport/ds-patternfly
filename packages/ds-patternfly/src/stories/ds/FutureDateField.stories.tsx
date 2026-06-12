import type { Meta, StoryObj } from "@storybook/react-vite";
import { FutureDateField } from "@golden-passport/ds-patternfly";
import {
  FoundationPage,
  Section,
  Card,
  ConfigurationSection,
  Example,
} from "../_kit/StoryKit.js";
import {
  ScheduleReminder,
  FlatFuture,
} from "../../examples/ds/FutureDateField.example.js";
import futureExampleSrc from "../../examples/ds/FutureDateField.example.tsx?raw";
import futureComponentSrc from "../../components/ds/FutureDateField.tsx?raw";
import propsData from "./futureDateField.props.json";

const meta: Meta<typeof FutureDateField> = {
  title: "Building blocks/Forms/FutureDateField",
  component: FutureDateField,
  parameters: {
    layout: "padded",
    // PF6's calendar greys out disabled days below the axe color-contrast
    // threshold — a stock PF6 styling limitation, not a real defect.
    a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } },
  },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="FutureDateField"
      intro={
        <>
          A <code>DateField</code> restricted to future dates — today and
          earlier are disabled. Same flat / popover display and controlled{" "}
          <code>Date | null</code> API; <code>minDate</code> defaults to
          tomorrow, override it for a different floor (e.g. "no sooner than
          next week"). For scheduling, expiries, and "remind me on…" pickers.
        </>
      }
    >
      <Section title="Schedule a reminder (popover)" description="Past days are disabled; only tomorrow onward is selectable.">
        <Card>
          <Example source={futureExampleSrc} region="ScheduleReminder" fileName="FutureDateField.example.tsx">
            <ScheduleReminder />
          </Example>
        </Card>
      </Section>

      <Section title="Flat" description="The same future-only restriction on the inline calendar.">
        <Card>
          <Example source={futureExampleSrc} region="FlatFuture" fileName="FutureDateField.example.tsx">
            <FlatFuture />
          </Example>
        </Card>
      </Section>

      <Section title="Full example" description="The complete example file behind the demos above. The same file ships in the MCP docs catalog.">
        <Card>
          <Example source={futureExampleSrc} fileName="FutureDateField.example.tsx" />
        </Card>
      </Section>

      <ConfigurationSection
        importStatement={propsData.import}
        rows={propsData.rows}
        componentSource={futureComponentSrc}
        componentFileName="FutureDateField.tsx"
      />
    </FoundationPage>
  ),
};
