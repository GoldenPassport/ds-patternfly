import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, DashboardShell } from "@golden-passport/ds-patternfly";
import {
  FoundationPage,
  Section,
  Card,
  ConfigurationSection,
  Example,
} from "../_kit/StoryKit.js";
import { OpsDashboard } from "../../examples/patterns/DashboardShell.example.js";
import dashboardExampleSrc from "../../examples/patterns/DashboardShell.example.tsx?raw";
import dashboardComponentSrc from "../../components/ds/DashboardShell.tsx?raw";
import propsData from "./dashboardShell.props.json";

const meta: Meta<typeof DashboardShell> = {
  title: "Patterns/DashboardShell",
  component: DashboardShell,
  parameters: {
    layout: "padded",
    // The KPI/chart placeholder uses a low-contrast gradient panel; disable
    // color-contrast so the structural a11y signal stays useful.
    a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } },
  },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="DashboardShell"
      intro={
        <>
          The page scaffold for an ops dashboard — a titled header band with
          an actions slot over a padded content region you fill with a KPI
          strip, charts, and status cards. Layout and rhythm only: the
          dashboard body is your <code>children</code>, so chart libraries
          stay in your app and never leak into the design system.
        </>
      }
    >
      <Section title="Ops dashboard" description="Title + actions header over a KPI gallery and a chart/status grid.">
        <Card>
          <Example source={dashboardExampleSrc} region="OpsDashboard" fileName="DashboardShell.example.tsx">
            <OpsDashboard />
          </Example>
        </Card>
      </Section>

      <Section title="Full example" description="The complete example file behind the demo above. The same file ships in the MCP docs catalog.">
        <Card>
          <Example source={dashboardExampleSrc} fileName="DashboardShell.example.tsx" />
        </Card>
      </Section>

      <ConfigurationSection
        importStatement={propsData.import}
        rows={propsData.rows}
        componentSource={dashboardComponentSrc}
        componentFileName="DashboardShell.tsx"
      />
    </FoundationPage>
  ),
};

/** Live-controls playground — title/description text; actions + body fixed. */
export const Playground: StoryObj<typeof DashboardShell> = {
  args: {
    title: "Operations",
    description: "Live workflow and system metrics.",
  },
  argTypes: {
    title: { control: "text" },
    description: { control: "text" },
    actions: { control: false },
    children: { control: false },
  },
  render: (args) => (
    <DashboardShell {...args} actions={<Button variant="secondary">Last 24h</Button>}>
      <div style={{ color: "var(--gp-color-text-subtle)" }}>Dashboard body goes here.</div>
    </DashboardShell>
  ),
};
