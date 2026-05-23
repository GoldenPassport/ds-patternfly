import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, Popover } from "@patternfly/react-core";
import { FoundationPage, Section, Card, CodeBlock, ThemingPointer } from "../_storyKit.js";
import { DemoFrame, PropsTable } from "../_demoKit.js";

const meta: Meta = {
  title: "Components/Popover",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => {
    const [isVisible, setIsVisible] = useState(false);
    return (
      <FoundationPage
        title="Popover"
        intro={
          <>
            A click-triggered floating panel anchored to a control. Use for
            contextual help, definitions, mini-forms, and any rich content
            that doesn&rsquo;t justify a modal. Unlike <code>Tooltip</code>,
            popovers are interactive — they can hold links, buttons, and
            form inputs.
          </>
        }
      >
        <Section title="Basic">
          <Card>
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <DemoFrame>
                <Popover
                  aria-label="Process instances popover"
                  headerContent={<div>Process instances</div>}
                  bodyContent={
                    <div>
                      A process instance is one execution of a process
                      definition. It has its own variables, state, and
                      history.
                    </div>
                  }
                  footerContent="Last updated 2 min ago"
                  appendTo={() => document.body}
                >
                  <Button variant="secondary" ouiaId="ToggleBasicPopover">
                    Toggle popover
                  </Button>
                </Popover>
              </DemoFrame>
              <CodeBlock>{`<Popover
  aria-label="Process instances popover"
  headerContent={<div>Process instances</div>}
  bodyContent={<div>A process instance is one execution...</div>}
  footerContent="Last updated 2 min ago"
  appendTo={() => document.body}
>
  <Button variant="secondary">Toggle popover</Button>
</Popover>`}</CodeBlock>
            </div>
          </Card>
        </Section>

        <Section
          title="Position variants"
          description="Pick the side that keeps the popover in the viewport. PF6 will auto-flip if the chosen side overflows."
        >
          <Card>
            <div style={{ padding: 24, display: "flex", gap: 16, flexWrap: "wrap" }}>
              {(["top", "right", "bottom", "left"] as const).map((p) => (
                <Popover
                  key={p}
                  position={p}
                  aria-label={`${p} popover`}
                  headerContent={<div>{p}</div>}
                  bodyContent={<div>Anchored {p}.</div>}
                  appendTo={() => document.body}
                >
                  <Button variant="secondary">{p}</Button>
                </Popover>
              ))}
            </div>
          </Card>
        </Section>

        <Section
          title="Alert severity"
          description="alertSeverityVariant tints the popover header to signal status — 'info' | 'success' | 'warning' | 'danger' | 'custom'. Pass headerIcon to match."
        >
          <Card>
            <div style={{ padding: 24, display: "flex", gap: 16, flexWrap: "wrap" }}>
              {(["info", "success", "warning", "danger"] as const).map((sev) => (
                <Popover
                  key={sev}
                  aria-label={`${sev} popover`}
                  alertSeverityVariant={sev}
                  headerContent={`${sev[0]?.toUpperCase()}${sev.slice(1)} title`}
                  bodyContent={<div>Severity-tinted header.</div>}
                  appendTo={() => document.body}
                >
                  <Button variant="secondary">{sev}</Button>
                </Popover>
              ))}
            </div>
          </Card>
        </Section>

        <Section
          title="Hover trigger"
          description="triggerAction='hover' opens on pointer hover instead of click. Use sparingly — hover hides the affordance from keyboard / touch users; for them PF6 falls back to click/focus."
        >
          <Card>
            <div style={{ padding: 24 }}>
              <DemoFrame>
                <Popover
                  triggerAction="hover"
                  aria-label="Hover popover"
                  headerContent={<div>Hover popover</div>}
                  bodyContent={<div>This popover opens on hover.</div>}
                  appendTo={() => document.body}
                >
                  <Button variant="secondary">Hover me</Button>
                </Popover>
              </DemoFrame>
            </div>
          </Card>
        </Section>

        <Section
          title="Controlled"
          description="Use isVisible + shouldOpen + shouldClose when you need to open or close the popover from outside its trigger (e.g. close from a button inside the body)."
        >
          <Card>
            <div style={{ padding: 24 }}>
              <DemoFrame>
                <Popover
                  aria-label="Controlled popover"
                  isVisible={isVisible}
                  shouldOpen={() => setIsVisible(true)}
                  shouldClose={() => setIsVisible(false)}
                  headerContent={<div>Controlled popover</div>}
                  bodyContent={
                    <div style={{ display: "grid", gap: 8 }}>
                      <div>You can close this popover from inside.</div>
                      <Button
                        variant="secondary"
                        onClick={() => setIsVisible(false)}
                      >
                        Close popover
                      </Button>
                    </div>
                  }
                  appendTo={() => document.body}
                >
                  <Button variant="secondary">Toggle popover</Button>
                </Popover>
              </DemoFrame>
            </div>
          </Card>
        </Section>

        <Section
          title="Auto width / bare body"
          description="hasAutoWidth sizes to content; hasNoPadding + showClose=false strips chrome for fully custom bodies."
        >
          <Card>
            <div style={{ padding: 24, display: "flex", gap: 16, flexWrap: "wrap" }}>
              <Popover
                aria-label="Auto-width popover"
                hasAutoWidth
                bodyContent={
                  <div>Width sizes to its contents instead of a fixed width.</div>
                }
                appendTo={() => document.body}
              >
                <Button variant="secondary">Auto width</Button>
              </Popover>
              <Popover
                aria-label="Bare popover"
                className="gp-popover-secondary"
                hasNoPadding
                showClose={false}
                withFocusTrap={false}
                bodyContent={
                  <div style={{ padding: 12 }}>
                    Bare popover — content owns its spacing. The caret matches
                    the body via the gp-popover-secondary class.
                  </div>
                }
                appendTo={() => document.body}
              >
                <Button variant="secondary">Bare body</Button>
              </Popover>
            </div>
          </Card>
        </Section>

        <Section title="Most-used props">
          <Card>
            <div style={{ padding: 24 }}>
              <PropsTable
                rows={[
                  { name: "aria-label", type: "string", description: "Names the popover for screen readers. Required when there's no headerContent (or alongside it for clarity)." },
                  { name: "headerContent", type: "ReactNode", description: "Bold header at the top of the popover." },
                  { name: "headerIcon", type: "ReactNode", description: "Leading icon in the header. Pair with alertSeverityVariant for status tints." },
                  { name: "headerComponent", type: '"h1" | "h2" | ... | "h6"', description: "HTML element used for the header. Default 'h6'." },
                  { name: "bodyContent", type: "ReactNode | (hide) => ReactNode", description: "Main content. Function form receives the hide() callback for custom close UX." },
                  { name: "footerContent", type: "ReactNode", description: "Trailing slot for metadata, secondary actions, or 'learn more' links." },
                  { name: "alertSeverityVariant", type: '"info" | "success" | "warning" | "danger" | "custom"', description: "Tints the header to signal severity." },
                  { name: "position", type: '"top" | "right" | "bottom" | "left" + variants', description: "Preferred side. Auto-flips on overflow." },
                  { name: "triggerAction", type: '"click" | "hover"', description: "Default click. Hover for tooltip-like usage; click for interactive content." },
                  { name: "appendTo", type: "() => HTMLElement", description: "Where to mount the popover in the DOM. Use document.body to escape overflow:hidden ancestors." },
                  { name: "hasAutoWidth", type: "boolean", description: "Sizes to content rather than the default fixed width." },
                  { name: "hasNoPadding", type: "boolean", description: "Strips the body padding so custom content can touch the popover edges." },
                  { name: "showClose", type: "boolean", description: "Renders an X button in the header (default true)." },
                  { name: "withFocusTrap", type: "boolean", description: "Trap focus while open. Default true when content is focusable; set false for bare static popovers." },
                  { name: "isVisible / shouldOpen / shouldClose", type: "boolean / fn / fn", description: "Controlled mode for opening / closing programmatically." },
                ]}
              />
            </div>
          </Card>
        </Section>

        <Section title="Popover vs Tooltip vs Modal">
          <Card>
            <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
              <li><strong>Tooltip</strong> — short, plain-text label revealed on hover/focus. Not interactive, not for rich content.</li>
              <li><strong>Popover</strong> — click-triggered, interactive, can hold rich content. The middle ground.</li>
              <li><strong>Modal</strong> — blocks the page, demands attention. For confirmations and destructive actions.</li>
            </ul>
          </Card>
        </Section>

        <Section
          title="Surface tinting — the cascading effect"
          description="An important detail about how this lib handles the popover surface, and why several other tokens have to bend in lock-step with it."
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
                  <strong>Light mode — popover surface is tinted darker
                  than the page.</strong> Pure white popovers on a
                  light page disappear against the backdrop and lose
                  the &quot;floating&quot; quality. The lib paints the
                  popover with{" "}
                  <code>--gp-color-bg-secondary-default</code> (one
                  step darker than the page bg) so the surface always
                  reads as elevated.
                </li>
                <li>
                  <strong>Everything inside the popover then cascades
                  darker too.</strong> A border colour that was
                  perfectly visible on the page bg becomes near-invisible
                  on the now-darker popover surface. The lib uses{" "}
                  <code>color-mix()</code> to derive popover-scoped
                  strokes that are always one consistent step darker
                  than the popover bg:
                  <ul>
                    <li>
                      Input + button borders → 50/50 mix of popover bg
                      and <code>--gp-color-text-subtle</code> (visible
                      stroke).
                    </li>
                    <li>
                      Tab dividers → 70/30 mix (quieter, sits below the
                      input border in the hierarchy).
                    </li>
                    <li>
                      Brand-coloured accents (e.g. focus rings) read
                      stronger automatically since they were chosen
                      against the page surface; on the darker popover
                      they gain contrast for free.
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>Text may need to lighten to keep
                  contrast.</strong> The same body text colour that
                  reads at AA on the page may slip below threshold on
                  a darker popover. Apps that customise text colour
                  inside popovers should test both contrast against
                  the elevated surface, or rely on the lib&apos;s{" "}
                  <code>--gp-color-text-regular</code> /{" "}
                  <code>--gp-color-text-subtle</code> pair which are
                  brand-tuned for the elevated surface.
                </li>
                <li>
                  <strong>Dark mode flips the relationship.</strong> On
                  a dark page, the popover surface is{" "}
                  <em>lighter</em> than the page (still elevated, just
                  in the opposite direction). The same{" "}
                  <code>color-mix()</code> recipes still work — they
                  blend popover bg with text-subtle, and in dark mode
                  both ends invert: lighter surface + lighter text
                  produces a slightly darker stroke that reads against
                  the lighter elevated bg. Text colour follows the same
                  light/dark pair from the brand object, so it lightens
                  automatically against the darker page and remains
                  legible on the lighter popover.
                </li>
                <li>
                  <strong>Practical consequence — don&apos;t reach for
                  the global border / text tokens inside a popover.</strong>{" "}
                  Use{" "}
                  <code>--gp-popover-stroke</code> (the lib&apos;s
                  surface-aware mix) for any border you draw inside
                  popover / bottom-sheet content, and let{" "}
                  <code>--gp-color-text-*</code> drive text. The page
                  tokens (<code>--gp-color-border</code>,{" "}
                  <code>--gp-color-border-subtle</code>) are tuned
                  against the page bg and look wrong on the elevated
                  surface — same problem as raw{" "}
                  <code>#e6dcc8</code> on a <code>#f3ede1</code> bg.
                </li>
                <li>
                  <strong>Why a mix rather than just an extra
                  token?</strong> A static popover-stroke value would
                  need to be re-tuned per brand. A{" "}
                  <code>color-mix()</code> of surface ↔ text-subtle
                  re-derives itself from the two tokens that already
                  ship per-brand, per-mode. One recipe, every brand
                  and every mode produce a balanced stroke without
                  manual values.
                </li>
              </ul>
            </div>
          </Card>
        </Section>

        <Section title="Accessibility">
          <Card>
            <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
              <li><strong>Always pass <code>aria-label</code></strong> on the Popover — even when headerContent is present, the label is the canonical accessible name.</li>
              <li><strong>Use <code>appendTo={"{() => document.body}"}</code></strong> when the trigger sits inside an overflow:hidden / transform ancestor — otherwise the popover gets clipped.</li>
              <li><strong>Trap focus for forms.</strong> withFocusTrap defaults true when the body has focusable content; only disable for fully static bare popovers.</li>
              <li><strong>Escape closes.</strong> The trigger receives focus on close — keep that contract intact in custom controlled flows.</li>
              <li><strong>Hover popovers degrade gracefully</strong> — PF6 still opens on click/focus for keyboard / touch users.</li>
            </ul>
          </Card>
        </Section>
        <ThemingPointer
          dials={[
            ["--gp-pad-popover", "Content padding (block + inline)."],
            ["--gp-radius-popover", "Corner radius (default brand md, 16px)."],
            ["--gp-shadow-popover", "Drop shadow."],
            ["--gp-surface-elevated", "Body + arrow background (light + dark pair)."],
          ]}
        />
      </FoundationPage>
    );
  },
};
