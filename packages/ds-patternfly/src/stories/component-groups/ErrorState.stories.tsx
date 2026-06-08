import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@patternfly/react-core";
import ErrorState from "@patternfly/react-component-groups/dist/dynamic/ErrorState";
import { FoundationPage, Section, Card, CodeBlock } from "../_storyKit.js";
import { DemoFrame, PropsTable } from "../../components/DemoKit.js";

const meta: Meta = {
  title: "Component groups/Error communication/Error state",
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
      title="Error state"
      intro={
        <>
          A pre-built EmptyState variant for &ldquo;something failed&rdquo;
          screens — load failures, save failures, partial-render
          failures. Use it in place of an EmptyState when the screen
          represents an error rather than absence of data.
        </>
      }
    >
      <Section
        title="Default"
        description="Status defaults to `danger`. Pass `customFooter` for retry / contact-support actions."
      >
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame>
              <ErrorState
                titleText="Something went wrong"
                bodyText="We couldn't load your workflows. Try again, or contact support if the issue persists."
                customFooter={
                  <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
                    <Button variant="primary">Retry</Button>
                    <Button variant="link">Contact support</Button>
                  </div>
                }
              />
            </DemoFrame>
            <CodeBlock>{`<ErrorState
  titleText="Something went wrong"
  bodyText="We couldn't load your workflows. Try again, or contact support."
  customFooter={
    <Flex>
      <Button variant="primary">Retry</Button>
      <Button variant="link">Contact support</Button>
    </Flex>
  }
/>`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section
        title="Status variants"
        description="Use `warning` when the error is recoverable (rate-limited, network blip), `info` for informational failures."
      >
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame>
              <ErrorState
                status="warning"
                titleText="Rate limited"
                bodyText="You've hit the API rate limit. Try again in a minute."
              />
            </DemoFrame>
          </div>
        </Card>
      </Section>

      <Section title="Most-used props">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "titleText", type: "ReactNode", description: "The headline of the error state." },
                { name: "bodyText", type: "ReactNode", description: "Description below the title — explain what failed and what the user can do." },
                { name: "defaultBodyText", type: "ReactNode", description: "Fallback when `bodyText` is not provided." },
                { name: "status", type: '"danger" | "warning" | "success" | "info" | "custom" | "none"', description: "Sets the icon + colour. Default = `danger`." },
                { name: "customFooter", type: "ReactNode", description: "Footer slot — typically a retry Button + a Contact support link." },
                { name: "ouiaId", type: "string | number", description: "Stable test selector." },
              ]}
            />
            <p style={{ marginTop: 16, marginBottom: 0, color: "var(--gp-color-text-subtle)", fontSize: 14 }}>
              Inherits the rest of <code>EmptyStateProps</code> — most useful:{" "}
              <code>variant</code> (size), <code>headingLevel</code>.
            </p>
          </div>
        </Card>
      </Section>

      <Section title="Accessibility">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Always provide a recovery action.</strong> A retry button at minimum, ideally with a contact path. An error state without an action is dead end UI.</li>
            <li><strong>Set heading level deliberately.</strong> When the error replaces the page&rsquo;s main content, h1 is right; when it sits inside a card on a larger page, drop to h2.</li>
            <li><strong>Announce on appearance.</strong> If the error state replaces a loading region, wrap it in <code>aria-live=&quot;polite&quot;</code> so screen-reader users hear the failure.</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
