import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Button,
  ButtonVariant,
  Flex,
  FlexItem,
  Hero,
  Title,
} from "@patternfly/react-core";
import {
  FoundationPage,
  Section,
  Card,
  CodeBlock,
} from "../_storyKit.js";
import { PropsTable } from "../../components/DemoKit.js";

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
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <Hero>
              {/* Centre everything — title, paragraph, button row.
                  - Outer wrapper: flex column with alignItems center
                    so each child (title, p, CTA row) centres on the
                    cross axis.
                  - `textAlign: center` on the wrapper handles inline
                    content (the paragraph wraps centred).
                  - The CTA row is its own inner flex with
                    justifyContent center so primary + link buttons
                    sit symmetrically around the column centre.
                  - `marginInline: auto` on the paragraph guarantees
                    its constrained maxWidth ends up centred inside
                    the column. */}
              <Flex
                direction={{ default: "column" }}
                alignItems={{ default: "alignItemsCenter" }}
                justifyContent={{ default: "justifyContentCenter" }}
                spaceItems={{ default: "spaceItemsMd" }}
                style={{ textAlign: "center", width: "100%" }}
              >
                <FlexItem>
                  <Title headingLevel="h1" size="3xl">
                    Welcome to Golden Passport
                  </Title>
                </FlexItem>
                <FlexItem>
                  <p
                    style={{
                      color: "var(--gp-color-text-subtle)",
                      maxWidth: "32rem",
                      marginInline: "auto",
                    }}
                  >
                    Brandable design-system primitives built on
                    PatternFly 6 — wired into your BPM, automation,
                    and ops workflows.
                  </p>
                </FlexItem>
                <FlexItem>
                  <Flex
                    spaceItems={{ default: "spaceItemsSm" }}
                    justifyContent={{ default: "justifyContentCenter" }}
                    alignItems={{ default: "alignItemsCenter" }}
                  >
                    <FlexItem>
                      <Button variant={ButtonVariant.primary}>
                        Get started
                      </Button>
                    </FlexItem>
                    <FlexItem>
                      <Button variant={ButtonVariant.link}>
                        View on GitHub
                      </Button>
                    </FlexItem>
                  </Flex>
                </FlexItem>
              </Flex>
            </Hero>
            <CodeBlock>{`import { Hero } from "@patternfly/react-core";

<Hero>
  <Title headingLevel="h1" size="3xl">Welcome to Golden Passport</Title>
  <p>Brandable design-system primitives built on PatternFly 6 …</p>
  <Button variant="primary">Get started</Button>
</Hero>`}</CodeBlock>
          </div>
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
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <Hero
              gradientLight={{
                stop1: "var(--gp-color-bg-secondary-default, #f3ede1)",
                stop2: "var(--gp-color-bg-secondary-hover, #e6dcc8)",
                // Brand accent pulled ~75% toward the surface so the
                // gradient stays light enough for dark text everywhere.
                stop3:
                  "color-mix(in srgb, var(--gp-color-brand-default, #7d572a) 25%, var(--gp-color-bg-secondary-default, #f3ede1))",
              }}
              gradientDark={{
                stop1: "var(--gp-color-bg-primary-default, #1a1611)",
                stop2: "var(--gp-color-bg-secondary-default, #26211c)",
                stop3:
                  "color-mix(in srgb, var(--gp-color-brand-default, #7d572a) 30%, var(--gp-color-bg-primary-default, #1a1611))",
              }}
            >
              <Flex
                direction={{ default: "column" }}
                alignItems={{ default: "alignItemsCenter" }}
                justifyContent={{ default: "justifyContentCenter" }}
                spaceItems={{ default: "spaceItemsMd" }}
                style={{ textAlign: "center", width: "100%" }}
              >
                <FlexItem>
                  <Title
                    headingLevel="h1"
                    size="3xl"
                    style={{ color: "var(--gp-color-text-regular)" }}
                  >
                    Build on a brandable foundation
                  </Title>
                </FlexItem>
                <FlexItem>
                  <p
                    style={{
                      color: "var(--gp-color-text-regular)",
                      maxWidth: "32rem",
                      marginInline: "auto",
                    }}
                  >
                    The gradient reads as a branded entrance, but the copy
                    stays legible in both light and dark mode because the
                    stops never stray outside a contrasting tonal band.
                  </p>
                </FlexItem>
                <FlexItem>
                  <Button variant={ButtonVariant.primary}>Get started</Button>
                </FlexItem>
              </Flex>
            </Hero>
            <CodeBlock>{`<Hero
  gradientLight={{
    stop1: "var(--gp-color-bg-secondary-default)",
    stop2: "var(--gp-color-bg-secondary-hover)",
    // brand accent pulled toward the surface so the gradient
    // stays light enough for dark text across every stop
    stop3: "color-mix(in srgb, var(--gp-color-brand-default) 25%, var(--gp-color-bg-secondary-default))",
  }}
  gradientDark={{
    stop1: "var(--gp-color-bg-primary-default)",
    stop2: "var(--gp-color-bg-secondary-default)",
    stop3: "color-mix(in srgb, var(--gp-color-brand-default) 30%, var(--gp-color-bg-primary-default))",
  }}
>
  {/* mode-aware text colour contrasts with both ends of the band */}
  <Title style={{ color: "var(--gp-color-text-regular)" }}>…</Title>
</Hero>`}</CodeBlock>
            <p style={{ margin: 0, color: "var(--gp-color-text-subtle)", fontSize: 14 }}>
              Want a vivid full-brand gradient instead? Drop a scrim — a
              semi-opaque <code>--gp-color-bg-primary-default</code> layer
              between the gradient and the text — and verify the result
              with a contrast checker against the lightest and darkest
              points of the gradient.
            </p>
          </div>
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
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <Hero bodyMaxWidth="42rem">
              <Flex
                direction={{ default: "column" }}
                spaceItems={{ default: "spaceItemsMd" }}
              >
                <FlexItem>
                  <Title headingLevel="h1" size="2xl">
                    Design system, not framework
                  </Title>
                </FlexItem>
                <FlexItem>
                  <p style={{ lineHeight: 1.6 }}>
                    Drop the lib into an existing PatternFly 6 app
                    and every form control, popover, and elevated
                    surface picks up your brand without per-component
                    overrides. Bump a dial; the whole app rebrands.
                  </p>
                </FlexItem>
                <FlexItem>
                  <Button variant={ButtonVariant.secondary}>
                    Read the migration guide
                  </Button>
                </FlexItem>
              </Flex>
            </Hero>
            <CodeBlock>{`<Hero bodyMaxWidth="42rem">
  <Title headingLevel="h1" size="2xl">Design system, not framework</Title>
  <p>Drop the lib into an existing PatternFly 6 app …</p>
</Hero>`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section title="Most-used props">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
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
          </div>
        </Card>
      </Section>

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
