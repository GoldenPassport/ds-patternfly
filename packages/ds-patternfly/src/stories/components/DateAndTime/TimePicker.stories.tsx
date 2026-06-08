import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { FormGroup, TimePicker } from "@patternfly/react-core";
import { FoundationPage, Section, Card, CodeBlock } from "../../_storyKit.js";
import { DemoFrame, PropsTable } from "../../../components/DemoKit.js";

const meta: Meta = {
  title: "Components/Forms/Date and time/TimePicker",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => {
    const [t, setT] = useState("");
    return (
      <FoundationPage
        title="TimePicker"
        intro={
          <>
            A text input for time-of-day selection with a popover suggesting
            common times in the configured step. Supports 12-hour and
            24-hour modes; pick the one that matches your locale&apos;s
            convention.
          </>
        }
      >
        <Section title="Basic (24-hour)">
          <Card>
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <DemoFrame>
                <FormGroup label="Start time" fieldId="start" isRequired>
                  <TimePicker
                    id="start"
                    time={t}
                    onChange={(_, value) => setT(value)}
                    is24Hour
                    stepMinutes={15}
                  />
                </FormGroup>
              </DemoFrame>
              <CodeBlock>{`<FormGroup label="Start time" fieldId="start">
  <TimePicker
    id="start"
    time={time}
    onChange={(_, v) => setTime(v)}
    is24Hour
    stepMinutes={15}
  />
</FormGroup>`}</CodeBlock>
            </div>
          </Card>
        </Section>

        <Section title="12-hour">
          <Card>
            <div style={{ padding: 24 }}>
              <DemoFrame>
                <FormGroup label="Reminder time" fieldId="reminder">
                  <TimePicker id="reminder" time={t} onChange={(_, value) => setT(value)} />
                </FormGroup>
              </DemoFrame>
            </div>
          </Card>
        </Section>

        <Section title="Most-used props">
          <Card>
            <div style={{ padding: 24 }}>
              <PropsTable
                rows={[
                  { name: "id", type: "string", description: "Required for FormGroup wiring." },
                  { name: "time", type: "string | Date", description: "Controlled time. String form depends on is24Hour." },
                  { name: "onChange", type: "(event, time, hour?, minute?, seconds?, isValid?) => void", description: "Note the wide signature — five extra positional args after the string time." },
                  { name: "is24Hour", type: "boolean", description: "24-hour clock. Default false (12-hour with AM/PM)." },
                  { name: "stepMinutes", type: "number", description: "Granularity for the popover suggestions (15 = quarter-hours)." },
                  { name: "delimiter", type: "string", description: 'Separator between hours and minutes. Default ":" — locales like Korean use other characters.' },
                  { name: "invalidFormatErrorMessage", type: "string", description: "Message when input doesn't parse. i18n." },
                  { name: "invalidMinMaxErrorMessage", type: "string", description: "Message when value falls outside min/max. i18n." },
                ]}
              />
            </div>
          </Card>
        </Section>

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
    );
  },
};
