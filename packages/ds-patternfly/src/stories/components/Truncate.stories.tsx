import type { Meta, StoryObj } from "@storybook/react-vite";
import { Truncate, TruncatePosition } from "@golden-passport/ds-patternfly";
import { FoundationPage, Section, Card, CodeBlock } from "../_kit/StoryKit.js";
import { DemoFrame, PropsTable } from "../_kit/DemoKit.js";

const meta: Meta = {
  title: "Components/Truncate",
  parameters: { layout: "padded" },
};
export default meta;

const longString =
  "redhat_logo_black_and_white_reversed_simple_with_fedora_container.zip";

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Truncate"
      intro={
        <>
          A long-string truncator with auto-tooltip. Use for filenames, ids,
          URLs, and any unbounded text rendered in width-constrained layouts
          (table cells, sidebars, breadcrumb segments). The full string is
          available on hover via PF&rsquo;s Tooltip.
        </>
      }
    >
      <Section
        title="Default (truncate at end)"
        description="Wrap a string in a width-constrained container; Truncate clips it with an ellipsis when the rendered width exceeds the container, and surfaces the full value as a tooltip."
      >
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame>
              <div style={{ width: 280, color: "var(--gp-color-text-regular)" }}>
                <Truncate content={longString} />
              </div>
            </DemoFrame>
            <CodeBlock>{`<div style={{ width: 280 }}>
  <Truncate content="redhat_logo_black_and_white_reversed_simple_with_fedora_container.zip" />
</div>`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section
        title="Truncate in the middle"
        description="position='middle' clips the centre and preserves the start + end of the string. Best for filenames where both the prefix and the file extension carry meaning."
      >
        <Card>
          <div style={{ padding: 24 }}>
            <DemoFrame>
              <div style={{ width: 280, color: "var(--gp-color-text-regular)" }}>
                <Truncate
                  content={longString}
                  position={TruncatePosition.middle}
                  trailingNumChars={10}
                />
              </div>
            </DemoFrame>
          </div>
        </Card>
      </Section>

      <Section
        title="Truncate at start"
        description="position='start' clips the beginning and preserves the tail — useful for paths and breadcrumb-style strings where the most meaningful segment is at the end."
      >
        <Card>
          <div style={{ padding: 24 }}>
            <DemoFrame>
              <div style={{ width: 280, color: "var(--gp-color-text-regular)" }}>
                <Truncate
                  content="/var/log/acme/workflow/run-12834/step-validate-input.log"
                  position={TruncatePosition.start}
                />
              </div>
            </DemoFrame>
          </div>
        </Card>
      </Section>

      <Section
        title="Max characters"
        description="maxCharsDisplayed forces a character-count truncation (instead of width-based). Use when the ellipsis must trigger consistently regardless of font / container width — e.g. ids in dense rows."
      >
        <Card>
          <div style={{ padding: 24 }}>
            <DemoFrame>
              <div style={{ display: "grid", gap: 8, color: "var(--gp-color-text-regular)" }}>
                <div>
                  End: <Truncate maxCharsDisplayed={15} content={longString} />
                </div>
                <div>
                  Middle: <Truncate maxCharsDisplayed={15} position={TruncatePosition.middle} content={longString} />
                </div>
                <div>
                  Start: <Truncate maxCharsDisplayed={15} position={TruncatePosition.start} content={longString} />
                </div>
              </div>
            </DemoFrame>
          </div>
        </Card>
      </Section>

      <Section
        title="Custom tooltip position"
        description="tooltipPosition lets you anchor the auto-tooltip somewhere other than top — useful when the truncated text sits near the edge of the viewport."
      >
        <Card>
          <div style={{ padding: 24 }}>
            <DemoFrame>
              <div style={{ width: 280, color: "var(--gp-color-text-regular)" }}>
                <Truncate content={longString} tooltipPosition="right" />
              </div>
            </DemoFrame>
          </div>
        </Card>
      </Section>

      <Section title="Most-used props">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "content", type: "string", description: "The full string. Required." },
                { name: "position", type: '"end" | "middle" | "start"', description: "Where the ellipsis goes. end = default (filename style); middle = preserve both sides (ids); start = preserve tail (paths, breadcrumbs)." },
                { name: "trailingNumChars", type: "number", description: "When position='middle', how many trailing characters to preserve. Default 7." },
                { name: "maxCharsDisplayed", type: "number", description: "Force character-count truncation (overrides the width-based behaviour). Use when consistency across rows matters more than packing the available width." },
                { name: "tooltipPosition", type: '"auto" | "top" | "bottom" | "left" | "right" | ...', description: "Where the auto-tooltip anchors (default 'top')." },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section title="When to use">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Filenames in tables / lists</strong> — middle truncation keeps prefix + extension visible.</li>
            <li><strong>Long ids or URLs in cells</strong> — end truncation is fine when the prefix carries the meaning.</li>
            <li><strong>Paths in breadcrumbs / nav rails</strong> — start truncation keeps the leaf-most segment visible.</li>
            <li><strong>Don&rsquo;t use for prose</strong> — Use CSS <code>line-clamp</code> for multi-line body copy; Truncate is for single-line atomic strings.</li>
          </ul>
        </Card>
      </Section>

      <Section title="Accessibility">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>The full string lives on the tooltip</strong> — screen readers + keyboard-focused users get the un-truncated value via PF&rsquo;s built-in Tooltip.</li>
            <li><strong>Don&rsquo;t hand-truncate with substring + &lsquo;…&rsquo;</strong> — assistive tech reads the truncated text and the user has no way to recover the rest.</li>
            <li><strong>Choose position based on what the user needs to recognise.</strong> If the meaningful difference is at the end (file extension, id suffix), don&rsquo;t truncate it away.</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
