import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Button,
  FormGroup,
  FormHelperText,
  HelperText,
  HelperTextItem,
  Label,
  TextInputGroup,
  TextInputGroupMain,
  TextInputGroupUtilities,
} from "@patternfly/react-core";
import {
  EyeIcon,
  EyeSlashIcon,
  SearchIcon,
  TimesIcon,
} from "@patternfly/react-icons";
import { FoundationPage, Section, Card, CodeBlock, ThemingPointer } from "../_storyKit.js";
import { DemoFrame, PropsTable } from "../../components/DemoKit.js";

const meta: Meta = {
  title: "Components/Forms/TextInputGroup",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => {
    // ---------- demo state ----------
    const [search, setSearch] = useState("");

    const [chips, setChips] = useState(["frontend", "design"]);
    const [draft, setDraft] = useState("");

    const [pwd, setPwd] = useState("");
    const [pwdVisible, setPwdVisible] = useState(false);

    const [host, setHost] = useState("api");
    // Validation: must be 1–32 chars, lowercase letters/numbers/hyphens only.
    const validateHost = (v: string): "default" | "success" | "warning" | "error" => {
      if (!v) return "default";
      if (v.length > 32) return "error";
      if (!/^[a-z0-9-]+$/.test(v)) return "error";
      if (v.length < 3) return "warning";
      return "success";
    };
    const hostState = validateHost(host);
    const hostHelper: Record<typeof hostState, string> = {
      default: "Lowercase letters, numbers, and hyphens only.",
      success: "Looks good.",
      warning: "Short hostnames work but are easier to mistype — consider 3+ characters.",
      error:
        host.length > 32
          ? "Maximum 32 characters."
          : "Only lowercase letters, numbers, and hyphens allowed.",
    };

    return (
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
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <DemoFrame>
                <TextInputGroup>
                  <TextInputGroupMain
                    icon={<SearchIcon />}
                    value={search}
                    onChange={(_, value) => setSearch(value)}
                    aria-label="Search projects"
                    placeholder="Search projects"
                  />
                  {search ? (
                    <TextInputGroupUtilities>
                      <Button
                        variant="plain"
                        aria-label="Clear search"
                        onClick={() => setSearch("")}
                      >
                        <TimesIcon />
                      </Button>
                    </TextInputGroupUtilities>
                  ) : null}
                </TextInputGroup>
              </DemoFrame>
              <CodeBlock>{`<TextInputGroup>
  <TextInputGroupMain
    icon={<SearchIcon />}
    value={search}
    onChange={(_, value) => setSearch(value)}
    aria-label="Search projects"
    placeholder="Search projects"
  />
  {search ? (
    <TextInputGroupUtilities>
      <Button variant="plain" aria-label="Clear search" onClick={() => setSearch("")}>
        <TimesIcon />
      </Button>
    </TextInputGroupUtilities>
  ) : null}
</TextInputGroup>`}</CodeBlock>
            </div>
          </Card>
        </Section>

        <Section
          title="Inline chips (typeahead)"
          description="Selected values render as removable Labels inside the input. Each chip is a real Label with status='info' (the system convention for neutral, informational tags), so removal, focus, contrast, and screen-reader behaviour all come from the Label component. The input next to them takes the next value."
        >
          <Card>
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <DemoFrame>
                <FormGroup
                  label="Tags"
                  fieldId="chips-input"
                  labelHelp={
                    <span
                      aria-live="polite"
                      style={{
                        color: "var(--gp-color-text-subtle)",
                        fontSize: 14,
                      }}
                    >
                      {chips.length}{" "}
                      {chips.length === 1 ? "selected" : "selected"}
                    </span>
                  }
                >
                  <TextInputGroup>
                    <TextInputGroupMain
                      inputId="chips-input"
                      value={draft}
                      onChange={(_, value) => setDraft(value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && draft.trim()) {
                          e.preventDefault();
                          // Prevent dupes — case-insensitive
                          const next = draft.trim();
                          if (
                            !chips.some(
                              (c) => c.toLowerCase() === next.toLowerCase(),
                            )
                          ) {
                            setChips([...chips, next]);
                          }
                          setDraft("");
                        } else if (
                          e.key === "Backspace" &&
                          !draft &&
                          chips.length > 0
                        ) {
                          // Backspace on an empty field removes the last chip
                          setChips(chips.slice(0, -1));
                        }
                      }}
                      aria-label="Add tag"
                      aria-describedby="chips-help"
                      placeholder={
                        chips.length ? "" : "Type a tag and press Enter"
                      }
                    >
                      {chips.map((c, i) => (
                        <Label
                          key={c}
                          status="info"
                          onClose={() =>
                            setChips(chips.filter((_, j) => j !== i))
                          }
                          closeBtnAriaLabel={`Remove ${c}`}
                          style={{ marginInlineEnd: 4 }}
                        >
                          {c}
                        </Label>
                      ))}
                    </TextInputGroupMain>
                    {chips.length > 0 ? (
                      <TextInputGroupUtilities>
                        <Button
                          variant="plain"
                          aria-label="Remove all tags"
                          onClick={() => setChips([])}
                        >
                          <TimesIcon />
                        </Button>
                      </TextInputGroupUtilities>
                    ) : null}
                  </TextInputGroup>
                  <FormHelperText>
                    <HelperText id="chips-help">
                      <HelperTextItem>
                        Press <kbd>Enter</kbd> to add. <kbd>Backspace</kbd>{" "}
                        on an empty field removes the last tag.
                      </HelperTextItem>
                    </HelperText>
                  </FormHelperText>
                </FormGroup>
              </DemoFrame>
              <CodeBlock>{`const [chips, setChips] = useState<string[]>([]);
const [draft, setDraft] = useState("");

<FormGroup label="Tags" fieldId="tags">
  <TextInputGroup>
    <TextInputGroupMain
      inputId="tags"
      value={draft}
      onChange={(_, v) => setDraft(v)}
      aria-label="Add tag"
      aria-describedby="tags-help"
      onKeyDown={(e) => {
        if (e.key === "Enter" && draft.trim()) {
          e.preventDefault();
          const next = draft.trim();
          if (!chips.some(c => c.toLowerCase() === next.toLowerCase())) {
            setChips([...chips, next]);
          }
          setDraft("");
        } else if (e.key === "Backspace" && !draft && chips.length > 0) {
          setChips(chips.slice(0, -1));
        }
      }}
    >
      {chips.map((c, i) => (
        // status="info" matches the system convention for neutral
        // informational tags (see Components/Label).
        <Label
          key={c}
          status="info"
          onClose={() => setChips(chips.filter((_, j) => j !== i))}
          closeBtnAriaLabel={\`Remove \${c}\`}
        >
          {c}
        </Label>
      ))}
    </TextInputGroupMain>
    {chips.length > 0 ? (
      <TextInputGroupUtilities>
        <Button variant="plain" aria-label="Remove all tags" onClick={() => setChips([])}>
          <TimesIcon />
        </Button>
      </TextInputGroupUtilities>
    ) : null}
  </TextInputGroup>
  <FormHelperText>
    <HelperText id="tags-help">
      <HelperTextItem>
        Press Enter to add. Backspace on an empty field removes the last tag.
      </HelperTextItem>
    </HelperText>
  </FormHelperText>
</FormGroup>`}</CodeBlock>
              <p
                style={{
                  margin: 0,
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
            </div>
          </Card>
        </Section>

        <Section
          title="Show/hide password"
          description="Password input with a trailing toggle. Visibility state lives in the consumer."
        >
          <Card>
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <DemoFrame>
                <FormGroup label="Password" fieldId="pwd" isRequired>
                  <TextInputGroup>
                    <TextInputGroupMain
                      type={pwdVisible ? "text" : "password"}
                      value={pwd}
                      onChange={(_, value) => setPwd(value)}
                      aria-label="Password"
                      inputId="pwd"
                      placeholder="At least 12 characters"
                    />
                    <TextInputGroupUtilities>
                      <Button
                        variant="plain"
                        aria-label={pwdVisible ? "Hide password" : "Show password"}
                        aria-pressed={pwdVisible}
                        onClick={() => setPwdVisible((s) => !s)}
                      >
                        {pwdVisible ? <EyeSlashIcon /> : <EyeIcon />}
                      </Button>
                    </TextInputGroupUtilities>
                  </TextInputGroup>
                </FormGroup>
              </DemoFrame>
              <CodeBlock>{`const [visible, setVisible] = useState(false);

<TextInputGroup>
  <TextInputGroupMain
    type={visible ? "text" : "password"}
    value={pwd}
    onChange={(_, v) => setPwd(v)}
    aria-label="Password"
    inputId="pwd"
  />
  <TextInputGroupUtilities>
    <Button
      variant="plain"
      aria-label={visible ? "Hide password" : "Show password"}
      aria-pressed={visible}
      onClick={() => setVisible(s => !s)}
    >
      {visible ? <EyeSlashIcon /> : <EyeIcon />}
    </Button>
  </TextInputGroupUtilities>
</TextInputGroup>`}</CodeBlock>
            </div>
          </Card>
        </Section>

        <Section
          title="Validation states"
          description="Pass `validated` to the wrapper. PF6 colours the border; you supply the matching status icon and helper text for full a11y coverage."
        >
          <Card>
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <DemoFrame>
                <div style={{ display: "grid", gap: 16 }}>
                  {(
                    ["default", "success", "warning", "error"] as const
                  ).map((state) => {
                    const groupProps =
                      state === "default" ? {} : { validated: state };
                    return (
                      <FormGroup
                        key={state}
                        label={`validated="${state}"`}
                        fieldId={`v-${state}`}
                      >
                        <TextInputGroup {...groupProps}>
                          {/* TextInputGroupMain auto-renders the matching
                              status icon when validated is set on the
                              wrapper — no need to add one in Utilities. */}
                          <TextInputGroupMain
                            icon={<SearchIcon />}
                            value={
                              state === "default"
                                ? ""
                                : state === "success"
                                  ? "valid-host"
                                  : state === "warning"
                                    ? "ok"
                                    : "Invalid value!"
                            }
                            onChange={() => {}}
                            aria-label={`Hostname (${state})`}
                            inputId={`v-${state}`}
                            placeholder="hostname"
                          />
                        </TextInputGroup>
                      </FormGroup>
                    );
                  })}
                </div>
              </DemoFrame>
              <CodeBlock>{`<TextInputGroup validated="error">
  <TextInputGroupMain ... />
  {/* TextInputGroupMain auto-renders the matching status icon when
      validated is set on the wrapper — don't add one in Utilities. */}
</TextInputGroup>`}</CodeBlock>
            </div>
          </Card>
        </Section>

        <Section
          title="Live validation"
          description="Type into the field — colour, icon, and helper text update together."
        >
          <Card>
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <DemoFrame>
                <FormGroup label="Hostname" fieldId="host" isRequired>
                  <TextInputGroup
                    {...(hostState === "default" ? {} : { validated: hostState })}
                  >
                    {/* status icon is rendered automatically by TextInputGroupMain */}
                    <TextInputGroupMain
                      value={host}
                      onChange={(_, v) => setHost(v)}
                      aria-label="Hostname"
                      inputId="host"
                      placeholder="my-service"
                    />
                  </TextInputGroup>
                  <FormHelperText>
                    <HelperText id="host-helper">
                      <HelperTextItem
                        variant={
                          hostState === "default" ? "default" : hostState
                        }
                      >
                        {hostHelper[hostState]}
                      </HelperTextItem>
                    </HelperText>
                  </FormHelperText>
                </FormGroup>
              </DemoFrame>
              <CodeBlock>{`function validate(v: string) {
  if (!v) return "default";
  if (v.length > 32) return "error";
  if (!/^[a-z0-9-]+$/.test(v)) return "error";
  if (v.length < 3) return "warning";
  return "success";
}

const state = validate(host);

<TextInputGroup validated={state === "default" ? undefined : state}>
  <TextInputGroupMain ... />
  <TextInputGroupUtilities>
    {state !== "default" && <StatusIconFor state={state} />}
  </TextInputGroupUtilities>
</TextInputGroup>
<HelperText>
  <HelperTextItem variant={state}>{messageFor(state)}</HelperTextItem>
</HelperText>`}</CodeBlock>
            </div>
          </Card>
        </Section>

        <Section
          title="Disabled"
          description="Disable the wrapper — children inherit the state."
        >
          <Card>
            <div style={{ padding: 24 }}>
              <DemoFrame>
                <TextInputGroup isDisabled>
                  <TextInputGroupMain
                    icon={<SearchIcon />}
                    value="locked-value"
                    onChange={() => {}}
                    aria-label="Disabled search"
                  />
                  <TextInputGroupUtilities>
                    <Button variant="plain" aria-label="Clear" isDisabled>
                      <TimesIcon />
                    </Button>
                  </TextInputGroupUtilities>
                </TextInputGroup>
              </DemoFrame>
            </div>
          </Card>
        </Section>

        <Section title="TextInputGroup props">
          <Card>
            <div style={{ padding: 24 }}>
              <PropsTable
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
            </div>
          </Card>
        </Section>

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
    );
  },
};
