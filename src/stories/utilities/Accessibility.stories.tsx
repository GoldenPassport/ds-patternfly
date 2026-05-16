import type { Meta, StoryObj } from "@storybook/react-vite";
import { FoundationPage, Section, Card } from "../_storyKit.js";
import { ClassTable, DemoFrame, ResponsiveNote } from "./_utilityKit.js";

const meta: Meta = {
  title: "Utility classes/Accessibility",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Accessibility utilities"
      intro={
        <>
          Three classes for managing what is visible to sighted users versus
          assistive technology. Use them sparingly — usually a properly
          structured component is better than hiding things — but they are
          essential for skip links, off-screen labels, and breakpoint-driven
          UI swaps.
        </>
      }
    >
      <Section title="Classes" description="Base classes; all support responsive variants.">
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <ClassTable
              rows={[
                {
                  className: "pf-v6-u-screen-reader",
                  description: (
                    <>
                      Visually hidden but readable by screen readers. Use for
                      labels and headings that are required for AT but visually
                      redundant.
                    </>
                  ),
                },
                {
                  className: "pf-v6-u-visible",
                  description: (
                    <>
                      The inverse — restores normal visibility. Pair with{" "}
                      <code>pf-v6-u-screen-reader</code> at a breakpoint to
                      reveal hidden content on larger viewports.
                    </>
                  ),
                },
                {
                  className: "pf-v6-u-hidden",
                  description: (
                    <>
                      Hidden from <em>everyone</em> — sets <code>display: none</code>.
                      Removes the element from the accessibility tree as well as
                      the visual layout.
                    </>
                  ),
                },
              ]}
            />
            <ResponsiveNote />
          </div>
        </Card>
      </Section>

      <Section title="Live demo" description="Each example shows the rendered effect.">
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame>
              <p style={{ margin: 0 }}>
                Visible label{" "}
                <span className="pf-v6-u-screen-reader">
                  (extra context for screen readers — invisible here)
                </span>
              </p>
            </DemoFrame>
            <DemoFrame>
              <span className="pf-v6-u-hidden">You cannot see this.</span>
              <span>You can see this.</span>
            </DemoFrame>
          </div>
        </Card>
      </Section>

      <Section
        title="When to use which"
        description="Picking between these is usually a one-line decision."
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
              <strong><code>pf-v6-u-screen-reader</code></strong> — needed by AT, not needed visually.
              Skip-link text, off-screen form labels, hidden table captions.
            </li>
            <li>
              <strong><code>pf-v6-u-hidden</code></strong> — not needed by anyone right now.
              Conditional UI that's truly inactive at this breakpoint.
            </li>
            <li>
              <strong>Neither — use real semantics.</strong> If something needs to be
              shown/hidden based on app state, prefer conditional rendering over
              utility-class toggling. AT users get a cleaner experience.
            </li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
