// Concatenates PF6's utility classes (`pf-v6-u-*`) with the lib's own CSS
// into a single self-contained `dist/styles/index.css`, so consumers can
// `import "@golden-passport/ds-patternfly/styles"` and get both. Mirrors the
// dev import in `.storybook/preview.tsx` — keep them in sync.
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");

const libCss = await readFile(resolve(root, "src/styles/index.css"), "utf8");
const utilitiesCss = await readFile(
  resolve(root, "node_modules/@patternfly/patternfly/utilities/_index.css"),
  "utf8",
);

const banner = `/*
 * @golden-passport/ds-patternfly — bundled stylesheet.
 *
 * Order:
 *   1. PatternFly 6 utility classes (pf-v6-u-*)
 *   2. Lib-specific base + component CSS
 *
 * The lib's rules come last so they win specificity ties against utilities
 * for the components the lib owns.
 */
`;

await mkdir(resolve(root, "dist/styles"), { recursive: true });
await writeFile(
  resolve(root, "dist/styles/index.css"),
  banner + utilitiesCss + "\n" + libCss,
);

console.log("✓ wrote dist/styles/index.css");
