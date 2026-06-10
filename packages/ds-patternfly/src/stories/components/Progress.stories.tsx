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
  StatusVariants,
  Sizes,
  MeasureLocation,
  CustomRange,
  SingleLine,
  WithHelperText,
} from "../../examples/components/Progress.example.js";
import progressExampleSrc from "../../examples/components/Progress.example.tsx?raw";
import progressComponentSrc from "../../components/Progress.tsx?raw";

const meta: Meta = {
  title: "Components/Progress",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Progress"
      intro={
        <>
          A determinate progress bar with optional title, percentage, and
          status variant. Use for long-running tasks where you can express
          progress as a fraction of total — uploads, deployments, multi-step
          jobs. For indeterminate spinners (work-of-unknown-duration), use{" "}
          <code>Spinner</code>.
        </>
      }
    >
      <Section title="Basic">
        <Card>
          <Example
            source={progressExampleSrc}
            region="Basic"
            fileName="Progress.example.tsx"
          >
            <Basic />
          </Example>
        </Card>
      </Section>

      <Section
        title="Status variants"
        description="success / warning / danger paint the bar with the brand status palette + a status icon. Use to communicate the outcome at the end of the run, or to flag in-flight issues mid-run."
      >
        <Card>
          <Example
            source={progressExampleSrc}
            region="StatusVariants"
            fileName="Progress.example.tsx"
          >
            <StatusVariants />
          </Example>
        </Card>
      </Section>

      <Section
        title="Sizes"
        description="ProgressSize.sm / md (default) / lg. Small for inline status, large for hero loaders."
      >
        <Card>
          <Example
            source={progressExampleSrc}
            region="Sizes"
            fileName="Progress.example.tsx"
          >
            <Sizes />
          </Example>
        </Card>
      </Section>

      <Section
        title="Measure location"
        description="measureLocation moves the percentage label. Default 'top' (above the bar); 'inside' (overlaid in the bar — only with size lg); 'outside' (right of the bar); 'none' (hide the percentage entirely)."
      >
        <Card>
          <Example
            source={progressExampleSrc}
            region="MeasureLocation"
            fileName="Progress.example.tsx"
          >
            <MeasureLocation />
          </Example>
        </Card>
      </Section>

      <Section
        title="Custom range / step counter"
        description="min + max + a custom label give you a step-of-N counter (e.g. '2 of 5'). valueText supplies the screen-reader announcement so users hear the meaningful unit, not just the percentage."
      >
        <Card>
          <Example
            source={progressExampleSrc}
            region="CustomRange"
            fileName="Progress.example.tsx"
          >
            <CustomRange />
          </Example>
        </Card>
      </Section>

      <Section
        title="Single-line (no title)"
        description="Drop the title and pass aria-label directly when the surrounding context already names the bar (e.g. table cell, list row). measureLocation='outside' keeps the value visible."
      >
        <Card>
          <Example
            source={progressExampleSrc}
            region="SingleLine"
            fileName="Progress.example.tsx"
          >
            <SingleLine />
          </Example>
        </Card>
      </Section>

      <Section
        title="With helper text"
        description="helperText renders a HelperText / HelperTextItem cluster below the bar — use for context that complements the percentage (status, ETA, current step name)."
      >
        <Card>
          <Example
            source={progressExampleSrc}
            region="WithHelperText"
            fileName="Progress.example.tsx"
          >
            <WithHelperText />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example source={progressExampleSrc} fileName="Progress.example.tsx" />
        </Card>
      </Section>

      <ConfigurationSection
        importStatement={'import { Progress } from "@golden-passport/ds-patternfly";'}
        componentSource={progressComponentSrc}
        componentFileName="Progress.tsx"
        rows={[
          { name: "value", type: "number", description: "Current value. Required." },
          { name: "min / max", type: "number", description: "Range bounds. Default 0 / 100." },
          { name: "title", type: "ReactNode", description: "Visible label above the bar. Acts as the bar's accessible name." },
          { name: "label", type: "ReactNode", description: "Override the auto-computed percentage label (e.g. '2 of 5', '7m remaining')." },
          { name: "valueText", type: "string", description: "Screen-reader announcement of the current value. Defaults to the percentage; override when label is non-numeric." },
          { name: "variant", type: '"success" | "warning" | "danger"', description: "Status variant. Tints the bar + adds a status icon. Omit for a neutral in-progress bar." },
          { name: "size", type: '"sm" | "md" | "lg"', description: "Bar height. Default md. Use lg with measureLocation='inside' for hero loaders." },
          { name: "measureLocation", type: '"top" | "inside" | "outside" | "none"', description: "Where the percentage label sits relative to the bar." },
          { name: "isTitleTruncated", type: "boolean", description: "Truncate long titles with an ellipsis (auto-tooltip)." },
          { name: "helperText", type: "ReactNode", description: "Helper text cluster below the bar — pair with HelperText / HelperTextItem." },
          { name: "aria-label", type: "string", description: "Required when title is omitted." },
        ]}
      />

      <Section title="Accessibility">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Always name the bar.</strong> Either visible <code>title</code> or <code>aria-label</code> when title is omitted.</li>
            <li><strong>Set <code>valueText</code> for non-percentage labels.</strong> Without it, screen readers announce the raw fraction (&ldquo;33 of 100&rdquo;) which may be meaningless.</li>
            <li><strong>Don&rsquo;t use Progress for indeterminate work.</strong> Use <code>Spinner</code> when you can&rsquo;t express progress as a percentage.</li>
            <li><strong>Pair status variants with text.</strong> The icon + colour shouldn&rsquo;t be the only signal — restate the status in helperText.</li>
          </ul>
        </Card>
      </Section>
      <ThemingPointer
        dials={[
          ["--gp-radius-pill", "Bar corner radius."],
          ["--gp-motion-duration", "Bar-fill animation duration."],
          ["--gp-text-subtle", "Helper text colour."],
        ]}
      />
    </FoundationPage>
  ),
};
