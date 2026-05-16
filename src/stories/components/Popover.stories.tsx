import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, Popover } from "@patternfly/react-core";
import { FoundationPage, Section, Card, CodeBlock } from "../_storyKit.js";
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
      </FoundationPage>
    );
  },
};
