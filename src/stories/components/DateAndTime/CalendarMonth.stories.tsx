import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  CalendarMonth,
  TextInputGroup,
  TextInputGroupMain,
  TextInputGroupUtilities,
} from "@patternfly/react-core";
import { CaretDownIcon, CaretUpIcon } from "@patternfly/react-icons";
import { FoundationPage, Section, Card, CodeBlock } from "../../_storyKit.js";
import { DemoFrame, PropsTable } from "../../_demoKit.js";

const meta: Meta = {
  title: "Components/Date and time/CalendarMonth",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => {
    const [date, setDate] = useState<Date>(new Date());
    return (
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
          description="The default presentation. CalendarMonth ships with built-in month + year navigation in its header; pairing it with the lib's compact year stepper above gives a more direct year-jump that matches the rest of the system. Internal carets at md+, full-size flanking buttons below the md breakpoint for touch."
        >
          <Card>
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <DemoFrame>
                <div style={{ display: "grid", gap: 12 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                    }}
                  >
                    <span
                      style={{
                        color: "var(--gp-color-text-regular)",
                        fontFamily: "var(--gp-font-family)",
                      }}
                    >
                      Year
                    </span>
                    <div
                      className="pf-v6-u-display-none pf-v6-u-display-inline-block-on-md"
                      style={{ width: 140 }}
                    >
                      <TextInputGroup>
                        <TextInputGroupMain
                          type="text"
                          inputProps={{
                            inputMode: "numeric",
                            pattern: "[0-9]*",
                          }}
                          value={date.getFullYear()}
                          onChange={(e) => {
                            const v = Number(
                              (e.target as HTMLInputElement).value,
                            );
                            if (
                              !Number.isNaN(v) &&
                              v >= 1900 &&
                              v <= 2100
                            ) {
                              const next = new Date(date);
                              next.setFullYear(v);
                              setDate(next);
                            }
                          }}
                          aria-label="Year"
                        />
                        <TextInputGroupUtilities>
                          <div className="gp-stepper-stack">
                            <button
                              type="button"
                              aria-label="Next year"
                              className="gp-stepper-btn"
                              onClick={() => {
                                const next = new Date(date);
                                next.setFullYear(date.getFullYear() + 1);
                                setDate(next);
                              }}
                            >
                              <CaretUpIcon />
                            </button>
                            <button
                              type="button"
                              aria-label="Previous year"
                              className="gp-stepper-btn"
                              onClick={() => {
                                const next = new Date(date);
                                next.setFullYear(date.getFullYear() - 1);
                                setDate(next);
                              }}
                            >
                              <CaretDownIcon />
                            </button>
                          </div>
                        </TextInputGroupUtilities>
                      </TextInputGroup>
                    </div>
                    {/* Touch fallback below md — flanking buttons */}
                    <div className="pf-v6-u-display-block pf-v6-u-display-none-on-md">
                      <div style={{ display: "flex", gap: 4 }}>
                        <button
                          type="button"
                          aria-label="Previous year"
                          className="gp-stepper-btn"
                          style={{ width: 36, height: 36 }}
                          onClick={() => {
                            const next = new Date(date);
                            next.setFullYear(date.getFullYear() - 1);
                            setDate(next);
                          }}
                        >
                          <CaretDownIcon />
                        </button>
                        <span
                          aria-live="polite"
                          style={{
                            minWidth: 56,
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "var(--gp-color-text-regular)",
                            fontFamily: "var(--gp-font-family)",
                          }}
                        >
                          {date.getFullYear()}
                        </span>
                        <button
                          type="button"
                          aria-label="Next year"
                          className="gp-stepper-btn"
                          style={{ width: 36, height: 36 }}
                          onClick={() => {
                            const next = new Date(date);
                            next.setFullYear(date.getFullYear() + 1);
                            setDate(next);
                          }}
                        >
                          <CaretUpIcon />
                        </button>
                      </div>
                    </div>
                  </div>
                  <CalendarMonth
                    date={date}
                    onChange={(_, d) => setDate(d)}
                  />
                </div>
              </DemoFrame>
              <CodeBlock>{`// Compact year stepper drives the calendar.
// Internal carets on md+, full-size flanking buttons below.

<TextInputGroup>
  <TextInputGroupMain
    type="text"
    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
    value={date.getFullYear()}
    onChange={(e) => {
      const y = Number(e.target.value);
      if (y >= 1900 && y <= 2100) {
        const next = new Date(date);
        next.setFullYear(y);
        setDate(next);
      }
    }}
    aria-label="Year"
  />
  <TextInputGroupUtilities>
    <div className="gp-stepper-stack">
      <button className="gp-stepper-btn" aria-label="Next year"
        onClick={() => bumpYear(+1)}><CaretUpIcon /></button>
      <button className="gp-stepper-btn" aria-label="Previous year"
        onClick={() => bumpYear(-1)}><CaretDownIcon /></button>
    </div>
  </TextInputGroupUtilities>
</TextInputGroup>

<CalendarMonth date={date} onChange={(_, d) => setDate(d)} />`}</CodeBlock>
              <p
                style={{
                  margin: 0,
                  color: "var(--gp-color-text-subtle)",
                  fontSize: 14,
                }}
              >
                The stepper&apos;s value clamp (1900–2100 here) is
                consumer-defined. The 36×36 fallback buttons below the md
                breakpoint meet WCAG 2.5.5 touch target size; the same
                pattern from the NumberInput page applies — see{" "}
                <strong>NumberInput → Internal stepper layout</strong> for
                the original recipe.
              </p>
            </div>
          </Card>
        </Section>

        <Section title="Most-used props">
          <Card>
            <div style={{ padding: 24 }}>
              <PropsTable
                rows={[
                  { name: "date", type: "Date", description: "Selected date. Pair with onChange." },
                  { name: "onChange", type: "(event, date: Date) => void", description: "Fires when the user picks a date." },
                  { name: "locale", type: "string", description: 'BCP 47 locale ("en-GB", "ja-JP"). Drives weekday names and first-day-of-week.' },
                  { name: "validators", type: "((date: Date) => boolean)[]", description: "Disable specific dates (weekends, blackout days). Each fn returns true if the date is valid." },
                  { name: "rangeStart", type: "Date", description: "Range mode — highlights the span between rangeStart and the hovered/selected date." },
                  { name: "prevMonthAriaLabel / nextMonthAriaLabel", type: "string", description: "i18n the navigation buttons." },
                ]}
              />
            </div>
          </Card>
        </Section>

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
    );
  },
};
