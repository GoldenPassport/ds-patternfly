/**
 * SkeletonTable (@patternfly/react-component-groups) — a pre-built skeleton
 * placeholder for tables: same structure as the real Table, with shimmering
 * bars instead of data, so the layout doesn't shift when rows arrive.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import SkeletonTable from "@patternfly/react-component-groups/dist/dynamic/SkeletonTable";

// #region Default
export function Default() {
  return (
    <SkeletonTable
      rowsCount={6}
      columns={["Name", "Status", "Owner", "Last run"]}
    />
  );
}
// #endregion

// #region SelectableExpandable
export function SelectableExpandable() {
  return (
    <SkeletonTable
      rowsCount={4}
      isSelectable
      isExpandable
      columns={["Name", "Status", "Owner", "Last run"]}
    />
  );
}
// #endregion

export default function SkeletonTableExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <Default />
      <SelectableExpandable />
    </div>
  );
}
