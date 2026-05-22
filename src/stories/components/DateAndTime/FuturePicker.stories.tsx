import { useMemo, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Button,
  ButtonVariant,
  InputGroup,
  InputGroupItem,
  Popover,
  Tab,
  TabContent,
  TabContentBody,
  TabTitleText,
  Tabs,
  TextInput,
} from "@patternfly/react-core";
import {
  CalendarAltIcon,
  MinusIcon,
  PlusIcon,
} from "@patternfly/react-icons";
import { FoundationPage, Section, Card, CodeBlock } from "../../_storyKit.js";
import { DemoFrame, PropsTable } from "../../_demoKit.js";
import {
  BottomSheet,
  CalendarPanel,
  useMobileViewport,
} from "./_libcal.js";

const meta: Meta = {
  title: "Components/Forms/Date and time/Future Picker",
  parameters: { layout: "padded" },
};
export default meta;

// ---------- ISO-8601 duration helper ----------
// Encodes a {days, hours, minutes} record as a PT/P duration string
// (https://en.wikipedia.org/wiki/ISO_8601#Durations). Days roll up
// into the date portion `P<d>D`; hours / minutes land in the time
// portion `T<h>H<m>M`. Returns `PT0M` when everything is zero so the
// output is always a valid ISO duration.
//
// Examples:
//   { days: 0, hours: 2, minutes: 30, seconds: 0  } → "PT2H30M"
//   { days: 0, hours: 0, minutes: 0,  seconds: 15 } → "PT15S"
//   { days: 1, hours: 0, minutes: 0,  seconds: 0  } → "P1D"
//   { days: 1, hours: 4, minutes: 0,  seconds: 0  } → "P1DT4H"
function formatIsoDuration({
  days,
  hours,
  minutes,
  seconds,
}: {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}): string {
  if (!days && !hours && !minutes && !seconds) return "PT0S";
  const datePart = days > 0 ? `${days}D` : "";
  const timeParts =
    (hours > 0 ? `${hours}H` : "") +
    (minutes > 0 ? `${minutes}M` : "") +
    (seconds > 0 ? `${seconds}S` : "");
  return `P${datePart}${timeParts ? `T${timeParts}` : ""}`;
}

