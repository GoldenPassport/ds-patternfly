/**
 * Actions pattern — primary / secondary / danger button hierarchies and
 * overflow rules for pages, rows, and toolbars.
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
  DropdownItem,
  DropdownList,
  MenuToggle,
  type MenuToggleElement,
} from "@golden-passport/ds-patternfly";
import { EllipsisVIcon } from "@patternfly/react-icons";

// #region PrimaryAndSecondary
export function PrimaryAndSecondary() {
  return (
    <div style={{ display: "flex", gap: 8 }}>
      <Button variant="primary">Save</Button>
      <Button variant="secondary">Save as draft</Button>
      <Button variant="link">Cancel</Button>
    </div>
  );
}
// #endregion

// #region DestructiveAction
export function DestructiveAction() {
  return (
    <div style={{ display: "flex", gap: 8 }}>
      <Button variant="danger">Delete</Button>
      <Button variant="secondary">Cancel</Button>
    </div>
  );
}
// #endregion

// #region PrimaryAndOverflow
export function PrimaryAndOverflow() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ display: "flex", gap: 8 }}>
      <Button variant="primary">Run</Button>
      <Dropdown
        isOpen={open}
        onSelect={() => setOpen(false)}
        onOpenChange={setOpen}
        toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
          <MenuToggle
            ref={toggleRef}
            aria-label="More actions"
            variant="plain"
            onClick={() => setOpen((o) => !o)}
          >
            <EllipsisVIcon />
          </MenuToggle>
        )}
      >
        <DropdownList>
          <DropdownItem>Edit configuration</DropdownItem>
          <DropdownItem>View logs</DropdownItem>
          <DropdownItem>Clone</DropdownItem>
          <DropdownItem isDanger>Delete</DropdownItem>
        </DropdownList>
      </Dropdown>
    </div>
  );
}
// #endregion

export default function ActionsExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <PrimaryAndSecondary />
      <DestructiveAction />
      <PrimaryAndOverflow />
    </div>
  );
}
