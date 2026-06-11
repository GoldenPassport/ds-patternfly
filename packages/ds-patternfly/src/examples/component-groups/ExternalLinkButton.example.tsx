/**
 * ExternalLinkButton (@patternfly/react-component-groups) — a Button preset
 * for outbound links: sets component="a", target="_blank",
 * rel="noopener noreferrer", and renders a trailing external-link glyph.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { ExternalLinkButton } from "@patternfly/react-component-groups/dist/dynamic/ExternalLinkButton";

// #region Variants
export function Variants() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
      <ExternalLinkButton href="https://patternfly.org" variant="primary">
        Primary
      </ExternalLinkButton>
      <ExternalLinkButton href="https://patternfly.org" variant="secondary">
        Secondary
      </ExternalLinkButton>
      <ExternalLinkButton href="https://patternfly.org" variant="link" isInline>
        Inline link
      </ExternalLinkButton>
    </div>
  );
}
// #endregion

export default function ExternalLinkButtonExample() {
  return <Variants />;
}
