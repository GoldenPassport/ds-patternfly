import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, Tooltip } from "@golden-passport/ds-patternfly";
import { FoundationPage, Section, Card, CodeBlock, ThemingPointer } from "../_kit/StoryKit.js";
import { DemoFrame, PropsTable } from "../_kit/DemoKit.js";

const meta: Meta = {
  title: "Components/Tooltip",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Tooltip"
      intro={
        <>
          A small floating label that appears on hover or focus. Use it for
          short, supplemental hints — not for primary content. If a user
          must read it to understand the UI, it doesn&apos;t belong in a
          tooltip.
        </>
      }
    >
      <Section title="Basic">
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame>
              <Tooltip content="Saves the current draft">
                <Button>Save</Button>
              </Tooltip>
            </DemoFrame>
            <CodeBlock>{`<Tooltip content="Saves the current draft">
  <Button>Save</Button>
</Tooltip>`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section title="Positions" description="Set position when the default (top) collides with viewport edges.">
        <Card>
          <div style={{ padding: 24 }}>
            <DemoFrame>
              <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
                <Tooltip content="On top" position="top">
                  <Button variant="secondary">Top</Button>
                </Tooltip>
                <Tooltip content="On the right" position="right">
                  <Button variant="secondary">Right</Button>
                </Tooltip>
                <Tooltip content="On the bottom" position="bottom">
                  <Button variant="secondary">Bottom</Button>
                </Tooltip>
                <Tooltip content="On the left" position="left">
                  <Button variant="secondary">Left</Button>
                </Tooltip>
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
                  name: "content",
                  type: "ReactNode",
                  description: "Required. The tooltip text. Keep short — one phrase, no full sentences.",
                },
                {
                  name: "children",
                  type: "ReactElement",
                  description: "Single trigger element. Must be focusable for keyboard users to see the tooltip.",
                },
                {
                  name: "position",
                  type: '"top" | "bottom" | "left" | "right" | "auto" | "top-start" | "top-end" | ...',
                  description: 'Default "top". "auto" flips when the tooltip would overflow the viewport.',
                },
                {
                  name: "aria",
                  type: '"describedby" | "labelledby" | "none"',
                  description: 'How AT references the tooltip. Default "describedby" — the trigger is named by its own content, the tooltip provides supplemental description.',
                },
                {
                  name: "trigger",
                  type: '"mouseenter focus" | "manual" | etc.',
                  description: "Default mouseenter+focus. Manual lets you control isVisible imperatively.",
                },
                {
                  name: "isVisible",
                  type: "boolean",
                  description: "For trigger=\"manual\" — control visibility from app state.",
                },
                {
                  name: "entryDelay / exitDelay",
                  type: "number",
                  description: "Milliseconds before show/hide. Default ~300ms entry. Don't reduce below 100ms.",
                },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section
        title="Accessibility"
        description="Tooltips fail for keyboard, mobile, and screen reader users by default — use them carefully."
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
              <strong>Trigger must be focusable.</strong> Keyboard users see
              tooltips via focus, not hover. Wrapping a non-focusable
              <code>&lt;span&gt;</code> hides the tooltip from them entirely.
            </li>
            <li>
              <strong>Never put critical info in a tooltip.</strong> Mobile has no
              hover. The tooltip should be redundant — the UI must work
              without it.
            </li>
            <li>
              <strong>Disabled buttons swallow tooltips.</strong> Native{" "}
              <code>disabled</code> removes focus and pointer events. Use{" "}
              <code>isAriaDisabled</code> on Button so the tooltip can still
              fire.
            </li>
            <li>
              <strong>WCAG 2.1 SC 1.4.13 — content on hover or focus must be:</strong>{" "}
              dismissible (Esc), hoverable (mouse can move into the tooltip
              without it disappearing), and persistent (stays visible until
              dismissed). PatternFly handles all three.
            </li>
          </ul>
        </Card>
      </Section>

      <Section
        title="When to use it"
        description="Supplemental, not essential."
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
            <li><strong>Use Tooltip for…</strong> labels on icon-only buttons, &quot;why is this disabled&quot; explanations, abbreviation expansions.</li>
            <li><strong>Don&apos;t use Tooltip for…</strong> form field instructions (use HelperText), decision-critical info (put it on the page), error messages (use FormGroup helper text or Alert).</li>
          </ul>
        </Card>
      </Section>
      <ThemingPointer
        dials={[
          ["--gp-surface-elevated", "Tooltip body + arrow background."],
          ["--gp-radius-popover", "Corner radius."],
          ["--gp-shadow-popover", "Drop shadow."],
          ["--gp-motion-duration", "Show/hide fade duration."],
        ]}
      />
    </FoundationPage>
  ),
};
