import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { FormGroup, FormHelperText, HelperText, HelperTextItem, TextInput } from "@patternfly/react-core";
import { FoundationPage, Section, Card, CodeBlock, ThemingPointer } from "../../_storyKit.js";
import { DemoFrame, PropsTable } from "../../../components/DemoKit.js";

const meta: Meta = {
  title: "Components/Forms/TextInput",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => {
    const [v1, setV1] = useState("");
    const [email, setEmail] = useState("not-an-email");
    const validated = email.includes("@") ? "default" : "error";
    return (
      <FoundationPage
        title="TextInput"
        intro={
          <>
            Single-line text input. The most common form field — wrap in a
            FormGroup to get the label, helper text, and validation
            indicator wired up correctly.
          </>
        }
      >
        <Section title="Basic">
          <Card>
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <DemoFrame>
                <FormGroup label="Project name" isRequired fieldId="proj">
                  <TextInput
                    id="proj"
                    value={v1}
                    onChange={(_, v) => setV1(v)}
                    placeholder="my-project"
                  />
                </FormGroup>
              </DemoFrame>
              <CodeBlock>{`<FormGroup label="Project name" isRequired fieldId="proj">
  <TextInput
    id="proj"
    value={value}
    onChange={(_, v) => setValue(v)}
    placeholder="my-project"
  />
</FormGroup>`}</CodeBlock>
            </div>
          </Card>
        </Section>

        <Section
          title="Elevated"
          description='Inputs default to a transparent background — they adopt whatever container they sit on. For inputs that should read as elevated above the page (hero search, standalone create form, spotlight surface), opt in with the gp-is-elevated class.'
        >
          <Card>
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <DemoFrame>
                <FormGroup label="Search" fieldId="elevated-search">
                  <TextInput
                    id="elevated-search"
                    className="gp-is-elevated"
                    placeholder="Find something..."
                    aria-label="Search"
                  />
                </FormGroup>
              </DemoFrame>
              <CodeBlock>{`<TextInput
  id="search"
  className="gp-is-elevated"   // ← opt in
  placeholder="Find something..."
/>

// Also works on FormGroup (covers nested input):
<FormGroup label="Search" className="gp-is-elevated" fieldId="search">
  <TextInput id="search" />
</FormGroup>

// And on InputGroup-based components — class propagates down:
<NumberInput className="gp-is-elevated" ... />`}</CodeBlock>
              <p style={{ margin: 0, color: "var(--gp-color-text-subtle)", fontSize: 14 }}>
                Surface resolves via <code>--gp-color-bg-elevated</code>:
                white in light mode (lift from cream page), gray-800 in
                dark mode (lift from gray-900 page).
              </p>
            </div>
          </Card>
        </Section>

        <Section title="Validated states">
          <Card>
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <DemoFrame>
                <FormGroup label="Email" fieldId="email">
                  <TextInput
                    id="email"
                    type="email"
                    value={email}
                    onChange={(_, v) => setEmail(v)}
                    validated={validated}
                    aria-describedby="email-helper"
                  />
                  <FormHelperText>
                    <HelperText id="email-helper">
                      <HelperTextItem variant={validated === "error" ? "error" : "default"}>
                        {validated === "error" ? "Must contain '@'." : "Looks good."}
                      </HelperTextItem>
                    </HelperText>
                  </FormHelperText>
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
                  { name: "id", type: "string", description: "Required. Wired to the FormGroup label via fieldId." },
                  { name: "value", type: "string", description: "Controlled value. Pair with onChange." },
                  { name: "onChange", type: "(event, value: string) => void", description: "Note the argument order — event first, then string value." },
                  { name: "type", type: '"text" | "email" | "url" | "password" | "tel" | "number" | "search" | "date" | "time" | "datetime-local"', description: 'Native HTML input type. Use "email" / "url" / "tel" for the right mobile keyboard.' },
                  { name: "validated", type: '"default" | "success" | "warning" | "error"', description: "Visual state. Pair with HelperText variant for matching helper text color and icon." },
                  { name: "isDisabled", type: "boolean", description: "Removes from tab order." },
                  { name: "isReadOnly", type: "boolean", description: "Stays focusable but the value can't change. Use for fields shown for reference but not editable now." },
                  { name: "placeholder", type: "string", description: "Hint text. Never substitute for a label — placeholder disappears as soon as the user types." },
                ]}
              />
            </div>
          </Card>
        </Section>

        <Section title="Accessibility">
          <Card>
            <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
              <li><strong>Always wrap in FormGroup.</strong> FormGroup handles label, isRequired indicator, error state, and aria-invalid wiring.</li>
              <li><strong>Wire aria-describedby</strong> to a HelperText id when you have helper or error text — without it, screen readers don&apos;t announce the helper.</li>
              <li><strong>Use the right type.</strong> <code>type=&quot;email&quot;</code> brings up the email keyboard on mobile and triggers browser validation; <code>type=&quot;number&quot;</code> ditto for numeric. Don&apos;t default to text for everything.</li>
              <li><strong>Don&apos;t use placeholder as a label.</strong> Placeholder fails users with cognitive disabilities (it disappears) and translation tools (it&apos;s often not translated). Always use FormGroup&apos;s label.</li>
            </ul>
          </Card>
        </Section>

        <ThemingPointer
          dials={[
            ["--gp-control-pad-y", "Vertical padding — drives the 36px field height."],
            ["--gp-control-pad-x", "Horizontal padding inside the input."],
            ["--gp-radius-control", "Corner radius (shared with buttons + selects)."],
            ["--gp-border-default", "Resting border colour."],
            ["--gp-focus-ring", "Focus-ring colour."],
          ]}
        />

      </FoundationPage>
    );
  },
};
