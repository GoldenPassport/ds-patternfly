/**
 * Masthead — the top bar of an app: left brand region (logo + optional
 * sidebar toggle) and a right region for global actions, search, user
 * menu and notifications. Renders as <header> for landmark semantics.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useId, useState } from "react";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownList,
  Masthead,
  MastheadBrand,
  MastheadContent,
  MastheadLogo,
  MastheadMain,
  MastheadToggle,
  MenuToggle,
  type MenuToggleElement,
  Nav,
  NavItem,
  NavList,
  OverflowMenu,
  OverflowMenuContent,
  OverflowMenuControl,
  OverflowMenuGroup,
  OverflowMenuItem,
  PageToggleButton,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
} from "@golden-passport/ds-patternfly";
import { BellIcon, CogIcon, EllipsisVIcon } from "@patternfly/react-icons";

/**
 * Demo brand mark. Real apps render a PF6 <Brand> pointing at their hosted
 * logo asset; an inline SVG keeps this example asset-free, with the
 * wordmark inheriting the theme's text colour.
 */
function AcmeLogo() {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
      <svg
        viewBox="0 0 40 40"
        width={36}
        height={36}
        aria-hidden="true"
        focusable="false"
      >
        <circle cx="20" cy="20" r="20" fill="#0066cc" />
        <path
          d="M11 28 L20 10 L29 28 M14.5 22 L25.5 22"
          stroke="white"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
      <span
        style={{
          fontSize: 17,
          fontWeight: 700,
          letterSpacing: -0.5,
          color: "var(--gp-color-text-regular)",
        }}
      >
        Acme
      </span>
    </span>
  );
}

// Inline-SVG avatar (Acme brand blue) so the masthead profile menu is
// asset-free. Initials centred via dominant-baseline.
const AVATAR_SRC =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'>` +
      `<circle cx='20' cy='20' r='20' fill='#0066cc'/>` +
      `<text x='20' y='20' text-anchor='middle' dominant-baseline='central' ` +
      `font-family='-apple-system,Segoe UI,sans-serif' font-size='15' ` +
      `font-weight='600' fill='white'>AF</text></svg>`,
  );

// #region BasicMasthead
export function BasicMasthead() {
  const id = useId();
  // The masthead utility icons live in an OverflowMenu that collapses to
  // this kebab dropdown below the breakpoint.
  const [isUtilityKebabOpen, setIsUtilityKebabOpen] = useState(false);
  // Top-right user avatar + profile dropdown.
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <Masthead id={`${id}-masthead`} display={{ default: "inline" }}>
      <MastheadMain>
        <MastheadToggle>
          <PageToggleButton
            isHamburgerButton
            aria-label="Global navigation"
            id={`${id}-toggle`}
          />
        </MastheadToggle>
        <MastheadBrand>
          <MastheadLogo component="a" href="#">
            <AcmeLogo />
          </MastheadLogo>
        </MastheadBrand>
      </MastheadMain>
      <MastheadContent>
        <Toolbar isStatic id={`${id}-toolbar`}>
          <ToolbarContent>
            <ToolbarItem align={{ default: "alignEnd" }}>
              {/* OverflowMenu shows the utility icons inline above md;
                  below md they collapse into the 3-dot kebab dropdown
                  (OverflowMenuControl). */}
              <OverflowMenu breakpoint="md">
                <OverflowMenuContent>
                  <OverflowMenuGroup groupType="icon">
                    <OverflowMenuItem>
                      <Button
                        variant="plain"
                        aria-label="Notifications"
                        icon={<BellIcon />}
                      />
                    </OverflowMenuItem>
                    <OverflowMenuItem>
                      <Button
                        variant="plain"
                        aria-label="Settings"
                        icon={<CogIcon />}
                      />
                    </OverflowMenuItem>
                  </OverflowMenuGroup>
                </OverflowMenuContent>
                <OverflowMenuControl>
                  <Dropdown
                    isOpen={isUtilityKebabOpen}
                    onSelect={() => setIsUtilityKebabOpen(false)}
                    onOpenChange={(open: boolean) =>
                      setIsUtilityKebabOpen(open)
                    }
                    popperProps={{ position: "right" }}
                    toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
                      <MenuToggle
                        ref={toggleRef}
                        aria-label="More actions"
                        variant="plain"
                        isExpanded={isUtilityKebabOpen}
                        onClick={() => setIsUtilityKebabOpen((v) => !v)}
                        icon={<EllipsisVIcon />}
                      />
                    )}
                  >
                    <DropdownList>
                      <DropdownItem icon={<BellIcon />}>
                        Notifications
                      </DropdownItem>
                      <DropdownItem icon={<CogIcon />}>Settings</DropdownItem>
                    </DropdownList>
                  </Dropdown>
                </OverflowMenuControl>
              </OverflowMenu>
            </ToolbarItem>
            {/* Top-right user avatar + profile dropdown. */}
            <ToolbarItem>
              <Dropdown
                isOpen={isUserMenuOpen}
                onSelect={() => setIsUserMenuOpen(false)}
                onOpenChange={(open: boolean) => setIsUserMenuOpen(open)}
                popperProps={{ position: "right" }}
                toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
                  <MenuToggle
                    ref={toggleRef}
                    aria-label="User menu"
                    variant="plain"
                    className="gp-user-menu-toggle"
                    isExpanded={isUserMenuOpen}
                    onClick={() => setIsUserMenuOpen((v) => !v)}
                    icon={
                      // alt="" — the visible name beside it is the
                      // accessible label; a duplicate alt trips axe
                      // image-redundant-alt.
                      <Avatar src={AVATAR_SRC} alt="" size="md" />
                    }
                  >
                    {/* Name hides below the masthead mobile breakpoint →
                        the toggle collapses to just the avatar. */}
                    <span className="gp-masthead-username">
                      Aliyah Frazier
                    </span>
                  </MenuToggle>
                )}
              >
                <DropdownList>
                  <DropdownItem>My profile</DropdownItem>
                  <DropdownItem>User management</DropdownItem>
                  <DropdownItem>Logout</DropdownItem>
                </DropdownList>
              </Dropdown>
            </ToolbarItem>
          </ToolbarContent>
        </Toolbar>
      </MastheadContent>
    </Masthead>
  );
}
// #endregion

