/**
 * LoadingOverlay — a semi-transparent overlay that dims the page behind a
 * centered spinner card, blocking interaction until an operation finishes. The
 * exported LoadingOverlay lego block owns the Backdrop + centered card
 * assembly; you toggle `isOpen` and optionally supply a message / onCancel.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useState } from "react";
import { Button, LoadingOverlay } from "@golden-passport/ds-patternfly";

// #region CustomBlockingOverlay
export function CustomBlockingOverlay() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Show overlay</Button>
      <LoadingOverlay
        isOpen={open}
        message="Loading workspace…"
        onCancel={() => setOpen(false)}
      />
    </>
  );
}
// #endregion

export default function BackdropExample() {
  return <CustomBlockingOverlay />;
}
