import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  MultipleFileUpload,
  MultipleFileUploadMain,
  MultipleFileUploadStatus,
  MultipleFileUploadStatusItem,
} from "@patternfly/react-core";
import { UploadIcon } from "@patternfly/react-icons";
import { FoundationPage, Section, Card, CodeBlock } from "../../_storyKit.js";
import { DemoFrame, PropsTable } from "../../_demoKit.js";

const meta: Meta = {
  title: "Components/File upload/MultipleFileUpload",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => {
    const [files, setFiles] = useState<File[]>([]);
    const [statusItems, setStatusItems] = useState<File[]>([]);

    return (
      <FoundationPage
        title="MultipleFileUpload"
        intro={
          <>
            A drop zone for many files at once with per-file progress
            tracking. Use it for batch uploads — assets, document
            collections, log bundles. For single-file flows use FileUpload.
          </>
        }
      >
        <Section title="Drop zone with per-file status">
          <Card>
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <DemoFrame>
                <MultipleFileUpload
                  onFileDrop={(_, droppedFiles) => {
                    setFiles((prev) => [...prev, ...droppedFiles]);
                    setStatusItems((prev) => [...prev, ...droppedFiles]);
                  }}
                  dropzoneProps={{
                    accept: { "application/json": [".json"], "text/yaml": [".yaml", ".yml"] },
                  }}
                >
                  <MultipleFileUploadMain
                    titleIcon={<UploadIcon />}
                    titleText="Drag and drop files here"
                    titleTextSeparator="or"
                    infoText="Accepted file types: .json, .yaml"
                  />
                  {statusItems.length > 0 && (
                    <MultipleFileUploadStatus
                      statusToggleText={`${statusItems.length} file${statusItems.length === 1 ? "" : "s"} uploaded`}
                    >
                      {statusItems.map((file, i) => (
                        <MultipleFileUploadStatusItem
                          key={`${file.name}-${i}`}
                          file={file}
                          onClearClick={() => {
                            setFiles((prev) => prev.filter((_, j) => j !== i));
                            setStatusItems((prev) => prev.filter((_, j) => j !== i));
                          }}
                        />
                      ))}
                    </MultipleFileUploadStatus>
                  )}
                </MultipleFileUpload>
              </DemoFrame>
              <CodeBlock>{`<MultipleFileUpload
  onFileDrop={(_, files) => addFiles(files)}
  dropzoneProps={{ accept: { "image/*": [".png", ".jpg"] } }}
>
  <MultipleFileUploadMain
    titleIcon={<UploadIcon />}
    titleText="Drag and drop files here"
    titleTextSeparator="or"
    infoText="Accepted file types: .png, .jpg"
  />
  {items.length > 0 && (
    <MultipleFileUploadStatus statusToggleText={\`\${items.length} files uploaded\`}>
      {items.map((file) => (
        <MultipleFileUploadStatusItem
          key={file.name}
          file={file}
          onClearClick={() => removeFile(file)}
        />
      ))}
    </MultipleFileUploadStatus>
  )}
</MultipleFileUpload>`}</CodeBlock>
            </div>
          </Card>
        </Section>

        <Section title="Composition pieces">
          <Card>
            <div style={{ padding: 24 }}>
              <PropsTable
                rows={[
                  { name: "MultipleFileUpload", type: "container", description: "Outer dropzone wrapper. Owns onFileDrop and dropzoneProps." },
                  { name: "MultipleFileUploadMain", type: "child", description: "The empty-state UI shown above the file list — icon, title, info text." },
                  { name: "MultipleFileUploadStatus", type: "child", description: "Collapsible header summarizing the file list. Render only when items exist." },
                  { name: "MultipleFileUploadStatusItem", type: "child", description: "One row per file. Tracks read progress automatically; pass customFileHandler for backend upload progress." },
                ]}
              />
              <p style={{ marginTop: 16, marginBottom: 0, color: "var(--gp-color-text-subtle)", fontSize: 14 }}>
                <strong>Key props on MultipleFileUpload</strong>:{" "}
                <code>onFileDrop(event, files: File[])</code>,{" "}
                <code>dropzoneProps</code> (react-dropzone options including <code>accept</code> and <code>maxSize</code>),{" "}
                <code>isHorizontal</code> (lays the title row inline rather than centered).
              </p>
            </div>
          </Card>
        </Section>

        <Section title="Accessibility">
          <Card>
            <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
              <li><strong>Drag-and-drop alone is not enough.</strong> MultipleFileUploadMain renders a browse button — keep it; never hide it.</li>
              <li><strong>Each file row needs a clear action.</strong> The X to remove a file should have an aria-label including the filename (&quot;Remove report.pdf&quot;), not just &quot;Remove&quot;.</li>
              <li><strong>Surface upload failures.</strong> If a file fails server-side validation, mark its status item with the error and announce via a live region — silent failures leave AT users uncertain.</li>
            </ul>
          </Card>
        </Section>

      </FoundationPage>
    );
  },
};
