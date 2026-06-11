import type { Meta, StoryObj } from "@storybook/react-vite";
import { Example } from "../_kit/StoryKit.js";
import PrimaryDetailDemoExample from "../../examples/patterns/PrimaryDetailDemo.example.js";
import primaryDetailDemoExampleSrc from "../../examples/patterns/PrimaryDetailDemo.example.tsx?raw";

const meta: Meta = {
  title: "Patterns/PrimaryDetailDemo example",
  parameters: {
    a11y: {
      // PF6's DashboardWrapper renders a full app shell (masthead + sidebar +
      // main) — Storybook's doc page can host multiple landmarks of the same
      // role at once, so these landmark-uniqueness rules need to be off.
      // color-contrast is a known PF6 false-positive against gradient-painted
      // Button backgrounds; brand contrast is verified in tokens.test.ts.
      config: {
        rules: [
          { id: "color-contrast", enabled: false },
          { id: "landmark-unique", enabled: false },
          { id: "landmark-no-duplicate-main", enabled: false },
          { id: "landmark-no-duplicate-banner", enabled: false },
        ],
      },
    },
  },
};
export default meta;

/**
 * The complete end-to-end primary-detail page (src/examples/patterns/
 * PrimaryDetailDemo.example.tsx): filterable DataList + detail Drawer inside
 * a PF6 app shell. The same source ships verbatim in the MCP docs catalog.
 */
export const PrimaryDetailDemo: StoryObj = {
  parameters: { layout: "fullscreen", fullBleed: true },
  render: () => <PrimaryDetailDemoExample />,
};

/** The example file's full source — display + download, no live render. */
export const Source: StoryObj = {
  parameters: { layout: "padded" },
  render: () => (
    <Example
      source={primaryDetailDemoExampleSrc}
      fileName="PrimaryDetailDemo.example.tsx"
    />
  ),
};
