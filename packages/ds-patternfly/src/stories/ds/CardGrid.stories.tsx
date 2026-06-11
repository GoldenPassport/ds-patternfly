import type { Meta, StoryObj } from "@storybook/react-vite";
import { CardGrid } from "@golden-passport/ds-patternfly";
import {
  FoundationPage,
  Section,
  Card,
  ConfigurationSection,
  Example,
} from "../_kit/StoryKit.js";
import { Gallery, Empty } from "../../examples/ds/CardGrid.example.js";
import cardGridExampleSrc from "../../examples/ds/CardGrid.example.tsx?raw";
import cardGridComponentSrc from "../../components/ds/CardGrid.tsx?raw";
import propsData from "./cardGrid.props.json";

const meta: Meta<typeof CardGrid> = {
  title: "Building blocks/Data/CardGrid",
  component: CardGrid,
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="CardGrid"
      intro={
        <>
          A responsive gallery of cards from a data array. Pass{" "}
          <code>items</code> and a <code>renderItem</code> that returns the
          card for each; CardGrid handles the responsive layout (auto-filling
          columns at <code>minColumnWidth</code>). It is the standard
          alternative to a table for browse-style collections, and is generic —{" "}
          <code>CardGrid&lt;T&gt;</code> infers the item type from your data.
        </>
      }
    >
      <Section title="Gallery" description="An items array rendered one card each. renderItem returns a Card with a CardHeader/CardTitle, a CardBody, and a Label — CardGrid lays them out in an auto-filling responsive grid.">
        <Card>
          <Example source={cardGridExampleSrc} region="Gallery" fileName="CardGrid.example.tsx">
            <Gallery />
          </Example>
        </Card>
      </Section>

      <Section title="Empty" description="When items is empty, CardGrid renders the emptyState slot instead of the grid — here a StatusPanel with the empty variant and a primary action.">
        <Card>
          <Example source={cardGridExampleSrc} region="Empty" fileName="CardGrid.example.tsx">
            <Empty />
          </Example>
        </Card>
      </Section>

      <Section title="Full example" description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog.">
        <Card>
          <Example source={cardGridExampleSrc} fileName="CardGrid.example.tsx" />
        </Card>
      </Section>

      <ConfigurationSection
        importStatement={propsData.import}
        rows={propsData.rows}
        componentSource={cardGridComponentSrc}
        componentFileName="CardGrid.tsx"
      />
    </FoundationPage>
  ),
};
