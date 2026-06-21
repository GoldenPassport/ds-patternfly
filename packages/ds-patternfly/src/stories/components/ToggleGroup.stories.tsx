import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  FoundationPage,
  Section,
  Card,
  ConfigurationSection,
  Example,
  ThemingPointer,
} from "../_kit/StoryKit.js";
import {
  SingleSelect,
  MultiSelect,
  WithIcons,
  Compact,
} from "../../examples/components/ToggleGroup.example.js";
import toggleGroupExampleSrc from "../../examples/components/ToggleGroup.example.tsx?raw";
import selectableToggleGroupComponentSrc from "../../components/ds/SelectableToggleGroup.tsx?raw";

const meta: Meta = {
  title: "Components/Forms/ToggleGroup",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="ToggleGroup"
      intro={
        <>
          A pill-shaped row of mutually-exclusive (or independently
          toggleable) options — the canonical view-switcher / inline
          radio. Use for view-mode toggles (list / grid / table), filter
          modes, and small sets of related boolean settings.
        </>
      }
    >
      <Section
        title="Single-select"
        description="Track one selected id; clicking a different item replaces the selection. Allow toggling the active one off too if your UX wants 'no selection' to be valid."
      >
        <Card>
          <Example
            source={toggleGroupExampleSrc}
            region="SingleSelect"
            fileName="ToggleGroup.example.tsx"
          >
            <SingleSelect />
          </Example>
        </Card>
      </Section>

      <Section
        title="Multi-select"
        description="Track an array of selected ids; each item toggles independently. Use for inline boolean settings clusters."
      >
        <Card>
          <Example
            source={toggleGroupExampleSrc}
            region="MultiSelect"
            fileName="ToggleGroup.example.tsx"
          >
            <MultiSelect />
          </Example>
        </Card>
      </Section>

      <Section
        title="With icons"
        description="ToggleGroupItem.icon adds a leading glyph; pair with text or use icon-only (with aria-label) for compact view-switchers."
      >
        <Card>
          <Example
            source={toggleGroupExampleSrc}
            region="WithIcons"
            fileName="ToggleGroup.example.tsx"
          >
            <WithIcons />
          </Example>
        </Card>
      </Section>

      <Section
        title="Compact"
        description="isCompact tightens padding — use inside Toolbars and dense settings panels."
      >
        <Card>
          <Example
            source={toggleGroupExampleSrc}
            region="Compact"
            fileName="ToggleGroup.example.tsx"
          >
            <Compact />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example
            source={toggleGroupExampleSrc}
            fileName="ToggleGroup.example.tsx"
          />
        </Card>
      </Section>

      <ConfigurationSection
        importStatement={'import { SelectableToggleGroup, type ToggleOption } from "@golden-passport/ds-patternfly";'}
        componentSource={selectableToggleGroupComponentSrc}
        componentFileName="SelectableToggleGroup.tsx"
        description="SelectableToggleGroup owns the per-item id wiring and the single- vs multi-select state transitions. You pass items and the controlled value / onChange; the value type follows selectionMode."
        rows={[
          { name: "items", type: "ToggleOption[]", description: "Options: { id, text?, icon?, ariaLabel?, isDisabled? }. Use ariaLabel for icon-only options." },
          { name: "ariaLabel", type: "string", description: "Required — names the group as a region." },
          { name: "selectionMode", type: '"single" | "multiple"', description: 'Default "single" (one active id, or none). "multiple" toggles each option independently.' },
          { name: "value", type: 'string | string[]', description: 'Controlled selection. string ("" = none) in single mode; string[] in multiple mode.' },
          { name: "onChange", type: '(value: string | string[]) => void', description: "Fires with the next selection; signature follows selectionMode." },
          { name: "allowDeselect", type: "boolean", description: 'Single mode only — clicking the active option clears it (default true).' },
          { name: "isCompact", type: "boolean", description: "Tighter pill sizing for toolbars / dense panels." },
        ]}
      />

      <Section title="When to use">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>View-mode switchers</strong> — list / grid / table icons in toolbars.</li>
            <li><strong>Inline radio replacements</strong> — small sets (2–4) of mutually exclusive options when a stacked Radio group would be too tall.</li>
            <li><strong>Boolean cluster settings</strong> — &ldquo;Wrap / Minimap / Line numbers&rdquo; in editor toolbars.</li>
            <li><strong>Don&rsquo;t use for large lists</strong> — once you exceed 4–5 items, use Tabs (mutually exclusive views) or Checkbox group (multiple booleans).</li>
          </ul>
        </Card>
      </Section>

      <Section title="Accessibility">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>aria-label is required on the group</strong> — names the cluster as a region.</li>
            <li><strong>Icon-only items need aria-label per item</strong> — the icon alone doesn&rsquo;t announce.</li>
            <li><strong>Per-item DOM ids are handled for you</strong> — SelectableToggleGroup derives a unique buttonId from each option&rsquo;s id.</li>
            <li><strong>Keyboard:</strong> Tab between items, Space / Enter to toggle.</li>
          </ul>
        </Card>
      </Section>
      <ThemingPointer
        dials={[
          ["--gp-control-pad-y", "Item vertical padding."],
          ["--gp-control-pad-x", "Item horizontal padding."],
          ["--gp-radius-control", "Outer group + end-item corner radius."],
          ["--gp-border-default", "Group border colour."],
        ]}
      />
    </FoundationPage>
  ),
};
