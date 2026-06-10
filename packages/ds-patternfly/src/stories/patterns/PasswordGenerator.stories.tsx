import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Button,
  InputGroup,
  InputGroupItem,
  TextInput,
} from "@golden-passport/ds-patternfly";
import { CopyIcon, EyeIcon, EyeSlashIcon, SyncIcon } from "@patternfly/react-icons";
import { FoundationPage, Section, Card, CodeBlock } from "../_kit/StoryKit.js";
import { DemoFrame } from "../_kit/DemoKit.js";

const meta: Meta = {
  title: "Patterns/Password generator/Demo",
  parameters: {
    layout: "padded",
    a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } },
  },
};
export default meta;

const ALPHA_L = "abcdefghijkmnopqrstuvwxyz"; // no l
const ALPHA_U = "ABCDEFGHJKLMNPQRSTUVWXYZ";  // no I/O
const DIGITS  = "23456789";                  // no 0/1
const SYM     = "!@#$%^&*-_=+";

function generate(len = 16): string {
  const pool = ALPHA_L + ALPHA_U + DIGITS + SYM;
  const out = new Array<string>(len);
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    const buf = new Uint32Array(len);
    crypto.getRandomValues(buf);
    for (let i = 0; i < len; i++) out[i] = pool[(buf[i] ?? 0) % pool.length] ?? "x";
  } else {
    for (let i = 0; i < len; i++) out[i] = pool[Math.floor(Math.random() * pool.length)] ?? "x";
  }
  return out.join("");
}

export const Demo: StoryObj = {
  render: () => {
    const [pwd, setPwd] = useState(() => generate(16));
    const [show, setShow] = useState(false);
    const [copied, setCopied] = useState(false);

    const copy = async () => {
      try {
        await navigator.clipboard.writeText(pwd);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      } catch {
        /* ignore — clipboard may be blocked in iframes */
      }
    };

    return (
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
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <DemoFrame>
                <div style={{ maxWidth: 480, display: "grid", gap: 8 }}>
                  <InputGroup>
                    <InputGroupItem isFill>
                      <TextInput
                        id="pwd-gen"
                        aria-label="Generated password"
                        type={show ? "text" : "password"}
                        value={pwd}
                        readOnlyVariant="default"
                      />
                    </InputGroupItem>
                    <InputGroupItem>
                      <Button
                        variant="control"
                        aria-label={show ? "Hide password" : "Show password"}
                        onClick={() => setShow((s) => !s)}
                      >
                        {show ? <EyeSlashIcon /> : <EyeIcon />}
                      </Button>
                    </InputGroupItem>
                    <InputGroupItem>
                      <Button
                        variant="control"
                        aria-label="Generate new password"
                        onClick={() => setPwd(generate(16))}
                      >
                        <SyncIcon />
                      </Button>
                    </InputGroupItem>
                    <InputGroupItem>
                      <Button
                        variant="control"
                        aria-label="Copy password"
                        onClick={copy}
                      >
                        <CopyIcon />
                      </Button>
                    </InputGroupItem>
                  </InputGroup>
                  <p
                    aria-live="polite"
                    style={{ margin: 0, height: 18, color: "var(--gp-color-text-subtle)", fontSize: 13 }}
                  >
                    {copied ? "Copied to clipboard." : ""}
                  </p>
                </div>
              </DemoFrame>
              <CodeBlock>{`function generate(len = 16) {
  const pool = "abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789!@#$%^&*-_=+";
  const buf = new Uint32Array(len);
  crypto.getRandomValues(buf);
  return Array.from(buf, (n) => pool[n % pool.length]).join("");
}

<InputGroup>
  <InputGroupItem isFill>
    <TextInput type={show ? "text" : "password"} value={pwd} aria-label="Generated password" readOnlyVariant="default" />
  </InputGroupItem>
  <InputGroupItem>
    <Button variant="control" aria-label={show ? "Hide password" : "Show password"} onClick={toggle}>
      {show ? <EyeSlashIcon /> : <EyeIcon />}
    </Button>
  </InputGroupItem>
  <InputGroupItem>
    <Button variant="control" aria-label="Generate new password" onClick={regenerate}><SyncIcon /></Button>
  </InputGroupItem>
  <InputGroupItem>
    <Button variant="control" aria-label="Copy password" onClick={copy}><CopyIcon /></Button>
  </InputGroupItem>
</InputGroup>`}</CodeBlock>
            </div>
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
    );
  },
};
