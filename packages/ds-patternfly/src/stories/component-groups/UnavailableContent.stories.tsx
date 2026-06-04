import type { Meta, StoryObj } from "@storybook/react-vite";
import UnavailableContent from "@patternfly/react-component-groups/dist/dynamic/UnavailableContent";
import { FoundationPage, Section, Card, CodeBlock } from "../_storyKit.js";
import { DemoFrame, PropsTable } from "../_demoKit.js";

const meta: Meta = {
  title: "Component groups/Error communication/Unavailable content",
  parameters: {
    layout: "padded",
    a11y: {
      // axe miscalculates contrast on PF6 surfaces with gradient buttons /
      // overlapping affordances. Brand-token contrast is validated by
      // tokens.test.ts.
      config: {
        rules: [
          { id: "color-contrast", enabled: false },
          { id: "heading-order",  enabled: false },
        ],
      },
    },
  },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Unavailable content"
      intro={
        <>
          A &ldquo;something on our side is down&rdquo; page — a 5xx-style
          message with a status-page link. Use it for backend outages
          and dependency failures where retry inside the app won&rsquo;t
          help.
        </>
      }
    >
      <Section title="Default">
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame>
              <UnavailableContent
                titleText="This service is temporarily unavailable"
                bodyText="We're investigating an issue. Try again later, or check the status page for updates."
                statusPageUrl="https://status.example.com"
                statusPageLinkText="View status page"
              />
            </DemoFrame>
            <CodeBlock>{`<UnavailableContent
  titleText="This service is temporarily unavailable"
  bodyText="We're investigating an issue."
  statusPageUrl="https://status.example.com"
  statusPageLinkText="View status page"
/>`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section title="Most-used props">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "titleText", type: "ReactNode", description: "Headline (default 'This page is temporarily unavailable')." },
                { name: "bodyText", type: "ReactNode", description: "Description below the title." },
                { name: "statusPageUrl", type: "string", description: "URL of your public status page." },
                { name: "statusPageLinkText", type: "ReactNode", description: "Label of the status page link." },
                { name: "ouiaId", type: "string | number", description: "Stable test selector." },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section title="Unavailable vs Error vs Maintenance">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Unavailable content</strong> — backend / dependency outage. Unplanned. User can&rsquo;t recover; status page is the right next step.</li>
            <li><strong>Error state</strong> — operation-level failure. Often recoverable (retry, refresh).</li>
            <li><strong>Maintenance</strong> — planned downtime with known window.</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
