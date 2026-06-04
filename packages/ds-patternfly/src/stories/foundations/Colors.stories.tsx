import type { Meta, StoryObj } from "@storybook/react-vite";
import { useTheme } from "../../theme/ThemeProvider.js";
import { useBrand } from "../../theme/useBrand.js";
import { contrastRatio } from "../../a11y/contrast.js";
import type {
  BrandColorScale,
  ColorMode,
  ModeValue,
  StatusColor,
} from "../../tokens/types.js";
import { FoundationPage, Section, Card, pickFg, fmtRatio } from "../_storyKit.js";

const meta: Meta = {
  title: "Foundations/Colors",
  parameters: { layout: "padded" },
};
export default meta;

interface SemanticEntry {
  name: string;
  value: string;
  cssVar: string;
  on?: string;
}

function SemanticRow({ entry }: { entry: SemanticEntry }) {
  const { name, value, cssVar, on } = entry;
  const fg = on ?? pickFg(value);
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "72px 1fr auto auto",
        alignItems: "center",
        columnGap: 16,
        padding: "10px 12px",
        borderBlockEnd: "1px solid var(--gp-color-border-default)",
      }}
    >
      <div
        style={{
          height: 56,
          background: value,
          color: fg,
          borderRadius: "var(--gp-radius-md)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          // 24px (= 18pt) is axe's threshold for "large text", switching the
          // contrast bar to AA-large (3:1) — the correct rule for status
          // icon / UI-element swatches. Smaller would force AA-normal (4.5:1)
          // which fails for legitimately-3:1-passing midtone colors like
          // success-500 vs. success-50.
          fontSize: 24,
          fontWeight: 600,
          fontFamily: "var(--gp-font-family)",
          border: "1px solid var(--gp-color-border-subtle)",
        }}
      >
        Aa
      </div>
      <div>
        <div
          style={{
            fontWeight: 600,
            color: "var(--gp-color-text-regular)",
            fontFamily: "var(--gp-font-family)",
          }}
        >
          {name}
        </div>
        <code style={{ fontSize: 12, color: "var(--gp-color-text-subtle)" }}>
          {cssVar}
        </code>
      </div>
      <code style={{ fontSize: 12, color: "var(--gp-color-text-subtle)" }}>
        {value}
      </code>
      <code
        title={`Contrast of ${fg} on ${value}`}
        style={{
          fontSize: 12,
          color: "var(--gp-color-text-subtle)",
          minWidth: 56,
          textAlign: "right",
        }}
      >
        {fmtRatio(fg, value)}
      </code>
    </div>
  );
}

function GroupCard({
  title,
  entries,
  as: Heading = "h3",
}: {
  title: string;
  entries: SemanticEntry[];
  /** Heading level — defaults to h3. SemanticColors uses h2 (groups sit
   *  directly under the page h1); LightVsDark keeps h3 (groups sit under
   *  the per-mode h2). */
  as?: "h2" | "h3";
}) {
  return (
    <section style={{ marginBlockEnd: 24 }}>
      <Heading
        style={{
          margin: "0 0 8px",
          fontSize: 13,
          textTransform: "uppercase",
          letterSpacing: 0.5,
          color: "var(--gp-color-text-subtle)",
          fontFamily: "var(--gp-font-family-heading)",
        }}
      >
        {title}
      </Heading>
      <Card>
        {entries.map((e) => (
          <SemanticRow key={e.cssVar} entry={e} />
        ))}
      </Card>
    </section>
  );
}

