import type { Meta, StoryObj } from "@storybook/react-vite";
import { Icon } from "@golden-passport/ds-patternfly";
import { CheckCircleIcon, InfoCircleIcon, ExclamationTriangleIcon, TimesCircleIcon } from "@patternfly/react-icons";
import { FoundationPage, Section, Card, CodeBlock } from "../_kit/StoryKit.js";
import { DemoFrame, PropsTable } from "../_kit/DemoKit.js";

const meta: Meta = {
  title: "Components/Icon",
  parameters: { layout: "padded" },
};
export default meta;

const SIZES = ["sm", "md", "lg", "xl"] as const;
const STATUSES = [
  { status: "info" as const, IconC: InfoCircleIcon, label: "Info" },
  { status: "success" as const, IconC: CheckCircleIcon, label: "Success" },
  { status: "warning" as const, IconC: ExclamationTriangleIcon, label: "Warning" },
  { status: "danger" as const, IconC: TimesCircleIcon, label: "Danger" },
];

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Icon"
      intro={
        <>
          A wrapper that applies sizing and semantic color to an SVG icon.
          The icon glyphs themselves come from{" "}
          <code>@patternfly/react-icons</code> — Icon supplies the consistent
          sizing scale and brand-aware status tinting.
        </>
      }
    >
      <Section title="Sizes">
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame>
              <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
                {SIZES.map((s) => (
                  <div key={s} style={{ textAlign: "center", color: "var(--gp-color-text-regular)" }}>
                    <Icon size={s}>
                      <CheckCircleIcon />
                    </Icon>
                    <div style={{ fontSize: 12, marginTop: 8 }}>{s}</div>
                  </div>
                ))}
              </div>
            </DemoFrame>
            <CodeBlock>{`import { Icon } from "@golden-passport/ds-patternfly";
import { CheckCircleIcon } from "@patternfly/react-icons";

<Icon size="md">
  <CheckCircleIcon />
</Icon>`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section title="Status colors">
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame>
              <div style={{ display: "flex", gap: 24 }}>
                {STATUSES.map(({ status, IconC, label }) => (
                  <div key={status} style={{ textAlign: "center", color: "var(--gp-color-text-regular)" }}>
                    <Icon status={status} size="lg">
                      <IconC />
                    </Icon>
                    <div style={{ fontSize: 12, marginTop: 8 }}>{label}</div>
                  </div>
                ))}
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
                  name: "size",
                  type: '"sm" | "md" | "lg" | "xl" | numeric body sizes',
                  description: "Icon visual size. Use the named sizes for consistency across the system.",
                },
                {
                  name: "status",
                  type: '"info" | "success" | "warning" | "danger" | "custom"',
                  description: "Apply a semantic color tint. Inherits the brand status palette.",
                },
                {
                  name: "isInline",
                  type: "boolean",
                  description: "Aligns the icon to the surrounding text baseline — for icons used inline within prose.",
                },
                {
                  name: "iconSize",
                  type: '"sm" | "md" | "lg" | "xl"',
                  description: "Override the inner SVG size independent of the surrounding box.",
                },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section
        title="Accessibility"
        description="Icons need accessible names except when purely decorative."
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
            <li>
              <strong>Decorative icons</strong> next to a visible label (icon + text inside a button) — leave them as-is. Screen readers read the label.
            </li>
            <li>
              <strong>Standalone icons</strong> that convey information — wrap with{" "}
              <code>&lt;span aria-label=&quot;…&quot;&gt;</code> or pass{" "}
              <code>aria-label</code> to the icon component itself.
            </li>
            <li>
              <strong>Don&apos;t rely on color alone</strong> to convey status — pair status icons with text or shape distinctions for users with color vision deficiency.
            </li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
