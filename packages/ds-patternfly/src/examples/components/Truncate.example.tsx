/**
 * Truncate — a long-string truncator with auto-tooltip.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { Truncate, TruncatePosition } from "@golden-passport/ds-patternfly";

const longString =
  "redhat_logo_black_and_white_reversed_simple_with_fedora_container.zip";

// #region Default
export function Default() {
  return (
    <div style={{ width: 280, color: "var(--gp-color-text-regular)" }}>
      <Truncate content={longString} />
    </div>
  );
}
// #endregion

// #region Middle
export function Middle() {
  return (
    <div style={{ width: 280, color: "var(--gp-color-text-regular)" }}>
      <Truncate
        content={longString}
        position={TruncatePosition.middle}
        trailingNumChars={10}
      />
    </div>
  );
}
// #endregion

// #region Start
export function Start() {
  return (
    <div style={{ width: 280, color: "var(--gp-color-text-regular)" }}>
      <Truncate
        content="/var/log/acme/workflow/run-12834/step-validate-input.log"
        position={TruncatePosition.start}
      />
    </div>
  );
}
// #endregion

// #region MaxCharacters
export function MaxCharacters() {
  return (
    <div style={{ display: "grid", gap: 8, color: "var(--gp-color-text-regular)" }}>
      <div>
        End: <Truncate maxCharsDisplayed={15} content={longString} />
      </div>
      <div>
        Middle: <Truncate maxCharsDisplayed={15} position={TruncatePosition.middle} content={longString} />
      </div>
      <div>
        Start: <Truncate maxCharsDisplayed={15} position={TruncatePosition.start} content={longString} />
      </div>
    </div>
  );
}
// #endregion

// #region CustomTooltipPosition
export function CustomTooltipPosition() {
  return (
    <div style={{ width: 280, color: "var(--gp-color-text-regular)" }}>
      <Truncate content={longString} tooltipPosition="right" />
    </div>
  );
}
// #endregion

export default function TruncateExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <Default />
      <Middle />
      <Start />
      <MaxCharacters />
      <CustomTooltipPosition />
    </div>
  );
}
