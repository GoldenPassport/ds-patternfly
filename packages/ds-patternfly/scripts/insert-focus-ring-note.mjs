#!/usr/bin/env node
/**
 * One-off: add the FocusRingNote helper into every form/input story page.
 *
 *   1. Adds `FocusRingNote` to the existing `_demoKit` import.
 *   2. Inserts a `<Section title="Focus ring">` block immediately before
 *      the closing `</FoundationPage>` tag.
 *
 * Idempotent — skips files that already have the section.
 */
import { readFile, writeFile } from "node:fs/promises";

const files = [
  "src/stories/components/Forms/Form.stories.tsx",
  "src/stories/components/Forms/FormControl.stories.tsx",
  "src/stories/components/Forms/Checkbox.stories.tsx",
  "src/stories/components/Forms/Radio.stories.tsx",
  "src/stories/components/Forms/TextInput.stories.tsx",
  "src/stories/components/Forms/TextArea.stories.tsx",
  "src/stories/components/Forms/FormSelect.stories.tsx",
  "src/stories/components/Switch.stories.tsx",
  "src/stories/components/Slider.stories.tsx",
  "src/stories/components/NumberInput.stories.tsx",
  "src/stories/components/SearchInput.stories.tsx",
  "src/stories/components/TextInputGroup.stories.tsx",
  "src/stories/components/DateAndTime/CalendarMonth.stories.tsx",
  "src/stories/components/DateAndTime/DatePicker.stories.tsx",
  "src/stories/components/DateAndTime/TimePicker.stories.tsx",
  "src/stories/components/DateAndTime/DateTimePicker.stories.tsx",
  "src/stories/components/FileUpload/FileUpload.stories.tsx",
  "src/stories/components/FileUpload/MultipleFileUpload.stories.tsx",
];

const SECTION_BLOCK = (indent) => `${indent}<Section
${indent}  title="Focus ring"
${indent}  description="System-wide control — the Focus ring toolbar above flips inputs, buttons, menus, and dropdowns together."
${indent}>
${indent}  <Card>
${indent}    <div style={{ padding: 24 }}>
${indent}      <FocusRingNote />
${indent}    </div>
${indent}  </Card>
${indent}</Section>

${indent}`;

let added = 0;
let skipped = 0;

for (const path of files) {
  const src = await readFile(path, "utf8");

  if (src.includes('title="Focus ring"')) {
    skipped++;
    continue;
  }

  // 1) Update the _demoKit import to include FocusRingNote.
  let next = src.replace(
    /from\s+["'](\.\.\/)+_demoKit\.js["']/,
    (match) => match,
  );
  next = next.replace(
    /(import\s*\{\s*)([^}]*?)(\s*\}\s*from\s+["'](?:\.\.\/)+_demoKit\.js["'])/,
    (_m, open, names, tail) => {
      const list = names
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      if (!list.includes("FocusRingNote")) list.push("FocusRingNote");
      return `${open}${list.join(", ")}${tail}`;
    },
  );

  // 2) Insert the section right before the closing </FoundationPage>.
  // Find the indent of that line so the insert sits at the same column.
  const closeMatch = next.match(/(^|\n)([ \t]*)<\/FoundationPage>/);
  if (!closeMatch) {
    console.error(`✗ ${path} — couldn't find </FoundationPage>; skipping`);
    continue;
  }
  const indent = closeMatch[2];
  next = next.replace(
    /([ \t]*)<\/FoundationPage>/,
    (_m, ind) => `${SECTION_BLOCK(ind)}</FoundationPage>`,
  );

  await writeFile(path, next);
  console.log(`✓ ${path}`);
  added++;
}

console.log(``);
console.log(`Added: ${added}, Skipped (already had it): ${skipped}`);
