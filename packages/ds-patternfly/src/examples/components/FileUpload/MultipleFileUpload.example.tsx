/**
 * MultipleFileUpload — a drop zone for many files at once with per-file
 * progress tracking.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useState } from "react";
import {
  MultipleFileUpload,
  MultipleFileUploadMain,
  MultipleFileUploadStatus,
  MultipleFileUploadStatusItem,
} from "../../_lib.js";
import { UploadIcon } from "@patternfly/react-icons";

// #region DropZoneWithStatus
export function DropZoneWithStatus() {
  const [, setFiles] = useState<File[]>([]);
  const [statusItems, setStatusItems] = useState<File[]>([]);

  return (
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
  );
}
// #endregion

export default function MultipleFileUploadExample() {
  return <DropZoneWithStatus />;
}
