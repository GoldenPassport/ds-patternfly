/**
 * AppHeader — the branded application masthead: an optional sidebar-toggle,
 * a brand/logo slot, and a right-aligned actions slot (search, help, user
 * menu). Composes the base Masthead family; brand styling flows from the
 * dials.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useState } from "react";
import {
  AppHeader,
  appHeaderEnLabels,
  Button,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
} from "@golden-passport/ds-patternfly";
import { BellIcon, OutlinedQuestionCircleIcon } from "@patternfly/react-icons";

// Right-aligned global actions — a couple of plain icon buttons. Each carries
// an aria-label since the glyph alone is not an accessible name.
function HeaderActions() {
  return (
    <Toolbar isFullHeight isStatic>
      <ToolbarContent>
        <ToolbarItem>
          <Button
            variant="plain"
            aria-label="Help"
            icon={<OutlinedQuestionCircleIcon />}
          />
        </ToolbarItem>
        <ToolbarItem>
          <Button
            variant="plain"
            aria-label="Notifications"
            icon={<BellIcon />}
          />
        </ToolbarItem>
      </ToolbarContent>
    </Toolbar>
  );
}

// #region Basic
export function Basic() {
  return (
    <AppHeader
      labels={appHeaderEnLabels}
      brandLogo={<strong>Acme</strong>}
      actions={<HeaderActions />}
    />
  );
}
// #endregion

// #region WithNavToggle
export function WithNavToggle() {
  const [navOpen, setNavOpen] = useState(true);
  return (
    <AppHeader
      labels={appHeaderEnLabels}
      brandLogo={<strong>Acme</strong>}
      actions={<HeaderActions />}
      onToggleNav={() => setNavOpen((open) => !open)}
    />
  );
}
// #endregion

export default function AppHeaderExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <Basic />
      <WithNavToggle />
    </div>
  );
}
