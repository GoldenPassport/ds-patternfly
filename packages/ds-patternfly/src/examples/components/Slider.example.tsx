/**
 * Slider — a bounded numeric input where position communicates the value.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useState } from "react";
import { Slider } from "../_lib.js";

// #region Basic
export function Basic() {
  const [value, setValue] = useState(40);

  return (
    <Slider
      label="Opacity"
      value={value}
      min={0}
      max={100}
      onChange={(_, v) => setValue(v)}
    />
  );
}
// #endregion

// #region WithPairedInput
export function WithPairedInput() {
  const [value, setValue] = useState(50);

  return (
    <Slider
      label="Threshold"
      value={value}
      min={0}
      max={100}
      isInputVisible
      inputValue={value}
      inputLabel="%"
      inputPosition="end"
      inputAriaLabel="Threshold value"
      onChange={(_, v, inputValue) => setValue(inputValue ?? v)}
    />
  );
}
// #endregion

// #region SnapToStep
export function SnapToStep() {
  const [value, setValue] = useState(50);

  return (
    <Slider
      label="Progress"
      value={value}
      min={0}
      max={100}
      step={25}
      showTicks
      onChange={(_, v) => setValue(v)}
    />
  );
}
// #endregion

// #region CustomSteps
export function CustomSteps() {
  const [value, setValue] = useState(50);

  return (
    <Slider
      label="Intensity"
      value={value}
      customSteps={[
        { value: 0, label: "Off" },
        { value: 25, label: "Low" },
        { value: 50, label: "Medium" },
        { value: 75, label: "High" },
        { value: 100, label: "Max" },
      ]}
      onChange={(_, v) => setValue(v)}
    />
  );
}
// #endregion

export default function SliderExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <Basic />
      <WithPairedInput />
      <SnapToStep />
      <CustomSteps />
    </div>
  );
}
