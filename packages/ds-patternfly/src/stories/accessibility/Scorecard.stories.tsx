import type { Meta, StoryObj } from "@storybook/react-vite";
import { FoundationPage, Section, Card } from "../../components/StoryKit.js";

const meta: Meta = {
  title: "Accessibility/Accessibility scorecard",
  parameters: { layout: "padded" },
};
export default meta;

type Status = "pass" | "partial" | "n/a";

interface Row {
  component: string;
  keyboard: Status;
  screenReader: Status;
  focusManagement: Status;
  contrast: Status;
  i18n: Status;
  notes: string;
}

const ROWS: Row[] = [
  {
    component: "ThemeProvider",
    keyboard: "n/a",
    screenReader: "n/a",
    focusManagement: "n/a",
    contrast: "pass",
    i18n: "n/a",
    notes:
      "Validates brand contrast in tests; emits CSS vars used by all downstream components.",
  },
  {
    component: "Shell",
    keyboard: "pass",
    screenReader: "pass",
    focusManagement: "pass",
    contrast: "pass",
    i18n: "pass",
    notes:
      "Skip-to-content link as first focusable. Masthead, sidebar, and main are landmark regions with required aria-labels.",
  },
  {
    component: "PrimaryDetailLayout",
    keyboard: "pass",
    screenReader: "pass",
    focusManagement: "partial",
    contrast: "pass",
    i18n: "pass",
    notes:
      "List uses role=\"listbox\" + role=\"option\" with aria-selected. Items are tabbable; Enter/Space select. Mobile pane state shifts focus implicitly — explicit focus restoration on back is on the roadmap.",
  },
  {
    component: "SkipToContent",
    keyboard: "pass",
    screenReader: "pass",
    focusManagement: "pass",
    contrast: "pass",
    i18n: "pass",
    notes:
      "Visually hidden until focused via clip-path; remains in the accessibility tree at all times.",
  },
];

const cellStyle: React.CSSProperties = {
  padding: "10px 12px",
  borderBlockEnd: "1px solid var(--gp-color-border-default)",
  fontFamily: "var(--gp-font-family)",
  fontSize: 13,
  verticalAlign: "top",
  textAlign: "left",
};

function Badge({ status }: { status: Status }) {
  const map: Record<Status, { bg: string; fg: string; label: string }> = {
    pass: {
      bg: "var(--gp-color-status-success-bg)",
      fg: "var(--gp-color-status-success-text)",
      label: "Pass",
    },
    partial: {
      bg: "var(--gp-color-status-warning-bg)",
      fg: "var(--gp-color-status-warning-text)",
      label: "Partial",
    },
    "n/a": {
      bg: "var(--gp-color-bg-secondary-default)",
      fg: "var(--gp-color-text-subtle)",
      label: "N/A",
    },
  };
  const { bg, fg, label } = map[status];
  return (
    <span
      style={{
        background: bg,
        color: fg,
        padding: "2px 8px",
        borderRadius: "var(--gp-radius-sm)",
        fontSize: 12,
        fontWeight: 600,
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  );
}

export const Scorecard: StoryObj = {
  render: () => (
    <FoundationPage
      title="Accessibility scorecard"
      intro={
        <>
          Per-component accessibility status. Updated as components ship.{" "}
          <strong>Pass</strong> means the property is verified by tests, prop
          contracts, or PatternFly&apos;s own a11y guarantees.{" "}
          <strong>Partial</strong> calls out a known gap with a path to close.
        </>
      }
    >
      <Section title="Components">
        <Card>
          <div
            style={{ overflowX: "auto" }}
            // Scrollable regions must be keyboard-accessible (WCAG 2.1.1)
            // so users without a pointer can scroll the table.
            tabIndex={0}
            role="region"
            aria-label="Per-component a11y status"
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                minWidth: 880,
              }}
            >
              <thead>
                <tr>
                  {[
                    "Component",
                    "Keyboard",
                    "Screen reader",
                    "Focus mgmt",
                    "Contrast",
                    "i18n",
                    "Notes",
                  ].map((h) => (
                    <th
                      key={h}
                      style={{
                        ...cellStyle,
                        background: "var(--gp-color-bg-secondary-default)",
                        color: "var(--gp-color-text-regular)",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        fontSize: 11,
                        letterSpacing: 0.5,
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r) => (
                  <tr key={r.component}>
                    <td
                      style={{
                        ...cellStyle,
                        color: "var(--gp-color-text-regular)",
                        fontWeight: 600,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {r.component}
                    </td>
                    <td style={cellStyle}>
                      <Badge status={r.keyboard} />
                    </td>
                    <td style={cellStyle}>
                      <Badge status={r.screenReader} />
                    </td>
                    <td style={cellStyle}>
                      <Badge status={r.focusManagement} />
                    </td>
                    <td style={cellStyle}>
                      <Badge status={r.contrast} />
                    </td>
                    <td style={cellStyle}>
                      <Badge status={r.i18n} />
                    </td>
                    <td
                      style={{
                        ...cellStyle,
                        color: "var(--gp-color-text-subtle)",
                        minWidth: 280,
                      }}
                    >
                      {r.notes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </Section>

      <Section
        title="Foundations"
        description="Cross-cutting properties verified at the system level."
      >
        <Card>
          <ul
            style={{
              margin: 0,
              padding: "16px 24px 16px 40px",
              color: "var(--gp-color-text-regular)",
              lineHeight: 1.8,
            }}
          >
            <li>
              <Badge status="pass" /> Brand color contrast — 56 automated
              checks across {`{2 brands}`} × {`{2 modes}`} ×{" "}
              {`{14 semantic pairs}`}.
            </li>
            <li>
              <Badge status="pass" /> Visible focus rings — base CSS rule
              applies to all <code>:focus-visible</code> inside any{" "}
              <code>[data-brand]</code> tree.
            </li>
            <li>
              <Badge status="pass" /> Logical CSS properties — no hardcoded{" "}
              <code>left</code>/<code>right</code>; RTL works without source
              changes.
            </li>
            <li>
              <Badge status="pass" /> i18n-readiness — zero hardcoded strings
              inside components.
            </li>
            <li>
              <Badge status="partial" /> Reduced motion — motion tokens exist;
              consumers must add the global{" "}
              <code>@media (prefers-reduced-motion)</code> rule. Roadmap: ship
              the rule in <code>styles/index.css</code>.
            </li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
