import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect, useState } from "react";
import { ThemeProvider } from "../../theme/ThemeProvider.js";
import { defaultBrand } from "../../tokens/brands/default.js";
import { goldenPassport } from "../../tokens/brands/golden-passport.js";
import { useBrand } from "../../theme/useBrand.js";
import { useTheme } from "../../theme/ThemeProvider.js";
import { FoundationPage, Section, Card, CodeBlock } from "../_storyKit.js";

const meta: Meta = {
  title: "Foundations/Theming",
  parameters: { layout: "padded" },
};
export default meta;

function MiniSurface() {
  const brand = useBrand();
  const { mode } = useTheme();
  return (
    <div
      style={{
        background: "var(--gp-color-bg-primary-default)",
        color: "var(--gp-color-text-regular)",
        padding: 16,
        borderRadius: "var(--gp-radius-md)",
        border: "1px solid var(--gp-color-border-default)",
        fontFamily: "var(--gp-font-family)",
      }}
    >
      <div
        style={{
          fontFamily: "var(--gp-font-family-heading)",
          fontWeight: 600,
          fontSize: 16,
        }}
      >
        {brand.name} · {mode}
      </div>
      <p style={{ color: "var(--gp-color-text-subtle)", margin: "4px 0 12px" }}>
        Surface, text, button — all sourced from CSS variables.
      </p>
      <button
        style={{
          background: "var(--gp-color-brand-default)",
          color: "var(--gp-color-brand-on)",
          border: "none",
          padding: "6px 12px",
          borderRadius: "var(--gp-radius-sm)",
          cursor: "pointer",
          fontFamily: "inherit",
        }}
      >
        Primary action
      </button>
    </div>
  );
}

// ---------- Theme dial catalogue (Phase 1: 35 dials, 11 categories) ----------
// Mirrors the [data-brand] block in src/styles/index.css. The story reads
// the live computed value of each dial off document.documentElement so the
// table reflects whatever the active brand × mode resolves to.

type Dial = {
  /** CSS custom property name (with leading --). */
  name: string;
  /** One-line description of what the dial controls. */
  purpose: string;
  /** PF6 token(s) the dial feeds, listed comma-separated. */
  maps: string;
};

type DialCategory = {
  id: string;
  title: string;
  description: string;
  dials: Dial[];
};

