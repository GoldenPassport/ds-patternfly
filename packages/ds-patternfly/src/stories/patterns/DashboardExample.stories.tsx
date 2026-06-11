import type { Meta, StoryObj } from "@storybook/react-vite";
import { Example } from "../_kit/StoryKit.js";
import DashboardExample from "../../examples/patterns/Dashboard.example.js";
import dashboardExampleSrc from "../../examples/patterns/Dashboard.example.tsx?raw";

const meta: Meta = {
  title: "Patterns/Dashboard example",
  parameters: {
    // Demo content uses placeholder bg gradients with sub-AA contrast
    // on labels — disable the rule so the surrounding chrome a11y
    // results stay actionable.
    a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } },
  },
};
export default meta;

/**
 * The complete end-to-end dashboard (src/examples/patterns/
 * Dashboard.example.tsx) rendered full-bleed: KPI strip, chart panel,
 * status sidebar. The same source ships verbatim in the MCP docs catalog.
 */
export const Dashboard: StoryObj = {
  parameters: { layout: "fullscreen", fullBleed: true },
  render: () => <DashboardExample />,
};

/** The example file's full source — display + download, no live render. */
export const Source: StoryObj = {
  parameters: { layout: "padded" },
  render: () => (
    <Example source={dashboardExampleSrc} fileName="Dashboard.example.tsx" />
  ),
};
