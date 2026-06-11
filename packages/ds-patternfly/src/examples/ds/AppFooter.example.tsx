/**
 * AppFooter — the branded site footer: an optional logo + tagline, optional
 * columns of link groups, and a bottom bar with copyright + inline legal
 * links. Layout + brand dials only; all content is caller-provided.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { AppFooter, type FooterLinkGroup } from "../_lib.js";

const linkGroups: FooterLinkGroup[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "Changelog", href: "#changelog" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "Careers", href: "#careers" },
      { label: "Blog", href: "#blog" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Docs", href: "#docs" },
      { label: "Status", href: "https://status.example.com", isExternal: true },
      { label: "Support", href: "#support" },
    ],
  },
];

// #region SiteFooter
export function SiteFooter() {
  return (
    <AppFooter
      logo={<strong>Acme</strong>}
      tagline="The platform teams build on."
      linkGroups={linkGroups}
      copyright="© 2026 Acme, Inc. All rights reserved."
      legalLinks={[
        { label: "Privacy", href: "#privacy" },
        { label: "Terms", href: "#terms" },
      ]}
    />
  );
}
// #endregion

export default function AppFooterExample() {
  return <SiteFooter />;
}
