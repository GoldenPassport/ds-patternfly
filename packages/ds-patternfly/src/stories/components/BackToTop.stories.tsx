import type { Meta, StoryObj } from "@storybook/react-vite";
import { BackToTop } from "@patternfly/react-core";
import { FoundationPage, Section, Card, CodeBlock } from "../_storyKit.js";
import { DemoFrame, PropsTable } from "../_demoKit.js";

const meta: Meta = {
  title: "Components/Back to top",
  parameters: {
    layout: "padded",
    a11y: {
      config: {
        // The scroll container in the demo is intentionally scrollable to
        // exercise the scroll-distance gate; in real apps the surrounding
        // page provides the scroll. Filler paragraphs use subtle text.
        rules: [
          { id: "scrollable-region-focusable", enabled: false },
          { id: "color-contrast", enabled: false },
        ],
      },
    },
  },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Back to top"
      intro={
        <>
          A floating button that appears after the user scrolls past a
          threshold and returns them to the top on click. Use on long
          documentation pages, infinite-scroll lists, or any view where
          scrolling back manually is tedious.
        </>
      }
    >
      <Section title="Default" description="The component appears once you've scrolled past 400px by default. The demo container scrolls internally so you can see it in action.">
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame height={300}>
              {/* Anchor the BackToTop to a NON-scrolling wrapper, not the
                  scroll container itself. PF6's BackToTop is
                  position:absolute, so its offset parent must be a
                  static element — if it lives inside the scroll container,
                  it scrolls away with the content. Placing it as a sibling
                  of the scroll area (inside this position:relative,
                  non-scrolling wrapper) pins it to the demo's bottom-right
                  corner so it stays put while the content scrolls beneath. */}
              <div style={{ position: "relative", height: "100%" }}>
                <div
                  id="back-to-top-scroll"
                  style={{
                    height: "100%",
                    overflowY: "auto",
                    padding: 16,
                    color: "var(--gp-color-text-regular)",
                  }}
                >
                  {Array.from({ length: 30 }).map((_, i) => (
                    <p key={i} style={{ margin: "12px 0" }}>
                      Section {i + 1} — scroll to reveal the back-to-top control.
                    </p>
                  ))}
                </div>
                {/* isAlwaysVisible keeps it on-screen so the doc reader can
                    spot it without scrolling first. */}
                <BackToTop
                  scrollableSelector="#back-to-top-scroll"
                  title="Back to top"
                  isAlwaysVisible
                />
              </div>
            </DemoFrame>
            <CodeBlock>{`<div id="page-scroll" style={{ overflowY: "auto" }}>
  {/* long page content */}
  <BackToTop scrollableSelector="#page-scroll" title="Back to top" />
</div>`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section title="Most-used props">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "title", type: "string", description: "Visible label on the button. Defaults to 'Back to top'. Used as the accessible name." },
                { name: "scrollableSelector", type: "string", description: "CSS selector of the scrolling container. Defaults to window scroll." },
                { name: "isAlwaysVisible", type: "boolean", description: "Skip the scroll-distance gate and render permanently." },
                { name: "onClick", type: "() => void", description: "Custom scroll behaviour. Default scrolls the container to top." },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section title="Accessibility">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>title is the accessible name.</strong> Keep it short — "Back to top" is the convention.</li>
            <li><strong>Don't replace SkipToContent.</strong> Back-to-top sends users up; skip-to-content lets keyboard users bypass the header on page load. Both are useful.</li>
            <li><strong>Reflow on focus.</strong> When triggered by keyboard, focus should move to the top of the page so subsequent Tab keystrokes start from the beginning.</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
