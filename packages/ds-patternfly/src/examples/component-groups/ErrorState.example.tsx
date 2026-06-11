/**
 * ErrorState (@patternfly/react-component-groups) — a pre-built EmptyState
 * variant for "something failed" screens: load failures, save failures,
 * partial-render failures.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import ErrorState from "@patternfly/react-component-groups/dist/dynamic/ErrorState";
import { Button } from "../_lib.js";

// #region Default
export function Default() {
  return (
    <ErrorState
      titleText="Something went wrong"
      bodyText="We couldn't load your workflows. Try again, or contact support if the issue persists."
      customFooter={
        <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
          <Button variant="primary">Retry</Button>
          <Button variant="link">Contact support</Button>
        </div>
      }
    />
  );
}
// #endregion

// #region StatusVariants
export function StatusVariants() {
  return (
    <ErrorState
      status="warning"
      titleText="Rate limited"
      bodyText="You've hit the API rate limit. Try again in a minute."
    />
  );
}
// #endregion

export default function ErrorStateExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <Default />
      <StatusVariants />
    </div>
  );
}
