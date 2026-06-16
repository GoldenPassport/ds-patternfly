import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  FoundationPage,
  Section,
  Card,
  ConfigurationSection,
  Example,
} from "../../_kit/StoryKit.js";
import {
  Default,
  Flat,
  Modal,
  MinMax,
  ExcludedDates,
  DateRange,
  I18n,
  WithValidation,
} from "../../../examples/components/DateAndTime/DatePicker.example.js";
import datePickerExampleSrc from "../../../examples/components/DateAndTime/DatePicker.example.tsx?raw";
import datePickerComponentSrc from "../../../components/ds/DateField.tsx?raw";

const meta: Meta = {
  title: "Components/Forms/Date and time/DatePicker",
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
      title="DatePicker"
      intro={
        <>
          The lib&apos;s date picker is the exported <code>DateField</code>{" "}
          lego block: a text input paired with a three-view popover calendar
          (days → months → years), controlled by a single{" "}
          <code>Date | null</code>. The calendar engine — responsive
          popover/bottom-sheet, view navigation, validator-driven disabling —
          lives inside the component, so every example here is just
          configuration. For future-only dates, pass{" "}
          <code>futureOnly</code>.
        </>
      }
    >
      <Section
        title="Default"
        description="A text input + a calendar trigger. Type an ISO date or pick from the popover — both stay in sync. On touch viewports the popover becomes a bottom sheet."
      >
        <Card>
          <Example source={datePickerExampleSrc} region="Default" fileName="DatePicker.example.tsx">
            <Default />
          </Example>
        </Card>
      </Section>

      <Section
        title="Flat"
        description="display='flat' renders the always-visible inline calendar (no input) — for embedding directly in a panel."
      >
        <Card>
          <Example source={datePickerExampleSrc} region="Flat" fileName="DatePicker.example.tsx">
            <Flat />
          </Example>
        </Card>
      </Section>

      <Section
        title="Modal"
        description="display='modal' renders a trigger button that opens the calendar in a modal with Apply / Cancel — for deliberate, focused date entry."
      >
        <Card>
          <Example source={datePickerExampleSrc} region="Modal" fileName="DatePicker.example.tsx">
            <Modal />
          </Example>
        </Card>
      </Section>

      <Section
        title="Min / max"
        description="minDate / maxDate disable days outside the range in every view and reject out-of-range typed input."
      >
        <Card>
          <Example source={datePickerExampleSrc} region="MinMax" fileName="DatePicker.example.tsx">
            <MinMax />
          </Example>
        </Card>
      </Section>

      <Section
        title="Excluded dates — holidays / OOO"
        description="Pass validators — predicates that return false to disable a day. Here, a set of public holidays. Disabled days grey out in the calendar and fail typed input."
      >
        <Card>
          <Example source={datePickerExampleSrc} region="ExcludedDates" fileName="DatePicker.example.tsx">
            <ExcludedDates />
          </Example>
        </Card>
      </Section>

      <Section
        title="Date range"
        description="Two paired DateFields. The end picker takes the start as its minDate and rangeStart, so it disables earlier days and highlights the span."
      >
        <Card>
          <Example source={datePickerExampleSrc} region="DateRange" fileName="DatePicker.example.tsx">
            <DateRange />
          </Example>
        </Card>
      </Section>

      <Section
        title="i18n — localized month names"
        description="Pass a BCP-47 locale (or a monthFormat function) and the calendar's month labels localize."
      >
        <Card>
          <Example source={datePickerExampleSrc} region="I18n" fileName="DatePicker.example.tsx">
            <I18n />
          </Example>
        </Card>
      </Section>

      <Section
        title="With validation"
        description="minDate (or validators) drive both the calendar (disabled cells) and the input (rejected typing)."
      >
        <Card>
          <Example source={datePickerExampleSrc} region="WithValidation" fileName="DatePicker.example.tsx">
            <WithValidation />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example source={datePickerExampleSrc} fileName="DatePicker.example.tsx" />
        </Card>
      </Section>

      <ConfigurationSection
        importStatement={'import { DateField } from "@golden-passport/ds-patternfly";'}
        componentSource={datePickerComponentSrc}
        componentFileName="DateField.tsx"
        rows={[
          { name: "value", type: "Date | null", description: "Controlled value, or null for no selection." },
          { name: "onChange", type: "(date: Date | null) => void", description: "Fired with the new date (or null when the input is cleared)." },
          { name: "display", type: '"popover" | "flat" | "modal"', description: "How to render. Default popover (input + calendar), flat (inline calendar), or modal (trigger + dialog with Apply/Cancel)." },
          { name: "minDate / maxDate", type: "Date", description: "Hard inclusive bounds — days outside are disabled in every view and typed out-of-range input is rejected." },
          { name: "validators", type: "((d: Date) => boolean)[]", description: "Arbitrary day-disabling predicates (return false to disable). Combined with minDate/maxDate. Use for holidays, blackout windows, weekends." },
          { name: "rangeStart", type: "Date", description: "Highlight the span from this date to the hovered/selected day — for paired range pickers." },
          { name: "locale", type: "string", description: 'BCP-47 locale for month names (e.g. "fr-FR").' },
          { name: "monthFormat", type: "(d: Date) => string", description: "Override month-name rendering (takes priority over locale)." },
          { name: "ariaLabel", type: "string", description: "Accessible name for the input / modal trigger / sheet." },
          { name: "placeholder", type: "string", description: "Placeholder for the popover input / empty modal trigger." },
          { name: "modalTitle / applyText / cancelText", type: "string", description: "Modal chrome text (display='modal'). modalTitle also names the popover/sheet header." },
        ]}
      />

      <Section title="Accessibility">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>ariaLabel names the control.</strong> The calendar trigger is icon-only — pass ariaLabel so it has an accessible name.</li>
            <li><strong>Both input modes work.</strong> Typing an ISO date is fully keyboard-accessible and faster for users who know the date — the input is never hidden.</li>
            <li><strong>Mobile bottom sheet.</strong> Below the md breakpoint the popover becomes a focus-trapped bottom sheet with Escape-to-close and body-scroll lock.</li>
            <li><strong>Disabled days.</strong> Out-of-range / excluded days are disabled in the calendar and rejected on typed input, so invalid dates can&apos;t be committed.</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
