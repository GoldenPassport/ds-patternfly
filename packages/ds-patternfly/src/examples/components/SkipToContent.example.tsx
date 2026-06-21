/**
 * SkipToContent — keyboard-only escape hatch that jumps focus past page chrome
 * to the content that matters. The exported DS component renders a single skip
 * link (targetId + label) or a focus-revealed menu of skip links (links[]).
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useId } from "react";
import { SkipToContent } from "@golden-passport/ds-patternfly";

// #region TryIt
export function TryIt() {
  const id = useId();
  const navId = `${id}-nav`;
  const searchId = `${id}-search`;
  const mainId = `${id}-main`;

  return (
    <div
      style={{
        position: "relative",
        border: "1px dashed var(--gp-color-border-subtle)",
        borderRadius: 6,
        padding: 24,
        minHeight: 220,
      }}
    >
      {/* A menu of skip links — revealed together on focus, each jumping to a
          different landmark. Every target is focusable (tabIndex={-1}). */}
      <SkipToContent
        ariaLabel="Skip links"
        links={[
          { targetId: mainId, label: "Skip to main content" },
          { targetId: navId, label: "Skip to navigation" },
          { targetId: searchId, label: "Skip to search" },
        ]}
      />

      <p style={{ marginTop: 0 }}>
        <strong>Mock page chrome.</strong> Press <kbd>Tab</kbd> to surface the
        skip-links menu, then pick a destination.
      </p>

      <nav
        id={navId}
        tabIndex={-1}
        aria-label="Primary"
        className="gp-skip-demo-region"
        style={regionStyle}
      >
        <strong>Navigation</strong> — Dashboard · Workflows · Integrations · Settings
      </nav>

      <div
        id={searchId}
        tabIndex={-1}
        role="search"
        className="gp-skip-demo-region"
        style={regionStyle}
      >
        <strong>Search</strong> — find workflows, runs, and integrations
      </div>

      <main
        id={mainId}
        tabIndex={-1}
        className="gp-skip-demo-main"
        style={{ ...regionStyle, marginBottom: 0 }}
      >
        <h2 style={{ marginTop: 0 }}>Main content</h2>
        <p style={{ marginBottom: 0 }}>
          The skip links set focus straight here (or to nav / search) so
          assistive-tech users don&apos;t have to crawl through the masthead and
          side nav on every page load.
        </p>
      </main>
    </div>
  );
}

const regionStyle = {
  marginTop: 16,
  marginBottom: 16,
  padding: 16,
  background: "var(--gp-color-bg-secondary-default)",
  borderRadius: 6,
  outline: "none",
} as const;
// #endregion

export default function SkipToContentExample() {
  return <TryIt />;
}
