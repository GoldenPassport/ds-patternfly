import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  FoundationPage,
  Section,
  Card,
  ConfigurationSection,
  Example,
} from "../_kit/StoryKit.js";
import { PropsTable } from "../_kit/DemoKit.js";
import {
  Basic,
  WithDescriptions,
  WithFailure,
  Vertical,
  Compact,
} from "../../examples/components/ProgressStepper.example.js";
import progressStepperExampleSrc from "../../examples/components/ProgressStepper.example.tsx?raw";
import progressStepperComponentSrc from "../../components/base/ProgressStepper.tsx?raw";

const meta: Meta = {
  title: "Components/ProgressStepper",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="ProgressStepper"
      intro={
        <>
          A multi-step progress indicator — each step has a status (
          <code>pending</code> / <code>info</code> / <code>success</code> /{" "}
          <code>warning</code> / <code>danger</code>) and one is marked
          <code>isCurrent</code>. Use for wizards, BPM workflow execution,
          deployment pipelines, onboarding flows — anywhere the user benefits
          from seeing where they are in a sequence.
        </>
      }
    >
      <Section
        title="Basic"
        description="Three steps: completed (success), in-progress (info + isCurrent), upcoming (pending). The connector line between steps fills based on adjacent step states."
      >
        <Card>
          <Example
            source={progressStepperExampleSrc}
            region="Basic"
            fileName="ProgressStepper.example.tsx"
          >
            <Basic />
          </Example>
        </Card>
      </Section>

      <Section
        title="With descriptions"
        description="Pass description to each ProgressStep for a sub-label that explains what each step entails. Useful for first-time users or for steps with non-obvious names."
      >
        <Card>
          <Example
            source={progressStepperExampleSrc}
            region="WithDescriptions"
            fileName="ProgressStepper.example.tsx"
          >
            <WithDescriptions />
          </Example>
        </Card>
      </Section>

      <Section
        title="With failure"
        description="Mark a failed step variant='danger' (and isCurrent if the failure is where the run stopped). Subsequent steps stay pending — no green checkmarks past the failure."
      >
        <Card>
          <Example
            source={progressStepperExampleSrc}
            region="WithFailure"
            fileName="ProgressStepper.example.tsx"
          >
            <WithFailure />
          </Example>
        </Card>
      </Section>

      <Section
        title="Vertical"
        description="isVertical stacks the steps vertically. Pair with isCenterAligned to centre the labels relative to each step icon. Use for narrow side panels or when step descriptions are long."
      >
        <Card>
          <Example
            source={progressStepperExampleSrc}
            region="Vertical"
            fileName="ProgressStepper.example.tsx"
          >
            <Vertical />
          </Example>
        </Card>
      </Section>

      <Section
        title="Compact"
        description="isCompact shrinks the step circles and tightens spacing — for use inside cards, drawers, or anywhere screen real estate is limited."
      >
        <Card>
          <Example
            source={progressStepperExampleSrc}
            region="Compact"
            fileName="ProgressStepper.example.tsx"
          >
            <Compact />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example
            source={progressStepperExampleSrc}
            fileName="ProgressStepper.example.tsx"
          />
        </Card>
      </Section>

      <ConfigurationSection
        importStatement={'import { ProgressStepper, ProgressStep } from "@golden-passport/ds-patternfly";'}
        componentSource={progressStepperComponentSrc}
        componentFileName="ProgressStepper.tsx"
        rows={[
          { name: "aria-label", type: "string", description: "Required. Names the stepper for screen readers." },
          { name: "isCompact", type: "boolean", description: "Smaller step icons + tighter spacing — for cards, drawers, sidebars." },
          { name: "isVertical", type: "boolean", description: "Stack steps vertically." },
          { name: "isCenterAligned", type: "boolean", description: "Centre step labels relative to their icon. Useful in vertical or wide-spaced horizontal layouts." },
        ]}
      />

      <Section title="Most-used ProgressStep props">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "variant", type: '"pending" | "info" | "success" | "warning" | "danger"', description: "Step status. pending = not yet started; info = in progress (pair with isCurrent); success = completed; warning / danger = completed with issues / failed." },
                { name: "isCurrent", type: "boolean", description: "Marks the step as the current focus — gets aria-current='step'." },
                { name: "description", type: "ReactNode", description: "Sub-label below the step title — explain what the step does, what failed, ETA, etc." },
                { name: "id / titleId", type: "string", description: "Required for a11y. id identifies the step; titleId points at the title element so descriptions are correctly associated." },
                { name: "aria-label", type: "string", description: "Per-step accessible name — bake the variant into the label so the status comes through ('Step 3, failed', 'Step 2, current')." },
                { name: "icon", type: "ReactNode", description: "Override the variant's default glyph — useful for product-specific iconography." },
                { name: "popoverRender", type: "(stepRef: RefObject<any>) => ReactNode", description: "Forwards the step ref to a render function. Use it to attach a Popover to the step icon for inline help or step details on click." },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section title="Accessibility">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Always set <code>aria-label</code> on ProgressStepper</strong> — names the region for screen readers.</li>
            <li><strong>Per-step <code>aria-label</code> should encode the status</strong> — &ldquo;Step 3, failed&rdquo; / &ldquo;Step 2, current&rdquo; / &ldquo;Step 1, completed&rdquo;. The visual variant alone doesn&rsquo;t announce.</li>
            <li><strong>Mark only one step as <code>isCurrent</code></strong> — multiple current steps confuse the aria-current contract.</li>
            <li><strong>Use <code>id</code> + <code>titleId</code></strong> on every step — required for screen-reader association of the description text with its title.</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
