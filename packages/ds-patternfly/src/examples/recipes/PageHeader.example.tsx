/**
 * PageHeader recipe — the lib's exported PageHeader: title row + optional
 * icon / status / actions, subtitle, breadcrumb above, tabs below.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useId, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Dropdown,
  DropdownItem,
  DropdownList,
  Label,
  MenuToggle,
  type MenuToggleElement,
  PageHeader,
  Tab,
  Tabs,
  TabTitleText,
} from "../_lib.js";
import { CubesIcon, EllipsisVIcon } from "@patternfly/react-icons";

// #region Basic
export function Basic() {
  return (
    <PageHeader
      title="Workflows"
      subtitle="Manage triggers, runs, and history."
      actions={<Button variant="primary">Create workflow</Button>}
    />
  );
}
// #endregion

// #region FullChrome
export function FullChrome() {
  const [open, setOpen] = useState(false);
  return (
    <PageHeader
      breadcrumb={
        <Breadcrumb aria-label="Workflow breadcrumb">
          <BreadcrumbItem to="#">Workflows</BreadcrumbItem>
          <BreadcrumbItem to="#" isActive>
            Quarterly review
          </BreadcrumbItem>
        </Breadcrumb>
      }
      icon={<CubesIcon style={{ width: 36, height: 36 }} />}
      title="Quarterly review"
      status={<Label color="green">Active</Label>}
      subtitle="Triggered hourly · 4 steps · last run 12 minutes ago"
      actions={
        <Dropdown
          isOpen={open}
          onSelect={() => setOpen(false)}
          onOpenChange={setOpen}
          toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
            <MenuToggle
              ref={toggleRef}
              aria-label="Workflow actions"
              variant="plain"
              onClick={() => setOpen((o) => !o)}
            >
              <EllipsisVIcon />
            </MenuToggle>
          )}
        >
          <DropdownList>
            <DropdownItem>Run now</DropdownItem>
            <DropdownItem>Edit</DropdownItem>
            <DropdownItem>Disable</DropdownItem>
          </DropdownList>
        </Dropdown>
      }
    />
  );
}
// #endregion

// #region WithTabs
export function WithTabs() {
  const id = useId();
  const [activeTabKey, setActiveTabKey] = useState<string | number>(0);
  return (
    <PageHeader
      icon={<CubesIcon style={{ width: 36, height: 36 }} />}
      title="Pod details"
      status={<Label color="green">Running</Label>}
      tabs={
        <Tabs
          activeKey={activeTabKey}
          onSelect={(_e, k) => setActiveTabKey(k)}
          id={`${id}-tabs`}
          component="nav"
          aria-label="Pod navigation tabs"
        >
          <Tab eventKey={0} title={<TabTitleText>Details</TabTitleText>} />
          <Tab eventKey={1} title={<TabTitleText>YAML</TabTitleText>} />
          <Tab eventKey={2} title={<TabTitleText>Events</TabTitleText>} />
        </Tabs>
      }
    >
      <p style={{ margin: 0, color: "var(--gp-color-text-regular)" }}>
        {activeTabKey === 0
          ? "Details panel"
          : activeTabKey === 1
            ? "YAML panel"
            : "Events panel"}
      </p>
    </PageHeader>
  );
}
// #endregion

export default function PageHeaderExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <Basic />
      <FullChrome />
      <WithTabs />
    </div>
  );
}
