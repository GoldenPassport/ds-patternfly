import { useId, type ReactNode } from "react";
import { Card, CardBody, CardHeader, CardTitle } from "../base/index.js";

export interface SelectableCardProps {
  /** Card heading. */
  title: ReactNode;
  /** Card body content. */
  children: ReactNode;
  /** Selected state (controlled). */
  isSelected: boolean;
  /** Fired on toggle with the next checked state. */
  onChange: (checked: boolean) => void;
  /**
   * Radio group (single) or independent checkbox (multiple). Default "single".
   */
  selectionVariant?: "single" | "multiple";
  /**
   * Group name. For single-select, all cards in one group MUST share a name so
   * they behave as one radio set. Defaults to a generated id (fine for
   * multiple-select / standalone cards).
   */
  name?: string;
  /** Card id (else generated). */
  id?: string;
}

/**
 * SelectableCard — a card that acts as a radio (single) or checkbox (multiple)
 * tile. The lego block owns the verbose `selectableActions` plumbing and the
 * id / aria wiring; you hold the selection state and pass `isSelected` /
 * `onChange`. For a single-select gallery, give every card the same `name` and
 * track the chosen id in the parent.
 */
export function SelectableCard({
  title,
  children,
  isSelected,
  onChange,
  selectionVariant = "single",
  name,
  id,
}: SelectableCardProps) {
  const reactId = useId();
  const cardId = id ?? `${reactId}-card`;
  const inputId = `${cardId}-input`;

  return (
    <Card id={cardId} isSelectable isSelected={isSelected}>
      <CardHeader
        selectableActions={{
          selectableActionId: inputId,
          selectableActionAriaLabelledby: cardId,
          name: name ?? `${reactId}-group`,
          variant: selectionVariant,
          onChange: (_e, checked) => onChange(checked),
        }}
      >
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardBody>{children}</CardBody>
    </Card>
  );
}
