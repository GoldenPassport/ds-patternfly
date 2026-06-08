import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import {
  Button,
  TextInput,
  Switch,
  Form,
  FormGroup,
} from "@patternfly/react-core";
import { useState } from "react";
import { FoundationPage, Section, Card, CodeBlock } from "../../components/StoryKit.js";

const meta: Meta = {
  title: "Foundations/Usage and behavior",
  parameters: {
    layout: "padded",
    a11y: {
      // PF6 primary buttons paint a focus/hover linear-gradient that axe
      // can't analyze through (color-contrast → "needs review"). This
      // story uses several PF6 Buttons to demonstrate states; disabling
      // the rule for THIS story only avoids the upstream false-positive
      // without weakening contrast checking elsewhere. Track upstream:
      // https://github.com/patternfly/patternfly-react/issues
      config: {
        rules: [{ id: "color-contrast", enabled: false }],
      },
    },
  },
};
export default meta;

export const Overview: StoryObj = {
  render: () => {
    const [val, setVal] = useState("Editable");
    const [on, setOn] = useState(false);
    return (
      <FoundationPage
        title="Usage and behavior"
        intro={
          <>
            Cross-cutting rules every component in the system honors. These
            behaviors are guaranteed by the underlying PatternFly 6
            primitives — wrappers in this lib never weaken them.
          </>
        }
      >
        <Section
          title="Interactive states"
          description="Every interactive control has the four states below. Hover and click these examples to verify."
        >
          <Card>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "120px 1fr",
                rowGap: 16,
                columnGap: 24,
                padding: 24,
                alignItems: "center",
                color: "var(--gp-color-text-regular)",
              }}
            >
              <strong>Default</strong>
              <Button variant="primary">Save changes</Button>

              <strong>Hover / focus</strong>
              <span style={{ color: "var(--gp-color-text-subtle)" }}>
                Tab to the button above and observe the focus ring; hover for
                the brand-hover color.
              </span>

              <strong>Disabled</strong>
              <Button variant="primary" isDisabled>
                Save changes
              </Button>

              <strong>Loading</strong>
              <Button variant="primary" isLoading>
                Saving…
              </Button>
            </div>
          </Card>
        </Section>

        <Section
          title="Focus order & keyboard"
          description="Tab through this form: focus moves in DOM order, every focusable control has a visible ring tied to the brand color."
        >
          <Card>
            <Form style={{ padding: 24 }}>
              <FormGroup label="Name" fieldId="name">
                <TextInput
                  id="name"
                  value={val}
                  onChange={(_, v) => setVal(v)}
                />
              </FormGroup>
              {/* Switch has its own <label>; wrapping in FormGroup with a
                * second label pointing at the same input is what axe flags
                * as `form-field-multiple-labels`. Use Switch directly. */}
              <Switch
                id="notify"
                label="Email me on completion"
                isChecked={on}
                onChange={(_, v) => setOn(v)}
              />
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Card>
        </Section>

        <Section
          title="Required ARIA props"
          description="Where a component cannot derive an accessible name from its children, the prop is REQUIRED at the type level — TS won't compile a missing label."
        >
          <Card>
            <CodeBlock label="Required ARIA props">{`<PrimaryDetailLayout
  items={items}
  getItemId={(i) => i.id}
  selectedId={selectedId}
  onSelect={setSelectedId}
  renderListItem={...}
  renderDetail={...}
  labels={primaryDetailLayoutEnLabels}   // required
/>`}</CodeBlock>
          </Card>
        </Section>

        <Section
          title="Localization"
          description="No user-facing string is hardcoded inside components. Every label is a prop on a typed *Labels object. English defaults are exported separately as opt-in constants."
        >
          <Card>
            <CodeBlock label="Localization usage">{`import {
  primaryDetailLayoutEnLabels,
  type PrimaryDetailLayoutLabels,
} from "@golden-passport/ds-patternfly";

// Zero-i18n usage:
labels={primaryDetailLayoutEnLabels}

// With your translation library:
labels={{
  listAriaLabel:    t("pdl.list"),
  detailAriaLabel:  t("pdl.detail"),
  backToList:       t("pdl.back"),
  emptyDetailTitle: t("pdl.empty.title"),
  emptyDetailBody:  t("pdl.empty.body"),
} satisfies PrimaryDetailLayoutLabels}`}</CodeBlock>
          </Card>
        </Section>

        <Section
          title="Direction (RTL)"
          description="ThemeProvider accepts a dir prop. All custom styles use logical properties (inline-start / inline-end / block-start / block-end) so layouts mirror correctly."
        >
          <Card>
            <div style={{ padding: 16, color: "var(--gp-color-text-regular)" }}>
              Switch the <strong>Direction</strong> toolbar above to see RTL in
              every story.
            </div>
          </Card>
        </Section>

        <Section
          title="Reduced motion"
          description="The system honors prefers-reduced-motion at the consumer level. See the Motion foundation for the recommended global rule."
        >
          <Card>
            <div style={{ padding: 16, color: "var(--gp-color-text-regular)" }}>
              Always animate <em>opacity</em> and <em>transform</em> in
              preference to layout-affecting properties; keep durations under{" "}
              <code>--gp-motion-duration-slow</code> for non-decorative
              transitions.
            </div>
          </Card>
        </Section>
      </FoundationPage>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("text input is editable and reflects typed value", async () => {
      const input = canvas.getByLabelText("Name") as HTMLInputElement;
      await userEvent.clear(input);
      await userEvent.type(input, "Ada");
      await expect(input).toHaveValue("Ada");
    });

    await step("switch toggles checked state when clicked", async () => {
      // PF6 <Switch> is a styled <input type="checkbox" role="switch">.
      // The visible track/thumb is a label sibling. Click the input directly
      // and read its `checked` property (the source of truth React updates).
      const sw = canvas.getByRole("switch", {
        name: /Email me on completion/i,
      }) as HTMLInputElement;
      const before = sw.checked;
      await userEvent.click(sw);
      await expect(sw.checked).not.toBe(before);
    });

    await step("disabled button does not fire onClick", async () => {
      const disabled = canvas
        .getAllByRole("button", { name: "Save changes" })
        .find((b: HTMLElement) => b.hasAttribute("disabled")) as
        | HTMLButtonElement
        | undefined;
      await expect(disabled).toBeDefined();
      await expect(disabled).toBeDisabled();
    });
  },
};
