/**
 * ResponsiveActions (@patternfly/react-component-groups) — a toolbar action
 * set that collapses into a kebab dropdown below a configurable breakpoint.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import ResponsiveActions from "@patternfly/react-component-groups/dist/dynamic/ResponsiveActions";
import ResponsiveAction from "@patternfly/react-component-groups/dist/dynamic/ResponsiveAction";

// #region PersistentCollapsing
export function PersistentCollapsing() {
  return (
    <ResponsiveActions breakpoint="md">
      <ResponsiveAction isPersistent variant="primary">Run</ResponsiveAction>
      <ResponsiveAction isPersistent variant="secondary">Logs</ResponsiveAction>
      <ResponsiveAction variant="tertiary">Edit</ResponsiveAction>
      <ResponsiveAction variant="tertiary">Disable</ResponsiveAction>
      <ResponsiveAction variant="tertiary">Delete</ResponsiveAction>
    </ResponsiveActions>
  );
}
// #endregion

export default function ResponsiveActionsExample() {
  return <PersistentCollapsing />;
}
