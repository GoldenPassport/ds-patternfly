import { Fragment, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Button,
  ClipboardCopyButton,
  CodeBlock,
  CodeBlockAction,
  CodeBlockCode,
  ExpandableSection,
  ExpandableSectionToggle,
  Tooltip,
} from "@patternfly/react-core";
import { PlayIcon } from "@patternfly/react-icons";
import { FoundationPage, Section, Card, CodeBlock as CodeBlockKit } from "../../components/StoryKit.js";
import { DemoFrame, PropsTable } from "../../components/DemoKit.js";

const meta: Meta = {
  title: "Components/CodeBlock",
  parameters: { layout: "padded" },
};
export default meta;

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

export const Overview: StoryObj = {
  render: () => {
    const [copied, setCopied] = useState(false);
    const [running, setRunning] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [copied2, setCopied2] = useState(false);

    const onCopy = (text: string, set: (b: boolean) => void) => {
      navigator.clipboard.writeText(text);
      set(true);
    };

    const basicActions = (
      <Fragment>
        <CodeBlockAction>
          <ClipboardCopyButton
            id="basic-copy"
            aria-label="Copy code to clipboard"
            onClick={() => onCopy(sampleYaml, setCopied)}
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

    const expandableActions = (
      <CodeBlockAction>
        <ClipboardCopyButton
          id="expand-copy"
          aria-label="Copy expandable code to clipboard"
          onClick={() => onCopy(longerYaml, setCopied2)}
          exitDelay={copied2 ? 1500 : 600}
          maxWidth="110px"
          variant="plain"
          onTooltipHidden={() => setCopied2(false)}
        >
          {copied2 ? "Copied!" : "Copy to clipboard"}
        </ClipboardCopyButton>
      </CodeBlockAction>
    );

    const headSnippet = sampleYaml.split("\n").slice(0, 4).join("\n");
    const tailSnippet = sampleYaml.split("\n").slice(4).join("\n") + "\n" +
      `  retries:
    max: 3
    backoff: exponential`;

    return (
      <FoundationPage
        title="CodeBlock"
        intro={
          <>
            A fenced code surface for snippets, configuration, and CLI
            output. Pair the body with optional <code>CodeBlockAction</code>{" "}
            buttons (copy, run, share) and an expandable section when the
            full snippet would dominate the page. Use for any content
            consumers will copy verbatim — YAML manifests, command lines,
            workflow expressions, JSON payloads.
          </>
        }
      >
        <Section
          title="Basic"
          description="CodeBlock + CodeBlockCode renders monospace content with the standard fenced-code chrome. Pass actions for trailing icon-buttons (copy / run / etc) wired via CodeBlockAction."
        >
          <Card>
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <DemoFrame>
                <CodeBlock actions={basicActions}>
                  <CodeBlockCode id="basic-code">{sampleYaml}</CodeBlockCode>
                </CodeBlock>
              </DemoFrame>
              <CodeBlockKit>{`const [copied, setCopied] = useState(false);

const actions = (
  <CodeBlockAction>
    <ClipboardCopyButton
      id="copy"
      aria-label="Copy code to clipboard"
      onClick={() => { navigator.clipboard.writeText(code); setCopied(true); }}
      exitDelay={copied ? 1500 : 600}
      variant="plain"
      onTooltipHidden={() => setCopied(false)}
    >
      {copied ? "Copied!" : "Copy to clipboard"}
    </ClipboardCopyButton>
  </CodeBlockAction>
);

<CodeBlock actions={actions}>
  <CodeBlockCode id="code-id">{code}</CodeBlockCode>
</CodeBlock>`}</CodeBlockKit>
            </div>
          </Card>
        </Section>

        <Section
          title="Expandable"
          description="Wrap part of the body in ExpandableSection (with isDetached) so a long snippet collapses to its first few lines. Use ExpandableSectionToggle inside CodeBlock for the open/close affordance — pair them via matching toggleId + contentId."
        >
          <Card>
            <div style={{ padding: 24 }}>
              <DemoFrame>
                <CodeBlock actions={expandableActions}>
                  <CodeBlockCode>
                    {headSnippet}
                    <ExpandableSection
                      isExpanded={expanded}
                      isDetached
                      contentId="expand-code-content"
                      toggleId="expand-code-toggle"
                    >
                      {tailSnippet}
                    </ExpandableSection>
                  </CodeBlockCode>
                  <ExpandableSectionToggle
                    isExpanded={expanded}
                    onToggle={setExpanded}
                    contentId="expand-code-content"
                    toggleId="expand-code-toggle"
                    direction="up"
                  >
                    {expanded ? "Show less" : "Show more"}
                  </ExpandableSectionToggle>
                </CodeBlock>
              </DemoFrame>
            </div>
          </Card>
        </Section>

        <Section title="Composition">
          <Card>
            <div style={{ padding: 24 }}>
              <PropsTable
                rows={[
                  { name: "CodeBlock", type: "container", description: "Outer wrapper. actions={node} renders trailing icon buttons (copy / run / share)." },
                  { name: "CodeBlockCode", type: "child", description: "The monospace body. Pass id when you need to reference it from aria attributes elsewhere." },
                  { name: "CodeBlockAction", type: "child", description: "Wraps each trailing action so PF6 spaces them consistently. Holds ClipboardCopyButton, run buttons, kebab menus." },
                  { name: "ClipboardCopyButton", type: "child", description: "Copy-to-clipboard button with built-in 'Copied!' tooltip flip. exitDelay + onTooltipHidden control the confirmation timing." },
                ]}
              />
            </div>
          </Card>
        </Section>

        <Section title="Most-used props">
          <Card>
            <div style={{ padding: 24 }}>
              <PropsTable
                rows={[
                  { name: "CodeBlock.actions", type: "ReactNode", description: "Trailing action slot — wrap each in a CodeBlockAction for consistent spacing." },
                  { name: "CodeBlockCode.id", type: "string", description: "DOM id — useful when you reference the body from aria-controls / aria-labelledby." },
                  { name: "ClipboardCopyButton.exitDelay", type: "number", description: "How long the 'Copied!' tooltip stays visible after click. Use ~1500ms for confirmation." },
                  { name: "ClipboardCopyButton.maxWidth", type: "string", description: "Cap the tooltip width — long copy labels wrap nicely." },
                  { name: "ClipboardCopyButton.onTooltipHidden", type: "() => void", description: "Reset your 'just copied' state when the tooltip fades — pairs with a useState toggle." },
                ]}
              />
            </div>
          </Card>
        </Section>

        <Section title="When to use">
          <Card>
            <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
              <li><strong>CodeBlock</strong> — fenced multi-line code consumers may copy verbatim. CLI examples, config snippets, payloads.</li>
              <li><strong>ClipboardCopy</strong> (component) — single-line value with a copy button — credentials, ids, version strings. See Components/ClipboardCopy.</li>
              <li><strong>Inline <code>&lt;code&gt;</code></strong> — single tokens within prose (a flag, a variable name). Don&rsquo;t reach for CodeBlock for two words.</li>
            </ul>
          </Card>
        </Section>

        <Section title="Accessibility">
          <Card>
            <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
              <li><strong>ClipboardCopyButton needs aria-label</strong> — describes what it copies (&ldquo;Copy install command&rdquo;), not just &ldquo;Copy&rdquo;.</li>
              <li><strong>Use <code>aria-live=&quot;polite&quot;</code></strong> on action tooltips so the &ldquo;Copied!&rdquo; / &ldquo;Running…&rdquo; confirmation is announced to screen readers.</li>
              <li><strong>Don&rsquo;t hide critical commands behind expand</strong> — if the snippet is the answer to a question, show it by default.</li>
            </ul>
          </Card>
        </Section>
      </FoundationPage>
    );
  },
};
