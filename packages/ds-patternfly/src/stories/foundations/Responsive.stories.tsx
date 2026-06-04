import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect, useState } from "react";
import { FoundationPage, Section, Card, CodeBlock } from "../_storyKit.js";

const meta: Meta = {
  title: "Foundations/Responsive and mobile",
  parameters: { layout: "padded" },
};
export default meta;

/**
 * PatternFly 6 breakpoint scale. The lib itself currently only branches at
 * `md` (the PrimaryDetailLayout collapse), but consumer apps build on top of
 * the same scale so it's documented here as the canonical reference.
 */
const BREAKPOINTS = [
  { key: "default", min: 0, intent: "Mobile portrait — single column, stacked" },
  { key: "sm", min: 576, intent: "Mobile landscape — same single-column patterns, more breathing room" },
  { key: "md", min: 768, intent: "Tablet — list + detail side-by-side; sidebar nav becomes inline" },
  { key: "lg", min: 992, intent: "Small laptop — full multi-pane layouts" },
  { key: "xl", min: 1200, intent: "Desktop — denser data tables, max content width caps" },
  { key: "2xl", min: 1450, intent: "Wide desktop — additional whitespace, no new content density" },
] as const;

function useViewportWidth() {
  const [w, setW] = useState(() =>
    typeof window === "undefined" ? 0 : window.innerWidth,
  );
  useEffect(() => {
    const onResize = () => setW(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return w;
}

function activeBreakpoint(w: number): (typeof BREAKPOINTS)[number]["key"] {
  let active: (typeof BREAKPOINTS)[number]["key"] = "default";
  for (const b of BREAKPOINTS) if (w >= b.min) active = b.key;
  return active;
}

export const Overview: StoryObj = {
  render: () => {
    const w = useViewportWidth();
    const active = activeBreakpoint(w);

    return (
      <FoundationPage
        title="Responsive and mobile"
        intro={
          <>
            This system is mobile-first: every layout starts as a single
            column and progressively reveals more structure as horizontal
            space allows. Apps built on the lib inherit PatternFly 6&apos;s
            breakpoint scale; the lib&apos;s own components branch at one
            point — the <code>md</code> threshold (768px) — where the primary
            navigation pattern shifts from stacked panes to side-by-side.
          </>
        }
      >
        <Section
          title="Live viewport"
          description="Resize the Storybook canvas (or your browser window) to see the active breakpoint update."
        >
          <Card>
            <div style={{ padding: 24 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  marginBlockEnd: 24,
                  fontFamily: "var(--gp-font-family)",
                }}
              >
                <code
                  style={{
                    padding: "6px 12px",
                    background: "var(--gp-color-brand-default)",
                    color: "var(--gp-color-brand-on)",
                    borderRadius: "var(--gp-radius-sm)",
                    fontWeight: 600,
                  }}
                >
                  {active}
                </code>
                <span style={{ color: "var(--gp-color-text-subtle)" }}>
                  current viewport: <strong>{w}px</strong>
                </span>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "100px 100px 1fr",
                  rowGap: 8,
                  columnGap: 16,
                  alignItems: "center",
                  fontFamily: "var(--gp-font-family)",
                  fontSize: 14,
                }}
              >
                <strong style={{ color: "var(--gp-color-text-subtle)" }}>Token</strong>
                <strong style={{ color: "var(--gp-color-text-subtle)" }}>Min width</strong>
                <strong style={{ color: "var(--gp-color-text-subtle)" }}>Intent</strong>
                {BREAKPOINTS.map((b) => {
                  const isActive = b.key === active;
                  return (
                    <div
                      key={b.key}
                      style={{
                        display: "contents",
                        color: isActive
                          ? "var(--gp-color-text-regular)"
                          : "var(--gp-color-text-subtle)",
                      }}
                    >
                      <code style={{ fontWeight: isActive ? 700 : 400 }}>{b.key}</code>
                      <code>{b.min}px</code>
                      <span>{b.intent}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>
        </Section>

        <Section
          title="Mobile-first principles"
          description="What the system commits to on small screens — and what it asks app authors to commit to."
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
                <strong>Single-column by default.</strong> Layouts collapse to
                one stacked column below <code>md</code>. Side-by-side is a
                progressive enhancement, never a baseline assumption.
              </li>
              <li>
                <strong>No horizontal scroll.</strong> Content fits the
                viewport width on every breakpoint — tables and code blocks
                become scrollable containers internally rather than pushing
                the page.
              </li>
              <li>
                <strong>Touch targets ≥ 44×44 CSS pixels.</strong> WCAG 2.2
                Success Criterion 2.5.8 requires 24×24 minimum; this system
                targets 44×44 for primary interactions on touch surfaces.
                PatternFly&apos;s default control sizing already meets this;
                custom interactive elements must as well.
              </li>
              <li>
                <strong>Hover is never load-bearing.</strong> Anything
                discoverable via hover must also be discoverable via tap or
                keyboard focus. Mobile users have no hover.
              </li>
              <li>
                <strong>Logical properties everywhere.</strong>{" "}
                <code>inline-start</code> / <code>block-end</code> rather than{" "}
                <code>left</code> / <code>bottom</code>, so RTL and CJK
                vertical layouts work without overrides.
              </li>
            </ul>
          </Card>
        </Section>

        <Section
          title="The md threshold"
          description="The one breakpoint the lib itself encodes — at 768px."
        >
          <Card>
            <div style={{ padding: 24, color: "var(--gp-color-text-regular)" }}>
              <p style={{ marginTop: 0 }}>
                The <code>PrimaryDetailLayout</code> component switches between
                two distinct interaction models at this threshold. There is no
                middle state — the component is either in pane-toggle mode or
                in side-by-side mode.
              </p>
              <CodeBlock label="The actual CSS in src/styles/index.css">{`/* Side-by-side at md+ (768px), stacked below */
.gp-primary-detail {
  display: grid;
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .gp-primary-detail {
    grid-template-columns: minmax(280px, 360px) 1fr;
  }
}

/* Below md: one pane visible at a time, toggled by [data-pane] */
@media (max-width: 767.98px) {
  .gp-primary-detail[data-pane="list"]   .gp-primary-detail__detail { display: none; }
  .gp-primary-detail[data-pane="detail"] .gp-primary-detail__list   { display: none; }
}

/* The "back to list" button is mobile-only */
@media (min-width: 768px) {
  .gp-primary-detail__back-button { display: none; }
}`}</CodeBlock>
            </div>
          </Card>
        </Section>

        <Section
          title="Building responsive features in apps"
          description="Patterns the lib doesn't ship but that consumer apps should follow."
        >
          <Card>
            <div style={{ padding: 24, color: "var(--gp-color-text-regular)" }}>
              <p style={{ marginTop: 0 }}>
                Use PatternFly 6&apos;s built-in <code>Grid</code>,{" "}
                <code>Stack</code>, <code>Split</code>, and{" "}
                <code>Flex</code> primitives in preference to custom CSS. They
                already understand the breakpoint scale via{" "}
                <code>sm</code> / <code>md</code> / <code>lg</code>{" "}
                modifier props.
              </p>
              <CodeBlock label="Example: a feature card grid that responds to viewport width">{`import { Grid, GridItem } from "@patternfly/react-core";

<Grid hasGutter>
  {features.map((f) => (
    <GridItem key={f.id} span={12} md={6} lg={4}>
      <FeatureCard {...f} />
    </GridItem>
  ))}
</Grid>`}</CodeBlock>
              <p style={{ marginBottom: 0 }}>
                Reach for raw <code>@media</code> queries only when a layout
                truly cannot be expressed with PatternFly primitives — and
                when you do, use the <code>min-width: 768px</code> threshold
                that the lib already encodes, so component and app behavior
                pivot at the same point.
              </p>
            </div>
          </Card>
        </Section>

        <Section
          title="Touch target sizing"
          description="The minimum hit area for any interactive element on touch surfaces."
        >
          <Card>
            <div style={{ padding: 24 }}>
              <div
                style={{
                  display: "flex",
                  gap: 32,
                  alignItems: "flex-end",
                  flexWrap: "wrap",
                  fontFamily: "var(--gp-font-family)",
                }}
              >
                {[
                  { size: 24, label: "24×24 — WCAG 2.2 minimum (AA)", tone: "warn" },
                  { size: 44, label: "44×44 — system target", tone: "ok" },
                ].map((t) => (
                  <div key={t.size} style={{ textAlign: "center" }}>
                    <div
                      style={{
                        width: t.size,
                        height: t.size,
                        background:
                          t.tone === "ok"
                            ? "var(--gp-color-status-success-icon)"
                            : "var(--gp-color-status-warning-icon)",
                        borderRadius: "var(--gp-radius-sm)",
                        marginInline: "auto",
                      }}
                    />
                    <code
                      style={{
                        display: "block",
                        marginTop: 8,
                        fontSize: 12,
                        color: "var(--gp-color-text-subtle)",
                      }}
                    >
                      {t.label}
                    </code>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </Section>
      </FoundationPage>
    );
  },
};
