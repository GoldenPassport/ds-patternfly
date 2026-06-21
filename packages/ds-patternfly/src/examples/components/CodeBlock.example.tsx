/**
 * CodeSnippet — a fenced code surface for snippets, configuration, and CLI
 * output. The exported CodeSnippet lego block owns the copy-to-clipboard
 * action (with "Copied!" feedback), the optional Run action, and the
 * collapse-after-N-lines expansion; you pass the `code` string.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { CodeSnippet } from "@golden-passport/ds-patternfly";

const sampleYaml = `apiVersion: workflows.acme.io/v1
kind: Workflow
metadata:
  name: onboarding-flow
spec:
  trigger: { schedule: "0 * * * *" }
  steps:
    - name: validate
    - name: notify`;

const longerYaml = `${sampleYaml}
  retries:
    max: 3
    backoff: exponential
  notifications:
    on-success: [#deploys]
    on-failure: [#oncall, #deploys]`;

// #region Basic
export function Basic() {
  return <CodeSnippet code={sampleYaml} onRun={() => {}} />;
}
// #endregion

// #region Expandable
export function Expandable() {
  return <CodeSnippet code={longerYaml} collapseAfter={4} />;
}
// #endregion

export default function CodeBlockExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <Basic />
      <Expandable />
    </div>
  );
}
