import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  FoundationPage,
  Section,
  Card,
  ConfigurationSection,
  Example,
} from "../_kit/StoryKit.js";
import {
  Default,
} from "../../examples/components/BackToTop.example.js";
import backToTopExampleSrc from "../../examples/components/BackToTop.example.tsx?raw";
import backToTopComponentSrc from "../../components/base/BackToTop.tsx?raw";

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
          <Example
            source={backToTopExampleSrc}
            region="Default"
            fileName="BackToTop.example.tsx"
            height={300}
          >
            <Default />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example source={backToTopExampleSrc} fileName="BackToTop.example.tsx" />
        </Card>
      </Section>

      <ConfigurationSection
        importStatement={'import { BackToTop } from "@golden-passport/ds-patternfly";'}
        componentSource={backToTopComponentSrc}
        componentFileName="BackToTop.tsx"
        rows={[
          { name: "title", type: "string", description: "Visible label on the button. Defaults to 'Back to top'. Used as the accessible name." },
          { name: "scrollableSelector", type: "string", description: "CSS selector of the scrolling container. Defaults to window scroll." },
          { name: "isAlwaysVisible", type: "boolean", description: "Skip the scroll-distance gate and render permanently." },
          { name: "onClick", type: "() => void", description: "Custom scroll behaviour. Default scrolls the container to top." },
        ]}
      />

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
