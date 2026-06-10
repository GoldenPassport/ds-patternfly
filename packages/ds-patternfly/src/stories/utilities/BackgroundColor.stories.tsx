import type { Meta, StoryObj } from "@storybook/react-vite";
import { FoundationPage, Section, Card } from "../_kit/StoryKit.js";
import { ClassTable, DemoFrame } from "./_utilityKit.js";

const meta: Meta = {
  title: "Utility classes/Background color",
  parameters: { layout: "padded" },
};
export default meta;

const BG = [
  {
    className: "pf-v6-u-background-color-disabled",
    textClassName: "",
    label: "Disabled state — muted neutral. Pair with disabled text/icon utilities.",
  },
  {
    className: "pf-v6-u-background-color-highlight",
    textClassName: "",
    label: "Highlight — used for selected rows, callouts, and emphasis surfaces.",
  },
  {
    className: "pf-v6-u-background-color-inverse",
    // Dark surface — pair with inverse text so the contents stay legible.
    textClassName: "pf-v6-u-text-color-inverse",
    label: "Inverse — dark surface in light mode, light surface in dark mode.",
  },
] as const;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Background color utilities"
      intro={
        <>
          A small set of semantic background tones for cases where you need a
          quick surface treatment without authoring a component. These adapt
          to the active color mode automatically.
        </>
      }
    >
      <Section title="Classes">
        <Card>
          <div style={{ padding: 24 }}>
            <ClassTable
              rows={BG.map((b) => ({
                className: b.className,
                description: b.label,
              }))}
            />
          </div>
        </Card>
      </Section>

      <Section
        title="Live demo"
        description="Toggle the toolbar Mode (light/dark) to see how each tone responds."
      >
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            {BG.map((b) => (
              <DemoFrame key={b.className}>
                <code
                  style={{
                    display: "block",
                    color: "var(--gp-color-text-subtle)",
                    fontSize: 12,
                    marginBottom: 8,
                  }}
                >
                  {b.className}
                </code>
                <div
                  className={`${b.className} ${b.textClassName}`.trim()}
                  style={{
                    padding: 24,
                    borderRadius: "var(--gp-radius-sm)",
                    minHeight: 60,
                    // Force a strong default text color so the demo passes
                    // AA against the surface tone — the page is documenting
                    // the bg utility, not testing default text contrast.
                    color: b.textClassName ? undefined : "#000",
                    fontWeight: 600,
                  }}
                >
                  Sample surface
                </div>
              </DemoFrame>
            ))}
          </div>
        </Card>
      </Section>

      <Section
        title="When to prefer brand variables instead"
        description="Most surface color decisions belong to the theme system, not utilities."
      >
        <Card>
          <div style={{ padding: 24, color: "var(--gp-color-text-regular)" }}>
            <p style={{ marginTop: 0, marginBottom: 0 }}>
              For brand-aware surfaces (cards, panels, primary content
              backgrounds), reach for{" "}
              <code>var(--gp-color-bg-primary-default)</code>,{" "}
              <code>var(--gp-color-bg-secondary-default)</code>, or one of the
              status-tinted variables instead. Utility classes here are
              static; the brand variables shift across both brand and color
              mode.
            </p>
          </div>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
