import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/cli.ts", "src/index.ts"],
  outDir: "dist",
  format: ["esm"],
  target: "node20",
  // Single-file output per entry so the published bin works on a fresh
  // node install (no relative import resolution surprises).
  splitting: false,
  shims: true,
  dts: true,
  clean: true,
  // docs.data.json is inlined via the docs.ts wrapper so no loader
  // config is needed — the bundler reads it as a normal module.
});
