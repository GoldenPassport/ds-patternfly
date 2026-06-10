/**
 * Alert — inline status messages for user actions and system events.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { Fragment, useState } from "react";
import {
  Alert,
  AlertActionCloseButton,
  AlertActionLink,
  AlertGroup,
  Button,
} from "../_lib.js";
import { BellIcon } from "@patternfly/react-icons";

// #region Variants
export function Variants() {
  return (
    <div style={{ display: "grid", gap: 8 }}>
      <Alert variant="info" title="Info alert title" ouiaId="InfoAlert" />
      <Alert variant="success" title="Success alert title" ouiaId="SuccessAlert" />
      <Alert variant="warning" title="Warning alert title" ouiaId="WarningAlert" />
      <Alert variant="danger" title="Danger alert title" ouiaId="DangerAlert" />
      <Alert title="Custom alert title (no severity)" ouiaId="CustomAlert" />
    </div>
  );
}
// #endregion

// #region WithActions
export function WithActions() {
  return (
    <div style={{ display: "grid", gap: 8 }}>
      <Alert
        variant="success"
        title="Deployment succeeded"
        actionLinks={
          <Fragment>
            <AlertActionLink component="a" href="#">View logs</AlertActionLink>
            <AlertActionLink onClick={() => {}}>Dismiss</AlertActionLink>
          </Fragment>
        }
      >
        <p>
          The release went out to all regions in 2m 14s. Pods are
          reporting healthy.
        </p>
      </Alert>
      <Alert
        variant="danger"
        title="Pipeline failed"
        actionClose={<AlertActionCloseButton onClose={() => {}} />}
      >
        <p>
          Step <code>build:image</code> exited with code 1. See the
          run output for details.
        </p>
      </Alert>
    </div>
  );
}
// #endregion

// #region Inline
export function Inline() {
  return (
    <div style={{ display: "grid", gap: 8 }}>
      <Alert variant="info" isInline title="Inline info alert" />
      <Alert variant="success" isInline title="Inline success alert" />
      <Alert variant="warning" isInline title="Inline warning alert" />
      <Alert variant="danger" isInline title="Inline danger alert" />
    </div>
  );
}
// #endregion

// #region Expandable
export function Expandable() {
  return (
    <Alert
      isExpandable
      variant="warning"
      title="3 fields need attention before publishing"
      actionClose={<AlertActionCloseButton onClose={() => {}} />}
    >
      <ul style={{ margin: 0, paddingInlineStart: 20 }}>
        <li>Description is shorter than 20 characters.</li>
        <li>Cover image is missing.</li>
        <li>Locale is not set.</li>
      </ul>
    </Alert>
  );
}
// #endregion

// #region CustomIcon
export function CustomIcon() {
  return (
    <Alert
      variant="custom"
      customIcon={<BellIcon />}
      title="What's new in v2.4"
    >
      <p>
        Workflow steps now support timed retries with exponential
        back-off. <a href="#">Read the changelog.</a>
      </p>
    </Alert>
  );
}
// #endregion

// #region ToastGroup
export function ToastGroup() {
  const [toasts, setToasts] = useState<
    Array<{ key: number; variant: "success" | "danger" | "info"; title: string }>
  >([]);
  const addToast = (variant: "success" | "danger" | "info", title: string) =>
    setToasts((t) => [{ key: Date.now(), variant, title }, ...t]);
  const removeToast = (key: number) =>
    setToasts((t) => t.filter((a) => a.key !== key));

  return (
    <>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <Button variant="secondary" onClick={() => addToast("success", "Saved")}>
          Add success toast
        </Button>
        <Button variant="secondary" onClick={() => addToast("danger", "Save failed")}>
          Add danger toast
        </Button>
        <Button variant="secondary" onClick={() => addToast("info", "Background sync queued")}>
          Add info toast
        </Button>
      </div>
      <AlertGroup hasAnimations isToast isLiveRegion>
        {toasts.map((t) => (
          <Alert
            key={t.key}
            variant={t.variant}
            title={t.title}
            timeout={6000}
            onTimeout={() => removeToast(t.key)}
            actionClose={
              <AlertActionCloseButton
                title={t.title}
                variantLabel={`${t.variant} alert`}
                onClose={() => removeToast(t.key)}
              />
            }
          />
        ))}
      </AlertGroup>
    </>
  );
}
// #endregion

export default function AlertExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <Variants />
      <WithActions />
      <Inline />
      <Expandable />
      <CustomIcon />
      <ToastGroup />
    </div>
  );
}
