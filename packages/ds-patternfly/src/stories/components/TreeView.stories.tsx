import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  FoundationPage,
  Section,
  Card,
  ConfigurationSection,
  Example,
} from "../_kit/StoryKit.js";
import {
  Basic,
  WithIcons,
  WithCheckboxes,
  WithActions,
  WithSearch,
} from "../../examples/components/TreeView.example.js";
import treeViewExampleSrc from "../../examples/components/TreeView.example.tsx?raw";
import treeViewComponentSrc from "../../components/base/TreeView.tsx?raw";

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

export const Overview: StoryObj = {
  render: () => (
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
          <Example
            source={treeViewExampleSrc}
            region="Basic"
            fileName="TreeView.example.tsx"
          >
            <Basic />
          </Example>
        </Card>
      </Section>

      <Section
        title="With icons"
        description="Pass icon / expandedIcon per node — or an icon function for whole-tree consistency. Common pattern: FolderIcon when collapsed, FolderOpenIcon when expanded."
      >
        <Card>
          <Example
            source={treeViewExampleSrc}
            region="WithIcons"
            fileName="TreeView.example.tsx"
          >
            <WithIcons />
          </Example>
        </Card>
      </Section>

      <Section
        title="With checkboxes (multi-select)"
        description="hasCheckboxes turns each node into a tri-state checkbox. PF6 propagates checked state to/from children automatically — partial-check on parents reflects mixed children."
      >
        <Card>
          <Example
            source={treeViewExampleSrc}
            region="WithCheckboxes"
            fileName="TreeView.example.tsx"
          >
            <WithCheckboxes />
          </Example>
        </Card>
      </Section>

      <Section
        title="With per-node actions"
        description="action on TreeViewDataItem renders a trailing button per node — kebab menus, primary actions, status badges. Combine with hasAnimations for the standard tree animation."
      >
        <Card>
          <Example
            source={treeViewExampleSrc}
            region="WithActions"
            fileName="TreeView.example.tsx"
          >
            <WithActions />
          </Example>
        </Card>
      </Section>

      <Section
        title="With search"
        description="TreeView itself doesn't search — filter the data array yourself and pass the result. Combine with auto-expand on parents whose descendants match so the matching nodes are visible."
      >
        <Card>
          <Example
            source={treeViewExampleSrc}
            region="WithSearch"
            fileName="TreeView.example.tsx"
          >
            <WithSearch />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example source={treeViewExampleSrc} fileName="TreeView.example.tsx" />
        </Card>
      </Section>

      <ConfigurationSection
        importStatement={'import { TreeView, type TreeViewDataItem } from "@golden-passport/ds-patternfly";'}
        componentSource={treeViewComponentSrc}
        componentFileName="TreeView.tsx"
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
  ),
};
