import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  FoundationPage,
  Section,
  Card,
  CodeBlock,
  Example,
} from "../_kit/StoryKit.js";
import { PropsTable } from "../_kit/DemoKit.js";
import {
  BasicStructure,
  FullDemo as FullDemoRegion,
} from "../../examples/components/Compass.example.js";
import compassExampleSrc from "../../examples/components/Compass.example.tsx?raw";

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

// ──────────────────────────────────────────────────────────────────
// Story: Overview
// ──────────────────────────────────────────────────────────────────

export const Overview: StoryObj = {
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
        description="In a basic Compass layout, content is passed to five ReactNode props to populate the different areas of the page. Pass any subset; missing slots collapse without taking space."
      >
        <Card>
          <ul
            style={{
              margin: 0,
              padding: "16px 24px 16px 40px",
              color: "var(--gp-color-text-regular)",
              lineHeight: 1.9,
            }}
          >
            <li>
              <strong><code>header</code></strong> — rendered at the top of
              the page, typically a <code>&lt;CompassHeader&gt;</code> that
              divides the header into three areas: a <code>logo</code> /
              brand, middle <code>nav</code>, and <code>profile</code>.
            </li>
            <li>
              <strong><code>sidebarStart</code></strong> — rendered at the
              horizontal start of the page (the left side by default).
            </li>
            <li>
              <strong><code>main</code></strong> — rendered in the centre,
              typically a <code>&lt;CompassMainHeader&gt;</code> or{" "}
              <code>&lt;CompassHero&gt;</code> alongside a{" "}
              <code>&lt;CompassContent&gt;</code> filled with one or more{" "}
              <code>&lt;Panel&gt;</code> components.
            </li>
            <li>
              <strong><code>sidebarEnd</code></strong> — rendered at the
              horizontal end of the page (the right side by default).
            </li>
            <li>
              <strong><code>footer</code></strong> — rendered at the bottom
              of the page. (We use the footer for the AI search in the
              later illustrations.)
            </li>
          </ul>
        </Card>
      </Section>

      <Section
        title="Basic structure"
        description="The five slots wired with real sub-components. Coloured placeholders stand in for nav / sidebars / footer so the regions stay legible. The hero is optional — the content title and main content areas are the key parts."
      >
        <Card>
          <Example
            source={compassExampleSrc}
            region="BasicStructure"
            fileName="Compass.example.tsx"
          >
            <BasicStructure />
          </Example>
        </Card>
      </Section>

      <Section
        title="Background image"
        description="How the Compass and Hero backgrounds are sourced."
      >
        <Card>
          <ul
            style={{
              margin: 0,
              padding: "16px 24px 16px 40px",
              color: "var(--gp-color-text-regular)",
              lineHeight: 1.9,
            }}
          >
            <li>
              The background image of <code>&lt;Compass&gt;</code> is set at
              a global level alongside the theme — you don&apos;t set it
              per-instance.
            </li>
            <li>
              Customise the background of the <code>&lt;Hero&gt;</code>{" "}
              inside <code>&lt;CompassHero&gt;</code> with its{" "}
              <code>backgroundSrcLight</code> /{" "}
              <code>backgroundSrcDark</code> props, or set a gradient with{" "}
              <code>gradientLight</code> / <code>gradientDark</code>. When
              using a gradient, keep the stops in a tonal band that
              contrasts with the hero text — see{" "}
              <code>Components/Hero → With gradient</code>.
            </li>
          </ul>
        </Card>
      </Section>

      <Section
        title="Responsive behaviour"
        description="Compass adapts the chrome for narrow viewports so the five-slot layout still works on mobile."
      >
        <Card>
          <ul
            style={{
              margin: 0,
              padding: "16px 24px 16px 40px",
              color: "var(--gp-color-text-regular)",
              lineHeight: 1.9,
            }}
          >
            <li>
              <strong>Header nav collapses to a hamburger.</strong> On
              small screens the middle <code>nav</code> in{" "}
              <code>&lt;CompassHeader&gt;</code> folds behind a hamburger
              toggle that opens a slide-in side-nav, so the tabs / links
              stay reachable without crowding the header.
            </li>
            <li>
              <strong>Sidebars collapse with open / close buttons.</strong>{" "}
              <code>sidebarStart</code> and <code>sidebarEnd</code> are
              hidden by default on mobile and surfaced on demand via their
              own expand / collapse controls, so the <code>main</code>{" "}
              content keeps the full width until the user opens a rail.
            </li>
            <li>
              <strong>Main content stays primary.</strong> The hero,
              content title, and body reflow to the single available
              column — the chrome (header, rails, footer) gets out of the
              way rather than competing for space.
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
          docked-nav vs. header layouts. Working code lives in the{" "}
          <code>Overview</code> and <code>Full demo</code> stories; this
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
            <li>
              <strong>Responsive collapse.</strong> At <code>md</code>{" "}
              and up both rails stay pinned open beside the content. Below{" "}
              <code>md</code> there isn&apos;t room for two fixed rails, so
              each one <strong>collapses to a closed overlay by default</strong>{" "}
              and slides in over the content only when opened — keeping the
              phone layout to a single column.
            </li>
            <li>
              <strong>Expand / close handles.</strong> Each rail gets its own
              edge-handle <code>button</code> (rendered only when narrow) that
              toggles it open and closed — an{" "}
              <code>AngleRight</code>/<code>AngleLeft</code> chevron that points{" "}
              <em>inward</em> when closed and <em>outward</em> when open, mirrored
              for the start vs. end rail. Drive it from{" "}
              <code>isOpen</code> state with{" "}
              <code>aria-expanded={`{isOpen}`}</code> and an{" "}
              <code>aria-label</code> that flips between{" "}
              <code>&quot;Open … rail&quot;</code> and{" "}
              <code>&quot;Close … rail&quot;</code>. Render the handle{" "}
              <em>inside</em> the sidebar&apos;s own React tree so it slides with
              the rail and overrides PF6&apos;s{" "}
              <code>visibility:hidden</code> on the collapsed rail (
              <code>visibility: visible !important</code>) — that keeps the
              handle tappable while the rail itself is hidden. Working code:{" "}
              <code>patterns/Compass → Example</code>.
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

// ──────────────────────────────────────────────────────────────────
// Story: FullDemo — canonical PF6 Compass demo
// ──────────────────────────────────────────────────────────────────

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
          <Example
            source={compassExampleSrc}
            region="FullDemo"
            fileName="Compass.example.tsx"
          >
            <FullDemoRegion />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example source={compassExampleSrc} fileName="Compass.example.tsx" />
        </Card>
      </Section>

      <Section
        title="Built from these lego blocks"
        description="The full demo no longer hand-rolls its chrome — it composes three exported DS blocks into the Compass slots, plus the useCompassResponsive hook for the breakpoint switch. import { CompassTabsNav, CompassRail, CompassProfileMenu, useCompassResponsive } from '@golden-passport/ds-patternfly'."
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
              <strong>
                <code>CompassTabsNav</code>
              </strong>{" "}
              owns the two-level nav from one <code>tabs</code> model — it
              renders the inline tabs + subtabs strip (
              <code>variant=&quot;desktop&quot;</code>, in the header{" "}
              <code>nav</code> slot) and the slide-in{" "}
              <code>Nav</code> drawer body (
              <code>variant=&quot;mobile&quot;</code>, the tab that owns
              subtabs becomes a <code>NavExpandable</code>). It owns the
              active tab/subtab state (controlled or uncontrolled) and the
              subtab-content wiring.
            </li>
            <li>
              <strong>
                <code>CompassRail</code>
              </strong>{" "}
              renders an icon rail from an <code>actions</code> model (
              <code>groupId</code> clusters with dividers). On mobile it adds
              the off-canvas edge handle and owns its open state; pair{" "}
              <code>compassRailRootClasses(&#123;…&#125;)</code> on the{" "}
              <code>Compass</code> root for the slide.
            </li>
            <li>
              <strong>
                <code>CompassProfileMenu</code>
              </strong>{" "}
              is the profile dropdown — name + avatar on desktop, avatar-only
              when <code>isCompact</code>. Owns its open state.
            </li>
            <li>
              <strong>
                <code>useCompassResponsive()</code>
              </strong>{" "}
              wraps the <code>matchMedia(62rem)</code> listener and returns{" "}
              <code>isMobile</code> — the single signal the demo threads to
              each block. The mobile-overlay CSS ships in the lib stylesheet;
              the <code>gp-compass-mobile-overlay</code> wrapper opts in.
            </li>
          </ul>
        </Card>
      </Section>

      <Section title="CompassTabsNav / CompassRail / CompassProfileMenu — props">
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 24 }}>
            <PropsTable
              rows={[
                { name: "CompassTabsNav.tabs", type: "CompassNavTab[]", description: "Nav model: { id, label, isDisabled?, subtabs?: { id, label, isDisabled? }[] }." },
                { name: "CompassTabsNav.variant", type: '"desktop" | "mobile"', description: "Desktop tabs+subtabs strip, or the mobile Nav drawer body. Pick via useCompassResponsive()." },
                { name: "CompassTabsNav.activeTab / activeSubtab", type: "string", description: "Controlled active ids (with onTabChange / onSubtabChange). Uncontrolled via defaultActiveTab / defaultActiveSubtab." },
                { name: "CompassTabsNav.onHome / onSearch", type: "() => void", description: "Desktop home / search icon-button handlers (omit to hide)." },
                { name: "CompassTabsNav.onNavigate", type: "() => void", description: "Mobile: fired when an item is chosen or the drawer is closed." },
                { name: "CompassRail.side", type: '"start" | "end"', description: "Which edge — drives chevron direction + handle anchoring." },
                { name: "CompassRail.actions", type: "CompassRailAction[]", description: "{ id, icon, label, onClick?, isDisabled?, groupId? }. Shared groupId clusters in one ActionListGroup." },
                { name: "CompassRail.isMobile / isOpen / onOpenChange", type: "boolean / boolean / (open) => void", description: "Mobile off-canvas behavior + controlled open state (uncontrolled via defaultOpen)." },
                { name: "CompassProfileMenu", type: "{ name, avatarSrc, items, isCompact?, isOpen?, onOpenChange?, position? }", description: "Profile dropdown; isCompact collapses to avatar-only." },
                { name: "compassRailRootClasses({ startOpen, endOpen })", type: "string", description: "Builds the gp-rail-* classes for the <Compass> root from each rail's open state." },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section
        title="Responsive behaviour"
        description="How the chrome adapts below PF6's 62rem breakpoint. Resize the preview (or use the Storybook viewport toolbar) to see it."
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
              <strong>Nav collapses to a hamburger side nav.</strong> On
              mobile the inline header tabs + subtabs fold away and a
              hamburger appears to the left of the logo. It opens the same
              nav as an <strong>overlay drawer</strong> (the Page-sidebar
              pattern) — a PatternFly <code>Nav</code> where the tab that
              owns subtabs becomes an expandable nested section. The drawer
              floats over the content with a dismiss scrim, so the{" "}
              <code>main</code> section never resizes.
            </li>
            <li>
              <strong>Desktop rails collapse with open / close
              buttons.</strong> At desktop widths the two toolbar toggles
              by the content title collapse and reveal the start / end icon
              rails. On mobile those rails go off-canvas so the{" "}
              <code>main</code> content keeps the full width.
            </li>
            <li>
              <strong>Docked-nav alternative.</strong> For a single
              anchored nav that folds behind a hamburger masthead on
              mobile, pass <code>dock</code> + <code>masthead</code>{" "}
              instead of <code>header</code> + sidebars (PF6 renders the
              masthead only at mobile).
            </li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};

