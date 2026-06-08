import type { Meta, StoryObj } from "@storybook/react-vite";
import { FoundationPage, Section, Card, CodeBlock } from "../../components/StoryKit.js";
import { ClassTable, DemoFrame, ResponsiveNote } from "./_utilityKit.js";

const meta: Meta = {
  title: "Utility classes/Spacing",
  parameters: { layout: "padded" },
};
export default meta;

const STEPS = ["0", "xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "auto"] as const;

const PROPERTIES = [
  { prefix: "m", name: "margin (all sides)" },
  { prefix: "mx", name: "margin-inline (horizontal)" },
  { prefix: "my", name: "margin-block (vertical)" },
  { prefix: "mt", name: "margin-top" },
  { prefix: "mr", name: "margin-right (or margin-inline-end in RTL)" },
  { prefix: "mb", name: "margin-bottom" },
  { prefix: "ml", name: "margin-left (or margin-inline-start in RTL)" },
  { prefix: "p", name: "padding (all sides)" },
  { prefix: "px", name: "padding-inline" },
  { prefix: "py", name: "padding-block" },
  { prefix: "pt", name: "padding-top" },
  { prefix: "pr", name: "padding-right" },
  { prefix: "pb", name: "padding-bottom" },
  { prefix: "pl", name: "padding-left" },
];

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Spacing utilities"
      intro={
        <>
          Margin and padding on the spacer scale, for every side and
          direction. The largest set of utilities the system ships — use
          them for one-off adjustments, but if you find yourself stacking
          three or four on the same element, the right move is usually a
          custom class.
        </>
      }
    >
      <Section
        title="Naming pattern"
        description="The class name encodes property, optional direction, and step."
      >
        <Card>
          <div style={{ padding: 24, color: "var(--gp-color-text-regular)" }}>
            <CodeBlock>{`pf-v6-u-{property}-{step}

property: m | mx | my | mt | mr | mb | ml   (margin variants)
          p | px | py | pt | pr | pb | pl   (padding variants)
step:     0 | xs | sm | md | lg | xl | 2xl | 3xl | 4xl | auto`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section title="Property prefixes">
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <ClassTable
              rows={PROPERTIES.map((p) => ({
                className: `pf-v6-u-${p.prefix}-{step}`,
                description: p.name,
              }))}
            />
            <ResponsiveNote />
          </div>
        </Card>
      </Section>

      <Section title="Steps">
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <ClassTable
              rows={STEPS.map((s) => ({
                className: s,
                description:
                  s === "auto"
                    ? "Browser-computed auto value — useful for centering a fixed-width element with mx-auto."
                    : s === "0"
                      ? "Zero — strip default browser spacing."
                      : `Spacer scale step ${s}.`,
              }))}
            />
          </div>
        </Card>
      </Section>

      <Section title="Live padding demo" description="Each card uses the named padding step on all sides.">
        <Card>
          <div style={{ padding: 24 }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                gap: 12,
              }}
            >
              {(["xs", "sm", "md", "lg", "xl"] as const).map((s) => (
                <DemoFrame key={s}>
                  <code style={{ display: "block", fontSize: 12, marginBottom: 8, color: "var(--gp-color-text-subtle)" }}>
                    pf-v6-u-p-{s}
                  </code>
                  <div
                    className={`pf-v6-u-p-${s}`}
                    style={{
                      background: "var(--gp-color-brand-default)",
                      borderRadius: "var(--gp-radius-sm)",
                    }}
                  >
                    <div
                      style={{
                        background: "var(--gp-color-bg-primary-default)",
                        height: 32,
                      }}
                    />
                  </div>
                </DemoFrame>
              ))}
            </div>
          </div>
        </Card>
      </Section>

      <Section
        title="The most common pattern"
        description="Center a fixed-width container."
      >
        <Card>
          <div style={{ padding: 24, color: "var(--gp-color-text-regular)" }}>
            <CodeBlock>{`<div className="pf-v6-u-mx-auto" style={{ maxWidth: 720 }}>
  Centered content
</div>`}</CodeBlock>
          </div>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