// ---------- ISO-8601 date helper (CalendarMonth returns a Date) ----------
const pad2 = (n: number) => String(n).padStart(2, "0");
const fmtISODate = (d: Date) =>
  `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;

/**
 * Disable any day strictly before tomorrow (so the inline calendar
 * matches a "Future Picker" intent — today + earlier are off-limits).
 * PF6's CalendarMonth `validators` receive a candidate Date and return
 * false to disable.
 */
function isAtLeastTomorrow(date: Date): boolean {
  const tomorrow = new Date();
  tomorrow.setHours(0, 0, 0, 0);
  tomorrow.setDate(tomorrow.getDate() + 1);
  return date.getTime() >= tomorrow.getTime();
}

interface FuturePickerValue {
  /** "wait" → relative offset from now; "date" → absolute future date. */
  mode: "wait" | "date";
  /**
   * ISO-8601 duration (e.g. `PT2H30M`, `P1DT4H`) — present only when
   * mode is "wait".
   */
  duration?: string;
  /**
   * Absolute date in `YYYY-MM-DD` — present only when mode is "date".
   */
  date?: string;
}

interface FuturePickerProps {
  /** Receives the active value whenever the user edits. */
  onChange?: (value: FuturePickerValue) => void;
}

/**
 * Lib-style number stepper — InputGroup + TextInput + tertiary ± icon
 * Buttons. Replaces PF6 `<NumberInput>` so the ± buttons inherit the
 * lib icon-button styling (matches the DatePicker calendar trigger +
 * the Forms/NumberInput recipe). The TextInput uses
 * `inputMode="numeric"` to keep mobile keyboards numeric while
 * suppressing the browser-native ± spinner so only our buttons drive
 * the value.
 */
function StepperInput({
  value,
  onChange,
  min = 0,
  max = 99,
  label,
  ariaLabel,
}: {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  label: string;
  ariaLabel: string;
}) {
  const clamp = (v: number) => Math.max(min, Math.min(max, v));
  const btnStyle = {
    borderRadius:
      "var(--gp-radius-control, var(--pf-v6-c-button--BorderRadius))",
    aspectRatio: "1",
    paddingInline: 0,
    // Pin to the DS field height (36px = 2.25rem, the value derived
    // from `--gp-control-pad-y`). PF6 v6 `pf-m-secondary` doesn't
    // align with the form-control field height by default, so we set
    // it explicitly — the chips end up the same height as the
    // TextInput between them.
    blockSize: "2.25rem",
    minBlockSize: "2.25rem",
    // Match the TextInput border that sits between the ± chips. PF6
    // v6 ships `pf-m-secondary` borderless in this brand, but we
    // want the trio (− input +) to read as one unified row, so the
    // chips pick up the same `--gp-popover-stroke` line the input
    // paints via its `::before` pseudo.
    border:
      "var(--gp-border-width, 1px) solid var(--gp-popover-stroke)",
  } as const;
  return (
    // Plain `<div>` + `<span>` instead of a `<label>` wrapping the
    // InputGroup — a label re-fires click events on its labeled
    // input, which here would trigger the +/- buttons in a cascading
    // chain (clicking + also fired - and vice versa).
    <div style={{ display: "grid", gap: 4, fontSize: 13 }}>
      <span>{label}</span>
      <InputGroup>
        <InputGroupItem>
          <Button
            variant={ButtonVariant.tertiary}
            aria-label={`Decrease ${label.toLowerCase()}`}
            icon={<MinusIcon />}
            isDisabled={value <= min}
            onClick={() => onChange(clamp(value - 1))}
            style={btnStyle}
          />
        </InputGroupItem>
        <InputGroupItem isFill>
          <TextInput
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={value}
            onChange={(_e, v) => {
              if (v === "") return;
              const n = Number(v);
              if (!Number.isNaN(n)) onChange(clamp(n));
            }}
            aria-label={ariaLabel}
            style={{ textAlign: "center" }}
          />
        </InputGroupItem>
        <InputGroupItem>
          <Button
            variant={ButtonVariant.tertiary}
            aria-label={`Increase ${label.toLowerCase()}`}
            icon={<PlusIcon />}
            isDisabled={value >= max}
            onClick={() => onChange(clamp(value + 1))}
            style={btnStyle}
          />
        </InputGroupItem>
      </InputGroup>
    </div>
  );
}

/**
 * Render the picker body — used as the Popover content. Pulled out
 * from `FuturePicker` so the trigger (InputGroup + calendar button)
 * can compose this alongside its own popover open state.
 *
 *   - **Wait** — three NumberInputs (days / hours / minutes) compose
 *     into an ISO-8601 duration string `P[<d>D][T<h>H<m>M]`.
 *   - **Specific date** — inline PF6 CalendarMonth with a validator
 *     that disables today + any past day. Returns an ISO `YYYY-MM-DD`.
 *
 * Each tab carries its own state so flipping back and forth doesn't
 * lose work. The `onChange` callback fires with whichever tab is
 * currently active and that tab's current value.
 */
function FuturePickerPanel({ onChange }: FuturePickerProps) {
  const [tab, setTab] = useState<"wait" | "date">("wait");
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(2);
  const [minutes, setMinutes] = useState(30);
  const [seconds, setSeconds] = useState(0);
  const [date, setDate] = useState<Date | undefined>();

  const duration = useMemo(
    () => formatIsoDuration({ days, hours, minutes, seconds }),
    [days, hours, minutes, seconds],
  );

  // Push value upstream on every change in the active tab.
  const emit = (next: FuturePickerValue) => onChange?.(next);

  // Fills the host (popover / bottom sheet) — the inner Tabs strip
  // spans 100% so the user's tap targets are full-width on every
  // screen. Inner content (CalendarPanel at 22rem, the centred
  // StepperInput column at 14rem) keeps its own width inside the
  // wider tab body.
  return (
    <div style={{ display: "grid", gap: 12, inlineSize: "100%" }}>
      <Tabs
        activeKey={tab}
        onSelect={(_e, key) => {
          const t = key as "wait" | "date";
          setTab(t);
          emit(
            t === "wait"
              ? { mode: "wait", duration }
              : date
                ? { mode: "date", date: fmtISODate(date) }
                : { mode: "date" },
          );
        }}
        aria-label="Future picker mode"
      >
        <Tab eventKey="wait" title={<TabTitleText>Wait</TabTitleText>} />
        <Tab eventKey="date" title={<TabTitleText>Specific date</TabTitleText>} />
      </Tabs>

      {/* Tab panels — we render both, only one is shown via Tabs/TabContent. */}
      <TabContent
        id="future-picker-wait"
        eventKey="wait"
        activeKey={tab}
        hidden={tab !== "wait"}
      >
        <TabContentBody hasPadding>
          {/* Centre the Days / Hours / Minutes column inside the tab so
              the inputs read as a focused stack rather than start-
              aligned content. */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 12,
            }}
          >
          <p
            style={{
              margin: 0,
              // Span the full tab width (the centring flex parent
              // doesn't constrain children unless we cap them); the
              // paragraph reads at the same column the Tabs strip
              // above occupies.
              inlineSize: "100%",
              fontSize: 13,
              lineHeight: 1.5,
              color: "var(--gp-color-text-subtle)",
              textAlign: "center",
            }}
          >
            Fire this task after a relative wait. If working hours or
            holidays are configured, the wait skips closed periods.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1fr)",
              gap: 12,
              inlineSize: "14rem",
            }}
          >
            <StepperInput
              label="Days"
              ariaLabel="Days to wait"
              value={days}
              min={0}
              max={365}
              onChange={(v) => {
                setDays(v);
                emit({
                  mode: "wait",
                  duration: formatIsoDuration({
                    days: v,
                    hours,
                    minutes,
                    seconds,
                  }),
                });
              }}
            />
            <StepperInput
              label="Hours"
              ariaLabel="Hours to wait"
              value={hours}
              min={0}
              max={23}
              onChange={(v) => {
                setHours(v);
                emit({
                  mode: "wait",
                  duration: formatIsoDuration({
                    days,
                    hours: v,
                    minutes,
                    seconds,
                  }),
                });
              }}
            />
            <StepperInput
              label="Minutes"
              ariaLabel="Minutes to wait"
              value={minutes}
              min={0}
              max={59}
              onChange={(v) => {
                setMinutes(v);
                emit({
                  mode: "wait",
                  duration: formatIsoDuration({
                    days,
                    hours,
                    minutes: v,
                    seconds,
                  }),
                });
              }}
            />
            <StepperInput
              label="Seconds"
              ariaLabel="Seconds to wait"
              value={seconds}
              min={0}
              max={59}
              onChange={(v) => {
                setSeconds(v);
                emit({
                  mode: "wait",
                  duration: formatIsoDuration({
                    days,
                    hours,
                    minutes,
                    seconds: v,
                  }),
                });
              }}
            />
          </div>
          </div>
        </TabContentBody>
      </TabContent>

      <TabContent
        id="future-picker-date"
        eventKey="date"
        activeKey={tab}
        hidden={tab !== "date"}
      >
        <TabContentBody hasPadding>
          {/* Centre the calendar inside the tab so it doesn't sit
              start-aligned against the popover edge. */}
          <div
            style={{ display: "flex", justifyContent: "center" }}
          >
            <CalendarPanel
              {...(date ? { date } : {})}
              validators={[isAtLeastTomorrow]}
              onChange={(d) => {
                setDate(d);
                emit({ mode: "date", date: fmtISODate(d) });
              }}
            />
          </div>
        </TabContentBody>
      </TabContent>
    </div>
  );
}

/** Compact summary for the trigger input — "Wait PT2H30M" / "2026-06-01". */
function describe(value: FuturePickerValue | null): string {
  if (!value) return "";
  if (value.mode === "wait") return `Wait ${value.duration ?? "PT0M"}`;
  return value.date ?? "";
}

/**
 * Public component — TextInput + calendar-button trigger that opens a
 * Popover containing the `FuturePickerPanel` tabs. Matches the PF6
 * DatePicker UX (https://www.patternfly.org/components/date-and-time/date-picker):
 * the user reads / edits via a familiar form-control input and the
 * "scheduler" widget lives behind a small calendar icon.
 *
 * The Popover handles outside-click and Escape close natively.
 */
// Local to the story — not exported, otherwise Storybook would
// auto-pick it up as a second story alongside Overview.
function FuturePicker({ onChange }: FuturePickerProps) {
  const [value, setValue] = useState<FuturePickerValue | null>(null);
  const isMobile = useMobileViewport();
  const [sheetOpen, setSheetOpen] = useState(false);
  const handlePanelChange = (next: FuturePickerValue) => {
    setValue(next);
    onChange?.(next);
  };

  // Desktop panel — locked-size box so the popover doesn't resize
  // when the user flips between Wait and Specific date tabs. Fixed
  // block-size (not just min) so the shorter tab can't render at a
  // different height than the taller one.
  const desktopPanel = (
    <div
      style={{
        inlineSize: "24rem",
        maxInlineSize: "24rem",
        blockSize: "28rem",
        minBlockSize: "28rem",
      }}
    >
      <FuturePickerPanel onChange={handlePanelChange} />
    </div>
  );

  // Mobile panel — fills the bottom-sheet body and pulls the Tabs
  // strip UP into the same row as the close button so the user sees
  // their tab choices immediately at sheet open (without the 4rem of
  // breathing room the calendar sheet body reserves for its day
  // grid). Negative margin counter-acts the body's padding-block-start
  // so the Tabs sit right under the sheet's top edge, beside the
  // pill close button. Inline-end margin keeps the Tabs clear of the
  // close button's 44px hit area.
  const mobilePanel = (
    <div
      style={{
        inlineSize: "100%",
        marginBlockStart: "calc(var(--gp-pad-popover, 1rem) * -1.5)",
        marginInlineEnd: "3.5rem",
        // Fixed block-size (NOT just `min-block-size`) so both tabs
        // share the exact same dialog height — `min` would only floor
        // and let the taller tab inflate the dialog while the other
        // tab leaves it shorter. 38rem comfortably exceeds the natural
        // heights of both Wait (steppers + paragraph) and Specific
        // date (CalendarPanel) at mobile container-query cell sizes.
        blockSize: "30rem",
        minBlockSize: "30rem",
      }}
    >
      <FuturePickerPanel onChange={handlePanelChange} />
    </div>
  );

  const triggerStyle = {
    borderRadius:
      "var(--gp-radius-control, var(--pf-v6-c-button--BorderRadius))",
    aspectRatio: "1",
    paddingInline: 0,
  } as const;

  return (
    <>
      <InputGroup style={{ maxWidth: 320 }}>
        <InputGroupItem isFill>
          <TextInput
            id="future-picker-input"
            value={describe(value)}
            onChange={() => undefined}
            aria-label="Selected future schedule"
            placeholder="Pick a wait or date"
            readOnly
          />
        </InputGroupItem>
        <InputGroupItem>
          {isMobile ? (
            <Button
              variant={ButtonVariant.tertiary}
              aria-label="Open future picker"
              icon={<CalendarAltIcon />}
              onClick={() => setSheetOpen(true)}
              style={triggerStyle}
            />
          ) : (
            <Popover
              headerContent="Schedule"
              bodyContent={desktopPanel}
              hasAutoWidth
              showClose={false}
              position="bottom-end"
              flipBehavior={[
                "bottom-end",
                "bottom",
                "bottom-start",
                "top-end",
                "top",
                "top-start",
              ]}
              distance={8}
              appendTo={() => document.body}
            >
              <Button
                variant={ButtonVariant.tertiary}
                aria-label="Open future picker"
                icon={<CalendarAltIcon />}
                style={triggerStyle}
              />
            </Popover>
          )}
        </InputGroupItem>
      </InputGroup>
      {isMobile && (
        <BottomSheet
          open={sheetOpen}
          onClose={() => setSheetOpen(false)}
          ariaLabel="Schedule"
        >
          {mobilePanel}
        </BottomSheet>
      )}
    </>
  );
}

// ---------- Story ----------

export const Overview: StoryObj = {
  render: () => {
    const [last, setLast] = useState<FuturePickerValue | null>(null);
    return (
      <FoundationPage
        title="Future Picker"
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
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <DemoFrame>
                <div style={{ display: "grid", gap: 16 }}>
                  <FuturePicker onChange={setLast} />
                  <pre
                    style={{
                      margin: 0,
                      padding: 12,
                      background: "var(--gp-color-bg-secondary-default)",
                      borderRadius: 6,
                      fontSize: 13,
                      color: "var(--gp-color-text-regular)",
                    }}
                    aria-live="polite"
                  >
                    {last
                      ? JSON.stringify(last, null, 2)
                      : "// onChange payload appears here"}
                  </pre>
                </div>
              </DemoFrame>
              <CodeBlock>{`function ScheduleStep() {
  const [value, setValue] = useState<FuturePickerValue | null>(null);

  // FuturePicker renders an InputGroup (TextInput + calendar Button)
  // and pops a Popover with two tabs:
  //   Wait          — days / hours / minutes → ISO-8601 duration
  //   Specific date — inline CalendarMonth (today + earlier disabled)
  return (
    <FuturePicker onChange={setValue} />
    /* value is one of:
     *   { mode: "wait", duration: "PT2H30M" }
     *   { mode: "wait", duration: "P1D" }
     *   { mode: "date", date: "2026-06-01" }
     */
  );
}`}</CodeBlock>
            </div>
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
    );
  },
};
