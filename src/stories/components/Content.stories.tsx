import type { Meta, StoryObj } from "@storybook/react-vite";
import { Content } from "@patternfly/react-core";
import { FoundationPage, Section, Card, CodeBlock } from "../_storyKit.js";
import { DemoFrame, PropsTable } from "../_demoKit.js";

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
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame>
              <Content>
                <p>
                  This is a paragraph inside <code>Content</code>. Long-form
                  prose gets the right line-height, paragraph spacing, and
                  link color automatically.
                </p>
                <ul>
                  <li>List items get consistent bullet styling…</li>
                  <li>…and consistent spacing.</li>
                </ul>
                <blockquote>Blockquotes get an accent edge.</blockquote>
              </Content>
            </DemoFrame>
            <CodeBlock>{`<Content>
  <p>Long-form prose with consistent typography.</p>
  <ul>
    <li>List items styled automatically</li>
  </ul>
</Content>`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section title="Single-element form" description="Pass component to render Content as a specific tag.">
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame>
              <Content component="p">A standalone styled paragraph.</Content>
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
          </div>
        </Card>
      </Section>

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
    </FoundationPage>
  ),
};
