import { useState, type ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Brand,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardBody,
  Checkbox,
  Content,
  FormSelect,
  FormSelectOption,
  Gallery,
  GalleryItem,
  Masthead,
  MastheadBrand,
  MastheadContent,
  MastheadLogo,
  MastheadMain,
  MastheadToggle,
  Nav,
  NavItem,
  NavList,
  Page,
  PageSection,
  PageSidebar,
  PageSidebarBody,
  PageToggleButton,
  TextInput,
  Title,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
} from "@patternfly/react-core";
import { FoundationPage, Section, Card as DocCard, CodeBlock } from "../_storyKit.js";
import {
  DemoFrame,
  PropsTable,
  sidenavDrawerCss,
  useSidenavOffClick,
} from "../_demoKit.js";

const meta: Meta = {
  title: "Components/Page",
  parameters: {
    layout: "padded",
    a11y: {
      config: {
        // The doc page renders several Page instances side-by-side for
        // illustration; in real apps you only ever render one Page per route,
        // so the duplicate <header>/<main>/<nav> landmarks are doc-only.
        // The live sticky + styled-content demos render Page <main> inside
        // a fixed-height scrolling container — the rule wants a tabindex
        // on the scroll region, but Page already manages focus and the
        // outer container exists only for the doc demo's visible scrollbox.
        rules: [
          { id: "landmark-unique", enabled: false },
          { id: "landmark-no-duplicate-main", enabled: false },
          { id: "landmark-no-duplicate-banner", enabled: false },
          { id: "scrollable-region-focusable", enabled: false },
        ],
      },
    },
  },
};
export default meta;

// Same Acme SVG logo pair used by Components/Brand, Masthead, and Shell.
// Wide variant for ≥ sm; icon-only logomark below.
const svg = (m: string) =>
  "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(m);
const acmeIcon = svg(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
    <circle cx="20" cy="20" r="20" fill="#0066cc"/>
    <path d="M11 28 L20 10 L29 28 M14.5 22 L25.5 22" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  </svg>`,
);
const acmeWide = svg(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 40">
    <circle cx="20" cy="20" r="20" fill="#0066cc"/>
    <path d="M11 28 L20 10 L29 28 M14.5 22 L25.5 22" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <text x="52" y="27" fill="#0a0a0a" font-family="Arial, sans-serif" font-size="22" font-weight="700" letter-spacing="-0.5">Acme</text>
  </svg>`,
);

const brandLogo = (
  <Brand
    src={acmeWide}
    alt="Acme"
    widths={{ default: "40px", sm: "60px", md: "180px" }}
  >
    <source media="(min-width: 1200px)" srcSet={acmeWide} />
    <source media="(min-width: 992px)"  srcSet={acmeWide} />
    <source media="(min-width: 768px)"  srcSet={acmeWide} />
    <source media="(min-width: 576px)"  srcSet={acmeIcon} />
    <source media="(min-width: 320px)"  srcSet={acmeIcon} />
    <source                              srcSet={acmeWide} />
  </Brand>
);

/**
 * Live demo of PF6's sticky-header pattern (patternfly.org/components/page
 * react-demos/sticky-section-breadcrumb-with-breakpoints). Three checkboxes
 * drive which parts of the header join the sticky group:
 *
 *   - Breadcrumb       → drives `groupProps.stickyOnBreakpoint`
 *   - Page heading     → if true, the <h1> lives in `additionalGroupedContent`
 *                        (sticky); if false, it goes in a regular body section.
 *   - Page subheading  → same toggle for the lead paragraph.
 *
 * PF6's grouping model: anything passed to `additionalGroupedContent` lives
 * inside the auto-PageGroup with the breadcrumb. The whole group inherits
 * `groupProps.stickyOnBreakpoint`, so heading / subheading sticky implicitly
 * pin the breadcrumb too. The demo body scrolls inside a fixed-height frame
 * so the stick / unstick transition is visible without scrolling the page.
 */
