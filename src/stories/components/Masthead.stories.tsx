import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Button,
  Masthead,
  MastheadBrand,
  MastheadContent,
  MastheadLogo,
  MastheadMain,
  MastheadToggle,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
} from "@patternfly/react-core";
import { BellIcon, CogIcon } from "@patternfly/react-icons";
import { FoundationPage, Section, Card, CodeBlock } from "../_storyKit.js";
import { DemoFrame, PropsTable } from "../_demoKit.js";

const meta: Meta = {
  title: "Components/Masthead",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
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
      <Section
        title="Basic — toggle + brand + content"
        description="Standalone Masthead (without Page) uses Button isHamburger as the toggle. When mounted inside a Page, swap the Button for PageToggleButton — that wires sidebar collapse automatically."
      >
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame>
              <Masthead id="basic-masthead">
                <MastheadMain>
                  <MastheadToggle>
                    <Button
                      variant="plain"
                      isHamburger
                      onClick={() => {}}
                      aria-label="Global navigation"
                    />
                  </MastheadToggle>
                  <MastheadBrand>
                    <MastheadLogo component="a" href="#">
                      <strong style={{ color: "var(--gp-color-text-regular)" }}>
                        Acme
                      </strong>
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
            </DemoFrame>
            <CodeBlock>{`<Masthead id="basic-masthead">
  <MastheadMain>
    <MastheadToggle>
      <Button variant="plain" isHamburger onClick={toggleSidebar} aria-label="Global navigation" />
    </MastheadToggle>
    <MastheadBrand>
      <MastheadLogo component="a" href="/">
        <img src="/logo.svg" alt="Acme" />
      </MastheadLogo>
    </MastheadBrand>
  </MastheadMain>
  <MastheadContent>
    <Toolbar isStatic id="masthead-toolbar">
      <ToolbarContent>
        <ToolbarItem align={{ default: "alignEnd" }}>
          <Button variant="plain" aria-label="Notifications"><BellIcon /></Button>
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
        description="display={{ default: 'inline' | 'stack' }} controls whether MastheadMain and MastheadContent sit side-by-side or stack vertically. Mix with breakpoints for responsive shells."
      >
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame>
              <Masthead id="stack-masthead" display={{ default: "stack" }}>
                <MastheadMain>
                  <MastheadBrand>
                    <MastheadLogo component="a" href="#">
                      <strong style={{ color: "var(--gp-color-text-regular)" }}>
                        Acme
                      </strong>
                    </MastheadLogo>
                  </MastheadBrand>
                </MastheadMain>
                <MastheadContent>
                  <span style={{ color: "var(--gp-color-text-subtle)" }}>
                    Stacked content row
                  </span>
                </MastheadContent>
              </Masthead>
            </DemoFrame>
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
              <Masthead id="inset-masthead" inset={{ default: "insetSm" }}>
                <MastheadMain>
                  <MastheadBrand>
                    <MastheadLogo component="a" href="#">
                      <strong style={{ color: "var(--gp-color-text-regular)" }}>
                        Acme
                      </strong>
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
  ),
};
