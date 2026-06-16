/**
 * Footer — PF6 doesn't ship a dedicated PageFooter component; the
 * convention is a final <PageSection component="footer"> at the bottom
 * of the Page. Three common shapes: compact, multi-column, build info.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { PageSection } from "@golden-passport/ds-patternfly";

/**
 * Demo brand mark for the multi-column footer. Real apps render a
 * PF6 <Brand> pointing at their hosted logo asset; an inline SVG keeps
 * this example asset-free, with the wordmark inheriting the theme's
 * text colour.
 */
function AcmeLogo() {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
      <svg
        viewBox="0 0 40 40"
        width={36}
        height={36}
        aria-hidden="true"
        focusable="false"
      >
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
      <span
        style={{
          fontSize: 17,
          fontWeight: 700,
          letterSpacing: -0.5,
          color: "var(--gp-color-text-regular)",
        }}
      >
        Acme
      </span>
    </span>
  );
}

// #region Compact
export function Compact() {
  return (
    <PageSection component="footer" variant="secondary">
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 16,
          alignItems: "center",
          justifyContent: "space-between",
          color: "var(--gp-color-text-subtle)",
          fontSize: 13,
        }}
      >
        <span>© 2026 Acme — Internal build · v1.4.2</span>
        <span style={{ display: "inline-flex", gap: 16 }}>
          <a href="#" style={{ color: "inherit" }}>Privacy</a>
          <a href="#" style={{ color: "inherit" }}>Terms</a>
          <a href="#" style={{ color: "inherit" }}>Status</a>
        </span>
      </div>
    </PageSection>
  );
}
// #endregion

// #region MultiColumn
export function MultiColumn() {
  return (
    <PageSection component="footer" variant="secondary">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 32,
          color: "var(--gp-color-text-regular)",
        }}
      >
        <div style={{ display: "grid", gap: 12 }}>
          <AcmeLogo />
          <p
            style={{
              margin: 0,
              color: "var(--gp-color-text-subtle)",
              fontSize: 13,
              lineHeight: 1.55,
            }}
          >
            The workflow engine behind 1,200+ enterprise teams.
          </p>
        </div>
        {[
          {
            title: "Product",
            links: ["Overview", "Pricing", "Roadmap", "Changelog"],
          },
          {
            title: "Developers",
            links: ["Docs", "API reference", "Status", "Releases"],
          },
          {
            title: "Company",
            links: ["About", "Careers", "Blog", "Contact"],
          },
        ].map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h2
              style={{
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: 0.4,
                textTransform: "uppercase",
                margin: "0 0 12px",
                color: "var(--gp-color-text-subtle)",
              }}
            >
              {col.title}
            </h2>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "grid",
                gap: 8,
              }}
            >
              {col.links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    style={{
                      color: "var(--gp-color-text-regular)",
                      fontSize: 14,
                      textDecoration: "none",
                    }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div
        style={{
          marginTop: 24,
          paddingTop: 16,
          borderTop: "1px solid var(--gp-color-border-subtle)",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: 12,
          color: "var(--gp-color-text-subtle)",
          fontSize: 13,
        }}
      >
        <span>© 2026 Acme, Inc. All rights reserved.</span>
        <span style={{ display: "inline-flex", gap: 16 }}>
          <a href="#" style={{ color: "inherit" }}>Privacy</a>
          <a href="#" style={{ color: "inherit" }}>Terms</a>
          <a href="#" style={{ color: "inherit" }}>Cookies</a>
        </span>
      </div>
    </PageSection>
  );
}
// #endregion

// #region BuildInfo
export function BuildInfo() {
  return (
    <PageSection component="footer" variant="secondary">
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 16,
          alignItems: "center",
          justifyContent: "space-between",
          color: "var(--gp-color-text-subtle)",
          fontSize: 13,
        }}
      >
        <span style={{ display: "inline-flex", gap: 16, alignItems: "center" }}>
          <span
            style={{
              display: "inline-flex",
              gap: 6,
              alignItems: "center",
            }}
          >
            <span
              aria-hidden="true"
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "var(--gp-color-status-success-bg, #3e8635)",
              }}
            />
            <span>Production</span>
          </span>
          <span>·</span>
          <span>
            <strong>v1.4.2</strong>{" "}
            <code style={{ fontSize: 12 }}>(3f1a2b9)</code>
          </span>
          <span>·</span>
          <span>Deployed 2h ago</span>
        </span>
        <span style={{ display: "inline-flex", gap: 16 }}>
          <a href="#" style={{ color: "inherit" }}>Runbooks</a>
          <a href="#" style={{ color: "inherit" }}>Slack #ops</a>
          <a href="#" style={{ color: "inherit" }}>Status page</a>
        </span>
      </div>
    </PageSection>
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
