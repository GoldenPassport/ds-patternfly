import type { Meta, StoryObj } from "@storybook/react-vite";
import { ExternalLinkButton } from "@patternfly/react-component-groups/dist/dynamic/ExternalLinkButton";
import { FoundationPage, Section, Card, CodeBlock } from "../../components/StoryKit.js";
import { DemoFrame, PropsTable } from "../../components/DemoKit.js";

const meta: Meta = {
  title: "Component groups/Controls/External link button",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="External link button"
      intro={
        <>
          A Button preset for outbound links — sets <code>component=&quot;a&quot;</code>,{" "}
          <code>target=&quot;_blank&quot;</code>, <code>rel=&quot;noopener noreferrer&quot;</code>,
          and renders a trailing external-link glyph. Use it whenever the
          link leaves your app — docs, runbooks, vendor portals.
        </>
      }
    >
      <Section title="Variants">
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                <ExternalLinkButton href="https://patternfly.org" variant="primary">
                  Primary
                </ExternalLinkButton>
                <ExternalLinkButton href="https://patternfly.org" variant="secondary">
                  Secondary
                </ExternalLinkButton>
                <ExternalLinkButton href="https://patternfly.org" variant="link" isInline>
                  Inline link
                </ExternalLinkButton>
              </div>
            </DemoFrame>
            <CodeBlock>{`<ExternalLinkButton href="https://patternfly.org" variant="link" isInline>
  Read the docs
</ExternalLinkButton>`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section title="Most-used props">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "href", type: "string", description: "Destination URL. Required." },
                { name: "variant", type: '"primary" | "secondary" | "tertiary" | "link" | "danger"', description: "Same set as Button. Default = secondary." },
                { name: "isInline", type: "boolean", description: "Strip padding so the link sits inline with body text." },
                { name: "iconProps", type: "SVGIconProps", description: "Pass-through to the trailing external-link icon (e.g. size override, custom className)." },
                { name: "ouiaId", type: "string", description: "Stable test selector." },
              ]}
            />
            <p style={{ marginTop: 16, marginBottom: 0, color: "var(--gp-color-text-subtle)", fontSize: 14 }}>
              Inherits the rest of <code>ButtonProps</code> — most useful:{" "}
              <code>isDisabled</code>, <code>aria-label</code>,{" "}
              <code>onClick</code>.
            </p>
          </div>
        </Card>
      </Section>

      <Section title="Accessibility">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>The external-link icon is decorative,</strong> but the &ldquo;opens in new tab&rdquo; behaviour should be communicated to screen-reader users — pass <code>aria-label=&quot;Read the docs (opens in new tab)&quot;</code> when the link text alone doesn&rsquo;t make this clear.</li>
            <li><strong>rel=&quot;noopener noreferrer&quot; is set automatically.</strong> Don&rsquo;t override it — it prevents the destination from accessing <code>window.opener</code>.</li>
            <li><strong>Don&rsquo;t use this for in-app navigation.</strong> Use a regular <code>Button component=&quot;a&quot;</code> or your router&rsquo;s Link — opening internal pages in a new tab is hostile UX.</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
