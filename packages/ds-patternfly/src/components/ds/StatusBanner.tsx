import type { ComponentType, ReactNode } from "react";
import { Banner, Flex, FlexItem } from "../base/index.js";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InfoCircleIcon,
} from "@patternfly/react-icons";

/** Status accent for a StatusBanner. Omit for a plain neutral banner. */
export type BannerStatus = "success" | "warning" | "danger" | "info";

const STATUS_ICON: Record<BannerStatus, ComponentType> = {
  success: CheckCircleIcon,
  warning: ExclamationTriangleIcon,
  danger: ExclamationCircleIcon,
  info: InfoCircleIcon,
};

const STATUS_SR: Record<BannerStatus, string> = {
  success: "Success banner",
  warning: "Warning banner",
  danger: "Danger banner",
  info: "Info banner",
};

export interface StatusBannerProps {
  /** Status accent + default icon + screen-reader text. Omit for a plain banner. */
  status?: BannerStatus;
  /** Banner message. */
  children: ReactNode;
  /** Override the default status icon. */
  icon?: ReactNode;
  /** Override the default screen-reader text (defaults from `status`). */
  screenReaderText?: string;
}

/**
 * StatusBanner — a page- / app-level status strip. The lego block maps a
 * `status` to its accent colour, leading icon, and screen-reader text, so a
 * banner is one prop + a message instead of a hand-assembled icon + Flex.
 * Omit `status` for a plain neutral banner.
 */
export function StatusBanner({ status, children, icon, screenReaderText }: StatusBannerProps) {
  if (!status) {
    return <Banner>{children}</Banner>;
  }
  const Icon = STATUS_ICON[status];
  return (
    <Banner status={status} screenReaderText={screenReaderText ?? STATUS_SR[status]}>
      <Flex spaceItems={{ default: "spaceItemsSm" }}>
        <FlexItem>{icon ?? <Icon />}</FlexItem>
        <FlexItem>{children}</FlexItem>
      </Flex>
    </Banner>
  );
}
