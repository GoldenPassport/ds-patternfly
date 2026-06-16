/**
 * OverflowMenu — toolbar wrapper that collapses items into a kebab menu
 * below a chosen breakpoint.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useState } from "react";
import {
  Button,
  Dropdown,
  DropdownList,
  MenuToggle,
  OverflowMenu,
  OverflowMenuContent,
  OverflowMenuControl,
  OverflowMenuDropdownItem,
  OverflowMenuGroup,
  OverflowMenuItem,
} from "@golden-passport/ds-patternfly";
import { EllipsisVIcon } from "@patternfly/react-icons";

// #region BreakpointCollapse
export function BreakpointCollapse() {
  const [open, setOpen] = useState(false);

  const dropdownItems = [
    <OverflowMenuDropdownItem itemId={0} key="a" isShared>Edit</OverflowMenuDropdownItem>,
    <OverflowMenuDropdownItem itemId={1} key="b" isShared>Duplicate</OverflowMenuDropdownItem>,
    <OverflowMenuDropdownItem itemId={2} key="c" isShared>Archive</OverflowMenuDropdownItem>,
    <OverflowMenuDropdownItem itemId={3} key="d" isShared>Share</OverflowMenuDropdownItem>,
    <OverflowMenuDropdownItem itemId={4} key="e" isShared>Delete</OverflowMenuDropdownItem>,
  ];

  return (
    <OverflowMenu breakpoint="lg">
      <OverflowMenuContent>
        <OverflowMenuItem>
          <Button variant="secondary">Edit</Button>
        </OverflowMenuItem>
        <OverflowMenuItem>
          <Button variant="secondary">Duplicate</Button>
        </OverflowMenuItem>
        <OverflowMenuItem>
          <Button variant="secondary">Share</Button>
        </OverflowMenuItem>
      </OverflowMenuContent>
      <OverflowMenuControl>
        <Dropdown
          isOpen={open}
          onSelect={() => setOpen(false)}
          onOpenChange={setOpen}
          toggle={(toggleRef) => (
            <MenuToggle
              ref={toggleRef}
              aria-label="More actions"
              variant="plain"
              onClick={() => setOpen((o) => !o)}
              isExpanded={open}
              icon={<EllipsisVIcon />}
            />
          )}
        >
          <DropdownList>{dropdownItems}</DropdownList>
        </Dropdown>
      </OverflowMenuControl>
    </OverflowMenu>
  );
}
// #endregion

// #region GroupedPersistent
export function GroupedPersistent() {
  const [groupedOpen, setGroupedOpen] = useState(false);
  return (
    <OverflowMenu breakpoint="lg">
      <OverflowMenuContent>
        <OverflowMenuGroup groupType="button">
          <OverflowMenuItem>
            <Button variant="primary">Run</Button>
          </OverflowMenuItem>
          <OverflowMenuItem>
            <Button variant="secondary">Validate</Button>
          </OverflowMenuItem>
        </OverflowMenuGroup>
      </OverflowMenuContent>
      <OverflowMenuControl hasAdditionalOptions>
        <Dropdown
          isOpen={groupedOpen}
          onSelect={() => setGroupedOpen(false)}
          onOpenChange={setGroupedOpen}
          toggle={(toggleRef) => (
            <MenuToggle
              ref={toggleRef}
              aria-label="More actions"
              variant="plain"
              onClick={() => setGroupedOpen((o) => !o)}
              isExpanded={groupedOpen}
              icon={<EllipsisVIcon />}
            />
          )}
        >
          <DropdownList>
            <OverflowMenuDropdownItem>Audit log</OverflowMenuDropdownItem>
            <OverflowMenuDropdownItem>Export</OverflowMenuDropdownItem>
            <OverflowMenuDropdownItem>Settings</OverflowMenuDropdownItem>
          </DropdownList>
        </Dropdown>
      </OverflowMenuControl>
    </OverflowMenu>
  );
}
// #endregion

export default function OverflowMenuExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <BreakpointCollapse />
      <GroupedPersistent />
    </div>
  );
}
