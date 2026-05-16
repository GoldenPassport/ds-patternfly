import type { CSSProperties, ReactNode } from "react";

/**
 * Inline note used on every form/input page to remind the reader that the
 * focus-ring style is a system-wide setting rather than a per-component
 * choice. Tab into any input above to see the active ring; toggle the
 * "Focus ring" toolbar to compare.
 *
 * Cross-references the Foundations/Focus page for the full explanation —
 * keeps each component page focused on the component itself.
 */
export function FocusRingNote() {
  return (
    <div
      style={{
        margin: 0,
        padding: "12px 16px",
        background: "var(--gp-color-bg-secondary-default)",
        borderRadius: "var(--gp-radius-sm)",
        color: "var(--gp-color-text-regular)",
        fontSize: 14,
        lineHeight: 1.55,
      }}
    >
      <strong>Focus ring:</strong> system-wide setting via{" "}
      <code>&lt;ThemeProvider focusRing=&quot;outer&quot; | &quot;inner&quot;&gt;</code>.
      Tab into any input above and toggle the{" "}
      <strong>Focus ring</strong> toolbar item to compare. See{" "}
      <strong>Foundations → Focus</strong> for the full reference.
    </div>
  );
}

/**
 * Single shaded box used as a child inside layout demos so the reader can see
 * sizing and gap behavior. Numbered when the order matters.
 */
export function Box({
  label,
  style,
}: {
  label?: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        background: "var(--gp-color-brand-default)",
        color: "var(--gp-color-brand-on)",
        padding: "12px 16px",
        borderRadius: "var(--gp-radius-sm)",
        fontFamily: "var(--gp-font-family)",
        fontSize: 14,
        textAlign: "center",
        ...style,
      }}
    >
      {label}
    </div>
  );
}

/**
 * Frame around a live demo so the reader can see where the layout's bounds are.
 * Adds a dashed border + subtle background so transparent layout components
 * (e.g. <Stack>) remain visible.
 */
export function DemoFrame({
  children,
  height,
}: {
  children: ReactNode;
  height?: number | string;
}) {
  return (
    <div
      style={{
        border: "1px dashed var(--gp-color-border-subtle)",
        borderRadius: "var(--gp-radius-sm)",
        padding: 16,
        background: "var(--gp-color-bg-secondary-default)",
        height,
      }}
    >
      {children}
    </div>
  );
}

/**
 * Two-column reference table for component props.
 */
export function PropsTable({
  rows,
}: {
  rows: { name: string; type: string; description: ReactNode }[];
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(140px, max-content) minmax(180px, max-content) 1fr",
        rowGap: 8,
        columnGap: 24,
        fontFamily: "var(--gp-font-family)",
        fontSize: 14,
        color: "var(--gp-color-text-regular)",
      }}
    >
      <strong style={{ color: "var(--gp-color-text-subtle)" }}>Prop</strong>
      <strong style={{ color: "var(--gp-color-text-subtle)" }}>Type</strong>
      <strong style={{ color: "var(--gp-color-text-subtle)" }}>Description</strong>
      {rows.map((r) => (
        <div key={r.name} style={{ display: "contents" }}>
          <code style={{ wordBreak: "break-all" }}>{r.name}</code>
          <code style={{ color: "var(--gp-color-text-subtle)", wordBreak: "break-all" }}>
            {r.type}
          </code>
          <span>{r.description}</span>
        </div>
      ))}
    </div>
  );
}
