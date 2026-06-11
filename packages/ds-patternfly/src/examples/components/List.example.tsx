/**
 * List — a semantic <ul> / <ol> with PF6 styling; prose-flow lists and
 * icon-led item lists.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { List, ListComponent, ListItem, ListVariant, OrderType } from "../_lib.js";
import { BookOpenIcon, DesktopIcon, KeyIcon } from "@patternfly/react-icons";

// #region Unordered
export function Unordered() {
  return (
    <List>
      <ListItem>Authenticate with the API</ListItem>
      <ListItem>Create a workflow definition</ListItem>
      <ListItem>Trigger a run from the dashboard</ListItem>
    </List>
  );
}
// #endregion

// #region Ordered
export function Ordered() {
  return (
    <List component={ListComponent.ol} type={OrderType.number}>
      <ListItem>Authenticate with the API.</ListItem>
      <ListItem>Create a workflow definition.</ListItem>
      <ListItem>Trigger a run from the dashboard.</ListItem>
    </List>
  );
}
// #endregion

// #region Inline
export function Inline() {
  return (
    <List variant={ListVariant.inline}>
      <ListItem>built</ListItem>
      <ListItem>tested</ListItem>
      <ListItem>deployed</ListItem>
      <ListItem>verified</ListItem>
    </List>
  );
}
// #endregion

// #region Plain
export function Plain() {
  return (
    <List isPlain>
      <ListItem>One</ListItem>
      <ListItem>Two</ListItem>
      <ListItem>Three</ListItem>
    </List>
  );
}
// #endregion

// #region WithIcons
export function WithIcons() {
  return (
    <List isPlain>
      <ListItem icon={<BookOpenIcon />}>Read-the-docs onboarding</ListItem>
      <ListItem icon={<KeyIcon />}>API token rotation</ListItem>
      <ListItem icon={<DesktopIcon />}>Workspace dashboard</ListItem>
    </List>
  );
}
// #endregion

// #region WithHorizontalRules
export function WithHorizontalRules() {
  return (
    <List isPlain isBordered>
      <ListItem>v2.4.0 — Workflow retries with exponential back-off.</ListItem>
      <ListItem>v2.3.0 — Schedule windows and cooldowns.</ListItem>
      <ListItem>v2.2.0 — Per-step environment overrides.</ListItem>
    </List>
  );
}
// #endregion

export default function ListExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <Unordered />
      <Ordered />
      <Inline />
      <Plain />
      <WithIcons />
      <WithHorizontalRules />
    </div>
  );
}
