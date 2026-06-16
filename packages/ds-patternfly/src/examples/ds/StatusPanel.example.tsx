/**
 * StatusPanel — the one lego block for every full-panel "state" screen:
 * empty results, an error, unauthorized access, or maintenance. Pick a
 * `variant` (drives a default icon + accent), set the title/body, and add
 * primary/secondary actions.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { StatusPanel, Button } from "@golden-passport/ds-patternfly";

// #region Empty
export function Empty() {
  return (
    <StatusPanel
      variant="empty"
      title="No workflows yet"
      primaryAction={<Button variant="primary">Create workflow</Button>}
    >
      Workflows you create will show up here. Start with a template or build
      one from scratch.
    </StatusPanel>
  );
}
// #endregion

// #region Error
export function Error() {
  return (
    <StatusPanel
      variant="error"
      title="Couldn't load workflows"
      primaryAction={<Button variant="primary">Retry</Button>}
      secondaryActions={<Button variant="link">View status page</Button>}
    >
      Something went wrong while fetching your workflows. Check your connection
      and try again.
    </StatusPanel>
  );
}
// #endregion

// #region Unauthorized
export function Unauthorized() {
  return (
    <StatusPanel
      variant="unauthorized"
      title="Access denied"
      primaryAction={<Button variant="primary">Sign in</Button>}
    >
      You don't have permission to view this project. Sign in with an account
      that has access, or ask an admin for an invite.
    </StatusPanel>
  );
}
// #endregion

// #region Maintenance
export function Maintenance() {
  return (
    <StatusPanel
      variant="maintenance"
      title="Down for maintenance"
      secondaryActions={<Button variant="link">Check status</Button>}
    >
      We're performing scheduled maintenance and will be back shortly. Thanks
      for your patience.
    </StatusPanel>
  );
}
// #endregion

export default function StatusPanelExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <Empty />
      <Error />
      <Unauthorized />
      <Maintenance />
    </div>
  );
}
