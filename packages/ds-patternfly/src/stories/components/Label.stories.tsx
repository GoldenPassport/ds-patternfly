import type { Meta, StoryObj } from "@storybook/react-vite";
import { Label } from "@patternfly/react-core";
import { FoundationPage, Section, Card, CodeBlock } from "../../components/StoryKit.js";
import { DemoFrame, PropsTable } from "../../components/DemoKit.js";

const meta: Meta = {
  title: "Components/Label",
  parameters: { layout: "padded" },
};
export default meta;

const COLORS = ["blue", "teal", "green", "orange", "purple", "red", "orangered", "grey", "yellow"] as const;

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
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <Label status="info">Beta</Label>
                <Label status="info">Draft</Label>
                <Label status="info">New</Label>
                <Label status="info">Preview</Label>
              </div>
            </DemoFrame>
            <CodeBlock>{`// Default for any neutral, informational tag
<Label status="info">Beta</Label>
<Label status="info">Draft</Label>`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section title="Status variants" description="Status-themed labels carry semantic meaning. Reach for these before the color palette.">
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <Label status="info">Info</Label>
                <Label status="success">Success</Label>
                <Label status="warning">Warning</Label>
                <Label status="danger">Danger</Label>
              </div>
            </DemoFrame>
            <CodeBlock>{`<Label status="info">In review</Label>
<Label status="success">Approved</Label>
<Label status="warning">Action needed</Label>
<Label status="danger">Failed</Label>`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section
        title="Color palette"
        description="Use the color palette only when status doesn't fit — distinct categories, project tags, or user-assigned labels where the meaning lives in the text and the color is just a category index."
      >
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {COLORS.map((c) => (
                  <Label key={c} color={c}>
                    {c}
                  </Label>
                ))}
              </div>
            </DemoFrame>
          </div>
        </Card>
      </Section>

      <Section title="Variants" description="Outline vs filled.">
        <Card>
          <div style={{ padding: 24 }}>
            <DemoFrame>
              <div style={{ display: "flex", gap: 8 }}>
                <Label variant="outline">Outline</Label>
                <Label variant="filled" color="blue">Filled</Label>
              </div>
            </DemoFrame>
          </div>
        </Card>
      </Section>

      <Section
        title="Outlined labels"
        description="A less prominent label style — a tinted outline instead of a filled background. Reach for it when filled labels read too heavy, or to separate non-clickable tags from clickable ones. Works with both status and the color palette."
      >
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <Label variant="outline" status="info">Info</Label>
                <Label variant="outline" status="success">Success</Label>
                <Label variant="outline" status="warning">Warning</Label>
                <Label variant="outline" status="danger">Danger</Label>
              </div>
            </DemoFrame>
            <DemoFrame>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {COLORS.map((c) => (
                  <Label key={c} variant="outline" color={c}>
                    {c}
                  </Label>
                ))}
              </div>
            </DemoFrame>
            <CodeBlock>{`<Label variant="outline" status="success">Approved</Label>
<Label variant="outline" color="blue">Engineering</Label>`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section
        title="Compact labels"
        description="Smaller padding for space-constrained surfaces — table cells, toolbar chips, or a Beta / preview tag beside a title. Pass isCompact; it composes with status, color, outline, icons, and onClose."
      >
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame>
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  flexWrap: "wrap",
                  alignItems: "center",
                }}
              >
                <Label isCompact status="info">Info</Label>
                <Label isCompact status="success">Success</Label>
                <Label isCompact color="blue">Blue</Label>
                <Label isCompact variant="outline" color="blue">Outline</Label>
                <Label
                  isCompact
                  color="grey"
                  onClose={() => {}}
                  closeBtnAriaLabel="Remove tag"
                >
                  Removable
                </Label>
              </div>
            </DemoFrame>
            <CodeBlock>{`<Label isCompact status="success">Approved</Label>
<Label isCompact variant="outline" color="blue">Engineering</Label>`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section title="Removable" description="Pass onClose to make the label dismissible.">
        <Card>
          <div style={{ padding: 24 }}>
            <DemoFrame>
              <div style={{ display: "flex", gap: 8 }}>
                <Label color="blue" onClose={() => {}} closeBtnAriaLabel="Remove engineering filter">
                  Engineering
                </Label>
                <Label color="blue" onClose={() => {}} closeBtnAriaLabel="Remove design filter">
                  Design
                </Label>
              </div>
            </DemoFrame>
          </div>
        </Card>
      </Section>

      <Section title="Props">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
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
          </div>
        </Card>
      </Section>

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
