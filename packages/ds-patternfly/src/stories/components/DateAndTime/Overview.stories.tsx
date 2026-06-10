import type { Meta, StoryObj } from "@storybook/react-vite";
import { FoundationPage, Section, Card, CodeBlock } from "../../_kit/StoryKit.js";

const meta: Meta = {
  title: "Components/Forms/Date and time",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="About date and time"
      intro={
        <>
          The Date and time section collects every control for picking a
          moment — single dates, paired date + time, ranges, time-only,
          and relative waits. They all share the same{" "}
          <strong>lib calendar primitives</strong> in{" "}
          <code>_libcal.tsx</code> (CalendarPanel, CalendarPopout,
          BottomSheet, useMobileViewport, year stepper helpers) so the
          look, navigation, validators, and locale behaviour are
          identical across DatePicker, DateTimePicker, FuturePicker, and
          the standalone CalendarMonth.
        </>
      }
    >
      <Section
        title="The five controls"
        description="Five primitives covering every date-and-time picking pattern. They share the same lib calendar + brand-dial styling — picking the right one is about UX shape, not visual consistency."
      >
        <Card>
          <ul
            style={{
              margin: 0,
              padding: "16px 24px 16px 40px",
              color: "var(--gp-color-text-regular)",
              lineHeight: 1.8,
            }}
          >
            <li>
              <strong>CalendarMonth</strong> — always-visible inline
              grid. Scheduling sidebars, range builders, dashboards
              where the calendar is part of the layout (not a popover).
            </li>
            <li>
              <strong>DatePicker</strong> — text input + popover
              calendar. The default form-shaped control for single
              dates; users can type or pick.
            </li>
            <li>
              <strong>TimePicker</strong> — time-only input with
              hour/minute selection. Use alongside a DatePicker for
              paired entry, or alone for purely-temporal values like
              "open daily at…".
            </li>
            <li>
              <strong>DateTimePicker</strong> — paired
              DatePicker&nbsp;+&nbsp;TimePicker under one FormGroup.
              The recipe for "when should this happen" — date and time
              read as one decision but stay independently editable.
            </li>
            <li>
              <strong>FuturePicker</strong> — tabbed Schedule popover
              with two modes: <em>Wait</em> (days / hours / minutes /
              seconds → ISO-8601 duration) and <em>Specific date</em>{" "}
              (calendar). For automations and triggers that fire after
              a relative interval or at a fixed moment.
            </li>
          </ul>
        </Card>
      </Section>

      <Section
        title="Three surface patterns — inline, popover, modal"
        description="Same calendar grid, three host surfaces. Pick by how much commitment the action carries and how much of the page the user should be focused on while picking."
      >
        <Card>
          <ul
            style={{
              margin: 0,
              padding: "16px 24px 16px 40px",
              color: "var(--gp-color-text-regular)",
              lineHeight: 1.8,
            }}
          >
            <li>
              <strong>Inline (CalendarMonth)</strong> — the calendar is
              part of the page. No commit step; selection writes back
              the moment a date is clicked. Best for browse-style flows
              (filter sidebars, range builders, dashboards) where the
              calendar is a continuous control, not a transient action.
            </li>
            <li>
              <strong>Popover (DatePicker / DateTimePicker /
              FuturePicker)</strong> — calendar floats over the page
              from the trigger. Lightweight commit (close = persist),
              tap-outside to dismiss. Best for forms where the date is
              one of many fields the user is fluidly editing — feels
              like an inline edit, not a deliberate dialog.
            </li>
            <li>
              <strong>Modal (CalendarMonth → Modal recipe)</strong> —
              calendar in a centered dialog with an explicit
              Apply&nbsp;/&nbsp;Cancel footer. Page is dimmed, focus
              trapped. Best when picking the date is a deliberate
              decision in a wizard step, a confirmation flow, or
              anywhere you want the user to consciously stop and
              choose.
            </li>
          </ul>
          <div style={{ padding: "0 24px 24px" }}>
            <CodeBlock>{`// Inline — write-on-pick.
<CalendarPanel date={date} onChange={setDate} />

// Popover — opens on trigger, closes on outside-tap, writes on pick.
<LibDatePicker value={date} onChange={setDate}
  ariaLabel="Due date" buttonAriaLabel="Open date picker" />

// Modal — explicit Apply / Cancel commit step.
<Modal isOpen={open} onClose={() => setOpen(false)}>
  <ModalHeader title="Pick a date" />
  <ModalBody><CalendarPanel date={draft} onChange={setDraft} /></ModalBody>
  <ModalFooter>
    <Button variant="primary" onClick={() => { setDate(draft); setOpen(false); }}>Apply</Button>
    <Button variant="link" onClick={() => setOpen(false)}>Cancel</Button>
  </ModalFooter>
</Modal>`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section
        title="Mobile behaviour"
        description={
          <>
            Below the <code>md</code> breakpoint (≈ 767 px), every
            popover-shaped picker — DatePicker, DateTimePicker, and
            FuturePicker — swaps its popover for a native{" "}
            <code>&lt;dialog&gt;</code> bottom sheet. One mental model
            (sheet on mobile, popover on desktop) for the whole
            date-and-time family avoids surprises as users move
            between viewports.
          </>
        }
      >
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <ul
              style={{
                margin: 0,
                padding: "16px 24px 16px 40px",
                color: "var(--gp-color-text-regular)",
                lineHeight: 1.8,
              }}
            >
              <li>
                <strong>Trigger</strong> — the input + calendar-button
                pair stays the same; tapping the button opens the
                bottom sheet instead of the popover.
              </li>
              <li>
                <strong>Surface</strong> — a full-width{" "}
                <code>.gp-bottom-sheet</code> anchored to the viewport
                bottom. Backdrop dims the page, body scroll is locked
                while open, an X close button sits top-right.
              </li>
              <li>
                <strong>Calendar</strong> — same{" "}
                <code>CalendarPanel</code> as desktop. Day buttons
                shrink via container queries so all 7 columns fit on
                narrow phones (down to ~31 × 31&nbsp;px on a 375&nbsp;px
                viewport); switching between days&nbsp;/&nbsp;months&nbsp;/&nbsp;years
                views works identically.
              </li>
              <li>
                <strong>Commit</strong> — picking a date closes the
                sheet and writes back to the input. Tapping outside,
                the X button, or pressing <kbd>Esc</kbd> dismisses
                without committing.
              </li>
              <li>
                <strong>Animation</strong> — slide-up via{" "}
                <code>@starting-style</code> +{" "}
                <code>transition-behavior: allow-discrete</code>,
                matched on dismiss with a slide-down. Respects{" "}
                <code>prefers-reduced-motion</code>.
              </li>
              <li>
                <strong>Detection</strong> — driven by{" "}
                <code>useMobileViewport()</code> in{" "}
                <code>_libcal.tsx</code>, which subscribes to a{" "}
                <code>matchMedia(&quot;(max-width: 47.98rem)&quot;)</code>{" "}
                query. Hot-swaps between popover and sheet as the
                viewport crosses the breakpoint, no remount.
              </li>
              <li>
                <strong>FuturePicker exception</strong> — its Schedule
                popover (Wait / Specific date tabs) becomes a tabbed
                bottom sheet at the same breakpoint. The tabs stay at
                the top of the sheet so the user sees their choices
                immediately on open.
              </li>
            </ul>
            <CodeBlock>{`// Same prop API on both surfaces — the lib hook picks the right one.
import { LibDatePicker, useMobileViewport } from "./_libcal";

<LibDatePicker
  value={value} onChange={setValue}
  ariaLabel="Due date" buttonAriaLabel="Open date picker"
  // Validators / range / locale all carry through to the bottom-sheet
  // calendar — no mobile-specific config needed.
  {...(validators ? { validators } : {})}
/>

// Or detect manually for custom surfaces:
const isMobile = useMobileViewport();
`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section
        title="Shared lib primitives"
        description="Everything in this section is composed from a small set of helpers in _libcal.tsx. If you're building a new date-shaped control, reach for these before re-implementing."
      >
        <Card>
          <ul
            style={{
              margin: 0,
              padding: "16px 24px 16px 40px",
              color: "var(--gp-color-text-regular)",
              lineHeight: 1.8,
            }}
          >
            <li>
              <strong>CalendarPanel</strong> — the lib calendar grid.
              Three-view (days&nbsp;/&nbsp;months&nbsp;/&nbsp;years),
              brand-styled, validators-aware. Click the header label to
              cycle views. Drop it into any container.
            </li>
            <li>
              <strong>CalendarPopout</strong> — wraps a trigger element
              with the correct surface for the viewport: Popover on
              desktop, BottomSheet on mobile. Same prop API on both.
            </li>
            <li>
              <strong>LibDatePicker</strong> — the full DatePicker
              recipe (TextInput + trigger button + CalendarPopout).
              Used by DatePicker, DateTimePicker, and FuturePicker's
              Specific date tab.
            </li>
            <li>
              <strong>BottomSheet</strong> — native{" "}
              <code>&lt;dialog&gt;</code> wrapper with brand
              styling and animation. Reuse for any mobile sheet, not
              just calendars.
            </li>
            <li>
              <strong>useMobileViewport()</strong> — hook that returns{" "}
              <code>true</code> below the md breakpoint. Subscribes to{" "}
              <code>matchMedia</code> so it updates live as the viewport
              resizes (no remount needed).
            </li>
            <li>
              <strong>fmtDDMMYYYY / parseDDMMYYYY / pad</strong> —
              shared date-format helpers. The lib defaults to DD/MM/YYYY
              (rest-of-world); US-style and ISO are one-prop swaps.
            </li>
          </ul>
        </Card>
      </Section>

      <Section
        title="What stays consistent across the family"
        description="The things you get for free by using these controls instead of rolling your own."
      >
        <Card>
          <ul
            style={{
              margin: 0,
              padding: "16px 24px 16px 40px",
              color: "var(--gp-color-text-regular)",
              lineHeight: 1.8,
            }}
          >
            <li>
              <strong>Field height</strong> — every input is 36 px tall
              (driven by <code>--gp-control-pad-y</code>), matching every
              other form control in the system. Inputs and adjacent
              buttons line up.
            </li>
            <li>
              <strong>Calendar grid</strong> — 7 × 6 grid, brand-styled,
              today highlight as a ring (no fill), weekend tint on Sun
              + Sat, selected as filled circle.
            </li>
            <li>
              <strong>Header navigation</strong> — single
              &quot;&lt;&nbsp;Month Year&nbsp;&gt;&quot; label between
              arrows; clicking the label cycles days → months → years
              → months for quick decade jumps.
            </li>
            <li>
              <strong>Validators</strong> — pass{" "}
              <code>(Date) =&gt; boolean</code> functions; disabled
              cells are reflected in the grid, the nav arrows, and the
              text input. Same prop shape across DatePicker /
              FuturePicker / range pickers.
            </li>
            <li>
              <strong>Locale</strong> — single <code>locale</code> prop
              (BCP&nbsp;47, e.g. &quot;en-GB&quot;, &quot;ja-JP&quot;)
              drives weekday names, first-day-of-week, and month names
              in every picker.
            </li>
            <li>
              <strong>Focus rings + dark mode</strong> — flow through
              from the brand dials (<code>--gp-focus-ring</code>,{" "}
              <code>--gp-color-bg-*</code>). No per-component config.
            </li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
