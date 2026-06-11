/**
 * ConfirmModal — a small controlled confirmation dialog: title, body, and a
 * confirm / cancel footer. Set `variant="danger"` for destructive actions.
 * You own `isOpen`; here a trigger button toggles it.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useState } from "react";
import { ConfirmModal, confirmModalEnLabels, Button } from "../_lib.js";

// #region Confirm
export function Confirm() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setOpen(true)}>
        Publish workflow
      </Button>
      <ConfirmModal
        labels={confirmModalEnLabels}
        isOpen={open}
        title="Publish workflow?"
        onConfirm={() => setOpen(false)}
        onCancel={() => setOpen(false)}
      >
        This makes the workflow live and visible to everyone in the project.
        You can unpublish it again at any time.
      </ConfirmModal>
    </>
  );
}
// #endregion

// #region DangerConfirm
export function DangerConfirm() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="danger" onClick={() => setOpen(true)}>
        Delete workflow
      </Button>
      <ConfirmModal
        labels={confirmModalEnLabels}
        isOpen={open}
        variant="danger"
        title="Delete workflow?"
        onConfirm={() => setOpen(false)}
        onCancel={() => setOpen(false)}
      >
        This permanently deletes the workflow and all of its run history. This
        action cannot be undone.
      </ConfirmModal>
    </>
  );
}
// #endregion

export default function ConfirmModalExample() {
  return (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
      <Confirm />
      <DangerConfirm />
    </div>
  );
}
