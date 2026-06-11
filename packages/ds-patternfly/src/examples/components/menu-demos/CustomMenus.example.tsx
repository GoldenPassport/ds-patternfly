/**
 * Custom menus — recipes built on the Menu primitive that don't fit one of
 * the higher-level wrappers (Dropdown, Select): a search-filtered command
 * palette, a menu with a sticky footer, and a grouped scrollable list.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useState } from "react";
import {
  Button,
  Divider,
  Menu,
  MenuContent,
  MenuFooter,
  MenuGroup,
  MenuItem,
  MenuList,
  MenuSearch,
  MenuSearchInput,
  SearchInput,
} from "../../_lib.js";

const allCommands = [
  "Run workflow",
  "Run pipeline",
  "Schedule run",
  "View logs",
  "Edit configuration",
  "Duplicate workflow",
  "Archive workflow",
  "Delete workflow",
];

// #region FilterSearchPalette
export function FilterSearchPalette() {
  const [filter, setFilter] = useState("");
  const filtered = allCommands.filter((i) =>
    i.toLowerCase().includes(filter.toLowerCase()),
  );

  return (
    <Menu style={{ maxWidth: 360 }}>
      <MenuSearch>
        <MenuSearchInput>
          <SearchInput
            placeholder="Type a command…"
            value={filter}
            onChange={(_e, v) => setFilter(v)}
            onClear={() => setFilter("")}
            aria-label="Filter commands"
          />
        </MenuSearchInput>
      </MenuSearch>
      <Divider />
      <MenuContent>
        <MenuList>
          {filtered.length === 0 ? (
            <MenuItem isAriaDisabled>
              No commands match &ldquo;{filter}&rdquo;
            </MenuItem>
          ) : (
            filtered.map((label, i) => (
              <MenuItem key={label} itemId={i}>
                {label}
              </MenuItem>
            ))
          )}
        </MenuList>
      </MenuContent>
    </Menu>
  );
}
// #endregion

// #region WithFooter
export function WithFooter() {
  const [active, setActive] = useState<number | string>(0);

  return (
    <Menu
      activeItemId={active}
      onSelect={(_e, id) => setActive(id ?? 0)}
      style={{ maxWidth: 320 }}
    >
      <MenuContent>
        <MenuList>
          {Array.from({ length: 5 }).map((_, i) => (
            <MenuItem key={i} itemId={i}>
              Recent run #{1284 - i}
            </MenuItem>
          ))}
        </MenuList>
      </MenuContent>
      <Divider />
      <MenuFooter>
        <Button variant="link" isInline>
          View all 137 runs →
        </Button>
      </MenuFooter>
    </Menu>
  );
}
// #endregion

// #region GroupedScrollable
export function GroupedScrollable() {
  return (
    <Menu isScrollable style={{ maxHeight: 240, maxWidth: 320 }}>
      <MenuContent>
        <MenuGroup label="Today">
          <MenuList>
            <MenuItem>Run #1284 — succeeded</MenuItem>
            <MenuItem>Run #1283 — succeeded</MenuItem>
          </MenuList>
        </MenuGroup>
        <Divider />
        <MenuGroup label="Yesterday">
          <MenuList>
            <MenuItem>Run #1282 — failed</MenuItem>
            <MenuItem>Run #1281 — succeeded</MenuItem>
            <MenuItem>Run #1280 — succeeded</MenuItem>
          </MenuList>
        </MenuGroup>
        <Divider />
        <MenuGroup label="Earlier this week">
          <MenuList>
            {Array.from({ length: 8 }).map((_, i) => (
              <MenuItem key={i}>Run #{1279 - i} — succeeded</MenuItem>
            ))}
          </MenuList>
        </MenuGroup>
      </MenuContent>
    </Menu>
  );
}
// #endregion

export default function CustomMenusExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <FilterSearchPalette />
      <WithFooter />
      <GroupedScrollable />
    </div>
  );
}
