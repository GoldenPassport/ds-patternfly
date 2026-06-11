import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  FoundationPage,
  Section,
  Card,
  ConfigurationSection,
  Example,
} from "../_kit/StoryKit.js";
import {
  StatusVariants,
  PlainBanner,
} from "../../examples/components/Banner.example.js";
import bannerExampleSrc from "../../examples/components/Banner.example.tsx?raw";
import bannerComponentSrc from "../../components/base/Banner.tsx?raw";

const meta: Meta = {
  title: "Components/Banner",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Banner"
      intro={
        <>
          A page- or app-level status strip that sits flush with the top of
          the viewport (or directly under the masthead). Use for system
          maintenance windows, environment markers (&ldquo;You&rsquo;re on
          staging&rdquo;), beta tags, and degraded-service notices —
          information that applies to the entire app, not just the current
          screen. For in-content status, use <code>Alert</code> instead.
        </>
      }
    >
      <Section
        title="Status variants"
        description="status drives the bg + border tones from the brand status palette. screenReaderText completes the announcement when the visible content is icon-driven."
      >
        <Card>
          <Example
            source={bannerExampleSrc}
            region="StatusVariants"
            fileName="Banner.example.tsx"
          >
            <StatusVariants />
          </Example>
        </Card>
      </Section>

      <Section
        title="Plain banner"
        description="Without status, Banner renders as a neutral content strip. Use for unbranded informational rows where you want to control colour yourself via children styling."
      >
        <Card>
          <Example
            source={bannerExampleSrc}
            region="PlainBanner"
            fileName="Banner.example.tsx"
          >
            <PlainBanner />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example source={bannerExampleSrc} fileName="Banner.example.tsx" />
        </Card>
      </Section>

      <ConfigurationSection
        importStatement={'import { Banner } from "@golden-passport/ds-patternfly";'}
        componentSource={bannerComponentSrc}
        componentFileName="Banner.tsx"
        rows={[
          { name: "status", type: '"success" | "warning" | "danger" | "info" | "custom"', description: "Status accent. Drives the brand status bg + border. Omit for a neutral default banner." },
          { name: "color", type: '"red" | "orangered" | "orange" | "yellow" | "green" | "teal" | "blue" | "purple"', description: "PF6 categorical-colour alternative to status — use when the banner is informational rather than status (e.g. environment markers, brand notices) and you want a non-status hue." },
          { name: "screenReaderText", type: "string", description: "Visually-hidden text appended for screen readers. Required when the banner's visible content is icon-only or relies on colour to convey meaning." },
          { name: "isSticky", type: "boolean", description: "Pin the banner to the top of its scrolling ancestor. Use as a sticky environment marker that stays visible as the user scrolls." },
        ]}
      />

      <Section title="Banner vs Alert">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Banner</strong> — full-width strip about the WHOLE app or page. System maintenance, environment marker, beta tag. Stays visible as long as the condition is true.</li>
            <li><strong>Alert</strong> — in-content message about a specific action or section. Form errors, action confirmations, transient toasts.</li>
            <li><strong>Don&rsquo;t stack banners.</strong> Pick the most important condition. Multiple banners compete for attention and push real content below the fold.</li>
          </ul>
        </Card>
      </Section>

      <Section title="Accessibility">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Set <code>screenReaderText</code></strong> for status variants — the visual icon alone doesn&rsquo;t announce.</li>
            <li><strong>Don&rsquo;t rely on colour alone</strong> — pair the status colour with an icon and clear text.</li>
            <li><strong>Place above main</strong> — banners go directly under the masthead, before the page sidebar / content. Sticky banners should not occlude focus targets.</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
