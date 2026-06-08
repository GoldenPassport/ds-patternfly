import type { Meta, StoryObj } from "@storybook/react-vite";
import { Banner, Flex, FlexItem } from "@patternfly/react-core";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InfoCircleIcon,
} from "@patternfly/react-icons";
import { FoundationPage, Section, Card, CodeBlock } from "../../components/StoryKit.js";
import { DemoFrame, PropsTable } from "../../components/DemoKit.js";

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
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame>
              <div style={{ display: "grid", gap: 8 }}>
                <Banner screenReaderText="Success banner" status="success">
                  <Flex spaceItems={{ default: "spaceItemsSm" }}>
                    <FlexItem><CheckCircleIcon /></FlexItem>
                    <FlexItem>Deployment completed — all checks passing.</FlexItem>
                  </Flex>
                </Banner>
                <Banner screenReaderText="Warning banner" status="warning">
                  <Flex spaceItems={{ default: "spaceItemsSm" }}>
                    <FlexItem><ExclamationTriangleIcon /></FlexItem>
                    <FlexItem>Maintenance window scheduled for 23:00 UTC.</FlexItem>
                  </Flex>
                </Banner>
                <Banner screenReaderText="Danger banner" status="danger">
                  <Flex spaceItems={{ default: "spaceItemsSm" }}>
                    <FlexItem><ExclamationCircleIcon /></FlexItem>
                    <FlexItem>API region us-east-1 is degraded — some requests may fail.</FlexItem>
                  </Flex>
                </Banner>
                <Banner screenReaderText="Info banner" status="info">
                  <Flex spaceItems={{ default: "spaceItemsSm" }}>
                    <FlexItem><InfoCircleIcon /></FlexItem>
                    <FlexItem>You&rsquo;re viewing the staging environment.</FlexItem>
                  </Flex>
                </Banner>
              </div>
            </DemoFrame>
            <CodeBlock>{`<Banner screenReaderText="Warning banner" status="warning">
  <Flex spaceItems={{ default: "spaceItemsSm" }}>
    <FlexItem><ExclamationTriangleIcon /></FlexItem>
    <FlexItem>Maintenance window scheduled for 23:00 UTC.</FlexItem>
  </Flex>
</Banner>`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section
        title="Plain banner"
        description="Without status, Banner renders as a neutral content strip. Use for unbranded informational rows where you want to control colour yourself via children styling."
      >
        <Card>
          <div style={{ padding: 24 }}>
            <DemoFrame>
              <Banner>Default banner — neutral surface, no status accent.</Banner>
            </DemoFrame>
          </div>
        </Card>
      </Section>

      <Section title="Most-used props">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "status", type: '"success" | "warning" | "danger" | "info" | "custom"', description: "Status accent. Drives the brand status bg + border. Omit for a neutral default banner." },
                { name: "color", type: '"red" | "orangered" | "orange" | "yellow" | "green" | "teal" | "blue" | "purple"', description: "PF6 categorical-colour alternative to status — use when the banner is informational rather than status (e.g. environment markers, brand notices) and you want a non-status hue." },
                { name: "screenReaderText", type: "string", description: "Visually-hidden text appended for screen readers. Required when the banner's visible content is icon-only or relies on colour to convey meaning." },
                { name: "isSticky", type: "boolean", description: "Pin the banner to the top of its scrolling ancestor. Use as a sticky environment marker that stays visible as the user scrolls." },
              ]}
            />
          </div>
        </Card>
      </Section>

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
