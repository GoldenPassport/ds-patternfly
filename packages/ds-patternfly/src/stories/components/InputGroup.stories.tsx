import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Button,
  InputGroup,
  InputGroupItem,
  InputGroupText,
  NumberInput,
  TextInput,
  FormSelect,
  FormSelectOption,
} from "@golden-passport/ds-patternfly";
import { SearchIcon, AtIcon, EyeIcon, EyeSlashIcon, CopyIcon } from "@patternfly/react-icons";
import { FoundationPage, Section, Card, CodeBlock, ThemingPointer } from "../_kit/StoryKit.js";
import { DemoFrame, PropsTable } from "../_kit/DemoKit.js";

const meta: Meta = {
  title: "Components/Forms/InputGroup",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => {
    const [val, setVal] = useState("");
    const [pwd, setPwd] = useState("hunter2");
    const [showPwd, setShowPwd] = useState(false);
    const [search, setSearch] = useState("");
    const [scope, setScope] = useState("repos");
    const [amount, setAmount] = useState<number>(100);

    return (
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
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <DemoFrame>
                <InputGroup>
                  <InputGroupText>
                    <AtIcon />
                  </InputGroupText>
                  <InputGroupItem isFill>
                    <TextInput
                      id="ig-basic"
                      aria-label="Email username"
                      placeholder="username"
                      value={val}
                      onChange={(_e, v) => setVal(v)}
                    />
                  </InputGroupItem>
                  <InputGroupText>example.com</InputGroupText>
                </InputGroup>
              </DemoFrame>
              <CodeBlock>{`<InputGroup>
  <InputGroupText><AtIcon /></InputGroupText>
  <InputGroupItem isFill>
    <TextInput id="email-user" aria-label="Email username" />
  </InputGroupItem>
  <InputGroupText>example.com</InputGroupText>
</InputGroup>`}</CodeBlock>
            </div>
          </Card>
        </Section>

        <Section
          title="Search with scope"
          description="A FormSelect inside an InputGroupItem narrows the search before the user types — common pattern in admin UIs."
        >
          <Card>
            <div style={{ padding: 24 }}>
              <DemoFrame>
                <InputGroup>
                  <InputGroupItem>
                    <FormSelect
                      value={scope}
                      onChange={(_e, v) => setScope(v)}
                      aria-label="Search scope"
                      style={{ width: 140 }}
                    >
                      <FormSelectOption value="repos" label="Repositories" />
                      <FormSelectOption value="issues" label="Issues" />
                      <FormSelectOption value="users" label="Users" />
                    </FormSelect>
                  </InputGroupItem>
                  <InputGroupItem isFill>
                    <TextInput
                      id="ig-search"
                      type="search"
                      aria-label="Search"
                      placeholder={`Search ${scope}…`}
                      value={search}
                      onChange={(_e, v) => setSearch(v)}
                    />
                  </InputGroupItem>
                  <InputGroupItem>
                    <Button variant="control" aria-label="Run search">
                      <SearchIcon />
                    </Button>
                  </InputGroupItem>
                </InputGroup>
              </DemoFrame>
            </div>
          </Card>
        </Section>

        <Section
          title="Show / hide password"
          description="A toggle button inside the group reveals the password without leaving the field."
        >
          <Card>
            <div style={{ padding: 24 }}>
              <DemoFrame>
                <InputGroup>
                  <InputGroupItem isFill>
                    <TextInput
                      id="ig-pwd"
                      type={showPwd ? "text" : "password"}
                      aria-label="Password"
                      value={pwd}
                      onChange={(_e, v) => setPwd(v)}
                    />
                  </InputGroupItem>
                  <InputGroupItem>
                    <Button
                      variant="control"
                      aria-label={showPwd ? "Hide password" : "Show password"}
                      onClick={() => setShowPwd((s) => !s)}
                    >
                      {showPwd ? <EyeSlashIcon /> : <EyeIcon />}
                    </Button>
                  </InputGroupItem>
                </InputGroup>
              </DemoFrame>
            </div>
          </Card>
        </Section>

        <Section
          title="Number with unit + copy"
          description="NumberInput (with native − / + steppers) led by a combined currency prefix ('US$' — locale + symbol in one chip) and trailed by a copy button. NumberInput is the right primitive whenever the value is numeric — the steppers give touch users a no-typing path, and screen readers announce the value via the inputAriaLabel."
        >
          <Card>
            <div style={{ padding: 24 }}>
              <DemoFrame>
                <InputGroup>
                  {/* Merged locale + symbol — "US$" reads as a single
                      currency token, clearer than two separate chips
                      (e.g. "$ … USD") which can disagree (CA$ vs USD)
                      and crowd the field. */}
                  <InputGroupText>US$</InputGroupText>
                  <InputGroupItem isFill>
                    <NumberInput
                      value={amount}
                      onMinus={() => setAmount((a) => Math.max(0, a - 1))}
                      onPlus={() => setAmount((a) => a + 1)}
                      onChange={(e) => {
                        const v = Number(
                          (e.target as HTMLInputElement).value,
                        );
                        if (!Number.isNaN(v)) setAmount(v);
                      }}
                      min={0}
                      inputAriaLabel="Amount"
                      minusBtnAriaLabel="Decrease amount"
                      plusBtnAriaLabel="Increase amount"
                    />
                  </InputGroupItem>
                  <InputGroupItem>
                    <Button
                      variant="control"
                      aria-label="Copy value"
                      onClick={() =>
                        navigator.clipboard?.writeText(String(amount))
                      }
                    >
                      <CopyIcon />
                    </Button>
                  </InputGroupItem>
                </InputGroup>
              </DemoFrame>
            </div>
          </Card>
        </Section>

        <Section
          title="Disabled"
          description="Set isDisabled on each InputGroupItem (and the inner control) to grey the whole cluster."
        >
          <Card>
            <div style={{ padding: 24 }}>
              <DemoFrame>
                <InputGroup>
                  <InputGroupText isDisabled>
                    <AtIcon />
                  </InputGroupText>
                  <InputGroupItem isFill isDisabled>
                    <TextInput
                      id="ig-disabled"
                      aria-label="Username"
                      isDisabled
                      value="ada.lovelace"
                    />
                  </InputGroupItem>
                  <InputGroupItem isDisabled>
                    <Button variant="control" isAriaDisabled>
                      Save
                    </Button>
                  </InputGroupItem>
                </InputGroup>
              </DemoFrame>
            </div>
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
    );
  },
};
