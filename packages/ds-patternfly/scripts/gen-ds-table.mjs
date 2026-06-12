#!/usr/bin/env node
/**
 * Generate the "DS lego block" catalog table in the READMEs from the
 * components/ds/ source files. Each component's row = its name, category,
 * the first sentence of its leading JSDoc, and the import. Injected between
 *   <!-- ds-components:start --> … <!-- ds-components:end -->
 * markers in packages/ds-patternfly/README.md and the repo-root README.md.
 *
 * Run via `pnpm gen` (alongside the CSS + props build). Regex over source —
 * no AST dependency, matching the repo's other generators.
 */
import { readFileSync, readdirSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const LIB_ROOT = resolve(here, "..");
const REPO_ROOT = resolve(LIB_ROOT, "..", "..");
const DS_DIR = join(LIB_ROOT, "src", "components", "ds");
const PKG_NAME = JSON.parse(
  readFileSync(join(LIB_ROOT, "package.json"), "utf8"),
).name;

// Component → category. Components not listed are skipped (helpers like
// validation.ts / labels.ts aren't .tsx so never appear here anyway).
const CATEGORY = {
  Shell: "Layouts",
  PrimaryDetailLayout: "Layouts",
  DashboardShell: "Layouts",
  CompassShell: "Layouts",
  PageHeader: "Navigation",
  AppHeader: "Navigation",
  AppFooter: "Navigation",
  Hyperlink: "Navigation",
  TabbedView: "Navigation",
  TreeNavigation: "Navigation",
  ValidatedTextField: "Forms",
  ValidatedTextArea: "Forms",
  ValidatedSelect: "Forms",
  FormScaffold: "Forms",
  FilterToolbar: "Data",
  BulkSelectToolbar: "Data",
  ListManager: "Data",
  DataTable: "Data",
  CardGrid: "Data",
  ListView: "Data",
  ConfirmModal: "Feedback",
  StatusPanel: "Feedback",
  AiAssistant: "AI",
};
const CATEGORY_ORDER = [
  "Layouts",
  "Navigation",
  "Forms",
  "Data",
  "Feedback",
  "AI",
];

/** Clean a JSDoc block body to one line. */
function cleanDoc(body) {
  return body
    .split("\n")
    .map((l) => l.replace(/^\s*\*\s?/, "").trim())
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * First sentence of the component's OWN doc comment. Picks the JSDoc block
 * immediately preceding the component's `export function`/`export const`
 * declaration (not an earlier helper-type's doc); falls back to the block
 * whose text starts with the component name, then the first block.
 */
function summarize(src, name) {
  const blocks = [...src.matchAll(/\/\*\*([\s\S]*?)\*\//g)];
  if (blocks.length === 0) return "";

  // Prefer the block whose text starts with the component name (the DS
  // convention: "ComponentName — …"). Else the block immediately preceding
  // the component's export declaration. Else the first block.
  const decl = src.search(
    new RegExp(`export\\s+(?:function|const)\\s+${name}\\b`),
  );
  const declPreceding =
    decl === -1
      ? undefined
      : [...blocks].reverse().find((b) => b.index + b[0].length <= decl);
  const chosen =
    blocks.find((b) => new RegExp(`^${name}\\b`).test(cleanDoc(b[1]))) ??
    declPreceding ??
    blocks[0];

  const body = cleanDoc(chosen[1]).replace(
    new RegExp(`^${name}\\s*[—-]\\s*`),
    "",
  );
  const sentence = body.split(/(?<=[.])\s/)[0] ?? body;
  return sentence.trim();
}

const rows = readdirSync(DS_DIR)
  .filter((f) => f.endsWith(".tsx"))
  .map((f) => f.replace(/\.tsx$/, ""))
  .filter((name) => CATEGORY[name])
  .map((name) => ({
    name,
    category: CATEGORY[name],
    summary: summarize(readFileSync(join(DS_DIR, name + ".tsx"), "utf8"), name),
  }))
  .sort(
    (a, b) =>
      CATEGORY_ORDER.indexOf(a.category) - CATEGORY_ORDER.indexOf(b.category) ||
      a.name.localeCompare(b.name),
  );

const table = [
  `| Component | Category | What it does | Import |`,
  `| --- | --- | --- | --- |`,
  ...rows.map(
    (r) =>
      `| \`${r.name}\` | ${r.category} | ${r.summary} | \`import { ${r.name} } from "${PKG_NAME}"\` |`,
  ),
].join("\n");

const START = "<!-- ds-components:start -->";
const END = "<!-- ds-components:end -->";
const block = `${START}\n\n${table}\n\n${END}`;

let injected = 0;
for (const readme of [
  join(LIB_ROOT, "README.md"),
  join(REPO_ROOT, "README.md"),
]) {
  if (!existsSync(readme)) continue;
  const md = readFileSync(readme, "utf8");
  if (!md.includes(START)) continue;
  const next = md.replace(
    new RegExp(`${START}[\\s\\S]*?${END}`),
    block.replace(/\$/g, "$$$$"),
  );
  writeFileSync(readme, next);
  injected++;
}

console.log(
  `✓ DS table: ${rows.length} components across ${new Set(rows.map((r) => r.category)).size} categories → ${injected} README(s)`,
);
