import type { Meta, StoryObj } from "@storybook/react-vite";
import { FoundationPage, Section, Card } from "../../components/StoryKit.js";
import { ClassTable, DemoFrame, ResponsiveNote } from "./_utilityKit.js";

const meta: Meta = {
  title: "Utility classes/Sizing",
  parameters: { layout: "padded" },
};
export default meta;

const PERCENTS = ["0", "25", "33", "50", "66", "75", "100"] as const;

const WIDTH = [
  ...PERCENTS.map((p) => ({
    className: `pf-v6-u-w-${p}`,
    description: `width: ${p}% of the parent container.`,
  })),
  { className: "pf-v6-u-w-auto", description: "width: auto — let content determine width." },
  { className: "pf-v6-u-w-100vw", description: "width: 100vw — full viewport width." },
];

const HEIGHT = [
  ...PERCENTS.map((p) => ({
    className: `pf-v6-u-h-${p}`,
    description: `height: ${p}% of the parent container.`,
  })),
  { className: "pf-v6-u-h-auto", description: "height: auto." },
  { className: "pf-v6-u-h-100vh", description: "height: 100vh — full viewport height." },
];

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Sizing utilities"
      intro={
        <>
          Width and height in fixed percentage steps and viewport units. The
          percentage scale (0/25/33/50/66/75/100) covers the great majority
          of layout fractions; reach for raw CSS only when you need
          something between.
        </>
      }
    >
      <Section title="Width classes">
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <ClassTable rows={WIDTH} />
            <ResponsiveNote />
          </div>
        </Card>
      </Section>

      <Section title="Height classes">
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <ClassTable rows={HEIGHT} />
            <ResponsiveNote />
          </div>
        </Card>
      </Section>

      <Section title="Live width demo">
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 8 }}>
            {PERCENTS.map((p) => (
              <DemoFrame key={p}>
                <code style={{ display: "block", fontSize: 12, marginBottom: 4, color: "var(--gp-color-text-subtle)" }}>
                  pf-v6-u-w-{p}
                </code>
                <div
                  className={`pf-v6-u-w-${p}`}
                  style={{
                    height: 18,
                    background: "var(--gp-color-brand-default)",
                    borderRadius: "var(--gp-radius-sm)",
                  }}
                />
              </DemoFrame>
            ))}
          </div>
        </Card>
      </Section>

      <Section
        title="Min/max variants"
        description="The package also ships pf-v6-u-{max,min}-{width,height} for ceiling/floor constraints — use sparingly."
      >
        <Card>
          <div style={{ padding: 24, color: "var(--gp-color-text-regular)" }}>
            <p style={{ margin: 0 }}>
              These are intentionally not enumerated here — the values come
              from PatternFly&apos;s sizing tokens and shift between releases.
              When you reach for them, prefer setting{" "}
              <code>max-inline-size</code> with a CSS variable on a custom
              class so the constraint stays grouped with the component it
              belongs to.
            </p>
          </div>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
