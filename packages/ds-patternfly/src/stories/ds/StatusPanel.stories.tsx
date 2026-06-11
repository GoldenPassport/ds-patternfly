import type { Meta, StoryObj } from "@storybook/react-vite";
import { StatusPanel } from "@golden-passport/ds-patternfly";
import {
  FoundationPage,
  Section,
  Card,
  ConfigurationSection,
  Example,
} from "../_kit/StoryKit.js";
import {
  Empty,
  Error,
  Unauthorized,
  Maintenance,
} from "../../examples/ds/StatusPanel.example.js";
import statusPanelExampleSrc from "../../examples/ds/StatusPanel.example.tsx?raw";
import statusPanelComponentSrc from "../../components/ds/StatusPanel.tsx?raw";
import propsData from "./statusPanel.props.json";

const meta: Meta<typeof StatusPanel> = {
  title: "Building blocks/Feedback/StatusPanel",
  component: StatusPanel,
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="StatusPanel"
      intro={
        <>
          The one lego block for every full-panel "state" screen — empty
          results, an error, unauthorized access, or maintenance. Pick a{" "}
          <code>variant</code> for a sensible default icon and accent, set the
          title/body, and add a primary or secondary action.
        </>
      }
    >
      <Section
        title="Empty"
        description="variant='empty' — nothing to show yet. Pair with a primary action that creates the first item."
      >
        <Card>
          <Example
            source={statusPanelExampleSrc}
            region="Empty"
            fileName="StatusPanel.example.tsx"
          >
            <Empty />
          </Example>
        </Card>
      </Section>

      <Section
        title="Error"
        description="variant='error' — a danger-accented icon. Offer a Retry plus a secondary link out."
      >
        <Card>
          <Example
            source={statusPanelExampleSrc}
            region="Error"
            fileName="StatusPanel.example.tsx"
          >
            <Error />
          </Example>
        </Card>
      </Section>

      <Section
        title="Unauthorized"
        description="variant='unauthorized' — the user lacks permission. Offer a sign-in path."
      >
        <Card>
          <Example
            source={statusPanelExampleSrc}
            region="Unauthorized"
            fileName="StatusPanel.example.tsx"
          >
            <Unauthorized />
          </Example>
        </Card>
      </Section>

      <Section
        title="Maintenance"
        description="variant='maintenance' — a warning-accented icon for planned downtime."
      >
        <Card>
          <Example
            source={statusPanelExampleSrc}
            region="Maintenance"
            fileName="StatusPanel.example.tsx"
          >
            <Maintenance />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example source={statusPanelExampleSrc} fileName="StatusPanel.example.tsx" />
        </Card>
      </Section>

      <ConfigurationSection
        importStatement={propsData.import}
        rows={propsData.rows}
        componentSource={statusPanelComponentSrc}
        componentFileName="StatusPanel.tsx"
      />
    </FoundationPage>
  ),
};
