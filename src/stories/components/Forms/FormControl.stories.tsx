import type { Meta, StoryObj } from "@storybook/react-vite";
import { FoundationPage, Section, Card, CodeBlock } from "../../_storyKit.js";
import { DemoFrame } from "../../_demoKit.js";

const meta: Meta = {
  title: "Components/Forms/Form control",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Form control"
      intro={
        <>
          &quot;Form control&quot; is PatternFly&apos;s collective name for the
          input primitives — <code>TextInput</code>, <code>TextArea</code>,
          <code>FormSelect</code>, <code>NumberInput</code>,{" "}
          <code>SearchInput</code>, etc. Each has its own page with demos and
          props. The <code>FormControl</code> CSS class is also exposed for
          authoring custom inputs that need to inherit PatternFly&apos;s
          input styling.
        </>
      }
    >
      <Section title="The form-control inputs">
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
            <li><strong>FormSelect</strong> — native &lt;select&gt; with PF styling.</li>
            <li><strong>NumberInput</strong> — numeric input with stepper buttons.</li>
            <li><strong>SearchInput</strong> — text input with built-in clear and search affordances.</li>
            <li><strong>Checkbox</strong> / <strong>Radio</strong> — boolean / single-of-many choices.</li>
            <li><strong>Switch</strong> — boolean toggle for immediate-effect settings.</li>
            <li><strong>Slider</strong> — bounded numeric input.</li>
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

    </FoundationPage>
  ),
};
