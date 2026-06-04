#!/usr/bin/env node
/**
 * Catalog generator.
 *
 * Scans every `*.stories.tsx` under `../src/stories/`, extracts the
 * `title:` meta string + the FoundationPage intro / `description` / first
 * comment block (when present), and writes `src/docs.data.json`.
 *
 * Run on demand: `pnpm gen` (or before publish). Output is committed
 * so the MCP works from `npx -y` without a build step on consumers.
 *
 * Design goal: no parse-AST dependency — pure regex over the source so
 * the script stays a single self-contained file. Story titles are
 * stable enough that this is robust in practice.
 */
import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
// Workspace root + sibling lib package. The catalog generator walks
// the lib's story files to build the searchable index.
const REPO_ROOT = resolve(here, "..", "..", "..");
const LIB_ROOT = join(REPO_ROOT, "packages", "ds-patternfly");
const STORIES_ROOT = join(LIB_ROOT, "src", "stories");
const OUT = resolve(here, "..", "src", "docs.data.json");
const PKG = JSON.parse(
  readFileSync(join(LIB_ROOT, "package.json"), "utf8"),
);

// ---------- file walker ----------

function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    const s = statSync(p);
    if (s.isDirectory()) walk(p, files);
    else if (entry.endsWith(".stories.tsx")) files.push(p);
  }
  return files;
}

// ---------- per-story extractors ----------

/** Extract the `title: "..."` string from the meta block. */
function readTitle(src) {
  const m = src.match(/title:\s*"([^"]+)"/);
  return m ? m[1] : null;
}

/**
 * Extract a one-paragraph summary. Strategy:
 *   1. `<FoundationPage title="…" intro={<>…</>}` — pull the intro JSX,
 *      strip tags + collapse whitespace.
 *   2. Fall back to first JS doc-comment in the file.
 *   3. Empty string if nothing found.
 */
function readSummary(src) {
  // Try FoundationPage intro
  const intro = src.match(/intro=\{[\s\S]*?<>([\s\S]*?)<\/>[\s\S]*?\}/);
  if (intro) {
    return cleanText(intro[1]).slice(0, 320);
  }
  // Try first JSDoc block
  const jsdoc = src.match(/\/\*\*\s*([\s\S]*?)\*\//);
  if (jsdoc) {
    const text = jsdoc[1]
      .split("\n")
      .map((l) => l.replace(/^\s*\*\s?/, "").trim())
      .filter(Boolean)
      .join(" ");
    return cleanText(text).slice(0, 320);
  }
  return "";
}

/**
 * Pull a few free-text tags from the title + path. Cheap heuristics —
 * lowercase tokens of the title, split by `/`, kept short.
 */
function deriveTags(title, fileRel) {
  const tokens = new Set();
  for (const seg of title.split("/")) {
    for (const w of seg.toLowerCase().split(/[\s&_,-]+/)) {
      if (w.length > 2) tokens.add(w);
    }
  }
  // Also include path segments (e.g. component-groups, content-containers)
  for (const seg of fileRel.toLowerCase().split(/[/\\.]+/)) {
    if (seg.length > 2 && !seg.includes("stories") && !seg.includes("tsx"))
      tokens.add(seg);
  }
  return Array.from(tokens).slice(0, 8);
}

/** Strip JSX tags + entities, collapse whitespace, decode common chars. */
function cleanText(s) {
  return s
    .replace(/<[^>]+>/g, " ")
    .replace(/\{[^}]*\}/g, " ") // strip JSX expressions
    .replace(/&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&rsquo;|&lsquo;/g, "'")
    .replace(/&ndash;|&mdash;/g, "—")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// ---------- id + url derivation ----------

/** Title → kebab id used by Storybook URLs. PF6's convention is to slug
 * lowercase + replace non-alphanumeric runs with single dashes. */
function toStoryId(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Kind classification based on the title's first segment. */
function classify(title) {
  const head = title.split("/")[0].toLowerCase();
  if (head === "foundations") return "foundation";
  if (head === "utility classes") return "guideline";
  if (head === "layouts") return "foundation";
  if (head === "components") return "component";
  if (head === "component groups") return "component";
  if (head === "charts") return "component";
  if (head === "patterns") return "recipe";
  if (head === "extensions") return "component";
  if (head === "accessibility") return "guideline";
  return "component";
}

// ---------- main ----------

function main() {
  const files = walk(STORIES_ROOT);
  const items = [];

  for (const file of files) {
    const src = readFileSync(file, "utf8");
    const title = readTitle(src);
    if (!title) continue;
    const rel = relative(REPO_ROOT, file);
    const summary = readSummary(src) || `${title} story`;
    const tags = deriveTags(title, rel);
    const storyId = toStoryId(title) + "--overview";

    items.push({
      id: toStoryId(title),
      kind: classify(title),
      title: title.split("/").pop(),
      breadcrumb: title,
      summary,
      tags,
      storybookUrl: `/?path=/story/${storyId}`,
    });
  }

  items.sort((a, b) => a.breadcrumb.localeCompare(b.breadcrumb));

  const out = {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    version: "1",
    generatedAt: new Date().toISOString().slice(0, 10),
    library: {
      name: PKG.name,
      version: PKG.version,
      storybook: "https://storybook.goldenpassport.com",
      github: "https://github.com/GoldenPassport/ds-patternfly",
    },
    items,
  };

  writeFileSync(OUT, JSON.stringify(out, null, 2) + "\n");
  console.log(
    `✓ wrote ${relative(here, OUT)} — ${items.length} stories indexed`,
  );
}

main();
