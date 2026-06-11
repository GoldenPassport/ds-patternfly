import type { Meta, StoryObj } from "@storybook/react-vite";
import { FoundationPage, Section, Card, Example } from "../_kit/StoryKit.js";
import { PropsTable } from "../_kit/DemoKit.js";
import {
  Basic,
  InsideACustomPanel,
} from "../../examples/component-groups/CloseButton.example.js";
import closeButtonExampleSrc from "../../examples/component-groups/CloseButton.example.tsx?raw";

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
          <Example
            source={closeButtonExampleSrc}
            region="Basic"
            fileName="CloseButton.example.tsx"
          >
            <Basic />
          </Example>
        </Card>
      </Section>

      <Section
        title="Inside a custom panel"
        description="Drop CloseButton into the top-right of any dismissable surface — drawers, banners, ad-hoc cards."
      >
        <Card>
          <Example
            source={closeButtonExampleSrc}
            region="InsideACustomPanel"
            fileName="CloseButton.example.tsx"
          >
            <InsideACustomPanel />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example source={closeButtonExampleSrc} fileName="CloseButton.example.tsx" />
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
