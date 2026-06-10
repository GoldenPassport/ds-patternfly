import type { Meta, StoryObj } from "@storybook/react-vite";
import UnauthorizedAccess from "@patternfly/react-component-groups/dist/dynamic/UnauthorizedAccess";
import { FoundationPage, Section, Card, CodeBlock } from "../_kit/StoryKit.js";
import { DemoFrame, PropsTable } from "../_kit/DemoKit.js";

const meta: Meta = {
  title: "Component groups/Error communication/Unauthorized access",
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
      title="Unauthorized access"
      intro={
        <>
          A 403 / no-permission page — title, body, return-to-previous and
          go-to-landing actions. Use it whenever a logged-in user lands
          on a screen they don&rsquo;t have access to.
        </>
      }
    >
      <Section
        title="Default"
        description="Pass `serviceName` to bake the product name into the headline ('You do not have access to ServiceName')."
      >
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame>
              <UnauthorizedAccess
                serviceName="Workflows"
                bodyText="Your account doesn't have permission to view this section. Contact your administrator if you think this is wrong."
                showReturnButton
                toLandingPageUrl="/"
                toLandingPageText="Go to landing page"
              />
            </DemoFrame>
            <CodeBlock>{`<UnauthorizedAccess
  serviceName="Workflows"
  bodyText="Your account doesn't have permission to view this section."
  showReturnButton
  toLandingPageUrl="/"
  toLandingPageText="Go to landing page"
/>`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section title="Most-used props">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "serviceName", type: "ReactNode", description: "Name of the service the user can't access — used in the default title." },
                { name: "titleText", type: "ReactNode", description: "Override the default title entirely." },
                { name: "bodyText", type: "ReactNode", description: "Custom body — explain what the user can do (request access, contact admin)." },
                { name: "showReturnButton", type: "boolean", description: "Render a 'Return to previous page' button." },
                { name: "prevPageButtonText", type: "ReactNode", description: "Override the previous-page button label (localize)." },
                { name: "toLandingPageUrl", type: "string", description: "URL of the landing page link." },
                { name: "toLandingPageText", type: "ReactNode", description: "Label of the landing page link." },
                { name: "primaryAction", type: "ReactNode", description: "Override the entire primary action — use when 'go home' isn't the right CTA." },
                { name: "secondaryActions", type: "ReactNode", description: "Custom secondary actions (e.g. 'Request access')." },
                { name: "icon", type: "ComponentType", description: "Override the lock icon — pass a different PF icon component if your product has a stronger semantic." },
                { name: "ouiaId", type: "string | number", description: "Stable test selector." },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section title="Accessibility">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Don&rsquo;t leak permission shape.</strong> &ldquo;You don&rsquo;t have access&rdquo; is enough — naming the role they&rsquo;re missing is a security smell.</li>
            <li><strong>Provide a path to request access.</strong> Either via <code>secondaryActions</code> or in the body — &ldquo;Contact your admin&rdquo; with a mailto link beats a dead end.</li>
            <li><strong>Return on the server with HTTP 403.</strong> SPA-only 403s are invisible to monitoring and SEO tooling.</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
