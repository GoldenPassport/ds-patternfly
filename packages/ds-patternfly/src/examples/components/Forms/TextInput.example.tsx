/**
 * TextInput — single-line text input, wrapped in FormGroup for label wiring.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useId, useState } from "react";
import {
  FormGroup,
  FormHelperText,
  HelperText,
  HelperTextItem,
  TextInput,
} from "../../_lib.js";

// Element ids derive from useId() so any number of instances can coexist
// on one page without duplicate-id clashes.

// #region Basic
export function Basic() {
  const id = useId();
  const [value, setValue] = useState("");

  return (
    <FormGroup label="Project name" isRequired fieldId={`${id}-proj`}>
      <TextInput
        id={`${id}-proj`}
        value={value}
        onChange={(_, v) => setValue(v)}
        placeholder="my-project"
      />
    </FormGroup>
  );
}
// #endregion

// #region Elevated
// gp-is-elevated also works on FormGroup (covers the nested input) and on
// InputGroup-based components like NumberInput — the class propagates down.
export function Elevated() {
  const id = useId();

  return (
    <FormGroup label="Search" fieldId={`${id}-search`}>
      <TextInput
        id={`${id}-search`}
        className="gp-is-elevated"
        placeholder="Find something..."
        aria-label="Search"
      />
    </FormGroup>
  );
}
// #endregion

// #region ValidatedStates
export function ValidatedStates() {
  const id = useId();
  const [email, setEmail] = useState("not-an-email");
  const validated = email.includes("@") ? "default" : "error";

  return (
    <FormGroup label="Email" fieldId={`${id}-email`}>
      <TextInput
        id={`${id}-email`}
        type="email"
        value={email}
        onChange={(_, v) => setEmail(v)}
        validated={validated}
        aria-describedby={`${id}-email-helper`}
      />
      <FormHelperText>
        <HelperText id={`${id}-email-helper`}>
          <HelperTextItem variant={validated === "error" ? "error" : "default"}>
            {validated === "error" ? "Must contain '@'." : "Looks good."}
          </HelperTextItem>
        </HelperText>
      </FormHelperText>
    </FormGroup>
  );
}
// #endregion

export default function TextInputExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <Basic />
      <Elevated />
      <ValidatedStates />
    </div>
  );
}
