import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  FoundationPage,
  Section,
  Card as DocCard,
  ConfigurationSection,
  Example,
  ThemingPointer,
} from "../_kit/StoryKit.js";
import { PropsTable } from "../_kit/DemoKit.js";
import {
  Basic,
  WithHeaderActions,
  Modifiers,
  SingleSelectGallery,
  MultiSelect,
  Expandable,
} from "../../examples/components/Card.example.js";
import cardExampleSrc from "../../examples/components/Card.example.tsx?raw";
import cardComponentSrc from "../../components/base/Card.tsx?raw";

const meta: Meta = {
  title: "Components/Card",
  parameters: {
    layout: "padded",
    a11y: {
      config: {
        // Selectable Cards layer an absolutely-positioned input over the
        // surface, and PF6's primary buttons render their bg as a gradient
        // — both confuse axe's contrast resolver ("bg could not be
        // determined because it is overlapped by another element" /
        // "background gradient"). The actual brand-token contrast is
        // validated by tokens.test.ts.
        rules: [{ id: "color-contrast", enabled: false }],
      },
    },
  },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Card"
      intro={
        <>
          The workhorse content tile — header, body, footer, optional
          actions / selection / expansion. Use cards for at-a-glance summary
          tiles (dashboards, gallery views), grouped settings panels, and
          anywhere a piece of content needs its own surface.
        </>
      }
    >
      <Section title="Basic">
        <DocCard>
          <Example
            source={cardExampleSrc}
            region="Basic"
            fileName="Card.example.tsx"
          >
            <Basic />
          </Example>
        </DocCard>
      </Section>

      <Section
        title="With header, subtitle, actions"
        description="CardHeader pairs the title with a slot for trailing actions (kebab menu, checkbox, button). CardTitle.subtitle adds a quieter second line under the title."
      >
        <DocCard>
          <Example
            source={cardExampleSrc}
            region="WithHeaderActions"
            fileName="Card.example.tsx"
          >
            <WithHeaderActions />
          </Example>
        </DocCard>
      </Section>

      <Section
        title="Modifiers — compact / large / plain / full-height"
        description="Single-flag modifiers tune the card's chrome. isCompact tightens padding; isLarge expands it; isPlain strips the bg + border (use for cards that sit on a coloured surface); isFullHeight stretches to fill its grid track."
      >
        <DocCard>
          <Example
            source={cardExampleSrc}
            region="Modifiers"
            fileName="Card.example.tsx"
          >
            <Modifiers />
          </Example>
        </DocCard>
      </Section>

      <Section
        title="Single-select gallery (radio behaviour)"
        description="The SelectableCard lego block owns the selectableActions + id / aria plumbing. Give every card the same name to form one radio group and track the chosen id in the parent."
      >
        <DocCard>
          <Example
            source={cardExampleSrc}
            region="SingleSelectGallery"
            fileName="Card.example.tsx"
          >
            <SingleSelectGallery />
          </Example>
        </DocCard>
      </Section>

      <Section
        title="Multi-select"
        description="Pass selectionVariant='multiple' and each SelectableCard becomes an independent checkbox. Use for bulk-action gallery views."
      >
        <DocCard>
          <Example
            source={cardExampleSrc}
            region="MultiSelect"
            fileName="Card.example.tsx"
          >
            <MultiSelect />
          </Example>
        </DocCard>
      </Section>

      <Section
        title="Expandable"
        description="The ExpandableCard lego block collapses the body + footer behind a disclosure toggle. It owns the expand state (controlled or uncontrolled) and the toggle's aria wiring; you pass title, content, and an optional footer."
      >
        <DocCard>
          <Example
            source={cardExampleSrc}
            region="Expandable"
            fileName="Card.example.tsx"
          >
            <Expandable />
          </Example>
        </DocCard>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <DocCard>
          <Example source={cardExampleSrc} fileName="Card.example.tsx" />
        </DocCard>
      </Section>

      <Section title="Composition">
        <DocCard>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "Card", type: "container", description: "Outer wrapper. Owns variant, modifiers, selection / expansion / disabled state." },
                { name: "CardHeader", type: "child", description: "Top slot. actions={{ actions, hasNoOffset }} for trailing controls; selectableActions for radio / checkbox; onExpand + toggleButtonProps for expandable cards." },
                { name: "CardTitle", type: "child", description: "Visible title. subtitle prop adds a quieter second line." },
                { name: "CardBody", type: "child", description: "Main content area. Multiple bodies allowed — they get stacked with internal dividers." },
                { name: "CardFooter", type: "child", description: "Trailing slot — primary action / metadata." },
                { name: "CardExpandableContent", type: "child", description: "Wrap CardBody + CardFooter inside this when the Card is expandable." },
              ]}
            />
          </div>
        </DocCard>
      </Section>

      <ConfigurationSection
        importStatement={'import { Card, CardHeader, CardTitle, CardBody, CardFooter, CardExpandableContent } from "@golden-passport/ds-patternfly";'}
        componentSource={cardComponentSrc}
        componentFileName="Card.tsx"
        rows={[
          { name: "variant", type: '"default" | "secondary"', description: "Default surface or the secondary alt-surface (subtler, for cards on a default-bg page)." },
          { name: "isCompact", type: "boolean", description: "Tighter internal padding." },
          { name: "isLarge", type: "boolean", description: "Roomier padding for hero / dashboard tiles." },
          { name: "isPlain", type: "boolean", description: "No bg, no border — sits flush. Use for cards on a coloured surface." },
          { name: "isFullHeight", type: "boolean", description: "Stretch to fill the grid cell. Pair with Gallery / Grid layouts." },
          { name: "isClickable", type: "boolean", description: "Whole card becomes a clickable surface — hover affordance, role=button via selectableActions." },
          { name: "isSelectable", type: "boolean", description: "Card carries selection state. Pair with isSelected and selectableActions on CardHeader." },
          { name: "isSelected", type: "boolean", description: "Selected state for selectable cards." },
          { name: "isClicked", type: "boolean", description: "Active / pressed visual state for clickable cards." },
          { name: "isDisabled", type: "boolean", description: "Greyed out and non-interactive." },
          { name: "isExpanded", type: "boolean", description: "Open / closed state for expandable cards. Pair with CardHeader.onExpand and CardExpandableContent." },
          { name: "ouiaId", type: "string", description: "Stable test selector." },
        ]}
      />

      <Section
        title="SelectableCard & ExpandableCard — DS lego blocks"
        description="import { SelectableCard, ExpandableCard } from '@golden-passport/ds-patternfly'. The selectable + expandable demos above route through these; the base Card composition table is for the simpler variants."
      >
        <DocCard>
          <div style={{ padding: 24, display: "grid", gap: 24 }}>
            <PropsTable
              rows={[
                { name: "SelectableCard.title / children", type: "ReactNode", description: "Card heading and body." },
                { name: "SelectableCard.isSelected / onChange", type: "boolean / (checked) => void", description: "Controlled selection. You hold the state; the block wires the input." },
                { name: "SelectableCard.selectionVariant", type: '"single" | "multiple"', description: 'Radio (default) or independent checkbox.' },
                { name: "SelectableCard.name", type: "string", description: "Radio group name — single-select cards in one group MUST share it. Defaults to a generated id." },
                { name: "ExpandableCard.title / children / footer", type: "ReactNode", description: "Always-visible heading, revealed content, optional footer." },
                { name: "ExpandableCard.defaultExpanded / isExpanded / onExpandedChange", type: "boolean / boolean / (e) => void", description: "Uncontrolled or controlled expand state." },
                { name: "ExpandableCard.toggleAriaLabel", type: "string", description: 'Accessible label for the toggle (default "Details").' },
              ]}
            />
          </div>
        </DocCard>
      </Section>

      <Section title="Accessibility">
        <DocCard>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Selection a11y is handled for you</strong> — SelectableCard wires the Card <code>id</code>, the input, and <code>selectableActionAriaLabelledby</code>; the input takes its name from the title.</li>
            <li><strong>Expand a11y is handled for you</strong> — ExpandableCard wires the toggle <code>id</code> + <code>aria-label</code> + <code>aria-labelledby</code> + <code>aria-expanded</code>.</li>
            <li><strong>Don&rsquo;t make a single card both <code>isClickable</code> AND interactive inside</strong> — wrap interactive children carefully so they don&rsquo;t steal the click target.</li>
            <li><strong>Keep titles short.</strong> Selectable card grids announce the title via the input label — a wall of text becomes unusable.</li>
          </ul>
        </DocCard>
      </Section>
      <ThemingPointer
        dials={[
          ["--gp-pad-card", "Inside padding (block + inline)."],
          ["--gp-radius-card", "Corner radius (also covers Modal box)."],
          ["--gp-shadow-card", "Resting elevation."],
          ["--gp-surface-card", "Background colour (light + dark pair)."],
        ]}
      />
    </FoundationPage>
  ),
};
