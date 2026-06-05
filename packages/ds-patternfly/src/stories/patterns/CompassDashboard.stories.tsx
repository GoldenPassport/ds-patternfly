import { useState } from "react";
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
  CardTitle,
  Compass,
  CompassContent,
  CompassHeader,
  CompassMessageBar,
  Content,
  Dropdown,
  DropdownItem,
  DropdownList,
  Flex,
  Grid,
  GridItem,
  Hero,
  Label,
  MenuToggle,
  type MenuToggleElement,
  Panel,
  PanelMain,
  PanelMainBody,
  Progress,
  ProgressMeasureLocation,
  ProgressSize,
  SearchInput,
  SkipToContent,
  Tab,
  Tabs,
  TabsComponent,
  TabTitleText,
  Tooltip,
} from "@patternfly/react-core";
import OutlinedCopyIcon from "@patternfly/react-icons/dist/esm/icons/outlined-copy-icon";
import OutlinedPlusSquareIcon from "@patternfly/react-icons/dist/esm/icons/outlined-plus-square-icon";
import OutlinedQuestionCircleIcon from "@patternfly/react-icons/dist/esm/icons/outlined-question-circle-icon";
import PlayIcon from "@patternfly/react-icons/dist/esm/icons/play-icon";
import { AcmeLogo } from "../_acmeLogo.js";

// ──────────────────────────────────────────────────────────────────
// Patterns/Compass — Dashboard (org-demo port)
// Source: https://www.patternfly.org/components/compass/org-demos
// (the "Compass Basic" overview demo)
// Adapted: dropped @patternfly/chatbot MessageBar, the RH logo/icon
// SVGs, the hero-bg image, and the six bespoke card components.
// Replaces them with inline text marks + simple PF6 card primitives
// so the story runs on react-core + react-icons alone.
// ──────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: "Patterns/Compass dashboard",
  parameters: {
    layout: "fullscreen",
    a11y: {
      config: {
        rules: [
          // Hero gradient + glass-mode surfaces drop text below WCAG
          // AA in the demo content — disable so the structural a11y
          // signal stays useful.
          { id: "color-contrast", enabled: false },
          // PF6 Tabs auto-generates IDs containing ":" — axe rejects,
          // not a real defect.
          { id: "aria-valid-attr-value", enabled: false },
          // CompassContent renders a scrollable region; axe wants a
          // tabindex on it, but PF6's component owns that decision
          // and the SkipToContent link above already provides
          // keyboard access into the region.
          { id: "scrollable-region-focusable", enabled: false },
        ],
      },
    },
  },
};
export default meta;

// Avatar: inline-SVG portrait in the Acme brand blue so the user
// picture reads as part of the same identity as the AcmeLogo.
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

// ──────────────────────────────────────────────────────────────────
// Card placeholders for the bespoke dashboard widgets in the
// upstream demo. The originals are animated SVG visualisations; the
// inline replacements convey the same intent (label + headline
// metric + simple chart-shaped affordance) using plain PF6 cards.
// ──────────────────────────────────────────────────────────────────

function ClusterDetailsCard() {
  return (
    <Card isFullHeight>
      <CardHeader>
        <CardTitle>Cluster details</CardTitle>
      </CardHeader>
      <CardBody>
        <Flex
          direction={{ default: "column" }}
          gap={{ default: "gapMd" }}
        >
          <div>
            <Content component="small">Cluster name</Content>
            <Content component="p">prod-east-2</Content>
          </div>
          <div>
            <Content component="small">Region</Content>
            <Content component="p">us-east-2</Content>
          </div>
          <div>
            <Content component="small">Version</Content>
            <Content component="p">4.16.12</Content>
          </div>
          <div>
            <Content component="small">Health</Content>
            <Label status="success" isCompact>
              Healthy
            </Label>
          </div>
          <div>
            <Content component="small">Nodes</Content>
            <Content component="p">24 / 24 ready</Content>
          </div>
        </Flex>
      </CardBody>
    </Card>
  );
}

