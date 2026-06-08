import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownList,
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
  OverflowMenu,
  OverflowMenuContent,
  OverflowMenuControl,
  OverflowMenuGroup,
  OverflowMenuItem,
  Page,
  PageSection,
  PageSidebar,
  PageSidebarBody,
  PageToggleButton,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
} from "@patternfly/react-core";
import { BellIcon, CogIcon, EllipsisVIcon } from "@patternfly/react-icons";
import { FoundationPage, Section, Card, CodeBlock } from "../_storyKit.js";
import {
  DemoFrame,
  PropsTable,
  sidenavDrawerCss,
  useBlockPushClickClose,
} from "../_demoKit.js";
import { AcmeLogo } from "../../components/AcmeLogo.js";

const meta: Meta = {
  title: "Components/Masthead",
  parameters: {
    layout: "padded",
    a11y: {
      // The Basic + Display-variants demos each mount a full Page (so the
      // masthead toggle drives a real sidebar) — two Pages on one doc
      // produce duplicate <main>/<header> landmarks. In real apps you only
      // ever render one Page per route, so these are doc-only false
      // positives.
      config: {
        rules: [
          { id: "landmark-no-duplicate-main", enabled: false },
          { id: "landmark-no-duplicate-banner", enabled: false },
          { id: "landmark-unique", enabled: false },
        ],
      },
    },
  },
};
export default meta;

// Inline-SVG avatar (Acme brand blue) so the masthead profile menu is
// asset-free. Initials centred via dominant-baseline.
const AVATAR_SRC =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'>` +
      `<circle cx='20' cy='20' r='20' fill='#0066cc'/>` +
      `<text x='20' y='20' text-anchor='middle' dominant-baseline='central' ` +
      `font-family='-apple-system,Segoe UI,sans-serif' font-size='15' ` +
      `font-weight='600' fill='white'>AF</text></svg>`,
  );

// Tiny sidebar nav so the masthead toggle has something to drive. The
// sidebar/sidenav behaviour itself (push vs overlay, breakpoints,
// full-height drawers, glass) lives in Components/Page — these demos keep
// the focus on the masthead (header) and just use a plain managed sidebar.
function DemoSidebarNav({ label }: { label: string }) {
  return (
    <Nav aria-label={label}>
      <NavList>
        <NavItem itemId={0} isActive>Dashboard</NavItem>
        <NavItem itemId={1}>Workflows</NavItem>
        <NavItem itemId={2}>Settings</NavItem>
      </NavList>
    </Nav>
  );
}

// Two header-surface treatments for a "unified surface" shell — the flat
// sidebar + content layout documented in Components/Page → "Unified surface".
// The sidebar, content and page all share ONE flat background; the only
// question is how the header meets that body:
//   • "flat"   — the masthead shares the same surface, no divider (seamless).
//   • "lifted" — the masthead floats above the flat body via a 1px bottom
//                border + soft shadow (the treatment used in the Page example),
//                so the header still reads as distinct chrome.
function UnifiedHeaderVariant({ variant }: { variant: "flat" | "lifted" }) {
  const lifted = variant === "lifted";
  const id = `unified-header-${variant}`;
  const css = `
    #${id} {
      background: var(--gp-color-bg-primary-default);
      border: 1px solid var(--gp-color-border-subtle);
      border-radius: 8px;
      overflow: hidden;
    }
    /* Sidebar + content + header all share the one flat surface. */
    #${id} .pf-v6-c-masthead {
      background: var(--gp-color-bg-primary-default);
      ${
        lifted
          ? `border-block-end: 1px solid var(--gp-color-border-subtle);
             box-shadow: 0 2px 6px rgb(0 0 0 / 0.12);`
          : `border-block-end: none; box-shadow: none;`
      }
    }
  `;
  return (
    <div style={{ display: "grid", gap: 8 }}>
      <span style={{ fontWeight: 600, color: "var(--gp-color-text-regular)" }}>
        {lifted ? "Lifted header" : "Flat header"}
      </span>
      <div id={id}>
        <style dangerouslySetInnerHTML={{ __html: css }} />
        <Masthead id={`${id}-masthead`} display={{ default: "inline" }}>
          <MastheadMain>
            <MastheadBrand>
              <MastheadLogo component="a" href="#">
                <AcmeLogo />
              </MastheadLogo>
            </MastheadBrand>
          </MastheadMain>
          <MastheadContent>
            <span style={{ color: "var(--gp-color-text-subtle)" }}>Actions</span>
          </MastheadContent>
        </Masthead>
        <div style={{ display: "flex", minHeight: 150 }}>
          <div style={{ width: 150, padding: 12 }}>
            <Nav aria-label={`${variant} unified-header demo nav`}>
              <NavList>
                <NavItem itemId={0} isActive>Dashboard</NavItem>
                <NavItem itemId={1}>Workflows</NavItem>
                <NavItem itemId={2}>Reports</NavItem>
              </NavList>
            </Nav>
          </div>
          <div
            style={{
              flex: 1,
              padding: 16,
              color: "var(--gp-color-text-subtle)",
            }}
          >
            Sidebar + content share one flat surface.
          </div>
        </div>
      </div>
    </div>
  );
}

