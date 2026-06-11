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
  DefaultEditable,
  ReadOnly,
  Expanded,
  InlineCompact,
} from "../../examples/components/ClipboardCopy.example.js";
import clipboardCopyExampleSrc from "../../examples/components/ClipboardCopy.example.tsx?raw";
import clipboardCopyComponentSrc from "../../components/base/ClipboardCopy.tsx?raw";

const meta: Meta = {
  title: "Components/ClipboardCopy",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="ClipboardCopy"
      intro={
        <>
          Single-line input with a copy button — the canonical &ldquo;here&rsquo;s
          a value, click to copy&rdquo; control. Use for credentials, ids,
          version strings, share URLs, install commands, and any value the
          user needs to paste somewhere else verbatim. For multi-line code
          snippets, use <code>CodeBlock</code> with <code>ClipboardCopyButton</code>{" "}
          instead.
        </>
      }
    >
      <Section
        title="Default (editable)"
        description="The default variant lets the user edit the value before copying — useful when the displayed value is a starting point (e.g. a connection string with a placeholder host)."
      >
        <Card>
          <Example
            source={clipboardCopyExampleSrc}
            region="DefaultEditable"
            fileName="ClipboardCopy.example.tsx"
          >
            <DefaultEditable />
          </Example>
        </Card>
      </Section>

      <Section
        title="Read-only"
        description="isReadOnly disables editing — use when the value must be preserved verbatim (API tokens, generated ids, exact CLI commands)."
      >
        <Card>
          <Example
            source={clipboardCopyExampleSrc}
            region="ReadOnly"
            fileName="ClipboardCopy.example.tsx"
          >
            <ReadOnly />
          </Example>
        </Card>
      </Section>

      <Section
        title="Expanded"
        description="variant='expansion' adds a disclosure caret that reveals a full multi-line view of the value — useful for long URLs, JSON snippets, or wrapped strings the user wants to inspect before copying."
      >
        <Card>
          <Example
            source={clipboardCopyExampleSrc}
            region="Expanded"
            fileName="ClipboardCopy.example.tsx"
          >
            <Expanded />
          </Example>
        </Card>
      </Section>

      <Section
        title="Inline-compact"
        description="variant='inline-compact' renders as a tag-like chip suitable for embedding in body copy or sentences. Pair with isBlock when the chip should still wrap to its own line."
      >
        <Card>
          <Example
            source={clipboardCopyExampleSrc}
            region="InlineCompact"
            fileName="ClipboardCopy.example.tsx"
          >
            <InlineCompact />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example source={clipboardCopyExampleSrc} fileName="ClipboardCopy.example.tsx" />
        </Card>
      </Section>

      <Section
        title="Composition"
      >
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "ClipboardCopy", type: "container", description: "Self-contained input + copy button. children = the value to copy." },
              ]}
            />
          </div>
        </Card>
      </Section>

      <ConfigurationSection
        importStatement={'import { ClipboardCopy, ClipboardCopyVariant } from "@golden-passport/ds-patternfly";'}
        componentSource={clipboardCopyComponentSrc}
        componentFileName="ClipboardCopy.tsx"
        rows={[
          { name: "children", type: "ReactNode", description: "The value rendered + copied." },
          { name: "variant", type: '"inline" | "inline-compact" | "expansion"', description: "default = full-width input row; inline-compact = chip embedded in prose; expansion = disclosure caret revealing a multi-line view." },
          { name: "isReadOnly", type: "boolean", description: "Disable editing. Use for tokens, ids, exact commands." },
          { name: "isBlock", type: "boolean", description: "Force inline-compact variant onto its own line." },
          { name: "isCode", type: "boolean", description: "Render the value with monospace styling." },
          { name: "copyAriaLabel", type: "string", description: "Accessible label for the copy button — describe what's being copied." },
          { name: "hoverTip / clickTip", type: "string", description: "Tooltip text on hover (idle) and after click (success). Defaults: 'Copy to clipboard' / 'Successfully copied to clipboard!'." },
          { name: "toggleAriaLabel", type: "string", description: "Accessible label for the expansion caret (variant='expansion' only)." },
          { name: "isExpanded / onToggle", type: "boolean / fn", description: "Control the expansion variant programmatically." },
          { name: "exitDelay", type: "number", description: "How long the 'Copied!' tooltip stays after click (ms)." },
          { name: "onCopy", type: "(event, text) => void", description: "Override the copy handler (default uses navigator.clipboard.writeText)." },
        ]}
      />

      <Section title="When to use">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>ClipboardCopy</strong> — a single value the user copies. Tokens, ids, share URLs, install commands.</li>
            <li><strong>CodeBlock + ClipboardCopyButton</strong> — multi-line code snippets. YAML, JSON payloads, configuration.</li>
            <li><strong>Inline <code>&lt;code&gt;</code></strong> — display-only inline tokens (a flag, a variable). No copy affordance.</li>
          </ul>
        </Card>
      </Section>

      <Section title="Accessibility">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>copyAriaLabel describes what's copied</strong> — &ldquo;Copy install command&rdquo;, not just &ldquo;Copy&rdquo;.</li>
            <li><strong>The hoverTip / clickTip are announced to screen readers</strong> — keep them short (&ldquo;Copy&rdquo; / &ldquo;Copied&rdquo;) and use aria-live politely via the built-in tooltip.</li>
            <li><strong>Use isReadOnly when editing would break the value</strong> — secrets, ids — so the user can&rsquo;t accidentally copy a half-edited string.</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
