/**
 * Sidebar — a two-column layout primitive: fixed-width SidebarPanel next
 * to a flexible SidebarContent. For in-page side panels (filter rails,
 * TOCs, settings menus) — not the app-shell PageSidebar.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { Sidebar, SidebarContent, SidebarPanel } from "../_lib.js";

const filler = (
  <>
    <p style={{ marginTop: 0 }}>
      The main content area expands to fill remaining width.
    </p>
    <p>Resize the window to see the panel keep its share.</p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
      dapibus nulla id augue dictum commodo.
    </p>
  </>
);

// #region Basic
export function Basic() {
  return (
    <Sidebar>
      <SidebarPanel
        style={{
          background: "var(--gp-color-bg-secondary-default)",
          padding: 16,
        }}
      >
        <strong style={{ color: "var(--gp-color-text-regular)" }}>
          Filters
        </strong>
        <ul
          style={{
            margin: 8,
            padding: 0,
            listStyle: "none",
            color: "var(--gp-color-text-subtle)",
            lineHeight: 1.8,
          }}
        >
          <li>Status</li>
          <li>Owner</li>
          <li>Created date</li>
        </ul>
      </SidebarPanel>
      <SidebarContent style={{ padding: 16, color: "var(--gp-color-text-subtle)" }}>
        {filler}
      </SidebarContent>
    </Sidebar>
  );
}
// #endregion

// #region StickyPanel
export function StickyPanel() {
  return (
    <Sidebar style={{ height: "100%", overflow: "auto" }} tabIndex={0}>
      <SidebarPanel
        variant="sticky"
        style={{
          background: "var(--gp-color-bg-secondary-default)",
          padding: 16,
        }}
      >
        <strong style={{ color: "var(--gp-color-text-regular)" }}>
          Sticky filters
        </strong>
      </SidebarPanel>
      <SidebarContent style={{ padding: 16, color: "var(--gp-color-text-subtle)" }}>
        <p style={{ marginTop: 0 }}>Scroll me!</p>
        {Array.from({ length: 12 }).map((_, i) => (
          <p key={i}>Row {i + 1} — content keeps scrolling.</p>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
// #endregion

// #region RightAnchoredGutter
export function RightAnchoredGutter() {
  return (
    <Sidebar isPanelRight hasGutter>
      <SidebarPanel
        style={{
          background: "var(--gp-color-bg-secondary-default)",
          padding: 16,
        }}
      >
        <strong style={{ color: "var(--gp-color-text-regular)" }}>
          Side notes
        </strong>
      </SidebarPanel>
      <SidebarContent style={{ padding: 16, color: "var(--gp-color-text-subtle)" }}>
        {filler}
      </SidebarContent>
    </Sidebar>
  );
}
// #endregion

export default function SidebarExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <Basic />
      <div style={{ height: 220 }}>
        <StickyPanel />
      </div>
      <RightAnchoredGutter />
    </div>
  );
}
