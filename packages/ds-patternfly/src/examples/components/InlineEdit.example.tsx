/**
 * Inline edit — read-by-default field that switches to edit mode on demand.
 *
 * PatternFly publishes this as a recipe rather than a single component in
 * 6.4.3, so this file documents the canonical shape: a read view with a
 * pencil affordance, an edit view with a control + check / times buttons,
 * Enter-to-save and Escape-to-cancel.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useEffect, useRef, useState } from "react";
import {
  Button,
  Flex,
  FlexItem,
  TextArea,
  TextInput,
} from "@golden-passport/ds-patternfly";
import {
  CheckIcon,
  PencilAltIcon,
  TimesIcon,
} from "@patternfly/react-icons";

function InlineText({
  value,
  onSave,
  ariaLabel,
  placeholder,
  multiline = false,
}: {
  value: string;
  onSave: (next: string) => void;
  ariaLabel: string;
  placeholder?: string;
  multiline?: boolean;
}) {
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
    onSave(draft.trim());
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
          <span style={{ color: value ? "var(--gp-color-text-regular)" : "var(--gp-color-text-subtle)" }}>
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
            rows={3}
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

// #region SingleLineField
export function SingleLineField() {
  const [title, setTitle] = useState("Quarterly review");
  const [owner, setOwner] = useState("Ada Lovelace");

  return (
    <div style={{ display: "grid", gap: 12, padding: 8 }}>
      <div>
        <div
          style={{
            fontSize: 12,
            color: "var(--gp-color-text-subtle)",
            marginBottom: 4,
          }}
        >
          Title
        </div>
        <InlineText value={title} onSave={setTitle} ariaLabel="title" />
      </div>
      <div>
        <div
          style={{
            fontSize: 12,
            color: "var(--gp-color-text-subtle)",
            marginBottom: 4,
          }}
        >
          Owner
        </div>
        <InlineText value={owner} onSave={setOwner} ariaLabel="owner" />
      </div>
    </div>
  );
}
// #endregion

// #region EmptyState
export function EmptyState() {
  const [empty, setEmpty] = useState("");

  return (
    <div style={{ padding: 8 }}>
      <div
        style={{
          fontSize: 12,
          color: "var(--gp-color-text-subtle)",
          marginBottom: 4,
        }}
      >
        Description
      </div>
      <InlineText
        value={empty}
        onSave={setEmpty}
        placeholder="Add a description"
        ariaLabel="description"
      />
    </div>
  );
}
// #endregion

// #region Multiline
export function Multiline() {
  const [notes, setNotes] = useState(
    "Action items captured from the planning session.",
  );

  return (
    <div style={{ padding: 8 }}>
      <div
        style={{
          fontSize: 12,
          color: "var(--gp-color-text-subtle)",
          marginBottom: 4,
        }}
      >
        Notes
      </div>
      <InlineText value={notes} onSave={setNotes} ariaLabel="notes" multiline />
    </div>
  );
}
// #endregion

export default function InlineEditExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <SingleLineField />
      <EmptyState />
      <Multiline />
    </div>
  );
}
