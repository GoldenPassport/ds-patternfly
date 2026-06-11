import type { Meta, StoryObj } from "@storybook/react-vite";
import { Example } from "../_kit/StoryKit.js";
import CompassIntegrationsExample from "../../examples/patterns/CompassIntegrations.example.js";
import compassIntegrationsExampleSrc from "../../examples/patterns/CompassIntegrations.example.tsx?raw";

const meta: Meta = {
  title: "Patterns/CompassIntegrations example",
  parameters: {
    // Demo is a port of PF6's canonical Compass org-demo; it ships
    // with placeholder gradient backgrounds + glass surfaces whose
    // contrast against text is below WCAG AA. Disable color-contrast
    // so the structural a11y signal stays useful.
    a11y: {
      config: {
        rules: [
          { id: "color-contrast", enabled: false },
          // PF6 Tabs auto-generates IDs containing ":" which axe's
          // valid-attr-value rule rejects — known PF6 quirk, not a
          // real defect. Filed upstream; disable here so the rest
          // of the a11y signal stays useful.
          { id: "aria-valid-attr-value", enabled: false },
        ],
      },
    },
  },
};
export default meta;

/**
 * The complete end-to-end Compass org-demo (src/examples/patterns/
 * CompassIntegrations.example.tsx): branded header + pill top-nav, icon
 * side rails, filterable integrations table / card gallery, "Add
 * integration" modal, and the AiAssistant docked in the footer slot.
 * The same source ships verbatim in the MCP docs catalog.
 */
export const CompassIntegrations: StoryObj = {
  parameters: { layout: "fullscreen", fullBleed: true },
  render: () => <CompassIntegrationsExample />,
};

/** The example file's full source — display + download, no live render. */
export const Source: StoryObj = {
  parameters: { layout: "padded" },
  render: () => (
    <Example
      source={compassIntegrationsExampleSrc}
      fileName="CompassIntegrations.example.tsx"
    />
  ),
};
