import type { Meta, StoryObj } from "@storybook/react-vite";
import { Severity } from "@patternfly/react-component-groups/dist/dynamic/Severity";
import { FoundationPage, Section, Card, CodeBlock } from "../../components/StoryKit.js";
import { DemoFrame, PropsTable } from "../../components/DemoKit.js";

const meta: Meta = {
  title: "Component groups/Status and state indicators/Severity",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Severity"
      intro={
        <>
          A standardized severity indicator — critical / important /
          moderate / minor / none / undefined. Use it in security
          dashboards, vulnerability scanners, alert triage UIs where
          severity needs to read consistently across screens.
        </>
      }
    >
      <Section title="All severities">
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame>
              <div style={{ display: "grid", gap: 8 }}>
                <Severity severity="critical"  label="Critical" />
                <Severity severity="important" label="Important" />
                <Severity severity="moderate"  label="Moderate" />
                <Severity severity="minor"     label="Minor" />
                <Severity severity="none"      label="None" />
                <Severity severity="undefined" label="Undefined" />
              </div>
            </DemoFrame>
            <CodeBlock>{`<Severity severity="critical" label="Critical" />`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section
        title="Icon-only"
        description="Set `labelHidden` to render just the glyph (e.g. inside a dense table cell). Pass `label` anyway — it becomes the accessible name."
      >
        <Card>
          <div style={{ padding: 24 }}>
            <DemoFrame>
              <div style={{ display: "flex", gap: 16 }}>
                <Severity severity="critical"  label="Critical"  labelHidden />
                <Severity severity="important" label="Important" labelHidden />
                <Severity severity="moderate"  label="Moderate"  labelHidden />
                <Severity severity="minor"     label="Minor"     labelHidden />
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
                { name: "severity", type: '"critical" | "important" | "minor" | "moderate" | "none" | "undefined"', description: "Required — drives icon + colour." },
                { name: "label", type: "ReactNode", description: "Required — visible label and (when labelHidden) accessible name." },
                { name: "labelHidden", type: "boolean", description: "Hide the visible label, keep it as the accessible name." },
                { name: "ouiaId", type: "string | number", description: "Stable test selector." },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section title="Accessibility">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Always pass <code>label</code></strong> even when hiding it — colour alone fails WCAG 1.4.1, so the label is the non-colour cue.</li>
            <li><strong>Keep severity language consistent</strong> across the product. If one screen says &ldquo;Critical&rdquo; and another says &ldquo;Severe&rdquo;, users mistrust the data.</li>
            <li><strong>Sort by severity numerically</strong> in tables (critical first), not alphabetically. Severity is ordinal data.</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
