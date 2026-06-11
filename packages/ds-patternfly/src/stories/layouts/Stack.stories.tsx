import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  FoundationPage,
  Section,
  Card,
  ConfigurationSection,
  Example,
} from "../_kit/StoryKit.js";
import {
  PageChrome,
  VerticalList,
} from "../../examples/layouts/Stack.example.js";
import stackExampleSrc from "../../examples/layouts/Stack.example.tsx?raw";
import stackComponentSrc from "../../components/base/Stack.tsx?raw";

const meta: Meta = {
  title: "Layouts/Stack",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Stack"
      intro={
        <>
          The vertical equivalent of Split — children stack top-to-bottom,
          and exactly one item can be marked <code>isFilled</code> to expand
          and consume remaining vertical space. The classic use is a page
          chrome layout: header, scrolling body, footer.
        </>
      }
    >
      <Section
        title="Page chrome"
        description="Header (intrinsic), scrolling body (filled), footer (intrinsic)."
      >
        <Card>
          <Example
            source={stackExampleSrc}
            region="PageChrome"
            fileName="Stack.example.tsx"
            height={320}
          >
            <PageChrome />
          </Example>
        </Card>
      </Section>

      <Section
        title="Vertical list with gutters"
        description="Without isFilled, items just stack with gutter spacing."
      >
        <Card>
          <Example
            source={stackExampleSrc}
            region="VerticalList"
            fileName="Stack.example.tsx"
          >
            <VerticalList />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example source={stackExampleSrc} fileName="Stack.example.tsx" />
        </Card>
      </Section>

      <ConfigurationSection
        importStatement={'import { Stack, StackItem } from "@golden-passport/ds-patternfly";'}
        componentSource={stackComponentSrc}
        componentFileName="Stack.tsx"
        description={
          <>
            How to import the component and every prop it accepts. StackItem
            accepts <code>isFilled</code> to mark the item that fills remaining
            vertical space — mark exactly one for chrome layouts; omit for
            plain stacks.
          </>
        }
        rows={[
          { name: "hasGutter", type: "boolean", description: "Adds the standard spacer between rows." },
          { name: "component", type: "ElementType", description: <>Override the rendered tag (defaults to <code>div</code>).</> },
        ]}
      />

      <Section
        title="Stack vs Flex column"
        description="Both can stack things vertically; Stack is the clearer choice for page chrome."
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
            <li><strong>Stack</strong> — vertical flow, optional one-item-fills behavior. The right tool for header/body/footer page chrome.</li>
            <li><strong>Flex direction column</strong> — when you need fine-grained alignment/justification or wrap behavior in addition to vertical flow.</li>
            <li><strong>Stack inside a Bullseye</strong> — vertical content centered as a single block (e.g. an empty state with title, description, and CTA stacked).</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
