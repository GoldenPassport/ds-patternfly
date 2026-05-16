import type { Meta, StoryObj } from "@storybook/react-vite";
import { FoundationPage, Section, Card } from "../_storyKit.js";
import { ClassTable, DemoFrame, ResponsiveNote } from "./_utilityKit.js";

const meta: Meta = {
  title: "Utility classes/Alignment",
  parameters: { layout: "padded" },
};
export default meta;

const ALIGN = [
  { className: "pf-v6-u-text-align-start", label: "start (left in LTR, right in RTL)" },
  { className: "pf-v6-u-text-align-center", label: "center" },
  { className: "pf-v6-u-text-align-end", label: "end (right in LTR, left in RTL)" },
  { className: "pf-v6-u-text-align-justify", label: "justified — both edges flush" },
] as const;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Alignment utilities"
      intro={
        <>
          Logical-property text alignment. <code>start</code> and{" "}
          <code>end</code> respect writing direction (LTR vs RTL), so they
          work correctly in both English and Arabic without overrides.
        </>
      }
    >
      <Section title="Classes">
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <ClassTable
              rows={ALIGN.map((a) => ({
                className: a.className,
                description: a.label,
              }))}
            />
            <ResponsiveNote />
          </div>
        </Card>
      </Section>

      <Section title="Live demo" description="Switch the toolbar Direction to LTR/RTL to see start/end flip.">
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            {ALIGN.map((a) => (
              <DemoFrame key={a.className}>
                <code
                  style={{
                    display: "block",
                    color: "var(--gp-color-text-subtle)",
                    fontSize: 12,
                    marginBottom: 8,
                  }}
                >
                  {a.className}
                </code>
                <p className={a.className} style={{ margin: 0 }}>
                  The quick brown fox jumps over the lazy dog. The quick brown
                  fox jumps over the lazy dog.
                </p>
              </DemoFrame>
            ))}
          </div>
        </Card>
      </Section>

      <Section
        title="Picking start/end vs left/right"
        description="Always use start/end. There's no reason to reach for left/right in this system."
      >
        <Card>
          <div style={{ padding: 24, color: "var(--gp-color-text-regular)" }}>
            <p style={{ marginTop: 0, marginBottom: 0 }}>
              The alignment utilities only ship the logical-property variants
              by design — start/end automatically do the right thing across
              writing directions, so you never have to special-case RTL
              brands or future locale support. The lib&apos;s own components
              follow the same rule (see <code>src/styles/index.css</code>:{" "}
              <code>border-inline-end</code>, <code>insetInlineStart</code>,
              etc.).
            </p>
          </div>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
