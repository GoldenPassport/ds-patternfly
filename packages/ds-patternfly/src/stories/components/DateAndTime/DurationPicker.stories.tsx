import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  FoundationPage,
  Section,
  Card,
  ConfigurationSection,
  Example,
} from "../../_kit/StoryKit.js";
import {
  DurationOrDate,
  DurationOnly,
} from "../../../examples/components/DateAndTime/DurationPicker.example.js";
import durationPickerExampleSrc from "../../../examples/components/DateAndTime/DurationPicker.example.tsx?raw";
import dateFieldComponentSrc from "../../../components/ds/DateField.tsx?raw";

const meta: Meta = {
  title: "Components/Forms/Date and time/DurationPicker",
  parameters: {
    layout: "padded",
    a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } },
  },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="DurationPicker"
      intro={
        <>
          Selecting a relative duration is the exported <code>DateField</code>{" "}
          with <code>allowRelative</code> + <code>relativeMode="duration"</code>
          . The <strong>Wait</strong> tab&apos;s days / hours / minutes steppers
          emit an ISO-8601 duration (e.g. <code>PT2H30M</code>,{" "}
          <code>P1DT4H</code>) via <code>onDurationChange</code>, while the{" "}
          <strong>Specific date</strong> tab emits an absolute <code>Date</code>{" "}
          via <code>onChange</code> — so the result is a duration <em>or</em> a
          date. Pass <code>relativeOnly</code> to drop the calendar and offer
          the duration alone.
        </>
      }
    >
      <Section
        title="Duration or date"
        description="Run again after — the Wait tab yields an ISO-8601 duration, the Specific date tab a Date. The example captures both in a typed union and shows whichever was last picked."
      >
        <Card>
          <Example source={durationPickerExampleSrc} region="DurationOrDate" fileName="DurationPicker.example.tsx">
            <DurationOrDate />
          </Example>
        </Card>
      </Section>

      <Section
        title="Duration only (relativeOnly)"
        description="relativeOnly drops the calendar tab — a pure duration picker. Use it when only an interval makes sense (a retry delay, a timeout)."
      >
        <Card>
          <Example source={durationPickerExampleSrc} region="DurationOnly" fileName="DurationPicker.example.tsx">
            <DurationOnly />
          </Example>
        </Card>
      </Section>

      <Section title="ISO-8601 duration format">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><code>PT0S</code> — zero (nothing picked yet).</li>
            <li><code>PT2H30M</code> — 2 hours, 30 minutes.</li>
            <li><code>P1D</code> — 1 day, no time portion.</li>
            <li><code>P1DT4H</code> — 1 day and 4 hours.</li>
          </ul>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demo above. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example source={durationPickerExampleSrc} fileName="DurationPicker.example.tsx" />
        </Card>
      </Section>

      <ConfigurationSection
        importStatement={'import { DateField } from "@golden-passport/ds-patternfly";'}
        componentSource={dateFieldComponentSrc}
        componentFileName="DateField.tsx"
        rows={[
          { name: "allowRelative", type: "boolean", description: "Add the relative-offset tab beside the calendar." },
          { name: "relativeMode", type: '"date" | "duration"', description: "What the relative tab produces: a resolved date via onChange (default), or an ISO-8601 duration via onDurationChange." },
          { name: "relativeOnly", type: "boolean", description: "Drop the calendar tab — show only the relative entry. With relativeMode='duration', a pure duration picker." },
          { name: "onChange", type: "(date: Date | null) => void", description: "Fired with the date from the Specific date tab." },
          { name: "onDurationChange", type: "(iso: string) => void", description: "Fired with the ISO-8601 duration string when relativeMode='duration'." },
          { name: "durationValue", type: "string", description: "Controlled duration shown in the field when no date is set — so the input reflects the chosen duration (e.g. PT2H30M)." },
          { name: "relativeHelpText", type: "string", description: "Optional helper line above the days/hours/minutes steppers." },
          { name: "relativeTabLabel / dateTabLabel", type: "string", description: 'Tab labels (i18n). Default "In…" / "Specific date".' },
        ]}
      />

      <Section title="Accessibility">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Real tabs.</strong> Specific date / Wait are PF6 Tabs — arrow-key navigation and the tab/tabpanel ARIA relationship are wired automatically.</li>
            <li><strong>Labelled steppers.</strong> The Days / Hours / Minutes NumberInputs each carry their own input + increment/decrement aria-labels.</li>
            <li><strong>Live value.</strong> The resolved duration is shown with aria-live so it reaches assistive tech as it changes.</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
