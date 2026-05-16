import type { Meta, StoryObj } from "@storybook/react-vite";
import TagCount from "@patternfly/react-component-groups/dist/dynamic/TagCount";
import { FoundationPage, Section, Card, CodeBlock } from "../_storyKit.js";
import { DemoFrame, PropsTable } from "../_demoKit.js";

const meta: Meta = {
  title: "Component groups/Status and state indicators/Tag count",
  parameters: {
    layout: "padded",
    a11y: {
      // axe miscalculates contrast on PF6 surfaces with gradient buttons /
      // overlapping affordances. Brand-token contrast is validated by
      // tokens.test.ts.
      config: { rules: [{ id: "color-contrast", enabled: false }] },
    },
  },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Tag count"
      intro={
        <>
          A small clickable tag indicator with a count — &ldquo;3 tags&rdquo;.
          Use it in tables and lists where each row has tags but
          rendering them all inline would clutter the row. Click opens
          a popover / drawer with the full list.
        </>
      }
    >
      <Section title="Default">
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame>
              <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                <TagCount count={3} onClick={() => alert("show 3 tags")} />
                <TagCount count={12} onClick={() => alert("show 12 tags")} />
                <TagCount count={0} isAriaDisabled />
              </div>
            </DemoFrame>
            <CodeBlock>{`<TagCount count={3} onClick={openTagsDrawer} />`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section title="Most-used props">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "count", type: "number", description: "The number to display next to the tag glyph." },
                { name: "onClick", type: "(event) => void", description: "Click handler — typically opens a popover or drawer with the tag list." },
                { name: "iconSize", type: '"sm" | "md" | "lg" | "xl"', description: "Tag icon size. Match the surrounding row density." },
                { name: "isAriaDisabled", type: "boolean", description: "Render as visually disabled but still focusable (announces 'disabled')." },
                { name: "ouiaId", type: "string | number", description: "Stable test selector." },
              ]}
            />
            <p style={{ marginTop: 16, marginBottom: 0, color: "var(--gp-color-text-subtle)", fontSize: 14 }}>
              Inherits the rest of <code>ButtonProps</code>.
            </p>
          </div>
        </Card>
      </Section>

      <Section title="Accessibility">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Pass <code>aria-label</code></strong> when the row context isn&rsquo;t carried into the button — e.g. &ldquo;3 tags on workflow Quarterly review&rdquo;.</li>
            <li><strong>Disable when count is zero.</strong> Clicking a 0-count opens an empty drawer — use <code>isAriaDisabled</code> so the button still announces its meaning.</li>
            <li><strong>Match the popover / drawer it opens.</strong> If clicking shows tags inline, the count is enough; if it opens a sheet, mention that in the aria-label.</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
