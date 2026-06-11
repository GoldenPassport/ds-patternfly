import type { Meta, StoryObj } from "@storybook/react-vite";
import { FilterToolbar } from "@golden-passport/ds-patternfly";
import {
  FoundationPage,
  Section,
  Card,
  ConfigurationSection,
  Example,
} from "../_kit/StoryKit.js";
import { SearchFacetsChips } from "../../examples/recipes/FilterToolbar.example.js";
import filterToolbarExampleSrc from "../../examples/recipes/FilterToolbar.example.tsx?raw";
import filterToolbarComponentSrc from "../../components/ds/FilterToolbar.tsx?raw";
import propsData from "./filterToolbar.props.json";

const meta: Meta<typeof FilterToolbar> = {
  title: "Recipes/FilterToolbar",
  component: FilterToolbar,
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="FilterToolbar"
      intro={
        <>
          The standard filter bar — a search field, faceted multi-select
          facets, removable filter chips, and one-click clear-all. Fully
          controlled: you own the search text and selected values; the chips
          and clear-all control are derived automatically.
        </>
      }
    >
      <Section title="Search, facets, chips" description="Type to filter; open a facet to multi-select; chips appear below and clear individually or all at once.">
        <Card>
          <Example source={filterToolbarExampleSrc} region="SearchFacetsChips" fileName="FilterToolbar.example.tsx">
            <SearchFacetsChips />
          </Example>
        </Card>
      </Section>

      <Section title="Full example" description="The complete example file behind the demo above. The same file ships in the MCP docs catalog.">
        <Card>
          <Example source={filterToolbarExampleSrc} fileName="FilterToolbar.example.tsx" />
        </Card>
      </Section>

      <ConfigurationSection
        importStatement={propsData.import}
        rows={propsData.rows}
        componentSource={filterToolbarComponentSrc}
        componentFileName="FilterToolbar.tsx"
      />
    </FoundationPage>
  ),
};
