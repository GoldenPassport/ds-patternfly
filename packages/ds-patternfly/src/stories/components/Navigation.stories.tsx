import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  FoundationPage,
  Section,
  Card,
  ConfigurationSection,
  Example,
} from "../_kit/StoryKit.js";
import { PropsTable } from "../_kit/DemoKit.js";
import {
  Default,
  WithIcons,
  Grouped,
  Expandable,
  Horizontal,
  BackgroundOpacity,
  NakedStyling,
} from "../../examples/components/Navigation.example.js";
import navigationExampleSrc from "../../examples/components/Navigation.example.tsx?raw";
import navComponentSrc from "../../components/Nav.tsx?raw";

const meta: Meta = {
  title: "Components/Navigation",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
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
          <Example
            source={navigationExampleSrc}
            region="Default"
            fileName="Navigation.example.tsx"
          >
            <Default />
          </Example>
        </Card>
      </Section>

      <Section
        title="With icons"
        description="NavItem.icon renders a leading glyph — pair short labels with icons for app-shell sidebars."
      >
        <Card>
          <Example
            source={navigationExampleSrc}
            region="WithIcons"
            fileName="Navigation.example.tsx"
          >
            <WithIcons />
          </Example>
        </Card>
      </Section>

      <Section
        title="Grouped"
        description="NavGroup adds a sub-heading above a cluster of items. Place groups directly inside Nav (not inside a NavList)."
      >
        <Card>
          <Example
            source={navigationExampleSrc}
            region="Grouped"
            fileName="Navigation.example.tsx"
          >
            <Grouped />
          </Example>
        </Card>
      </Section>

      <Section
        title="Expandable (nested sections)"
        description="NavExpandable wraps a collapsible group. Use groupId + per-item itemId for two-level active tracking."
      >
        <Card>
          <Example
            source={navigationExampleSrc}
            region="Expandable"
            fileName="Navigation.example.tsx"
          >
            <Expandable />
          </Example>
        </Card>
      </Section>

      <Section
        title="Horizontal"
        description="variant='horizontal' lays the strip out across the top of a region. Good for in-page section nav (paired with PageGroup or Tabs as alternatives)."
      >
        <Card>
          <Example
            source={navigationExampleSrc}
            region="Horizontal"
            fileName="Navigation.example.tsx"
          >
            <Horizontal />
          </Example>
        </Card>
      </Section>

      <Section
        title="Background opacity"
        description="The filled hover/active background is fully opaque brand colour by default. Dial it down via the --gp-nav-bg-opacity custom property on Nav (or any ancestor) to soften the fill — useful when the nav sits on a coloured surface that would clash with the saturated brand fill, or when you want a quieter affordance overall. Below ~0.5 the foreground flips to the regular text colour automatically so contrast survives."
      >
        <Card>
          <Example
            source={navigationExampleSrc}
            region="BackgroundOpacity"
            fileName="Navigation.example.tsx"
          >
            <BackgroundOpacity />
          </Example>
        </Card>
      </Section>

      <Section
        title="Naked styling"
        description="Opt-in via the gp-nav-naked class on Nav (or any ancestor). Strips background fills entirely — the only state cues are text colour and weight. Use when the nav sits in a layout that already provides visual emphasis (sidebar in a card, in-page TOC, footer nav) and a filled active pill would be visually noisy."
      >
        <Card>
          <Example
            source={navigationExampleSrc}
            region="NakedStyling"
            fileName="Navigation.example.tsx"
          >
            <NakedStyling />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example source={navigationExampleSrc} fileName="Navigation.example.tsx" />
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

      <ConfigurationSection
        importStatement={'import { Nav, NavList, NavItem, NavGroup, NavExpandable } from "@golden-passport/ds-patternfly";'}
        componentSource={navComponentSrc}
        componentFileName="Nav.tsx"
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
  ),
};
