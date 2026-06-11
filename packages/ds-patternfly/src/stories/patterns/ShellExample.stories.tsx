import type { Meta, StoryObj } from "@storybook/react-vite";
import { Example } from "../_kit/StoryKit.js";
import ShellExample from "../../examples/patterns/Shell.example.js";
import shellExampleSrc from "../../examples/patterns/Shell.example.tsx?raw";

const meta: Meta = {
  title: "Patterns/Shell example",
  parameters: {
    a11y: {
      // PF6 v6 paints gradient backgrounds on its Button component that axe
      // can't analyze (color-contrast → "needs review"). Upstream PF6 issue.
      // Brand color contrast itself is validated in src/tokens/tokens.test.ts.
      config: { rules: [{ id: "color-contrast", enabled: false }] },
    },
  },
};
export default meta;

/**
 * The complete end-to-end app frame (src/examples/patterns/Shell.example.tsx):
 * branded masthead + responsive utility actions, sidebar nav driving a
 * PageHeader, KPI cards, activity card, footer. The same source ships
 * verbatim in the MCP docs catalog.
 */
export const Shell: StoryObj = {
  parameters: { layout: "fullscreen", fullBleed: true },
  render: () => <ShellExample />,
};

/** The example file's full source — display + download, no live render. */
export const Source: StoryObj = {
  parameters: { layout: "padded" },
  render: () => (
    <Example source={shellExampleSrc} fileName="Shell.example.tsx" />
  ),
};
