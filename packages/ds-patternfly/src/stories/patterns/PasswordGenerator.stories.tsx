import type { Meta, StoryObj } from "@storybook/react-vite";
import { FoundationPage, Section, Card, Example } from "../_kit/StoryKit.js";
import { GeneratorInputGroup } from "../../examples/patterns/PasswordGenerator.example.js";
import passwordGeneratorExampleSrc from "../../examples/patterns/PasswordGenerator.example.tsx?raw";

const meta: Meta = {
  title: "Patterns/Password generator/Demo",
  parameters: {
    layout: "padded",
    a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } },
  },
};
export default meta;

export const Demo: StoryObj = {
  render: () => (
    <FoundationPage
      title="Password generator"
      intro={
        <>
          An input group that produces, reveals, and copies a strong
          password. The standard shape: a read-only TextInput +
          regenerate / show / copy buttons. Generate via
          <code>crypto.getRandomValues</code> so the result is
          cryptographically random — never <code>Math.random()</code>.
        </>
      }
    >
      <Section
        title="Read-only + regenerate + show / hide + copy"
        description="Wire each button inside InputGroupItem so PF6's chrome stays consistent. Re-roll re-renders only the value."
      >
        <Card>
          <Example
            source={passwordGeneratorExampleSrc}
            region="GeneratorInputGroup"
            fileName="PasswordGenerator.example.tsx"
          >
            <GeneratorInputGroup />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example
            source={passwordGeneratorExampleSrc}
            fileName="PasswordGenerator.example.tsx"
          />
        </Card>
      </Section>

      <Section title="Patterns">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Use <code>crypto.getRandomValues</code></strong>. <code>Math.random()</code> is predictable enough to attack.</li>
            <li><strong>Exclude ambiguous chars</strong> (l, 1, O, 0) — copy-paste from displayed passwords is one of the few times users still read them.</li>
            <li><strong>Pair with strength meter.</strong> See &ldquo;Password strength&rdquo; for the meter pattern — render it below the input.</li>
            <li><strong>Don&rsquo;t auto-copy on generate.</strong> The user might not want to lose what&rsquo;s currently in their clipboard.</li>
            <li><strong>Default to hidden.</strong> Reveal-on-click is safer for shoulder-surfing scenarios.</li>
          </ul>
        </Card>
      </Section>

      <Section title="Accessibility">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Every icon button needs an aria-label.</strong> Sync, eye, copy — all icon-only.</li>
            <li><strong>Announce the copy</strong> in a polite live region (&ldquo;Copied to clipboard&rdquo;) — without it, click-and-go users get no feedback.</li>
            <li><strong>The input is read-only.</strong> Use PF6&rsquo;s <code>readOnlyVariant</code> so screen readers announce &ldquo;read only&rdquo; rather than &ldquo;disabled&rdquo;.</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
