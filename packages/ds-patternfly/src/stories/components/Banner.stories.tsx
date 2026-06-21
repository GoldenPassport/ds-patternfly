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
import statusBannerComponentSrc from "../../components/ds/StatusBanner.tsx?raw";

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
        importStatement={'import { StatusBanner } from "@golden-passport/ds-patternfly";'}
        componentSource={statusBannerComponentSrc}
        componentFileName="StatusBanner.tsx"
        description="StatusBanner maps a status to its accent colour, leading icon, and screen-reader text. Pass status + a message; omit status for a plain neutral banner."
        rows={[
          { name: "status", type: '"success" | "warning" | "danger" | "info"', description: "Status accent + default icon + screen-reader text. Omit for a plain neutral banner." },
          { name: "children", type: "ReactNode", description: "The banner message." },
          { name: "icon", type: "ReactNode", description: "Override the default status icon." },
          { name: "screenReaderText", type: "string", description: "Override the screen-reader text (defaults from status, e.g. \"Success banner\")." },
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
            <li><strong>Screen-reader text is supplied for you</strong> — StatusBanner adds it per status (e.g. &ldquo;Success banner&rdquo;); override with <code>screenReaderText</code> when the message needs more context.</li>
            <li><strong>Don&rsquo;t rely on colour alone</strong> — pair the status colour with an icon and clear text.</li>
            <li><strong>Place above main</strong> — banners go directly under the masthead, before the page sidebar / content. Sticky banners should not occlude focus targets.</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
