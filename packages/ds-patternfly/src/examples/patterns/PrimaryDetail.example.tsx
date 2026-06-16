/**
 * Primary-detail pattern — the lib's exported PrimaryDetailLayout: a list
 * pane on the leading edge, a detail pane on the trailing edge, collapsing
 * to a single column with a "back to list" affordance below md.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useState } from "react";
import { PrimaryDetailLayout } from "@golden-passport/ds-patternfly";

type Instance = { id: string; name: string; subtitle: string; body: string };

const INSTANCES: Instance[] = [
  {
    id: "pi-1",
    name: "Quarterly review",
    subtitle: "Hourly · 4 steps",
    body: "Aggregates the quarter's workflow runs and posts a summary to the reporting channel. Last run completed 12 minutes ago.",
  },
  {
    id: "pi-2",
    name: "Nightly build",
    subtitle: "On push · 6 steps",
    body: "Builds, tests, and publishes the nightly artifact. Triggered by pushes to the main branch.",
  },
  {
    id: "pi-3",
    name: "Backup pipeline",
    subtitle: "Daily · 3 steps",
    body: "Snapshots the primary database and replicates it to the secondary region. Currently paused for maintenance.",
  },
];

// #region ListAndDetail
export function ListAndDetail() {
  const [selected, setSelected] = useState<string | null>("pi-1");

  return (
    <PrimaryDetailLayout
      items={INSTANCES}
      getItemId={(it) => it.id}
      selectedId={selected}
      onSelect={setSelected}
      renderListItem={(it) => (
        <span style={{ display: "grid", gap: 2 }}>
          <strong>{it.name}</strong>
          <span style={{ fontSize: 13 }}>{it.subtitle}</span>
        </span>
      )}
      renderDetail={(it) => (
        <div style={{ padding: "var(--gp-space-md, 16px)" }}>
          <h2 style={{ marginTop: 0 }}>{it.name}</h2>
          <p style={{ color: "var(--gp-color-text-subtle)" }}>{it.subtitle}</p>
          <p>{it.body}</p>
        </div>
      )}
      labels={{
        listAriaLabel: "Process instances",
        detailAriaLabel: "Process instance details",
        backToList: "Back to list",
        emptyDetailTitle: "Select an item",
        emptyDetailBody: "Pick a process instance to see its details.",
      }}
    />
  );
}
// #endregion

export default function PrimaryDetailExample() {
  return <ListAndDetail />;
}
