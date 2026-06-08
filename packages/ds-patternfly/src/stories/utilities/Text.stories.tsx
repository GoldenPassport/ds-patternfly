import type { Meta, StoryObj } from "@storybook/react-vite";
import { FoundationPage, Section, Card } from "../../components/StoryKit.js";
import { ClassTable, DemoFrame, ResponsiveNote } from "./_utilityKit.js";

const meta: Meta = {
  title: "Utility classes/Text",
  parameters: { layout: "padded" },
};
export default meta;

const SIZES = ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl"] as const;

const FAMILIES = [
  { className: "pf-v6-u-font-family-text", description: "Body / UI text family." },
  { className: "pf-v6-u-font-family-heading", description: "Heading family — typically the same brand font." },
  { className: "pf-v6-u-font-family-monospace", description: "Code / tabular numbers." },
];

const WEIGHTS = [
  { className: "pf-v6-u-font-weight-normal", description: "400 — body weight." },
  { className: "pf-v6-u-font-weight-bold", description: "700 — strong emphasis." },
];

const COLORS = [
  { className: "pf-v6-u-text-color-brand", description: "Brand primary color — for links and brand emphasis." },
  { className: "pf-v6-u-text-color-link", description: "Link color, typically the same as brand." },
  { className: "pf-v6-u-text-color-disabled", description: "Disabled-state text." },
  { className: "pf-v6-u-text-color-inverse", description: "Light text for use on dark surfaces." },
];

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Text utilities"
      intro={
        <>
          Font family, size, weight, color, and wrapping. For body copy and
          headings, prefer the system&apos;s typography tokens
          (<code>--gp-font-*</code>) — these utilities are for one-off labels
          and inline emphasis.
        </>
      }
    >
      <Section title="Font family">
        <Card>
          <div style={{ padding: 24 }}>
            <ClassTable rows={FAMILIES} />
          </div>
        </Card>
      </Section>

      <Section title="Font size" description="Eight steps; same scale as the typography foundation page.">
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <ClassTable
              rows={SIZES.map((s) => ({
                className: `pf-v6-u-font-size-${s}`,
                description: `Step ${s} on the type scale.`,
              }))}
            />
            <ResponsiveNote />
          </div>
        </Card>
      </Section>

      <Section title="Font weight">
        <Card>
          <div style={{ padding: 24 }}>
            <ClassTable rows={WEIGHTS} />
          </div>
        </Card>
      </Section>

      <Section title="Text color">
        <Card>
          <div style={{ padding: 24 }}>
            <ClassTable rows={COLORS} />
          </div>
        </Card>
      </Section>

      <Section title="Wrapping" description="A single utility for handling long unbroken strings.">
        <Card>
          <div style={{ padding: 24 }}>
            <ClassTable
              rows={[
                {
                  className: "pf-v6-u-text-break-word",
                  description: (
                    <>
                      Sets <code>overflow-wrap: break-word</code> so long
                      tokens (URLs, IDs) wrap rather than overflow their
                      container.
                    </>
                  ),
                },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section title="Live size demo">
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 4 }}>
            {SIZES.map((s) => (
              <DemoFrame key={s}>
                <code style={{ display: "block", fontSize: 12, marginBottom: 4, color: "var(--gp-color-text-subtle)" }}>
                  pf-v6-u-font-size-{s}
                </code>
                <div className={`pf-v6-u-font-size-${s}`}>
                  The quick brown fox jumps over the lazy dog.
                </div>
              </DemoFrame>
            ))}
          </div>
        </Card>
      </Section>

      <Section title="Live color + weight demo">
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 8 }}>
            {/* Brand and link render on the page surface; disabled and
                inverse only meet AA against their intended pairings, so we
                render those on top of matching background utilities. */}
            <DemoFrame>
              <code style={{ display: "block", fontSize: 12, marginBottom: 4, color: "var(--gp-color-text-subtle)" }}>
                pf-v6-u-text-color-brand
              </code>
              <p className="pf-v6-u-text-color-brand" style={{ margin: 0 }}>
                Sample text in this color.
              </p>
            </DemoFrame>
            <DemoFrame>
              <code style={{ display: "block", fontSize: 12, marginBottom: 4, color: "var(--gp-color-text-subtle)" }}>
                pf-v6-u-text-color-link
              </code>
              <p className="pf-v6-u-text-color-link" style={{ margin: 0 }}>
                Sample text in this color.
              </p>
            </DemoFrame>
            {/* No live demo for pf-v6-u-text-color-disabled — disabled text
                is intentionally low-contrast (it represents an unavailable
                control) and won't pass AA against any background, including
                the disabled-bg surface. See the table above for usage. */}
            <DemoFrame>
              <code style={{ display: "block", fontSize: 12, marginBottom: 4, color: "var(--gp-color-text-subtle)" }}>
                pf-v6-u-text-color-inverse (shown on an inverse background)
              </code>
              <div className="pf-v6-u-background-color-inverse" style={{ padding: 12, borderRadius: "var(--gp-radius-sm)" }}>
                <p className="pf-v6-u-text-color-inverse" style={{ margin: 0 }}>
                  Sample inverse text.
                </p>
              </div>
            </DemoFrame>
            <DemoFrame>
              <code style={{ display: "block", fontSize: 12, marginBottom: 4, color: "var(--gp-color-text-subtle)" }}>
                pf-v6-u-font-weight-bold
              </code>
              <p className="pf-v6-u-font-weight-bold" style={{ margin: 0 }}>
                Bold sample text.
              </p>
            </DemoFrame>
          </div>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
