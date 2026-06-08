import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Timestamp,
  TimestampFormat,
  TimestampTooltipVariant,
} from "@patternfly/react-core";
import { FoundationPage, Section, Card, CodeBlock } from "../../components/StoryKit.js";
import { DemoFrame, PropsTable } from "../../components/DemoKit.js";

const meta: Meta = {
  title: "Components/Timestamp",
  parameters: { layout: "padded" },
};
export default meta;

const fixed = new Date("2026-04-21T14:30:25");

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Timestamp"
      intro={
        <>
          A locale-aware date / time renderer with built-in tooltip support.
          Use for any timestamp surfaced in the UI — &ldquo;last run&rdquo;,
          &ldquo;created at&rdquo;, &ldquo;updated&rdquo; — so dates get
          consistent formatting and a hover tooltip that surfaces the
          full date / timezone for context.
        </>
      }
    >
      <Section
        title="Default (current time)"
        description="With no props, Timestamp renders the current time in the user's locale + timezone. shouldDisplayUTC switches to UTC."
      >
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame>
              <div style={{ display: "grid", gap: 8, color: "var(--gp-color-text-regular)" }}>
                <Timestamp />
                <Timestamp shouldDisplayUTC />
              </div>
            </DemoFrame>
            <CodeBlock>{`<Timestamp />                  // local time
<Timestamp shouldDisplayUTC /> // UTC time`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section
        title="Format variations"
        description="dateFormat + timeFormat each accept TimestampFormat.full / long / medium / short. Mix & match for the right level of detail per surface (compact in tables, full in audit logs)."
      >
        <Card>
          <div style={{ padding: 24 }}>
            <DemoFrame>
              <div style={{ display: "grid", gap: 8, color: "var(--gp-color-text-regular)" }}>
                <Timestamp date={fixed} dateFormat={TimestampFormat.full} timeFormat={TimestampFormat.full} />
                <Timestamp date={fixed} dateFormat={TimestampFormat.full} />
                <Timestamp date={fixed} timeFormat={TimestampFormat.full} />
                <Timestamp date={fixed} dateFormat={TimestampFormat.medium} timeFormat={TimestampFormat.short} />
                <Timestamp date={fixed} dateFormat={TimestampFormat.short} timeFormat={TimestampFormat.short} />
              </div>
            </DemoFrame>
          </div>
        </Card>
      </Section>

      <Section
        title="With suffix"
        description="displaySuffix appends a label after the formatted time — useful for explicit timezone markers or context labels."
      >
        <Card>
          <div style={{ padding: 24 }}>
            <DemoFrame>
              <div style={{ color: "var(--gp-color-text-regular)" }}>
                <Timestamp
                  date={fixed}
                  dateFormat={TimestampFormat.medium}
                  timeFormat={TimestampFormat.short}
                  displaySuffix="UTC"
                />
              </div>
            </DemoFrame>
          </div>
        </Card>
      </Section>

      <Section
        title="With tooltip"
        description="tooltip enables a hover/focus tooltip — TimestampTooltipVariant.default shows the full UTC time, .custom lets you supply your own content, omit the prop entirely to skip the tooltip."
      >
        <Card>
          <div style={{ padding: 24 }}>
            <DemoFrame>
              <div style={{ display: "grid", gap: 8, color: "var(--gp-color-text-regular)" }}>
                <Timestamp
                  date={fixed}
                  tooltip={{ variant: TimestampTooltipVariant.default }}
                />
                <Timestamp
                  date={fixed}
                  tooltip={{
                    variant: TimestampTooltipVariant.default,
                    suffix: "Coordinated Universal Time (UTC)",
                  }}
                />
              </div>
            </DemoFrame>
          </div>
        </Card>
      </Section>

      <Section
        title="Custom content (relative time)"
        description="children replace the rendered timestamp text — pair with tooltip={{ variant: 'default' }} to keep the full time as a hover affordance. Useful for relative formats: '2h ago', 'just now', 'yesterday'."
      >
        <Card>
          <div style={{ padding: 24 }}>
            <DemoFrame>
              <div style={{ color: "var(--gp-color-text-regular)" }}>
                <Timestamp
                  date={fixed}
                  tooltip={{ variant: TimestampTooltipVariant.default }}
                >
                  2 hours ago
                </Timestamp>
              </div>
            </DemoFrame>
          </div>
        </Card>
      </Section>

      <Section title="Most-used props">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "date", type: "Date | string | number", description: "The timestamp to render. Omit for the current time." },
                { name: "dateFormat", type: '"full" | "long" | "medium" | "short" (TimestampFormat)', description: "How the date portion formats. Omit to suppress the date." },
                { name: "timeFormat", type: '"full" | "long" | "medium" | "short" (TimestampFormat)', description: "How the time portion formats. Omit to suppress the time." },
                { name: "shouldDisplayUTC", type: "boolean", description: "Render in UTC instead of the user's local timezone." },
                { name: "displaySuffix", type: "string", description: "Trailing label appended to the rendered string ('UTC', 'US Eastern', etc.)." },
                { name: "customFormat", type: "Intl.DateTimeFormatOptions", description: "Bypass the dateFormat/timeFormat presets — pass an Intl options object directly." },
                { name: "locale", type: "string", description: "Override the user's default locale (e.g. 'en-GB' for d/m/y order)." },
                { name: "tooltip", type: "{ variant: TimestampTooltipVariant; suffix?: string; content?: ReactNode }", description: "Hover tooltip. variant='default' shows the canonical full timestamp; pass content for fully custom tooltip body." },
                { name: "children", type: "ReactNode", description: "Replace the rendered timestamp string — use for relative formats ('2h ago')." },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section title="When to use">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Always</strong> — anywhere you display a date in the UI. Consistent formatting + automatic locale + tooltip-on-hover for context.</li>
            <li><strong>Pair relative + absolute</strong> — use children to render &ldquo;2h ago&rdquo; with the full timestamp as the tooltip. Best of both worlds.</li>
            <li><strong>Don&rsquo;t hand-format dates</strong>. <code>new Date().toLocaleString()</code> works but loses the per-app consistency and tooltip affordance Timestamp provides.</li>
          </ul>
        </Card>
      </Section>

      <Section title="Accessibility">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>The tooltip is keyboard-focusable</strong> — when wrapped in an interactive parent (link / button), screen-reader users can hear the full timestamp via the tooltip.</li>
            <li><strong>Don&rsquo;t use relative-only without a tooltip</strong> — &ldquo;2h ago&rdquo; gives no fixed reference; pair with the full timestamp via <code>tooltip</code>.</li>
            <li><strong>Locale-aware out of the box</strong> — defaults to <code>navigator.language</code>; pass <code>locale</code> only when you need to override.</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
