/**
 * EmptyStatePanel — the "nothing here yet" panel: icon + title + body + a
 * primary call-to-action that gets the user started.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { Button, EmptyStatePanel } from "../_lib.js";
import SearchIcon from "@patternfly/react-icons/dist/esm/icons/search-icon";

// #region FirstRun
export function FirstRun() {
  return (
    <EmptyStatePanel
      title="No workflows yet"
      primaryAction={<Button variant="primary">Create workflow</Button>}
      secondaryActions={<Button variant="link">Import from template</Button>}
    >
      Workflows you create will show up here. Start from a template or build
      one from scratch.
    </EmptyStatePanel>
  );
}
// #endregion

// #region NoResults
export function NoResults() {
  return (
    <EmptyStatePanel
      icon={SearchIcon}
      title="No matching results"
      size="sm"
      primaryAction={<Button variant="link">Clear filters</Button>}
    >
      No items match your search. Try a broader query or clear the filters.
    </EmptyStatePanel>
  );
}
// #endregion

export default function EmptyStatePanelExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <FirstRun />
      <NoResults />
    </div>
  );
}
