import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  FoundationPage,
  Section,
  Card,
  ConfigurationSection,
  Example,
} from "../_kit/StoryKit.js";
import {
  Basic as BasicHero,
  ContrastSafeGradient,
  NarrowBody as NarrowBodyHero,
} from "../../examples/components/Hero.example.js";
import heroExampleSrc from "../../examples/components/Hero.example.tsx?raw";
import heroComponentSrc from "../../components/Hero.tsx?raw";

const meta: Meta = {
  title: "Components/Hero",
  parameters: {
    layout: "padded",
    // Heroes typically use light-text-on-image — axe flags it on the
    // demo gradients here; real apps pick contrast-checked images.
    a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } },
  },
};
export default meta;

// ──────────────────────────────────────────────────────────────────
// Story: Basic
// ──────────────────────────────────────────────────────────────────

export const Basic: StoryObj = {
  render: () => (
    <FoundationPage
      title="Hero"
      intro={
        <>
          A banner region for landing pages and feature spotlights —
          full-width container, optional background image / gradient
          per colour mode, content centred to a constrained body
          width. PF6 6.5+ (currently <code>@beta</code>). Used at the
          top of marketing-style pages where the header chrome is{" "}
          <code>&lt;Masthead /&gt;</code> but the first scroll panel
          needs a stronger visual entrance than a plain{" "}
          <code>&lt;PageSection&gt;</code>.
        </>
      }
    >
      <Section
        title="Basic"
        description="Plain Hero — no image, no gradient, default body width. Acts as a wide container with PF6's hero padding and centring."
      >
        <Card>
          <Example
            source={heroExampleSrc}
            region="Basic"
            fileName="Hero.example.tsx"
          >
            <BasicHero />
          </Example>
        </Card>
      </Section>
    </FoundationPage>
  ),
};

// ──────────────────────────────────────────────────────────────────
// Story: WithGradient — gradientLight / gradientDark + contrast safety
// ──────────────────────────────────────────────────────────────────

export const WithGradient: StoryObj = {
  render: () => (
    <FoundationPage
      title="Hero — gradient background"
      intro={
        <>
          <code>gradientLight</code> / <code>gradientDark</code> paint a
          three-stop gradient behind the hero content, swapped per colour
          mode. The catch: gradients vary in luminance across their span,
          so a single text colour can pass WCAG AA over one stop and fail
          over another. The safe recipe below keeps every stop inside a
          tonal band that contrasts with the body text.
        </>
      }
    >
      <Section
        title="Contrast-safe gradient"
        description="Keep all three stops within one tonal band (here: surface tones with a soft brand accent) and let the text use the mode-aware regular text colour. Because the brand stop is mixed heavily toward the surface, the dark-on-light / light-on-dark text stays above AA across the whole gradient."
      >
        <Card>
          <Example
            source={heroExampleSrc}
            region="ContrastSafeGradient"
            fileName="Hero.example.tsx"
          >
            <ContrastSafeGradient />
          </Example>
          <p style={{ margin: "0 16px 16px", color: "var(--gp-color-text-subtle)", fontSize: 14 }}>
            Want a vivid full-brand gradient instead? Drop a scrim — a
            semi-opaque <code>--gp-color-bg-primary-default</code> layer
            between the gradient and the text — and verify the result
            with a contrast checker against the lightest and darkest
            points of the gradient.
          </p>
        </Card>
      </Section>
    </FoundationPage>
  ),
};

// ──────────────────────────────────────────────────────────────────
// Story: NarrowBody — bodyMaxWidth control
// ──────────────────────────────────────────────────────────────────

