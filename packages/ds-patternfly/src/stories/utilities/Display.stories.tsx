import type { Meta, StoryObj } from "@storybook/react-vite";
import { FoundationPage, Section, Card, CodeBlock } from "../_kit/StoryKit.js";
import { ClassTable, DemoFrame, ResponsiveNote } from "./_utilityKit.js";

const meta: Meta = {
  title: "Utility classes/Display",
  parameters: { layout: "padded" },
};
export default meta;

const DISPLAY = [
  "none",
  "inline",
  "inline-block",
  "block",
  "inline-flex",
  "flex",
  "inline-grid",
  "grid",
  "table",
  "table-row",
  "table-cell",
] as const;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Display utilities"
      intro={
        <>
          Set the CSS <code>display</code> property without writing styles.
          Combined with the responsive suffix, these are the workhorses of
          mobile-first layouts — show as block on mobile, swap to flex at the
          md breakpoint, that sort of thing.
        </>
      }
    >
      <Section title="Classes">
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <ClassTable
              rows={DISPLAY.map((d) => ({
                className: `pf-v6-u-display-${d}`,
                description: (
                  <>
                    Sets <code>display: {d}</code>.
                  </>
                ),
              }))}
            />
            <ResponsiveNote />
          </div>
        </Card>
      </Section>

      <Section
        title="The most common pattern"
        description="Hide on mobile, show at md+."
      >
        <Card>
          <div style={{ padding: 24, color: "var(--gp-color-text-regular)" }}>
            <p style={{ marginTop: 0 }}>
              For a sidebar, a contextual help panel, or any secondary nav
              element, the canonical mobile-first form is:
            </p>
            <CodeBlock>{`<aside className="pf-v6-u-display-none pf-v6-u-display-block-on-md">
  Sidebar
</aside>`}</CodeBlock>
            <p style={{ marginBottom: 0 }}>
              The bare class hides the element by default; the breakpoint
              variant shows it at and above <code>md</code> (768px). Resize
              the canvas to see it in the live demo below.
            </p>
          </div>
        </Card>
      </Section>

      <Section title="Live demo">
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame>
              <div className="pf-v6-u-display-none pf-v6-u-display-block-on-md">
                <strong>Visible at md+ (≥ 768px).</strong> Shrink the viewport
                below 768px and this disappears.
              </div>
              <div className="pf-v6-u-display-block pf-v6-u-display-none-on-md">
                <strong>Visible below md.</strong> Grow the viewport to 768px+
                and this disappears.
              </div>
            </DemoFrame>
            <DemoFrame>
              <div
                className="pf-v6-u-display-flex"
                style={{
                  gap: 12,
                  padding: 12,
                  background: "var(--gp-color-bg-primary-default)",
                }}
              >
                <span>flex item 1</span>
                <span>flex item 2</span>
                <span>flex item 3</span>
              </div>
            </DemoFrame>
          </div>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
