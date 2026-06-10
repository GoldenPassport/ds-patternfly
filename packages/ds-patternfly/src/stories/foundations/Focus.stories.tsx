import type { Meta, StoryObj } from "@storybook/react-vite";
import { FoundationPage, Section, Card, CodeBlock } from "../_kit/StoryKit.js";

const meta: Meta = {
  title: "Foundations/Focus",
  parameters: { layout: "padded" },
};
export default meta;

export const Ring: StoryObj = {
  render: () => (
    <FoundationPage
      title="Focus"
      intro={
        <>
          The visible focus indicator is the most important a11y feature
          most teams under-invest in. The lib normalises PF6&apos;s mixed
          default (inputs inner, buttons / menus outer) into one
          consistent system-wide style, configurable via{" "}
          <code>&lt;ThemeProvider focusRing=&quot;outer&quot; | &quot;inner&quot;&gt;</code>.
        </>
      }
    >
      <Section
        title="Modes"
        description='Toggle the "Focus ring" toolbar above and tab through any input / button / menu to compare.'
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
                gridTemplateColumns: "minmax(80px, max-content) 1fr",
                rowGap: 8,
                columnGap: 24,
                fontFamily: "var(--gp-font-family)",
                fontSize: 14,
              }}
            >
              <strong style={{ color: "var(--gp-color-text-subtle)" }}>Mode</strong>
              <strong style={{ color: "var(--gp-color-text-subtle)" }}>Behaviour</strong>
              <code>outer</code>
              <span>
                Default. Ring sits outside the element via{" "}
                <code>outline-offset: +2px</code>. Consistent with PF6&apos;s
                button / menu defaults; the lib propagates it to inputs
                too (which PF6 ships as inner).
              </span>
              <code>inner</code>
              <span>
                Ring is inset via <code>outline-offset: -2px</code>.
                Compact, doesn&apos;t shift layout. Matches PF6&apos;s stock
                input style; the lib propagates it to buttons, menus,
                dropdowns, nav, tabs, data-list rows, jump-links,
                labels, and calendar dates so the system stays consistent.
              </span>
            </div>
            <p
              style={{
                margin: 0,
                color: "var(--gp-color-text-subtle)",
                fontSize: 14,
              }}
            >
              Why have a toggle at all: PF6&apos;s mixed default (inputs
              inner, everything else outer) is intentional but
              inconsistent. Pick one — outer if accessibility / visibility
              wins, inner if density / no-layout-shift wins. Compact
              tables, dense settings panels, and tooling UIs lean inner;
              most product apps lean outer.
            </p>
          </div>
        </Card>
      </Section>

      <Section title="Usage">
        <Card>
          <div style={{ padding: 24 }}>
            <CodeBlock>{`<ThemeProvider brand={brand} focusRing="inner">
  {/* compact app — focus rings inset across the whole UI */}
</ThemeProvider>

<ThemeProvider brand={brand} focusRing="outer">  {/* default */}
  {/* normal app — visible outer rings, with the textarea
      content padding pinned so the offset flip doesn't
      break textarea sizing */}
</ThemeProvider>`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section
        title="Why this needs special handling for inputs"
        description="PF6's TextArea derives its content padding from the focus-ring offset."
      >
        <Card>
          <div
            style={{
              padding: 24,
              color: "var(--gp-color-text-regular)",
            }}
          >
            <p style={{ marginTop: 0 }}>
              PF6 calculates textarea content padding as{" "}
              <code>calc(-1 * OutlineOffset)</code> — a clever trick that
              works only while the offset is negative (inner). When we
              flip to outer, the calc resolves negative and content jams
              against the field border.
            </p>
            <p style={{ marginBottom: 0 }}>
              In <code>outer</code> mode the lib re-pins four textarea
              padding tokens to <code>spacer--sm / --md</code> so content
              keeps its breathing room while the ring sits outside. Lives
              in <code>src/styles/index.css</code> next to the focus-ring
              rules.
            </p>
          </div>
        </Card>
      </Section>

      <Section
        title="Accessibility"
        description="WCAG 2.4.7 requires a visible focus indicator on every focusable element."
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
              <strong>Never set <code>outline: none</code> without a replacement.</strong>{" "}
              Hiding the focus ring strands keyboard users.
            </li>
            <li>
              <strong>Both modes meet WCAG.</strong> Inner saves 2px of layout
              space at the cost of slight visual tightness; outer is more
              prominent. Pick by app density, not a11y trade-off.
            </li>
            <li>
              <strong>Custom inputs need their own ring.</strong> If a
              consumer authors a non-PF input, our base CSS forces a 2px
              brand-coloured outline on <code>:focus-visible</code>{" "}
              regardless of mode — see <code>src/styles/index.css</code>.
            </li>
          </ul>
        </Card>
      </Section>

      <Section
        title="Future option"
        description="Per-input opt-out — currently held off."
      >
        <Card>
          <div
            style={{
              padding: 24,
              color: "var(--gp-color-text-regular)",
            }}
          >
            <p style={{ margin: 0 }}>
              A class-based per-instance toggle (
              <code>className=&quot;gp-focus-inner&quot;</code> on a single
              input) would let dense table-cell inputs keep an inner ring
              inside an otherwise-outer app. Holding off until there&apos;s
              a real use case driving the design.
            </p>
          </div>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
