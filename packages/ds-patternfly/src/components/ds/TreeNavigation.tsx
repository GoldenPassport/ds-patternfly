import { useMemo, type ReactNode } from "react";
import { TreeView, type TreeViewDataItem } from "../base/index.js";

/** One tree node — nest via `children`. */
export interface TreeNode {
  /** Stable id — the value passed to onSelect. */
  id: string;
  /** Display label. */
  name: ReactNode;
  /** Child nodes. */
  children?: TreeNode[];
  /** Optional leading icon (collapsed/leaf). */
  icon?: ReactNode;
  /** Optional expanded-state icon. */
  expandedIcon?: ReactNode;
}

/**
 * TreeNavigation — a controlled hierarchical navigation tree from a nested
 * `data` array. Wraps the base TreeView, mapping your `TreeNode`s to PF's
 * data items and deriving the active item from `selectedId`, so selection is
 * a simple controlled string. Use for file trees, nav hierarchies, faceted
 * category pickers.
 */
export interface TreeNavigationProps {
  /** The tree data (nested). */
  data: TreeNode[];
  /** Currently selected node id (controlled). */
  selectedId?: string;
  /** Fired with the node id when a node is selected. */
  onSelect?: (id: string) => void;
  /** Accessible name for the tree. */
  ariaLabel: string;
  /** Show the search field above the tree. */
  hasSearch?: boolean;
  /** Render selectable checkboxes on each node. */
  hasCheckboxes?: boolean;
  /** Use the guide-line / nested indentation treatment. */
  hasGuides?: boolean;
}

function toDataItem(node: TreeNode): TreeViewDataItem {
  return {
    id: node.id,
    name: node.name,
    ...(node.icon ? { icon: node.icon } : {}),
    ...(node.expandedIcon ? { expandedIcon: node.expandedIcon } : {}),
    ...(node.children
      ? { children: node.children.map(toDataItem) }
      : {}),
  };
}

function findItem(
  items: TreeViewDataItem[],
  id: string,
): TreeViewDataItem | undefined {
  for (const item of items) {
    if (item.id === id) return item;
    if (item.children) {
      const hit = findItem(item.children, id);
      if (hit) return hit;
    }
  }
  return undefined;
}

export function TreeNavigation({
  data,
  selectedId,
  onSelect,
  ariaLabel,
  hasSearch,
  hasCheckboxes,
  hasGuides,
}: TreeNavigationProps) {
  const items = useMemo(() => data.map(toDataItem), [data]);
  const active = useMemo(
    () => (selectedId ? [findItem(items, selectedId)].filter(Boolean) as TreeViewDataItem[] : []),
    [items, selectedId],
  );

  return (
    <TreeView
      data={items}
      aria-label={ariaLabel}
      activeItems={active}
      onSelect={(_e, item) => {
        if (item.id) onSelect?.(item.id);
      }}
      {...(hasSearch ? { hasSearch: true } : {})}
      {...(hasCheckboxes ? { hasCheckboxes: true } : {})}
      {...(hasGuides ? { hasGuides: true } : {})}
    />
  );
}
