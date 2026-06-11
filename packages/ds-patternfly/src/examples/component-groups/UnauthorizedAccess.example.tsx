/**
 * UnauthorizedAccess (@patternfly/react-component-groups) — a 403 /
 * no-permission page: title, body, return-to-previous and go-to-landing
 * actions for logged-in users who lack access to a screen.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import UnauthorizedAccess from "@patternfly/react-component-groups/dist/dynamic/UnauthorizedAccess";

// #region Default
export function Default() {
  return (
    <UnauthorizedAccess
      serviceName="Workflows"
      bodyText="Your account doesn't have permission to view this section. Contact your administrator if you think this is wrong."
      showReturnButton
      toLandingPageUrl="/"
      toLandingPageText="Go to landing page"
    />
  );
}
// #endregion

export default function UnauthorizedAccessExample() {
  return <Default />;
}
