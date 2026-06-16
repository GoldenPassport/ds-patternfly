/**
 * Popover — a click-triggered floating panel anchored to a control, for
 * contextual help, definitions, and rich interactive content.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useState } from "react";
import { Button, Popover } from "@golden-passport/ds-patternfly";

// #region Basic
export function Basic() {
  return (
    <Popover
      aria-label="Process instances popover"
      headerContent={<div>Process instances</div>}
      bodyContent={
        <div>
          A process instance is one execution of a process
          definition. It has its own variables, state, and
          history.
        </div>
      }
      footerContent="Last updated 2 min ago"
      appendTo={() => document.body}
    >
      <Button variant="secondary" ouiaId="ToggleBasicPopover">
        Toggle popover
      </Button>
    </Popover>
  );
}
// #endregion

// #region PositionVariants
export function PositionVariants() {
  return (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
      {(["top", "right", "bottom", "left"] as const).map((p) => (
        <Popover
          key={p}
          position={p}
          aria-label={`${p} popover`}
          headerContent={<div>{p}</div>}
          bodyContent={<div>Anchored {p}.</div>}
          appendTo={() => document.body}
        >
          <Button variant="secondary">{p}</Button>
        </Popover>
      ))}
    </div>
  );
}
// #endregion

// #region AlertSeverity
export function AlertSeverity() {
  return (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
      {(["info", "success", "warning", "danger"] as const).map((sev) => (
        <Popover
          key={sev}
          aria-label={`${sev} popover`}
          alertSeverityVariant={sev}
          headerContent={`${sev[0]?.toUpperCase()}${sev.slice(1)} title`}
          bodyContent={<div>Severity-tinted header.</div>}
          appendTo={() => document.body}
        >
          <Button variant="secondary">{sev}</Button>
        </Popover>
      ))}
    </div>
  );
}
// #endregion

// #region HoverTrigger
export function HoverTrigger() {
  return (
    <Popover
      triggerAction="hover"
      aria-label="Hover popover"
      headerContent={<div>Hover popover</div>}
      bodyContent={<div>This popover opens on hover.</div>}
      appendTo={() => document.body}
    >
      <Button variant="secondary">Hover me</Button>
    </Popover>
  );
}
// #endregion

// #region Controlled
export function Controlled() {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <Popover
      aria-label="Controlled popover"
      isVisible={isVisible}
      shouldOpen={() => setIsVisible(true)}
      shouldClose={() => setIsVisible(false)}
      headerContent={<div>Controlled popover</div>}
      bodyContent={
        <div style={{ display: "grid", gap: 8 }}>
          <div>You can close this popover from inside.</div>
          <Button
            variant="secondary"
            onClick={() => setIsVisible(false)}
          >
            Close popover
          </Button>
        </div>
      }
      appendTo={() => document.body}
    >
      <Button variant="secondary">Toggle popover</Button>
    </Popover>
  );
}
// #endregion

// #region AutoWidthBare
export function AutoWidthBare() {
  return (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
      <Popover
        aria-label="Auto-width popover"
        hasAutoWidth
        bodyContent={
          <div>Width sizes to its contents instead of a fixed width.</div>
        }
        appendTo={() => document.body}
      >
        <Button variant="secondary">Auto width</Button>
      </Popover>
      <Popover
        aria-label="Bare popover"
        className="gp-popover-secondary"
        hasNoPadding
        showClose={false}
        withFocusTrap={false}
        bodyContent={
          <div style={{ padding: 12 }}>
            Bare popover — content owns its spacing. The caret matches
            the body via the gp-popover-secondary class.
          </div>
        }
        appendTo={() => document.body}
      >
        <Button variant="secondary">Bare body</Button>
      </Popover>
    </div>
  );
}
// #endregion

export default function PopoverExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <Basic />
      <PositionVariants />
      <AlertSeverity />
      <HoverTrigger />
      <Controlled />
      <AutoWidthBare />
    </div>
  );
}
