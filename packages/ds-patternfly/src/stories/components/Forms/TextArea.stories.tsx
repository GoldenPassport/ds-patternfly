import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  FoundationPage,
  Section,
  Card,
  ConfigurationSection,
  Example,
  ThemingPointer,
} from "../../_kit/StoryKit.js";
import { Basic, AutoResizing } from "../../../examples/components/Forms/TextArea.example.js";
import textAreaExampleSrc from "../../../examples/components/Forms/TextArea.example.tsx?raw";
import textAreaComponentSrc from "../../../components/base/TextArea.tsx?raw";

const meta: Meta = {
  title: "Components/Forms/TextArea",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="TextArea"
      intro={
        <>
          Multi-line text input. Use it for descriptions, comments,
          messages — anywhere users may write more than a single line.
          For a known-short single-line field, use TextInput.
        </>
      }
    >
      <Section title="Basic">
        <Card>
          <Example
            source={textAreaExampleSrc}
            region="Basic"
            fileName="TextArea.example.tsx"
          >
            <Basic />
          </Example>
        </Card>
      </Section>

      <Section title="Auto-resizing">
        <Card>
          <Example
            source={textAreaExampleSrc}
            region="AutoResizing"
            fileName="TextArea.example.tsx"
          >
            <AutoResizing />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example source={textAreaExampleSrc} fileName="TextArea.example.tsx" />
        </Card>
      </Section>

      <ConfigurationSection
        importStatement={'import { TextArea } from "@golden-passport/ds-patternfly";'}
        componentSource={textAreaComponentSrc}
        componentFileName="TextArea.tsx"
        rows={[
          { name: "id", type: "string", description: "Required." },
          { name: "value", type: "string", description: "Controlled value." },
          { name: "onChange", type: "(event, value: string) => void", description: "Event first, value second." },
          { name: "rows", type: "number", description: "Initial visible rows. Default 2 — usually too short, set explicitly." },
          { name: "autoResize", type: "boolean", description: "Grow vertically as the user types. Combine with a max-height in CSS to cap." },
          { name: "resizeOrientation", type: '"horizontal" | "vertical" | "both" | "none"', description: 'Which directions the user can drag-resize. Default "both" — usually want "vertical" only.' },
          { name: "validated", type: '"default" | "success" | "warning" | "error"', description: "Visual state — same convention as TextInput." },
        ]}
      />

      <Section title="Accessibility">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Set rows explicitly.</strong> Default 2 is too short for almost any prose use case.</li>
            <li><strong>Restrict resize direction.</strong> Default both means users can drag horizontally and break the layout. Set <code>resizeOrientation=&quot;vertical&quot;</code>.</li>
            <li><strong>Character counters need their own announcement.</strong> Use an aria-live region for &quot;X characters remaining&quot; if you show one — don&apos;t expect AT to read silent visual counts.</li>
          </ul>
        </Card>
      </Section>

      <ThemingPointer
        dials={[
          ["--gp-control-pad-y", "Vertical padding."],
          ["--gp-control-pad-x", "Horizontal padding."],
          ["--gp-radius-control", "Corner radius."],
          ["--gp-border-default", "Resting border colour."],
        ]}
      />

    </FoundationPage>
  ),
};
