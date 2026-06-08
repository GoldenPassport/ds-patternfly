import type { Meta, StoryObj } from "@storybook/react-vite";
import { FoundationPage, Section, Card } from "../../components/StoryKit.js";
import { ClassTable, DemoFrame, ResponsiveNote } from "./_utilityKit.js";

const meta: Meta = {
  title: "Utility classes/Float",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Float utilities"
      intro={
        <>
          Logical-property floats. Float layouts are rare in modern UI —
          flexbox or grid almost always do a cleaner job — but for embedding
          a small image or icon inline with prose, these are the right tool.
        </>
      }
    >
      <Section title="Classes" description="Both classes respect writing direction.">
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <ClassTable
              rows={[
                {
                  className: "pf-v6-u-float-inline-start",
                  description: (
                    <>
                      Float to the start edge — left in LTR, right in RTL.
                    </>
                  ),
                },
                {
                  className: "pf-v6-u-float-inline-end",
                  description: (
                    <>
                      Float to the end edge — right in LTR, left in RTL.
                    </>
                  ),
                },
              ]}
            />
            <ResponsiveNote />
          </div>
        </Card>
      </Section>

      <Section title="Live demo" description="Try toggling Direction in the toolbar.">
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame>
              <div
                className="pf-v6-u-float-inline-start"
                style={{
                  width: 80,
                  height: 80,
                  background: "var(--gp-color-brand-default)",
                  borderRadius: "var(--gp-radius-sm)",
                  marginInlineEnd: 16,
                  marginBlockEnd: 8,
                }}
              />
              <p style={{ margin: 0 }}>
                The square on the left is floated <code>inline-start</code>.
                In RTL mode it flips to the right, and the text wraps from
                the opposite side automatically.
              </p>
            </DemoFrame>
          </div>
        </Card>
      </Section>

      <Section
        title="When not to use float"
        description="Most cases that look like floats are actually grids."
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
            <li><strong>Two columns of content</strong> — use CSS grid or PatternFly&apos;s <code>Grid</code> component.</li>
            <li><strong>A button row aligned to the right</strong> — use <code>display: flex</code> with <code>justify-content: flex-end</code>.</li>
            <li><strong>A sidebar next to a main column</strong> — use grid; floats break in unpredictable ways at responsive breakpoints.</li>
            <li><strong>Wrapping text around an image inline with prose</strong> — this is the one good remaining use case.</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
