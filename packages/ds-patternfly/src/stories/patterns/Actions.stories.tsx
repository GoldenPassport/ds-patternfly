import type { Meta, StoryObj } from "@storybook/react-vite";
import { FoundationPage, Section, Card, Example } from "../_kit/StoryKit.js";
import { PropsTable } from "../_kit/DemoKit.js";
import {
  PrimaryAndSecondary,
  DestructiveAction,
  PrimaryAndOverflow,
} from "../../examples/patterns/Actions.example.js";
import actionsExampleSrc from "../../examples/patterns/Actions.example.tsx?raw";

const meta: Meta = {
  title: "Patterns/Actions",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Actions"
      intro={
        <>
          How to lay out action buttons on a page, in a row, or in a
          toolbar — one primary, a few secondaries, the rest in a kebab.
          The pattern keeps button hierarchy predictable across surfaces
          so users don&rsquo;t have to re-learn which button does the
          destructive thing in each screen.
        </>
      }
    >
      <Section
        title="Primary + secondary"
        description="One primary (the recommended action), one or two secondaries (alternative paths). Order: primary leading, secondary trailing."
      >
        <Card>
          <Example
            source={actionsExampleSrc}
            region="PrimaryAndSecondary"
            fileName="Actions.example.tsx"
          >
            <PrimaryAndSecondary />
          </Example>
        </Card>
      </Section>

      <Section
        title="Destructive action"
        description="Danger variants for delete / wipe / disable. Pair with a confirmation modal (WarningModal) — destructive actions never confirm inline."
      >
        <Card>
          <Example
            source={actionsExampleSrc}
            region="DestructiveAction"
            fileName="Actions.example.tsx"
          >
            <DestructiveAction />
          </Example>
        </Card>
      </Section>

      <Section
        title="Primary + overflow"
        description="One primary, the rest behind a kebab. Use when you have 4+ alternatives — a row of secondaries crowds the page."
      >
        <Card>
          <Example
            source={actionsExampleSrc}
            region="PrimaryAndOverflow"
            fileName="Actions.example.tsx"
          >
            <PrimaryAndOverflow />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example source={actionsExampleSrc} fileName="Actions.example.tsx" />
        </Card>
      </Section>

      <Section title="Hierarchy rules">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "primary", type: "1 per surface", description: "The recommended action. Reserve for the screen's main outcome — don't sprinkle primaries." },
                { name: "secondary", type: "0–3 per surface", description: "Alternative paths (Save as draft, Skip, Continue without saving)." },
                { name: "link / plain", type: "n", description: "Low-emphasis text actions (Cancel, Reset). No background fill." },
                { name: "danger", type: "0–1 per surface", description: "Destructive primary. Always inside a confirmation flow (WarningModal)." },
                { name: "kebab", type: "1 per surface (or row)", description: "Overflow for everything that doesn't fit. Use when you have 4+ alternatives." },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section title="Placement">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Modal footers</strong> — primary on the trailing edge, secondary / cancel beside it. RTL automatically flips via PF6&rsquo;s logical CSS.</li>
            <li><strong>Page headers</strong> — primary on the trailing edge, secondaries to its left, kebab last.</li>
            <li><strong>Toolbars above lists</strong> — primary leading, filters / search trailing. Kebab on the far edge.</li>
            <li><strong>Per-row actions in tables</strong> — kebab only; no primary buttons per row (creates visual noise across 50+ rows).</li>
          </ul>
        </Card>
      </Section>

      <Section title="Accessibility">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Kebab buttons need <code>aria-label</code></strong> — &ldquo;More actions&rdquo; or scoped to the row (&ldquo;Actions for Workflow A&rdquo;).</li>
            <li><strong>Don&rsquo;t use colour alone</strong> to signal danger — the word matters (&ldquo;Delete&rdquo; not &ldquo;X&rdquo;), and danger variants meet contrast even for users who can&rsquo;t perceive red.</li>
            <li><strong>Disable, don&rsquo;t hide.</strong> When an action isn&rsquo;t available, render it disabled with a tooltip explaining why — hiding it makes the UI feel broken (&ldquo;where did the button go?&rdquo;).</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
