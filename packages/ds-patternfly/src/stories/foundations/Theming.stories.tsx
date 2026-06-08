import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect, useState } from "react";
import { ThemeProvider } from "../../theme/ThemeProvider.js";
import { defaultBrand } from "../../tokens/brands/default.js";
import { goldenPassport } from "../../tokens/brands/golden-passport.js";
import { useBrand } from "../../theme/useBrand.js";
import { useTheme } from "../../theme/ThemeProvider.js";
import { FoundationPage, Section, Card, CodeBlock } from "../../components/StoryKit.js";

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

/**
 * Self-contained glass preview. Glass is toggled by a class on <html>, so a
 * single cell can't opt into it without flipping the whole page — instead
 * this hardcodes the glass look (translucent fill + backdrop blur over a
 * brand-tinted canvas, with the soft glass edge) so light + dark can sit
 * side by side regardless of the toolbar toggle.
 */
function GlassPreview({ label, dark }: { label: string; dark: boolean }) {
  const pageBg = dark
    ? "radial-gradient(circle at 80% 12%, rgba(0,102,204,0.55), transparent 52%), radial-gradient(circle at 12% 92%, rgba(0,135,135,0.5), transparent 55%), #151515"
    : "radial-gradient(circle at 80% 12%, rgba(0,102,204,0.32), transparent 52%), radial-gradient(circle at 12% 92%, rgba(0,135,135,0.28), transparent 55%), #fafafa";
  const glassFill = dark ? "rgba(41,41,41,0.5)" : "rgba(255,255,255,0.5)";
  // Glass surfaces define their edge with the frosted fill, so the border
  // is transparent (matches the real --gp-glass-border-color default).
  const glassEdge = "transparent";
  const text = dark ? "#f5f5f5" : "#151515";
  const subtle = dark ? "#b8bbbe" : "#6a6e73";
  return (
    <div
      style={{
        borderRadius: 12,
        overflow: "hidden",
        border: "1px solid transparent",
      }}
    >
      <div
        style={{
          position: "relative",
          padding: 20,
          minHeight: 190,
          background: pageBg,
        }}
      >
        {/* Shapes behind the glass so the backdrop blur is visible. */}
        <div aria-hidden style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 20, left: 14, inlineSize: 96, blockSize: 96, borderRadius: "50%", background: "rgba(0,102,204,0.6)" }} />
          <div style={{ position: "absolute", bottom: 10, right: 26, inlineSize: 72, blockSize: 72, borderRadius: "50%", background: "rgba(0,135,135,0.55)" }} />
        </div>
        <div
          style={{
            position: "relative",
            background: glassFill,
            backdropFilter: "blur(14px) saturate(140%)",
            WebkitBackdropFilter: "blur(14px) saturate(140%)",
            border: `1px solid ${glassEdge}`,
            borderRadius: 10,
            padding: 16,
            color: text,
          }}
        >
          <div style={{ fontWeight: 600, marginBottom: 4 }}>{label}</div>
          <p style={{ color: subtle, margin: "0 0 12px", fontSize: 13, lineHeight: 1.5 }}>
            Frosted surface — a translucent fill plus a backdrop blur over the
            brand-tinted canvas behind it.
          </p>
          <button
            type="button"
            style={{
              background: "#0066cc",
              color: "#fff",
              border: "none",
              padding: "6px 12px",
              borderRadius: 6,
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            Primary action
          </button>
        </div>
      </div>
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
      { name: "--gp-radius-control", purpose: "Form fields, menu-toggles, InputGroup control buttons.", maps: "--pf-v6-c-form-control--BorderRadius, --pf-v6-c-menu-toggle--BorderRadius" },
      { name: "--gp-radius-button",  purpose: "Shape of every action button (pill by default). Icon-only buttons are squared so this radius renders them as circles.", maps: "border-radius on .pf-v6-c-button (+ icon-only buttons / kebab toggles → circle)" },
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
          Theming is three dimensions: the active <strong>brand</strong> (a
          typed token object), the active <strong>color mode</strong> (light or
          dark), and an optional <strong>glass</strong> surface treatment. All
          three are controlled by props on <code>&lt;ThemeProvider&gt;</code>{" "}
          (and by the matching toolbar toggles above) — switching any of them
          re-renders all downstream components without a reload.
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
        title="Glass theme"
        description="An optional translucent surface treatment layered on top of any brand × mode. Flip the Glass toggle in the toolbar above (or pass glass to ThemeProvider) and every glass-aware surface — cards, code blocks, panels, menus, modals, the masthead — frosts: a semi-transparent fill plus a backdrop blur over a brand-tinted gradient canvas. This whole page reframes live when you toggle it."
      >
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <p style={{ margin: 0, color: "var(--gp-color-text-regular)", lineHeight: 1.7 }}>
              Glass adds <code>pf-v6-theme-glass</code> to <code>&lt;html&gt;</code>.
              Surfaces read PF6&rsquo;s translucent glass token rather than the
              opaque brand-dial surfaces, so they stay frosted under any brand —
              and the lib keeps content surfaces dense enough that text contrast
              stays above WCAG AA. Toggle it from the toolbar to see the cards on
              this page frost in place.
            </p>
            {/* Static side-by-side preview of the glass treatment in both
                modes — independent of the toolbar toggle, since glass is a
                document-level class. */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: 16,
              }}
            >
              <GlassPreview label="Light · glass" dark={false} />
              <GlassPreview label="Dark · glass" dark={true} />
            </div>
            <CodeBlock label="ThemeProvider with glass">{`<ThemeProvider brand={goldenPassport} mode="dark" glass>
  <App />
</ThemeProvider>`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section
        title="Glass tokens"
        description="The PF6 design tokens that drive every frosted surface. Reach for these (not hard-coded rgba / blur values) when adding glass support, so surfaces stay consistent and re-theme with the brand."
      >
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <CodeBlock label="PatternFly glass tokens">{`/* Fill — colour + opacity are BAKED IN (light .5 white / dark .5 #292929).
   There is NO separate opacity token: thin it with color-mix toward
   transparent when a surface should read more see-through. */
--pf-t--global--background--color--glass--primary--default

/* Backdrop blur */
--pf-t--global--background--filter--glass--blur--primary   /* blur(16px) */

/* Edge */
--pf-t--global--border--color--glass--default    /* defaults to border-color--alt (VISIBLE) */
--pf-t--global--border--width--glass--default    /* 1px (regular) */
--pf-t--global--border--radius--glass--default   /* medium */

/* Lift */
--pf-t--global--box-shadow--glass--default        /* box-shadow--md */

/* Optional frosted textures */
--pf-t--global--background--image--glass / --glass--dark
--pf-t--global--background--image--felt--glass / --dark

/* ── Lib-derived glass dials (in .pf-v6-theme-glass, src/styles/index.css) ──
   Standardise the values above into ONE place to tune per system. */
--gp-glass-surface-opacity   /* 70% — share of the glass token's alpha to keep */
--gp-glass-surface-fill      /* the thinned (~0.35 alpha) chrome fill */
--gp-glass-surface-blur      /* blur(16px) — the shared backdrop blur */
--gp-glass-border-color      /* transparent — the shared frosted edge */`}</CodeBlock>

            <p style={{ margin: 0, color: "var(--gp-color-text-regular)", lineHeight: 1.7 }}>
              Three DS conventions layered on top of the raw tokens:
            </p>
            <ul
              style={{
                margin: 0,
                padding: "0 0 0 20px",
                color: "var(--gp-color-text-regular)",
                lineHeight: 1.8,
              }}
            >
              <li>
                <strong>One transparency dial for every chrome surface.</strong>{" "}
                The glass fill token bakes in ~0.5 alpha, which reads near-solid
                over dark content, and there is no opacity token. The lib thins
                it once into <code>--gp-glass-surface-fill</code> (the token at{" "}
                <code>--gp-glass-surface-opacity</code>, 70% &rarr; ~0.35 alpha)
                plus a matching <code>--gp-glass-surface-blur</code>. Every
                auto-glass <em>chrome</em> surface — <strong>masthead</strong>,{" "}
                <strong>side nav</strong> and <strong>menus / dropdowns /
                selects</strong> — renders through these, so they all frost to
                the same level; retune the whole system in one place. (Dense
                content surfaces like <code>Modal</code> and the notification
                drawer deliberately keep a denser fill for legibility.)
              </li>
              <li>
                <strong>Borders are transparent by default.</strong> PF6&rsquo;s
                glass border colour is the (visible) <em>alt</em> border, which
                reads as a hard line on a frosted edge. The lib pins it through
                one config token — <code>--gp-glass-border-color</code> (set to{" "}
                <code>transparent</code>) — in the central{" "}
                <code>.pf-v6-theme-glass</code> block of{" "}
                <code>src/styles/index.css</code>. Override it once (e.g.{" "}
                <code>rgba(255,255,255,0.14)</code>) to give every glass surface a
                subtle light edge.
              </li>
              <li>
                <strong>Radius / shadow are overridden for edge-anchored
                chrome.</strong> The default glass radius (medium) and shadow suit{" "}
                <em>floating</em> surfaces — cards, drawers, panels, menus. But
                elements pushed to the screen edge — the <strong>masthead</strong>{" "}
                (top) and the <strong>side nav</strong> (left) — square their
                corners (<code>border-radius: 0</code>) and trim the shadow on the
                edge that meets the viewport, so they read as a flush banded dock
                rather than a rounded card. See{" "}
                <code>Components/Masthead</code> and the glass-mode handbook.
              </li>
              <li>
                <strong>Interactive states go translucent too.</strong> Glass
                isn&rsquo;t just surface fills — on a glass surface the{" "}
                <strong>hover</strong> and <strong>selected</strong>{" "}
                backgrounds of buttons, links, nav items, tabs and menu items
                also become translucent, so they read on the frost instead of
                punching an opaque block. Hover / focus fills use a neutral
                <code> text</code>-tinted wash; selected / current fills use a{" "}
                <code>brand</code> wash. Plain icon buttons and menu toggles
                that ship an opaque hover fill are routed through the same
                translucent tints in glass mode.
              </li>
            </ul>
          </div>
        </Card>
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
