import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Checkbox } from "@patternfly/react-core";
import { FoundationPage, Section, Card, CodeBlock, ThemingPointer } from "../../_storyKit.js";
import { DemoFrame, PropsTable } from "../../../components/DemoKit.js";

const meta: Meta = {
  title: "Components/Forms/Checkbox",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => {
    const [checked, setChecked] = useState(true);
    const [a, setA] = useState(true);
    const [b, setB] = useState(false);

    return (
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
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <DemoFrame>
                <div style={{ display: "grid", gap: 12 }}>
                  <Checkbox id="cb-1" label="Default" isChecked={checked} onChange={(_, v) => setChecked(v)} />
                  <Checkbox id="cb-2" label="Disabled" isDisabled isChecked={false} onChange={() => {}} />
                  <Checkbox id="cb-3" label="Disabled + checked" isDisabled isChecked onChange={() => {}} />
                  <Checkbox
                    id="cb-4"
                    label="Indeterminate (parent of mixed children)"
                    isChecked={null}
                    onChange={() => {}}
                  />
                </div>
              </DemoFrame>
              <CodeBlock>{`<Checkbox
  id="terms"
  label="I agree to the terms"
  isChecked={agreed}
  onChange={(_, value) => setAgreed(value)}
/>`}</CodeBlock>
            </div>
          </Card>
        </Section>

        <Section title="With description and body">
          <Card>
            <div style={{ padding: 24 }}>
              <DemoFrame>
                <Checkbox
                  id="cb-5"
                  label="Send weekly summary"
                  description="A digest of activity from the last 7 days."
                  isChecked={a}
                  onChange={(_, v) => setA(v)}
                />
              </DemoFrame>
            </div>
          </Card>
        </Section>

        <Section title="Multi-select group">
          <Card>
            <div style={{ padding: 24 }}>
              <DemoFrame>
                <fieldset style={{ border: "none", margin: 0, padding: 0 }}>
                  <legend style={{ padding: 0, marginBottom: 8, color: "var(--gp-color-text-regular)" }}>
                    Notify me about
                  </legend>
                  <div style={{ display: "grid", gap: 8 }}>
                    <Checkbox id="cb-6" label="Email" isChecked={a} onChange={(_, v) => setA(v)} />
                    <Checkbox id="cb-7" label="SMS" isChecked={b} onChange={(_, v) => setB(v)} />
                  </div>
                </fieldset>
              </DemoFrame>
            </div>
          </Card>
        </Section>

        <Section title="Most-used props">
          <Card>
            <div style={{ padding: 24 }}>
              <PropsTable
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
            </div>
          </Card>
        </Section>

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
    );
  },
};
