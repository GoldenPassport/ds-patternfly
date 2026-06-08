import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Radio } from "@patternfly/react-core";
import { FoundationPage, Section, Card, CodeBlock, ThemingPointer } from "../../../components/StoryKit.js";
import { DemoFrame, PropsTable } from "../../../components/DemoKit.js";

const meta: Meta = {
  title: "Components/Forms/Radio",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => {
    const [choice, setChoice] = useState("standard");
    return (
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
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <DemoFrame>
                <fieldset style={{ border: "none", margin: 0, padding: 0 }}>
                  <legend style={{ padding: 0, marginBottom: 8, color: "var(--gp-color-text-regular)" }}>
                    Plan
                  </legend>
                  <div style={{ display: "grid", gap: 8 }}>
                    {[
                      { id: "free", label: "Free", description: "Up to 3 projects." },
                      { id: "standard", label: "Standard", description: "Unlimited projects, email support." },
                      { id: "enterprise", label: "Enterprise", description: "SSO, SLA, dedicated support." },
                    ].map((opt) => (
                      <Radio
                        key={opt.id}
                        id={opt.id}
                        name="plan"
                        label={opt.label}
                        description={opt.description}
                        isChecked={choice === opt.id}
                        onChange={(_, v) => v && setChoice(opt.id)}
                      />
                    ))}
                  </div>
                </fieldset>
              </DemoFrame>
              <CodeBlock>{`<fieldset>
  <legend>Plan</legend>
  {options.map(opt => (
    <Radio
      key={opt.id}
      id={opt.id}
      name="plan"
      label={opt.label}
      isChecked={choice === opt.id}
      onChange={(_, v) => v && setChoice(opt.id)}
    />
  ))}
</fieldset>`}</CodeBlock>
            </div>
          </Card>
        </Section>

        <Section title="Most-used props">
          <Card>
            <div style={{ padding: 24 }}>
              <PropsTable
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
            </div>
          </Card>
        </Section>

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
    );
  },
};
