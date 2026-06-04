import { defineConfig } from "vitest/config";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";

export default defineConfig({
  test: {
    // Force sequential file execution across both projects. The Storybook
    // GUI Tests pane otherwise races test files' suite-context registration,
    // surfacing as "Vitest failed to find the current suite" on a random
    // subset of files.
    fileParallelism: false,
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "json"],
      // Only the lib source counts toward coverage. Stories, configs, tests,
      // and storybook helpers are dev surface — including them would dilute
      // the metric and produce noisy "uncovered" lines for things that
      // aren't shipped.
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "src/**/*.test.{ts,tsx}",
        "src/**/*.stories.{ts,tsx}",
        "src/stories/**",
        "src/index.ts",
      ],
      reportsDirectory: "coverage",
      // No coverage threshold yet — set one once the lib stabilises.
    },
    projects: [
      // 1) Existing Node-side unit tests (brand contrast suite, etc.).
      {
        test: {
          name: "unit",
          environment: "node",
          include: ["src/**/*.test.{ts,tsx}"],
        },
      },
      // 2) Storybook browser tests — auto-generates one Vitest test per story
      //    via the storybookTest plugin, runs them in headless Chromium.
      {
        plugins: [
          storybookTest({
            configDir: ".storybook",
            // Explicit URL so the plugin doesn't need to dynamically read
            // import.meta.env.__STORYBOOK_URL__ at runtime.
            storybookUrl: "http://localhost:6006",
          }),
        ],
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            headless: true,
            // Vitest 4 takes the provider as a factory import.
            provider: playwright(),
            instances: [{ browser: "chromium" }],
          },
          // No setupFiles: addon-vitest 10.3+ auto-applies preview
          // annotations. The incomplete-as-Accessibility-failure logic
          // lives in preview.tsx's afterEach so it can route through
          // Storybook's reporting channel (categorizes as Accessibility,
          // not Interactions).
          isolate: false,
        },
      },
    ],
  },
});
