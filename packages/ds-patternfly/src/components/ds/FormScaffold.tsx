import type { FormEvent, ReactNode } from "react";
import {
  ActionGroup,
  Button,
  Form,
} from "../base/index.js";
import {
  type FormScaffoldLabels,
  formScaffoldEnLabels,
} from "./labels.js";

export type { FormScaffoldLabels } from "./labels.js";
export { formScaffoldEnLabels } from "./labels.js";

/**
 * FormScaffold — the standard form frame: your fields as `children`, then a
 * branded submit / cancel ActionGroup. Wires the submit handler (with native
 * submit prevented) and a disabled-submit guard, so you focus on the fields
 * (e.g. the Validated* lego blocks).
 */
export interface FormScaffoldProps {
  /** Required. Provide via `formScaffoldEnLabels` or your translations. */
  labels?: FormScaffoldLabels;
  /** The form fields. */
  children: ReactNode;
  /** Fired on submit (native submit already prevented). */
  onSubmit: () => void;
  /** Fired when Cancel is pressed. Omit to hide the Cancel button. */
  onCancel?: () => void;
  /** Disable the submit button (e.g. while invalid or pending). */
  isSubmitDisabled?: boolean;
  /** Show a loading state on the submit button. */
  isSubmitting?: boolean;
}

export function FormScaffold({
  labels = formScaffoldEnLabels,
  children,
  onSubmit,
  onCancel,
  isSubmitDisabled,
  isSubmitting,
}: FormScaffoldProps) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit();
  };
  return (
    <Form onSubmit={handleSubmit}>
      {children}
      <ActionGroup>
        <Button
          type="submit"
          variant="primary"
          isDisabled={!!isSubmitDisabled}
          isLoading={!!isSubmitting}
        >
          {labels.submit}
        </Button>
        {onCancel ? (
          <Button variant="link" onClick={onCancel}>
            {labels.cancel}
          </Button>
        ) : null}
      </ActionGroup>
    </Form>
  );
}
