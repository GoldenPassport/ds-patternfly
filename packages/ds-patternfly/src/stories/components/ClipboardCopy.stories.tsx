import type { Meta, StoryObj } from "@storybook/react-vite";
import { ClipboardCopy, ClipboardCopyVariant } from "@patternfly/react-core";
import { FoundationPage, Section, Card, CodeBlock } from "../_storyKit.js";
import { DemoFrame, PropsTable } from "../_demoKit.js";

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
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame>
              <ClipboardCopy
                copyAriaLabel="Copy connection string"
                hoverTip="Copy"
                clickTip="Copied"
              >
                postgres://user@host:5432/db
              </ClipboardCopy>
            </DemoFrame>
            <CodeBlock>{`<ClipboardCopy copyAriaLabel="Copy connection string" hoverTip="Copy" clickTip="Copied">
  postgres://user@host:5432/db
</ClipboardCopy>`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section
        title="Read-only"
        description="isReadOnly disables editing — use when the value must be preserved verbatim (API tokens, generated ids, exact CLI commands)."
      >
        <Card>
          <div style={{ padding: 24 }}>
            <DemoFrame>
              <ClipboardCopy
                isReadOnly
                copyAriaLabel="Copy API token"
                hoverTip="Copy"
                clickTip="Copied"
              >
                sk_live_4eC39HqLyjWDarjtT1zdp7dc
              </ClipboardCopy>
            </DemoFrame>
          </div>
        </Card>
      </Section>

      <Section
        title="Expanded"
        description="variant='expansion' adds a disclosure caret that reveals a full multi-line view of the value — useful for long URLs, JSON snippets, or wrapped strings the user wants to inspect before copying."
      >
        <Card>
          <div style={{ padding: 24 }}>
            <DemoFrame>
              <ClipboardCopy
                toggleAriaLabel="Show / hide full value"
                copyAriaLabel="Copy full value"
                hoverTip="Copy"
                clickTip="Copied"
                variant={ClipboardCopyVariant.expansion}
              >
                {`{ "name": "onboarding-flow", "trigger": "0 * * * *", "steps": ["validate", "notify"], "retries": { "max": 3, "backoff": "exponential" } }`}
              </ClipboardCopy>
            </DemoFrame>
          </div>
        </Card>
      </Section>

      <Section
        title="Inline-compact"
        description="variant='inline-compact' renders as a tag-like chip suitable for embedding in body copy or sentences. Pair with isBlock when the chip should still wrap to its own line."
      >
        <Card>
          <div style={{ padding: 24 }}>
            <DemoFrame>
              {/* PF6 v6 ClipboardCopy[variant="inline-compact"] still
                  renders a <div> internally, so it can't be a descendant
                  of <p>. Use <span style="display:block"> as the line
                  wrapper to get the same visual layout with valid HTML
                  nesting. */}
              <div style={{ display: "grid", gap: 12, color: "var(--gp-color-text-regular)" }}>
                <span style={{ display: "block" }}>
                  Install with{" "}
                  <ClipboardCopy
                    copyAriaLabel="Copy install command"
                    hoverTip="Copy"
                    clickTip="Copied"
                    variant="inline-compact"
                  >
                    pnpm add @golden-passport/ds-patternfly
                  </ClipboardCopy>
                  {" "}from the package registry.
                </span>
                <span style={{ display: "block" }}>
                  Reference id:{" "}
                  <ClipboardCopy
                    copyAriaLabel="Copy reference id"
                    hoverTip="Copy"
                    clickTip="Copied"
                    variant="inline-compact"
                  >
                    01HX3KZ8M3W6GQ5R2Y4N7T9P0J
                  </ClipboardCopy>
                </span>
              </div>
            </DemoFrame>
          </div>
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

      <Section title="Most-used props">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
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
          </div>
        </Card>
      </Section>

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
