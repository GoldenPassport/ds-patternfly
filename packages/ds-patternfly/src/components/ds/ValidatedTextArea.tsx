import { useId, type ReactNode } from "react";
import {
  FormGroup,
  FormHelperText,
  HelperText,
  HelperTextItem,
  TextArea,
} from "../base/index.js";
import {
  useFieldValidation,
  type Validator,
} from "./validation.js";

/**
 * ValidatedTextArea — the multi-line sibling of ValidatedTextField. Same
 * controlled + validators API over a base TextArea; errors surface on blur
 * (or per `validateOn`) with derived `validated` state and aria-describedby.
 */
export interface ValidatedTextAreaProps {
  /** Field label. */
  label: ReactNode;
  /** Controlled value. */
  value: string;
  /** Fired with the next value on every keystroke. */
  onChange: (value: string) => void;
  /** Composable validators; the first failing one's message is shown. */
  validators?: Validator[];
  /** Mark the field required. */
  isRequired?: boolean;
  /** Helper text shown when there is no error. */
  helperText?: ReactNode;
  /** Visible rows. */
  rows?: number;
  /** Placeholder text. */
  placeholder?: string;
  /** Auto-grow the textarea with content. */
  autoResize?: boolean;
  /** When to first surface errors. Default "blur". */
  validateOn?: "blur" | "change";
  /** Disable the field. */
  isDisabled?: boolean;
  /** Stable id base (defaults to a generated id). */
  fieldId?: string;
}

export function ValidatedTextArea({
  label,
  value,
  onChange,
  validators = [],
  isRequired,
  helperText,
  rows,
  placeholder,
  autoResize,
  validateOn = "blur",
  isDisabled,
  fieldId,
}: ValidatedTextAreaProps) {
  const generatedId = useId();
  const id = fieldId ?? generatedId;
  const helpId = `${id}-help`;
  const { error, validated, onBlur } = useFieldValidation(value, validators, {
    validateOn,
  });
  const hasHelp = Boolean(error || helperText);

  return (
    <FormGroup label={label} isRequired={!!isRequired} fieldId={id}>
      <TextArea
        id={id}
        value={value}
        validated={validated}
        isRequired={!!isRequired}
        isDisabled={!!isDisabled}
        {...(placeholder !== undefined ? { placeholder } : {})}
        {...(rows !== undefined ? { rows } : {})}
        {...(autoResize ? { autoResize: true } : {})}
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
