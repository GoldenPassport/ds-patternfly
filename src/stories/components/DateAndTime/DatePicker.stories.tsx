import { useEffect, useRef, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Button,
  CalendarMonth,
  DatePicker,
  FormGroup,
  HelperText,
  HelperTextItem,
  Popover,
  Popper,
} from "@patternfly/react-core";
import { CalendarAltIcon } from "@patternfly/react-icons";
import { FoundationPage, Section, Card, CodeBlock } from "../../_storyKit.js";
import { DemoFrame, PropsTable } from "../../_demoKit.js";

const meta: Meta = {
  title: "Components/Date and time/DatePicker",
  parameters: { layout: "padded" },
};
export default meta;

// ---------- Date helpers used across the page ----------

// Default display format: DD/MM/YYYY (rest-of-world convention).
// US-style is MM/DD/YYYY — switchable via the formats demo below.
const pad = (n: number) => String(n).padStart(2, "0");
const fmtDDMMYYYY = (d: Date) =>
  `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
const parseDDMMYYYY = (s: string): Date => {
  const m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!m) return new Date("invalid");
  return new Date(Number(m[3]), Number(m[2]) - 1, Number(m[1]));
};
const fmtMMDDYYYY = (d: Date) =>
  `${pad(d.getMonth() + 1)}/${pad(d.getDate())}/${d.getFullYear()}`;
const parseMMDDYYYY = (s: string): Date => {
  const m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!m) return new Date("invalid");
  return new Date(Number(m[3]), Number(m[1]) - 1, Number(m[2]));
};
const fmtISO = (d: Date) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

// French month names — illustrates i18n month-list customization.
const monthsFR = [
  "janvier",
  "février",
  "mars",
  "avril",
  "mai",
  "juin",
  "juillet",
  "août",
  "septembre",
  "octobre",
  "novembre",
  "décembre",
];

export const Overview: StoryObj = {
  render: () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [v, setV] = useState("");
    const [rangeStart, setRangeStart] = useState("");
    const [rangeEnd, setRangeEnd] = useState("");
    const [usDate, setUsDate] = useState("");
    // Custom-trigger recipe state
    const [primaryDate, setPrimaryDate] = useState<Date>(new Date());
    const [secondaryDate, setSecondaryDate] = useState<Date>(new Date());
    const [linkDate, setLinkDate] = useState<Date>(new Date());
    // Bare-popper recipe state
    const [bareDate, setBareDate] = useState<Date>(new Date());
    const [bareOpen, setBareOpen] = useState(false);
    const bareTriggerRef = useRef<HTMLButtonElement>(null);
    const barePopupRef = useRef<HTMLDivElement>(null);

    // Outside-click + Escape close the bare popup. Popover handles this
    // for free; with bare Popper we wire it ourselves.
    useEffect(() => {
      if (!bareOpen) return;
      const onMouseDown = (e: MouseEvent) => {
        const t = e.target as Node;
        if (
          !barePopupRef.current?.contains(t) &&
          !bareTriggerRef.current?.contains(t)
        ) {
          setBareOpen(false);
        }
      };
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") setBareOpen(false);
      };
      document.addEventListener("mousedown", onMouseDown);
      document.addEventListener("keydown", onKey);
      return () => {
        document.removeEventListener("mousedown", onMouseDown);
        document.removeEventListener("keydown", onKey);
      };
    }, [bareOpen]);

    return (
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
          description="Lib default. Pass dateFormat / dateParse to switch (see Formats below). Click the calendar icon to open the popover — year and month navigation use PF6's stock controls."
        >
          <Card>
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <DemoFrame>
                <FormGroup label="Due date" fieldId="due" isRequired>
                  <DatePicker
                    value={v}
                    onChange={(_, value) => setV(value)}
                    placeholder="DD/MM/YYYY"
                    dateFormat={fmtDDMMYYYY}
                    dateParse={parseDDMMYYYY}
                    aria-label="Due date"
                    buttonAriaLabel="Open date picker"
                                      appendTo={() => document.body}
/>
                </FormGroup>
              </DemoFrame>
              <CodeBlock>{`const fmt = (d: Date) =>
  \`\${pad(d.getDate())}/\${pad(d.getMonth() + 1)}/\${d.getFullYear()}\`;
const parse = (s: string): Date => {
  const m = s.match(/^(\\d{1,2})\\/(\\d{1,2})\\/(\\d{4})$/);
  return m ? new Date(+m[3], +m[2] - 1, +m[1]) : new Date("invalid");
};

<DatePicker
  value={value} onChange={(_, v) => setValue(v)}
  dateFormat={fmt} dateParse={parse}
  placeholder="DD/MM/YYYY"
  aria-label="Due date" buttonAriaLabel="Open date picker"
/>`}</CodeBlock>
              <p
                style={{
                  margin: 0,
                  color: "var(--gp-color-text-subtle)",
                  fontSize: 14,
                }}
              >
                <strong>Year navigation in the popover:</strong> PF6&apos;s
                calendar uses a native <code>&lt;input type=&quot;number&quot;&gt;</code>{" "}
                for the year — browser-default up/down spinners. To use the
                lib&apos;s compact stepper UX for year navigation,
                see the CalendarMonth page&apos;s &quot;Inline calendar&quot;
                demo, which builds a custom header above an inline
                calendar.
              </p>
            </div>
          </Card>
        </Section>

        <Section
          title="Custom CTA — primary, outline, or arbitrary"
          description='PF6&apos;s standard DatePicker uses a fixed control-variant button to open the calendar. When the date picker is the primary action of a region (hero scheduler, empty-state CTA), use the recipe below — a styled Button + Popover + CalendarMonth combination. Pick any Button variant or arbitrary chrome.'
        >
          <Card>
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <DemoFrame>
                <div
                  style={{
                    display: "flex",
                    gap: 16,
                    flexWrap: "wrap",
                    alignItems: "center",
                  }}
                >
                  {/* Primary — strongest CTA. hasAutoWidth lets the Popover
                      shrink-wrap the calendar's natural width. */}
                  <div>
                    <Popover
                      headerContent="Pick a date"
                      bodyContent={
                        <CalendarMonth
                          date={primaryDate}
                          onChange={(_, d) => setPrimaryDate(d)}
                        />
                      }
                      hasAutoWidth
                      appendTo={() => document.body}
                    >
                      <Button variant="primary" icon={<CalendarAltIcon />}>
                        Schedule
                      </Button>
                    </Popover>
                    <div
                      style={{
                        marginTop: 8,
                        fontSize: 14,
                        color: "var(--gp-color-text-subtle)",
                      }}
                    >
                      {primaryDate.toLocaleDateString()}
                    </div>
                  </div>

                  {/* Secondary / outline. Drop headerContent for slimmer chrome. */}
                  <div>
                    <Popover
                      bodyContent={
                        <CalendarMonth
                          date={secondaryDate}
                          onChange={(_, d) => setSecondaryDate(d)}
                        />
                      }
                      hasAutoWidth
                      appendTo={() => document.body}
                    >
                      <Button variant="secondary" icon={<CalendarAltIcon />}>
                        Choose date
                      </Button>
                    </Popover>
                    <div
                      style={{
                        marginTop: 8,
                        fontSize: 14,
                        color: "var(--gp-color-text-subtle)",
                      }}
                    >
                      {secondaryDate.toLocaleDateString()}
                    </div>
                  </div>

                  {/* Link / inline. */}
                  <div>
                    <Popover
                      bodyContent={
                        <CalendarMonth
                          date={linkDate}
                          onChange={(_, d) => setLinkDate(d)}
                        />
                      }
                      hasAutoWidth
                      appendTo={() => document.body}
                    >
                      <Button variant="link" icon={<CalendarAltIcon />}>
                        Set deadline
                      </Button>
                    </Popover>
                    <div
                      style={{
                        marginTop: 8,
                        fontSize: 14,
                        color: "var(--gp-color-text-subtle)",
                      }}
                    >
                      {linkDate.toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </DemoFrame>
              <CodeBlock>{`// With Popover chrome — any Button variant + Popover + CalendarMonth.
// hasAutoWidth tells the Popover to shrink-wrap the calendar's
// natural width (without it, the popover's default minWidth clamps
// the content and the calendar can overflow).

import { Button, CalendarMonth, Popover } from "@patternfly/react-core";
import { CalendarAltIcon } from "@patternfly/react-icons";

<Popover
  bodyContent={<CalendarMonth date={date} onChange={(_, d) => setDate(d)} />}
  hasAutoWidth                       // ← shrink-wrap to the calendar
  appendTo={() => document.body}     // escape any parent overflow
>
  <Button variant="primary" icon={<CalendarAltIcon />}>Schedule</Button>
</Popover>`}</CodeBlock>
              <p
                style={{
                  margin: 0,
                  color: "var(--gp-color-text-subtle)",
                  fontSize: 14,
                }}
              >
                <strong>Two configuration knobs:</strong>{" "}
                <code>hasAutoWidth</code> shrink-wraps the popover to its
                content (without it, PF6&apos;s default <code>minWidth</code>{" "}
                can clip the calendar);{" "}
                <code>hasNoPadding</code> drops the popover&apos;s inner
                padding for a tighter fit when the content already has its
                own padding. Drop <code>headerContent</code> entirely for
                a slimmer chrome.
              </p>
            </div>
          </Card>
        </Section>

        <Section
          title="Custom CTA — bare popup (no Popover chrome)"
          description='When the calendar should appear as a self-contained popup with no extra chrome above, use PF6&apos;s low-level Popper positioner instead of Popover. The lib ships a `gp-calendar-popup` class that adds brand-themed border / radius / shadow / bg so the bare CalendarMonth still reads as a contained surface.'
        >
          <Card>
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <DemoFrame>
                <div>
                  <Button
                    ref={bareTriggerRef}
                    variant="primary"
                    icon={<CalendarAltIcon />}
                    onClick={() => setBareOpen((o) => !o)}
                    aria-expanded={bareOpen}
                    aria-haspopup="dialog"
                  >
                    Pick a date
                  </Button>
                  <Popper
                    trigger={null}
                    triggerRef={bareTriggerRef}
                    isVisible={bareOpen}
                    appendTo={() => document.body}
                    popper={
                      <div
                        ref={barePopupRef}
                        className="gp-calendar-popup"
                        role="dialog"
                        aria-label="Pick a date"
                      >
                        <CalendarMonth
                          date={bareDate}
                          onChange={(_, d) => {
                            setBareDate(d);
                            setBareOpen(false);
                          }}
                        />
                      </div>
                    }
                  />
                  <div
                    style={{
                      marginTop: 8,
                      fontSize: 14,
                      color: "var(--gp-color-text-subtle)",
                    }}
                  >
                    {bareDate.toLocaleDateString()}
                  </div>
                </div>
              </DemoFrame>
              <CodeBlock>{`// Without Popover chrome — bare Popper + CalendarMonth wrapped
// in the lib's gp-calendar-popup class for surface treatment
// (border, radius, shadow, brand-elevated bg). Outside-click +
// Escape closing wired manually since we're not using Popover.

import { Button, CalendarMonth, Popper } from "@patternfly/react-core";

const [open, setOpen] = useState(false);
const triggerRef = useRef<HTMLButtonElement>(null);
const popupRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  if (!open) return;
  const onMouseDown = (e: MouseEvent) => {
    const t = e.target as Node;
    if (!popupRef.current?.contains(t) && !triggerRef.current?.contains(t)) {
      setOpen(false);
    }
  };
  const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
  document.addEventListener("mousedown", onMouseDown);
  document.addEventListener("keydown", onKey);
  return () => {
    document.removeEventListener("mousedown", onMouseDown);
    document.removeEventListener("keydown", onKey);
  };
}, [open]);

<Button ref={triggerRef} variant="primary"
  onClick={() => setOpen(o => !o)}
  aria-expanded={open} aria-haspopup="dialog">
  Pick a date
</Button>
<Popper
  trigger={null}
  triggerRef={triggerRef}
  isVisible={open}
  appendTo={() => document.body}
  popper={
    <div ref={popupRef} className="gp-calendar-popup"
      role="dialog" aria-label="Pick a date">
      <CalendarMonth date={date} onChange={(_, d) => { setDate(d); setOpen(false); }} />
    </div>
  }
/>`}</CodeBlock>
              <p
                style={{
                  margin: 0,
                  color: "var(--gp-color-text-subtle)",
                  fontSize: 14,
                }}
              >
                <strong>Trade-off vs the chromed Popover:</strong> bare
                popup gives you full control over surface styling (the lib
                provides <code>gp-calendar-popup</code> as a sensible
                default — override or replace). Cost: outside-click +
                Escape close behaviour you wire manually. Use this for
                hero schedulers / dashboard date pickers where the
                Popover&apos;s arrow + close-button chrome would feel
                redundant.
              </p>
            </div>
          </Card>
        </Section>

        <Section
          title="Format variants"
          description="Same component, three regional conventions — pick the dateFormat / dateParse pair that matches your locale."
        >
          <Card>
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <DemoFrame>
                <div style={{ display: "grid", gap: 12 }}>
                  <FormGroup label="US — MM/DD/YYYY" fieldId="us">
                    <DatePicker
                      value={usDate}
                      onChange={(_, value) => setUsDate(value)}
                      dateFormat={fmtMMDDYYYY}
                      dateParse={parseMMDDYYYY}
                      placeholder="MM/DD/YYYY"
                      aria-label="US format date"
                      buttonAriaLabel="Open date picker"
                                          appendTo={() => document.body}
/>
                  </FormGroup>
                  <FormGroup label="ISO — YYYY-MM-DD" fieldId="iso">
                    <DatePicker
                      dateFormat={fmtISO}
                      placeholder="YYYY-MM-DD"
                      aria-label="ISO format date"
                      buttonAriaLabel="Open date picker"
                                          appendTo={() => document.body}
/>
                  </FormGroup>
                </div>
              </DemoFrame>
            </div>
          </Card>
        </Section>

        <Section
          title="Min / max — disabled dates"
          description='Restrict the selectable range. Validators return an empty string for valid dates and an error message for invalid ones — surfaced on the calendar (cells disabled) and on the input. Mirrors PF6&apos;s "min and max date" example.'
        >
          <Card>
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <DemoFrame>
                <FormGroup
                  label="Booking — today through 30 days out"
                  fieldId="booking"
                  isRequired
                >
                  <DatePicker
                    dateFormat={fmtDDMMYYYY}
                    dateParse={parseDDMMYYYY}
                    placeholder="DD/MM/YYYY"
                    aria-label="Booking date"
                    buttonAriaLabel="Open date picker"
                    validators={[
                      (date) =>
                        date < today
                          ? "Date is in the past"
                          : date.getTime() >
                              today.getTime() + 30 * 24 * 60 * 60 * 1000
                            ? "Date is more than 30 days out"
                            : "",
                    ]}
                                      appendTo={() => document.body}
/>
                </FormGroup>
              </DemoFrame>
              <CodeBlock>{`const today = new Date();
today.setHours(0, 0, 0, 0);
const maxDate = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);

<DatePicker
  validators={[
    (d) =>
      d < today           ? "Date is in the past" :
      d > maxDate         ? "Date is more than 30 days out" :
      "",
  ]}
  ...
/>`}</CodeBlock>
              <p
                style={{
                  margin: 0,
                  color: "var(--gp-color-text-subtle)",
                  fontSize: 14,
                }}
              >
                Each validator runs on every calendar cell. Cells whose
                validator returns a non-empty string render as disabled and
                are unselectable. The first error string also surfaces under
                the input when the user types an invalid date manually.
              </p>
            </div>
          </Card>
        </Section>

        <Section
          title="Excluded dates — holidays / OOO"
          description='Pass an array of YYYY-MM-DD strings (or Date objects) and a single validator that checks set membership. Common use cases: public holidays, blackout windows, scheduled out-of-office days. Excluded dates render as disabled in the calendar AND fail input validation if typed manually.'
        >
          <Card>
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <DemoFrame>
                <FormGroup
                  label="Available booking dates"
                  fieldId="excluded"
                  isRequired
                >
                  <DatePicker
                    dateFormat={fmtDDMMYYYY}
                    dateParse={parseDDMMYYYY}
                    placeholder="DD/MM/YYYY"
                    aria-label="Booking date (excluded list)"
                    buttonAriaLabel="Open date picker"
                    appendTo={() => document.body}
                    validators={[
                      // Set-membership check on YYYY-MM-DD strings — O(1)
                      // per cell, fast on large lists. Add as many entries
                      // as needed for holidays, blackout days, OOO ranges.
                      (date) => {
                        const excluded = new Set([
                          "2026-01-01", // New Year's Day
                          "2026-01-26", // OOO
                          "2026-04-03", // Good Friday
                          "2026-04-06", // Easter Monday
                          "2026-12-25", // Christmas Day
                          "2026-12-26", // Boxing Day
                        ]);
                        const iso = `${date.getFullYear()}-${pad(
                          date.getMonth() + 1,
                        )}-${pad(date.getDate())}`;
                        return excluded.has(iso) ? "Unavailable" : "";
                      },
                    ]}
                  />
                </FormGroup>
              </DemoFrame>
              <CodeBlock>{`// Define the excluded list once — outside render to avoid re-creation.
const excludedDates = new Set([
  "2026-01-01",   // New Year's Day
  "2026-01-26",   // OOO
  "2026-04-03",   // Good Friday
  "2026-04-06",   // Easter Monday
  "2026-12-25",   // Christmas Day
  "2026-12-26",   // Boxing Day
]);

const isExcluded = (date: Date): boolean => {
  const iso = \`\${date.getFullYear()}-\${pad(date.getMonth() + 1)}-\${pad(date.getDate())}\`;
  return excludedDates.has(iso);
};

<DatePicker
  validators={[
    (date) => isExcluded(date) ? "Unavailable" : "",
  ]}
  ...
/>`}</CodeBlock>
              <p
                style={{
                  margin: 0,
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
            </div>
          </Card>
        </Section>

        <Section
          title="Date range"
          description='Two paired DatePickers — start + end. The end picker disables anything before the start. Same pattern as PF6&apos;s "Date and time range picker" example.'
        >
          <Card>
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <DemoFrame>
                <FormGroup label="Trip dates" fieldId="trip" isRequired>
                  <div
                    style={{
                      display: "flex",
                      gap: 12,
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    <DatePicker
                      value={rangeStart}
                      onChange={(_, value) => setRangeStart(value)}
                      dateFormat={fmtDDMMYYYY}
                      dateParse={parseDDMMYYYY}
                      placeholder="From"
                      aria-label="Trip start date"
                      buttonAriaLabel="Open start date picker"
                                          appendTo={() => document.body}
/>
                    <span
                      style={{
                        color: "var(--gp-color-text-subtle)",
                        fontFamily: "var(--gp-font-family)",
                      }}
                    >
                      to
                    </span>
                    <DatePicker
                      value={rangeEnd}
                      onChange={(_, value) => setRangeEnd(value)}
                      dateFormat={fmtDDMMYYYY}
                      dateParse={parseDDMMYYYY}
                      placeholder="To"
                      aria-label="Trip end date"
                      buttonAriaLabel="Open end date picker"
                      validators={[
                        (date) => {
                          if (!rangeStart) return "";
                          const start = parseDDMMYYYY(rangeStart);
                          if (Number.isNaN(start.getTime())) return "";
                          return date < start ? "End must be after start" : "";
                        },
                      ]}
                      // Pass the start as `rangeStart` so PF6 highlights
                      // the calendar span between start and the cell
                      // hovered/selected on the end picker.
                      {...(rangeStart && !Number.isNaN(parseDDMMYYYY(rangeStart).getTime())
                        ? { rangeStart: parseDDMMYYYY(rangeStart) }
                        : {})}
                                          appendTo={() => document.body}
/>
                  </div>
                </FormGroup>
              </DemoFrame>
              <CodeBlock>{`<div style={{ display: "flex", gap: 12, alignItems: "center" }}>
  <DatePicker
    value={start} onChange={(_, v) => setStart(v)}
    dateFormat={fmt} dateParse={parse}
    aria-label="Trip start" buttonAriaLabel="Open start date picker"
  />
  <span>to</span>
  <DatePicker
    value={end} onChange={(_, v) => setEnd(v)}
    dateFormat={fmt} dateParse={parse}
    aria-label="Trip end" buttonAriaLabel="Open end date picker"
    validators={[(d) => d < parse(start) ? "End must be after start" : ""]}
    rangeStart={parse(start)}   // calendar highlights the span
  />
</div>`}</CodeBlock>
            </div>
          </Card>
        </Section>

        <Section
          title="i18n — custom month / weekday names"
          description='monthFormat and weekdayFormat are functions — return a localized string and the calendar shows it. The calendar also accepts a `locale` BCP47 string for browser-driven defaults.'
        >
          <Card>
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <DemoFrame>
                <FormGroup label="Date — French month names" fieldId="fr">
                  <DatePicker
                    dateFormat={fmtDDMMYYYY}
                    dateParse={parseDDMMYYYY}
                    placeholder="JJ/MM/AAAA"
                    aria-label="Date (français)"
                    buttonAriaLabel="Ouvrir le sélecteur de date"
                    monthFormat={(d) => monthsFR[d.getMonth()] ?? ""}
                    locale="fr-FR"
                    prevMonthAriaLabel="Mois précédent"
                    nextMonthAriaLabel="Mois suivant"
                    invalidFormatText="Format invalide. Utiliser JJ/MM/AAAA."
                                      appendTo={() => document.body}
/>
                </FormGroup>
              </DemoFrame>
              <CodeBlock>{`const monthsFR = ["janvier","février","mars",...,"décembre"];

<DatePicker
  dateFormat={fmt}
  monthFormat={(d) => monthsFR[d.getMonth()]}
  locale="fr-FR"
  prevMonthAriaLabel="Mois précédent"
  nextMonthAriaLabel="Mois suivant"
  invalidFormatText="Format invalide. Utiliser JJ/MM/AAAA."
  buttonAriaLabel="Ouvrir le sélecteur de date"
  ...
/>`}</CodeBlock>
            </div>
          </Card>
        </Section>

        <Section
          title="Popover escape — appendTo"
          description="When the DatePicker sits inside a Card, Modal, or any container with overflow constraints, the calendar popover can be clipped. Pass appendTo to portal it to a higher container (or document.body) so it renders unconstrained and stays viewport-aware."
        >
          <Card>
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <DemoFrame>
                <FormGroup label="Date — popover escapes the card" fieldId="escape">
                  <DatePicker
                    dateFormat={fmtDDMMYYYY}
                    dateParse={parseDDMMYYYY}
                    placeholder="DD/MM/YYYY"
                    aria-label="Escape demo"
                    buttonAriaLabel="Open date picker"
                    appendTo={() => document.body}
                  />
                </FormGroup>
              </DemoFrame>
              <CodeBlock>{`<DatePicker
  appendTo={() => document.body}    // popover renders at body
  ...
/>`}</CodeBlock>
              <p
                style={{
                  margin: 0,
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
            </div>
          </Card>
        </Section>

        <Section
          title="With validation"
          description="Validators feed into both the calendar (disabled cells) and the input (helper text)."
        >
          <Card>
            <div style={{ padding: 24 }}>
              <DemoFrame>
                <FormGroup label="Future date only" fieldId="future">
                  <DatePicker
                    value={v}
                    onChange={(_, value) => setV(value)}
                    dateFormat={fmtDDMMYYYY}
                    dateParse={parseDDMMYYYY}
                    placeholder="DD/MM/YYYY"
                    validators={[
                      (date) =>
                        date < today ? "Must be in the future" : "",
                    ]}
                    aria-label="Future date"
                    buttonAriaLabel="Open date picker"
                                      appendTo={() => document.body}
/>
                  <HelperText>
                    <HelperTextItem>
                      Past dates are disabled in the calendar and rejected
                      on the input.
                    </HelperTextItem>
                  </HelperText>
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
            </div>
          </Card>
        </Section>

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
    );
  },
};
