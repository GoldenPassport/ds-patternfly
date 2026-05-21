import { useState, type CSSProperties } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, FormSelect, FormSelectOption } from "@patternfly/react-core";
import {
  CogIcon,
  EllipsisVIcon,
  PencilAltIcon,
  PlusIcon,
  TimesIcon,
  TrashIcon,
} from "@patternfly/react-icons";
import { FoundationPage, Section, Card, CodeBlock } from "../_storyKit.js";
import { DemoFrame, PropsTable } from "../_demoKit.js";

const meta: Meta = {
  title: "Components/Button",
  parameters: { layout: "padded" },
};
export default meta;

const VARIANTS = ["primary", "secondary", "tertiary", "danger", "warning", "link", "plain"] as const;

/**
 * Border-radius presets used by the configurable demo below. PF6 ships
 * no `shape` prop on Button, so the override lands as an inline style
 * (the value applies to text + icon-only buttons alike).
 */
const RADIUS_PRESETS = {
  square: { label: "Square (0)", value: "0" },
  rounded: { label: "Rounded (default)", value: "var(--pf-v6-c-button--BorderRadius)" },
  strong: { label: "Strong (12px)", value: "12px" },
  pill: { label: "Pill (999px)", value: "999px" },
} as const;
type RadiusKey = keyof typeof RADIUS_PRESETS;

