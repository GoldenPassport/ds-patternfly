import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Button,
  ButtonVariant,
  CalendarMonth,
  HelperText,
  HelperTextItem,
  InputGroup,
  InputGroupItem,
  NumberInput,
  Popover,
  Tab,
  TabContent,
  TabContentBody,
  TabTitleText,
  Tabs,
  TextInput,
} from "@patternfly/react-core";
import { CalendarAltIcon, CaretDownIcon, CaretUpIcon } from "@patternfly/react-icons";
import { FoundationPage, Section, Card, CodeBlock } from "../../_storyKit.js";
import { DemoFrame, PropsTable } from "../../_demoKit.js";

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
//   { days: 0, hours: 2, minutes: 30 } → "PT2H30M"
//   { days: 1, hours: 0, minutes: 0  } → "P1D"
//   { days: 1, hours: 4, minutes: 0  } → "P1DT4H"
function formatIsoDuration({
  days,
  hours,
  minutes,
}: {
  days: number;
  hours: number;
  minutes: number;
}): string {
  if (!days && !hours && !minutes) return "PT0M";
  const datePart = days > 0 ? `${days}D` : "";
  const timeParts =
    (hours > 0 ? `${hours}H` : "") + (minutes > 0 ? `${minutes}M` : "");
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

/**
 * PF6 CalendarMonth renders the year as a bare `<TextInput type="number">`
 * (no render-prop, no slot). To switch the year selector to the
 * internal-stepper layout from NumberInput.stories (the
 * `gp-stepper-stack` / `gp-stepper-btn` recipe) we:
 *
 *   1. Find the year wrapper after CalendarMonth mounts.
 *   2. Portal a stack of two caret buttons into that wrapper.
 *   3. On click, mutate the input value via the native value-setter
 *      and dispatch an `input` event so CalendarMonth's controlled
 *      state updates. PF6 only commits the change once the string
 *      length is 4 digits, so we always write a 4-digit year.
 */
function useYearInternalStepper(scope: React.RefObject<HTMLDivElement | null>) {
  // Portal target is the FormControl span — the bordered frame around
  // the year input, equivalent to the recipe's TextInputGroup. Mounting
  // the stack inside that frame lets PF6's focus/hover ring (painted
  // via ::before / ::after on the span) wrap both controls as one.
  const [formControl, setFormControl] = useState<HTMLElement | null>(null);
  const [yearInput, setYearInput] = useState<HTMLInputElement | null>(null);

  useLayoutEffect(() => {
    if (!scope.current) return;
    let rafId = 0;
    const find = () => {
      const root = scope.current;
      if (!root) return;
      const fc = root.querySelector<HTMLElement>(
        ".pf-v6-c-calendar-month__header-year .pf-v6-c-form-control",
      );
      const input = fc?.querySelector<HTMLInputElement>('input[type="number"]') ?? null;
      if (fc && input) {
        setFormControl(fc);
        setYearInput(input);
      } else {
        rafId = requestAnimationFrame(find);
      }
    };
    rafId = requestAnimationFrame(find);
    return () => cancelAnimationFrame(rafId);
  }, [scope]);

  useEffect(() => {
    if (!formControl) return;
    const obs = new MutationObserver(() => {
      if (!document.body.contains(formControl)) {
        setFormControl(null);
        setYearInput(null);
      }
    });
    obs.observe(document.body, { childList: true, subtree: true });
    return () => obs.disconnect();
  }, [formControl]);

  const step = (delta: number) => {
    if (!yearInput) return;
    const current = Number(yearInput.value) || new Date().getFullYear();
    const next = String(current + delta).padStart(4, "0");
    const setter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      "value",
    )?.set;
    setter?.call(yearInput, next);
    yearInput.dispatchEvent(new Event("input", { bubbles: true }));
  };

  return { formControl, step };
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
  const [date, setDate] = useState<Date | undefined>();
  const dateTabRef = useRef<HTMLDivElement>(null);
  const { formControl, step } = useYearInternalStepper(dateTabRef);

  const duration = useMemo(
    () => formatIsoDuration({ days, hours, minutes }),
    [days, hours, minutes],
  );

  // Push value upstream on every change in the active tab.
  const emit = (next: FuturePickerValue) => onChange?.(next);

  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 420 }}>
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
          {/* Stack the Days / Hours / Minutes NumberInputs vertically
              so each unit sits on its own row with its label above. The
              earlier 3-column layout cramped the input + ± buttons at
              popover widths. */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1fr)",
              gap: 12,
            }}
          >
            <label style={{ display: "grid", gap: 4, fontSize: 13 }}>
              Days
              <NumberInput
                value={days}
                min={0}
                onMinus={() => {
                  const v = Math.max(0, days - 1);
                  setDays(v);
                  emit({ mode: "wait", duration: formatIsoDuration({ days: v, hours, minutes }) });
                }}
                onPlus={() => {
                  const v = days + 1;
                  setDays(v);
                  emit({ mode: "wait", duration: formatIsoDuration({ days: v, hours, minutes }) });
                }}
                onChange={(e) => {
                  const v = Math.max(0, Number((e.target as HTMLInputElement).value) || 0);
                  setDays(v);
                  emit({ mode: "wait", duration: formatIsoDuration({ days: v, hours, minutes }) });
                }}
                inputAriaLabel="Days to wait"
                minusBtnAriaLabel="Decrease days"
                plusBtnAriaLabel="Increase days"
              />
            </label>
            <label style={{ display: "grid", gap: 4, fontSize: 13 }}>
              Hours
              <NumberInput
                value={hours}
                min={0}
                max={23}
                onMinus={() => {
                  const v = Math.max(0, hours - 1);
                  setHours(v);
                  emit({ mode: "wait", duration: formatIsoDuration({ days, hours: v, minutes }) });
                }}
                onPlus={() => {
                  const v = Math.min(23, hours + 1);
                  setHours(v);
                  emit({ mode: "wait", duration: formatIsoDuration({ days, hours: v, minutes }) });
                }}
                onChange={(e) => {
                  const v = Math.max(0, Math.min(23, Number((e.target as HTMLInputElement).value) || 0));
                  setHours(v);
                  emit({ mode: "wait", duration: formatIsoDuration({ days, hours: v, minutes }) });
                }}
                inputAriaLabel="Hours to wait"
                minusBtnAriaLabel="Decrease hours"
                plusBtnAriaLabel="Increase hours"
              />
            </label>
            <label style={{ display: "grid", gap: 4, fontSize: 13 }}>
              Minutes
              <NumberInput
                value={minutes}
                min={0}
                max={59}
                onMinus={() => {
                  const v = Math.max(0, minutes - 1);
                  setMinutes(v);
                  emit({ mode: "wait", duration: formatIsoDuration({ days, hours, minutes: v }) });
                }}
                onPlus={() => {
                  const v = Math.min(59, minutes + 1);
                  setMinutes(v);
                  emit({ mode: "wait", duration: formatIsoDuration({ days, hours, minutes: v }) });
                }}
                onChange={(e) => {
                  const v = Math.max(0, Math.min(59, Number((e.target as HTMLInputElement).value) || 0));
                  setMinutes(v);
                  emit({ mode: "wait", duration: formatIsoDuration({ days, hours, minutes: v }) });
                }}
                inputAriaLabel="Minutes to wait"
                minusBtnAriaLabel="Decrease minutes"
                plusBtnAriaLabel="Increase minutes"
              />
            </label>
          </div>
          <HelperText>
            <HelperTextItem>
              ISO-8601 duration: <code>{duration}</code>
            </HelperTextItem>
          </HelperText>
        </TabContentBody>
      </TabContent>

      <TabContent
        id="future-picker-date"
        eventKey="date"
        activeKey={tab}
        hidden={tab !== "date"}
      >
        <TabContentBody hasPadding>
          <div ref={dateTabRef}>
            <CalendarMonth
              {...(date ? { date } : {})}
              validators={[isAtLeastTomorrow]}
              onChange={(_e, d) => {
                setDate(d);
                emit({ mode: "date", date: fmtISODate(d) });
              }}
            />
            {formControl &&
              createPortal(
                <div className="gp-stepper-stack gp-year-stepper">
                  <button
                    type="button"
                    aria-label="Next year"
                    className="gp-stepper-btn"
                    onClick={() => step(+1)}
                  >
                    <CaretUpIcon />
                  </button>
                  <button
                    type="button"
                    aria-label="Previous year"
                    className="gp-stepper-btn"
                    onClick={() => step(-1)}
                  >
                    <CaretDownIcon />
                  </button>
                </div>,
                formControl,
              )}
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
  const handlePanelChange = (next: FuturePickerValue) => {
    setValue(next);
    onChange?.(next);
  };

  // Lock the popover panel to the size of its tallest tab (Specific
  // date, dominated by the 6-row min-height CalendarMonth). Without
  // this, switching from Wait → Specific date jumps the popover up by
  // ~250px as PF6 Popper recomputes placement, and switching back
  // shrinks it just as abruptly. The smaller Wait tab now renders
  // with trailing blank space instead of resizing the popover.
  const panel = (
    <div style={{ minInlineSize: 320, minBlockSize: 360 }}>
      <FuturePickerPanel onChange={handlePanelChange} />
    </div>
  );

  return (
    <InputGroup style={{ maxWidth: 320 }}>
      <InputGroupItem isFill>
        <TextInput
          id="future-picker-input"
          value={describe(value)}
          aria-label="Selected future schedule"
          placeholder="Pick a wait or date"
          readOnlyVariant="plain"
        />
      </InputGroupItem>
      <InputGroupItem>
        <Popover
          headerContent="Schedule"
          bodyContent={panel}
          hasAutoWidth
          showClose={false}
          position="bottom"
        >
          <Button
            variant={ButtonVariant.control}
            aria-label="Open future picker"
            icon={<CalendarAltIcon />}
          />
        </Popover>
      </InputGroupItem>
    </InputGroup>
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
