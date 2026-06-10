import type { Meta, StoryObj } from "@storybook/react-vite";
import { HelperText, HelperTextItem } from "@golden-passport/ds-patternfly";
import { FoundationPage, Section, Card, CodeBlock } from "../_kit/StoryKit.js";
import { DemoFrame, PropsTable } from "../_kit/DemoKit.js";

const meta: Meta = {
  title: "Components/Forms/HelperText",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="HelperText"
      intro={
        <>
          Short, supplemental text — typically beneath a form field — to
          describe expected input, validation rules, or current validation
          status. Pair with form fields via{" "}
          <code>aria-describedby</code> so screen readers announce the
          guidance.
        </>
      }
    >
      <Section title="Single helper">
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame>
              <HelperText>
                <HelperTextItem>Use 8 or more characters.</HelperTextItem>
              </HelperText>
            </DemoFrame>
            <CodeBlock>{`<HelperText>
  <HelperTextItem>Use 8 or more characters.</HelperTextItem>
</HelperText>`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section title="Validation states">
        <Card>
          <div style={{ padding: 24 }}>
            <DemoFrame>
              <HelperText>
                <HelperTextItem variant="default">Default state</HelperTextItem>
                <HelperTextItem variant="success">Looks good</HelperTextItem>
                <HelperTextItem variant="warning">Could be stronger</HelperTextItem>
                <HelperTextItem variant="error">Required</HelperTextItem>
              </HelperText>
            </DemoFrame>
          </div>
        </Card>
      </Section>

      <Section title="Live region" description="When validation messages update dynamically, mark the container live.">
        <Card>
          <div style={{ padding: 24 }}>
            <CodeBlock>{`<HelperText isLiveRegion>
  <HelperTextItem variant="error">{validation.error}</HelperTextItem>
</HelperText>`}</CodeBlock>
            <p
              style={{
                marginTop: 12,
                marginBottom: 0,
                color: "var(--gp-color-text-subtle)",
                fontSize: 14,
              }}
            >
              The container becomes <code>aria-live=&quot;polite&quot;</code> — when the message
              updates, screen readers announce the new value without
              interrupting the user&apos;s current task.
            </p>
          </div>
        </Card>
      </Section>

      <Section title="HelperText props">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "component", type: '"div" | "ul"', description: 'Container type. Use "ul" when you have multiple items, "div" for a single inline message.' },
                { name: "id", type: "string", description: "ID to reference from the form field's aria-describedby." },
                { name: "isLiveRegion", type: "boolean", description: "Marks the container as aria-live=\"polite\" so updates are announced." },
                { name: "aria-label", type: "string", description: 'Required when component="ul" — labels the list for screen readers.' },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section title="HelperTextItem props">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "variant", type: '"default" | "indeterminate" | "warning" | "success" | "error"', description: "Renders a matching icon and tone. Use error for blocking validation; warning for soft warnings." },
                { name: "icon", type: "ReactNode", description: "Override the default variant icon." },
                { name: "id", type: "string", description: "Per-item ID — useful when only some items should be linked to the form field's aria-describedby." },
                { name: "screenReaderText", type: "string", description: 'Required when variant is non-default. Spells out the variant for AT (e.g. "Error: ").' },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section
        title="Accessibility"
        description="Helper text is only useful if AT can find it."
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
            <li>
              <strong>Wire up aria-describedby.</strong> Set <code>id</code> on the
              HelperText (or item), then pass that id to the form field&apos;s{" "}
              <code>aria-describedby</code>. Without this, the helper is purely
              visual.
            </li>
            <li>
              <strong>Don&apos;t rely on color for variant.</strong> The variant
              icon plus <code>screenReaderText</code> (e.g.{" "}
              <code>&quot;Error: &quot;</code>) carries meaning that color alone
              cannot.
            </li>
            <li>
              <strong>Keep it short.</strong> Helper text is a hint, not
              documentation. If the explanation needs more than two
              sentences, use Hint or a Popover instead.
            </li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