export const NarrowBody: StoryObj = {
  render: () => (
    <FoundationPage
      title="Hero — narrow body"
      intro={
        <>
          When you have no background image and want the text content
          to live in a clearly bounded column, set{" "}
          <code>bodyWidth</code> /<code>bodyMaxWidth</code>. PF6
          centres the body inside the hero&apos;s full-width
          background, so the text never stretches past comfortable
          line lengths on wide displays.
        </>
      }
    >
      <Section
        title="Constrained reading width"
        description="bodyMaxWidth=42rem keeps the prose readable on a 1920px+ display."
      >
        <Card>
          <Example
            source={heroExampleSrc}
            region="NarrowBody"
            fileName="Hero.example.tsx"
          >
            <NarrowBodyHero />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example source={heroExampleSrc} fileName="Hero.example.tsx" />
        </Card>
      </Section>

      <ConfigurationSection
        importStatement={'import { Hero } from "@golden-passport/ds-patternfly";'}
        componentSource={heroComponentSrc}
        componentFileName="Hero.tsx"
        rows={[
          {
            name: "children",
            type: "ReactNode",
            description: "Hero content. Compose with Title + paragraph + CTA Buttons; nothing is auto-styled.",
          },
          {
            name: "backgroundSrcLight",
            type: "string",
            description: "Image URL for light-mode background. Layered behind the optional gradient.",
          },
          {
            name: "backgroundSrcDark",
            type: "string",
            description: "Image URL for dark-mode background. Swapped via PF6's data-mode root attribute.",
          },
          {
            name: "gradientLight",
            type: "{ stop1, stop2, stop3 }",
            description: "Three-stop CSS gradient for light mode. Any valid CSS colour values; use brand tokens for theme-aware results. Contrast caveat: a gradient's luminance changes across its span, so check the text colour against the lightest AND darkest stop — keep stops in one tonal band (or add a scrim) so the copy stays above WCAG AA everywhere. See the 'With gradient' story.",
          },
          {
            name: "gradientDark",
            type: "{ stop1, stop2, stop3 }",
            description: "Dark-mode equivalent of gradientLight. Same contrast caveat — verify text contrast against every stop, not just stop1.",
          },
          {
            name: "bodyWidth",
            type: "string",
            description: "Override the body width (e.g. '32rem'). Use for visual control without a max constraint.",
          },
          {
            name: "bodyMaxWidth",
            type: "string",
            description: "Max-width cap on the body. Keeps prose readable on very wide viewports.",
          },
          {
            name: "isGlass",
            type: "boolean",
            description: "@beta Apply glassmorphic styling when the glass theme is active.",
          },
        ]}
      />

      <Section title="When to use Hero vs PageSection">
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
              <strong>Hero</strong> — landing pages, feature
              spotlights, marketing-style entry points. One per page,
              at the top.
            </li>
            <li>
              <strong>PageSection</strong> — every other content
              region. Plain, no background imagery, stacks cleanly.
            </li>
            <li>
              <strong>Compass + Hero</strong> — Hero fits naturally
              in Compass&apos;s <code>main</code> slot (or as the
              first child inside <code>CompassContent</code>) when
              the layout already provides chrome.
            </li>
          </ul>
        </Card>
      </Section>

      <Section title="Accessibility">
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
              <strong>Contrast.</strong> Background images and
              gradients can drag text contrast below WCAG AA. Test
              the title + body colours against the darkest and
              lightest pixels of the image / gradient.
            </li>
            <li>
              <strong>Gradient contrast — keep stops in one tonal band.</strong>{" "}
              A gradient's luminance shifts from <code>stop1</code> to{" "}
              <code>stop3</code>, so a single text colour can pass over one
              end and fail over the other. Either keep all three stops
              within a band that contrasts with the text (mix any brand
              accent heavily toward the surface — see the{" "}
              <code>With gradient</code> story), or lay a semi-opaque scrim
              between the gradient and the content and re-check. Pair with{" "}
              <code>var(--gp-color-text-regular)</code> so the text colour
              already flips per mode.
            </li>
            <li>
              <strong>One h1 per page.</strong> The hero usually
              owns the page&apos;s h1; don&apos;t render another
              elsewhere.
            </li>
            <li>
              <strong>Decorative imagery.</strong> The Hero&apos;s
              background image is decorative — don&apos;t rely on it
              for meaning, and don&apos;t pass alt text into the
              body content as a workaround.
            </li>
            <li>
              <strong>Reduced motion.</strong> If you add parallax /
              entry animation, gate it behind{" "}
              <code>@media (prefers-reduced-motion: no-preference)</code>.
            </li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
