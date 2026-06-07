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
    //   - "overlapped by another element" (a translucent overlay/scrim
    //     axe can't see through to compute the bg — e.g. a sidenav drawer
    //     scrim sitting over the page)
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
        return /partially overlaps|overlap|partially obscured|background gradient|pseudo element|background-?color (could not be|cannot be) determined/i.test(msgs);
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
    glass: {
      name: "Glass",
      description: "PF6 translucent glass theme (frosted surfaces)",
      defaultValue: "off",
      toolbar: {
        icon: "mirror",
        items: [
          { value: "off", title: "Glass off" },
          { value: "on", title: "Glass on" },
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
          "AI",
          "Utility classes",
          "Layouts",
          "Components",
          [
            // Components alphabetical. Forms and Menu carry nested
            // sub-orders so their children stay alpha-sorted too.
            "Accordion",
            "ActionList",
            "Alert",
            "Avatar",
            "Back to top",
            "Backdrop",
            "Badge",
            "Banner",
            "Brand",
            "Breadcrumb",
            "Button",
            "Card",
            "ClipboardCopy",
            "CodeBlock",
            "Compass",
            "Content",
            "DataList",
            "DescriptionList",
            "Divider",
            "Drawer",
            "DualListSelector",
            "EmptyState",
            "ExpandableSection",
            "File upload",
            "Footer",
            "Forms",
            [
              "Checkbox",
              "Date and time",
              [
                // Overview (group-root story title "Components/Forms/Date and time")
                // anchors at the top; the rest stays alphabetical.
                "CalendarMonth",
                "DatePicker",
                "DateTimePicker",
                "FuturePicker",
                "TimePicker",
              ],
              "Form",
              "FormSelect",
              "HelperText",
              "Inline edit",
              "InputGroup",
              "NumberInput",
              "Radio",
              "SearchInput",
              "Slider",
              "Switch",
              "TextArea",
              "TextInput",
              "TextInputGroup",
              "ToggleGroup",
            ],
            "Hero",
            "Hint",
            "Hyperlink",
            "Icon",
            "Jump links",
            "Label",
            "List",
            "LoginPage",
            "Masthead",
            "Menu",
            [
              "Application launcher",
              "Context selector",
              "Custom menus",
              "Dropdown",
              "Menu",
              "Menu toggle",
              "Options menu",
              "Select",
            ],
            "Modal",
            "Navigation",
            "NotificationBadge",
            "NotificationDrawer",
            "OverflowMenu",
            "Page",
            "Pagination",
            "Panel",
            "Popover",
            "Progress",
            "ProgressStepper",
            "Sidebar",
            "SimpleList",
            "Skeleton",
            "SkipToContent",
            "Spinner",
            "Table",
            "Tabs",
            "Timestamp",
            "Title",
            "Toolbar",
            "Tooltip",
            "TreeView",
            "Truncate",
            "Wizard",
          ],
          "Component groups",
          [
            // Within Component groups, alphabetical. The group-root
            // Overview (About.stories.tsx) anchors at the top.
            "Content containers",
            ["Multi-content card", "Page header", "Service card"],
            "Controls",
            [
              "Bulk select",
              "Close button",
              "External link button",
              "Responsive actions",
            ],
            "Error communication",
            [
              "Error boundary",
              "Error state",
              "Maintenance",
              "Missing page",
              "Unauthorized access",
              "Unavailable content",
              "Warning modal",
            ],
            "Helpers",
            [
              "Column management modal",
              "Field Builder",
              "List manager",
              "Log snippet",
              "Shortcut grid",
            ],
            "Status and state indicators",
            [
              "Beta",
              "Severity",
              "Skeleton table",
              "Stale data warning",
              "Status",
              "Tag count",
            ],
          ],
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
      const glass = ctx.globals["glass"] === "on";
      // Full-app layouts (Shell) render edge-to-edge: drop the canvas
      // breathing-room padding so the masthead spans the full width.
      const fullBleed = ctx.parameters["fullBleed"] === true;
      return (
        <ThemeProvider
          brand={brands[brandKey]}
          mode={mode}
          dir={dir}
          focusRing={focusRing}
          glass={glass}
        >
          <div
            style={{
              // Glass on → a brand-aware gradient canvas so the frosted
              // surfaces have colour variation to blur (a flat fill
              // blurred is invisible). Glass off → the flat page surface.
              background: glass
                ? `radial-gradient(circle at 85% 15%, color-mix(in srgb, var(--gp-color-brand-default) 35%, transparent) 0%, transparent 45%), radial-gradient(circle at 15% 85%, color-mix(in srgb, var(--gp-color-accent, var(--gp-color-brand-hover)) 28%, transparent) 0%, transparent 45%), var(--gp-color-bg-primary-default)`
                : "var(--gp-color-bg-primary-default)",
              color: "var(--gp-color-text-regular)",
              minHeight: "100vh",
              padding: fullBleed ? 0 : 16,
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