// #region StackedMasthead
export function StackedMasthead() {
  const id = useId();

  return (
    <Masthead id={`${id}-masthead`} display={{ default: "stack" }}>
      <MastheadMain>
        <MastheadToggle>
          <PageToggleButton
            isHamburgerButton
            aria-label="Global navigation"
            id={`${id}-toggle`}
          />
        </MastheadToggle>
        <MastheadBrand>
          <MastheadLogo component="a" href="#">
            <AcmeLogo />
          </MastheadLogo>
        </MastheadBrand>
      </MastheadMain>
      <MastheadContent>
        <span style={{ color: "var(--gp-color-text-subtle)" }}>
          Stacked content row
        </span>
      </MastheadContent>
    </Masthead>
  );
}
// #endregion

// Two header-surface treatments for a "unified surface" shell — the flat
// sidebar + content layout where sidebar, content and page all share ONE
// flat background; the only question is how the header meets that body:
//   • "flat"   — the masthead shares the same surface, no divider (seamless).
//   • "lifted" — the masthead floats above the flat body via a 1px bottom
//                border + soft shadow, so the header still reads as
//                distinct chrome.
function UnifiedHeaderVariant({ variant }: { variant: "flat" | "lifted" }) {
  const lifted = variant === "lifted";
  // attribute selectors — useId values contain ":" which breaks #id
  // selectors, but [id="…"] matches them fine
  const id = useId();
  const css = `
    [id="${id}"] {
      background: var(--gp-color-bg-primary-default);
      border: 1px solid var(--gp-color-border-subtle);
      border-radius: 8px;
      overflow: hidden;
    }
    /* Sidebar + content + header all share the one flat surface. */
    [id="${id}"] .pf-v6-c-masthead {
      background: var(--gp-color-bg-primary-default);
      ${
        lifted
          ? `border-block-end: 1px solid var(--gp-color-border-subtle);
             box-shadow: 0 2px 6px rgb(0 0 0 / 0.12);`
          : `border-block-end: none; box-shadow: none;`
      }
    }
  `;
  return (
    <div style={{ display: "grid", gap: 8 }}>
      <span style={{ fontWeight: 600, color: "var(--gp-color-text-regular)" }}>
        {lifted ? "Lifted header" : "Flat header"}
      </span>
      <div id={id}>
        <style dangerouslySetInnerHTML={{ __html: css }} />
        <Masthead id={`${id}-masthead`} display={{ default: "inline" }}>
          <MastheadMain>
            <MastheadBrand>
              <MastheadLogo component="a" href="#">
                <AcmeLogo />
              </MastheadLogo>
            </MastheadBrand>
          </MastheadMain>
          <MastheadContent>
            <span style={{ color: "var(--gp-color-text-subtle)" }}>Actions</span>
          </MastheadContent>
        </Masthead>
        <div style={{ display: "flex", minHeight: 150 }}>
          <div style={{ width: 150, padding: 12 }}>
            <Nav aria-label={`${variant} unified-header demo nav`}>
              <NavList>
                <NavItem itemId={0} isActive>Dashboard</NavItem>
                <NavItem itemId={1}>Workflows</NavItem>
                <NavItem itemId={2}>Reports</NavItem>
              </NavList>
            </Nav>
          </div>
          <div
            style={{
              flex: 1,
              padding: 16,
              color: "var(--gp-color-text-subtle)",
            }}
          >
            Sidebar + content share one flat surface.
          </div>
        </div>
      </div>
    </div>
  );
}

// #region HeaderSurface
export function HeaderSurface() {
  return (
    <div
      style={{
        display: "grid",
        gap: 24,
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      }}
    >
      <UnifiedHeaderVariant variant="flat" />
      <UnifiedHeaderVariant variant="lifted" />
    </div>
  );
}
// #endregion

// #region Inset
export function Inset() {
  const id = useId();

  return (
    <Masthead
      id={`${id}-masthead`}
      display={{ default: "inline" }}
      inset={{ default: "insetSm" }}
    >
      <MastheadMain>
        <MastheadBrand>
          <MastheadLogo component="a" href="#">
            <AcmeLogo />
          </MastheadLogo>
        </MastheadBrand>
      </MastheadMain>
      <MastheadContent>
        <span style={{ color: "var(--gp-color-text-subtle)" }}>
          inset=&quot;insetSm&quot;
        </span>
      </MastheadContent>
    </Masthead>
  );
}
// #endregion

export default function MastheadExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <BasicMasthead />
      <StackedMasthead />
      <HeaderSurface />
      <Inset />
    </div>
  );
}
