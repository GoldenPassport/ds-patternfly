import type { Meta, StoryObj } from "@storybook/react-vite";
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
