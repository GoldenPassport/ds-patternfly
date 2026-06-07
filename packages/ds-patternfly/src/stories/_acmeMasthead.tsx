import { useState } from "react";
import {
  Avatar,
  Button,
  ButtonVariant,
  Divider,
  Dropdown,
  DropdownGroup,
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
  NotificationBadge,
  NotificationBadgeVariant,
  PageToggleButton,
  Toolbar,
  ToolbarContent,
  ToolbarGroup,
  ToolbarItem,
} from "@patternfly/react-core";
import EllipsisVIcon from "@patternfly/react-icons/dist/esm/icons/ellipsis-v-icon";
import QuestionCircleIcon from "@patternfly/react-icons/dist/esm/icons/question-circle-icon";
import { AcmeLogo } from "./_acmeLogo.js";

// Inline-SVG avatar (Acme brand blue) so the masthead profile menu is
// asset-free.
const AVATAR_SRC =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'>` +
      `<circle cx='20' cy='20' r='20' fill='#0066cc'/>` +
      `<text x='20' y='20' text-anchor='middle' dominant-baseline='central' ` +
      `font-family='-apple-system,Segoe UI,sans-serif' font-size='15' ` +
      `font-weight='600' fill='white'>NU</text></svg>`,
  );

/**
 * ACME-branded replacement for PF6's demo `DashboardHeader`. Same anatomy —
 * hamburger toggle + brand on the left, utility actions + user dropdown on
 * the right — but the brand is the Acme wordmark (theme-aware) instead of
 * the PatternFly logo. Pass to `DashboardWrapper`'s `masthead` prop so the
 * primary-detail demos read as an Acme app.
 */
export function AcmeDashboardMasthead() {
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [isKebabOpen, setIsKebabOpen] = useState(false);

  const userItems = (
    <>
      <DropdownItem key="profile">My profile</DropdownItem>
      <DropdownItem key="users">User management</DropdownItem>
      <DropdownItem key="logout">Logout</DropdownItem>
    </>
  );

  return (
    <Masthead>
      <MastheadMain>
        <MastheadToggle>
          <PageToggleButton isHamburgerButton aria-label="Global navigation" />
        </MastheadToggle>
        <MastheadBrand>
          <MastheadLogo component="a" href="#">
            <AcmeLogo />
          </MastheadLogo>
        </MastheadBrand>
      </MastheadMain>
      <MastheadContent>
        <Toolbar id="acme-masthead-toolbar" isStatic>
          <ToolbarContent>
            <ToolbarGroup
              variant="action-group-plain"
              align={{ default: "alignEnd" }}
              gap={{ default: "gapNone", md: "gapMd" }}
            >
              <ToolbarItem>
                <NotificationBadge
                  aria-label="Notifications"
                  variant={NotificationBadgeVariant.read}
                  onClick={() => {}}
                />
              </ToolbarItem>
              <ToolbarGroup
                variant="action-group-plain"
                visibility={{ default: "hidden", lg: "visible" }}
              >
                <ToolbarItem>
                  <Button aria-label="Settings" isSettings variant="plain" />
                </ToolbarItem>
                <ToolbarItem>
                  <Button
                    aria-label="Help"
                    variant={ButtonVariant.plain}
                    icon={<QuestionCircleIcon />}
                  />
                </ToolbarItem>
              </ToolbarGroup>
              {/* Below lg the utility icons + user actions collapse into a kebab */}
              <ToolbarItem visibility={{ lg: "hidden" }}>
                <Dropdown
                  isOpen={isKebabOpen}
                  onSelect={() => setIsKebabOpen(false)}
                  onOpenChange={setIsKebabOpen}
                  popperProps={{ position: "right" }}
                  toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
                    <MenuToggle
                      ref={toggleRef}
                      isExpanded={isKebabOpen}
                      onClick={() => setIsKebabOpen((v) => !v)}
                      variant="plain"
                      aria-label="Toolbar menu"
                      icon={<EllipsisVIcon />}
                    />
                  )}
                >
                  <DropdownGroup aria-label="User actions">
                    <DropdownList>{userItems}</DropdownList>
                  </DropdownGroup>
                  <Divider />
                  <DropdownList>
                    <DropdownItem>Settings</DropdownItem>
                    <DropdownItem>Help</DropdownItem>
                  </DropdownList>
                </Dropdown>
              </ToolbarItem>
            </ToolbarGroup>
            <ToolbarItem visibility={{ default: "hidden", lg: "visible" }}>
              <Dropdown
                isOpen={isUserOpen}
                onSelect={() => setIsUserOpen(false)}
                onOpenChange={setIsUserOpen}
                popperProps={{ position: "right" }}
                toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
                  <MenuToggle
                    ref={toggleRef}
                    isExpanded={isUserOpen}
                    onClick={() => setIsUserOpen((v) => !v)}
                    icon={<Avatar src={AVATAR_SRC} alt="" size="sm" />}
                  >
                    Ned Username
                  </MenuToggle>
                )}
              >
                <DropdownList>{userItems}</DropdownList>
              </Dropdown>
            </ToolbarItem>
          </ToolbarContent>
        </Toolbar>
      </MastheadContent>
    </Masthead>
  );
}
