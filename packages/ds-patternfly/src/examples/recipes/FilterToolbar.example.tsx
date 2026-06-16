/**
 * FilterToolbar recipe — the lib's exported filter bar: search + faceted
 * multi-select facets + removable chips + clear-all. Fully controlled.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useState } from "react";
import {
  Button,
  FilterToolbar,
  filterToolbarEnLabels,
  type FilterDef,
} from "@golden-passport/ds-patternfly";

const FILTERS: FilterDef[] = [
  {
    key: "status",
    label: "Status",
    options: [
      { value: "active", label: "Active" },
      { value: "paused", label: "Paused" },
      { value: "failed", label: "Failed" },
    ],
  },
  {
    key: "owner",
    label: "Owner",
    options: [
      { value: "ada", label: "ada" },
      { value: "grace", label: "grace" },
      { value: "linus", label: "linus" },
    ],
  },
];

// #region SearchFacetsChips
export function SearchFacetsChips() {
  const [search, setSearch] = useState("");
  const [values, setValues] = useState<Record<string, string[]>>({});

  return (
    <>
      <FilterToolbar
        labels={filterToolbarEnLabels}
        searchValue={search}
        onSearchChange={setSearch}
        filters={FILTERS}
        values={values}
        onChange={(key, next) => setValues((v) => ({ ...v, [key]: next }))}
        onClearAll={() => {
          setSearch("");
          setValues({});
        }}
        actions={<Button variant="primary">Create</Button>}
      />
      <div style={{ padding: 12, color: "var(--gp-color-text-subtle)", fontSize: 13 }}>
        search=<strong>{search || "—"}</strong>
        {" · "}status=<strong>{(values.status ?? []).join(",") || "any"}</strong>
        {" · "}owner=<strong>{(values.owner ?? []).join(",") || "any"}</strong>
      </div>
    </>
  );
}
// #endregion

export default function FilterToolbarExample() {
  return <SearchFacetsChips />;
}
