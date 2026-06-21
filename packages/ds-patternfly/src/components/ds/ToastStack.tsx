import { useCallback, useRef, useState } from "react";
import { Alert, AlertActionCloseButton, AlertGroup } from "../base/index.js";

/** Severity of a toast — maps to the Alert variant. */
export type ToastVariant = "success" | "danger" | "warning" | "info" | "custom";

/** A single queued toast. */
export interface Toast {
  /** Stable key (assigned by `useToasts`). */
  key: number;
  variant: ToastVariant;
  title: string;
  /** Auto-dismiss after this many ms; `0` keeps it until closed. */
  timeout?: number;
}

/** Options when adding a toast. */
export interface AddToastOptions {
  /** Override the default auto-dismiss (ms); `0` keeps it sticky. */
  timeout?: number;
}

/**
 * useToasts — the queue behind a ToastStack. Returns the live `toasts` array
 * plus `addToast` / `removeToast` / `clearToasts`. Keys are assigned from a
 * monotonic counter so simultaneously-added toasts never collide.
 */
export function useToasts(defaults?: { timeout?: number }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const idRef = useRef(0);
  const defaultTimeout = defaults?.timeout ?? 6000;

  const addToast = useCallback(
    (variant: ToastVariant, title: string, opts?: AddToastOptions) => {
      const key = idRef.current++;
      setToasts((prev) => [
        { key, variant, title, timeout: opts?.timeout ?? defaultTimeout },
        ...prev,
      ]);
      return key;
    },
    [defaultTimeout],
  );

  const removeToast = useCallback((key: number) => {
    setToasts((prev) => prev.filter((t) => t.key !== key));
  }, []);

  const clearToasts = useCallback(() => setToasts([]), []);

  return { toasts, addToast, removeToast, clearToasts };
}

export interface ToastStackProps {
  /** The toasts to render (from `useToasts`). */
  toasts: Toast[];
  /** Fired when a toast is dismissed — by timeout or the close button. */
  onDismiss: (key: number) => void;
}

/**
 * ToastStack — the floating, live-region stack of transient Alerts in a
 * corner of the app. Pairs with `useToasts` for the queue; this component is
 * the presentation: an animated, toast-positioned AlertGroup that wires each
 * Alert's timeout and close button back to `onDismiss`.
 */
export function ToastStack({ toasts, onDismiss }: ToastStackProps) {
  return (
    <AlertGroup hasAnimations isToast isLiveRegion>
      {toasts.map((t) => (
        <Alert
          key={t.key}
          variant={t.variant}
          title={t.title}
          timeout={t.timeout ?? 6000}
          onTimeout={() => onDismiss(t.key)}
          actionClose={
            <AlertActionCloseButton
              title={t.title}
              variantLabel={`${t.variant} alert`}
              onClose={() => onDismiss(t.key)}
            />
          }
        />
      ))}
    </AlertGroup>
  );
}