function OverviewStory() {
  // Basic demo: the masthead utility icons live in an OverflowMenu that
  // collapses to this kebab dropdown below the breakpoint.
  const [isUtilityKebabOpen, setIsUtilityKebabOpen] = useState(false);
  // Basic demo: top-right user avatar + profile dropdown.
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Display-variants demo: controlled stacked-masthead sidebar (restored to
  // the committed form — uses sidenavDrawerCss for push/overlay).
  const [stackOpen, setStackOpen] = useState(true);

  // The masthead demos mount a managed Page so the hamburger toggles a real
  // sidebar. Inside the DemoFrame the Page is narrower than PF6's xl push
  // threshold while the viewport is wider, so PF6 paints push but would
  // close the sidebar on outside click — block that so it stays pinned and
  // only the hamburger collapses it (same approach as Components/Page).
  useBlockPushClickClose({
    pageContainerId: "basic-masthead-demo",
    sidebarId: "basic-masthead-sidebar",
  });

  return (
    <FoundationPage
      title="Masthead"
      intro={
        <>
          The top bar of an app. Three slots: a left brand region (logo +
          optional sidebar toggle), a centre/right region for global actions,
          search, user menu and notifications. Renders as{" "}
          <code>&lt;header&gt;</code> for proper landmark semantics. The
          sidebar it toggles — push vs overlay, breakpoints, full-height
          drawers, glass — is documented under{" "}
          <code>Components/Page</code>.
        </>
      }
    >
      {/* The Display variants demo (restored to its committed form) drives
          its own push/overlay sidebar CSS via sidenavDrawerCss. The glass
          rule gives the demo frames a branded page background so the
          frosted masthead has something to show through — a flat dark
          backdrop makes the (correctly translucent) frost read as opaque. */}
      <style
        dangerouslySetInnerHTML={{
          __html: [
            sidenavDrawerCss("stack-masthead-demo"),
            `.pf-v6-theme-glass #basic-masthead-demo .gp-doc-demoframe,
             .pf-v6-theme-glass #stack-masthead-demo .gp-doc-demoframe,
             .pf-v6-theme-glass #inset-masthead-demo .gp-doc-demoframe {
               background:
                 radial-gradient(140% 120% at 50% -10%,
                   color-mix(in srgb, var(--gp-color-brand-default) 50%, transparent),
                   transparent 62%),
                 var(--gp-color-bg-primary-default) !important;
             }`,
          ].join("\n"),
        }}
      />

      <Section
        title="Basic — toggle + brand + content"
        description="The three regions: MastheadToggle (the sidebar hamburger) + MastheadBrand on the left, and MastheadContent (a Toolbar) on the right holding the utility actions and a user-avatar profile dropdown. Mounted in a managed Page so the hamburger drives a real sidebar."
      >
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <ul
              style={{
                margin: 0,
                padding: "0 0 0 20px",
                color: "var(--gp-color-text-regular)",
                lineHeight: 1.7,
                fontSize: 14,
              }}
            >
              <li>
                <strong>Animated hamburger.</strong> At rest it&rsquo;s a
                plain hamburger. On <strong>hover</strong> (or keyboard
                focus) the bars morph into a directional arrow that{" "}
                <strong>faces the way the sidebar will move on click</strong>{" "}
                — left while the sidebar is open, right while it&rsquo;s
                closed — then returns to a hamburger on mouse-out. PF6&rsquo;s
                built-in <code>PageToggleButton</code> behaviour.
              </li>
              <li>
                <strong>Utility actions collapse.</strong> The notifications
                and settings icons sit in an <code>OverflowMenu</code> — shown
                inline on wider screens, collapsed into a 3-dot kebab below
                the <code>md</code> breakpoint.
              </li>
              <li>
                <strong>Sidebar behaviour lives in Page.</strong> The toggle
                drives a <code>&lt;PageSidebar&gt;</code>; how that sidebar
                pushes / overlays / frosts is shown in{" "}
                <code>Components/Page</code>.
              </li>
            </ul>
            <div id="basic-masthead-demo">
              <DemoFrame height={320}>
                <Page
                  isManagedSidebar
                  defaultManagedSidebarIsOpen
                  masthead={
                    <Masthead id="basic-masthead" display={{ default: "inline" }}>
                      <MastheadMain>
                        <MastheadToggle>
                          <PageToggleButton
                            isHamburgerButton
                            aria-label="Global navigation"
                            id="basic-masthead-toggle"
                          />
                        </MastheadToggle>
                        <MastheadBrand>
                          <MastheadLogo component="a" href="#">
                            <AcmeLogo />
                          </MastheadLogo>
                        </MastheadBrand>
                      </MastheadMain>
                      <MastheadContent>
                        <Toolbar isStatic id="basic-masthead-toolbar">
                          <ToolbarContent>
                            <ToolbarItem align={{ default: "alignEnd" }}>
                              {/* OverflowMenu shows the utility icons inline
                                  above md; below md they collapse into the
                                  3-dot kebab dropdown (OverflowMenuControl). */}
                              <OverflowMenu breakpoint="md">
                                <OverflowMenuContent>
                                  <OverflowMenuGroup groupType="icon">
                                    <OverflowMenuItem>
                                      <Button
                                        variant="plain"
                                        aria-label="Notifications"
                                        icon={<BellIcon />}
                                      />
                                    </OverflowMenuItem>
                                    <OverflowMenuItem>
                                      <Button
                                        variant="plain"
                                        aria-label="Settings"
                                        icon={<CogIcon />}
                                      />
                                    </OverflowMenuItem>
                                  </OverflowMenuGroup>
                                </OverflowMenuContent>
                                <OverflowMenuControl>
                                  <Dropdown
                                    isOpen={isUtilityKebabOpen}
                                    onSelect={() => setIsUtilityKebabOpen(false)}
                                    onOpenChange={(open: boolean) =>
                                      setIsUtilityKebabOpen(open)
                                    }
                                    popperProps={{ position: "right" }}
                                    toggle={(
                                      toggleRef: React.Ref<MenuToggleElement>,
                                    ) => (
                                      <MenuToggle
                                        ref={toggleRef}
                                        aria-label="More actions"
                                        variant="plain"
                                        isExpanded={isUtilityKebabOpen}
                                        onClick={() =>
                                          setIsUtilityKebabOpen((v) => !v)
                                        }
                                        icon={<EllipsisVIcon />}
                                      />
                                    )}
                                  >
                                    <DropdownList>
                                      <DropdownItem icon={<BellIcon />}>
                                        Notifications
                                      </DropdownItem>
                                      <DropdownItem icon={<CogIcon />}>
                                        Settings
                                      </DropdownItem>
                                    </DropdownList>
                                  </Dropdown>
                                </OverflowMenuControl>
                              </OverflowMenu>
                            </ToolbarItem>
                            {/* Top-right user avatar + profile dropdown. */}
                            <ToolbarItem>
                              <Dropdown
                                isOpen={isUserMenuOpen}
                                onSelect={() => setIsUserMenuOpen(false)}
                                onOpenChange={(open: boolean) =>
                                  setIsUserMenuOpen(open)
                                }
                                popperProps={{ position: "right" }}
                                toggle={(
                                  toggleRef: React.Ref<MenuToggleElement>,
                                ) => (
                                  <MenuToggle
                                    ref={toggleRef}
                                    aria-label="User menu"
                                    variant="plain"
                                    className="gp-user-menu-toggle"
                                    isExpanded={isUserMenuOpen}
                                    onClick={() =>
                                      setIsUserMenuOpen((v) => !v)
                                    }
                                    icon={
                                      // alt="" — the visible name beside it
                                      // is the accessible label; a duplicate
                                      // alt trips axe image-redundant-alt.
                                      <Avatar src={AVATAR_SRC} alt="" size="md" />
                                    }
                                  >
                                    {/* Name hides below the masthead mobile
                                        breakpoint → the toggle collapses to
                                        just the avatar. */}
                                    <span className="gp-masthead-username">
                                      Aliyah Frazier
                                    </span>
                                  </MenuToggle>
                                )}
                              >
                                <DropdownList>
                                  <DropdownItem>My profile</DropdownItem>
                                  <DropdownItem>User management</DropdownItem>
                                  <DropdownItem>Logout</DropdownItem>
                                </DropdownList>
                              </Dropdown>
                            </ToolbarItem>
                          </ToolbarContent>
                        </Toolbar>
                      </MastheadContent>
                    </Masthead>
                  }
                  sidebar={
                    <PageSidebar id="basic-masthead-sidebar">
                      <PageSidebarBody>
                        <DemoSidebarNav label="Basic masthead demo" />
                      </PageSidebarBody>
                    </PageSidebar>
                  }
                >
                  <PageSection aria-label="Basic masthead body">
                    <span style={{ color: "var(--gp-color-text-subtle)" }}>
                      Page body — the masthead hamburger toggles the sidebar.
                    </span>
                  </PageSection>
                </Page>
              </DemoFrame>
            </div>
            <CodeBlock>{`<Masthead display={{ default: "inline" }}>
  <MastheadMain>
    <MastheadToggle>
      <PageToggleButton isHamburgerButton aria-label="Global navigation" />
    </MastheadToggle>
    <MastheadBrand>
      <MastheadLogo component="a" href="/">{/* logo */}</MastheadLogo>
    </MastheadBrand>
  </MastheadMain>
  <MastheadContent>
    <Toolbar isStatic>
      <ToolbarContent>
        <ToolbarItem align={{ default: "alignEnd" }}>
          <OverflowMenu breakpoint="md">
            <OverflowMenuContent>
              <OverflowMenuGroup groupType="icon">
                <OverflowMenuItem>{/* Bell button */}</OverflowMenuItem>
                <OverflowMenuItem>{/* Cog button */}</OverflowMenuItem>
              </OverflowMenuGroup>
            </OverflowMenuContent>
            <OverflowMenuControl>{/* kebab Dropdown */}</OverflowMenuControl>
          </OverflowMenu>
        </ToolbarItem>
        <ToolbarItem>
          {/* user avatar + profile dropdown */}
          <Dropdown
            isOpen={open}
            onOpenChange={setOpen}
            toggle={(ref) => (
              <MenuToggle ref={ref} variant="plain" isExpanded={open}
                onClick={() => setOpen(v => !v)}
                icon={<Avatar src={avatarSrc} alt="" size="md" />}>
                {/* hides on mobile → avatar-only */}
                <span className="gp-masthead-username">Aliyah Frazier</span>
              </MenuToggle>
            )}
          >
            <DropdownList>
              <DropdownItem>My profile</DropdownItem>
              <DropdownItem>User management</DropdownItem>
              <DropdownItem>Logout</DropdownItem>
            </DropdownList>
          </Dropdown>
        </ToolbarItem>
      </ToolbarContent>
    </Toolbar>
  </MastheadContent>
</Masthead>`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section
        title="Display variants"
        description="display={{ default: 'inline' | 'stack' }} controls whether MastheadMain and MastheadContent sit side-by-side or stack vertically. This demo uses stack — toggle, brand, and content land on row 2 under the brand row. Hamburger still drives the sidenav drawer (same off-click close)."
      >
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <div id="stack-masthead-demo">
              <DemoFrame height={340}>
                <Page
                  masthead={
                    <Masthead id="stack-masthead" display={{ default: "stack" }}>
                      <MastheadMain>
                        <MastheadToggle>
                          <PageToggleButton
                            isHamburgerButton
                            aria-label="Global navigation"
                            isSidebarOpen={stackOpen}
                            onSidebarToggle={() => setStackOpen((v) => !v)}
                            id="stack-masthead-toggle"
                          />
                        </MastheadToggle>
                        <MastheadBrand>
                          <MastheadLogo component="a" href="#">
                            <AcmeLogo />
                          </MastheadLogo>
                        </MastheadBrand>
                      </MastheadMain>
                      <MastheadContent>
                        <span style={{ color: "var(--gp-color-text-subtle)" }}>
                          Stacked content row
                        </span>
                      </MastheadContent>
                    </Masthead>
                  }
                  sidebar={
                    <PageSidebar isSidebarOpen={stackOpen} id="stack-masthead-sidebar">
                      <PageSidebarBody>
                        <DemoSidebarNav label="Stack masthead demo" />
                      </PageSidebarBody>
                    </PageSidebar>
                  }
                >
                  <PageSection aria-label="Stack masthead body">
                    <span style={{ color: "var(--gp-color-text-subtle)" }}>
                      Stacked masthead — hamburger lives on row 2 with the
                      content; clicking it drives the sidenav drawer.
                    </span>
                  </PageSection>
                </Page>
              </DemoFrame>
            </div>
            <CodeBlock>{`<Masthead display={{ default: "stack", lg: "inline" }}>
  {/* stack on small viewports, inline on lg+ */}
</Masthead>`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section
        title="Header surface — flat vs lifted"
        description={
          <>
            When the sidebar and content share one flat background — the{" "}
            <strong>unified-surface</strong> shell shown in{" "}
            <a href="./?path=/docs/components-page--docs" target="_top">
              Components/Page &rarr; &ldquo;Unified surface — flat sidebar +
              content&rdquo;
            </a>{" "}
            — the header can meet that body two ways.{" "}
            <strong>Flat:</strong> the masthead shares the same surface with no
            divider, for a fully seamless shell. <strong>Lifted:</strong> the
            masthead floats above the flat body via a 1px bottom border + soft
            shadow (the treatment used in the Page example), so the header still
            reads as distinct chrome.
          </>
        }
      >
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 24 }}>
            <div
              style={{
                display: "grid",
                gap: 24,
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              }}
            >
              <UnifiedHeaderVariant variant="flat" />
              <UnifiedHeaderVariant variant="lifted" />
            </div>
            <CodeBlock label="Header surface treatment (scope to your shell root)">{`/* Unified surface: sidebar + content + page share one flat bg */
.app-shell .pf-v6-c-page__sidebar,
.app-shell .pf-v6-c-page__main,
.app-shell .pf-v6-c-page__main-container {
  background: var(--gp-color-bg-primary-default);
}

/* Flat header — seamless, no divider */
.app-shell .pf-v6-c-masthead {
  border-block-end: none;
  box-shadow: none;
}

/* Lifted header — float the masthead above the flat body (Page example) */
.app-shell .pf-v6-c-masthead {
  border-block-end: 1px solid var(--gp-color-border-subtle);
  box-shadow: 0 2px 6px rgb(0 0 0 / 0.12);
}`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section
        title="Inset"
        description="inset adds horizontal padding inside the masthead. Pair with Toolbar inset to keep alignment consistent across the header."
      >
        <Card>
          <div id="inset-masthead-demo" style={{ padding: 24 }}>
            <DemoFrame>
              <Masthead
                id="inset-masthead"
                display={{ default: "inline" }}
                inset={{ default: "insetSm" }}
              >
                <MastheadMain>
                  <MastheadBrand>
                    <MastheadLogo component="a" href="#">
                      <AcmeLogo />
                    </MastheadLogo>
                  </MastheadBrand>
                </MastheadMain>
                <MastheadContent>
                  <span style={{ color: "var(--gp-color-text-subtle)" }}>
                    inset=&quot;insetSm&quot;
                  </span>
                </MastheadContent>
              </Masthead>
            </DemoFrame>
          </div>
        </Card>
      </Section>

      <Section
        title="Custom logo component (router link)"
        description="Pass a render function to MastheadLogo.component when you want the logo to use your app's router instead of a plain anchor."
      >
        <Card>
          <div style={{ padding: 24 }}>
            <CodeBlock>{`import { Link } from "react-router-dom";
import { Brand } from "@patternfly/react-core";

<MastheadBrand>
  <MastheadLogo component={(props) => <Link {...props} to="/" />}>
    <Brand src="/logo.svg" alt="Acme" heights={{ default: "36px" }} />
  </MastheadLogo>
</MastheadBrand>`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section title="Composition">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "Masthead", type: "container", description: "Outer <header>. Owns the three-region layout. id is required." },
                { name: "MastheadMain", type: "child", description: "Left region. Holds MastheadToggle (sidebar toggle) + MastheadBrand." },
                { name: "MastheadToggle", type: "child", description: "Wrapper for the sidebar toggle button. Render PageToggleButton inside (when on Page) or Button isHamburger (standalone)." },
                { name: "MastheadBrand", type: "child", description: "Holds the logo. Wrap MastheadLogo as the actual brand element." },
                { name: "MastheadLogo", type: "child", description: "The logo itself. component='a' for plain anchor, or pass a render function for router Links. children can be text, <img>, or <Brand>." },
                { name: "MastheadContent", type: "child", description: "Right region. Typically a Toolbar with actions / search / user menu." },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section title="Most-used Masthead props">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "id", type: "string", description: "Required — used as the landmark id for keyboard skip targets and for the toolbar's reference." },
                { name: "display", type: "BreakpointObject<'inline' | 'stack'>", description: "Per-breakpoint layout — inline puts MastheadMain and MastheadContent side-by-side; stack stacks them vertically." },
                { name: "inset", type: "BreakpointObject<'insetNone' | 'insetXs' | 'insetSm' | 'insetMd' | 'insetLg' | 'insetXl' | 'inset2xl' | 'inset3xl'>", description: "Per-breakpoint horizontal padding inside the masthead." },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section title="Accessibility">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Brand needs an accessible name.</strong> If MastheadLogo wraps an &lt;img&gt;, give it a meaningful alt. If it wraps text, that&rsquo;s already the name.</li>
            <li><strong>Wrap the logo in a link to home</strong> — pass <code>component=&quot;a&quot;</code> + <code>href=&quot;/&quot;</code> (or a router Link via the component render-prop). Universal convention.</li>
            <li><strong>Hamburger toggle needs aria-label.</strong> &ldquo;Global navigation&rdquo; is the canonical name.</li>
            <li><strong>Action buttons need aria-label.</strong> Icon-only buttons in MastheadContent (notifications, settings, profile) require labels.</li>
            <li><strong>Place SkipToContent before Masthead</strong> as the first focusable element — keyboard users escape past the header to main content in one Tab.</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  );
}

export const Overview: StoryObj = {
  render: () => <OverviewStory />,
};
