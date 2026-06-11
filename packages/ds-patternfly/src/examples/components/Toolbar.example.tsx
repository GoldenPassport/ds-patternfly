/**
 * Toolbar — the action / filter row that sits above tables and lists.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useId, useState } from "react";
import {
  Button,
  SearchInput,
  Toolbar,
  ToolbarContent,
  ToolbarFilter,
  ToolbarGroup,
  ToolbarItem,
} from "../_lib.js";
import {
  CloneIcon,
  EditIcon,
  FilterIcon,
  PlusIcon,
  SyncIcon,
} from "@patternfly/react-icons";

// Toolbar ids become DOM ids (they drive the filter-chip group's accessible
// name), so each demo derives its id from useId() — multiple toolbars can
// coexist on one page.

// #region BasicItems
export function BasicItems() {
  const id = useId();
  const [q, setQ] = useState("");

  return (
    <Toolbar id={`${id}-toolbar-basic`} ouiaId="BasicToolbar">
      <ToolbarContent>
        <ToolbarItem>
          <SearchInput
            aria-label="Search items"
            value={q}
            onChange={(_, v) => setQ(v)}
            onClear={() => setQ("")}
          />
        </ToolbarItem>
        <ToolbarItem>
          <Button variant="secondary">Action</Button>
        </ToolbarItem>
        <ToolbarItem variant="separator" />
        <ToolbarItem>
          <Button variant="primary">Action 2</Button>
        </ToolbarItem>
      </ToolbarContent>
    </Toolbar>
  );
}
// #endregion

// #region SearchFilterChips
export function SearchFilterChips() {
  const id = useId();
  const [q, setQ] = useState("");
  const [chips, setChips] = useState(["status: open", "owner: me"]);

  return (
    <Toolbar
      id={`${id}-toolbar-filters`}
      ouiaId="FiltersToolbar"
      clearAllFilters={() => setChips([])}
    >
      <ToolbarContent>
        <ToolbarItem>
          <SearchInput
            placeholder="Search tasks"
            value={q}
            onChange={(_, v) => setQ(v)}
            onClear={() => setQ("")}
            aria-label="Search tasks"
          />
        </ToolbarItem>
        <ToolbarFilter
          labels={chips}
          deleteLabel={(_, label) =>
            setChips(chips.filter((c) => c !== label))
          }
          categoryName="Filters"
        >
          <Button variant="secondary" icon={<FilterIcon />}>
            Filter
          </Button>
        </ToolbarFilter>
        <ToolbarGroup align={{ default: "alignEnd" }}>
          <ToolbarItem>
            <Button variant="primary" icon={<PlusIcon />}>
              Create task
            </Button>
          </ToolbarItem>
        </ToolbarGroup>
      </ToolbarContent>
    </Toolbar>
  );
}
// #endregion

// #region GroupVariants
export function GroupVariants() {
  const id = useId();

  return (
    <Toolbar id={`${id}-toolbar-groups`} ouiaId="GroupsToolbar">
      <ToolbarContent>
        <ToolbarGroup variant="action-group-plain">
          <ToolbarItem>
            <Button variant="plain" aria-label="Edit" icon={<EditIcon />} />
          </ToolbarItem>
          <ToolbarItem>
            <Button variant="plain" aria-label="Clone" icon={<CloneIcon />} />
          </ToolbarItem>
          <ToolbarItem>
            <Button variant="plain" aria-label="Sync" icon={<SyncIcon />} />
          </ToolbarItem>
        </ToolbarGroup>
        <ToolbarItem variant="separator" />
        <ToolbarGroup variant="action-group">
          <ToolbarItem>
            <Button variant="primary">Save</Button>
          </ToolbarItem>
          <ToolbarItem>
            <Button variant="secondary">Cancel</Button>
          </ToolbarItem>
        </ToolbarGroup>
      </ToolbarContent>
    </Toolbar>
  );
}
// #endregion

// #region Sticky
export function Sticky() {
  const id = useId();

  return (
    <div style={{ overflowY: "auto", height: 180 }}>
      <Toolbar
        id={`${id}-toolbar-sticky`}
        ouiaId="StickyToolbar"
        isSticky
        inset={{ default: "insetNone" }}
      >
        <ToolbarContent>
          <ToolbarItem>
            <SearchInput aria-label="Sticky search" />
          </ToolbarItem>
          <ToolbarItem>
            <Button variant="primary">Add</Button>
          </ToolbarItem>
        </ToolbarContent>
      </Toolbar>
      <ul style={{ margin: 0, padding: "8px 16px", color: "var(--gp-color-text-subtle)" }}>
        {Array.from({ length: 30 }).map((_, i) => (
          <li key={i} style={{ padding: "6px 0" }}>
            Row {i + 1}
          </li>
        ))}
      </ul>
    </div>
  );
}
// #endregion

export default function ToolbarExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <BasicItems />
      <SearchFilterChips />
      <GroupVariants />
      <Sticky />
    </div>
  );
}
