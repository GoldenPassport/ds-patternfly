/**
 * Maintenance (@patternfly/react-component-groups) — a scheduled-downtime
 * page: title, body, start / end times, time zone, and an optional
 * information link, so the user understands the outage is planned.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import Maintenance from "@patternfly/react-component-groups/dist/dynamic/Maintenance";

// #region Default
export function Default() {
  return (
    <Maintenance
      titleText="Scheduled maintenance"
      bodyText="We're upgrading the workflow engine. Service will be unavailable during the window below."
      startTime="2026-05-10 22:00"
      endTime="2026-05-11 02:00"
      timeZone="UTC"
      redirectLinkUrl="https://status.example.com"
      redirectLinkText="View status page"
    />
  );
}
// #endregion

export default function MaintenanceExample() {
  return <Default />;
}
