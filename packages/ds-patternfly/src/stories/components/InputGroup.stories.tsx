import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  FoundationPage,
  Section,
  Card,
  Example,
  ThemingPointer,
} from "../_kit/StoryKit.js";
import { PropsTable } from "../_kit/DemoKit.js";
import {
  Basic,
  SearchWithScope,
  ShowHidePassword,
  NumberWithUnitAndCopy,
  Disabled,
} from "../../examples/components/InputGroup.example.js";
import inputGroupExampleSrc from "../../examples/components/InputGroup.example.tsx?raw";

const meta: Meta = {
  title: "Components/Forms/InputGroup",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="InputGroup"
      intro={
        <>
          A horizontal cluster of inputs and add-ons that read as a single
          control — username with @-prefix, search with scope picker,
          URL with copy button. Use it whenever a field needs an
          adjacent label, unit, action, or related control. For
          multi-row layouts, use <code>Form</code> instead.
        </>
      }
    >
      <Section
        title="Basic"
        description="InputGroup → InputGroupItem → TextInput. Wrap each interactive child in InputGroupItem so PF6 spacing and rounded corners apply correctly."
      >
        <Card>
          <Example
            source={inputGroupExampleSrc}
            region="Basic"
            fileName="InputGroup.example.tsx"
          >
            <Basic />
          </Example>
        </Card>
      </Section>

      <Section
        title="Search with scope"
        description="A FormSelect inside an InputGroupItem narrows the search before the user types — common pattern in admin UIs."
      >
        <Card>
          <Example
            source={inputGroupExampleSrc}
            region="SearchWithScope"
            fileName="InputGroup.example.tsx"
          >
            <SearchWithScope />
          </Example>
        </Card>
      </Section>

      <Section
        title="Show / hide password"
        description="A toggle button inside the group reveals the password without leaving the field."
      >
        <Card>
          <Example
            source={inputGroupExampleSrc}
            region="ShowHidePassword"
            fileName="InputGroup.example.tsx"
          >
            <ShowHidePassword />
          </Example>
        </Card>
      </Section>

      <Section
        title="Number with unit + copy"
        description="NumberInput (with native − / + steppers) led by a combined currency prefix ('US$' — locale + symbol in one chip) and trailed by a copy button. NumberInput is the right primitive whenever the value is numeric — the steppers give touch users a no-typing path, and screen readers announce the value via the inputAriaLabel."
      >
        <Card>
          <Example
            source={inputGroupExampleSrc}
            region="NumberWithUnitAndCopy"
            fileName="InputGroup.example.tsx"
          >
            <NumberWithUnitAndCopy />
          </Example>
        </Card>
      </Section>

      <Section
        title="Disabled"
        description="Set isDisabled on each InputGroupItem (and the inner control) to grey the whole cluster."
      >
        <Card>
          <Example
            source={inputGroupExampleSrc}
            region="Disabled"
            fileName="InputGroup.example.tsx"
          >
            <Disabled />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example source={inputGroupExampleSrc} fileName="InputGroup.example.tsx" />
        </Card>
      </Section>

      <Section title="Composition">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "InputGroup", type: "container", description: "Outer wrapper. Renders a flex row with consistent border-radius across children." },
                { name: "InputGroupItem", type: "child", description: "Wraps each interactive control (TextInput, Button, FormSelect). Use isFill on the input you want to expand." },
                { name: "InputGroupText", type: "child", description: "Static add-on (icon, prefix label, unit). Renders a span by default; pass component='label' to associate it with an input id." },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section title="Most-used InputGroupItem props">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "isFill", type: "boolean", description: "Expand to fill the remaining horizontal space. Set on the primary input — typically one per group." },
                { name: "isPlain", type: "boolean", description: "Strip the inset border / chrome. Useful for icon buttons that should sit flush." },
                { name: "isBox", type: "boolean", description: "Add a border around the item. Pair with custom embeds that don't supply their own chrome." },
                { name: "isDisabled", type: "boolean", description: "Visually disable the item. Still set isDisabled / isAriaDisabled on the inner control too." },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section title="Most-used InputGroupText props">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "component", type: '"span" | "label" (default span)', description: "When the text labels an adjacent input, render it as a label and tie it via htmlFor." },
                { name: "isPlain", type: "boolean", description: "Drop the background fill — use when the add-on is a pure icon and the box would feel heavy." },
                { name: "isDisabled", type: "boolean", description: "Match the disabled visual when the rest of the group is disabled." },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section title="Accessibility">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Every input still needs an accessible name.</strong> InputGroup doesn&rsquo;t auto-label children — give the inner <code>TextInput</code> its own <code>aria-label</code> or pair it with a <code>FormGroup</code> + <code>label</code>.</li>
            <li><strong>Icon-only control buttons need aria-label.</strong> Search, copy, show/hide — every one of those <code>variant=&quot;control&quot;</code> buttons needs a name screen readers can read.</li>
            <li><strong>Use <code>InputGroupText component=&quot;label&quot;</code></strong> when the add-on text is a real label (e.g. unit prefix). The text becomes clickable and focuses the input — improves pointer ergonomics too.</li>
            <li><strong>Disabled state needs both flags.</strong> Setting <code>isDisabled</code> on the wrapper alone keeps the input keyboard-reachable. Pass <code>isDisabled</code> on the underlying <code>TextInput</code> / <code>Button</code> as well.</li>
          </ul>
        </Card>
      </Section>
      <ThemingPointer
        dials={[
          ["--gp-control-pad-y", "Drives item height across the whole group."],
          ["--gp-radius-control", "End-cap corner radius."],
          ["--gp-border-default", "Resting border colour."],
          ["--gp-focus-ring", "Focus-ring colour."],
        ]}
      />
    </FoundationPage>
  ),
};