const DIALS: DialCategory[] = [
  {
    id: "A",
    title: "A · Surface & colour",
    description:
      "Light/dark pairs — eight dials flip between modes. Everything else is scheme-agnostic.",
    dials: [
      { name: "--gp-surface-page",     purpose: "Page background.",              maps: "(consumer-applied)" },
      { name: "--gp-surface-card",     purpose: "Card / panel background.",       maps: "--pf-v6-c-card--BackgroundColor (when adopted)" },
      { name: "--gp-surface-elevated", purpose: "Popover / modal background.",    maps: "--pf-v6-c-popover__content--BackgroundColor, --pf-v6-c-modal-box--BackgroundColor" },
      { name: "--gp-text-default",     purpose: "Default body text colour.",      maps: "--pf-t--global--text--color--regular" },
      { name: "--gp-text-subtle",      purpose: "Secondary / muted text.",        maps: "--pf-t--global--text--color--subtle" },
      { name: "--gp-border-default",   purpose: "Default border / divider.",      maps: "--pf-t--global--border--color--default" },
      { name: "--gp-border-subtle",    purpose: "Quiet border (subtle dividers).",maps: "--pf-t--global--border--color--weak" },
      { name: "--gp-focus-ring",       purpose: "Focus-ring colour.",             maps: "--gp-color-focus-ring (focus utilities)" },
    ],
  },
  {
    id: "B",
    title: "B · Control sizing",
    description:
      "One vertical-spacer dial drives the height of every form-control, menu-toggle, and pf-m-control button at once (PF6 v6 derives height from padding × line-height — there is no MinHeight token).",
    dials: [
      { name: "--gp-control-pad-y",         purpose: "Vertical padding inside controls (default 0.375rem → 36px field).", maps: "--pf-t--global--spacer--control--vertical--default" },
      { name: "--gp-control-pad-x",         purpose: "Horizontal padding inside controls.",                                  maps: "--pf-t--global--spacer--control--horizontal--default" },
      { name: "--gp-control-pad-y-compact", purpose: "Vertical padding for pf-m-small variants (~32px field).",              maps: "--pf-t--global--spacer--control--vertical--compact" },
    ],
  },
  {
    id: "C",
    title: "C · Container padding",
    description: "Inside-padding of the four primary surface containers.",
    dials: [
      { name: "--gp-pad-card",    purpose: "Card padding (block + inline).",    maps: "--pf-v6-c-card--PaddingBlock / --PaddingInline" },
      { name: "--gp-pad-popover", purpose: "Popover content padding.",         maps: "--pf-v6-c-popover__content--PaddingBlock / --PaddingInline" },
      { name: "--gp-pad-modal",   purpose: "Modal body padding.",              maps: "--pf-v6-c-modal-box--PaddingBlock / --PaddingInline" },
      { name: "--gp-pad-section", purpose: "Page-section padding (story kit).", maps: "(consumer-applied)" },
    ],
  },
  {
    id: "D",
    title: "D · Spacing rhythm",
    description: "Gap between repeated items — form fields, labels, heading/paragraph rhythm.",
    dials: [
      { name: "--gp-gap-form",      purpose: "Between FormGroup children.",       maps: "(consumer-applied)" },
      { name: "--gp-gap-label",     purpose: "Between a label and its input.",    maps: "(consumer-applied)" },
      { name: "--gp-gap-heading",   purpose: "Margin-block on h1–h4.",            maps: "(consumer-applied)" },
      { name: "--gp-gap-paragraph", purpose: "Margin-block on <p>, lists.",       maps: "(consumer-applied)" },
    ],
  },
  {
    id: "E",
    title: "E · Corner radius",
    description: "Reuses the radius scale (see Foundations / Radius). Four roles.",
    dials: [
      { name: "--gp-radius-control", purpose: "Form fields, buttons, menu-toggles.", maps: "--pf-v6-c-form-control--BorderRadius, --pf-v6-c-button--BorderRadius, --pf-v6-c-menu-toggle--BorderRadius" },
      { name: "--gp-radius-card",    purpose: "Cards + modal boxes.",                 maps: "--pf-v6-c-card--BorderRadius, --pf-v6-c-modal-box--BorderRadius" },
      { name: "--gp-radius-popover", purpose: "Popovers, tooltips.",                   maps: "--pf-v6-c-popover__content--BorderRadius" },
      { name: "--gp-radius-pill",    purpose: "Labels, chips, pill buttons.",         maps: "(consumer-applied)" },
    ],
  },
  {
    id: "F",
    title: "F · Shadow + border",
    description: "Elevation cues plus the global border thickness.",
    dials: [
      { name: "--gp-shadow-card",    purpose: "Card resting elevation.",       maps: "--pf-v6-c-card--BoxShadow" },
      { name: "--gp-shadow-popover", purpose: "Popover elevation.",            maps: "--pf-v6-c-popover--BoxShadow" },
      { name: "--gp-shadow-modal",   purpose: "Modal scrim elevation.",        maps: "--pf-v6-c-modal-box--BoxShadow" },
      { name: "--gp-border-width",   purpose: "Default border thickness.",     maps: "--pf-t--global--border--width--default" },
    ],
  },
  {
    id: "G",
    title: "G · Typography",
    description: "Font family + heading weight. See Foundations / Typography for the size scale.",
    dials: [
      { name: "--gp-type-scale",     purpose: "Multiplier on the PF6 type scale (1 = stock, 1.067 = roomy).", maps: "(consumer-applied root font-size)" },
      { name: "--gp-font-body",      purpose: "Body font-family.",      maps: "--pf-t--global--font--family--body" },
      { name: "--gp-font-heading",   purpose: "Heading font-family (often = body).", maps: "--pf-t--global--font--family--heading" },
      { name: "--gp-weight-heading", purpose: "Heading weight.",        maps: "--pf-t--global--font--weight--heading" },
    ],
  },
  {
    id: "H",
    title: "H · Links",
    description: "Anchor styling — colour + hover decoration.",
    dials: [
      { name: "--gp-anchor-color",            purpose: "Link colour.",          maps: "(consumer-applied)" },
      { name: "--gp-anchor-decoration-hover", purpose: "Hover decoration (underline / none).", maps: "(consumer-applied)" },
    ],
  },
  {
    id: "I",
    title: "I · Motion",
    description: "Base transition duration — lib derives faster + slower from this.",
    dials: [
      { name: "--gp-motion-duration", purpose: "Default transition duration (150ms).", maps: "--pf-t--global--motion--duration--default" },
    ],
  },
  {
    id: "J",
    title: "J · Interaction state",
    description: "Single source of truth for disabled controls.",
    dials: [
      { name: "--gp-opacity-disabled", purpose: "Disabled control opacity.", maps: "--pf-v6-global--disabled-color--100" },
    ],
  },
  {
    id: "K",
    title: "K · Z-index",
    description: "Base for overlay surfaces — lib derives popover / modal / toast offsets.",
    dials: [
      { name: "--gp-z-overlay", purpose: "Z-index floor for overlays.", maps: "(consumer-applied)" },
    ],
  },
];

