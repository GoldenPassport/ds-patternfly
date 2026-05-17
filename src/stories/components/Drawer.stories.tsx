import { Fragment, useRef, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Brand,
  Button,
  Drawer,
  DrawerActions,
  DrawerCloseButton,
  DrawerContent,
  DrawerContentBody,
  DrawerHead,
  DrawerPanelBody,
  DrawerPanelContent,
  DrawerPanelDescription,
  Masthead,
  MastheadBrand,
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
  Title,
} from "@patternfly/react-core";
import { FoundationPage, Section, Card, CodeBlock } from "../_storyKit.js";
import {
  DemoFrame,
  PropsTable,
  sidenavDrawerCss,
  useSidenavOffClick,
} from "../_demoKit.js";

const meta: Meta = {
  title: "Components/Drawer",
  parameters: { layout: "padded" },
};
export default meta;

// Acme SVG logo pair — same as Brand / Masthead / Page / Shell stories.
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
const acmeBrand = (
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


const lorem =
  "Detail content goes here. The drawer pushes the main panel instead of overlaying it — main content stays interactive while the drawer is open.";

export const Overview: StoryObj = {
  render: () => {
    // Basic right-end drawer with focus management
    const [open, setOpen] = useState(false);
    const focusRef = useRef<HTMLSpanElement>(null);
    const onExpand = () => focusRef.current?.focus();

    // Bottom drawer
    const [bottomOpen, setBottomOpen] = useState(false);

    // Inline drawer
    const [inlineOpen, setInlineOpen] = useState(false);
    const inlineRef = useRef<HTMLSpanElement>(null);

    // Resizable drawer
    const [resizeOpen, setResizeOpen] = useState(false);
    const resizeRef = useRef<HTMLSpanElement>(null);

    // Sidenav drawer (hamburger-activated PageSidebar)
    const [sidenavOpen, setSidenavOpen] = useState(true);
    useSidenavOffClick({
      open: sidenavOpen,
      close: () => setSidenavOpen(false),
      containerId: "sidenav-drawer-demo",
      sidebarId: "sidenav-drawer-sidebar",
      toggleId: "sidenav-drawer-toggle",
    });

    // Focus-trap drawer
    const [trapOpen, setTrapOpen] = useState(false);
    const onEscape = (e: React.KeyboardEvent) => {
      if (e.key === "Escape") setTrapOpen(false);
    };

    const panel = (
      <DrawerPanelContent>
        <DrawerHead>
          <span tabIndex={open ? 0 : -1} ref={focusRef}>
            <Title headingLevel="h2" size="lg">Task details</Title>
          </span>
          <DrawerActions>
            <DrawerCloseButton onClick={() => setOpen(false)} />
          </DrawerActions>
        </DrawerHead>
        <DrawerPanelDescription>
          Detail of the selected task — push-pattern panel.
        </DrawerPanelDescription>
        <DrawerPanelBody>{lorem}</DrawerPanelBody>
      </DrawerPanelContent>
    );

    const bottomPanel = (
      <DrawerPanelContent>
        <DrawerHead>
          <Title headingLevel="h2" size="lg">Activity</Title>
          <DrawerActions>
            <DrawerCloseButton onClick={() => setBottomOpen(false)} />
          </DrawerActions>
        </DrawerHead>
        <DrawerPanelBody>
          Bottom-anchored drawers work well for activity feeds, logs, or
          consoles.
        </DrawerPanelBody>
      </DrawerPanelContent>
    );

    const inlinePanel = (
      <DrawerPanelContent>
        <DrawerHead>
          <span tabIndex={inlineOpen ? 0 : -1} ref={inlineRef}>
            Inline panel
          </span>
          <DrawerActions>
            <DrawerCloseButton onClick={() => setInlineOpen(false)} />
          </DrawerActions>
        </DrawerHead>
        <DrawerPanelBody>
          Inline drawers participate in document flow — they push the main
          area sideways without absolute positioning.
        </DrawerPanelBody>
      </DrawerPanelContent>
    );

    const resizePanel = (
      <DrawerPanelContent
        isResizable
        defaultSize="320px"
        minSize="200px"
        id="ds-resize-panel"
      >
        <DrawerHead>
          <span tabIndex={resizeOpen ? 0 : -1} ref={resizeRef}>
            Resizable panel
          </span>
          <DrawerActions>
            <DrawerCloseButton onClick={() => setResizeOpen(false)} />
          </DrawerActions>
        </DrawerHead>
        <DrawerPanelBody>
          Drag the edge to resize. <code>defaultSize</code> /{" "}
          <code>minSize</code> bound the range.
        </DrawerPanelBody>
      </DrawerPanelContent>
    );

    const trapPanel = (
      <DrawerPanelContent focusTrap={{ enabled: true }}>
        <DrawerHead>
          <Title headingLevel="h2" size="lg">Focus-trapped panel</Title>
          <DrawerActions>
            <DrawerCloseButton onClick={() => setTrapOpen(false)} />
          </DrawerActions>
        </DrawerHead>
        <DrawerPanelBody>
          Tab is trapped inside the panel — useful when the drawer holds a
          form. Press Escape to close.
        </DrawerPanelBody>
      </DrawerPanelContent>
    );

    return (
      <FoundationPage
        title="Drawer"
        intro={
          <>
            A side panel that slides in to reveal contextual content — detail
            views, edit forms, activity logs. Pushes the main content rather
            than overlaying it (use <code>Modal</code> for true overlays).
            Detail-on-list patterns and primary-detail layouts use this.
          </>
        }
      >
        <Section title="Basic (right-anchored)">
          <Card>
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <DemoFrame height={260}>
                <Fragment>
                  <Button
                    aria-expanded={open}
                    onClick={() => setOpen((v) => !v)}
                    ouiaId="ToggleBasicDrawer"
                  >
                    {open ? "Close drawer" : "Open drawer"}
                  </Button>
                  <Drawer isExpanded={open} onExpand={onExpand}>
                    <DrawerContent panelContent={panel}>
                      <DrawerContentBody>
                        <div style={{ padding: 24, color: "var(--gp-color-text-subtle)" }}>
                          Main content stays interactive while the drawer is
                          open.
                        </div>
                      </DrawerContentBody>
                    </DrawerContent>
                  </Drawer>
                </Fragment>
              </DemoFrame>
              <CodeBlock>{`const drawerRef = useRef<HTMLSpanElement>(null);
const onExpand = () => drawerRef.current?.focus();

const panel = (
  <DrawerPanelContent>
    <DrawerHead>
      <span tabIndex={open ? 0 : -1} ref={drawerRef}>Task details</span>
      <DrawerActions>
        <DrawerCloseButton onClick={close} />
      </DrawerActions>
    </DrawerHead>
    <DrawerPanelDescription>Detail of the selected task</DrawerPanelDescription>
    <DrawerPanelBody>...</DrawerPanelBody>
  </DrawerPanelContent>
);

<Button aria-expanded={open} onClick={toggle}>Toggle drawer</Button>
<Drawer isExpanded={open} onExpand={onExpand}>
  <DrawerContent panelContent={panel}>
    <DrawerContentBody>{/* main content */}</DrawerContentBody>
  </DrawerContent>
</Drawer>`}</CodeBlock>
            </div>
          </Card>
        </Section>

        <Section
          title="Inline"
          description="Inline drawers participate in document flow rather than overlaying — good for in-page side panels that can sit alongside other layout."
        >
          <Card>
            <div style={{ padding: 24 }}>
              <DemoFrame height={260}>
                <Fragment>
                  <Button
                    aria-expanded={inlineOpen}
                    onClick={() => setInlineOpen((v) => !v)}
                    ouiaId="ToggleInlineDrawer"
                  >
                    {inlineOpen ? "Close inline" : "Open inline"}
                  </Button>
                  <Drawer
                    isExpanded={inlineOpen}
                    isInline
                    onExpand={() => inlineRef.current?.focus()}
                  >
                    <DrawerContent panelContent={inlinePanel}>
                      <DrawerContentBody>
                        <div style={{ padding: 24, color: "var(--gp-color-text-subtle)" }}>
                          Main content shifts as the inline panel opens.
                        </div>
                      </DrawerContentBody>
                    </DrawerContent>
                  </Drawer>
                </Fragment>
              </DemoFrame>
            </div>
          </Card>
        </Section>

        <Section
          title="Resizable"
          description="DrawerPanelContent.isResizable adds a drag handle on the panel edge. Bound the range with defaultSize / minSize."
        >
          <Card>
            <div style={{ padding: 24 }}>
              <DemoFrame height={280}>
                <Fragment>
                  <Button
                    aria-expanded={resizeOpen}
                    onClick={() => setResizeOpen((v) => !v)}
                    ouiaId="ToggleResizableDrawer"
                  >
                    {resizeOpen ? "Close resizable" : "Open resizable"}
                  </Button>
                  <Drawer
                    isExpanded={resizeOpen}
                    onExpand={() => resizeRef.current?.focus()}
                  >
                    <DrawerContent panelContent={resizePanel}>
                      <DrawerContentBody>
                        <div style={{ padding: 24, color: "var(--gp-color-text-subtle)" }}>
                          Drag the panel&rsquo;s leading edge to resize.
                        </div>
                      </DrawerContentBody>
                    </DrawerContent>
                  </Drawer>
                </Fragment>
              </DemoFrame>
            </div>
          </Card>
        </Section>

        <Section
          title="With focus trap"
          description="Trap focus inside the panel when it contains a form. Wire onKeyDown on the Drawer to close on Escape."
        >
          <Card>
            <div style={{ padding: 24 }}>
              <DemoFrame height={260}>
                <Fragment>
                  <Button
                    aria-expanded={trapOpen}
                    onClick={() => setTrapOpen((v) => !v)}
                    ouiaId="ToggleFocusTrapDrawer"
                  >
                    {trapOpen ? "Close trapped" : "Open trapped"}
                  </Button>
                  <Drawer onKeyDown={onEscape} isExpanded={trapOpen}>
                    <DrawerContent panelContent={trapPanel}>
                      <DrawerContentBody>
                        <div style={{ padding: 24, color: "var(--gp-color-text-subtle)" }}>
                          Tab cycles inside the panel while open.
                        </div>
                      </DrawerContentBody>
                    </DrawerContent>
                  </Drawer>
                </Fragment>
              </DemoFrame>
            </div>
          </Card>
        </Section>

        <Section
          title="Sidenav drawer (hamburger toggle)"
          description="The hamburger-activated nav drawer is NOT built on Drawer — it's the PF6 PageSidebar + PageToggleButton combo (lives inside Page, not Drawer). Listed here because that's where users intuitively look for it. This demo also wires an off-click close: clicking anywhere outside the sidebar (or pressing the hamburger again) collapses the drawer. See Components/Page for the full Page-shell story."
        >
          <Card>
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              {/* Force push mode at DemoFrame widths so the toggle visibly
                  reflows the main column. PF6 only auto-switches to push
                  at viewport >= xl, but the DemoFrame is narrower. */}
              <style dangerouslySetInnerHTML={{ __html: sidenavDrawerCss("sidenav-drawer-demo") }} />
              <div id="sidenav-drawer-demo">
                <DemoFrame height={320}>
                  <Page
                    masthead={
                      <Masthead id="sidenav-drawer-masthead">
                        <MastheadMain>
                          <MastheadToggle>
                            <PageToggleButton
                              isHamburgerButton
                              aria-label="Global navigation"
                              isSidebarOpen={sidenavOpen}
                              onSidebarToggle={() => setSidenavOpen((v) => !v)}
                              id="sidenav-drawer-toggle"
                            />
                          </MastheadToggle>
                          <MastheadBrand>
                            <MastheadLogo component="a" href="#">
                              {acmeBrand}
                            </MastheadLogo>
                          </MastheadBrand>
                        </MastheadMain>
                      </Masthead>
                    }
                    sidebar={
                      <PageSidebar
                        isSidebarOpen={sidenavOpen}
                        id="sidenav-drawer-sidebar"
                      >
                        <PageSidebarBody>
                          <Nav aria-label="Sidenav drawer demo">
                            <NavList>
                              <NavItem itemId={0} isActive>Dashboard</NavItem>
                              <NavItem itemId={1}>Workflows</NavItem>
                              <NavItem itemId={2}>Tasks</NavItem>
                              <NavItem itemId={3}>Settings</NavItem>
                            </NavList>
                          </Nav>
                        </PageSidebarBody>
                      </PageSidebar>
                    }
                  >
                    <PageSection aria-label="Sidenav demo body">
                      <span style={{ color: "var(--gp-color-text-subtle)" }}>
                        Click the hamburger — the sidebar collapses to 0 and
                        the main column reclaims the freed width.
                      </span>
                    </PageSection>
                  </Page>
                </DemoFrame>
              </div>
              <CodeBlock>{`const [open, setOpen] = useState(true);

// Off-click close — listen for clicks outside the sidebar / toggle.
useEffect(() => {
  if (!open) return;
  const onDown = (e: MouseEvent) => {
    const t = e.target as Element;
    if (sidebarRef.current?.contains(t)) return;
    if (toggleRef.current?.contains(t)) return;
    setOpen(false);
  };
  document.addEventListener("mousedown", onDown, true);
  return () => document.removeEventListener("mousedown", onDown, true);
}, [open]);

<Page
  masthead={
    <Masthead>
      <MastheadMain>
        <MastheadToggle>
          <PageToggleButton
            isHamburgerButton
            aria-label="Global navigation"
            isSidebarOpen={open}
            onSidebarToggle={() => setOpen(v => !v)}
          />
        </MastheadToggle>
        <MastheadBrand>{/* logo */}</MastheadBrand>
      </MastheadMain>
    </Masthead>
  }
  sidebar={
    <PageSidebar isSidebarOpen={open}>
      <PageSidebarBody>
        <Nav aria-label="Primary">{/* nav items */}</Nav>
      </PageSidebarBody>
    </PageSidebar>
  }
>
  <PageSection>{/* page content */}</PageSection>
</Page>`}</CodeBlock>
            </div>
          </Card>
        </Section>

        <Section
          title="Bottom-anchored"
          description="Useful for activity feeds, build logs, console views — anything horizontally wide and shallow."
        >
          <Card>
            <div style={{ padding: 24 }}>
              <DemoFrame height={300}>
                <Fragment>
                  <Button
                    aria-expanded={bottomOpen}
                    onClick={() => setBottomOpen((v) => !v)}
                    ouiaId="ToggleBottomDrawer"
                  >
                    {bottomOpen ? "Hide activity" : "Show activity"}
                  </Button>
                  <Drawer isExpanded={bottomOpen} position="bottom">
                    <DrawerContent panelContent={bottomPanel}>
                      <DrawerContentBody>
                        <div style={{ padding: 24 }} />
                      </DrawerContentBody>
                    </DrawerContent>
                  </Drawer>
                </Fragment>
              </DemoFrame>
            </div>
          </Card>
        </Section>

        <Section title="Composition">
          <Card>
            <div style={{ padding: 24 }}>
              <PropsTable
                rows={[
                  { name: "Drawer", type: "container", description: "Outer wrapper. Owns expanded / position / inline behaviour. Pass onKeyDown to handle Escape when using focus trap." },
                  { name: "DrawerContent", type: "child", description: "The main + panel layout. Pass the panel via panelContent." },
                  { name: "DrawerContentBody", type: "child", description: "The main content area. Stays interactive when the drawer opens." },
                  { name: "DrawerPanelContent", type: "child", description: "The slide-in panel. isResizable + defaultSize + minSize enable drag-to-resize. focusTrap={{ enabled: true }} traps focus." },
                  { name: "DrawerHead", type: "child", description: "Panel header — typically a focus target span + DrawerActions cluster." },
                  { name: "DrawerPanelDescription", type: "child", description: "Optional secondary text under the head — sits above the body." },
                  { name: "DrawerActions", type: "child", description: "Trailing-edge action slot inside DrawerHead. Holds DrawerCloseButton." },
                  { name: "DrawerCloseButton", type: "child", description: "The X button that closes the panel." },
                  { name: "DrawerPanelBody", type: "child", description: "Scrolling body of the panel." },
                ]}
              />
            </div>
          </Card>
        </Section>

        <Section title="Most-used Drawer props">
          <Card>
            <div style={{ padding: 24 }}>
              <PropsTable
                rows={[
                  { name: "isExpanded", type: "boolean", description: "Open/closed state. Controlled." },
                  { name: "position", type: '"start" | "end" | "bottom"', description: "Which edge the panel slides from. Default 'end' (right in LTR)." },
                  { name: "isInline", type: "boolean", description: "Render inline within layout flow rather than absolutely positioned. Use for in-page side panels." },
                  { name: "isStatic", type: "boolean", description: "Removes the slide animation — panel snaps open/closed." },
                  { name: "onExpand", type: "() => void", description: "Fired after expansion — wire to focus a span inside DrawerHead so screen-reader/keyboard users land in the panel." },
                  { name: "onKeyDown", type: "(event) => void", description: "Required when using focus trap — handle Escape to close, since trapped focus prevents Esc bubbling to the page." },
                ]}
              />
            </div>
          </Card>
        </Section>

        <Section title="Drawer vs Modal vs Sidebar">
          <Card>
            <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
              <li><strong>Drawer</strong> — pushes content, doesn&rsquo;t block. Main area stays interactive. Great for detail views beside a list.</li>
              <li><strong>Modal</strong> — overlays content, blocks interaction. For confirmations, focused tasks, errors that demand attention.</li>
              <li><strong>Sidebar</strong> — always-visible two-column layout. For filter rails, TOCs, settings menus that don&rsquo;t need to be dismissed.</li>
            </ul>
          </Card>
        </Section>

        <Section title="Accessibility">
          <Card>
            <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
              <li><strong>Focus the panel head on open.</strong> Wire <code>onExpand</code> to focus a span with <code>tabIndex</code> bound to <code>isExpanded</code> — that&rsquo;s the canonical PF pattern.</li>
              <li><strong>Set <code>aria-expanded</code> on the trigger.</strong> Screen readers announce the toggle state.</li>
              <li><strong>Escape closes.</strong> Without focus trap, Esc bubbles naturally; with focus trap, wire <code>onKeyDown</code> on Drawer to handle it.</li>
              <li><strong>Use focus trap when the panel is form-heavy.</strong> Otherwise leave it off so users can Tab back to the page.</li>
            </ul>
          </Card>
        </Section>
      </FoundationPage>
    );
  },
};
