import { useId, type ReactNode } from "react";
import {
  FormGroup,
  FormHelperText,
  FormSelect,
  FormSelectOption,
  HelperText,
  HelperTextItem,
} from "../base/index.js";
import {
  useFieldValidation,
  type Validator,
} from "./validation.js";

export interface SelectChoice {
  value: string;
  label: string;
  /** Render as a non-selectable placeholder (e.g. the empty "Choose…" row). */
  isPlaceholder?: boolean;
  isDisabled?: boolean;
}

/**
 * ValidatedSelect — a labelled, validated single-select built on the base
 * FormSelect. Same controlled + validators API as the text fields: pass
 * `options`, own `value`, surface errors on blur (or per `validateOn`).
 */
export interface ValidatedSelectProps {
  /** Field label. */
  label: ReactNode;
  /** Controlled selected value. */
  value: string;
  /** Fired with the next value on change. */
  onChange: (value: string) => void;
  /** The choices (include a placeholder row with value "" if you want one). */
  options: SelectChoice[];
  /** Composable validators; the first failing one's message is shown. */
  validators?: Validator[];
  /** Mark the field required. */
  isRequired?: boolean;
  /** Helper text shown when there is no error. */
  helperText?: ReactNode;
  /** When to first surface errors. Default "blur". */
  validateOn?: "blur" | "change";
  /** Disable the field. */
  isDisabled?: boolean;
  /** Stable id base (defaults to a generated id). */
  fieldId?: string;
}

export function ValidatedSelect({
  label,
  value,
  onChange,
  options,
  validators = [],
  isRequired,
  helperText,
  validateOn = "blur",
  isDisabled,
  fieldId,
}: ValidatedSelectProps) {
  const generatedId = useId();
  const id = fieldId ?? generatedId;
  const helpId = `${id}-help`;
  const { error, validated, onBlur } = useFieldValidation(value, validators, {
    validateOn,
  });

  return (
    <FormGroup label={label} isRequired={!!isRequired} fieldId={id}>
      <FormSelect
        id={id}
        value={value}
        validated={validated}
        isRequired={!!isRequired}
        isDisabled={!!isDisabled}
        onChange={(_e, v) => onChange(v)}
        onBlur={onBlur}
        aria-describedby={helpId}
      >
        {options.map((opt) => (
          <FormSelectOption
            key={opt.value || "placeholder"}
            value={opt.value}
            label={opt.label}
            {...(opt.isPlaceholder ? { isPlaceholder: true } : {})}
            {...(opt.isDisabled ? { isDisabled: true } : {})}
          />
        ))}
      </FormSelect>
      {error || helperText ? (
        <FormHelperText>
          <HelperText id={helpId}>
            <HelperTextItem variant={error ? "error" : "default"}>
              {error ?? helperText}
            </HelperTextItem>
          </HelperText>
        </FormHelperText>
      ) : null}
    </FormGroup>
  );
}
