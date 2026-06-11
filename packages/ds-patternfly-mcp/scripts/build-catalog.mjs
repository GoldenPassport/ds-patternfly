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
import {
  existsSync,
  readFileSync,
  readdirSync,
  statSync,
  writeFileSync,
} from "node:fs";
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

// Curation manifest for EXPORTED components: per catalog id, the colocated
// props JSON (single source shared with the story's Configuration section),
// usage guidance, key tokens, and end-to-end example files to embed.
const MANIFEST = JSON.parse(
  readFileSync(join(here, "exports.manifest.json"), "utf8"),
);

// Every exported component file (one symbol per file) across components/,
// recipes/, and patterns/. Catalog entries whose title matches one get an
// import statement + the file's source embedded (downloadable via the
// story, served by getGpComponent). name → absolute file path.
const COMPONENT_FILES = new Map();
for (const sub of ["components", "recipes", "patterns"]) {
  const dir = join(LIB_ROOT, "src", sub);
  if (!existsSync(dir)) continue;
  for (const f of readdirSync(dir)) {
    if (!f.endsWith(".tsx")) continue;
    const name = f.replace(/\.tsx$/, "");
    if (!COMPONENT_FILES.has(name)) COMPONENT_FILES.set(name, join(dir, f));
  }
}

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

// ---------- exported-component enrichment ----------

/**
 * Read an example file, rewriting the local `_lib` shim import to the real
 * package name and stripping `// #region` markers, so the embedded source
 * matches what the story displays and the download produces (see
 * presentExampleSource in the lib's _kit/StoryKit.tsx — keep in sync).
 */
function readExample(entry) {
  const source = readFileSync(join(LIB_ROOT, entry.file), "utf8")
    .replace(/["'](?:\.{1,2}\/)+_lib\.js["']/g, JSON.stringify(PKG.name))
    .replace(/^[ \t]*\/\/ #(?:region|endregion).*\r?\n?/gm, "")
    .trimEnd();
  const name = entry.file
    .split("/")
    .pop()
    .replace(/\.example\.tsx$/, "");
  return {
    name,
    ...(entry.description ? { description: entry.description } : {}),
    source,
  };
}

/** Recursively list `*.example.tsx` under src/examples (paths relative to
 * LIB_ROOT). */
function walkExamples(dir, files = []) {
  if (!existsSync(dir)) return files;
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) walkExamples(p, files);
    else if (entry.endsWith(".example.tsx"))
      files.push(relative(LIB_ROOT, p));
  }
  return files;
}

/**
 * Merge the manifest's curation into a generated item: import statement +
 * props from the colocated *.props.json (the same file the story renders,
 * so story and catalog can't drift), usage, keyTokens, embedded examples.
 */
function enrich(item) {
  // Auto-rules first: title matches an exported component/recipe/pattern
  // file → import line + the file's source (served by getGpComponent /
  // downloadable from the story's Configuration section). The import line
  // is only auto-set for plain components; recipes/patterns (which may
  // export extra symbols) get their import from the manifest.
  const componentFile = COMPONENT_FILES.get(item.title);
  if (componentFile) {
    item = {
      ...item,
      ...(item.kind === "component"
        ? { import: `import { ${item.title} } from "${PKG.name}";` }
        : {}),
      componentSource: readFileSync(componentFile, "utf8").trimEnd(),
    };
  }
  const cur = MANIFEST[item.id];
  if (!cur) return item;
  const out = { ...item };
  if (cur.propsFile) {
    const propsData = JSON.parse(
      readFileSync(join(LIB_ROOT, cur.propsFile), "utf8"),
    );
    out.import = cur.import ?? propsData.import;
    out.props = propsData.rows;
  }
  if (cur.usage) out.usage = cur.usage;
  if (cur.keyTokens) out.keyTokens = cur.keyTokens;
  if (cur.examples) out.examples = cur.examples.map(readExample);
  return out;
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
  /** story path relative to LIB_ROOT → catalog item (for example pairing). */
  const byStoryPath = new Map();

  for (const file of files) {
    const src = readFileSync(file, "utf8");
    const title = readTitle(src);
    if (!title) continue;
    const rel = relative(REPO_ROOT, file);
    const summary = readSummary(src) || `${title} story`;
    const tags = deriveTags(title, rel);
    const storyId = toStoryId(title) + "--overview";

    const item = enrich({
      id: toStoryId(title),
      kind: classify(title),
      title: title.split("/").pop(),
      breadcrumb: title,
      summary,
      tags,
      storybookUrl: `/?path=/story/${storyId}`,
    });
    items.push(item);
    byStoryPath.set(relative(LIB_ROOT, file), item);
  }

  // Auto-attach example files by path mirroring:
  // src/examples/<area>/<Name>.example.tsx ↔ src/stories/<area>/<Name>.stories.tsx
  // (manifest-declared examples are already on the item; don't duplicate,
  // and don't report them as orphans — the manifest is their pairing).
  const manifestExampleFiles = new Set(
    Object.values(MANIFEST)
      .flatMap((cur) => cur?.examples ?? [])
      .map((e) => e.file),
  );
  let attached = 0;
  const orphans = [];
  for (const exRel of walkExamples(join(LIB_ROOT, "src", "examples"))) {
    const storyRel = exRel
      .replace(/^src\/examples\//, "src/stories/")
      .replace(/\.example\.tsx$/, ".stories.tsx");
    const item = byStoryPath.get(storyRel);
    if (!item) {
      if (!manifestExampleFiles.has(exRel)) orphans.push(exRel);
      continue;
    }
    const example = readExample({ file: exRel });
    item.examples = item.examples ?? [];
    if (!item.examples.some((e) => e.name === example.name)) {
      item.examples.push(example);
      attached++;
    }
  }

  items.sort((a, b) => a.breadcrumb.localeCompare(b.breadcrumb));

  // Every manifest key must land on a real story id — a typo here would
  // silently drop the curation.
  const ids = new Set(items.map((i) => i.id));
  for (const key of Object.keys(MANIFEST)) {
    if (key !== "$comment" && !ids.has(key)) {
      throw new Error(
        `exports.manifest.json key "${key}" matched no story id`,
      );
    }
  }

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
    `✓ wrote ${relative(here, OUT)} — ${items.length} stories indexed, ` +
      `${attached} examples attached, ` +
      `${items.filter((i) => i.componentSource).length} component sources embedded`,
  );
  if (orphans.length) {
    console.warn(
      `⚠ ${orphans.length} example file(s) match no story (path mirroring):\n  ${orphans.join("\n  ")}`,
    );
  }
}

main();
