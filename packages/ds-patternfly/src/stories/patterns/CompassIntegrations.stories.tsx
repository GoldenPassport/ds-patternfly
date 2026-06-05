import { useEffect, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  ActionList,
  ActionListGroup,
  ActionListItem,
  Avatar,
  Button,
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
  Nav,
  NavItem,
  NavList,
  Pagination,
  Panel,
  PanelMain,
  PanelMainBody,
  SearchInput,
  SkipToContent,
  Switch,
  Tab,
  Tabs,
  TabsComponent,
  TabTitleText,
  ToggleGroup,
  ToggleGroupItem,
  Toolbar,
  ToolbarContent,
  ToolbarGroup,
  ToolbarItem,
  Title,
  Tooltip,
} from "@patternfly/react-core";
import BarsIcon from "@patternfly/react-icons/dist/esm/icons/bars-icon";
import { ActionsColumn } from "@patternfly/react-table";
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
import { AcmeLogo } from "../_acmeLogo.js";

// ──────────────────────────────────────────────────────────────────
// Patterns/Compass — Integrations (org-demo port)
// Source: https://www.patternfly.org/components/compass/org-demos
// Adapted: dropped @patternfly/chatbot MessageBar + local image
// assets so the demo runs against just react-core + react-data-view
// + react-icons (already in this workspace). Replaces MessageBar
// with a plain SearchInput in the CompassMessageBar slot; replaces
// the Red Hat logos with inline text marks.
// ──────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: "Patterns/Compass integrations",
  parameters: {
    layout: "fullscreen",
    // Demo is a port of PF6's canonical Compass org-demo; it ships
    // with placeholder gradient backgrounds + glass surfaces whose
    // contrast against text is below WCAG AA. Disable color-contrast
    // so the structural a11y signal stays useful.
    a11y: {
      config: {
        rules: [
          { id: "color-contrast", enabled: false },
          // PF6 Tabs auto-generates IDs containing ":" which axe's
          // valid-attr-value rule rejects — known PF6 quirk, not a
          // real defect. Filed upstream; disable here so the rest
          // of the a11y signal stays useful.
          { id: "aria-valid-attr-value", enabled: false },
        ],
      },
    },
  },
};
export default meta;

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