function StickyHeaderDemo() {
  const [stickyBreadcrumb, setStickyBreadcrumb] = useState(true);
  const [stickyHeading, setStickyHeading]       = useState(true);
  const [stickySubheading, setStickySubheading] = useState(false);
  const [sidenavOpen, setSidenavOpen]           = useState(true);
  useSidenavOffClick({
    open: sidenavOpen,
    close: () => setSidenavOpen(false),
    containerId: "ds-page-sticky-demo",
    sidebarId: "ds-page-sticky-sidebar",
    toggleId: "ds-page-sticky-toggle",
  });

  // Body sections show the parts that are NOT in the sticky group, in
  // their normal scrolling position above the gallery.
  const bodyHeader: ReactNode[] = [];
  if (!stickyHeading) {
    bodyHeader.push(
      <PageSection key="heading">
        <Content>
          <h1>Detail page</h1>
        </Content>
      </PageSection>,
    );
  }
  if (!stickySubheading) {
    bodyHeader.push(
      <PageSection key="subheading">
        <Content>
          <p>Scroll the panel to watch the sticky parts pin to the top.</p>
        </Content>
      </PageSection>,
    );
  }

  // additionalGroupedContent only includes items that should stick.
  const groupedContent =
    stickyHeading || stickySubheading ? (
      <PageSection isWidthLimited aria-labelledby="sticky-h1">
        <Content>
          {stickyHeading && <h1 id="sticky-h1">Detail page</h1>}
          {stickySubheading && (
            <p>Scroll the panel to watch the sticky parts pin to the top.</p>
          )}
        </Content>
      </PageSection>
    ) : undefined;

  const anySticky = stickyBreadcrumb || stickyHeading || stickySubheading;

  // Local masthead + sidebar — kept simple since the focus is the sticky
  // demo, not the chrome. The grouped breadcrumb / additional content
  // sit inside Page; everything else uses the standard plumbing.
  const masthead = (
    <Masthead id="sticky-demo-masthead">
      <MastheadMain>
        <MastheadToggle>
          <PageToggleButton
            isHamburgerButton
            aria-label="Global navigation"
            isSidebarOpen={sidenavOpen}
            onSidebarToggle={() => setSidenavOpen((v) => !v)}
            id="ds-page-sticky-toggle"
          />
        </MastheadToggle>
        <MastheadBrand>
          <MastheadLogo component="a" href="#">
            {brandLogo}
          </MastheadLogo>
        </MastheadBrand>
      </MastheadMain>
      <MastheadContent>
        <Toolbar id="sticky-demo-toolbar" isStatic>
          <ToolbarContent>
            <ToolbarItem align={{ default: "alignEnd" }}>
              <span style={{ color: "var(--gp-color-text-subtle)" }}>
                Actions
              </span>
            </ToolbarItem>
          </ToolbarContent>
        </Toolbar>
      </MastheadContent>
    </Masthead>
  );

  const sidebar = (
    <PageSidebar isSidebarOpen={sidenavOpen} id="ds-page-sticky-sidebar">
      <PageSidebarBody>
        <Nav aria-label="Sticky demo nav">
          <NavList>
            <NavItem itemId={0} isActive>Overview</NavItem>
            <NavItem itemId={1}>Configuration</NavItem>
            <NavItem itemId={2}>Logs</NavItem>
          </NavList>
        </Nav>
      </PageSidebarBody>
    </PageSidebar>
  );

  const dashboardBreadcrumb = (
    <Breadcrumb>
      <BreadcrumbItem>Home</BreadcrumbItem>
      <BreadcrumbItem to="#">Workflows</BreadcrumbItem>
      <BreadcrumbItem to="#" isActive>
        Detail page
      </BreadcrumbItem>
    </Breadcrumb>
  );

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 16,
          padding: 12,
          border: "1px solid var(--gp-color-border-subtle)",
          borderRadius: 6,
          background: "var(--gp-color-bg-secondary-default)",
        }}
      >
        <Checkbox
          id="sticky-breadcrumb"
          label="Sticky breadcrumb"
          isChecked={stickyBreadcrumb}
          onChange={(_e, v) => setStickyBreadcrumb(v)}
        />
        <Checkbox
          id="sticky-heading"
          label="Sticky page heading"
          isChecked={stickyHeading}
          onChange={(_e, v) => setStickyHeading(v)}
        />
        <Checkbox
          id="sticky-subheading"
          label="Sticky page subheading"
          isChecked={stickySubheading}
          onChange={(_e, v) => setStickySubheading(v)}
        />
      </div>
      <div
        id="ds-page-sticky-demo"
        style={{
          height: 520,
          overflow: "hidden",
          border: "1px solid var(--gp-color-border-subtle)",
          borderRadius: 6,
        }}
      >
        <Page
          masthead={masthead}
          sidebar={sidebar}
          breadcrumb={dashboardBreadcrumb}
          mainContainerId="sticky-demo-main"
          isBreadcrumbWidthLimited={false}
          isBreadcrumbGrouped={anySticky}
          additionalGroupedContent={groupedContent}
          groupProps={
            anySticky ? { stickyOnBreakpoint: { default: "top" } } : undefined
          }
        >
          {bodyHeader}
          <PageSection isFilled aria-label="Card gallery">
            <Gallery hasGutter minWidths={{ default: "180px" }}>
              {Array.from({ length: 30 }).map((_, i) => (
                <GalleryItem key={i}>
                  <Card isCompact>
                    <CardBody>Card {i + 1}</CardBody>
                  </Card>
                </GalleryItem>
              ))}
            </Gallery>
          </PageSection>
        </Page>
      </div>
    </div>
  );
}

/**
 * Live demo for customising the page content area's chrome — border, radius,
 * shadow, padding. The controls drive inline styles on the body PageSections
 * so the user can see the effect across the page header and content blocks
 * without rebuilding a theme. Real apps should land these as theme tokens /
 * brand overrides rather than per-PageSection inline styles.
 */
const SHADOW_VALUES: Record<string, string> = {
  none: "none",
  sm: "0 1px 2px rgba(0,0,0,0.08)",
  md: "0 2px 8px rgba(0,0,0,0.12)",
  lg: "0 6px 16px rgba(0,0,0,0.18)",
};

