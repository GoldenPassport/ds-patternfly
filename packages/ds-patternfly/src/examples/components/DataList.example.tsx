/**
 * DataList — row-based list with structured cells, selection, actions,
 * and per-row expandable detail.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useId, useState } from "react";
import {
  Button,
  DataList,
  DataListAction,
  DataListCell,
  DataListCheck,
  DataListContent,
  DataListItem,
  DataListItemCells,
  DataListItemRow,
  DataListToggle,
} from "../_lib.js";
import { CodeBranchIcon } from "@patternfly/react-icons";

// #region Basic
export function Basic() {
  const id = useId();
  const rows = [
    { id: `${id}-basic-1`, title: "Workflow A", desc: "Triggered hourly · 4 steps" },
    { id: `${id}-basic-2`, title: "Workflow B", desc: "Triggered on push · 2 steps" },
    { id: `${id}-basic-3`, title: "Workflow C", desc: "Triggered manually · 6 steps" },
  ];

  return (
    <DataList aria-label="Basic data list">
      {rows.map((r) => (
        <DataListItem key={r.id} aria-labelledby={r.id}>
          <DataListItemRow>
            <DataListItemCells
              dataListCells={[
                <DataListCell key="title">
                  <span id={r.id}><strong>{r.title}</strong></span>
                </DataListCell>,
                <DataListCell key="desc">{r.desc}</DataListCell>,
              ]}
            />
          </DataListItemRow>
        </DataListItem>
      ))}
    </DataList>
  );
}
// #endregion

// #region CheckboxesAndActions
export function CheckboxesAndActions() {
  const id = useId();
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const rows = [
    { id: `${id}-sel-1`, title: "Build pipeline" },
    { id: `${id}-sel-2`, title: "Test pipeline" },
    { id: `${id}-sel-3`, title: "Deploy pipeline" },
  ];

  return (
    <DataList aria-label="Selectable data list">
      {rows.map((r) => (
        <DataListItem key={r.id} aria-labelledby={r.id}>
          <DataListItemRow>
            <DataListCheck
              aria-labelledby={r.id}
              name={`check-${r.id}`}
              isChecked={!!checked[r.id]}
              onChange={(_e, c) =>
                setChecked((p) => ({ ...p, [r.id]: c }))
              }
            />
            <DataListItemCells
              dataListCells={[
                <DataListCell key="title">
                  <span id={r.id}><strong>{r.title}</strong></span>
                </DataListCell>,
                <DataListCell key="desc">Idle · last run 2h ago</DataListCell>,
              ]}
            />
            <DataListAction
              aria-labelledby={`${r.id} ${r.id}-action`}
              id={`${r.id}-action`}
              aria-label="Actions"
            >
              <Button variant="primary">Run</Button>
              <Button variant="secondary">Logs</Button>
            </DataListAction>
          </DataListItemRow>
        </DataListItem>
      ))}
    </DataList>
  );
}
// #endregion

// #region Expandable
export function Expandable() {
  const id = useId();
  const rows = [
    { id: `${id}-row-1`, title: "Workflow A", body: "Steps: build → test → deploy → notify" },
    { id: `${id}-row-2`, title: "Workflow B", body: "Steps: validate → publish" },
  ];
  const [expanded, setExpanded] = useState<string[]>([`${id}-row-1`]);

  const toggleExpand = (rowId: string) =>
    setExpanded((prev) =>
      prev.includes(rowId) ? prev.filter((p) => p !== rowId) : [...prev, rowId],
    );

  return (
    <DataList aria-label="Expandable data list">
      {rows.map((r) => (
        <DataListItem
          key={r.id}
          aria-labelledby={r.id}
          isExpanded={expanded.includes(r.id)}
        >
          <DataListItemRow>
            <DataListToggle
              onClick={() => toggleExpand(r.id)}
              isExpanded={expanded.includes(r.id)}
              id={`${r.id}-toggle`}
              aria-controls={`${r.id}-content`}
            />
            <DataListItemCells
              dataListCells={[
                <DataListCell isIcon key="icon">
                  <CodeBranchIcon />
                </DataListCell>,
                <DataListCell key="title">
                  <span id={r.id}><strong>{r.title}</strong></span>
                </DataListCell>,
                <DataListCell key="meta">Last run 1h ago</DataListCell>,
              ]}
            />
          </DataListItemRow>
          <DataListContent
            aria-label={`${r.title} details`}
            id={`${r.id}-content`}
            isHidden={!expanded.includes(r.id)}
          >
            <p style={{ margin: 0 }}>{r.body}</p>
          </DataListContent>
        </DataListItem>
      ))}
    </DataList>
  );
}
// #endregion

// #region Compact
export function Compact() {
  const id = useId();

  return (
    <DataList aria-label="Compact data list" isCompact>
      {["Run #1284", "Run #1283", "Run #1282", "Run #1281"].map(
        (t, i) => (
          <DataListItem key={i} aria-labelledby={`${id}-compact-${i}`}>
            <DataListItemRow>
              <DataListItemCells
                dataListCells={[
                  <DataListCell key="t">
                    <span id={`${id}-compact-${i}`}>{t}</span>
                  </DataListCell>,
                  <DataListCell key="d">Succeeded · 1m 42s</DataListCell>,
                ]}
              />
            </DataListItemRow>
          </DataListItem>
        ),
      )}
    </DataList>
  );
}
// #endregion

export default function DataListExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <Basic />
      <CheckboxesAndActions />
      <Expandable />
      <Compact />
    </div>
  );
}
