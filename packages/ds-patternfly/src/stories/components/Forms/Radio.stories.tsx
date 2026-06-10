import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  FoundationPage,
  Section,
  Card,
  ConfigurationSection,
  Example,
  ThemingPointer,
} from "../../_kit/StoryKit.js";
import { Group } from "../../../examples/components/Forms/Radio.example.js";
import radioExampleSrc from "../../../examples/components/Forms/Radio.example.tsx?raw";
import radioComponentSrc from "../../../components/Radio.tsx?raw";

const meta: Meta = {
  title: "Components/Forms/Radio",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Radio"
      intro={
        <>
          One selection from a small fixed list. Use radios when the user
          needs to see all options at once; for longer lists prefer
          FormSelect or Select.
        </>
      }
    >
      <Section title="Group">
        <Card>
          <Example
            source={radioExampleSrc}
            region="Group"
            fileName="Radio.example.tsx"
          >
            <Group />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example source={radioExampleSrc} fileName="Radio.example.tsx" />
        </Card>
      </Section>

      <ConfigurationSection
        importStatement={'import { Radio } from "@golden-passport/ds-patternfly";'}
        componentSource={radioComponentSrc}
        componentFileName="Radio.tsx"
        rows={[
          { name: "id", type: "string", description: "Required. Unique per radio." },
          { name: "name", type: "string", description: "Required. Same name across the group — that's how the browser knows they're mutually exclusive." },
          { name: "label", type: "ReactNode", description: "Visible label text." },
          { name: "isChecked", type: "boolean", description: "Controlled — only one radio in the group should be true." },
          { name: "onChange", type: "(event, value: boolean) => void", description: "Fires with true when the radio becomes selected." },
          { name: "description", type: "ReactNode", description: "Subdued line below the label, for context." },
          { name: "body", type: "ReactNode", description: "Content rendered when this radio is selected — usually dependent inputs." },
          { name: "isDisabled", type: "boolean", description: "Removes from tab order." },
        ]}
      />

      <Section title="Accessibility">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>fieldset + legend is required for groups.</strong> The legend names the group; without it, screen readers announce each radio in isolation.</li>
            <li><strong>Same name for all radios in the group.</strong> Different names = different groups, no exclusivity, no arrow-key navigation.</li>
            <li><strong>Keyboard:</strong> Tab focuses the group (lands on the selected one, or the first if none). Arrow keys move between radios within the group and select as they go.</li>
            <li><strong>Always have a default selection</strong> when the field is required. Unselected = no value submitted.</li>
          </ul>
        </Card>
      </Section>

      <Section title="When to use Radio vs Select">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Radio</strong> — 2–5 options, all worth seeing at once, comparison matters.</li>
            <li><strong>FormSelect</strong> — 5–20 options, choices are familiar.</li>
            <li><strong>Select (typeahead)</strong> — &gt;20 options or unfamiliar values where users need search.</li>
          </ul>
        </Card>
      </Section>

      <ThemingPointer
        dials={[
          ["--gp-border-default", "Resting circle border."],
          ["--gp-focus-ring", "Focus-ring colour."],
          ["--gp-opacity-disabled", "Disabled-state opacity."],
        ]}
      />

    </FoundationPage>
  ),
};
