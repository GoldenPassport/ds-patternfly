import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { useState } from "react";
import {
  Avatar,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  ButtonVariant,
  Card,
  CardBody,
  CardTitle,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownList,
  Gallery,
  GalleryItem,
  Label,
  MenuToggle,
  type MenuToggleElement,
  Nav,
  NavItem,
  NavList,
  NotificationBadge,
  NotificationBadgeVariant,
  PageSection,
  Toolbar,
  ToolbarContent,
  ToolbarGroup,
  ToolbarItem,
} from "@patternfly/react-core";
import {
  ArrowUpIcon,
  EllipsisVIcon,
  QuestionCircleIcon,
} from "@patternfly/react-icons";
import PageHeader from "@patternfly/react-component-groups/dist/dynamic/PageHeader";
import { Shell } from "../../components/Shell.js";
import { shellEnLabels } from "../../components/labels.js";
import { AcmeLogo } from "../_acmeLogo.js";

// Shared svg-data-URI helper. The Acme brand logo lives in
// `src/stories/_acmeLogo.tsx` (colour-aware for dark mode); only the
// avatar SVG is still inlined here.
const svg = (m: string) =>
  "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(m);

const avatarSrc = svg(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
    <circle cx="20" cy="20" r="20" fill="#5752d1"/>
    <text x="20" y="20" text-anchor="middle" dominant-baseline="central" fill="white" font-family="Arial, sans-serif" font-size="15" font-weight="700">SC</text>
  </svg>`,
);

/**
 * Top-right masthead actions: notifications, help, settings, and a user
 * dropdown (avatar + name + caret) — modelled on the PF6 reference demo
 * patternfly.org/components/masthead/react-demos/utilities-and-user-dropdown-menu.
 * Hooks live in a component so each render owns its dropdown open state.
 */
// Masthead toolbar — canonical PF6 components per
// patternfly.org/components/page demos:
//   - NotificationBadge for the bell (purpose-built; carries a count).
//   - <Button isSettings> for the cog (PF6 shorthand for plain + cog icon).
//   - Help button uses ButtonVariant.plain + the question icon.
//   - MenuToggle's `icon` prop renders the Avatar to the left of the
//     children with PF6-native vertical alignment — no inline-flex /
//     line-height hacks. This is what replaces the manual height-clamp
//     gymnastics from the previous iteration.
//
// Responsive kebab-collapse is documented in the PF6 page demos via
// ToolbarItem.visibility, but that prop is JS-resolved through
// PageContext.width, which doesn't synchronise reliably with Storybook's
// iframe viewport. Rather than ship a flaky collapse, every action stays
// visible at every breakpoint here; consuming apps that hit the real
// breakpoint cascade can opt into the collapse pattern as needed.
const userDropdownItems = (
  <>
    <DropdownItem key="profile">My profile</DropdownItem>
    <DropdownItem key="account">Account settings</DropdownItem>
    <DropdownItem key="shortcuts">Keyboard shortcuts</DropdownItem>
    <Divider component="li" key="div" />
    <DropdownItem key="logout">Log out</DropdownItem>
  </>
);

function MastheadActions() {
  const [userOpen, setUserOpen] = useState(false);
  const [kebabOpen, setKebabOpen] = useState(false);
  // Responsive split via ToolbarItem `visibility` — viewport-based
  // media queries, which gives predictable behaviour regardless of
  // available toolbar width (PF6's OverflowMenu measures its own
  // container width, which inside a Toolbar ends up only ~40px wide
  // and never trips above the md breakpoint). Below md the three
  // icon buttons are hidden and a kebab dropdown takes their place;
  // above md the kebab hides and the icons render inline.
  return (
    <Toolbar id="masthead-toolbar" isStatic>
      <ToolbarContent>
        <ToolbarGroup
          variant="action-group-plain"
          align={{ default: "alignEnd" }}
          gap={{ default: "gapNone", md: "gapMd" }}
        >
          {/* PF6 utility-class visibility — viewport media queries
              rather than ToolbarItem's `visibility` prop, which depends
              on the PageContext width tracker and isn't reliable here.
              `display-none` hides at default; `display-flex-on-md`
              restores at >= md. The kebab does the inverse. */}
          <ToolbarItem className="pf-v6-u-display-none pf-v6-u-display-flex-on-md">
            <NotificationBadge
              aria-label="Notifications"
              variant={NotificationBadgeVariant.read}
              onClick={() => {}}
            />
          </ToolbarItem>
          <ToolbarItem className="pf-v6-u-display-none pf-v6-u-display-flex-on-md">
            <Button aria-label="Settings" isSettings variant="plain" />
          </ToolbarItem>
          <ToolbarItem className="pf-v6-u-display-none pf-v6-u-display-flex-on-md">
            <Button
              aria-label="Help"
              variant={ButtonVariant.plain}
              icon={<QuestionCircleIcon />}
            />
          </ToolbarItem>
          <ToolbarItem className="pf-v6-u-display-flex pf-v6-u-display-none-on-md">
            <Dropdown
              isOpen={kebabOpen}
              onSelect={() => setKebabOpen(false)}
              onOpenChange={setKebabOpen}
              popperProps={{ position: "right" }}
              toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
                <MenuToggle
                  ref={toggleRef}
                  aria-label="Masthead actions"
                  variant="plain"
                  onClick={() => setKebabOpen((o) => !o)}
                  isExpanded={kebabOpen}
                  icon={<EllipsisVIcon />}
                />
              )}
            >
              <DropdownList>
                <DropdownItem key="notifications">Notifications</DropdownItem>
                <DropdownItem key="settings">Settings</DropdownItem>
                <DropdownItem key="help">Help</DropdownItem>
              </DropdownList>
            </Dropdown>
          </ToolbarItem>
        </ToolbarGroup>
        <ToolbarItem>
          <Dropdown
            isOpen={userOpen}
            onSelect={() => setUserOpen(false)}
            onOpenChange={setUserOpen}
            popperProps={{ position: "right" }}
            toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
              <MenuToggle
                ref={toggleRef}
                aria-label="Sam Carter"
                onClick={() => setUserOpen((o) => !o)}
                isExpanded={userOpen}
                icon={<Avatar src={avatarSrc} alt="" size="sm" />}
              >
                {/* Hide the name below md so the toggle shrinks to
                    avatar + caret; PF6 utility classes drive the
                    breakpoint switch without extra CSS. */}
                <span className="pf-v6-u-display-none pf-v6-u-display-inline-on-md">
                  Sam Carter
                </span>
              </MenuToggle>
            )}
          >
            <DropdownList>{userDropdownItems}</DropdownList>
          </Dropdown>
        </ToolbarItem>
      </ToolbarContent>
    </Toolbar>
  );
}

const meta: Meta<typeof Shell> = {
  title: "Patterns/Shell",
  component: Shell,
  parameters: {
    layout: "fullscreen",
    // Render the shell edge-to-edge (drop the story-canvas padding) so the
    // masthead is full width, as it would be in a real app.
    fullBleed: true,
    a11y: {
      // PF6 v6 paints gradient backgrounds on its Button component that axe
      // can't analyze (color-contrast → "needs review"). Upstream PF6 issue.
      // Brand color contrast itself is validated in src/tokens/tokens.test.ts.
      config: { rules: [{ id: "color-contrast", enabled: false }] },
    },
  },
};
export default meta;

type Story = StoryObj<typeof Shell>;

const navItems = ["Dashboard", "Workflows", "Tasks", "Settings"];

/**
 * Per-page metadata for the PageHeader, keyed by the active nav item. The
 * sidebar nav drives which entry is rendered.
 */
const pageMeta: Record<
  string,
  {
    label: { text: string; color: "green" | "yellow" | "grey" };
    subtitle: string;
    breadcrumb: string[];
  }
> = {
  Dashboard: {
    label: { text: "Live", color: "green" },
    subtitle: "Real-time view of process health across the organisation.",
    breadcrumb: ["Home", "Dashboard"],
  },
  Workflows: {
    label: { text: "Active", color: "green" },
    subtitle: "Triggered hourly · 4 steps · last run 12 minutes ago.",
    breadcrumb: ["Home", "Workflows", "Quarterly review"],
  },
  Tasks: {
    label: { text: "12 pending", color: "yellow" },
    subtitle: "Open tasks awaiting human approval or input.",
    breadcrumb: ["Home", "Tasks"],
  },
  Settings: {
    label: { text: "Read-only", color: "grey" },
    subtitle: "Workspace preferences, integrations, and access policies.",
    breadcrumb: ["Home", "Settings"],
  },
};

const kpis: { label: string; value: string; delta: string }[] = [
  { label: "Active processes",     value: "142",   delta: "+12 (8%)" },
  { label: "Failed runs (24h)",    value: "3",     delta: "-2 (-40%)" },
  { label: "Avg runtime",          value: "42s",   delta: "+3s" },
  { label: "Pending approvals",    value: "7",     delta: "+1" },
];

export const WithSidebarAndPrimaryDetail: Story = {
  render: () => {
    const [activeNav, setActiveNav] = useState("Workflows");
    const [actionMenuOpen, setActionMenuOpen] = useState(false);
    const meta = pageMeta[activeNav] ?? pageMeta["Workflows"]!;
    return (
      <>
        {/* Pin the PageHeader action kebab to the top-right corner of the
            content card. PageHeader normally drops it into the title row;
            absolutely positioning it against the (positioned) main-container
            lifts it to the card corner. */}
        <style
          dangerouslySetInnerHTML={{
            __html: [
              `#gp-app-shell-root .pf-v6-c-page__main-container {`,
              `  position: relative;`,
              `}`,
              `#gp-app-shell-root .gp-card-action-menu.pf-v6-c-menu-toggle {`,
              `  position: absolute;`,
              // Sit on the breadcrumb row: the breadcrumb sits at the header's
              // reduced 16px (spacer-md) top padding; center the 36px circular
              // toggle on that ~24px line (lift it half the height difference).
              `  inset-block-start: calc(var(--pf-t--global--spacer--md, 1rem) - 6px);`,
              `  inset-inline-end: var(--pf-t--global--spacer--lg);`,
              `  z-index: 2;`,
              `}`,
            ].join("\n"),
          }}
        />
        <Shell
          labels={shellEnLabels}
        brandLogo={<AcmeLogo />}
        mastheadActions={<MastheadActions />}
        sidebar={
          <Nav aria-label="Main">
            <NavList>
              {navItems.map((item) => (
                <NavItem
                  key={item}
                  isActive={item === activeNav}
                  onClick={() => setActiveNav(item)}
                >
                  {item}
                </NavItem>
              ))}
            </NavList>
          </Nav>
        }
      >
        {/* PageHeader from component-groups renders its own
            `pf-v6-c-page__main-section` wrapper. Don't double-wrap in
            <PageSection> — that nests two sections and indents the header
            content 20px more than the page sections below it. */}
        <PageHeader
            breadcrumbs={
              <Breadcrumb>
                {meta.breadcrumb.map((b, i) => (
                  <BreadcrumbItem
                    key={b}
                    to="#"
                    isActive={i === meta.breadcrumb.length - 1}
                  >
                    {b}
                  </BreadcrumbItem>
                ))}
              </Breadcrumb>
            }
            title={activeNav}
            label={
              <Label color={meta.label.color} isCompact>
                {meta.label.text}
              </Label>
            }
            subtitle={meta.subtitle}
            linkProps={{
              label: "View documentation",
              isExternal: true,
              component: "a",
              href: "#",
            }}
            actionMenu={
              <Dropdown
                isOpen={actionMenuOpen}
                onOpenChange={setActionMenuOpen}
                onSelect={() => setActionMenuOpen(false)}
                popperProps={{ position: "right" }}
                toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
                  <MenuToggle
                    ref={toggleRef}
                    aria-label={`Actions for ${activeNav}`}
                    variant="plain"
                    className="gp-card-action-menu"
                    isExpanded={actionMenuOpen}
                    onClick={() => setActionMenuOpen((o) => !o)}
                    icon={<EllipsisVIcon />}
                  />
                )}
              >
                <DropdownList>
                  <DropdownItem>Run now</DropdownItem>
                  <DropdownItem>Edit configuration</DropdownItem>
                  <DropdownItem>View logs</DropdownItem>
                  <Divider component="li" />
                  <DropdownItem isDanger>Disable</DropdownItem>
                </DropdownList>
              </Dropdown>
            }
          />
        <PageSection>
          <Gallery hasGutter minWidths={{ default: "200px" }}>
            {kpis.map((k) => (
              <GalleryItem key={k.label}>
                <Card isCompact isGlass>
                  <CardBody>
                    <div
                      style={{
                        color: "var(--gp-color-text-subtle)",
                        fontSize: 13,
                      }}
                    >
                      {k.label}
                    </div>
                    <div
                      style={{
                        fontSize: 28,
                        fontWeight: 600,
                        color: "var(--gp-color-text-regular)",
                      }}
                    >
                      {k.value}
                    </div>
                    <div
                      style={{
                        marginTop: 4,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                        fontSize: 13,
                        color: "var(--gp-color-text-subtle)",
                      }}
                    >
                      <ArrowUpIcon /> {k.delta}
                    </div>
                  </CardBody>
                </Card>
              </GalleryItem>
            ))}
          </Gallery>
        </PageSection>
        <PageSection>
          <Card isGlass>
            <CardTitle>Recent activity</CardTitle>
            <CardBody>
              <p style={{ marginTop: 0, color: "var(--gp-color-text-subtle)" }}>
                Activity feed for the selected {activeNav.toLowerCase()} page
                goes here — replace with a Table, DataList, or LogViewer per
                product needs.
              </p>
            </CardBody>
          </Card>
        </PageSection>
        {/* Optional page footer. PF6 doesn't ship a dedicated PageFooter —
            the convention is a final PageSection at the bottom. Use
            `component="footer"` for landmark semantics and
            `variant="secondary"` so the surface visually distinguishes
            itself from the content sections above. Layout goes on an
            inner wrapper — PageSection injects a `pf-v6-c-page__main-body`
            div between the section element and its children, so flex
            styles on the section itself don't reach the spans below. */}
        {/* No aria-label here. The <footer> only gets an implicit
            `contentinfo` role when it's a direct child of <body>; nested
            inside the Page main it has no role, and axe flags aria-label
            on a roleless element as aria-prohibited-attr. The visible
            copyright + link group makes the section's purpose obvious. */}
        <PageSection component="footer" variant="secondary">
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 16,
              alignItems: "center",
              justifyContent: "space-between",
              color: "var(--gp-color-text-subtle)",
              fontSize: 13,
            }}
          >
            <span>© Acme — Internal build · v1.4.2</span>
            <span style={{ display: "inline-flex", gap: 16 }}>
              <a href="#" style={{ color: "inherit" }}>Privacy</a>
              <a href="#" style={{ color: "inherit" }}>Terms</a>
              <a href="#" style={{ color: "inherit" }}>Status</a>
            </span>
          </div>
        </PageSection>
      </Shell>
      </>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("skip-to-content link is the first focusable element", async () => {
      // The SkipToContent <a> is rendered first, before any other interactive
      // element, so the very first Tab from <body> reaches it.
      const skip = canvas.getByRole("link", { name: shellEnLabels.skipToContent });
      await expect(skip).toHaveAttribute("href", "#gp-main-content");

      // Visually-hidden until focused: the base style clips with clip-path.
      // On focus, onFocus swaps the inline style to reveal it; on blur, it's
      // re-hidden. Assert clipPath round-trip to lock the keyboard-only-
      // reveal contract — that's the actual hiding mechanism.
      await expect(skip).toHaveStyle({ clipPath: "inset(50%)" });
      (skip as HTMLAnchorElement).focus();
      await expect(skip).toHaveStyle({ clipPath: "none" });
      (skip as HTMLAnchorElement).blur();
      await expect(skip).toHaveStyle({ clipPath: "inset(50%)" });
    });

    await step("clicking a nav item updates the PageHeader title", async () => {
      // PF6's isManagedSidebar starts the mobile sidebar collapsed
      // AND aria-hidden, so the nav landmark inside isn't queryable
      // by role until the user opens it. Click the hamburger first.
      const toggle = canvas.getByRole("button", { name: shellEnLabels.toggleSidebar });
      if (toggle.getAttribute("aria-expanded") !== "true") {
        await userEvent.click(toggle);
      }
      // PageHeader renders the title as an h1. Clicking a sidebar nav item
      // updates activeNav state, which drives the title text.
      // Disambiguate "Tasks" — it appears in both the nav AND the breadcrumb,
      // so target the nav-list specifically.
      const nav = canvas.getByRole("navigation", { name: "Main" });
      const tasksItem = within(nav).getByText("Tasks");
      await userEvent.click(tasksItem);
      await expect(
        canvas.getByRole("heading", { level: 1, name: "Tasks" }),
      ).toBeInTheDocument();
    });

    await step("sidebar toggle button is keyboard-accessible", async () => {
      const toggle = canvas.getByRole("button", { name: shellEnLabels.toggleSidebar });
      // The PF6 PageToggleButton exposes its open state via aria-expanded.
      const before = toggle.getAttribute("aria-expanded");
      await userEvent.click(toggle);
      const after = toggle.getAttribute("aria-expanded");
      await expect(after).not.toBe(before);
    });
  },
};
