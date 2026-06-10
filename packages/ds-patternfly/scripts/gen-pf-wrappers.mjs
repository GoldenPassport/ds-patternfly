#!/usr/bin/env node
/**
 * One-time scaffold: per-component DS wrapper files for every PatternFly 6
 * component the component stories document.
 *
 * For each PF family (Button, Card, Masthead, …) used by
 * `src/stories/components/**`, emits `src/components/<Family>.tsx`:
 *   - a thin wrapper for the primary component (same name as the family) —
 *     the home for future DS defaults,
 *   - plain re-exports for the family's other used members (sub-components,
 *     enums) and used types,
 * plus `src/components/pf.ts` (barrel of all family files + a catch-all of
 * unmapped symbols) which `src/components/index.ts` re-exports.
 *
 * Run once and commit (`node scripts/gen-pf-wrappers.mjs`). Files are
 * hand-maintained afterwards — the script REFUSES to overwrite an existing
 * family file unless --force is passed, so added DS defaults are safe.
 *
 * Same regex-over-source philosophy as the repo's other scripts — no AST
 * dependency.
 */
import {
  readFileSync,
  readdirSync,
  statSync,
  writeFileSync,
  existsSync,
} from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");
const STORIES = join(root, "src", "stories", "components");
const PF_ESM = join(root, "node_modules", "@patternfly", "react-core", "dist", "esm");
const OUT_DIR = join(root, "src", "components");
const FORCE = process.argv.includes("--force");

// ---------- 1. collect symbols the stories import from react-core ----------

function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) walk(p, files);
    else if (entry.endsWith(".tsx") || entry.endsWith(".ts")) files.push(p);
  }
  return files;
}

// Stories import either from react-core directly (pre-wrapper stories) or
// from the DS package itself (post-switch). Scan both: react-core symbols
// MUST end up in the DS surface (unmapped ones error into pf-misc), while
// DS-package symbols only count when they map back to a PF family (DS-own
// exports like Shell/AiAssistant are not PF re-exports).
const usedValues = new Set();
const usedTypes = new Set();
const dsSourced = new Set();

for (const file of walk(STORIES)) {
  const src = readFileSync(file, "utf8");
  // Brace-free capture so spans inside CodeBlock template strings can't
  // bridge unrelated text into a match.
  const re =
    /import\s+(type\s+)?\{([^{}]*)\}\s*from\s*"(@patternfly\/react-core|@golden-passport\/ds-patternfly)";/g;
  let m;
  while ((m = re.exec(src))) {
    const isTypeImport = Boolean(m[1]);
    const fromDs = m[3] === "@golden-passport/ds-patternfly";
    for (const raw of m[2].split(",")) {
      let name = raw.trim();
      if (!name) continue;
      const isInlineType = name.startsWith("type ");
      if (isInlineType) name = name.slice(5).trim();
      name = name.split(/\s+as\s+/)[0].trim();
      if (!name) continue;
      (isTypeImport || isInlineType ? usedTypes : usedValues).add(name);
      if (fromDs) dsSourced.add(name);
    }
  }
}

// A type also imported as a value stays a value (enums used in types etc.).
for (const t of [...usedTypes]) if (usedValues.has(t)) usedTypes.delete(t);

// ---------- 2. map symbol → PF family via the package's .d.ts files ----------

/** family name → Set of exported identifiers (values + types mixed). */
const familyExports = new Map();
/** symbol → family (first family wins; PF families don't overlap). */
const symbolFamily = new Map();
/**
 * primary symbol → how PF declares it: "forwardRef" | "class" | "fc".
 * Drives the wrapper shape — refs are forwarded exactly where PF6 itself
 * accepts one (ForwardRefExoticComponent or a class instance), and omitted
 * where PF6 has nothing to forward (plain function components).
 */
const componentKind = new Map();

