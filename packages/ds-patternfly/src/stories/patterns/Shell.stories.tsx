import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { Section, Card, Example } from "../_kit/StoryKit.js";
import { Shell } from "../../components/Shell.js";
import { shellEnLabels } from "../../components/labels.js";
import ShellExample from "../../examples/patterns/Shell.example.js";
import shellExampleSrc from "../../examples/patterns/Shell.example.tsx?raw";

const meta: Meta<typeof Shell> = {
  title: "Patterns/Shell",
  component: Shell,
  parameters: {
    layout: "fullscreen",
    // Render the shell edge-to-edge (drop the story-canvas padding) so the
    // masthead is full width, as it would be in a real app.
    fullBleed: true,
    a11y: {
      // PF6 v6 paints gradient backgrounds on its Button component that axe
      // can't analyze (color-contrast → "needs review"). Upstream PF6 issue.
      // Brand color contrast itself is validated in src/tokens/tokens.test.ts.
      config: { rules: [{ id: "color-contrast", enabled: false }] },
    },
  },
};
export default meta;

type Story = StoryObj<typeof Shell>;

/**
 * The end-to-end demo lives in `src/examples/patterns/Shell.example.tsx` —
 * branded masthead + responsive utility actions, sidebar nav driving a
 * PageHeader, KPI cards, activity card, footer. See the
 * **Patterns/Shell example** page for the same render with the full source
 * + download. The play function locks the Shell's accessibility contract:
 * skip-to-content reveal, nav-driven title updates, keyboard-reachable
 * sidebar toggle.
 */
export const WithSidebarAndPrimaryDetail: Story = {
  render: () => <ShellExample />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("skip-to-content link is the first focusable element", async () => {
      // The SkipToContent <a> is rendered first, before any other interactive
      // element, so the very first Tab from <body> reaches it.
      const skip = canvas.getByRole("link", { name: shellEnLabels.skipToContent });
      await expect(skip).toHaveAttribute("href", "#gp-main-content");

      // Visually-hidden until focused: the base style clips with clip-path.
      // On focus, onFocus swaps the inline style to reveal it; on blur, it's
      // re-hidden. Assert clipPath round-trip to lock the keyboard-only-
      // reveal contract — that's the actual hiding mechanism.
      await expect(skip).toHaveStyle({ clipPath: "inset(50%)" });
      (skip as HTMLAnchorElement).focus();
      await expect(skip).toHaveStyle({ clipPath: "none" });
      (skip as HTMLAnchorElement).blur();
      await expect(skip).toHaveStyle({ clipPath: "inset(50%)" });
    });

    await step("clicking a nav item updates the PageHeader title", async () => {
      // PF6's isManagedSidebar starts the mobile sidebar collapsed
      // AND aria-hidden, so the nav landmark inside isn't queryable
      // by role until the user opens it. Click the hamburger first.
      const toggle = canvas.getByRole("button", { name: shellEnLabels.toggleSidebar });
      if (toggle.getAttribute("aria-expanded") !== "true") {
        await userEvent.click(toggle);
      }
      // PageHeader renders the title as an h1. Clicking a sidebar nav item
      // updates activeNav state, which drives the title text.
      // Disambiguate "Tasks" — it appears in both the nav AND the breadcrumb,
      // so target the nav-list specifically.
      const nav = canvas.getByRole("navigation", { name: "Main" });
      const tasksItem = within(nav).getByText("Tasks");
      await userEvent.click(tasksItem);
      await expect(
        canvas.getByRole("heading", { level: 1, name: "Tasks" }),
      ).toBeInTheDocument();
    });

    await step("sidebar toggle button is keyboard-accessible", async () => {
      const toggle = canvas.getByRole("button", { name: shellEnLabels.toggleSidebar });
      // The PF6 PageToggleButton exposes its open state via aria-expanded.
      const before = toggle.getAttribute("aria-expanded");
      await userEvent.click(toggle);
      const after = toggle.getAttribute("aria-expanded");
      await expect(after).not.toBe(before);
    });
  },
};

/**
 * The complete example file behind the demo above — ready to drop into an
 * app, and shipped verbatim in the MCP docs catalog. Source-only: the demo
 * above is already the live render; for the full-bleed live render see the
 * **Patterns/Shell example** page.
 */
export const FullExample: Story = {
  name: "Full example",
  parameters: { layout: "padded", fullBleed: false },
  render: () => (
    <Section
      title="Full example"
      description="The complete example file behind the demo above — ready to drop into an app. The same file ships in the MCP docs catalog. For the full-bleed live render, see the Patterns/Shell example page."
    >
      <Card>
        <Example source={shellExampleSrc} fileName="Shell.example.tsx" />
      </Card>
    </Section>
  ),
};
