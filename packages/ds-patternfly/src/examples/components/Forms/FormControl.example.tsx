/**
 * FormControl — authoring a custom input that inherits the DS field styling.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */

// #region CustomFormControl
export function CustomFormControl() {
  // The class belongs on a wrapper, not the <input> itself — PF6 paints the
  // input's border via ::before/::after pseudos on the wrapper. Putting the
  // class directly on a replaced element like <input> breaks pseudo-element
  // painting and leaves adjacent edges with mismatched border colours.
  return (
    <span className="pf-v6-c-form-control" style={{ width: 320 }}>
      <input
        type="email"
        placeholder="you@example.com"
        aria-label="Custom email input"
      />
    </span>
  );
}
// #endregion

export default function FormControlExample() {
  return <CustomFormControl />;
}
