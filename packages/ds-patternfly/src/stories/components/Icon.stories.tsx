import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  FoundationPage,
  Section,
  Card,
  ConfigurationSection,
  Example,
} from "../_kit/StoryKit.js";
import { Sizes, StatusColors } from "../../examples/components/Icon.example.js";
import iconExampleSrc from "../../examples/components/Icon.example.tsx?raw";
import iconComponentSrc from "../../components/base/Icon.tsx?raw";

const meta: Meta = {
  title: "Components/Icon",
  parameters: { layout: "padded" },
};
export default meta;

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
          <Example source={iconExampleSrc} region="Sizes" fileName="Icon.example.tsx">
            <Sizes />
          </Example>
        </Card>
      </Section>

      <Section title="Status colors">
        <Card>
          <Example
            source={iconExampleSrc}
            region="StatusColors"
            fileName="Icon.example.tsx"
          >
            <StatusColors />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example source={iconExampleSrc} fileName="Icon.example.tsx" />
        </Card>
      </Section>

      <ConfigurationSection
        importStatement={'import { Icon } from "@golden-passport/ds-patternfly";'}
        componentSource={iconComponentSrc}
        componentFileName="Icon.tsx"
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
