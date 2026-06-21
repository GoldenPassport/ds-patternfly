import { useId, useState, type ReactNode } from "react";
import {
  Card,
  CardBody,
  CardExpandableContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../base/index.js";

export interface ExpandableCardProps {
  /** Card heading (always visible, doubles as the toggle row). */
  title: ReactNode;
  /** Content revealed when expanded. */
  children: ReactNode;
  /** Optional footer inside the expandable region. */
  footer?: ReactNode;
  /** Initial expanded state — uncontrolled. */
  defaultExpanded?: boolean;
  /** Controlled expanded state. Pair with `onExpandedChange`. */
  isExpanded?: boolean;
  /** Fired with the next expanded state on toggle. */
  onExpandedChange?: (expanded: boolean) => void;
  /** Accessible label for the expand toggle (default "Details"). */
  toggleAriaLabel?: string;
  /** Card id (else generated). */
  id?: string;
}

/**
 * ExpandableCard — a card whose body collapses behind a toggle in the header.
 * The lego block owns the expand state (controlled or uncontrolled), the
 * toggle button + its aria wiring, and the CardExpandableContent assembly; you
 * pass the title, the revealed content, and an optional footer.
 */
export function ExpandableCard({
  title,
  children,
  footer,
  defaultExpanded = false,
  isExpanded,
  onExpandedChange,
  toggleAriaLabel = "Details",
  id,
}: ExpandableCardProps) {
  const reactId = useId();
  const cardId = id ?? `${reactId}-card`;
  const titleId = `${cardId}-title`;
  const toggleId = `${cardId}-toggle`;

  const [internal, setInternal] = useState(defaultExpanded);
  const expanded = isExpanded ?? internal;

  const toggle = () => {
    const next = !expanded;
    if (isExpanded === undefined) setInternal(next);
    onExpandedChange?.(next);
  };

  return (
    <Card id={cardId} isExpanded={expanded}>
      <CardHeader
        onExpand={toggle}
        toggleButtonProps={{
          id: toggleId,
          "aria-label": toggleAriaLabel,
          "aria-labelledby": `${titleId} ${toggleId}`,
          "aria-expanded": expanded,
        }}
      >
        <CardTitle id={titleId}>{title}</CardTitle>
      </CardHeader>
      <CardExpandableContent>
        <CardBody>{children}</CardBody>
        {footer != null ? <CardFooter>{footer}</CardFooter> : null}
      </CardExpandableContent>
    </Card>
  );
}
