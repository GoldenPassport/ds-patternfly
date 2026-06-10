/**
 * Dropdown — a menu of actions opened by a trigger.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useState } from "react";
import type { Ref } from "react";
import {
  Divider,
  Dropdown,
  DropdownGroup,
  DropdownItem,
  DropdownList,
  MenuToggle,
  type MenuToggleElement,
} from "../_lib.js";
import { EllipsisVIcon } from "@patternfly/react-icons";

// #region Basic
export function Basic() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dropdown
      isOpen={isOpen}
      onSelect={() => setIsOpen(false)}
      onOpenChange={setIsOpen}
      ouiaId="BasicDropdown"
      shouldFocusToggleOnSelect
      toggle={(toggleRef: Ref<MenuToggleElement>) => (
        <MenuToggle
          ref={toggleRef}
          onClick={() => setIsOpen((o) => !o)}
          isExpanded={isOpen}
        >
          Actions
        </MenuToggle>
      )}
    >
      <DropdownList>
        <DropdownItem value="run">Run</DropdownItem>
        <DropdownItem value="duplicate">Duplicate</DropdownItem>
        <DropdownItem value="archive" isDisabled>Archive</DropdownItem>
        <Divider component="li" key="sep" />
        <DropdownItem value="delete">Delete</DropdownItem>
      </DropdownList>
    </Dropdown>
  );
}
// #endregion

// #region KebabToggle
export function KebabToggle() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dropdown
      isOpen={isOpen}
      onSelect={() => setIsOpen(false)}
      onOpenChange={setIsOpen}
      shouldFocusToggleOnSelect
      toggle={(toggleRef) => (
        <MenuToggle
          ref={toggleRef}
          aria-label="Row actions"
          variant="plain"
          onClick={() => setIsOpen((o) => !o)}
          isExpanded={isOpen}
          icon={<EllipsisVIcon />}
        />
      )}
    >
      <DropdownList>
        <DropdownItem>Edit</DropdownItem>
        <DropdownItem>Duplicate</DropdownItem>
        <Divider component="li" />
        <DropdownItem>Delete</DropdownItem>
      </DropdownList>
    </Dropdown>
  );
}
// #endregion

// #region Grouped
export function Grouped() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dropdown
      isOpen={isOpen}
      onSelect={() => setIsOpen(false)}
      onOpenChange={setIsOpen}
      shouldFocusToggleOnSelect
      toggle={(toggleRef) => (
        <MenuToggle
          ref={toggleRef}
          onClick={() => setIsOpen((o) => !o)}
          isExpanded={isOpen}
        >
          Quick switch
        </MenuToggle>
      )}
    >
      <DropdownGroup label="Workspaces">
        <DropdownList>
          <DropdownItem>Acme</DropdownItem>
          <DropdownItem>Beta Lab</DropdownItem>
        </DropdownList>
      </DropdownGroup>
      <Divider />
      <DropdownGroup label="Recent runs">
        <DropdownList>
          <DropdownItem>onboarding-flow #1284</DropdownItem>
          <DropdownItem>build-pipeline #1283</DropdownItem>
        </DropdownList>
      </DropdownGroup>
    </Dropdown>
  );
}
// #endregion

// #region WithDescriptions
export function WithDescriptions() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dropdown
      isOpen={isOpen}
      onSelect={() => setIsOpen(false)}
      onOpenChange={setIsOpen}
      toggle={(toggleRef) => (
        <MenuToggle
          ref={toggleRef}
          onClick={() => setIsOpen((o) => !o)}
          isExpanded={isOpen}
        >
          Run options
        </MenuToggle>
      )}
    >
      <DropdownList>
        <DropdownItem description="Use the latest commit on main">
          Run now
        </DropdownItem>
        <DropdownItem description="Trigger after the current run completes">
          Queue run
        </DropdownItem>
        <DropdownItem
          description="Pin to a specific commit"
          isAriaDisabled
          tooltipProps={{ content: "Available on the Pro plan" }}
        >
          Run pinned
        </DropdownItem>
      </DropdownList>
    </Dropdown>
  );
}
// #endregion

export default function DropdownExample() {
  return (
    <div style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "center" }}>
      <Basic />
      <KebabToggle />
      <Grouped />
      <WithDescriptions />
    </div>
  );
}
