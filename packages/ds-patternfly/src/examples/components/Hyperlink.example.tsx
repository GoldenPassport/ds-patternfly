/**
 * Hyperlink — a real <a> styled with the brand's blue link tokens.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { Hyperlink } from "@golden-passport/ds-patternfly";

// #region InlineLinks
export function InlineLinks() {
  return (
    <p style={{ margin: 0, color: "var(--gp-color-text-regular)" }}>
      See the{" "}
      <Hyperlink href="#">PatternFly 6 documentation</Hyperlink>{" "}
      for the full component surface, or read the{" "}
      <Hyperlink href="#" variant="underline">always-underlined variant</Hyperlink>{" "}
      for inline use inside prose.
    </p>
  );
}
// #endregion

// #region ExternalLinks
export function ExternalLinks() {
  return (
    <p style={{ margin: 0, color: "var(--gp-color-text-regular)" }}>
      Visit{" "}
      <Hyperlink href="https://www.patternfly.org" target="_blank">
        patternfly.org
      </Hyperlink>{" "}
      for the source design system.
    </p>
  );
}
// #endregion

// #region Variants
export function Variants() {
  return (
    <div style={{ display: "grid", gap: 12, color: "var(--gp-color-text-regular)" }}>
      <Hyperlink href="#">Default — underlines on hover/focus</Hyperlink>
      <Hyperlink href="#" variant="underline">
        Underline — always underlined (use inline in prose)
      </Hyperlink>
    </div>
  );
}
// #endregion

export default function HyperlinkExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <InlineLinks />
      <ExternalLinks />
      <Variants />
    </div>
  );
}
