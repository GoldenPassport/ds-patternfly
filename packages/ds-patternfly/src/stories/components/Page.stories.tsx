import { useState, type ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
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
import { TimesIcon } from "@patternfly/react-icons";
import { FoundationPage, Section, Card as DocCard, CodeBlock } from "../_storyKit.js";
import {
  DemoFrame,
  PropsTable,
  sidenavDrawerCss,
  type SidenavOverlayBreakpoint,
  useBlockPushClickClose,
} from "../../components/DemoKit.js";
import { AcmeLogo } from "../../components/AcmeLogo.js";

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

// Shared Acme logo — colour-aware so the wordmark stays readable when the
// Storybook toolbar toggles dark mode. See `src/components/AcmeLogo.tsx`.
const brandLogo = <AcmeLogo />;

/**
 * Live demo of PF6's sticky-header pattern, mirroring the Basic demo's
 * sidenav pattern: PF6
 * `isManagedSidebar` + `useBlockPushClickClose`, no custom
 * `sidenavDrawerCss`. The fixed-height scroll viewport (DemoFrame's
 * own `height` prop) lets the user scroll inside the demo to see the
 * sticky group pin to the top; the hamburger drives the smooth push
 * at desktop widths and overlay-with-off-click-close at mobile.
 *
 * Three checkboxes control which parts of the page header join the
 * sticky PageGroup:
 *   - Breadcrumb       → drives `groupProps.stickyOnBreakpoint`
 *   - Page heading     → if true, the <h1> lives in
 *                        `additionalGroupedContent` (sticky); if
 *                        false, it goes in a regular body section.
 *   - Page subheading  → same toggle for the lead paragraph.
 */
function StickyHeaderDemo() {
  const [stickyBreadcrumb, setStickyBreadcrumb] = useState(true);
  const [stickyHeading, setStickyHeading]       = useState(true);
  const [stickySubheading, setStickySubheading] = useState(false);

  // Sidenav-drawer behaviour: PF6 owns state via PageContext; this
  // hook prevents PF6's main-click-close from firing while the sidebar
  // is visually pinned in push mode (container ≥ md). Below md (mobile)
  // the sidebar overlays and clicking outside closes — same as Basic.
  useBlockPushClickClose({
    pageContainerId: "ds-page-sticky-demo",
    sidebarId: "ds-page-sticky-sidebar",
  });

  // Body sections render the parts NOT in the sticky group, in their
  // normal scrolling position above the gallery.
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

  const masthead = (
    <Masthead id="sticky-demo-masthead" display={{ default: "inline" }}>
      <MastheadMain>
        <MastheadToggle>
          <PageToggleButton
            isHamburgerButton
            aria-label="Global navigation"
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
    <PageSidebar id="ds-page-sticky-sidebar">
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
      <div id="ds-page-sticky-demo">
        <DemoFrame height={520}>
          <Page
            masthead={masthead}
            sidebar={sidebar}
            breadcrumb={dashboardBreadcrumb}
            mainContainerId="sticky-demo-main"
            isBreadcrumbWidthLimited={false}
            isBreadcrumbGrouped={anySticky}
            additionalGroupedContent={groupedContent}
            isManagedSidebar
            defaultManagedSidebarIsOpen
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
        </DemoFrame>
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
  // Full-height layout — Page becomes isContentFilled, and the last
  // PageSection takes isFilled + hasOverflowScroll so it stretches to
  // remaining vertical space and scrolls internally.
  const [fullHeight, setFullHeight]         = useState(false);

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
        <Checkbox
          id="ca-full-height"
          label="Full height (scroll inside)"
          isChecked={fullHeight}
          onChange={(_e, v) => setFullHeight(v)}
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
            <Masthead id="styled-demo-masthead" display={{ default: "inline" }}>
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
          isContentFilled={fullHeight}
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

          {/* Page content — long copy. When `fullHeight` is on, this
              section becomes the fillable + scrollable one. PF6's grid
              layout computes its height from remaining vertical space
              so the surrounding chrome / bottom margin is automatically
              subtracted. `aria-label` is required by PF when
              `hasOverflowScroll` is set. */}
          <PageSection
            aria-label="Long copy"
            isFilled={fullHeight}
            hasOverflowScroll={fullHeight}
          >
            <Content>
              <h2>Section detail</h2>
              <p>
                Use this playground to find border / radius / shadow / padding
                values that match the consuming product&rsquo;s visual
                language. Land the chosen values as PF6 theme overrides on{" "}
                <code>--pf-v6-c-page__main-section--*</code> custom properties
                so every PageSection inherits them automatically.
              </p>
              {/* Extra paragraphs so the "Full height" toggle has something
                  to scroll inside the demo's fixed-height frame. */}
              {fullHeight &&
                Array.from({ length: 8 }).map((_, i) => (
                  <p key={i}>
                    Paragraph {i + 1}. Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit. Sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                    exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat.
                  </p>
                ))}
            </Content>
          </PageSection>
        </Page>
      </div>
    </div>
  );
}

/**
 * Demo for the "unified surface" layout — sidebar + content sharing one
 * background, no visible borders / dividers / box around the content area.
 * The masthead is left at PF6 default tonality so it still reads as the
 * top frame. PageSection padding stays so content breathes.
 *
 * Implementation:
 *  - Override the per-Page CSS custom properties PF6 uses for sidebar /
 *    main backgrounds, scoped to the demo container via a
 *    `:has(#unified-surface-main)` selector so the rest of the doc keeps
 *    PF6's default theming.
 *  - The sidebar's separator/border is wiped explicitly — by default PF6
 *    paints a subtle line between the sidebar and main column.
 *  - PageSections keep their PF6-default padding; only the chrome around
 *    them disappears.
 */
function UnifiedSurfaceDemo() {
  // Use PF6's isManagedSidebar (state via PageContext) + custom CSS for
  // push at the container's md breakpoint. useBlockPushClickClose
  // prevents PF6's main-click-close from firing while the sidebar is
  // visually pinned in push mode.
  useBlockPushClickClose({
    pageContainerId: "unified-surface-demo",
    sidebarId: "unified-surface-sidebar",
  });

  // Masthead-chrome controls. These drive the only piece of visible chrome
  // on the unified-surface layout: the line + shadow that lifts the masthead
  // off the flat sidebar/content panel below. The sidebar/main wash and the
  // padding stripping stay constant — only the masthead chrome is tunable.
  const [hasBorder, setHasBorder] = useState(true);
  const [borderColor, setBorderColor] = useState("#e6dcc8");
  const [borderThickness, setBorderThickness] = useState(1);
  const [shadow, setShadow] = useState<keyof typeof SHADOW_VALUES>("sm");
  // Full-height layout — Page becomes isContentFilled, and the last
  // PageSection takes isFilled + hasOverflowScroll so it stretches to the
  // remaining vertical space (with bottom margin accounted for via PF6's
  // grid template) and scrolls internally rather than the whole frame.
  const [fullHeight, setFullHeight] = useState(false);

  // CSS, scoped to this demo via `:has(#unified-surface-main)`:
  //   1. Unify sidebar + main + main-container backgrounds so the two
  //      columns read as one continuous surface.
  //   2. Strip the main-container's border / shadow (always).
  //   3. Push mode (container ≥ md) — strip the sidebar's border /
  //      shadow too; it sits flush with the unified body.
  //   4. Overlay mode (container < md) — keep the sidebar borderless
  //      but add a right-edge shadow so the floating drawer reads as a
  //      lifted surface above the unified body, matching how the Basic
  //      demo paints its overlay drawer.
  //   5. Apply the masthead chrome (border + shadow) per the controls
  //      above — the only visible separator between header and panel.
  // `container-type: inline-size` on the demo wrapper makes the
  // container queries below resolve against the demo's own width.
  // Hamburger / push / overlay still handled by PF6's isManagedSidebar.
  const mastheadBorder = hasBorder
    ? `${borderThickness}px solid ${borderColor}`
    : "none";
  const mastheadShadow = SHADOW_VALUES[shadow] ?? "none";
  const css = `
    #unified-surface-demo { container-type: inline-size; }
    .pf-v6-c-page:has(#unified-surface-main) {
      --pf-v6-c-page--BackgroundColor: var(--gp-color-bg-primary-default);
    }
    .pf-v6-c-page:has(#unified-surface-main) .pf-v6-c-page__sidebar,
    .pf-v6-c-page:has(#unified-surface-main) .pf-v6-c-page__main,
    .pf-v6-c-page:has(#unified-surface-main) .pf-v6-c-page__main-container {
      background: var(--gp-color-bg-primary-default);
    }
    .pf-v6-c-page:has(#unified-surface-main) .pf-v6-c-page__main-container {
      border: none;
      box-shadow: none;
    }
    /* Overlay (mobile / narrow): end-inline shadow on the sidebar so it
       reads as a lifted floating surface above the unified body. In
       LTR the shadow falls on the right edge; :dir(rtl) flips it to
       the left edge to match where the drawer floats in. */
    @container (max-width: 767.98px) {
      .pf-v6-c-page:has(#unified-surface-main) .pf-v6-c-page__sidebar,
      .pf-v6-c-page:has(#unified-surface-main) .pf-v6-c-page__sidebar.pf-m-expanded {
        border: none;
        box-shadow: 4px 0 12px rgba(0, 0, 0, 0.18);
      }
      :dir(rtl) .pf-v6-c-page:has(#unified-surface-main) .pf-v6-c-page__sidebar,
      :dir(rtl) .pf-v6-c-page:has(#unified-surface-main) .pf-v6-c-page__sidebar.pf-m-expanded {
        box-shadow: -4px 0 12px rgba(0, 0, 0, 0.18);
      }
    }
    /* Push (desktop): sidebar flush with main — no border, no shadow. */
    @container (min-width: 768px) {
      .pf-v6-c-page:has(#unified-surface-main) .pf-v6-c-page__sidebar,
      .pf-v6-c-page:has(#unified-surface-main) .pf-v6-c-page__sidebar.pf-m-expanded {
        border: none;
        box-shadow: none;
      }
    }
    .pf-v6-c-page:has(#unified-surface-main) .pf-v6-c-masthead {
      border-bottom: ${mastheadBorder};
      box-shadow: ${mastheadShadow};
    }
  `;

  const masthead = (
    <Masthead id="unified-surface-masthead" display={{ default: "inline" }}>
      <MastheadMain>
        <MastheadToggle>
          <PageToggleButton
            isHamburgerButton
            aria-label="Global navigation"
            id="unified-surface-toggle"
          />
        </MastheadToggle>
        <MastheadBrand>
          <MastheadLogo component="a" href="#">
            {brandLogo}
          </MastheadLogo>
        </MastheadBrand>
      </MastheadMain>
      <MastheadContent>
        <Toolbar id="unified-surface-toolbar" isStatic>
          <ToolbarContent>
            <ToolbarItem align={{ default: "alignEnd" }}>
              <span style={{ color: "inherit", opacity: 0.85 }}>Actions</span>
            </ToolbarItem>
          </ToolbarContent>
        </Toolbar>
      </MastheadContent>
    </Masthead>
  );

  const sidebar = (
    <PageSidebar id="unified-surface-sidebar">
      <PageSidebarBody>
        <Nav aria-label="Unified-surface demo nav">
          <NavList>
            <NavItem itemId={0} isActive>Dashboard</NavItem>
            <NavItem itemId={1}>Workflows</NavItem>
            <NavItem itemId={2}>Reports</NavItem>
            <NavItem itemId={3}>Settings</NavItem>
          </NavList>
        </Nav>
      </PageSidebarBody>
    </PageSidebar>
  );

  return (
    <div style={{ display: "grid", gap: 12 }} id="unified-surface-demo">
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
          id="us-border"
          label="Masthead border"
          isChecked={hasBorder}
          onChange={(_e, v) => setHasBorder(v)}
        />
        <Checkbox
          id="us-full-height"
          label="Full height (scroll inside)"
          isChecked={fullHeight}
          onChange={(_e, v) => setFullHeight(v)}
        />
        <label style={{ display: "grid", gap: 4, fontSize: 13 }}>
          Border colour
          <TextInput
            id="us-color"
            value={borderColor}
            onChange={(_e, v) => setBorderColor(v)}
            placeholder="#e6dcc8"
            isDisabled={!hasBorder}
          />
        </label>
        <label style={{ display: "grid", gap: 4, fontSize: 13 }}>
          Border thickness (px)
          <TextInput
            id="us-thickness"
            type="number"
            value={String(borderThickness)}
            onChange={(_e, v) => setBorderThickness(Number(v) || 0)}
            isDisabled={!hasBorder}
          />
        </label>
        <label style={{ display: "grid", gap: 4, fontSize: 13 }}>
          Shadow
          <FormSelect
            id="us-shadow"
            value={shadow}
            onChange={(_e, v) => setShadow(v as keyof typeof SHADOW_VALUES)}
            aria-label="Shadow"
          >
            <FormSelectOption value="none" label="None" />
            <FormSelectOption value="sm" label="Small" />
            <FormSelectOption value="md" label="Medium" />
            <FormSelectOption value="lg" label="Large" />
          </FormSelect>
        </label>
      </div>
      <DemoFrame height={520}>
        <Page
          masthead={masthead}
          sidebar={sidebar}
          mainContainerId="unified-surface-main"
          isContentFilled={fullHeight}
          isManagedSidebar
          defaultManagedSidebarIsOpen
        >
          <PageSection aria-labelledby="unified-h1">
            <Content>
              <h1 id="unified-h1">Dashboard</h1>
              <p>
                Sidebar and content share one background. The masthead keeps
                PF6&rsquo;s default tonality. PageSection keeps its default
                padding so content breathes — there&rsquo;s just no card /
                border / shadow around it.
              </p>
            </Content>
          </PageSection>
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
                        {String((i + 1) * 23)}
                      </div>
                    </CardBody>
                  </Card>
                </GalleryItem>
              ))}
            </Gallery>
          </PageSection>
          {/* Long-copy section. When `fullHeight` is on, this section
              becomes the fillable + scrollable one — PF6's grid layout
              computes its height from remaining vertical space, so any
              bottom chrome (footer / padding) is automatically subtracted.
              `aria-label` is required by PF when `hasOverflowScroll` is set. */}
          <PageSection
            aria-label="Long copy"
            isFilled={fullHeight}
            hasOverflowScroll={fullHeight}
          >
            <Content>
              <h2>Section detail</h2>
              <p>
                Use this layout when the shell should read as one continuous
                surface — common for editorial / docs-style apps where the
                sidebar is treated as a table of contents rather than a
                separate panel.
              </p>
              {/* Extra paragraphs so the "Full height" toggle has something
                  to scroll inside the demo's fixed-height frame. */}
              {fullHeight &&
                Array.from({ length: 8 }).map((_, i) => (
                  <p key={i}>
                    Paragraph {i + 1}. Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit. Sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                    exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat. Duis aute irure dolor in reprehenderit in
                    voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                  </p>
                ))}
            </Content>
          </PageSection>
        </Page>
      </DemoFrame>
    </div>
  );
}

