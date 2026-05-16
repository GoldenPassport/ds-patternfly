import type { Preview } from "@storybook/react-vite";
import axe from "axe-core";
import "@patternfly/react-core/dist/styles/base.css";
// PF6 utility classes (pf-v6-u-*). The build script concatenates this same
// file into dist/styles/index.css so consumers get utilities for free with
// the lib's main stylesheet — keep the dev/prod paths in sync.
import "@patternfly/patternfly/utilities/_index.css";
import "../src/styles/index.css";
import { ThemeProvider } from "../src/theme/ThemeProvider.js";
import { defaultBrand } from "../src/tokens/brands/default.js";
import { goldenPassport } from "../src/tokens/brands/golden-passport.js";

/**
 * Monkey-patch axe.run so EVERY caller (most importantly @storybook/addon-a11y)
 * sees axe's `incomplete` array merged into `violations`. addon-a11y's
 * built-in matcher `toHaveNoViolations` then surfaces them as proper a11y
 * failures in the Storybook GUI Tests pane (orange dot under Accessibility,
 * not Interactions). Addon-a11y already uses `vitest-axe` under the hood
 * which resolves to this same `axe-core` module.
 */
const _originalAxeRun = axe.run.bind(axe);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(axe as any).run = async function patchedRun(...args: any[]) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result: any = await _originalAxeRun(...(args as [any]));
  if (Array.isArray(result?.incomplete) && result.incomplete.length > 0) {
    // Filter out axe color-contrast incompletes that come from the bg-color
    // heuristic giving up — these are tooling limitations, not real
    // contrast failures:
    //   - "partially overlaps other elements" (adjacent layout items)
    //   - "background gradient" (PF6 buttons, labels use gradients)
    //   - "pseudo element" (PF6 labels paint bg via ::before)
    // Real could-not-determine cases (e.g. images-as-bg, opaque overlays
    // hiding text) still surface because they don't match these patterns.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const promotable = result.incomplete.filter((node: any) => {
      if (node?.id !== "color-contrast") return true;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return !(node.nodes ?? []).every((n: any) => {
        const msgs = [
          n.failureSummary ?? "",
          ...(n.any ?? []).map((c: { message?: string }) => c.message ?? ""),
          ...(n.all ?? []).map((c: { message?: string }) => c.message ?? ""),
          ...(n.none ?? []).map((c: { message?: string }) => c.message ?? ""),
        ].join(" ");
        return /partially overlaps|background gradient|pseudo element|background-?color (could not be|cannot be) determined/i.test(msgs);
      });
    });
    if (promotable.length > 0) {
      result.violations = [...(result.violations ?? []), ...promotable];
    }
    result.incomplete = [];
  }
  return result;
};

const brands = {
  default: defaultBrand,
  "golden-passport": goldenPassport,
} as const;

const preview: Preview = {
  globalTypes: {
    brand: {
      name: "Brand",
      description: "Active brand tokens",
      defaultValue: "golden-passport",
      toolbar: {
        icon: "paintbrush",
        items: [
          { value: "default", title: "Default" },
          { value: "golden-passport", title: "Golden Passport" },
        ],
      },
    },
    mode: {
      name: "Mode",
      description: "Color mode",
      defaultValue: "light",
      toolbar: {
        icon: "circlehollow",
        items: [
          { value: "light", title: "Light", icon: "sun" },
          { value: "dark", title: "Dark", icon: "moon" },
        ],
      },
    },
    direction: {
      name: "Direction",
      description: "Text direction",
      defaultValue: "ltr",
      toolbar: {
        icon: "transfer",
        items: [
          { value: "ltr", title: "LTR" },
          { value: "rtl", title: "RTL" },
        ],
      },
    },
    focusRing: {
      name: "Focus ring",
      description: "Inner (PF6 input style, inset) or outer (consistent across system)",
      defaultValue: "outer",
      toolbar: {
        icon: "circle",
        items: [
          { value: "outer", title: "Outer" },
          { value: "inner", title: "Inner" },
        ],
      },
    },
  },
  parameters: {
    a11y: { test: "error" },
    layout: "fullscreen",
    options: {
      // Reading order: orientation → CSS utilities → primitives →
      // composed pieces → external packages → cross-cutting concerns.
      storySort: {
        order: [
          "Foundations",
          "Utility classes",
          "Layouts",
          "Components",
          "Component groups",
          "Charts",
          "Patterns",
          "Extensions",
          "Accessibility",
        ],
      },
    },
  },
  decorators: [
    (Story, ctx) => {
      const brandKey =
        (ctx.globals["brand"] as keyof typeof brands) ?? "golden-passport";
      const mode = (ctx.globals["mode"] as "light" | "dark") ?? "light";
      const dir = (ctx.globals["direction"] as "ltr" | "rtl") ?? "ltr";
      const focusRing =
        (ctx.globals["focusRing"] as "inner" | "outer") ?? "outer";
      return (
        <ThemeProvider
          brand={brands[brandKey]}
          mode={mode}
          dir={dir}
          focusRing={focusRing}
        >
          <div
            style={{
              background: "var(--gp-color-bg-primary-default)",
              color: "var(--gp-color-text-regular)",
              minHeight: "100vh",
              padding: 16,
            }}
          >
            <Story />
          </div>
        </ThemeProvider>
      );
    },
  ],
};

export default preview;
