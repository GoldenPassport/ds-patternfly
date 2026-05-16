import type { Meta, StoryObj } from "@storybook/react-vite";
import { Brand } from "@patternfly/react-core";
import { FoundationPage, Section, Card, CodeBlock } from "../_storyKit.js";
import { DemoFrame, PropsTable } from "../_demoKit.js";

const meta: Meta = {
  title: "Components/Brand",
  parameters: { layout: "padded" },
};
export default meta;

const logoSrc =
  "data:image/svg+xml;charset=UTF-8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 40"><rect width="200" height="40" fill="#0066cc"/><text x="50%" y="60%" text-anchor="middle" fill="white" font-family="Arial" font-size="18" font-weight="bold">Acme</text></svg>`,
  );

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Brand"
      intro={
        <>
          A logo image with PatternFly&apos;s sizing conventions and built-in
          responsive width support. Typically rendered inside a Masthead;
          the AppShell shipped by this lib accepts it via the{" "}
          <code>brandLogo</code> prop.
        </>
      }
    >
      <Section title="Default">
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame>
              <Brand src={logoSrc} alt="Acme" heights={{ default: "32px" }} />
            </DemoFrame>
            <CodeBlock>{`<Brand src="/logo.svg" alt="Acme" heights={{ default: "32px" }} />`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section title="Responsive heights" description="Smaller on mobile, larger on desktop.">
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame>
              <Brand
                src={logoSrc}
                alt="Acme"
                heights={{ default: "24px", md: "32px", lg: "40px" }}
              />
            </DemoFrame>
            <CodeBlock>{`<Brand
  src="/logo.svg"
  alt="Acme"
  heights={{ default: "24px", md: "32px", lg: "40px" }}
/>`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section title="Props">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                {
                  name: "src",
                  type: "string",
                  description: "Logo image URL. SVG strongly preferred for resolution independence.",
                },
                {
                  name: "alt",
                  type: "string",
                  description: 'Required. The brand name (e.g. "Acme"). Empty only when the brand is decorative — rare.',
                },
                {
                  name: "heights",
                  type: "{ default?: string, sm?: string, md?: string, lg?: string, xl?: string, '2xl'?: string }",
                  description: "Per-breakpoint logo height. Width is computed from aspect ratio.",
                },
                {
                  name: "widths",
                  type: "Same shape as heights",
                  description: "Per-breakpoint logo width. Use when the logo is taller than wide and width should drive sizing.",
                },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section
        title="Accessibility"
        description="A logo is content, not decoration."
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
              <strong>alt is the brand name.</strong> Not &quot;Acme logo&quot; — just{" "}
              <code>alt=&quot;Acme&quot;</code>. The role is implied.
            </li>
            <li>
              <strong>Make it a link to home.</strong> Wrap with an anchor going
              to <code>/</code>. Convention users rely on.
            </li>
            <li>
              <strong>Don&apos;t use Brand for arbitrary images.</strong> It encodes
              logo-specific sizing conventions — use a plain <code>&lt;img&gt;</code>{" "}
              for product imagery.
            </li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
