/**
 * Dropdown — a menu of actions opened by a trigger. The exported MenuButton
 * owns the open state, the toggle, and the close-on-select wiring; you pass
 * `items` (actions, "divider", or { group, items }) and an optional onSelect.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { MenuButton, type MenuButtonItem } from "@golden-passport/ds-patternfly";
import { EllipsisVIcon } from "@patternfly/react-icons";

// #region Basic
export function Basic() {
  const items: MenuButtonItem[] = [
    { id: "run", label: "Run" },
    { id: "duplicate", label: "Duplicate" },
    { id: "archive", label: "Archive", isDisabled: true },
    "divider",
    { id: "delete", label: "Delete" },
  ];
  return <MenuButton label="Actions" items={items} />;
}
// #endregion

// #region KebabToggle
export function KebabToggle() {
  const items: MenuButtonItem[] = [
    { id: "edit", label: "Edit" },
    { id: "duplicate", label: "Duplicate" },
    "divider",
    { id: "delete", label: "Delete" },
  ];
  return (
    <MenuButton
      icon={<EllipsisVIcon />}
      toggleVariant="plain"
      ariaLabel="Row actions"
      items={items}
    />
  );
}
// #endregion

// #region Grouped
export function Grouped() {
  const items: MenuButtonItem[] = [
    {
      group: "Workspaces",
      items: [
        { id: "acme", label: "Acme" },
        { id: "beta", label: "Beta Lab" },
      ],
    },
    "divider",
    {
      group: "Recent runs",
      items: [
        { id: "r1284", label: "onboarding-flow #1284" },
        { id: "r1283", label: "build-pipeline #1283" },
      ],
    },
  ];
  return <MenuButton label="Quick switch" items={items} />;
}
// #endregion

// #region WithDescriptions
export function WithDescriptions() {
  const items: MenuButtonItem[] = [
    { id: "now", label: "Run now", description: "Use the latest commit on main" },
    { id: "queue", label: "Queue run", description: "Trigger after the current run completes" },
    { id: "pinned", label: "Run pinned", description: "Pin to a specific commit", isDisabled: true },
  ];
  return <MenuButton label="Run options" items={items} />;
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