function StyledContentAreaDemo() {
  const [hasBorder, setHasBorder]           = useState(true);
  const [borderColor, setBorderColor]       = useState("#d2d2d2");
  const [borderThickness, setBorderThickness] = useState(1);
  const [cornerRadius, setCornerRadius]     = useState(8);
  const [shadow, setShadow]                 = useState("md");
  const [padding, setPadding]               = useState(24);

  // Scoped CSS targeting PF6's `.pf-v6-c-page__main-container` — the <div>
  // that wraps <main> and any sibling chrome. Styling THIS element (rather
  // than <main> or individual PageSections) gives a single bordered card
  // around the entire content area. `:has(#styled-demo-main)` keeps the
  // selector scoped to this demo's container only — other Page instances
  // on the doc keep PF6's default container styling.
  const css = `
    .pf-v6-c-page__main-container:has(#styled-demo-main) {
      border: ${hasBorder ? `${borderThickness}px solid ${borderColor}` : "none"};
      border-radius: ${cornerRadius}px;
      box-shadow: ${SHADOW_VALUES[shadow] ?? "none"};
      padding: ${padding}px;
      margin: 8px;
      background: var(--gp-color-bg-primary-default);
    }
  `;

  return (
    <div style={{ display: "grid", gap: 12 }}>
      {/* Scoped style block — only targets the #styled-demo-main element
          inside this demo, not other Page mains on the doc. */}
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 12,
          padding: 12,
          border: "1px solid var(--gp-color-border-subtle)",
          borderRadius: 6,
          background: "var(--gp-color-bg-secondary-default)",
        }}
      >
        <Checkbox
          id="ca-border"
          label="Border"
          isChecked={hasBorder}
          onChange={(_e, v) => setHasBorder(v)}
        />
        <label style={{ display: "grid", gap: 4, fontSize: 13 }}>
          Border colour
          <TextInput
            id="ca-color"
            value={borderColor}
            onChange={(_e, v) => setBorderColor(v)}
            placeholder="#d2d2d2"
            isDisabled={!hasBorder}
          />
        </label>
        <label style={{ display: "grid", gap: 4, fontSize: 13 }}>
          Border thickness (px)
          <TextInput
            id="ca-thickness"
            type="number"
            value={String(borderThickness)}
            onChange={(_e, v) => setBorderThickness(Number(v) || 0)}
            isDisabled={!hasBorder}
          />
        </label>
        <label style={{ display: "grid", gap: 4, fontSize: 13 }}>
          Corner radius (px)
          <TextInput
            id="ca-radius"
            type="number"
            value={String(cornerRadius)}
            onChange={(_e, v) => setCornerRadius(Number(v) || 0)}
          />
        </label>
        <label style={{ display: "grid", gap: 4, fontSize: 13 }}>
          Shadow
          <FormSelect
            id="ca-shadow"
            value={shadow}
            onChange={(_e, v) => setShadow(v)}
            aria-label="Shadow"
          >
            <FormSelectOption value="none" label="None" />
            <FormSelectOption value="sm"   label="Small" />
            <FormSelectOption value="md"   label="Medium" />
            <FormSelectOption value="lg"   label="Large" />
          </FormSelect>
        </label>
        <label style={{ display: "grid", gap: 4, fontSize: 13 }}>
          Padding (px)
          <TextInput
            id="ca-padding"
            type="number"
            value={String(padding)}
            onChange={(_e, v) => setPadding(Number(v) || 0)}
          />
        </label>
      </div>

      <div
        style={{
          height: 520,
          overflow: "hidden",
          border: "1px solid var(--gp-color-border-subtle)",
          borderRadius: 6,
        }}
      >
        <Page
          masthead={
            <Masthead id="styled-demo-masthead">
              <MastheadMain>
                <MastheadBrand>
                  <MastheadLogo component="a" href="#">
                    {brandLogo}
                  </MastheadLogo>
                </MastheadBrand>
              </MastheadMain>
              <MastheadContent>
                <Toolbar id="styled-demo-toolbar" isStatic>
                  <ToolbarContent>
                    <ToolbarItem align={{ default: "alignEnd" }}>
                      <span style={{ color: "var(--gp-color-text-subtle)" }}>
                        Actions
                      </span>
                    </ToolbarItem>
                  </ToolbarContent>
                </Toolbar>
              </MastheadContent>
            </Masthead>
          }
          mainContainerId="styled-demo-main"
        >
          {/* Page header — styled via the same control set. */}
          <PageSection aria-labelledby="styled-h1">
            <Content>
              <h1 id="styled-h1">Page header</h1>
              <p>
                Each PageSection on this page receives the same border / radius /
                shadow / padding from the controls above.
              </p>
            </Content>
          </PageSection>

          {/* Page content — KPI tiles. */}
          <PageSection aria-label="KPI tiles">
            <Gallery hasGutter minWidths={{ default: "180px" }}>
              {Array.from({ length: 4 }).map((_, i) => (
                <GalleryItem key={i}>
                  <Card isCompact>
                    <CardBody>
                      <div style={{ color: "var(--gp-color-text-subtle)", fontSize: 13 }}>
                        Stat {i + 1}
                      </div>
                      <div style={{ fontSize: 24, fontWeight: 600 }}>
                        {String((i + 1) * 42)}
                      </div>
                    </CardBody>
                  </Card>
                </GalleryItem>
              ))}
            </Gallery>
          </PageSection>

          {/* Page content — long copy. */}
          <PageSection aria-label="Long copy">
            <Content>
              <h2>Section detail</h2>
              <p>
                Use this playground to find border / radius / shadow / padding
                values that match the consuming product&rsquo;s visual
                language. Land the chosen values as PF6 theme overrides on{" "}
                <code>--pf-v6-c-page__main-section--*</code> custom properties
                so every PageSection inherits them automatically.
              </p>
            </Content>
          </PageSection>
        </Page>
      </div>
    </div>
  );
}

