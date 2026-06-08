import type { Meta, StoryObj } from "@storybook/react-vite";
import { FoundationPage, Section, Card } from "../../components/StoryKit.js";

const meta: Meta = {
  title: "Accessibility/Design for accessibility",
  parameters: { layout: "padded" },
};
export default meta;

export const Guidelines: StoryObj = {
  render: () => (
    <FoundationPage
      title="Design for accessibility"
      intro={
        <>
          Most accessibility wins or fails happen at design time. Following
          these rules when defining brands, choosing colors, and laying out
          screens makes a11y the default, not a remediation step.
        </>
      }
    >
      <Section
        title="Color"
        description="Color carries information; everyone has to be able to perceive it."
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
              <strong>Body text vs background ≥ 4.5:1.</strong> Large text
              (≥18pt or ≥14pt bold) and UI components ≥ 3:1.
            </li>
            <li>
              <strong>Never use color alone</strong> to convey state. Pair it
              with an icon, label, pattern, or text. Status colors in this
              system always come with a matching icon token.
            </li>
            <li>
              <strong>Focus rings stay visible.</strong> Don&apos;t override
              the brand&apos;s focus color with something near-background.
            </li>
            <li>
              <strong>Authoring a brand?</strong> Run{" "}
              <code>pnpm test</code> — the brand contrast suite will fail loud
              if any required pair drops below AA in either mode.
            </li>
          </ul>
        </Card>
      </Section>

      <Section
        title="Typography"
        description="Legibility = size × weight × line height × contrast."
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
              <strong>Body 16px minimum.</strong> Avoid 12px for anything users
              must read. Captions and helper text only.
            </li>
            <li>
              <strong>Line height 1.5+ for body</strong>, 1.2–1.3 for headings.
            </li>
            <li>
              <strong>Don&apos;t justify body text.</strong> Rivers of
              whitespace hurt low-vision and dyslexic readers.
            </li>
            <li>
              <strong>Sentence case for buttons and labels.</strong> ALL CAPS
              degrades scan speed for screen readers and many users.
            </li>
          </ul>
        </Card>
      </Section>

      <Section
        title="Layout & target size"
        description="Hands and pointers — not just eyes."
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
              <strong>Touch targets ≥ 24×24 CSS px</strong> (WCAG 2.2). 44×44
              is the comfortable default.
            </li>
            <li>
              <strong>Spacing between targets</strong> prevents fat-finger
              taps. Use <code>--gp-space-sm</code> minimum.
            </li>
            <li>
              <strong>Don&apos;t hide content behind hover only.</strong>{" "}
              Touch and keyboard users can&apos;t hover.
            </li>
            <li>
              <strong>Logical reading order matches DOM order.</strong> Screen
              readers and keyboard users follow the DOM, not the visual grid.
            </li>
          </ul>
        </Card>
      </Section>

      <Section
        title="Motion"
        description="Movement is communication; wrong amount overwhelms or excludes."
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
              <strong>Use motion tokens</strong> — the system&apos;s durations
              are designed to feel snappy without triggering vestibular issues.
            </li>
            <li>
              <strong>Respect <code>prefers-reduced-motion</code></strong>.
              Strip non-essential animation when set.
            </li>
            <li>
              <strong>No autoplay video, no parallax</strong> on default views.
            </li>
            <li>
              <strong>Animate opacity and transform</strong>, not properties
              that cause layout (top, left, width).
            </li>
          </ul>
        </Card>
      </Section>

      <Section
        title="Language"
        description="Plain language is a11y."
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
            <li>Short sentences. Active voice.</li>
            <li>Define jargon at first use; avoid it where possible.</li>
            <li>
              Error messages explain what happened and the next step — never
              just &quot;Invalid&quot;.
            </li>
            <li>
              Form labels describe purpose, not appearance. &quot;Email&quot;,
              not &quot;The box below&quot;.
            </li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
