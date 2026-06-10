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
import backdropComponentSrc from "../../components/Backdrop.tsx?raw";

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
        importStatement={'import { Backdrop } from "@golden-passport/ds-patternfly";'}
        componentSource={backdropComponentSrc}
        componentFileName="Backdrop.tsx"
        rows={[
          { name: "children", type: "ReactNode", description: "Content rendered above the dimmed backdrop. Pair with Bullseye for centred content." },
          { name: "className", type: "string", description: "Additional class for the backdrop element. Use to layer custom overrides on top of the PF6 visuals." },
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
