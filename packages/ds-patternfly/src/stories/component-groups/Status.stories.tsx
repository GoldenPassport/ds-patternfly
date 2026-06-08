import type { Meta, StoryObj } from "@storybook/react-vite";
import { Status } from "@patternfly/react-component-groups/dist/dynamic/Status";
import { FoundationPage, Section, Card, CodeBlock } from "../../components/StoryKit.js";
import { DemoFrame, PropsTable } from "../../components/DemoKit.js";

const meta: Meta = {
  title: "Component groups/Status and state indicators/Status",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Status"
      intro={
        <>
          A standardized icon + label pair for object state — Healthy /
          Degraded / Failed / Unknown. Pair with a popover or link
          variant when the state has explanatory detail (failure
          reasons, runbooks).
        </>
      }
    >
      <Section title="Plain (icon + label)">
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame>
              <div style={{ display: "grid", gap: 8 }}>
                <Status status="success" label="Healthy" />
                <Status status="info"    label="Provisioning" />
                <Status status="warning" label="Degraded" />
                <Status status="danger"  label="Failed" />
                <Status status="custom"  label="Unknown" />
              </div>
            </DemoFrame>
            <CodeBlock>{`<Status status="success" label="Healthy" />`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section
        title="Popover variant"
        description="`variant='popover'` makes the label clickable; supply popoverProps with content + headerContent for explanatory detail."
      >
        <Card>
          <div style={{ padding: 24 }}>
            <DemoFrame>
              <Status
                status="danger"
                label="Failed"
                variant="popover"
                popoverProps={{
                  headerContent: "Why this failed",
                  bodyContent:
                    "The container exited with code 137 (OOMKilled). Increase the memory limit and retry.",
                }}
              />
            </DemoFrame>
          </div>
        </Card>
      </Section>

      <Section
        title="Icon-only"
        description="Set `iconOnly` for compact dense surfaces — the label still acts as the accessible name."
      >
        <Card>
          <div style={{ padding: 24 }}>
            <DemoFrame>
              <div style={{ display: "flex", gap: 16 }}>
                <Status status="success" label="Healthy" iconOnly iconTitle="Healthy" />
                <Status status="warning" label="Degraded" iconOnly iconTitle="Degraded" />
                <Status status="danger"  label="Failed"  iconOnly iconTitle="Failed" />
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
                { name: "status", type: '"info" | "success" | "warning" | "danger" | "custom"', description: "Required — drives icon + colour." },
                { name: "label", type: "string", description: "Visible label and (when iconOnly) accessible name." },
                { name: "description", type: "ReactNode", description: "Secondary text under the label — short context (e.g. error code)." },
                { name: "variant", type: '"plain" | "link" | "popover"', description: "`plain` = static, `link` = clickable callback, `popover` = on-click popover with details." },
                { name: "popoverProps", type: "PopoverProps", description: "Required when variant='popover' — pass headerContent + bodyContent." },
                { name: "onClick", type: "(event) => void", description: "Required when variant='link'." },
                { name: "icon", type: "ReactElement", description: "Override the default status icon (e.g. product-specific glyph)." },
                { name: "iconOnly", type: "boolean", description: "Hide the label, render only the icon." },
                { name: "iconTitle", type: "string", description: "Tooltip / aria title for the icon. Set when iconOnly is true." },
                { name: "ouiaId", type: "string | number", description: "Stable test selector." },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section title="Accessibility">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Always set <code>label</code></strong> — colour alone fails WCAG 1.4.1.</li>
            <li><strong>Use <code>iconTitle</code> with <code>iconOnly</code></strong> so screen readers can name the status.</li>
            <li><strong>Popover variant for failures.</strong> Don&rsquo;t make users hunt for the failure reason — wire the popover with the runbook link.</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
