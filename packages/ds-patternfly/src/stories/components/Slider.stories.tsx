import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  FoundationPage,
  Section,
  Card,
  ConfigurationSection,
  Example,
  ThemingPointer,
} from "../_kit/StoryKit.js";
import {
  Basic,
  WithPairedInput,
  SnapToStep,
  CustomSteps,
} from "../../examples/components/Slider.example.js";
import sliderExampleSrc from "../../examples/components/Slider.example.tsx?raw";
import sliderComponentSrc from "../../components/Slider.tsx?raw";

const meta: Meta = {
  title: "Components/Forms/Slider",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Slider"
      intro={
        <>
          A bounded numeric input where the visual position itself
          communicates the value. Use it for &quot;by feel&quot; numbers —
          volume, opacity, contrast threshold — where exact precision
          matters less than relative position. For exact numeric entry,
          use NumberInput.
        </>
      }
    >
      <Section title="Basic">
        <Card>
          <Example
            source={sliderExampleSrc}
            region="Basic"
            fileName="Slider.example.tsx"
          >
            <Basic />
          </Example>
        </Card>
      </Section>

      <Section title="With paired numeric input">
        <Card>
          <Example
            source={sliderExampleSrc}
            region="WithPairedInput"
            fileName="Slider.example.tsx"
          >
            <WithPairedInput />
          </Example>
        </Card>
      </Section>

      <Section
        title="Snap to step"
        description="Pass step to discretise the slider — drag or arrow-key from any position and the value rounds to the nearest multiple. Use a meaningful step (5, 10, 25, etc.) when exact granularity isn't needed."
      >
        <Card>
          <Example
            source={sliderExampleSrc}
            region="SnapToStep"
            fileName="Slider.example.tsx"
          >
            <SnapToStep />
          </Example>
        </Card>
      </Section>

      <Section
        title="Labeled tick stops (customSteps)"
        description="customSteps replaces the numeric range with named stops — handy for ordinal scales (Low / Med / High) or branded preset values. The slider snaps to the named values; min/max are inferred from the array."
      >
        <Card>
          <Example
            source={sliderExampleSrc}
            region="CustomSteps"
            fileName="Slider.example.tsx"
          >
            <CustomSteps />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example source={sliderExampleSrc} fileName="Slider.example.tsx" />
        </Card>
      </Section>

      <ConfigurationSection
        importStatement={'import { Slider } from "@golden-passport/ds-patternfly";'}
        componentSource={sliderComponentSrc}
        componentFileName="Slider.tsx"
        rows={[
          { name: "label", type: "string", description: "Required. Visible label and accessible name." },
          { name: "value", type: "number", description: "Controlled value. Pair with onChange." },
          { name: "min / max", type: "number", description: "Range bounds. Default 0 / 100." },
          { name: "step", type: "number", description: "Snap-to interval. Drag and arrow-key both round to the nearest multiple. Default 1." },
          { name: "showTicks", type: "boolean", description: "Render a tick mark at every step (visual cue for the snap intervals)." },
          { name: "customSteps", type: "{ value: number, label: string }[]", description: "Replace numeric range with named stops (e.g. 'Low' / 'Med' / 'High'). Slider snaps to the named values; min/max are inferred from the array." },
          { name: "isInputVisible", type: "boolean", description: "Show a paired number input next to the slider." },
          { name: "inputPosition", type: '"aboveThumb" | "end"', description: "Where the paired input sits." },
          { name: "inputAriaLabel", type: "string", description: "Required when isInputVisible — the input is a separate control with its own a11y name." },
          { name: "isLabelHidden", type: "boolean", description: "Hide the visible label but keep it as the accessible name." },
        ]}
      />

      <Section title="Accessibility">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Always provide a label.</strong> Required prop — there&apos;s no way to use Slider without naming it.</li>
            <li><strong>Keyboard:</strong> Arrow keys step by <code>step</code>; Page Up/Down step by ~10x; Home/End jump to min/max.</li>
            <li><strong>Pair with a numeric input</strong> when exact entry matters — many users find sliders awkward for precise values.</li>
            <li><strong>Show units near the value.</strong> &quot;50&quot; alone is meaningless; &quot;50%&quot; or &quot;50 °C&quot; reads correctly.</li>
          </ul>
        </Card>
      </Section>

      <ThemingPointer
        dials={[
          ["--gp-focus-ring", "Thumb focus-ring colour."],
          ["--gp-opacity-disabled", "Disabled-state opacity."],
          ["--gp-motion-duration", "Drag-snap animation duration."],
        ]}
      />

    </FoundationPage>
  ),
};
