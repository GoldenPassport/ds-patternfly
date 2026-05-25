import type { Meta, StoryObj } from "@storybook/react-vite";
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
} from "@patternfly/react-core";
import { CubesIcon, EllipsisVIcon } from "@patternfly/react-icons";
import PageHeader from "@patternfly/react-component-groups/dist/dynamic/PageHeader";
import { useState } from "react";
import { FoundationPage, Section, Card, CodeBlock } from "../_storyKit.js";
import { DemoFrame, PropsTable } from "../_demoKit.js";

const meta: Meta = {
  title: "Component groups/Content containers/Page header",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [activeTabKey, setActiveTabKey] = useState<string | number>(0);
    return (
      <FoundationPage
        title="Page header"
        intro={
          <>
            A standard top-of-page header — title, subtitle, optional
            breadcrumbs, an action menu, an icon, and a status label slot.
            Use it as the first child of every PageSection so titles
            render consistently across the app. For app-shell chrome
            (logo, nav), use <code>Masthead</code> instead.
          </>
        }
      >
        <Section title="Basic">
          <Card>
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <DemoFrame>
                <PageHeader
                  title="Workflows"
                  subtitle="Manage triggers, runs, and history."
                />
              </DemoFrame>
              <CodeBlock>{`<PageHeader title="Workflows" subtitle="Manage triggers, runs, and history." />`}</CodeBlock>
            </div>
          </Card>
        </Section>

        <Section
          title="Full chrome"
          description="Breadcrumbs, icon, status label, and an action menu — the standard 'detail page' header."
        >
          <Card>
            <div style={{ padding: 24 }}>
              <DemoFrame>
                <PageHeader
                  breadcrumbs={
                    <Breadcrumb aria-label="Workflow breadcrumb">
                      <BreadcrumbItem to="#">Workflows</BreadcrumbItem>
                      <BreadcrumbItem to="#" isActive>
                        Quarterly review
                      </BreadcrumbItem>
                    </Breadcrumb>
                  }
                  icon={<CubesIcon />}
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
              </DemoFrame>
            </div>
          </Card>
        </Section>

        <Section
          title="With tabs"
          description="Detail-page pattern: PageHeader, a Tabs navigation strip, and the active TabContent panel stacked with the DS section dial (--gp-pad-section) between them. Works whenever a single 'thing' has multiple views (Details / YAML / Events, etc)."
        >
          <Card>
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <DemoFrame>
                {/* No <PageSection> wrappers — those strip the
                    DemoFrame's outer padding because PF6 PageSection
                    sets its own. Render the header, tabs strip, and
                    content directly inside the frame so this example
                    inherits the same generous breathing room as the
                    Full chrome section above. Vertical rhythm: small
                    gap between PageHeader → Tabs (matches the natural
                    breadcrumb → title spacing inside PageHeader),
                    then full --gp-pad-section between Tabs → content
                    so the tab strip separates clearly from the body. */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <PageHeader
                    breadcrumbs={
                      // Explicit aria-label so this Breadcrumb is
                      // distinguishable from the other Breadcrumb on
                      // the same Storybook page (Full chrome section)
                      // — axe `landmark-unique` rule needs unique
                      // names when multiple landmarks have the same
                      // role.
                      <Breadcrumb aria-label="Pod breadcrumb">
                        <BreadcrumbItem to="#">Overview</BreadcrumbItem>
                        <BreadcrumbItem to="#">Pods</BreadcrumbItem>
                        <BreadcrumbItem to="#" isActive>
                          Pod details
                        </BreadcrumbItem>
                      </Breadcrumb>
                    }
                    icon={<CubesIcon />}
                    title="3scale-control-fccb6ddb9-phyqv9"
                    label={<Label color="green">Running</Label>}
                  />
                  {/* Full-width Tabs strip — negative inline margins
                      stretch the Tabs container to the DemoFrame
                      edges so PF6's underline (drawn on the Tabs
                      ::before pseudo, inset: 44px 0 0) spans
                      edge-to-edge. The inner __list keeps PF6's own
                      padding so the tab labels stay aligned with the
                      breadcrumb / body column.

                      Block rhythm:
                        - PageHeader → Tabs: 0 (mirrors the natural
                          breadcrumb → title spacing inside PageHeader)
                        - Tabs → TabContent: --gp-pad-section
                      DemoFrame padding = 16px (see _demoKit). */}
                  <Tabs
                    activeKey={activeTabKey}
                    onSelect={(_, k) => setActiveTabKey(k)}
                    id="page-header-tabs"
                    // Render as <nav> so aria-label is valid here —
                    // PF6's default <div> doesn't accept aria-label
                    // without a role (axe: aria-prohibited-attr).
                    component="nav"
                    aria-label="Pod navigation tabs"
                    style={{
                      // Bleed the Tabs container to the card edges so
                      // PF6's underline (::before with inset 44px 0 0)
                      // spans full width.
                      //   - marginInline pulls out by the host card's
                      //     inline padding — referenced via the brand
                      //     dial so changing --gp-pad-popover at the
                      //     brand level moves card AND tabs together.
                      //   - paddingInlineStart re-indents the first
                      //     tab label by the SAME amount, putting it
                      //     8px past the breadcrumb / body column for
                      //     a deliberate tab-strip inset.
                      //   - paddingInlineEnd uses the sm spacer (half
                      //     the card padding by convention) so the
                      //     last tab has breathing room before the
                      //     line ends. Same brand source so if a
                      //     brand resizes the global spacer scale
                      //     everything tracks together.
                      marginInline: "calc(-1 * var(--gp-pad-popover, 1rem))",
                      paddingInlineStart: "var(--gp-pad-popover, 1rem)",
                      paddingInlineEnd: "var(--pf-t--global--spacer--sm, 0.5rem)",
                      marginBlockEnd: "var(--gp-pad-section, 2rem)",
                    }}
                  >
                    <Tab
                      eventKey={0}
                      title={<TabTitleText>Details</TabTitleText>}
                      tabContentId="page-header-tab-0"
                    />
                    <Tab
                      eventKey={1}
                      title={<TabTitleText>YAML</TabTitleText>}
                      tabContentId="page-header-tab-1"
                    />
                    <Tab
                      eventKey={2}
                      title={<TabTitleText>Environment</TabTitleText>}
                      tabContentId="page-header-tab-2"
                    />
                    <Tab
                      eventKey={3}
                      title={<TabTitleText>Events</TabTitleText>}
                      tabContentId="page-header-tab-3"
                    />
                    <Tab
                      eventKey={4}
                      title={<TabTitleText>Terminal</TabTitleText>}
                      tabContentId="page-header-tab-4"
                    />
                  </Tabs>
                  <TabContent
                    eventKey={0}
                    id="page-header-tab-0"
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
                    id="page-header-tab-1"
                    activeKey={activeTabKey}
                    hidden={activeTabKey !== 1}
                  >
                    <TabContentBody>YAML panel</TabContentBody>
                  </TabContent>
                  <TabContent
                    eventKey={2}
                    id="page-header-tab-2"
                    activeKey={activeTabKey}
                    hidden={activeTabKey !== 2}
                  >
                    <TabContentBody>Environment panel</TabContentBody>
                  </TabContent>
                  <TabContent
                    eventKey={3}
                    id="page-header-tab-3"
                    activeKey={activeTabKey}
                    hidden={activeTabKey !== 3}
                  >
                    <TabContentBody>Events panel</TabContentBody>
                  </TabContent>
                  <TabContent
                    eventKey={4}
                    id="page-header-tab-4"
                    activeKey={activeTabKey}
                    hidden={activeTabKey !== 4}
                  >
                    <TabContentBody>Terminal panel</TabContentBody>
                  </TabContent>
                </div>
              </DemoFrame>
              <CodeBlock>{`const [activeTabKey, setActiveTabKey] = useState(0);

// Negative margin on the Tabs strip bleeds the underline to the
// card edges (matches a real OpenShift / Konflux detail page where
// the tabs sit in PageSection type="tabs"). paddingInline on the
// strip keeps the tab labels aligned with the breadcrumb / body
// column. marginBlockEnd provides the section rhythm to the body.
<div style={{ display: "flex", flexDirection: "column" }}>
  <PageHeader
    breadcrumbs={<Breadcrumb aria-label="Pod breadcrumb">…</Breadcrumb>}
    icon={<CubesIcon />}
    title="3scale-control-fccb6ddb9-phyqv9"
    label={<Label color="green">Running</Label>}
  />

  <Tabs activeKey={activeTabKey} onSelect={(_, k) => setActiveTabKey(k)}
        id="pod-tabs" component="nav" aria-label="Pod navigation tabs"
        style={{
          marginInline: "calc(-1 * var(--card-inline-padding, 16px))",
          paddingInline: "8px",
          marginBlockEnd: "var(--gp-pad-section, 2rem)",
        }}>
    <Tab eventKey={0} title={<TabTitleText>Details</TabTitleText>}
         tabContentId="pod-tab-0" />
    <Tab eventKey={1} title={<TabTitleText>YAML</TabTitleText>}
         tabContentId="pod-tab-1" />
    {/* … */}
  </Tabs>

  <TabContent eventKey={0} id="pod-tab-0" activeKey={activeTabKey}
              hidden={activeTabKey !== 0}>
    <TabContentBody>{/* Details panel */}</TabContentBody>
  </TabContent>
  {/* … */}
</div>`}</CodeBlock>
              <p
                style={{
                  margin: 0,
                  color: "var(--gp-color-text-subtle)",
                  fontSize: 14,
                }}
              >
                Flex column with{" "}
                <code>gap: var(--gp-pad-section)</code> gives the
                header → tabs → content trio the brand&apos;s standard
                section rhythm without wrapping each element in its
                own <code>PageSection</code> (which would re-set its
                own padding and crowd the header). Tabs use{" "}
                <code>usePageInsets</code> so the strip aligns with
                the title above; <code>tabContentId</code> wires
                each Tab to its panel for screen readers; only the
                active panel renders via the <code>hidden</code> prop.
                Bump <code>--gp-pad-section</code> at the brand level
                to enlarge the vertical rhythm system-wide.
              </p>
            </div>
          </Card>
        </Section>

        <Section title="Most-used props">
          <Card>
            <div style={{ padding: 24 }}>
              <PropsTable
                rows={[
                  { name: "title", type: "ReactNode", description: "The h1 of the page. Renders inside an `<h1>` by default." },
                  { name: "subtitle", type: "ReactNode", description: "One-line context under the title — what the page is for." },
                  { name: "breadcrumbs", type: "ReactNode", description: "Slot for a Breadcrumb component above the title." },
                  { name: "icon", type: "ReactNode", description: "Decorative icon next to the title with a visual divider." },
                  { name: "label", type: "ReactNode", description: "Status / state label rendered next to the title (e.g. <Label>Active</Label>)." },
                  { name: "actionMenu", type: "ReactNode", description: "Trailing menu / button — typically a kebab Dropdown or a primary action Button." },
                  { name: "linkProps", type: "{ label, isExternal?, ...ButtonProps }", description: "Optional link below the subtitle (docs, runbook). Pass `component='a'` + `href` for a real anchor." },
                  { name: "headingClassname", type: "string", description: "Custom class on the inner `<h1>` — useful for app-specific typography overrides." },
                  { name: "ouiaId", type: "string | number", description: "Stable test selector." },
                ]}
              />
            </div>
          </Card>
        </Section>

        <Section title="Accessibility">
          <Card>
            <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
              <li><strong>One <code>title</code> per page.</strong> PageHeader renders an h1 — don&rsquo;t render another in the same view.</li>
              <li><strong>Action menus need an aria-label.</strong> Pass it through to the `MenuToggle` inside <code>actionMenu</code> so screen readers announce what the kebab opens.</li>
              <li><strong>Decorative icons are aria-hidden.</strong> Don&rsquo;t rely on the <code>icon</code> slot for meaning — use a <code>label</code> if you need to communicate state.</li>
            </ul>
          </Card>
        </Section>
      </FoundationPage>
    );
  },
};
