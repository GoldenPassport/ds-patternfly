import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  FoundationPage,
  Section,
  Card,
  ConfigurationSection,
  Example,
  ThemingPointer,
} from "../_kit/StoryKit.js";
import { PropsTable } from "../_kit/DemoKit.js";
import {
  InlineWizard,
  InModal,
  Progressive,
  VisitRequired,
} from "../../examples/components/Wizard.example.js";
import wizardExampleSrc from "../../examples/components/Wizard.example.tsx?raw";
import wizardComponentSrc from "../../components/Wizard.tsx?raw";

const meta: Meta = {
  title: "Components/Wizard",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Wizard"
      intro={
        <>
          A multi-step task runner with a step rail, per-step body, and a
          standard footer (Back / Next / Cancel / Submit). Use it for
          create-flows that have natural sub-steps where users need
          orientation (&ldquo;step 2 of 5&rdquo;) and the option to jump back.
          For single-question flows, use a regular <code>Form</code>{" "}
          inside a Modal instead.
        </>
      }
    >
      <Section
        title="Inline wizard"
        description="The wizard manages its own footer and step state. Pass an onSave handler — the final step's Next button becomes Submit and fires it."
      >
        <Card>
          <Example
            source={wizardExampleSrc}
            region="InlineWizard"
            fileName="Wizard.example.tsx"
            height={460}
          >
            <InlineWizard />
          </Example>
        </Card>
      </Section>

      <Section
        title="In a modal"
        description="The most common embedding — a Wizard inside a Modal so it dims the page while it runs. Set Modal's hasNoBodyWrapper so the wizard owns its padding."
      >
        <Card>
          <Example
            source={wizardExampleSrc}
            region="InModal"
            fileName="Wizard.example.tsx"
          >
            <InModal />
          </Example>
        </Card>
      </Section>

      <Section
        title="Progressive (lock forward)"
        description="isProgressive hides any step after the active one. Use when the next step's form depends on the current step's choices and shouldn't be reachable until the user gets there."
      >
        <Card>
          <Example
            source={wizardExampleSrc}
            region="Progressive"
            fileName="Wizard.example.tsx"
            height={320}
          >
            <Progressive />
          </Example>
        </Card>
      </Section>

      <Section
        title="Visit-required (lock skipping)"
        description="isVisitRequired greys out steps the user hasn't reached yet — they can review prior steps but can't jump ahead from the rail."
      >
        <Card>
          <Example
            source={wizardExampleSrc}
            region="VisitRequired"
            fileName="Wizard.example.tsx"
            height={320}
          >
            <VisitRequired />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example source={wizardExampleSrc} fileName="Wizard.example.tsx" />
        </Card>
      </Section>

      <Section title="Composition">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "Wizard", type: "container", description: "Hosts step state and renders the rail + footer. children must be WizardStep elements." },
                { name: "WizardStep", type: "child", description: "A single step. id is required (used for navigation), name is the rail label. Place form / content inside as children." },
                { name: "WizardBody", type: "child", description: "Default scroll wrapper around step children — applied automatically. Customise via the WizardStep.body prop." },
                { name: "WizardFooter", type: "child", description: "Default Back / Next / Cancel row — applied automatically. Override per-step via WizardStep.footer." },
                { name: "WizardNav / WizardNavItem", type: "child", description: "Default left rail — override via the Wizard.nav prop when you need bespoke navigation (custom icons, nested steps)." },
                { name: "WizardHeader", type: "child", description: "Optional header above the rail — pass via the Wizard.header prop (typically a title + close button when used inside a card / panel rather than a Modal)." },
              ]}
            />
          </div>
        </Card>
      </Section>

      <ConfigurationSection
        importStatement={'import { Wizard, WizardStep, type WizardStepType } from "@golden-passport/ds-patternfly";'}
        componentSource={wizardComponentSrc}
        componentFileName="Wizard.tsx"
        rows={[
          { name: "navAriaLabel", type: "string", description: "Required — labels the step rail for screen readers ('Create deployment steps')." },
          { name: "onSave", type: "(event) => void | Promise<void>", description: "Fired when the user submits the final step. Treat it as the create / commit handler. Falls back to onClose if absent." },
          { name: "onClose", type: "(event) => void", description: "Cancel / close handler — wires up the Cancel button and the modal's escape key when embedded." },
          { name: "onStepChange", type: "(event, current, prev, scope) => void | Promise<void>", description: "Called on every navigation. scope says whether the user clicked Next, Back, or jumped via the rail — useful for per-step validation." },
          { name: "startIndex", type: "number (1-indexed)", description: "Open the wizard on a specific step. Useful for resuming a partially-completed flow." },
          { name: "isProgressive", type: "boolean", description: "Hide steps after the active one — locks the user into a forward path." },
          { name: "isVisitRequired", type: "boolean", description: "Disable steps the user hasn't visited yet — they can review previous steps but can't skip ahead." },
          { name: "shouldFocusContent", type: "boolean", description: "Move focus into the step body after every navigation — improves screen-reader and keyboard ergonomics." },
          { name: "height / width", type: "number | string", description: "Lock the wizard's dimensions. Pair with a Modal's variant to keep the chrome stable as steps grow / shrink." },
        ]}
      />

      <Section title="Most-used WizardStep props">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "id", type: "string | number", description: "Required — stable identifier referenced by onStepChange and the nav rail." },
                { name: "name", type: "ReactNode", description: "Required — the step's label in the rail. Keep it short (1–2 words)." },
                { name: "status", type: '"default" | "error" | "success"', description: "Add a status icon next to the rail label — drive it from your validation state." },
                { name: "isDisabled", type: "boolean", description: "Disable navigation to this step." },
                { name: "isHidden", type: "boolean", description: "Skip this step entirely (e.g. branch flow based on earlier answers)." },
                { name: "footer", type: "ReactElement | Partial<WizardFooterProps>", description: "Per-step footer override — common use: rename the final step's Next button to 'Create' / 'Submit'." },
                { name: "body", type: "Omit<WizardBodyProps, 'children'>", description: "Override the default scroll wrapper props (e.g. disable padding when the step embeds its own layout)." },
                { name: "navItem", type: "WizardNavItemType", description: "Override the rail entry's rendering — use for steps that need custom icons, badges, or links." },
                { name: "isExpandable", type: "boolean", description: "When the step has sub-steps, allow the parent to expand / collapse in the rail." },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section title="Wizard vs Modal+Form vs ProgressStepper">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Wizard</strong> — interactive multi-step task. Owns navigation, step state, footer. Use when there are 3+ logical sections to a create-flow.</li>
            <li><strong>Modal + Form</strong> — single-screen task. Use for one-question or short-form workflows where step navigation would feel like overkill.</li>
            <li><strong>ProgressStepper</strong> — read-only progress indicator. Use when you&rsquo;re showing the state of a long-running async task (deployment, import) — the user isn&rsquo;t navigating, they&rsquo;re watching.</li>
          </ul>
        </Card>
      </Section>

      <Section title="Accessibility">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong><code>navAriaLabel</code> is required.</strong> The step rail is a navigation landmark — without a label screen-reader users land on an unnamed nav.</li>
            <li><strong>Set <code>shouldFocusContent</code></strong> on long-form wizards so the step body receives focus after each navigation. Otherwise focus stays on the Next button and the user has to Tab back into the form.</li>
            <li><strong>Per-step <code>status</code></strong> is announced — pair it with form validation so &ldquo;step 2, error&rdquo; reaches the rail when validation fails.</li>
            <li><strong>Inside a Modal</strong> — let the Modal own focus trapping. Don&rsquo;t set <code>disableFocusTrap</code> on the Modal unless you have a very specific reason; the Wizard relies on the trap to keep Tab inside the dialog.</li>
            <li><strong>The footer&rsquo;s Cancel / Back / Next buttons</strong> already have accessible names. Don&rsquo;t override them with non-translatable strings — use the per-step <code>footer.nextButtonText</code> prop for legitimate copy changes (&ldquo;Create deployment&rdquo;, &ldquo;Send invitation&rdquo;).</li>
          </ul>
        </Card>
      </Section>
      <ThemingPointer
        dials={[
          ["--gp-surface-card", "Step-nav rail background."],
          ["--gp-control-pad-y", "Footer button heights."],
          ["--gp-radius-control", "Footer button radii."],
          ["--gp-border-subtle", "Step-nav dividers."],
        ]}
      />
    </FoundationPage>
  ),
};
