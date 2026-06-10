/**
 * Backdrop — a semi-transparent overlay that dims the page behind a focused surface.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useState } from "react";
import { Backdrop, Bullseye, Button, Spinner } from "../_lib.js";

// #region CustomBlockingOverlay
export function CustomBlockingOverlay() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Show overlay</Button>
      {open && (
        <Backdrop>
          <Bullseye>
            <div
              style={{
                background: "var(--gp-color-bg-elevated)",
                padding: 24,
                borderRadius: "var(--gp-radius-md)",
                display: "grid",
                gap: 12,
                justifyItems: "center",
                color: "var(--gp-color-text-regular)",
              }}
            >
              <Spinner aria-label="Loading" />
              <span>Loading workspace…</span>
              <Button variant="link" onClick={() => setOpen(false)}>
                Cancel
              </Button>
            </div>
          </Bullseye>
        </Backdrop>
      )}
    </>
  );
}
// #endregion

export default function BackdropExample() {
  return <CustomBlockingOverlay />;
}
