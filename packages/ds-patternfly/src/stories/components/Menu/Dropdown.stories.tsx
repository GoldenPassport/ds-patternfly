import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  FoundationPage,
  Section,
  Card,
  CodeBlock,
  ConfigurationSection,
  Example,
  ThemingPointer,
} from "../../_kit/StoryKit.js";
import { PropsTable } from "../../_kit/DemoKit.js";
import {
  Basic,
  KebabToggle,
  Grouped,
  WithDescriptions,
} from "../../../examples/components/Menu/Dropdown.example.js";
import dropdownExampleSrc from "../../../examples/components/Menu/Dropdown.example.tsx?raw";
import menuButtonComponentSrc from "../../../components/ds/MenuButton.tsx?raw";

const meta: Meta = {
  title: "Components/Menu/Dropdown",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Dropdown"
      intro={
        <>
          A menu of actions opened by a trigger — the exported{" "}
          <code>MenuButton</code> lego block. It owns the open state, the
          toggle, and the close-on-select wiring; you pass <code>items</code>{" "}
          (actions, <code>"divider"</code>, or <code>{`{ group, items }`}</code>
          ) and an optional <code>onSelect</code>. Use for action menus (kebab
          in toolbars / cards), command lists, and any click-to-open list of{" "}
          <em>things to do</em>. For value selection, use <code>Select</code>.
        </>
      }
    >
      <Section
        title="Basic"
        description="Pass a label + an items array. MenuButton renders the toggle and the list, and owns the open state — aria-expanded, focus on open, Escape to close, and return-focus-to-trigger on select are all handled."
      >
        <Card>
          <Example
            source={dropdownExampleSrc}
            region="Basic"
            fileName="Dropdown.example.tsx"
          >
            <Basic />
          </Example>
        </Card>
      </Section>

      <Section
        title="Kebab toggle"
        description="The icon-only kebab pattern — used in toolbars and per-row actions. variant='plain' on the MenuToggle + an icon makes the trigger compact and unobtrusive."
      >
        <Card>
          <Example
            source={dropdownExampleSrc}
            region="KebabToggle"
            fileName="Dropdown.example.tsx"
          >
            <KebabToggle />
          </Example>
        </Card>
      </Section>

      <Section
        title="Grouped"
        description="DropdownGroup with label wraps a titled cluster. Use for menus with categorically distinct sections (recent / favourites / all)."
      >
        <Card>
          <Example
            source={dropdownExampleSrc}
            region="Grouped"
            fileName="Dropdown.example.tsx"
          >
            <Grouped />
          </Example>
        </Card>
      </Section>

      <Section
        title="With descriptions"
        description="DropdownItem.description adds a quieter sub-label — useful when the action name alone doesn't fully describe what it does."
      >
        <Card>
          <Example
            source={dropdownExampleSrc}
            region="WithDescriptions"
            fileName="Dropdown.example.tsx"
          >
            <WithDescriptions />
          </Example>
        </Card>
      </Section>

      <Section
        title="Split-button (action + chevron)"
        description="Beyond MenuButton's surface: a split button (primary action + chevron) drops to the base Dropdown + MenuToggle splitButtonItems, since the parent manages both the action click AND the open state."
      >
        <Card>
          <div style={{ padding: 24 }}>
            <CodeBlock>{`<Dropdown
  isOpen={isOpen}
  onSelect={() => setIsOpen(false)}
  onOpenChange={setIsOpen}
  toggle={(toggleRef) => (
    <MenuToggle
      ref={toggleRef}
      variant="primary"
      isExpanded={isOpen}
      onClick={() => setIsOpen(o => !o)}
      splitButtonItems={[
        <MenuToggleAction
          id="deploy-action"
          key="deploy"
          aria-label="Deploy"
          onClick={runDeploy}
        >
          Deploy
        </MenuToggleAction>
      ]}
      aria-label="Deploy with options"
    />
  )}
>
  <DropdownList>
    <DropdownItem>Deploy with rollback</DropdownItem>
    <DropdownItem>Deploy as canary</DropdownItem>
    <DropdownItem>Deploy and notify</DropdownItem>
  </DropdownList>
</Dropdown>`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example source={dropdownExampleSrc} fileName="Dropdown.example.tsx" />
        </Card>
      </Section>

      <Section title="Composition">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "MenuAction", type: "item", description: "{ id?, label, description?, icon?, isDisabled?, isSelected?, onClick? } — a single action." },
                { name: '"divider"', type: "item", description: "A separator between items / groups." },
                { name: "MenuActionGroup", type: "item", description: "{ group, items } — a labelled cluster of actions." },
                { name: "children", type: "escape hatch", description: "Pass raw menu nodes instead of items for bespoke compositions." },
              ]}
            />
          </div>
        </Card>
      </Section>

      <ConfigurationSection
        importStatement={'import { MenuButton } from "@golden-passport/ds-patternfly";'}
        componentSource={menuButtonComponentSrc}
        componentFileName="MenuButton.tsx"
        rows={[
          { name: "label", type: "ReactNode", description: "Toggle text. Omit for an icon-only trigger (pass icon + ariaLabel)." },
          { name: "icon", type: "ReactNode", description: "Toggle icon (e.g. a kebab, launcher grid, filter glyph)." },
          { name: "toggleVariant", type: '"default" | "plain" | "primary" | "secondary"', description: "Toggle style. 'plain' is the icon-only / kebab look. Default 'default'." },
          { name: "ariaLabel", type: "string", description: "Accessible name — required for icon-only toggles." },
          { name: "badge", type: "number", description: "Count badge on the toggle (e.g. active-filter count)." },
          { name: "items", type: "MenuButtonItem[]", description: "Menu contents as data: MenuAction, 'divider', or { group, items }." },
          { name: "children", type: "ReactNode", description: "Bespoke menu body (escape hatch) — overrides items." },
          { name: "onSelect", type: "(id, action?) => void", description: "Fired when an action is chosen (closes the menu automatically)." },
          { name: "position", type: '"start" | "end" | "center" | "right" | "left"', description: "Popper placement of the menu." },
          { name: "isDisabled", type: "boolean", description: "Disable the trigger." },
        ]}
      />

      <Section title="Dropdown vs Select">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Dropdown</strong> — a menu of <em>actions</em>. Each item does something. The trigger label is an action category (&ldquo;Actions&rdquo;, &ldquo;Run&rdquo;).</li>
            <li><strong>Select</strong> — a menu of <em>values</em>. Each item is a choice; the trigger label updates to the selected value (&ldquo;us-east-1&rdquo;, &ldquo;Workflow A&rdquo;).</li>
            <li><strong>OverflowMenu</strong> — toolbar items that collapse into a kebab Dropdown below a breakpoint.</li>
          </ul>
        </Card>
      </Section>

      <Section title="Accessibility">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Always wire onOpenChange</strong> — without it, Escape and outside-click won&rsquo;t update your state.</li>
            <li><strong>shouldFocusToggleOnSelect for action menus.</strong> Returning focus to the trigger after the action is the keyboard-friendly behaviour.</li>
            <li><strong>Use isAriaDisabled + tooltipProps</strong> for items that are unavailable for an explainable reason — the screen reader user discovers them and hears why.</li>
            <li><strong>Kebab triggers need aria-label.</strong> A bare ⋮ icon doesn&rsquo;t announce.</li>
          </ul>
        </Card>
      </Section>
      <ThemingPointer
        dials={[
          ["--gp-radius-control", "Toggle + popup corner radius."],
          ["--gp-surface-elevated", "Open menu background."],
          ["--gp-shadow-popover", "Menu drop shadow."],
          ["--gp-focus-ring", "Focus-ring colour."],
        ]}
      />
    </FoundationPage>
  ),
};
