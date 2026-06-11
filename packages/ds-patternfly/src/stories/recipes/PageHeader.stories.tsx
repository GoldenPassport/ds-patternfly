import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, PageHeader } from "@golden-passport/ds-patternfly";
import {
  FoundationPage,
  Section,
  Card,
  ConfigurationSection,
  Example,
} from "../_kit/StoryKit.js";
import {
  Basic,
  FullChrome,
  WithTabs,
} from "../../examples/recipes/PageHeader.example.js";
import pageHeaderExampleSrc from "../../examples/recipes/PageHeader.example.tsx?raw";
import pageHeaderComponentSrc from "../../recipes/PageHeader.tsx?raw";
import propsData from "./pageHeader.props.json";

const meta: Meta<typeof PageHeader> = {
  title: "Recipes/PageHeader",
  component: PageHeader,
  parameters: {
    layout: "padded",
    // PF6 Tabs auto-generates IDs containing ":" (React useId) which axe's
    // valid-attr-value rule rejects — known PF6 quirk, not a real defect
    // (same disable as the Tabs / Compass stories).
    a11y: { config: { rules: [{ id: "aria-valid-attr-value", enabled: false }] } },
  },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="PageHeader"
      intro={
        <>
          The standard top-of-page header — title row with optional icon,
          status label and right-aligned actions, a subtitle, a breadcrumb
          above, and a tabs strip below. Every region is a slot you fill, so
          it adapts to any page without a fixed prop surface.
        </>
      }
    >
      <Section title="Title + actions" description="The minimal header: a title, a subtitle, and a primary action.">
        <Card>
          <Example source={pageHeaderExampleSrc} region="Basic" fileName="PageHeader.example.tsx">
            <Basic />
          </Example>
        </Card>
      </Section>

      <Section title="Full chrome" description="Breadcrumb, icon, status label, subtitle, and a kebab action menu.">
        <Card>
          <Example source={pageHeaderExampleSrc} region="FullChrome" fileName="PageHeader.example.tsx">
            <FullChrome />
          </Example>
        </Card>
      </Section>

      <Section title="With tabs" description="A tabs strip below the header, driving the content region beneath it.">
        <Card>
          <Example source={pageHeaderExampleSrc} region="WithTabs" fileName="PageHeader.example.tsx">
            <WithTabs />
          </Example>
        </Card>
      </Section>

      <Section title="Full example" description="The complete example file behind the demos above. The same file ships in the MCP docs catalog.">
        <Card>
          <Example source={pageHeaderExampleSrc} fileName="PageHeader.example.tsx" />
        </Card>
      </Section>

      <ConfigurationSection
        importStatement={propsData.import}
        rows={propsData.rows}
        componentSource={pageHeaderComponentSrc}
        componentFileName="PageHeader.tsx"
      />
    </FoundationPage>
  ),
};

/** Live-controls playground — scalar props drive controls; ReactNode slots
 * are fixed by the harness. */
export const Playground: StoryObj<typeof PageHeader> = {
  args: {
    title: "Workflows",
    subtitle: "Manage triggers, runs, and history.",
  },
  argTypes: {
    title: { control: "text" },
    subtitle: { control: "text" },
    icon: { control: false },
    status: { control: false },
    breadcrumb: { control: false },
    actions: { control: false },
    tabs: { control: false },
    children: { control: false },
  },
  render: (args) => (
    <PageHeader {...args} actions={<Button variant="primary">Create</Button>} />
  ),
};
