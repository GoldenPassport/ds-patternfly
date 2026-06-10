import type { Meta, StoryObj } from "@storybook/react-vite";
import Maintenance from "@patternfly/react-component-groups/dist/dynamic/Maintenance";
import { FoundationPage, Section, Card, CodeBlock } from "../_kit/StoryKit.js";
import { DemoFrame, PropsTable } from "../_kit/DemoKit.js";

const meta: Meta = {
  title: "Component groups/Error communication/Maintenance",
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
      title="Maintenance"
      intro={
        <>
          A scheduled-downtime page — title, body, start / end times, time
          zone, and an optional information link. Use it when a service
          is intentionally unavailable so the user understands it&rsquo;s
          planned, not broken.
        </>
      }
    >
      <Section
        title="Default"
        description="Pass start / end / time zone for the standard maintenance window display."
      >
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame>
              <Maintenance
                titleText="Scheduled maintenance"
                bodyText="We're upgrading the workflow engine. Service will be unavailable during the window below."
                startTime="2026-05-10 22:00"
                endTime="2026-05-11 02:00"
                timeZone="UTC"
                redirectLinkUrl="https://status.example.com"
                redirectLinkText="View status page"
              />
            </DemoFrame>
            <CodeBlock>{`<Maintenance
  titleText="Scheduled maintenance"
  bodyText="We're upgrading the workflow engine."
  startTime="2026-05-10 22:00"
  endTime="2026-05-11 02:00"
  timeZone="UTC"
  redirectLinkUrl="https://status.example.com"
  redirectLinkText="View status page"
/>`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section title="Most-used props">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "titleText", type: "ReactNode", description: "Headline (e.g. 'Scheduled maintenance')." },
                { name: "bodyText", type: "ReactNode", description: "Description — explain what's down and why." },
                { name: "defaultBodyText", type: "ReactNode", description: "Fallback when `bodyText` isn't provided." },
                { name: "startTime", type: "ReactNode", description: "Maintenance window start." },
                { name: "endTime", type: "ReactNode", description: "Maintenance window end." },
                { name: "timeZone", type: "ReactNode", description: "Time zone label shown next to the window times." },
                { name: "redirectLinkUrl", type: "string", description: "Optional link to the status page or runbook." },
                { name: "redirectLinkText", type: "ReactNode", description: "Label for the redirect link." },
                { name: "customFooter", type: "ReactNode", description: "Override the default footer (link + actions). Use when you need a custom CTA." },
                { name: "ouiaId", type: "string | number", description: "Stable test selector." },
              ]}
            />
            <p style={{ marginTop: 16, marginBottom: 0, color: "var(--gp-color-text-subtle)", fontSize: 14 }}>
              Format times in the user&rsquo;s locale via <code>Intl.DateTimeFormat</code> before passing — the component renders the values verbatim.
            </p>
          </div>
        </Card>
      </Section>

      <Section title="Accessibility">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Localize times.</strong> Pre-format start / end via <code>Intl.DateTimeFormat</code> in the user&rsquo;s locale and time zone — &ldquo;2026-05-10 22:00 UTC&rdquo; is unhelpful for someone in Tokyo.</li>
            <li><strong>Link to a status page.</strong> If something extends past the window, the status page is where the user can confirm. Always wire <code>redirectLinkUrl</code>.</li>
            <li><strong>Don&rsquo;t auto-redirect.</strong> Let the user choose to leave — surprise navigations break browser back-button expectations.</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
