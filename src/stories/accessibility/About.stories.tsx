import type { Meta, StoryObj } from "@storybook/react-vite";
import { FoundationPage, Section, Card } from "../_storyKit.js";

const meta: Meta = {
  title: "Accessibility/About accessibility",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="About accessibility"
      intro={
        <>
          Accessibility is a contract this design system makes with every user
          — keyboard-only, screen-reader, low-vision, motor-impaired, or
          cognitively-loaded. The lib is built so that an app can ship
          accessibly by default; degrading that requires effort, not the other
          way around.
        </>
      }
    >
      <Section
        title="Target"
        description="The bar this system aims for, with no exceptions."
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
              <strong>WCAG 2.2 Level AA</strong> for color contrast, focus
              visibility, target size, and keyboard operability.
            </li>
            <li>
              <strong>Section 508</strong> conformance via WCAG AA.
            </li>
            <li>
              <strong>WAI-ARIA Authoring Practices</strong> for keyboard
              interaction patterns (lists, dialogs, menus, etc.) — inherited
              from PatternFly 6.
            </li>
          </ul>
        </Card>
      </Section>

      <Section
        title="What this lib guarantees"
        description="Properties enforced at build time or in code."
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
              <strong>Color contrast in every brand</strong> — every brand is
              validated against WCAG AA in both light and dark modes by{" "}
              <code>tokens.test.ts</code>. A new brand that fails fails the
              build.
            </li>
            <li>
              <strong>Required ARIA props are required at the type level</strong>{" "}
              — components like <code>PrimaryDetailLayout</code> won&apos;t
              compile without their <code>labels</code> prop. There is no
              silent English fallback.
            </li>
            <li>
              <strong>No hardcoded UI strings</strong> — every user-facing
              string is a typed prop. Translation library choice belongs to
              the consuming app.
            </li>
            <li>
              <strong>Visible focus rings</strong> — a base CSS rule binds the
              focus-visible outline to the brand&apos;s primary color so
              brands cannot accidentally hide it.
            </li>
            <li>
              <strong>Skip-to-content</strong> is built into{" "}
              <code>Shell</code>.
            </li>
            <li>
              <strong>Logical CSS properties</strong> — layouts use{" "}
              <code>inline-start</code>/<code>block-end</code> etc., so RTL
              works without CSS changes.
            </li>
          </ul>
        </Card>
      </Section>

      <Section
        title="What you (the consumer) own"
        description="Things only the consuming app can decide or test."
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
            <li>Translating the <code>*Labels</code> objects you pass in.</li>
            <li>Setting <code>lang</code> on <code>&lt;html&gt;</code>.</li>
            <li>
              Honoring <code>prefers-reduced-motion</code> at the app level
              (the lib provides motion tokens; you provide the global rule).
            </li>
            <li>
              Wiring meaningful <code>alt</code> text on imagery and{" "}
              <code>aria-label</code> on icon-only buttons you compose.
            </li>
            <li>
              End-to-end screen-reader testing of your specific flows.
            </li>
          </ul>
        </Card>
      </Section>

      <Section title="Where to go next">
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
              <strong>Accessibility scorecard</strong> — per-component status.
            </li>
            <li>
              <strong>Design for accessibility</strong> — color, type, motion
              guidance for designers using this system.
            </li>
            <li>
              <strong>Develop for accessibility</strong> — code patterns and
              prop contracts for engineers.
            </li>
            <li>
              <strong>Testing your accessibility</strong> — automated and
              manual checks already wired into this repo.
            </li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
