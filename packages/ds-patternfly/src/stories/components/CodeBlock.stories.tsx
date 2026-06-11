import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  FoundationPage,
  Section,
  Card,
  ConfigurationSection,
  Example,
} from "../_kit/StoryKit.js";
import { PropsTable } from "../_kit/DemoKit.js";
import {
  Basic,
  Expandable,
} from "../../examples/components/CodeBlock.example.js";
import codeBlockExampleSrc from "../../examples/components/CodeBlock.example.tsx?raw";
import codeBlockComponentSrc from "../../components/base/CodeBlock.tsx?raw";

const meta: Meta = {
  title: "Components/CodeBlock",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
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
          <Example
            source={codeBlockExampleSrc}
            region="Basic"
            fileName="CodeBlock.example.tsx"
          >
            <Basic />
          </Example>
        </Card>
      </Section>

      <Section
        title="Expandable"
        description="Wrap part of the body in ExpandableSection (with isDetached) so a long snippet collapses to its first few lines. Use ExpandableSectionToggle inside CodeBlock for the open/close affordance — pair them via matching toggleId + contentId."
      >
        <Card>
          <Example
            source={codeBlockExampleSrc}
            region="Expandable"
            fileName="CodeBlock.example.tsx"
          >
            <Expandable />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example source={codeBlockExampleSrc} fileName="CodeBlock.example.tsx" />
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

      <ConfigurationSection
        importStatement={'import { CodeBlock, CodeBlockCode, CodeBlockAction, ClipboardCopyButton } from "@golden-passport/ds-patternfly";'}
        componentSource={codeBlockComponentSrc}
        componentFileName="CodeBlock.tsx"
        rows={[
          { name: "CodeBlock.actions", type: "ReactNode", description: "Trailing action slot — wrap each in a CodeBlockAction for consistent spacing." },
          { name: "CodeBlockCode.id", type: "string", description: "DOM id — useful when you reference the body from aria-controls / aria-labelledby." },
          { name: "ClipboardCopyButton.exitDelay", type: "number", description: "How long the 'Copied!' tooltip stays visible after click. Use ~1500ms for confirmation." },
          { name: "ClipboardCopyButton.maxWidth", type: "string", description: "Cap the tooltip width — long copy labels wrap nicely." },
          { name: "ClipboardCopyButton.onTooltipHidden", type: "() => void", description: "Reset your 'just copied' state when the tooltip fades — pairs with a useState toggle." },
        ]}
      />

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
  ),
};
