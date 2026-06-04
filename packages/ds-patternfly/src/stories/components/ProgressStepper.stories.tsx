import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  ProgressStep,
  ProgressStepper,
} from "@patternfly/react-core";
import { FoundationPage, Section, Card, CodeBlock } from "../_storyKit.js";
import { DemoFrame, PropsTable } from "../_demoKit.js";

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
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame>
              <ProgressStepper aria-label="Onboarding progress">
                <ProgressStep
                  variant="success"
                  id="basic-step1"
                  titleId="basic-step1-title"
                  aria-label="Step 1, completed"
                >
                  Account
                </ProgressStep>
                <ProgressStep
                  variant="info"
                  isCurrent
                  id="basic-step2"
                  titleId="basic-step2-title"
                  aria-label="Step 2, current"
                >
                  Profile
                </ProgressStep>
                <ProgressStep
                  variant="pending"
                  id="basic-step3"
                  titleId="basic-step3-title"
                  aria-label="Step 3, pending"
                >
                  Workspace
                </ProgressStep>
              </ProgressStepper>
            </DemoFrame>
            <CodeBlock>{`<ProgressStepper aria-label="Onboarding progress">
  <ProgressStep variant="success" id="step1" titleId="step1-title" aria-label="Step 1, completed">
    Account
  </ProgressStep>
  <ProgressStep variant="info" isCurrent id="step2" titleId="step2-title" aria-label="Step 2, current">
    Profile
  </ProgressStep>
  <ProgressStep variant="pending" id="step3" titleId="step3-title" aria-label="Step 3, pending">
    Workspace
  </ProgressStep>
</ProgressStepper>`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section
        title="With descriptions"
        description="Pass description to each ProgressStep for a sub-label that explains what each step entails. Useful for first-time users or for steps with non-obvious names."
      >
        <Card>
          <div style={{ padding: 24 }}>
            <DemoFrame>
              <ProgressStepper aria-label="Deployment progress">
                <ProgressStep
                  variant="success"
                  description="Image pushed to registry"
                  id="desc-step1"
                  titleId="desc-step1-title"
                  aria-label="Step 1, completed"
                >
                  Build
                </ProgressStep>
                <ProgressStep
                  variant="info"
                  isCurrent
                  description="Running smoke tests"
                  id="desc-step2"
                  titleId="desc-step2-title"
                  aria-label="Step 2, current"
                >
                  Test
                </ProgressStep>
                <ProgressStep
                  variant="pending"
                  description="Roll out to production"
                  id="desc-step3"
                  titleId="desc-step3-title"
                  aria-label="Step 3, pending"
                >
                  Deploy
                </ProgressStep>
              </ProgressStepper>
            </DemoFrame>
          </div>
        </Card>
      </Section>

      <Section
        title="With failure"
        description="Mark a failed step variant='danger' (and isCurrent if the failure is where the run stopped). Subsequent steps stay pending — no green checkmarks past the failure."
      >
        <Card>
          <div style={{ padding: 24 }}>
            <DemoFrame>
              <ProgressStepper aria-label="Pipeline with failure">
                <ProgressStep
                  variant="success"
                  id="fail-step1"
                  titleId="fail-step1-title"
                  aria-label="Step 1, completed"
                >
                  Source
                </ProgressStep>
                <ProgressStep
                  variant="success"
                  id="fail-step2"
                  titleId="fail-step2-title"
                  aria-label="Step 2, completed"
                >
                  Build
                </ProgressStep>
                <ProgressStep
                  variant="danger"
                  isCurrent
                  description="exit code 1"
                  id="fail-step3"
                  titleId="fail-step3-title"
                  aria-label="Step 3, failed"
                >
                  Test
                </ProgressStep>
                <ProgressStep
                  variant="pending"
                  id="fail-step4"
                  titleId="fail-step4-title"
                  aria-label="Step 4, pending"
                >
                  Deploy
                </ProgressStep>
              </ProgressStepper>
            </DemoFrame>
          </div>
        </Card>
      </Section>

      <Section
        title="Vertical"
        description="isVertical stacks the steps vertically. Pair with isCenterAligned to centre the labels relative to each step icon. Use for narrow side panels or when step descriptions are long."
      >
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 24 }}>
            <DemoFrame>
              <ProgressStepper aria-label="Vertical stepper" isVertical>
                <ProgressStep
                  variant="success"
                  id="v-step1"
                  titleId="v-step1-title"
                  aria-label="Step 1, completed"
                >
                  First step
                </ProgressStep>
                <ProgressStep
                  variant="info"
                  isCurrent
                  id="v-step2"
                  titleId="v-step2-title"
                  aria-label="Step 2, current"
                >
                  Second step
                </ProgressStep>
                <ProgressStep
                  variant="pending"
                  id="v-step3"
                  titleId="v-step3-title"
                  aria-label="Step 3, pending"
                >
                  Third step
                </ProgressStep>
              </ProgressStepper>
            </DemoFrame>
          </div>
        </Card>
      </Section>

      <Section
        title="Compact"
        description="isCompact shrinks the step circles and tightens spacing — for use inside cards, drawers, or anywhere screen real estate is limited."
      >
        <Card>
          <div style={{ padding: 24 }}>
            <DemoFrame>
              <ProgressStepper isCompact aria-label="Compact stepper">
                <ProgressStep
                  variant="success"
                  id="compact-step1"
                  titleId="compact-step1-title"
                  aria-label="Step 1, completed"
                >
                  First
                </ProgressStep>
                <ProgressStep
                  variant="info"
                  isCurrent
                  id="compact-step2"
                  titleId="compact-step2-title"
                  aria-label="Step 2, current"
                >
                  Second
                </ProgressStep>
                <ProgressStep
                  variant="pending"
                  id="compact-step3"
                  titleId="compact-step3-title"
                  aria-label="Step 3, pending"
                >
                  Third
                </ProgressStep>
              </ProgressStepper>
            </DemoFrame>
          </div>
        </Card>
      </Section>

      <Section title="Most-used ProgressStepper props">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "aria-label", type: "string", description: "Required. Names the stepper for screen readers." },
                { name: "isCompact", type: "boolean", description: "Smaller step icons + tighter spacing — for cards, drawers, sidebars." },
                { name: "isVertical", type: "boolean", description: "Stack steps vertically." },
                { name: "isCenterAligned", type: "boolean", description: "Centre step labels relative to their icon. Useful in vertical or wide-spaced horizontal layouts." },
              ]}
            />
          </div>
        </Card>
      </Section>

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