function MetricCard({
  title,
  value,
  caption,
  pct,
  status,
}: {
  title: string;
  value: string;
  caption: string;
  pct: number;
  status?: "success" | "warning" | "danger";
}) {
  return (
    <Card isFullHeight>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardBody>
        {/* Render the headline number as a styled <p>, not an <h3> —
            the Hero already owns the page's h1 and CardTitle defaults
            to a <div>, so an h3 here trips axe's heading-order rule. */}
        <p
          style={{
            fontSize: "1.5rem",
            fontWeight: 600,
            margin: 0,
            marginBottom: 4,
          }}
        >
          {value}
        </p>
        <Content component="small">{caption}</Content>
        <div style={{ marginTop: 12 }}>
          <Progress
            value={pct}
            measureLocation={ProgressMeasureLocation.none}
            size={ProgressSize.sm}
            variant={status === "success" ? undefined : status}
            aria-label={`${title} utilisation`}
          />
        </div>
      </CardBody>
    </Card>
  );
}

function RecentActivityCard() {
  const rows = [
    {
      who: "aliyah.frazier",
      what: "Deployed playbook prod-rotate-creds",
      when: "2m ago",
      label: "success" as const,
      labelText: "Succeeded",
    },
    {
      who: "system",
      what: "Inventory sync — github.example.com",
      when: "14m ago",
      label: "success" as const,
      labelText: "Synced",
    },
    {
      who: "morgan.lee",
      what: "Triggered approval for k8s-upgrade-east",
      when: "1h ago",
      label: "warning" as const,
      labelText: "Pending",
    },
    {
      who: "system",
      what: "Token expiring soon — splunk integration",
      when: "3h ago",
      label: "danger" as const,
      labelText: "Action needed",
    },
  ];
  return (
    <Card isFullHeight>
      <CardHeader>
        <CardTitle>Recent activity</CardTitle>
      </CardHeader>
      <CardBody>
        <Flex
          direction={{ default: "column" }}
          gap={{ default: "gapSm" }}
        >
          {rows.map((r, i) => (
            <Flex
              key={i}
              justifyContent={{ default: "justifyContentSpaceBetween" }}
              alignItems={{ default: "alignItemsCenter" }}
              gap={{ default: "gapMd" }}
            >
              <div style={{ minWidth: 0 }}>
                <Content component="p" style={{ margin: 0 }}>
                  {r.what}
                </Content>
                <Content component="small">
                  {r.who} · {r.when}
                </Content>
              </div>
              <Label status={r.label} isCompact variant="outline">
                {r.labelText}
              </Label>
            </Flex>
          ))}
        </Flex>
      </CardBody>
    </Card>
  );
}

// ──────────────────────────────────────────────────────────────────
// Dashboard story body
// ──────────────────────────────────────────────────────────────────

