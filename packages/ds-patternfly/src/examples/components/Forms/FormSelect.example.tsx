/**
 * FormSelect — a native HTML <select> with PatternFly styling.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useId, useState } from "react";
import { FormGroup, FormSelect, FormSelectOption } from "@golden-passport/ds-patternfly";

const REGIONS: { value: string; label: string; isPlaceholder?: boolean }[] = [
  { value: "", label: "Select a region", isPlaceholder: true },
  { value: "us-east-1", label: "US East (N. Virginia)" },
  { value: "us-west-2", label: "US West (Oregon)" },
  { value: "eu-west-1", label: "EU (Ireland)" },
  { value: "ap-southeast-2", label: "Asia Pacific (Sydney)" },
];

// #region Basic
export function Basic() {
  // Element id derives from useId() so multiple instances can coexist.
  const id = useId();
  const [region, setRegion] = useState("");

  return (
    <FormGroup label="Region" fieldId={`${id}-region`} isRequired>
      <FormSelect
        id={`${id}-region`}
        value={region}
        onChange={(_, v) => setRegion(v)}
        aria-label="Region"
      >
        {REGIONS.map((r) => {
          const opt: {
            value: string;
            label: string;
            isPlaceholder?: boolean;
          } = { value: r.value, label: r.label };
          if (r.isPlaceholder) opt.isPlaceholder = true;
          return (
            <FormSelectOption
              key={r.value || "placeholder"}
              {...opt}
            />
          );
        })}
      </FormSelect>
    </FormGroup>
  );
}
// #endregion

export default function FormSelectExample() {
  return <Basic />;
}
