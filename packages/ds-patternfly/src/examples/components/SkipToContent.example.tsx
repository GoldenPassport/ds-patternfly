/**
 * SkipToContent — keyboard-only escape hatch that jumps focus to main content.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useId } from "react";
// PF6's own SkipToContent (href/onClick API). The DS exports its own
// SkipToContent (targetId/label, see src/a11y/SkipToContent.tsx) under the
// same name — this example documents the PF6 primitive it builds on.
import { SkipToContent } from "@patternfly/react-core";

// #region TryIt
export function TryIt() {
  const id = useId();
  const mainId = `${id}-main`;

  return (
    <div
      style={{
        position: "relative",
        border: "1px dashed var(--gp-color-border-subtle)",
        borderRadius: 6,
        padding: 24,
        minHeight: 160,
      }}
    >
      <SkipToContent
        onClick={(e) => {
          e.preventDefault();
          document.getElementById(mainId)?.focus();
        }}
        href={`#${mainId}`}
      >
        Skip to content
      </SkipToContent>
      <p style={{ marginTop: 0 }}>
        <strong>Mock page chrome.</strong> Press <kbd>Tab</kbd>{" "}
        to surface the skip link.
      </p>
      <main
        id={mainId}
        tabIndex={-1}
        className="gp-skip-demo-main"
        style={{
          marginTop: 16,
          padding: 16,
          background: "var(--gp-color-bg-secondary-default)",
          borderRadius: 6,
          outline: "none",
        }}
      >
        <h2 style={{ marginTop: 0 }}>Main content</h2>
        <p>
          The skip link sets focus here so AT users don&apos;t
          have to crawl through the masthead and side nav on
          every page load.
        </p>
      </main>
    </div>
  );
}
// #endregion

export default function SkipToContentExample() {
  return <TryIt />;
}
