import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  FoundationPage,
  Section,
  Card,
  ConfigurationSection,
  Example,
} from "../_kit/StoryKit.js";
import {
  GenericInfoLabels,
  StatusVariants,
  ColorPalette,
  Variants,
  OutlinedLabels,
  CompactLabels,
  Removable,
} from "../../examples/components/Label.example.js";
import labelExampleSrc from "../../examples/components/Label.example.tsx?raw";
import labelComponentSrc from "../../components/Label.tsx?raw";

const meta: Meta = {
  title: "Components/Label",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Label"
      intro={
        <>
          A small inline tag for status, category, or metadata. Replaces the
          deprecated Chip component for tag-like uses. <strong>Default to
          <code>status=&quot;info&quot;</code> for generic informational tags</strong>
          (&quot;Beta&quot;, &quot;Draft&quot;, &quot;New&quot;); reach for the color
          palette only when distinct user-assigned categories matter.
        </>
      }
    >
      <Section
        title="Generic info labels"
        description='For neutral, informational tags ("Beta", "Draft", "New"), lead with status="info" rather than picking from the color palette. The info coloring carries semantic intent and stays consistent across brands.'
      >
        <Card>
          <Example
            source={labelExampleSrc}
            region="GenericInfoLabels"
            fileName="Label.example.tsx"
          >
            <GenericInfoLabels />
          </Example>
        </Card>
      </Section>

      <Section title="Status variants" description="Status-themed labels carry semantic meaning. Reach for these before the color palette.">
        <Card>
          <Example
            source={labelExampleSrc}
            region="StatusVariants"
            fileName="Label.example.tsx"
          >
            <StatusVariants />
          </Example>
        </Card>
      </Section>

      <Section
        title="Color palette"
        description="Use the color palette only when status doesn't fit — distinct categories, project tags, or user-assigned labels where the meaning lives in the text and the color is just a category index."
      >
        <Card>
          <Example
            source={labelExampleSrc}
            region="ColorPalette"
            fileName="Label.example.tsx"
          >
            <ColorPalette />
          </Example>
        </Card>
      </Section>

      <Section title="Variants" description="Outline vs filled.">
        <Card>
          <Example
            source={labelExampleSrc}
            region="Variants"
            fileName="Label.example.tsx"
          >
            <Variants />
          </Example>
        </Card>
      </Section>

      <Section
        title="Outlined labels"
        description="A less prominent label style — a tinted outline instead of a filled background. Reach for it when filled labels read too heavy, or to separate non-clickable tags from clickable ones. Works with both status and the color palette."
      >
        <Card>
          <Example
            source={labelExampleSrc}
            region="OutlinedLabels"
            fileName="Label.example.tsx"
          >
            <OutlinedLabels />
          </Example>
        </Card>
      </Section>

      <Section
        title="Compact labels"
        description="Smaller padding for space-constrained surfaces — table cells, toolbar chips, or a Beta / preview tag beside a title. Pass isCompact; it composes with status, color, outline, icons, and onClose."
      >
        <Card>
          <Example
            source={labelExampleSrc}
            region="CompactLabels"
            fileName="Label.example.tsx"
          >
            <CompactLabels />
          </Example>
        </Card>
      </Section>

      <Section title="Removable" description="Pass onClose to make the label dismissible.">
        <Card>
          <Example
            source={labelExampleSrc}
            region="Removable"
            fileName="Label.example.tsx"
          >
            <Removable />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example source={labelExampleSrc} fileName="Label.example.tsx" />
        </Card>
      </Section>

      <ConfigurationSection
        importStatement={'import { Label } from "@golden-passport/ds-patternfly";'}
        componentSource={labelComponentSrc}
        componentFileName="Label.tsx"
        rows={[
          {
            name: "color",
            type: '"blue" | "teal" | "green" | "orange" | "purple" | "red" | "orangered" | "grey" | "yellow"',
            description: "Category color. Pick one color per category and reuse it consistently across the app.",
          },
          {
            name: "variant",
            type: '"outline" | "filled"',
            description: "Filled draws attention; outline is the standard tag look.",
          },
          {
            name: "status",
            type: '"success" | "warning" | "danger" | "info" | "custom"',
            description: "Semantic status — overrides color and adds the matching status icon.",
          },
          {
            name: "icon",
            type: "ReactNode",
            description: "Leading icon. Combine with a brand glyph or a status icon.",
          },
          {
            name: "onClose",
            type: "(event) => void",
            description: "Adds a close button. closeBtnAriaLabel is required when set.",
          },
          {
            name: "closeBtnAriaLabel",
            type: "string",
            description: 'Accessible label for the close button. Required with onClose. Include the label content for context: "Remove Engineering".',
          },
          {
            name: "isCompact",
            type: "boolean",
            description: "Smaller padding for dense surfaces (table cells, toolbar chips).",
          },
          {
            name: "href",
            type: "string",
            description: "Make the label a link (renders as anchor).",
          },
        ]}
      />

      <Section
        title="Picking color vs status"
        description="The decision tree."
      >
        <Card>
          <ul
            style={{
              margin: 0,
              padding: "16px 24px 16px 40px",
              color: "var(--gp-color-text-regular)",
              lineHeight: 1.8,
            }}
          >
            <li><strong>Generic informational tag</strong> (&quot;Beta&quot;, &quot;Draft&quot;, &quot;New&quot;, &quot;Preview&quot;) → <code>status=&quot;info&quot;</code>. The default for neutral metadata.</li>
            <li><strong>Conveys success / warning / failure</strong> → <code>status=&quot;success&quot; / &quot;warning&quot; / &quot;danger&quot;</code>. Carries icon + color + AT-readable variant.</li>
            <li><strong>Distinct user-assigned categories</strong> (project tags, team labels) → use <code>color=...</code> from the palette. Pick one color per category and stay consistent.</li>
            <li><strong>Don&apos;t pick palette colors to imply status</strong> — &quot;blue=info&quot; / &quot;red=error&quot; means nothing to AT and inconsistent across brands. Use <code>status=...</code> for that.</li>
          </ul>
        </Card>
      </Section>

      <Section
        title="When to use it"
        description="Labels carry meaning, not decoration."
      >
        <Card>
          <ul
            style={{
              margin: 0,
              padding: "16px 24px 16px 40px",
              color: "var(--gp-color-text-regular)",
              lineHeight: 1.8,
            }}
          >
            <li><strong>Use Label for…</strong> status pills, category tags, filters in a toolbar, metadata in a card.</li>
            <li><strong>Don&apos;t use Label for…</strong> form field labels — that&apos;s the Form/FormGroup label prop.</li>
            <li><strong>Don&apos;t rely on color alone.</strong> &quot;Done&quot; in green and &quot;Failed&quot; in red read identically to a colorblind user — the text content is what carries the meaning.</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
