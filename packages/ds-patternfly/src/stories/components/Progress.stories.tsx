import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  HelperText,
  HelperTextItem,
  Progress,
  ProgressMeasureLocation,
  ProgressSize,
  ProgressVariant,
} from "@golden-passport/ds-patternfly";
import { FoundationPage, Section, Card, CodeBlock, ThemingPointer } from "../_kit/StoryKit.js";
import { DemoFrame, PropsTable } from "../_kit/DemoKit.js";

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
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame>
              <Progress value={33} title="Upload" />
            </DemoFrame>
            <CodeBlock>{`<Progress value={33} title="Upload" />`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section
        title="Status variants"
        description="success / warning / danger paint the bar with the brand status palette + a status icon. Use to communicate the outcome at the end of the run, or to flag in-flight issues mid-run."
      >
        <Card>
          <div style={{ padding: 24 }}>
            <DemoFrame>
              <div style={{ display: "grid", gap: 16 }}>
                <Progress value={100} title="Deployment" variant={ProgressVariant.success} />
                <Progress value={66} title="Sync" variant={ProgressVariant.warning} />
                <Progress value={42} title="Backup" variant={ProgressVariant.danger} />
              </div>
            </DemoFrame>
          </div>
        </Card>
      </Section>

      <Section
        title="Sizes"
        description="ProgressSize.sm / md (default) / lg. Small for inline status, large for hero loaders."
      >
        <Card>
          <div style={{ padding: 24 }}>
            <DemoFrame>
              <div style={{ display: "grid", gap: 16 }}>
                <Progress value={33} title="Small" size={ProgressSize.sm} />
                <Progress value={33} title="Medium (default)" />
                <Progress value={33} title="Large" size={ProgressSize.lg} />
              </div>
            </DemoFrame>
          </div>
        </Card>
      </Section>

      <Section
        title="Measure location"
        description="measureLocation moves the percentage label. Default 'top' (above the bar); 'inside' (overlaid in the bar — only with size lg); 'outside' (right of the bar); 'none' (hide the percentage entirely)."
      >
        <Card>
          <div style={{ padding: 24 }}>
            <DemoFrame>
              <div style={{ display: "grid", gap: 16 }}>
                <Progress value={33} title="Top (default)" />
                <Progress value={33} title="Outside" measureLocation={ProgressMeasureLocation.outside} />
                <Progress value={33} title="Inside" size={ProgressSize.lg} measureLocation={ProgressMeasureLocation.inside} />
                <Progress value={33} title="None" measureLocation={ProgressMeasureLocation.none} />
              </div>
            </DemoFrame>
          </div>
        </Card>
      </Section>

      <Section
        title="Custom range / step counter"
        description="min + max + a custom label give you a step-of-N counter (e.g. '2 of 5'). valueText supplies the screen-reader announcement so users hear the meaningful unit, not just the percentage."
      >
        <Card>
          <div style={{ padding: 24 }}>
            <DemoFrame>
              <Progress
                value={2}
                min={0}
                max={5}
                title="Onboarding steps"
                measureLocation={ProgressMeasureLocation.top}
                label="2 of 5"
                valueText="2 of 5"
              />
            </DemoFrame>
          </div>
        </Card>
      </Section>

      <Section
        title="Single-line (no title)"
        description="Drop the title and pass aria-label directly when the surrounding context already names the bar (e.g. table cell, list row). measureLocation='outside' keeps the value visible."
      >
        <Card>
          <div style={{ padding: 24 }}>
            <DemoFrame>
              <Progress
                value={33}
                measureLocation={ProgressMeasureLocation.outside}
                aria-label="Project completion"
              />
            </DemoFrame>
          </div>
        </Card>
      </Section>

      <Section
        title="With helper text"
        description="helperText renders a HelperText / HelperTextItem cluster below the bar — use for context that complements the percentage (status, ETA, current step name)."
      >
        <Card>
          <div style={{ padding: 24 }}>
            <DemoFrame>
              <Progress
                value={66}
                title="Database migration"
                variant={ProgressVariant.warning}
                helperText={
                  <HelperText>
                    <HelperTextItem variant="warning">
                      Slower than expected — running 12s behind ETA.
                    </HelperTextItem>
                  </HelperText>
                }
              />
            </DemoFrame>
          </div>
        </Card>
      </Section>

      <Section title="Most-used props">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
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
          </div>
        </Card>
      </Section>

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
