import type { Meta, StoryObj } from "@storybook/react-vite";
import { FoundationPage, Section, Card, Example } from "../_kit/StoryKit.js";
import { MeterAndCriteria } from "../../examples/patterns/PasswordStrength.example.js";
import passwordStrengthExampleSrc from "../../examples/patterns/PasswordStrength.example.tsx?raw";

const meta: Meta = {
  title: "Patterns/Password strength/Demo",
  parameters: {
    layout: "padded",
    a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } },
  },
};
export default meta;

export const Demo: StoryObj = {
  render: () => (
    <FoundationPage
      title="Password strength"
      intro={
        <>
          A live strength meter that updates as the user types — colour +
          label drive at-a-glance feedback; a per-rule checklist tells
          the user exactly what&rsquo;s missing. Both signals matter:
          colour alone fails WCAG, checklists alone leave the user
          guessing whether they&rsquo;re close.
        </>
      }
    >
      <Section
        title="Meter + criteria"
        description="A Progress with variant=danger/warning/success drives the meter; HelperText below ticks off requirements."
      >
        <Card>
          <Example
            source={passwordStrengthExampleSrc}
            region="MeterAndCriteria"
            fileName="PasswordStrength.example.tsx"
          >
            <MeterAndCriteria />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example
            source={passwordStrengthExampleSrc}
            fileName="PasswordStrength.example.tsx"
          />
        </Card>
      </Section>

      <Section title="Patterns">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Use a real library for production.</strong> <code>zxcvbn</code> beats heuristic counts — it understands keyboard patterns, common substitutions, and known breached passwords.</li>
            <li><strong>Don&rsquo;t block submit on &ldquo;Fair&rdquo;.</strong> Strong-recommended ≠ strong-required. Enforce a floor (e.g. 12 chars), advise the rest.</li>
            <li><strong>Check against breach lists</strong> (have-i-been-pwned k-anonymity API) for high-security flows. Strong-and-pwned is still bad.</li>
            <li><strong>Never include the username</strong> in the password — flag &ldquo;contains your email&rdquo; explicitly.</li>
          </ul>
        </Card>
      </Section>

      <Section title="Accessibility">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Colour + label.</strong> Never communicate strength with colour alone — the label (&ldquo;Weak / Fair / Strong&rdquo;) is the non-colour cue.</li>
            <li><strong>Live region.</strong> Meter title updates trigger a polite announcement — keyboard-only users hear strength changes as they type.</li>
            <li><strong>Criteria icons.</strong> HelperTextItem.hasIcon gives a visual check / dot; the variant carries the semantic. Screen readers hear &ldquo;success: At least 8 characters&rdquo;.</li>
            <li><strong>Don&rsquo;t hide error states behind hover.</strong> The full criteria list should always be visible — &ldquo;hidden until invalid&rdquo; is a usability anti-pattern.</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
