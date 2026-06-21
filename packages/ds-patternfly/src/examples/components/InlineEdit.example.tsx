/**
 * InlineEditField — a read-by-default value that switches to an editable
 * control on demand. The exported lego block owns the read / edit toggle, the
 * pencil + check / times affordances, Enter-to-save / Escape-to-cancel, and
 * the draft + focus bookkeeping; you hold the committed value and persist it
 * from `onSave`.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useState } from "react";
import { InlineEditField } from "@golden-passport/ds-patternfly";

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: 12, color: "var(--gp-color-text-subtle)", marginBottom: 4 }}>
      {children}
    </div>
  );
}

// #region SingleLineField
export function SingleLineField() {
  const [title, setTitle] = useState("Quarterly review");
  const [owner, setOwner] = useState("Ada Lovelace");

  return (
    <div style={{ display: "grid", gap: 12, padding: 8 }}>
      <div>
        <FieldLabel>Title</FieldLabel>
        <InlineEditField value={title} onSave={setTitle} ariaLabel="title" />
      </div>
      <div>
        <FieldLabel>Owner</FieldLabel>
        <InlineEditField value={owner} onSave={setOwner} ariaLabel="owner" />
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
      <FieldLabel>Description</FieldLabel>
      <InlineEditField
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
  const [notes, setNotes] = useState("Action items captured from the planning session.");

  return (
    <div style={{ padding: 8 }}>
      <FieldLabel>Notes</FieldLabel>
      <InlineEditField value={notes} onSave={setNotes} ariaLabel="notes" multiline />
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
