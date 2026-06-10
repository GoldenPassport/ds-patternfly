import type { Meta, StoryObj } from "@storybook/react-vite";
import { useBrand } from "../../theme/useBrand.js";
import { FoundationPage, Section, Card, CodeBlock } from "../_kit/StoryKit.js";

const meta: Meta = {
  title: "Foundations/Radius",
  parameters: { layout: "padded" },
};
export default meta;

const KEYS = ["sharp", "tiny", "sm", "md", "lg", "pill"] as const;

export const Scale: StoryObj = {
  render: () => {
    const brand = useBrand();
    return (
      <FoundationPage
        title="Radius"
        intro={
          <>
            Six corner-radius tokens, aligned to PatternFly 6&apos;s
            semantic scale. Use them via the <code>--gp-radius-*</code> CSS
            variables or pass through brand tokens — values shift per brand
            without component changes.
          </>
        }
      >
        <Section title="Scale">
          <Card>
            <div
              style={{
                display: "flex",
                gap: 24,
                padding: 24,
                flexWrap: "wrap",
                alignItems: "flex-end",
              }}
            >
              {KEYS.map((k) => {
                // Wider rectangle for pill so the stadium shape reads;
                // square for the rest so the corner curve is comparable
                // step-to-step.
                const w = k === "pill" ? 120 : 64;
                return (
                  <div key={k} style={{ textAlign: "center" }}>
                    <div
                      style={{
                        width: w,
                        height: 64,
                        background: "var(--gp-color-brand-default)",
                        borderRadius: brand.radius[k],
                        // Tiny outline so sharp (0px) reads as a real
                        // square rather than a borderless block.
                        outline:
                          "1px solid var(--gp-color-border-subtle, transparent)",
                        outlineOffset: -1,
                      }}
                    />
                    <code
                      style={{
                        marginTop: 8,
                        display: "block",
                        color: "var(--gp-color-text-subtle)",
                      }}
                    >
                      --gp-radius-{k}
                    </code>
                    <code
                      style={{
                        display: "block",
                        color: "var(--gp-color-text-subtle)",
                        fontSize: 12,
                      }}
                    >
                      {brand.radius[k]}
                    </code>
                  </div>
                );
              })}
            </div>
          </Card>
        </Section>

        <Section
          title="When to use which"
          description="Pick by element role, not by feel. Stays consistent across components."
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
                <strong><code>sharp</code> (0px)</strong> — sharp corners.
                For dense data tables and any element where rounded edges
                would soften the interface inappropriately.
              </li>
              <li>
                <strong><code>tiny</code> (4px)</strong> — barely rounded.
                Tags inside inputs, micro-tooltips, anywhere a hint of
                curve helps but a clear curve would feel too soft.
              </li>
              <li>
                <strong><code>sm</code> (6px)</strong> — slightly rounded.
                Icon buttons, menus, form inputs. The "control" radius.
              </li>
              <li>
                <strong><code>md</code> (16px)</strong> — moderately
                rounded. Cards, panels — anything that wraps content as a
                contained block. The default surface radius.
              </li>
              <li>
                <strong><code>lg</code> (24px)</strong> — mostly rounded.
                Modals, drawers, feature callouts. Reach for it when the
                surface itself is the focal point.
              </li>
              <li>
                <strong><code>pill</code> (999px)</strong> — fully
                rounded. Standard buttons, badges, status pills, switch
                tracks. Renders as a stadium on wide elements and a
                circle on square ones.
              </li>
            </ul>
          </Card>
        </Section>

        <Section
          title="PF6 token mirroring"
          description="The brand radius tokens also feed PatternFly's own scale, so PF6 components inherit them automatically."
        >
          <Card>
            <div style={{ padding: 24, color: "var(--gp-color-text-regular)" }}>
              <CodeBlock>{`// brand.radius is mirrored 1:1 into PF6's semantic radius tokens:
"--pf-t--global--border--radius--sharp":  brand.radius.sharp,
"--pf-t--global--border--radius--tiny":   brand.radius.tiny,
"--pf-t--global--border--radius--small":  brand.radius.sm,
"--pf-t--global--border--radius--medium": brand.radius.md,
"--pf-t--global--border--radius--large":  brand.radius.lg,
"--pf-t--global--border--radius--pill":   brand.radius.pill,`}</CodeBlock>
              <p style={{ marginTop: 12, marginBottom: 0, color: "var(--gp-color-text-subtle)", fontSize: 14 }}>
                A brand changing any value shifts every PF6 Card / Modal /
                Drawer / Button / Label that uses that step too — single
                source of truth. Brand-level overrides are uncommon since
                PF6&apos;s defaults are well-tuned for most surfaces.
              </p>
            </div>
          </Card>
        </Section>
      </FoundationPage>
    );
  },
};
