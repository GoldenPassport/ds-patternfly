/**
 * Wizard — a multi-step task runner with a step rail, per-step body, and a
 * standard footer (Back / Next / Cancel / Submit).
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useId, useState } from "react";
import {
  Button,
  Checkbox,
  Form,
  FormGroup,
  Modal,
  ModalVariant,
  Radio,
  TextArea,
  TextInput,
  Wizard,
  WizardStep,
  type WizardStepType,
} from "../_lib.js";

// Field / step ids derive from useId() so several wizards can coexist on
// one page without duplicate-id clashes.

// #region InlineWizard
export function InlineWizard() {
  const id = useId();
  const [name, setName] = useState("");
  const [region, setRegion] = useState("us-east-1");
  const [size, setSize] = useState("medium");
  const [autoBackup, setAutoBackup] = useState(true);
  const [notes, setNotes] = useState("");
  const [completed, setCompleted] = useState<string | null>(null);

  const reset = () => {
    setName("");
    setRegion("us-east-1");
    setSize("medium");
    setAutoBackup(true);
    setNotes("");
  };

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <Wizard
        navAriaLabel="Create deployment steps"
        height={420}
        onSave={() => setCompleted(name || "(unnamed)")}
        onClose={() => {
          reset();
          setCompleted(null);
        }}
      >
        <WizardStep id={`${id}-step-name`} name="Name">
          <Form>
            <FormGroup label="Deployment name" isRequired fieldId={`${id}-name`}>
              <TextInput
                id={`${id}-name`}
                value={name}
                onChange={(_e, v) => setName(v)}
                isRequired
              />
            </FormGroup>
          </Form>
        </WizardStep>
        <WizardStep id={`${id}-step-region`} name="Region">
          <Form>
            <FormGroup label="Region" fieldId={`${id}-region`} isStack>
              {["us-east-1", "us-west-2", "eu-central-1"].map((r) => (
                <Radio
                  key={r}
                  id={`${id}-region-${r}`}
                  name={`${id}-region`}
                  label={r}
                  isChecked={region === r}
                  onChange={() => setRegion(r)}
                />
              ))}
            </FormGroup>
          </Form>
        </WizardStep>
        <WizardStep id={`${id}-step-size`} name="Size">
          <Form>
            <FormGroup label="Instance size" fieldId={`${id}-size`} isStack>
              {["small", "medium", "large"].map((s) => (
                <Radio
                  key={s}
                  id={`${id}-size-${s}`}
                  name={`${id}-size`}
                  label={s}
                  isChecked={size === s}
                  onChange={() => setSize(s)}
                />
              ))}
            </FormGroup>
            <FormGroup fieldId={`${id}-backup`}>
              <Checkbox
                id={`${id}-backup`}
                label="Enable automatic backups"
                isChecked={autoBackup}
                onChange={(_e, c) => setAutoBackup(c)}
              />
            </FormGroup>
          </Form>
        </WizardStep>
        <WizardStep id={`${id}-step-review`} name="Review" footer={{ nextButtonText: "Create deployment" }}>
          <Form>
            <FormGroup label="Summary" fieldId={`${id}-summary`}>
              <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.8 }}>
                <li>Name: <strong>{name || "—"}</strong></li>
                <li>Region: <strong>{region}</strong></li>
                <li>Size: <strong>{size}</strong></li>
                <li>Backups: <strong>{autoBackup ? "enabled" : "disabled"}</strong></li>
              </ul>
            </FormGroup>
            <FormGroup label="Notes (optional)" fieldId={`${id}-notes`}>
              <TextArea
                id={`${id}-notes`}
                value={notes}
                onChange={(_e, v) => setNotes(v)}
                rows={3}
              />
            </FormGroup>
          </Form>
        </WizardStep>
      </Wizard>
      {completed !== null && (
        <p style={{ margin: 0, color: "var(--gp-color-text-subtle)" }}>
          ✓ Created <strong>{completed}</strong>. (Press Cancel to reset the
          demo.)
        </p>
      )}
    </div>
  );
}
// #endregion

// #region InModal
export function InModal() {
  const id = useId();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setModalOpen(true)}>
        Launch wizard in modal
      </Button>
      <Modal
        variant={ModalVariant.large}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-label="Create deployment wizard"
      >
        <Wizard
          navAriaLabel="Create deployment steps"
          height={420}
          onSave={() => setModalOpen(false)}
          onClose={() => setModalOpen(false)}
        >
          <WizardStep id={`${id}-m-step-1`} name="Name">
            <Form>
              <FormGroup label="Deployment name" fieldId={`${id}-m-name`}>
                <TextInput id={`${id}-m-name`} />
              </FormGroup>
            </Form>
          </WizardStep>
          <WizardStep id={`${id}-m-step-2`} name="Configure">
            <p>Pick options for your deployment.</p>
          </WizardStep>
          <WizardStep
            id={`${id}-m-step-3`}
            name="Review"
            footer={{ nextButtonText: "Create" }}
          >
            <p>Confirm and submit.</p>
          </WizardStep>
        </Wizard>
      </Modal>
    </>
  );
}
// #endregion

// #region Progressive
export function Progressive() {
  const id = useId();

  return (
    <Wizard navAriaLabel="Progressive steps" isProgressive height={280}>
      <WizardStep id={`${id}-p-1`} name="Choose source">
        <p>Select where to deploy from.</p>
      </WizardStep>
      <WizardStep id={`${id}-p-2`} name="Pick branch">
        <p>Branch list depends on source.</p>
      </WizardStep>
      <WizardStep id={`${id}-p-3`} name="Confirm">
        <p>Final confirmation step.</p>
      </WizardStep>
    </Wizard>
  );
}
// #endregion

// #region VisitRequired
export function VisitRequired() {
  const id = useId();

  return (
    <Wizard
      navAriaLabel="Visit-required steps"
      isVisitRequired
      height={280}
      onStepChange={(_e, current: WizardStepType) => void current}
    >
      <WizardStep id={`${id}-v-1`} name="Step one">
        <p>Visit each step in order.</p>
      </WizardStep>
      <WizardStep id={`${id}-v-2`} name="Step two">
        <p>Now reachable.</p>
      </WizardStep>
      <WizardStep id={`${id}-v-3`} name="Step three">
        <p>Reachable after step two is visited.</p>
      </WizardStep>
    </Wizard>
  );
}
// #endregion

export default function WizardExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <InlineWizard />
      <InModal />
      <Progressive />
      <VisitRequired />
    </div>
  );
}