export const Overview: StoryObj = {
  render: () => {
    // Basic anatomy demo (controlled sidebar)
    const [open, setOpen] = useState(true);
    useSidenavOffClick({
      open,
      close: () => setOpen(false),
      containerId: "ds-page-basic-demo",
      sidebarId: "ds-page-sidebar",
      toggleId: "ds-page-nav-toggle",
    });
    // Sidebar-behaviour demo (push)
    const [pushOpen, setPushOpen] = useState(true);
    useSidenavOffClick({
      open: pushOpen,
      close: () => setPushOpen(false),
      containerId: "ds-page-push-demo",
      sidebarId: "ds-page-push-sidebar",
      toggleId: "ds-page-push-toggle",
    });
    const masthead = (
      <Masthead>
        <MastheadMain>
          <MastheadToggle>
            <PageToggleButton
              isHamburgerButton
              aria-label="Global navigation"
              isSidebarOpen={open}
              onSidebarToggle={() => setOpen((v) => !v)}
              id="ds-page-nav-toggle"
            />
          </MastheadToggle>
          <MastheadBrand>
            <MastheadLogo href="#" component="a">
              {brandLogo}
            </MastheadLogo>
          </MastheadBrand>
        </MastheadMain>
        <MastheadContent>
          <Toolbar id="ds-page-toolbar" isStatic>
            <ToolbarContent>
              <ToolbarItem align={{ default: "alignEnd" }}>
                <span style={{ color: "var(--gp-color-text-subtle)" }}>
                  Global actions
                </span>
              </ToolbarItem>
            </ToolbarContent>
          </Toolbar>
        </MastheadContent>
      </Masthead>
    );
    const sidebar = (
      <PageSidebar isSidebarOpen={open} id="ds-page-sidebar">
        <PageSidebarBody>
          <Nav aria-label="Primary">
            <NavList>
              <NavItem itemId={0} isActive>Dashboard</NavItem>
              <NavItem itemId={1}>Tasks</NavItem>
              <NavItem itemId={2}>Settings</NavItem>
            </NavList>
          </Nav>
        </PageSidebarBody>
      </PageSidebar>
    );

    // Slot props demo — uses Page.breadcrumb + Page.banner directly
    const slotsMasthead = (
      <Masthead>
        <MastheadMain>
          <MastheadBrand>
            <MastheadLogo href="#" component="a">
              {brandLogo}
            </MastheadLogo>
          </MastheadBrand>
        </MastheadMain>
        <MastheadContent>
          <span style={{ color: "var(--gp-color-text-subtle)" }}>
            Header content
          </span>
        </MastheadContent>
      </Masthead>
    );

    // Centered + width-limited demo
    const centeredMasthead = slotsMasthead;

    return (
      <FoundationPage
        title="Page"
        intro={
          <>
            The top-level layout shell. Composes <code>Masthead</code>,{" "}
            <code>PageSidebar</code>, and <code>PageSection</code> into the
            standard app skeleton — header bar, optional collapsible sidebar,
            scrolling main content. Use it as the outermost container of every
            app screen; the lib&rsquo;s own <code>Shell</code> is built on
            top.
          </>
        }
      >
        <style
          dangerouslySetInnerHTML={{
            // Shared sidenav-drawer styling — same animation/easing as the
            // Drawer story's "Sidenav drawer (hamburger toggle)" demo so all
            // hamburger toggles in the doc behave the same way (push mode,
            // smooth same-speed open/close, no content-snap on open).
            __html: [
              sidenavDrawerCss("ds-page-basic-demo"),
              sidenavDrawerCss("ds-page-push-demo"),
              sidenavDrawerCss("ds-page-slots-demo"),
              sidenavDrawerCss("ds-page-centered-demo"),
              sidenavDrawerCss("ds-page-sticky-demo"),
            ].join("\n"),
          }}
        />
        <Section
          title="Basic — masthead + sidebar + content"
          description="PageToggleButton + isSidebarOpen wires the hamburger toggle. PageSection slots stack vertically; isFilled stretches one to fill remaining height."
        >
          <DocCard>
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <div id="ds-page-basic-demo">
              <DemoFrame height={360}>
                <Page
                  masthead={masthead}
                  sidebar={sidebar}
                >
                  <PageSection aria-labelledby="ds-page-h1">
                    <Title headingLevel="h1" id="ds-page-h1">
                      Dashboard
                    </Title>
                  </PageSection>
                  <PageSection variant="secondary" aria-label="Stats">
                    <span style={{ color: "var(--gp-color-text-subtle)" }}>
                      Secondary-toned section.
                    </span>
                  </PageSection>
                </Page>
              </DemoFrame>
              </div>
              <CodeBlock>{`const [open, setOpen] = useState(true);

const masthead = (
  <Masthead>
    <MastheadMain>
      <MastheadToggle>
        <PageToggleButton
          isHamburgerButton
          aria-label="Global navigation"
          isSidebarOpen={open}
          onSidebarToggle={() => setOpen(!open)}
          id="page-nav-toggle"
        />
      </MastheadToggle>
      <MastheadBrand>
        <MastheadLogo href="/" component="a">
          <img src="/logo.svg" alt="Acme" />
        </MastheadLogo>
      </MastheadBrand>
    </MastheadMain>
    <MastheadContent>{/* global actions */}</MastheadContent>
  </Masthead>
);

const sidebar = (
  <PageSidebar isSidebarOpen={open} id="page-sidebar">
    <PageSidebarBody>
      <Nav aria-label="Primary">{/* nav items */}</Nav>
    </PageSidebarBody>
  </PageSidebar>
);

<Page masthead={masthead} sidebar={sidebar}>
  <PageSection aria-labelledby="page-h1">
    <Title headingLevel="h1" id="page-h1">Dashboard</Title>
  </PageSection>
  <PageSection isFilled>{/* main content */}</PageSection>
</Page>`}</CodeBlock>
            </div>
          </DocCard>
        </Section>

        <Section
          title="Sidebar behavior — push vs overlay"
          description="When the sidebar opens it can either shrink the content area to fit alongside (push — the desktop default) or float on top of the content (overlay — the mobile default). PF6 picks the mode automatically from viewport width via the internal resize observer; the xl breakpoint is the threshold."
        >
          <DocCard>
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <strong style={{ color: "var(--gp-color-text-regular)" }}>
                Push (desktop) — sidebar shrinks the content column
              </strong>
              <div id="ds-page-push-demo">
              <DemoFrame height={300}>
                <Page
                  masthead={
                    <Masthead>
                      <MastheadMain>
                        <MastheadToggle>
                          <PageToggleButton
                            isHamburgerButton
                            aria-label="Global navigation"
                            isSidebarOpen={pushOpen}
                            onSidebarToggle={() => setPushOpen((v) => !v)}
                            id="ds-page-push-toggle"
                          />
                        </MastheadToggle>
                        <MastheadBrand>
                          <MastheadLogo href="#" component="a">
                            {brandLogo}
                          </MastheadLogo>
                        </MastheadBrand>
                      </MastheadMain>
                    </Masthead>
                  }
                  sidebar={
                    <PageSidebar
                      isSidebarOpen={pushOpen}
                      id="ds-page-push-sidebar"
                    >
                      <PageSidebarBody>
                        <Nav aria-label="Push primary">
                          <NavList>
                            <NavItem itemId={0} isActive>Dashboard</NavItem>
                            <NavItem itemId={1}>Tasks</NavItem>
                            <NavItem itemId={2}>Settings</NavItem>
                          </NavList>
                        </Nav>
                      </PageSidebarBody>
                    </PageSidebar>
                  }
                >
                  <PageSection aria-label="Push main">
                    <span style={{ color: "var(--gp-color-text-subtle)" }}>
                      Toggle the hamburger — the main content column reflows
                      to fill the freed width.
                    </span>
                  </PageSection>
                </Page>
              </DemoFrame>
              </div>
              <p style={{ margin: 0, color: "var(--gp-color-text-subtle)", fontSize: 14, lineHeight: 1.6 }}>
                <strong>Overlay (mobile)</strong> — below the xl breakpoint
                PF6 absolute-positions the sidebar with a higher z-index, so
                opening it floats the panel on top of the content rather than
                shrinking it. The content column keeps its full width. This
                kicks in automatically as you resize the viewport — no prop
                needed.
              </p>
              <CodeBlock>{`// PF6 chooses push vs overlay automatically from viewport width.
// To pin the threshold (e.g. force desktop layout in a constrained shell):
<Page getBreakpoint={() => "xl"} ... />   // always push
<Page getBreakpoint={() => "sm"}  ... />   // always overlay

// Or shift it (e.g. switch to push earlier, at lg):
<Page
  getBreakpoint={(width) =>
    width === null ? "xl" : width >= 992 ? "xl" : "sm"
  }
  ...
/>`}</CodeBlock>
            </div>
          </DocCard>
        </Section>

        <Section
          title="Managed sidebar"
          description="Set isManagedSidebar on Page and the component owns sidebar open/close — PageToggleButton inside the masthead picks up the state from PageContext, no useState wiring needed. Use the controlled pattern (above) when sidebar state needs to live in your store/router."
        >
          <DocCard>
            <div style={{ padding: 24 }}>
              <CodeBlock>{`<Page
  isManagedSidebar
  defaultManagedSidebarIsOpen={true}
  masthead={
    <Masthead>
      <MastheadMain>
        <MastheadToggle>
          {/* No isSidebarOpen / onSidebarToggle — Page handles it */}
          <PageToggleButton isHamburgerButton aria-label="Global navigation" />
        </MastheadToggle>
        <MastheadBrand>
          <MastheadLogo href="/" component="a"><img src="/logo.svg" alt="Acme" /></MastheadLogo>
        </MastheadBrand>
      </MastheadMain>
    </Masthead>
  }
  sidebar={
    <PageSidebar>
      <PageSidebarBody><Nav aria-label="Primary">{/* ... */}</Nav></PageSidebarBody>
    </PageSidebar>
  }
>
  <PageSection><Title headingLevel="h1">Dashboard</Title></PageSection>
</Page>`}</CodeBlock>
            </div>
          </DocCard>
        </Section>

        <Section
          title="Slot props — banner / breadcrumb / horizontalSubnav"
          description="Page exposes named slots for content that lives between the masthead and the main scroll area. Pass a Breadcrumb directly to Page.breadcrumb — Page wraps it in PageBreadcrumb + PageBody automatically. Same for horizontalSubnav. Banner content sits above the breadcrumb."
        >
          <DocCard>
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <div id="ds-page-slots-demo">
              <DemoFrame height={300}>
                <Page
                  masthead={slotsMasthead}
                  banner={
                    <div
                      style={{
                        padding: "8px 16px",
                        background: "var(--gp-color-status-info-bg)",
                        color: "var(--gp-color-status-info-text)",
                      }}
                    >
                      Banner content — global notice / status strip
                    </div>
                  }
                  breadcrumb={
                    <Breadcrumb>
                      <BreadcrumbItem to="#">Workspaces</BreadcrumbItem>
                      <BreadcrumbItem to="#">Acme</BreadcrumbItem>
                      <BreadcrumbItem isActive>Onboarding</BreadcrumbItem>
                    </Breadcrumb>
                  }
                >
                  <PageSection aria-labelledby="slots-h1">
                    <Title headingLevel="h1" id="slots-h1">
                      Onboarding
                    </Title>
                  </PageSection>
                </Page>
              </DemoFrame>
              </div>
              <CodeBlock>{`<Page
  masthead={<Masthead>...</Masthead>}
  banner={<NoticeBar>System update tonight at 23:00 UTC</NoticeBar>}
  breadcrumb={
    <Breadcrumb>
      <BreadcrumbItem to="/workspaces">Workspaces</BreadcrumbItem>
      <BreadcrumbItem to="/workspaces/acme">Acme</BreadcrumbItem>
      <BreadcrumbItem isActive>Onboarding</BreadcrumbItem>
    </Breadcrumb>
  }
  horizontalSubnav={<Nav variant="horizontal-subnav">{/* sub-tabs */}</Nav>}
  isBreadcrumbWidthLimited
  isBreadcrumbGrouped /* group breadcrumb + horizontalSubnav into one PageGroup */
>
  <PageSection><Title headingLevel="h1">Page heading</Title></PageSection>
</Page>`}</CodeBlock>
            </div>
          </DocCard>
        </Section>

        <Section
          title="Centered + width-limited section"
          description="isWidthLimited caps a PageSection at the page-section width token; pair with isCenterAligned to centre the limited content in the main column. Useful for marketing pages, settings forms, focused single-column reading layouts."
        >
          <DocCard>
            <div style={{ padding: 24 }}>
              <div id="ds-page-centered-demo">
              <DemoFrame height={260}>
                <Page masthead={centeredMasthead}>
                  <PageSection
                    isWidthLimited
                    isCenterAligned
                    aria-label="Centered content"
                  >
                    <Card>
                      <CardBody>
                        When the main area is wider than the section&rsquo;s
                        max-width, <code>isCenterAligned</code> centres the
                        content. The card here just makes the boundary
                        visible — it isn&rsquo;t required.
                      </CardBody>
                    </Card>
                  </PageSection>
                </Page>
              </DemoFrame>
              </div>
            </div>
          </DocCard>
        </Section>

        <Section
          title="Multiple sidebar bodies"
          description="A PageSidebar can hold several PageSidebarBody children — typical pattern: a context selector at the top, primary Nav, optional footer body. The last body fills available vertical space by default; pass isFilled={false} to opt out."
        >
          <DocCard>
            <div style={{ padding: 24 }}>
              <CodeBlock>{`<PageSidebar isSidebarOpen={open}>
  <PageSidebarBody isContextSelector>
    {/* Workspace switcher / perspective selector */}
  </PageSidebarBody>
  <PageSidebarBody usePageInsets>
    <Nav aria-label="Primary">{/* main nav */}</Nav>
  </PageSidebarBody>
  <PageSidebarBody isFilled={false} usePageInsets>
    {/* Footer / collapse hint — does not stretch */}
  </PageSidebarBody>
</PageSidebar>`}</CodeBlock>
            </div>
          </DocCard>
        </Section>

        <Section
          title="Sticky breadcrumb + heading (groupProps.stickyOnBreakpoint)"
          description="Page natively groups its `breadcrumb` slot with anything in `additionalGroupedContent` and pins the whole group via `groupProps.stickyOnBreakpoint`. Toggle the boxes below to control which parts of the page header join the sticky group; scroll the inner panel to see them pin."
        >
          <DocCard>
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <StickyHeaderDemo />
              <CodeBlock>{`<Page
  masthead={masthead}
  sidebar={sidebar}
  breadcrumb={<Breadcrumb>{/* crumbs */}</Breadcrumb>}
  isBreadcrumbGrouped
  additionalGroupedContent={
    <PageSection isWidthLimited aria-labelledby="page-h1">
      <Content>
        <h1 id="page-h1">Detail page</h1>
        <p>Subheading copy goes here.</p>
      </Content>
    </PageSection>
  }
  groupProps={{ stickyOnBreakpoint: { default: "top" } }}
>
  <PageSection isFilled>{/* main content */}</PageSection>
</Page>`}</CodeBlock>
            </div>
          </DocCard>
        </Section>

        <Section
          title="Custom content-area styling"
          description="Drive border / radius / shadow / padding on the page header + content sections. Use to dial-in the look that matches the consuming product, then land the chosen values as PF6 theme overrides on `--pf-v6-c-page__main-section--*` custom properties so every PageSection inherits them automatically."
        >
          <DocCard>
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <StyledContentAreaDemo />
              <CodeBlock>{`// Per-section override via inline style (playground):
<PageSection
  style={{
    border: "1px solid #d2d2d2",
    borderRadius: 8,
    boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
    padding: 24,
    margin: 8,
  }}
>
  {/* content */}
</PageSection>

// Theme-wide override (preferred — every PageSection inherits):
:where([data-brand="golden-passport"]) {
  --pf-v6-c-page__main-section--PaddingBlockStart:  1.5rem;
  --pf-v6-c-page__main-section--PaddingBlockEnd:    1.5rem;
  --pf-v6-c-page__main-section--PaddingInlineStart: 1.5rem;
  --pf-v6-c-page__main-section--PaddingInlineEnd:   1.5rem;
}`}</CodeBlock>
            </div>
          </DocCard>
        </Section>

        <Section
          title="Notification drawer"
          description="Page.notificationDrawer mounts a Drawer to the right of the main area; Page wires expansion via isNotificationDrawerExpanded + onNotificationDrawerExpand. Size with drawerDefaultSize / drawerMinSize / drawerMaxSize."
        >
          <DocCard>
            <div style={{ padding: 24 }}>
              <CodeBlock>{`<Page
  masthead={masthead}
  sidebar={sidebar}
  notificationDrawer={<NotificationDrawer>{/* notifications */}</NotificationDrawer>}
  isNotificationDrawerExpanded={isNotifOpen}
  onNotificationDrawerExpand={() => focusFirstNotification()}
  drawerDefaultSize="400px"
  drawerMinSize="280px"
>
  <PageSection><Title headingLevel="h1">Dashboard</Title></PageSection>
</Page>`}</CodeBlock>
            </div>
          </DocCard>
        </Section>

        <Section
          title="PageSection types"
          description="type tunes a section's chrome for its semantic role — subnav strips, breadcrumb rails, tabs, wizard frames. Default type is the standard content band."
        >
          <DocCard>
            <div style={{ padding: 24 }}>
              <PropsTable
                rows={[
                  { name: 'type="default"', type: "child", description: "Standard content band — h1, body, tables, cards." },
                  { name: 'type="breadcrumb"', type: "child", description: "Pinned breadcrumb rail above the content. Pair with PageBreadcrumb / Page.breadcrumb slot for the auto-wrapped pattern." },
                  { name: 'type="subnav"', type: "child", description: "Horizontal subnav strip — for sub-section navigation under a primary tab." },
                  { name: 'type="tabs"', type: "child", description: "Tabs frame — for Tabs that span the page width." },
                  { name: 'type="wizard"', type: "child", description: "Wizard frame — for wizard footer / shell." },
                ]}
              />
            </div>
          </DocCard>
        </Section>

        <Section title="Composition">
          <DocCard>
            <div style={{ padding: 24 }}>
              <PropsTable
                rows={[
                  { name: "Page", type: "container", description: "Outer shell. Owns masthead/sidebar slots, banner / breadcrumb / horizontalSubnav / notificationDrawer slots, and scroll behaviour." },
                  { name: "PageSection", type: "child", description: "Vertical content band. type tunes chrome; isFilled stretches to remaining height; variant='secondary' tones the bg; isWidthLimited + isCenterAligned for focused content." },
                  { name: "PageBody", type: "child", description: "Inner content wrapper used by PageSection / PageBreadcrumb under the hood — usually you don't render this directly. hasBodyWrapper={false} on PageSection / PageBreadcrumb opts out so you can pass multiple PageBody children." },
                  { name: "PageBreadcrumb", type: "child", description: "Breadcrumb rail. Use this directly when you need shadow / sticky / overflow control; otherwise pass Breadcrumb to Page.breadcrumb and Page wraps it for you." },
                  { name: "PageGroup", type: "child", description: "Sticky-able group of sections (breadcrumb + header + tabs). stickyOnBreakpoint pins the group; hasShadowBottom adds a divider when stuck." },
                  { name: "PageToggleButton", type: "child", description: "Hamburger toggle. Lives inside MastheadToggle. With isManagedSidebar on Page, no isSidebarOpen / onSidebarToggle wiring is needed." },
                  { name: "Masthead + family", type: "child", description: "Top bar — see Components/Masthead for the full surface." },
                  { name: "PageSidebar / PageSidebarBody", type: "child", description: "Collapsible side panel — typically holds Nav. Pair isSidebarOpen with PageToggleButton, or use isManagedSidebar to let Page own the state. Multiple PageSidebarBody siblings supported." },
                ]}
              />
            </div>
          </DocCard>
        </Section>

        <Section title="Most-used Page props">
          <DocCard>
            <div style={{ padding: 24 }}>
              <PropsTable
                rows={[
                  { name: "masthead", type: "ReactNode", description: "Top-bar content." },
                  { name: "sidebar", type: "ReactNode", description: "Side-panel content. Pass null for sidebar-less layouts." },
                  { name: "banner", type: "ReactNode", description: "Slot rendered above the breadcrumb / main — system status strips, beta tags, environment markers." },
                  { name: "breadcrumb", type: "ReactNode", description: "Slot for a Breadcrumb. Page wraps it in PageBreadcrumb + PageBody automatically." },
                  { name: "horizontalSubnav", type: "ReactNode", description: "Slot for a horizontal sub-navigation Nav. Page handles the wrapper." },
                  { name: "isBreadcrumbWidthLimited / isHorizontalSubnavWidthLimited", type: "boolean", description: "Cap the slot at the page section's max-width." },
                  { name: "isBreadcrumbGrouped / isHorizontalSubnavGrouped", type: "boolean", description: "Wrap the slot inside a PageGroup so it sticks together with adjacent header content." },
                  { name: "additionalGroupedContent", type: "ReactNode", description: "Extra content placed inside the auto-PageGroup (used with the *Grouped flags)." },
                  { name: "groupProps", type: "PageGroupProps", description: "Forwarded to the auto-PageGroup wrapper (e.g. stickyOnBreakpoint)." },
                  { name: "isManagedSidebar", type: "boolean", description: "Let Page handle sidebar open/close state instead of wiring it manually via PageContext." },
                  { name: "defaultManagedSidebarIsOpen", type: "boolean (default true)", description: "Initial open state when isManagedSidebar is set." },
                  { name: "notificationDrawer", type: "ReactNode", description: "Slot for a NotificationDrawer rendered to the right of main." },
                  { name: "isNotificationDrawerExpanded", type: "boolean", description: "Controls notification-drawer expansion." },
                  { name: "onNotificationDrawerExpand", type: "(event) => void", description: "Fires when the notification drawer finishes expanding — wire focus management here." },
                  { name: "drawerDefaultSize / drawerMinSize / drawerMaxSize", type: "string", description: "Bound the notification drawer's width." },
                  { name: "isContentFilled", type: "boolean", description: "Children fill the available vertical space; pair with isFilled on the section/group that should stretch." },
                  { name: "mainContainerId", type: "string", description: 'Required when wiring a SkipToContent link — pair with the link\'s targetId. Default "primary-app-container".' },
                  { name: "mainAriaLabel", type: "string", description: "Accessible name for the <main> element when no visible heading anchors it." },
                  { name: "mainTabIndex", type: "number | null (default -1)", description: "tabIndex on the main element. Pass null to remove." },
                  { name: "mainComponent", type: '"main" | "div" (default "main")', description: "Override when the Page is nested inside another <main> (e.g. embedded shells)." },
                  { name: "skipToContent", type: "ReactElement", description: "First focusable element. Use the lib's SkipToContent component." },
                  { name: "onPageResize", type: "(event, { mobileView, windowSize }) => void", description: "Fires on viewport resize — useful for closing the sidebar on transition to mobile." },
                  { name: "getBreakpoint / getVerticalBreakpoint", type: "(width|height) => 'default'|'sm'|...|'2xl'", description: "Override the breakpoint mapping used for responsive class hooks." },
                ]}
              />
            </div>
          </DocCard>
        </Section>

        <Section title="Most-used PageSection props">
          <DocCard>
            <div style={{ padding: 24 }}>
              <PropsTable
                rows={[
                  { name: "type", type: "'default' | 'subnav' | 'breadcrumb' | 'tabs' | 'wizard'", description: "Section's semantic role — tunes chrome." },
                  { name: "variant", type: "'default' | 'secondary'", description: "Default tones the bg neutrally; secondary uses the alt surface for visual rhythm. Only applies when type='default'." },
                  { name: "isFilled", type: "boolean", description: "Stretches the section to fill the remaining vertical space inside the main area. Pair with Page.isContentFilled." },
                  { name: "padding", type: "BreakpointObject<'padding' | 'noPadding'>", description: "Per-breakpoint padding control. Set default to establish a baseline; later breakpoints inherit." },
                  { name: "isWidthLimited", type: "boolean", description: "Cap width at the section's max-width token." },
                  { name: "isCenterAligned", type: "boolean", description: "Centre the limited content in the main column. Requires isWidthLimited." },
                  { name: "stickyOnBreakpoint", type: "BreakpointObject<'top' | 'bottom'>", description: "Pin the section to the top/bottom of its scroll parent above a breakpoint." },
                  { name: "hasShadowTop / hasShadowBottom", type: "boolean", description: "Edge shadow — useful when the section is sticky and content scrolls behind it." },
                  { name: "hasOverflowScroll", type: "boolean", description: "Make the section scroll independently. Requires aria-label (PF dev-warns if missing)." },
                  { name: "component", type: "ElementType (default 'section')", description: "Render as a different element when section semantics aren't appropriate." },
                  { name: "aria-label / aria-labelledby", type: "string", description: "Name the section. aria-label required when hasOverflowScroll is set." },
                ]}
              />
            </div>
          </DocCard>
        </Section>

        <Section title="Accessibility">
          <DocCard>
            <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
              <li><strong>Always provide a SkipToContent</strong> as the first focusable element. The lib&rsquo;s SkipToContent component handles the visually-hidden + focus-visible pattern.</li>
              <li><strong>PageSection needs a name.</strong> Use <code>aria-labelledby</code> pointing at an in-section heading id, or <code>aria-label</code> when no heading is present. <strong>Required</strong> when <code>hasOverflowScroll</code> is set.</li>
              <li><strong>Masthead should have <code>&lt;header&gt;</code> semantics</strong>; Nav should be <code>&lt;nav aria-label=&quot;Primary&quot;&gt;</code>; main should be <code>&lt;main id=&quot;primary-app-container&quot;&gt;</code> (Page handles this automatically — override via <code>mainComponent=&quot;div&quot;</code> only when nested inside another <code>&lt;main&gt;</code>).</li>
              <li><strong>One Page per route.</strong> Don&rsquo;t nest Pages — they fight for sidebar/masthead state and break the focus order.</li>
              <li><strong>PageToggleButton sets <code>aria-expanded</code> automatically</strong> from the sidebar open state — both in controlled and managed modes.</li>
            </ul>
          </DocCard>
        </Section>

        <Section title="When to use Page vs Shell">
          <DocCard>
            <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
              <li><strong>Shell</strong> (lib) — opinionated wrapper that requires i18n labels and pre-wires SkipToContent + a default brand. Start here for new apps.</li>
              <li><strong>Page</strong> (PF6 raw) — when you need full control over masthead/sidebar composition, slot props (banner / breadcrumb / horizontalSubnav), or notification drawer. Shell calls into Page under the hood.</li>
            </ul>
          </DocCard>
        </Section>
      </FoundationPage>
    );
  },
};
