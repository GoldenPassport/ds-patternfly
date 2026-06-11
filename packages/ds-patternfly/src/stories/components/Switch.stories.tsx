import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  FoundationPage,
  Section,
  Card,
  ConfigurationSection,
  Example,
  ThemingPointer,
} from "../_kit/StoryKit.js";
import { States } from "../../examples/components/Switch.example.js";
import switchExampleSrc from "../../examples/components/Switch.example.tsx?raw";
import switchComponentSrc from "../../components/Switch.tsx?raw";

const meta: Meta = {
  title: "Components/Forms/Switch",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Switch"
      intro={
        <>
          A boolean toggle that applies its change immediately — no submit
          button needed. Use a Switch when flipping the control should
          instantly take effect (notifications on/off, dark mode, feature
          flag). For boolean choices that wait for form submission, use a
          Checkbox.
        </>
      }
    >
      <Section title="States">
        <Card>
          <Example
            source={switchExampleSrc}
            region="States"
            fileName="Switch.example.tsx"
          >
            <States />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example source={switchExampleSrc} fileName="Switch.example.tsx" />
        </Card>
      </Section>

      <ConfigurationSection
        importStatement={'import { Switch } from "@golden-passport/ds-patternfly";'}
        componentSource={switchComponentSrc}
        componentFileName="Switch.tsx"
        rows={[
          { name: "id", type: "string", description: "Required." },
          { name: "label", type: "ReactNode", description: "Visible label, shown next to the toggle. Always required for a11y — there's no other accessible name source." },
          { name: "hasCheckIcon", type: "boolean", description: "Show a check icon inside the toggle when on. Useful when label-only on/off state isn't strong enough." },
          { name: "isChecked", type: "boolean", description: "Controlled. Pair with onChange." },
          { name: "onChange", type: "(event, value: boolean) => void", description: "Event first, value second." },
          { name: "isDisabled", type: "boolean", description: "Removes from tab order." },
          { name: "isReversed", type: "boolean", description: "Render the label on the left of the switch instead of the right." },
        ]}
      />

      <Section title="Accessibility">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Always provide a label.</strong> Switches without labels read as &quot;switch&quot; to AT — meaningless. Use the <code>label</code> prop, never just an icon.</li>
            <li><strong>Keyboard:</strong> Tab to focus, Space to toggle.</li>
            <li><strong>Announce instant changes.</strong> If toggling triggers a server save, surface success/failure via a live region or toast — silent network calls leave AT users uncertain whether the change took.</li>
          </ul>
        </Card>
      </Section>

      <Section title="Switch vs Checkbox">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Switch</strong> — applies immediately. Settings panels, feature flags, &quot;mark as done&quot;.</li>
            <li><strong>Checkbox</strong> — applies on form submit. Multi-select lists, terms agreement, opt-in choices.</li>
          </ul>
        </Card>
      </Section>

      <ThemingPointer
        dials={[
          ["--gp-radius-pill", "Track + thumb corner radius (Switch is a pill control)."],
          ["--gp-focus-ring", "Focus-ring colour."],
          ["--gp-opacity-disabled", "Disabled-state opacity."],
          ["--gp-motion-duration", "Toggle animation duration."],
        ]}
      />

    </FoundationPage>
  ),
};
