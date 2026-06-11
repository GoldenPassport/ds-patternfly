import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  FoundationPage,
  Section,
  Card,
  ConfigurationSection,
  Example,
  ThemingPointer,
} from "../_kit/StoryKit.js";
import { Sizes } from "../../examples/components/Title.example.js";
import titleExampleSrc from "../../examples/components/Title.example.tsx?raw";
import titleComponentSrc from "../../components/base/Title.tsx?raw";

const meta: Meta = {
  title: "Components/Title",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Title"
      intro={
        <>
          A heading with PatternFly type-scale styling. The visual size is
          decoupled from the heading level — pick the level for the
          document outline (H1 → H6), pick the size for the visual hierarchy.
        </>
      }
    >
      <Section title="Sizes" description="All shown at heading level h2 so the visual size varies independently.">
        <Card>
          <Example
            source={titleExampleSrc}
            region="Sizes"
            fileName="Title.example.tsx"
          >
            <Sizes />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example source={titleExampleSrc} fileName="Title.example.tsx" />
        </Card>
      </Section>

      <ConfigurationSection
        importStatement={'import { Title } from "@golden-passport/ds-patternfly";'}
        componentSource={titleComponentSrc}
        componentFileName="Title.tsx"
        rows={[
          {
            name: "headingLevel",
            type: '"h1" | "h2" | "h3" | "h4" | "h5" | "h6"',
            description: "Required. The semantic heading level — controls the document outline.",
          },
          {
            name: "size",
            type: '"md" | "lg" | "xl" | "2xl" | "3xl" | "4xl"',
            description: "Visual size, independent of headingLevel. Defaults to a size matching the level.",
          },
          {
            name: "children",
            type: "ReactNode",
            description: "The heading text.",
          },
        ]}
      />

      <Section
        title="Accessibility"
        description="Document outline is part of accessibility — get the level right."
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
              <strong>One h1 per page.</strong> Screen reader users navigate by
              landmark and heading level — extra h1s break that mental model.
            </li>
            <li>
              <strong>Don&apos;t skip levels.</strong> An h2 should follow an h1, an
              h3 should follow an h2. Skipping (h1 → h3) breaks the document
              outline.
            </li>
            <li>
              <strong>Pick level for semantics, size for visuals.</strong> A small h2
              under a section is still an h2 — set <code>headingLevel=&quot;h2&quot;</code>{" "}
              and <code>size=&quot;md&quot;</code>.
            </li>
          </ul>
        </Card>
      </Section>
      <ThemingPointer
        dials={[
          ["--gp-font-heading", "Heading font family."],
          ["--gp-weight-heading", "Heading weight."],
          ["--gp-text-default", "Heading colour."],
          ["--gp-gap-heading", "Margin-block (rhythm with surrounding content)."],
        ]}
      />
    </FoundationPage>
  ),
};
