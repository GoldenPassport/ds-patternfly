import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  FoundationPage,
  Section,
  Card,
  ConfigurationSection,
  Example,
  ThemingPointer,
} from "../_kit/StoryKit.js";
import {
  Variants,
  States,
  IconButtons,
  BorderRadius,
} from "../../examples/components/Button.example.js";
import buttonExampleSrc from "../../examples/components/Button.example.tsx?raw";
import buttonComponentSrc from "../../components/base/Button.tsx?raw";

const meta: Meta = {
  title: "Components/Button",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Button"
      intro={
        <>
          The action primitive. Triggers a discrete operation when clicked or
          activated by Space/Enter. Use a button for actions; use a link
          (anchor) for navigation. The two are not interchangeable, even when
          they look the same.
        </>
      }
    >
      <Section title="Variants" description="Each variant signals a different action priority.">
        <Card>
          <Example
            source={buttonExampleSrc}
            region="Variants"
            fileName="Button.example.tsx"
          >
            <Variants />
          </Example>
        </Card>
      </Section>

      <Section title="States">
        <Card>
          <Example
            source={buttonExampleSrc}
            region="States"
            fileName="Button.example.tsx"
          >
            <States />
          </Example>
        </Card>
      </Section>

      <Section
        title="Icon buttons"
        description="Icon-only buttons need an aria-label (the icon is decorative, the label is the announced name). Pair with `variant='plain'` for toolbar / table-row glyph buttons; keep a text variant for primary CTAs even when an icon's involved."
      >
        <Card>
          <Example
            source={buttonExampleSrc}
            region="IconButtons"
            fileName="Button.example.tsx"
          >
            <IconButtons />
          </Example>
        </Card>
      </Section>

      <Section
        title="Border radius"
        description="PF6 ships no `shape` prop on Button — pick a radius preset (none / default / rounded / strong / pill) and the value lands on each demo button via inline style. `Default` reads the brand-root `--gp-radius-control` dial so this preview matches the rest of the DS. Apply the same approach in your app via the dial for a global shape change."
      >
        <Card>
          <Example
            source={buttonExampleSrc}
            region="BorderRadius"
            fileName="Button.example.tsx"
          >
            <BorderRadius />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example source={buttonExampleSrc} fileName="Button.example.tsx" />
        </Card>
      </Section>

      <ConfigurationSection
        importStatement={'import { Button } from "@golden-passport/ds-patternfly";'}
        componentSource={buttonComponentSrc}
        componentFileName="Button.tsx"
        rows={[
          {
            name: "variant",
            type: '"primary" | "secondary" | "tertiary" | "danger" | "warning" | "link" | "plain" | "control" | "stateful"',
            description: "Visual style indicating action priority. Default: primary.",
          },
          {
            name: "isDisabled",
            type: "boolean",
            description: "Sets the native HTML disabled attribute. Removes the button from the tab order.",
          },
          {
            name: "isAriaDisabled",
            type: "boolean",
            description: "Communicates disabled state via aria-disabled. Stays focusable — better for tooltips explaining why the action is unavailable.",
          },
          {
            name: "isLoading",
            type: "boolean",
            description: "Replaces label with a spinner. Pair with spinnerAriaLabel.",
          },
          {
            name: "spinnerAriaLabel",
            type: "string",
            description: "Accessible label for the loading spinner. Required when isLoading is true.",
          },
          {
            name: "isBlock",
            type: "boolean",
            description: "Stretches the button to fill its container's width.",
          },
          {
            name: "isInline",
            type: "boolean",
            description: 'For variant="link" — drops button padding so the link sits inline with surrounding text.',
          },
          {
            name: "icon",
            type: "ReactNode",
            description: "Icon rendered alongside the label. Use iconPosition to control placement.",
          },
          {
            name: "iconPosition",
            type: '"start" | "end" | "left" | "right"',
            description: "Logical-property placement preferred (start/end) — respects RTL.",
          },
          {
            name: "component",
            type: "ElementType",
            description: 'Render as a different element. Use "a" with href to make a link styled as a button.',
          },
          {
            name: "type",
            type: '"button" | "submit" | "reset"',
            description: "Native HTML type. Inside a Form, default is submit — set explicitly to avoid surprise submits.",
          },
        ]}
      />

      <Section
        title="Accessibility"
        description="What this component requires from the consumer."
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
              <strong>Every Button needs an accessible name.</strong> Either visible
              text children, an <code>aria-label</code>, or an{" "}
              <code>aria-labelledby</code>. Icon-only buttons must use{" "}
              <code>aria-label</code>.
            </li>
            <li>
              <strong>Keyboard:</strong> Tab to focus, Space or Enter to activate.
              PatternFly handles this for you — don&apos;t override.
            </li>
            <li>
              <strong>Loading state needs a spinner label.</strong>{" "}
              <code>isLoading</code> hides the visible label, so{" "}
              <code>spinnerAriaLabel</code> (or <code>spinnerAriaLabelledBy</code>) is
              required for screen reader users to know what&apos;s happening.
            </li>
            <li>
              <strong>Prefer <code>isAriaDisabled</code> over <code>isDisabled</code> when explanation is needed.</strong>{" "}
              Disabled buttons can&apos;t hold focus, which means they can&apos;t
              show a tooltip explaining why they&apos;re disabled. aria-disabled
              keeps focus while signalling the state.
            </li>
          </ul>
        </Card>
      </Section>

      <Section
        title="When to use it"
        description="Buttons trigger actions. Don't use them for navigation."
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
              <strong>Use Button for…</strong> save, delete, submit, open modal, run
              process — actions that change state without changing URL.
            </li>
            <li>
              <strong>Use a link (<code>&lt;a&gt;</code>) for…</strong> navigation —
              changing the URL or moving between views. If you need it to look
              like a button, use <code>&lt;Button component=&quot;a&quot; href=&quot;…&quot;&gt;</code>.
            </li>
            <li>
              <strong>One primary per region.</strong> Multiple primary buttons in a
              header or modal footer dilute hierarchy — pick the most important
              action and demote the rest to secondary or tertiary.
            </li>
          </ul>
        </Card>
      </Section>
      <ThemingPointer
        dials={[
          ["--gp-control-pad-y", "Vertical padding — drives the button height in lockstep with form-control."],
          ["--gp-control-pad-x", "Horizontal padding."],
          ["--gp-radius-control", "Corner radius (square / rounded / strong / pill use the same dial for the default state)."],
          ["--gp-focus-ring", "Focus-ring colour."],
          ["--gp-opacity-disabled", "Disabled-state opacity."],
        ]}
      />
    </FoundationPage>
  ),
};