function IntegrationsDemo() {
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
  const [activeDisplay, setActiveDisplay] = useState<"table" | "card">("table");
  const [isGlassTheme, setIsGlassTheme] = useState(true);
  const isNarrow = useMediaBelow(NARROW_BP);
  const isBelowLg = useMediaBelow(MEDIUM_BP);

  // PF6 glass theme is opt-in via root class; toggle it from the
  // Switch in the corner so the story exercises both surface modes.
  useEffect(() => {
    const root = document.documentElement;
    if (isGlassTheme) root.classList.add("pf-v6-theme-glass");
    else root.classList.remove("pf-v6-theme-glass");
    return () => root.classList.remove("pf-v6-theme-glass");
  }, [isGlassTheme]);

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
  const startSidebar = (
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
  );

  const endSidebar = (
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
      aria-controls="compass-mobile-nav"
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
            <AcmeLogo wideMinWidth="768px" />
          </MastheadLogo>
        </MastheadBrand>
      </MastheadMain>
      <MastheadContent>
        <Toolbar id="compass-mobile-masthead-toolbar" isStatic>
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
          <AcmeLogo wideMinWidth="768px" />
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
    <DrawerPanelContent id="compass-mobile-nav">
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
            <Pagination
              itemCount={INTEGRATIONS.length}
              perPage={20}
              page={1}
              onSetPage={() => {}}
              onPerPageSelect={() => {}}
              widgetId="pagination-options-card-view"
              // Below lg (992px), collapse to the compact arrow-only
              // form — keeps the search + view toggle + pager all on
              // one row on tablets without crowding.
              isCompact={isBelowLg}
            />
          </ToolbarItem>
        </ToolbarContent>
      </Toolbar>
      <Gallery hasGutter>
        {INTEGRATIONS.map((product) => (
          <Card
            isCompact
            isFullHeight
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
                      variant="outline"
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
            <Label status={status} isCompact variant="outline">
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
        <CompassMainHeader
          title={<Title headingLevel="h1">Integrations</Title>}
          toolbar={
            <Toolbar hasNoPadding>
              <ToolbarContent>
                <ToolbarGroup>
                  <ToolbarItem>
                    <Button
                      icon={<EllipsisVIcon />}
                      variant="plain"
                      isCircle
                      aria-label="More options"
                    />
                  </ToolbarItem>
                </ToolbarGroup>
              </ToolbarContent>
            </Toolbar>
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
        <Panel isScrollable isAutoHeight isGlass id="integrations-main-content">
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
  const footerContent = (
    <CompassMessageBar>
      <Panel isPill hasNoBorder isGlass>
        <PanelMain>
          <PanelMainBody>
            <SearchInput
              aria-label="Ask the assistant"
              placeholder="Ask the assistant…"
            />
          </PanelMainBody>
        </PanelMain>
      </Panel>
    </CompassMessageBar>
  );

  const handleSkipClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    const el = document.getElementById("integrations-main-content");
    if (el) {
      el.focus();
      el.scrollIntoView();
    }
  };

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
            radial-gradient(circle at 15% 20%,
              color-mix(in srgb, var(--gp-color-brand-default) 45%, transparent) 0%,
              transparent 45%),
            radial-gradient(circle at 85% 80%,
              color-mix(in srgb, var(--gp-color-accent, var(--gp-color-brand-hover)) 35%, transparent) 0%,
              transparent 45%),
            radial-gradient(circle at 50% 50%,
              color-mix(in srgb, var(--gp-color-brand-default) 20%, transparent) 0%,
              transparent 60%),
            var(--gp-color-bg-primary-default) !important;
        }
        /* Dark glass — bump the glow intensity so brand colours
           cut through the dark canvas. */
        .pf-v6-theme-dark.pf-v6-theme-glass [data-brand] > div[style],
        .pf-v6-theme-glass.pf-v6-theme-dark [data-brand] > div[style] {
          background:
            radial-gradient(circle at 15% 20%,
              color-mix(in srgb, var(--gp-color-brand-default) 55%, transparent) 0%,
              transparent 50%),
            radial-gradient(circle at 85% 80%,
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
           PF6's per-component m-glass tokens default to
           --pf-t--global--background--color--glass--primary--default
           (~50% alpha), but other PF6 surfaces (Panel default,
           certain Card states) resolve to
           --pf-t--global--background--color--primary--default
           (~60% alpha in glass-light, ~50% in glass-dark) — slightly
           different colour, which makes the masthead / sidebars /
           footer / header card / body panel read with mismatched
           translucent fills.
           Redirect every per-component glass token to the same
           --background--color--primary--default so all five
           surfaces share one resolved colour for both light and
           dark glass modes. */
        .pf-v6-theme-glass {
          --pf-v6-c-card--m-glass--BackgroundColor:
            var(--pf-t--global--background--color--primary--default);
          --pf-v6-c-panel--m-glass--BackgroundColor:
            var(--pf-t--global--background--color--primary--default);
        }
        /* Topnavbar (masthead) — PF6's :where(.pf-v6-theme-glass)
           .pf-v6-c-masthead:not(.pf-m-docked) rule paints
           background-color directly with the glass--primary token;
           override the background to the same primary token used
           by the other surfaces. */
        .pf-v6-theme-glass .pf-v6-c-masthead:not(.pf-m-docked) {
          background-color:
            var(--pf-t--global--background--color--primary--default) !important;
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
        .pf-v6-theme-glass #integrations-main-content,
        .pf-v6-theme-glass .pf-v6-c-compass__sidebar .pf-v6-c-panel.pf-m-glass,
        .pf-v6-theme-glass .pf-v6-c-compass__footer .pf-v6-c-panel.pf-m-glass,
        .pf-v6-theme-glass .pf-v6-c-masthead:not(.pf-m-docked) {
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
          /* Hide the floating glass-theme switch on phones — it
             overlaps the message bar / drawer affordances. */
          .gp-cmp-mobile-hide {
            display: none !important;
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
                   • html / body / Storybook root — zero margins so
                     the iframe content starts at pixel-0.
                   • ThemeProvider's decorator wrapper — already has
                     padding: 0 !important from the rule above.
                   • Compass + container — transparent so the
                     wrapper's surface (or the masthead's own
                     background) reads through without competing.
                   • Compass header — its top edge IS the page's
                     top. No padding-block-start (so the masthead
                     touches the top), only an end-padding + border
                     to separate from the body below. */
          html,
          body,
          #storybook-root,
          .sb-show-main {
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
      `}</style>
      <SkipToContent
        onClick={handleSkipClick}
        href="#integrations-main-content"
      >
        Skip to content
      </SkipToContent>
      <Compass
        header={headerContent}
        sidebarStart={startSidebar}
        // Collapse both rails on narrow viewports — PF6 sets `inert`
        // on the collapsed sidebars so keyboard + AT users skip past
        // them too, not just visually hidden. The icon actions in
        // those rails are non-essential for the integrations list
        // (the row actions menu already covers per-row ops).
        isSidebarStartExpanded={!isNarrow}
        main={mainContent}
        sidebarEnd={endSidebar}
        isSidebarEndExpanded={!isNarrow}
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
      <div
        className="gp-cmp-mobile-hide"
        style={{
          position: "absolute",
          bottom: "1rem",
          right: "1rem",
          zIndex: 1000,
        }}
      >
        <Switch
          id="glass-theme-toggle"
          label="Glass theme"
          isChecked={isGlassTheme}
          onChange={(_, checked) => setIsGlassTheme(checked)}
        />
      </div>
    </>
  );
}

// ──────────────────────────────────────────────────────────────────
// Story: Integrations — full Compass org-demo
// ──────────────────────────────────────────────────────────────────

export const Integrations: StoryObj = {
  render: () => <IntegrationsDemo />,
};
