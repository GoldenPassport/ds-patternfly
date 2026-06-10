import { useEffect, useRef, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
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
import {
  FoundationPage,
  Section,
  Card,
  CodeBlock,
} from "../_kit/StoryKit.js";
import { AcmeLogo } from "../_kit/AcmeLogo.js";

const meta: Meta = {
  title: "Components/Compass",
  parameters: {
    layout: "padded",
    a11y: {
      config: {
        rules: [
          // The placeholder regions render <div>s without focusable
          // content — real apps swap them for nav, hero, body
          // elements that satisfy axe naturally. Disable the rule
          // for the chrome-only demo.
          { id: "scrollable-region-focusable", enabled: false },
          { id: "color-contrast", enabled: false },
        ],
      },
    },
  },
};
export default meta;

// Inline-SVG avatar in the Acme brand blue (#0066cc) so the user
// portrait reads as part of the same identity as the AcmeLogo
// rendered in the CompassHeader logo slot.
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

// ──────────────────────────────────────────────────────────────────
// Story: Basic
// ──────────────────────────────────────────────────────────────────

export const Basic: StoryObj = {
  render: () => (
    <FoundationPage
      title="Compass"
      intro={
        <>
          A slot-based application layout — header, optional start /
          end sidebars, main body, and footer. Use Compass when the
          app needs persistent rails around the main content (notes
          panel, table-of-contents sidebar, activity feed) rather
          than the standard Masthead + single-sidebar shape that{" "}
          <code>&lt;Page&gt;</code> gives you. Added in PF6 6.5;
          requires <code>@patternfly/react-core ≥ 6.5</code>.
        </>
      }
    >
      <Section
        title="The five slots"
        description="In a basic Compass layout, content is passed to five ReactNode props to populate the different areas of the page. Pass any subset; missing slots collapse without taking space."
      >
        <Card>
          <ul
            style={{
              margin: 0,
              padding: "16px 24px 16px 40px",
              color: "var(--gp-color-text-regular)",
              lineHeight: 1.9,
            }}
          >
            <li>
              <strong><code>header</code></strong> — rendered at the top of
              the page, typically a <code>&lt;CompassHeader&gt;</code> that
              divides the header into three areas: a <code>logo</code> /
              brand, middle <code>nav</code>, and <code>profile</code>.
            </li>
            <li>
              <strong><code>sidebarStart</code></strong> — rendered at the
              horizontal start of the page (the left side by default).
            </li>
            <li>
              <strong><code>main</code></strong> — rendered in the centre,
              typically a <code>&lt;CompassMainHeader&gt;</code> or{" "}
              <code>&lt;CompassHero&gt;</code> alongside a{" "}
              <code>&lt;CompassContent&gt;</code> filled with one or more{" "}
              <code>&lt;Panel&gt;</code> components.
            </li>
            <li>
              <strong><code>sidebarEnd</code></strong> — rendered at the
              horizontal end of the page (the right side by default).
            </li>
            <li>
              <strong><code>footer</code></strong> — rendered at the bottom
              of the page. (We use the footer for the AI search in the
              later illustrations.)
            </li>
          </ul>
        </Card>
      </Section>

      <Section
        title="Basic structure"
        description="The five slots wired with real sub-components. Coloured placeholders stand in for nav / sidebars / footer so the regions stay legible. The hero is optional — the content title and main content areas are the key parts."
      >
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
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
            <CodeBlock>{`import {
  Compass,
  CompassHeader,
  CompassHero,
  CompassContent,
  CompassMainHeader,
  CompassMainHeaderContent,
  Panel,
  PanelMain,
  PanelMainBody,
} from "@golden-passport/ds-patternfly";

const header = (
  <CompassHeader logo={<Logo />} nav={<Nav />} profile={<Profile />} />
);

const main = (
  <>
    {/* Hero is optional */}
    <CompassHero>
      <Hero />
    </CompassHero>
    <CompassContent>
      <CompassMainHeader>
        <Panel>
          <PanelMain>
            <PanelMainBody>
              <CompassMainHeaderContent>Content title</CompassMainHeaderContent>
            </PanelMainBody>
          </PanelMain>
        </Panel>
      </CompassMainHeader>
      <div>Content</div>
    </CompassContent>
  </>
);

<Compass
  header={header}
  sidebarStart={<div>Sidebar start</div>}
  main={main}
  sidebarEnd={<div>Sidebar end</div>}
  footer={<div>Footer</div>}
  style={{ height: "600px" }}
/>`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section
        title="Background image"
        description="How the Compass and Hero backgrounds are sourced."
      >
        <Card>
          <ul
            style={{
              margin: 0,
              padding: "16px 24px 16px 40px",
              color: "var(--gp-color-text-regular)",
              lineHeight: 1.9,
            }}
          >
            <li>
              The background image of <code>&lt;Compass&gt;</code> is set at
              a global level alongside the theme — you don&apos;t set it
              per-instance.
            </li>
            <li>
              Customise the background of the <code>&lt;Hero&gt;</code>{" "}
              inside <code>&lt;CompassHero&gt;</code> with its{" "}
              <code>backgroundSrcLight</code> /{" "}
              <code>backgroundSrcDark</code> props, or set a gradient with{" "}
              <code>gradientLight</code> / <code>gradientDark</code>. When
              using a gradient, keep the stops in a tonal band that
              contrasts with the hero text — see{" "}
              <code>Components/Hero → With gradient</code>.
            </li>
          </ul>
        </Card>
      </Section>

      <Section
        title="Responsive behaviour"
        description="Compass adapts the chrome for narrow viewports so the five-slot layout still works on mobile."
      >
        <Card>
          <ul
            style={{
              margin: 0,
              padding: "16px 24px 16px 40px",
              color: "var(--gp-color-text-regular)",
              lineHeight: 1.9,
            }}
          >
            <li>
              <strong>Header nav collapses to a hamburger.</strong> On
              small screens the middle <code>nav</code> in{" "}
              <code>&lt;CompassHeader&gt;</code> folds behind a hamburger
              toggle that opens a slide-in side-nav, so the tabs / links
              stay reachable without crowding the header.
            </li>
            <li>
              <strong>Sidebars collapse with open / close buttons.</strong>{" "}
              <code>sidebarStart</code> and <code>sidebarEnd</code> are
              hidden by default on mobile and surfaced on demand via their
              own expand / collapse controls, so the <code>main</code>{" "}
              content keeps the full width until the user opens a rail.
            </li>
            <li>
              <strong>Main content stays primary.</strong> The hero,
              content title, and body reflow to the single available
              column — the chrome (header, rails, footer) gets out of the
              way rather than competing for space.
            </li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};


// ──────────────────────────────────────────────────────────────────
// Story: FullDemo — canonical PF6 Compass demo
// ──────────────────────────────────────────────────────────────────

/**
 * Mirror of PF6's official CompassBasic demo
 * (https://www.patternfly.org/components/compass/react-demos/compass-layout/).
 * Renders the full chrome — glass-styled nav panel with two-level Tabs
 * (tabs + subtabs), icon-action sidebars on both rails, a CompassHero
 * with brand-coloured gradient in the main area, and a CompassMessageBar
 * in the footer slot.
 *
 * Use this as the "real" structural reference. The Basic story is for
 * understanding the five slots in isolation; this is what a Compass-
 * laid-out page actually looks like once it's all wired together.
 */
function CompassFullDemo() {
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
                    tabContentId="compass-subtabs"
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
            <TabContent id="compass-subtabs" ref={subTabsRef}>
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
                      tabContentId="compass-subtab-1"
                      eventKey={0}
                      title={
                        <TabTitleText>
                          <div id="compass-subtab-1">Subtab 1</div>
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
              DrawerHead pattern from the patterns/Compass → Example demo
              so the slide-in nav reads as a proper sidenav. */}
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

  // Real apps would pass a Brand src pointing at their hosted logo
  // asset and an Avatar src pointing at the user's profile image.
  // Stories ship inline SVG data URLs so the demo is asset-free.
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
              aria-controls="compass-mobile-nav"
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
          overlay wrapper so other Compass instances are unaffected.
          Ported from the patterns/Compass → Example demo. */}
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
        // by the gp-rail-* classes + CSS below. On desktop the rails are
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
            id="compass-mobile-nav"
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

export const FullDemo: StoryObj = {
  parameters: {
    a11y: {
      config: {
        rules: [
          // Glass-styled nav + transparent gradients knock text below
          // AA on demo content. The chrome itself is fine; the demo
          // strings ("Tab 1", "Hero") are placeholders.
          { id: "color-contrast", enabled: false },
          { id: "scrollable-region-focusable", enabled: false },
        ],
      },
    },
  },
  render: () => (
    <FoundationPage
      title="Compass — full demo"
      intro={
        <>
          The canonical PF6 Compass example, translated 1:1 from{" "}
          <a
            href="https://www.patternfly.org/components/compass/react-demos/compass-layout/"
            target="_blank"
            rel="noopener"
          >
            patternfly.org
          </a>
          . Glass-styled <code>Panel</code> rails, a two-level Tabs
          nav inside <code>CompassNavContent</code> (top tabs +
          contextual subtabs), icon-action sidebars on both edges,
          brand-gradient <code>Hero</code> banner, titled main panel,
          and a <code>CompassMessageBar</code> footer. The body
          content scrolls independently inside its own Panel.
        </>
      }
    >
      <Section
        title="Composed Compass layout"
        description="Same component set as PF6's CompassBasic demo. The nav uses Tabs with isNav + component=nav so the strip is a real <nav> landmark; the subtab strip is anchored via tabContentRef. Gradient colours feed from --gp-color-* brand tokens."
      >
        <Card>
          <div style={{ padding: 24 }}>
            <CompassFullDemo />
          </div>
        </Card>
      </Section>

      <Section title="Composition cheat sheet">
        <Card>
          <ul
            style={{
              margin: 0,
              padding: "16px 24px 16px 40px",
              color: "var(--gp-color-text-regular)",
              lineHeight: 1.8,
            }}
          >
            <li>
              <strong>
                <code>CompassHeader</code>
              </strong>{" "}
              accepts <code>logo</code>, <code>nav</code>,{" "}
              <code>profile</code> as named slots — drop any
              ReactNode in each.
            </li>
            <li>
              <strong>
                <code>CompassNavContent</code>
              </strong>{" "}
              wraps <code>CompassNavHome</code> +{" "}
              <code>CompassNavMain</code> (the Tabs strip) +{" "}
              <code>CompassNavSearch</code>. Each accepts an{" "}
              <code>onClick</code> for the icon-only home /
              search-toggle buttons.
            </li>
            <li>
              <strong>Nested Tabs</strong> — the top Tabs uses{" "}
              <code>component={`TabsComponent.nav`}</code> + a{" "}
              <code>tabContentRef</code> pointing at the subtabs;
              the subtab Tabs sets <code>isSubtab</code>. PF6 wires
              the visibility so the right subtab strip shows for the
              active parent tab.
            </li>
            <li>
              <strong>
                <code>CompassHero</code>
              </strong>{" "}
              hosts a <code>Hero</code> (the new component) inside
              the main slot. <code>isGlass</code> on Hero applies
              the glassmorphic styling that matches the rail panels.
            </li>
            <li>
              <strong>
                <code>CompassMessageBar</code>
              </strong>{" "}
              goes in the <code>footer</code> slot — wrap with a
              glass <code>Panel</code> to match the rails.
            </li>
            <li>
              <strong>
                <code>ActionList</code> with <code>isIconList</code>{" "}
                <code>isVertical</code>
              </strong>{" "}
              renders the round-icon sidebars. <code>ActionListGroup</code>{" "}
              draws dividers between clusters.
            </li>
          </ul>
        </Card>
      </Section>

      <Section title="State managed in this demo">
        <Card>
          <ul
            style={{
              margin: 0,
              padding: "16px 24px 16px 40px",
              color: "var(--gp-color-text-regular)",
              lineHeight: 1.8,
            }}
          >
            <li>
              <strong>
                <code>activeTab</code>
              </strong>{" "}
              — which top-level nav tab is active (controls which
              subtab strip is shown).
            </li>
            <li>
              <strong>
                <code>activeSubtab</code>
              </strong>{" "}
              — which subtab inside the active tab is selected.
            </li>
            <li>
              <strong>
                <code>subTabsRef</code>
              </strong>{" "}
              — DOM ref handed to the top-tab&apos;s{" "}
              <code>tabContentRef</code> so PF6 can drive the linked
              subtab visibility.
            </li>
            <li>
              <strong>
                <code>isStartRailExpanded</code> /{" "}
                <code>isEndRailExpanded</code>
              </strong>{" "}
              — desktop collapsible-rail state. The two toolbar toggles
              flip these into <code>isSidebarStartExpanded</code> /{" "}
              <code>isSidebarEndExpanded</code>; Compass adds{" "}
              <code>inert</code> to a collapsed rail so it drops out of the
              tab order.
            </li>
            <li>
              <strong>
                <code>isMobile</code> / <code>isMobileNavOpen</code>
              </strong>{" "}
              — a <code>matchMedia(&quot;(max-width: 61.99rem)&quot;)</code>{" "}
              listener flips <code>isMobile</code>; below the breakpoint the
              header tabs are dropped and the nav is re-rendered as an
              expandable <code>Nav</code> (the tab that owns subtabs becomes
              a <code>NavExpandable</code> nested section) inside an overlay
              drawer, with <code>isMobileNavOpen</code> driving the slide-in.
            </li>
          </ul>
        </Card>
      </Section>

      <Section
        title="Responsive behaviour"
        description="How the chrome adapts below PF6's 62rem breakpoint. Resize the preview (or use the Storybook viewport toolbar) to see it."
      >
        <Card>
          <ul
            style={{
              margin: 0,
              padding: "16px 24px 16px 40px",
              color: "var(--gp-color-text-regular)",
              lineHeight: 1.8,
            }}
          >
            <li>
              <strong>Nav collapses to a hamburger side nav.</strong> On
              mobile the inline header tabs + subtabs fold away and a
              hamburger appears to the left of the logo. It opens the same
              nav as an <strong>overlay drawer</strong> (the Page-sidebar
              pattern) — a PatternFly <code>Nav</code> where the tab that
              owns subtabs becomes an expandable nested section. The drawer
              floats over the content with a dismiss scrim, so the{" "}
              <code>main</code> section never resizes.
            </li>
            <li>
              <strong>Desktop rails collapse with open / close
              buttons.</strong> At desktop widths the two toolbar toggles
              by the content title collapse and reveal the start / end icon
              rails. On mobile those rails go off-canvas so the{" "}
              <code>main</code> content keeps the full width.
            </li>
            <li>
              <strong>Docked-nav alternative.</strong> For a single
              anchored nav that folds behind a hamburger masthead on
              mobile, pass <code>dock</code> + <code>masthead</code>{" "}
              instead of <code>header</code> + sidebars (PF6 renders the
              masthead only at mobile).
            </li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};

// ──────────────────────────────────────────────────────────────────
// Story: StructuralPatterns — PF6 dev guide reference
// Mirrors the "Development guide → Structural patterns" section of
// the PatternFly Compass docs so engineers don't have to leave the
// Storybook to look up which sub-component goes in which slot.
// Source: https://www.patternfly.org/components/compass (Dev guide)
// ──────────────────────────────────────────────────────────────────

export const StructuralPatterns: StoryObj = {
  render: () => (
    <FoundationPage
      title="Compass — structural patterns"
      intro={
        <>
          Mirror of the PatternFly 6 Compass dev guide. Use this as
          the canonical reference when wiring up a generative /
          conversational UI: which sub-component lives in which slot,
          where to apply the <code>isGlass</code> Panel stack, and
          which props on the <code>Compass</code> root toggle the
          docked-nav vs. header layouts. Working code lives in{" "}
          <code>Basic</code> and <code>FullDemo</code> above; this
          story is documentation.
        </>
      }
    >
      <Section
        title="Transparent containers (glass)"
        description="Apply pf-v6-theme-glass to the html root to enable glass surfaces, then wrap each transparent region in a Panel stack."
      >
        <Card>
          <ul
            style={{
              margin: 0,
              padding: "16px 24px 16px 40px",
              color: "var(--gp-color-text-regular)",
              lineHeight: 1.8,
            }}
          >
            <li>
              <strong>Enable globally.</strong>{" "}
              <code>document.documentElement.classList.add(&quot;pf-v6-theme-glass&quot;)</code>{" "}
              — same shape as PF6 dark-mode toggling.
            </li>
            <li>
              <strong>Wrap each region</strong> in{" "}
              <code>&lt;Panel isGlass&gt;</code> →{" "}
              <code>&lt;PanelMain&gt;</code> →{" "}
              <code>&lt;PanelMainBody&gt;</code>. Some Compass
              sub-components apply this automatically; the sidebars
              and footer do not.
            </li>
            <li>
              <strong>Panel modifiers</strong> commonly composed with{" "}
              <code>isGlass</code>: <code>isPill</code> (rounded
              chrome), <code>hasNoBorder</code>, <code>isFullHeight</code>.
              Body padding is controlled via{" "}
              <code>PanelMainBody style</code> — e.g.{" "}
              <code>style={`{{ padding: 0 }}`}</code> for the footer
              MessageBar.
            </li>
            <li>
              <strong>Do not nest</strong> glass-styled Panel stacks —
              PF6 stacks the backdrop-filter blur and the result is
              visually muddy.
            </li>
          </ul>
        </Card>
      </Section>

      <Section
        title="Header"
        description="<CompassHeader> exposes 3 slots: logo, profile, nav. The nav slot uses CompassNav* helpers."
      >
        <Card>
          <CodeBlock>{`<CompassHeader
  logo={<Brand src={logoSrc} alt="Product name" />}
  profile={<Dropdown toggle={…with Avatar…} />}
  nav={
    <CompassNavContent>
      <CompassNavHome onClick={() => goHome()} />
      <CompassNavMain>
        <Tabs isNav component={TabsComponent.nav} aria-label="Global">
          <Tab eventKey={0} title={<TabTitleText>Dashboard</TabTitleText>} />
          <Tab eventKey={1} title={<TabTitleText>Integrations</TabTitleText>} />
        </Tabs>
      </CompassNavMain>
      <CompassNavSearch onClick={() => openSearch()} />
    </CompassNavContent>
  }
/>`}</CodeBlock>
          <ul
            style={{
              margin: 0,
              padding: "16px 24px 16px 40px",
              color: "var(--gp-color-text-regular)",
              lineHeight: 1.8,
            }}
          >
            <li>
              <code>CompassNavHome</code> /{" "}
              <code>CompassNavSearch</code> are optional opinionated
              buttons. Drop them when your app already has a global
              search elsewhere.
            </li>
            <li>
              <code>CompassNavMain</code> almost always wraps a{" "}
              <code>Tabs isNav component={`{TabsComponent.nav}`}</code>{" "}
              — that combo gives top-level nav styling.
            </li>
            <li>
              The <code>profile</code> slot expects a{" "}
              <code>Dropdown</code> whose <code>MenuToggle</code>{" "}
              contains an <code>Avatar</code>.
            </li>
          </ul>
        </Card>
      </Section>

      <Section
        title="Sidebars"
        description="Two vertical rails — sidebarStart + sidebarEnd. No dedicated helper; compose with Panel + ActionList isVertical."
      >
        <Card>
          <CodeBlock>{`<Panel isPill isGlass>
  <PanelMain>
    <PanelMainBody>
      <ActionList isIconList isVertical>
        <ActionListGroup>
          <ActionListItem>
            <Tooltip content="Run"><Button variant="plain" icon={<PlayIcon />} isCircle /></Tooltip>
          </ActionListItem>
        </ActionListGroup>
      </ActionList>
    </PanelMainBody>
  </PanelMain>
</Panel>`}</CodeBlock>
          <ul
            style={{
              margin: 0,
              padding: "16px 24px 16px 40px",
              color: "var(--gp-color-text-regular)",
              lineHeight: 1.8,
            }}
          >
            <li>
              Use <code>ActionListGroup</code> to cluster related
              icon buttons (e.g. primary actions vs. help/utility).
            </li>
            <li>
              Wrap each icon button in a <code>Tooltip</code> — the
              icon-only Button has only an <code>aria-label</code>{" "}
              for AT; sighted hover users rely on the tooltip.
            </li>
            <li>
              <strong>Responsive collapse.</strong> At <code>md</code>{" "}
              and up both rails stay pinned open beside the content. Below{" "}
              <code>md</code> there isn&apos;t room for two fixed rails, so
              each one <strong>collapses to a closed overlay by default</strong>{" "}
              and slides in over the content only when opened — keeping the
              phone layout to a single column.
            </li>
            <li>
              <strong>Expand / close handles.</strong> Each rail gets its own
              edge-handle <code>button</code> (rendered only when narrow) that
              toggles it open and closed — an{" "}
              <code>AngleRight</code>/<code>AngleLeft</code> chevron that points{" "}
              <em>inward</em> when closed and <em>outward</em> when open, mirrored
              for the start vs. end rail. Drive it from{" "}
              <code>isOpen</code> state with{" "}
              <code>aria-expanded={`{isOpen}`}</code> and an{" "}
              <code>aria-label</code> that flips between{" "}
              <code>&quot;Open … rail&quot;</code> and{" "}
              <code>&quot;Close … rail&quot;</code>. Render the handle{" "}
              <em>inside</em> the sidebar&apos;s own React tree so it slides with
              the rail and overrides PF6&apos;s{" "}
              <code>visibility:hidden</code> on the collapsed rail (
              <code>visibility: visible !important</code>) — that keeps the
              handle tappable while the rail itself is hidden. Working code:{" "}
              <code>patterns/Compass → Example</code>.
            </li>
          </ul>
        </Card>
      </Section>

      <Section
        title="Docked navigation"
        description="Alternative to header + sidebars — one anchored left rail. Pass via the <Compass dock=… /> prop."
      >
        <Card>
          <ul
            style={{
              margin: 0,
              padding: "16px 24px 16px 40px",
              color: "var(--gp-color-text-regular)",
              lineHeight: 1.8,
            }}
          >
            <li>
              Build the dock from a <code>Masthead</code> with the{" "}
              <code>&quot;docked&quot;</code> variant, a vertical{" "}
              <code>Toolbar isVertical</code>, and a{" "}
              <code>Nav variant=&quot;docked&quot;</code>.
            </li>
            <li>
              When using the dock, drop the <code>header</code>,{" "}
              <code>sidebarStart</code>, <code>sidebarEnd</code>{" "}
              props — they conflict with the dock&apos;s layout.
            </li>
          </ul>
        </Card>
      </Section>

      <Section
        title="Footer (two methods)"
        description="Same MessageBar shell either way; choice depends on whether the sidebars should resize with the footer."
      >
        <Card>
          <CodeBlock>{`<CompassMessageBar>
  <Panel isPill hasNoBorder>
    <PanelMain>
      <PanelMainBody style={{ padding: 0 }}>
        <MessageBar />
        <div aria-live="polite" className="pf-v6-screen-reader">
          {/* announce thinking / response state */}
        </div>
      </PanelMainBody>
    </PanelMain>
  </Panel>
</CompassMessageBar>`}</CodeBlock>
          <ul
            style={{
              margin: 0,
              padding: "16px 24px 16px 40px",
              color: "var(--gp-color-text-regular)",
              lineHeight: 1.8,
            }}
          >
            <li>
              <strong>
                <code>footer</code> prop on <code>&lt;Compass&gt;</code>
              </strong>{" "}
              — spans the full viewport width. Sidebars resize with
              the footer (MessageBar grows when the user types
              multi-line input).
            </li>
            <li>
              <strong>
                <code>&lt;CompassMainFooter&gt;</code> inside{" "}
                <code>main</code>
              </strong>{" "}
              — sidebars extend to the bottom of the viewport
              regardless of footer height. Use when you want the
              rails to feel fixed.
            </li>
          </ul>
        </Card>
      </Section>

      <Section
        title="Main content"
        description="CompassMainHeader for record pages, Hero for dashboards. Wrap content in a Panel stack inside CompassContent."
      >
        <Card>
          <ul
            style={{
              margin: 0,
              padding: "16px 24px 16px 40px",
              color: "var(--gp-color-text-regular)",
              lineHeight: 1.8,
            }}
          >
            <li>
              <strong>Record / list page.</strong>{" "}
              <code>CompassMainHeader</code> (title + toolbar) →{" "}
              <code>CompassContent</code> → one scrollable{" "}
              <code>Panel isScrollable isAutoHeight isGlass</code>{" "}
              containing the body. See the Integrations pattern.
            </li>
            <li>
              <strong>Dashboard.</strong> Replace the{" "}
              <code>CompassMainHeader</code> with a <code>Hero</code>
              ; inside <code>CompassContent</code>, render a{" "}
              <code>Grid</code> where each cell is its own{" "}
              <code>Panel isGlass isFullHeight</code> wrapping a{" "}
              <code>Card isPlain</code>. See the Dashboard pattern.
            </li>
            <li>
              <strong>Optional bottom row.</strong>{" "}
              <code>CompassMainFooter</code> inside <code>main</code>{" "}
              (the second footer method above) — keeps the sidebars
              full-height while still pinning a footer to the main
              column.
            </li>
          </ul>
        </Card>
      </Section>

      <Section
        title="CSS customisation"
        description="The whole Compass surface theme — brand, glass, message bar — drives off PF6 design tokens. Override them to rebrand."
      >
        <Card>
          <CodeBlock>{`/* Excerpted from the PF6 dev guide — override at :root or your
   theme scope. Brand tokens cascade to glass + thinking effects. */
:root {
  --pf-t--global--color--brand--100: var(--pf-t--color--red--40);
  --pf-t--global--color--brand--500: var(--pf-t--color--red--80);

  /* Message bar sizing */
  --pf-v6-c-compass__message-bar--Width: 600px;
  --pf-v6-c-compass__message-bar--MinWidth: 450px;
  --pf-v6-c-compass__message-bar--MaxWidth: 900px;

  /* Glass surface — brand-tinted, blurred backdrop */
  --pf-t--global--light--glass--background--color--glass--color:
    var(--pf-t--global--color--brand--500);
  --pf-t--global--light--glass--background--color--glass--filter: blur(12.5px);
  --pf-t--global--light--glass--background--color--glass--opacity: 10%;

  /* Thinking ring around AI indicator buttons */
  --pf-v6-global--thinking--BoxShadow--Color--Start-Start:
    var(--pf-t--global--color--brand--100);
  --pf-v6-global--thinking--BoxShadow--Color--End-Start:
    var(--pf-t--global--color--brand--500);
}`}</CodeBlock>
          <ul
            style={{
              margin: 0,
              padding: "16px 24px 16px 40px",
              color: "var(--gp-color-text-regular)",
              lineHeight: 1.8,
            }}
          >
            <li>
              <strong>Brand tokens</strong>{" "}
              (<code>--pf-t--global--color--brand--*</code>) cascade
              into the glass tint and the AI thinking ring — set them
              once and every Compass surface picks them up.
            </li>
            <li>
              <strong>Message bar width</strong> (
              <code>--pf-v6-c-compass__message-bar--*</code>) controls
              how the bottom prompt sits inside the footer.
            </li>
            <li>
              <strong>Glass opacity / blur</strong> are independent
              tokens in light vs. dark — tune separately to keep
              text contrast above WCAG AA on both backdrops.
            </li>
            <li>
              In this workspace the same dial system surfaces as the{" "}
              <code>--gp-*</code> brand tokens; the PF6 layer is
              wired through the <code>ThemeProvider</code> so the
              overrides above plug in at the brand definition.
            </li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
