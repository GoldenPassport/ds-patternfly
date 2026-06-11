/**
 * DataTable — a declarative table over `columns` + `rows`, with optional
 * toolbar and pagination slots and built-in loading / empty states. You bring
 * the data and the column renderers; DataTable composes the base Table family.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useId, useState } from "react";
import {
  DataTable,
  Label,
  Pagination,
  SearchInput,
  StatusPanel,
  type DataTableColumn,
} from "../_lib.js";

type Service = {
  id: string;
  name: string;
  owner: string;
  status: "Healthy" | "Degraded" | "Down";
  region: string;
};

const SERVICES: Service[] = [
  { id: "svc-1", name: "Auth API", owner: "Platform", status: "Healthy", region: "us-east-1" },
  { id: "svc-2", name: "Billing", owner: "Payments", status: "Degraded", region: "us-east-1" },
  { id: "svc-3", name: "Search", owner: "Discovery", status: "Healthy", region: "eu-west-1" },
  { id: "svc-4", name: "Notifications", owner: "Growth", status: "Down", region: "us-west-2" },
  { id: "svc-5", name: "Media CDN", owner: "Platform", status: "Healthy", region: "eu-west-1" },
  { id: "svc-6", name: "Analytics", owner: "Data", status: "Degraded", region: "us-east-1" },
];

const STATUS_COLOR = {
  Healthy: "green",
  Degraded: "yellow",
  Down: "red",
} as const;

const columns: DataTableColumn<Service>[] = [
  { key: "name", header: "Service", cell: (r) => r.name },
  { key: "owner", header: "Owner", cell: (r) => r.owner },
  {
    key: "status",
    header: "Status",
    cell: (r) => <Label color={STATUS_COLOR[r.status]}>{r.status}</Label>,
  },
  { key: "region", header: "Region", cell: (r) => r.region },
];

// #region BasicTable
export function BasicTable() {
  return (
    <DataTable
      ariaLabel="Services"
      columns={columns}
      rows={SERVICES}
      getRowKey={(r) => r.id}
    />
  );
}
// #endregion

// #region WithToolbarAndPagination
export function WithToolbarAndPagination() {
  const id = useId();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const filtered = SERVICES.filter((r) =>
    `${r.name} ${r.owner} ${r.region}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );
  const start = (page - 1) * perPage;
  const pageRows = filtered.slice(start, start + perPage);

  return (
    <DataTable
      ariaLabel="Services"
      columns={columns}
      rows={pageRows}
      getRowKey={(r) => r.id}
      toolbar={
        <SearchInput
          aria-label="Search services"
          placeholder="Search services"
          value={search}
          onChange={(_e, v) => {
            setSearch(v);
            setPage(1);
          }}
          onClear={() => {
            setSearch("");
            setPage(1);
          }}
        />
      }
      pagination={
        <Pagination
          titles={{ paginationAriaLabel: `${id}-pagination-top` }}
          itemCount={filtered.length}
          page={page}
          perPage={perPage}
          onSetPage={(_e, p) => setPage(p)}
          onPerPageSelect={(_e, pp) => {
            setPerPage(pp);
            setPage(1);
          }}
          isCompact
        />
      }
      footerPagination={
        <Pagination
          titles={{ paginationAriaLabel: `${id}-pagination-bottom` }}
          itemCount={filtered.length}
          page={page}
          perPage={perPage}
          onSetPage={(_e, p) => setPage(p)}
          onPerPageSelect={(_e, pp) => {
            setPerPage(pp);
            setPage(1);
          }}
          variant="bottom"
        />
      }
      emptyState={
        <StatusPanel variant="empty" title="No matching services" size="sm">
          No services match “{search}”. Try a different search.
        </StatusPanel>
      }
    />
  );
}
// #endregion

export default function DataTableExample() {
  return (
    <div style={{ display: "grid", gap: 32 }}>
      <BasicTable />
      <WithToolbarAndPagination />
    </div>
  );
}
