/**
 * DataViewToolbar (@patternfly/react-data-view) — the toolbar that sits
 * above a Data view table. Named slots for filters, bulk select, actions,
 * view-toggle group, and pagination — everything is a render-slot, so you
 * stay in control of the inner components.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useId, useState } from "react";
import {
  DataView,
  DataViewToolbar,
  DataViewTextFilter,
  useDataViewPagination,
} from "@patternfly/react-data-view";
import { Button, Pagination } from "@golden-passport/ds-patternfly";

// #region FiltersActionsPagination
export function FiltersActionsPagination() {
  const id = useId();
  const [search, setSearch] = useState("");
  const pagination = useDataViewPagination({ perPage: 20 });
  return (
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
        actions={<Button variant="primary">Create workflow</Button>}
        pagination={
          <Pagination
            itemCount={142}
            page={pagination.page}
            perPage={pagination.perPage}
            onSetPage={pagination.onSetPage}
            onPerPageSelect={pagination.onPerPageSelect}
            widgetId={`${id}-pagination`}
            isCompact
          />
        }
      />
    </DataView>
  );
}
// #endregion

export default function DataViewToolbarExample() {
  return <FiltersActionsPagination />;
}
