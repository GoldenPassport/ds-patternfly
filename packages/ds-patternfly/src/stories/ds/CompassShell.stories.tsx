import type { Meta, StoryObj } from "@storybook/react-vite";
import { CompassShell } from "@golden-passport/ds-patternfly";
import {
  FoundationPage,
  Section,
  Card,
  ConfigurationSection,
  Example,
} from "../_kit/StoryKit.js";
import { AppFrame } from "../../examples/ds/CompassShell.example.js";
import compassShellExampleSrc from "../../examples/ds/CompassShell.example.tsx?raw";
import compassShellComponentSrc from "../../components/ds/CompassShell.tsx?raw";
import propsData from "./compassShell.props.json";

const meta: Meta<typeof CompassShell> = {
  title: "Building blocks/Layouts/CompassShell",
  component: CompassShell,
  parameters: {
    layout: "fullscreen",
    fullBleed: true,
    // Compass ships gradient/glass chrome whose contrast axe can't resolve;
    // structural a11y signal stays useful with color-contrast off.
    a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } },
  },
};
export default meta;

export const Overview: StoryObj = {
  parameters: { layout: "padded", fullBleed: false },
  render: () => (
    <FoundationPage
      title="CompassShell"
      intro={
        <>
          The full-viewport PatternFly Compass page frame — a header band, an
          optional left nav rail and right rail, the main content, and a
          docked message-bar footer (the <code>CompassMessageBar</code> slot,
          e.g. an <code>AiAssistant</code> bar). Wraps PF6 Compass with a
          SkipToContent link, a focusable main-content target, and controlled
          mobile-nav drawer plumbing. For a simpler masthead + sidebar +
          content layout, use <code>Shell</code>.
        </>
      }
    >
      <Section
        title="Application frame"
        description="Header (brand + nav) over a left rail, content, and a docked message bar; the hamburger opens the mobile nav drawer."
      >
        <Card>
          <Example
            source={compassShellExampleSrc}
            region="AppFrame"
            fileName="CompassShell.example.tsx"
            height={560}
          >
            <AppFrame />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demo above. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example
            source={compassShellExampleSrc}
            fileName="CompassShell.example.tsx"
          />
        </Card>
      </Section>

      <ConfigurationSection
        importStatement={propsData.import}
        rows={propsData.rows}
        componentSource={compassShellComponentSrc}
        componentFileName="CompassShell.tsx"
      />
    </FoundationPage>
  ),
};

/** The shell rendered edge-to-edge, full-bleed — how it looks in a real app. */
export const FullBleed: StoryObj = {
  name: "Full bleed",
  render: () => <AppFrame />,
};
