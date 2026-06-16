/**
 * ClipboardCopy — single-line input with a copy button.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { ClipboardCopy, ClipboardCopyVariant } from "@golden-passport/ds-patternfly";

// #region DefaultEditable
export function DefaultEditable() {
  return (
    <ClipboardCopy
      copyAriaLabel="Copy connection string"
      hoverTip="Copy"
      clickTip="Copied"
    >
      postgres://user@host:5432/db
    </ClipboardCopy>
  );
}
// #endregion

// #region ReadOnly
export function ReadOnly() {
  return (
    <ClipboardCopy
      isReadOnly
      copyAriaLabel="Copy API token"
      hoverTip="Copy"
      clickTip="Copied"
    >
      sk_live_4eC39HqLyjWDarjtT1zdp7dc
    </ClipboardCopy>
  );
}
// #endregion

// #region Expanded
export function Expanded() {
  return (
    <ClipboardCopy
      toggleAriaLabel="Show / hide full value"
      copyAriaLabel="Copy full value"
      hoverTip="Copy"
      clickTip="Copied"
      variant={ClipboardCopyVariant.expansion}
    >
      {`{ "name": "onboarding-flow", "trigger": "0 * * * *", "steps": ["validate", "notify"], "retries": { "max": 3, "backoff": "exponential" } }`}
    </ClipboardCopy>
  );
}
// #endregion

// #region InlineCompact
export function InlineCompact() {
  return (
    /* PF6 v6 ClipboardCopy[variant="inline-compact"] still renders a <div>
       internally, so it can't be a descendant of <p>. Use
       <span style="display:block"> as the line wrapper to get the same
       visual layout with valid HTML nesting. */
    <div style={{ display: "grid", gap: 12, color: "var(--gp-color-text-regular)" }}>
      <span style={{ display: "block" }}>
        Install with{" "}
        <ClipboardCopy
          copyAriaLabel="Copy install command"
          hoverTip="Copy"
          clickTip="Copied"
          variant="inline-compact"
        >
          pnpm add @golden-passport/ds-patternfly
        </ClipboardCopy>
        {" "}from the package registry.
      </span>
      <span style={{ display: "block" }}>
        Reference id:{" "}
        <ClipboardCopy
          copyAriaLabel="Copy reference id"
          hoverTip="Copy"
          clickTip="Copied"
          variant="inline-compact"
        >
          01HX3KZ8M3W6GQ5R2Y4N7T9P0J
        </ClipboardCopy>
      </span>
    </div>
  );
}
// #endregion

export default function ClipboardCopyExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <DefaultEditable />
      <ReadOnly />
      <Expanded />
      <InlineCompact />
    </div>
  );
}
