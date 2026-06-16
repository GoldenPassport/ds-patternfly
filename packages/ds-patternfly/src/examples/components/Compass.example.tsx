/**
 * Compass — slot-based application layout: header, optional start / end
 * sidebars, main body, and footer.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useEffect, useId, useRef, useState } from "react";
import {
  ActionList,
  ActionListGroup,
  ActionListItem,
  Avatar,
  Button,
  Compass,
  CompassContent,
  CompassHeader,
  CompassHero,
  CompassMainHeader,
  CompassMainHeaderContent,
  CompassMessageBar,
  CompassNavContent,
  CompassNavHome,
  CompassNavMain,
  CompassNavSearch,
  Dropdown,
  DropdownItem,
  DropdownList,
  Flex,
  Hero,
  MenuToggle,
  type MenuToggleElement,
  Nav,
  NavExpandable,
  NavItem,
  NavList,
  Panel,
  PanelMain,
  PanelMainBody,
  Tab,
  TabContent,
  Tabs,
  TabsComponent,
  TabTitleText,
  Title,
  Tooltip,
} from "@golden-passport/ds-patternfly";
import AngleLeftIcon from "@patternfly/react-icons/dist/esm/icons/angle-left-icon";
import AngleRightIcon from "@patternfly/react-icons/dist/esm/icons/angle-right-icon";
import BarsIcon from "@patternfly/react-icons/dist/esm/icons/bars-icon";
import ColumnsIcon from "@patternfly/react-icons/dist/esm/icons/columns-icon";
import OutlinedCopyIcon from "@patternfly/react-icons/dist/esm/icons/outlined-copy-icon";
import OutlinedPlusSquareIcon from "@patternfly/react-icons/dist/esm/icons/outlined-plus-square-icon";
import PlayIcon from "@patternfly/react-icons/dist/esm/icons/play-icon";
import RhUiQuestionMarkCircleIcon from "@patternfly/react-icons/dist/esm/icons/rh-ui-question-mark-circle-icon";
import TimesIcon from "@patternfly/react-icons/dist/esm/icons/times-icon";

// Inline-SVG avatar in the Acme brand blue (#0066cc) so the user
// portrait reads as part of the same identity as the logo rendered in
// the CompassHeader logo slot. Real apps pass an Avatar src pointing at
// the user's profile image.
const ACME_AVATAR_SRC = (initials = "AF") =>
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'>` +
      `<circle cx='20' cy='20' r='20' fill='#0066cc'/>` +
      `<text x='20' y='20' text-anchor='middle' dominant-baseline='central' ` +
      `font-family='-apple-system,Segoe UI,sans-serif' font-size='15' ` +
      `font-weight='600' fill='white'>${initials}</text>` +
      `</svg>`,
  );

/**
 * Demo brand mark for the CompassHeader logo slot. Real apps render a
 * PF6 <Brand> pointing at their hosted logo asset; an inline SVG keeps
 * this example asset-free, with the wordmark inheriting the theme's
 * text colour.
 */
function AcmeLogo() {
  return (
    <svg viewBox="0 0 110 40" height={36} aria-hidden="true" focusable="false">
      <circle cx="20" cy="20" r="20" fill="#0066cc" />
      <path
        d="M11 28 L20 10 L29 28 M14.5 22 L25.5 22"
        stroke="white"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <text
        x="48"
        y="20"
        dominantBaseline="central"
        fontFamily="-apple-system,'Segoe UI',sans-serif"
        fontSize="17"
        fontWeight={700}
        fill="var(--gp-color-text-regular)"
      >
        Acme
      </text>
    </svg>
  );
}

/**
 * Reusable visual placeholder for a Compass slot. Real apps replace
 * each placeholder with the actual content (nav, hero, profile menu,
 * body, etc.). Coloured backgrounds let you see the layout regions
 * during dev without committing to specific content.
 */
function Slot({
  label,
  bg,
  height,
}: {
  label: string;
  bg: string;
  height?: number | string;
}) {
  return (
    <div
      style={{
        background: bg,
        color: "var(--gp-color-text-regular)",
        padding: 12,
        height: height ?? "100%",
        display: "grid",
        placeItems: "center",
        fontSize: 13,
        fontWeight: 600,
        borderRadius: 4,
      }}
    >
      {label}
    </div>
  );
}

