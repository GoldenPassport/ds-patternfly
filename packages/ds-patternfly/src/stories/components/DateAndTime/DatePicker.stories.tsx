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
  CustomCTA,
  FormatVariants,
  MinMax,
  ExcludedDates,
  DateRange,
  I18n,
  PopoverEscape,
  WithValidation,
} from "../../../examples/components/DateAndTime/DatePicker.example.js";
import datePickerExampleSrc from "../../../examples/components/DateAndTime/DatePicker.example.tsx?raw";
import datePickerComponentSrc from "../../../components/base/DatePicker.tsx?raw";

const meta: Meta = {
  title: "Components/Forms/Date and time/DatePicker",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="DatePicker"
      intro={
        <>
          A text input paired with a popover calendar. Users can type a
          date directly or pick from the calendar — both inputs stay in
          sync. Use it inside forms where a date is one of several fields.
          The lib defaults the display format to <code>DD/MM/YYYY</code>{" "}
          (rest-of-world convention); US-style and other formats are a
          one-prop swap.
        </>
      }
    >
      <Section
        title="Default — DD/MM/YYYY"
        description="Lib default. Built from a TextInput + a lib `Button` trigger (matches the icon-button styling from Components/Button) + a Popover containing an inline CalendarMonth. Click the calendar icon to open."
      >
        <Card>
          <Example
            source={datePickerExampleSrc}
            region="Default"
            fileName="DatePicker.example.tsx"
          >
            <Default />
          </Example>
          <p
            style={{
              margin: "0 16px 16px",
              color: "var(--gp-color-text-subtle)",
              fontSize: 14,
            }}
          >
            <strong>Why not just <code>&lt;DatePicker&gt;</code>?</strong>{" "}
            PF6&apos;s built-in <code>DatePicker</code> hard-codes the
            trigger to a <code>variant=&quot;control&quot;</code> button.
            Composing from primitives lets the trigger be{" "}
            <em>any</em> variant (tertiary here, but primary / secondary
            / plain are all valid) so the calendar opener picks up the
            lib&apos;s standard icon-button styling — same as the rest
            of the form row. PF6&apos;s native <code>&lt;DatePicker&gt;</code>{" "}
            is still demoed in the sections below for cases where you
            want its bundled keyboard / typing validation.
          </p>
        </Card>
      </Section>

      <Section
        title="Custom CTA — primary, outline, or arbitrary"
        description='PF6&apos;s standard DatePicker uses a fixed control-variant button to open the calendar. When the date picker is the primary action of a region (hero scheduler, empty-state CTA), use the recipe below — a styled Button + Popover + CalendarMonth combination. Pick any Button variant or arbitrary chrome.'
      >
        <Card>
          <Example
            source={datePickerExampleSrc}
            region="CustomCTA"
            fileName="DatePicker.example.tsx"
          >
            <CustomCTA />
          </Example>
          <p
            style={{
              margin: "0 16px 16px",
              color: "var(--gp-color-text-subtle)",
              fontSize: 14,
            }}
          >
            <strong>What CalendarPopout handles for you:</strong> the
            desktop popover with auto-flip near viewport edges + caret
            under the trigger; the mobile bottom-sheet with focus
            trap, Escape close, body-scroll lock + 44px tap-targets;
            the three-view CalendarPanel (days / months / years) with
            adaptive arrows and a single Month-Year label that cycles
            between views. Bring your own trigger Button — variant,
            icon, and label are all yours to set.
          </p>
        </Card>
      </Section>

      <Section
        title="Format variants"
        description="Same component, three regional conventions — pick the dateFormat / dateParse pair that matches your locale."
      >
        <Card>
          <Example
            source={datePickerExampleSrc}
            region="FormatVariants"
            fileName="DatePicker.example.tsx"
          >
            <FormatVariants />
          </Example>
        </Card>
      </Section>

      <Section
        title="Min / max — disabled dates"
        description='Restrict the selectable range. Validators return an empty string for valid dates and an error message for invalid ones — surfaced on the calendar (cells disabled) and on the input. Mirrors PF6&apos;s "min and max date" example.'
      >
        <Card>
          <Example
            source={datePickerExampleSrc}
            region="MinMax"
            fileName="DatePicker.example.tsx"
          >
            <MinMax />
          </Example>
          <p
            style={{
              margin: "0 16px 16px",
              color: "var(--gp-color-text-subtle)",
              fontSize: 14,
            }}
          >
            Each validator runs on every calendar cell. Cells whose
            validator returns a non-empty string render as disabled and
            are unselectable. The first error string also surfaces under
            the input when the user types an invalid date manually.
          </p>
        </Card>
      </Section>

      <Section
        title="Excluded dates — holidays / OOO"
        description='Pass an array of YYYY-MM-DD strings (or Date objects) and a single validator that checks set membership. Common use cases: public holidays, blackout windows, scheduled out-of-office days. Excluded dates render as disabled in the calendar AND fail input validation if typed manually.'
      >
        <Card>
          <Example
            source={datePickerExampleSrc}
            region="ExcludedDates"
            fileName="DatePicker.example.tsx"
          >
            <ExcludedDates />
          </Example>
          <p
            style={{
              margin: "0 16px 16px",
              color: "var(--gp-color-text-subtle)",
              fontSize: 14,
            }}
          >
            <strong>Pattern notes:</strong> normalise to a single string
            form (ISO YYYY-MM-DD here) so set membership is O(1)
            regardless of list length. Composes with the Min/Max
            validator above — pass both functions in the array and PF6
            runs them in order. The error message you return ("Unavailable",
            "Holiday", "Out of office") surfaces under the input when a
            user types an excluded date manually, so consider
            customising per-context.
          </p>
        </Card>
      </Section>

      <Section
        title="Date range"
        description='Two paired DatePickers — start + end. The end picker disables anything before the start. Same pattern as PF6&apos;s "Date and time range picker" example.'
      >
        <Card>
          <Example
            source={datePickerExampleSrc}
            region="DateRange"
            fileName="DatePicker.example.tsx"
          >
            <DateRange />
          </Example>
        </Card>
      </Section>

      <Section
        title="i18n — custom month / weekday names"
        description='monthFormat and weekdayFormat are functions — return a localized string and the calendar shows it. The calendar also accepts a `locale` BCP47 string for browser-driven defaults.'
      >
        <Card>
          <Example
            source={datePickerExampleSrc}
            region="I18n"
            fileName="DatePicker.example.tsx"
          >
            <I18n />
          </Example>
        </Card>
      </Section>

      <Section
        title="Popover escape — appendTo"
        description="When the DatePicker sits inside a Card, Modal, or any container with overflow constraints, the calendar popover can be clipped. Pass appendTo to portal it to a higher container (or document.body) so it renders unconstrained and stays viewport-aware."
      >
        <Card>
          <Example
            source={datePickerExampleSrc}
            region="PopoverEscape"
            fileName="DatePicker.example.tsx"
          >
            <PopoverEscape />
          </Example>
          <p
            style={{
              margin: "0 16px 16px",
              color: "var(--gp-color-text-subtle)",
              fontSize: 14,
            }}
          >
            <strong>Recommended default for cards / modals.</strong>{" "}
            Without <code>appendTo</code>, the popover lives inside the
            form-control wrapper and will be clipped by any parent with{" "}
            <code>overflow: hidden</code> or <code>overflow: auto</code>.
            PF6&apos;s positioner (Popper.js) is viewport-aware: when
            you scroll near a screen edge, the popover auto-flips to
            stay on-screen.
          </p>
        </Card>
      </Section>

      <Section
        title="With validation"
        description="Validators feed into both the calendar (disabled cells) and the input (helper text)."
      >
        <Card>
          <Example
            source={datePickerExampleSrc}
            region="WithValidation"
            fileName="DatePicker.example.tsx"
          >
            <WithValidation />
          </Example>
        </Card>
      </Section>

      <Section
        title="Mobile behaviour"
        description={
          <>
            Below the <code>md</code> breakpoint, LibDatePicker swaps
            its popover for a bottom sheet. The mechanics are the
            same for every popover-shaped picker in this section —
            see <strong>Date and time → Overview → Mobile behaviour</strong>{" "}
            for the full write-up.
          </>
        }
      >
        <Card>
          <div
            style={{
              padding: 24,
              color: "var(--gp-color-text-subtle)",
              fontSize: 14,
            }}
          >
            Resize the canvas below the md breakpoint (the Storybook
            viewport picker has a <em>mobile</em> preset) and re-open
            any LibDatePicker on the page to see the sheet in action.
          </div>
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
        importStatement={'import { DatePicker } from "@golden-passport/ds-patternfly";'}
        componentSource={datePickerComponentSrc}
        componentFileName="DatePicker.tsx"
        rows={[
          { name: "value", type: "string", description: "Controlled string value. Format matches dateFormat." },
          { name: "onChange", type: "(event, value: string, date?: Date) => void", description: "Fires on input edit or calendar pick. String + Date both provided when valid." },
          { name: "dateFormat / dateParse", type: "(date) => string  /  (string) => Date", description: 'Customize display + parsing. Lib default is DD/MM/YYYY; PF6 ships ISO YYYY-MM-DD if you don\'t pass either.' },
          { name: "validators", type: "((date: Date) => string)[]", description: "Each fn returns empty string for valid, or error message. First error wins. Calendar cells disabled when their date fails any validator." },
          { name: "rangeStart", type: "Date", description: "Highlight the span between rangeStart and the calendar's hovered/selected date — for paired range pickers." },
          { name: "minDate / maxDate", type: "Date", description: "Hard bounds — calendar restricts navigation and selection. Often easier than writing validators by hand." },
          { name: "monthFormat / weekdayFormat / longWeekdayFormat / dayFormat", type: "(date) => ReactNode", description: "i18n customization — supply localized strings." },
          { name: "locale", type: "string", description: 'BCP47 ("en-GB", "fr-FR", "ja-JP"). Drives Intl-driven defaults when format functions are omitted.' },
          { name: "weekStart", type: "0 | 1 | ... | 6", description: "Which weekday is column 1. 0 = Sunday (default), 1 = Monday." },
          { name: "invalidFormatText", type: "string", description: "Error message for unparseable input. i18n." },
          { name: "buttonAriaLabel", type: "string", description: "Required. Names the calendar trigger button. i18n." },
          { name: "appendTo", type: "HTMLElement | () => HTMLElement | 'inline'", description: "Where to portal the popover. Pass `() => document.body` when sitting inside cards/modals to escape overflow clipping." },
        ]}
      />

      <Section title="Accessibility">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>buttonAriaLabel is required.</strong> The calendar trigger is icon-only — without an aria-label it&apos;s nameless to AT.</li>
            <li><strong>Both input modes work.</strong> Typing the date directly is fully keyboard-accessible and faster than the calendar for users who know the date — don&apos;t hide the input.</li>
            <li><strong>Validators announce via FormGroup helper text.</strong> Wire the validator&apos;s error string to a HelperText element with variant=&quot;error&quot; for proper AT announcement.</li>
            <li><strong>Localize all user-facing strings.</strong> Placeholder, buttonAriaLabel, prevMonthAriaLabel, nextMonthAriaLabel, invalidFormatText. Plus monthFormat / weekdayFormat for the calendar grid itself.</li>
            <li><strong>Lib styling.</strong> Today&apos;s date gets a brand-coloured outline; weekend cells get a subtle tint. Both are CSS-driven from the lib stylesheet — no per-component config needed.</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
