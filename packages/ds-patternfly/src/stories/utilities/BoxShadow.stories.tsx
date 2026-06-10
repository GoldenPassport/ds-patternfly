import type { Meta, StoryObj } from "@storybook/react-vite";
import { FoundationPage, Section, Card } from "../_kit/StoryKit.js";
import { ClassTable, DemoFrame } from "./_utilityKit.js";

const meta: Meta = {
  title: "Utility classes/Box shadow",
  parameters: { layout: "padded" },
};
export default meta;

const SIZES = ["sm", "md", "lg"] as const;
const SIDES = ["", "-top", "-right", "-bottom", "-left"] as const;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Box shadow utilities"
      intro={
        <>
          Three elevation levels (sm, md, lg) and an edge variant for each
          side. Use sparingly — shadows compete for visual hierarchy, and the
          system relies more on borders and surface tone than on elevation.
        </>
      }
    >
      <Section title="Elevation classes">
        <Card>
          <div style={{ padding: 24 }}>
            <ClassTable
              rows={SIZES.map((s) => ({
                className: `pf-v6-u-box-shadow-${s}`,
                description: (
                  <>
                    Elevation level <code>{s}</code> — drops a subtle shadow
                    in all four directions.
                  </>
                ),
              }))}
            />
          </div>
        </Card>
      </Section>

      <Section title="Edge classes" description="Same three sizes, but the shadow only appears on one side.">
        <Card>
          <div style={{ padding: 24 }}>
            <ClassTable
              rows={SIZES.flatMap((s) =>
                SIDES.filter((side) => side !== "").map((side) => ({
                  className: `pf-v6-u-box-shadow-${s}${side}`,
                  description: (
                    <>
                      Size {s}, <code>{side.replace("-", "")}</code> edge only.
                      Useful for sticky headers/footers and column dividers.
                    </>
                  ),
                })),
              )}
            />
          </div>
        </Card>
      </Section>

      <Section title="Live demo">
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 24 }}>
            <DemoFrame>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                  gap: 24,
                }}
              >
                {SIZES.map((s) => (
                  <div
                    key={s}
                    className={`pf-v6-u-box-shadow-${s}`}
                    style={{
                      padding: 24,
                      background: "var(--gp-color-bg-primary-default)",
                      borderRadius: "var(--gp-radius-sm)",
                      textAlign: "center",
                      fontFamily: "var(--gp-font-family)",
                    }}
                  >
                    <code style={{ display: "block" }}>{s}</code>
                  </div>
                ))}
              </div>
            </DemoFrame>
          </div>
        </Card>
      </Section>

      <Section
        title="When to use which"
        description="Stay near the floor of the elevation scale."
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
            <li><strong><code>sm</code></strong> — default for cards and dropdowns. Should be the most common choice.</li>
            <li><strong><code>md</code></strong> — popovers and elements that float over content but stay attached to a trigger.</li>
            <li><strong><code>lg</code></strong> — modals and toasts. Use rarely; if you reach for it on a non-modal element, reconsider.</li>
            <li><strong>Edge variants</strong> — for sticky chrome where a shadow on one side communicates "this is fixed and content scrolls under it".</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
