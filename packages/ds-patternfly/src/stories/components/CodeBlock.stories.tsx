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
import codeSnippetComponentSrc from "../../components/ds/CodeSnippet.tsx?raw";

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

      <Section
        title="useCopyToClipboard"
        description="The copy-with-feedback hook behind CodeSnippet, exported for reuse elsewhere (a copy button on an id, a token, a share URL)."
      >
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "useCopyToClipboard(resetMs?)", type: "() => { copied, copy }", description: "Returns a copied flag and a copy(text) function; copied flips true on copy and resets after resetMs (default 1500)." },
                { name: "copied", type: "boolean", description: "True for resetMs after the last copy — drive a 'Copied!' label / tooltip." },
                { name: "copy", type: "(text: string) => void", description: "Writes text to the clipboard and sets copied." },
              ]}
            />
          </div>
        </Card>
      </Section>

      <ConfigurationSection
        importStatement={'import { CodeSnippet, useCopyToClipboard } from "@golden-passport/ds-patternfly";'}
        componentSource={codeSnippetComponentSrc}
        componentFileName="CodeSnippet.tsx"
        description="CodeSnippet owns the copy action (with 'Copied!' feedback), the optional Run action, and collapse-after-N-lines expansion. You pass the code string."
        rows={[
          { name: "code", type: "string", description: "The code to display and copy." },
          { name: "onRun", type: "() => void", description: "When set, renders a Run action (play button + live tooltip)." },
          { name: "runLabel", type: "string", description: "Tooltip for the Run action (default \"Run snippet\")." },
          { name: "collapseAfter", type: "number", description: "Collapse to this many lines, revealing the rest behind a Show more / Show less toggle." },
          { name: "copyLabel / copiedLabel", type: "string", description: "Copy-button labels in the resting / just-copied states." },
          { name: "id", type: "string", description: "Id base for the code body + expand a11y wiring." },
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
            <li><strong>Copy + run a11y is built in</strong> — CodeSnippet labels the copy button and announces the &ldquo;Copied!&rdquo; / &ldquo;Running…&rdquo; confirmation via a polite live region.</li>
            <li><strong>Don&rsquo;t hide critical commands behind expand</strong> — if the snippet is the answer to a question, show it by default.</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