function BorderRadiusDemo() {
  const [shape, setShape] = useState<RadiusKey>("rounded");
  const radius = RADIUS_PRESETS[shape].value;
  const textStyle: CSSProperties = { borderRadius: radius };
  // Icon-only buttons need a square aspect so the chosen radius reads
  // as a true circle / pill instead of an ellipse.
  const iconOnlyStyle: CSSProperties = {
    borderRadius: radius,
    aspectRatio: "1",
    paddingInline: 0,
  };
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <label style={{ display: "grid", gap: 4, fontSize: 13, maxWidth: 240 }}>
        Shape
        <FormSelect
          id="btn-radius-shape"
          value={shape}
          onChange={(_e, v) => setShape(v as RadiusKey)}
          aria-label="Border radius preset"
        >
          {(Object.keys(RADIUS_PRESETS) as RadiusKey[]).map((k) => (
            <FormSelectOption key={k} value={k} label={RADIUS_PRESETS[k].label} />
          ))}
        </FormSelect>
      </label>
      <DemoFrame>
        <div style={{ display: "grid", gap: 12 }}>
          {/* Text buttons */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
            <Button variant="primary"   style={textStyle}>Primary</Button>
            <Button variant="secondary" style={textStyle}>Secondary</Button>
            <Button variant="tertiary"  style={textStyle}>Tertiary</Button>
            <Button variant="danger"    style={textStyle}>Danger</Button>
          </div>
          {/* Icon + text */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
            <Button variant="primary" icon={<PlusIcon />}      style={textStyle}>Add</Button>
            <Button variant="secondary" icon={<PencilAltIcon />} style={textStyle}>Edit</Button>
            <Button variant="danger" icon={<TrashIcon />}     style={textStyle}>Delete</Button>
          </div>
          {/* Icon-only variants (square aspect, has background/border) */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
            <Button variant="primary"   aria-label="Add"      icon={<PlusIcon />}       style={iconOnlyStyle} />
            <Button variant="secondary" aria-label="Edit"     icon={<PencilAltIcon />} style={iconOnlyStyle} />
            <Button variant="tertiary"  aria-label="Settings" icon={<CogIcon />}       style={iconOnlyStyle} />
            <Button variant="danger"    aria-label="Delete"   icon={<TrashIcon />}     style={iconOnlyStyle} />
          </div>
          {/* Icon-only plain — the radius shows on hover/focus
              backgrounds (PF6 paints a hover halo behind the glyph). */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
            <Button variant="plain" aria-label="Edit"         icon={<PencilAltIcon />} style={iconOnlyStyle} />
            <Button variant="plain" aria-label="Settings"     icon={<CogIcon />}       style={iconOnlyStyle} />
            <Button variant="plain" aria-label="Delete"       icon={<TrashIcon />}     style={iconOnlyStyle} />
            <Button variant="plain" aria-label="More actions" icon={<EllipsisVIcon />} style={iconOnlyStyle} />
            <Button variant="plain" aria-label="Close"        icon={<TimesIcon />}     style={iconOnlyStyle} />
          </div>
        </div>
      </DemoFrame>
    </div>
  );
}

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
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                {VARIANTS.map((v) => (
                  <Button key={v} variant={v}>
                    {v}
                  </Button>
                ))}
              </div>
            </DemoFrame>
            <CodeBlock>{`<Button variant="primary">Save</Button>
<Button variant="secondary">Cancel</Button>
<Button variant="danger">Delete</Button>
<Button variant="link">Learn more</Button>`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section title="States">
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
                <Button>Default</Button>
                <Button isDisabled>Disabled</Button>
                <Button isAriaDisabled>aria-disabled</Button>
                <Button isLoading spinnerAriaLabel="Saving">
                  Loading
                </Button>
                <Button isBlock>Block (full width)</Button>
              </div>
            </DemoFrame>
          </div>
        </Card>
      </Section>

      <Section
        title="Icon buttons"
        description="Icon-only buttons need an aria-label (the icon is decorative, the label is the announced name). Pair with `variant='plain'` for toolbar / table-row glyph buttons; keep a text variant for primary CTAs even when an icon's involved."
      >
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame>
              <div style={{ display: "grid", gap: 16 }}>
                {/* Icon + text — the common CTA pattern. icon prop puts
                    the glyph on the leading edge; pass `iconPosition`
                    to swap it to the trailing edge. */}
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
                  <Button variant="primary" icon={<PlusIcon />}>
                    Add resource
                  </Button>
                  <Button variant="secondary" icon={<PencilAltIcon />}>
                    Edit
                  </Button>
                  <Button variant="danger" icon={<TrashIcon />}>
                    Delete
                  </Button>
                </div>
                {/* Icon-only with background / border, rendered circular.
                    PF6 ships no `circular` variant on Button, so override
                    inline: `border-radius: 50%`, `aspect-ratio: 1`, and
                    zero inline padding so the icon centres in a square. */}
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                  {(() => {
                    const round: CSSProperties = {
                      borderRadius: "50%",
                      aspectRatio: "1",
                      paddingInline: 0,
                    };
                    return (
                      <>
                        <Button variant="primary"   aria-label="Add resource" icon={<PlusIcon />}       style={round} />
                        <Button variant="secondary" aria-label="Edit"         icon={<PencilAltIcon />} style={round} />
                        <Button variant="tertiary"  aria-label="Settings"     icon={<CogIcon />}       style={round} />
                        <Button variant="danger"    aria-label="Delete"       icon={<TrashIcon />}     style={round} />
                      </>
                    );
                  })()}
                </div>
                {/* Icon-only plain buttons — the canonical toolbar /
                    table-row pattern. The icon goes in `icon`, NOT as
                    children; that triggers PF6's icon-only sizing. */}
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                  <Button variant="plain" aria-label="Edit" icon={<PencilAltIcon />} />
                  <Button variant="plain" aria-label="Settings" icon={<CogIcon />} />
                  <Button variant="plain" aria-label="Delete" icon={<TrashIcon />} />
                  <Button variant="plain" aria-label="More actions" icon={<EllipsisVIcon />} />
                  <Button variant="plain" aria-label="Close" icon={<TimesIcon />} />
                </div>
                {/* PF6 `isSettings` shorthand bakes in the cog icon but
                    does NOT inject an aria-label — still your job. */}
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                  <Button variant="plain" isSettings aria-label="Settings" />
                </div>
              </div>
            </DemoFrame>
            <CodeBlock>{`{/* Icon + text */}
<Button variant="primary" icon={<PlusIcon />}>Add resource</Button>
<Button variant="danger" icon={<TrashIcon />}>Delete</Button>

{/* Icon-only — aria-label is required (icon is decorative). */}
<Button variant="plain" aria-label="Edit" icon={<PencilAltIcon />} />
<Button variant="plain" aria-label="More actions" icon={<EllipsisVIcon />} />

{/* Shorthand variants — PF6 bakes in icon + aria-label. */}
<Button variant="plain" isSettings />`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section
        title="Border radius"
        description="PF6 ships no `shape` prop on Button — pick a radius preset (square / rounded / more rounded / pill) and the value lands on each demo button via inline style. Apply the same approach in your app via a per-brand override on the `--pf-v6-c-button--BorderRadius` token if you want a global shape change."
      >
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <BorderRadiusDemo />
            <CodeBlock>{`<Button variant="primary" style={{ borderRadius: 999 }}>Pill</Button>

{/* Icon-only — pair with aspect-ratio: 1 + paddingInline: 0 so
    the chosen radius reads as a true circle / pill. */}
<Button
  variant="primary"
  aria-label="Add"
  icon={<PlusIcon />}
  style={{ borderRadius: "50%", aspectRatio: 1, paddingInline: 0 }}
/>

{/* Theme-wide via the PF6 token: */}
:where([data-brand="rounded"]) {
  --pf-v6-c-button--BorderRadius: 12px;
}`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section title="Most-used props" description="Full prop surface in the PatternFly docs.">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
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
          </div>
        </Card>
      </Section>

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
    </FoundationPage>
  ),
};
