import type { Meta, StoryObj } from "@storybook/react-vite";
import { AppHeader } from "@golden-passport/ds-patternfly";
import {
  FoundationPage,
  Section,
  Card,
  ConfigurationSection,
  Example,
} from "../_kit/StoryKit.js";
import {
  Basic,
  WithNavToggle,
} from "../../examples/ds/AppHeader.example.js";
import appHeaderExampleSrc from "../../examples/ds/AppHeader.example.tsx?raw";
import appHeaderComponentSrc from "../../components/ds/AppHeader.tsx?raw";
import propsData from "./appHeader.props.json";

const meta: Meta<typeof AppHeader> = {
  title: "Building blocks/Navigation/AppHeader",
  component: AppHeader,
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="AppHeader"
      intro={
        <>
          The branded application masthead — an optional sidebar toggle, a
          brand/logo slot, and a right-aligned actions slot for search, help,
          notifications and the user menu. Every region is a slot you fill, so
          it adapts to any app chrome. For the full page frame (masthead +
          sidebar + content), use Shell.
        </>
      }
    >
      <Section title="Basic" description="A brand mark plus a right-aligned actions toolbar.">
        <Card>
          <Example source={appHeaderExampleSrc} region="Basic" fileName="AppHeader.example.tsx">
            <Basic />
          </Example>
        </Card>
      </Section>

      <Section title="With nav toggle" description="Wiring onToggleNav shows the hamburger toggle for collapsing a sidebar.">
        <Card>
          <Example source={appHeaderExampleSrc} region="WithNavToggle" fileName="AppHeader.example.tsx">
            <WithNavToggle />
          </Example>
        </Card>
      </Section>

      <Section title="Full example" description="The complete example file behind the demos above. The same file ships in the MCP docs catalog.">
        <Card>
          <Example source={appHeaderExampleSrc} fileName="AppHeader.example.tsx" />
        </Card>
      </Section>

      <ConfigurationSection
        importStatement={propsData.import}
        rows={propsData.rows}
        componentSource={appHeaderComponentSrc}
        componentFileName="AppHeader.tsx"
      />
    </FoundationPage>
  ),
};
