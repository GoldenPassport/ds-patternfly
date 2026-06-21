import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  FoundationPage,
  Section,
  Card,
  ConfigurationSection,
  Example,
} from "../_kit/StoryKit.js";
// The DS exports its own SkipToContent (targetId/label for a single link, or
// links[] for a menu — see src/a11y/SkipToContent.tsx). The example consumes
// that exported component.
import { TryIt } from "../../examples/components/SkipToContent.example.js";
import skipToContentExampleSrc from "../../examples/components/SkipToContent.example.tsx?raw";
import skipToContentComponentSrc from "../../a11y/SkipToContent.tsx?raw";

const meta: Meta = {
  title: "Components/SkipToContent",
  parameters: { layout: "padded" },
};
export default meta;

// ──────────────────────────────────────────────────────────────────
// Story: Overview — docs page (no live demo; see the Demo story).
// ──────────────────────────────────────────────────────────────────

export const Overview: StoryObj = {
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
        description="The link only works as the first focusable element, so the live demo lives in its own story. Open the Demo story, click into the canvas, press Tab to surface the link, then Enter to jump focus to the main region."
      >
        <Card>
          <Example
            source={skipToContentExampleSrc}
            region="TryIt"
            fileName="SkipToContent.example.tsx"
          />
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demo — ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example
            source={skipToContentExampleSrc}
            fileName="SkipToContent.example.tsx"
          />
        </Card>
      </Section>

      <ConfigurationSection
        importStatement={'import { SkipToContent } from "@golden-passport/ds-patternfly";'}
        componentSource={skipToContentComponentSrc}
        componentFileName="SkipToContent.tsx"
        description="The DS SkipToContent renders a single skip link or a focus-revealed menu of skip links. Targets are reached by native fragment navigation, so each target element must be focusable (tabIndex={-1})."
        rows={[
          {
            name: "targetId",
            type: "string",
            description:
              "Single-link mode: element id of the landmark to jump to (e.g. \"main-content\"). The target must be focusable (tabIndex={-1}).",
          },
          {
            name: "label",
            type: "string",
            description:
              "Single-link mode: visible link text. Conventionally 'Skip to main content' — kept short; AT users hear it announced first.",
          },
          {
            name: "links",
            type: "SkipLink[]",
            description:
              "Menu mode: an array of { targetId, label } skip targets (main content, navigation, search, …) revealed together on focus. Takes precedence over targetId/label.",
          },
          {
            name: "ariaLabel",
            type: "string",
            description:
              "Menu mode: accessible name for the skip-links nav (default 'Skip links').",
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

// ──────────────────────────────────────────────────────────────────
// Story: Demo — the live skip link, standalone.
//
// SkipToContent only works when it's the first focusable element on the
// page, so the interaction can't be demoed inside the Overview docs page
// (its chrome steals the first Tab stops). This dedicated story renders
// the mock page on its own: click into the canvas, press Tab to surface
// the link, Enter to jump focus to the main region.
// ──────────────────────────────────────────────────────────────────

export const Demo: StoryObj = {
  parameters: { layout: "fullscreen", fullBleed: true },
  render: () => (
    <>
      {/* Glass: the mock-page demo uses inline-styled surfaces (not a
          .pf-v6-c-card), so the lib glass layer can't auto-frost them.
          Frost the main region explicitly when the glass theme is active. */}
      <style>{`
        .pf-v6-theme-glass .gp-skip-demo-main,
        .pf-v6-theme-glass .gp-skip-demo-region {
          background: color-mix(in srgb, var(--pf-t--global--background--color--secondary--default) 65%, transparent) !important;
          backdrop-filter: blur(12px) saturate(140%);
          -webkit-backdrop-filter: blur(12px) saturate(140%);
        }
      `}</style>
      <div style={{ padding: 24 }}>
        <TryIt />
      </div>
    </>
  ),
};
