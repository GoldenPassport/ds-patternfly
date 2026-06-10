import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  FoundationPage,
  Section,
  Card,
  Example,
} from "../../_kit/StoryKit.js";
import { PropsTable } from "../../_kit/DemoKit.js";
import {
  LiveDemo,
  ModalVersion,
} from "../../../examples/components/DateAndTime/FuturePicker.example.js";
import futurePickerExampleSrc from "../../../examples/components/DateAndTime/FuturePicker.example.tsx?raw";

const meta: Meta = {
  title: "Components/Forms/Date and time/FuturePicker",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="FuturePicker"
      intro={
        <>
          Two-tab control for scheduling future work. <strong>Wait</strong>{" "}
          collects a relative offset (days / hours / minutes) and emits an
          ISO-8601 duration like <code>PT2H30M</code> or <code>P1DT4H</code>.{" "}
          <strong>Specific date</strong> uses an inline PF6{" "}
          <code>CalendarMonth</code> validated to disable today + any past
          day. Each tab keeps its own state so flipping back and forth
          doesn&rsquo;t lose work.
        </>
      }
    >
      <Section
        title="Live demo"
        description="Click the calendar button on the right of the input to open the picker. Switch between Wait and Specific date inside the popover; the input summarises the current value. onChange fires with `{ mode, duration }` or `{ mode, date }` whenever the active tab updates."
      >
        <Card>
          <Example
            source={futurePickerExampleSrc}
            region="LiveDemo"
            fileName="FuturePicker.example.tsx"
          >
            <LiveDemo />
          </Example>
        </Card>
      </Section>

      <Section
        title="Modal version"
        description="The same FuturePickerPanel hosted inside a PF6 Modal — useful for confirm-style flows where 'pick when this fires' is a deliberate decision rather than a quick inline edit. Apply commits the draft upstream; Cancel discards. The trigger label summarises the committed value, same as the popover trigger above."
      >
        <Card>
          <Example
            source={futurePickerExampleSrc}
            region="ModalVersion"
            fileName="FuturePicker.example.tsx"
          >
            <ModalVersion />
          </Example>
          <p
            style={{
              margin: "0 16px 16px",
              color: "var(--gp-color-text-subtle)",
              fontSize: 14,
            }}
          >
            <strong>Why modal vs popover:</strong> Modal forces an
            explicit commit step and dims the page, focusing the
            user on the schedule decision. Best for wizard steps
            or confirmation flows. The popover above (Live demo)
            is better for inline editing in forms where the
            schedule is one of many fields.
          </p>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example
            source={futurePickerExampleSrc}
            fileName="FuturePicker.example.tsx"
          />
        </Card>
      </Section>

      <Section title="ISO-8601 duration format">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "PT0M", type: "duration", description: "Zero — fallback when every field is 0." },
                { name: "PT2H30M", type: "duration", description: "2 hours, 30 minutes." },
                { name: "P1D", type: "duration", description: "1 day flat, no time portion." },
                { name: "P1DT4H", type: "duration", description: "1 day and 4 hours." },
                { name: "P2DT12H30M", type: "duration", description: "2 days, 12 hours, 30 minutes." },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section title="Most-used props">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "onChange", type: "(value: FuturePickerValue) => void", description: "Fires on every edit in the active tab. Payload is { mode: 'wait', duration } or { mode: 'date', date }." },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section title="Accessibility">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>NumberInput trio</strong> — each Days / Hours / Minutes input carries its own <code>inputAriaLabel</code>, <code>minusBtnAriaLabel</code>, and <code>plusBtnAriaLabel</code> so screen readers announce which unit is being changed.</li>
            <li><strong>Tabs are real tabs</strong> — PF6 <code>Tabs</code> + <code>TabContent</code> wires arrow-key navigation between tabs and the active-tab/tabpanel ARIA relationship automatically.</li>
            <li><strong>Inline calendar respects validators</strong> — <code>isAtLeastTomorrow</code> disables today + earlier; PF6 marks disabled cells with <code>aria-disabled</code>.</li>
            <li><strong>onChange payload is announced</strong> — the demo&rsquo;s preview <code>&lt;pre&gt;</code> uses <code>aria-live=&quot;polite&quot;</code> so the latest value reaches assistive tech without stealing focus.</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
