/**
 * Brand — a logo image with PF6 sizing conventions and responsive width support.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { Brand, useTheme } from "../_lib.js";

// Inline SVG data-URIs stand in for the four asset files the canonical PF6
// pattern imports (PF-HorizontalLogo-Color, PF-HorizontalLogo-Reverse,
// PF-IconLogo-color, PF-IconLogo-Reverse). In a real consumer app these
// would be `import pfLogo from "./assets/…svg"` etc.
const svg = (markup: string) =>
  "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(markup);

// Logomark-only (the "picture" — no wordmark). Used at narrow viewports
// where horizontal room is scarce. The mark (blue circle, white chevron)
// reads on light and dark surfaces alike, so one asset covers both themes.
const acmeIcon = svg(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
    <circle cx="20" cy="20" r="20" fill="#0066cc"/>
    <path d="M11 28 L20 10 L29 28 M14.5 22 L25.5 22" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  </svg>`,
);
const acmeIconDark = acmeIcon;
// Logomark + wordmark. The same mark plus the "Acme" name beside it.
// Used at md+ where there's room for both; the wordmark colour is the only
// thing that differs between the light and dark variants.
const acmeWideFor = (text: string) =>
  svg(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 40">
    <circle cx="20" cy="20" r="20" fill="#0066cc"/>
    <path d="M11 28 L20 10 L29 28 M14.5 22 L25.5 22" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <text x="52" y="27" fill="${text}" font-family="Arial, sans-serif" font-size="22" font-weight="700" letter-spacing="-0.5">Acme</text>
  </svg>`,
  );
const acmeWide = acmeWideFor("#0a0a0a");
const acmeWideDark = acmeWideFor("#f5f5f5");

// Pick the wordmark variant for the active ThemeProvider mode so the logo
// stays readable when the app flips to dark. A consumer importing static
// assets would swap pfLogo / pfLogoDark the same way.
function useAcmeWide() {
  const { mode } = useTheme();
  return mode === "dark" ? acmeWideDark : acmeWide;
}

// #region Default
export function Default() {
  const logo = useAcmeWide();
  return <Brand src={logo} alt="Acme" heights={{ default: "32px" }} />;
}
// #endregion

// #region ResponsiveHeights
export function ResponsiveHeights() {
  const logo = useAcmeWide();
  return (
    <Brand
      src={logo}
      alt="Acme"
      heights={{ default: "24px", md: "32px", lg: "40px" }}
    />
  );
}
// #endregion

// #region ResponsiveArtDirection
export function ResponsiveArtDirection() {
  const logo = useAcmeWide();
  // The browser picks the first <source> whose media query matches —
  // full logo on wide screens, icon-only mark on narrow ones.
  return (
    <Brand
      src={acmeIcon}
      alt="Acme"
      widths={{ default: "40px", sm: "60px", md: "180px" }}
    >
      <source media="(min-width: 768px)" srcSet={logo} />
      <source srcSet={acmeIcon} />
    </Brand>
  );
}
// #endregion

// #region LightDarkVariants
export function LightDarkVariants() {
  return (
    <div style={{ display: "flex", gap: 32, alignItems: "center", flexWrap: "wrap" }}>
      <div>
        <div style={{ fontSize: 12, color: "var(--gp-color-text-subtle)", marginBottom: 8 }}>
          Light theme variant
        </div>
        <div style={{ padding: 12, background: "#fff", borderRadius: 6, display: "inline-block" }}>
          <Brand
            src={acmeWide}
            alt="Acme"
            widths={{ default: "40px", sm: "60px", md: "180px" }}
          >
            <source media="(min-width: 576px)" srcSet={acmeWide} />
            <source srcSet={acmeIcon} />
          </Brand>
        </div>
      </div>
      <div>
        <div style={{ fontSize: 12, color: "var(--gp-color-text-subtle)", marginBottom: 8 }}>
          Dark theme variant
        </div>
        <div style={{ padding: 12, background: "#0a0a0a", borderRadius: 6, display: "inline-block" }}>
          <Brand
            src={acmeWideDark}
            alt="Acme"
            widths={{ default: "40px", sm: "60px", md: "180px" }}
          >
            <source media="(min-width: 576px)" srcSet={acmeWideDark} />
            <source srcSet={acmeIconDark} />
          </Brand>
        </div>
      </div>
    </div>
  );
}
// #endregion

export default function BrandExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <Default />
      <ResponsiveHeights />
      <ResponsiveArtDirection />
      <LightDarkVariants />
    </div>
  );
}
