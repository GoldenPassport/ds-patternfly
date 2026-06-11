import type { Meta, StoryObj } from "@storybook/react-vite";
import { FoundationPage, Section, Card, Example } from "../_kit/StoryKit.js";
import { PropsTable } from "../_kit/DemoKit.js";
import {
  DefaultDanger,
  OtherVariants,
} from "../../examples/component-groups/LogSnippet.example.js";
import logSnippetExampleSrc from "../../examples/component-groups/LogSnippet.example.tsx?raw";

const meta: Meta = {
  title: "Component groups/Helpers/Log snippet",
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
      title="Log snippet"
      intro={
        <>
          A small, alert-coloured block for inline error logs and stack
          traces. Use it inside detail panels, error states, or
          notification drawers when you want to surface a snippet of
          machine output without launching a full log viewer.
        </>
      }
    >
      <Section title="Default (danger)">
        <Card>
          <Example
            source={logSnippetExampleSrc}
            region="DefaultDanger"
            fileName="LogSnippet.example.tsx"
          >
            <DefaultDanger />
          </Example>
        </Card>
      </Section>

      <Section
        title="Other variants"
        description="warning / info / success colour the side rail to match the severity of the surrounding context."
      >
        <Card>
          <Example
            source={logSnippetExampleSrc}
            region="OtherVariants"
            fileName="LogSnippet.example.tsx"
          >
            <OtherVariants />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example source={logSnippetExampleSrc} fileName="LogSnippet.example.tsx" />
        </Card>
      </Section>

      <Section title="Most-used props">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "message", type: "string | ReactNode", description: "Required — the human-readable headline above the log." },
                { name: "logSnippet", type: "ReactNode", description: "The pre-formatted log content. Pass plain string for the default mono rendering, or a custom node for highlighted output." },
                { name: "variant", type: "AlertVariant", description: "Colour the side rail (`danger` | `warning` | `info` | `success`)." },
                { name: "ouiaId", type: "string | number", description: "Stable test selector." },
              ]}
            />
            <p style={{ marginTop: 16, marginBottom: 0, color: "var(--gp-color-text-subtle)", fontSize: 14 }}>
              Inherits the rest of <code>FlexProps</code> for layout overrides.
            </p>
          </div>
        </Card>
      </Section>

      <Section title="Accessibility">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Don&rsquo;t put critical info inside the snippet.</strong> The headline (`message`) is what assistive tech reads first — keep the actionable summary there, not buried in the log.</li>
            <li><strong>Wrap copy-button logic externally.</strong> If users need to copy logs, pair LogSnippet with a <code>ClipboardCopy</code> in your container — the component itself doesn&rsquo;t expose copy chrome.</li>
            <li><strong>Truncate ginormous logs.</strong> If the snippet exceeds a few KB, link out to the full log viewer rather than rendering inline.</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
