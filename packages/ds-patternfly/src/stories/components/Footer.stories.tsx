import type { Meta, StoryObj } from "@storybook/react-vite";
import { PageSection } from "@patternfly/react-core";
import { FoundationPage, Section, Card, CodeBlock } from "../../components/StoryKit.js";
import { DemoFrame, PropsTable } from "../../components/DemoKit.js";
import { AcmeLogo } from "../../components/AcmeLogo.js";

const meta: Meta = {
  title: "Components/Footer",
  parameters: { layout: "padded" },
};
export default meta;

/**
 * PF6 doesn't ship a dedicated `<PageFooter>` component — the convention
 * is a final `<PageSection component="footer">` at the bottom of the
 * Page. These demos show three common shapes:
 *
 *   1. **Compact** — single row, copyright + inline links. Suits dense
 *      app shells (the lib's `<Shell>` uses this pattern by default).
 *   2. **Multi-column** — marketing-style 4-column grid with link lists
 *      + brand. Use on public / docs pages.
 *   3. **Build info** — left-side status (version, env, last-deployed),
 *      right-side support links. Useful for internal tools.
 *
 * Accessibility notes:
 *
 *   - The native `<footer>` element only gets an implicit `contentinfo`
 *     role when it's a direct child of `<body>`. When `<PageSection
 *     component="footer">` is nested inside a Page main area it has no
 *     role, so don't add `aria-label` — axe flags label-on-roleless as
 *     `aria-prohibited-attr`. Visible content makes the purpose obvious.
 *   - PageSection injects a `pf-v6-c-page__main-body` div between the
 *     section element and its children, so flex / grid styles need to
 *     live on an inner wrapper, not the section itself.
 */
export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Footer"
      intro={
        <>
          PatternFly 6 doesn&rsquo;t ship a dedicated <code>PageFooter</code>{" "}
          component. The canonical pattern is a final{" "}
          <code>&lt;PageSection component=&quot;footer&quot;&gt;</code> at
          the bottom of the page, rendered as a <code>&lt;footer&gt;</code>{" "}
          landmark for assistive tech.
        </>
      }
    >
      <Section
        title="Compact — copyright + inline links"
        description="Single-row footer with copyright on the left and inline link group on the right. Default for the lib's Shell — see Layouts → Shell."
      >
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame>
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
            </DemoFrame>
            <CodeBlock>{`<PageSection component="footer" variant="secondary">
  <div style={{ display: "flex", justifyContent: "space-between" }}>
    <span>© 2026 Acme — v1.4.2</span>
    <span style={{ display: "inline-flex", gap: 16 }}>
      <a href="/privacy">Privacy</a>
      <a href="/terms">Terms</a>
      <a href="/status">Status</a>
    </span>
  </div>
</PageSection>`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section
        title="Multi-column — marketing / docs"
        description="Four-column grid with link lists + brand. Use on public landing pages, docs sites, marketing surfaces. The Gallery is intentionally responsive — columns stack on narrow viewports."
      >
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame>
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
            </DemoFrame>
            <CodeBlock>{`<PageSection component="footer" variant="secondary">
  <div style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: 32,
  }}>
    <div>
      <Brand src="/logo.svg" alt="Acme" />
      <p>Short product blurb.</p>
    </div>

    <nav aria-label="Product">
      <h2>Product</h2>
      <ul>{/* link list */}</ul>
    </nav>

    {/* … further nav columns … */}
  </div>

  <div style={{ marginTop: 24, paddingTop: 16, borderTop: "1px solid …" }}>
    <span>© 2026 Acme, Inc.</span>
    <span>{/* legal links */}</span>
  </div>
</PageSection>`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section
        title="Build info — internal tools"
        description="Left side carries deployment metadata (env, version, last deployed); right side carries support / runbook links. Status dot uses the brand-token surface colours so it follows the active theme."
      >
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame>
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
            </DemoFrame>
            <CodeBlock>{`<PageSection component="footer" variant="secondary">
  <div style={{ display: "flex", justifyContent: "space-between" }}>
    <span style={{ display: "inline-flex", gap: 16, alignItems: "center" }}>
      <span aria-hidden style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--gp-color-status-success-bg)" }} />
      <span>Production</span>
      <span>·</span>
      <span><strong>v1.4.2</strong> <code>(3f1a2b9)</code></span>
      <span>·</span>
      <span>Deployed 2h ago</span>
    </span>
    <span>{/* support links */}</span>
  </div>
</PageSection>`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section title="Most-used PageSection props for footers">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                {
                  name: 'component="footer"',
                  type: "ElementType",
                  description:
                    "Render the section as a <footer> element. Required for landmark semantics.",
                },
                {
                  name: 'variant="secondary"',
                  type: '"default" | "secondary"',
                  description:
                    "Tones the bg to the alt surface so the footer reads as separate from the content above.",
                },
                {
                  name: "padding",
                  type: "BreakpointObject<'padding' | 'noPadding'>",
                  description:
                    "Override the section's padding per breakpoint when the footer needs to bleed edge-to-edge.",
                },
                {
                  name: "isFilled",
                  type: "boolean",
                  description:
                    "Off by default for footers — you don't want it stretching to fill remaining height.",
                },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section title="Accessibility">
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
              <strong>
                Don&rsquo;t add <code>aria-label</code> on a nested footer.
              </strong>{" "}
              <code>&lt;footer&gt;</code> only carries an implicit{" "}
              <code>contentinfo</code> role when it&rsquo;s a direct child
              of <code>&lt;body&gt;</code>. Inside a Page main it has no
              role, so a label would be flagged as{" "}
              <code>aria-prohibited-attr</code>.
            </li>
            <li>
              <strong>Each nav group needs a name.</strong> If the footer
              has multiple link columns, wrap each in{" "}
              <code>&lt;nav aria-label=&quot;Product&quot;&gt;</code> so
              screen readers can list and jump between them. The visible
              heading text is the natural label.
            </li>
            <li>
              <strong>
                Decorative dots, dividers, and separators use{" "}
                <code>aria-hidden</code>.
              </strong>{" "}
              Bullet separators ("·") and status dots aren&rsquo;t content
              — hide them from AT so the label reads as one phrase.
            </li>
            <li>
              <strong>Contrast holds in both themes.</strong> Use the
              brand <code>text.subtle</code> token rather than{" "}
              <code>#888</code> hard-coded — token contrast is verified
              for both light and dark modes in{" "}
              <code>src/tokens/tokens.test.ts</code>.
            </li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
