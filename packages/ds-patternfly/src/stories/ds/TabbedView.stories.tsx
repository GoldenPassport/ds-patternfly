import type { Meta, StoryObj } from "@storybook/react-vite";
import { TabbedView } from "@golden-passport/ds-patternfly";
import {
  FoundationPage,
  Section,
  Card,
  ConfigurationSection,
  Example,
} from "../_kit/StoryKit.js";
import {
  Uncontrolled,
  Controlled,
  BoxStyle,
} from "../../examples/ds/TabbedView.example.js";
import tabbedViewExampleSrc from "../../examples/ds/TabbedView.example.tsx?raw";
import tabbedViewComponentSrc from "../../components/ds/TabbedView.tsx?raw";
import propsData from "./tabbedView.props.json";

const meta: Meta<typeof TabbedView> = {
  title: "Building blocks/Navigation/TabbedView",
  component: TabbedView,
  parameters: {
    layout: "padded",
    // PF6 Tabs auto-generates IDs containing ":" (React useId) which axe's
    // valid-attr-value rule rejects — known PF6 quirk, not a real defect.
    a11y: { config: { rules: [{ id: "aria-valid-attr-value", enabled: false }] } },
  },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="TabbedView"
      intro={
        <>
          A declarative tabbed container over a <code>tabs</code> array — each
          entry is <code>{`{ key, title, content }`}</code>. Renders the tab
          strip plus the active panel and manages the active tab itself
          (uncontrolled via <code>defaultActiveKey</code>) or hands control to
          you (<code>activeKey</code> + <code>onSelect</code>).
        </>
      }
    >
      <Section title="Uncontrolled" description="Pass tabs; TabbedView tracks the active one (defaults to the first).">
        <Card>
          <Example source={tabbedViewExampleSrc} region="Uncontrolled" fileName="TabbedView.example.tsx">
            <Uncontrolled />
          </Example>
        </Card>
      </Section>

      <Section title="Controlled" description="Own activeKey + onSelect to drive the tabs from your state (e.g. the URL).">
        <Card>
          <Example source={tabbedViewExampleSrc} region="Controlled" fileName="TabbedView.example.tsx">
            <Controlled />
          </Example>
        </Card>
      </Section>

      <Section title="Box style" description="isBox renders the card-like boxed tab treatment.">
        <Card>
          <Example source={tabbedViewExampleSrc} region="BoxStyle" fileName="TabbedView.example.tsx">
            <BoxStyle />
          </Example>
        </Card>
      </Section>

      <Section title="Full example" description="The complete example file behind the demos above. The same file ships in the MCP docs catalog.">
        <Card>
          <Example source={tabbedViewExampleSrc} fileName="TabbedView.example.tsx" />
        </Card>
      </Section>

      <ConfigurationSection
        importStatement={propsData.import}
        rows={propsData.rows}
        componentSource={tabbedViewComponentSrc}
        componentFileName="TabbedView.tsx"
      />
    </FoundationPage>
  ),
};
