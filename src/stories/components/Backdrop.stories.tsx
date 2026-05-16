import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Backdrop, Bullseye, Button, Spinner } from "@patternfly/react-core";
import { FoundationPage, Section, Card, CodeBlock } from "../_storyKit.js";
import { DemoFrame, PropsTable } from "../_demoKit.js";

const meta: Meta = {
  title: "Components/Backdrop",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <FoundationPage
        title="Backdrop"
        intro={
          <>
            A semi-transparent overlay that dims the page behind a focused
            surface. <code>Modal</code>, <code>Wizard</code>, and{" "}
            <code>AboutModal</code> include their own backdrop — you rarely
            render this directly. Use it to build custom blocking overlays
            (full-page loaders, custom dialogs).
          </>
        }
      >
        <Section title="Custom blocking overlay">
          <Card>
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <DemoFrame height={220}>
                <Button onClick={() => setOpen(true)}>Show overlay</Button>
                {open && (
                  <Backdrop>
                    <Bullseye>
                      <div
                        style={{
                          background: "var(--gp-color-bg-elevated)",
                          padding: 24,
                          borderRadius: "var(--gp-radius-md)",
                          display: "grid",
                          gap: 12,
                          justifyItems: "center",
                          color: "var(--gp-color-text-regular)",
                        }}
                      >
                        <Spinner aria-label="Loading" />
                        <span>Loading workspace…</span>
                        <Button variant="link" onClick={() => setOpen(false)}>
                          Cancel
                        </Button>
                      </div>
                    </Bullseye>
                  </Backdrop>
                )}
              </DemoFrame>
              <CodeBlock>{`{isLoading && (
  <Backdrop>
    <Bullseye>
      <div className="loader-card">
        <Spinner aria-label="Loading" />
        <span>Loading workspace…</span>
      </div>
    </Bullseye>
  </Backdrop>
)}`}</CodeBlock>
            </div>
          </Card>
        </Section>

        <Section title="Most-used props">
          <Card>
            <div style={{ padding: 24 }}>
              <PropsTable
                rows={[
                  { name: "children", type: "ReactNode", description: "Content rendered above the dimmed backdrop. Pair with Bullseye for centred content." },
                  { name: "className", type: "string", description: "Additional class for the backdrop element. Use to layer custom overrides on top of the PF6 visuals." },
                ]}
              />
            </div>
          </Card>
        </Section>

        <Section title="Accessibility">
          <Card>
            <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
              <li><strong>Backdrop alone is not accessible.</strong> It's a visual treatment — it doesn't trap focus, hide page content from screen readers, or handle Escape. Wrap interactive content in a properly-roled container (dialog) with focus trapping.</li>
              <li><strong>Don't use it for non-blocking states.</strong> A dim overlay implies "you can't interact with the page" — if the page is still usable, skip the backdrop and use inline loaders instead.</li>
              <li><strong>Always provide a way out.</strong> Even a loading backdrop should have a cancel option, or auto-dismiss when work completes — never leave users trapped.</li>
            </ul>
          </Card>
        </Section>
      </FoundationPage>
    );
  },
};
