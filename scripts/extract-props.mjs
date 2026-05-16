#!/usr/bin/env node
/**
 * Extract a PatternFly 6 component's prop interface from its .d.ts file and
 * print PropsTable rows ready to paste into a stories page. Pulls JSDoc
 * comments as descriptions when available.
 *
 * Usage:
 *   node scripts/extract-props.mjs <Name>
 *
 * Examples:
 *   node scripts/extract-props.mjs Button
 *   node scripts/extract-props.mjs Modal
 *   node scripts/extract-props.mjs TextInput
 *
 * Limits — this is a regex-based extractor, not a TS compiler:
 *   - Skips members of nested types (only top-level props).
 *   - Falls back to "TODO" for descriptions when there's no JSDoc.
 *   - Always sanity-check the output against the actual .d.ts.
 */
import { readFile, readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");

const name = process.argv[2];
if (!name) {
  console.error("Usage: extract-props <Name>");
  process.exit(1);
}

// Find the component dir under @patternfly/react-core/dist/esm/components/
// or .../layouts/ (some live there, e.g. Bullseye).
const candidates = [
  resolve(root, `node_modules/@patternfly/react-core/dist/esm/components/${name}`),
  resolve(root, `node_modules/@patternfly/react-core/dist/esm/layouts/${name}`),
];

let dir;
for (const c of candidates) {
  try {
    await readdir(c);
    dir = c;
    break;
  } catch {
    /* not here */
  }
}

if (!dir) {
  console.error(`✗ No component dir found for "${name}" under react-core/dist/esm/{components,layouts}/.`);
  console.error(`  Tried: ${candidates.join(", ")}`);
  process.exit(1);
}

// The .d.ts file is usually <Name>.d.ts inside the dir.
const dtsPath = join(dir, `${name}.d.ts`);
let src;
try {
  src = await readFile(dtsPath, "utf8");
} catch {
  console.error(`✗ No ${name}.d.ts in ${dir}`);
  process.exit(1);
}

// Find `export interface <Name>Props ... { ... }` and capture the body.
// Brace-balanced extraction — regex alone can't do nested braces, so we
// find the start and walk the string.
const startRe = new RegExp(`export\\s+interface\\s+${name}Props\\b[^{]*{`, "m");
const startMatch = src.match(startRe);
if (!startMatch) {
  console.error(`✗ Couldn't find "export interface ${name}Props" in ${dtsPath}`);
  process.exit(1);
}
const start = startMatch.index + startMatch[0].length;
let depth = 1;
let i = start;
while (i < src.length && depth > 0) {
  const ch = src[i];
  if (ch === "{") depth++;
  else if (ch === "}") depth--;
  i++;
}
const body = src.slice(start, i - 1);

// Walk the body line by line. A "prop" is a line matching `name?: type;` or
// `name: type;` at the top level (depth 0 inside the body). JSDoc is the
// preceding /** ... */ block.
const lines = body.split("\n");
const props = [];
let pendingDoc = null;
let bodyDepth = 0;

const docOpen = /^\s*\/\*\*/;
const docClose = /\*\//;
const docLineContent = /^\s*\*\s?(.*)$/;
const propRe = /^\s*(['"]?[a-zA-Z_$][\w$]*['"]?)\s*\??\s*:\s*(.+?);?\s*$/;

let collectingDoc = false;
let docBuffer = [];

for (const raw of lines) {
  const line = raw;

  if (collectingDoc) {
    if (docClose.test(line)) {
      collectingDoc = false;
      pendingDoc = docBuffer.join(" ").replace(/\s+/g, " ").trim();
      docBuffer = [];
    } else {
      const m = line.match(docLineContent);
      if (m) docBuffer.push(m[1]);
    }
    continue;
  }

  if (docOpen.test(line)) {
    collectingDoc = true;
    // Single-line /** ... */
    if (docClose.test(line)) {
      collectingDoc = false;
      pendingDoc = line
        .replace(/^\s*\/\*\*\s*/, "")
        .replace(/\s*\*\/\s*$/, "")
        .trim();
    }
    continue;
  }

  // Track brace depth so we ignore nested-type members.
  for (const ch of line) {
    if (ch === "{") bodyDepth++;
    else if (ch === "}") bodyDepth--;
  }

  if (bodyDepth !== 0) continue;

  const m = line.match(propRe);
  if (m) {
    const propName = m[1].replace(/^['"]|['"]$/g, "");
    let type = m[2].trim();
    // Collapse multi-line types (best-effort: stop at `;` already handled).
    type = type.replace(/\s+/g, " ");
    props.push({
      name: propName,
      type,
      description: pendingDoc ?? "TODO",
    });
    pendingDoc = null;
  }
}

if (props.length === 0) {
  console.error(`✗ Found 0 props in ${name}Props. Falling back may be needed.`);
  process.exit(1);
}

// Emit PropsTable rows source.
const escape = (s) => s.replace(/\\/g, "\\\\").replace(/"/g, '\\"');

console.log(`// ${props.length} props for ${name}, extracted from ${dtsPath.replace(root + "/", "")}`);
console.log(`<PropsTable`);
console.log(`  rows={[`);
for (const p of props) {
  const desc = escape(p.description);
  const type = escape(p.type);
  console.log(`    {`);
  console.log(`      name: "${p.name}",`);
  console.log(`      type: "${type}",`);
  console.log(`      description: "${desc}",`);
  console.log(`    },`);
}
console.log(`  ]}`);
console.log(`/>`);
console.log(``);
console.log(`// → ${props.length} rows. Trim to the most-used props before pasting.`);
