import type { Meta, StoryObj } from "@storybook/react-vite";
import { Spinner } from "@patternfly/react-core";
import { FoundationPage, Section, Card, CodeBlock } from "../../components/StoryKit.js";
import { DemoFrame, PropsTable } from "../../components/DemoKit.js";

const meta: Meta = {
  title: "Components/Spinner",
  parameters: { layout: "padded" },
};
export default meta;

const SIZES = ["sm", "md", "lg", "xl"] as const;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Spinner"
      intro={
        <>
          A loading indicator for short, indeterminate operations. Use it
          when something is happening but you can&apos;t communicate
          progress (no percentage, no step count). For known progress, use
          Progress instead.
        </>
      }
    >
      <Section title="Sizes">
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame>
              <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
                {SIZES.map((s) => (
                  <div key={s} style={{ textAlign: "center", color: "var(--gp-color-text-regular)" }}>
                    <Spinner size={s} aria-label={`Loading (${s})`} />
                    <div style={{ fontSize: 12, marginTop: 8 }}>{s}</div>
                  </div>
                ))}
              </div>
            </DemoFrame>
            <CodeBlock>{`<Spinner size="md" aria-label="Loading" />`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section title="Props">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                {
                  name: "size",
                  type: '"sm" | "md" | "lg" | "xl"',
                  description: "Visual size. Default md.",
                },
                {
                  name: "diameter",
                  type: "string",
                  description: 'Override size with an explicit value (e.g. "60px"). Prefer named sizes.',
                },
                {
                  name: "aria-label",
                  type: "string",
                  description: "Required when the spinner stands alone. Tells AT what's loading.",
                },
                {
                  name: "aria-valuetext",
                  type: "string",
                  description: "Optional richer status (e.g. \"Saving draft\").",
                },
                {
                  name: "isInline",
                  type: "boolean",
                  description: "Inline-flex display — aligns with surrounding text baseline.",
                },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section
        title="Accessibility"
        description="A spinning circle means nothing without a label."
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
              <strong>Always provide aria-label.</strong> Standalone spinners need an
              accessible name describing what&apos;s loading — &quot;Loading users&quot;,
              not just &quot;Loading&quot;.
            </li>
            <li>
              <strong>Inside a Button:</strong> use the Button&apos;s{" "}
              <code>isLoading</code> + <code>spinnerAriaLabel</code> instead of
              embedding a Spinner manually — the Button already does the
              right thing.
            </li>
            <li>
              <strong>Respect prefers-reduced-motion.</strong> Spinner animation is
              gentle but should still be paused for users who set the OS
              preference. PatternFly handles this; don&apos;t override the
              animation.
            </li>
          </ul>
        </Card>
      </Section>

      <Section
        title="When to use it"
        description="Spinner is for brief, indeterminate waits."
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
            <li><strong>&lt; 10 seconds, no known progress</strong> → Spinner.</li>
            <li><strong>Known progress (percentage, step count)</strong> → Progress or Progress stepper.</li>
            <li><strong>Long initial page load</strong> → Skeleton screens, not a spinner.</li>
            <li><strong>Inline action in a button</strong> → Button&apos;s built-in <code>isLoading</code>.</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
