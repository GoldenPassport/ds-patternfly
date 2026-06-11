/**
 * NumberInput — numeric input with stepper buttons, composed from
 * primitives (Button + TextInput) so the ± steppers use the lib's
 * tertiary icon-button styling instead of PF6's stock grey control chip.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useId, useState } from "react";
import {
  Button,
  ButtonVariant,
  InputGroup,
  InputGroupItem,
  InputGroupText,
  TextInput,
  TextInputGroup,
  TextInputGroupMain,
  TextInputGroupUtilities,
} from "../_lib.js";
import {
  CaretDownIcon,
  CaretUpIcon,
  MinusIcon,
  PlusIcon,
} from "@patternfly/react-icons";

const clamp = (v: number, min = 0, max = 99) =>
  Math.max(min, Math.min(max, v));

// The trigger Buttons pick up the brand-dial control radius + the lib's
// icon-only outline styling.
const stepperButtonStyle = {
  borderRadius: "var(--gp-radius-control, var(--pf-v6-c-button--BorderRadius))",
  aspectRatio: "1",
  paddingInline: 0,
} as const;

// #region Basic
export function Basic() {
  const id = useId();
  const [n, setN] = useState<number | "">(3);
  return (
    <InputGroup style={{ maxWidth: 180 }}>
      <InputGroupItem>
        <Button
          variant={ButtonVariant.tertiary}
          aria-label="Decrease quantity"
          icon={<MinusIcon />}
          isDisabled={typeof n === "number" && n <= 0}
          onClick={() => setN(typeof n === "number" ? clamp(n - 1) : 0)}
          style={stepperButtonStyle}
        />
      </InputGroupItem>
      <InputGroupItem isFill>
        {/* type="text" + inputMode="numeric" — hides the browser's
            native ± spinner so only the lib ± Buttons drive the value. */}
        <TextInput
          id={`${id}-quantity`}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={n}
          onChange={(_e, value) => {
            if (value === "") {
              setN("");
              return;
            }
            const v = Number(value);
            if (!Number.isNaN(v)) setN(clamp(v));
          }}
          aria-label="Quantity"
          style={{ textAlign: "center" }}
        />
      </InputGroupItem>
      <InputGroupItem>
        <Button
          variant={ButtonVariant.tertiary}
          aria-label="Increase quantity"
          icon={<PlusIcon />}
          isDisabled={typeof n === "number" && n >= 99}
          onClick={() => setN(typeof n === "number" ? clamp(n + 1) : 1)}
          style={stepperButtonStyle}
        />
      </InputGroupItem>
    </InputGroup>
  );
}
// #endregion

// #region WithUnit
export function WithUnit() {
  const id = useId();
  const [withUnit, setWithUnit] = useState<number | "">(50);
  return (
    <InputGroup style={{ maxWidth: 220 }}>
      <InputGroupItem>
        <Button
          variant={ButtonVariant.tertiary}
          aria-label="Decrease threshold"
          icon={<MinusIcon />}
          isDisabled={typeof withUnit === "number" && withUnit <= 0}
          onClick={() =>
            setWithUnit(
              typeof withUnit === "number" ? clamp(withUnit - 1, 0, 100) : 0,
            )
          }
          style={stepperButtonStyle}
        />
      </InputGroupItem>
      <InputGroupItem isFill>
        <TextInput
          id={`${id}-threshold`}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={withUnit}
          onChange={(_e, value) => {
            if (value === "") {
              setWithUnit("");
              return;
            }
            const v = Number(value);
            if (!Number.isNaN(v)) setWithUnit(clamp(v, 0, 100));
          }}
          aria-label="Threshold percent"
          style={{ textAlign: "center" }}
        />
      </InputGroupItem>
      <InputGroupText>%</InputGroupText>
      <InputGroupItem>
        <Button
          variant={ButtonVariant.tertiary}
          aria-label="Increase threshold"
          icon={<PlusIcon />}
          isDisabled={typeof withUnit === "number" && withUnit >= 100}
          onClick={() =>
            setWithUnit(
              typeof withUnit === "number" ? clamp(withUnit + 1, 0, 100) : 1,
            )
          }
          style={stepperButtonStyle}
        />
      </InputGroupItem>
    </InputGroup>
  );
}
// #endregion

