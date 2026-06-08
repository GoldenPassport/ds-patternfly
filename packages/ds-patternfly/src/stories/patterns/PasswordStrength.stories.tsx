import { useMemo, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  HelperText,
  HelperTextItem,
  Progress,
  ProgressMeasureLocation,
  ProgressSize,
  TextInput,
} from "@patternfly/react-core";
import { FoundationPage, Section, Card, CodeBlock } from "../../components/StoryKit.js";
import { DemoFrame } from "../../components/DemoKit.js";

const meta: Meta = {
  title: "Patterns/Password strength/Demo",
  parameters: {
    layout: "padded",
    a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } },
  },
};
export default meta;

type Score = { value: number; label: string; variant: "danger" | "warning" | "success" };

function score(pwd: string): Score {
  let s = 0;
  if (pwd.length >= 8) s++;
  if (pwd.length >= 12) s++;
  if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) s++;
  if (/\d/.test(pwd)) s++;
  if (/[^a-zA-Z0-9]/.test(pwd)) s++;
  // common-word heuristic — toy version
  if (/password|qwerty|12345/i.test(pwd)) s = Math.max(0, s - 2);
  const pct = Math.min(100, (s / 5) * 100);
  if (s <= 1) return { value: pct, label: "Weak",     variant: "danger"  };
  if (s <= 3) return { value: pct, label: "Fair",     variant: "warning" };
  return                 { value: pct, label: "Strong",   variant: "success" };
}

const Criterion = ({ ok, children }: { ok: boolean; children: React.ReactNode }) => (
  <HelperTextItem
    variant={ok ? "success" : "default"}
  >
    {children}
  </HelperTextItem>
);

export const Demo: StoryObj = {
  render: () => {
    const [pwd, setPwd] = useState("");
    const s = useMemo(() => score(pwd), [pwd]);
    return (
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
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <DemoFrame>
                <div style={{ maxWidth: 480, display: "grid", gap: 8 }}>
                  <TextInput
                    id="pwd-strength"
                    type="password"
                    value={pwd}
                    onChange={(_e, v) => setPwd(v)}
                    aria-label="New password"
                    placeholder="Type a password"
                    aria-describedby="pwd-strength-meter pwd-strength-criteria"
                  />
                  <div id="pwd-strength-meter">
                    <Progress
                      value={s.value}
                      title={`Password strength: ${s.label}`}
                      variant={s.variant}
                      size={ProgressSize.sm}
                      measureLocation={ProgressMeasureLocation.outside}
                      aria-live="polite"
                    />
                  </div>
                  <HelperText id="pwd-strength-criteria">
                    <Criterion ok={pwd.length >= 8}>At least 8 characters</Criterion>
                    <Criterion ok={pwd.length >= 12}>12 or more characters</Criterion>
                    <Criterion ok={/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)}>Mixed case (a–z + A–Z)</Criterion>
                    <Criterion ok={/\d/.test(pwd)}>A digit</Criterion>
                    <Criterion ok={/[^a-zA-Z0-9]/.test(pwd)}>A symbol</Criterion>
                  </HelperText>
                </div>
              </DemoFrame>
              <CodeBlock>{`function score(pwd) {
  let s = 0;
  if (pwd.length >= 8)  s++;
  if (pwd.length >= 12) s++;
  if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) s++;
  if (/\\d/.test(pwd))  s++;
  if (/[^a-zA-Z0-9]/.test(pwd)) s++;
  if (/password|qwerty|12345/i.test(pwd)) s = Math.max(0, s - 2);
  const pct = (s / 5) * 100;
  if (s <= 1) return { value: pct, label: "Weak",   variant: "danger" };
  if (s <= 3) return { value: pct, label: "Fair",   variant: "warning" };
  return { value: pct, label: "Strong", variant: "success" };
}

const s = score(pwd);
<Progress
  value={s.value}
  title={\`Password strength: \${s.label}\`}
  variant={s.variant}
  size="sm"
  aria-live="polite"
/>
<HelperText>
  <HelperTextItem variant={ok ? "success" : "default"} hasIcon>
    At least 8 characters
  </HelperTextItem>
  {/* more rules */}
</HelperText>`}</CodeBlock>
            </div>
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
    );
  },
};
