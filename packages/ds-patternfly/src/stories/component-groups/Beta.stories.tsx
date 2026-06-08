import type { Meta, StoryObj } from "@storybook/react-vite";
import { Label, LabelGroup } from "@patternfly/react-core";
import { FoundationPage, Section, Card, CodeBlock } from "../../components/StoryKit.js";
import { DemoFrame, PropsTable } from "../../components/DemoKit.js";

const meta: Meta = {
  title: "Component groups/Status and state indicators/Beta",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Beta"
      intro={
        <>
          A small &ldquo;Beta&rdquo; / &ldquo;Preview&rdquo; / &ldquo;Tech preview&rdquo;
          tag for features that aren&rsquo;t generally available. Not a separate
          PF component — the convention is a <code>Label</code> with a
          consistent colour and copy. The recipe below is what we use
          across the design system.
        </>
      }
    >
      <Section
        title="Conventions"
        description="Use a Label sized to fit alongside the title it qualifies. Colour by GA-distance: orange for Tech preview, gold for Beta, blue for general 'New'."
      >
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame>
              <div style={{ display: "grid", gap: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <strong style={{ color: "var(--gp-color-text-regular)" }}>
                    Workflow templates
                  </strong>
                  <Label color="yellow" isCompact>Beta</Label>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <strong style={{ color: "var(--gp-color-text-regular)" }}>
                    AI suggestions
                  </strong>
                  <Label color="orange" isCompact>Tech preview</Label>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <strong style={{ color: "var(--gp-color-text-regular)" }}>
                    Run history
                  </strong>
                  <Label color="blue" isCompact>New</Label>
                </div>
              </div>
            </DemoFrame>
            <CodeBlock>{`<div style={{ display: "flex", alignItems: "center", gap: 8 }}>
  <strong>Workflow templates</strong>
  <Label color="yellow" isCompact>Beta</Label>
</div>`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section
        title="Stacked example"
        description="A LabelGroup keeps multiple qualifiers tidy when a feature is, say, Beta + Premium."
      >
        <Card>
          <div style={{ padding: 24 }}>
            <DemoFrame>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <strong style={{ color: "var(--gp-color-text-regular)" }}>
                  Cross-region replication
                </strong>
                <LabelGroup numLabels={3} isCompact>
                  <Label color="yellow" isCompact>Beta</Label>
                  <Label color="purple" isCompact>Premium</Label>
                </LabelGroup>
              </div>
            </DemoFrame>
          </div>
        </Card>
      </Section>

      <Section title="Conventions table">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "alpha", type: "Label color='red'", description: "Pre-beta — internal tasting only. Don't ship to users; if you must, gate behind an explicit opt-in." },
                { name: "techPreview", type: "Label color='orange'", description: "Tech preview — public, but expect breaking changes and rough edges." },
                { name: "beta", type: "Label color='yellow'", description: "Feature-complete but not officially supported. Expect API stability with bug-fix iteration." },
                { name: "new", type: "Label color='blue'", description: "Recently GA — use for a release cycle to draw attention, then drop." },
                { name: "deprecated", type: "Label color='grey'", description: "Going away — pair with a removal date in the body / tooltip." },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section title="Accessibility">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Use <code>isCompact</code></strong> so the label sits inline with the title without dominating it.</li>
            <li><strong>The label text is the announcement.</strong> &ldquo;Beta&rdquo; alone is short — when the meaning isn&rsquo;t obvious in your product, expand to &ldquo;Beta — known limitations apply&rdquo; with a Tooltip explaining what to expect.</li>
            <li><strong>Keep the colour mapping consistent.</strong> Beta = yellow across the entire product. Different colours for the same state break trust in the system.</li>
            <li><strong>Drop the label when it ships GA.</strong> A &ldquo;New&rdquo; label that lives there for a year stops meaning anything.</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
