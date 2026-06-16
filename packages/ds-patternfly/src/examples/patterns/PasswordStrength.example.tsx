/**
 * Password strength pattern — a live strength meter (Progress) plus a
 * per-rule criteria checklist (HelperText) that update as the user types.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useId, useMemo, useState } from "react";
import {
  HelperText,
  HelperTextItem,
  Progress,
  ProgressMeasureLocation,
  ProgressSize,
  TextInput,
} from "@golden-passport/ds-patternfly";

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

// #region MeterAndCriteria
export function MeterAndCriteria() {
  const id = useId();
  const [pwd, setPwd] = useState("");
  const s = useMemo(() => score(pwd), [pwd]);

  return (
    <div style={{ maxWidth: 480, display: "grid", gap: 8 }}>
      <TextInput
        id={`${id}-pwd-strength`}
        type="password"
        value={pwd}
        onChange={(_e, v) => setPwd(v)}
        aria-label="New password"
        placeholder="Type a password"
        aria-describedby={`${id}-pwd-strength-meter ${id}-pwd-strength-criteria`}
      />
      <div id={`${id}-pwd-strength-meter`}>
        <Progress
          value={s.value}
          title={`Password strength: ${s.label}`}
          variant={s.variant}
          size={ProgressSize.sm}
          measureLocation={ProgressMeasureLocation.outside}
          aria-live="polite"
        />
      </div>
      <HelperText id={`${id}-pwd-strength-criteria`}>
        <Criterion ok={pwd.length >= 8}>At least 8 characters</Criterion>
        <Criterion ok={pwd.length >= 12}>12 or more characters</Criterion>
        <Criterion ok={/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)}>Mixed case (a–z + A–Z)</Criterion>
        <Criterion ok={/\d/.test(pwd)}>A digit</Criterion>
        <Criterion ok={/[^a-zA-Z0-9]/.test(pwd)}>A symbol</Criterion>
      </HelperText>
    </div>
  );
}
// #endregion

export default function PasswordStrengthExample() {
  return <MeterAndCriteria />;
}