export const Overview: StoryObj = {
  render: () => {
    // Basic + Push demos use PF6's `isManagedSidebar` — Page owns the
    // open state, picks push vs overlay automatically based on its own
    // width (PF6 threshold = xl / 1200px), and wires main-click-to-close
    // on mobile via its built-in mousedown listener. This matches PF6's
    // official Page sample at https://www.patternfly.org/components/page.
    //
    // Inside the DemoFrame the Page element is narrower than xl while
    // the viewport is wider, so PF6's CSS paints push but its JS treats
    // it as mobile and would close the sidebar on outside click — we
    // block PF6's main-click handler in push mode via the
    // `useBlockPushClickClose` capture-phase listener so the sidebar
    // only collapses via the hamburger when visually pinned.
    useBlockPushClickClose({
      pageContainerId: "ds-page-basic-demo",
      sidebarId: "ds-page-sidebar",
    });
    useBlockPushClickClose({
      pageContainerId: "ds-page-push-demo",
      sidebarId: "ds-page-push-sidebar",
    });
    // Sidebar-behaviour demo (push).
    // No useSidenavOffClick here on purpose: in push mode the sidebar is
    // pinned beside content (desktop pattern), so clicking the main area
    // should NOT collapse it — only the hamburger toggle does. Off-click
    // close is reserved for overlay-mode shells, where the sidebar
    // floats on top of content and tapping the scrim is the canonical
    // dismiss gesture.
    const masthead = (
      <Masthead display={{ default: "inline" }}>
        <MastheadMain>
          <MastheadToggle>
            {/* With isManagedSidebar on Page, PageToggleButton reads
                state from PageContext — no isSidebarOpen / onSidebarToggle
                props needed. */}
            <PageToggleButton
              isHamburgerButton
              aria-label="Global navigation"
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
      <PageSidebar id="ds-page-sidebar">
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
      <Masthead display={{ default: "inline" }}>
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
        <Section
          title="Basic — masthead + sidebar + content"
          description="PageToggleButton + isSidebarOpen wires the hamburger toggle. PageSection slots stack vertically; isFilled stretches one to fill remaining height."
        >
          <DocCard>
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <div id="ds-page-basic-demo">
              <DemoFrame height={360}>
                {/* isContentFilled puts Page into grid layout; the last
                    PageSection with isFilled stretches to the remaining
                    vertical space so the body fills the frame instead of
                    bunching at the top. */}
                <Page
                  masthead={masthead}
                  sidebar={sidebar}
                  isContentFilled
                  isManagedSidebar
                  defaultManagedSidebarIsOpen
                >
                  <PageSection aria-labelledby="ds-page-h1">
                    <Title headingLevel="h1" id="ds-page-h1">
                      Dashboard
                    </Title>
                  </PageSection>
                  <PageSection variant="secondary" aria-label="Stats" isFilled>
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
                    <Masthead display={{ default: "inline" }}>
                      <MastheadMain>
                        <MastheadToggle>
                          <PageToggleButton
                            isHamburgerButton
                            aria-label="Global navigation"
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
                    <PageSidebar id="ds-page-push-sidebar">
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
                  isContentFilled
                  isManagedSidebar
                  defaultManagedSidebarIsOpen
                >
                  <PageSection aria-label="Push main" isFilled>
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
                  isContentFilled
                >
                  <PageSection aria-labelledby="slots-h1" isFilled>
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
          title="Unified surface — flat sidebar + content"
          description="Sidebar and content share one background. The masthead stays at PF6's default tonality, lifted off the flat panel below by a 1px bottom border + soft shadow. Padding is preserved on PageSections, but there's no card / border / shadow / divider around the content area. Useful for editorial or docs-style apps where the sidebar reads as a TOC, not a separate panel."
        >
          <DocCard>
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <UnifiedSurfaceDemo />
              <CodeBlock>{`// Scope the override to one Page so the rest of the doc / app
// keeps PF6's default theming. Land these as theme tokens once
// you're happy with the look.
.app-shell-unified .pf-v6-c-page__sidebar,
.app-shell-unified .pf-v6-c-page__main,
.app-shell-unified .pf-v6-c-page__main-container {
  background: var(--gp-color-bg-primary-default);
}
.app-shell-unified .pf-v6-c-page__sidebar,
.app-shell-unified .pf-v6-c-page__main-container {
  border: none;
  box-shadow: none;
}
/* Lift the masthead off the flat panel below. */
.app-shell-unified .pf-v6-c-masthead {
  border-bottom: 1px solid var(--gp-color-border);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
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

// ──────────────────────────────────────────────────────────────────
// Story: SidenavDrawer — configurable overlay/push + overlay styles
// ──────────────────────────────────────────────────────────────────

// Clickable glass scrim for the full-height overlay style. Sits at z 1050 —
// just under the sidebar (z 1100, set by sidenavDrawerCss) and over the page
// content; tapping it (clicking off the sidenav) closes the drawer. The
// .gp-sidenav-scrim class lets
// sidenavDrawerCss hide it in push mode. Frosted via a translucent fill +
// backdrop blur so it reads as glass.
function FullscreenScrim({ onClose }: { onClose: () => void }) {
  return (
    <button
      type="button"
      className="gp-sidenav-scrim"
      aria-label="Close navigation"
      onClick={onClose}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 1050,
        border: 0,
        padding: 0,
        cursor: "pointer",
        background:
          "color-mix(in srgb, var(--pf-t--global--background--color--primary--default) 30%, transparent)",
        backdropFilter: "blur(8px) saturate(140%)",
        WebkitBackdropFilter: "blur(8px) saturate(140%)",
      }}
    />
  );
}

// Dedicated full-height-overlay showcase. Push (≥ breakpoint) is identical to
// the configurable demo above; this isolates the full-height OVERLAY: it spans
// the whole viewport (covering the masthead), so it needs an in-drawer close
// (×) button and dismisses on off-click via the clickable .gp-sidenav-scrim.
// Forced to always-overlay so the full-height behaviour is visible without
// resizing.
function FullHeightSidenavDemo() {
  const [open, setOpen] = useState(false);
  const css = sidenavDrawerCss("ds-page-fullheight-demo", {
    overlayBelow: "always",
    fullHeight: true,
  });
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div id="ds-page-fullheight-demo">
        <DemoFrame height={360}>
          <div style={{ position: "relative", height: "100%" }}>
            <Page
              masthead={
                <Masthead display={{ default: "inline" }}>
                  <MastheadMain>
                    <MastheadToggle>
                      <PageToggleButton
                        isHamburgerButton
                        aria-label="Global navigation"
                        isSidebarOpen={open}
                        onSidebarToggle={() => setOpen((v) => !v)}
                        id="ds-page-fullheight-toggle"
                      />
                    </MastheadToggle>
                    <MastheadBrand>
                      <MastheadLogo component="a" href="#">
                        {brandLogo}
                      </MastheadLogo>
                    </MastheadBrand>
                  </MastheadMain>
                </Masthead>
              }
              sidebar={
                <PageSidebar
                  isSidebarOpen={open}
                  id="ds-page-fullheight-sidebar"
                >
                  <PageSidebarBody>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        padding: "var(--pf-t--global--spacer--sm)",
                      }}
                    >
                      <Button
                        variant="plain"
                        aria-label="Close navigation"
                        icon={<TimesIcon />}
                        onClick={() => setOpen(false)}
                      />
                    </div>
                    <Nav aria-label="Full-height sidenav demo">
                      <NavList>
                        <NavItem itemId={0} isActive>Dashboard</NavItem>
                        <NavItem itemId={1}>Workflows</NavItem>
                        <NavItem itemId={2}>Reports</NavItem>
                        <NavItem itemId={3}>Settings</NavItem>
                      </NavList>
                    </Nav>
                  </PageSidebarBody>
                </PageSidebar>
              }
            >
              <PageSection aria-label="Full-height sidenav body">
                <span style={{ color: "var(--gp-color-text-subtle)" }}>
                  Page body — click the hamburger to open the full-height nav.
                  Close it with the × button or by clicking off it (the scrim).
                </span>
              </PageSection>
            </Page>
            {open && <FullscreenScrim onClose={() => setOpen(false)} />}
          </div>
        </DemoFrame>
      </div>
    </>
  );
}

function SidenavDrawerStory({
  overlayBreakpoint = "md",
  overlayStyle = "inset",
}: {
  // When the sidebar switches from push (pinned beside content) to overlay
  // (floats over content). Below this container width → overlay; at/above →
  // push. "always" / "never" force one mode.
  overlayBreakpoint?: SidenavOverlayBreakpoint;
  // Overlay drawer styling: "inset" floats below the header row (dismiss via
  // the hamburger); "fullscreen" takes the full viewport height (scrolls a
  // long nav) with a close button + glass scrim.
  overlayStyle?: "inset" | "fullscreen";
}) {
  const [open, setOpen] = useState(true);
  const isFullscreen = overlayStyle === "fullscreen";
  const css = sidenavDrawerCss("ds-page-sidenav-demo", {
    overlayBelow: overlayBreakpoint,
    fullHeight: isFullscreen,
  });
  return (
    <FoundationPage
      title="Page — sidenav drawer"
      intro={
        <>
          How the <code>&lt;PageSidebar&gt;</code> behaves as the masthead
          hamburger toggles it. <strong>Push</strong> pins the sidebar beside
          the content (the content reflows); <strong>overlay</strong> floats
          it over the content. Use the controls to set the breakpoint where it
          switches and the overlay style. In glass mode the nav sits in a
          frosted glass box; pushed, that box floats as a rounded, shadowed
          card inset from the edges, while the overlay drawer frosts as it
          slides in.
        </>
      }
    >
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <Section
        title="Push / overlay + overlay style"
        description="“Overlay below breakpoint” sets where the sidebar flips from push to overlay (or 'always' / 'never'). “Overlay style” picks inset (floats below the header, dismiss via the hamburger) or fullscreen (full viewport height, scrolls a long nav, close button + tap-scrim-to-dismiss glass overlay)."
      >
        <DocCard>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <div id="ds-page-sidenav-demo">
              <DemoFrame height={360}>
                <div style={{ position: "relative", height: "100%" }}>
                  <Page
                    masthead={
                      <Masthead display={{ default: "inline" }}>
                        <MastheadMain>
                          <MastheadToggle>
                            <PageToggleButton
                              isHamburgerButton
                              aria-label="Global navigation"
                              isSidebarOpen={open}
                              onSidebarToggle={() => setOpen((v) => !v)}
                              id="ds-page-sidenav-toggle"
                            />
                          </MastheadToggle>
                          <MastheadBrand>
                            <MastheadLogo component="a" href="#">
                              {brandLogo}
                            </MastheadLogo>
                          </MastheadBrand>
                        </MastheadMain>
                      </Masthead>
                    }
                    sidebar={
                      <PageSidebar
                        isSidebarOpen={open}
                        id="ds-page-sidenav-sidebar"
                      >
                        <PageSidebarBody>
                          {isFullscreen && (
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "flex-end",
                                padding: "var(--pf-t--global--spacer--sm)",
                              }}
                            >
                              <Button
                                variant="plain"
                                aria-label="Close navigation"
                                icon={<TimesIcon />}
                                onClick={() => setOpen(false)}
                              />
                            </div>
                          )}
                          <Nav aria-label="Sidenav drawer demo">
                            <NavList>
                              <NavItem itemId={0} isActive>Dashboard</NavItem>
                              <NavItem itemId={1}>Workflows</NavItem>
                              <NavItem itemId={2}>Reports</NavItem>
                              <NavItem itemId={3}>Settings</NavItem>
                            </NavList>
                          </Nav>
                        </PageSidebarBody>
                      </PageSidebar>
                    }
                  >
                    <PageSection aria-label="Sidenav drawer body">
                      <span style={{ color: "var(--gp-color-text-subtle)" }}>
                        Page body — toggle the hamburger; resize the frame (or
                        the “Overlay below breakpoint” control) to switch
                        push ↔ overlay.
                      </span>
                    </PageSection>
                  </Page>
                  {isFullscreen && open && (
                    <FullscreenScrim onClose={() => setOpen(false)} />
                  )}
                </div>
              </DemoFrame>
            </div>
            <CodeBlock>{`// sidenavDrawerCss (lib demo helper) drives push/overlay off the demo
// container's width via a @container query, and the overlay style:
<style>{sidenavDrawerCss("page-shell", {
  overlayBelow: "md",       // push at/above md, overlay below
  fullHeight: false,        // true → full-height overlay + glass scrim
})}</style>

<div id="page-shell">
  <Page
    masthead={<Masthead>{/* PageToggleButton + brand */}</Masthead>}
    sidebar={<PageSidebar isSidebarOpen={open}>{/* Nav */}</PageSidebar>}
  >
    <PageSection>{/* content */}</PageSection>
  </Page>
</div>`}</CodeBlock>
          </div>
        </DocCard>
      </Section>

      <Section
        title="Full-height overlay"
        description="Same drawer, full-height overlay. The push sidebar (≥ breakpoint) is unchanged — it still pins beside the content. The overlay variant, though, takes the whole viewport height (covering the masthead too), so it carries its own close (×) button and dismisses when you click off it (tap the glass scrim). Ideal for mobile / narrow layouts where the nav wants the full screen. This example is forced to always-overlay so you can see it without resizing."
      >
        <DocCard>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <FullHeightSidenavDemo />
            <CodeBlock>{`<style>{sidenavDrawerCss("page-shell", {
  overlayBelow: "always",   // (or a breakpoint — the push side above it is unchanged)
  fullHeight: true,         // full-viewport overlay + glass scrim
})}</style>

// A full-height overlay covers the masthead, so the hamburger is hidden —
// give the drawer its own close button, and a clickable scrim for off-click:
<PageSidebar isSidebarOpen={open}>
  <PageSidebarBody>
    <Button variant="plain" aria-label="Close navigation"
            icon={<TimesIcon />} onClick={() => setOpen(false)} />
    <Nav>{/* ... */}</Nav>
  </PageSidebarBody>
</PageSidebar>
{open && (
  <button className="gp-sidenav-scrim" aria-label="Close navigation"
          onClick={() => setOpen(false)} />
)}`}</CodeBlock>
          </div>
        </DocCard>
      </Section>
    </FoundationPage>
  );
}

export const SidenavDrawer: StoryObj = {
  parameters: {
    a11y: {
      config: {
        rules: [
          // The full-height overlay scrim overlaps page content, so axe
          // can't resolve some background colours — tooling limitation,
          // not a real contrast failure (filtered in preview.tsx).
          { id: "scrollable-region-focusable", enabled: false },
          // This story now mounts two Pages (the configurable demo + the
          // full-height showcase), so the duplicate <main>/<header>/<nav>
          // landmarks are doc-only — real apps render one Page per route.
          { id: "landmark-unique", enabled: false },
          { id: "landmark-no-duplicate-main", enabled: false },
          { id: "landmark-no-duplicate-banner", enabled: false },
        ],
      },
    },
  },
  argTypes: {
    overlayBreakpoint: {
      name: "Overlay below breakpoint",
      description:
        "When the sidebar switches from push (pinned beside content) to overlay (floats over content). Below this width it's an overlay; at/above it pushes. 'always' = always overlay, 'never' = always push.",
      control: "select",
      options: ["sm", "md", "lg", "xl", "2xl", "always", "never"],
      table: { defaultValue: { summary: "md" } },
    },
    overlayStyle: {
      name: "Overlay style",
      description:
        "Overlay drawer styling. 'inset' floats below the header row (dismiss via the hamburger). 'fullscreen' takes the full viewport height, scrolls a long nav, and shows a close button + glass scrim.",
      control: "inline-radio",
      options: ["inset", "fullscreen"],
      table: { defaultValue: { summary: "inset" } },
    },
  },
  args: {
    overlayBreakpoint: "md",
    overlayStyle: "inset",
  },
  render: (args: {
    overlayBreakpoint?: SidenavOverlayBreakpoint;
    overlayStyle?: "inset" | "fullscreen";
  }) => (
    <SidenavDrawerStory
      overlayBreakpoint={args.overlayBreakpoint ?? "md"}
      overlayStyle={args.overlayStyle ?? "inset"}
    />
  ),
};
