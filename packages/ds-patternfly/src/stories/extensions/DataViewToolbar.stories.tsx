import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  DataView,
  DataViewToolbar,
  DataViewTextFilter,
  useDataViewPagination,
} from "@patternfly/react-data-view";
import { Button, Pagination } from "@patternfly/react-core";
import { FoundationPage, Section, Card, CodeBlock } from "../_storyKit.js";
import { DemoFrame, PropsTable } from "../../components/DemoKit.js";

const meta: Meta = {
  title: "Extensions/Data view/Toolbar",
  parameters: {
    layout: "padded",
    a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } },
  },
};
export default meta;

export const Overview: StoryObj = {
  render: () => {
    const [search, setSearch] = useState("");
    const pagination = useDataViewPagination({ perPage: 20 });
    return (
      <FoundationPage
        title="Data view toolbar"
        intro={
          <>
            The toolbar that sits above a Data view table — named slots for
            filters, bulk select, actions, view-toggle group, and
            pagination. Everything is a render-slot, so you stay in control
            of the inner components.
          </>
        }
      >
        <Section
          title="Filters + actions + pagination"
          description="Pass each region as a separate prop — the toolbar lays them out responsively."
        >
          <Card>
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <DemoFrame>
                <DataView>
                  <DataViewToolbar
                    filters={
                      <DataViewTextFilter
                        filterId="name"
                        title="Name"
                        value={search}
                        onChange={(_e, v) => setSearch(v as string)}
                        placeholder="Filter by name"
                      />
                    }
                    actions={
                      <Button variant="primary">Create workflow</Button>
                    }
                    pagination={
                      <Pagination
                        itemCount={142}
                        page={pagination.page}
                        perPage={pagination.perPage}
                        onSetPage={pagination.onSetPage}
                        onPerPageSelect={pagination.onPerPageSelect}
                        widgetId="dv-toolbar-pagination"
                        isCompact
                      />
                    }
                  />
                </DataView>
              </DemoFrame>
              <CodeBlock>{`<DataViewToolbar
  filters={<DataViewTextFilter filterId="name" title="Name" value={q} onChange={...} />}
  actions={<Button variant="primary">Create</Button>}
  bulkSelect={<BulkSelect ... />}
  toggleGroup={<ToggleGroup ... />}
  pagination={<Pagination ... />}
/>`}</CodeBlock>
            </div>
          </Card>
        </Section>

        <Section title="Slot props">
          <Card>
            <div style={{ padding: 24 }}>
              <PropsTable
                rows={[
                  { name: "filters", type: "ReactNode", description: "Filter region — drop one or more DataViewTextFilter / DataViewCheckboxFilter inside." },
                  { name: "bulkSelect", type: "ReactNode", description: "Bulk-select dropdown (typically the BulkSelect component group)." },
                  { name: "actions", type: "ReactNode", description: "Trailing actions (Create button, kebab, ResponsiveActions)." },
                  { name: "toggleGroup", type: "ReactNode", description: "View-toggle (table / card / tree). Use a PF6 ToggleGroup." },
                  { name: "pagination", type: "ReactNode", description: "Pagination component — wire useDataViewPagination output here." },
                  { name: "customLabelGroupContent", type: "ReactNode", description: "Custom filter chips region — overrides the default chip group." },
                  { name: "ouiaId", type: "string", description: "Stable test selector." },
                ]}
              />
              <p style={{ marginTop: 16, marginBottom: 0, color: "var(--gp-color-text-subtle)", fontSize: 14 }}>
                Inherits the rest of <code>ToolbarProps</code> from{" "}
                <code>@patternfly/react-core</code>.
              </p>
            </div>
          </Card>
        </Section>

        <Section title="Patterns">
          <Card>
            <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
              <li><strong>Stack slots in priority order.</strong> Filters and bulk-select are most-used; actions go to the trailing edge; pagination right-most.</li>
              <li><strong>Use the URL-aware hooks</strong> when filters / page should survive a refresh — pass <code>searchParams</code> + <code>setSearchParams</code> from your router.</li>
              <li><strong>Don&rsquo;t hide the toolbar in narrow viewports.</strong> The toolbar already collapses sensibly — let it.</li>
            </ul>
          </Card>
        </Section>
      </FoundationPage>
    );
  },
};
