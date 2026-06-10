import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { FormGroup, FormSelect, FormSelectOption } from "@golden-passport/ds-patternfly";
import { FoundationPage, Section, Card, CodeBlock, ThemingPointer } from "../../_kit/StoryKit.js";
import { DemoFrame, PropsTable } from "../../_kit/DemoKit.js";

const meta: Meta = {
  title: "Components/Forms/FormSelect",
  parameters: { layout: "padded" },
};
export default meta;

const REGIONS: { value: string; label: string; isPlaceholder?: boolean }[] = [
  { value: "", label: "Select a region", isPlaceholder: true },
  { value: "us-east-1", label: "US East (N. Virginia)" },
  { value: "us-west-2", label: "US West (Oregon)" },
  { value: "eu-west-1", label: "EU (Ireland)" },
  { value: "ap-southeast-2", label: "Asia Pacific (Sydney)" },
];

export const Overview: StoryObj = {
  render: () => {
    const [region, setRegion] = useState("");
    return (
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
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <DemoFrame>
                <FormGroup label="Region" fieldId="region" isRequired>
                  <FormSelect
                    id="region"
                    value={region}
                    onChange={(_, v) => setRegion(v)}
                    aria-label="Region"
                  >
                    {REGIONS.map((r) => {
                      const opt: {
                        value: string;
                        label: string;
                        isPlaceholder?: boolean;
                      } = { value: r.value, label: r.label };
                      if (r.isPlaceholder) opt.isPlaceholder = true;
                      return (
                        <FormSelectOption
                          key={r.value || "placeholder"}
                          {...opt}
                        />
                      );
                    })}
                  </FormSelect>
                </FormGroup>
              </DemoFrame>
              <CodeBlock>{`<FormGroup label="Region" fieldId="region" isRequired>
  <FormSelect id="region" value={region} onChange={(_, v) => setRegion(v)}>
    <FormSelectOption value="" label="Select a region" isPlaceholder />
    <FormSelectOption value="us-east-1" label="US East (N. Virginia)" />
    <FormSelectOption value="eu-west-1" label="EU (Ireland)" />
  </FormSelect>
</FormGroup>`}</CodeBlock>
            </div>
          </Card>
        </Section>

        <Section title="Most-used props">
          <Card>
            <div style={{ padding: 24 }}>
              <PropsTable
                rows={[
                  { name: "id", type: "string", description: "Required." },
                  { name: "value", type: "string", description: "Controlled value matching one of the option values." },
                  { name: "onChange", type: "(event, value: string) => void", description: "Event first, value second." },
                  { name: "validated", type: '"default" | "success" | "warning" | "error"', description: "Visual state." },
                  { name: "isDisabled", type: "boolean", description: "Removes from tab order." },
                ]}
              />
              <p style={{ marginTop: 16, marginBottom: 0, color: "var(--gp-color-text-subtle)", fontSize: 14 }}>
                <code>FormSelectOption</code> takes <code>value</code>, <code>label</code>, <code>isDisabled</code>, and <code>isPlaceholder</code> (renders the option but disables submit when selected).
              </p>
            </div>
          </Card>
        </Section>

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
    );
  },
};
