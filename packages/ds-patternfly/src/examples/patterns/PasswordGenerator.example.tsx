/**
 * Password generator pattern — read-only TextInput + regenerate / show /
 * copy buttons in an InputGroup. Cryptographically random via
 * crypto.getRandomValues — never Math.random().
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useId, useState } from "react";
import {
  Button,
  InputGroup,
  InputGroupItem,
  TextInput,
} from "@golden-passport/ds-patternfly";
import { CopyIcon, EyeIcon, EyeSlashIcon, SyncIcon } from "@patternfly/react-icons";

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

// #region GeneratorInputGroup
export function GeneratorInputGroup() {
  const id = useId();
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
    <div style={{ maxWidth: 480, display: "grid", gap: 8 }}>
      <InputGroup>
        <InputGroupItem isFill>
          <TextInput
            id={`${id}-pwd-gen`}
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
  );
}
// #endregion

export default function PasswordGeneratorExample() {
  return <GeneratorInputGroup />;
}
