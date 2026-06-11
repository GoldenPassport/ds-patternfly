/**
 * MissingPage (@patternfly/react-component-groups) — a standard 404 page:
 * title, body, and a link back home. Wire it up as the catch-all route in
 * your router.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { MissingPage } from "@patternfly/react-component-groups/dist/dynamic/MissingPage";

// #region Default
export function Default() {
  return (
    <MissingPage
      titleText="Page not found"
      bodyText="The page you're looking for doesn't exist or has moved."
      toHomePageUrl="/"
      toHomePageText="Go home"
    />
  );
}
// #endregion

export default function MissingPageExample() {
  return <Default />;
}
