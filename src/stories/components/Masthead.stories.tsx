import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Brand,
  Button,
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
  Toolbar,
  ToolbarContent,
  ToolbarItem,
} from "@patternfly/react-core";
import { BellIcon, CogIcon } from "@patternfly/react-icons";
import { FoundationPage, Section, Card, CodeBlock } from "../_storyKit.js";
import {
  DemoFrame,
  PropsTable,
  sidenavDrawerCss,
  useSidenavOffClick,
} from "../_demoKit.js";

// Same Acme SVG logo pair used by Components/Brand and the Shell demo.
// Wide variant for ≥ sm viewports, icon-only logomark for narrower widths.
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

const meta: Meta = {
  title: "Components/Masthead",
  parameters: { layout: "padded" },
};
export default meta;

// Tiny sidebar nav used by the Page-mounted Masthead demos. Kept local —
// each Masthead example needs a sidebar to drive when the hamburger clicks,
// otherwise the canonical "sidenav drawer (hamburger toggle)" pattern can't
// be illustrated.
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

function OverviewStory() {
  // Basic demo: inline single-row masthead + sidenav drawer.
  const [basicOpen, setBasicOpen] = useState(true);
  useSidenavOffClick({
    open: basicOpen,
    close: () => setBasicOpen(false),
    containerId: "basic-masthead-demo",
    sidebarId: "basic-masthead-sidebar",
    toggleId: "basic-masthead-toggle",
  });

  // Display-variants demo: stacked two-row masthead at the default breakpoint
  // + sidenav drawer.
  const [stackOpen, setStackOpen] = useState(true);
  useSidenavOffClick({
    open: stackOpen,
    close: () => setStackOpen(false),
    containerId: "stack-masthead-demo",
    sidebarId: "stack-masthead-sidebar",
    toggleId: "stack-masthead-toggle",
  });

  return (
    <FoundationPage
      title="Masthead"
      intro={
        <>
          The top bar of an app. Three slots: a left brand region (logo +
          optional sidebar toggle), a centre region (often empty or holding
          a search), and a right region for global actions / user menu /
          notifications. Renders as <code>&lt;header&gt;</code> for proper
          landmark semantics.
        </>
      }
    >
      <style
        dangerouslySetInnerHTML={{
          __html: [
            sidenavDrawerCss("basic-masthead-demo"),
            sidenavDrawerCss("stack-masthead-demo"),
          ].join("\n"),
        }}
      />

      <Section
        title="Basic — toggle + brand + content"
        description="Mounted inside a Page so the hamburger drives a real sidenav drawer (PageToggleButton + PageSidebar). Click the hamburger or anywhere outside the sidebar to collapse it — same sidenav-drawer pattern used across the docs."
      >
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <div id="basic-masthead-demo">
              <DemoFrame height={320}>
                <Page
                  masthead={
                    <Masthead id="basic-masthead" display={{ default: "inline" }}>
                      <MastheadMain>
                        <MastheadToggle>
                          <PageToggleButton
                            isHamburgerButton
                            aria-label="Global navigation"
                            isSidebarOpen={basicOpen}
                            onSidebarToggle={() => setBasicOpen((v) => !v)}
                            id="basic-masthead-toggle"
                          />
                        </MastheadToggle>
                        <MastheadBrand>
                          <MastheadLogo component="a" href="#">
                            {acmeBrand}
                          </MastheadLogo>
                        </MastheadBrand>
                      </MastheadMain>
                      <MastheadContent>
                        <Toolbar isStatic id="basic-masthead-toolbar">
                          <ToolbarContent>
                            <ToolbarItem align={{ default: "alignEnd" }}>
                              <Button variant="plain" aria-label="Notifications">
                                <BellIcon />
                              </Button>
                            </ToolbarItem>
                            <ToolbarItem>
                              <Button variant="plain" aria-label="Settings">
                                <CogIcon />
                              </Button>
                            </ToolbarItem>
                          </ToolbarContent>
                        </Toolbar>
                      </MastheadContent>
                    </Masthead>
                  }
                  sidebar={
                    <PageSidebar isSidebarOpen={basicOpen} id="basic-masthead-sidebar">
                      <PageSidebarBody>
                        <DemoSidebarNav label="Basic masthead demo" />
                      </PageSidebarBody>
                    </PageSidebar>
                  }
                >
                  <PageSection aria-label="Basic masthead body">
                    <span style={{ color: "var(--gp-color-text-subtle)" }}>
                      Page body — the hamburger toggles the sidenav drawer.
                    </span>
                  </PageSection>
                </Page>
              </DemoFrame>
            </div>
            <CodeBlock>{`<Page
  masthead={
    <Masthead display={{ default: "inline" }}>
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
      <MastheadContent>{/* toolbar */}</MastheadContent>
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
                            {acmeBrand}
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
        title="Inset"
        description="inset adds horizontal padding inside the masthead. Pair with Toolbar inset to keep alignment consistent across the header."
      >
        <Card>
          <div style={{ padding: 24 }}>
            <DemoFrame>
              <Masthead
                id="inset-masthead"
                display={{ default: "inline" }}
                inset={{ default: "insetSm" }}
              >
                <MastheadMain>
                  <MastheadBrand>
                    <MastheadLogo component="a" href="#">
                      {acmeBrand}
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
