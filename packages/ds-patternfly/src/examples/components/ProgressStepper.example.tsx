/**
 * ProgressStepper — a multi-step progress indicator with per-step status.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useId } from "react";
import { ProgressStep, ProgressStepper } from "@golden-passport/ds-patternfly";

// #region Basic
export function Basic() {
  const id = useId();
  return (
    <ProgressStepper aria-label="Onboarding progress">
      <ProgressStep
        variant="success"
        id={`${id}-step1`}
        titleId={`${id}-step1-title`}
        aria-label="Step 1, completed"
      >
        Account
      </ProgressStep>
      <ProgressStep
        variant="info"
        isCurrent
        id={`${id}-step2`}
        titleId={`${id}-step2-title`}
        aria-label="Step 2, current"
      >
        Profile
      </ProgressStep>
      <ProgressStep
        variant="pending"
        id={`${id}-step3`}
        titleId={`${id}-step3-title`}
        aria-label="Step 3, pending"
      >
        Workspace
      </ProgressStep>
    </ProgressStepper>
  );
}
// #endregion

// #region WithDescriptions
export function WithDescriptions() {
  const id = useId();
  return (
    <ProgressStepper aria-label="Deployment progress">
      <ProgressStep
        variant="success"
        description="Image pushed to registry"
        id={`${id}-step1`}
        titleId={`${id}-step1-title`}
        aria-label="Step 1, completed"
      >
        Build
      </ProgressStep>
      <ProgressStep
        variant="info"
        isCurrent
        description="Running smoke tests"
        id={`${id}-step2`}
        titleId={`${id}-step2-title`}
        aria-label="Step 2, current"
      >
        Test
      </ProgressStep>
      <ProgressStep
        variant="pending"
        description="Roll out to production"
        id={`${id}-step3`}
        titleId={`${id}-step3-title`}
        aria-label="Step 3, pending"
      >
        Deploy
      </ProgressStep>
    </ProgressStepper>
  );
}
// #endregion

// #region WithFailure
export function WithFailure() {
  const id = useId();
  return (
    <ProgressStepper aria-label="Pipeline with failure">
      <ProgressStep
        variant="success"
        id={`${id}-step1`}
        titleId={`${id}-step1-title`}
        aria-label="Step 1, completed"
      >
        Source
      </ProgressStep>
      <ProgressStep
        variant="success"
        id={`${id}-step2`}
        titleId={`${id}-step2-title`}
        aria-label="Step 2, completed"
      >
        Build
      </ProgressStep>
      <ProgressStep
        variant="danger"
        isCurrent
        description="exit code 1"
        id={`${id}-step3`}
        titleId={`${id}-step3-title`}
        aria-label="Step 3, failed"
      >
        Test
      </ProgressStep>
      <ProgressStep
        variant="pending"
        id={`${id}-step4`}
        titleId={`${id}-step4-title`}
        aria-label="Step 4, pending"
      >
        Deploy
      </ProgressStep>
    </ProgressStepper>
  );
}
// #endregion

// #region Vertical
export function Vertical() {
  const id = useId();
  return (
    <ProgressStepper aria-label="Vertical stepper" isVertical>
      <ProgressStep
        variant="success"
        id={`${id}-step1`}
        titleId={`${id}-step1-title`}
        aria-label="Step 1, completed"
      >
        First step
      </ProgressStep>
      <ProgressStep
        variant="info"
        isCurrent
        id={`${id}-step2`}
        titleId={`${id}-step2-title`}
        aria-label="Step 2, current"
      >
        Second step
      </ProgressStep>
      <ProgressStep
        variant="pending"
        id={`${id}-step3`}
        titleId={`${id}-step3-title`}
        aria-label="Step 3, pending"
      >
        Third step
      </ProgressStep>
    </ProgressStepper>
  );
}
// #endregion

// #region Compact
export function Compact() {
  const id = useId();
  return (
    <ProgressStepper isCompact aria-label="Compact stepper">
      <ProgressStep
        variant="success"
        id={`${id}-step1`}
        titleId={`${id}-step1-title`}
        aria-label="Step 1, completed"
      >
        First
      </ProgressStep>
      <ProgressStep
        variant="info"
        isCurrent
        id={`${id}-step2`}
        titleId={`${id}-step2-title`}
        aria-label="Step 2, current"
      >
        Second
      </ProgressStep>
      <ProgressStep
        variant="pending"
        id={`${id}-step3`}
        titleId={`${id}-step3-title`}
        aria-label="Step 3, pending"
      >
        Third
      </ProgressStep>
    </ProgressStepper>
  );
}
// #endregion

export default function ProgressStepperExample() {
  return (
    <div style={{ display: "grid", gap: 32 }}>
      <Basic />
      <WithDescriptions />
      <WithFailure />
      <Vertical />
      <Compact />
    </div>
  );
}
