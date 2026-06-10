/**
 * Navigation — vertical or horizontal nav lists with active states,
 * grouping, and nested sections. Renders as <nav> for landmark semantics.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useState } from "react";
import {
  Nav,
  NavExpandable,
  NavGroup,
  NavItem,
  NavList,
} from "../_lib.js";
import {
  CloudIcon,
  CogIcon,
  CubeIcon,
  FolderIcon,
} from "@patternfly/react-icons";

// #region Default
export function Default() {
  const [active, setActive] = useState<string | number>(0);
  return (
    <Nav
      aria-label="Primary"
      ouiaId="PrimaryNav"
      onSelect={(_, r) => setActive(r.itemId)}
      style={{ width: 240 }}
    >
      <NavList>
        {(["dashboard", "tasks", "reports", "settings"] as const).map(
          (id, i) => (
            <NavItem
              key={id}
              preventDefault
              itemId={i}
              to={`#${id}`}
              isActive={active === i}
            >
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </NavItem>
          ),
        )}
      </NavList>
    </Nav>
  );
}
// #endregion

// #region WithIcons
export function WithIcons() {
  const [active, setActive] = useState<string | number>(0);
  return (
    <Nav
      aria-label="Resources"
      ouiaId="ResourcesNav"
      onSelect={(_, r) => setActive(r.itemId)}
      style={{ width: 240 }}
    >
      <NavList>
        <NavItem
          preventDefault
          itemId={0}
          to="#resources"
          isActive={active === 0}
          icon={<CubeIcon />}
        >
          Resources
        </NavItem>
        <NavItem
          preventDefault
          itemId={1}
          to="#projects"
          isActive={active === 1}
          icon={<FolderIcon />}
        >
          Projects
        </NavItem>
        <NavItem
          preventDefault
          itemId={2}
          to="#environments"
          isActive={active === 2}
          icon={<CloudIcon />}
        >
          Environments
        </NavItem>
        <NavItem
          preventDefault
          itemId={3}
          to="#settings"
          isActive={active === 3}
          icon={<CogIcon />}
        >
          Settings
        </NavItem>
      </NavList>
    </Nav>
  );
}
// #endregion

// #region Grouped
export function Grouped() {
  const [active, setActive] = useState<string | number>("workspace_dashboard");
  return (
    <Nav
      aria-label="Grouped"
      onSelect={(_, r) => setActive(r.itemId)}
      style={{ width: 240 }}
    >
      <NavGroup title="Workspace">
        <NavItem
          preventDefault
          itemId="workspace_dashboard"
          to="#wd"
          isActive={active === "workspace_dashboard"}
        >
          Dashboard
        </NavItem>
        <NavItem
          preventDefault
          itemId="workspace_tasks"
          to="#wt"
          isActive={active === "workspace_tasks"}
        >
          Tasks
        </NavItem>
      </NavGroup>
      <NavGroup title="Account">
        <NavItem
          preventDefault
          itemId="account_profile"
          to="#ap"
          isActive={active === "account_profile"}
        >
          Profile
        </NavItem>
        <NavItem
          preventDefault
          itemId="account_billing"
          to="#ab"
          isActive={active === "account_billing"}
        >
          Billing
        </NavItem>
      </NavGroup>
    </Nav>
  );
}
// #endregion

// #region Expandable
export function Expandable() {
  const [active, setActive] = useState<string | number>(
    "settings_notifications",
  );
  return (
    <Nav
      aria-label="Expandable"
      onSelect={(_, r) => setActive(r.itemId)}
      style={{ width: 280 }}
    >
      <NavList>
        <NavItem
          preventDefault
          itemId="dashboard"
          to="#dashboard"
          isActive={active === "dashboard"}
        >
          Dashboard
        </NavItem>
        <NavExpandable title="Settings" groupId="settings" isExpanded>
          <NavItem
            preventDefault
            groupId="settings"
            itemId="settings_general"
            to="#sg"
            isActive={active === "settings_general"}
          >
            General
          </NavItem>
          <NavItem
            preventDefault
            groupId="settings"
            itemId="settings_notifications"
            to="#sn"
            isActive={active === "settings_notifications"}
          >
            Notifications
          </NavItem>
          <NavItem
            preventDefault
            groupId="settings"
            itemId="settings_integrations"
            to="#si"
            isActive={active === "settings_integrations"}
          >
            Integrations
          </NavItem>
        </NavExpandable>
        <NavExpandable title="Admin" groupId="admin">
          <NavItem
            preventDefault
            groupId="admin"
            itemId="admin_users"
            to="#au"
            isActive={active === "admin_users"}
          >
            Users
          </NavItem>
          <NavItem
            preventDefault
            groupId="admin"
            itemId="admin_permissions"
            to="#ap2"
            isActive={active === "admin_permissions"}
          >
            Permissions
          </NavItem>
        </NavExpandable>
      </NavList>
    </Nav>
  );
}
// #endregion

// #region Horizontal
export function Horizontal() {
  const [active, setActive] = useState<string | number>(0);
  return (
    <Nav
      aria-label="Horizontal"
      variant="horizontal"
      onSelect={(_, r) => setActive(r.itemId)}
    >
      <NavList>
        {(["Overview", "Activity", "Members", "Settings"] as const).map(
          (label, i) => (
            <NavItem
              key={label}
              preventDefault
              itemId={i}
              to={`#${label.toLowerCase()}`}
              isActive={active === i}
            >
              {label}
            </NavItem>
          ),
        )}
      </NavList>
    </Nav>
  );
}
// #endregion

// #region BackgroundOpacity
export function BackgroundOpacity() {
  const [active, setActive] = useState<string | number>(0);
  return (
    <Nav
      aria-label="Soft fill"
      onSelect={(_, r) => setActive(r.itemId)}
      style={
        {
          width: 240,
          "--gp-nav-bg-opacity": 0.18,
        } as React.CSSProperties
      }
    >
      <NavList>
        {(["dashboard", "tasks", "reports", "settings"] as const).map(
          (id, i) => (
            <NavItem
              key={id}
              preventDefault
              itemId={i}
              to={`#soft-${id}`}
              isActive={active === i}
            >
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </NavItem>
          ),
        )}
      </NavList>
    </Nav>
  );
}
// #endregion

// #region NakedStyling
export function NakedStyling() {
  const [active, setActive] = useState<string | number>(0);
  return (
    <Nav
      className="gp-nav-naked"
      aria-label="Naked"
      onSelect={(_, r) => setActive(r.itemId)}
      style={{ width: 240 }}
    >
      <NavList>
        {(["dashboard", "tasks", "reports", "settings"] as const).map(
          (id, i) => (
            <NavItem
              key={id}
              preventDefault
              itemId={i}
              to={`#naked-${id}`}
              isActive={active === i}
            >
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </NavItem>
          ),
        )}
      </NavList>
    </Nav>
  );
}
// #endregion

export default function NavigationExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <Default />
      <WithIcons />
      <Grouped />
      <Expandable />
      <Horizontal />
      <BackgroundOpacity />
      <NakedStyling />
    </div>
  );
}
