import { useId, type ReactNode } from "react";
import {
  FormGroup,
  FormHelperText,
  HelperText,
  HelperTextItem,
  TextInput,
} from "../base/index.js";
import {
  useFieldValidation,
  type Validator,
} from "./validation.js";

/**
 * ValidatedTextField — a labelled, validated single-line text field. Composes
 * the base FormGroup + TextInput + HelperText, and wires the DS validation
 * utilities: errors show on blur (or per `validateOn`), the PF `validated`
 * state + an error/helper message + aria-describedby are all derived for you.
 *
 * Fully controlled: own `value`, update it from `onChange`. Pass composable
 * `validators` (required, minLength, email, …) from the lib.
 */
export interface ValidatedTextFieldProps {
  /** Field label. */
  label: ReactNode;
  /** Controlled value. */
  value: string;
  /** Fired with the next value on every keystroke. */
  onChange: (value: string) => void;
  /** Composable validators; the first failing one's message is shown. */
  validators?: Validator[];
  /** Mark the field required (visual asterisk + pairs with a `required()` validator). */
  isRequired?: boolean;
  /** Helper text shown when there is no error. */
  helperText?: ReactNode;
  /** Input type. */
  type?: "text" | "email" | "password" | "tel" | "url" | "number";
  /** Placeholder text. */
  placeholder?: string;
  /** When to first surface errors. Default "blur". */
  validateOn?: "blur" | "change";
  /** Disable the field. */
  isDisabled?: boolean;
  /** Stable id base (defaults to a generated id). */
  fieldId?: string;
}

export function ValidatedTextField({
  label,
  value,
  onChange,
  validators = [],
  isRequired,
  helperText,
  type = "text",
  placeholder,
  validateOn = "blur",
  isDisabled,
  fieldId,
}: ValidatedTextFieldProps) {
  const generatedId = useId();
  const id = fieldId ?? generatedId;
  const helpId = `${id}-help`;
  const { error, validated, onBlur } = useFieldValidation(value, validators, {
    validateOn,
  });
  // Only reference the help element when it's actually rendered — a dangling
  // aria-describedby is an a11y violation.
  const hasHelp = Boolean(error || helperText);

  return (
    <FormGroup label={label} isRequired={!!isRequired} fieldId={id}>
      <TextInput
        id={id}
        type={type}
        value={value}
        validated={validated}
        isRequired={!!isRequired}
        isDisabled={!!isDisabled}
        {...(placeholder !== undefined ? { placeholder } : {})}
        onChange={(_e, v) => onChange(v)}
        onBlur={onBlur}
        {...(hasHelp ? { "aria-describedby": helpId } : {})}
      />
      {hasHelp ? (
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
