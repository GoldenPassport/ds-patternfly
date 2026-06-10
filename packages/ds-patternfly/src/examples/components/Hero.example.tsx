/**
 * Hero — banner region for landing pages and feature spotlights.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import {
  Button,
  ButtonVariant,
  Flex,
  FlexItem,
  Hero,
  Title,
} from "../_lib.js";

// #region Basic
export function Basic() {
  return (
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
  );
}
// #endregion

// #region ContrastSafeGradient
// gradientLight / gradientDark paint a three-stop gradient behind the hero
// content, swapped per colour mode. Keep all three stops within one tonal
// band that contrasts with the body text — a gradient's luminance varies
// across its span, so a single text colour can pass WCAG AA over one stop
// and fail over another.
export function ContrastSafeGradient() {
  return (
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
  );
}
// #endregion

// #region NarrowBody
// bodyMaxWidth caps the centred body so prose stays readable on very wide
// displays.
export function NarrowBody() {
  return (
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
  );
}
// #endregion

export default function HeroExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <Basic />
      <ContrastSafeGradient />
      <NarrowBody />
    </div>
  );
}
