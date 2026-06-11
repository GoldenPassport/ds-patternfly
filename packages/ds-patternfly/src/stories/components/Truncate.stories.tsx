import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  FoundationPage,
  Section,
  Card,
  ConfigurationSection,
  Example,
} from "../_kit/StoryKit.js";
import {
  Default,
  Middle,
  Start,
  MaxCharacters,
  CustomTooltipPosition,
} from "../../examples/components/Truncate.example.js";
import truncateExampleSrc from "../../examples/components/Truncate.example.tsx?raw";
import truncateComponentSrc from "../../components/Truncate.tsx?raw";

const meta: Meta = {
  title: "Components/Truncate",
  parameters: { layout: "padded" },
};
export default meta;

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
          <Example
            source={truncateExampleSrc}
            region="Default"
            fileName="Truncate.example.tsx"
          >
            <Default />
          </Example>
        </Card>
      </Section>

      <Section
        title="Truncate in the middle"
        description="position='middle' clips the centre and preserves the start + end of the string. Best for filenames where both the prefix and the file extension carry meaning."
      >
        <Card>
          <Example
            source={truncateExampleSrc}
            region="Middle"
            fileName="Truncate.example.tsx"
          >
            <Middle />
          </Example>
        </Card>
      </Section>

      <Section
        title="Truncate at start"
        description="position='start' clips the beginning and preserves the tail — useful for paths and breadcrumb-style strings where the most meaningful segment is at the end."
      >
        <Card>
          <Example
            source={truncateExampleSrc}
            region="Start"
            fileName="Truncate.example.tsx"
          >
            <Start />
          </Example>
        </Card>
      </Section>

      <Section
        title="Max characters"
        description="maxCharsDisplayed forces a character-count truncation (instead of width-based). Use when the ellipsis must trigger consistently regardless of font / container width — e.g. ids in dense rows."
      >
        <Card>
          <Example
            source={truncateExampleSrc}
            region="MaxCharacters"
            fileName="Truncate.example.tsx"
          >
            <MaxCharacters />
          </Example>
        </Card>
      </Section>

      <Section
        title="Custom tooltip position"
        description="tooltipPosition lets you anchor the auto-tooltip somewhere other than top — useful when the truncated text sits near the edge of the viewport."
      >
        <Card>
          <Example
            source={truncateExampleSrc}
            region="CustomTooltipPosition"
            fileName="Truncate.example.tsx"
          >
            <CustomTooltipPosition />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example source={truncateExampleSrc} fileName="Truncate.example.tsx" />
        </Card>
      </Section>

      <ConfigurationSection
        importStatement={'import { Truncate, TruncatePosition } from "@golden-passport/ds-patternfly";'}
        componentSource={truncateComponentSrc}
        componentFileName="Truncate.tsx"
        rows={[
          { name: "content", type: "string", description: "The full string. Required." },
          { name: "position", type: '"end" | "middle" | "start"', description: "Where the ellipsis goes. end = default (filename style); middle = preserve both sides (ids); start = preserve tail (paths, breadcrumbs)." },
          { name: "trailingNumChars", type: "number", description: "When position='middle', how many trailing characters to preserve. Default 7." },
          { name: "maxCharsDisplayed", type: "number", description: "Force character-count truncation (overrides the width-based behaviour). Use when consistency across rows matters more than packing the available width." },
          { name: "tooltipPosition", type: '"auto" | "top" | "bottom" | "left" | "right" | ...', description: "Where the auto-tooltip anchors (default 'top')." },
        ]}
      />

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
