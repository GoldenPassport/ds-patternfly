/**
 * ErrorBoundary (@patternfly/react-component-groups) — a React error
 * boundary with a built-in error page UI. Wrap routes, top-level layouts,
 * or risky widgets so a child crash renders a friendly error page instead
 * of unmounting the whole app.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useState } from "react";
import { ErrorBoundary } from "@patternfly/react-component-groups/dist/dynamic/ErrorBoundary";
import { Button } from "../_lib.js";

function Bomb({ shouldThrow }: { shouldThrow: boolean }) {
  if (shouldThrow) {
    throw new Error("Demo crash — synthesized for the ErrorBoundary preview.");
  }
  return (
    <p style={{ margin: 0, color: "var(--gp-color-text-subtle)" }}>
      All good. Press the button to trigger an error inside the boundary.
    </p>
  );
}

// #region CatchingAThrownError
export function CatchingAThrownError() {
  const [boom, setBoom] = useState(false);
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <Button variant="danger" onClick={() => setBoom((b) => !b)}>
        {boom ? "Reset" : "Throw an error"}
      </Button>
      <ErrorBoundary headerTitle="Workflows">
        <Bomb shouldThrow={boom} />
      </ErrorBoundary>
    </div>
  );
}
// #endregion

export default function ErrorBoundaryExample() {
  return <CatchingAThrownError />;
}
