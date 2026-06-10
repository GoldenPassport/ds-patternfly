import { useMemo, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Button,
  SearchInput,
  TreeView,
  type TreeViewDataItem,
} from "@golden-passport/ds-patternfly";
import { FolderIcon, FolderOpenIcon } from "@patternfly/react-icons";
import { FoundationPage, Section, Card, CodeBlock } from "../_kit/StoryKit.js";
import { DemoFrame, PropsTable } from "../_kit/DemoKit.js";

const meta: Meta = {
  title: "Components/TreeView",
  parameters: {
    layout: "padded",
    a11y: {
      config: {
        // PF6's TreeView nodes use absolutely-positioned chevrons /
        // checkboxes / search-highlight overlays that confuse axe's
        // bg-detection ("background could not be determined because it
        // is overlapped by another element"). The brand-token contrast
        // is validated independently by tokens.test.ts.
        rules: [{ id: "color-contrast", enabled: false }],
      },
    },
  },
};
export default meta;

const sample: TreeViewDataItem[] = [
  {
    name: "Workspaces",
    id: "ws",
    defaultExpanded: true,
    children: [
      {
        name: "Acme",
        id: "ws-acme",
        children: [
          { name: "Production", id: "ws-acme-prod" },
          { name: "Staging", id: "ws-acme-stage" },
          { name: "Sandbox", id: "ws-acme-sandbox" },
        ],
      },
      {
        name: "Beta Lab",
        id: "ws-beta",
        children: [
          { name: "Production", id: "ws-beta-prod" },
          { name: "Staging", id: "ws-beta-stage" },
        ],
      },
    ],
  },
  {
    name: "Personal",
    id: "personal",
    children: [
      { name: "Drafts", id: "personal-drafts" },
      { name: "Archived", id: "personal-archived" },
    ],
  },
];

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

