import type { ComponentType, ReactNode } from "react";
import { StatusPanel } from "./StatusPanel.js";

/**
 * EmptyStatePanel — the "nothing here yet" panel: an icon, a title, optional
 * body text, and a primary call-to-action that gets the user started (plus
 * optional secondary actions). The dedicated, discoverable empty-state lego
 * block; it's StatusPanel's `empty` variant under a self-describing name.
 * For error / unauthorized / maintenance states, use `StatusPanel` directly.
 */
export interface EmptyStatePanelProps {
  /** Headline — "No workflows yet". */
  title: ReactNode;
  /** Explanatory body text. */
  children?: ReactNode;
  /** Override the default (cubes) icon. */
  icon?: ComponentType;
  /** Primary call-to-action (e.g. "Create workflow"). */
  primaryAction?: ReactNode;
  /** Secondary actions (links / buttons). */
  secondaryActions?: ReactNode;
  /** EmptyState sizing. */
  size?: "sm" | "lg" | "xl";
}

export function EmptyStatePanel({
  title,
  children,
  icon,
  primaryAction,
  secondaryActions,
  size,
}: EmptyStatePanelProps) {
  return (
    <StatusPanel
      variant="empty"
      title={title}
      {...(icon ? { icon } : {})}
      {...(primaryAction ? { primaryAction } : {})}
      {...(secondaryActions ? { secondaryActions } : {})}
      {...(size ? { size } : {})}
    >
      {children}
    </StatusPanel>
  );
}
