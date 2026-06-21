import { Fragment, useCallback, useId, useState } from "react";
import {
  Button,
  ClipboardCopyButton,
  CodeBlock,
  CodeBlockAction,
  CodeBlockCode,
  ExpandableSection,
  ExpandableSectionToggle,
  Tooltip,
} from "../base/index.js";
import { PlayIcon } from "@patternfly/react-icons";

/**
 * useCopyToClipboard — copy text and track a transient "copied" flag that
 * resets after `resetMs` (default 1500). Returns `{ copied, copy }`.
 */
export function useCopyToClipboard(resetMs = 1500) {
  const [copied, setCopied] = useState(false);
  const copy = useCallback(
    (text: string) => {
      void navigator.clipboard?.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), resetMs);
    },
    [resetMs],
  );
  return { copied, copy };
}

export interface CodeSnippetProps {
  /** The code to display and copy. */
  code: string;
  /** Id base for the code + a11y wiring. */
  id?: string;
  /** Copy-button label in its resting state. */
  copyLabel?: string;
  /** Copy-button label right after a copy. */
  copiedLabel?: string;
  /** Show a Run action wired to this handler. */
  onRun?: () => void;
  /** Tooltip for the Run action (default "Run snippet"). */
  runLabel?: string;
  /** Collapse to this many lines, revealing the rest behind a toggle. */
  collapseAfter?: number;
  /** Expand-toggle label when collapsed (default "Show more"). */
  showMoreLabel?: string;
  /** Expand-toggle label when expanded (default "Show less"). */
  showLessLabel?: string;
}

/**
 * CodeSnippet — a fenced code surface with a built-in copy-to-clipboard
 * action (with "Copied!" feedback), an optional Run action, and optional
 * collapse-after-N-lines expansion. The lego block owns the copy state, the
 * action bar, and the expandable split; you pass the `code` string.
 */
export function CodeSnippet({
  code,
  id,
  copyLabel = "Copy to clipboard",
  copiedLabel = "Copied!",
  onRun,
  runLabel = "Run snippet",
  collapseAfter,
  showMoreLabel = "Show more",
  showLessLabel = "Show less",
}: CodeSnippetProps) {
  const reactId = useId();
  const base = id ?? reactId;
  const { copied, copy } = useCopyToClipboard();
  const [expanded, setExpanded] = useState(false);
  const [running, setRunning] = useState(false);

  const actions = (
    <Fragment>
      <CodeBlockAction>
        <ClipboardCopyButton
          id={`${base}-copy`}
          aria-label="Copy code to clipboard"
          onClick={() => copy(code)}
          exitDelay={copied ? 1500 : 600}
          maxWidth="110px"
          variant="plain"
        >
          {copied ? copiedLabel : copyLabel}
        </ClipboardCopyButton>
      </CodeBlockAction>
      {onRun ? (
        <CodeBlockAction>
          <Tooltip
            aria="none"
            aria-live="polite"
            content={running ? "Running…" : runLabel}
            onTooltipHidden={() => setRunning(false)}
          >
            <Button
              variant="plain"
              aria-label={runLabel}
              icon={<PlayIcon />}
              onClick={() => {
                setRunning(true);
                onRun();
              }}
            />
          </Tooltip>
        </CodeBlockAction>
      ) : null}
    </Fragment>
  );

  // Collapse the code into a head + an expandable tail when requested.
  const lines = code.split("\n");
  const isCollapsible = collapseAfter != null && lines.length > collapseAfter;

  if (isCollapsible) {
    const head = lines.slice(0, collapseAfter).join("\n");
    const tail = lines.slice(collapseAfter).join("\n");
    return (
      <CodeBlock actions={actions}>
        <CodeBlockCode id={`${base}-code`}>
          {head}
          <ExpandableSection
            isExpanded={expanded}
            isDetached
            contentId={`${base}-content`}
            toggleId={`${base}-toggle`}
          >
            {"\n" + tail}
          </ExpandableSection>
        </CodeBlockCode>
        <ExpandableSectionToggle
          isExpanded={expanded}
          onToggle={setExpanded}
          contentId={`${base}-content`}
          toggleId={`${base}-toggle`}
          direction="up"
        >
          {expanded ? showLessLabel : showMoreLabel}
        </ExpandableSectionToggle>
      </CodeBlock>
    );
  }

  return (
    <CodeBlock actions={actions}>
      <CodeBlockCode id={`${base}-code`}>{code}</CodeBlockCode>
    </CodeBlock>
  );
}
