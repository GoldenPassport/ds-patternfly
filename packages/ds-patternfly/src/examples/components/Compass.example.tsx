/**
 * Compass — slot-based application layout: header, optional start / end
 * sidebars, main body, and footer.
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
  Compass,
  CompassContent,
  CompassHeader,
  CompassHero,
  CompassMainHeader,
  CompassMainHeaderContent,
  CompassMessageBar,
  CompassProfileMenu,
  CompassRail,
  CompassTabsNav,
  compassRailRootClasses,
  Flex,
  Hero,
  Panel,
  PanelMain,
  PanelMainBody,
  Title,
  Tooltip,
  useCompassResponsive,
  type CompassNavTab,
  type CompassProfileMenuItem,
  type CompassRailAction,
} from "@golden-passport/ds-patternfly";
import BarsIcon from "@patternfly/react-icons/dist/esm/icons/bars-icon";
import ColumnsIcon from "@patternfly/react-icons/dist/esm/icons/columns-icon";
import OutlinedCopyIcon from "@patternfly/react-icons/dist/esm/icons/outlined-copy-icon";
import OutlinedPlusSquareIcon from "@patternfly/react-icons/dist/esm/icons/outlined-plus-square-icon";
import PlayIcon from "@patternfly/react-icons/dist/esm/icons/play-icon";
import RhUiQuestionMarkCircleIcon from "@patternfly/react-icons/dist/esm/icons/rh-ui-question-mark-circle-icon";

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
 * Mirror of PF6's official CompassBasic demo, rebuilt on the DS Compass lego
 * blocks: CompassTabsNav (the two-level nav strip on desktop AND the slide-in
 * drawer body on mobile, both generated from one `TABS` model), CompassRail
 * (the icon rails, with mobile off-canvas edge handles), and CompassProfileMenu
 * (the responsive profile dropdown). The example only wires state + the
 * responsive switch; the chrome lives in the components and the mobile-overlay
 * CSS ships in the lib stylesheet — the `gp-compass-mobile-overlay` wrapper
 * opts in.
 *
 * Use this as the "real" structural reference; BasicStructure shows the five
 * Compass slots in isolation.
 */
const TABS: CompassNavTab[] = [
  {
    id: "tab1",
    label: "Tab 1",
    subtabs: [
      { id: "sub1", label: "Subtab 1" },
      { id: "sub2", label: "Subtab 2" },
      { id: "sub3", label: "Disabled Subtab 3", isDisabled: true },
    ],
  },
  { id: "tab2", label: "Tab 2" },
  { id: "tab3", label: "Tab 3" },
  { id: "tab4", label: "Disabled Tab 4", isDisabled: true },
];

const RAIL_ACTIONS: CompassRailAction[] = [
  { id: "play", icon: <PlayIcon />, label: "Play", groupId: "primary" },
  { id: "add", icon: <OutlinedPlusSquareIcon />, label: "Add", groupId: "primary" },
  { id: "copy", icon: <OutlinedCopyIcon />, label: "Copy" },
  { id: "help", icon: <RhUiQuestionMarkCircleIcon />, label: "Help", groupId: "util" },
  { id: "dup", icon: <OutlinedCopyIcon />, label: "Duplicate", groupId: "util" },
];

const PROFILE_ITEMS: CompassProfileMenuItem[] = [
  { id: "profile", label: "My profile" },
  { id: "users", label: "User management" },
  { id: "logout", label: "Logout" },
];