function buildSemanticEntries(
  brand: ReturnType<typeof useBrand>,
  mode: ColorMode,
) {
  const s = brand.semantic;
  const surface = s.background.primary.default[mode];
  const mv = (m: ModeValue) => m[mode];
  const status = (key: keyof typeof s.status, c: StatusColor) => [
    {
      name: `${key} text`,
      value: mv(c.text),
      cssVar: `--gp-color-status-${key}-text`,
      on: mv(c.background),
    },
    {
      name: `${key} icon`,
      value: mv(c.icon),
      cssVar: `--gp-color-status-${key}-icon`,
      // The icon swatch is rendered as text in the preview. Pair against the
      // status's matching background (the surface an icon is naturally drawn
      // on) — this is also the contrast pair our token tests assert ≥4.5:1.
      on: mv(c.background),
    },
    {
      name: `${key} background`,
      value: mv(c.background),
      cssVar: `--gp-color-status-${key}-bg`,
      on: mv(c.text),
    },
    {
      name: `${key} hover`,
      value: mv(c.hover),
      cssVar: `--gp-color-status-${key}-hover`,
      on: mv(c.text),
    },
  ];
  return {
    Brand: [
      {
        name: "Brand default",
        value: mv(s.brand.default),
        cssVar: "--gp-color-brand-default",
        on: mv(s.brand.on),
      },
      {
        name: "Brand hover",
        value: mv(s.brand.hover),
        cssVar: "--gp-color-brand-hover",
        on: mv(s.brand.on),
      },
      {
        name: "Brand text",
        value: mv(s.brand.text),
        cssVar: "--gp-color-brand-text",
        on: surface,
      },
      {
        name: "On brand",
        value: mv(s.brand.on),
        cssVar: "--gp-color-brand-on",
        on: mv(s.brand.default),
      },
    ],
    Background: [
      {
        name: "Primary default",
        value: mv(s.background.primary.default),
        cssVar: "--gp-color-bg-primary-default",
        on: mv(s.text.regular),
      },
      {
        name: "Primary hover",
        value: mv(s.background.primary.hover),
        cssVar: "--gp-color-bg-primary-hover",
        on: mv(s.text.regular),
      },
      {
        name: "Secondary default",
        value: mv(s.background.secondary.default),
        cssVar: "--gp-color-bg-secondary-default",
        on: mv(s.text.regular),
      },
      {
        name: "Secondary hover",
        value: mv(s.background.secondary.hover),
        cssVar: "--gp-color-bg-secondary-hover",
        on: mv(s.text.regular),
      },
    ],
    "Text & icon": [
      {
        name: "Regular text",
        value: mv(s.text.regular),
        cssVar: "--gp-color-text-regular",
        on: surface,
      },
      {
        name: "Subtle text",
        value: mv(s.text.subtle),
        cssVar: "--gp-color-text-subtle",
        on: surface,
      },
      {
        name: "Link",
        value: mv(s.text.link),
        cssVar: "--gp-color-text-link",
        on: surface,
      },
      {
        name: "Link hover",
        value: mv(s.text.linkHover),
        cssVar: "--gp-color-text-link-hover",
        on: surface,
      },
      {
        name: "Regular icon",
        value: mv(s.icon.regular),
        cssVar: "--gp-color-icon-regular",
        on: surface,
      },
      {
        name: "Subtle icon",
        value: mv(s.icon.subtle),
        cssVar: "--gp-color-icon-subtle",
        on: surface,
      },
    ],
    Status: [
      ...status("success", s.status.success),
      ...status("warning", s.status.warning),
      ...status("danger", s.status.danger),
      ...status("info", s.status.info),
    ],
    Nonstatus: [
      {
        name: "Border",
        value: mv(s.nonstatus.border),
        cssVar: "--gp-color-border-default",
        // Borders sit next to the surface, not under text. Use text.regular
        // for the Aa preview so it's readable — the row's hex/contrast columns
        // already tell the story of border-vs-surface relationship.
        on: mv(s.text.regular),
      },
      {
        name: "Border subtle",
        value: mv(s.nonstatus.borderSubtle),
        cssVar: "--gp-color-border-subtle",
        on: mv(s.text.regular),
      },
    ],
  } satisfies Record<string, SemanticEntry[]>;
}

export const SemanticColors: StoryObj = {
  name: "Semantic colors",
  render: () => {
    const brand = useBrand();
    const { mode } = useTheme();
    const groups = buildSemanticEntries(brand, mode);
    return (
      <FoundationPage
        title="Colors — semantic tokens"
        intro={
          <>
            Semantic tokens describe a color&apos;s <em>role</em> in the UI.
            Components reference these, never raw palette values, so re-skinning
            is a matter of swapping the brand. Each token resolves to a different
            value per color mode (currently: <strong>{mode}</strong>). Switch the{" "}
            <strong>Mode</strong> toolbar above to see how each role adapts. The
            right-most number on each row is the WCAG contrast ratio against the
            swatch&apos;s natural companion color.
          </>
        }
      >
        {Object.entries(groups).map(([title, entries]) => (
          <GroupCard key={title} title={title} entries={entries} as="h2" />
        ))}
      </FoundationPage>
    );
  },
};

