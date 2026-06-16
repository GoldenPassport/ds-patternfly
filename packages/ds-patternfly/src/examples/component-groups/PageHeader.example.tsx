/**
 * PageHeader (@patternfly/react-component-groups) — a standard top-of-page
 * header: title, subtitle, optional breadcrumbs, an action menu, an icon,
 * and a status label slot.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useId, useState } from "react";
import PageHeader from "@patternfly/react-component-groups/dist/dynamic/PageHeader";
import { CubesIcon, EllipsisVIcon } from "@patternfly/react-icons";
import {
  Breadcrumb,
  BreadcrumbItem,
  DescriptionList,
  DescriptionListDescription,
  DescriptionListGroup,
  DescriptionListTerm,
  Dropdown,
  DropdownItem,
  DropdownList,
  Label,
  MenuToggle,
  type MenuToggleElement,
  Tab,
  TabContent,
  TabContentBody,
  TabTitleText,
  Tabs,
} from "@golden-passport/ds-patternfly";

const headerCss = `
  /* Breadcrumb → title spacing: PageHeader stacks the breadcrumb
     tight against the title row by default; add breathing room.
     (The breadcrumb lives in its own __main-breadcrumb section,
     a sibling of the title's __main-section.) */
  .pf-v6-c-page__main-breadcrumb {
    margin-block-end: 0.75rem;
  }
  /* Pin the action menu (kebab) to the top-right corner of the
     whole header CARD (the .gp-ph-relative wrapper spans the
     breadcrumb + title), not just the title row — so it lands on
     the breadcrumb row rather than centred against the tall
     title. */
  .gp-ph-relative {
    position: relative;
  }
  .gp-ph-relative
    .pf-v6-l-split__item:has(button[aria-label*="actions" i]) {
    position: absolute;
    inset-block-start: 0;
    inset-inline-end: 0;
    z-index: 2;
  }
  /* Page icon cell — centre the 36px glyph in its (wider) cell. */
  .pf-v6-c-page__main-section .pf-m-align-self-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

// 36×36 page icon, centred (both axes) inside its cell — the wrapper
// fills the cell width and flex-centres the glyph.
const pageIcon = (
  <span
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      inlineSize: "100%",
      blockSize: 36,
    }}
  >
    <CubesIcon style={{ width: 36, height: 36 }} />
  </span>
);

// #region Basic
export function Basic() {
  return (
    <PageHeader
      title="Workflows"
      subtitle="Manage triggers, runs, and history."
    />
  );
}
// #endregion

// #region FullChrome
export function FullChrome() {
  const [open, setOpen] = useState(false);

  return (
    <div className="gp-ph-relative">
      <style>{headerCss}</style>
      <PageHeader
        breadcrumbs={
          <Breadcrumb aria-label="Workflow breadcrumb">
            <BreadcrumbItem to="#">Workflows</BreadcrumbItem>
            <BreadcrumbItem to="#" isActive>
              Quarterly review
            </BreadcrumbItem>
          </Breadcrumb>
        }
        icon={pageIcon}
        title="Quarterly review"
        label={<Label color="green">Active</Label>}
        subtitle="Triggered hourly · 4 steps · last run 12 minutes ago"
        linkProps={{
          label: "View workflow docs",
          isExternal: true,
          component: "a",
          href: "#",
        }}
        actionMenu={
          <Dropdown
            isOpen={open}
            onSelect={() => setOpen(false)}
            onOpenChange={setOpen}
            toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
              <MenuToggle
                ref={toggleRef}
                aria-label="Workflow actions"
                variant="plain"
                onClick={() => setOpen((o) => !o)}
              >
                <EllipsisVIcon />
              </MenuToggle>
            )}
          >
            <DropdownList>
              <DropdownItem>Run now</DropdownItem>
              <DropdownItem>Edit</DropdownItem>
              <DropdownItem>Disable</DropdownItem>
            </DropdownList>
          </Dropdown>
        }
      />
    </div>
  );
}
// #endregion

