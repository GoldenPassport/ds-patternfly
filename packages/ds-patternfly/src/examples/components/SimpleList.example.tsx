/**
 * SimpleList — a single-select list of items: in-page navigation lists,
 * picker menus inside Drawers / Popovers, and side-rail selectors.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useId, useState } from "react";
import { SimpleList, SimpleListGroup, SimpleListItem } from "@golden-passport/ds-patternfly";

// #region Basic
export function Basic() {
  const [active, setActive] = useState<number>(0);
  return (
    <SimpleList
      aria-label="Workspace picker"
      onSelect={(_e, item) => {
        const idx = Number(
          (item as { props: { itemId?: number } }).props.itemId,
        );
        if (!Number.isNaN(idx)) setActive(idx);
      }}
    >
      {["Acme", "Beta Lab", "Globex", "Initech"].map((w, i) => (
        <SimpleListItem
          key={w}
          itemId={i}
          isActive={active === i}
        >
          {w}
        </SimpleListItem>
      ))}
    </SimpleList>
  );
}
// #endregion

// #region Grouped
export function Grouped() {
  const id = useId();
  return (
    <SimpleList aria-label="Grouped pickers">
      <SimpleListGroup title="Recent" id={`${id}-recent-group`}>
        <SimpleListItem isActive>Acme</SimpleListItem>
        <SimpleListItem>Beta Lab</SimpleListItem>
      </SimpleListGroup>
      <SimpleListGroup title="All workspaces" id={`${id}-all-group`}>
        <SimpleListItem>Globex</SimpleListItem>
        <SimpleListItem>Initech</SimpleListItem>
        <SimpleListItem>Massive Dynamic</SimpleListItem>
      </SimpleListGroup>
    </SimpleList>
  );
}
// #endregion

// #region Links
export function Links() {
  return (
    <SimpleList aria-label="Documentation links">
      <SimpleListItem component="a" href="#getting-started">
        Getting started
      </SimpleListItem>
      <SimpleListItem component="a" href="#workflows">
        Building workflows
      </SimpleListItem>
      <SimpleListItem component="a" href="#triggers">
        Triggers reference
      </SimpleListItem>
    </SimpleList>
  );
}
// #endregion

export default function SimpleListExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <Basic />
      <Grouped />
      <Links />
    </div>
  );
}
