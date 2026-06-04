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
 * Variants:
 *  - `widths` defaults match the consuming masthead layout (40px on
 *    mobile, 60px on sm, 180px on md+).
 */
export function AcmeLogo() {
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

  return (
    <Brand
      src={acmeWide}
      alt="Acme"
      widths={{ default: "40px", sm: "60px", md: "180px" }}
    >
      <source media="(min-width: 1200px)" srcSet={acmeWide} />
      <source media="(min-width: 992px)" srcSet={acmeWide} />
      <source media="(min-width: 768px)" srcSet={acmeWide} />
      <source media="(min-width: 576px)" srcSet={acmeIcon} />
      <source media="(min-width: 320px)" srcSet={acmeIcon} />
      <source srcSet={acmeWide} />
    </Brand>
  );
}
