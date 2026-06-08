import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@patternfly/react-core";
import { ErrorBoundary } from "@patternfly/react-component-groups/dist/dynamic/ErrorBoundary";
import { FoundationPage, Section, Card, CodeBlock } from "../../components/StoryKit.js";
import { DemoFrame, PropsTable } from "../../components/DemoKit.js";

const meta: Meta = {
  title: "Component groups/Error communication/Error boundary",
  parameters: { layout: "padded" },
};
export default meta;

function Bomb({ shouldThrow }: { shouldThrow: boolean }) {
  if (shouldThrow) {
    throw new Error("Demo crash — synthesized for the ErrorBoundary preview.");
  }
  return (
    <p style={{ margin: 0, color: "var(--gp-color-text-subtle)" }}>
      All good. Press the button to trigger an error inside the boundary.
    </p>
  );
}

export const Overview: StoryObj = {
  render: () => {
    const [boom, setBoom] = useState(false);
    return (
      <FoundationPage
        title="Error boundary"
        intro={
          <>
            React error boundary with a built-in error page UI. Wrap routes,
            top-level layouts, or risky widgets — when a child throws,
            the boundary catches it and renders a friendly error page
            instead of unmounting the whole app.
          </>
        }
      >
        <Section
          title="Catching a thrown error"
          description="Click the button to throw inside the boundary. The error page renders with the error title + an expandable 'Show details' section."
        >
          <Card>
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              {/* The error page's "Show details" disclosure lives inside
                  a `.pf-v6-c-expandable-section`, which PF6 paints as a
                  full-width flex container. Inside the EmptyState's
                  centred 600px column that overflows to ~1252px wide,
                  pushing the toggle button far to the right. Re-centre
                  the flex container so the button sits under the error
                  title where the canonical PF6 demo places it. */}
              <style
                dangerouslySetInnerHTML={{
                  __html: [
                    /* react-component-groups paints a JSS class on the
                       errorDescription stack item that stretches it past
                       its parent stack — clamp it back to 100% so the
                       expandable-section beneath can centre properly. */
                    ".pf-v6-c-empty-state [class*='errorDescription'] {",
                    "  max-width: 100%;",
                    "}",
                    ".pf-v6-c-empty-state .pf-v6-c-expandable-section {",
                    "  justify-content: center;",
                    "  max-width: 100%;",
                    "}",
                  ].join("\n"),
                }}
              />
              <DemoFrame>
                <div style={{ display: "grid", gap: 12 }}>
                  <Button variant="danger" onClick={() => setBoom((b) => !b)}>
                    {boom ? "Reset" : "Throw an error"}
                  </Button>
                  <ErrorBoundary headerTitle="Workflows">
                    <Bomb shouldThrow={boom} />
                  </ErrorBoundary>
                </div>
              </DemoFrame>
              <CodeBlock>{`<ErrorBoundary headerTitle="Workflows">
  <RoutesOrRiskyWidget />
</ErrorBoundary>`}</CodeBlock>
            </div>
          </Card>
        </Section>

        <Section title="Most-used props">
          <Card>
            <div style={{ padding: 24 }}>
              <PropsTable
                rows={[
                  { name: "headerTitle", type: "ReactNode", description: "The page-level title shown above the error block (e.g. the section name where the boundary lives)." },
                  { name: "errorTitle", type: "ReactNode", description: "Override the default 'Something went wrong' title with a more specific message." },
                  { name: "errorDescription", type: "ReactNode", description: "Custom description below the error title — explain what the user can do (refresh, go back, contact support)." },
                  { name: "defaultErrorDescription", type: "ReactNode", description: "Fallback description used when `errorDescription` isn't supplied." },
                  { name: "errorToggleText", type: "string", description: "Label for the 'Show details' toggle (the disclosure with the stack trace). Localize for non-English locales." },
                  { name: "silent", type: "boolean", description: "Suppress the visible error UI — useful when a parent boundary handles rendering and this one just stops the cascade." },
                  { name: "headerTitleHeadingLevel", type: '"h1"…"h6"', description: "Heading level for the title — match the page's heading hierarchy. Default `h1`." },
                  { name: "errorTitleHeadingLevel", type: '"h1"…"h6"', description: "Heading level for the error title. Default `h2`." },
                  { name: "ouiaId", type: "string | number", description: "Stable test selector." },
                ]}
              />
            </div>
          </Card>
        </Section>

        <Section title="Where to put error boundaries">
          <Card>
            <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
              <li><strong>Around routes</strong> — one ErrorBoundary inside each top-level route component contains crashes to that page.</li>
              <li><strong>Around 3rd-party widgets</strong> — embeds, charts, MDX renderers — anything where a content failure shouldn&rsquo;t take down the surrounding shell.</li>
              <li><strong>Around new / risky features</strong> behind a flag — graceful degradation while you stabilize.</li>
              <li><strong>Not too granular.</strong> One per row of a table is overkill and produces a confusing error mosaic. Boundary should sit at a meaningful UI seam.</li>
            </ul>
          </Card>
        </Section>

        <Section title="Accessibility">
          <Card>
            <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
              <li><strong>Headings cascade matters.</strong> Set <code>headerTitleHeadingLevel</code> / <code>errorTitleHeadingLevel</code> so the error UI doesn&rsquo;t introduce an h1 inside a section that already has one.</li>
              <li><strong>The error region announces.</strong> Screen readers detect the heading change; pair with focus management if you want the user to land on the error description automatically.</li>
              <li><strong>Recovery action.</strong> Provide a way out — a retry button, a link home — via <code>errorDescription</code>. A blank apology isn&rsquo;t enough.</li>
            </ul>
          </Card>
        </Section>
      </FoundationPage>
    );
  },
};
