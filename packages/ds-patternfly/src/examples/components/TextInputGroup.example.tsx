/**
 * TextInputGroup — composition primitive for text inputs with extra UI
 * inside the input frame (icons, utility buttons, chips, validation).
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useId, useState } from "react";
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
} from "@golden-passport/ds-patternfly";
import {
  EyeIcon,
  EyeSlashIcon,
  SearchIcon,
  TimesIcon,
} from "@patternfly/react-icons";

// #region SearchWithClear
export function SearchWithClear() {
  const [search, setSearch] = useState("");

  return (
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
  );
}
// #endregion

// #region InlineChips
export function InlineChips() {
  const id = useId();
  const inputId = `${id}-chips-input`;
  const helpId = `${id}-chips-help`;
  const [chips, setChips] = useState(["frontend", "design"]);
  const [draft, setDraft] = useState("");

  return (
    <FormGroup
      label="Tags"
      fieldId={inputId}
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
          inputId={inputId}
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
          aria-describedby={helpId}
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
        <HelperText id={helpId}>
          <HelperTextItem>
            Press <kbd>Enter</kbd> to add. <kbd>Backspace</kbd>{" "}
            on an empty field removes the last tag.
          </HelperTextItem>
        </HelperText>
      </FormHelperText>
    </FormGroup>
  );
}
// #endregion

// #region ShowHidePassword
export function ShowHidePassword() {
  const id = useId();
  const pwdId = `${id}-pwd`;
  const [pwd, setPwd] = useState("");
  const [pwdVisible, setPwdVisible] = useState(false);

  return (
    <FormGroup label="Password" fieldId={pwdId} isRequired>
      <TextInputGroup>
        <TextInputGroupMain
          type={pwdVisible ? "text" : "password"}
          value={pwd}
          onChange={(_, value) => setPwd(value)}
          aria-label="Password"
          inputId={pwdId}
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
  );
}
// #endregion

// #region ValidationStates
export function ValidationStates() {
  const id = useId();

  return (
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
            fieldId={`${id}-v-${state}`}
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
                inputId={`${id}-v-${state}`}
                placeholder="hostname"
              />
            </TextInputGroup>
          </FormGroup>
        );
      })}
    </div>
  );
}
// #endregion

// #region LiveValidation
// Validation: must be 1–32 chars, lowercase letters/numbers/hyphens only.
const validateHost = (v: string): "default" | "success" | "warning" | "error" => {
  if (!v) return "default";
  if (v.length > 32) return "error";
  if (!/^[a-z0-9-]+$/.test(v)) return "error";
  if (v.length < 3) return "warning";
  return "success";
};

export function LiveValidation() {
  const id = useId();
  const hostId = `${id}-host`;
  const [host, setHost] = useState("api");
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
    <FormGroup label="Hostname" fieldId={hostId} isRequired>
      <TextInputGroup
        {...(hostState === "default" ? {} : { validated: hostState })}
      >
        {/* status icon is rendered automatically by TextInputGroupMain */}
        <TextInputGroupMain
          value={host}
          onChange={(_, v) => setHost(v)}
          aria-label="Hostname"
          inputId={hostId}
          placeholder="my-service"
        />
      </TextInputGroup>
      <FormHelperText>
        <HelperText id={`${id}-host-helper`}>
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
  );
}
// #endregion

// #region Disabled
export function Disabled() {
  return (
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
  );
}
// #endregion

export default function TextInputGroupExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <SearchWithClear />
      <InlineChips />
      <ShowHidePassword />
      <ValidationStates />
      <LiveValidation />
      <Disabled />
    </div>
  );
}
