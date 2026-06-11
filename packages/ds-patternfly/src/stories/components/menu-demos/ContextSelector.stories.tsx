import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  FoundationPage,
  Section,
  Card,
  Example,
} from "../../_kit/StoryKit.js";
import { Demo as SelectorDemo } from "../../../examples/components/menu-demos/ContextSelector.example.js";
import selectorExampleSrc from "../../../examples/components/menu-demos/ContextSelector.example.tsx?raw";

const meta: Meta = {
  title: "Components/Menu/Context selector",
  parameters: { layout: "padded" },
};
export default meta;

export const Demo: StoryObj = {
  render: () => (
    <FoundationPage
      title="Context selector"
      intro={
        <>
          A scoped switcher — change the active workspace / project /
          organisation without leaving the current view. Built on{" "}
          <code>Select</code> + a search input above the list, with the
          current selection reflected in the trigger label.
        </>
      }
    >
      <Section
        title="Demo"
        description="Active context shown in the trigger; click to open a Select with grouped 'Recent' + 'All' sections, optional inline search."
      >
        <Card>
          <Example
            source={selectorExampleSrc}
            region="Demo"
            fileName="ContextSelector.example.tsx"
          >
            <SelectorDemo />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demo above — ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example
            source={selectorExampleSrc}
            fileName="ContextSelector.example.tsx"
          />
        </Card>
      </Section>

      <Section title="Pattern">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Trigger label = current context</strong>. Prefix with a category word so it&rsquo;s obvious what the user is switching (&ldquo;Workspace: Acme&rdquo;).</li>
            <li><strong>Recent + All sections</strong>. Surface the user&rsquo;s last few contexts at the top; the full list below for completeness.</li>
            <li><strong>Inline search</strong>. Once the list grows past ~10 items, an inline filter beats scrolling.</li>
            <li><strong>Show the current selection</strong> — a checkmark / bold treatment on the active item so the user can verify what they&rsquo;re on.</li>
          </ul>
        </Card>
      </Section>

      <Section title="When to use">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Workspace / project switchers</strong>. The active resource scope changes frequently and you want it always visible in the masthead.</li>
            <li><strong>Account / organisation switching</strong>. Same pattern, different label prefix.</li>
            <li><strong>Environment switching</strong>. Optionally pair with the Banner component to surface non-production environments.</li>
            <li><strong>For navigation between sibling apps</strong> — use Application launcher (previous page).</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
