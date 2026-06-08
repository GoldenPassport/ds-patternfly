import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalVariant,
} from "@patternfly/react-core";
import { FoundationPage, Section, Card, CodeBlock } from "../../_storyKit.js";
import { DemoFrame, PropsTable } from "../../../components/DemoKit.js";
import { CalendarPanel } from "./_libcal.js";

// DD/MM/YYYY for the trigger label — matches the lib's default
// formatting convention from DatePicker.
const fmtDDMMYYYY = (d: Date) => {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
};

const meta: Meta = {
  title: "Components/Forms/Date and time/CalendarMonth",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => {
    const [date, setDate] = useState<Date>(new Date());

    // Modal demo state — separate from the inline calendar's so the
    // two examples can be exercised independently. The modal commits
    // its `draft` selection only on Apply; Cancel discards.
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [modalDate, setModalDate] = useState<Date | undefined>();
    const [draft, setDraft] = useState<Date | undefined>();
    const openModal = () => {
      setDraft(modalDate ?? new Date());
      setModalOpen(true);
    };

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
          description="The lib's CalendarPanel rendered directly — same three-view (days / months / years) calendar used inside DatePicker and DateTimePicker, just without the text input + popover surface. Click the header label to jump from days → months → years for quick navigation across decades."
        >
          <Card>
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <DemoFrame>
                <CalendarPanel date={date} onChange={setDate} />
              </DemoFrame>
              <CodeBlock>{`import { CalendarPanel } from "./_libcal";

const [date, setDate] = useState<Date>(new Date());

<CalendarPanel date={date} onChange={setDate} />`}</CodeBlock>
              <p
                style={{
                  margin: 0,
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
            </div>
          </Card>
        </Section>

        <Section
          title="Modal calendar"
          description="The same CalendarPanel rendered inside a PF6 Modal — useful for date selection that needs to commit on Apply rather than write back immediately on pick. Click the trigger to open; pick a date inside the modal; Apply writes it back to the trigger label, Cancel discards. Pattern fits scheduling flows where 'pick a date' is one explicit step in a wizard or confirmation surface."
        >
          <Card>
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <DemoFrame>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <Button variant="secondary" onClick={openModal}>
                    {modalDate
                      ? `Date: ${fmtDDMMYYYY(modalDate)}`
                      : "Choose a date"}
                  </Button>
                  {modalDate ? (
                    <Button
                      variant="link"
                      onClick={() => setModalDate(undefined)}
                    >
                      Clear
                    </Button>
                  ) : null}
                </div>

                <Modal
                  variant={ModalVariant.small}
                  isOpen={modalOpen}
                  onClose={() => setModalOpen(false)}
                  aria-labelledby="cal-modal-title"
                  aria-describedby="cal-modal-body"
                  // Tighten the modal to fit the calendar snugly. The
                  // small variant maxes out at ~35rem (560px) which
                  // leaves a wide gutter on either side of the 22rem
                  // CalendarPanel on bigger screens. Cap via PF6's
                  // own Width custom property so the modal still
                  // shrinks correctly on narrow viewports. 26rem ≈
                  // panel (22rem) + body inline padding.
                  style={
                    {
                      "--pf-v6-c-modal-box--Width": "26rem",
                    } as React.CSSProperties
                  }
                >
                  <ModalHeader
                    title="Pick a date"
                    labelId="cal-modal-title"
                  />
                  <ModalBody id="cal-modal-body">
                    {/* Lock the body to the calendar's worst-case
                        height across all three views (days / months /
                        years) so flicking between them doesn't reflow
                        the modal. The months + years grids are the
                        slightly-taller pair (3rem touch-target tiles
                        on a 4-row layout) vs the days grid (6 rows ×
                        2.25rem day cells from the --gp-control-pad-y
                        dial). 24.75rem covers the months/years worst
                        case with a touch of buffer; the calendar
                        sits centred via the flex justify-content.

                        Top padding adds breathing room between the
                        modal header (Pick a date + X close) and the
                        calendar's internal nav arrows below — without
                        it the two button rows sit close enough to
                        read as one cluttered strip. */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        minBlockSize: "24.75rem",
                        paddingBlockStart: "var(--pf-t--global--spacer--md, 1rem)",
                      }}
                    >
                      <CalendarPanel
                        {...(draft ? { date: draft } : {})}
                        onChange={(d) => setDraft(d)}
                      />
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      variant="primary"
                      isDisabled={!draft}
                      onClick={() => {
                        if (draft) setModalDate(draft);
                        setModalOpen(false);
                      }}
                    >
                      Apply
                    </Button>
                    <Button
                      variant="link"
                      onClick={() => setModalOpen(false)}
                    >
                      Cancel
                    </Button>
                  </ModalFooter>
                </Modal>
              </DemoFrame>
              <CodeBlock>{`import {
  Button, Modal, ModalBody, ModalFooter, ModalHeader, ModalVariant,
} from "@patternfly/react-core";
import { CalendarPanel } from "./_libcal";

const [open, setOpen]   = useState(false);
const [date, setDate]   = useState<Date | undefined>();
const [draft, setDraft] = useState<Date | undefined>();

<Button variant="secondary" onClick={() => { setDraft(date ?? new Date()); setOpen(true); }}>
  {date ? \`Date: \${fmtDDMMYYYY(date)}\` : "Choose a date"}
</Button>

<Modal variant={ModalVariant.small} isOpen={open} onClose={() => setOpen(false)}
       aria-labelledby="cal-modal-title">
  <ModalHeader title="Pick a date" labelId="cal-modal-title" />
  <ModalBody>
    <CalendarPanel date={draft} onChange={setDraft} />
  </ModalBody>
  <ModalFooter>
    <Button variant="primary" isDisabled={!draft}
            onClick={() => { if (draft) setDate(draft); setOpen(false); }}>
      Apply
    </Button>
    <Button variant="link" onClick={() => setOpen(false)}>Cancel</Button>
  </ModalFooter>
</Modal>`}</CodeBlock>
              <p
                style={{
                  margin: 0,
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
