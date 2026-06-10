import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Nav,
  NavExpandable,
  NavGroup,
  NavItem,
  NavList,
} from "@golden-passport/ds-patternfly";
import {
  CloudIcon,
  CogIcon,
  CubeIcon,
  FolderIcon,
} from "@patternfly/react-icons";
import { FoundationPage, Section, Card, CodeBlock } from "../_kit/StoryKit.js";
import { DemoFrame, PropsTable } from "../_kit/DemoKit.js";

const meta: Meta = {
  title: "Components/Navigation",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => {
    const [flatActive, setFlatActive] = useState<string | number>(0);
    const [iconActive, setIconActive] = useState<string | number>(0);
    const [groupActive, setGroupActive] = useState<string | number>(
      "workspace_dashboard",
    );
    const [expActive, setExpActive] = useState<string | number>(
      "settings_notifications",
    );
    const [horizActive, setHorizActive] = useState<string | number>(0);
    const [nakedActive, setNakedActive] = useState<string | number>(0);
    const [softActive, setSoftActive] = useState<string | number>(0);
    return (
      <FoundationPage
        title="Navigation"
        intro={
          <>
            Vertical or horizontal nav lists with active states, grouping,
            and nested sections. Renders as <code>&lt;nav&gt;</code> for
            landmark semantics. Pair with <code>aria-label</code> when the
            page has more than one nav region.
          </>
        }
      >
        <Section
          title="Default"
          description="Single-level nav. Track active state with onSelect on Nav and itemId on each NavItem; preventDefault stops the in-app router from following the href."
        >
          <Card>
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <DemoFrame>
                <Nav
                  aria-label="Primary"
                  ouiaId="PrimaryNav"
                  onSelect={(_, r) => setFlatActive(r.itemId)}
                  style={{ width: 240 }}
                >
                  <NavList>
                    {(["dashboard", "tasks", "reports", "settings"] as const).map(
                      (id, i) => (
                        <NavItem
                          key={id}
                          preventDefault
                          itemId={i}
                          to={`#${id}`}
                          isActive={flatActive === i}
                        >
                          {id.charAt(0).toUpperCase() + id.slice(1)}
                        </NavItem>
                      ),
                    )}
                  </NavList>
                </Nav>
              </DemoFrame>
              <CodeBlock>{`const [active, setActive] = useState(0);

<Nav
  aria-label="Primary"
  onSelect={(_, result) => setActive(result.itemId)}
>
  <NavList>
    <NavItem preventDefault itemId={0} to="#dashboard" isActive={active === 0}>
      Dashboard
    </NavItem>
    <NavItem preventDefault itemId={1} to="#tasks" isActive={active === 1}>
      Tasks
    </NavItem>
  </NavList>
</Nav>`}</CodeBlock>
            </div>
          </Card>
        </Section>

        <Section
          title="With icons"
          description="NavItem.icon renders a leading glyph — pair short labels with icons for app-shell sidebars."
        >
          <Card>
            <div style={{ padding: 24 }}>
              <DemoFrame>
                <Nav
                  aria-label="Resources"
                  ouiaId="ResourcesNav"
                  onSelect={(_, r) => setIconActive(r.itemId)}
                  style={{ width: 240 }}
                >
                  <NavList>
                    <NavItem
                      preventDefault
                      itemId={0}
                      to="#resources"
                      isActive={iconActive === 0}
                      icon={<CubeIcon />}
                    >
                      Resources
                    </NavItem>
                    <NavItem
                      preventDefault
                      itemId={1}
                      to="#projects"
                      isActive={iconActive === 1}
                      icon={<FolderIcon />}
                    >
                      Projects
                    </NavItem>
                    <NavItem
                      preventDefault
                      itemId={2}
                      to="#environments"
                      isActive={iconActive === 2}
                      icon={<CloudIcon />}
                    >
                      Environments
                    </NavItem>
                    <NavItem
                      preventDefault
                      itemId={3}
                      to="#settings"
                      isActive={iconActive === 3}
                      icon={<CogIcon />}
                    >
                      Settings
                    </NavItem>
                  </NavList>
                </Nav>
              </DemoFrame>
            </div>
          </Card>
        </Section>

        <Section
          title="Grouped"
          description="NavGroup adds a sub-heading above a cluster of items. Place groups directly inside Nav (not inside a NavList)."
        >
          <Card>
            <div style={{ padding: 24 }}>
              <DemoFrame>
                <Nav
                  aria-label="Grouped"
                  onSelect={(_, r) => setGroupActive(r.itemId)}
                  style={{ width: 240 }}
                >
                  <NavGroup title="Workspace">
                    <NavItem
                      preventDefault
                      itemId="workspace_dashboard"
                      to="#wd"
                      isActive={groupActive === "workspace_dashboard"}
                    >
                      Dashboard
                    </NavItem>
                    <NavItem
                      preventDefault
                      itemId="workspace_tasks"
                      to="#wt"
                      isActive={groupActive === "workspace_tasks"}
                    >
                      Tasks
                    </NavItem>
                  </NavGroup>
                  <NavGroup title="Account">
                    <NavItem
                      preventDefault
                      itemId="account_profile"
                      to="#ap"
                      isActive={groupActive === "account_profile"}
                    >
                      Profile
                    </NavItem>
                    <NavItem
                      preventDefault
                      itemId="account_billing"
                      to="#ab"
                      isActive={groupActive === "account_billing"}
                    >
                      Billing
                    </NavItem>
                  </NavGroup>
                </Nav>
              </DemoFrame>
            </div>
          </Card>
        </Section>

        <Section
          title="Expandable (nested sections)"
          description="NavExpandable wraps a collapsible group. Use groupId + per-item itemId for two-level active tracking."
        >
          <Card>
            <div style={{ padding: 24 }}>
              <DemoFrame>
                <Nav
                  aria-label="Expandable"
                  onSelect={(_, r) => setExpActive(r.itemId)}
                  style={{ width: 280 }}
                >
                  <NavList>
                    <NavItem
                      preventDefault
                      itemId="dashboard"
                      to="#dashboard"
                      isActive={expActive === "dashboard"}
                    >
                      Dashboard
                    </NavItem>
                    <NavExpandable
                      title="Settings"
                      groupId="settings"
                      isExpanded
                    >
                      <NavItem
                        preventDefault
                        groupId="settings"
                        itemId="settings_general"
                        to="#sg"
                        isActive={expActive === "settings_general"}
                      >
                        General
                      </NavItem>
                      <NavItem
                        preventDefault
                        groupId="settings"
                        itemId="settings_notifications"
                        to="#sn"
                        isActive={expActive === "settings_notifications"}
                      >
                        Notifications
                      </NavItem>
                      <NavItem
                        preventDefault
                        groupId="settings"
                        itemId="settings_integrations"
                        to="#si"
                        isActive={expActive === "settings_integrations"}
                      >
                        Integrations
                      </NavItem>
                    </NavExpandable>
                    <NavExpandable title="Admin" groupId="admin">
                      <NavItem
                        preventDefault
                        groupId="admin"
                        itemId="admin_users"
                        to="#au"
                        isActive={expActive === "admin_users"}
                      >
                        Users
                      </NavItem>
                      <NavItem
                        preventDefault
                        groupId="admin"
                        itemId="admin_permissions"
                        to="#ap2"
                        isActive={expActive === "admin_permissions"}
                      >
                        Permissions
                      </NavItem>
                    </NavExpandable>
                  </NavList>
                </Nav>
              </DemoFrame>
            </div>
          </Card>
        </Section>

        <Section
          title="Horizontal"
          description="variant='horizontal' lays the strip out across the top of a region. Good for in-page section nav (paired with PageGroup or Tabs as alternatives)."
        >
          <Card>
            <div style={{ padding: 24 }}>
              <DemoFrame>
                <Nav
                  aria-label="Horizontal"
                  variant="horizontal"
                  onSelect={(_, r) => setHorizActive(r.itemId)}
                >
                  <NavList>
                    {(["Overview", "Activity", "Members", "Settings"] as const).map(
                      (label, i) => (
                        <NavItem
                          key={label}
                          preventDefault
                          itemId={i}
                          to={`#${label.toLowerCase()}`}
                          isActive={horizActive === i}
                        >
                          {label}
                        </NavItem>
                      ),
                    )}
                  </NavList>
                </Nav>
              </DemoFrame>
            </div>
          </Card>
        </Section>

        <Section
          title="Background opacity"
          description="The filled hover/active background is fully opaque brand colour by default. Dial it down via the --gp-nav-bg-opacity custom property on Nav (or any ancestor) to soften the fill — useful when the nav sits on a coloured surface that would clash with the saturated brand fill, or when you want a quieter affordance overall. Below ~0.5 the foreground flips to the regular text colour automatically so contrast survives."
        >
          <Card>
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <DemoFrame>
                <Nav
                  aria-label="Soft fill"
                  onSelect={(_, r) => setSoftActive(r.itemId)}
                  style={
                    {
                      width: 240,
                      "--gp-nav-bg-opacity": 0.18,
                    } as React.CSSProperties
                  }
                >
                  <NavList>
                    {(["dashboard", "tasks", "reports", "settings"] as const).map(
                      (id, i) => (
                        <NavItem
                          key={id}
                          preventDefault
                          itemId={i}
                          to={`#soft-${id}`}
                          isActive={softActive === i}
                        >
                          {id.charAt(0).toUpperCase() + id.slice(1)}
                        </NavItem>
                      ),
                    )}
                  </NavList>
                </Nav>
              </DemoFrame>
              <CodeBlock>{`<Nav
  aria-label="Primary"
  style={{ "--gp-nav-bg-opacity": 0.18 } as React.CSSProperties}
>
  {/* ...items... */}
</Nav>

// Default (fully opaque):  --gp-nav-bg-opacity: 1
// Soft wash:                --gp-nav-bg-opacity: 0.15 — 0.25
// Tinted hint:              --gp-nav-bg-opacity: 0.08 — 0.12`}</CodeBlock>
            </div>
          </Card>
        </Section>

        <Section
          title="Naked styling"
          description="Opt-in via the gp-nav-naked class on Nav (or any ancestor). Strips background fills entirely — the only state cues are text colour and weight. Use when the nav sits in a layout that already provides visual emphasis (sidebar in a card, in-page TOC, footer nav) and a filled active pill would be visually noisy."
        >
          <Card>
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <DemoFrame>
                <Nav
                  className="gp-nav-naked"
                  aria-label="Naked"
                  onSelect={(_, r) => setNakedActive(r.itemId)}
                  style={{ width: 240 }}
                >
                  <NavList>
                    {(["dashboard", "tasks", "reports", "settings"] as const).map(
                      (id, i) => (
                        <NavItem
                          key={id}
                          preventDefault
                          itemId={i}
                          to={`#naked-${id}`}
                          isActive={nakedActive === i}
                        >
                          {id.charAt(0).toUpperCase() + id.slice(1)}
                        </NavItem>
                      ),
                    )}
                  </NavList>
                </Nav>
              </DemoFrame>
              <CodeBlock>{`<Nav className="gp-nav-naked" aria-label="Primary" onSelect={...}>
  <NavList>
    <NavItem preventDefault itemId={0} to="#dashboard" isActive>Dashboard</NavItem>
    <NavItem preventDefault itemId={1} to="#tasks">Tasks</NavItem>
  </NavList>
</Nav>

// Idle    — subtle text colour
// Hover   — regular text colour (darken)
// Active  — regular text colour + bold weight, no background`}</CodeBlock>
            </div>
          </Card>
        </Section>

        <Section title="Composition">
          <Card>
            <div style={{ padding: 24 }}>
              <PropsTable
                rows={[
                  { name: "Nav", type: "container", description: "Wraps the nav region — renders <nav>. Always pass aria-label. onSelect fires when any item is picked." },
                  { name: "NavList", type: "child", description: "The list shell for flat / expandable items. Holds NavItems / NavExpandables. (NavGroup goes directly under Nav, not inside a NavList.)" },
                  { name: "NavItem", type: "child", description: "A single link/button. itemId identifies it; isActive marks the current page; icon renders a leading glyph; preventDefault stops the default href follow (SPA routing)." },
                  { name: "NavGroup", type: "child", description: "Cluster of items under a sub-heading. Render directly inside Nav." },
                  { name: "NavExpandable", type: "child", description: "Collapsible section of nested NavItems. groupId + isExpanded + isActive control state." },
                  { name: "NavItemSeparator", type: "child", description: "Horizontal divider between groups." },
                ]}
              />
            </div>
          </Card>
        </Section>

        <Section title="Most-used props">
          <Card>
            <div style={{ padding: 24 }}>
              <PropsTable
                rows={[
                  { name: "Nav.aria-label", type: "string", description: 'Required for landmark navigation. Use a descriptive name ("Primary", "Settings", "Footer").' },
                  { name: "Nav.variant", type: '"default" | "horizontal" | "tertiary" | "horizontal-subnav"', description: "Default is vertical (sidebar). Horizontal variants for top-bar-style nav." },
                  { name: "Nav.onSelect", type: "(event, { itemId, groupId }) => void", description: "Fires when any NavItem is selected. Drive your active-id state from here." },
                  { name: "Nav.onToggle", type: "(event, { groupId, isExpanded }) => void", description: "Fires when a NavExpandable opens or closes." },
                  { name: "NavItem.itemId", type: "string | number", description: "Identifies the item in onSelect callbacks." },
                  { name: "NavItem.isActive", type: "boolean", description: "Marks the current page — gets aria-current='page'." },
                  { name: "NavItem.preventDefault", type: "boolean", description: "Stops the default link follow — use for SPA frameworks that intercept navigation." },
                  { name: "NavItem.to / href", type: "string", description: "Anchor target. Use real URLs even with preventDefault — keyboard / right-click affordances depend on them." },
                  { name: "NavItem.icon", type: "ReactNode", description: "Leading glyph slot." },
                  { name: "NavExpandable.isExpanded", type: "boolean", description: "Controlled expanded state. Pair with onToggle if needed." },
                ]}
              />
            </div>
          </Card>
        </Section>

        <Section title="Accessibility">
          <Card>
            <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
              <li><strong>aria-label is required.</strong> Multiple Nav regions on a page (primary + footer + breadcrumb) need distinct labels for screen readers to differentiate.</li>
              <li><strong>One isActive per group.</strong> Multiple &ldquo;active&rdquo; items at the same level confuse the aria-current contract.</li>
              <li><strong>Use real anchors when possible.</strong> Right-click / middle-click / keyboard-shortcut behaviours come for free with anchors. Reserve preventDefault + onClick for SPA frameworks that intercept navigation.</li>
              <li><strong>Keyboard:</strong> Tab through items, arrow keys within an Expandable group, Enter to activate.</li>
            </ul>
          </Card>
        </Section>
      </FoundationPage>
    );
  },
};
