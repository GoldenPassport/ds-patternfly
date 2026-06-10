import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { useState } from "react";
import { useBrand } from "../../theme/useBrand.js";
import { FoundationPage, Section, Card, CodeBlock } from "../_kit/StoryKit.js";

const meta: Meta = {
  title: "Foundations/Motion",
  parameters: { layout: "padded" },
};
export default meta;

const DURATION_KEYS = ["fast", "normal", "slow"] as const;
const EASING_KEYS = ["standard", "in", "out"] as const;

function TokenRow({ label, cssVar, value }: { label: string; cssVar: string; value: string }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "120px 1fr 1fr",
        alignItems: "center",
        columnGap: 16,
        padding: "10px 12px",
        borderBlockEnd: "1px solid var(--gp-color-border-default)",
      }}
    >
      <div style={{ fontWeight: 600, color: "var(--gp-color-text-regular)" }}>
        {label}
      </div>
      <code style={{ fontSize: 12, color: "var(--gp-color-text-subtle)" }}>
        {cssVar}
      </code>
      <code style={{ fontSize: 12, color: "var(--gp-color-text-subtle)" }}>
        {value}
      </code>
    </div>
  );
}

function MoveDemo({ duration, easing }: { duration: string; easing: string }) {
  const [on, setOn] = useState(false);
  return (
    <div>
      <div
        style={{
          position: "relative",
          height: 40,
          borderRadius: "var(--gp-radius-md)",
          background: "var(--gp-color-bg-secondary-default)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            insetBlockStart: 4,
            insetInlineStart: on ? "calc(100% - 36px)" : 4,
            width: 32,
            height: 32,
            background: "var(--gp-color-brand-default)",
            // Square box → circle via the pill radius dial (matches icon btns).
            borderRadius: "var(--gp-radius-pill)",
            transition: `inset-inline-start ${duration} ${easing}`,
          }}
        />
      </div>
      <button
        onClick={() => setOn((v) => !v)}
        style={{
          marginTop: 8,
          padding: "4px 10px",
          background: "var(--gp-color-bg-secondary-default)",
          color: "var(--gp-color-text-regular)",
          border: "1px solid var(--gp-color-border-default)",
          // Use the global button-shape dial (pill by default).
          borderRadius: "var(--gp-radius-button)",
          cursor: "pointer",
          fontFamily: "var(--gp-font-family)",
        }}
      >
        Toggle
      </button>
    </div>
  );
}

export const Tokens: StoryObj = {
  render: () => {
    const brand = useBrand();
    return (
      <FoundationPage
        title="Motion"
        intro={
          <>
            Motion tokens describe how the system animates. Durations and
            easings are part of the brand contract so motion can feel different
            per brand (e.g. <em>Golden Passport</em> uses a softer, slightly
            slower set than the default).
          </>
        }
      >
        <Section
          title="Durations"
          description="Three semantic speeds. Use fast for hover/focus, normal for component transitions, slow for entrances."
        >
          <Card>
            {DURATION_KEYS.map((k) => (
              <TokenRow
                key={k}
                label={k}
                cssVar={`--gp-motion-duration-${k}`}
                value={brand.motion.duration[k]}
              />
            ))}
          </Card>
        </Section>

        <Section
          title="Easings"
          description="Bezier curves that shape the rate of change."
        >
          <Card>
            {EASING_KEYS.map((k) => (
              <TokenRow
                key={k}
                label={k}
                cssVar={`--gp-motion-easing-${k}`}
                value={brand.motion.easing[k]}
              />
            ))}
          </Card>
        </Section>
      </FoundationPage>
    );
  },
};

export const Examples: StoryObj = {
  render: () => {
    const brand = useBrand();
    return (
      <FoundationPage
        title="Motion — examples"
        intro="Click each Toggle to see the motion token combination in action."
      >
        <Section title="Duration × standard easing">
          <Card>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 24,
                padding: 24,
              }}
            >
              {DURATION_KEYS.map((k) => (
                <div key={k}>
                  <div
                    style={{
                      fontWeight: 600,
                      marginBlockEnd: 8,
                      color: "var(--gp-color-text-regular)",
                    }}
                  >
                    {k} ({brand.motion.duration[k]})
                  </div>
                  <MoveDemo
                    duration={brand.motion.duration[k]}
                    easing={brand.motion.easing.standard}
                  />
                </div>
              ))}
            </div>
          </Card>
        </Section>

        <Section title="Easings @ normal duration">
          <Card>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 24,
                padding: 24,
              }}
            >
              {EASING_KEYS.map((k) => (
                <div key={k}>
                  <div
                    style={{
                      fontWeight: 600,
                      marginBlockEnd: 8,
                      color: "var(--gp-color-text-regular)",
                    }}
                  >
                    {k}
                  </div>
                  <MoveDemo
                    duration={brand.motion.duration.normal}
                    easing={brand.motion.easing[k]}
                  />
                </div>
              ))}
            </div>
          </Card>
        </Section>

        <Section
          title="Reduced motion"
          description="Respect prefers-reduced-motion: do not autoplay decorative animations; keep transitions short and avoid parallax / large translations."
        >
          <Card>
            <CodeBlock label="Reduced motion CSS">{`@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0ms !important;
    transition-duration: 0ms !important;
  }
}`}</CodeBlock>
          </Card>
        </Section>
      </FoundationPage>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("toggling moves the box (motion tokens drive layout)", async () => {
      const toggles = canvas.getAllByRole("button", { name: "Toggle" });
      // 6 demos = 3 durations + 3 easings.
      await expect(toggles.length).toBeGreaterThanOrEqual(6);

      // Pick the first demo's box (the one inside the same parent as the
      // first toggle button).
      const firstToggle = toggles[0]!;
      const demoContainer = firstToggle.closest("div")!.parentElement!;
      const movingBox = demoContainer.querySelector(
        'div[style*="position: absolute"]',
      ) as HTMLElement;
      await expect(movingBox).toBeTruthy();

      const before = movingBox.style.insetInlineStart;
      await userEvent.click(firstToggle);
      const after = movingBox.style.insetInlineStart;
      // The token-driven inline style must change on toggle.
      await expect(after).not.toBe(before);
    });
  },
};