export const Overview: StoryObj = {
  render: () => {
    const [active, setActive] = useState<TreeViewDataItem[]>([]);
    const [activeIcons, setActiveIcons] = useState<TreeViewDataItem[]>([]);
    const [checked, setChecked] = useState<TreeViewDataItem[]>([]);
    const [activeAction, setActiveAction] = useState<TreeViewDataItem[]>([]);
    const [search, setSearch] = useState("");

    const filtered = useMemo(() => filterTree(sample, search), [search]);

    return (
      <FoundationPage
        title="TreeView"
        intro={
          <>
            A collapsible tree of nodes — file-browser style hierarchical
            navigation. Items can be selected, multi-selected, paired with
            icons, badges, or per-node action menus, and filtered by an
            external search input. Use for nested data: workspaces /
            projects / environments, file trees, taxonomies.
          </>
        }
      >
        <Section
          title="Basic (single-select)"
          description="data is an array of TreeViewDataItem (each with id, name, optional children + defaultExpanded). activeItems carries the selected node; PF6 wires keyboard nav (arrow keys, Home/End, Enter, Space)."
        >
          <Card>
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <DemoFrame>
                <TreeView
                  aria-label="Resource tree"
                  data={sample}
                  activeItems={active}
                  onSelect={(_e, it) => setActive([it])}
                  hasAnimations
                />
              </DemoFrame>
              <CodeBlock>{`const data: TreeViewDataItem[] = [
  {
    name: "Workspaces", id: "ws", defaultExpanded: true,
    children: [
      { name: "Acme", id: "ws-acme",
        children: [{ name: "Production", id: "ws-acme-prod" }] },
    ],
  },
];

const [active, setActive] = useState<TreeViewDataItem[]>([]);

<TreeView
  aria-label="Resource tree"
  data={data}
  activeItems={active}
  onSelect={(_, item) => setActive([item])}
  hasAnimations
/>`}</CodeBlock>
            </div>
          </Card>
        </Section>

        <Section
          title="With icons"
          description="Pass icon / expandedIcon per node — or an icon function for whole-tree consistency. Common pattern: FolderIcon when collapsed, FolderOpenIcon when expanded."
        >
          <Card>
            <div style={{ padding: 24 }}>
              <DemoFrame>
                <TreeView
                  aria-label="Folder tree"
                  data={sample}
                  activeItems={activeIcons}
                  onSelect={(_e, it) => {
                    if (!it.children) setActiveIcons([it]);
                  }}
                  icon={<FolderIcon />}
                  expandedIcon={<FolderOpenIcon />}
                />
              </DemoFrame>
            </div>
          </Card>
        </Section>

        <Section
          title="With checkboxes (multi-select)"
          description="hasCheckboxes turns each node into a tri-state checkbox. PF6 propagates checked state to/from children automatically — partial-check on parents reflects mixed children."
        >
          <Card>
            <div style={{ padding: 24 }}>
              <DemoFrame>
                <TreeView
                  aria-label="Checkbox tree"
                  data={sample}
                  hasCheckboxes
                  onCheck={(_e, _treeItem, _parent) => {
                    // For demo purposes: just toggle the touched item.
                    // In real apps PF6 expects you to manage the full
                    // checked array yourself based on cascade rules.
                    setChecked((prev) =>
                      prev.find((c) => c.id === _treeItem.id)
                        ? prev.filter((c) => c.id !== _treeItem.id)
                        : [...prev, _treeItem],
                    );
                  }}
                  activeItems={checked}
                />
              </DemoFrame>
            </div>
          </Card>
        </Section>

        <Section
          title="With per-node actions"
          description="action on TreeViewDataItem renders a trailing button per node — kebab menus, primary actions, status badges. Combine with hasAnimations for the standard tree animation."
        >
          <Card>
            <div style={{ padding: 24 }}>
              <DemoFrame>
                <TreeView
                  aria-label="Tree with actions"
                  data={sample.map((parent) => ({
                    ...parent,
                    action: (
                      <Button variant="plain" aria-label={`Actions for ${parent.name}`}>
                        ⋮
                      </Button>
                    ),
                  }))}
                  activeItems={activeAction}
                  onSelect={(_e, it) => setActiveAction([it])}
                />
              </DemoFrame>
            </div>
          </Card>
        </Section>

        <Section
          title="With search"
          description="TreeView itself doesn't search — filter the data array yourself and pass the result. Combine with auto-expand on parents whose descendants match so the matching nodes are visible."
        >
          <Card>
            <div style={{ padding: 24, display: "grid", gap: 12 }}>
              <DemoFrame>
                <div style={{ display: "grid", gap: 12 }}>
                  <SearchInput
                    placeholder="Filter…"
                    value={search}
                    onChange={(_e, v) => setSearch(v)}
                    onClear={() => setSearch("")}
                    aria-label="Filter the tree"
                  />
                  <TreeView
                    aria-label="Filtered tree"
                    data={filtered}
                    hasAnimations
                  />
                </div>
              </DemoFrame>
            </div>
          </Card>
        </Section>

        <Section title="Most-used props">
          <Card>
            <div style={{ padding: 24 }}>
              <PropsTable
                rows={[
                  { name: "data", type: "TreeViewDataItem[]", description: "The tree. Each item: { name, id, children?, defaultExpanded?, icon?, expandedIcon?, action?, badgeProps?, hasBadge?, ... }." },
                  { name: "aria-label", type: "string", description: "Required — names the tree region." },
                  { name: "activeItems", type: "TreeViewDataItem[]", description: "Currently active / selected nodes. Pair with onSelect." },
                  { name: "onSelect", type: "(event, item, parent?) => void", description: "Fires when a node is activated. parent is the chain up to root for cascade-aware logic." },
                  { name: "hasCheckboxes", type: "boolean", description: "Tri-state checkbox on every node. Pair with onCheck for cascade selection." },
                  { name: "onCheck", type: "(event, item, parent) => void", description: "Fires when a checkbox toggles. You manage the full checked array." },
                  { name: "icon", type: "ReactNode", description: "Default icon for nodes that don't supply their own." },
                  { name: "expandedIcon", type: "ReactNode", description: "Icon when the node is expanded — typical: FolderOpenIcon." },
                  { name: "hasAnimations", type: "boolean", description: "Slide-in animation on expand/collapse." },
                  { name: "hasGuides", type: "boolean", description: "Render vertical guide lines connecting parent → children." },
                  { name: "hasSelectableNodes", type: "boolean", description: "Separate selection from expansion (clicking the chevron expands; clicking the row selects)." },
                  { name: "useMemo", type: "boolean", description: "Memoise children to avoid re-render storms in large trees." },
                ]}
              />
            </div>
          </Card>
        </Section>

        <Section title="When to use">
          <Card>
            <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
              <li><strong>TreeView</strong> — hierarchical / nested data. File browsers, taxonomies, workspace → project → environment chains, IAM permission trees.</li>
              <li><strong>Nav with NavExpandable</strong> — primary navigation with one or two levels of hierarchy. Don&rsquo;t reach for TreeView when Nav covers the use case.</li>
              <li><strong>Don&rsquo;t use for shallow lists</strong> — a flat or two-level structure reads better as SimpleList / Nav.</li>
            </ul>
          </Card>
        </Section>

        <Section title="Accessibility">
          <Card>
            <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
              <li><strong>aria-label is required</strong> — names the tree as a landmark.</li>
              <li><strong>Keyboard:</strong> Arrow keys move between visible nodes; Right opens / steps into a parent; Left collapses / steps out; Home / End jump to first / last; Enter or Space selects.</li>
              <li><strong>Memoise large trees.</strong> Pass <code>useMemo</code> + memoise the data array — without it every state update re-renders the entire tree.</li>
              <li><strong>Don&rsquo;t auto-expand everything.</strong> The whole tree expanded by default defeats the point — use <code>defaultExpanded</code> only on the root and the chain to the active node.</li>
            </ul>
          </Card>
        </Section>
      </FoundationPage>
    );
  },
};
