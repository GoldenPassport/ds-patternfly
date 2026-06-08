import type { CSSProperties } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "@patternfly/react-core";
import { FoundationPage, Section, Card, CodeBlock } from "../_storyKit.js";
import { DemoFrame, PropsTable } from "../../components/DemoKit.js";

const meta: Meta = {
  title: "Components/Badge",
  parameters: { layout: "padded" },
};
export default meta;

// Badge tones — apply via inline CSS variable overrides so the badge inherits
// the right text contrast for each background. PF6 ships read/unread/disabled
// modifiers but no semantic-status variants, so we set the component's own
// CSS vars (typed loosely so React accepts the custom property names).
type BadgeStyle = CSSProperties & {
  "--pf-v6-c-badge--BackgroundColor"?: string;
  "--pf-v6-c-badge--Color"?: string;
};

const tones: Record<"nonstatus" | "warning" | "danger", BadgeStyle> = {
  nonstatus: {
    "--pf-v6-c-badge--BackgroundColor": "var(--pf-t--global--color--nonstatus--gray--default)",
    "--pf-v6-c-badge--Color": "var(--pf-t--global--text--color--nonstatus--on-gray--default)",
  },
  warning: {
    "--pf-v6-c-badge--BackgroundColor": "var(--pf-t--global--color--status--warning--default)",
    "--pf-v6-c-badge--Color": "var(--pf-t--global--text--color--status--on-warning--default)",
  },
  danger: {
    "--pf-v6-c-badge--BackgroundColor": "var(--pf-t--global--color--status--danger--default)",
    "--pf-v6-c-badge--Color": "var(--pf-t--global--text--color--status--on-danger--default)",
  },
};

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Badge"
      intro={
        <>
          A small numeric or short-text indicator typically attached to
          another element — a tab title, a nav item, a button — to show a
          count or unread state. For status pills, use Label instead.
        </>
      }
    >
      <Section
        title="Tone"
        description="Lead with the semantic that matches the count's meaning. Most badges are informational; reach for warning / danger when the count itself is the alarm."
      >
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame>
              <div style={{ display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap", color: "var(--gp-color-text-regular)" }}>
                <span>Drafts <Badge style={tones.nonstatus}>4</Badge></span>
                <span>Pending review <Badge style={tones.warning}>7</Badge></span>
                <span>Failed builds <Badge style={tones.danger}>3</Badge></span>
              </div>
            </DemoFrame>
            <CodeBlock>{`const tones = {
  nonstatus: {
    "--pf-v6-c-badge--BackgroundColor": "var(--pf-t--global--color--nonstatus--gray--default)",
    "--pf-v6-c-badge--Color":           "var(--pf-t--global--text--color--nonstatus--on-gray--default)",
  },
  warning: {
    "--pf-v6-c-badge--BackgroundColor": "var(--pf-t--global--color--status--warning--default)",
    "--pf-v6-c-badge--Color":           "var(--pf-t--global--text--color--status--on-warning--default)",
  },
  danger: {
    "--pf-v6-c-badge--BackgroundColor": "var(--pf-t--global--color--status--danger--default)",
    "--pf-v6-c-badge--Color":           "var(--pf-t--global--text--color--status--on-danger--default)",
  },
};

<Badge style={tones.warning}>7</Badge>`}</CodeBlock>
            <p style={{ margin: 0, color: "var(--gp-color-text-subtle)", fontSize: 14 }}>
              PF6&apos;s Badge ships <code>read</code> / <code>unread</code> / <code>disabled</code> modifiers built-in.
              For status tones, override the badge&apos;s own CSS variables — that
              keeps the rest of the badge styling (radius, padding, focus ring)
              intact.
            </p>
          </div>
        </Card>
      </Section>

      <Section title="Read vs unread">
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame>
              <div style={{ display: "flex", gap: 16, alignItems: "center", color: "var(--gp-color-text-regular)" }}>
                <span>Inbox <Badge isRead>12</Badge></span>
                <span>Notifications <Badge>3</Badge></span>
              </div>
            </DemoFrame>
            <CodeBlock>{`<span>Inbox <Badge isRead>12</Badge></span>
<span>Notifications <Badge>3</Badge></span>`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section title="Truncated counts" description="Display a cap when the real count exceeds it.">
        <Card>
          <div style={{ padding: 24 }}>
            <DemoFrame>
              <div style={{ display: "flex", gap: 16, color: "var(--gp-color-text-regular)" }}>
                <Badge>99+</Badge>
                <Badge>1k</Badge>
              </div>
            </DemoFrame>
          </div>
        </Card>
      </Section>

      <Section title="Props">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                {
                  name: "isRead",
                  type: "boolean",
                  description: "Subdued styling for already-read items. Default false (active/unread).",
                },
                {
                  name: "screenReaderText",
                  type: "string",
                  description: "Override what screen readers announce. Useful when the visible text is a number — \"3 unread notifications\" reads better than \"3\".",
                },
                {
                  name: "children",
                  type: "ReactNode",
                  description: "The badge content — typically a number or short string. Cap at 99+ to avoid overflow.",
                },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section
        title="Accessibility"
        description="A bare number doesn't tell screen readers what it means."
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
              <strong>Provide context.</strong> Either ensure the parent element
              labels it (&quot;Inbox <em>12</em>&quot;) or use{" "}
              <code>screenReaderText</code> to spell it out (&quot;12 unread items in
              Inbox&quot;).
            </li>
            <li>
              <strong>Don&apos;t rely on color alone.</strong> The read/unread
              distinction is conveyed by saturation — make sure the surrounding
              context (parent label, screenReaderText) tells the same story.
            </li>
          </ul>
        </Card>
      </Section>

      <Section
        title="When to use which tone"
        description="The default brand-blue badge isn't always the right pick."
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
            <li><strong>Nonstatus (gray)</strong> — neutral counts, drafts, queues, totals. The unobtrusive default.</li>
            <li><strong>Brand (default unread)</strong> — &quot;new&quot; / unread state on the user&apos;s own things — inbox, notifications. Signals action without alarm.</li>
            <li><strong>Warning</strong> — counts the user should attend to but aren&apos;t blocking — pending reviews, soft-failed checks.</li>
            <li><strong>Danger</strong> — counts that demand attention — failed builds, errors, blocking conditions.</li>
            <li><strong>Don&apos;t use brand-color badges for everything.</strong> If every count is the same color, the unread / new signal loses its meaning.</li>
          </ul>
        </Card>
      </Section>

      <Section
        title="Badge vs Label"
        description="They look similar; they're not interchangeable."
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
            <li><strong>Badge</strong> — counts and unread indicators attached to another element. Always numeric or short.</li>
            <li><strong>Label</strong> — status pills, categories, filters. Stand-alone, descriptive text.</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
