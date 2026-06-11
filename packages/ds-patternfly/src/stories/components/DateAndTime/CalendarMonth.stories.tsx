import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  FoundationPage,
  Section,
  Card,
  ConfigurationSection,
  Example,
} from "../../_kit/StoryKit.js";
import {
  InlineCalendar,
  ModalCalendar,
} from "../../../examples/components/DateAndTime/CalendarMonth.example.js";
import calendarMonthExampleSrc from "../../../examples/components/DateAndTime/CalendarMonth.example.tsx?raw";
import calendarMonthComponentSrc from "../../../components/base/CalendarMonth.tsx?raw";

const meta: Meta = {
  title: "Components/Forms/Date and time/CalendarMonth",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="CalendarMonth"
      intro={
        <>
          A standalone month-view calendar — the picker grid that
          DatePicker uses internally. Render it directly when you need a
          date selection inline (a scheduling sidebar, a date-range view)
          without the popover/text-input surface DatePicker adds.
        </>
      }
    >
      <Section
        title="Inline calendar"
        description="The lib's CalendarPanel rendered directly — same three-view (days / months / years) calendar used inside DatePicker and DateTimePicker, just without the text input + popover surface. Click the header label to jump from days → months → years for quick navigation across decades."
      >
        <Card>
          <Example
            source={calendarMonthExampleSrc}
            region="InlineCalendar"
            fileName="CalendarMonth.example.tsx"
          >
            <InlineCalendar />
          </Example>
          <p
            style={{
              margin: "0 16px 16px",
              color: "var(--gp-color-text-subtle)",
              fontSize: 14,
            }}
          >
            CalendarPanel is the shared lib calendar. It owns its own
            month/year navigation (header label cycles through views),
            applies brand styling, and accepts the same validators /
            range props as DatePicker. Render it directly when you need
            the grid without the popover/text-input surface.
          </p>
        </Card>
      </Section>

      <Section
        title="Modal calendar"
        description="The same CalendarPanel rendered inside a PF6 Modal — useful for date selection that needs to commit on Apply rather than write back immediately on pick. Click the trigger to open; pick a date inside the modal; Apply writes it back to the trigger label, Cancel discards. Pattern fits scheduling flows where 'pick a date' is one explicit step in a wizard or confirmation surface."
      >
        <Card>
          <Example
            source={calendarMonthExampleSrc}
            region="ModalCalendar"
            fileName="CalendarMonth.example.tsx"
          >
            <ModalCalendar />
          </Example>
          <p
            style={{
              margin: "0 16px 16px",
              color: "var(--gp-color-text-subtle)",
              fontSize: 14,
            }}
          >
            <strong>Why modal vs popover:</strong> Modal forces an
            explicit commit step (Apply / Cancel) and dims the page
            so the calendar is the only thing the user can interact
            with — useful when picking the date is a deliberate
            decision rather than an inline edit. Popover (DatePicker)
            writes back on pick and is better for forms where date is
            one of many fields the user is fluidly editing.
          </p>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example
            source={calendarMonthExampleSrc}
            fileName="CalendarMonth.example.tsx" />
        </Card>
      </Section>

      <ConfigurationSection
        importStatement={'import { CalendarMonth } from "@golden-passport/ds-patternfly";'}
        componentSource={calendarMonthComponentSrc}
        componentFileName="CalendarMonth.tsx"
        rows={[
          { name: "date", type: "Date", description: "Selected date. Pair with onChange." },
          { name: "onChange", type: "(event, date: Date) => void", description: "Fires when the user picks a date." },
          { name: "locale", type: "string", description: 'BCP 47 locale ("en-GB", "ja-JP"). Drives weekday names and first-day-of-week.' },
          { name: "validators", type: "((date: Date) => boolean)[]", description: "Disable specific dates (weekends, blackout days). Each fn returns true if the date is valid." },
          { name: "rangeStart", type: "Date", description: "Range mode — highlights the span between rangeStart and the hovered/selected date." },
          { name: "prevMonthAriaLabel / nextMonthAriaLabel", type: "string", description: "i18n the navigation buttons." },
        ]}
      />

      <Section title="Accessibility">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Localize aria labels.</strong> The default English &quot;previous month&quot; / &quot;next month&quot; need translation in non-English brands.</li>
            <li><strong>Keyboard:</strong> Arrow keys move date by 1 day, Page Up/Down by month, Shift+Page Up/Down by year, Home/End to start/end of week.</li>
            <li><strong>Provide locale</strong> when the app supports more than one. Without it the calendar uses the browser default, which may not match the rest of the UI.</li>
          </ul>
        </Card>
      </Section>

      <Section title="When to use CalendarMonth vs DatePicker">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>CalendarMonth</strong> — always-visible inline grid. Scheduling pages, range builders, sidebars where the calendar is part of the UI.</li>
            <li><strong>DatePicker</strong> — text input + popover calendar. Forms where dates are one of many fields.</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
