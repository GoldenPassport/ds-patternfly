import { useCallback, useState } from "react";

/**
 * Field validation utilities for the DS form lego blocks.
 *
 * A `Validator` takes the current string value and returns an error message
 * (string) when invalid, or `null` when valid. Compose them in an array;
 * `runValidators` returns the first error. The `useFieldValidation` hook
 * wires the common "validate on blur, re-validate on change once touched"
 * behaviour the Validated* fields use.
 */
export type Validator = (value: string) => string | null;

/** PF6 `validated` states. */
export type ValidationState = "default" | "error" | "success";

/** Non-empty (after trimming whitespace). */
export const required =
  (message = "Required"): Validator =>
  (v) =>
    v.trim() === "" ? message : null;

/** At least `n` characters. */
export const minLength =
  (n: number, message?: string): Validator =>
  (v) =>
    v.length < n ? (message ?? `Must be at least ${n} characters`) : null;

/** At most `n` characters. */
export const maxLength =
  (n: number, message?: string): Validator =>
  (v) =>
    v.length > n ? (message ?? `Must be at most ${n} characters`) : null;

/** Matches `re`. Empty values pass (compose with `required` to forbid empty). */
export const pattern =
  (re: RegExp, message = "Invalid format"): Validator =>
  (v) =>
    v === "" || re.test(v) ? null : message;

/** A plausible email address (empty passes — compose with `required`). */
export const email = (message = "Enter a valid email address"): Validator =>
  pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, message);

/** Run validators in order; return the first error message, or null. */
export function runValidators(
  value: string,
  validators: Validator[] = [],
): string | null {
  for (const v of validators) {
    const error = v(value);
    if (error) return error;
  }
  return null;
}

export interface UseFieldValidation {
  /** Current error message, or null. Suppressed until the field is touched. */
  error: string | null;
  /** Whether the field has been blurred / submitted at least once. */
  touched: boolean;
  /** PF6 `validated` value derived from error + touched. */
  validated: ValidationState;
  /** Call from the field's onBlur. */
  onBlur: () => void;
  /** Force validation + mark touched (e.g. on form submit). Returns validity. */
  validate: () => boolean;
  /** Clear touched + error (e.g. on form reset). */
  reset: () => void;
}

/**
 * Validation state for a single controlled field. Errors stay hidden until
 * the field is touched (blurred or `validate()`d); once touched, they update
 * live as `value` changes.
 */
export function useFieldValidation(
  value: string,
  validators: Validator[] = [],
  opts: { validateOn?: "blur" | "change" } = {},
): UseFieldValidation {
  const [touched, setTouched] = useState(opts.validateOn === "change");
  const rawError = runValidators(value, validators);
  const error = touched ? rawError : null;

  const onBlur = useCallback(() => setTouched(true), []);
  const validate = useCallback(() => {
    setTouched(true);
    return runValidators(value, validators) === null;
  }, [value, validators]);
  const reset = useCallback(() => setTouched(false), []);

  return {
    error,
    touched,
    validated: error ? "error" : touched && !rawError ? "success" : "default",
    onBlur,
    validate,
    reset,
  };
}
