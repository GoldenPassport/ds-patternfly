import { useEffect } from "react";
import type { CSSProperties, ReactNode } from "react";

/**
 * CSS block that scopes the PF6 Page sidenav-drawer animation to a container
 * id. Provides:
 *   - push mode at DemoFrame widths (PF6 only auto-switches to push at viewport
 *     ≥ xl, but the docs render Pages inside a narrower DemoFrame),
 *   - smooth, same-speed open/close (cubic-bezier + width transition, with
 *     `overflow: hidden` held across BOTH states so content doesn't snap into
 *     view on the open transition).
 *
 * Pair with `useSidenavOffClick` to close the drawer when the user clicks
 * outside the sidebar / toggle.
 */
export function sidenavDrawerCss(containerId: string) {
  const c = `#${containerId}`;
  return [
    `${c} .pf-v6-c-page {`,
    `  grid-template-areas: "header header" "sidebar main";`,
    `  grid-template-columns: auto 1fr;`,
    `}`,
    `${c} .pf-v6-c-page__sidebar {`,
    `  position: static;`,
    `  width: var(--pf-v6-c-page__sidebar--xl--Width);`,
    `  overflow: hidden;`,
    `  transition: width 220ms cubic-bezier(0.4, 0, 0.2, 1);`,
    `}`,
    `${c} .pf-v6-c-page__sidebar.pf-m-collapsed {`,
    `  width: 0;`,
    `}`,
  ].join("\n");
}

/**
 * Off-click close for the PF6 PageSidebar / PageToggleButton sidenav-drawer
 * pattern. Listens for mousedown on the document (and the Storybook iframe
 * document, since clicks inside the demo originate there); closes the drawer
 * when the click falls outside the sidebar and toggle elements but inside the
 * demo container.
 */
export function useSidenavOffClick({
  open,
  close,
  containerId,
  sidebarId,
  toggleId,
}: {
  open: boolean;
  close: () => void;
  containerId: string;
  sidebarId: string;
  toggleId: string;
}) {
  useEffect(() => {
    if (!open) return undefined;
    const handler = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (!target) return;
      const ownerDoc = target.ownerDocument;
      const root = ownerDoc.getElementById(containerId);
      if (!root || !root.contains(target)) return;
      const sidebar = ownerDoc.getElementById(sidebarId);
      const toggle = ownerDoc.getElementById(toggleId);
      if (sidebar?.contains(target) || toggle?.contains(target)) return;
      close();
    };
    document.addEventListener("mousedown", handler, true);
    const iframe = document.querySelector(
      "iframe#storybook-preview-iframe",
    ) as HTMLIFrameElement | null;
    const iframeDoc = iframe?.contentDocument;
    iframeDoc?.addEventListener("mousedown", handler, true);
    return () => {
      document.removeEventListener("mousedown", handler, true);
      iframeDoc?.removeEventListener("mousedown", handler, true);
    };
  }, [open, close, containerId, sidebarId, toggleId]);
}

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
