import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  FoundationPage,
  Section,
  Card,
  ConfigurationSection,
  Example,
} from "../_kit/StoryKit.js";
import {
  Sizes,
  Bordered,
} from "../../examples/components/Avatar.example.js";
import avatarExampleSrc from "../../examples/components/Avatar.example.tsx?raw";
import avatarComponentSrc from "../../components/base/Avatar.tsx?raw";

const meta: Meta = {
  title: "Components/Avatar",
  parameters: { layout: "padded" },
};
export default meta;

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
          <Example
            source={avatarExampleSrc}
            region="Sizes"
            fileName="Avatar.example.tsx"
          >
            <Sizes />
          </Example>
        </Card>
      </Section>

      <Section title="Bordered" description="Adds a subtle ring — useful when avatars sit on similarly-toned backgrounds.">
        <Card>
          <Example
            source={avatarExampleSrc}
            region="Bordered"
            fileName="Avatar.example.tsx"
          >
            <Bordered />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example source={avatarExampleSrc} fileName="Avatar.example.tsx" />
        </Card>
      </Section>

      <ConfigurationSection
        importStatement={'import { Avatar } from "@golden-passport/ds-patternfly";'}
        componentSource={avatarComponentSrc}
        componentFileName="Avatar.tsx"
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