/**
 * Reads the live computed value of a single CSS custom property on the
 * document root. Re-runs when `mode` flips so the table reflects the
 * active brand × mode resolution.
 */
function useDialValue(name: string, mode: string): string {
  const [value, setValue] = useState<string>("");
  useEffect(() => {
    const v = getComputedStyle(document.documentElement)
      .getPropertyValue(name)
      .trim();
    setValue(v || "—");
  }, [name, mode]);
  return value;
}

function DialRow({ dial }: { dial: Dial }) {
  const { mode } = useTheme();
  const value = useDialValue(dial.name, mode);
  const swatch = /^#|^rgb|^hsl|^var\(--gp-color/.test(value);
  return (
    <tr>
      <td style={{ padding: "8px 12px", whiteSpace: "nowrap", verticalAlign: "top" }}>
        <code style={{ fontSize: 12 }}>{dial.name}</code>
      </td>
      <td style={{ padding: "8px 12px", verticalAlign: "top", color: "var(--gp-color-text-regular)" }}>
        {dial.purpose}
      </td>
      <td style={{ padding: "8px 12px", verticalAlign: "top", whiteSpace: "nowrap" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          {swatch && (
            <span
              aria-hidden
              style={{
                inlineSize: 14,
                blockSize: 14,
                background: value,
                borderRadius: 3,
                border: "1px solid var(--gp-color-border-subtle)",
              }}
            />
          )}
          <code style={{ fontSize: 12 }}>{value}</code>
        </span>
      </td>
      <td style={{ padding: "8px 12px", fontSize: 12, color: "var(--gp-color-text-subtle)", verticalAlign: "top" }}>
        {dial.maps}
      </td>
    </tr>
  );
}

function DialTable({ category }: { category: DialCategory }) {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
      <thead>
        <tr style={{ textAlign: "left", color: "var(--gp-color-text-subtle)", fontSize: 11, textTransform: "uppercase", letterSpacing: 0.4 }}>
          <th style={{ padding: "8px 12px", fontWeight: 500 }}>Dial</th>
          <th style={{ padding: "8px 12px", fontWeight: 500 }}>Purpose</th>
          <th style={{ padding: "8px 12px", fontWeight: 500 }}>Resolved value</th>
          <th style={{ padding: "8px 12px", fontWeight: 500 }}>Maps to PF6</th>
        </tr>
      </thead>
      <tbody>
        {category.dials.map((d) => (
          <DialRow key={d.name} dial={d} />
        ))}
      </tbody>
    </table>
  );
}

/** Compact live preview — a button, an input, a card, a popover-ish chip. */
function DialsPreview() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: 16,
        padding: 16,
        background: "var(--gp-surface-page, var(--gp-color-bg-primary-default))",
        color: "var(--gp-text-default, var(--gp-color-text-regular))",
        borderRadius: "var(--gp-radius-card, 12px)",
        border: "var(--gp-border-width, 1px) solid var(--gp-border-default, var(--gp-color-border))",
      }}
    >
      <div
        style={{
          padding: "var(--gp-pad-card, 16px)",
          background: "var(--gp-surface-card, var(--gp-color-bg-secondary-default))",
          borderRadius: "var(--gp-radius-card, 12px)",
          boxShadow: "var(--gp-shadow-card)",
        }}
      >
        <div style={{ fontWeight: "var(--gp-weight-heading, 600)" as unknown as number, marginBottom: "var(--gp-gap-paragraph, 8px)" }}>
          Card surface
        </div>
        <p style={{ margin: 0, color: "var(--gp-text-subtle, var(--gp-color-text-subtle))", fontSize: 13 }}>
          Padding, radius, and shadow read from dials.
        </p>
      </div>
      <div
        style={{
          padding: "var(--gp-pad-popover, 12px)",
          background: "var(--gp-surface-elevated, var(--gp-color-bg-secondary-hover))",
          borderRadius: "var(--gp-radius-popover, 12px)",
          boxShadow: "var(--gp-shadow-popover)",
        }}
      >
        <div style={{ fontWeight: 500, marginBottom: 8 }}>Elevated</div>
        <span
          style={{
            display: "inline-block",
            padding: "2px 10px",
            background: "var(--gp-surface-card)",
            borderRadius: "var(--gp-radius-pill, 999px)",
            fontSize: 12,
          }}
        >
          pill
        </span>
      </div>
      <div style={{ display: "grid", gap: "var(--gp-gap-label, 4px)" }}>
        <label htmlFor="dial-input" style={{ fontSize: 12 }}>Field</label>
        <input
          id="dial-input"
          defaultValue="36px tall"
          style={{
            padding: "var(--gp-control-pad-y, 6px) var(--gp-control-pad-x, 12px)",
            borderRadius: "var(--gp-radius-control, 6px)",
            border: "var(--gp-border-width, 1px) solid var(--gp-border-default, var(--gp-color-border))",
            background: "var(--gp-surface-page)",
            color: "inherit",
            font: "inherit",
          }}
        />
        <button
          type="button"
          style={{
            justifySelf: "start",
            padding: "var(--gp-control-pad-y, 6px) var(--gp-control-pad-x, 12px)",
            borderRadius: "var(--gp-radius-control, 6px)",
            border: "var(--gp-border-width, 1px) solid var(--gp-border-default)",
            background: "var(--gp-color-brand-default)",
            color: "var(--gp-color-brand-on)",
            cursor: "pointer",
            transition: "opacity var(--gp-motion-duration, 150ms) ease",
            font: "inherit",
          }}
        >
          Action
        </button>
      </div>
    </div>
  );
}

