/**
 * FieldBuilder (@patternfly/react-component-groups) — a two-column repeater
 * for dynamic form rows: env vars, tags, key/value pairs, conditions.
 * Manages the add / remove / focus-management chrome; you supply the inputs
 * via a render prop.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useId, useState } from "react";
import { FieldBuilder } from "@patternfly/react-component-groups/dist/dynamic/FieldBuilder";
import { TextInput } from "../_lib.js";

// FieldBuilder renders as a PF6 Table. The Table's TDs default to
// `padding-inline: 0`, so the Name / Value columns butt against each other
// and the row edges. Scope a bit of inline padding + a touch more row gap
// to give the inputs room to breathe. PF6 Table cells read their padding
// from CSS custom properties; `pf-m-compact` (used by FieldBuilder's inner
// Table) zeros the inline ones — override the tokens at the wrapper so the
// override survives PF6's own selectors regardless of breakpoint/grid mode.
const fieldBuilderSpacingCss = [
  ".gp-field-builder-demo .pf-v6-c-table {",
  "  --pf-v6-c-table--cell--PaddingInlineStart: 0;",
  "  --pf-v6-c-table--cell--PaddingInlineEnd: 12px;",
  "  --pf-v6-c-table--cell--PaddingBlockStart: 0.75rem;",
  "  --pf-v6-c-table--cell--PaddingBlockEnd: 0.75rem;",
  "}",
  ".gp-field-builder-demo .pf-v6-c-table__td:last-child,",
  ".gp-field-builder-demo .pf-v6-c-table__th:last-child {",
  "  --pf-v6-c-table--cell--PaddingInlineEnd: 0;",
  "}",
].join("\n");

type EnvVar = { key: string; value: string };

// #region KeyValueEditor
export function KeyValueEditor() {
  const id = useId();
  const [vars, setVars] = useState<EnvVar[]>([
    { key: "API_URL", value: "https://api.example.com" },
    { key: "LOG_LEVEL", value: "info" },
  ]);

  const update = (i: number, patch: Partial<EnvVar>) =>
    setVars((prev) => prev.map((v, idx) => (idx === i ? { ...v, ...patch } : v)));

  return (
    <div className="gp-field-builder-demo">
      <style dangerouslySetInnerHTML={{ __html: fieldBuilderSpacingCss }} />
      <FieldBuilder
        label="Environment variables"
        firstColumnLabel="Name"
        secondColumnLabel="Value"
        rowCount={vars.length}
        rowGroupLabelPrefix="Variable"
        fieldBuilderIdPrefix={id}
        onAddRow={() => setVars((p) => [...p, { key: "", value: "" }])}
        onRemoveRow={(_e, i) => setVars((p) => p.filter((_, idx) => idx !== i))}
        addButtonContent="Add variable"
      >
        {(helpers, i) => [
          <TextInput
            key={`k-${i}`}
            ref={helpers.focusRef as React.Ref<HTMLInputElement>}
            aria-label={helpers.firstColumnAriaLabel}
            value={vars[i]?.key ?? ""}
            onChange={(_e, v) => update(i, { key: v })}
          />,
          <TextInput
            key={`v-${i}`}
            aria-label={helpers.secondColumnAriaLabel ?? ""}
            value={vars[i]?.value ?? ""}
            onChange={(_e, v) => update(i, { value: v })}
          />,
        ]}
      </FieldBuilder>
    </div>
  );
}
// #endregion

// #region SingleColumn
export function SingleColumn() {
  const id = useId();
  const [tags, setTags] = useState<string[]>(["urgent", "billing"]);
  return (
    <div className="gp-field-builder-demo">
      <style dangerouslySetInnerHTML={{ __html: fieldBuilderSpacingCss }} />
      <FieldBuilder
        label="Tags"
        firstColumnLabel="Tag"
        rowCount={tags.length}
        rowGroupLabelPrefix="Tag"
        fieldBuilderIdPrefix={id}
        onAddRow={() => setTags((p) => [...p, ""])}
        onRemoveRow={(_e, i) => setTags((p) => p.filter((_, idx) => idx !== i))}
        addButtonContent="Add tag"
      >
        {(helpers, i) => (
          <TextInput
            ref={helpers.focusRef as React.Ref<HTMLInputElement>}
            aria-label={helpers.firstColumnAriaLabel}
            value={tags[i] ?? ""}
            onChange={(_e, v) =>
              setTags((p) => p.map((t, idx) => (idx === i ? v : t)))
            }
          />
        )}
      </FieldBuilder>
    </div>
  );
}
// #endregion

export default function FieldBuilderExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <KeyValueEditor />
      <SingleColumn />
    </div>
  );
}
