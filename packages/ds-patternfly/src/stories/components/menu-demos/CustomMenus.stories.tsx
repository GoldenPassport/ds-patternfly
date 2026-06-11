import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  FoundationPage,
  Section,
  Card,
  Example,
} from "../../_kit/StoryKit.js";
import {
  FilterSearchPalette,
  WithFooter,
  GroupedScrollable,
} from "../../../examples/components/menu-demos/CustomMenus.example.js";
import customMenusExampleSrc from "../../../examples/components/menu-demos/CustomMenus.example.tsx?raw";

const meta: Meta = {
  title: "Components/Menu/Custom menus",
  parameters: { layout: "padded" },
};
export default meta;

export const Demo: StoryObj = {
  render: () => (
    <FoundationPage
      title="Custom menus"
      intro={
        <>
          Recipes built on the lib&rsquo;s <code>Menu</code> primitive
          that don&rsquo;t fit one of the higher-level wrappers
          (<code>Dropdown</code>, <code>Select</code>). Two common
          shapes: a search-filtered command palette, and a menu with a
          sticky footer for &ldquo;view all&rdquo; / save-state / clear-
          filter actions.
        </>
      }
    >
      <Section
        title="Filter / search palette"
        description="A standalone Menu with MenuSearch above the list — filter the items yourself based on the search input. Use for command palettes, type-to-find quick switchers, and inline filters."
      >
        <Card>
          <Example
            source={customMenusExampleSrc}
            region="FilterSearchPalette"
            fileName="CustomMenus.example.tsx"
          >
            <FilterSearchPalette />
          </Example>
        </Card>
      </Section>

      <Section
        title="With footer"
        description="MenuFooter pins a sticky row to the bottom — use for 'view all', 'clear filters', save-state buttons, or summary text. The footer doesn't scroll with the list above."
      >
        <Card>
          <Example
            source={customMenusExampleSrc}
            region="WithFooter"
            fileName="CustomMenus.example.tsx"
          >
            <WithFooter />
          </Example>
        </Card>
      </Section>

      <Section
        title="Grouped + scrollable"
        description="Combine MenuGroup for section headers with Menu.isScrollable for long lists. Cap the menu height yourself via inline style or a wrapper."
      >
        <Card>
          <Example
            source={customMenusExampleSrc}
            region="GroupedScrollable"
            fileName="CustomMenus.example.tsx"
            height={300}
          >
            <GroupedScrollable />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example
            source={customMenusExampleSrc}
            fileName="CustomMenus.example.tsx"
          />
        </Card>
      </Section>

      <Section title="Pattern">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Standalone vs triggered</strong>. Use a custom Menu when you want the menu always visible (settings panel, sidebar picker). Wrap in a Dropdown or Popover when you want a click-to-open trigger.</li>
            <li><strong>Filtering belongs in the menu, not the trigger</strong> — for &ldquo;type-to-filter&rdquo; lists, MenuSearch lives inside the menu.</li>
            <li><strong>Footer for actions that aren&rsquo;t list items</strong> — &ldquo;View all&rdquo; / &ldquo;Save filter&rdquo; / &ldquo;Clear all&rdquo;. Don&rsquo;t mix item-style entries with footer-style actions.</li>
            <li><strong>Cap height for long lists</strong> — pair isScrollable with an explicit max-height; let the user scroll inside instead of pushing the screen.</li>
          </ul>
        </Card>
      </Section>

      <Section title="Pieces used">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><code>Menu</code>, <code>MenuContent</code>, <code>MenuList</code>, <code>MenuItem</code> — the base.</li>
            <li><code>MenuGroup</code> — section headers.</li>
            <li><code>MenuSearch</code> + <code>MenuSearchInput</code> + <code>SearchInput</code> — inline filter.</li>
            <li><code>MenuFooter</code> — sticky footer slot.</li>
            <li><code>Divider</code> — visual breaks between sections.</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
