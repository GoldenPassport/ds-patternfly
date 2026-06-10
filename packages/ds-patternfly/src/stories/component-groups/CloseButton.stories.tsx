import type { Meta, StoryObj } from "@storybook/react-vite";
import { CloseButton } from "@patternfly/react-component-groups/dist/dynamic/CloseButton";
import { FoundationPage, Section, Card, CodeBlock } from "../_kit/StoryKit.js";
import { DemoFrame, PropsTable } from "../_kit/DemoKit.js";

const meta: Meta = {
  title: "Component groups/Controls/Close button",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Close button"
      intro={
        <>
          A standardized X button — same icon, same hit-target, same
          aria-label across every dismissable surface. Use it on
          drawers, panels, toasts, and any custom dismissable widget
          where Modal&rsquo;s built-in close isn&rsquo;t available.
        </>
      }
    >
      <Section title="Basic">
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame>
              <CloseButton onClick={() => alert("dismissed")} />
            </DemoFrame>
            <CodeBlock>{`<CloseButton onClick={handleClose} />`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section
        title="Inside a custom panel"
        description="Drop CloseButton into the top-right of any dismissable surface — drawers, banners, ad-hoc cards."
      >
        <Card>
          <div style={{ padding: 24 }}>
            <DemoFrame>
              <div
                style={{
                  position: "relative",
                  padding: "16px 48px 16px 16px",
                  background: "var(--gp-color-bg-secondary-default)",
                  border: "1px solid var(--gp-color-border-subtle)",
                  borderRadius: 8,
                  color: "var(--gp-color-text-regular)",
                }}
              >
                <strong>Heads up</strong>
                <p style={{ margin: "4px 0 0", color: "var(--gp-color-text-subtle)" }}>
                  A custom inline notice — the close button sits absolutely
                  positioned in the top-right corner.
                </p>
                <span style={{ position: "absolute", top: 8, right: 8 }}>
                  <CloseButton onClick={() => alert("dismissed")} />
                </span>
              </div>
            </DemoFrame>
          </div>
        </Card>
      </Section>

      <Section title="Most-used props">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "onClick", type: "(event) => void", description: "Required — handle the dismiss." },
                { name: "isDisabled", type: "boolean", description: "Disable the button (e.g. while a save-in-progress prevents close)." },
                { name: "dataTestID", type: "string", description: "Convenience test id — sets data-testid on the button." },
              ]}
            />
            <p style={{ marginTop: 16, marginBottom: 0, color: "var(--gp-color-text-subtle)", fontSize: 14 }}>
              Inherits all of <code>ButtonProps</code> — pass <code>aria-label</code>,{" "}
              <code>variant</code>, <code>className</code>, <code>ouiaId</code> as
              needed.
            </p>
          </div>
        </Card>
      </Section>

      <Section title="Accessibility">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Has a default <code>aria-label=&quot;Close&quot;</code>.</strong> Override it for non-English locales or to disambiguate when the page has multiple close affordances (&ldquo;Close error banner&rdquo;).</li>
            <li><strong>Don&rsquo;t use it inside a Modal.</strong> Modal&rsquo;s built-in close button already covers that case — using two creates ambiguity.</li>
            <li><strong>Pair with the Escape key.</strong> If the surface this button dismisses is a popover / drawer, listen for Escape too — keyboard users expect both paths.</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
