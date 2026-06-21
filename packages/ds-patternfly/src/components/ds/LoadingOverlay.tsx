import type { ReactNode } from "react";
import { Backdrop, Bullseye, Button, Spinner } from "../base/index.js";

export interface LoadingOverlayProps {
  /** Show the overlay. When false, nothing renders. */
  isOpen: boolean;
  /** Caption under the spinner (e.g. "Loading workspace…"). */
  message?: ReactNode;
  /** Accessible label for the spinner (default "Loading"). */
  spinnerAriaLabel?: string;
  /** Show a Cancel link wired to this handler. */
  onCancel?: () => void;
  /** Label for the cancel link (default "Cancel"). */
  cancelLabel?: string;
}

/**
 * LoadingOverlay — a full-page blocking overlay: a dimming Backdrop with a
 * centered spinner card, for operations that must finish before the user
 * continues. The lego block owns the Backdrop + Bullseye + elevated card
 * assembly; you toggle `isOpen` and optionally supply a `message` / `onCancel`.
 */
export function LoadingOverlay({
  isOpen,
  message,
  spinnerAriaLabel = "Loading",
  onCancel,
  cancelLabel = "Cancel",
}: LoadingOverlayProps) {
  if (!isOpen) return null;
  return (
    <Backdrop>
      <Bullseye>
        <div
          style={{
            background: "var(--gp-color-bg-elevated)",
            padding: 24,
            borderRadius: "var(--gp-radius-md)",
            display: "grid",
            gap: 12,
            justifyItems: "center",
            color: "var(--gp-color-text-regular)",
          }}
        >
          <Spinner aria-label={spinnerAriaLabel} />
          {message != null ? <span>{message}</span> : null}
          {onCancel ? (
            <Button variant="link" onClick={onCancel}>
              {cancelLabel}
            </Button>
          ) : null}
        </div>
      </Bullseye>
    </Backdrop>
  );
}