export function FullDemo() {
  const { isMobile } = useCompassResponsive();
  const id = useId();
  const [activeTab, setActiveTab] = useState("tab1");
  const [activeSubtab, setActiveSubtab] = useState("sub1");
  const [profileOpen, setProfileOpen] = useState(false);
  // Desktop: both icon rails default open; the toolbar toggles collapse them.
  const [startRailExpanded, setStartRailExpanded] = useState(true);
  const [endRailExpanded, setEndRailExpanded] = useState(true);
  // Mobile: rails go off-canvas, opened on demand via their edge handles.
  const [startRailOpen, setStartRailOpen] = useState(false);
  const [endRailOpen, setEndRailOpen] = useState(false);
  // Mobile: the header nav folds into a hamburger-opened slide-in drawer.
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const mobileNavId = `${id}-mobile-nav`;

  const header = (
    <CompassHeader
      logo={
        <Flex
          gap={{ default: "gapSm" }}
          alignItems={{ default: "alignItemsCenter" }}
          flexWrap={{ default: "nowrap" }}
        >
          {/* Hamburger sits to the left of the brand on mobile, opening the
              slide-in side nav. isHamburger gives PF6's hover bars→arrow morph. */}
          {isMobile && (
            <Button
              variant="plain"
              isHamburger
              isExpanded={mobileNavOpen}
              aria-label="Global navigation"
              aria-expanded={mobileNavOpen}
              aria-controls={mobileNavId}
              onClick={() => setMobileNavOpen((v) => !v)}
            />
          )}
          <a href="#" aria-label="Acme home" tabIndex={0}>
            <AcmeLogo />
          </a>
        </Flex>
      }
      // Inline tabs/subtabs on desktop; on mobile the nav folds into the
      // hamburger drawer (rendered below) instead.
      nav={
        isMobile ? undefined : (
          <CompassTabsNav
            variant="desktop"
            tabs={TABS}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            activeSubtab={activeSubtab}
            onSubtabChange={setActiveSubtab}
            onHome={() => undefined}
            onSearch={() => undefined}
          />
        )
      }
      profile={
        <CompassProfileMenu
          name="Aliyah Frazier"
          avatarSrc={ACME_AVATAR_SRC("AF")}
          items={PROFILE_ITEMS}
          isCompact={isMobile}
          isOpen={profileOpen}
          onOpenChange={setProfileOpen}
        />
      }
    />
  );

  const main = (
    <>
      <CompassHero>
        <Hero
          isGlass
          gradientDark={{
            stop1: "var(--gp-color-bg-primary-default, #1a1611)",
            stop2: "var(--gp-color-bg-secondary-default, #2a2018)",
            // Brand accent pulled toward the surface so the gradient stays
            // in a tonal band that contrasts with the (light) hero text.
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
          // Desktop-only: collapse / expand the two icon rails. On mobile the
          // rails are off-canvas (driven by their own edge handles) and the
          // nav is the header hamburger, so these are hidden.
          isMobile ? undefined : (
            <Flex gap={{ default: "gapSm" }} alignItems={{ default: "alignItemsCenter" }}>
              <Tooltip content={startRailExpanded ? "Hide start rail" : "Show start rail"}>
                <Button
                  isCircle
                  variant="plain"
                  icon={<BarsIcon />}
                  aria-label="Toggle start rail"
                  aria-expanded={startRailExpanded}
                  onClick={() => setStartRailExpanded((v) => !v)}
                />
              </Tooltip>
              <Tooltip content={endRailExpanded ? "Hide end rail" : "Show end rail"}>
                <Button
                  isCircle
                  variant="plain"
                  icon={<ColumnsIcon />}
                  aria-label="Toggle end rail"
                  aria-expanded={endRailExpanded}
                  onClick={() => setEndRailExpanded((v) => !v)}
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
              Main content body — tables, dashboards, forms, whatever the page
              hosts. The surrounding Compass chrome handles navigation, rail
              actions, and the message bar so the body only renders the
              work-of-the-page.
            </PanelMainBody>
          </PanelMain>
        </Panel>
      </CompassContent>
    </>
  );

  return (
    // gp-compass-mobile-overlay anchors the mobile drawer + off-canvas rails
    // and opts into the mobile-overlay CSS in the lib stylesheet.
    <div className="gp-compass-mobile-overlay">
      <Compass
        // On mobile the rail open/closed visual is driven by these classes
        // (CompassRail keeps isSidebarXExpanded={true} so PF6 doesn't `inert`
        // the collapsed rail and disable its edge handle).
        className={
          isMobile
            ? compassRailRootClasses({ startOpen: startRailOpen, endOpen: endRailOpen })
            : ""
        }
        header={header}
        sidebarStart={
          <CompassRail
            side="start"
            actions={RAIL_ACTIONS}
            isMobile={isMobile}
            isOpen={startRailOpen}
            onOpenChange={setStartRailOpen}
          />
        }
        isSidebarStartExpanded={isMobile ? true : startRailExpanded}
        main={main}
        sidebarEnd={
          <CompassRail
            side="end"
            actions={RAIL_ACTIONS}
            isMobile={isMobile}
            isOpen={endRailOpen}
            onOpenChange={setEndRailOpen}
          />
        }
        isSidebarEndExpanded={isMobile ? true : endRailExpanded}
        footer={
          <CompassMessageBar>
            <Panel isPill isGlass>
              <PanelMain>
                <PanelMainBody style={{ padding: 0 }}>Message bar</PanelMainBody>
              </PanelMain>
            </Panel>
          </CompassMessageBar>
        }
        style={{ height: 640 }}
      />
      {isMobile && (
        <>
          {/* Scrim — tap outside the drawer to dismiss. */}
          {mobileNavOpen && (
            <button
              type="button"
              className="gp-compass-scrim"
              aria-label="Close navigation"
              onClick={() => setMobileNavOpen(false)}
            />
          )}
          {/* Overlay side-nav drawer — slides in over content without
              displacing it. CompassTabsNav variant="mobile" renders the body
              from the same TABS model used by the desktop strip. */}
          <div
            id={mobileNavId}
            className={"gp-compass-drawer" + (mobileNavOpen ? " pf-m-open" : "")}
            {...(!mobileNavOpen && { inert: "true" })}
          >
            <CompassTabsNav
              variant="mobile"
              tabs={TABS}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              activeSubtab={activeSubtab}
              onSubtabChange={setActiveSubtab}
              onNavigate={() => setMobileNavOpen(false)}
            />
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
