import type { ComponentType, ReactNode } from "react";
import {
  EmptyState,
  EmptyStateActions,
  EmptyStateBody,
  EmptyStateFooter,
} from "../base/index.js";
import CubesIcon from "@patternfly/react-icons/dist/esm/icons/cubes-icon";
import ExclamationCircleIcon from "@patternfly/react-icons/dist/esm/icons/exclamation-circle-icon";
import LockIcon from "@patternfly/react-icons/dist/esm/icons/lock-icon";
import WrenchIcon from "@patternfly/react-icons/dist/esm/icons/wrench-icon";

export type StatusPanelVariant =
  | "empty"
  | "error"
  | "unauthorized"
  | "maintenance";

// PF6 EmptyState colours the icon via its `status` prop ("danger" |
// "warning" | "success" | "info"); plain states leave it default.
const VARIANTS: Record<
  StatusPanelVariant,
  { icon: ComponentType; status?: "danger" | "warning" }
> = {
  empty: { icon: CubesIcon },
  error: { icon: ExclamationCircleIcon, status: "danger" },
  unauthorized: { icon: LockIcon },
  maintenance: { icon: WrenchIcon, status: "warning" },
};

/**
 * StatusPanel — the one lego block for every full-panel "state" screen:
 * empty results, an error, unauthorized access, or maintenance. Pick a
 * `variant` (drives a sensible default icon + accent), set the title/body,
 * and add primary/secondary actions. Composes the base EmptyState family.
 */
export interface StatusPanelProps {
  /** Which state this represents — sets the default icon + accent. */
  variant: StatusPanelVariant;
  /** Headline. */
  title: ReactNode;
  /** Explanatory body text. */
  children?: ReactNode;
  /** Override the variant's default icon. */
  icon?: ComponentType;
  /** Primary action (e.g. "Create", "Retry", "Sign in"). */
  primaryAction?: ReactNode;
  /** Secondary actions (links / buttons). */
  secondaryActions?: ReactNode;
  /** EmptyState sizing. */
  size?: "sm" | "lg" | "xl";
}

export function StatusPanel({
  variant,
  title,
  children,
  icon,
  primaryAction,
  secondaryActions,
  size,
}: StatusPanelProps) {
  const v = VARIANTS[variant];
  const titleText = typeof title === "string" ? title : "";
  return (
    <EmptyState
      titleText={titleText || title}
      headingLevel="h2"
      icon={icon ?? v.icon}
      {...(size ? { variant: size } : {})}
      {...(v.status ? { status: v.status } : {})}
    >
      {children ? <EmptyStateBody>{children}</EmptyStateBody> : null}
      {primaryAction || secondaryActions ? (
        <EmptyStateFooter>
          {primaryAction ? (
            <EmptyStateActions>{primaryAction}</EmptyStateActions>
          ) : null}
          {secondaryActions ? (
            <EmptyStateActions>{secondaryActions}</EmptyStateActions>
          ) : null}
        </EmptyStateFooter>
      ) : null}
    </EmptyState>
  );
}
