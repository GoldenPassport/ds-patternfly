/**
 * Application launcher — a grid-style menu of applications (the typical
 * "9-dot" launcher in a masthead), composed from Dropdown + DropdownGroup.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useState } from "react";
import {
  Divider,
  Dropdown,
  DropdownGroup,
  DropdownItem,
  DropdownList,
  MenuToggle,
} from "@golden-passport/ds-patternfly";
import {
  ChartBarIcon,
  CodeBranchIcon,
  CogIcon,
  CubesIcon,
  RocketIcon,
  ServerIcon,
  TableIcon,
  ThIcon,
  UsersIcon,
} from "@patternfly/react-icons";

// #region Demo
export function Demo() {
  const [open, setOpen] = useState(false);

  return (
    <Dropdown
      isOpen={open}
      onSelect={() => setOpen(false)}
      onOpenChange={setOpen}
      popperProps={{ position: "right" }}
      toggle={(toggleRef) => (
        <MenuToggle
          ref={toggleRef}
          aria-label="Application launcher"
          variant="plain"
          onClick={() => setOpen((o) => !o)}
          isExpanded={open}
          icon={<ThIcon />}
        />
      )}
    >
      <DropdownGroup label="Core">
        <DropdownList>
          <DropdownItem icon={<RocketIcon />}>Workflows</DropdownItem>
          <DropdownItem icon={<CodeBranchIcon />}>Pipelines</DropdownItem>
          <DropdownItem icon={<TableIcon />}>Datasets</DropdownItem>
          <DropdownItem icon={<ChartBarIcon />}>Insights</DropdownItem>
        </DropdownList>
      </DropdownGroup>
      <Divider />
      <DropdownGroup label="Admin">
        <DropdownList>
          <DropdownItem icon={<ServerIcon />}>Environments</DropdownItem>
          <DropdownItem icon={<UsersIcon />}>Members</DropdownItem>
          <DropdownItem icon={<CubesIcon />}>Resources</DropdownItem>
          <DropdownItem icon={<CogIcon />}>Settings</DropdownItem>
        </DropdownList>
      </DropdownGroup>
    </Dropdown>
  );
}
// #endregion

export default function ApplicationLauncherExample() {
  return <Demo />;
}
