import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  FoundationPage,
  Section,
  Card,
  ConfigurationSection,
  Example,
} from "../../_kit/StoryKit.js";
import {
  Standard,
  CustomCTA,
  EditableTextContent,
} from "../../../examples/components/FileUpload/FileUpload.example.js";
import fileUploadExampleSrc from "../../../examples/components/FileUpload/FileUpload.example.tsx?raw";
import fileUploadComponentSrc from "../../../components/base/FileUpload.tsx?raw";

const meta: Meta = {
  title: "Components/File upload/FileUpload",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
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
          <Example
            source={fileUploadExampleSrc}
            region="Standard"
            fileName="FileUpload.example.tsx"
          >
            <Standard />
          </Example>
        </Card>
      </Section>

      <Section
        title="Custom CTA — primary, outline, or arbitrary"
        description="The standard FileUpload uses PF6's m-control button styling for Browse / Clear. When the file picker is the primary action of a region (hero upload, empty-state CTA), use the recipe below — a styled Button triggering a hidden file input. Pick any Button variant or roll your own."
      >
        <Card>
          <Example
            source={fileUploadExampleSrc}
            region="CustomCTA"
            fileName="FileUpload.example.tsx"
          >
            <CustomCTA />
          </Example>
          <p style={{ margin: "0 16px 16px", color: "var(--gp-color-text-subtle)", fontSize: 14 }}>
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
        </Card>
      </Section>

      <Section
        title="Editable text content"
        description="For YAML / JSON / scripts where users may want to paste-and-tweak."
      >
        <Card>
          <Example
            source={fileUploadExampleSrc}
            region="EditableTextContent"
            fileName="FileUpload.example.tsx"
          >
            <EditableTextContent />
          </Example>
        </Card>
      </Section>

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example
            source={fileUploadExampleSrc}
            fileName="FileUpload.example.tsx"
          />
        </Card>
      </Section>

      <ConfigurationSection
        importStatement={'import { FileUpload } from "@golden-passport/ds-patternfly";'}
        componentSource={fileUploadComponentSrc}
        componentFileName="FileUpload.tsx"
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
  ),
};
