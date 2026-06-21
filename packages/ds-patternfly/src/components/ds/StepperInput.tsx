import { useId, type ReactNode } from "react";
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
} from "../base/index.js";
import {
  CaretDownIcon,
  CaretUpIcon,
  MinusIcon,
  PlusIcon,
} from "@patternfly/react-icons";

/**
 * StepperInput — a numeric field with increment / decrement controls, built
 * from primitives so the steppers inherit the brand's tertiary icon-button
 * styling instead of PF6's stock grey control chip. Fully controlled: an
 * empty field is the `""` value. Three layouts:
 *
 *   - `"stepper"` (default) — external ± buttons flanking the input, with an
 *     optional trailing `unit`. Finger-sized targets (WCAG 2.5.5); good on
 *     touch.
 *   - `"internal"` — a compact caret stepper stacked inside the field. Sizes
 *     to `minDigits` so the value never truncates; suited to mouse / desktop.
 *   - `"input-only"` — a bare numeric input; the device keyboard does the
 *     stepping.
 */
export interface StepperInputProps {
  /** Controlled value; `""` represents an empty field. */
  value: number | "";
  /** Fired with the new value on every edit / step. */
  onChange: (value: number | "") => void;
  /** Lowest allowed value (default 0). */
  min?: number;
  /** Highest allowed value (default 99). */
  max?: number;
  /** Step applied by the ± / caret controls (default 1). */
  step?: number;
  /** Trailing unit (e.g. "%"), shown in the `"stepper"` layout. */
  unit?: ReactNode;
  /** Presentation; see the component summary. Default `"stepper"`. */
  layout?: "stepper" | "internal" | "input-only";
  /** `"internal"` only — minimum visible digits the field is sized to hold. */
  minDigits?: number;
  /** Accessible name for the field (required — the value alone isn't a label). */
  ariaLabel: string;
  /** Field id (pairs with a FormGroup `fieldId`). */
  id?: string;
  /** Control width (CSS length). Maps to the wrapper's max / inline size. */
  width?: string;
  /** Disable the whole control. */
  isDisabled?: boolean;
}

export function StepperInput({
  value,
  onChange,
  min = 0,
  max = 99,
  step = 1,
  unit,
  layout = "stepper",
  minDigits,
  ariaLabel,
  id,
  width,
  isDisabled = false,
}: StepperInputProps) {
  const reactId = useId();
  const fieldId = id ?? `${reactId}-stepper`;
  const clamp = (v: number) => Math.max(min, Math.min(max, v));

  // Empty field steps from `min`; otherwise from the current value.
  const current = typeof value === "number" ? value : min;
  const stepBy = (delta: number) => onChange(clamp(current + delta));

  const handleText = (raw: string) => {
    if (raw === "") {
      onChange("");
      return;
    }
    const v = Number(raw);
    if (!Number.isNaN(v)) onChange(clamp(v));
  };

  // ── input-only ───────────────────────────────────────────────────────
  if (layout === "input-only") {
    // PF6's TextInput forwards `style` to the inner <input>, not the
    // form-control wrapper — so size the wrapper here for the focus ring to
    // track the visible edge.
    return (
      <div style={{ inlineSize: width ?? "7rem", paddingBlock: "0.375rem" }}>
        <TextInput
          id={fieldId}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={value}
          onChange={(_e, v) => handleText(v)}
          aria-label={ariaLabel}
          isDisabled={isDisabled}
          style={{ textAlign: "center" }}
        />
      </div>
    );
  }

  // ── internal caret stepper ───────────────────────────────────────────
  if (layout === "internal") {
    return (
      <TextInputGroup
        style={{
          ...(minDigits != null ? { ["--gp-min-digits" as string]: minDigits } : {}),
          inlineSize: width ?? "max-content",
        }}
      >
        <TextInputGroupMain
          type="text"
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          value={value}
          onChange={(e) => handleText((e.target as HTMLInputElement).value)}
          aria-label={ariaLabel}
        />
        <TextInputGroupUtilities>
          <div className="gp-stepper-stack">
            <button
              type="button"
              aria-label={`Increase ${ariaLabel}`}
              onClick={() => stepBy(step)}
              disabled={isDisabled || (typeof value === "number" && value >= max)}
              className="gp-stepper-btn"
            >
              <CaretUpIcon />
            </button>
            <button
              type="button"
              aria-label={`Decrease ${ariaLabel}`}
              onClick={() => stepBy(-step)}
              disabled={isDisabled || (typeof value === "number" && value <= min)}
              className="gp-stepper-btn"
            >
              <CaretDownIcon />
            </button>
          </div>
        </TextInputGroupUtilities>
      </TextInputGroup>
    );
  }

  // ── external ± stepper (default) ─────────────────────────────────────
  // The trigger Buttons pick up the brand-dial control radius + icon-only
  // outline styling.
  const stepperButtonStyle = {
    borderRadius: "var(--gp-radius-control, var(--pf-v6-c-button--BorderRadius))",
    aspectRatio: "1",
    paddingInline: 0,
  } as const;

  return (
    <InputGroup style={{ ...(width ? { maxWidth: width } : {}), inlineSize: "max-content" }}>
      <InputGroupItem>
        <Button
          variant={ButtonVariant.tertiary}
          aria-label={`Decrease ${ariaLabel}`}
          icon={<MinusIcon />}
          isDisabled={isDisabled || (typeof value === "number" && value <= min)}
          onClick={() => stepBy(-step)}
          style={stepperButtonStyle}
        />
      </InputGroupItem>
      <InputGroupItem isFill>
        {/* type="text" + inputMode="numeric" hides the browser's native ±
            spinner so only the lib ± Buttons drive the value. */}
        <TextInput
          id={fieldId}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={value}
          onChange={(_e, v) => handleText(v)}
          aria-label={ariaLabel}
          isDisabled={isDisabled}
          style={{ textAlign: "center" }}
        />
      </InputGroupItem>
      {unit != null ? <InputGroupText>{unit}</InputGroupText> : null}
      <InputGroupItem>
        <Button
          variant={ButtonVariant.tertiary}
          aria-label={`Increase ${ariaLabel}`}
          icon={<PlusIcon />}
          isDisabled={isDisabled || (typeof value === "number" && value >= max)}
          onClick={() => stepBy(step)}
          style={stepperButtonStyle}
        />
      </InputGroupItem>
    </InputGroup>
  );
}
