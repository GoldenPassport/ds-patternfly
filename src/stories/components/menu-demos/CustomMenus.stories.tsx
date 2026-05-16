import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Button,
  Divider,
  Menu,
  MenuContent,
  MenuFooter,
  MenuGroup,
  MenuItem,
  MenuList,
  MenuSearch,
  MenuSearchInput,
  SearchInput,
} from "@patternfly/react-core";
import { FoundationPage, Section, Card, CodeBlock } from "../../_storyKit.js";
import { DemoFrame } from "../../_demoKit.js";

const meta: Meta = {
  title: "Components/Menu/Custom menus",
  parameters: { layout: "padded" },
};
export default meta;

export const Demo: StoryObj = {
  render: () => {
    // Filter / search demo
    const allItems = [
      "Run workflow",
      "Run pipeline",
      "Schedule run",
      "View logs",
      "Edit configuration",
      "Duplicate workflow",
      "Archive workflow",
      "Delete workflow",
    ];
    const [filter, setFilter] = useState("");
    const filtered = allItems.filter((i) =>
      i.toLowerCase().includes(filter.toLowerCase()),
    );

    // Footer demo
    const [active, setActive] = useState<number | string>(0);

    return (
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
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <DemoFrame>
                <Menu style={{ maxWidth: 360 }}>
                  <MenuSearch>
                    <MenuSearchInput>
                      <SearchInput
                        placeholder="Type a command…"
                        value={filter}
                        onChange={(_e, v) => setFilter(v)}
                        onClear={() => setFilter("")}
                        aria-label="Filter commands"
                      />
                    </MenuSearchInput>
                  </MenuSearch>
                  <Divider />
                  <MenuContent>
                    <MenuList>
                      {filtered.length === 0 ? (
                        <MenuItem isAriaDisabled>
                          No commands match &ldquo;{filter}&rdquo;
                        </MenuItem>
                      ) : (
                        filtered.map((label, i) => (
                          <MenuItem key={label} itemId={i}>
                            {label}
                          </MenuItem>
                        ))
                      )}
                    </MenuList>
                  </MenuContent>
                </Menu>
              </DemoFrame>
              <CodeBlock>{`const [filter, setFilter] = useState("");
const filtered = items.filter(i => i.toLowerCase().includes(filter.toLowerCase()));

<Menu>
  <MenuSearch>
    <MenuSearchInput>
      <SearchInput
        placeholder="Type a command…"
        value={filter}
        onChange={(_, v) => setFilter(v)}
        onClear={() => setFilter("")}
        aria-label="Filter commands"
      />
    </MenuSearchInput>
  </MenuSearch>
  <Divider />
  <MenuContent>
    <MenuList>
      {filtered.length === 0
        ? <MenuItem isAriaDisabled>No matches</MenuItem>
        : filtered.map((label, i) => (
            <MenuItem key={label} itemId={i}>{label}</MenuItem>
          ))
      }
    </MenuList>
  </MenuContent>
</Menu>`}</CodeBlock>
            </div>
          </Card>
        </Section>

        <Section
          title="With footer"
          description="MenuFooter pins a sticky row to the bottom — use for 'view all', 'clear filters', save-state buttons, or summary text. The footer doesn't scroll with the list above."
        >
          <Card>
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <DemoFrame>
                <Menu
                  activeItemId={active}
                  onSelect={(_e, id) => setActive(id ?? 0)}
                  style={{ maxWidth: 320 }}
                >
                  <MenuContent>
                    <MenuList>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <MenuItem key={i} itemId={i}>
                          Recent run #{1284 - i}
                        </MenuItem>
                      ))}
                    </MenuList>
                  </MenuContent>
                  <Divider />
                  <MenuFooter>
                    <Button variant="link" isInline>
                      View all 137 runs →
                    </Button>
                  </MenuFooter>
                </Menu>
              </DemoFrame>
            </div>
          </Card>
        </Section>

        <Section
          title="Grouped + scrollable"
          description="Combine MenuGroup for section headers with Menu.isScrollable for long lists. Cap the menu height yourself via inline style or a wrapper."
        >
          <Card>
            <div style={{ padding: 24 }}>
              <DemoFrame height={300}>
                <Menu isScrollable style={{ maxHeight: 240, maxWidth: 320 }}>
                  <MenuContent>
                    <MenuGroup label="Today">
                      <MenuList>
                        <MenuItem>Run #1284 — succeeded</MenuItem>
                        <MenuItem>Run #1283 — succeeded</MenuItem>
                      </MenuList>
                    </MenuGroup>
                    <Divider />
                    <MenuGroup label="Yesterday">
                      <MenuList>
                        <MenuItem>Run #1282 — failed</MenuItem>
                        <MenuItem>Run #1281 — succeeded</MenuItem>
                        <MenuItem>Run #1280 — succeeded</MenuItem>
                      </MenuList>
                    </MenuGroup>
                    <Divider />
                    <MenuGroup label="Earlier this week">
                      <MenuList>
                        {Array.from({ length: 8 }).map((_, i) => (
                          <MenuItem key={i}>Run #{1279 - i} — succeeded</MenuItem>
                        ))}
                      </MenuList>
                    </MenuGroup>
                  </MenuContent>
                </Menu>
              </DemoFrame>
            </div>
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
    );
  },
};