// #region BasicStructure
export function BasicStructure() {
  return (
    <Compass
      header={
        <CompassHeader
          logo={<AcmeLogo />}
          nav={<Slot label="Nav" bg="transparent" />}
          profile={
            <Avatar src={ACME_AVATAR_SRC("AF")} alt="Profile" size="md" />
          }
        />
      }
      sidebarStart={
        <Slot label="Sidebar start" bg="rgba(0, 102, 204, 0.10)" />
      }
      main={
        <>
          {/* Hero is optional — drop it for a plain content page. */}
          <CompassHero>
            <Slot label="Hero (optional)" bg="rgba(125, 87, 42, 0.08)" height={96} />
          </CompassHero>
          <CompassContent>
            <CompassMainHeader>
              <Panel>
                <PanelMain>
                  <PanelMainBody>
                    <CompassMainHeaderContent>
                      <Title headingLevel="h1" size="xl">
                        Content title
                      </Title>
                    </CompassMainHeaderContent>
                  </PanelMainBody>
                </PanelMain>
              </Panel>
            </CompassMainHeader>
            <Panel>
              <PanelMain>
                <PanelMainBody>
                  Main content — tables, dashboards, forms, whatever
                  the page hosts.
                </PanelMainBody>
              </PanelMain>
            </Panel>
          </CompassContent>
        </>
      }
      sidebarEnd={
        <Slot label="Sidebar end" bg="rgba(62, 134, 53, 0.10)" />
      }
      footer={
        <Slot label="Footer (AI search later)" bg="var(--gp-color-bg-secondary-default)" height={48} />
      }
      style={{ height: 560 }}
    />
  );
}
// #endregion

// #region FullDemo
/**
 * Mirror of PF6's official CompassBasic demo
 * (https://www.patternfly.org/components/compass/react-demos/compass-layout/).
 * Renders the full chrome — glass-styled nav panel with two-level Tabs
 * (tabs + subtabs), icon-action sidebars on both rails, a CompassHero
 * with brand-coloured gradient in the main area, and a CompassMessageBar
 * in the footer slot.
 *
 * Use this as the "real" structural reference. BasicStructure is for
 * understanding the five slots in isolation; this is what a Compass-
 * laid-out page actually looks like once it's all wired together.
 */
