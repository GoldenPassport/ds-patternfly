import { useRef, useState } from "react";
import type { CSSProperties } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, FileUpload, FormGroup } from "@golden-passport/ds-patternfly";
import { UploadIcon } from "@patternfly/react-icons";
import { FoundationPage, Section, Card, CodeBlock } from "../../_kit/StoryKit.js";
import { DemoFrame, PropsTable } from "../../_kit/DemoKit.js";

const meta: Meta = {
  title: "Components/File upload/FileUpload",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => {
    const [filename, setFilename] = useState("");
    const [value, setValue] = useState<string | File>("");
    const [textValue, setTextValue] = useState("");

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

    return (
      <FoundationPage
        title="FileUpload"
        intro={
          <>
            A single-file upload control. Supports browse-to-select,
            drag-and-drop, and inline content editing for text-formatted
            files (YAML, JSON, scripts). Use it for one-at-a-time uploads;
            for bulk uploads use MultipleFileUpload.
          </>
        }
      >
        <Section title="Standard (binary or unknown)">
          <Card>
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <DemoFrame>
                <FormGroup label="Avatar" fieldId="avatar">
                  <FileUpload
                    id="avatar"
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
              </DemoFrame>
              <CodeBlock>{`<FileUpload
  id="avatar"
  value={file}
  filename={filename}
  onFileInputChange={(_, file) => {
    setFilename(file.name);
    setFile(file);
  }}
  onClearClick={() => {
    setFilename("");
    setFile("");
  }}
  browseButtonText="Browse..."
/>`}</CodeBlock>
            </div>
          </Card>
        </Section>

        <Section
          title="Custom CTA — primary, outline, or arbitrary"
          description="The standard FileUpload uses PF6's m-control button styling for Browse / Clear. When the file picker is the primary action of a region (hero upload, empty-state CTA), use the recipe below — a styled Button triggering a hidden file input. Pick any Button variant or roll your own."
        >
          <Card>
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <DemoFrame>
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
              </DemoFrame>
              <CodeBlock>{`// Pattern: visually-hidden <input type="file"> + a styled Button that
// triggers it via .click(). Pick any Button variant or roll your own
// styling — the underlying file picker is the same OS-native dialog.

const inputRef = useRef<HTMLInputElement>(null);
const [file, setFile] = useState<File | null>(null);

const visuallyHiddenInput: CSSProperties = {
  position: "absolute",
  width: 1, height: 1, padding: 0, margin: -1,
  overflow: "hidden", clip: "rect(0,0,0,0)",
  whiteSpace: "nowrap", border: 0,
};

<>
  <Button
    variant="primary"          // or "secondary" / "tertiary" / "link" / etc.
    icon={<UploadIcon />}
    onClick={() => inputRef.current?.click()}
  >
    Upload file
  </Button>
  <input
    ref={inputRef}
    type="file"
    style={visuallyHiddenInput}
    onChange={(e) => setFile(e.target.files?.[0] ?? null)}
    aria-label="Upload file"
  />
  {file ? <div>{file.name}</div> : null}
</>`}</CodeBlock>
              <p style={{ margin: 0, color: "var(--gp-color-text-subtle)", fontSize: 14 }}>
                <strong>When to use which:</strong>{" "}
                <strong>primary</strong> for the strongest CTA in a region
                (hero upload, empty-state action);{" "}
                <strong>secondary / outline</strong> for one-of-several
                actions in a row;{" "}
                <strong>link / custom</strong> for inline mentions
                ("Attach a file", "Add an avatar"). For drag-and-drop +
                inline preview + clear button, use the standard FileUpload
                above — this recipe is for the click-to-pick path only.
              </p>
            </div>
          </Card>
        </Section>

        <Section
          title="Editable text content"
          description="For YAML / JSON / scripts where users may want to paste-and-tweak."
        >
          <Card>
            <div style={{ padding: 24 }}>
              <DemoFrame>
                <FormGroup label="Pipeline definition" fieldId="pipeline">
                  <FileUpload
                    id="pipeline"
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
              </DemoFrame>
            </div>
          </Card>
        </Section>

        <Section title="Most-used props">
          <Card>
            <div style={{ padding: 24 }}>
              <PropsTable
                rows={[
                  { name: "id", type: "string", description: "Required." },
                  { name: "value", type: "string | File", description: "Controlled. File for binary, string for text mode." },
                  { name: "filename", type: "string", description: "Display name. Track separately from value so the file picker re-render preserves it." },
                  { name: "type", type: '"text" | "dataURL"', description: "When set, the file content is auto-read into value as text or data-URL." },
                  { name: "onFileInputChange", type: "(event, file: File) => void", description: "Fires when a file is selected (browse or drop)." },
                  { name: "onDataChange", type: "(event, data: string) => void", description: 'Fires after the file is read (when type="text" or "dataURL").' },
                  { name: "onTextChange", type: "(event, text: string) => void", description: "For type=\"text\" with allowEditingUploadedText — fires on inline edits." },
                  { name: "onClearClick", type: "(event) => void", description: "Reset filename and value here." },
                  { name: "allowEditingUploadedText", type: "boolean", description: 'For type="text" — show an editable textarea showing file contents.' },
                  { name: "browseButtonText / clearButtonText", type: "string", description: "i18n the action labels." },
                  { name: "dropzoneProps", type: "DropzoneOptions", description: "Pass-through to react-dropzone — accept patterns, max size, etc." },
                ]}
              />
            </div>
          </Card>
        </Section>

        <Section title="Accessibility">
          <Card>
            <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
              <li><strong>Localize button text.</strong> browseButtonText / clearButtonText are visible and AT-read.</li>
              <li><strong>Drag-and-drop is supplemental.</strong> The browse button must always be present and keyboard-operable — drag-and-drop alone fails for keyboard and motor-impaired users.</li>
              <li><strong>Validate file type and size up-front.</strong> Use <code>dropzoneProps.accept</code> and <code>dropzoneProps.maxSize</code> so rejection happens before upload starts. Surface failures via a helper text or alert, not silently.</li>
            </ul>
          </Card>
        </Section>

      </FoundationPage>
    );
  },
};
