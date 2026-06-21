import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  FoundationPage,
  Section,
  Card,
  ConfigurationSection,
  Example,
} from "../_kit/StoryKit.js";
import { CustomBlockingOverlay } from "../../examples/components/Backdrop.example.js";
import backdropExampleSrc from "../../examples/components/Backdrop.example.tsx?raw";
import loadingOverlayComponentSrc from "../../components/ds/LoadingOverlay.tsx?raw";

const meta: Meta = {
  title: "Components/Backdrop",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Backdrop"
      intro={
        <>
          A semi-transparent overlay that dims the page behind a focused
          surface. <code>Modal</code>, <code>Wizard</code>, and{" "}
          <code>AboutModal</code> include their own backdrop — you rarely
          render this directly. Use it to build custom blocking overlays
          (full-page loaders, custom dialogs).
        </>
      }
    >
      <Section title="Custom blocking overlay">
        <Card>
          <Example
            source={backdropExampleSrc}
            region="CustomBlockingOverlay"
            fileName="Backdrop.example.tsx"
            height={220}
          >
            <CustomBlockingOverlay />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example source={backdropExampleSrc} fileName="Backdrop.example.tsx" />
        </Card>
      </Section>

      <ConfigurationSection
        importStatement={'import { LoadingOverlay } from "@golden-passport/ds-patternfly";'}
        componentSource={loadingOverlayComponentSrc}
        componentFileName="LoadingOverlay.tsx"
        description="LoadingOverlay wraps the Backdrop + centered spinner card. Toggle isOpen; optionally supply a message and onCancel. For a bespoke overlay, compose Backdrop + Bullseye directly."
        rows={[
          { name: "isOpen", type: "boolean", description: "Show the overlay. When false, nothing renders." },
          { name: "message", type: "ReactNode", description: "Caption under the spinner (e.g. \"Loading workspace…\")." },
          { name: "spinnerAriaLabel", type: "string", description: "Accessible label for the spinner (default \"Loading\")." },
          { name: "onCancel", type: "() => void", description: "When set, renders a Cancel link wired to this handler." },
          { name: "cancelLabel", type: "string", description: "Label for the cancel link (default \"Cancel\")." },
        ]}
      />

      <Section title="Accessibility">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Backdrop alone is not accessible.</strong> It's a visual treatment — it doesn't trap focus, hide page content from screen readers, or handle Escape. Wrap interactive content in a properly-roled container (dialog) with focus trapping.</li>
            <li><strong>Don't use it for non-blocking states.</strong> A dim overlay implies "you can't interact with the page" — if the page is still usable, skip the backdrop and use inline loaders instead.</li>
            <li><strong>Always provide a way out.</strong> Even a loading backdrop should have a cancel option, or auto-dismiss when work completes — never leave users trapped.</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
