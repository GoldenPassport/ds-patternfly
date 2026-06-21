/**
 * StepperInput — a numeric field with ± / caret stepper controls. The exported
 * StepperInput lego block owns the clamp logic, the brand-styled steppers, the
 * disabled-at-bounds wiring, and the three layouts; you supply the controlled
 * `value` / `onChange` and the bounds.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useState } from "react";
import { StepperInput } from "@golden-passport/ds-patternfly";

// #region Basic
export function Basic() {
  const [n, setN] = useState<number | "">(3);
  return (
    <StepperInput value={n} onChange={setN} min={0} max={99} ariaLabel="Quantity" width="180px" />
  );
}
// #endregion

// #region WithUnit
export function WithUnit() {
  const [pct, setPct] = useState<number | "">(50);
  return (
    <StepperInput
      value={pct}
      onChange={setPct}
      min={0}
      max={100}
      unit="%"
      ariaLabel="Threshold percent"
      width="220px"
    />
  );
}
// #endregion

// #region InternalStepperLayout
export function InternalStepperLayout() {
  const [year, setYear] = useState<number | "">(2026);
  const [minDigits, setMinDigits] = useState<number | "">(4);

  return (
    <>
      {/* Internal caret stepper — hidden by default, shown from md+ (>= 768px)
          where the mouse is the primary input. `minDigits` sizes the field so
          the value never truncates. */}
      <div
        className="pf-v6-u-display-none pf-v6-u-display-inline-flex-on-md"
        style={{ flexDirection: "column", alignItems: "flex-start", gap: 20 }}
      >
        <div style={{ display: "inline-flex", flexDirection: "column", gap: 6, fontSize: 13 }}>
          <span>Min digits (drives input min-width):</span>
          <StepperInput
            value={minDigits}
            onChange={setMinDigits}
            min={1}
            max={12}
            ariaLabel="Min digits"
          />
        </div>
        <StepperInput
          layout="internal"
          value={year}
          onChange={setYear}
          min={0}
          max={9999}
          minDigits={typeof minDigits === "number" ? minDigits : 4}
          ariaLabel="Year"
        />
      </div>

      {/* Touch / mobile fallbacks — shown under md, hidden from md+ where the
          internal stepper takes over. Both options side-by-side to compare. */}
      <div
        className="pf-v6-u-display-block pf-v6-u-display-none-on-md"
        style={{ display: "grid", gap: 24 }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 13 }}>
          <span>
            <strong>layout=&quot;stepper&quot;</strong>{" "}
            <span style={{ color: "var(--gp-color-text-subtle)" }}>
              — finger-sized ± buttons (default, WCAG 2.5.5).
            </span>
          </span>
          <StepperInput value={year} onChange={setYear} min={0} max={9999} ariaLabel="Year (stepper fallback)" />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 13 }}>
          <span>
            <strong>layout=&quot;input-only&quot;</strong>{" "}
            <span style={{ color: "var(--gp-color-text-subtle)" }}>
              — bare numeric input; device keyboard does the work.
            </span>
          </span>
          <StepperInput
            layout="input-only"
            value={year}
            onChange={setYear}
            min={0}
            max={9999}
            ariaLabel="Year (input-only fallback)"
          />
        </div>
      </div>
    </>
  );
}
// #endregion

export default function NumberInputExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <Basic />
      <WithUnit />
      <InternalStepperLayout />
    </div>
  );
}
