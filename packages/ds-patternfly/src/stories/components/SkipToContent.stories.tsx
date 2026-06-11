import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  FoundationPage,
  Section,
  Card,
  ConfigurationSection,
  Example,
} from "../_kit/StoryKit.js";
// PF6's own SkipToContent (href/onClick API). The DS exports its own
// SkipToContent (targetId/label, see src/a11y/SkipToContent.tsx) under the
// same name — this story documents the PF6 primitive it builds on.
import { TryIt } from "../../examples/components/SkipToContent.example.js";
import skipToContentExampleSrc from "../../examples/components/SkipToContent.example.tsx?raw";

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
        {/* Glass: the mock-page demo uses inline-styled surfaces (not a
            .pf-v6-c-card), so the lib glass layer can't auto-frost them.
            Frost the chrome wrapper + main region explicitly when the
            glass theme is active. */}
        <style>{`
          .pf-v6-theme-glass .gp-skip-demo-main {
            background: color-mix(in srgb, var(--pf-t--global--background--color--secondary--default) 65%, transparent) !important;
            backdrop-filter: blur(12px) saturate(140%);
            -webkit-backdrop-filter: blur(12px) saturate(140%);
          }
        `}</style>
        <Card>
          <Example
            source={skipToContentExampleSrc}
            region="TryIt"
            fileName="SkipToContent.example.tsx"
          >
            <TryIt />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example
            source={skipToContentExampleSrc}
            fileName="SkipToContent.example.tsx"
          />
        </Card>
      </Section>

      <ConfigurationSection
        importStatement={'import { SkipToContent } from "@patternfly/react-core";'}
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
              <strong>Used by the Compass pattern.</strong> See{" "}
              <code>Patterns/Compass</code> — it wires SkipToContent
              to the CompassContent region.
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
