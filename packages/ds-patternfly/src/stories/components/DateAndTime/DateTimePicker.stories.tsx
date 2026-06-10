import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  FoundationPage,
  Section,
  Card,
  Example,
} from "../../_kit/StoryKit.js";
import { SideBySide } from "../../../examples/components/DateAndTime/DateTimePicker.example.js";
import dateTimePickerExampleSrc from "../../../examples/components/DateAndTime/DateTimePicker.example.tsx?raw";

const meta: Meta = {
  title: "Components/Forms/Date and time/DateTimePicker",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="DateTimePicker"
      intro={
        <>
          PatternFly 6 doesn&apos;t ship a single &quot;date and time&quot;
          component — the recommended pattern is two paired controls:{" "}
          <code>DatePicker</code> for the day and <code>TimePicker</code>{" "}
          for the time, side-by-side under one FormGroup. This page shows
          the recipe.
        </>
      }
    >
      <Section
        title="Side-by-side composition"
        description="Two paired controls — date input + time input. Year navigation lives inside the DatePicker's popover (PF6's stock controls); no extra year stepper sibling."
      >
        <Card>
          <Example
            source={dateTimePickerExampleSrc}
            region="SideBySide"
            fileName="DateTimePicker.example.tsx"
          >
            <SideBySide />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example
            source={dateTimePickerExampleSrc}
            fileName="DateTimePicker.example.tsx"
          />
        </Card>
      </Section>

      <Section
        title="Why two controls and not one"
        description="The product reasons PF6 makes you compose this yourself."
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
            <li><strong>Independent validation.</strong> Date and time often have different rules — &quot;next week&quot;, &quot;business hours&quot;, &quot;not on holidays&quot;. Two controls let each carry its own validators.</li>
            <li><strong>Independent input modes.</strong> Many users know the date but want to pick the time visually, or vice versa. Two inputs let each work in its native style.</li>
            <li><strong>Composable for ranges.</strong> A &quot;from / to&quot; range needs four controls — building it from a monolithic DateTimePicker would be awkward.</li>
            <li><strong>Locale-aware.</strong> Date order varies by locale; time format (12h vs 24h) varies. Splitting them lets each pick the right convention without coupling.</li>
          </ul>
        </Card>
      </Section>

      <Section
        title="A few rules for the composition"
        description="Things to get right when stitching them together."
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
            <li><strong>One FormGroup wraps both.</strong> The label applies to the date+time pair as a unit. Both inputs share the same context.</li>
            <li><strong>Distinct aria-labels per input.</strong> &quot;Schedule date&quot; / &quot;Schedule time&quot; — not just &quot;date&quot; and &quot;time&quot;.</li>
            <li><strong>Validate at the form level, not in each control.</strong> &quot;Tomorrow at 9am&quot; is one decision; per-control validation can&apos;t see the combined value.</li>
            <li><strong>Combine into an ISO timestamp at submit time.</strong> Don&apos;t store strings — parse to a Date in the submit handler.</li>
          </ul>
        </Card>
      </Section>

    </FoundationPage>
  ),
};
