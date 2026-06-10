/**
 * FileUpload — a single-file upload control with browse-to-select,
 * drag-and-drop, and inline content editing for text-formatted files.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useId, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { Button, FileUpload, FormGroup } from "../../_lib.js";
import { UploadIcon } from "@patternfly/react-icons";

// Element ids derive from useId() so any number of instances can coexist
// on one page without duplicate-id clashes.

// Visually-hidden style for the underlying file input — keeps it in
// the accessibility tree (so the trigger button properly opens the
// OS file picker via .click()) without rendering visually.
const visuallyHiddenInput: CSSProperties = {
  position: "absolute",
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0,0,0,0)",
  whiteSpace: "nowrap",
  border: 0,
};

// #region Standard
export function Standard() {
  const id = useId();
  const [filename, setFilename] = useState("");
  const [value, setValue] = useState<string | File>("");

  return (
    <FormGroup label="Avatar" fieldId={id}>
      <FileUpload
        id={id}
        value={value}
        filename={filename}
        onFileInputChange={(_, file) => {
          setFilename(file.name);
          setValue(file);
        }}
        onClearClick={() => {
          setFilename("");
          setValue("");
        }}
        browseButtonText="Browse..."
        clearButtonText="Clear"
        filenamePlaceholder="Drag a file here or browse"
      />
    </FormGroup>
  );
}
// #endregion

// #region CustomCTA
export function CustomCTA() {
  // Custom CTA pattern: a button that triggers a hidden file input.
  // Lets the consumer choose any Button variant (primary, secondary,
  // tertiary, danger, custom-styled) instead of being stuck with PF6's
  // m-control variant inside the standard FileUpload.
  const [primaryFile, setPrimaryFile] = useState<File | null>(null);
  const [secondaryFile, setSecondaryFile] = useState<File | null>(null);
  const [customFile, setCustomFile] = useState<File | null>(null);
  const primaryRef = useRef<HTMLInputElement>(null);
  const secondaryRef = useRef<HTMLInputElement>(null);
  const customRef = useRef<HTMLInputElement>(null);

  return (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
      {/* Primary — for the strongest CTA in a region. */}
      <div>
        <Button
          variant="primary"
          icon={<UploadIcon />}
          onClick={() => primaryRef.current?.click()}
        >
          Upload file
        </Button>
        <input
          ref={primaryRef}
          type="file"
          style={visuallyHiddenInput}
          onChange={(e) => {
            const f = e.target.files?.[0] ?? null;
            setPrimaryFile(f);
          }}
          aria-label="Upload file (primary)"
        />
        {primaryFile ? (
          <div style={{ marginTop: 8, fontSize: 14, color: "var(--gp-color-text-subtle)" }}>
            {primaryFile.name}
          </div>
        ) : null}
      </div>

      {/* Secondary / outline — for "one of several actions" rows. */}
      <div>
        <Button
          variant="secondary"
          icon={<UploadIcon />}
          onClick={() => secondaryRef.current?.click()}
        >
          Choose file
        </Button>
        <input
          ref={secondaryRef}
          type="file"
          style={visuallyHiddenInput}
          onChange={(e) => {
            const f = e.target.files?.[0] ?? null;
            setSecondaryFile(f);
          }}
          aria-label="Choose file (secondary)"
        />
        {secondaryFile ? (
          <div style={{ marginTop: 8, fontSize: 14, color: "var(--gp-color-text-subtle)" }}>
            {secondaryFile.name}
          </div>
        ) : null}
      </div>

      {/* Custom — any Button variant or arbitrary styling. */}
      <div>
        <Button
          variant="link"
          icon={<UploadIcon />}
          onClick={() => customRef.current?.click()}
        >
          Attach a file
        </Button>
        <input
          ref={customRef}
          type="file"
          style={visuallyHiddenInput}
          onChange={(e) => {
            const f = e.target.files?.[0] ?? null;
            setCustomFile(f);
          }}
          aria-label="Attach a file (link)"
        />
        {customFile ? (
          <div style={{ marginTop: 8, fontSize: 14, color: "var(--gp-color-text-subtle)" }}>
            {customFile.name}
          </div>
        ) : null}
      </div>
    </div>
  );
}
// #endregion

// #region EditableTextContent
export function EditableTextContent() {
  const id = useId();
  const [filename, setFilename] = useState("");
  const [textValue, setTextValue] = useState("");

  return (
    <FormGroup label="Pipeline definition" fieldId={id}>
      <FileUpload
        id={id}
        type="text"
        value={textValue}
        filename={filename}
        onFileInputChange={(_, file) => setFilename(file.name)}
        onDataChange={(_, data) => setTextValue(data)}
        onTextChange={(_, text) => setTextValue(text)}
        onClearClick={() => {
          setTextValue("");
          setFilename("");
        }}
        browseButtonText="Upload"
        allowEditingUploadedText
      />
    </FormGroup>
  );
}
// #endregion

export default function FileUploadExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <Standard />
      <CustomCTA />
      <EditableTextContent />
    </div>
  );
}
