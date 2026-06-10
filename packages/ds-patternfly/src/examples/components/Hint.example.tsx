/**
 * Hint — a small contextual callout for new-feature introductions,
 * workflow tips, and pointers to documentation.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { Hint, HintBody, HintFooter, HintTitle, Hyperlink } from "../_lib.js";

// #region TitleBodyFooter
// HintFooter links use the lib's Hyperlink component — universal blue,
// always-underlined. Use Hyperlink for navigation; reserve
// Button variant="link" for actions that don't change URL.
export function TitleBodyFooter() {
  return (
    <Hint>
      <HintTitle>New: bulk task assignment</HintTitle>
      <HintBody>
        Select multiple tasks in the list and use the toolbar to
        assign them all at once.
      </HintBody>
      <HintFooter>
        <Hyperlink href="/docs/bulk-assignment">
          Read the docs
        </Hyperlink>
      </HintFooter>
    </Hint>
  );
}
// #endregion

// #region ExternalDocsLink
// target="_blank" — Hyperlink auto-adds rel="noopener noreferrer", a small
// external-link icon, and a screen-reader "(opens in a new tab)"
// announcement.
export function ExternalDocsLink() {
  return (
    <Hint>
      <HintTitle>Tip — keyboard shortcuts</HintTitle>
      <HintBody>
        Press <kbd>?</kbd> anywhere to open the full shortcut
        reference.
      </HintBody>
      <HintFooter>
        <Hyperlink
          href="https://www.patternfly.org/components/hint"
          target="_blank"
        >
          Hint component reference
        </Hyperlink>
      </HintFooter>
    </Hint>
  );
}
// #endregion

// #region InlineLink
export function InlineLink() {
  return (
    <Hint>
      <HintBody>
        Tip: hold Shift to select a range of tasks. See the{" "}
        <Hyperlink href="/docs/selection">
          selection model
        </Hyperlink>{" "}
        for the full keyboard reference.
      </HintBody>
    </Hint>
  );
}
// #endregion

// #region BodyOnly
export function BodyOnly() {
  return (
    <Hint>
      <HintBody>Tip: hold Shift to select a range of tasks.</HintBody>
    </Hint>
  );
}
// #endregion

export default function HintExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <TitleBodyFooter />
      <ExternalDocsLink />
      <InlineLink />
      <BodyOnly />
    </div>
  );
}