function indexFamilies(kindDir) {
  const base = join(PF_ESM, kindDir);
  if (!existsSync(base)) return;
  for (const family of readdirSync(base)) {
    const dir = join(base, family);
    if (!statSync(dir).isDirectory()) continue;
    const names = familyExports.get(family) ?? new Set();
    for (const f of walk(dir, []).filter((p) => p.endsWith(".d.ts"))) {
      const dts = readFileSync(f, "utf8");
      const expRe =
        /export\s+(?:declare\s+)?(?:const|function|class|enum|interface|type)\s+([A-Za-z0-9_]+)/g;
      let m;
      while ((m = expRe.exec(dts))) names.add(m[1]);
      // `declare class X …; export { X };` style (Checkbox, Modal, …)
      const reExpRe = /export\s*\{([^{}]*)\}\s*;/g;
      while ((m = reExpRe.exec(dts))) {
        for (const raw of m[1].split(",")) {
          const name = raw.trim().split(/\s+as\s+/).pop()?.trim();
          if (name) names.add(name);
        }
      }
      // Classify the family's primary declaration (ref capability).
      const fwdRe = new RegExp(
        `declare const ${family}\\b[^=;]*ForwardRefExoticComponent`,
      );
      const classRe = new RegExp(`declare class ${family}\\b`);
      if (!componentKind.has(family)) {
        if (fwdRe.test(dts)) componentKind.set(family, "forwardRef");
        else if (classRe.test(dts)) componentKind.set(family, "class");
        else if (new RegExp(`declare const ${family}\\b`).test(dts))
          componentKind.set(family, "fc");
      }
    }
    familyExports.set(family, names);
    for (const n of names) {
      if (!symbolFamily.has(n)) symbolFamily.set(n, family);
    }
  }
}
indexFamilies("components");
indexFamilies("layouts");

// ---------- 3. group used symbols per family ----------

/** family → { values: [], types: [] } */
const plan = new Map();
const unmapped = { values: [], types: [] };

function assign(name, kind) {
  const family = symbolFamily.get(name);
  if (!family) {
    // DS-own exports (Shell, AiAssistant, label objects, …) imported from
    // the package are not PF symbols — nothing to re-export.
    if (!dsSourced.has(name)) unmapped[kind].push(name);
    return;
  }
  const entry = plan.get(family) ?? { values: new Set(), types: new Set() };
  entry[kind === "values" ? "values" : "types"].add(name);
  plan.set(family, entry);
}
for (const v of usedValues) assign(v, "values");
for (const t of usedTypes) assign(t, "types");

// ---------- 4. emit one file per family ----------

const HAND_WRITTEN = new Set([
  "Shell",
  "PrimaryDetailLayout",
  "Hyperlink",
  "AiAssistant",
]);

// PF families the DS deliberately shadows with its own component of the
// same name — never generate a wrapper (the DS version is the export).
const DS_SHADOWED = new Set(["SkipToContent"]);

// Primaries whose PF props are a UNION (e.g. Banner's status | non-status):
// spreading a union fights exactOptionalPropertyTypes, so the wrapper
// re-asserts the PF prop type on the spread.
const UNION_PROPS = new Set(["Banner"]);

const familyFiles = [];
let skipped = 0;

