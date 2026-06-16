/**
 * TreeView — collapsible, file-browser style hierarchical navigation.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useId, useMemo, useState } from "react";
import {
  Button,
  SearchInput,
  TreeView,
  type TreeViewDataItem,
} from "@golden-passport/ds-patternfly";
import { FolderIcon, FolderOpenIcon } from "@patternfly/react-icons";

// Sample tree. TreeViewDataItem ids become DOM ids, so each demo prefixes
// them with a useId() value — multiple trees can coexist on one page.
function makeSample(prefix: string): TreeViewDataItem[] {
  return [
    {
      name: "Workspaces",
      id: `${prefix}-ws`,
      defaultExpanded: true,
      children: [
        {
          name: "Acme",
          id: `${prefix}-ws-acme`,
          children: [
            { name: "Production", id: `${prefix}-ws-acme-prod` },
            { name: "Staging", id: `${prefix}-ws-acme-stage` },
            { name: "Sandbox", id: `${prefix}-ws-acme-sandbox` },
          ],
        },
        {
          name: "Beta Lab",
          id: `${prefix}-ws-beta`,
          children: [
            { name: "Production", id: `${prefix}-ws-beta-prod` },
            { name: "Staging", id: `${prefix}-ws-beta-stage` },
          ],
        },
      ],
    },
    {
      name: "Personal",
      id: `${prefix}-personal`,
      children: [
        { name: "Drafts", id: `${prefix}-personal-drafts` },
        { name: "Archived", id: `${prefix}-personal-archived` },
      ],
    },
  ];
}

// Helper: filter the tree by name (returns only matching subtrees)
function filterTree(items: TreeViewDataItem[], q: string): TreeViewDataItem[] {
  if (!q) return items;
  const ql = q.toLowerCase();
  const visit = (it: TreeViewDataItem): TreeViewDataItem | null => {
    const childMatches = (it.children || [])
      .map(visit)
      .filter((c): c is TreeViewDataItem => c !== null);
    const selfMatch = it.name?.toString().toLowerCase().includes(ql);
    if (selfMatch || childMatches.length > 0) {
      const next: TreeViewDataItem = { ...it, defaultExpanded: childMatches.length > 0 };
      if (childMatches.length > 0) next.children = childMatches;
      else if (it.children) next.children = it.children;
      return next;
    }
    return null;
  };
  return items.map(visit).filter((c): c is TreeViewDataItem => c !== null);
}

// #region Basic
export function Basic() {
  const treeId = useId();
  const data = useMemo(() => makeSample(treeId), [treeId]);
  const [active, setActive] = useState<TreeViewDataItem[]>([]);

  return (
    <TreeView
      aria-label="Resource tree"
      data={data}
      activeItems={active}
      onSelect={(_e, it) => setActive([it])}
      hasAnimations
    />
  );
}
// #endregion

// #region WithIcons
export function WithIcons() {
  const treeId = useId();
  const data = useMemo(() => makeSample(treeId), [treeId]);
  const [active, setActive] = useState<TreeViewDataItem[]>([]);

  return (
    <TreeView
      aria-label="Folder tree"
      data={data}
      activeItems={active}
      onSelect={(_e, it) => {
        if (!it.children) setActive([it]);
      }}
      icon={<FolderIcon />}
      expandedIcon={<FolderOpenIcon />}
    />
  );
}
// #endregion

// #region WithCheckboxes
export function WithCheckboxes() {
  const treeId = useId();
  const data = useMemo(() => makeSample(treeId), [treeId]);
  const [checked, setChecked] = useState<TreeViewDataItem[]>([]);

  return (
    <TreeView
      aria-label="Checkbox tree"
      data={data}
      hasCheckboxes
      onCheck={(_e, treeItem) => {
        // For demo purposes: just toggle the touched item. In real apps
        // PF6 expects you to manage the full checked array yourself based
        // on cascade rules.
        setChecked((prev) =>
          prev.find((c) => c.id === treeItem.id)
            ? prev.filter((c) => c.id !== treeItem.id)
            : [...prev, treeItem],
        );
      }}
      activeItems={checked}
    />
  );
}
// #endregion

// #region WithActions
export function WithActions() {
  const treeId = useId();
  const data = useMemo(
    () =>
      makeSample(treeId).map((parent) => ({
        ...parent,
        action: (
          <Button variant="plain" aria-label={`Actions for ${parent.name}`}>
            ⋮
          </Button>
        ),
      })),
    [treeId],
  );
  const [active, setActive] = useState<TreeViewDataItem[]>([]);

  return (
    <TreeView
      aria-label="Tree with actions"
      data={data}
      activeItems={active}
      onSelect={(_e, it) => setActive([it])}
    />
  );
}
// #endregion

// #region WithSearch
export function WithSearch() {
  const treeId = useId();
  const sample = useMemo(() => makeSample(treeId), [treeId]);
  const [search, setSearch] = useState("");
  const filtered = useMemo(() => filterTree(sample, search), [sample, search]);

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <SearchInput
        placeholder="Filter…"
        value={search}
        onChange={(_e, v) => setSearch(v)}
        onClear={() => setSearch("")}
        aria-label="Filter the tree"
      />
      <TreeView aria-label="Filtered tree" data={filtered} hasAnimations />
    </div>
  );
}
// #endregion

export default function TreeViewExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <Basic />
      <WithIcons />
      <WithCheckboxes />
      <WithActions />
      <WithSearch />
    </div>
  );
}
