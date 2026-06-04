import type { Meta, StoryObj } from "@storybook/react-vite";
import { FoundationPage, Section, Card, CodeBlock, ThemingPointer } from "../../_storyKit.js";
import { DemoFrame } from "../../_demoKit.js";

const meta: Meta = {
  title: "Components/Forms",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="About forms"
      intro={
        <>
          The Forms section collects every input control in the lib —{" "}
          <strong>text primitives</strong>,{" "}
          <strong>choice + toggle controls</strong>,{" "}
          <strong>grouped / composed inputs</strong>, and the{" "}
          <strong>date &amp; time pickers</strong>. They all sit on the same
          DS field height (<code>36px</code>) and share radius, focus, and
          motion dials, so a Form composed from any mix of them reads as one
          cohesive surface. <code>FormControl</code> — the underlying CSS
          class — is also exposed for authoring custom inputs that need to
          inherit the same styling.
        </>
      }
    >
      <Section
        title="Text primitives"
        description="Plain text + numeric inputs. The starting point for most fields."
      >
        <Card>
          <ul
            style={{
              margin: 0,
              padding: "16px 24px 16px 40px",
              color: "var(--gp-color-text-regular)",
              lineHeight: 1.9,
            }}
          >
            <li><strong>TextInput</strong> — single-line text.</li>
            <li><strong>TextArea</strong> — multi-line text.</li>
            <li><strong>NumberInput</strong> — numeric value with stepper buttons.</li>
            <li><strong>SearchInput</strong> — text input with built-in clear + search affordances.</li>
          </ul>
        </Card>
      </Section>

      <Section
        title="Choice + toggle"
        description="One-of-many / many-of-many / on-off pickers. PF6 maps each shape to a dedicated control."
      >
        <Card>
          <ul
            style={{
              margin: 0,
              padding: "16px 24px 16px 40px",
              color: "var(--gp-color-text-regular)",
              lineHeight: 1.9,
            }}
          >
            <li><strong>Checkbox</strong> — boolean (submit-and-apply) or one-of-many.</li>
            <li><strong>Radio</strong> — single choice in a small fixed list.</li>
            <li><strong>FormSelect</strong> — native <code>&lt;select&gt;</code> with PF styling; best for medium-length familiar lists.</li>
            <li><strong>Switch</strong> — boolean toggle for immediate-effect settings.</li>
            <li><strong>ToggleGroup</strong> — segmented control for 2–4 mutually-exclusive options where comparison matters.</li>
            <li><strong>Slider</strong> — bounded numeric input driven by feel, not precision.</li>
          </ul>
        </Card>
      </Section>

      <Section
        title="Grouped + composed inputs"
        description="Inputs that combine a primitive with neighbouring chrome — buttons, prefixes, internal steppers, edit affordances."
      >
        <Card>
          <ul
            style={{
              margin: 0,
              padding: "16px 24px 16px 40px",
              color: "var(--gp-color-text-regular)",
              lineHeight: 1.9,
            }}
          >
            <li><strong>InputGroup</strong> — TextInput + flanking Buttons / labels in one bordered frame (URL builders, password reveal, copy-from).</li>
            <li><strong>TextInputGroup</strong> — typeahead-friendly input with utilities slot — supports the internal-stepper / chip / clear recipes.</li>
            <li><strong>Inline edit</strong> — read-mode label that swaps to an editable field on click; pairs with Save / Cancel.</li>
          </ul>
        </Card>
      </Section>

      <Section
        title="Date and time"
        description="Pickers built on the same field chrome. Nested in their own sub-folder."
      >
        <Card>
          <ul
            style={{
              margin: 0,
              padding: "16px 24px 16px 40px",
              color: "var(--gp-color-text-regular)",
              lineHeight: 1.9,
            }}
          >
            <li><strong>DatePicker</strong> — text-field trigger + inline calendar popover.</li>
            <li><strong>DateTimePicker</strong> — date + time in one composed control.</li>
            <li><strong>TimePicker</strong> — hours / minutes with optional 12-hour AM/PM.</li>
            <li><strong>CalendarMonth</strong> — the raw inline calendar primitive (PF6).</li>
            <li><strong>FuturePicker</strong> — schedule-style chooser: relative wait (ISO duration) or absolute future date.</li>
          </ul>
        </Card>
      </Section>

      <Section
        title="Authoring a custom form control"
        description="When the right primitive doesn't exist, inherit the styling via the form-control modifier class."
      >
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame>
              <span className="pf-v6-c-form-control" style={{ width: 320 }}>
                <input
                  type="email"
                  placeholder="you@example.com"
                  aria-label="Custom email input"
                />
              </span>
            </DemoFrame>
            <CodeBlock>{`{/* The class belongs on a wrapper, not the <input> itself —
   PF6 paints the input's border via ::before/::after pseudos
   on the wrapper. Putting the class directly on a replaced
   element like <input> breaks pseudo-element painting and
   leaves adjacent edges with mismatched border colours. */}
<span className="pf-v6-c-form-control">
  <input type="email" placeholder="you@example.com" />
</span>`}</CodeBlock>
            <p style={{ margin: 0, color: "var(--gp-color-text-subtle)", fontSize: 14 }}>
              Use the class form only as an escape hatch. The named React
              components handle a11y wiring (label, helper text,
              validated state) that bare HTML inputs do not.
            </p>
          </div>
        </Card>
      </Section>

      <Section
        title="When to use which input"
        description="One-line decision tree."
      >
        <Card>
          <ul
            style={{
              margin: 0,
              padding: "16px 24px 16px 40px",
              color: "var(--gp-color-text-regular)",
              lineHeight: 1.8,
            }}
          >
            <li><strong>Free-form text</strong> → TextInput.</li>
            <li><strong>Multi-line text</strong> → TextArea.</li>
            <li><strong>One of a small fixed list</strong> → Radio (≤5) or FormSelect (&gt;5).</li>
            <li><strong>One of a large list</strong> → Select (with search) — see Components/Menus/Select.</li>
            <li><strong>Boolean — submit-and-apply</strong> → Checkbox.</li>
            <li><strong>Boolean — apply-on-toggle</strong> → Switch.</li>
            <li><strong>Numeric — bounded with stepper</strong> → NumberInput.</li>
            <li><strong>Numeric — bounded by feel</strong> → Slider.</li>
            <li><strong>Search query</strong> → SearchInput.</li>
          </ul>
        </Card>
      </Section>

      <ThemingPointer
        dials={[
          ["--gp-control-pad-y", "Vertical padding — drives field height (36px default)."],
          ["--gp-control-pad-x", "Horizontal padding."],
          ["--gp-radius-control", "Corner radius shared by every form-control variant."],
          ["--gp-border-default", "Resting border colour."],
          ["--gp-border-width", "Border thickness."],
        ]}
      />

    </FoundationPage>
  ),
};
