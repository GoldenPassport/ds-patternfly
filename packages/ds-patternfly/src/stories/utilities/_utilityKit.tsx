import type { ReactNode } from "react";

/**
 * Two-column reference table: utility class name on the left, description on
 * the right. Used by every utility-class story page so they stay visually
 * consistent.
 */
export function ClassTable({
  rows,
}: {
  rows: { className: string; description: ReactNode }[];
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(220px, max-content) 1fr",
        rowGap: 8,
        columnGap: 24,
        fontFamily: "var(--gp-font-family)",
        fontSize: 14,
        color: "var(--gp-color-text-regular)",
      }}
    >
      <strong style={{ color: "var(--gp-color-text-subtle)" }}>Class</strong>
      <strong style={{ color: "var(--gp-color-text-subtle)" }}>Effect</strong>
      {rows.map((r) => (
        <div
          key={r.className}
          style={{ display: "contents" }}
          // Each row is two grid cells via `display: contents`.
        >
          <code
            style={{
              fontFamily: "var(--gp-font-family-monospace, monospace)",
              wordBreak: "break-all",
            }}
          >
            {r.className}
          </code>
          <span>{r.description}</span>
        </div>
      ))}
    </div>
  );
}

/**
 * A small "rendered demo" frame so the page reader can see what a class
 * actually does without leaving the page. Adds a subtle border + padding.
 */
export function DemoFrame({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        border: "1px dashed var(--gp-color-border-subtle)",
        borderRadius: "var(--gp-radius-sm)",
        padding: 16,
        background: "var(--gp-color-bg-secondary-default)",
      }}
    >
      {children}
    </div>
  );
}

/**
 * Standard note about responsive variants. Every utility category supports
 * the same `-on-{sm,md,lg,xl,2xl}` suffix pattern, so we explain it once and
 * reference it from each page.
 */
export function ResponsiveNote() {
  return (
    <p
      style={{
        margin: 0,
        color: "var(--gp-color-text-subtle)",
        fontSize: 14,
      }}
    >
      Every class on this page also has{" "}
      <code>-on-sm</code>, <code>-on-md</code>, <code>-on-lg</code>,{" "}
      <code>-on-xl</code>, and <code>-on-2xl</code> suffix variants that apply
      only above the named breakpoint. Stack them to build mobile-first
      responsive behavior — see <strong>Foundations → Responsive and mobile</strong>{" "}
      for the breakpoint scale.
    </p>
  );
}
