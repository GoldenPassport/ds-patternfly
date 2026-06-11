/**
 * UnavailableContent (@patternfly/react-component-groups) — a "something on
 * our side is down" page: a 5xx-style message with a status-page link for
 * backend outages and dependency failures.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import UnavailableContent from "@patternfly/react-component-groups/dist/dynamic/UnavailableContent";

// #region Default
export function Default() {
  return (
    <UnavailableContent
      titleText="This service is temporarily unavailable"
      bodyText="We're investigating an issue. Try again later, or check the status page for updates."
      statusPageUrl="https://status.example.com"
      statusPageLinkText="View status page"
    />
  );
}
// #endregion

export default function UnavailableContentExample() {
  return <Default />;
}
