import type { Meta, StoryObj } from "@storybook/react-vite";
import { FoundationPage, Section, Card } from "../_kit/StoryKit.js";
import { ClassTable, DemoFrame, ResponsiveNote } from "./_utilityKit.js";

const meta: Meta = {
  title: "Utility classes/Flex",
  parameters: { layout: "padded" },
};
export default meta;

const CONTAINER = [
  { className: "pf-v6-u-flex-direction-row", description: "Default — items lay out horizontally." },
  { className: "pf-v6-u-flex-direction-row-reverse", description: "Items flow right-to-left." },
  { className: "pf-v6-u-flex-direction-column", description: "Items stack vertically." },
  { className: "pf-v6-u-flex-direction-column-reverse", description: "Items stack bottom-to-top." },
  { className: "pf-v6-u-flex-nowrap", description: "Force a single line; items shrink to fit." },
  { className: "pf-v6-u-justify-content-flex-start", description: "Pack items to the start of the main axis." },
  { className: "pf-v6-u-justify-content-center", description: "Center items along the main axis." },
  { className: "pf-v6-u-justify-content-flex-end", description: "Pack items to the end of the main axis." },
  { className: "pf-v6-u-justify-content-space-between", description: "Distribute with the first/last items at the edges." },
  { className: "pf-v6-u-justify-content-space-around", description: "Equal space around each item." },
  { className: "pf-v6-u-align-items-center", description: "Center items along the cross axis." },
  { className: "pf-v6-u-align-items-flex-start", description: "Pack items to the start of the cross axis." },
  { className: "pf-v6-u-align-items-flex-end", description: "Pack items to the end of the cross axis." },
  { className: "pf-v6-u-align-items-stretch", description: "Items fill the cross axis (default)." },
  { className: "pf-v6-u-align-items-baseline", description: "Align items by their text baseline." },
];

const ITEM = [
  { className: "pf-v6-u-flex-1", description: "Shorthand for flex: 1 — grow and shrink to fill available space." },
  { className: "pf-v6-u-flex-fill", description: "Like flex-1 but with a fixed flex-basis of 0%." },
  { className: "pf-v6-u-flex-none", description: "Don't grow or shrink — keep intrinsic size." },
  { className: "pf-v6-u-flex-grow-1", description: "Allow this item to grow." },
  { className: "pf-v6-u-flex-grow-0", description: "Don't grow." },
  { className: "pf-v6-u-flex-shrink-1", description: "Allow this item to shrink." },
  { className: "pf-v6-u-flex-shrink-0", description: "Don't shrink — useful for icons next to growable text." },
  { className: "pf-v6-u-align-self-center", description: "Override container alignment for one item." },
];

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Flex utilities"
      intro={
        <>
          Single-purpose classes for flex containers and their items. For
          most layouts, prefer PatternFly&apos;s <code>Flex</code> component —
          but when you need one-off alignment or a quick toolbar row, these
          utilities are faster than writing inline styles.
        </>
      }
    >
      <Section title="Container classes" description="Apply to the flex container.">
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <ClassTable rows={CONTAINER} />
            <ResponsiveNote />
          </div>
        </Card>
      </Section>

      <Section title="Item classes" description="Apply to flex children.">
        <Card>
          <div style={{ padding: 24 }}>
            <ClassTable rows={ITEM} />
          </div>
        </Card>
      </Section>

      <Section title="Live demos">
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 24 }}>
            <DemoFrame>
              <code style={{ display: "block", fontSize: 12, marginBottom: 8, color: "var(--gp-color-text-subtle)" }}>
                pf-v6-u-display-flex pf-v6-u-justify-content-space-between pf-v6-u-align-items-center
              </code>
              <div
                className="pf-v6-u-display-flex pf-v6-u-justify-content-space-between pf-v6-u-align-items-center"
                style={{ padding: 12, background: "var(--gp-color-bg-primary-default)", borderRadius: "var(--gp-radius-sm)" }}
              >
                <strong>Page title</strong>
                <button type="button" style={{ padding: "6px 14px" }}>Action</button>
              </div>
            </DemoFrame>
            <DemoFrame>
              <code style={{ display: "block", fontSize: 12, marginBottom: 8, color: "var(--gp-color-text-subtle)" }}>
                Three items, the middle one has pf-v6-u-flex-1
              </code>
              <div
                className="pf-v6-u-display-flex"
                style={{ gap: 12, padding: 12, background: "var(--gp-color-bg-primary-default)", borderRadius: "var(--gp-radius-sm)" }}
              >
                <span style={{ background: "var(--gp-color-bg-secondary-default)", padding: "8px 12px" }}>fixed</span>
                <span className="pf-v6-u-flex-1" style={{ background: "var(--gp-color-bg-secondary-default)", padding: "8px 12px" }}>
                  fills the rest
                </span>
                <span style={{ background: "var(--gp-color-bg-secondary-default)", padding: "8px 12px" }}>fixed</span>
              </div>
            </DemoFrame>
          </div>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
