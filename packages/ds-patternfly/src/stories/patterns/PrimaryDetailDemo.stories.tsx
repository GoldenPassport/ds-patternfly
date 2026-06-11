import type { Meta, StoryObj } from "@storybook/react-vite";
import { Section, Card, Example } from "../_kit/StoryKit.js";
import { PrimaryDetailCardView } from "./primaryDetailCardDemo.js";
import PrimaryDetailDemoExample from "../../examples/patterns/PrimaryDetailDemo.example.js";
import primaryDetailDemoExampleSrc from "../../examples/patterns/PrimaryDetailDemo.example.tsx?raw";

const meta: Meta = {
  title: "Patterns/Primary-detail/Demo",
  parameters: {
    layout: "fullscreen",
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

type Story = StoryObj;

/**
 * Full-page variant — the end-to-end demo lives in
 * `src/examples/patterns/PrimaryDetailDemo.example.tsx` (filterable DataList
 * + detail Drawer inside a PF6 app shell). See the
 * **Patterns/PrimaryDetailDemo example** page for the full-bleed render and
 * its complete source.
 */
export const Default: Story = {
  render: () => <PrimaryDetailDemoExample />,
};

/**
 * Card-view variant — port of PF6's `PrimaryDetailCardView` demo
 * (https://www.patternfly.org/patterns/primary-detail/react-demos/primary-detail-card-view/).
 * A gallery of selectable Cards with toolbar filters, kebab actions, and the
 * same right-side detail drawer pattern. Implementation lives in
 * `./primaryDetailCardDemo.tsx` to keep this stories file focused.
 */
export const CardView: Story = {
  name: "Card view",
  render: () => <PrimaryDetailCardView />,
};

/**
 * The complete example file behind the Default demo — ready to drop into an
 * app, and shipped verbatim in the MCP docs catalog. Source-only: the demo
 * above is already the live render; for a full-bleed live render see the
 * **Patterns/PrimaryDetailDemo example** page.
 */
export const FullExample: Story = {
  name: "Full example",
  parameters: { layout: "padded" },
  render: () => (
    <Section
      title="Full example"
      description="The complete example file behind the Default demo — ready to drop into an app. The same file ships in the MCP docs catalog. For the full-bleed live render, see the Patterns/PrimaryDetailDemo example page."
    >
      <Card>
        <Example
          source={primaryDetailDemoExampleSrc}
          fileName="PrimaryDetailDemo.example.tsx"
        />
      </Card>
    </Section>
  ),
};
