import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  FoundationPage,
  Section,
  Card,
  ConfigurationSection,
  Example,
  ThemingPointer,
} from "../../_kit/StoryKit.js";
import {
  States,
  WithDescription,
  MultiSelectGroup,
} from "../../../examples/components/Forms/Checkbox.example.js";
import checkboxExampleSrc from "../../../examples/components/Forms/Checkbox.example.tsx?raw";
import checkboxComponentSrc from "../../../components/base/Checkbox.tsx?raw";

const meta: Meta = {
  title: "Components/Forms/Checkbox",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Checkbox"
      intro={
        <>
          A two- or three-state boolean control. Use checkboxes for
          independent on/off choices, multi-select lists, and
          indeterminate parent-of-children selections (e.g. &quot;select all&quot;).
        </>
      }
    >
      <Section title="States">
        <Card>
          <Example
            source={checkboxExampleSrc}
            region="States"
            fileName="Checkbox.example.tsx"
          >
            <States />
          </Example>
        </Card>
      </Section>

      <Section title="With description and body">
        <Card>
          <Example
            source={checkboxExampleSrc}
            region="WithDescription"
            fileName="Checkbox.example.tsx"
          >
            <WithDescription />
          </Example>
        </Card>
      </Section>

      <Section title="Multi-select group">
        <Card>
          <Example
            source={checkboxExampleSrc}
            region="MultiSelectGroup"
            fileName="Checkbox.example.tsx"
          >
            <MultiSelectGroup />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example source={checkboxExampleSrc} fileName="Checkbox.example.tsx" />
        </Card>
      </Section>

      <ConfigurationSection
        importStatement={'import { Checkbox } from "@golden-passport/ds-patternfly";'}
        componentSource={checkboxComponentSrc}
        componentFileName="Checkbox.tsx"
        rows={[
          { name: "id", type: "string", description: "Required. Unique id — also used as the input's name attribute by default." },
          { name: "label", type: "ReactNode", description: "Visible label text. Always provide one — empty checkboxes are an a11y violation." },
          { name: "isChecked", type: "boolean | null", description: "true / false / null (indeterminate). Controlled — pair with onChange." },
          { name: "onChange", type: "(event, value: boolean) => void", description: "Note the argument order — event first, then the new boolean value." },
          { name: "isDisabled", type: "boolean", description: "Removes the input from the tab order." },
          { name: "description", type: "ReactNode", description: "Subdued text below the label — for one-line context." },
          { name: "body", type: "ReactNode", description: "Content rendered when checked — usually nested inputs that depend on this checkbox." },
        ]}
      />

      <Section title="Accessibility">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Always wrap groups in a fieldset + legend.</strong> The legend names the group for screen reader users — without it, each checkbox is announced in isolation.</li>
            <li><strong>Indeterminate is for parents only.</strong> Don&apos;t use null state for &quot;unset&quot; or &quot;don&apos;t care&quot; — use a separate Radio group for that.</li>
            <li><strong>Keyboard:</strong> Tab to focus, Space to toggle. Arrow keys do not move between checkboxes (unlike radios).</li>
          </ul>
        </Card>
      </Section>

      <Section title="Checkbox vs Switch">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Checkbox</strong> — apply when the form is submitted. Multiple selections in a group.</li>
            <li><strong>Switch</strong> — apply on toggle. Single, independent setting.</li>
          </ul>
        </Card>
      </Section>

      <ThemingPointer
        dials={[
          ["--gp-radius-control", "Checkbox box corner radius."],
          ["--gp-border-default", "Resting box border."],
          ["--gp-focus-ring", "Focus-ring colour."],
          ["--gp-opacity-disabled", "Disabled-state opacity."],
        ]}
      />

    </FoundationPage>
  ),
};
