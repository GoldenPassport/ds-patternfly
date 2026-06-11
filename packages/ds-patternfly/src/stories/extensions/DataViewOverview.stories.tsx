import type { Meta, StoryObj } from "@storybook/react-vite";
import { FoundationPage, Section, Card, Example } from "../_kit/StoryKit.js";
import { PropsTable } from "../_kit/DemoKit.js";
import { ComposedDataView } from "../../examples/extensions/DataViewOverview.example.js";
import dataViewOverviewExampleSrc from "../../examples/extensions/DataViewOverview.example.tsx?raw";

const meta: Meta = {
  title: "Extensions/Data view/Overview",
  parameters: {
    layout: "padded",
    a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } },
  },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Data view"
      intro={
        <>
          A pre-wired Table + Toolbar + Pagination + Selection package —
          handles the boilerplate every product table reinvents. Use it
          when you want a drop-in modern data table with filters,
          selection, sort, pagination, and consistent UX across products.
          From <code>@patternfly/react-data-view</code>.
        </>
      }
    >
      <Section
        title="Composed Data view"
        description="DataView wraps DataViewToolbar + DataViewTable. The hooks (useDataViewSelection, useDataViewPagination, useDataViewSort) own the state and produce the props each piece expects."
      >
        <Card>
          <Example
            source={dataViewOverviewExampleSrc}
            region="ComposedDataView"
            fileName="DataViewOverview.example.tsx"
          >
            <ComposedDataView />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example
            source={dataViewOverviewExampleSrc}
            fileName="DataViewOverview.example.tsx"
          />
        </Card>
      </Section>

      <Section title="Composition">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "DataView", type: "container", description: "Outer wrapper. Owns selection + state context, dispatches activeState (loading / empty / error) to children." },
                { name: "DataViewToolbar", type: "child", description: "Toolbar slot. Accepts bulkSelect, pagination, actions, toggleGroup, filters as named slots." },
                { name: "DataViewTable", type: "child", description: "Table renderer. Pass columns + rows; the component handles row keys, selection wiring, and head/body states." },
                { name: "DataViewTableBasic / DataViewTableTree", type: "child", description: "Underlying renderers. Use directly when you don't need the wrapping DataView state context." },
                { name: "DataViewTextFilter / DataViewCheckboxFilter", type: "child", description: "Drop-in filter components — pair with DataViewFilters." },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section title="Hooks">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "useDataViewSelection", type: "({ matchOption, initialSelected? })", description: "Returns { selected, onSelect, isSelected, setSelected }. Pass into DataView.selection to wire row checkboxes." },
                { name: "useDataViewPagination", type: "({ perPage, page?, searchParams?, setSearchParams? })", description: "Returns { page, perPage, onSetPage, onPerPageSelect }. Optional searchParams enables URL-driven pagination state." },
                { name: "useDataViewSort", type: "({ initialSort?, searchParams?, setSearchParams? })", description: "Returns { sortBy, direction, onSort } — wire onSort into your column Th's sort prop." },
                { name: "useDataViewFilters", type: "({ initialFilters, searchParams?, setSearchParams? })", description: "Manages a typed filter object. Returns filters + filter setters; the URL-aware variants serialize to query params." },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section title="Data view vs raw Table">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Data view</strong> — opinionated. Built-in toolbar slots, selection context, URL-state hooks, loading / empty / error states. Use when your product needs a familiar &ldquo;list of things with filters&rdquo; UI.</li>
            <li><strong>Raw Table</strong> — primitives only. Use when the design diverges from the standard toolbar / pagination layout, or when bundle size matters.</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
