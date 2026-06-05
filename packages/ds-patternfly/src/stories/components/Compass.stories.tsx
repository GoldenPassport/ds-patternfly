import { useRef, useState } from "react";
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
} from "@patternfly/react-core";
import OutlinedCopyIcon from "@patternfly/react-icons/dist/esm/icons/outlined-copy-icon";
import OutlinedPlusSquareIcon from "@patternfly/react-icons/dist/esm/icons/outlined-plus-square-icon";
import PlayIcon from "@patternfly/react-icons/dist/esm/icons/play-icon";
import RhUiQuestionMarkCircleIcon from "@patternfly/react-icons/dist/esm/icons/rh-ui-question-mark-circle-icon";
import {
  FoundationPage,
  Section,
  Card,
  CodeBlock,
} from "../_storyKit.js";
import { PropsTable } from "../_demoKit.js";
import { AcmeLogo } from "../_acmeLogo.js";

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
      `<text x='50%' y='55%' text-anchor='middle' ` +
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
        description="header / sidebarStart / main / sidebarEnd / footer. Pass any subset as ReactNode props on the Compass root; missing slots collapse without taking space."
      >
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <Compass
              header={
                <Slot
                  label="header"
                  bg="var(--gp-color-bg-secondary-default)"
                  height={48}
                />
              }
              sidebarStart={
                <Slot
                  label="sidebarStart"
                  bg="rgba(0, 102, 204, 0.10)"
                />
              }
              main={
                <Slot
                  label="main"
                  bg="rgba(125, 87, 42, 0.08)"
                />
              }
              sidebarEnd={
                <Slot
                  label="sidebarEnd"
                  bg="rgba(62, 134, 53, 0.10)"
                />
              }
              footer={
                <Slot
                  label="footer"
                  bg="var(--gp-color-bg-secondary-default)"
                  height={48}
                />
              }
              style={{ height: 480 }}
            />
            <CodeBlock>{`import {
  Compass,
} from "@patternfly/react-core";

<Compass
  header={<MyHeader />}
  sidebarStart={<MyLeftRail />}
  main={<MyBody />}
  sidebarEnd={<MyRightRail />}
  footer={<MyFooter />}
  style={{ height: "600px" }}
/>`}</CodeBlock>
          </div>
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
  const subTabsRef = useRef<HTMLDivElement>(null);

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

  // Real apps would pass a Brand src pointing at their hosted logo
  // asset and an Avatar src pointing at the user's profile image.
  // Stories ship inline SVG data URLs so the demo is asset-free.
  const profileDropdown = (
    <Dropdown
      isOpen={isProfileOpen}
      onSelect={() => setIsProfileOpen(false)}
      onOpenChange={(isOpen) => setIsProfileOpen(isOpen)}
      popperProps={{ position: "right" }}
      toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
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
            stop3: "var(--gp-color-brand-default, #7d572a)",
          }}
          gradientLight={{
            stop1: "var(--gp-color-bg-secondary-default, #f3ede1)",
            stop2: "var(--gp-color-bg-secondary-hover, #e6dcc8)",
            stop3: "var(--gp-color-brand-default, #7d572a)",
          }}
        >
          Hero
        </Hero>
      </CompassHero>
      <CompassMainHeader
        title={<Title headingLevel="h1">Content title</Title>}
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
    <Compass
      header={headerContent}
      sidebarStart={sidebarContent}
      main={mainContent}
      sidebarEnd={sidebarContent}
      footer={footerContent}
      style={{ height: 640 }}
    />
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
              <strong>No flyout state.</strong> Unlike a generic{" "}
              <code>Drawer</code>, the Compass rails are always open
              in this demo. Use the <code>isSidebarStartExpanded</code>{" "}
              / <code>isSidebarEndExpanded</code> Compass props if
              you want collapsible rails.
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