function DashboardDemo() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navContent = (
    <Panel isPill isGlass>
      <PanelMain>
        <Tabs
          activeKey={activeTab}
          isNav
          onSelect={(_event, tabIndex) =>
            setActiveTab(tabIndex as number)
          }
          component={TabsComponent.nav}
          aria-label="Compass global"
          inset={{ default: "insetXl" }}
        >
          <Tab eventKey={0} title={<TabTitleText>Dashboard</TabTitleText>} />
          <Tab
            eventKey={1}
            title={<TabTitleText>Builder</TabTitleText>}
            isDisabled
          />
          <Tab
            eventKey={2}
            title={<TabTitleText>Automations</TabTitleText>}
          />
          <Tab
            eventKey={3}
            title={<TabTitleText>Approvals</TabTitleText>}
            isDisabled
          />
          <Tab
            eventKey={4}
            title={<TabTitleText>Configuration</TabTitleText>}
          />
          <Tab eventKey={5} title={<TabTitleText>Test page</TabTitleText>} />
        </Tabs>
      </PanelMain>
    </Panel>
  );

  const westSidebar = (
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
                <Tooltip content="Add">
                  <Button
                    variant="plain"
                    icon={<OutlinedPlusSquareIcon />}
                    aria-label="Add"
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

  const eastSidebar = (
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

  const userDropdown = (
    <Dropdown
      isOpen={isDropdownOpen}
      onSelect={() => setIsDropdownOpen(false)}
      onOpenChange={(isOpen: boolean) => setIsDropdownOpen(isOpen)}
      popperProps={{ position: "right" }}
      toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
        <MenuToggle
          ref={toggleRef}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          isExpanded={isDropdownOpen}
          variant="plain"
          isCircle
        >
          <Flex
            alignItems={{ default: "alignItemsCenter" }}
            gap={{ default: "gapMd" }}
          >
            Aliyah Frazier
            <Avatar src={AVATAR_SRC} alt="" size="md" />
          </Flex>
        </MenuToggle>
      )}
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
        <a href="#" aria-label="Acme home" tabIndex={0}>
          <AcmeLogo />
        </a>
      }
      nav={navContent}
      profile={userDropdown}
    />
  );

  const mainContent = (
    <>
      <Hero
        gradientDark={{
          stop1: "#3d2785",
          stop2: "#1b0d33",
          stop3: "#000",
        }}
        gradientLight={{
          stop1: "var(--gp-color-brand-50, #ede9fe)",
          stop2: "var(--gp-color-brand-100, #ddd6fe)",
          stop3: "var(--gp-color-brand-200, #c4b5fd)",
        }}
      >
        <Content>
          <h1>Automation that does more</h1>
          <p>
            Golden Passport offers more capabilities, accessibility, and
            flexibility — so you can bring the power of automation to
            the teams, tasks, and environments that need it.
          </p>
          <ActionList>
            <ActionListGroup>
              <ActionListItem>
                <Button variant="primary">Upgrade today</Button>
              </ActionListItem>
              <ActionListItem>
                <Button variant="secondary">Talk to a specialist</Button>
              </ActionListItem>
            </ActionListGroup>
          </ActionList>
        </Content>
      </Hero>
      <CompassContent id="main">
        <Grid hasGutter style={{ maxHeight: "none" }}>
          <GridItem
            span={12}
            sm={12}
            md={6}
            lg={4}
            xl={3}
            rowSpan={4}
          >
            <ClusterDetailsCard />
          </GridItem>
          <GridItem
            span={12}
            sm={12}
            md={6}
            lg={4}
            xl={3}
            rowSpan={2}
          >
            <MetricCard
              title="Cluster inventory"
              value="48"
              caption="active clusters"
              pct={86}
            />
          </GridItem>
          <GridItem
            span={12}
            sm={12}
            md={6}
            lg={4}
            xl={3}
            rowSpan={2}
          >
            <MetricCard
              title="Storage"
              value="2.4 TB"
              caption="of 4.0 TB allocated"
              pct={60}
            />
          </GridItem>
          <GridItem
            span={12}
            sm={12}
            md={12}
            lg={8}
            xl={3}
            rowSpan={2}
          >
            <MetricCard
              title="Memory utilisation"
              value="71%"
              caption="across all nodes"
              pct={71}
              status="warning"
            />
          </GridItem>
          <GridItem
            span={12}
            sm={12}
            md={12}
            lg={12}
            xl={3}
            rowSpan={2}
          >
            <MetricCard
              title="Network activity"
              value="312 MB/s"
              caption="ingress · 5-min average"
              pct={42}
            />
          </GridItem>
          <GridItem
            span={12}
            sm={12}
            md={12}
            lg={8}
            xl={6}
            rowSpan={2}
          >
            <RecentActivityCard />
          </GridItem>
        </Grid>
      </CompassContent>
    </>
  );

  // Replaces upstream's @patternfly/chatbot MessageBar with a plain
  // SearchInput in the same slot — same visual footprint, no extra
  // dep.
  const southContent = (
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

  const skipToContentClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    const el = document.getElementById("main");
    if (el) el.focus();
  };

  return (
    <>
      <SkipToContent onClick={skipToContentClick} href="#main">
        Skip to content
      </SkipToContent>
      <Compass
        header={headerContent}
        sidebarStart={westSidebar}
        main={mainContent}
        sidebarEnd={eastSidebar}
        footer={southContent}
      />
    </>
  );
}

// ──────────────────────────────────────────────────────────────────
// Story: Dashboard — Hero + KPI grid + activity feed
// ──────────────────────────────────────────────────────────────────

export const Dashboard: StoryObj = {
  render: () => <DashboardDemo />,
};
