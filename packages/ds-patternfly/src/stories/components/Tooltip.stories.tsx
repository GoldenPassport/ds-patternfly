import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  FoundationPage,
  Section,
  Card,
  ConfigurationSection,
  Example,
  ThemingPointer,
} from "../_kit/StoryKit.js";
import { Basic, Positions } from "../../examples/components/Tooltip.example.js";
import tooltipExampleSrc from "../../examples/components/Tooltip.example.tsx?raw";
import tooltipComponentSrc from "../../components/base/Tooltip.tsx?raw";

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
          <Example
            source={tooltipExampleSrc}
            region="Basic"
            fileName="Tooltip.example.tsx"
          >
            <Basic />
          </Example>
        </Card>
      </Section>

      <Section title="Positions" description="Set position when the default (top) collides with viewport edges.">
        <Card>
          <Example
            source={tooltipExampleSrc}
            region="Positions"
            fileName="Tooltip.example.tsx"
          >
            <Positions />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example source={tooltipExampleSrc} fileName="Tooltip.example.tsx" />
        </Card>
      </Section>

      <ConfigurationSection
        importStatement={'import { Tooltip } from "@golden-passport/ds-patternfly";'}
        componentSource={tooltipComponentSrc}
        componentFileName="Tooltip.tsx"
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
