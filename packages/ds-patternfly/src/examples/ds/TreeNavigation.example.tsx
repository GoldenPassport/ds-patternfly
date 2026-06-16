/**
 * TreeNavigation — a controlled hierarchical navigation tree from nested
 * `data`. Selection is a simple controlled node id.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useState } from "react";
import { TreeNavigation, type TreeNode } from "@golden-passport/ds-patternfly";

const TREE: TreeNode[] = [
  {
    id: "workspace",
    name: "Workspace",
    children: [
      {
        id: "integrations",
        name: "Integrations",
        children: [
          { id: "salesforce", name: "Salesforce" },
          { id: "slack", name: "Slack" },
        ],
      },
      {
        id: "pipelines",
        name: "Pipelines",
        children: [
          { id: "nightly", name: "Nightly build" },
          { id: "release", name: "Release" },
        ],
      },
    ],
  },
  { id: "settings", name: "Settings" },
];

// #region Selectable
export function Selectable() {
  const [selected, setSelected] = useState("slack");
  return (
    <div style={{ maxInlineSize: 320 }}>
      <TreeNavigation
        data={TREE}
        ariaLabel="Workspace navigation"
        selectedId={selected}
        onSelect={setSelected}
        hasGuides
      />
      <p style={{ marginBlockStart: 8, color: "var(--gp-color-text-subtle)", fontSize: 13 }}>
        Selected: <strong>{selected}</strong>
      </p>
    </div>
  );
}
// #endregion

// #region WithSearch
export function WithSearch() {
  const [selected, setSelected] = useState("");
  return (
    <div style={{ maxInlineSize: 320 }}>
      <TreeNavigation
        data={TREE}
        ariaLabel="Searchable navigation"
        selectedId={selected}
        onSelect={setSelected}
        hasSearch
      />
    </div>
  );
}
// #endregion

export default function TreeNavigationExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <Selectable />
      <WithSearch />
    </div>
  );
}
