import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  FoundationPage,
  Section,
  Card,
  ConfigurationSection,
  Example,
} from "../../_kit/StoryKit.js";
import { DropZoneWithStatus } from "../../../examples/components/FileUpload/MultipleFileUpload.example.js";
import multipleFileUploadExampleSrc from "../../../examples/components/FileUpload/MultipleFileUpload.example.tsx?raw";
import multipleFileUploadComponentSrc from "../../../components/MultipleFileUpload.tsx?raw";

const meta: Meta = {
  title: "Components/File upload/MultipleFileUpload",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
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
          <Example
            source={multipleFileUploadExampleSrc}
            region="DropZoneWithStatus"
            fileName="MultipleFileUpload.example.tsx"
          >
            <DropZoneWithStatus />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example
            source={multipleFileUploadExampleSrc}
            fileName="MultipleFileUpload.example.tsx"
          />
        </Card>
      </Section>

      <ConfigurationSection
        importStatement={'import { MultipleFileUpload, MultipleFileUploadMain, MultipleFileUploadStatus, MultipleFileUploadStatusItem } from "@golden-passport/ds-patternfly";'}
        componentSource={multipleFileUploadComponentSrc}
        componentFileName="MultipleFileUpload.tsx"
        description="How to import the composition pieces and what each one does."
        rows={[
          { name: "MultipleFileUpload", type: "container", description: "Outer dropzone wrapper. Owns onFileDrop and dropzoneProps." },
          { name: "MultipleFileUploadMain", type: "child", description: "The empty-state UI shown above the file list — icon, title, info text." },
          { name: "MultipleFileUploadStatus", type: "child", description: "Collapsible header summarizing the file list. Render only when items exist." },
          { name: "MultipleFileUploadStatusItem", type: "child", description: "One row per file. Tracks read progress automatically; pass customFileHandler for backend upload progress." },
        ]}
      />

      <Section title="Key props on MultipleFileUpload">
        <Card>
          <p style={{ margin: 0, padding: 24, color: "var(--gp-color-text-subtle)", fontSize: 14 }}>
            <strong>Key props on MultipleFileUpload</strong>:{" "}
            <code>onFileDrop(event, files: File[])</code>,{" "}
            <code>dropzoneProps</code> (react-dropzone options including <code>accept</code> and <code>maxSize</code>),{" "}
            <code>isHorizontal</code> (lays the title row inline rather than centered).
          </p>
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
  ),
};
