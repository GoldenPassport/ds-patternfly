import type { Meta, StoryObj } from "@storybook/react-vite";
import { useBrand } from "../../theme/useBrand.js";
import { FoundationPage, Section, Card } from "../../components/StoryKit.js";

const meta: Meta = {
  title: "Foundations/Spacers",
  parameters: { layout: "padded" },
};
export default meta;

const KEYS = ["xs", "sm", "md", "lg", "xl"] as const;

function Bar({ size }: { size: string }) {
  return (
    <div
      style={{
        width: size,
        height: 16,
        background: "var(--gp-color-brand-default)",
        borderRadius: "var(--gp-radius-sm)",
      }}
    />
  );
}

export const Scale: StoryObj = {
  render: () => {
    const brand = useBrand();
    return (
      <FoundationPage
        title="Spacers"
        intro={
          <>
            The spacing scale is used for padding, margin, gaps, and inset.
            Five steps cover the great majority of layout decisions; if you
            need something between, prefer the next-larger token over a custom
            value to keep rhythm consistent.
          </>
        }
      >
        <Section
          title="Scale"
          description="Each row visualizes the absolute size of the token at default scale."
        >
          <Card>
            <div style={{ padding: 16 }}>
              {KEYS.map((k) => (
                <div
                  key={k}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "80px 1fr 80px",
                    alignItems: "center",
                    columnGap: 16,
                    padding: "8px 0",
                    borderBlockEnd: "1px solid var(--gp-color-border-subtle)",
                  }}
                >
                  <code style={{ color: "var(--gp-color-text-subtle)" }}>
                    --gp-space-{k}
                  </code>
                  <Bar size={brand.space[k]} />
                  <code
                    style={{
                      textAlign: "right",
                      color: "var(--gp-color-text-subtle)",
                    }}
                  >
                    {brand.space[k]}
                  </code>
                </div>
              ))}
            </div>
          </Card>
        </Section>

        <Section
          title="Applied"
          description="The same scale used as padding inside a card."
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: 12,
            }}
          >
            {KEYS.map((k) => (
              <Card key={k}>
                <div style={{ padding: brand.space[k] }}>
                  <div
                    style={{
                      background: "var(--gp-color-bg-secondary-default)",
                      borderRadius: "var(--gp-radius-sm)",
                      height: 48,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--gp-color-text-subtle)",
                      fontFamily: "var(--gp-font-family)",
                    }}
                  >
                    {k}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Section>

        <Section
          title="Form spacing overrides"
          description="PF6 ships tight default gaps inside FormGroup. The lib bumps both common ones from xs (~4px) to sm (~8px) so labels, inputs, and helper text breathe."
        >
          <Card>
            <div
              style={{
                padding: 24,
                color: "var(--gp-color-text-regular)",
                display: "grid",
                gap: 16,
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(280px, max-content) minmax(120px, max-content) 1fr",
                  rowGap: 8,
                  columnGap: 24,
                  fontFamily: "var(--gp-font-family)",
                  fontSize: 14,
                }}
              >
                <strong style={{ color: "var(--gp-color-text-subtle)" }}>Token</strong>
                <strong style={{ color: "var(--gp-color-text-subtle)" }}>Value</strong>
                <strong style={{ color: "var(--gp-color-text-subtle)" }}>Controls</strong>
                <code>--pf-v6-c-form__group--Gap</code>
                <code>spacer--sm</code>
                <span>Gap between label and input inside a FormGroup.</span>
                <code>--pf-v6-c-form__helper-text--MarginBlockStart</code>
                <code>spacer--sm</code>
                <span>Gap between input and helper / error text.</span>
              </div>
              <p style={{ margin: 0, color: "var(--gp-color-text-subtle)", fontSize: 14 }}>
                Both overrides live in <code>src/styles/index.css</code>. PF6&apos;s
                originals point at <code>spacer--xs</code> (~4px) — fine for
                dense settings forms, cramped for normal ones. The lib
                doubles them to <code>spacer--sm</code> (~8px) without
                touching the global spacer scale, so any non-form spacing
                stays on PF6&apos;s defaults.
              </p>
              <p style={{ margin: 0, color: "var(--gp-color-text-subtle)", fontSize: 14 }}>
                To tighten or expand, override the same two tokens at a
                higher-specificity selector in your app, or change the lib&apos;s
                base values:
              </p>
              <pre
                style={{
                  margin: 0,
                  padding: 16,
                  background: "var(--gp-color-bg-secondary-default)",
                  color: "var(--gp-color-text-regular)",
                  fontSize: 12,
                  borderRadius: "var(--gp-radius-sm)",
                  overflowX: "auto",
                }}
              >{`.pf-v6-c-form__group {
  --pf-v6-c-form__group--Gap: var(--pf-t--global--spacer--md);  /* more breathing */
}`}</pre>
            </div>
          </Card>
        </Section>

        {/* Focus ring lives on its own Foundations/Focus page (related
            density question, but not strictly spacing). Radius lives on
            Foundations/Radius. */}
      </FoundationPage>
    );
  },
};