// #region WithTabs
export function WithTabs() {
  const id = useId();
  const [activeTabKey, setActiveTabKey] = useState<string | number>(0);

  // Header, tabs strip, and content stacked in a flex column.
  // Vertical rhythm: small gap between PageHeader → Tabs (matches the
  // natural breadcrumb → title spacing inside PageHeader), then full
  // --gp-pad-section between Tabs → content so the tab strip separates
  // clearly from the body.
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <style>{headerCss}</style>
      <PageHeader
        breadcrumbs={
          // Explicit aria-label so this Breadcrumb is distinguishable
          // from other Breadcrumbs on the same page — axe
          // `landmark-unique` rule needs unique names when multiple
          // landmarks have the same role.
          <Breadcrumb aria-label="Pod breadcrumb">
            <BreadcrumbItem to="#">Overview</BreadcrumbItem>
            <BreadcrumbItem to="#">Pods</BreadcrumbItem>
            <BreadcrumbItem to="#" isActive>
              Pod details
            </BreadcrumbItem>
          </Breadcrumb>
        }
        icon={pageIcon}
        title="3scale-control-fccb6ddb9-phyqv9"
        label={<Label color="green">Running</Label>}
      />
      {/* Standard Tabs strip — renders with PF6's stock padding so it
          looks identical to a standalone Tabs usage. The host surface
          sets its own inline padding, so the tab labels naturally sit
          at the same column as the breadcrumb and body content
          above/below.

          Block rhythm:
            - PageHeader → Tabs: 0 (mirrors the natural
              breadcrumb → title spacing inside PageHeader)
            - Tabs → TabContent: --gp-pad-section */}
      <Tabs
        activeKey={activeTabKey}
        onSelect={(_, k) => setActiveTabKey(k)}
        id={`${id}-tabs`}
        // Render as <nav> so aria-label is valid here — PF6's default
        // <div> doesn't accept aria-label without a role
        // (axe: aria-prohibited-attr).
        component="nav"
        aria-label="Pod navigation tabs"
        style={{
          // Space ABOVE the tabs so the tab targets don't crowd the
          // title/subtitle above them — easier to click without
          // grazing the text.
          marginBlockStart: "1rem",
          // Section rhythm to the body content below. No marginInline
          // / paddingInline overrides — the tabs render with PF6's
          // stock padding so the strip naturally aligns within the
          // content column.
          marginBlockEnd: "var(--gp-pad-section, 2rem)",
        }}
      >
        <Tab
          eventKey={0}
          title={<TabTitleText>Details</TabTitleText>}
          tabContentId={`${id}-tab-0`}
        />
        <Tab
          eventKey={1}
          title={<TabTitleText>YAML</TabTitleText>}
          tabContentId={`${id}-tab-1`}
        />
        <Tab
          eventKey={2}
          title={<TabTitleText>Environment</TabTitleText>}
          tabContentId={`${id}-tab-2`}
        />
        <Tab
          eventKey={3}
          title={<TabTitleText>Events</TabTitleText>}
          tabContentId={`${id}-tab-3`}
        />
        <Tab
          eventKey={4}
          title={<TabTitleText>Terminal</TabTitleText>}
          tabContentId={`${id}-tab-4`}
        />
      </Tabs>
      <TabContent
        eventKey={0}
        id={`${id}-tab-0`}
        activeKey={activeTabKey}
        hidden={activeTabKey !== 0}
      >
        <TabContentBody>
          <DescriptionList columnModifier={{ lg: "2Col" }}>
            <DescriptionListGroup>
              <DescriptionListTerm>Name</DescriptionListTerm>
              <DescriptionListDescription>
                3scale-control-fccb6ddb9-phyqv9
              </DescriptionListDescription>
            </DescriptionListGroup>
            <DescriptionListGroup>
              <DescriptionListTerm>Status</DescriptionListTerm>
              <DescriptionListDescription>
                Running
              </DescriptionListDescription>
            </DescriptionListGroup>
            <DescriptionListGroup>
              <DescriptionListTerm>Namespace</DescriptionListTerm>
              <DescriptionListDescription>
                knative-serving-ingress
              </DescriptionListDescription>
            </DescriptionListGroup>
            <DescriptionListGroup>
              <DescriptionListTerm>
                Restart policy
              </DescriptionListTerm>
              <DescriptionListDescription>
                Always restart
              </DescriptionListDescription>
            </DescriptionListGroup>
            <DescriptionListGroup>
              <DescriptionListTerm>Pod IP</DescriptionListTerm>
              <DescriptionListDescription>
                10.0.345.2.197
              </DescriptionListDescription>
            </DescriptionListGroup>
            <DescriptionListGroup>
              <DescriptionListTerm>Created at</DescriptionListTerm>
              <DescriptionListDescription>
                <time>Oct 15, 1:51 pm</time>
              </DescriptionListDescription>
            </DescriptionListGroup>
          </DescriptionList>
        </TabContentBody>
      </TabContent>
      <TabContent
        eventKey={1}
        id={`${id}-tab-1`}
        activeKey={activeTabKey}
        hidden={activeTabKey !== 1}
      >
        <TabContentBody>YAML panel</TabContentBody>
      </TabContent>
      <TabContent
        eventKey={2}
        id={`${id}-tab-2`}
        activeKey={activeTabKey}
        hidden={activeTabKey !== 2}
      >
        <TabContentBody>Environment panel</TabContentBody>
      </TabContent>
      <TabContent
        eventKey={3}
        id={`${id}-tab-3`}
        activeKey={activeTabKey}
        hidden={activeTabKey !== 3}
      >
        <TabContentBody>Events panel</TabContentBody>
      </TabContent>
      <TabContent
        eventKey={4}
        id={`${id}-tab-4`}
        activeKey={activeTabKey}
        hidden={activeTabKey !== 4}
      >
        <TabContentBody>Terminal panel</TabContentBody>
      </TabContent>
    </div>
  );
}
// #endregion

export default function PageHeaderExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <Basic />
      <FullChrome />
      <WithTabs />
    </div>
  );
}
