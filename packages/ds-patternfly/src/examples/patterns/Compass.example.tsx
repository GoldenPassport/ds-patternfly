/**
 * Compass Integrations — a full Compass org-demo: branded header with
 * pill top-nav, icon side rails, a filterable integrations table / card
 * gallery (DataView), an "Add integration" modal, and the AiAssistant
 * docked in the CompassMessageBar footer slot. Fully responsive: below
 * `md` the nav collapses behind a hamburger drawer and the rails become
 * edge-handle overlays. Port of PF6's Compass org-demo
 * (https://www.patternfly.org/components/compass/org-demos), adapted to
 * run against react-core + react-data-view + react-icons only.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useEffect, useId, useState } from "react";
import {
  ActionList,
  ActionListGroup,
  ActionListItem,
  ActionsColumn,
  AiAssistant,
  Avatar,
  Button,
  ButtonVariant,
  Card,
  CardBody,
  CardHeader,
  Compass,
  CompassContent,
  CompassHeader,
  CompassMainHeader,
  CompassMessageBar,
  Content,
  DescriptionList,
  DescriptionListDescription,
  DescriptionListGroup,
  DescriptionListTerm,
  DrawerActions,
  DrawerCloseButton,
  DrawerHead,
  DrawerPanelBody,
  DrawerPanelContent,
  Dropdown,
  DropdownItem,
  DropdownList,
  Flex,
  Form,
  FormGroup,
  FormSelect,
  FormSelectOption,
  Gallery,
  Label,
  Masthead,
  MastheadBrand,
  MastheadContent,
  MastheadLogo,
  MastheadMain,
  MastheadToggle,
  MenuToggle,
  type MenuToggleElement,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalVariant,
  Nav,
  NavItem,
  NavList,
  Pagination,
  Panel,
  PanelMain,
  PanelMainBody,
  SearchInput,
  SkipToContent,
  Tab,
  Tabs,
  TabsComponent,
  TabTitleText,
  TextInput,
  ToggleGroup,
  ToggleGroupItem,
  Toolbar,
  ToolbarContent,
  ToolbarGroup,
  ToolbarItem,
  Title,
  Tooltip,
  useTheme,
} from "@golden-passport/ds-patternfly";
import AngleLeftIcon from "@patternfly/react-icons/dist/esm/icons/angle-left-icon";
import AngleRightIcon from "@patternfly/react-icons/dist/esm/icons/angle-right-icon";
import BarsIcon from "@patternfly/react-icons/dist/esm/icons/bars-icon";
import { DataViewToolbar } from "@patternfly/react-data-view/dist/dynamic/DataViewToolbar";
import { DataViewTextFilter } from "@patternfly/react-data-view/dist/dynamic/DataViewTextFilter";
import { DataViewTable } from "@patternfly/react-data-view/dist/dynamic/DataViewTable";
import EllipsisVIcon from "@patternfly/react-icons/dist/esm/icons/ellipsis-v-icon";
import ListIcon from "@patternfly/react-icons/dist/esm/icons/list-icon";
import OutlinedCopyIcon from "@patternfly/react-icons/dist/esm/icons/outlined-copy-icon";
import OutlinedPlusSquareIcon from "@patternfly/react-icons/dist/esm/icons/outlined-plus-square-icon";
import OutlinedQuestionCircleIcon from "@patternfly/react-icons/dist/esm/icons/outlined-question-circle-icon";
import PlayIcon from "@patternfly/react-icons/dist/esm/icons/play-icon";
import ThIcon from "@patternfly/react-icons/dist/esm/icons/th-icon";

// ──────────────────────────────────────────────────────────────────
// Patterns/Compass — Integrations (org-demo port)
// Source: https://www.patternfly.org/components/compass/org-demos
// Adapted: dropped @patternfly/chatbot MessageBar + local image
// assets so the demo runs against just react-core + react-data-view
// + react-icons (already in this workspace). Replaces MessageBar
// with a plain SearchInput in the CompassMessageBar slot; replaces
// the Red Hat logos with inline text marks.
// ──────────────────────────────────────────────────────────────────


type StatusKind = "success" | "danger" | "warning" | "info" | "custom";

interface Integration {
  id: number;
  name: string;
  description: string;
  status: StatusKind;
  statusText: string;
  type: string;
  url: string;
}

const INTEGRATIONS: Integration[] = [
  {
    id: 1,
    name: "Ansible Automation Platform",
    description:
      "Ansible Automation Platform is an enterprise framework for building and operating IT automation at scale.",
    status: "success",
    statusText: "Connected",
    type: "MCP Server",
    url: "ansible.example.com",
  },
  {
    id: 2,
    name: "Github",
    description:
      "Github is a code hosting platform for version control and collaboration.",
    status: "danger",
    statusText: "Disconnected",
    type: "Version Control",
    url: "github.example.com",
  },
  {
    id: 3,
    name: "Kubernetes Cluster",
    description:
      "A Kubernetes cluster is a set of node machines for running containerized applications.",
    status: "warning",
    statusText: "Invalid fields",
    type: "MCP Server",
    url: "k8s.example.com",
  },
  {
    id: 4,
    name: "Docker Registry",
    description:
      "A Docker registry is a storage and distribution system for Docker images.",
    status: "success",
    statusText: "Connected",
    type: "Container Registry",
    url: "registry.example.com",
  },
  {
    id: 5,
    name: "Jenkins CI/CD",
    description:
      "Jenkins is an open source automation server for building, testing, and deploying software.",
    status: "success",
    statusText: "Connected",
    type: "CI/CD",
    url: "jenkins.example.com",
  },
  {
    id: 6,
    name: "GitLab",
    description:
      "GitLab is a complete DevOps platform delivered as a single application.",
    status: "danger",
    statusText: "Disconnected",
    type: "Version Control",
    url: "gitlab.example.com",
  },
  {
    id: 7,
    name: "Prometheus",
    description:
      "Prometheus is a monitoring system and time series database for metrics collection.",
    status: "success",
    statusText: "Connected",
    type: "Monitoring",
    url: "prometheus.example.com",
  },
  {
    id: 8,
    name: "Elasticsearch",
    description:
      "Elasticsearch is a distributed search and analytics engine for all types of data.",
    status: "warning",
    statusText: "Degraded",
    type: "Search Engine",
    url: "elasticsearch.example.com",
  },
  {
    id: 9,
    name: "Redis Cache",
    description:
      "Redis is an in-memory data structure store used as a database, cache, and message broker.",
    status: "success",
    statusText: "Connected",
    type: "Cache",
    url: "redis.example.com",
  },
  {
    id: 10,
    name: "PostgreSQL Database",
    description:
      "PostgreSQL is a powerful, open source object-relational database system.",
    status: "success",
    statusText: "Connected",
    type: "Database",
    url: "postgres.example.com",
  },
  {
    id: 11,
    name: "Apache Kafka",
    description:
      "Apache Kafka is a distributed event streaming platform for building real-time data pipelines.",
    status: "warning",
    statusText: "Limited",
    type: "Message Queue",
    url: "kafka.example.com",
  },
  {
    id: 12,
    name: "Terraform",
    description:
      "Terraform is an infrastructure as code tool for building, changing, and versioning infrastructure.",
    status: "success",
    statusText: "Connected",
    type: "Infrastructure",
    url: "terraform.example.com",
  },
];

// Avatar: inline-SVG portrait so the demo is asset-free. Uses the
// Acme brand blue (#0066cc) so the user portrait reads as part of
// the same identity as the AcmeLogo in the header.
//
// Centring: anchor the text at the geometric centre of the circle
// (x=20, y=20) with text-anchor='middle' for horizontal centring
// and dominant-baseline='central' for vertical centring. The older
// `y='55%'` eyeballed-offset approach drifts when font metrics
// change (e.g. system-font override on Windows).
const AVATAR_SRC =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'>` +
      `<circle cx='20' cy='20' r='20' fill='#0066cc'/>` +
      `<text x='20' y='20' text-anchor='middle' dominant-baseline='central' ` +
      `font-family='-apple-system,Segoe UI,sans-serif' font-size='15' ` +
      `font-weight='600' fill='white'>AF</text></svg>`,
  );

// Two PF6 breakpoints drive the responsive collapse:
//   - NARROW_BP (md, 768): below this, heavy chrome (sidebars,
//     toolbar layout, glass-theme switch) collapses.
//   - MEDIUM_BP (lg, 992): below this, lightweight chrome (avatar
//     wordmark, full pagination control set) collapses to its
//     compact form. Tablets sit in this band — they have horizontal
//     room for the sidebars but not for "1 - 12 of 12" + per-page
//     dropdown next to the search input.
const NARROW_BP = 768;
const MEDIUM_BP = 992;

function useMediaBelow(px: number) {
  const [matches, setMatches] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia(`(max-width: ${px - 1}px)`).matches
      : false,
  );
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${px - 1}px)`);
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches);
    // `addEventListener` over the legacy `addListener` — Safari 14+.
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [px]);
  return matches;
}

export default function IntegrationsDemo() {
  // All DOM ids derive from useId so multiple instances can coexist.
  const uid = useId();
  const mainContentId = `${uid}-main-content`;
  // useId values contain ":" — escape for use inside the CSS below.
  const mainContentSel = `#${CSS.escape(mainContentId)}`;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // Top-nav active item — drives both the desktop Tabs pill and
  // (when narrow) the mobile sidenav drawer. Integrations starts
  // active to match the page body.
  const [activeTab, setActiveTab] = useState<number>(1);
  // Mobile side-nav drawer state. The drawer is only reachable from
  // the hamburger button, which itself is only rendered below md
  // (PF6 utility classes do the visibility). At md+ the top nav
  // stays in the header as a Tabs pill — no drawer involved.
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const closeMobileNav = () => setIsMobileNavOpen(false);
  // Mobile-only rail toggles. md+ keeps both rails always expanded
  // (controlled below by `isNarrow ? railXOpen : true`); on phones
  // they default closed and open as overlays via edge handles.
  const [isLeftRailOpen, setIsLeftRailOpen] = useState(false);
  const [isRightRailOpen, setIsRightRailOpen] = useState(false);
  // "Thinking" indicator on the AI message bar — flips on when the
  // user taps the send button, off after a few seconds. Drives the
  // pulsating brand-coloured ring around the pill.
  // Positioned container the AiAssistant overlays (recent popover + full chat)
  // portal into and anchor to — it wraps the whole Compass surface below.
  const [aiOverlayEl, setAiOverlayEl] = useState<HTMLDivElement | null>(null);
  const [activeDisplay, setActiveDisplay] = useState<"table" | "card">("table");
  // "Add integration" demo modal — a small form (name + type) that
  // doesn't persist anything; closing or submitting just dismisses it.
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newType, setNewType] = useState("mcp");
  const closeAdd = () => {
    setIsAddOpen(false);
    setNewName("");
    setNewType("mcp");
  };
  // Status badges switch to the outline variant in dark mode (the
  // filled chips read too heavy against the dark surfaces); light
  // mode keeps the bold filled fill. Spread (rather than passing
  // `variant={undefined}`) so the prop is simply absent in light mode
  // — required under exactOptionalPropertyTypes.
  const { mode } = useTheme();
  const statusLabelProps =
    mode === "dark" ? ({ variant: "outline" } as const) : {};
  const isNarrow = useMediaBelow(NARROW_BP);
  const isBelowLg = useMediaBelow(MEDIUM_BP);

  // PF6 glass theme is opt-in via the root class — the app's
  // ThemeProvider owns the documentElement class.

  // ── Nav: single-level Tabs with the canonical TabsComponent.nav ──
  const navContent = (
    <Panel isPill isGlass>
      <PanelMain>
        <Tabs
          activeKey={activeTab}
          isNav
          onSelect={(_e, tabIndex) => setActiveTab(tabIndex as number)}
          component={TabsComponent.nav}
          aria-label="Compass global"
          inset={{ default: "insetXl" }}
        >
          <Tab eventKey={0} title={<TabTitleText>Dashboard</TabTitleText>} />
          <Tab
            eventKey={1}
            title={<TabTitleText>Integrations</TabTitleText>}
          />
          <Tab eventKey={2} title={<TabTitleText>Workflows</TabTitleText>} />
          <Tab
            eventKey={3}
            title={<TabTitleText>Settings</TabTitleText>}
            isDisabled
          />
        </Tabs>
      </PanelMain>
    </Panel>
  );

  // ── Vertical icon-list sidebars (start + end) ──
  // Edge-handle buttons live INSIDE each sidebar's React tree so
  // they're DOM children of .pf-v6-c-compass__sidebar — they slide
  // with the rail when its translate transition runs, and their
  // CSS visibility/positioning is driven from inside the rail. PF6
  // sets visibility:hidden on the collapsed sidebar; the handle
  // overrides that with `visibility: visible !important` so it
  // remains tappable when the rail itself is hidden. Rendered only
  // on mobile via `isNarrow`. CSS in the mobile media block.
  const leftRailHandle = isNarrow ? (
    <button
      type="button"
      aria-label={isLeftRailOpen ? "Close left rail" : "Open left rail"}
      aria-expanded={isLeftRailOpen}
      onClick={() => setIsLeftRailOpen((o) => !o)}
      className={`gp-cmp-rail-handle gp-cmp-rail-handle--start${
        isLeftRailOpen ? " is-rail-open" : ""
      }`}
    >
      {isLeftRailOpen ? <AngleLeftIcon /> : <AngleRightIcon />}
    </button>
  ) : null;

  const rightRailHandle = isNarrow ? (
    <button
      type="button"
      aria-label={isRightRailOpen ? "Close right rail" : "Open right rail"}
      aria-expanded={isRightRailOpen}
      onClick={() => setIsRightRailOpen((o) => !o)}
      className={`gp-cmp-rail-handle gp-cmp-rail-handle--end${
        isRightRailOpen ? " is-rail-open" : ""
      }`}
    >
      {isRightRailOpen ? <AngleRightIcon /> : <AngleLeftIcon />}
    </button>
  ) : null;

  const startSidebar = (
    <>
      <Panel isPill isGlass>
        <PanelMain>
          <PanelMainBody>
            <ActionList isIconList isVertical>
              <ActionListGroup>
                <ActionListItem>
                  <Tooltip content="Run">
                    <Button
                      variant="plain"
                      icon={<PlayIcon />}
                      aria-label="Run"
                      isCircle
                    />
                  </Tooltip>
                </ActionListItem>
                <ActionListItem>
                  <Tooltip content="Add integration">
                    <Button
                      variant="plain"
                      icon={<OutlinedPlusSquareIcon />}
                      aria-label="Add integration"
                      isCircle
                    />
                  </Tooltip>
                </ActionListItem>
              </ActionListGroup>
              <ActionListGroup>
                <ActionListItem>
                  <Tooltip content="Help">
                    <Button
                      variant="plain"
                      icon={<OutlinedQuestionCircleIcon />}
                      aria-label="Help"
                      isCircle
                    />
                  </Tooltip>
                </ActionListItem>
                <ActionListItem>
                  <Tooltip content="Copy">
                    <Button
                      variant="plain"
                      icon={<OutlinedCopyIcon />}
                      aria-label="Copy"
                      isCircle
                    />
                  </Tooltip>
                </ActionListItem>
              </ActionListGroup>
            </ActionList>
          </PanelMainBody>
        </PanelMain>
      </Panel>
      {leftRailHandle}
    </>
  );

  const endSidebar = (
    <>
      <Panel isPill isGlass>
        <PanelMain>
          <PanelMainBody>
            <ActionList isIconList isVertical>
              <ActionListItem>
                <Tooltip content="Notifications">
                  <Button
                    variant="plain"
                    icon={<OutlinedQuestionCircleIcon />}
                    aria-label="Notifications"
                    isCircle
                  />
                </Tooltip>
              </ActionListItem>
              <ActionListItem>
                <Tooltip content="Add">
                  <Button
                    variant="plain"
                    icon={<OutlinedPlusSquareIcon />}
                    aria-label="Add"
                    isCircle
                  />
                </Tooltip>
              </ActionListItem>
              <ActionListItem>
                <Tooltip content="Help">
                  <Button
                    variant="plain"
                    icon={<OutlinedQuestionCircleIcon />}
                    aria-label="Help"
                    isCircle
                  />
                </Tooltip>
              </ActionListItem>
            </ActionList>
          </PanelMainBody>
        </PanelMain>
      </Panel>
      {rightRailHandle}
    </>
  );

  // ── Profile slot: user dropdown.
  //
  // Three viewport variants, all sharing the same Dropdown body:
  //   • lg+  (≥992px): plain isCircle MenuToggle wrapping a Flex
  //     with name + Avatar (Dashboard pattern).
  //   • md   (768–991px): same plain isCircle MenuToggle but the
  //     name is dropped and the chrome flattens via below-lg media
  //     query — leaves a bare Avatar.
  //   • <md  mobile: Shell-pattern pill MenuToggle with
  //     `icon={<Avatar size="sm" />}` — Avatar + caret inside the
  //     pill, anchored to the right edge of the header. This is the
  //     ONLY branch that uses Shell's MenuToggle shape; md keeps
  //     the Dashboard shape so the existing tablet design holds.
  const userDropdown = (
    <Dropdown
      isOpen={isDropdownOpen}
      onSelect={() => setIsDropdownOpen(false)}
      onOpenChange={(isOpen: boolean) => setIsDropdownOpen(isOpen)}
      popperProps={{ position: "right" }}
      toggle={(toggleRef: React.Ref<MenuToggleElement>) =>
        isNarrow ? (
          <MenuToggle
            ref={toggleRef}
            aria-label="Aliyah Frazier"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            isExpanded={isDropdownOpen}
            icon={<Avatar src={AVATAR_SRC} alt="" size="sm" />}
          />
        ) : (
          <MenuToggle
            ref={toggleRef}
            aria-label="Aliyah Frazier"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            isExpanded={isDropdownOpen}
            variant="plain"
            isCircle
          >
            <Flex
              alignItems={{ default: "alignItemsCenter" }}
              gap={{ default: "gapMd" }}
            >
              {!isBelowLg && "Aliyah Frazier"}
              <Avatar src={AVATAR_SRC} alt="" size="md" />
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

  // Hamburger button — visible only below md via PF6 utility class.
  // Toggles a left-side Drawer that contains the mobile nav (built
  // from the same tab labels as navContent, rendered as a vertical
  // Nav list). On md+ the top-nav Tabs pill renders normally; the
  // hamburger never appears, so the drawer's isExpanded state stays
  // false regardless.
  const mobileNavToggle = (
    <Button
      variant="plain"
      aria-label="Open navigation"
      aria-expanded={isMobileNavOpen}
      aria-controls={`${uid}-mobile-nav`}
      icon={<BarsIcon />}
      onClick={() => setIsMobileNavOpen((o) => !o)}
      className="pf-v6-u-display-flex pf-v6-u-display-none-on-md"
    />
  );

  // Mobile-only header — port of the Page story's Unified-Surface
  // Masthead pattern (Components/Page → "Unified surface — flat
  // sidebar + content"). PF6 Masthead handles the
  // hamburger/brand/actions layout natively, so we don't have to
  // fight CompassHeader's grid on a 360px screen. md+ still uses
  // the original CompassHeader with the Tabs pill in the nav slot.
  const mobileMasthead = (
    <Masthead display={{ default: "inline" }}>
      <MastheadMain>
        <MastheadToggle>{mobileNavToggle}</MastheadToggle>
        <MastheadBrand>
          <MastheadLogo component="a" href="#" aria-label="Acme home">
            <strong style={{ fontSize: "1.125rem" }}>Acme Cloud</strong>
          </MastheadLogo>
        </MastheadBrand>
      </MastheadMain>
      <MastheadContent>
        <Toolbar id={`${uid}-masthead-toolbar`} isStatic>
          <ToolbarContent>
            <ToolbarItem align={{ default: "alignEnd" }}>
              {userDropdown}
            </ToolbarItem>
          </ToolbarContent>
        </Toolbar>
      </MastheadContent>
    </Masthead>
  );

  const desktopHeader = (
    <CompassHeader
      logo={
        <a href="#" aria-label="Acme home" tabIndex={0}>
          <strong style={{ fontSize: "1.125rem" }}>Acme Cloud</strong>
        </a>
      }
      nav={navContent}
      profile={userDropdown}
    />
  );

  const headerContent = isNarrow ? mobileMasthead : desktopHeader;

  // Drawer panel for the mobile side-nav. Vertical PF6 Nav, same
  // entries as the top-nav Tabs above. Tap a row → updates activeTab
  // and closes the drawer. The DrawerCloseButton on the panel head
  // mirrors the standard PF6 dismissal affordance.
  const mobileNavPanel = (
    <DrawerPanelContent id={`${uid}-mobile-nav`}>
      <DrawerHead>
        <strong>Navigation</strong>
        <DrawerActions>
          <DrawerCloseButton onClick={closeMobileNav} />
        </DrawerActions>
      </DrawerHead>
      <DrawerPanelBody>
        <Nav aria-label="Compass primary">
          <NavList>
            {[
              { key: 0, label: "Dashboard" },
              { key: 1, label: "Integrations" },
              { key: 2, label: "Workflows" },
              { key: 3, label: "Settings" },
            ].map((item) => (
              <NavItem
                key={item.key}
                itemId={item.key}
                isActive={activeTab === item.key}
                onClick={() => {
                  setActiveTab(item.key);
                  closeMobileNav();
                }}
              >
                {item.label}
              </NavItem>
            ))}
          </NavList>
        </Nav>
      </DrawerPanelBody>
    </DrawerPanelContent>
  );

  // ── Card view (Gallery of integration cards) ──
  const cardView = (
    <>
      <Toolbar className="gp-cmp-toolbar">
        <ToolbarContent>
          <ToolbarGroup>
            <ToolbarItem>
              <SearchInput
                aria-label="Integrations search"
                placeholder="Filter by name"
              />
            </ToolbarItem>
          </ToolbarGroup>
          <ToggleGroup>
            <ToggleGroupItem
              icon={<ThIcon />}
              aria-label="Card view"
              isSelected={activeDisplay === "card"}
              onChange={() => setActiveDisplay("card")}
            />
            <ToggleGroupItem
              icon={<ListIcon />}
              aria-label="Table view"
              isSelected={activeDisplay === "table"}
              onChange={() => setActiveDisplay("table")}
            />
          </ToggleGroup>
          <ToolbarItem variant="pagination" align={{ default: "alignEnd" }}>
            {/* Match the list (table) view's pagination exactly — it's
                the canonical one — so the pager reads the same in both
                display modes. isCompact below lg keeps the search +
                view toggle + pager on one row on tablets. */}
            <Pagination page={1} perPage={10} isCompact={isBelowLg} />
          </ToolbarItem>
        </ToolbarContent>
      </Toolbar>
      <Gallery hasGutter>
        {INTEGRATIONS.map((product) => (
          <Card
            isCompact
            isFullHeight
            isGlass
            key={product.id}
            id={product.name.replace(/ /g, "-")}
          >
            <CardHeader
              actions={{
                actions: (
                  <Dropdown
                    isOpen={false}
                    onOpenChange={() => {}}
                    toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
                      <MenuToggle
                        ref={toggleRef}
                        aria-label={`${product.name} actions`}
                        variant="plain"
                        icon={<EllipsisVIcon />}
                      />
                    )}
                    popperProps={{ position: "right" }}
                  />
                ),
              }}
            >
              <Content component="h2">{product.name}</Content>
              <Content component="small">{product.type}</Content>
            </CardHeader>
            <CardBody isFilled>{product.description}</CardBody>
            <CardBody>
              <DescriptionList aria-label={`${product.name} details`}>
                <DescriptionListGroup>
                  <DescriptionListTerm>Status</DescriptionListTerm>
                  <DescriptionListDescription>
                    <Label
                      status={product.status}
                      isCompact
                      {...statusLabelProps}
                    >
                      {product.statusText}
                    </Label>
                  </DescriptionListDescription>
                </DescriptionListGroup>
                <DescriptionListGroup>
                  <DescriptionListTerm>URL</DescriptionListTerm>
                  <DescriptionListDescription>
                    <a href={`https://${product.url}`}>{product.url}</a>
                  </DescriptionListDescription>
                </DescriptionListGroup>
              </DescriptionList>
            </CardBody>
          </Card>
        ))}
      </Gallery>
    </>
  );

  // ── Table view (DataViewTable wired up with row actions) ──
  const rowActions = [
    { title: "Edit", onClick: () => {} },
    { title: "Duplicate", onClick: () => {} },
    { isSeparator: true },
    { title: "Delete", onClick: () => {} },
  ];

  const rows = INTEGRATIONS.map(
    ({ name, type, status, statusText }, index) => ({
      id: name,
      row: [
        {
          id: "select",
          row: name,
          cell: undefined,
          props: {
            select: {
              index,
              rowIndex: index,
              onSelect: () => {},
              isSelected: false,
              "aria-label": `Select row ${name}`,
            },
          },
        },
        name,
        type,
        {
          cell: (
            <Label status={status} isCompact {...statusLabelProps}>
              {statusText}
            </Label>
          ),
        },
        {
          cell: <ActionsColumn items={rowActions} />,
          props: { isActionCell: true },
        },
      ],
    }),
  );

  const columns = [
    {
      cell: undefined,
      props: {
        select: {
          onSelect: () => {},
          isSelected: false,
          "aria-label": "Select all",
        },
        screenReaderText: "Select",
      },
    },
    "Name",
    "Type",
    "Status",
    { cell: undefined, props: { screenReaderText: "Actions" } },
  ];

  const tableView = (
    <>
      <DataViewToolbar
        className="gp-cmp-toolbar"
        clearAllFilters={() => {}}
        filters={
          <DataViewTextFilter
            filterId="name"
            title="Name"
            placeholder="Filter by name"
          />
        }
        actions={
          <ToggleGroup>
            <ToggleGroupItem
              icon={<ThIcon />}
              aria-label="Card view"
              isSelected={activeDisplay === "card"}
              onChange={() => setActiveDisplay("card")}
            />
            <ToggleGroupItem
              icon={<ListIcon />}
              aria-label="Table view"
              isSelected={activeDisplay === "table"}
              onChange={() => setActiveDisplay("table")}
            />
          </ToggleGroup>
        }
        pagination={
          <Pagination page={1} perPage={10} isCompact={isBelowLg} />
        }
      />
      <DataViewTable
        aria-label="Integrations"
        columns={columns}
        rows={rows}
        className="pf-m-plain"
      />
    </>
  );

  // Page-header Card wrapping CompassMainHeader — title + actions
  // row that sits above the body Panel. PF6's CompassMainHeader
  // provides the title-slot / toolbar-slot grid; the surrounding
  // Card gives the elevated surface treatment.
  const pageHeaderCard = (
    <Card isCompact isGlass className="gp-cmp-page-header-card">
      <CardBody>
        {/* Two card-level actions, anchored to the card's corners
            via absolute positioning so they're independent of the
            CompassMainHeader title row:
              • Kebab "More options" — top right
              • Primary CTA "Add integration" — bottom right
            CompassMainHeader keeps the title block (h1 + subtitle)
            and ships with an empty toolbar slot since the CTA has
            moved out. */}
        <Button
          icon={<EllipsisVIcon />}
          variant="plain"
          isCircle
          aria-label="More options"
          className="gp-cmp-page-header-kebab"
        />
        <Button
          variant={ButtonVariant.primary}
          icon={<OutlinedPlusSquareIcon />}
          className="gp-cmp-page-header-cta"
          onClick={() => setIsAddOpen(true)}
        >
          Add integration
        </Button>
        <Modal
          variant={ModalVariant.small}
          isOpen={isAddOpen}
          onClose={closeAdd}
          ouiaId="AddIntegrationModal"
          aria-labelledby={`${uid}-add-integration-title`}
          aria-describedby={`${uid}-add-integration-body`}
        >
          <ModalHeader
            title="Add integration"
            labelId={`${uid}-add-integration-title`}
            description="Connect a new external service to your workspace."
          />
          <ModalBody id={`${uid}-add-integration-body`}>
            <Form
              id={`${uid}-add-integration-form`}
              onSubmit={(e) => {
                e.preventDefault();
                closeAdd();
              }}
            >
              <FormGroup
                label="Integration name"
                isRequired
                fieldId={`${uid}-add-integration-name`}
              >
                <TextInput
                  isRequired
                  type="text"
                  id={`${uid}-add-integration-name`}
                  name="add-integration-name"
                  value={newName}
                  onChange={(_e, v) => setNewName(v)}
                  placeholder="e.g. Ansible Automation Platform"
                />
              </FormGroup>
              <FormGroup label="Type" fieldId={`${uid}-add-integration-type`}>
                <FormSelect
                  id={`${uid}-add-integration-type`}
                  value={newType}
                  onChange={(_e, v) => setNewType(v)}
                  aria-label="Integration type"
                >
                  <FormSelectOption value="mcp" label="MCP Server" />
                  <FormSelectOption value="vcs" label="Version Control" />
                  <FormSelectOption value="ci" label="CI/CD" />
                  <FormSelectOption
                    value="registry"
                    label="Container Registry"
                  />
                  <FormSelectOption value="monitoring" label="Monitoring" />
                </FormSelect>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button
              key="add"
              variant={ButtonVariant.primary}
              form={`${uid}-add-integration-form`}
              type="submit"
              isDisabled={newName.trim() === ""}
            >
              Add integration
            </Button>
            <Button key="cancel" variant="link" onClick={closeAdd}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        <CompassMainHeader
          title={
            <div className="gp-cmp-page-header-title-block">
              <Title headingLevel="h1">Integrations</Title>
              <Content
                component="p"
                className="gp-cmp-page-header-subtitle"
              >
                Connect, monitor, and manage every external service
                wired into your workflows.
              </Content>
            </div>
          }
        />
      </CardBody>
    </Card>
  );

  // Page-header card sits ABOVE the body Panel at every viewport
  // — same split-card layout on mobile + md + lg. (Previously
  // mobile nested the header inside the scrolling Panel.)
  const mainContent = (
    <>
      {pageHeaderCard}
      <CompassContent>
        <Panel
          isScrollable
          isAutoHeight
          isGlass
          id={mainContentId}
          // Focusable so the SkipToContent link's native fragment jump lands
          // focus here, not just scroll.
          tabIndex={-1}
          // In card view the gallery tiles are themselves glass; drop
          // the panel's own glass fill so the tiles sit directly on
          // the gradient canvas and read as frosted (otherwise two
          // translucent layers stack and the cards look milky/opaque).
          {...(activeDisplay === "card"
            ? { className: "gp-cmp-content-cards" }
            : {})}
        >
          <PanelMain tabIndex={-1}>
            <PanelMainBody>
              {activeDisplay === "table" ? tableView : cardView}
            </PanelMainBody>
          </PanelMain>
        </Panel>
      </CompassContent>
    </>
  );

  // CompassMessageBar slot — PF6's canonical demo plugs the chatbot
  // MessageBar here. Workspace doesn't carry @patternfly/chatbot, so
  // we substitute a plain SearchInput styled as a prompt entry to
  // demonstrate the slot's intended footprint.
  // Footer message bar — pill-shaped input with a send button on
  // the right (mimics a chat / "send a message" affordance). Built
  // as a plain <div> + <input> + <button> instead of PF6's
  // TextInputGroup because TextInputGroup's nested grid + flex
  // chain was making the input non-typable when overridden into a
  // pill shape. Keeping the markup minimal so the input is
  // straightforwardly interactive.
  // The footer slot hosts the AiAssistant message bar. The bar renders here;
  // its overlays (recent-chat popover + full-chat panel / modal) portal up to
  // the positioned wrapper around the whole Compass surface (aiOverlayEl), so
  // the conversation floats over the content rather than inside the footer.
  const footerContent = (
    <CompassMessageBar>
      <div className="gp-cmp-ai-bar">
        <AiAssistant
          overlayContainer={aiOverlayEl}
          placement="bottom-right"
          persist={false}
        />
      </div>
    </CompassMessageBar>
  );

  return (
    <>
      {/* Scoped toolbar polish for this story.
          - Vertical-align every direct child of the toolbar's content
            row so SearchInput (default control height), ToggleGroup
            buttons, and Pagination sit on the same baseline instead
            of drifting against each other.
          - Repaint the ToggleGroup's selected-item background to the
            brand focus-ring dark-blue (the same colour the
            SearchInput uses for its inner focus ring under the
            `focusRing: inner` global), so the "card / list" toggle
            reads as part of the same theme accent rather than PF6's
            default light-blue. */}
      <style>{`
        /* Page-header Card spacing — minimal gap below before the
           body Panel begins, so the title row reads as part of the
           same data block instead of floating above it. */
        .gp-cmp-page-header-card {
          margin-block-end: 0.25rem;
        }
        /* Title block — stacks the h1 and subtitle vertically
           inside the CompassMainHeader's title slot. Gap controls
           the spacing between them; margins on the children are
           zeroed so the gap is the single source of truth. */
        .gp-cmp-page-header-title-block {
          display: flex;
          flex-direction: column;
          gap: 0.125rem;
          min-width: 0;
        }
        .gp-cmp-page-header-title-block .pf-v6-c-title {
          margin: 0;
        }
        /* Subtitle — deemphasised via the subtle text token and a
           smaller font so the h1 keeps the visual weight. */
        .gp-cmp-page-header-subtitle {
          margin: 0;
          font-size: 0.875rem;
          line-height: 1.4;
          color: var(--gp-color-text-subtle, currentColor);
        }
        /* Footer message bar — pill-shaped row with a plain input
           + send button. Built as a div+input+button (NOT
           TextInputGroup) because PF6's TextInputGroup nests
           multiple grids/flex containers that fight pill styling
           and made the input non-typable. Flat structure here
           keeps the input straightforwardly interactive.
           position: relative anchors the ::before glow layer (see
           the thinking-state rules below). */
        .gp-cmp-message-bar {
          position: relative;
          margin-block: 0.75rem;
          display: flex;
          align-items: center;
          border-radius: 9999px;
          /* Base background reads from the same PF6 global token
             the rails (Panel default) and body Panel (Panel.pf-m-
             glass) ultimately resolve to. Cascades correctly to:
               • non-glass light: opaque cream
               • non-glass dark:  opaque dark
               • glass light:     rgba(255,255,255,0.6)
               • glass dark:      rgba(41,41,41,0.5)
             Using --gp-color-bg-secondary-default here (the
             previous value) gave an OPAQUE brand colour in glass
             mode and broke the translucent glass look. */
          background: var(--pf-t--global--background--color--primary--default);
          border: 1px solid var(--gp-color-border-default, rgba(0, 0, 0, 0.15));
          padding-inline-start: 1rem;
          padding-inline-end: 0.5rem;
          block-size: 3rem;
        }
        .gp-cmp-message-bar__input {
          flex: 1;
          min-inline-size: 0;
          block-size: 100%;
          padding: 0;
          margin: 0;
          background: transparent;
          border: 0;
          outline: none;
          color: var(--gp-color-text-regular, currentColor);
          font: inherit;
          line-height: normal;
        }
        .gp-cmp-message-bar__input::placeholder {
          color: var(--gp-color-text-subtle, currentColor);
        }
        .gp-cmp-message-bar__send {
          color: var(--gp-color-text-link, currentColor);
          flex: 0 0 auto;
        }
        /* Suppress the bare input's own focus outline — the lib's
           global :focus-visible rule paints one around every
           focusable element, which was producing the second
           (inner) ring around just the input. Focus is shown by
           the wrapper instead so the ring spans the whole pill
           (input + send button + padding). */
        .gp-cmp-message-bar__input:focus,
        .gp-cmp-message-bar__input:focus-visible {
          outline: none;
        }
        /* Focus ring on the pill wrapper — respects the
           focusRing: inner / outer toolbar setting via the lib's
           .gp-focus-ring-* classes set by ThemeProvider. Inner
           mode draws the ring INSIDE the pill border; outer mode
           pushes it OUTSIDE. */
        .gp-cmp-message-bar:focus-within {
          outline: 2px solid var(--gp-color-focus-ring, currentColor);
          border-radius: 9999px;
        }
        .gp-focus-ring-inner .gp-cmp-message-bar:focus-within {
          /* Push the ring further inside the pill so it sits
             clearly inset from the 1px border rather than directly
             on top of it. -4px = clear ~3px inset past the border. */
          outline-offset: -4px;
        }
        .gp-focus-ring-outer .gp-cmp-message-bar:focus-within {
          outline-offset: 2px;
        }
        /* "Thinking" state — soft pulsating brand-coloured cloud
           around the pill while the AI is generating a response.
           The glow lives on a ::before pseudo-element rather than
           the pill itself. That gets us:
             • smooth fade-IN when .is-thinking is added (opacity
               transition 0 → 1 over 400ms)
             • continuous breathing while the class is present
               (keyframe animation on the ::before)
             • smooth fade-OUT when the class is removed (the same
               opacity transition runs in reverse)
           The pulse keyframes drive box-shadow on the ::before.
           Four stacked layers at increasing blur radii, zero
           spread = diffuse cloud (not a hard ring). */
        .gp-cmp-message-bar::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          pointer-events: none;
          opacity: 0;
          transition: opacity 400ms ease;
        }
        .gp-cmp-message-bar.is-thinking::before {
          opacity: 1;
          animation: gp-cmp-thinking-pulse 2.4s ease-in-out infinite;
        }
        .gp-cmp-message-bar.is-thinking {
          border-color: color-mix(in srgb, var(--gp-color-brand-default) 50%, transparent);
          transition: border-color 400ms ease;
        }
        @keyframes gp-cmp-thinking-pulse {
          0%, 100% {
            box-shadow:
              0  0  12px 0 color-mix(in srgb, var(--gp-color-brand-default) 40%, transparent),
              0  0  24px 0 color-mix(in srgb, var(--gp-color-brand-default) 30%, transparent),
              0  0  40px 0 color-mix(in srgb, var(--gp-color-brand-hover, var(--gp-color-brand-default)) 25%, transparent),
              0  0  60px 0 color-mix(in srgb, var(--gp-color-brand-default) 15%, transparent);
          }
          50% {
            box-shadow:
              0  0  20px 0 color-mix(in srgb, var(--gp-color-brand-default) 55%, transparent),
              0  0  40px 0 color-mix(in srgb, var(--gp-color-brand-default) 40%, transparent),
              0  0  64px 0 color-mix(in srgb, var(--gp-color-brand-hover, var(--gp-color-brand-default)) 35%, transparent),
              0  0  96px 0 color-mix(in srgb, var(--gp-color-brand-default) 22%, transparent);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .gp-cmp-message-bar.is-thinking::before {
            animation: none;
            box-shadow:
              0  0  24px 0 color-mix(in srgb, var(--gp-color-brand-default) 45%, transparent),
              0  0  60px 0 color-mix(in srgb, var(--gp-color-brand-default) 20%, transparent);
          }
        }

        /* Footer slot — bottom padding so the pill has clearance
           from the viewport edge. */
        .pf-v6-c-compass__footer {
          padding-block-end: 0.75rem;
        }

        /* Content panel inset — match the header Card's body padding
           (1rem) so the table content lines up flush with the title
           above it. PF6's Panel__main-body defaults to 24px, which
           read as a wider inset than the 16px header Card body and
           made the two cards feel misaligned. */
        ${mainContentSel} > .pf-v6-c-panel__main > .pf-v6-c-panel__main-body {
          padding: 1rem;
        }

        /* Glass theme — make the inner Table fully transparent so
           it doesn't stack a second translucent layer over the
           body Panel's pf-m-glass surface.
           PF6 Table defaults --pf-v6-c-table--BackgroundColor to
           primary--default. Under glass that resolves to a 50–60%
           translucent fill. Painted over the Panel's already-50%
           translucent surface, you get ~75% effective opacity —
           the table area reads darker/lighter than the rest of
           the Panel chrome.
           Zero the table-related backgrounds so only the Panel's
           single glass layer paints. */
        .pf-v6-theme-glass .pf-v6-c-table,
        .pf-v6-theme-glass .pf-v6-c-table__thead,
        .pf-v6-theme-glass .pf-v6-c-table__tbody,
        .pf-v6-theme-glass .pf-v6-c-table__tr,
        .pf-v6-theme-glass .pf-v6-c-table__th,
        .pf-v6-theme-glass .pf-v6-c-table__td {
          --pf-v6-c-table--BackgroundColor: transparent;
          background: transparent !important;
          /* This table lives inside the frosted content Panel, so it
             must stay flat — override the lib's standalone-table frost
             (which adds its own blur). */
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
        }

        /* Row kebab buttons in the DataView table — render as
           perfect circles instead of rounded squares. PF6's
           ActionsColumn renders a .pf-v6-c-menu-toggle.pf-m-plain
           that defaults to a small border-radius. Override to a
           full pill radius + square aspect ratio so the button
           shape is a proper circle around the 3-dots glyph. */
        .pf-v6-c-table .pf-v6-c-table__action .pf-v6-c-menu-toggle.pf-m-plain {
          border-radius: 9999px;
          aspect-ratio: 1;
          padding: 0;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        /* Card-view tile kebabs — same circular treatment as the
           table row kebabs above. The Card header's actions slot
           renders the same .pf-v6-c-menu-toggle.pf-m-plain, which
           defaults to a 6px-radius square; round it to a circle so
           the 3-dots affordance matches across list + card views. */
        .pf-v6-c-card__actions .pf-v6-c-menu-toggle.pf-m-plain {
          border-radius: 9999px;
          aspect-ratio: 1;
          padding: 0;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        /* Card view — strip the content panel's OWN glass fill + blur
           so the gallery tiles (which are isGlass) sit directly on the
           gradient canvas. Without this the panel and the tiles both
           paint a 50% translucent layer; stacked they read ~75% opaque
           and the tiles lose the frosted look. id+class out-specifies
           the panel's other glass rules, and !important beats the
           blanket blur/shadow stamped on ${mainContentSel}. */
        .pf-v6-theme-glass ${mainContentSel}.gp-cmp-content-cards,
        .pf-v6-theme-glass ${mainContentSel}.gp-cmp-content-cards .pf-v6-c-panel__main,
        .pf-v6-theme-glass ${mainContentSel}.gp-cmp-content-cards .pf-v6-c-panel__main-body {
          background: transparent !important;
          --pf-v6-c-panel--m-glass--BackgroundColor: transparent !important;
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
          box-shadow: none !important;
        }

        /* Page-header Card — strip its border and shadow at every
           viewport / brand so it matches the rails (which are PF6
           Panel default = no border, no shadow). Without this the
           Card picks up its own --pf-v6-c-card--BorderColor /
           --BoxShadow defaults, which vary per brand and break the
           "one surface family" look. Glass mode is already handled
           by the dedicated rules above. */
        .gp-cmp-page-header-card.pf-v6-c-card {
          --pf-v6-c-card--BorderColor: transparent;
          --pf-v6-c-card--BorderWidth: 0;
          --pf-v6-c-card--BoxShadow: none;
          border: 0;
        }

        /* Glass theme — match the rails / body Panel EXACTLY by
           reading from the same PF6 Panel.pf-m-glass tokens
           instead of redeclaring the values. The m-glass--*
           tokens already carry our overrides (primary--default
           background, small shadow) — sharing them guarantees the
           message bar renders identically to the Panel surfaces
           under any theme combination (light glass, dark glass). */
        .pf-v6-theme-glass .gp-cmp-message-bar {
          background:
            var(--pf-v6-c-panel--m-glass--BackgroundColor,
              var(--pf-t--global--background--color--glass--primary--default));
          border: 0;
          box-shadow:
            var(--pf-v6-c-panel--m-glass--BoxShadow,
              0 1px 3px rgba(0, 0, 0, 0.10));
          backdrop-filter:
            var(--pf-v6-c-panel--m-glass--BackdropFilter,
              blur(20px) saturate(140%));
          -webkit-backdrop-filter:
            var(--pf-v6-c-panel--m-glass--BackdropFilter,
              blur(20px) saturate(140%));
        }

        /* Above mobile (md+) the AI search pill mirrors the side
           rails as a single, consistent surface family:
             • Same background tokens (rail's Panel BG in normal
               mode; rail's m-glass primary--default in glass mode).
             • Same border, shadow, and backdrop-filter as the
               rails so the pill reads as "a horizontal rail" —
               its height matches the rails' width (~48px).
             • Pill radius already inherited from the base rule. */
        @media (min-width: ${NARROW_BP}px) {
          /* Match the rails fully on md+.
             Rails = <Panel isPill isGlass>. In NON-glass mode the
             .pf-m-glass modifier is a no-op (PF6 only activates it
             under .pf-v6-theme-glass), so the rail renders with
             Panel defaults:
               • background: primary--default (opaque cream)
               • border: none (--pf-v6-c-panel--before--BorderWidth: 0)
               • box-shadow: none (--pf-v6-c-panel--BoxShadow: none)
             The message bar mirrors those defaults — no extra
             border or shadow — so the rails and message bar read
             as the same chrome family. */
          .gp-cmp-message-bar {
            background:
              var(--pf-t--global--background--color--primary--default);
            border: 0;
            box-shadow: none;
          }
          /* Glass mode — the rails' .pf-m-glass treatment kicks in,
             which my earlier rules also apply to the message bar
             via the same token chain. Add backdrop-filter directly
             since this element isn't .pf-m-glass, so the global
             glass selector doesn't reach it. Read the glass--* token
             (translucent) — NOT --primary--default, which the brand
             dials override to an opaque colour (see the "no glass"
             note on the redirect block above). */
          .pf-v6-theme-glass .gp-cmp-message-bar {
            background:
              var(--pf-t--global--background--color--glass--primary--default);
            border: 0;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.10);
            backdrop-filter: blur(20px) saturate(140%);
            -webkit-backdrop-filter: blur(20px) saturate(140%);
          }
        }
        /* Send button — brand-link colour so the icon reads as a
           primary action without competing with the pill chrome.
           Slight rotation on the paper-plane matches the "lifting
           off" angle of the reference (~-30deg tilt). */
        .gp-cmp-message-bar .pf-v6-c-text-input-group__utilities .pf-v6-c-button {
          --pf-v6-c-button--PaddingBlockStart: 0;
          --pf-v6-c-button--PaddingBlockEnd: 0;
          color: var(--gp-color-text-link, currentColor);
        }
        /* PaperPlaneIcon already points up-right in PF6 react-icons
           — no rotation override. */

        /* Top-right kebab — anchor to the Card's top-right corner.
           The Card body is the positioning context (position
           defaults to relative on .pf-v6-c-card__body in PF6's
           card.css; if not, the Card itself becomes the ancestor
           since neither has transform/filter). z-index keeps the
           button above the CompassMainHeader content if they ever
           overlap on narrow widths. */
        .gp-cmp-page-header-card {
          position: relative;
        }
        .gp-cmp-page-header-kebab {
          position: absolute;
          inset-block-start: 0.5rem;
          inset-inline-end: 0.5rem;
          z-index: 2;
        }
        /* Primary CTA — anchored to the bottom-right corner of the
           Card, opposite the kebab top-right. Sits over the
           subtitle line if the subtitle wraps long; the subtitle
           gets a padding-inline-end (below) to reserve space for
           the button at narrow widths. Inset matches the Card body
           padding (1rem / 16px) so the button's edges line up with
           the title + subtitle content rather than sitting closer to
           the card edge. */
        .gp-cmp-page-header-cta {
          position: absolute;
          inset-block-end: 1rem;
          inset-inline-end: 1rem;
          z-index: 2;
        }
        /* Card body needs enough height to hold both the kebab
           (top-right, ~36px) and the CTA (bottom-right, ~36px)
           without their vertical bounds overlapping. 7rem gives:
             0.5rem (kebab top) + 36px kebab + ~24px breathing room
             + 36px CTA + 0.75rem (CTA bottom)  ≈ 6.75rem.
           Rounded up to 7rem to ensure clear separation even when
           the title + subtitle content is short. */
        .gp-cmp-page-header-card .pf-v6-c-card__body {
          min-block-size: 7rem;
        }
        /* Reserve right-edge space in the subtitle for the CTA so
           subtitle text doesn't underrun behind the button. */
        .gp-cmp-page-header-subtitle {
          padding-inline-end: 12rem;
        }

        /* Canvas behind the glass surfaces — brand-aware gradient
           so the backdrop-filter blur has variation to pick up.
           Glass = translucent fill + blur of whatever's behind it.
           Without colour variation in the backdrop the blur reads
           as invisible (uniform colour blurred = same colour).
           Apply a radial gradient built from the active brand's
           own dial tokens (--gp-color-brand-default for the gold
           glow, --gp-color-accent for the cool counter-glow,
           --gp-color-bg-primary-default for the base surface).
           color-mix dilutes each glow to ~30-45% alpha so it reads
           as a tint, not a solid wash. Because all three layers
           read from gp tokens, the canvas re-paints automatically
           when the user flips the brand toolbar from default →
           golden-passport (warm gold + teal accents), and when
           ThemeProvider flips mode light → dark (tokens themselves
           cascade to the dark-mode palette). */
        .pf-v6-theme-glass [data-brand] > div[style] {
          background:
            /* Brand glow moved to top-RIGHT (was top-left). Through
               the page-header card (which sits in the upper area),
               this puts the heavier brand colour on the right side
               of the card and leaves the left side reading as the
               lighter base — so the card reads as light → dark
               left-to-right instead of the reverse. */
            radial-gradient(circle at 85% 20%,
              color-mix(in srgb, var(--gp-color-brand-default) 45%, transparent) 0%,
              transparent 45%),
            radial-gradient(circle at 15% 80%,
              color-mix(in srgb, var(--gp-color-accent, var(--gp-color-brand-hover)) 35%, transparent) 0%,
              transparent 45%),
            radial-gradient(circle at 50% 50%,
              color-mix(in srgb, var(--gp-color-brand-default) 20%, transparent) 0%,
              transparent 60%),
            var(--gp-color-bg-primary-default) !important;
        }
        /* Dark glass — bump the glow intensity so brand colours
           cut through the dark canvas. Glow positions mirror the
           light variant above. */
        .pf-v6-theme-dark.pf-v6-theme-glass [data-brand] > div[style],
        .pf-v6-theme-glass.pf-v6-theme-dark [data-brand] > div[style] {
          background:
            radial-gradient(circle at 85% 20%,
              color-mix(in srgb, var(--gp-color-brand-default) 55%, transparent) 0%,
              transparent 50%),
            radial-gradient(circle at 15% 80%,
              color-mix(in srgb, var(--gp-color-accent, var(--gp-color-brand-hover)) 45%, transparent) 0%,
              transparent 50%),
            radial-gradient(circle at 50% 50%,
              color-mix(in srgb, var(--gp-color-brand-default) 30%, transparent) 0%,
              transparent 65%),
            var(--gp-color-bg-primary-default) !important;
        }

        /* Boost backdrop blur on every glass surface so the
           frosting reads against the gradient canvas. PF6's default
           is 16px — bump to 24px and add 140% saturation (classic
           iOS glassmorphism cue — pumps the colour through the
           blur). */
        .pf-v6-theme-glass .pf-v6-c-masthead:not(.pf-m-docked),
        .pf-v6-theme-glass .pf-v6-c-card.pf-m-glass,
        .pf-v6-theme-glass .pf-v6-c-panel.pf-m-glass {
          backdrop-filter: blur(24px) saturate(140%) !important;
          -webkit-backdrop-filter: blur(24px) saturate(140%) !important;
        }

        /* Unify the glass background across every glass surface.
           Pin every per-component m-glass token to the SAME source:
           --pf-t--global--background--color--glass--primary--default
           — PF6's translucent glass fill (rgba(255,255,255,0.5) light,
           rgba(41,41,41,0.5) dark).
           NOTE: do NOT use --background--color--primary--default here.
           That token is the page surface, and this lib's brand dials
           override it to an OPAQUE brand colour (#fbf8f3 for
           golden-passport) via toCssVars. PF6's own Panel/Card glass
           rules re-point their m-glass tokens locally to the glass--*
           token, so the rails/body panel stay translucent regardless —
           but the message bar is a plain <div>, not a .pf-v6-c-panel,
           so it inherits whatever this redirect resolves to. Pointing
           at the opaque primary token was the "no glass" bug: the pill
           rendered as a solid #fbf8f3 surface while every real Panel
           around it stayed frosted. Reading the glass--* token keeps
           the pill in lockstep with the panels. */
        .pf-v6-theme-glass {
          --pf-v6-c-card--m-glass--BackgroundColor:
            var(--pf-t--global--background--color--glass--primary--default);
          --pf-v6-c-panel--m-glass--BackgroundColor:
            var(--pf-t--global--background--color--glass--primary--default);
        }
        /* Clear every glass-border token across all Compass
           surfaces under glass theme. PF6 paints a 1px ring on
           every .pf-m-glass surface (Panel, Card, masthead) via
           per-component border tokens that ultimately resolve to
           --pf-t--global--border--color--glass--default. The
           cleanest fix is to override that global glass-border
           token at the Compass root so every glass-aware component
           inside (Panel, Card, Masthead, etc.) inherits a
           transparent border. Belt-and-braces: the per-component
           m-glass border tokens are also zeroed so any selector
           that bypasses the global token still lands on a
           transparent border. */
        .pf-v6-theme-glass .pf-v6-c-compass,
        .pf-v6-theme-glass .pf-v6-c-compass__container,
        .pf-v6-theme-glass .pf-v6-c-compass__header,
        .pf-v6-theme-glass .pf-v6-c-compass__sidebar,
        .pf-v6-theme-glass .pf-v6-c-compass__main,
        .pf-v6-theme-glass .pf-v6-c-compass__content,
        .pf-v6-theme-glass .pf-v6-c-compass__footer,
        .pf-v6-theme-glass .pf-v6-c-compass .pf-v6-c-panel,
        .pf-v6-theme-glass .pf-v6-c-compass .pf-v6-c-card,
        .pf-v6-theme-glass .gp-cmp-page-header-card {
          /* Underlying global glass-border colour token —
             cascades to every glass-aware component. */
          --pf-t--global--border--color--glass--default: transparent;
          /* Panel m-glass border (via ::before pseudo) */
          --pf-v6-c-panel--before--BorderColor: transparent;
          --pf-v6-c-panel--m-glass--before--BorderColor: transparent;
          /* Card m-glass border (direct border property on the Card) */
          --pf-v6-c-card--m-glass--BorderColor: transparent;
          --pf-v6-c-card--BorderColor: transparent;
        }
        /* Topnavbar (masthead) — both the desktop header and the
           mobile masthead (pf-m-display-inline). Paint the same
           translucent glass--* fill the other surfaces use, plus an
           explicit border-block-end + backdrop-filter so the bar
           reads as a glass surface (PF6 ships these via tokens that
           sometimes resolve to "initial" depending on cascade —
           apply them directly to guarantee they land).
           Use the glass--* token, NOT --primary--default: the brand
           dials override --primary--default to an opaque colour
           (#fbf8f3 for golden-passport), which left the masthead a
           solid bar while everything below it stayed frosted — the
           same "no glass" bug the message bar / rail handles had. */
        .pf-v6-theme-glass .pf-v6-c-masthead:not(.pf-m-docked) {
          background-color:
            var(--pf-t--global--background--color--glass--primary--default) !important;
          backdrop-filter:
            var(--pf-t--global--background--filter--glass--blur--primary) !important;
          -webkit-backdrop-filter:
            var(--pf-t--global--background--filter--glass--blur--primary) !important;
          border-block-end: 1px solid
            color-mix(in srgb,
              var(--pf-t--global--border--color--default, currentColor) 30%,
              transparent) !important;
        }

        /* Dropdown / select menus — PF6 portals .pf-v6-c-menu to
           <body>, OUTSIDE the Compass DOM and the [data-brand]
           wrapper, but it still inherits the glass + brand tokens
           from :root (these story rules are global, so they reach
           the portaled node). Give the menu the same frosted look
           as the other surfaces so dropdowns — row kebabs, the
           top-right user menu, the pagination page-size menu — read
           as glass instead of solid panels.
           Only .pf-v6-c-menu paints a background (its content / list
           / items are transparent), so one rule covers it. Use the
           glass--* token: the brand dials override --primary--default
           (and thus --pf-v6-c-menu--BackgroundColor) to an opaque
           colour, which is why the menu rendered solid. */
        .pf-v6-theme-glass .pf-v6-c-menu {
          background-color:
            var(--pf-t--global--background--color--glass--primary--default);
          backdrop-filter: blur(20px) saturate(140%);
          -webkit-backdrop-filter: blur(20px) saturate(140%);
        }

        /* Modals — same story as the dropdown menu. The
           .pf-v6-c-modal-box portals to <body>, inherits the :root
           glass tokens, but defaults to an opaque brand surface
           (--pf-v6-c-modal-box--BackgroundColor → the dial-overridden
           opaque colour). Only the box paints a background; its
           header / body / footer are transparent. Make the box the
           translucent glass fill + frosted blur so the modal reads as
           a glass surface in keeping with the rest of the chrome. */
        .pf-v6-theme-glass .pf-v6-c-modal-box {
          /* Mimic the dropdown menu's frosted glass exactly — the
             translucent glass fill + blur(20px) saturate(140%). The
             dialog stays readable because the page behind it is
             frosted by the backdrop blur below (no sharp text bleeds
             through to fight the modal's own text). */
          background-color:
            var(--pf-t--global--background--color--glass--primary--default);
          backdrop-filter: blur(20px) saturate(140%);
          -webkit-backdrop-filter: blur(20px) saturate(140%);
        }
        /* Backdrop — light tint + a STRONG page blur so everything
           behind the dialog dissolves into a frosted wash. This is
           what keeps the translucent box readable: the content behind
           is blurred past legibility, so no page text competes with
           the modal copy (the dropdown menu has no scrim, but a modal
           needs one for focus). */
        .pf-v6-theme-glass .pf-v6-c-backdrop {
          background-color: color-mix(in srgb,
            var(--pf-t--global--background--color--primary--default) 25%,
            transparent);
          backdrop-filter: blur(12px) saturate(120%);
          -webkit-backdrop-filter: blur(12px) saturate(120%);
        }

        /* ── Frosted interactive states ──
           In glass mode every hover / selected fill goes TRANSLUCENT
           so it sits ON the frosted surface instead of punching an
           opaque block through the glass. Two recipes:
             • Neutral states → a translucent tint of the text colour.
               Theme-adaptive: a faint dark overlay in light mode, a
               faint light overlay in dark mode.
             • Brand-selected states (ToggleGroup) → a dense
               translucent brand so the glass shows through while the
               white icon/label stays legible.
           Most plain/icon buttons read their hover from the global
           action--plain tokens, so overriding those two covers the
           rails, kebabs, masthead toggle, send button, pagination
           arrows, and header CTA in one shot.
           NB: the brand dials set these tokens via [data-brand]
           [data-mode] (specificity 0,2,0) on <html>, so the override
           must out-specify that — hence [data-brand][data-mode]
           .pf-v6-theme-glass (0,3,0), all three on the same <html>. */
        [data-brand][data-mode].pf-v6-theme-glass {
          --pf-t--global--background--color--action--plain--hover:
            color-mix(in srgb, var(--gp-color-text-regular) 10%, transparent);
          --pf-t--global--background--color--action--plain--clicked:
            color-mix(in srgb, var(--gp-color-text-regular) 16%, transparent);
        }
        /* Dropdown menu items (row kebabs, user menu, page-size). */
        .pf-v6-theme-glass .pf-v6-c-menu {
          --pf-v6-c-menu__list-item--hover--BackgroundColor:
            color-mix(in srgb, var(--gp-color-text-regular) 10%, transparent);
          --pf-v6-c-menu__item--hover--BackgroundColor:
            color-mix(in srgb, var(--gp-color-text-regular) 10%, transparent);
        }
        /* Top-nav Tabs — hover/focus fill behind each tab link.
           PF6 paints this from a per-link component token, so a bare
           .pf-v6-c-tabs__link:hover rule gets out-specified by PF6's
           own hover/focus chain. Override the token on the link
           instead so the translucent value always wins. */
        .pf-v6-theme-glass .pf-v6-c-tabs__link {
          --pf-v6-c-tabs__link--hover--BackgroundColor:
            color-mix(in srgb, var(--gp-color-text-regular) 8%, transparent);
          --pf-v6-c-tabs__link--focus--BackgroundColor:
            color-mix(in srgb, var(--gp-color-text-regular) 8%, transparent);
        }
        /* Top-navbar + side-rail icon buttons (variant="plain") and
           every other plain button — masthead toggle, row/header
           kebabs, the rail action buttons, message-bar send,
           pagination arrows. PF6 keeps the plain-button hover on a
           PER-BUTTON token, separate from the global action--plain
           token overridden above, so it has to be re-pointed here. */
        .pf-v6-theme-glass .pf-v6-c-button.pf-m-plain {
          --pf-v6-c-button--m-plain--hover--BackgroundColor:
            color-mix(in srgb, var(--gp-color-text-regular) 10%, transparent);
          --pf-v6-c-button--m-plain--active--BackgroundColor:
            color-mix(in srgb, var(--gp-color-text-regular) 16%, transparent);
        }
        /* Masthead user MenuToggle (top-right) hover fill. */
        .pf-v6-theme-glass .pf-v6-c-menu-toggle {
          --pf-v6-c-menu-toggle--hover--BackgroundColor:
            color-mix(in srgb, var(--gp-color-text-regular) 10%, transparent);
        }
        /* Sidebar / drawer Nav — hover/focus (token) + current. */
        .pf-v6-theme-glass .pf-v6-c-nav__link {
          --pf-v6-c-nav__link--hover--BackgroundColor:
            color-mix(in srgb, var(--gp-color-text-regular) 8%, transparent);
          --pf-v6-c-nav__link--focus--BackgroundColor:
            color-mix(in srgb, var(--gp-color-text-regular) 8%, transparent);
        }
        .pf-v6-theme-glass .pf-v6-c-nav__link.pf-m-current,
        .pf-v6-theme-glass .pf-v6-c-nav__link[aria-current="page"] {
          background-color:
            color-mix(in srgb, var(--gp-color-brand-default) 18%, transparent);
        }
        /* DataView / Table rows — hover highlight. */
        .pf-v6-theme-glass .pf-v6-c-table > tbody > tr:hover,
        .pf-v6-theme-glass .pf-v6-c-table__tbody > tr:hover,
        .pf-v6-theme-glass .pf-v6-c-table__tr:hover {
          background-color:
            color-mix(in srgb, var(--gp-color-text-regular) 7%, transparent) !important;
        }
        /* ToggleGroup (card / list switch) — selected + hover. */
        .pf-v6-theme-glass .pf-v6-c-toggle-group__button.pf-m-selected {
          background-color:
            color-mix(in srgb, var(--gp-color-brand-default) 72%, transparent) !important;
        }
        .pf-v6-theme-glass
          .pf-v6-c-toggle-group__button:not(.pf-m-selected):hover {
          background-color:
            color-mix(in srgb, var(--gp-color-text-regular) 8%, transparent);
        }
        /* Secondary buttons — hover fill. */
        .pf-v6-theme-glass .pf-v6-c-button.pf-m-secondary:hover {
          background-color:
            color-mix(in srgb, var(--gp-color-text-regular) 8%, transparent);
        }
        /* Pagination nav arrows — hover fill. */
        .pf-v6-theme-glass .pf-v6-c-pagination .pf-v6-c-button:hover {
          background-color:
            color-mix(in srgb, var(--gp-color-text-regular) 10%, transparent);
        }

        /* Glass surfaces — subtle shadow + strong frosted blur.
           Two-part:
             1. Reduce PF6's default glass shadow to a softer one
                that still defines each glass surface's edge — not
                so tight it reads flat (0 1px 2px was invisible),
                not so heavy it cascades into a noisy stack of
                overlapping drop-shadows (PF6 default).
             2. Stamp a strong backdrop-blur on every glass surface
                so the "frosted" effect reads regardless of what's
                behind it. PF6 ships backdrop-filter via tokens that
                some selectors override — applying directly here
                guarantees the blur lands on every surface. */
        .pf-v6-theme-glass {
          --pf-t--global--box-shadow--glass--default:
            0 1px 3px rgba(0, 0, 0, 0.10);
        }
        .pf-v6-theme-glass .gp-cmp-page-header-card,
        .pf-v6-theme-glass ${mainContentSel},
        .pf-v6-theme-glass .pf-v6-c-compass__sidebar .pf-v6-c-panel.pf-m-glass,
        .pf-v6-theme-glass .pf-v6-c-compass__footer .pf-v6-c-panel.pf-m-glass,
        .pf-v6-theme-glass .pf-v6-c-masthead:not(.pf-m-docked),
        .pf-v6-theme-glass .gp-cmp-message-bar {
          --pf-v6-c-card--m-glass--BoxShadow:
            0 1px 3px rgba(0, 0, 0, 0.10);
          --pf-v6-c-panel--m-glass--BoxShadow:
            0 1px 3px rgba(0, 0, 0, 0.10);
          --pf-v6-c-card--BoxShadow:
            0 1px 3px rgba(0, 0, 0, 0.10);
          --pf-v6-c-panel--BoxShadow:
            0 1px 3px rgba(0, 0, 0, 0.10);
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.10) !important;
          /* Stamp a strong frosted blur directly. PF6's default is
             16px — bump to 20px and apply with !important so it
             wins over any other backdrop-filter the surface picks
             up. Without this, the blur reads as invisible on a
             uniform-dark canvas (blur of one colour = same colour).
             Strong blur makes the variation in the table rows
             behind the glass visibly soften through the surface. */
          backdrop-filter: blur(20px) saturate(140%) !important;
          -webkit-backdrop-filter: blur(20px) saturate(140%) !important;
        }

        /* CompassMainHeader height — shrink at every viewport.
           PF6 wraps the title + toolbar in a Panel → Panel__main
           → Panel__main-body chain, each carrying ~1rem block
           padding (~3rem stacked). The h1 also defaults to a
           large display size with its own line-height. Zero the
           Panel chain and clamp the title font ramp so the header
           row sits at roughly the height of the toolbar's kebab
           button. */
        .gp-cmp-page-header-card .pf-v6-c-card__body {
          --pf-v6-c-card__body--PaddingBlockStart: 0.5rem;
          --pf-v6-c-card__body--PaddingBlockEnd: 0.5rem;
        }
        .gp-cmp-page-header-card .pf-v6-c-compass__main-header,
        .gp-cmp-page-header-card .pf-v6-c-compass__main-header > .pf-v6-c-panel,
        .gp-cmp-page-header-card .pf-v6-c-compass__main-header .pf-v6-c-panel__main,
        .gp-cmp-page-header-card .pf-v6-c-compass__main-header .pf-v6-c-panel__main-body {
          padding-block: 0;
          background: transparent;
        }
        /* Drop the Panel__main-body's inline padding so the title +
           subtitle align flush to the Card body's own left padding
           edge, rather than being indented a further 24px inside it. */
        .gp-cmp-page-header-card .pf-v6-c-compass__main-header .pf-v6-c-panel__main-body {
          padding-inline: 0;
        }
        .gp-cmp-page-header-card .pf-v6-c-compass__main-header-content {
          align-items: center;
          gap: 0.5rem;
        }
        .gp-cmp-page-header-card .pf-v6-c-compass__main-header h1,
        .gp-cmp-page-header-card .pf-v6-c-compass__main-header .pf-v6-c-title {
          font-size: 1.25rem;
          line-height: 1.3;
          margin: 0;
        }
        /* Toolbar inside the header row — kill block padding so the
           kebab doesn't bloat the row height. */
        .gp-cmp-page-header-card .pf-v6-c-compass__main-header .pf-v6-c-toolbar,
        .gp-cmp-page-header-card .pf-v6-c-compass__main-header .pf-v6-c-toolbar__content,
        .gp-cmp-page-header-card .pf-v6-c-compass__main-header .pf-v6-c-toolbar__content-section {
          padding-block: 0;
        }

        /* Glass-mode chrome for the page-header Card is handled by
           PF6's native isGlass prop on Card — adds pf-m-glass which
           the :where(.pf-v6-theme-glass) .pf-v6-c-card.pf-m-glass
           rule in card.css picks up.

           BUT: the inner Panel + Toolbar chain that CompassMainHeader
           ships with each paints an opaque background of its own,
           which blocks the see-through glass effect. Under glass
           theme, paint each inner surface with PF6's low-alpha
           glass token instead — gives a frosted "you can sort of
           look through it" layer rather than a flat opaque fill.
           The Card itself still owns the border/shadow/blur from
           its own pf-m-glass treatment; these inner surfaces just
           inherit a matching translucent tint so the whole stack
           reads as one glass layer. */
        /* Inner surfaces in the page-header Card — TRANSPARENT.
           The Card's own pf-m-glass paint is the single glass layer
           we want visible. Each inner element (Card body, Compass
           main-header wrapper, the Panel/Panel__main/Panel__main-
           body chain CompassMainHeader ships with, the Toolbar
           shell + content rows) painting a translucent colour
           would compound via CSS alpha compositing:
             1 layer  @ 0.6 alpha = 0.60
             2 layers @ 0.6 alpha = 0.84
             8 layers @ 0.6 alpha ≈ 0.99
           That made the header card render ~opaque (visibly
           different from the other single-glass surfaces in light
           mode, and indistinguishable from the canvas in dark
           mode). Force all inner surfaces transparent so only the
           Card's glass surface contributes colour. */
        .pf-v6-theme-glass .gp-cmp-page-header-card .pf-v6-c-card__body,
        .pf-v6-theme-glass .gp-cmp-page-header-card .pf-v6-c-compass__main-header,
        .pf-v6-theme-glass .gp-cmp-page-header-card .pf-v6-c-panel,
        .pf-v6-theme-glass .gp-cmp-page-header-card .pf-v6-c-panel__main,
        .pf-v6-theme-glass .gp-cmp-page-header-card .pf-v6-c-panel__main-body,
        .pf-v6-theme-glass .gp-cmp-page-header-card .pf-v6-c-toolbar,
        .pf-v6-theme-glass .gp-cmp-page-header-card .pf-v6-c-toolbar__content,
        .pf-v6-theme-glass .gp-cmp-page-header-card .pf-v6-c-toolbar__content-section {
          --pf-v6-c-panel--BackgroundColor: transparent;
          --pf-v6-c-toolbar--BackgroundColor: transparent;
          --pf-v6-c-card__body--BackgroundColor: transparent;
          background-color: transparent !important;
        }

        /* Profile slot polish — all viewports.
           CompassHeader places the profile slot as a grid item in
           column 3 (1fr) of its 1fr/auto/1fr grid. The slot itself
           is just a div — PF6 doesn't align its content to the
           right edge of the cell. Push it there with grid+flex
           combo so the user dropdown sits flush at the viewport
           edge with the logo flush at the left, regardless of how
           wide the centre nav slot grew. */
        /* Profile slot: push to right edge, all viewports.
           PF6 already sets justify-self: end on this slot, but the
           combination of display:flex on the grid item + the
           dropdown's intrinsic width can stop the grid alignment
           from kicking in cleanly. Force the issue with auto-margin
           on the inline-start side: in both grid and flex contexts,
           an auto inline-start margin pushes the element to the end
           of its container regardless of what justify-self decides
           to do. */
        .pf-v6-c-compass__profile {
          justify-self: end;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          margin-inline-start: auto;
          min-width: 0;
        }
        /* Symmetric: keep the logo pinned to the left edge. */
        .pf-v6-c-compass__logo {
          justify-self: start;
          display: flex;
          align-items: center;
        }

        /* ── MD ONLY (768–991px) — profile MenuToggle flat ─
           Tablet uses the Dashboard plain-isCircle MenuToggle with
           the name dropped; the surrounding pill background reads
           as "button with avatar inside" which looks heavy here.
           Strip the chrome (bg, border, padding, shadow) on every
           state so just the avatar shows. The phone branch (<md)
           renders a different MenuToggle in JS — Shell-style with
           the icon prop carrying an Avatar and a real pill — that
           branch shouldn't be
           flattened, so this is scoped to the md band only. */
        @media (min-width: ${NARROW_BP}px) and (max-width: ${MEDIUM_BP - 1}px) {
          .pf-v6-c-compass__profile .pf-v6-c-menu-toggle {
            --pf-v6-c-menu-toggle--BackgroundColor: transparent;
            --pf-v6-c-menu-toggle--hover--BackgroundColor: transparent;
            --pf-v6-c-menu-toggle--focus--BackgroundColor: transparent;
            --pf-v6-c-menu-toggle--active--BackgroundColor: transparent;
            --pf-v6-c-menu-toggle--BorderColor: transparent;
            --pf-v6-c-menu-toggle--hover--BorderColor: transparent;
            --pf-v6-c-menu-toggle--focus--BorderColor: transparent;
            --pf-v6-c-menu-toggle--PaddingBlockStart: 0;
            --pf-v6-c-menu-toggle--PaddingBlockEnd: 0;
            --pf-v6-c-menu-toggle--PaddingInlineStart: 0;
            --pf-v6-c-menu-toggle--PaddingInlineEnd: 0;
            background-color: transparent;
            border: 0;
            padding: 0;
            box-shadow: none;
          }
          .pf-v6-c-compass__profile .pf-v6-c-menu-toggle:hover,
          .pf-v6-c-compass__profile .pf-v6-c-menu-toggle:focus,
          .pf-v6-c-compass__profile .pf-v6-c-menu-toggle.pf-m-expanded {
            background-color: transparent;
            box-shadow: none;
          }
        }

        /* ── Below md (phone only) ── */
        @media (max-width: ${NARROW_BP - 1}px) {
          /* Search row (toolbar) and table cells live in the same
             panel body. Align their inline edges so the search
             input's left border lines up with the table's left
             column. The panel body itself carries the outer
             gutter — zero the toolbar's own inline padding so it
             doesn't double up. The search input's intrinsic
             border-inset matches PF6's pf-m-plain table cell
             padding by default, so once the toolbar isn't
             double-padded the two line up. */
          .gp-cmp-toolbar .pf-v6-c-toolbar__content-row {
            flex-wrap: wrap;
            gap: 0.5rem;
            padding-inline: 0;
          }
          .gp-cmp-toolbar .pf-v6-c-toolbar__item {
            flex: 0 1 auto;
            min-width: 0;
          }
          /* 3. Search input takes the available row width minus the
                toggle (which sits flush right). */
          .gp-cmp-toolbar .pf-v6-c-toolbar__item:has(.pf-v6-c-text-input-group),
          .gp-cmp-toolbar .pf-v6-c-toolbar__item:has(.pf-v6-c-search-input) {
            flex: 1 1 auto;
          }
          .gp-cmp-toolbar .pf-v6-c-search-input,
          .gp-cmp-toolbar .pf-v6-c-text-input-group {
            width: 100%;
          }
          /* 4. Toggle group (and any non-search toolbar item) pushed
                to the right edge of the row via auto inline-start
                margin. flex-wrap means if the items don't fit
                inline, the toggle drops to a new row still aligned
                right. */
          .gp-cmp-toolbar .pf-v6-c-toggle-group {
            margin-inline-start: auto;
          }
          /* Push pagination to its own row, full-width, below the
             search + view toggle. */
          .gp-cmp-toolbar .pf-v6-c-toolbar__item.pf-m-pagination {
            flex-basis: 100%;
            justify-content: flex-end;
          }
          /* Side-rail edge handles — now DOM children of the rail
             itself. position: absolute relative to the rail (which
             is position: fixed on mobile) so the handle docks
             alongside the rail's outer edge and slides with it
             when the rail transitions open/closed.
             visibility + opacity overrides — PF6 sets
             visibility:hidden + opacity:0 on the collapsed sidebar,
             which inherits to the handle. Force the handle visible
             so it stays tappable when the rail itself is hidden. */
          .gp-cmp-rail-handle {
            position: absolute;
            inset-block-start: 50%;
            transform: translateY(-50%);
            z-index: 200;
            inline-size: 24px;
            block-size: 48px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0;
            border: 1px solid var(--gp-color-border-default, rgba(0, 0, 0, 0.15));
            background: var(--gp-color-bg-secondary-default, rgba(255, 255, 255, 0.85));
            color: var(--gp-color-text-regular);
            cursor: pointer;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.18);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            visibility: visible !important;
            opacity: 1 !important;
            pointer-events: auto !important;
          }
          .gp-cmp-rail-handle:hover,
          .gp-cmp-rail-handle:focus-visible {
            background: var(--gp-color-bg-secondary-hover, var(--gp-color-bg-secondary-default));
          }
          /* Glass theme — handles inherit the same glass treatment
             as every other glass surface: translucent glass token +
             stronger backdrop blur + low-alpha border so they read
             as small frosted tabs floating beside the rail.
             Read the glass--* token, NOT --primary--default: the
             brand dials override --primary--default to an opaque
             colour (#fbf8f3 for golden-passport), which rendered the
             handles as solid tabs instead of frosted ones — the same
             "no glass" bug the message bar had. The glass--* token is
             PF6's translucent fill (rgba(255,255,255,0.5) light,
             rgba(41,41,41,0.5) dark) and is left untouched by the
             dials, so it stays see-through. */
          .pf-v6-theme-glass .gp-cmp-rail-handle {
            background:
              var(--pf-t--global--background--color--glass--primary--default);
            backdrop-filter:
              var(--pf-t--global--background--filter--glass--blur--primary);
            -webkit-backdrop-filter:
              var(--pf-t--global--background--filter--glass--blur--primary);
            border-color: color-mix(in srgb,
              var(--pf-t--global--border--color--default, currentColor) 30%,
              transparent);
          }
          .pf-v6-theme-glass .gp-cmp-rail-handle:hover,
          .pf-v6-theme-glass .gp-cmp-rail-handle:focus-visible {
            background:
              color-mix(in srgb,
                var(--pf-t--global--background--color--glass--primary--default) 80%,
                var(--gp-color-brand-default) 20%);
          }
          /* Handle anchored to the rail's outer edge.
             The handle is a child of .pf-v6-c-compass__sidebar
             which is position: fixed and padded 0.5rem. Pin the
             handle to the rail's outer edge (right-edge of the
             left rail, left-edge of the right rail) so they read
             as one connected unit. Negative inset on the
             border-meeting side pulls the handle flush against the
             rail content edge. The chevron itself is the only
             part that sticks out PAST the rail's outer padding. */
          .gp-cmp-rail-handle--start {
            /* Default = closed-state offset (-24px). The
               open-state rule below tightens it to -16px when the
               rail expands. */
            inset-inline-end: -24px;
            border-start-start-radius: 0;
            border-end-start-radius: 0;
            border-start-end-radius: 8px;
            border-end-end-radius: 8px;
            border-inline-start: 0;
            /* Shadow casts right + down only — none on the LEFT
               side because that side touches the rail. */
            box-shadow: 2px 1px 4px rgba(0, 0, 0, 0.18);
            transition: inset-inline-end 200ms ease;
          }
          .gp-cmp-rail-handle--end {
            inset-inline-start: -24px;
            border-start-end-radius: 0;
            border-end-end-radius: 0;
            border-start-start-radius: 8px;
            border-end-start-radius: 8px;
            border-inline-end: 0;
            box-shadow: -2px 1px 4px rgba(0, 0, 0, 0.18);
            transition: inset-inline-start 200ms ease;
          }
          /* When the rail is open, pull the handle in closer to
             the rail edge (-24px → -16px) so the chevron sits
             tighter against the rail content. */
          .gp-rail-left-open .pf-v6-c-compass__sidebar.pf-m-start .gp-cmp-rail-handle--start {
            inset-inline-end: -16px;
          }
          .gp-rail-right-open .pf-v6-c-compass__sidebar.pf-m-end .gp-cmp-rail-handle--end {
            inset-inline-start: -16px;
          }
          /* No tap-outside scrim — rails are dismissible via the
             handle itself (now repositioned to the rail's outer
             edge when open). No darkening of the page content. */
          /* Rails as overlays on mobile — take them OUT of the
             container grid so the grid auto columns stay 0px and
             content doesn't shift when a rail opens.
             PF6 sets visibility:hidden + opacity:0 on the
             collapsed sidebar (the wrapper). That hides the handle
             too. Move the visibility/opacity gates DOWN to the
             rail content (Panel) only — the wrapper stays visible
             so the handle remains tappable. */
          .pf-v6-c-compass__sidebar.pf-m-start,
          .pf-v6-c-compass__sidebar.pf-m-end {
            position: fixed;
            grid-area: unset;
            inset-block-start: 0;
            block-size: 100dvh;
            z-index: 300;
            padding: 0.5rem;
            display: flex;
            align-items: center;
            visibility: visible !important;
            opacity: 1 !important;
          }
          .pf-v6-c-compass__sidebar.pf-m-start {
            inset-inline-start: 0;
          }
          .pf-v6-c-compass__sidebar.pf-m-end {
            inset-inline-end: 0;
          }
          /* Rail open/closed slide — driven by classes on the
             Compass root (so we can keep isSidebarXExpanded={true}
             on the Compass component and avoid PF6's inert
             attribute on collapsed sidebars). PF6's translate
             defaults to -100% for start / +100% for end on the
             sidebar; we override that to 0 when our open-class is
             present and put it back to -100%/100% when closed. */
          .gp-rail-left-closed .pf-v6-c-compass__sidebar.pf-m-start {
            translate: calc(var(--pf-v6-c-compass--section--slide--length--sidebar) * -1);
          }
          .gp-rail-left-open .pf-v6-c-compass__sidebar.pf-m-start {
            translate: 0;
          }
          .gp-rail-right-closed .pf-v6-c-compass__sidebar.pf-m-end {
            translate: var(--pf-v6-c-compass--section--slide--length--sidebar);
          }
          .gp-rail-right-open .pf-v6-c-compass__sidebar.pf-m-end {
            translate: 0;
          }
          /* Hide the Panel (rail content) when the rail is closed —
             but keep the sidebar wrapper visible so the handle
             stays tappable. */
          .gp-rail-left-closed .pf-v6-c-compass__sidebar.pf-m-start > .pf-v6-c-panel,
          .gp-rail-right-closed .pf-v6-c-compass__sidebar.pf-m-end > .pf-v6-c-panel {
            visibility: hidden;
            opacity: 0;
            pointer-events: none;
          }
          .gp-rail-left-open .pf-v6-c-compass__sidebar.pf-m-start > .pf-v6-c-panel,
          .gp-rail-right-open .pf-v6-c-compass__sidebar.pf-m-end > .pf-v6-c-panel {
            visibility: visible;
            opacity: 1;
            /* The open rail floats OVER the content here, so make it a solid
               surface (matching the edge handle) with a drop shadow instead
               of the see-through glass used on desktop. */
            background: var(--gp-color-bg-secondary-default, rgba(255, 255, 255, 0.96));
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
          }
          /* The plain icon-button hover defaults to the secondary surface —
             now the same colour as the open rail, so the hover would be
             invisible. Bump it to the darker secondary-hover tone. */
          .gp-rail-left-open .pf-v6-c-compass__sidebar.pf-m-start > .pf-v6-c-panel .pf-v6-c-button,
          .gp-rail-right-open .pf-v6-c-compass__sidebar.pf-m-end > .pf-v6-c-panel .pf-v6-c-button {
            --pf-v6-c-button--m-plain--hover--BackgroundColor:
              var(--gp-color-bg-secondary-hover, #e6dcc8);
          }
          .pf-v6-theme-glass .gp-rail-left-open .pf-v6-c-compass__sidebar.pf-m-start > .pf-v6-c-panel,
          .pf-v6-theme-glass .gp-rail-right-open .pf-v6-c-compass__sidebar.pf-m-end > .pf-v6-c-panel {
            background:
              var(--pf-t--global--background--color--glass--primary--default);
            backdrop-filter:
              var(--pf-t--global--background--filter--glass--blur--primary);
            -webkit-backdrop-filter:
              var(--pf-t--global--background--filter--glass--blur--primary);
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.35);
          }
          /* Glass theme — brand-tint the icon-button hover so it reads on
             the frosted rail. */
          .pf-v6-theme-glass .gp-rail-left-open .pf-v6-c-compass__sidebar.pf-m-start > .pf-v6-c-panel .pf-v6-c-button,
          .pf-v6-theme-glass .gp-rail-right-open .pf-v6-c-compass__sidebar.pf-m-end > .pf-v6-c-panel .pf-v6-c-button {
            --pf-v6-c-button--m-plain--hover--BackgroundColor:
              color-mix(in srgb,
                var(--pf-t--global--background--color--glass--primary--default) 70%,
                var(--gp-color-brand-default) 30%);
          }
          /* 3. Search input — restore the magnifying-glass icon's
                inline-start padding. With the panel-body padding
                tightened the icon was sitting flush against the
                input border. Padding lives on the __main element
                of the text-input-group. */
          .gp-cmp-toolbar .pf-v6-c-text-input-group__main {
            padding-inline-start: 0.5rem;
          }
          /* 4. Pagination on phones.
                The compact pager still ships with: total-items text,
                page-menu dropdown ("1 - 10 of 0"), prev arrow, next
                arrow. On a 360px row those overflow the right edge.
                  • Hide the redundant total-items label (the
                    page-menu toggle already shows the same text).
                  • Allow the nav to wrap if widths are tight, with
                    end-aligned content so it stays in the right
                    half of the toolbar row.
                  • Cap the pagination's own inline-size so it can't
                    push past 100% of its parent. */
          .gp-cmp-toolbar .pf-v6-c-pagination {
            inline-size: 100%;
            max-inline-size: 100%;
            flex-wrap: wrap;
            justify-content: flex-end;
            gap: 0.25rem;
          }
          .gp-cmp-toolbar .pf-v6-c-pagination__total-items {
            display: none;
          }
          .gp-cmp-toolbar .pf-v6-c-pagination__nav {
            margin-inline-start: auto;
          }
          /* Compass header — phones.
             Hide the nav (the pill row of tabs is unusable at this
             width — real apps swap it for a hamburger drawer). Add
             modest inline padding so the logo and profile aren't
             flush to the viewport edges. The grid template stays
             at PF6's default "1fr auto 1fr" — with nav hidden the
             centre column collapses, and the global "justify-self"
             rules on .__logo / .__profile pin the visible items to
             their respective edges. No grid-template override, no
             overflow: hidden, no max-inline-size: 100vw — all of
             those were stomping on PF6's layout. */
          /* Header layout on mobile.
             1. The header child IS a PF6 Masthead (rendered via the
                isNarrow JSX branch). Compass wraps it in a 3-column
                grid (1fr auto 1fr) — that confines the Masthead to
                column 1. Switch to block so the Masthead claims the
                full row.
             2. Zero the Compass container's padding + gap dials so
                the header sits flush against the top + edges of the
                viewport. PF6 defaults it to the page-chrome spacer
                (~16-24px) — fine on desktop, but on phones it eats
                a chunk of vertical room before the header even
                starts. With this zeroed AND the preview decorator's
                inline padding cleared below, the masthead lands at
                pixel 0.
             3. Background fill on the header so its surface reads
                as solid above the body panel.
             The header is "sticky" naturally on Compass — the
             container is a CSS grid with overflow:hidden and the
             body Panel scrolls internally, so the header never
             actually leaves the top of the viewport. No
             position:sticky needed. */
          .pf-v6-c-compass {
            --pf-v6-c-compass--Padding: 0;
            --pf-v6-c-compass--Gap: 0;
          }
          /* 1. Make sure NOTHING paints a band above the masthead.
                 Layers stacked from outermost in:
                   • html / body / app root — zero margins so the
                     page content starts at pixel-0.
                   • ThemeProvider's wrapper — already has
                     padding: 0 !important from the rule above.
                   • Compass + container — transparent so the
                     wrapper's surface (or the masthead's own
                     background) reads through without competing.
                   • Compass header — its top edge IS the page's
                     top. No padding-block-start (so the masthead
                     touches the top), only an end-padding + border
                     to separate from the body below. */
          html,
          body {
            margin: 0 !important;
            padding: 0 !important;
            background: transparent;
          }
          .pf-v6-c-compass,
          .pf-v6-c-compass__container {
            background: transparent;
            --pf-v6-c-compass--BackgroundColor: transparent;
            --pf-v6-c-compass--BackgroundColor--glass: transparent;
          }
          /* Glass theme adds a "bleed" gutter around __content via
             matching negative margins + positive padding, designed
             for a wide canvas where the glass panel extends beyond
             its container. On phones that makes the content panel
             render visibly wider and taller than its normal-mode
             counterpart. Zero both pairs of glass tokens so glass
             behaves like normal at this viewport — the inner panel
             still gets PF6's glass surface treatment, but no
             edge-bleed offset. */
          .pf-v6-c-compass {
            --pf-v6-c-compass__content--MarginBlockStart--glass: 0;
            --pf-v6-c-compass__content--MarginBlockEnd--glass: 0;
            --pf-v6-c-compass__content--MarginInlineStart--glass: 0;
            --pf-v6-c-compass__content--MarginInlineEnd--glass: 0;
            --pf-v6-c-compass__content--PaddingBlockStart--glass: 0;
            --pf-v6-c-compass__content--PaddingBlockEnd--glass: 0;
            --pf-v6-c-compass__content--PaddingInlineStart--glass: 0;
            --pf-v6-c-compass__content--PaddingInlineEnd--glass: 0;
          }
          /* Body content Panel (the glass surface around the table
             + toolbar) — drop the box-shadow on phones. PF6 paints
             a lifted "floating card" shadow on .pf-v6-c-panel.pf-m-
             glass when the glass theme is active; that looks fine on
             desktop where the panel is inset on every edge, but at
             phone widths the panel spans the viewport edges and the
             shadow reads as a stray bottom-cast halo. Zero the
             panel's BoxShadow token. */
          .pf-v6-c-compass__content > .pf-v6-c-panel.pf-m-glass {
            --pf-v6-c-panel--BoxShadow: none;
            --pf-v6-c-panel--m-glass--BoxShadow: none;
            box-shadow: none;
            /* Vertical spacing — tight on the top (header card sits
               right above), modest on the bottom before the
               message-bar footer. Block-only; inline stays
               edge-to-edge with the page gutter. */
            margin-block-start: 0;
            margin-block-end: 0.5rem;
          }
          /* Compass header wrapper — structural only, no surface.
             This is just a positioning slot in the container grid.
             The PF6 Masthead inside it handles its own surface in
             both modes:
               • Normal mode: --pf-v6-c-masthead--BackgroundColor
                 defaults to --pf-t--global--background--color--
                 secondary--default (the beige strip), with its own
                 --PaddingBlock + --BorderColor.
               • Glass mode: :where(.pf-v6-theme-glass)
                 .pf-v6-c-masthead:not(.pf-m-docked) swaps in
                 translucent fill + backdrop blur + glass border +
                 glass shadow tokens.
             Painting our own background here was overriding both
             modes and hiding PF6's glass treatment. Strip
             everything but the structural overrides:
               • display:block so the masthead claims the full row
                 (PF6 grid template was 1fr/auto/1fr — would confine
                 it to column 1).
               • padding/gap 0 so the wrapper adds no height.
               • background transparent so PF6's masthead paint
                 reads through. */
          .pf-v6-c-compass__header {
            display: block;
            padding: 0;
            gap: 0;
            background: transparent;
            border: 0;
          }
          .pf-v6-c-compass__header > .pf-v6-c-masthead {
            inline-size: 100%;
          }
          .pf-v6-c-compass__nav {
            display: none;
          }
          /* Page-header Card spacing on mobile.
             - margin-block-start: clear gap between the masthead
               (sticky at top) and the start of the header card.
             - margin-block-end: small gap before the body panel.
             - CardBody padding-block: bumped so the title row has
               real vertical room — reads as a proper header
               instead of a one-liner squeezed against the card
               edges. */
          /* Equal vertical gap above and below the page-header
             Card — 0.75rem on both sides. Two things have to be
             true for this to actually be consistent:
               1. The Card's own margin-block on both sides → 12px.
               2. The parent flex container .pf-v6-c-compass__main
                  ships with gap = var(--pf-v6-c-compass__main--
                  RowGap) which resolves to spacer-md (~16px). That
                  stacks BETWEEN the Card and CompassContent on top
                  of margin-block-end, making the gap below ~28px
                  while the gap above stayed at 12px (no flex gap
                  contributes there — Card is the first child).
                  Zero the RowGap on mobile so my margins are the
                  single source of truth. */
          .pf-v6-c-compass__main {
            --pf-v6-c-compass__main--RowGap: 0;
            gap: 0;
          }
          .gp-cmp-page-header-card {
            margin-block-start: 0.75rem;
            margin-block-end: 0.75rem;
          }
          .gp-cmp-page-header-card .pf-v6-c-card__body {
            --pf-v6-c-card__body--PaddingBlockStart: 1.25rem;
            --pf-v6-c-card__body--PaddingBlockEnd: 1.25rem;
            padding-block: 1.25rem;
          }
          /* 2. Page-header Card — strip the Card chrome on mobile.
             On phones the Card's border, background, and shadow
             read as a fenced "title widget" floating in the page,
             which is heavy and out of place between the masthead
             and the data row. Drop everything but the title's
             padding so it reads as a regular page heading. */
          .gp-cmp-page-header-card.pf-v6-c-card,
          .gp-cmp-page-header-card .pf-v6-c-card__body {
            background: transparent;
            border: 0;
            box-shadow: none;
            --pf-v6-c-card--BackgroundColor: transparent;
            --pf-v6-c-card--BorderColor: transparent;
            --pf-v6-c-card--BoxShadow: none;
          }
          /* CompassMainHeader chain — PF6 wraps title + toolbar in
             Panel → Panel__main → Panel__main-body, each carrying
             its own block padding (~3rem stacked). Zero so the
             Card body's own padding governs height. */
          .gp-cmp-page-header-card .pf-v6-c-compass__main-header,
          .gp-cmp-page-header-card .pf-v6-c-panel,
          .gp-cmp-page-header-card .pf-v6-c-panel__main,
          .gp-cmp-page-header-card .pf-v6-c-panel__main-body {
            padding: 0;
            background: transparent;
            gap: 0.5rem;
          }
          .gp-cmp-page-header-card .pf-v6-c-compass__main-header-content {
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }
          .gp-cmp-page-header-card h1,
          .gp-cmp-page-header-card .pf-v6-c-title {
            font-size: 1.25rem;
            line-height: 1.3;
            word-break: normal;
            overflow-wrap: anywhere;
            min-width: 0;
          }
          /* Page-header Card toolbar (the "Toggle drawer" + kebab
             row): drop PF6's default block padding so the buttons
             don't render as huge pills, and let the row wrap under
             the title if it doesn't fit beside it. */
          .gp-cmp-page-header-card .pf-v6-c-toolbar {
            padding-block: 0;
          }
          .gp-cmp-page-header-card .pf-v6-c-toolbar__content {
            padding-inline: 0;
            gap: 0.25rem;
          }
          /* Buttons inside the page-header Card render at PF6's
             default size — letting the kebab "More options" button
             be a proper circle at its natural 36px hit target. The
             surrounding CardBody padding-block (set above to 1rem)
             gives the taller button room without cramping the
             title row. */
          /* (MenuToggle flatten + Flex gap reset live in the outer
             max-width: 991px block — they cascade down to phone
             widths automatically.) */
          /* Brand image inside the logo slot: clamp inline size so
             a wide wordmark doesn't push the nav off-screen. The
             AcmeLogo already swaps to the icon-only mark at narrow
             widths via <source media> — this is a safety net for
             any consumer logo that doesn't carry one. */
          .pf-v6-c-compass__header .pf-v6-c-brand {
            max-inline-size: 40px;
          }
          /* ── Page padding tightening for mobile ──
             Compounding padding from ThemeProvider's wrapper div
             (16px), CompassContent, the inner Panel/PanelMainBody,
             Cards, and Gallery gutters can eat 60-80px of a 360px
             viewport before any content shows. Walk every layer
             down so the data has real space. Targets in DOM order
             outside→in. */

          /* 1. ThemeProvider's outer div (decorators/preview) — set
                via the style attr, so override with id-free selector
                that wins over inline styles via !important. */
          [data-brand] > div[style] {
            padding: 0 !important;
          }
          /* 2. Compass root container — drop any horizontal gap. */
          .pf-v6-c-compass,
          .pf-v6-c-compass__container {
            padding-inline: 0;
          }
          /* 3. Compass main column — modest 8px gutter so cards
                aren't flush to the viewport edge. */
          .pf-v6-c-compass__main {
            padding-inline: 0.5rem;
          }
          /* 4. CompassContent and its child Panel — PF6 packs a
                ~24px inset; drop to 0 so the cards' own padding
                governs the visible whitespace. */
          .pf-v6-c-compass__content {
            padding: 0;
            margin-block-start: 0;
          }
          /* Inline gutter applied at the panel-body level so it
             governs BOTH the search/toolbar row AND the table
             below — single source of truth, no double-padding.
             Block padding bumped to match the 1rem inline gutter
             so the content has symmetric breathing room on all
             four sides. */
          .pf-v6-c-compass__content > .pf-v6-c-panel > .pf-v6-c-panel__main > .pf-v6-c-panel__main-body {
            padding: 1rem;
          }
          /* 5. Card body padding — PF6 ships with 1.5rem; drop to
                0.75rem so card content fits on narrow viewports
                without horizontal scroll inside each card. */
          .pf-v6-c-compass__main .pf-v6-c-card__body,
          .pf-v6-c-compass__main .pf-v6-c-card__header {
            --pf-v6-c-card__body--PaddingInlineStart: 0.75rem;
            --pf-v6-c-card__body--PaddingInlineEnd: 0.75rem;
            --pf-v6-c-card__body--PaddingBlockStart: 0.5rem;
            --pf-v6-c-card__body--PaddingBlockEnd: 0.5rem;
            --pf-v6-c-card__header--PaddingInlineStart: 0.75rem;
            --pf-v6-c-card__header--PaddingInlineEnd: 0.75rem;
            --pf-v6-c-card__header--PaddingBlockStart: 0.5rem;
            --pf-v6-c-card__header--PaddingBlockEnd: 0.5rem;
          }
          /* 6. Gallery gutter — PF6 default is ~1rem between cards.
                Tighten to 0.5rem so the column spans more screen
                real estate. */
          .pf-v6-c-compass__main .pf-v6-l-gallery {
            --pf-v6-l-gallery--m-gutter--GridGap: 0.5rem;
            gap: 0.5rem;
          }
          /* 7. Footer (MessageBar slot) — trim the inline gutter so
                the search/prompt input spans the full row. */
          .pf-v6-c-compass__footer {
            padding-inline: 0.5rem;
          }
        }
        .gp-cmp-toolbar .pf-v6-c-toolbar__content-row,
        .gp-cmp-toolbar .pf-v6-c-data-view__filters {
          align-items: center;
        }
        /* Search-input row — let the field claim the available
           row width regardless of viewport, with the view-toggle
           and pagination flowing to the right.
           SearchInput internally renders a TextInputGroup (real
           class = .pf-v6-c-text-input-group), and the cardView
           wraps it inside a ToolbarGroup → ToolbarItem chain. The
           DataView's text filter also renders a TextInputGroup but
           inside a single ToolbarItem (no ToolbarGroup wrapper).
           Target BOTH classes (pf-v6-c-text-input-group, plus
           pf-v6-c-search-input as a defensive fallback) AND BOTH
           wrapper levels (group + item) so the flex-grow lands
           regardless of which toolbar structure the view uses. */
        .gp-cmp-toolbar .pf-v6-c-toolbar__group:has(.pf-v6-c-text-input-group),
        .gp-cmp-toolbar .pf-v6-c-toolbar__group:has(.pf-v6-c-search-input),
        .gp-cmp-toolbar .pf-v6-c-toolbar__item:has(.pf-v6-c-text-input-group),
        .gp-cmp-toolbar .pf-v6-c-toolbar__item:has(.pf-v6-c-search-input) {
          flex: 1 1 auto;
          min-width: 0;
        }
        .gp-cmp-toolbar .pf-v6-c-text-input-group,
        .gp-cmp-toolbar .pf-v6-c-search-input {
          width: 100%;
          max-inline-size: none;
        }
        /* Cap toggle-group button height to the SearchInput's
           control height (36px = the --gp-control-pad-y dial). PF6's
           default vertical padding makes the icon buttons render
           taller; clamp inline-padding to the dial too so the box
           stays square-ish. */
        .gp-cmp-toolbar .pf-v6-c-toggle-group__button {
          --pf-v6-c-toggle-group__button--PaddingTop: 0;
          --pf-v6-c-toggle-group__button--PaddingBottom: 0;
          block-size: 2.25rem;
          min-block-size: 2.25rem;
          /* Flex-centre the inner __toggle-icon span so the icon
             sits dead-centre at the clamped height instead of
             drifting toward the top from PF6's default baseline. */
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .gp-cmp-toolbar .pf-v6-c-toggle-group__button .pf-v6-c-toggle-group__icon,
        .gp-cmp-toolbar .pf-v6-c-toggle-group__button .pf-v6-c-toggle-group__text {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          line-height: 1;
        }
        /* NOTE: the selected-state brand accent for ToggleGroup is
           now applied globally in src/styles/index.css under the
           [data-brand] scope — every ToggleGroup in the lib picks
           it up automatically, including the Components/Forms/
           ToggleGroup story. */
        /* Pagination "current page" input — centre the page number
           in its box. PF6 left-aligns (text-align: start) the
           Current page input and reserves equal 16px inline padding
           on each side; the number then reads as left-hung. Centre
           it so the digit sits in the middle of the field. */
        .gp-cmp-toolbar .pf-v6-c-pagination input[aria-label="Current page"] {
          text-align: center;
        }
      `}</style>
      {/* AiAssistant base styles are global (src/styles/components/ai-assistant.css). */}
      <style>{`
        /* AiAssistant in the Compass footer. The bar fills the footer width;
           its overlays portal up to .gp-cmp-ai-root — a fixed layer over the
           whole surface — so the recent-chat popover sits just above the
           footer and the full chat floats over the content (never clipped by
           the footer). The layer is click-through except where an overlay is
           actually painted. */
        .gp-cmp-ai-bar { inline-size: 100%; }
        .gp-cmp-ai-bar .gp-ai-borderbar { max-inline-size: none; }
        .gp-cmp-ai-root {
          position: fixed;
          inset-block-start: 0;
          inset-inline: 0;
          /* Stop the layer just above the footer message bar so both the
             recent popover and the full-chat panel clear the footer. */
          inset-block-end: 4.75rem;
          z-index: 200;
          pointer-events: none;
          --gp-ai-bar-offset: 0.75rem;
        }
        .gp-cmp-ai-root .gp-ai-fullchat { pointer-events: auto; }
      `}</style>
      <SkipToContent targetId={mainContentId} label="Skip to content" />
      <Compass
        // PF6 adds `inert="true"` to the sidebar wrapper when
        // isSidebarXExpanded={false}, which disables clicks on
        // EVERY descendant including the handle button inside.
        // Always pass true to skip that, then drive the visual
        // open/closed state via the className below + CSS.
        className={[
          isNarrow && (isLeftRailOpen ? "gp-rail-left-open" : "gp-rail-left-closed"),
          isNarrow && (isRightRailOpen ? "gp-rail-right-open" : "gp-rail-right-closed"),
        ]
          .filter(Boolean)
          .join(" ")}
        header={headerContent}
        sidebarStart={startSidebar}
        isSidebarStartExpanded
        main={mainContent}
        sidebarEnd={endSidebar}
        isSidebarEndExpanded
        footer={footerContent}
        // Mobile sidenav. Compass wraps its content in a PF6 Drawer
        // whenever `drawerContent` is defined. `position: "start"`
        // makes the drawer slide in from the left (vs PF6 default
        // end-side). On md+ the hamburger that controls
        // `isMobileNavOpen` isn't rendered, so isExpanded stays
        // false and the drawer is inert.
        drawerContent={mobileNavPanel}
        drawerProps={{
          isExpanded: isMobileNavOpen,
          position: "start",
          onExpand: () => setIsMobileNavOpen(true),
        }}
      />
      {/* Fixed overlay layer the AiAssistant portals its recent-chat popover
          and full-chat panel into (see footerContent + the CSS above). */}
      <div className="gp-cmp-ai-root" ref={setAiOverlayEl} />
      {/* Rail handles are now rendered INSIDE startSidebar /
          endSidebar (see those constants above). They live as DOM
          children of .pf-v6-c-compass__sidebar so they travel
          with the rail's slide-in animation, and override the
          collapsed sidebar's visibility:hidden so they remain
          tappable when the rail itself is hidden — see the
          mobile-media CSS rule for .gp-cmp-rail-handle. */}
    </>
  );
}
