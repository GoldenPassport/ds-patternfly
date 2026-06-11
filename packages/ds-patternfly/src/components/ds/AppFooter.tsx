import type { ReactNode } from "react";
import { Content } from "../base/index.js";

/** A titled column of footer links. */
export interface FooterLinkGroup {
  title: string;
  links: { label: string; href: string; isExternal?: boolean }[];
}

/**
 * AppFooter — the branded site footer: an optional logo + tagline, optional
 * columns of link groups, and a bottom bar with copyright + inline legal
 * links. Layout + brand dials only; all content is caller-provided.
 */
export interface AppFooterProps {
  /** Brand mark / logo node, shown top-left. */
  logo?: ReactNode;
  /** Short tagline under the logo. */
  tagline?: ReactNode;
  /** Columns of links (sitemap-style). */
  linkGroups?: FooterLinkGroup[];
  /** Copyright / legal line in the bottom bar. */
  copyright?: ReactNode;
  /** Inline links in the bottom bar (Privacy, Terms, …). */
  legalLinks?: { label: string; href: string }[];
}

export function AppFooter({
  logo,
  tagline,
  linkGroups = [],
  copyright,
  legalLinks = [],
}: AppFooterProps) {
  return (
    <footer
      style={{
        background: "var(--gp-color-bg-secondary-default)",
        borderBlockStart: "1px solid var(--gp-color-border-default)",
        color: "var(--gp-color-text-regular)",
        padding: "var(--gp-pad-section, 2rem) 1.5rem",
      }}
    >
      {(logo || tagline || linkGroups.length > 0) && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "2rem",
            justifyContent: "space-between",
            maxInlineSize: 1200,
            marginInline: "auto",
          }}
        >
          {(logo || tagline) && (
            <div style={{ maxInlineSize: 280 }}>
              {logo}
              {tagline ? (
                <Content
                  component="p"
                  style={{ margin: "0.5rem 0 0", color: "var(--gp-color-text-subtle)" }}
                >
                  {tagline}
                </Content>
              ) : null}
            </div>
          )}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "2.5rem" }}>
            {linkGroups.map((group) => (
              <nav key={group.title} aria-label={group.title}>
                <div
                  style={{
                    fontWeight: 600,
                    marginBlockEnd: "0.5rem",
                    color: "var(--gp-color-text-regular)",
                  }}
                >
                  {group.title}
                </div>
                <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: "0.375rem" }}>
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        {...(link.isExternal ? { target: "_blank", rel: "noreferrer" } : {})}
                        style={{ color: "var(--gp-color-text-link)", textDecoration: "none" }}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
      )}
      {(copyright || legalLinks.length > 0) && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            justifyContent: "space-between",
            alignItems: "center",
            maxInlineSize: 1200,
            marginInline: "auto",
            marginBlockStart: linkGroups.length > 0 ? "1.5rem" : 0,
            paddingBlockStart: "1rem",
            borderBlockStart: "1px solid var(--gp-color-border-subtle)",
            color: "var(--gp-color-text-subtle)",
            fontSize: 13,
          }}
        >
          <span>{copyright}</span>
          {legalLinks.length > 0 ? (
            <span style={{ display: "inline-flex", gap: "1rem" }}>
              {legalLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  style={{ color: "inherit" }}
                >
                  {link.label}
                </a>
              ))}
            </span>
          ) : null}
        </div>
      )}
    </footer>
  );
}
