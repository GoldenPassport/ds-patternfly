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
  WithUnit,
  InternalStepperLayout,
} from "../../examples/components/NumberInput.example.js";
import numberInputExampleSrc from "../../examples/components/NumberInput.example.tsx?raw";
import stepperInputComponentSrc from "../../components/ds/StepperInput.tsx?raw";

const meta: Meta = {
  title: "Components/Forms/NumberInput",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="NumberInput"
      intro={
        <>
          A numeric text input with built-in stepper buttons. Best for
          small-range values where users may want to nudge by one — quantity
          pickers, replica counts, retry counts. For values driven by feel
          rather than precision, use Slider.
        </>
      }
    >
      <Section
        title="Basic"
        description="Built from primitives so the ± steppers use the lib's tertiary icon-button styling (matches the DatePicker calendar trigger + the Components/Button icon-only row) rather than PF6's stock grey-fill control chip."
      >
        <Card>
          <Example
            source={numberInputExampleSrc}
            region="Basic"
            fileName="NumberInput.example.tsx"
          >
            <Basic />
          </Example>
        </Card>
      </Section>

      <Section
        title="With unit"
        description="Same lib-style ± stepper as Basic, with an InputGroupText trailing the field to render the unit. Swap to a leading InputGroupText for prefixed units like '$'."
      >
        <Card>
          <Example
            source={numberInputExampleSrc}
            region="WithUnit"
            fileName="NumberInput.example.tsx"
          >
            <WithUnit />
          </Example>
        </Card>
      </Section>

      <Section
        title="Internal stepper variants"
        description="Two ways to put up/down controls inside an input — pick by context."
      >
        <Card>
          <div
            style={{
              padding: 24,
              color: "var(--gp-color-text-regular)",
              lineHeight: 1.7,
            }}
          >
            <p style={{ marginTop: 0 }}>
              <strong>1. Browser-native (default).</strong> Use{" "}
              <code>&lt;input type=&quot;number&quot;&gt;</code> and the
              browser draws its own up/down spinner buttons — no extra
              code, keyboard arrow keys work natively. PF6 uses this for
              the year cell inside its calendar popover, and it&apos;s
              the right answer when:
            </p>
            <ul style={{ marginBlockStart: 0, paddingInlineStart: 24 }}>
              <li>The control lives inside a transient surface (popover, tooltip, dropdown) where consistent cross-browser styling matters less.</li>
              <li>Space is tight and the spinner sits inline with adjacent controls (calendar header).</li>
              <li>You want zero JS overhead.</li>
            </ul>
            <p style={{ marginBlockEnd: 0 }}>
              Caveats: the spinner buttons differ between Chrome, Firefox
              and Safari (subtle visual inconsistency); they&apos;re very
              small (~10px) and effectively unusable on touch; and
              they&apos;re not theme-aware.
            </p>
            <p>
              <strong>2. Lib-styled (the recipe below).</strong> Custom
              stacked stepper using <code>gp-stepper-stack</code> +{" "}
              <code>gp-stepper-btn</code> CSS utilities. Square,
              brand-themed, larger hit area (50% of input height each),
              consistent across browsers, and responsive (auto-swaps to
              the standard NumberInput layout below the md breakpoint
              for touch). Use it when:
            </p>
            <ul style={{ marginBlockStart: 0, paddingInlineStart: 24 }}>
              <li>The control sits in a primary form surface where visual consistency with the rest of the system matters.</li>
              <li>You want a clear, branded interaction signal rather than browser default.</li>
              <li>Touch users will hit it on small viewports — the responsive swap takes care of WCAG 2.5.5 minimums.</li>
            </ul>
          </div>
        </Card>
      </Section>

      <Section
        title="Internal stepper layout (recipe — lib-styled)"
        description="Variant 2 from above. Compact desktop UX where up/down controls sit inside the input frame rather than flanking it. On touch / smaller screens the carets are too small for finger tapping, so swap to the standard outer-stepper NumberInput at the md breakpoint."
      >
        <Card>
          <Example
            source={numberInputExampleSrc}
            region="InternalStepperLayout"
            fileName="NumberInput.example.tsx"
          >
            <InternalStepperLayout />
          </Example>
          <p
            style={{
              margin: "0 16px 16px",
              color: "var(--gp-color-text-subtle)",
              fontSize: 14,
            }}
          >
            <strong>Why the swap:</strong> the internal carets are
            ~17×17px squares — fine for a mouse pointer but well below
            the WCAG 2.5.5 minimum 24×24px touch target. On small
            screens the standard NumberInput&apos;s full-size stepper
            buttons become finger-friendly. Both variants share state,
            so the user value persists across viewport changes.
          </p>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example source={numberInputExampleSrc} fileName="NumberInput.example.tsx" />
        </Card>
      </Section>

      <ConfigurationSection
        importStatement={'import { StepperInput } from "@golden-passport/ds-patternfly";'}
        componentSource={stepperInputComponentSrc}
        componentFileName="StepperInput.tsx"
        description="StepperInput owns the clamp logic, brand-styled steppers, disabled-at-bounds wiring, and the three layouts. You pass the controlled value / onChange and the bounds."
        rows={[
          { name: "value", type: 'number | ""', description: 'Controlled value. Empty string is an empty field.' },
          { name: "onChange", type: '(value: number | "") => void', description: "Fires on every edit / step, with the clamped value." },
          { name: "min / max", type: "number", description: "Range bounds (default 0 / 99). The component clamps edits and steps, and disables the bound-reaching control." },
          { name: "step", type: "number", description: "Amount the ± / caret controls add or subtract (default 1)." },
          { name: "unit", type: "ReactNode", description: 'Trailing unit ("%", "GB", …), shown in the "stepper" layout.' },
          { name: "layout", type: '"stepper" | "internal" | "input-only"', description: 'Presentation. "stepper" (default) external ± buttons; "internal" compact caret stack; "input-only" bare numeric input.' },
          { name: "minDigits", type: "number", description: '"internal" only — minimum visible digits the field is sized to hold so the value never truncates.' },
          { name: "ariaLabel", type: "string", description: "Required. Names the field and derives the ± / caret button labels (e.g. \"Increase Quantity\")." },
          { name: "width", type: "string", description: "Control width (CSS length). Maps to the wrapper's max / inline size." },
        ]}
      />

      <Section title="Accessibility">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>One label drives all three.</strong> Pass <code>ariaLabel</code> — StepperInput names the input and derives the ± / caret button labels (&quot;Increase&nbsp;Quantity&quot;, &quot;Decrease&nbsp;Quantity&quot;) from it. None of the controls have text content of their own.</li>
            <li><strong>Bounds are enforced for you.</strong> StepperInput clamps both typed edits and steps to <code>min</code> / <code>max</code>, and disables whichever control would cross a bound.</li>
            <li><strong>Don&apos;t use a stepper for huge ranges.</strong> Stepping from 0 to 1,000,000 by ones is hostile — use a plain TextInput with type=&quot;number&quot;.</li>
          </ul>
        </Card>
      </Section>

      <ThemingPointer
        dials={[
          ["--gp-control-pad-y", "Drives input + stepper-button height as a single square unit."],
          ["--gp-radius-control", "Corner radius on the input + stepper buttons."],
          ["--gp-border-default", "Resting border colour."],
          ["--gp-focus-ring", "Focus-ring colour."],
        ]}
      />
    </FoundationPage>
  ),
};
