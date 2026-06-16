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
          moment — single dates, paired date + time, future-only dates,
          time-only, and relative durations. The whole calendar engine
          (three-view navigation, responsive popover/bottom-sheet,
          validators, locale) lives inside the exported{" "}
          <code>DateField</code> and <code>TimeField</code> lego blocks, so
          the look and behaviour are identical across DatePicker,
          DateTimePicker, FuturePicker, and DurationPicker — each just
          configures the same component.
        </>
      }
    >
      <Section
        title="The five controls"
        description="Five controls covering every date-and-time picking pattern, all built from DateField / TimeField — picking the right one is about UX shape, not visual consistency."
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
              <strong>DatePicker</strong> — <code>DateField</code>: text
              input + popover calendar (or <code>display="flat"</code> for
              an always-visible inline grid, <code>"modal"</code> for a
              dialog). The default form-shaped control for single dates;
              users can type or pick.
            </li>
            <li>
              <strong>TimePicker</strong> — <code>TimeField</code>:
              time-only input with hour/minute selection. Use alongside a
              DatePicker for paired entry, or alone for purely-temporal
              values like "open daily at…".
            </li>
            <li>
              <strong>DateTimePicker</strong> — paired
              <code>DateField</code>&nbsp;+&nbsp;<code>TimeField</code> under
              one FormGroup. The recipe for "when should this happen" — date
              and time read as one decision but stay independently editable.
            </li>
            <li>
              <strong>FuturePicker</strong> — <code>DateField</code> with{" "}
              <code>futureOnly</code>: today and earlier are disabled. For
              scheduling, expiries, and "remind me on…" pickers.
            </li>
            <li>
              <strong>DurationPicker</strong> — <code>DateField</code> with{" "}
              <code>allowRelative</code> + <code>relativeMode="duration"</code>:
              a Wait tab (days / hours / minutes → ISO-8601 duration like{" "}
              <code>PT2H30M</code>) beside the calendar. For automations that
              fire after a relative interval.
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
              <strong>Inline (<code>display="flat"</code>)</strong> — the
              calendar is part of the page. No commit step; selection writes
              back the moment a date is clicked. Best for browse-style flows
              (filter sidebars, range builders, dashboards) where the
              calendar is a continuous control, not a transient action.
            </li>
            <li>
              <strong>Popover (<code>display="popover"</code>, default)</strong>{" "}
              — calendar floats over the page from the trigger. Lightweight
              commit (close = persist), tap-outside to dismiss. Best for forms
              where the date is one of many fields the user is fluidly
              editing — feels like an inline edit, not a deliberate dialog.
            </li>
            <li>
              <strong>Modal (<code>display="modal"</code>)</strong> — calendar
              in a centered dialog with an explicit Apply&nbsp;/&nbsp;Cancel
              footer. Page is dimmed, focus trapped. Best when picking the
              date is a deliberate decision in a wizard step, a confirmation
              flow, or anywhere you want the user to consciously stop and
              choose.
            </li>
          </ul>
          <div style={{ padding: "0 24px 24px" }}>
            <CodeBlock>{`// One component, three surfaces — the display prop picks the host.
<DateField display="flat"    value={date} onChange={setDate} ariaLabel="Due date" />
<DateField display="popover" value={date} onChange={setDate} ariaLabel="Due date" />
<DateField display="modal"   value={date} onChange={setDate} ariaLabel="Due date" modalTitle="Pick a date" />`}</CodeBlock>
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
                <strong>Calendar</strong> — the same three-view calendar
                as desktop. Day buttons
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
                <strong>Detection</strong> — built into{" "}
                <code>DateField</code>, which subscribes to a{" "}
                <code>matchMedia(&quot;(max-width: 47.98rem)&quot;)</code>{" "}
                query and hot-swaps between popover and sheet as the
                viewport crosses the breakpoint, no remount.
              </li>
              <li>
                <strong>Tabbed pickers</strong> — when{" "}
                <code>allowRelative</code> is set (DurationPicker), the
                Wait / Specific date tabs become a tabbed bottom sheet at
                the same breakpoint. The tabs stay at the top of the sheet
                so the user sees their choices immediately on open.
              </li>
            </ul>
            <CodeBlock>{`// Nothing mobile-specific to configure — the same DateField picks the
// right surface for the viewport. Validators / range / locale all carry
// through to the bottom-sheet calendar.
<DateField value={value} onChange={setValue} ariaLabel="Due date" />
`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section
        title="What's built into DateField"
        description="The calendar engine is internal to the exported DateField — you configure it through props, you don't re-implement it. The pieces below all live inside the component."
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
              <strong>Three-view calendar</strong> — days&nbsp;/&nbsp;months&nbsp;/&nbsp;years,
              brand-styled and validators-aware. Click the header label to
              cycle views.
            </li>
            <li>
              <strong>Responsive surface</strong> — Popover on desktop,
              focus-trapped <code>&lt;dialog&gt;</code> bottom sheet on
              mobile, switched live as the viewport crosses the breakpoint.
            </li>
            <li>
              <strong>Relative entry</strong> — <code>allowRelative</code>{" "}
              adds an offset tab that resolves to a date, or (with{" "}
              <code>relativeMode="duration"</code>) emits an ISO-8601
              duration like <code>PT2H30M</code>.
            </li>
            <li>
              <strong>Range &amp; locale</strong> — <code>minDate</code> /{" "}
              <code>maxDate</code> / <code>futureOnly</code> /{" "}
              <code>validators</code> control selectable days;{" "}
              <code>locale</code> / <code>monthFormat</code> localise the
              month names. The input is ISO (<code>YYYY-MM-DD</code>).
            </li>
            <li>
              <strong>TimeField</strong> — the companion time-of-day control
              (12/24-hour, step, min/max), used standalone or paired with
              DateField for date-and-time entry.
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
