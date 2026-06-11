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
  SearchWithClear,
  InlineChips,
  ShowHidePassword,
  ValidationStates,
  LiveValidation,
  Disabled,
} from "../../examples/components/TextInputGroup.example.js";
import textInputGroupExampleSrc from "../../examples/components/TextInputGroup.example.tsx?raw";
import textInputGroupComponentSrc from "../../components/base/TextInputGroup.tsx?raw";

const meta: Meta = {
  title: "Components/Forms/TextInputGroup",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="TextInputGroup"
      intro={
        <>
          A composition primitive for text inputs that need additional UI
          inside the input frame — leading icons, trailing utility
          buttons, inline chips, status indicators, validation icons.
          Reach for it when a plain TextInput can&apos;t fit what you need
          into the same visual control. The group owns shared state
          (disabled, validated) and lets each part keep its own behaviour.
        </>
      }
    >
      <Section
        title="Anatomy"
        description="Three children. Compose only the ones you need."
      >
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                {
                  name: "TextInputGroup",
                  type: "container",
                  description:
                    "Outer wrapper. Owns isDisabled and validated for the whole group.",
                },
                {
                  name: "TextInputGroupMain",
                  type: "child",
                  description:
                    "The input area. Holds value/onChange, optional leading icon, optional inline children (chips, prefix/suffix labels).",
                },
                {
                  name: "TextInputGroupUtilities",
                  type: "child",
                  description:
                    "Trailing slot for action buttons (clear, paste, show/hide password) and status icons.",
                },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section
        title="Search with leading icon + clear"
        description="The most common shape — clear-button only appears once there's something to clear."
      >
        <Card>
          <Example
            source={textInputGroupExampleSrc}
            region="SearchWithClear"
            fileName="TextInputGroup.example.tsx"
          >
            <SearchWithClear />
          </Example>
        </Card>
      </Section>

      <Section
        title="Inline chips (typeahead)"
        description="Selected values render as removable Labels inside the input. Each chip is a real Label with status='info' (the system convention for neutral, informational tags), so removal, focus, contrast, and screen-reader behaviour all come from the Label component. The input next to them takes the next value."
      >
        <Card>
          <Example
            source={textInputGroupExampleSrc}
            region="InlineChips"
            fileName="TextInputGroup.example.tsx"
          >
            <InlineChips />
          </Example>
          <p
            style={{
              margin: "0 16px 16px",
              color: "var(--gp-color-text-subtle)",
              fontSize: 14,
            }}
          >
            Wired up: case-insensitive de-dupe, Enter to add, Backspace
            on empty to remove the last chip, &quot;Remove all&quot;
            trailing button when there&apos;s anything to clear, live
            count above the field via <code>aria-live=&quot;polite&quot;</code>.
            Each chip is a <code>Label status=&quot;info&quot;</code> at
            default size — sized to sit comfortably within the input&apos;s
            line-height without inflating it.
          </p>
        </Card>
      </Section>

      <Section
        title="Show/hide password"
        description="Password input with a trailing toggle. Visibility state lives in the consumer."
      >
        <Card>
          <Example
            source={textInputGroupExampleSrc}
            region="ShowHidePassword"
            fileName="TextInputGroup.example.tsx"
          >
            <ShowHidePassword />
          </Example>
        </Card>
      </Section>

      <Section
        title="Validation states"
        description="Pass `validated` to the wrapper. PF6 colours the border; you supply the matching status icon and helper text for full a11y coverage."
      >
        <Card>
          <Example
            source={textInputGroupExampleSrc}
            region="ValidationStates"
            fileName="TextInputGroup.example.tsx"
          >
            <ValidationStates />
          </Example>
        </Card>
      </Section>

      <Section
        title="Live validation"
        description="Type into the field — colour, icon, and helper text update together."
      >
        <Card>
          <Example
            source={textInputGroupExampleSrc}
            region="LiveValidation"
            fileName="TextInputGroup.example.tsx"
          >
            <LiveValidation />
          </Example>
        </Card>
      </Section>

      <Section
        title="Disabled"
        description="Disable the wrapper — children inherit the state."
      >
        <Card>
          <Example
            source={textInputGroupExampleSrc}
            region="Disabled"
            fileName="TextInputGroup.example.tsx"
          >
            <Disabled />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example
            source={textInputGroupExampleSrc}
            fileName="TextInputGroup.example.tsx"
          />
        </Card>
      </Section>

      <ConfigurationSection
        importStatement={'import { TextInputGroup, TextInputGroupMain, TextInputGroupUtilities } from "@golden-passport/ds-patternfly";'}
        componentSource={textInputGroupComponentSrc}
        componentFileName="TextInputGroup.tsx"
        rows={[
          {
            name: "isDisabled",
            type: "boolean",
            description:
              "Disables the entire group. Children should also receive isDisabled where applicable (e.g. trailing buttons).",
          },
          {
            name: "isPlain",
            type: "boolean",
            description:
              "Removes the input frame border and background. Use when nesting inside another bordered surface.",
          },
          {
            name: "validated",
            type: '"success" | "warning" | "error"',
            description:
              "Visual state — colours the border accordingly. Pair with a matching status icon in TextInputGroupUtilities and HelperText with the same variant.",
          },
        ]}
      />

      <Section title="TextInputGroupMain props">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                {
                  name: "value",
                  type: "string | number",
                  description: "Controlled value.",
                },
                {
                  name: "onChange",
                  type: "(event, value: string) => void",
                  description: "Event first, value second.",
                },
                {
                  name: "type",
                  type: '"text" | "email" | "password" | "search" | "tel" | "url" | "number" | "date" | "datetime-local" | "month" | "time"',
                  description: "Native HTML input type.",
                },
                {
                  name: "icon",
                  type: "ReactNode",
                  description: "Leading icon — sits at the start of the input.",
                },
                {
                  name: "children",
                  type: "ReactNode",
                  description: "Inline children that render before the editable area — typically chips/labels for selected values.",
                },
                {
                  name: "inputId",
                  type: "string",
                  description: "id on the underlying <input> for FormGroup / aria-describedby wiring.",
                },
                {
                  name: "aria-label",
                  type: "string",
                  description: "Required. The input has no visible label of its own.",
                },
                {
                  name: "isExpanded",
                  type: "boolean",
                  description: "Sets aria-expanded — for typeahead patterns where the input controls a popover list.",
                },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section
        title="Accessibility"
        description="Each child speaks for itself."
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
            <li>
              <strong>Always provide aria-label on TextInputGroupMain.</strong>{" "}
              The component renders a bare <code>&lt;input&gt;</code> with no
              label of its own. Wrap in FormGroup for a visible label, but
              also set aria-label as a safety net.
            </li>
            <li>
              <strong>Trailing buttons need their own aria-label.</strong>{" "}
              Plain icon-only buttons (clear, show/hide, etc.) are nameless
              without it.
            </li>
            <li>
              <strong>Status icons in utilities are decorative.</strong>{" "}
              Mark them <code>aria-hidden=&quot;true&quot;</code> — the meaning
              comes from <code>validated</code> on the wrapper plus the
              HelperText variant. Two semantic announcements would be one
              too many.
            </li>
            <li>
              <strong>Show/hide password buttons should use{" "}
              <code>aria-pressed</code></strong> so AT users hear the toggle
              state, plus a label that flips with the state ("Show password" /
              "Hide password").
            </li>
            <li>
              <strong>Validation needs three pieces wired together:</strong>{" "}
              <code>validated</code> on TextInputGroup (colour),{" "}
              <code>aria-describedby</code> on the input pointing at a
              HelperText id (text), and a matching variant on the
              HelperTextItem (icon + tone).
            </li>
          </ul>
        </Card>
      </Section>

      <Section
        title="When to reach for TextInputGroup"
        description="The decision tree — TextInput is the default, TextInputGroup is the upgrade path."
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
            <li>
              <strong>TextInput</strong> — plain single-line text. Wrap in
              FormGroup for the label/helper text contract.
            </li>
            <li>
              <strong>TextInputGroup</strong> — leading icon, trailing
              button, inline chips, inline status indicator, integrated
              unit display, password show/hide.
            </li>
            <li>
              <strong>SearchInput</strong> — search query specifically.
              Pre-composed TextInputGroup with the right defaults baked in
              (icon, clear, optional results count, optional advanced search
              panel).
            </li>
            <li>
              <strong>NumberInput</strong> — numeric value with stepper
              buttons. Internally uses InputGroup, not TextInputGroup.
            </li>
          </ul>
        </Card>
      </Section>

      <ThemingPointer
        dials={[
          ["--gp-control-pad-y", "Drives wrapper height (matches form-control)."],
          ["--gp-radius-control", "Wrapper corner radius."],
          ["--gp-border-default", "Resting border colour."],
          ["--gp-focus-ring", "Focus-ring colour."],
        ]}
      />

    </FoundationPage>
  ),
};
