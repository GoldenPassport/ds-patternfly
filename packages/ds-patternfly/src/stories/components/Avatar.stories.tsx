import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar } from "@golden-passport/ds-patternfly";
import { FoundationPage, Section, Card, CodeBlock } from "../_kit/StoryKit.js";
import { DemoFrame, PropsTable } from "../_kit/DemoKit.js";

const meta: Meta = {
  title: "Components/Avatar",
  parameters: { layout: "padded" },
};
export default meta;

const SIZES = ["sm", "md", "lg", "xl"] as const;

// Inline SVG so the demo doesn't depend on an external image.
const placeholderSrc =
  "data:image/svg+xml;charset=UTF-8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="#0066cc"/><text x="32" y="32" text-anchor="middle" dominant-baseline="central" fill="white" font-family="Arial" font-size="24" font-weight="bold">JD</text></svg>`,
  );

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Avatar"
      intro={
        <>
          A user&apos;s photo or initials, typically rendered in a masthead,
          comment thread, or member list. Always carries an{" "}
          <code>alt</code> describing the person.
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
                    <Avatar src={placeholderSrc} alt="Jane Doe" size={s} />
                    <div style={{ fontSize: 12, marginTop: 8 }}>{s}</div>
                  </div>
                ))}
              </div>
            </DemoFrame>
            <CodeBlock>{`<Avatar src="/users/jane.jpg" alt="Jane Doe" size="md" />`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section title="Bordered" description="Adds a subtle ring — useful when avatars sit on similarly-toned backgrounds.">
        <Card>
          <div style={{ padding: 24 }}>
            <DemoFrame>
              <Avatar src={placeholderSrc} alt="Jane Doe" size="lg" isBordered />
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
                  name: "src",
                  type: "string",
                  description: "Image URL. When omitted, PatternFly renders a default avatar placeholder.",
                },
                {
                  name: "alt",
                  type: "string",
                  description: "Required. Describes the person — use their name. Empty string only for purely decorative avatars (rare).",
                },
                {
                  name: "size",
                  type: '"sm" | "md" | "lg" | "xl"',
                  description: "Visual size. Default md.",
                },
                {
                  name: "isBordered",
                  type: "boolean",
                  description: "Adds a 1px ring around the avatar.",
                },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section
        title="Accessibility"
        description="The alt is the most important thing on this component."
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
              <strong>alt is the person&apos;s name.</strong> Don&apos;t put
              &quot;avatar of Jane Doe&quot; — the role is implied by context.
              Just <code>alt=&quot;Jane Doe&quot;</code>.
            </li>
            <li>
              <strong>Decorative-only avatar?</strong> If the name is already
              announced by an adjacent element, set <code>alt=&quot;&quot;</code>{" "}
              so screen readers don&apos;t double-read.
            </li>
            <li>
              <strong>Don&apos;t rely on color/photo alone</strong> to identify
              users — pair with their name in any list or thread view.
            </li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
