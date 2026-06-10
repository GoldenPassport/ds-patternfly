import type { Meta, StoryObj } from "@storybook/react-vite";
import { FoundationPage, Section, Card, CodeBlock } from "../_kit/StoryKit.js";

const meta: Meta = {
  title: "Accessibility/Testing your accessibility",
  parameters: { layout: "padded" },
};
export default meta;

export const Workflow: StoryObj = {
  render: () => (
    <FoundationPage
      title="Testing your accessibility"
      intro={
        <>
          Automated tests catch the regressions; manual testing catches the
          subtle stuff. A real a11y workflow uses both. The repo ships some of
          this for you; the rest is on the consuming app.
        </>
      }
    >
      <Section
        title="What this repo runs automatically"
        description="Wired in already — you don't need to set them up."
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
              <strong>Brand contrast tests</strong> —{" "}
              <code>tokens.test.ts</code> validates 14 semantic color pairs ×
              2 modes × every brand against WCAG AA. Run with{" "}
              <code>pnpm --filter @golden-passport/ds-patternfly test</code>.
            </li>
            <li>
              <strong>axe-core in Storybook</strong> — every story is scanned
              by <code>@storybook/addon-a11y</code>. Open the{" "}
              <em>Accessibility</em> tab in any story; the panel highlights
              violations with the exact selector and rule.
            </li>
            <li>
              <strong>Strict TypeScript</strong> rejects missing required ARIA
              props (e.g. <code>labels</code> on layouts) at compile time.
            </li>
          </ul>
        </Card>
      </Section>

      <Section
        title="Add an axe scan to your app's e2e tests"
        description="Catch a11y regressions on the screens you actually ship."
      >
        <Card>
          <CodeBlock>{`// playwright + @axe-core/playwright
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("dashboard has no detectable a11y violations", async ({ page }) => {
  await page.goto("/dashboard");
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(results.violations).toEqual([]);
});`}</CodeBlock>
        </Card>
      </Section>

      <Section
        title="Manual checklist (per major flow)"
        description="Run this before shipping. ~5 minutes per flow."
      >
        <Card>
          <ol
            style={{
              margin: 0,
              padding: "16px 24px 16px 40px",
              color: "var(--gp-color-text-regular)",
              lineHeight: 1.8,
            }}
          >
            <li>
              <strong>Tab from the top of the page.</strong> Focus order
              matches reading order. Every interactive element receives focus.
              Focus is always visible.
            </li>
            <li>
              <strong>Activate every control with the keyboard.</strong> Enter
              / Space on buttons, arrow keys in lists/menus, Escape closes
              dialogs.
            </li>
            <li>
              <strong>Run a screen reader on the flow</strong> — VoiceOver on
              macOS (Cmd+F5), NVDA on Windows. Are landmarks announced? Form
              fields named? Status messages spoken on success/error?
            </li>
            <li>
              <strong>Zoom to 200%.</strong> No horizontal scroll, no
              overlapping content, all controls still usable.
            </li>
            <li>
              <strong>Toggle dark mode.</strong> Same checks pass; nothing
              becomes unreadable.
            </li>
            <li>
              <strong>Toggle <code>dir=&quot;rtl&quot;</code>.</strong>{" "}
              Layout mirrors correctly; nothing escapes off-screen.
            </li>
            <li>
              <strong>Disable CSS</strong> (DevTools → Settings → Disable CSS).
              The page is still readable in source order — proof DOM order is
              meaningful.
            </li>
            <li>
              <strong>Set OS reduced-motion preference.</strong> Decorative
              animations stop or shorten dramatically.
            </li>
          </ol>
        </Card>
      </Section>

      <Section
        title="Tools we recommend"
        description="Free, fast, and high-signal."
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
              <strong>axe DevTools</strong> (browser extension) — same engine
              Storybook uses, but on your live app.
            </li>
            <li>
              <strong>Lighthouse</strong> — accessibility section gives a
              quick score plus actionable issues.
            </li>
            <li>
              <strong>WAVE</strong> — visual overlay of landmarks, headings,
              and ARIA on the rendered page.
            </li>
            <li>
              <strong>NVDA</strong> (Windows, free) and{" "}
              <strong>VoiceOver</strong> (macOS, built-in) — primary screen
              readers to test against.
            </li>
            <li>
              <strong>Color Oracle</strong> — system-wide color blindness
              simulator.
            </li>
          </ul>
        </Card>
      </Section>

      <Section
        title="When tests pass but it still feels wrong"
        description="Automated checks find ~30–40% of issues. The rest needs human judgment."
      >
        <Card>
          <div
            style={{
              padding: 16,
              color: "var(--gp-color-text-regular)",
              lineHeight: 1.7,
            }}
          >
            <p>
              Common false-pass scenarios: an icon-only button passes contrast
              and has an <code>aria-label</code> — but the label is{" "}
              <em>&quot;button&quot;</em>, which is useless. A focus ring is
              visible, but only on a 1px corner of the element. A modal traps
              focus, but never moves it inward when opened.
            </p>
            <p style={{ margin: 0, color: "var(--gp-color-text-subtle)" }}>
              When in doubt: try to use your feature without a mouse, with the
              monitor turned away from you, and see what your screen reader
              tells you. If you can&apos;t complete the task, your users
              can&apos;t either.
            </p>
          </div>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
