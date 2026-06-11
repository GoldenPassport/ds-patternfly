import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  FoundationPage,
  Section,
  Card,
  ConfigurationSection,
  Example,
  ThemingPointer,
} from "../_kit/StoryKit.js";
import {
  CommonElements,
  SingleElementForm,
} from "../../examples/components/Content.example.js";
import contentExampleSrc from "../../examples/components/Content.example.tsx?raw";
import contentComponentSrc from "../../components/base/Content.tsx?raw";

const meta: Meta = {
  title: "Components/Content",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Content"
      intro={
        <>
          Wraps prose-style content with PatternFly&apos;s typographic
          defaults — paragraphs, lists, blockquotes, links. Use it around any
          block of long-form text so spacing, line height, and link styling
          stay consistent without per-element tweaks.
        </>
      }
    >
      <Section title="Common elements">
        <Card>
          <Example
            source={contentExampleSrc}
            region="CommonElements"
            fileName="Content.example.tsx"
          >
            <CommonElements />
          </Example>
        </Card>
      </Section>

      <Section title="Single-element form" description="Pass component to render Content as a specific tag.">
        <Card>
          <Example
            source={contentExampleSrc}
            region="SingleElementForm"
            fileName="Content.example.tsx"
          >
            <SingleElementForm />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example source={contentExampleSrc} fileName="Content.example.tsx" />
        </Card>
      </Section>

      <ConfigurationSection
        importStatement={'import { Content } from "@golden-passport/ds-patternfly";'}
        componentSource={contentComponentSrc}
        componentFileName="Content.tsx"
        rows={[
          {
            name: "component",
            type: '"h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "a" | "small" | "blockquote" | "pre" | "hr" | "ul" | "ol" | "dl" | "li" | "dt" | "dd"',
            description: "When set, renders Content as that single element with PatternFly styling. When omitted, renders a wrapper around mixed children.",
          },
          {
            name: "isVisitedLink",
            type: "boolean",
            description: "For component=\"a\" — visually mark a link as visited.",
          },
          {
            name: "isEditorial",
            type: "boolean",
            description: "Tighter spacing variant for editorial layouts.",
          },
        ]}
      />

      <Section
        title="When to use it"
        description="The wrapper-vs-single-element decision."
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
              <strong>Wrapper form (no component prop):</strong> for any block
              with mixed prose elements — paragraphs, lists, headings, links
              all together.
            </li>
            <li>
              <strong>Single-element form (component=&quot;p&quot;):</strong> when
              you need just one styled paragraph or list inline with other
              UI. Avoids an extra wrapper element.
            </li>
            <li>
              <strong>Don&apos;t use Content for UI text.</strong> Form labels,
              card titles, button text — these belong to their owning
              component.
            </li>
          </ul>
        </Card>
      </Section>
      <ThemingPointer
        dials={[
          ["--gp-font-body", "Body / paragraph font family."],
          ["--gp-font-heading", "Heading font family."],
          ["--gp-weight-heading", "Heading weight."],
          ["--gp-anchor-color", "Inline link colour."],
          ["--gp-gap-paragraph", "Margin-block on paragraphs and lists."],
          ["--gp-gap-heading", "Margin-block on headings."],
        ]}
      />
    </FoundationPage>
  ),
};
