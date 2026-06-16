/**
 * BackToTop — floating button that returns the user to the top of a
 * long scrolling view.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { BackToTop } from "@golden-passport/ds-patternfly";

// #region Default
export function Default() {
  return (
    /* Anchor the BackToTop to a NON-scrolling wrapper, not the
       scroll container itself. PF6's BackToTop is
       position:absolute, so its offset parent must be a
       static element — if it lives inside the scroll container,
       it scrolls away with the content. Placing it as a sibling
       of the scroll area (inside this position:relative,
       non-scrolling wrapper) pins it to the demo's bottom-right
       corner so it stays put while the content scrolls beneath. */
    <div style={{ position: "relative", height: "100%" }}>
      <div
        id="back-to-top-scroll"
        style={{
          height: "100%",
          overflowY: "auto",
          padding: 16,
          color: "var(--gp-color-text-regular)",
        }}
      >
        {Array.from({ length: 30 }).map((_, i) => (
          <p key={i} style={{ margin: "12px 0" }}>
            Section {i + 1} — scroll to reveal the back-to-top control.
          </p>
        ))}
      </div>
      {/* isAlwaysVisible keeps it on-screen so the doc reader can
          spot it without scrolling first. */}
      <BackToTop
        scrollableSelector="#back-to-top-scroll"
        title="Back to top"
        isAlwaysVisible
      />
    </div>
  );
}
// #endregion

export default function BackToTopExample() {
  // The demo needs a fixed-height stage so the inner container scrolls.
  return (
    <div style={{ height: 300 }}>
      <Default />
    </div>
  );
}
