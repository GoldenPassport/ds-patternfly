import type { ReactNode } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "../base/index.js";
import { type ConfirmModalLabels, confirmModalEnLabels } from "./labels.js";

export type { ConfirmModalLabels } from "./labels.js";
export { confirmModalEnLabels } from "./labels.js";

/**
 * ConfirmModal — a small controlled confirmation dialog: title, body, and a
 * confirm / cancel footer. Set `variant="danger"` for destructive actions
 * (red confirm button). Composes the base Modal family; you own `isOpen`.
 */
export interface ConfirmModalProps {
  /** Required. Provide via `confirmModalEnLabels` or your translations. */
  labels?: ConfirmModalLabels;
  /** Whether the modal is open. */
  isOpen: boolean;
  /** Dialog title. */
  title: ReactNode;
  /** Dialog body (the question / consequences). */
  children: ReactNode;
  /** Fired when the user confirms. */
  onConfirm: () => void;
  /** Fired on cancel / close (X, Cancel, Esc, backdrop). */
  onCancel: () => void;
  /** "primary" (default) or "danger" for destructive confirmations. */
  variant?: "primary" | "danger";
  /** Show a loading state on the confirm button. */
  isConfirming?: boolean;
}

export function ConfirmModal({
  labels = confirmModalEnLabels,
  isOpen,
  title,
  children,
  onConfirm,
  onCancel,
  variant = "primary",
  isConfirming,
}: ConfirmModalProps) {
  return (
    <Modal variant="small" isOpen={isOpen} onClose={onCancel}>
      <ModalHeader title={typeof title === "string" ? title : undefined}>
        {typeof title === "string" ? undefined : title}
      </ModalHeader>
      <ModalBody>{children}</ModalBody>
      <ModalFooter>
        <Button
          variant={variant === "danger" ? "danger" : "primary"}
          onClick={onConfirm}
          isLoading={!!isConfirming}
        >
          {labels.confirm}
        </Button>
        <Button variant="link" onClick={onCancel}>
          {labels.cancel}
        </Button>
      </ModalFooter>
    </Modal>
  );
}
