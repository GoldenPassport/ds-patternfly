/**
 * Footer — the branded site footer. The exported AppFooter owns the layout
 * (logo + tagline, link-group columns, and a bottom bar with copyright +
 * inline legal links); you pass content. Three common shapes below: compact,
 * multi-column, build info.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { AppFooter, type FooterLinkGroup } from "@golden-passport/ds-patternfly";

/** Demo brand mark for the multi-column footer's logo slot. */
function AcmeLogo() {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
      <svg viewBox="0 0 40 40" width={36} height={36} aria-hidden="true" focusable="false">
        <circle cx="20" cy="20" r="20" fill="#0066cc" />
        <path
          d="M11 28 L20 10 L29 28 M14.5 22 L25.5 22"
          stroke="white"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
      <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: -0.5, color: "var(--gp-color-text-regular)" }}>
        Acme
      </span>
    </span>
  );
}

// #region Compact
export function Compact() {
  return (
    <AppFooter
      copyright="© 2026 Acme — Internal build · v1.4.2"
      legalLinks={[
        { label: "Privacy", href: "#" },
        { label: "Terms", href: "#" },
        { label: "Status", href: "#" },
      ]}
    />
  );
}
// #endregion

// #region MultiColumn
const linkGroups: FooterLinkGroup[] = [
  { title: "Product", links: ["Overview", "Pricing", "Roadmap", "Changelog"].map((label) => ({ label, href: "#" })) },
  { title: "Developers", links: ["Docs", "API reference", "Status", "Releases"].map((label) => ({ label, href: "#" })) },
  { title: "Company", links: ["About", "Careers", "Blog", "Contact"].map((label) => ({ label, href: "#" })) },
];

export function MultiColumn() {
  return (
    <AppFooter
      logo={<AcmeLogo />}
      tagline="The workflow engine behind 1,200+ enterprise teams."
      linkGroups={linkGroups}
      copyright="© 2026 Acme, Inc. All rights reserved."
      legalLinks={[
        { label: "Privacy", href: "#" },
        { label: "Terms", href: "#" },
        { label: "Cookies", href: "#" },
      ]}
    />
  );
}
// #endregion

// #region BuildInfo
export function BuildInfo() {
  // The copyright slot takes any node — here a build-status line.
  return (
    <AppFooter
      copyright={
        <span style={{ display: "inline-flex", gap: 16, alignItems: "center" }}>
          <span style={{ display: "inline-flex", gap: 6, alignItems: "center" }}>
            <span
              aria-hidden="true"
              style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--gp-color-status-success-bg, #3e8635)" }}
            />
            Production
          </span>
          <span>·</span>
          <span>
            <strong>v1.4.2</strong> <code style={{ fontSize: 12 }}>(3f1a2b9)</code>
          </span>
          <span>·</span>
          <span>Deployed 2h ago</span>
        </span>
      }
      legalLinks={[
        { label: "Runbooks", href: "#" },
        { label: "Slack #ops", href: "#" },
        { label: "Status page", href: "#" },
      ]}
    />
  );
}
// #endregion

export default function FooterExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <Compact />
      <MultiColumn />
      <BuildInfo />
    </div>
  );
}
