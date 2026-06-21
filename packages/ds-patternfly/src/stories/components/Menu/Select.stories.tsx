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
  BasicSingleSelect,
  Grouped,
  MultiSelectCheckboxes,
} from "../../../examples/components/Menu/Select.example.js";
import selectExampleSrc from "../../../examples/components/Menu/Select.example.tsx?raw";
import selectComponentSrc from "../../../components/base/Select.tsx?raw";

const meta: Meta = {
  title: "Components/Menu/Select",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Select"
      intro={
        <>
          A menu for picking <em>values</em> — single or multi, with
          optional grouping, validation, and typeahead. The trigger label
          updates to reflect the selection. Use for form fields,
          switchers, and any choice list. For action menus, use{" "}
          <code>Dropdown</code> instead.
        </>
      }
    >
      <Section
        title="Basic single-select"
        description="A single-value picker. Track the selected value yourself; the toggle's label reflects it. Width is up to you — give the MenuToggle an explicit width so it doesn't size to the longest option."
      >
        <Card>
          <Example
            source={selectExampleSrc}
            region="BasicSingleSelect"
            fileName="Select.example.tsx"
          >
            <BasicSingleSelect />
          </Example>
        </Card>
      </Section>

      <Section
        title="Grouped"
        description="SelectGroup with label wraps a titled cluster of options — workspace switchers, region pickers with continent groupings, anything with categorical structure."
      >
        <Card>
          <Example
            source={selectExampleSrc}
            region="Grouped"
            fileName="Select.example.tsx"
          >
            <Grouped />
          </Example>
        </Card>
      </Section>

      <Section
        title="Multi-select with checkboxes"
        description="Pass hasCheckbox on each option + manage an array of selected values. The toggle's label reflects the count or a comma-separated list — your choice. Use for filter pickers in toolbars."
      >
        <Card>
          <Example
            source={selectExampleSrc}
            region="MultiSelectCheckboxes"
            fileName="Select.example.tsx"
          >
            <MultiSelectCheckboxes />
          </Example>
        </Card>
      </Section>

      <Section
        title="Typeahead (filterable)"
        description="The typeahead pattern uses MenuToggle.variant='typeahead' + a TextInputGroup-based toggle and a filtered SelectOption list. Wiring is verbose but the pattern is well-established — see PF's SelectTypeahead canonical example for the full state-machine."
      >
        <Card>
          <div style={{ padding: 24 }}>
            <CodeBlock>{`// Typeahead Select skeleton (state management abbreviated):
const [inputValue, setInputValue] = useState("");
const filtered = options.filter(o => o.children.toLowerCase().includes(inputValue.toLowerCase()));

<Select
  isOpen={isOpen}
  selected={selected}
  onSelect={(_e, v) => { setSelected(String(v)); setInputValue(String(v)); setIsOpen(false); }}
  onOpenChange={setIsOpen}
  toggle={(toggleRef) => (
    <MenuToggle
      ref={toggleRef}
      variant="typeahead"
      onClick={() => setIsOpen(true)}
      isExpanded={isOpen}
      isFullWidth
    >
      <TextInputGroup isPlain>
        <TextInputGroupMain
          value={inputValue}
          onChange={(_, v) => { setInputValue(v); setIsOpen(true); }}
          aria-label="Type to filter"
        />
      </TextInputGroup>
    </MenuToggle>
  )}
>
  <SelectList>
    {filtered.length === 0
      ? <SelectOption isAriaDisabled>No results</SelectOption>
      : filtered.map(o => (
          <SelectOption key={o.value} value={o.value}>{o.children}</SelectOption>
        ))
    }
  </SelectList>
</Select>`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example source={selectExampleSrc} fileName="Select.example.tsx" />
        </Card>
      </Section>

      <Section title="Composition">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "Select", type: "container", description: "Wrapper. Owns isOpen, selected, onSelect, onOpenChange, popperProps." },
                { name: "SelectList", type: "child", description: "The options list. Direct child of Select (or SelectGroup)." },
                { name: "SelectOption", type: "child", description: "A single choice. value identifies it; hasCheckbox + isSelected for multi-select rows; description for sub-label; isAriaDisabled + tooltipProps for inline disable explanations." },
                { name: "SelectGroup", type: "child", description: "Titled section of options — pair with Divider between groups." },
                { name: "MenuToggle (passed to toggle prop)", type: "child", description: "The trigger. Use a fixed width so the trigger doesn't resize as the user picks different-length options." },
              ]}
            />
          </div>
        </Card>
      </Section>

      <ConfigurationSection
        importStatement={'import { Select, SelectList, SelectOption, SelectGroup, MenuToggle } from "@golden-passport/ds-patternfly";'}
        componentSource={selectComponentSrc}
        componentFileName="Select.tsx"
        rows={[
          { name: "isOpen", type: "boolean", description: "Open / closed state. Controlled." },
          { name: "selected", type: "any | any[]", description: "Selected value (single) or array (multi). Drives the option's isSelected styling." },
          { name: "onSelect", type: "(event, value) => void", description: "Fires when an option is activated." },
          { name: "onOpenChange", type: "(isOpen) => void", description: "Fires when the menu opens or closes (Escape, outside click, single-select selection)." },
          { name: "shouldFocusToggleOnSelect", type: "boolean", description: "Return focus to the trigger after selection — recommended for single-select." },
          { name: "toggle", type: "(toggleRef) => ReactNode", description: "Render-prop for the trigger." },
          { name: "popperProps", type: "PopperProps", description: "Placement / max-height / appendTo overrides." },
          { name: "shouldPreventScrollOnItemFocus", type: "boolean", description: "Disable auto-scroll-into-view when keyboard-navigating items in long lists." },
        ]}
      />

      <Section title="Select vs Dropdown vs FormSelect">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Select</strong> — picker with rich options (descriptions, icons, groups, multi, typeahead). Use whenever a value picker needs more than basic <code>&lt;select&gt;</code> semantics.</li>
            <li><strong>FormSelect</strong> — thin wrapper around the native <code>&lt;select&gt;</code>. Use for simple value pickers in dense forms where a native picker is faster on mobile and more familiar.</li>
            <li><strong>Dropdown</strong> — menu of actions, not values. Trigger label stays static; each item does something.</li>
          </ul>
        </Card>
      </Section>

      <Section title="Accessibility">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Toggle label = current selection</strong> for single-select — screen readers announce the value when focus lands on the trigger.</li>
            <li><strong>Multi-select toggle should reflect the count</strong> via badge or label (&ldquo;Filter (3)&rdquo;) so keyboard users know something is applied without opening the menu.</li>
            <li><strong>Always wire onOpenChange</strong> — without it Escape / outside click won&rsquo;t update state.</li>
            <li><strong>Use isAriaDisabled + tooltipProps</strong> for unavailable options — tells the user why instead of hiding them.</li>
          </ul>
        </Card>
      </Section>
      <ThemingPointer
        dials={[
          ["--gp-control-pad-y", "Trigger vertical padding — drives trigger height."],
          ["--gp-radius-control", "Trigger + popup corner radius."],
          ["--gp-surface-elevated", "Open menu background."],
          ["--gp-shadow-popover", "Menu drop shadow."],
          ["--gp-focus-ring", "Focus-ring colour."],
        ]}
      />
    </FoundationPage>
  ),
};
