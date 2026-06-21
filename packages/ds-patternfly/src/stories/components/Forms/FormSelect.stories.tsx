import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  FoundationPage,
  Section,
  Card,
  ConfigurationSection,
  Example,
  ThemingPointer,
} from "../../_kit/StoryKit.js";
import { Basic } from "../../../examples/components/Forms/FormSelect.example.js";
import formSelectExampleSrc from "../../../examples/components/Forms/FormSelect.example.tsx?raw";
import formSelectComponentSrc from "../../../components/base/FormSelect.tsx?raw";
import {
  Grouped as DropdownGrouped,
  WithDescriptions as DropdownWithDescriptions,
  KebabToggle as DropdownKebab,
} from "../../../examples/components/Menu/Dropdown.example.js";
import dropdownExampleSrc from "../../../examples/components/Menu/Dropdown.example.tsx?raw";

const meta: Meta = {
  title: "Components/Forms/FormSelect",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="FormSelect"
      intro={
        <>
          A native HTML <code>&lt;select&gt;</code> with PatternFly styling.
          Use it for 5–20 known options where users don&apos;t need search.
          For longer or unfamiliar lists, use the typeahead-capable Select
          (Components/Menus/Select).
        </>
      }
    >
      <Section title="Basic">
        <Card>
          <Example
            source={formSelectExampleSrc}
            region="Basic"
            fileName="FormSelect.example.tsx"
          >
            <Basic />
          </Example>
        </Card>
      </Section>

      <Section
        title="Advanced — Dropdown"
        description="When you need more than a flat native list — grouped options, per-item descriptions, custom triggers (kebab), icons, disabled-with-tooltip — drop to the Dropdown component (Components/Menus/Dropdown). It renders a JS menu you fully control, at the cost of the native a11y FormSelect gives for free. For value selection with search / multi-select, use Select instead."
      >
        <Card>
          <Example
            source={dropdownExampleSrc}
            region="Grouped"
            fileName="Dropdown.example.tsx"
          >
            <DropdownGrouped />
          </Example>
        </Card>
        <Card>
          <Example
            source={dropdownExampleSrc}
            region="WithDescriptions"
            fileName="Dropdown.example.tsx"
          >
            <DropdownWithDescriptions />
          </Example>
        </Card>
        <Card>
          <Example
            source={dropdownExampleSrc}
            region="KebabToggle"
            fileName="Dropdown.example.tsx"
          >
            <DropdownKebab />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example source={formSelectExampleSrc} fileName="FormSelect.example.tsx" />
        </Card>
      </Section>

      <ConfigurationSection
        importStatement={'import { FormSelect, FormSelectOption } from "@golden-passport/ds-patternfly";'}
        componentSource={formSelectComponentSrc}
        componentFileName="FormSelect.tsx"
        description={
          <>
            How to import the component and every prop it accepts. Required
            props are marked with *. <code>FormSelectOption</code> takes{" "}
            <code>value</code>, <code>label</code>, <code>isDisabled</code>, and{" "}
            <code>isPlaceholder</code> (renders the option but disables submit
            when selected).
          </>
        }
        rows={[
          { name: "id", type: "string", description: "Required." },
          { name: "value", type: "string", description: "Controlled value matching one of the option values." },
          { name: "onChange", type: "(event, value: string) => void", description: "Event first, value second." },
          { name: "validated", type: '"default" | "success" | "warning" | "error"', description: "Visual state." },
          { name: "isDisabled", type: "boolean", description: "Removes from tab order." },
        ]}
      />

      <Section title="Accessibility">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>It&apos;s a real native &lt;select&gt;.</strong> That&apos;s the point — full keyboard support, OS-native dropdown, screen reader works without extra wiring.</li>
            <li><strong>Use isPlaceholder for the &quot;please choose&quot; option</strong> on required fields. Browsers won&apos;t accept submit while a placeholder is selected.</li>
            <li><strong>Don&apos;t style the dropdown panel.</strong> The dropdown is rendered by the OS — your CSS doesn&apos;t reach it. If you need custom rendering, switch to Select.</li>
          </ul>
        </Card>
      </Section>

      <Section title="FormSelect vs Select">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>FormSelect</strong> — native HTML, no JS dropdown, no search. Best a11y, smallest bundle, OS-native UX.</li>
            <li><strong>Select (Components/Menus/Select)</strong> — typeahead, multi-select, custom option rendering, async loading. Bigger surface area; reach for it when FormSelect can&apos;t express what you need.</li>
          </ul>
        </Card>
      </Section>

      <ThemingPointer
        dials={[
          ["--gp-control-pad-y", "Vertical padding — drives field height."],
          ["--gp-radius-control", "Corner radius."],
          ["--gp-border-default", "Resting border colour."],
          ["--gp-focus-ring", "Focus-ring colour."],
        ]}
      />

    </FoundationPage>
  ),
};