export function FullDemo() {
  const id = useId();
  const [activeTab, setActiveTab] = useState<number>(0);
  const [activeSubtab, setActiveSubtab] = useState<number>(0);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  // Desktop: both icon rails default open; the toolbar toggles collapse them.
  const [isStartRailExpanded, setIsStartRailExpanded] = useState(true);
  const [isEndRailExpanded, setIsEndRailExpanded] = useState(true);
  // Mobile (< PF6's 62rem breakpoint): the header nav (main tabs + subtabs)
  // folds away and is surfaced as a slide-in side nav via the start sidebar,
  // opened by a hamburger to the left of the logo.
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const closeMobileNav = () => setIsMobileNavOpen(false);
  // Mobile: the two icon rails go off-canvas and are opened on demand
  // via edge-handle buttons (rendered into each rail below). Default
  // closed so the main section keeps the full width on phones.
  const [isStartRailOpen, setIsStartRailOpen] = useState(false);
  const [isEndRailOpen, setIsEndRailOpen] = useState(false);
  const subTabsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 61.99rem)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const navContent = (
    <>
      <Panel isPill isGlass>
        <PanelMain>
          <PanelMainBody>
            <CompassNavContent>
              <CompassNavHome onClick={() => undefined} />
              <CompassNavMain>
                <Tabs
                  activeKey={activeTab}
                  isNav
                  onSelect={(_e, tabIndex) =>
                    setActiveTab(tabIndex as number)
                  }
                  component={TabsComponent.nav}
                  aria-label="Compass navigation tabs"
                >
                  <Tab
                    tabContentId={`${id}-subtabs`}
                    tabContentRef={subTabsRef}
                    eventKey={0}
                    title={<TabTitleText>Tab 1</TabTitleText>}
                    aria-label="Compass tab with subtabs"
                  />
                  <Tab eventKey={1} title={<TabTitleText>Tab 2</TabTitleText>} />
                  <Tab eventKey={2} title={<TabTitleText>Tab 3</TabTitleText>} />
                  <Tab
                    eventKey={3}
                    title={<TabTitleText>Disabled Tab 4</TabTitleText>}
                    isDisabled
                  />
                </Tabs>
              </CompassNavMain>
              <CompassNavSearch onClick={() => undefined} />
            </CompassNavContent>
          </PanelMainBody>
        </PanelMain>
      </Panel>
      <Panel isPill isGlass>
        <PanelMain>
          <PanelMainBody style={{ padding: 0 }}>
            <TabContent id={`${id}-subtabs`} ref={subTabsRef}>
              <CompassNavContent>
                <CompassNavMain>
                  <Tabs
                    activeKey={activeSubtab}
                    isSubtab
                    isNav
                    onSelect={(_e, tabIndex) =>
                      setActiveSubtab(tabIndex as number)
                    }
                    aria-label="Compass navigation subtabs"
                  >
                    <Tab
                      tabContentId={`${id}-subtab-1`}
                      eventKey={0}
                      title={
                        <TabTitleText>
                          <div id={`${id}-subtab-1`}>Subtab 1</div>
                        </TabTitleText>
                      }
                    />
                    <Tab
                      eventKey={1}
                      title={<TabTitleText>Subtab 2</TabTitleText>}
                    />
                    <Tab
                      eventKey={2}
                      title={<TabTitleText>Disabled Subtab 3</TabTitleText>}
                      isDisabled
                    />
                  </Tabs>
                </CompassNavMain>
              </CompassNavContent>
            </TabContent>
          </PanelMainBody>
        </PanelMain>
      </Panel>
    </>
  );

  // Mobile side nav — the two-level nav rendered as a PatternFly Nav (the
  // Page-sidebar pattern): the tab that owns subtabs becomes a
  // NavExpandable nested section, the rest are flat NavItems. It lives in
  // the start sidebar slot on mobile, so PF6's sidebar slide-in gives it
  // the off-canvas drawer behaviour; the hamburger toggles it.
  const disabledItemProps = {
    "aria-disabled": true,
    style: { opacity: 0.5, pointerEvents: "none" as const },
  };
  const mobileNavContent = (
    <Panel isGlass>
      <PanelMain>
        <PanelMainBody
          style={{ paddingInline: "var(--pf-t--global--spacer--sm)" }}
        >
          {/* Drawer head — title + close affordance, mirroring the PF6
              DrawerHead pattern so the slide-in nav reads as a proper
              sidenav. */}
          <Flex
            alignItems={{ default: "alignItemsCenter" }}
            justifyContent={{ default: "justifyContentSpaceBetween" }}
            style={{
              paddingBlock: "var(--pf-t--global--spacer--sm)",
              paddingInline: "var(--pf-t--global--spacer--sm)",
            }}
          >
            <strong>Navigation</strong>
            <Button
              isCircle
              variant="plain"
              aria-label="Close navigation"
              icon={<TimesIcon />}
              onClick={closeMobileNav}
            />
          </Flex>
          <Nav aria-label="Compass mobile navigation">
            <NavList>
              {/* Tab 1 owns the subtabs → render it as a nested expandable
                  section, mirroring the desktop tab + subtab strip. */}
              <NavExpandable
                title="Tab 1"
                groupId="tab1"
                isExpanded
                isActive={activeTab === 0}
              >
                <NavItem
                  preventDefault
                  groupId="tab1"
                  itemId="subtab-0"
                  to="#subtab-1"
                  isActive={activeTab === 0 && activeSubtab === 0}
                  onClick={() => {
                    setActiveTab(0);
                    setActiveSubtab(0);
                    closeMobileNav();
                  }}
                >
                  Subtab 1
                </NavItem>
                <NavItem
                  preventDefault
                  groupId="tab1"
                  itemId="subtab-1"
                  to="#subtab-2"
                  isActive={activeTab === 0 && activeSubtab === 1}
                  onClick={() => {
                    setActiveTab(0);
                    setActiveSubtab(1);
                    closeMobileNav();
                  }}
                >
                  Subtab 2
                </NavItem>
                <NavItem preventDefault to="#subtab-3" {...disabledItemProps}>
                  Disabled Subtab 3
                </NavItem>
              </NavExpandable>
              <NavItem
                preventDefault
                itemId="tab-1"
                to="#tab-2"
                isActive={activeTab === 1}
                onClick={() => {
                  setActiveTab(1);
                  closeMobileNav();
                }}
              >
                Tab 2
              </NavItem>
              <NavItem
                preventDefault
                itemId="tab-2"
                to="#tab-3"
                isActive={activeTab === 2}
                onClick={() => {
                  setActiveTab(2);
                  closeMobileNav();
                }}
              >
                Tab 3
              </NavItem>
              <NavItem preventDefault to="#tab-4" {...disabledItemProps}>
                Disabled Tab 4
              </NavItem>
            </NavList>
          </Nav>
        </PanelMainBody>
      </PanelMain>
    </Panel>
  );

  const sidebarContent = (
    <Panel isPill isGlass>
      <PanelMain>
        <PanelMainBody>
          <ActionList isIconList isVertical>
            <ActionListGroup>
              <ActionListItem>
                <Tooltip content="Play">
                  <Button
                    isCircle
                    variant="plain"
                    icon={<PlayIcon />}
                    aria-label="Play"
                  />
                </Tooltip>
              </ActionListItem>
              <ActionListItem>
                <Tooltip content="Add">
                  <Button
                    isCircle
                    variant="plain"
                    icon={<OutlinedPlusSquareIcon />}
                    aria-label="Add"
                  />
                </Tooltip>
              </ActionListItem>
            </ActionListGroup>
            <ActionListItem>
              <Tooltip content="Copy">
                <Button
                  isCircle
                  variant="plain"
                  icon={<OutlinedCopyIcon />}
                  aria-label="Copy"
                />
              </Tooltip>
            </ActionListItem>
            <ActionListGroup>
              <ActionListItem>
                <Tooltip content="Help">
                  <Button
                    isCircle
                    variant="plain"
                    icon={<RhUiQuestionMarkCircleIcon />}
                    aria-label="Help"
                  />
                </Tooltip>
              </ActionListItem>
              <ActionListItem>
                <Tooltip content="Duplicate">
                  <Button
                    isCircle
                    variant="plain"
                    icon={<OutlinedCopyIcon />}
                    aria-label="Duplicate"
                  />
                </Tooltip>
              </ActionListItem>
            </ActionListGroup>
          </ActionList>
        </PanelMainBody>
      </PanelMain>
    </Panel>
  );

  // Edge-handle buttons that expand / collapse each rail on mobile.
  // Rendered as DOM children of the rail (.pf-v6-c-compass__sidebar) so
  // they slide with it and the CSS can keep them tappable while the rail
  // content is hidden (PF6 puts visibility:hidden on a collapsed rail).
  // The chevron points inward when closed (open affordance) and outward
  // when open (close affordance), mirrored for the start vs. end rail.
  const startRailHandle = isMobile ? (
    <button
      type="button"
      aria-label={isStartRailOpen ? "Close start rail" : "Open start rail"}
      aria-expanded={isStartRailOpen}
      onClick={() => setIsStartRailOpen((o) => !o)}
      className={`gp-cmp-rail-handle gp-cmp-rail-handle--start${
        isStartRailOpen ? " is-rail-open" : ""
      }`}
    >
      {isStartRailOpen ? <AngleLeftIcon /> : <AngleRightIcon />}
    </button>
  ) : null;

  const endRailHandle = isMobile ? (
    <button
      type="button"
      aria-label={isEndRailOpen ? "Close end rail" : "Open end rail"}
      aria-expanded={isEndRailOpen}
      onClick={() => setIsEndRailOpen((o) => !o)}
      className={`gp-cmp-rail-handle gp-cmp-rail-handle--end${
        isEndRailOpen ? " is-rail-open" : ""
      }`}
    >
      {isEndRailOpen ? <AngleRightIcon /> : <AngleLeftIcon />}
    </button>
  ) : null;

  const startSidebar = (
    <>
      {sidebarContent}
      {startRailHandle}
    </>
  );
  const endSidebar = (
    <>
      {sidebarContent}
      {endRailHandle}
    </>
  );

  const profileDropdown = (
    <Dropdown
      isOpen={isProfileOpen}
      onSelect={() => setIsProfileOpen(false)}
      onOpenChange={(isOpen) => setIsProfileOpen(isOpen)}
      popperProps={{ position: "right" }}
      toggle={(toggleRef: React.Ref<MenuToggleElement>) =>
        // On mobile the profile collapses to just the avatar (no name) so
        // the header fits on one row; desktop keeps name + avatar.
        isMobile ? (
          <MenuToggle
            ref={toggleRef}
            aria-label="Aliyah Frazier"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            isExpanded={isProfileOpen}
            variant="plain"
            className="gp-compass-avatar-toggle"
            icon={<Avatar src={ACME_AVATAR_SRC("AF")} alt="" size="md" />}
          />
        ) : (
          <MenuToggle
            ref={toggleRef}
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            isExpanded={isProfileOpen}
            variant="plain"
            isCircle
          >
            <Flex
              alignItems={{ default: "alignItemsCenter" }}
              gap={{ default: "gapMd" }}
            >
              Aliyah Frazier
              <Avatar src={ACME_AVATAR_SRC("AF")} alt="" size="md" />
            </Flex>
          </MenuToggle>
        )
      }
    >
      <DropdownList>
        <DropdownItem>My profile</DropdownItem>
        <DropdownItem>User management</DropdownItem>
        <DropdownItem>Logout</DropdownItem>
      </DropdownList>
    </Dropdown>
  );

  const headerContent = (
    <CompassHeader
      logo={
        <Flex
          gap={{ default: "gapSm" }}
          alignItems={{ default: "alignItemsCenter" }}
          flexWrap={{ default: "nowrap" }}
        >
          {/* Hamburger sits to the left of the brand and only appears on
              mobile, where it opens the slide-in side nav. */}
          {isMobile && (
            // Plain hamburger at rest; on hover/focus the bars morph into a
            // directional arrow (facing the way the nav will move — left when
            // open, right when closed), returning to a hamburger on mouse-out.
            // That hover-only animation is PF6's built-in isHamburger
            // behaviour — omit hamburgerVariant (which would pin the arrow on).
            // isExpanded sets the hover arrow's direction. Uses Button
            // directly so it needs no PageContext.
            <Button
              variant="plain"
              isHamburger
              isExpanded={isMobileNavOpen}
              aria-label="Global navigation"
              aria-expanded={isMobileNavOpen}
              aria-controls={`${id}-mobile-nav`}
              onClick={() => setIsMobileNavOpen((v) => !v)}
            />
          )}
          <a href="#" aria-label="Acme home" tabIndex={0}>
            <AcmeLogo />
          </a>
        </Flex>
      }
      // The inline tabs/subtabs nav shows on desktop; on mobile it folds
      // away and is reachable through the hamburger side nav instead.
      nav={isMobile ? undefined : navContent}
      profile={profileDropdown}
    />
  );

  const mainContent = (
    <>
      <CompassHero>
        <Hero
          isGlass
          gradientDark={{
            stop1: "var(--gp-color-bg-primary-default, #1a1611)",
            stop2: "var(--gp-color-bg-secondary-default, #2a2018)",
            // Brand accent pulled toward the surface so the gradient stays
            // inside a tonal band that contrasts with the (light) hero text.
            stop3:
              "color-mix(in srgb, var(--gp-color-brand-default, #7d572a) 30%, var(--gp-color-bg-primary-default, #1a1611))",
          }}
          gradientLight={{
            stop1: "var(--gp-color-bg-secondary-default, #f3ede1)",
            stop2: "var(--gp-color-bg-secondary-hover, #e6dcc8)",
            stop3:
              "color-mix(in srgb, var(--gp-color-brand-default, #7d572a) 25%, var(--gp-color-bg-secondary-default, #f3ede1))",
          }}
        >
          Hero
        </Hero>
      </CompassHero>
      <CompassMainHeader
        title={<Title headingLevel="h1">Content title</Title>}
        toolbar={
          // Desktop-only: collapse / expand the two icon rails. On mobile
          // the rails go off-canvas and the nav is driven by the header
          // hamburger instead, so these are hidden.
          isMobile ? undefined : (
            <Flex
              gap={{ default: "gapSm" }}
              alignItems={{ default: "alignItemsCenter" }}
            >
              <Tooltip
                content={
                  isStartRailExpanded ? "Hide start rail" : "Show start rail"
                }
              >
                <Button
                  isCircle
                  variant="plain"
                  icon={<BarsIcon />}
                  aria-label="Toggle start rail"
                  aria-expanded={isStartRailExpanded}
                  onClick={() => setIsStartRailExpanded((v) => !v)}
                />
              </Tooltip>
              <Tooltip
                content={
                  isEndRailExpanded ? "Hide end rail" : "Show end rail"
                }
              >
                <Button
                  isCircle
                  variant="plain"
                  icon={<ColumnsIcon />}
                  aria-label="Toggle end rail"
                  aria-expanded={isEndRailExpanded}
                  onClick={() => setIsEndRailExpanded((v) => !v)}
                />
              </Tooltip>
            </Flex>
          )
        }
        panelProps={{ isGlass: true }}
      />
      <CompassContent>
        <Panel isScrollable isAutoHeight isGlass>
          <PanelMain>
            <PanelMainBody>
              Main content body — tables, dashboards, forms, whatever
              the page hosts. The surrounding Compass chrome handles
              navigation, rail actions, and the message bar so the
              body only renders the work-of-the-page.
            </PanelMainBody>
          </PanelMain>
        </Panel>
      </CompassContent>
    </>
  );

  const footerContent = (
    <CompassMessageBar>
      <Panel isPill isGlass>
        <PanelMain>
          <PanelMainBody style={{ padding: 0 }}>Message bar</PanelMainBody>
        </PanelMain>
      </Panel>
    </CompassMessageBar>
  );

  return (
    // gp-compass-mobile-overlay: anchors the mobile side-nav drawer. On
    // mobile the nav floats over the content as an overlay drawer (a
    // sibling of Compass, not a grid sidebar) so opening it never resizes
    // the main section. See styles/index.css.
    <div className="gp-compass-mobile-overlay">
      {/* Mobile rail overlays + edge handles. Below 62rem the two icon
          rails leave the Compass grid and become fixed overlays that
          slide in/out; each carries an edge-handle button (rendered into
          the rail above) to expand/collapse it. Scoped under the demo's
          overlay wrapper so other Compass instances are unaffected. */}
      <style
        dangerouslySetInnerHTML={{
          __html: [
            "@media (max-width: 61.99rem) {",
            // Clip the demo box so a collapsed rail (and its backdrop-filter)
            // can't bleed into the page margin beside the example. The closed
            // rail's edge handle sits just inside the box edge, so it stays
            // visible/tappable.
            "  .gp-compass-mobile-overlay { overflow: hidden; }",
            // With the rails hidden (off-canvas overlays on mobile) the main
            // section would otherwise stretch to within one spacer of the box
            // edge. Give it explicit inline margins so the content stays an
            // inset column rather than sprawling edge-to-edge under the
            // full-bleed header.
            "  .gp-compass-mobile-overlay .pf-v6-c-compass__main { margin-inline: var(--pf-t--global--spacer--md, 1rem); }",
            // Bare avatar profile toggle — strip the circular toggle chrome
            // (the ::before interactive background) so only the avatar shows,
            // with no circle behind it in any state.
            "  .gp-compass-mobile-overlay .gp-compass-avatar-toggle,",
            "  .gp-compass-mobile-overlay .gp-compass-avatar-toggle:hover,",
            "  .gp-compass-mobile-overlay .gp-compass-avatar-toggle.pf-m-expanded {",
            "    background: transparent !important; box-shadow: none !important;",
            "    padding: 0 !important;",
            "  }",
            "  .gp-compass-mobile-overlay .gp-compass-avatar-toggle::before { display: none !important; }",
            // The header grid is align-items:start, so the profile slot (just
            // the avatar on mobile) sits at the top instead of centred next to
            // the hamburger. Centre the profile cell in the header row.
            "  .gp-compass-mobile-overlay .pf-v6-c-compass__profile { align-self: center; }",
            // Rails out of the grid → absolute overlays anchored to the demo
            // box (not the viewport) so the handles sit on the box edge rather
            // than floating in the page margin. Keep the wrapper visible (PF6
            // hides collapsed rails) so the handle inside stays tappable; the
            // Panel content is gated separately.
            "  .gp-compass-mobile-overlay .pf-v6-c-compass__sidebar.pf-m-start,",
            "  .gp-compass-mobile-overlay .pf-v6-c-compass__sidebar.pf-m-end {",
            "    position: absolute; grid-area: unset; inset-block-start: 0;",
            "    block-size: 100%; z-index: 300; padding: 0.5rem;",
            "    display: flex; align-items: center;",
            "    visibility: visible !important; opacity: 1 !important;",
            "  }",
            "  .gp-compass-mobile-overlay .pf-v6-c-compass__sidebar.pf-m-start { inset-inline-start: 0; }",
            "  .gp-compass-mobile-overlay .pf-v6-c-compass__sidebar.pf-m-end { inset-inline-end: 0; }",
            // Slide open/closed driven by classes on the Compass root.
            "  .gp-compass-mobile-overlay .gp-rail-left-closed .pf-v6-c-compass__sidebar.pf-m-start {",
            "    translate: calc(var(--pf-v6-c-compass--section--slide--length--sidebar) * -1);",
            "  }",
            "  .gp-compass-mobile-overlay .gp-rail-left-open .pf-v6-c-compass__sidebar.pf-m-start { translate: 0; }",
            "  .gp-compass-mobile-overlay .gp-rail-right-closed .pf-v6-c-compass__sidebar.pf-m-end {",
            "    translate: var(--pf-v6-c-compass--section--slide--length--sidebar);",
            "  }",
            "  .gp-compass-mobile-overlay .gp-rail-right-open .pf-v6-c-compass__sidebar.pf-m-end { translate: 0; }",
            // Hide rail content when closed; keep the wrapper for the handle.
            "  .gp-compass-mobile-overlay .gp-rail-left-closed .pf-v6-c-compass__sidebar.pf-m-start > .pf-v6-c-panel,",
            "  .gp-compass-mobile-overlay .gp-rail-right-closed .pf-v6-c-compass__sidebar.pf-m-end > .pf-v6-c-panel {",
            "    visibility: hidden; opacity: 0; pointer-events: none;",
            "  }",
            "  .gp-compass-mobile-overlay .gp-rail-left-open .pf-v6-c-compass__sidebar.pf-m-start > .pf-v6-c-panel,",
            "  .gp-compass-mobile-overlay .gp-rail-right-open .pf-v6-c-compass__sidebar.pf-m-end > .pf-v6-c-panel {",
            "    visibility: visible; opacity: 1;",
            "  }",
            // Edge handle — absolute to the (fixed) rail; forced visible so
            // it stays tappable while the collapsed rail is hidden.
            "  .gp-compass-mobile-overlay .gp-cmp-rail-handle {",
            "    position: absolute; inset-block-start: 50%; transform: translateY(-50%);",
            "    z-index: 200; inline-size: 24px; block-size: 48px;",
            "    display: flex; align-items: center; justify-content: center; padding: 0;",
            "    border: 1px solid var(--gp-color-border-default, rgba(0,0,0,0.15));",
            "    background: var(--gp-color-bg-secondary-default, rgba(255,255,255,0.85));",
            "    color: var(--gp-color-text-regular); cursor: pointer;",
            "    box-shadow: 0 1px 4px rgba(0,0,0,0.18);",
            "    backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);",
            "    visibility: visible !important; opacity: 1 !important; pointer-events: auto !important;",
            "  }",
            "  .gp-compass-mobile-overlay .gp-cmp-rail-handle:hover,",
            "  .gp-compass-mobile-overlay .gp-cmp-rail-handle:focus-visible {",
            "    background: var(--gp-color-bg-secondary-hover, var(--gp-color-bg-secondary-default));",
            "  }",
            // Glass theme — frost the handles to match the rail panels (use
            // the glass--* token, not --primary--default which the dials
            // override to an opaque colour).
            "  .pf-v6-theme-glass .gp-compass-mobile-overlay .gp-cmp-rail-handle {",
            "    background: var(--pf-t--global--background--color--glass--primary--default);",
            "    backdrop-filter: var(--pf-t--global--background--filter--glass--blur--primary);",
            "    -webkit-backdrop-filter: var(--pf-t--global--background--filter--glass--blur--primary);",
            "    border-color: color-mix(in srgb, var(--pf-t--global--border--color--default, currentColor) 30%, transparent);",
            "  }",
            "  .pf-v6-theme-glass .gp-compass-mobile-overlay .gp-cmp-rail-handle:hover,",
            "  .pf-v6-theme-glass .gp-compass-mobile-overlay .gp-cmp-rail-handle:focus-visible {",
            "    background: color-mix(in srgb, var(--pf-t--global--background--color--glass--primary--default) 80%, var(--gp-color-brand-default) 20%);",
            "  }",
            // Anchor each handle to its rail's outer edge (chevron pokes out).
            "  .gp-compass-mobile-overlay .gp-cmp-rail-handle--start {",
            "    inset-inline-end: -24px; border-inline-start: 0;",
            "    border-start-start-radius: 0; border-end-start-radius: 0;",
            "    border-start-end-radius: 8px; border-end-end-radius: 8px;",
            "    box-shadow: 2px 1px 4px rgba(0,0,0,0.18);",
            "    transition: inset-inline-end 200ms ease;",
            "  }",
            "  .gp-compass-mobile-overlay .gp-cmp-rail-handle--end {",
            "    inset-inline-start: -24px; border-inline-end: 0;",
            "    border-start-end-radius: 0; border-end-end-radius: 0;",
            "    border-start-start-radius: 8px; border-end-start-radius: 8px;",
            "    box-shadow: -2px 1px 4px rgba(0,0,0,0.18);",
            "    transition: inset-inline-start 200ms ease;",
            "  }",
            // When open, tuck the handle tighter against the rail edge.
            "  .gp-compass-mobile-overlay .gp-rail-left-open .pf-v6-c-compass__sidebar.pf-m-start .gp-cmp-rail-handle--start { inset-inline-end: -16px; }",
            "  .gp-compass-mobile-overlay .gp-rail-right-open .pf-v6-c-compass__sidebar.pf-m-end .gp-cmp-rail-handle--end { inset-inline-start: -16px; }",
            // Mobile nav drawer sits ABOVE the rail edge-handles (z 300), and
            // its scrim covers them, so the open sidenav is modal over the
            // rail expansion buttons. Square corners — it's a flush full-height
            // edge drawer, not a floating rounded card.
            "  .gp-compass-mobile-overlay .gp-compass-scrim { z-index: 350; }",
            "  .gp-compass-mobile-overlay .gp-compass-drawer { z-index: 400; }",
            "  .gp-compass-mobile-overlay .gp-compass-drawer,",
            "  .gp-compass-mobile-overlay .gp-compass-drawer > .pf-v6-c-panel { border-radius: 0; }",
            "}",
            // Desktop: the header spans the full width of the Compass box
            // (breaking out of the container's inline padding) while the rails
            // and main content stay inset — a full-bleed app bar over a
            // margined content area.
            "@media (min-width: 62rem) {",
            "  .gp-compass-mobile-overlay .pf-v6-c-compass__header {",
            "    margin-inline: calc(-1 * var(--pf-t--global--spacer--lg, 1.5rem));",
            "  }",
            "}",
          ].join("\n"),
        }}
      />
      <Compass
        // On mobile keep isSidebarXExpanded={true} so PF6 doesn't add
        // `inert` to the collapsed rail (which would disable the edge
        // handle inside it) — the open/closed visual is driven instead
        // by the gp-rail-* classes + CSS above. On desktop the rails are
        // ordinary grid columns toggled by the toolbar buttons.
        className={
          isMobile
            ? [
                isStartRailOpen ? "gp-rail-left-open" : "gp-rail-left-closed",
                isEndRailOpen ? "gp-rail-right-open" : "gp-rail-right-closed",
              ].join(" ")
            : ""
        }
        header={headerContent}
        // On mobile the icon rails are off-canvas overlays opened via the
        // edge handles; on desktop they're collapsible via the toolbar
        // toggles.
        sidebarStart={startSidebar}
        isSidebarStartExpanded={isMobile ? true : isStartRailExpanded}
        main={mainContent}
        sidebarEnd={endSidebar}
        isSidebarEndExpanded={isMobile ? true : isEndRailExpanded}
        footer={footerContent}
        style={{ height: 640 }}
      />
      {isMobile && (
        <>
          {/* Scrim — tap outside the drawer to dismiss it. */}
          {isMobileNavOpen && (
            <button
              type="button"
              className="gp-compass-scrim"
              aria-label="Close navigation"
              onClick={closeMobileNav}
            />
          )}
          {/* Overlay side-nav drawer — slides in over the content without
              displacing it. */}
          <div
            id={`${id}-mobile-nav`}
            className={
              "gp-compass-drawer" + (isMobileNavOpen ? " pf-m-open" : "")
            }
            {...(!isMobileNavOpen && { inert: "true" })}
          >
            {mobileNavContent}
          </div>
        </>
      )}
    </div>
  );
}
// #endregion

export default function CompassExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <BasicStructure />
      <FullDemo />
    </div>
  );
}
