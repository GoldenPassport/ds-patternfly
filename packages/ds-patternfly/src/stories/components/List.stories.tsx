import type { Meta, StoryObj } from "@storybook/react-vite";
import { FoundationPage, Section, Card, Example } from "../_kit/StoryKit.js";
import { PropsTable } from "../_kit/DemoKit.js";
import {
  Unordered,
  Ordered,
  Inline,
  Plain,
  WithIcons,
  WithHorizontalRules,
} from "../../examples/components/List.example.js";
import listExampleSrc from "../../examples/components/List.example.tsx?raw";

const meta: Meta = {
  title: "Components/List",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="List"
      intro={
        <>
          A semantic <code>&lt;ul&gt;</code> / <code>&lt;ol&gt;</code> with
          PF6 styling. Use for prose-flow lists (in body content, FAQ
          answers, instructional steps) and as a building block for
          icon-led item lists. For interactive selection lists, use{" "}
          <code>SimpleList</code>; for tabular data, use{" "}
          <code>DataList</code> / <code>Table</code>.
        </>
      }
    >
      <Section title="Unordered (default)">
        <Card>
          <Example
            source={listExampleSrc}
            region="Unordered"
            fileName="List.example.tsx"
          >
            <Unordered />
          </Example>
        </Card>
      </Section>

      <Section
        title="Ordered"
        description="component='ol' renders as an ordered list. type sets the marker style — pick a meaningful one when the order itself communicates something (e.g. lower-roman for sub-steps in a numbered procedure)."
      >
        <Card>
          <Example
            source={listExampleSrc}
            region="Ordered"
            fileName="List.example.tsx"
          >
            <Ordered />
          </Example>
        </Card>
      </Section>

      <Section
        title="Inline"
        description="variant='inline' lays items horizontally with comma-style separation (no bullets). Use for inline sequences in body copy — tags, breadcrumb-like trails, or comma-separated metadata."
      >
        <Card>
          <Example
            source={listExampleSrc}
            region="Inline"
            fileName="List.example.tsx"
          >
            <Inline />
          </Example>
        </Card>
      </Section>

      <Section
        title="Plain (no markers)"
        description="isPlain strips the marker column. Use as the base for icon-led item lists, or for stacks of full-width content that don't read as bullets."
      >
        <Card>
          <Example
            source={listExampleSrc}
            region="Plain"
            fileName="List.example.tsx"
          >
            <Plain />
          </Example>
        </Card>
      </Section>

      <Section
        title="With icons"
        description="Combine isPlain + per-item icon for a clean icon-led list — a common detail-screen pattern (capabilities, requirements, included features)."
      >
        <Card>
          <Example
            source={listExampleSrc}
            region="WithIcons"
            fileName="List.example.tsx"
          >
            <WithIcons />
          </Example>
        </Card>
      </Section>

      <Section
        title="With horizontal rules"
        description="isBordered adds a divider between each item — useful for changelogs, activity feeds, or settings rows where each item is a substantial block."
      >
        <Card>
          <Example
            source={listExampleSrc}
            region="WithHorizontalRules"
            fileName="List.example.tsx"
          >
            <WithHorizontalRules />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example source={listExampleSrc} fileName="List.example.tsx" />
        </Card>
      </Section>

      <Section title="Most-used props">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "component", type: '"ul" | "ol"', description: "Renders as ul (default) or ol. Pair ol with type for marker style." },
                { name: "type", type: 'OrderType — "1" | "a" | "A" | "i" | "I"', description: "Marker style for ordered lists. number / lowerAlpha / upperAlpha / lowerRoman / upperRoman aliases also exposed via the OrderType enum." },
                { name: "variant", type: '"inline"', description: "Lay items horizontally — comma-style for inline body copy." },
                { name: "isPlain", type: "boolean", description: "Strip the marker column. The base for icon-led lists." },
                { name: "isBordered", type: "boolean", description: "Divider between items." },
                { name: "iconSize", type: '"default" | "lg"', description: "Bump the per-item icon size for hero lists." },
                { name: "ListItem.icon", type: "ReactNode", description: "Per-item leading glyph." },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section title="When to use">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>List</strong> — prose-flow lists. Body content, FAQ answers, step-by-step instructions, capability lists, changelogs.</li>
            <li><strong>SimpleList</strong> — interactive single-select pickers / nav lists.</li>
            <li><strong>DataList</strong> — structured rows with multiple cells, checkboxes, actions, expansion.</li>
            <li><strong>TreeView</strong> — hierarchical / nested data.</li>
          </ul>
        </Card>
      </Section>

      <Section title="Accessibility">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Use ordered lists when sequence matters.</strong> Steps in a procedure, ranked items — the markers carry the meaning.</li>
            <li><strong>Don&rsquo;t fake bullets with characters.</strong> Use real <code>List</code> + <code>ListItem</code> so screen readers announce &ldquo;list, 3 items&rdquo;.</li>
            <li><strong>Inline lists still read as a list</strong> — useful for sequences screen-reader users still benefit from hearing as a count.</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
