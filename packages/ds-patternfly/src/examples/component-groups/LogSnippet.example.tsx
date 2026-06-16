/**
 * LogSnippet (@patternfly/react-component-groups) — a small, alert-coloured
 * block for inline error logs and stack traces, for detail panels, error
 * states, or notification drawers.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { LogSnippet } from "@patternfly/react-component-groups/dist/dynamic/LogSnippet";
import { AlertVariant } from "@golden-passport/ds-patternfly";

const sampleLog = `2026-05-10T09:21:14.231Z ERROR  worker-3   Failed to dispatch job 4892
  at WorkflowDispatcher.dispatch (workflow-dispatcher.ts:142)
  at async WorkflowRunner.run (workflow-runner.ts:88)
caused by: ConnectionResetError: connection closed by upstream`;

// #region DefaultDanger
export function DefaultDanger() {
  return (
    <LogSnippet
      message="The job failed during dispatch."
      logSnippet={sampleLog}
      variant={AlertVariant.danger}
    />
  );
}
// #endregion

// #region OtherVariants
export function OtherVariants() {
  return (
    <LogSnippet
      message="Run completed with warnings."
      logSnippet="WARN  step 2 took 14.2s (threshold: 10s)"
      variant={AlertVariant.warning}
    />
  );
}
// #endregion

export default function LogSnippetExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <DefaultDanger />
      <OtherVariants />
    </div>
  );
}
