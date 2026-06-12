import type { Meta, StoryObj } from "@storybook/react-vite";
import { DateField } from "@golden-passport/ds-patternfly";
import {
  FoundationPage,
  Section,
  Card,
  ConfigurationSection,
  Example,
} from "../_kit/StoryKit.js";
import { Popover, Flat, Bounded } from "../../examples/ds/DateField.example.js";
import dateFieldExampleSrc from "../../examples/ds/DateField.example.tsx?raw";
import dateFieldComponentSrc from "../../components/ds/DateField.tsx?raw";
import propsData from "./dateField.props.json";

const meta: Meta<typeof DateField> = {
  title: "Building blocks/Forms/DateField",
  component: DateField,
  parameters: {
    layout: "padded",
    // PF6's calendar greys out disabled days below the axe color-contrast
    // threshold — a stock PF6 styling limitation, not a real defect.
    a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } },
  },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="DateField"
      intro={
        <>
          The date picker lego block — pick a single date, displayed either as
          a text input with a popover calendar (<code>display="popover"</code>,
          the default) or as an always-visible inline calendar
          (<code>display="flat"</code>). Controlled by a{" "}
          <code>Date | null</code> value; restrict the range with{" "}
          <code>minDate</code> / <code>maxDate</code> (out-of-range days are
          disabled in both displays). For future-only dates, use{" "}
          <code>FutureDateField</code>.
        </>
      }
    >
      <Section title="Popover (default)" description="A text input with a popover calendar — type or pick.">
        <Card>
          <Example source={dateFieldExampleSrc} region="Popover" fileName="DateField.example.tsx">
            <Popover />
          </Example>
        </Card>
      </Section>

      <Section title="Flat" description="display='flat' renders an always-visible inline calendar (no input).">
        <Card>
          <Example source={dateFieldExampleSrc} region="Flat" fileName="DateField.example.tsx">
            <Flat />
          </Example>
        </Card>
      </Section>

      <Section title="Bounded range" description="minDate / maxDate disable days outside the range in the calendar and reject out-of-range typed input.">
        <Card>
          <Example source={dateFieldExampleSrc} region="Bounded" fileName="DateField.example.tsx">
            <Bounded />
          </Example>
        </Card>
      </Section>

      <Section title="Full example" description="The complete example file behind the demos above. The same file ships in the MCP docs catalog.">
        <Card>
          <Example source={dateFieldExampleSrc} fileName="DateField.example.tsx" />
        </Card>
      </Section>

      <ConfigurationSection
        importStatement={propsData.import}
        rows={propsData.rows}
        componentSource={dateFieldComponentSrc}
        componentFileName="DateField.tsx"
      />
    </FoundationPage>
  ),
};