export const LightVsDark: StoryObj = {
  name: "Light vs dark side-by-side",
  render: () => {
    const brand = useBrand();
    const lightGroups = buildSemanticEntries(brand, "light");
    const darkGroups = buildSemanticEntries(brand, "dark");
    return (
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        {(["light", "dark"] as const).map((m, i) => {
          const groups = i === 0 ? lightGroups : darkGroups;
          const bg =
            i === 0
              ? brand.semantic.background.primary.default.light
              : brand.semantic.background.primary.default.dark;
          const fg =
            i === 0
              ? brand.semantic.text.regular.light
              : brand.semantic.text.regular.dark;
          return (
            <div key={m} data-mode={m} data-brand={brand.name}>
              <h2
                style={{
                  fontSize: 18,
                  fontFamily: "var(--gp-font-family-heading)",
                  color: fg,
                  background: bg,
                  padding: 12,
                  margin: 0,
                  borderRadius: "var(--gp-radius-md) var(--gp-radius-md) 0 0",
                  textTransform: "capitalize",
                }}
              >
                {m} mode
              </h2>
              <div style={{ background: bg, padding: 12 }}>
                {Object.entries(groups).map(([title, entries]) => (
                  <GroupCard key={title} title={title} entries={entries} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  },
};

const STOPS: (keyof BrandColorScale)[] = [
  50, 100, 200, 300, 400, 500, 600, 700, 800, 900,
];

function FamilyRow({ name, scale }: { name: string; scale: BrandColorScale }) {
  return (
    <section style={{ marginBlockEnd: 24 }}>
      <header
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 12,
          marginBlockEnd: 8,
        }}
      >
        <h3
          style={{
            margin: 0,
            fontSize: 16,
            textTransform: "capitalize",
            fontFamily: "var(--gp-font-family-heading)",
            color: "var(--gp-color-text-regular)",
          }}
        >
          {name}
        </h3>
        <code style={{ fontSize: 12, color: "var(--gp-color-text-subtle)" }}>
          --gp-palette-{name}-50 → 900
        </code>
      </header>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${STOPS.length}, 1fr)`,
          borderRadius: "var(--gp-radius-md)",
          overflow: "hidden",
          border: "1px solid var(--gp-color-border-default)",
        }}
      >
        {STOPS.map((stop) => {
          const hex = scale[stop];
          const fg = pickFg(hex);
          return (
            <div
              key={stop}
              title={`${name} ${stop} · ${hex} · contrast vs ${fg}: ${fmtRatio(fg, hex)}`}
              style={{
                background: hex,
                color: fg,
                padding: "20px 8px",
                textAlign: "center",
                fontFamily: "var(--gp-font-family)",
                fontSize: 12,
                lineHeight: 1.35,
                minWidth: 0,
              }}
            >
              <div style={{ fontWeight: 700, fontSize: 13 }}>{stop}</div>
              <div style={{ marginBlockStart: 2, fontWeight: 500 }}>{hex}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export const ColorFamilies: StoryObj = {
  name: "Color families (palette)",
  render: () => {
    const brand = useBrand();
    const order = [
      "gray",
      "brand",
      "accent",
      "success",
      "warning",
      "danger",
      "info",
    ] as const;
    const known = new Set<string>(order);
    const extras = Object.keys(brand.palette).filter((k) => !known.has(k));
    return (
      <FoundationPage
        title="Colors — color families"
        intro={
          <>
            Raw color families with stops 50–900 (lightest → darkest). The
            palette is mode-agnostic — it&apos;s the source the semantic
            tokens resolve into. Hover any stop to see its WCAG contrast.
          </>
        }
      >
        <Section title="Required families" description="Every brand must define these.">
          {order.map((name) => {
            const scale = brand.palette[name];
            if (!scale) return null;
            return <FamilyRow key={name} name={name} scale={scale} />;
          })}
        </Section>
        {extras.length > 0 ? (
          <Section title="Custom families" description="Added by this brand.">
            {extras.map((name) => {
              const scale = brand.palette[name];
              if (!scale) return null;
              return <FamilyRow key={name} name={name} scale={scale} />;
            })}
          </Section>
        ) : null}
      </FoundationPage>
    );
  },
};
