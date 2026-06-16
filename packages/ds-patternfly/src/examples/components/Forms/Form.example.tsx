/**
 * Form — the container that organizes form fields with consistent spacing.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useId, useState } from "react";
import {
  ActionGroup,
  Button,
  Form,
  FormGroup,
  FormHelperText,
  FormSection,
  HelperText,
  HelperTextItem,
  TextInput,
} from "@golden-passport/ds-patternfly";

// Element ids derive from useId() so any number of instances can coexist
// on one page without duplicate-id clashes.

// #region Anatomy
export function Anatomy() {
  const id = useId();
  const [name, setName] = useState("");

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <FormSection title="Profile">
        <FormGroup label="Full name" isRequired fieldId={`${id}-name`}>
          <TextInput
            id={`${id}-name`}
            value={name}
            onChange={(_, v) => setName(v)}
            aria-describedby={`${id}-name-helper`}
          />
          <FormHelperText>
            <HelperText id={`${id}-name-helper`}>
              <HelperTextItem>Visible on your profile.</HelperTextItem>
            </HelperText>
          </FormHelperText>
        </FormGroup>
      </FormSection>
      <ActionGroup>
        <Button type="submit" variant="primary">Save</Button>
        <Button variant="link">Cancel</Button>
      </ActionGroup>
    </Form>
  );
}
// #endregion

export default function FormExample() {
  return <Anatomy />;
}
