import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { FormGroup, TextArea } from "@patternfly/react-core";
import { FoundationPage, Section, Card, CodeBlock } from "../../_storyKit.js";
import { DemoFrame, PropsTable } from "../../_demoKit.js";

const meta: Meta = {
  title: "Components/Forms/TextArea",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => {
    const [v, setV] = useState("");
    return (
      <FoundationPage
        title="TextArea"
        intro={
          <>
            Multi-line text input. Use it for descriptions, comments,
            messages — anywhere users may write more than a single line.
            For a known-short single-line field, use TextInput.
          </>
        }
      >
        <Section title="Basic">
          <Card>
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <DemoFrame>
                <FormGroup label="Description" fieldId="desc">
                  <TextArea
                    id="desc"
                    value={v}
                    onChange={(_, val) => setV(val)}
                    rows={4}
                    placeholder="What does this project do?"
                    aria-label="Description"
                  />
                </FormGroup>
              </DemoFrame>
              <CodeBlock>{`<FormGroup label="Description" fieldId="desc">
  <TextArea
    id="desc"
    value={value}
    onChange={(_, v) => setValue(v)}
    rows={4}
    placeholder="What does this project do?"
  />
</FormGroup>`}</CodeBlock>
            </div>
          </Card>
        </Section>

        <Section title="Auto-resizing">
          <Card>
            <div style={{ padding: 24 }}>
              <DemoFrame>
                <FormGroup label="Notes (auto-resizes)" fieldId="notes">
                  <TextArea
                    id="notes"
                    autoResize
                    aria-label="Notes"
                    placeholder="Type and watch this grow"
                  />
                </FormGroup>
              </DemoFrame>
            </div>
          </Card>
        </Section>

        <Section title="Most-used props">
          <Card>
            <div style={{ padding: 24 }}>
              <PropsTable
                rows={[
                  { name: "id", type: "string", description: "Required." },
                  { name: "value", type: "string", description: "Controlled value." },
                  { name: "onChange", type: "(event, value: string) => void", description: "Event first, value second." },
                  { name: "rows", type: "number", description: "Initial visible rows. Default 2 — usually too short, set explicitly." },
                  { name: "autoResize", type: "boolean", description: "Grow vertically as the user types. Combine with a max-height in CSS to cap." },
                  { name: "resizeOrientation", type: '"horizontal" | "vertical" | "both" | "none"', description: 'Which directions the user can drag-resize. Default "both" — usually want "vertical" only.' },
                  { name: "validated", type: '"default" | "success" | "warning" | "error"', description: "Visual state — same convention as TextInput." },
                ]}
              />
            </div>
          </Card>
        </Section>

        <Section title="Accessibility">
          <Card>
            <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
              <li><strong>Set rows explicitly.</strong> Default 2 is too short for almost any prose use case.</li>
              <li><strong>Restrict resize direction.</strong> Default both means users can drag horizontally and break the layout. Set <code>resizeOrientation=&quot;vertical&quot;</code>.</li>
              <li><strong>Character counters need their own announcement.</strong> Use an aria-live region for &quot;X characters remaining&quot; if you show one — don&apos;t expect AT to read silent visual counts.</li>
            </ul>
          </Card>
        </Section>

      </FoundationPage>
    );
  },
};
