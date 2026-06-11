/**
 * MenuToggle — the trigger element for menus, used by Dropdown / Select
 * and custom menu patterns: variants, sizes, split-button shapes.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useId } from "react";
import { MenuToggle, MenuToggleAction, MenuToggleCheckbox } from "../_lib.js";
import { CogIcon, EllipsisVIcon } from "@patternfly/react-icons";

// #region Variants
export function Variants() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
      <MenuToggle>Default</MenuToggle>
      <MenuToggle variant="primary">Primary</MenuToggle>
      <MenuToggle variant="secondary">Secondary</MenuToggle>
      <MenuToggle variant="plain" aria-label="Kebab" icon={<EllipsisVIcon />} />
    </div>
  );
}
// #endregion

// #region States
export function States() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
      <MenuToggle>Idle</MenuToggle>
      <MenuToggle isExpanded>Expanded</MenuToggle>
      <MenuToggle isDisabled>Disabled</MenuToggle>
    </div>
  );
}
// #endregion

// #region SizesAndFullWidth
export function SizesAndFullWidth() {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <MenuToggle size="sm">Small</MenuToggle>
        <MenuToggle>Default</MenuToggle>
      </div>
      <MenuToggle isFullWidth>Full width</MenuToggle>
    </div>
  );
}
// #endregion

// #region WithIcon
export function WithIcon() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      <MenuToggle icon={<CogIcon />}>Settings</MenuToggle>
      <MenuToggle variant="plain" aria-label="Settings" icon={<CogIcon />} />
    </div>
  );
}
// #endregion

// #region SplitButtonAction
export function SplitButtonAction() {
  const id = useId();

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      <MenuToggle
        splitButtonItems={[
          <MenuToggleAction id={`${id}-action-default`} key="action" aria-label="Run">
            Run
          </MenuToggleAction>,
        ]}
        aria-label="Run with options"
      />
      <MenuToggle
        variant="primary"
        splitButtonItems={[
          <MenuToggleAction id={`${id}-action-primary`} key="action" aria-label="Deploy">
            Deploy
          </MenuToggleAction>,
        ]}
        aria-label="Deploy with options"
      />
    </div>
  );
}
// #endregion

// #region SplitButtonCheckbox
export function SplitButtonCheckbox() {
  const id = useId();

  return (
    <MenuToggle
      splitButtonItems={[
        <MenuToggleCheckbox
          id={`${id}-checkbox`}
          key="split-checkbox"
          aria-label="Select all"
        />,
      ]}
      aria-label="Selection menu"
    />
  );
}
// #endregion

export default function MenuToggleExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <Variants />
      <States />
      <SizesAndFullWidth />
      <WithIcon />
      <SplitButtonAction />
      <SplitButtonCheckbox />
    </div>
  );
}
