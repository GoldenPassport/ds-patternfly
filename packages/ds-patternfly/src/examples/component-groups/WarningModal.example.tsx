/**
 * WarningModal (@patternfly/react-component-groups) — a pre-built
 * confirmation modal for destructive or dangerous actions (delete, disable,
 * force-restart) with checkbox-gate and type-to-confirm guards.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useState } from "react";
import WarningModal from "@patternfly/react-component-groups/dist/dynamic/WarningModal";
import { Button, ButtonVariant } from "@golden-passport/ds-patternfly";

// #region BasicConfirm
export function BasicConfirm() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="danger" onClick={() => setOpen(true)}>
        Delete workflow
      </Button>
      <WarningModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => setOpen(false)}
        title="Delete workflow?"
        confirmButtonLabel="Delete"
        confirmButtonVariant={ButtonVariant.danger}
      >
        This permanently deletes the workflow and all of its run
        history. This cannot be undone.
      </WarningModal>
    </>
  );
}
// #endregion

// #region AcknowledgeCheckbox
export function AcknowledgeCheckbox() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="danger" onClick={() => setOpen(true)}>
        Wipe environment
      </Button>
      <WarningModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => setOpen(false)}
        title="Wipe environment?"
        withCheckbox
        checkboxLabel="I understand this destroys all data."
        confirmButtonLabel="Wipe"
        confirmButtonVariant={ButtonVariant.danger}
      >
        All deployments, data volumes, and secrets in this
        environment will be deleted.
      </WarningModal>
    </>
  );
}
// #endregion

// #region TypeToConfirm
export function TypeToConfirm() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="danger" onClick={() => setOpen(true)}>
        Delete account
      </Button>
      <WarningModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => setOpen(false)}
        title="Delete account?"
        confirmationText="DELETE"
        confirmationInputLabel="Type DELETE to confirm:"
        confirmButtonLabel="Delete account"
        confirmButtonVariant={ButtonVariant.danger}
      >
        Your account, all workspaces, and every artifact will be
        permanently destroyed. This cannot be undone.
      </WarningModal>
    </>
  );
}
// #endregion

export default function WarningModalExample() {
  return (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
      <BasicConfirm />
      <AcknowledgeCheckbox />
      <TypeToConfirm />
    </div>
  );
}
