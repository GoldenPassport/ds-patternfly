import type { Meta, StoryObj } from "@storybook/react-vite";
import { FoundationPage, Section, Card, Example } from "../_kit/StoryKit.js";
import { PropsTable } from "../_kit/DemoKit.js";
import {
  Default,
  StatusVariants,
} from "../../examples/component-groups/ErrorState.example.js";
import errorStateExampleSrc from "../../examples/component-groups/ErrorState.example.tsx?raw";

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
          <Example
            source={errorStateExampleSrc}
            region="Default"
            fileName="ErrorState.example.tsx"
          >
            <Default />
          </Example>
        </Card>
      </Section>

      <Section
        title="Status variants"
        description="Use `warning` when the error is recoverable (rate-limited, network blip), `info` for informational failures."
      >
        <Card>
          <Example
            source={errorStateExampleSrc}
            region="StatusVariants"
            fileName="ErrorState.example.tsx"
          >
            <StatusVariants />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example source={errorStateExampleSrc} fileName="ErrorState.example.tsx" />
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