// #region InternalStepperLayout
export function InternalStepperLayout() {
  const id = useId();
  const [year, setYear] = useState<number>(2026);
  const [minDigits, setMinDigits] = useState<number>(4);

  return (
    <>
      {/* Two variants of the same input rendered side-by-side
          via PF6 utility classes:
            - Internal-stepper variant: hidden by default,
              shown from md+ (>= 768px) where mouse is the
              primary input.
            - Standard NumberInput: shown by default (mobile),
              hidden from md+. WCAG 2.5.5 target-size
              compliant for touch.
          Resize the canvas across the md breakpoint to see
          them swap. */}
      <div
        className="pf-v6-u-display-none pf-v6-u-display-inline-flex-on-md"
        style={{
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 20,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            flexDirection: "column",
            gap: 6,
            fontSize: 13,
          }}
        >
          {/* Plain span — wrapping the NumberInput in a
              <label> caused clicks on its +/- buttons to
              bubble to the label and re-fire on the inner
              input, which the NumberInput then routed back
              to BOTH steppers. */}
          <span>Min digits (drives input min-width):</span>
          <InputGroup style={{ inlineSize: "max-content" }}>
            <InputGroupItem>
              <Button
                variant={ButtonVariant.tertiary}
                aria-label="Decrease min digits"
                icon={<MinusIcon />}
                isDisabled={minDigits <= 1}
                onClick={() => setMinDigits((d) => Math.max(1, d - 1))}
                style={stepperButtonStyle}
              />
            </InputGroupItem>
            <InputGroupItem>
              <TextInput
                id={`${id}-min-digits`}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={minDigits}
                onChange={(_e, value) => {
                  if (value === "") return;
                  const v = Number(value);
                  if (!Number.isNaN(v))
                    setMinDigits(Math.max(1, Math.min(12, v)));
                }}
                aria-label="Min digits"
                style={{ inlineSize: "5rem", textAlign: "center" }}
              />
            </InputGroupItem>
            <InputGroupItem>
              <Button
                variant={ButtonVariant.tertiary}
                aria-label="Increase min digits"
                icon={<PlusIcon />}
                isDisabled={minDigits >= 12}
                onClick={() => setMinDigits((d) => Math.min(12, d + 1))}
                style={stepperButtonStyle}
              />
            </InputGroupItem>
          </InputGroup>
        </div>
        {/* `--gp-min-digits` is a CSS custom property the
            lib reads to set the input's min-inline-size so
            `<minDigits>` characters never truncate. 4 fits
            a 4-digit year cleanly; bump to 10 for a phone
            number, etc. The wrapper's `inline-size:
            max-content` lets it shrink-wrap around the
            input's min-width — so when minDigits changes
            the whole demo auto-resizes. */}
        <TextInputGroup
          style={{
            ["--gp-min-digits" as string]: minDigits,
            inlineSize: "max-content",
          }}
        >
          <TextInputGroupMain
            type="text"
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            value={year}
            onChange={(e) => {
              const v = Number((e.target as HTMLInputElement).value);
              if (!Number.isNaN(v)) setYear(v);
            }}
            aria-label="Year"
          />
          <TextInputGroupUtilities>
            <div className="gp-stepper-stack">
              <button
                type="button"
                aria-label="Increase year"
                onClick={() => setYear((y) => y + 1)}
                className="gp-stepper-btn"
              >
                <CaretUpIcon />
              </button>
              <button
                type="button"
                aria-label="Decrease year"
                onClick={() => setYear((y) => y - 1)}
                className="gp-stepper-btn"
              >
                <CaretDownIcon />
              </button>
            </div>
          </TextInputGroupUtilities>
        </TextInputGroup>
      </div>
      {/* Touch / mobile fallbacks — render BOTH options
          side-by-side under md, each labelled, so consumers
          can compare and choose. At md+ the internal-stepper
          above takes over and these hide. */}
      <div
        className="pf-v6-u-display-block pf-v6-u-display-none-on-md"
        style={{ display: "grid", gap: 24 }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 6,
            fontSize: 13,
          }}
        >
          <span>
            <strong>mobileFallback=&quot;stepper&quot;</strong>{" "}
            <span style={{ color: "var(--gp-color-text-subtle)" }}>
              — finger-sized ± buttons (default, WCAG 2.5.5).
            </span>
          </span>
          <InputGroup style={{ inlineSize: "max-content" }}>
            <InputGroupItem>
              <Button
                variant={ButtonVariant.tertiary}
                aria-label="Decrease year (stepper)"
                icon={<MinusIcon />}
                onClick={() => setYear((y) => y - 1)}
                style={stepperButtonStyle}
              />
            </InputGroupItem>
            <InputGroupItem>
              <TextInput
                id={`${id}-year-mobile-stepper`}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={year}
                onChange={(_e, value) => {
                  if (value === "") return;
                  const v = Number(value);
                  if (!Number.isNaN(v)) setYear(v);
                }}
                aria-label="Year (stepper fallback)"
                style={{ inlineSize: "5rem", textAlign: "center" }}
              />
            </InputGroupItem>
            <InputGroupItem>
              <Button
                variant={ButtonVariant.tertiary}
                aria-label="Increase year (stepper)"
                icon={<PlusIcon />}
                onClick={() => setYear((y) => y + 1)}
                style={stepperButtonStyle}
              />
            </InputGroupItem>
          </InputGroup>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 6,
            fontSize: 13,
          }}
        >
          <span>
            <strong>mobileFallback=&quot;input-only&quot;</strong>{" "}
            <span style={{ color: "var(--gp-color-text-subtle)" }}>
              — bare numeric input; device keyboard does the work.
            </span>
          </span>
          {/* input-only — wider field (7rem) than the
              stepper's sister input (5rem) since this is the
              sole entry surface. Wrapper has an explicit
              inline-size that the form-control span inside
              inherits, so the focus ring tracks the visible
              input edge. PF6's TextInput only forwards
              `style` to the inner <input>, NOT the
              form-control wrapper — without this constraint
              the wrapper stretches to the parent flex column
              and the ring draws on the wrong box. */}
          <div style={{ inlineSize: "7rem", paddingBlock: "0.375rem" }}>
            <TextInput
              id={`${id}-year-mobile-input-only`}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={year}
              onChange={(_e, value) => {
                if (value === "") return;
                const v = Number(value);
                if (!Number.isNaN(v)) setYear(v);
              }}
              aria-label="Year (input-only fallback)"
              style={{ textAlign: "center" }}
            />
          </div>
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
