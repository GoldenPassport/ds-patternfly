import { Brand } from "@patternfly/react-core";
import { useTheme } from "../theme/ThemeProvider.js";

/**
 * Shared Acme demo logo for the Storybook docs.
 *
 * Renders inline SVG data-URIs through PF6's `<Brand>` so we get the same
 * `<picture>` / `<source>` responsive behaviour the other stories rely on,
 * but the "Acme" wordmark color is computed from the active ThemeProvider
 * mode — `#0a0a0a` in light mode, `#f5f5f5` in dark mode — so the logo
 * stays readable when the Storybook toolbar flips the theme.
 *
 * Props:
 *  - `widths` — width per breakpoint passed through to PF6 `<Brand>`.
 *    Defaults to `{ default: 40px, sm: 60px, md: 180px }` so the
 *    picture squares to icon-only on phones and stretches for the
 *    wordmark on tablet+. Pass a single-value object (e.g.
 *    `{ default: "140px" }`) to keep a consistent width across all
 *    viewports — useful when you want the wordmark visible on mobile.
 *  - `wideMinWidth` (default `768px`) is the viewport breakpoint at
 *    which the logo switches from icon-only to icon + "Acme"
 *    wordmark. Pass `992px` for tight masthead slots, or `0px` to
 *    always render the wordmark.
 */
export function AcmeLogo({
  wideMinWidth = "768px",
  widths = { default: "40px", sm: "60px", md: "180px" },
}: {
  wideMinWidth?: string;
  widths?: { default?: string; sm?: string; md?: string; lg?: string; xl?: string; "2xl"?: string };
} = {}) {
  const { mode } = useTheme();
  const text = mode === "dark" ? "#f5f5f5" : "#0a0a0a";
  const svg = (m: string) =>
    "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(m);

  const acmeIcon = svg(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
      <circle cx="20" cy="20" r="20" fill="#0066cc"/>
      <path d="M11 28 L20 10 L29 28 M14.5 22 L25.5 22" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    </svg>`,
  );
  const acmeWide = svg(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 40">
      <circle cx="20" cy="20" r="20" fill="#0066cc"/>
      <path d="M11 28 L20 10 L29 28 M14.5 22 L25.5 22" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <text x="52" y="27" fill="${text}" font-family="Arial, sans-serif" font-size="22" font-weight="700" letter-spacing="-0.5">Acme</text>
    </svg>`,
  );

  // The browser picks the first <source> whose media query matches.
  // A single `(min-width: wideMinWidth)` source covers every viewport
  // at-or-above the wide cutoff; the fallback <img src> below it
  // covers everything narrower. Defaults to 768px (md); pass 992px
  // (lg) to keep icon-only through tablet widths.
  return (
    <Brand src={acmeIcon} alt="Acme" widths={widths}>
      <source media={`(min-width: ${wideMinWidth})`} srcSet={acmeWide} />
    </Brand>
  );
}