for (const [family, { values, types }] of [...plan.entries()].sort()) {
  if (DS_SHADOWED.has(family)) continue;
  if (HAND_WRITTEN.has(family)) {
    throw new Error(`PF family "${family}" collides with a DS component`);
  }
  const outPath = join(OUT_DIR, `${family}.tsx`);
  familyFiles.push(family);
  if (existsSync(outPath) && !FORCE) {
    skipped++;
    continue;
  }

  const hasPrimary = familyExports.get(family)?.has(family);
  const rest = [...values].filter((v) => v !== family).sort();
  const restTypes = [...types].sort();

  const kindNote = {
    forwardRef: ` * Refs forward to PF6's ${family} (a forwardRef component).`,
    class: ` * No ref forwarded: PF6's ${family} is a class component — its ref is the class instance, not a DOM node. Use PF's innerRef-style props where provided.`,
    fc: ` * No ref: PF6's ${family} is a plain function component (nothing to forward).`,
  };
  const refNote = kindNote[componentKind.get(family) ?? "fc"];
  const lines = [
    `/**`,
    ` * DS ${family} — PatternFly 6 ${family} under the Golden Passport dials.`,
    ` * Thin wrapper: the dial CSS (src/styles) already brands it; add DS`,
    ` * defaults here when the design system diverges from stock PF6.`,
    refNote,
    ` * Generated by scripts/gen-pf-wrappers.mjs — hand-maintained after that.`,
    ` */`,
  ];

  if (hasPrimary && values.has(family)) {
    const kind = componentKind.get(family) ?? "fc";
    const spread = UNION_PROPS.has(family)
      ? // Union props (e.g. status | non-status Banner): re-assert the PF
        // type on the spread so exactOptionalPropertyTypes accepts it.
        `{...(props as ComponentProps<typeof PF${family}>)}`
      : `{...props}`;
    const needsComponentProps = UNION_PROPS.has(family);
    if (kind === "class" && familyExports.get(family)?.has(`${family}Props`)) {
      // Class component with a published props interface: use it directly
      // (deriving via ComponentProps trips over class typing quirks, e.g.
      // Tabs' getDerivedStateFromProps). No ref forwarded — a class ref is
      // the instance, not a DOM node; PF's innerRef-style props pass
      // through as ordinary props.
      lines.push(
        `import { ${family} as PF${family} } from "@patternfly/react-core";`,
        `import type { ${family}Props as PF${family}Props } from "@patternfly/react-core";`,
        ``,
        `export type ${family}Props = Omit<PF${family}Props, "ref">;`,
        ``,
        `export function ${family}(props: ${family}Props) {`,
        `  return <PF${family} {...props} />;`,
        `}`,
      );
    } else if (kind !== "forwardRef") {
      // Plain FC (no ref to forward) or class component without a published
      // props interface.
      const typeImports = needsComponentProps
        ? "ComponentProps, ComponentPropsWithoutRef"
        : "ComponentPropsWithoutRef";
      lines.push(
        `import { ${family} as PF${family} } from "@patternfly/react-core";`,
        `import type { ${typeImports} } from "react";`,
        ``,
        `export type ${family}Props = ComponentPropsWithoutRef<typeof PF${family}>;`,
        ``,
        `export function ${family}(props: ${family}Props) {`,
        `  return <PF${family} ${spread} />;`,
        `}`,
      );
    } else {
      // PF publishes a real forwardRef component — forward the ref so DS
      // consumers keep that capability (toggles, inputs, focus targets).
      // The export is explicitly annotated so dts emit never has to infer
      // a type name PF doesn't export from its package root (TS4023).
      lines.push(
        `import { forwardRef } from "react";`,
        `import { ${family} as PF${family} } from "@patternfly/react-core";`,
        `import type {`,
        `  ComponentPropsWithoutRef,`,
        `  ComponentRef,`,
        `  ForwardRefExoticComponent,`,
        `  RefAttributes,`,
        `} from "react";`,
        ``,
        `export type ${family}Props = ComponentPropsWithoutRef<typeof PF${family}>;`,
        ``,
        `export const ${family}: ForwardRefExoticComponent<`,
        `  ${family}Props & RefAttributes<ComponentRef<typeof PF${family}>>`,
        `> = forwardRef<ComponentRef<typeof PF${family}>, ${family}Props>(`,
        `  function ${family}(props, ref) {`,
        `    return <PF${family} ref={ref} ${spread} />;`,
        `  },`,
        `);`,
      );
    }
  }
  if (rest.length) {
    lines.push(
      ``,
      `export {`,
      ...rest.map((v) => `  ${v},`),
      `} from "@patternfly/react-core";`,
    );
  }
  if (restTypes.length) {
    lines.push(
      ``,
      `export type {`,
      ...restTypes.map((t) => `  ${t},`),
      `} from "@patternfly/react-core";`,
    );
  }
  writeFileSync(outPath, lines.join("\n") + "\n");
}

// ---------- 5. catch-all + barrel ----------

// Symbols outside components/layouts (helpers, contexts, utilities) so the
// DS surface covers everything the stories use.
const miscPath = join(OUT_DIR, "pf-misc.ts");
{
  const lines = [
    `/**`,
    ` * PF6 helpers/utilities the stories use that don't belong to a single`,
    ` * component family. Generated by scripts/gen-pf-wrappers.mjs.`,
    ` */`,
  ];
  if (!unmapped.values.length && !unmapped.types.length) {
    lines.push(`export {};`);
  }
  if (unmapped.values.length) {
    lines.push(
      `export {`,
      ...unmapped.values.sort().map((v) => `  ${v},`),
      `} from "@patternfly/react-core";`,
    );
  }
  if (unmapped.types.length) {
    lines.push(
      `export type {`,
      ...unmapped.types.sort().map((t) => `  ${t},`),
      `} from "@patternfly/react-core";`,
    );
  }
  writeFileSync(miscPath, lines.join("\n") + "\n");
}

// Barrel — regenerated every run (safe: contains no hand-written code).
const barrelPath = join(OUT_DIR, "pf.ts");
{
  const lines = [
    `/**`,
    ` * Barrel of the PF6-derived DS components (one file per PF family).`,
    ` * Regenerated by scripts/gen-pf-wrappers.mjs — do not edit by hand.`,
    ` */`,
    ...familyFiles.sort().map((f) => `export * from "./${f}.js";`),
    `export * from "./pf-misc.js";`,
  ];
  writeFileSync(barrelPath, lines.join("\n") + "\n");
}

console.log(
  `✓ ${familyFiles.length} family files (${skipped} existing kept), ` +
    `${unmapped.values.length + unmapped.types.length} misc symbols`,
);
if (unmapped.values.length || unmapped.types.length) {
  console.log(
    `  misc: ${[...unmapped.values, ...unmapped.types.map((t) => `type ${t}`)].join(", ")}`,
  );
}
