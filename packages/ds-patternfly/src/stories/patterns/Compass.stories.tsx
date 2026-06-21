import type { Meta, StoryObj } from "@storybook/react-vite";
import { Section, Card, Example as ExampleBlock } from "../_kit/StoryKit.js";
import IntegrationsDemo from "../../examples/patterns/Compass.example.js";
import compassExampleSrc from "../../examples/patterns/Compass.example.tsx?raw";

// ──────────────────────────────────────────────────────────────────
// Patterns/Compass — Integrations (org-demo port)
// Source: https://www.patternfly.org/components/compass/org-demos
// The end-to-end demo lives in
// src/examples/patterns/Compass.example.tsx — adapted from the PF6
// org-demo: dropped @patternfly/chatbot MessageBar + local image
// assets so it runs against just react-core + react-data-view
// + react-icons; the AiAssistant docks in the CompassMessageBar slot.
// ──────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: "Patterns/Compass",
  parameters: {
    layout: "fullscreen",
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
 * Integrations — the full Compass org-demo, rendered full-bleed. The
 * implementation lives in `src/examples/patterns/Compass.example.tsx`; the
 * Full example story below carries the complete source + download.
 */
export const Example: StoryObj = {
  parameters: { fullBleed: true },
  render: () => <IntegrationsDemo />,
};

/**
 * The complete example file behind the demo above — ready to drop into an
 * app, and shipped verbatim in the MCP docs catalog. Source-only: the demo
 * above is already the live full-bleed render.
 */
export const FullExample: StoryObj = {
  name: "Full example",
  parameters: { layout: "padded" },
  render: () => (
    <Section
      title="Full example"
      description="The complete example file behind the Integrations demo — ready to drop into an app. The same file ships in the MCP docs catalog."
    >
      <Card>
        <ExampleBlock
          source={compassExampleSrc}
          fileName="Compass.example.tsx"
        />
      </Card>
    </Section>
  ),
};
