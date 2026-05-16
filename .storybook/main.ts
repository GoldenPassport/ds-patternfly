import type { StorybookConfig } from "@storybook/react-vite";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// Repo root, resolved from this file (.storybook/main.ts → ..).
const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  typescript: {
    check: false,
    reactDocgen: "react-docgen-typescript",
    // Point react-docgen-typescript at the package tsconfig explicitly so
    // it doesn't fall back to a config that excludes .storybook/preview.tsx
    // (which produces "Skipping docgen for preview.tsx" warnings on boot).
    reactDocgenTypescriptOptions: {
      // Absolute path so the plugin doesn't depend on the cwd at run time
      // (Storybook may chdir; relative resolution then misses the file).
      tsconfigPath: resolve(REPO_ROOT, "tsconfig.json"),
      // Exclude config files from docgen entirely — preview.tsx and the
      // rest of .storybook/* don't export React components, so docgen has
      // nothing to extract. Without this the plugin warns "Skipping docgen
      // for preview.tsx" on every boot because its TypeScript project
      // service doesn't recognize config files as project rootFiles even
      // when they're in the tsconfig include array.
      exclude: [".storybook/**", "**/*.stories.tsx"],
    },
  },
  // viteFinal:
  //   1. PRE-BUNDLE Vitest + addon-vitest internals so Vite never triggers
  //      mid-run dependency optimization. Mid-run optimization yanks the
  //      page out from under the addon-vitest browser worker and surfaces
  //      as "Vitest failed to find the runner / current suite" on a random
  //      subset of files. Maintainer-recommended fix per Storybook
  //      issues #33067 / #32049 / #34042.
  //   2. Split heavy vendors out for PRODUCTION `storybook build` only.
  async viteFinal(config, { configType }) {
    config.optimizeDeps = {
      ...(config.optimizeDeps ?? {}),
      include: [
        ...(config.optimizeDeps?.include ?? []),
        // React JSX runtime — Vite would otherwise discover this at first
        // story render and trigger a reload mid-test, which yanks the
        // page out from under addon-vitest's browser worker (surfacing
        // as "Vitest failed to find the runner").
        "react/jsx-dev-runtime",
        "react/jsx-runtime",
        // Other deps used at story render time that Vite's scanner can miss.
        "axe-core",
        // NOTE: do NOT add "vitest" / "@vitest/runner" / "@vitest/browser/context"
        // here — addon-vitest marks them as `external`, so listing them in
        // optimizeDeps causes esbuild's "entry point cannot be marked as
        // external" error. addon-vitest pre-bundles them itself.
      ],
    };
    if (configType !== "PRODUCTION") return config;
    config.build = {
      ...(config.build ?? {}),
      chunkSizeWarningLimit: 1500,
      rollupOptions: {
        ...(config.build?.rollupOptions ?? {}),
        output: {
          ...(config.build?.rollupOptions?.output ?? {}),
          manualChunks(id: string) {
            if (id.includes("node_modules/@patternfly/")) return "patternfly";
            if (
              id.includes("node_modules/react/") ||
              id.includes("node_modules/react-dom/") ||
              id.includes("node_modules/scheduler/")
            ) {
              return "react";
            }
            return undefined;
          },
        },
      },
    };
    return config;
  },
};

export default config;