/**
 * Copy-paste root block — generated from the catalogue so it can't drift
 * out of sync with the live table.
 */
function rootBlock(): string {
  const lines: string[] = ["[data-brand] {"];
  DIALS.forEach((cat) => {
    lines.push(`  /* ${cat.title} */`);
    cat.dials.forEach((d) => {
      lines.push(`  ${d.name}: /* see Foundations / Theming */;`);
    });
    lines.push("");
  });
  lines.push("}");
  lines.push("");
  lines.push(":where(.pf-v6-theme-dark) {");
  lines.push("  /* Flip the 8 colour dials in category A only — the rest");
  lines.push("     (sizing, spacing, radius, etc.) is scheme-agnostic. */");
  DIALS[0]!.dials.forEach((d) => {
    lines.push(`  ${d.name}: /* dark value */;`);
  });
  lines.push("}");
  return lines.join("\n");
}

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Theming"
      intro={
        <>
          Theming is two dimensions: the active <strong>brand</strong> (a typed
          token object) and the active <strong>color mode</strong> (light or
          dark). Both are controlled by props on{" "}
          <code>&lt;ThemeProvider&gt;</code> — switching either re-renders all
          downstream components without a reload.
        </>
      }
    >
      <Section
        title="Live brand × mode matrix"
        description="Each cell mounts its own ThemeProvider with a different combination."
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
          }}
        >
          {[
            { brand: defaultBrand, mode: "light" as const },
            { brand: defaultBrand, mode: "dark" as const },
            { brand: goldenPassport, mode: "light" as const },
            { brand: goldenPassport, mode: "dark" as const },
          ].map(({ brand, mode }) => (
            <ThemeProvider key={brand.name + mode} brand={brand} mode={mode}>
              <MiniSurface />
            </ThemeProvider>
          ))}
        </div>
      </Section>

      <Section
        title="Theme dials"
        description="35 high-level brand tokens grouped into 11 categories. Edit any dial at the [data-brand] root and the change cascades into every PF6 component that depends on it — no per-component CSS patches. Tables below show the live computed value of each dial; flip mode in the toolbar to see colour dials swap."
      >
        <Card>
          <div style={{ padding: 24 }}>
            <DialsPreview />
          </div>
        </Card>
      </Section>

      {DIALS.map((cat) => (
        <Section
          key={cat.id}
          title={cat.title}
          description={cat.description}
        >
          <Card>
            <div style={{ padding: 8 }}>
              <DialTable category={cat} />
            </div>
          </Card>
        </Section>
      ))}

      <Section
        title="Copy-paste root block"
        description="A skeleton with every dial in declaration order. Paste it into your app's stylesheet and fill in values; only the colour block needs a paired dark override."
      >
        <Card>
          <CodeBlock label="theme.css">{rootBlock()}</CodeBlock>
        </Card>
      </Section>

      <Section
        title="Where to see each scale in detail"
        description="The dials reuse the same scales documented in the existing foundation stories."
      >
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Colour</strong> — Foundations / Colors / Semantic colors</li>
            <li><strong>Radius</strong> — Foundations / Radius / Scale</li>
            <li><strong>Spacers</strong> — Foundations / Spacers / Scale</li>
            <li><strong>Typography</strong> — Foundations / Typography</li>
            <li><strong>Motion</strong> — Foundations / Motion</li>
          </ul>
        </Card>
      </Section>

      <Section
        title="API"
        description="Wrap your app once, near the root."
      >
        <Card>
          <CodeBlock label="ThemeProvider usage">{`import {
  ThemeProvider,
  goldenPassport,
} from "@golden-passport/ds-patternfly";

<ThemeProvider brand={goldenPassport} mode="light" dir="ltr">
  <App />
</ThemeProvider>`}</CodeBlock>
        </Card>
      </Section>

      <Section
        title="Authoring a new brand"
        description="A brand is a TypeScript object that satisfies BrandTokens."
      >
        <Card>
          <CodeBlock label="Brand authoring template">{`import type { BrandTokens } from "@golden-passport/ds-patternfly";

const palette = {
  gray: { 50: "#…", 100: "#…", /* … */ 900: "#…" },
  brand: { /* 50–900 */ },
  accent: { /* 50–900 */ },
  success: { /* 50–900 */ },
  warning: { /* 50–900 */ },
  danger: { /* 50–900 */ },
  info: { /* 50–900 */ },
};

export const myBrand = {
  name: "my-brand",
  palette,
  semantic: {
    brand: {
      default: { light: palette.brand[500], dark: palette.brand[300] },
      hover:   { light: palette.brand[600], dark: palette.brand[200] },
      text:    { light: palette.brand[600], dark: palette.brand[200] },
      on:      { light: "#ffffff", dark: palette.gray[900] },
    },
    background: { /* primary + secondary, each default + hover */ },
    text:       { /* regular, subtle, link, linkHover */ },
    icon:       { /* regular, subtle */ },
    status:     { /* success, warning, danger, info */ },
    nonstatus:  { /* border, borderSubtle */ },
  },
  font:   { /* family, sizeBase */ },
  radius: { sm: "…", md: "…", lg: "…" },
  space:  { xs: "…", sm: "…", md: "…", lg: "…", xl: "…" },
  motion: { duration: { /* … */ }, easing: { /* … */ } },
} satisfies BrandTokens;`}</CodeBlock>
        </Card>
      </Section>

      <Section
        title="Contrast guarantee"
        description="Every brand is validated by tokens.test.ts in both modes — text/surface, brand/on, status text/background, and status icon/surface must meet WCAG AA. Adding a brand that doesn't pass fails the build."
      >
        <Card>
          <div style={{ padding: 16, color: "var(--gp-color-text-regular)" }}>
            Run <code>pnpm --filter @golden-passport/ds-patternfly test</code>{" "}
            to verify your brand.
          </div>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
