import { useState } from "react";
import {
  ActionList,
  ActionListGroup,
  ActionListItem,
  Button,
  Panel,
  PanelMain,
  PanelMainBody,
  Tooltip,
} from "../base/index.js";
import AngleLeftIcon from "@patternfly/react-icons/dist/esm/icons/angle-left-icon";
import AngleRightIcon from "@patternfly/react-icons/dist/esm/icons/angle-right-icon";
import { type CompassRailLabels, compassRailEnLabels } from "./labels.js";
import type { CompassRailAction } from "./compassModels.js";

export type { CompassRailAction } from "./compassModels.js";
export type { CompassRailLabels } from "./labels.js";
export { compassRailEnLabels } from "./labels.js";

export interface CompassRailProps {
  /** Localised handle labels. Defaults to `compassRailEnLabels`. */
  labels?: CompassRailLabels;
  /** Which edge — drives chevron direction + handle anchoring. */
  side: "start" | "end";
  /** The icon actions, clustered by `groupId`. */
  actions: CompassRailAction[];
  /**
   * Mobile off-canvas mode. When true, the rail renders its edge-handle and
   * the open/closed slide is class-driven (pair with `compassRailRootClasses`
   * on the `<Compass>` root).
   */
  isMobile?: boolean;
  /** Controlled mobile open state. Pair with `onOpenChange`. */
  isOpen?: boolean;
  /** Uncontrolled initial open state (default false). */
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

/** Group consecutive actions sharing a groupId; undefined = standalone. */
function cluster(actions: CompassRailAction[]) {
  const runs: { key: string; grouped: boolean; items: CompassRailAction[] }[] = [];
  for (const a of actions) {
    const last = runs[runs.length - 1];
    if (a.groupId && last && last.grouped && last.key === a.groupId) {
      last.items.push(a);
    } else if (a.groupId) {
      runs.push({ key: a.groupId, grouped: true, items: [a] });
    } else {
      runs.push({ key: a.id, grouped: false, items: [a] });
    }
  }
  return runs;
}

export function CompassRail({
  labels = compassRailEnLabels,
  side,
  actions,
  isMobile = false,
  isOpen,
  defaultOpen = false,
  onOpenChange,
}: CompassRailProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const open = isOpen ?? internalOpen;

  const toggle = () => {
    const next = !open;
    if (isOpen === undefined) setInternalOpen(next);
    onOpenChange?.(next);
  };

  const runs = cluster(actions);
  const renderItem = (a: CompassRailAction) => (
    <ActionListItem key={a.id}>
      <Tooltip content={a.label}>
        <Button
          isCircle
          variant="plain"
          icon={a.icon}
          aria-label={a.label}
          onClick={a.onClick}
          {...(a.isDisabled ? { isAriaDisabled: true } : {})}
        />
      </Tooltip>
    </ActionListItem>
  );

  // Chevron points inward when closed (open affordance), outward when open.
  const startChevron = open ? <AngleLeftIcon /> : <AngleRightIcon />;
  const endChevron = open ? <AngleRightIcon /> : <AngleLeftIcon />;

  return (
    <>
      <Panel isPill isGlass>
        <PanelMain>
          <PanelMainBody>
            <ActionList isIconList isVertical>
              {runs.map((run) =>
                run.grouped ? (
                  <ActionListGroup key={run.key}>
                    {run.items.map(renderItem)}
                  </ActionListGroup>
                ) : (
                  renderItem(run.items[0]!)
                ),
              )}
            </ActionList>
          </PanelMainBody>
        </PanelMain>
      </Panel>
      {isMobile ? (
        <button
          type="button"
          aria-label={(open ? labels.closeRail : labels.openRail).replace("{side}", side)}
          aria-expanded={open}
          onClick={toggle}
          className={`gp-cmp-rail-handle gp-cmp-rail-handle--${side}${open ? " is-rail-open" : ""}`}
        >
          {side === "start" ? startChevron : endChevron}
        </button>
      ) : null}
    </>
  );
}
