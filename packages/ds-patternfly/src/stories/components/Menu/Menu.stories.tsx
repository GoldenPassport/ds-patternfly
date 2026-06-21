import type { Meta, StoryObj } from "@storybook/react-vite";
import { FoundationPage, Section, Card, CodeBlock, Example } from "../../_kit/StoryKit.js";
import { PropsTable } from "../../_kit/DemoKit.js";
import {
  Basic,
  WithIcons,
  WithDescriptions,
  SingleSelect,
  MultiSelect,
  WithActions,
  Favourites,
  DangerItem,
  ExternalLinks,
  ViewMore,
  Plain,
} from "../../../examples/components/Menu/Menu.example.js";
import menuExampleSrc from "../../../examples/components/Menu/Menu.example.tsx?raw";

const meta: Meta = {
  title: "Components/Menu/Menu",
  parameters: {
    layout: "padded",
    a11y: {
      config: {
        // PF6's MenuList carries role="menu" with menuitem children, but
        // some demo combinations (favourites + group + per-item actions)
        // produce non-menuitem div descendants that axe flags. Real-app
        // usage of any single pattern doesn't hit this.
        rules: [{ id: "aria-required-children", enabled: false }],
      },
    },
  },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Menu"
      intro={
        <>
          The base menu primitive — used directly for static menus,
          wrapped by <code>Dropdown</code> / <code>Select</code> /{" "}
          <code>OverflowMenu</code> for triggered menus. Use it directly
          when you want a menu that&rsquo;s always visible (settings panel,
          inline pickers) or when you need composition that the
          higher-level wrappers don&rsquo;t cover.
        </>
      }
    >
      <Section
        title="Basic"
        description="Menu → MenuContent → MenuList → MenuItem. activeItemId tracks the active row (drives keyboard focus + active-row styling); onSelect fires with the itemId of the clicked entry."
      >
        <Card>
          <Example
            source={menuExampleSrc}
            region="Basic"
            fileName="Menu.example.tsx"
          >
            <Basic />
          </Example>
        </Card>
      </Section>

      <Section
        title="With icons"
        description="MenuItem.icon prepends a glyph — useful for resource pickers (image / git / file)."
      >
        <Card>
          <Example
            source={menuExampleSrc}
            region="WithIcons"
            fileName="Menu.example.tsx"
          >
            <WithIcons />
          </Example>
        </Card>
      </Section>

      <Section
        title="With descriptions + separators"
        description="MenuItem.description adds a quieter second line; MenuGroup wraps a titled cluster; Divider between groups for visual separation."
      >
        <Card>
          <Example
            source={menuExampleSrc}
            region="WithDescriptions"
            fileName="Menu.example.tsx"
          >
            <WithDescriptions />
          </Example>
        </Card>
      </Section>

      <Section
        title="Single-select (radio behaviour)"
        description="Track one selected id and set isSelected on each item — the selected row gets the active highlight. Use when items represent mutually-exclusive choices inside a settings menu."
      >
        <Card>
          <Example
            source={menuExampleSrc}
            region="SingleSelect"
            fileName="Menu.example.tsx"
          >
            <SingleSelect />
          </Example>
        </Card>
      </Section>

      <Section
        title="Multi-select (checkbox behaviour)"
        description="hasCheckbox renders each item with a checkbox — the user can pick any number. Track the array yourself. PF6 keeps the menu open after selection so the user can pick multiple."
      >
        <Card>
          <Example
            source={menuExampleSrc}
            region="MultiSelect"
            fileName="Menu.example.tsx"
          >
            <MultiSelect />
          </Example>
        </Card>
      </Section>

      <Section
        title="With per-item actions"
        description="MenuItem.actions slots a trailing icon button per row (kebab, copy, share). Wire Menu.onActionClick to receive both the itemId AND the actionId, so one handler can route by combination — useful for bulk-action menus and contextual per-row controls."
      >
        <Card>
          <Example
            source={menuExampleSrc}
            region="WithActions"
            fileName="Menu.example.tsx"
          >
            <WithActions />
          </Example>
        </Card>
      </Section>

      <Section
        title="Favourites"
        description="isFavorited on a MenuItem renders a star toggle in the trailing actions slot. Pair with onActionClick + actionId='fav' to manage the favourites set yourself; render the favourited items as a separate MenuGroup at the top of the menu."
      >
        <Card>
          <Example
            source={menuExampleSrc}
            region="Favourites"
            fileName="Menu.example.tsx"
          >
            <Favourites />
          </Example>
        </Card>
      </Section>

      <Section
        title="Danger item"
        description="isDanger on a MenuItem renders the row in the brand danger palette — use for destructive items (delete, drop, force-stop). Best paired with a Divider above to visually quarantine it from safe actions."
      >
        <Card>
          <Example
            source={menuExampleSrc}
            region="DangerItem"
            fileName="Menu.example.tsx"
          >
            <DangerItem />
          </Example>
        </Card>
      </Section>

      <Section
        title="External links"
        description="isExternalLink on a MenuItem renders a small external-link icon in the trailing area + sets target='_blank'. Use for items that take the user to a different app / domain."
      >
        <Card>
          <Example
            source={menuExampleSrc}
            region="ExternalLinks"
            fileName="Menu.example.tsx"
          >
            <ExternalLinks />
          </Example>
        </Card>
      </Section>

      <Section
        title="View more (load on demand)"
        description="Pair a final isLoadButton MenuItem with isLoading + Spinner state to incrementally reveal more options. Use for menus that paginate large option sets (recent runs, search results)."
      >
        <Card>
          <Example
            source={menuExampleSrc}
            region="ViewMore"
            fileName="Menu.example.tsx"
          >
            <ViewMore />
          </Example>
        </Card>
      </Section>

      <Section
        title="Plain"
        description="isPlain strips the menu's border + bg fill — use when the menu sits inside a card or panel that already provides the surface."
      >
        <Card>
          <Example
            source={menuExampleSrc}
            region="Plain"
            fileName="Menu.example.tsx"
          >
            <Plain />
          </Example>
        </Card>
      </Section>

      <Section
        title="Drilldown / flyout"
        description="Two patterns for nested menus: drilldown replaces the parent in place (good for narrow drawers); flyout opens a sub-menu adjacent to the parent (desktop nav / kebabs with sub-actions). Both are heavy patterns — see the canonical PF examples for the full state-machine wiring."
      >
        <Card>
          <div style={{ padding: 24 }}>
            <CodeBlock>{`<Menu containsDrilldown drilldownItemPath={drilldownPath} drilledInMenus={drilledIn}
      onDrillIn={onDrillIn} onDrillOut={onDrillOut} onGetMenuHeight={...}>
  <MenuContent>
    <MenuList>
      <MenuItem
        itemId="actions"
        direction="down"
        drilldownMenu={
          <DrilldownMenu id="drilldown-actions">
            <MenuItem itemId="actions_breadcrumb" direction="up">Actions</MenuItem>
            <Divider component="li" />
            <MenuItem itemId="rename">Rename</MenuItem>
            <MenuItem itemId="delete" isDanger>Delete</MenuItem>
          </DrilldownMenu>
        }
      >
        Actions
      </MenuItem>
      <MenuItem
        itemId="settings"
        flyoutMenu={
          <Menu id="flyout-menu" key="flyout">
            <MenuContent>
              <MenuList>
                <MenuItem>Display</MenuItem>
                <MenuItem>Notifications</MenuItem>
              </MenuList>
            </MenuContent>
          </Menu>
        }
      >
        Settings
      </MenuItem>
    </MenuList>
  </MenuContent>
</Menu>`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example source={menuExampleSrc} fileName="Menu.example.tsx" />
        </Card>
      </Section>

      <Section title="Composition">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "Menu", type: "container", description: "Outer wrapper. Owns activeItemId, isScrollable, isPlain, onSelect, onActionClick, drilldown / flyout state." },
                { name: "MenuContent", type: "child", description: "Body wrapper. Required around MenuList(s) and MenuGroup(s)." },
                { name: "MenuList", type: "child", description: "The actual ul. Holds MenuItem children." },
                { name: "MenuItem", type: "child", description: "A single entry. itemId for selection tracking; icon, description, actions, hasCheckbox / isSelected / isDanger / isFavorited / isExternalLink / isLoadButton + isLoading / tooltipProps + isAriaDisabled." },
                { name: "MenuItemAction", type: "child", description: "Trailing icon button inside a MenuItem.actions slot. actionId + aria-label required; onClick optional (Menu.onActionClick fires for all)." },
                { name: "MenuGroup", type: "child", description: "Titled section of items. label + labelHeadingLevel for the group heading." },
                { name: "MenuFooter", type: "child", description: "Sticky footer slot below the list (action buttons, view-more links — see Custom menus demo)." },
                { name: "MenuSearch / MenuSearchInput", type: "child", description: "Search input above the list — filter the items yourself (see Custom menus demo)." },
                { name: "MenuBreadcrumb", type: "child", description: "Breadcrumb header for drilldown menus showing the path from root." },
                { name: "DrilldownMenu", type: "child", description: "Sub-menu wrapper used inside MenuItem.drilldownMenu for the drill-in pattern." },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section title="Most-used Menu props">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "activeItemId", type: "number | string", description: "Currently active item — drives keyboard focus + the active-item background." },
                { name: "selected", type: "any | any[]", description: "Selected value(s) — used by Select internally; pair with isSelected on items for static menus." },
                { name: "onSelect", type: "(event, itemId) => void", description: "Fires when an item is activated." },
                { name: "onActionClick", type: "(event, itemId, actionId) => void", description: "Fires when a MenuItemAction inside an item is clicked. One handler routes by (itemId × actionId)." },
                { name: "isPlain", type: "boolean", description: "Strip border + bg fill." },
                { name: "isScrollable", type: "boolean", description: "Cap the menu height — body scrolls when items overflow." },
                { name: "containsFlyout", type: "boolean", description: "Set when the menu hosts flyout submenus (right-anchored sub-menus)." },
                { name: "containsDrilldown", type: "boolean", description: "Set when the menu uses the drilldown pattern (sub-menus replace the parent in place)." },
                { name: "drilldownItemPath / drilledInMenus", type: "string[]", description: "Path of itemIds + drilled-in menu ids — required state for the drilldown pattern." },
                { name: "onDrillIn / onDrillOut / onGetMenuHeight", type: "fn", description: "Callbacks the drilldown machinery needs to mutate the path + animate height." },
                { name: "id / role / ouiaId", type: "string", description: "DOM id, ARIA role override (default 'menu'), test selector." },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section title="Most-used MenuItem props">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "itemId", type: "any", description: "Identifier for selection / active / action callbacks. Match the type to your data — strings or numbers both work." },
                { name: "to / target / rel / download", type: "string", description: "Renders the item as an anchor with these attributes when set." },
                { name: "isExternalLink", type: "boolean", description: "Adds the external-link glyph + sets target='_blank' rel='noopener noreferrer'." },
                { name: "icon", type: "ReactNode", description: "Leading glyph." },
                { name: "description", type: "ReactNode", description: "Quieter sub-line under the title." },
                { name: "actions", type: "ReactNode", description: "Trailing slot for one or more MenuItemAction." },
                { name: "hasCheckbox", type: "boolean", description: "Render a checkbox (multi-select pattern). Pair with isSelected." },
                { name: "isSelected", type: "boolean", description: "Selected state — drives the checkmark / checkbox check / active highlight." },
                { name: "isActive", type: "boolean", description: "Visually mark the item as active (matches keyboard focus / hover state)." },
                { name: "isFavorited", type: "boolean", description: "Render a favourite-star action in the trailing area." },
                { name: "isDanger", type: "boolean", description: "Paint the item in the brand danger palette — for destructive actions." },
                { name: "isDisabled", type: "boolean", description: "Disable + remove from keyboard nav." },
                { name: "isAriaDisabled", type: "boolean", description: "Disable visually but keep focusable — pair with tooltipProps to explain why." },
                { name: "tooltipProps", type: "TooltipProps", description: "Wrap the item in a Tooltip — best with isAriaDisabled to explain unavailable items." },
                { name: "isLoadButton / isLoading", type: "boolean", description: "Mark a 'View more' / 'Load more' item — isLoading swaps for a Spinner during the fetch." },
                { name: "flyoutMenu", type: "ReactElement", description: "Sub-menu opened to the right on hover (containsFlyout pattern)." },
                { name: "drilldownMenu", type: "ReactNode | () => ReactNode", description: "Sub-menu that replaces the parent in place (containsDrilldown pattern)." },
                { name: "direction", type: '"down" | "up"', description: "Drill direction marker for drilldown items (down = open sub, up = back-to-parent breadcrumb)." },
                { name: "onClick", type: "(event) => void", description: "Per-item click handler. Use for items where you want to do something independent of Menu.onSelect." },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section title="When to use directly">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Standalone settings panels</strong> — a Menu sitting in a Card / Drawer with no toggle.</li>
            <li><strong>Composition with custom triggers</strong> — when you need a menu shape Dropdown / Select doesn&rsquo;t cover.</li>
            <li><strong>Drilldown / flyout patterns</strong> — multi-level menus.</li>
            <li><strong>For a triggered menu of actions</strong> — use Dropdown.</li>
            <li><strong>For value selection</strong> — use Select.</li>
          </ul>
        </Card>
      </Section>

      <Section title="Accessibility">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Use isAriaDisabled + tooltipProps</strong> when an item is unavailable for an explainable reason — keep the item focusable so screen-reader users discover it and the tooltip explains why.</li>
            <li><strong>Use isDisabled</strong> only when the item should be invisible to keyboard / SR navigation entirely.</li>
            <li><strong>MenuItemAction needs aria-label</strong> — describe the action and (when ambiguous) the row it belongs to.</li>
            <li><strong>isExternalLink sets rel=&quot;noopener noreferrer&quot;</strong> automatically — don&rsquo;t hand-roll the security attribute.</li>
            <li><strong>Keyboard:</strong> Arrow keys move between items; Home / End jump to ends; Enter activates; Escape closes (when wrapped by Dropdown / Select). For drilldowns, Right opens a child, Left returns.</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
