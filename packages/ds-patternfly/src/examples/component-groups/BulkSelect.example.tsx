/**
 * BulkSelect (@patternfly/react-component-groups) — a toolbar dropdown for
 * selecting all items, none, or just the current page above a paginated
 * selectable list / table.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useState } from "react";
import BulkSelect, { BulkSelectValue } from "@patternfly/react-component-groups/dist/dynamic/BulkSelect";

const TOTAL = 523;
const PAGE = 20;

// #region PaginatedList
export function PaginatedList() {
  const [selected, setSelected] = useState(0);
  const pageSelected = selected >= PAGE;
  const pagePartial = selected > 0 && selected < PAGE;

  const onSelect = (v: BulkSelectValue) => {
    switch (v) {
      case "all":      return setSelected(TOTAL);
      case "none":     return setSelected(0);
      case "page":     return setSelected(PAGE);
      case "nonePage": return setSelected(0);
    }
  };

  return (
    <BulkSelect
      isDataPaginated
      canSelectAll
      pageCount={PAGE}
      selectedCount={selected}
      totalCount={TOTAL}
      pageSelected={pageSelected}
      pagePartiallySelected={pagePartial}
      onSelect={onSelect}
    />
  );
}
// #endregion

export default function BulkSelectExample() {
  return <PaginatedList />;
}
