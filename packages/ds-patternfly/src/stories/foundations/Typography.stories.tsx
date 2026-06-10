import type { Meta, StoryObj } from "@storybook/react-vite";
import { useBrand } from "../../theme/useBrand.js";
import { FoundationPage, Section, Card } from "../_kit/StoryKit.js";

const meta: Meta = {
  title: "Foundations/Typography",
  parameters: { layout: "padded" },
};
export default meta;

interface TypeStyle {
  name: string;
  size: string;
  weight: number;
  lineHeight: number;
  family: "body" | "heading";
  example: string;
}

const STYLES: TypeStyle[] = [
  { name: "Display", size: "40px", weight: 700, lineHeight: 1.15, family: "heading", example: "Display heading" },
  { name: "Heading 1", size: "32px", weight: 700, lineHeight: 1.2, family: "heading", example: "Page heading" },
  { name: "Heading 2", size: "24px", weight: 600, lineHeight: 1.25, family: "heading", example: "Section heading" },
  { name: "Heading 3", size: "20px", weight: 600, lineHeight: 1.3, family: "heading", example: "Subsection" },
  { name: "Body large", size: "18px", weight: 400, lineHeight: 1.55, family: "body", example: "Larger body text for emphasis." },
  { name: "Body", size: "16px", weight: 400, lineHeight: 1.55, family: "body", example: "Default body text used across the system." },
  { name: "Body small", size: "14px", weight: 400, lineHeight: 1.5, family: "body", example: "Smaller body text and metadata." },
  { name: "Caption", size: "12px", weight: 400, lineHeight: 1.4, family: "body", example: "Captions, helper text, footnotes." },
];

export const TypeScale: StoryObj = {
  render: () => {
    const brand = useBrand();
    const headingFamily = brand.font.familyHeading ?? brand.font.family;
    return (
      <FoundationPage
        title="Typography"
        intro={
          <>
            Typography is sourced from the active brand. Two stacks: one for{" "}
            <strong>body</strong>, one for <strong>headings</strong> (defaults
            to body if unspecified). The scale below is a reference — the lib
            doesn&apos;t prescribe heading components today, leaving you free
            to use PatternFly&apos;s <code>&lt;Title&gt;</code> with these
            sizes.
          </>
        }
      >
        <Section
          title="Stacks"
          description="Defined per brand."
        >
          <Card>
            <div style={{ padding: 16 }}>
              <Row label="Body family" value={brand.font.family} />
              <Row label="Heading family" value={headingFamily} />
              <Row label="Base size" value={brand.font.sizeBase} />
            </div>
          </Card>
        </Section>

        <Section
          title="Type scale"
          description="The reference scale — apply via inline style or with PatternFly's typography utilities."
        >
          <Card>
            <div style={{ padding: 16 }}>
              {STYLES.map((s) => (
                <div
                  key={s.name}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "180px 1fr 200px",
                    alignItems: "baseline",
                    columnGap: 16,
                    padding: "12px 0",
                    borderBlockEnd: "1px solid var(--gp-color-border-subtle)",
                  }}
                >
                  <code style={{ color: "var(--gp-color-text-subtle)" }}>
                    {s.name}
                  </code>
                  <div
                    style={{
                      fontFamily:
                        s.family === "heading"
                          ? headingFamily
                          : brand.font.family,
                      fontSize: s.size,
                      fontWeight: s.weight,
                      lineHeight: s.lineHeight,
                      color: "var(--gp-color-text-regular)",
                    }}
                  >
                    {s.example}
                  </div>
                  <code
                    style={{
                      textAlign: "right",
                      color: "var(--gp-color-text-subtle)",
                      fontSize: 12,
                    }}
                  >
                    {s.size} · {s.weight} / {s.lineHeight}
                  </code>
                </div>
              ))}
            </div>
          </Card>
        </Section>

        <Section
          title="Reading sample"
          description="Body text rendered at base size in the active brand's body stack."
        >
          <Card>
            <div
              style={{
                padding: 24,
                fontFamily: brand.font.family,
                fontSize: brand.font.sizeBase,
                lineHeight: 1.6,
                color: "var(--gp-color-text-regular)",
                maxWidth: 640,
              }}
            >
              <p>
                The quick brown fox jumps over the lazy dog. 0123456789 —
                !@#$%^&amp;*() Sphinx of black quartz, judge my vow.
              </p>
              <p style={{ color: "var(--gp-color-text-subtle)" }}>
                Subtle paragraph: muted body text used for secondary content,
                helper text, and metadata.
              </p>
            </div>
          </Card>
        </Section>
      </FoundationPage>
    );
  },
};

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "160px 1fr",
        gap: 16,
        padding: "8px 0",
        borderBlockEnd: "1px solid var(--gp-color-border-subtle)",
      }}
    >
      <div style={{ fontWeight: 600, color: "var(--gp-color-text-regular)" }}>
        {label}
      </div>
      <code style={{ color: "var(--gp-color-text-subtle)" }}>{value}</code>
    </div>
  );
}
