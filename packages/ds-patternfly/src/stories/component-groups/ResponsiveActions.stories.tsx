import type { Meta, StoryObj } from "@storybook/react-vite";
import ResponsiveActions from "@patternfly/react-component-groups/dist/dynamic/ResponsiveActions";
import ResponsiveAction from "@patternfly/react-component-groups/dist/dynamic/ResponsiveAction";
import { FoundationPage, Section, Card, CodeBlock } from "../_kit/StoryKit.js";
import { DemoFrame, PropsTable } from "../_kit/DemoKit.js";

const meta: Meta = {
  title: "Component groups/Controls/Responsive actions",
  parameters: {
    layout: "padded",
    a11y: {
      // axe miscalculates contrast on PF6 surfaces with gradient buttons /
      // overlapping affordances. Brand-token contrast is validated by
      // tokens.test.ts.
      config: {
        rules: [
          { id: "color-contrast", enabled: false },
          { id: "heading-order",  enabled: false },
        ],
      },
    },
  },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Responsive actions"
      intro={
        <>
          A toolbar action set that collapses into a kebab dropdown below
          a configurable breakpoint. Wraps PF6&rsquo;s <code>OverflowMenu</code>{" "}
          with a per-action persistence flag so primary actions stay
          visible and secondary ones move into the kebab on narrow
          viewports.
        </>
      }
    >
      <Section
        title="Persistent + collapsing"
        description="Persistent actions are always visible; non-persistent ones collapse into the kebab below `breakpoint`."
      >
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame>
              <ResponsiveActions breakpoint="md">
                <ResponsiveAction isPersistent variant="primary">Run</ResponsiveAction>
                <ResponsiveAction isPersistent variant="secondary">Logs</ResponsiveAction>
                <ResponsiveAction variant="tertiary">Edit</ResponsiveAction>
                <ResponsiveAction variant="tertiary">Disable</ResponsiveAction>
                <ResponsiveAction variant="tertiary">Delete</ResponsiveAction>
              </ResponsiveActions>
            </DemoFrame>
            <CodeBlock>{`<ResponsiveActions breakpoint="md">
  <ResponsiveAction isPersistent variant="primary">Run</ResponsiveAction>
  <ResponsiveAction isPersistent variant="secondary">Logs</ResponsiveAction>
  <ResponsiveAction variant="tertiary">Edit</ResponsiveAction>
  <ResponsiveAction variant="tertiary">Disable</ResponsiveAction>
  <ResponsiveAction variant="tertiary">Delete</ResponsiveAction>
</ResponsiveActions>`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section title="Most-used ResponsiveActions props">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "breakpoint", type: '"sm" | "md" | "lg" | "xl" | "2xl"', description: "Below this breakpoint the non-persistent actions collapse into the kebab. Default `md`." },
                { name: "ouiaId", type: "string", description: "Stable test selector." },
              ]}
            />
            <p style={{ marginTop: 16, marginBottom: 0, color: "var(--gp-color-text-subtle)", fontSize: 14 }}>
              Inherits the rest of <code>OverflowMenuProps</code>.
            </p>
          </div>
        </Card>
      </Section>

      <Section title="Most-used ResponsiveAction props">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "isPersistent", type: "boolean", description: "Keep this action visible at all viewport sizes (don't collapse into the kebab). Reserve for the 1–2 highest-priority actions." },
                { name: "onClick", type: "(event) => void", description: "Optional click handler — applied both when shown as a button and when shown inside the kebab menu item." },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section title="Accessibility">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Persistent actions stay focusable.</strong> Tab order remains stable across breakpoints — keyboard users don&rsquo;t lose their place when the layout collapses.</li>
            <li><strong>Cap visible actions at 2–3.</strong> The whole point is to avoid a crowded toolbar; mark only the truly primary actions <code>isPersistent</code>.</li>
            <li><strong>Match button text in the kebab.</strong> When an action collapses, its label becomes a <code>MenuItem</code> — make sure the button label is meaningful on its own (no icon-only buttons inside the overflow set).</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
