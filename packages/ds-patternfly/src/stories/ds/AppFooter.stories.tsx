import type { Meta, StoryObj } from "@storybook/react-vite";
import { AppFooter } from "@golden-passport/ds-patternfly";
import {
  FoundationPage,
  Section,
  Card,
  ConfigurationSection,
  Example,
} from "../_kit/StoryKit.js";
import { SiteFooter } from "../../examples/ds/AppFooter.example.js";
import appFooterExampleSrc from "../../examples/ds/AppFooter.example.tsx?raw";
import appFooterComponentSrc from "../../components/ds/AppFooter.tsx?raw";
import propsData from "./appFooter.props.json";

const meta: Meta<typeof AppFooter> = {
  title: "Building blocks/Navigation/AppFooter",
  component: AppFooter,
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="AppFooter"
      intro={
        <>
          The branded site footer — an optional logo and tagline, columns of
          link groups, and a bottom bar with copyright and inline legal links.
          Layout and brand dials only; every region is a slot you fill. Each
          link group renders as its own labelled nav landmark.
        </>
      }
    >
      <Section title="Site footer" description="Logo, tagline, three link-group columns, and a copyright + legal bottom bar.">
        <Card>
          <Example source={appFooterExampleSrc} region="SiteFooter" fileName="AppFooter.example.tsx">
            <SiteFooter />
          </Example>
        </Card>
      </Section>

      <Section title="Full example" description="The complete example file behind the demo above. The same file ships in the MCP docs catalog.">
        <Card>
          <Example source={appFooterExampleSrc} fileName="AppFooter.example.tsx" />
        </Card>
      </Section>

      <ConfigurationSection
        importStatement={propsData.import}
        rows={propsData.rows}
        componentSource={appFooterComponentSrc}
        componentFileName="AppFooter.tsx"
      />
    </FoundationPage>
  ),
};
