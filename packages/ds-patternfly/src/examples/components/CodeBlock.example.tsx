/**
 * CodeBlock — a fenced code surface for snippets, configuration, and CLI output.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { Fragment, useId, useState } from "react";
import {
  Button,
  ClipboardCopyButton,
  CodeBlock,
  CodeBlockAction,
  CodeBlockCode,
  ExpandableSection,
  ExpandableSectionToggle,
  Tooltip,
} from "@golden-passport/ds-patternfly";
import { PlayIcon } from "@patternfly/react-icons";

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
  const id = useId();
  const [copied, setCopied] = useState(false);
  const [running, setRunning] = useState(false);

  const actions = (
    <Fragment>
      <CodeBlockAction>
        <ClipboardCopyButton
          id={`${id}-copy`}
          aria-label="Copy code to clipboard"
          onClick={() => {
            navigator.clipboard.writeText(sampleYaml);
            setCopied(true);
          }}
          exitDelay={copied ? 1500 : 600}
          maxWidth="110px"
          variant="plain"
          onTooltipHidden={() => setCopied(false)}
        >
          {copied ? "Copied!" : "Copy to clipboard"}
        </ClipboardCopyButton>
      </CodeBlockAction>
      <CodeBlockAction>
        <Tooltip
          aria="none"
          aria-live="polite"
          content={running ? "Running…" : "Run snippet"}
          onTooltipHidden={() => setRunning(false)}
        >
          <Button
            variant="plain"
            aria-label="Run snippet"
            icon={<PlayIcon />}
            onClick={() => setRunning((r) => !r)}
          />
        </Tooltip>
      </CodeBlockAction>
    </Fragment>
  );

  return (
    <CodeBlock actions={actions}>
      <CodeBlockCode id={`${id}-code`}>{sampleYaml}</CodeBlockCode>
    </CodeBlock>
  );
}
// #endregion

// #region Expandable
export function Expandable() {
  const id = useId();
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const actions = (
    <CodeBlockAction>
      <ClipboardCopyButton
        id={`${id}-copy`}
        aria-label="Copy expandable code to clipboard"
        onClick={() => {
          navigator.clipboard.writeText(longerYaml);
          setCopied(true);
        }}
        exitDelay={copied ? 1500 : 600}
        maxWidth="110px"
        variant="plain"
        onTooltipHidden={() => setCopied(false)}
      >
        {copied ? "Copied!" : "Copy to clipboard"}
      </ClipboardCopyButton>
    </CodeBlockAction>
  );

  const headSnippet = sampleYaml.split("\n").slice(0, 4).join("\n");
  const tailSnippet = sampleYaml.split("\n").slice(4).join("\n") + "\n" +
    `  retries:
    max: 3
    backoff: exponential`;

  return (
    <CodeBlock actions={actions}>
      <CodeBlockCode>
        {headSnippet}
        <ExpandableSection
          isExpanded={expanded}
          isDetached
          contentId={`${id}-content`}
          toggleId={`${id}-toggle`}
        >
          {tailSnippet}
        </ExpandableSection>
      </CodeBlockCode>
      <ExpandableSectionToggle
        isExpanded={expanded}
        onToggle={setExpanded}
        contentId={`${id}-content`}
        toggleId={`${id}-toggle`}
        direction="up"
      >
        {expanded ? "Show less" : "Show more"}
      </ExpandableSectionToggle>
    </CodeBlock>
  );
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
