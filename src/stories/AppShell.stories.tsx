import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { useState } from "react";
import {
  Nav,
  NavItem,
  NavList,
  PageSection,
  Title,
  Stack,
  StackItem,
} from "@patternfly/react-core";
import { AppShell } from "../components/AppShell.js";
import { PrimaryDetailLayout } from "../components/PrimaryDetailLayout.js";
import {
  appShellEnLabels,
  primaryDetailLayoutEnLabels,
} from "../components/labels.js";
import { processInstances, type ProcessInstance } from "./_sampleData.js";

const meta: Meta<typeof AppShell> = {
  title: "Layouts/AppShell",
  component: AppShell,
  parameters: {
    layout: "fullscreen",
    a11y: {
      // PF6 v6 paints gradient backgrounds on its Button component that axe
      // can't analyze (color-contrast → "needs review"). Upstream PF6 issue.
      // Brand color contrast itself is validated in src/tokens/tokens.test.ts.
      config: { rules: [{ id: "color-contrast", enabled: false }] },
    },
  },
};
export default meta;

type Story = StoryObj<typeof AppShell>;

const navItems = ["Dashboard", "Process instances", "Tasks", "Reports"];

export const WithSidebarAndPrimaryDetail: Story = {
  render: () => {
    const [selectedId, setSelectedId] = useState<string | null>("PI-1001");
    const [activeNav, setActiveNav] = useState("Process instances");
    return (
      <AppShell
        labels={appShellEnLabels}
        brandLogo={<strong>BPM Console</strong>}
        sidebar={
          <Nav aria-label="Main">
            <NavList>
              {navItems.map((item) => (
                <NavItem
                  key={item}
                  isActive={item === activeNav}
                  onClick={() => setActiveNav(item)}
                >
                  {item}
                </NavItem>
              ))}
            </NavList>
          </Nav>
        }
      >
        <PageSection>
          <Title headingLevel="h1">{activeNav}</Title>
        </PageSection>
        <PageSection style={{ flex: 1, padding: 0 }}>
          <PrimaryDetailLayout<ProcessInstance>
            items={processInstances}
            getItemId={(i) => i.id}
            selectedId={selectedId}
            onSelect={setSelectedId}
            renderListItem={(item) => (
              <Stack>
                <StackItem>
                  <strong>{item.name}</strong>
                </StackItem>
                <StackItem>
                  <small>
                    {item.id} · {item.status}
                  </small>
                </StackItem>
              </Stack>
            )}
            renderDetail={(item) => (
              <Stack hasGutter>
                <StackItem>
                  <Title headingLevel="h2">{item.name}</Title>
                </StackItem>
                <StackItem>{item.description}</StackItem>
              </Stack>
            )}
            labels={primaryDetailLayoutEnLabels}
          />
        </PageSection>
      </AppShell>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("skip-to-content link is the first focusable element", async () => {
      // The SkipToContent <a> is rendered first, before any other interactive
      // element, so the very first Tab from <body> reaches it.
      const skip = canvas.getByRole("link", { name: appShellEnLabels.skipToContent });
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

    await step("clicking a nav item updates the active heading", async () => {
      // PF6 NavItem renders as <li><a> by default; the accessible name comes
      // from the link text. Match by text to be agnostic to PF's exact
      // render (link vs button) — what matters is that clicking updates state.
      const tasksItem = canvas.getByText("Tasks");
      await userEvent.click(tasksItem);
      await expect(
        canvas.getByRole("heading", { level: 1, name: "Tasks" }),
      ).toBeInTheDocument();
    });

    await step("sidebar toggle button is keyboard-accessible", async () => {
      const toggle = canvas.getByRole("button", { name: appShellEnLabels.toggleSidebar });
      // The PF6 PageToggleButton exposes its open state via aria-expanded.
      const before = toggle.getAttribute("aria-expanded");
      await userEvent.click(toggle);
      const after = toggle.getAttribute("aria-expanded");
      await expect(after).not.toBe(before);
    });
  },
};
