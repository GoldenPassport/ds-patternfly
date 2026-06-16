/**
 * Radio — one selection from a small fixed list.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useId, useState } from "react";
import { Radio } from "@golden-passport/ds-patternfly";

const PLANS = [
  { id: "free", label: "Free", description: "Up to 3 projects." },
  { id: "standard", label: "Standard", description: "Unlimited projects, email support." },
  { id: "enterprise", label: "Enterprise", description: "SSO, SLA, dedicated support." },
];

// Element ids (and the radio group name) derive from useId() so any number
// of instances can coexist on one page without duplicate-id clashes.

// #region Group
export function Group() {
  const id = useId();
  const [choice, setChoice] = useState("standard");

  return (
    <fieldset style={{ border: "none", margin: 0, padding: 0 }}>
      <legend style={{ padding: 0, marginBottom: 8, color: "var(--gp-color-text-regular)" }}>
        Plan
      </legend>
      <div style={{ display: "grid", gap: 8 }}>
        {PLANS.map((opt) => (
          <Radio
            key={opt.id}
            id={`${id}-${opt.id}`}
            name={`${id}-plan`}
            label={opt.label}
            description={opt.description}
            isChecked={choice === opt.id}
            onChange={(_, v) => v && setChoice(opt.id)}
          />
        ))}
      </div>
    </fieldset>
  );
}
// #endregion

export default function RadioExample() {
  return <Group />;
}
