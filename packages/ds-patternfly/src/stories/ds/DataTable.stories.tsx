import type { Meta, StoryObj } from "@storybook/react-vite";
import { DataTable } from "@golden-passport/ds-patternfly";
import {
  FoundationPage,
  Section,
  Card,
  ConfigurationSection,
  Example,
} from "../_kit/StoryKit.js";
import {
  BasicTable,
  WithToolbarAndPagination,
} from "../../examples/ds/DataTable.example.js";
import dataTableExampleSrc from "../../examples/ds/DataTable.example.tsx?raw";
import dataTableComponentSrc from "../../components/ds/DataTable.tsx?raw";
import propsData from "./dataTable.props.json";

const meta: Meta<typeof DataTable> = {
  title: "Building blocks/Data/DataTable",
  component: DataTable,
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="DataTable"
      intro={
        <>
          A declarative table over <code>columns</code> + <code>rows</code>.
          You define each column's <code>header</code> and a <code>cell</code>{" "}
          renderer; DataTable composes the base <code>Table</code> family and
          handles the optional toolbar / pagination slots plus built-in loading
          and empty states. It is generic — <code>DataTable&lt;T&gt;</code>{" "}
          infers the row type from your data.
        </>
      }
    >
      <Section title="Basic table" description="Columns over a handful of rows of realistic data. Each column carries a key, a header, and a cell renderer; a Label brings a little status colour.">
        <Card>
          <Example source={dataTableExampleSrc} region="BasicTable" fileName="DataTable.example.tsx">
            <BasicTable />
          </Example>
        </Card>
      </Section>

      <Section title="With toolbar and pagination" description="A search toolbar drives client-side filtering; top and footer Pagination slots page the results. When a search matches nothing, the emptyState slot renders a StatusPanel. The two paginations carry distinct paginationAriaLabels so each is a unique landmark.">
        <Card>
          <Example source={dataTableExampleSrc} region="WithToolbarAndPagination" fileName="DataTable.example.tsx">
            <WithToolbarAndPagination />
          </Example>
        </Card>
      </Section>

      <Section title="Full example" description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog.">
        <Card>
          <Example source={dataTableExampleSrc} fileName="DataTable.example.tsx" />
        </Card>
      </Section>

      <ConfigurationSection
        importStatement={propsData.import}
        rows={propsData.rows}
        componentSource={dataTableComponentSrc}
        componentFileName="DataTable.tsx"
      />
    </FoundationPage>
  ),
};
