import type { Meta, StoryObj } from "@storybook/react-vite";
import { SkipToContent } from "@patternfly/react-core";
import {
  FoundationPage,
  Section,
  Card,
  CodeBlock,
} from "../_storyKit.js";
import { PropsTable } from "../_demoKit.js";

const meta: Meta = {
  title: "Components/SkipToContent",
  parameters: { layout: "padded" },
};
export default meta;

// ──────────────────────────────────────────────────────────────────
// Story: Basic — visually hidden link that surfaces on focus
// ──────────────────────────────────────────────────────────────────

export const Basic: StoryObj = {
  render: () => (
    <FoundationPage
      title="SkipToContent"
      intro={
        <>
          A keyboard-only escape hatch: an anchor that&apos;s visually
          hidden until it receives focus, then jumps screen-reader
          and keyboard users straight to the main content region.
          PF6 renders it as the first child of the page so a single{" "}
          <kbd>Tab</kbd> press surfaces it before any chrome.
          Required for WCAG 2.1{" "}
          <a
            href="https://www.w3.org/WAI/WCAG21/Understanding/bypass-blocks"
            target="_blank"
            rel="noreferrer"
          >
            2.4.1 Bypass Blocks
          </a>{" "}
          compliance on any page with global nav.
        </>
      }
    >
      <Section
        title="Try it"
        description="Click into the demo below, press Tab — the link surfaces visually. Press Enter, focus jumps to the main region."
      >
        <Card>
          <div
            style={{
              padding: 24,
              display: "grid",
              gap: 16,
            }}
          >
            <div
              style={{
                position: "relative",
                border: "1px dashed var(--gp-color-border-subtle)",
                borderRadius: 6,
                padding: 24,
                minHeight: 160,
              }}
            >
              <SkipToContent
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("skip-demo-main")
                    ?.focus();
                }}
                href="#skip-demo-main"
              >
                Skip to content
              </SkipToContent>
              <p style={{ marginTop: 0 }}>
                <strong>Mock page chrome.</strong> Press <kbd>Tab</kbd>{" "}
                to surface the skip link.
              </p>
              <main
                id="skip-demo-main"
                tabIndex={-1}
                style={{
                  marginTop: 16,
                  padding: 16,
                  background: "var(--gp-color-bg-secondary-default)",
                  borderRadius: 6,
                  outline: "none",
                }}
              >
                <h2 style={{ marginTop: 0 }}>Main content</h2>
                <p>
                  The skip link sets focus here so AT users don&apos;t
                  have to crawl through the masthead and side nav on
                  every page load.
                </p>
              </main>
            </div>
            <CodeBlock>{`<SkipToContent
  onClick={(e) => {
    e.preventDefault();
    document.getElementById("main")?.focus();
  }}
  href="#main"
>
  Skip to content
</SkipToContent>
…
<main id="main" tabIndex={-1}>…</main>`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section title="Most-used props">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                {
                  name: "href",
                  type: "string",
                  description:
                    "Fragment ID of the target element (e.g. '#main'). Even with onClick, set this so right-click + native browser behaviour still works.",
                },
                {
                  name: "onClick",
                  type: "(e: MouseEvent<HTMLDivElement>) => void",
                  description:
                    "Call preventDefault() and move focus imperatively. Native fragment-jump scrolls but does NOT focus the target — the click handler is what makes the link useful for keyboard users.",
                },
                {
                  name: "children",
                  type: "ReactNode",
                  description:
                    "Link text. Conventionally 'Skip to content' / 'Skip to main content' — keep it short, screen-reader users hear it announced first.",
                },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section title="Where it lives in this design system">
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
              <strong>Page-level chrome.</strong> Render once, as the
              first child of <code>&lt;body&gt;</code> (or your
              app&apos;s outermost component) so it&apos;s the first
              focusable element.
            </li>
            <li>
              <strong>Target needs <code>tabIndex={-1}</code>.</strong>{" "}
              The PF6 element you focus must be programmatically
              focusable. Pass <code>-1</code> to opt in without
              joining the tab order.
            </li>
            <li>
              <strong>Used by Compass patterns.</strong> See{" "}
              <code>Patterns/Compass dashboard</code> and{" "}
              <code>Patterns/Compass integrations</code> — both pages
              wire SkipToContent to the CompassContent region.
            </li>
            <li>
              <strong>Don&apos;t hide it from AT.</strong> The PF6
              styling uses{" "}
              <code>clip-path</code> / off-screen positioning, not{" "}
              <code>display: none</code>, so screen readers can still
              announce the link before it&apos;s visually surfaced.
            </li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
