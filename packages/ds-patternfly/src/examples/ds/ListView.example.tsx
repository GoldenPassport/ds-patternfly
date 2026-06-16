/**
 * ListView — a selectable list of rows (title / description / content /
 * actions) from an `items` array, the richer sibling of SimpleList.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useState } from "react";
import {
  Button,
  Label,
  ListView,
  StatusPanel,
  type ListViewItem,
} from "@golden-passport/ds-patternfly";

const ITEMS: ListViewItem[] = [
  {
    id: "wf-1",
    title: "Quarterly review",
    description: "Hourly · 4 steps",
    content: <Label color="green" isCompact>Active</Label>,
    actions: <Button variant="secondary">Run</Button>,
  },
  {
    id: "wf-2",
    title: "Nightly build",
    description: "On push · 6 steps",
    content: <Label color="green" isCompact>Active</Label>,
    actions: <Button variant="secondary">Run</Button>,
  },
  {
    id: "wf-3",
    title: "Backup pipeline",
    description: "Daily · 3 steps",
    content: <Label color="grey" isCompact>Paused</Label>,
    actions: <Button variant="secondary">Run</Button>,
  },
];

// #region Selectable
export function Selectable() {
  const [selected, setSelected] = useState("wf-1");
  return (
    <ListView
      items={ITEMS}
      ariaLabel="Workflows"
      selectedId={selected}
      onSelect={setSelected}
    />
  );
}
// #endregion

// #region Empty
export function Empty() {
  return (
    <ListView
      items={[]}
      ariaLabel="Empty workflows"
      emptyState={
        <StatusPanel
          variant="empty"
          title="No workflows yet"
          size="sm"
          primaryAction={<Button variant="primary">Create workflow</Button>}
        >
          Workflows you create will show up here.
        </StatusPanel>
      }
    />
  );
}
// #endregion

export default function ListViewExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <Selectable />
      <Empty />
    </div>
  );
}
