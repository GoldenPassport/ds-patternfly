import { useEffect, useRef, useState } from "react";
import { Button, Flex, FlexItem, TextArea, TextInput } from "../base/index.js";
import { CheckIcon, PencilAltIcon, TimesIcon } from "@patternfly/react-icons";

/**
 * InlineEditField — a read-by-default value that switches to an editable
 * control on demand. PF6 publishes inline-edit as a recipe rather than a
 * component, so this lego block owns the canonical shape: a read view with a
 * pencil affordance, an edit view with the control + check / times buttons,
 * Enter-to-save (Cmd/Ctrl+Enter for multiline) and Escape-to-cancel, plus the
 * draft / focus bookkeeping. Fully controlled — you hold the committed value
 * and persist it from `onSave`.
 */
export interface InlineEditFieldProps {
  /** The committed value shown in read mode. */
  value: string;
  /** Fired with the new value when the user saves. */
  onSave: (next: string) => void;
  /** Accessible name; also seeds the edit / save / cancel button labels. */
  ariaLabel: string;
  /** Shown (subtly) in read mode when `value` is empty. */
  placeholder?: string;
  /** Use a multi-line TextArea (Cmd/Ctrl+Enter saves). */
  multiline?: boolean;
  /** Row count for the multiline control (default 3). */
  rows?: number;
  /** Trim whitespace before saving (default true). */
  trimOnSave?: boolean;
}

export function InlineEditField({
  value,
  onSave,
  ariaLabel,
  placeholder,
  multiline = false,
  rows = 3,
  trimOnSave = true,
}: InlineEditFieldProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  const start = () => {
    setDraft(value);
    setEditing(true);
  };
  const commit = () => {
    onSave(trimOnSave ? draft.trim() : draft);
    setEditing(false);
  };
  const cancel = () => {
    setDraft(value);
    setEditing(false);
  };

  if (!editing) {
    return (
      <Flex
        alignItems={{ default: "alignItemsCenter" }}
        spaceItems={{ default: "spaceItemsSm" }}
      >
        <FlexItem>
          <span
            style={{
              color: value ? "var(--gp-color-text-regular)" : "var(--gp-color-text-subtle)",
            }}
          >
            {value || placeholder || "—"}
          </span>
        </FlexItem>
        <FlexItem>
          <Button
            variant="plain"
            aria-label={`Edit ${ariaLabel}`}
            onClick={start}
            icon={<PencilAltIcon />}
          />
        </FlexItem>
      </Flex>
    );
  }

  return (
    <Flex
      alignItems={{ default: multiline ? "alignItemsFlexStart" : "alignItemsCenter" }}
      spaceItems={{ default: "spaceItemsSm" }}
    >
      <FlexItem grow={{ default: "grow" }}>
        {multiline ? (
          <TextArea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            aria-label={ariaLabel}
            value={draft}
            onChange={(_e, v) => setDraft(v)}
            onKeyDown={(e) => {
              if (e.key === "Escape") cancel();
              if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) commit();
            }}
            rows={rows}
          />
        ) : (
          <TextInput
            ref={inputRef as React.RefObject<HTMLInputElement>}
            aria-label={ariaLabel}
            value={draft}
            onChange={(_e, v) => setDraft(v)}
            onKeyDown={(e) => {
              if (e.key === "Escape") cancel();
              if (e.key === "Enter") commit();
            }}
          />
        )}
      </FlexItem>
      <FlexItem>
        <Button
          variant="plain"
          aria-label={`Save ${ariaLabel}`}
          onClick={commit}
          icon={<CheckIcon />}
        />
      </FlexItem>
      <FlexItem>
        <Button
          variant="plain"
          aria-label={`Cancel editing ${ariaLabel}`}
          onClick={cancel}
          icon={<TimesIcon />}
        />
      </FlexItem>
    </Flex>
  );
}
