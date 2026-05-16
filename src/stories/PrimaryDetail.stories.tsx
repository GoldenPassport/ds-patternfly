import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { useState } from "react";
import { Title, Stack, StackItem, Label } from "@patternfly/react-core";
import { PrimaryDetailLayout } from "../components/PrimaryDetailLayout.js";
import { primaryDetailLayoutEnLabels } from "../components/labels.js";
import { processInstances, type ProcessInstance } from "./_sampleData.js";

const meta: Meta<typeof PrimaryDetailLayout<ProcessInstance>> = {
  title: "Patterns/Primary-detail/Demo",
  component: PrimaryDetailLayout,
  parameters: {
    layout: "fullscreen",
    a11y: {
      // PF6 v6 paints gradient backgrounds on Button (any variant) and
      // pseudo-element backgrounds on Label — axe reports color-contrast as
      // "needs review" because it can't analyze through them. These are
      // upstream PF6 internals; brand color contrast itself is validated
      // in src/tokens/tokens.test.ts (116 explicit pair checks).
      config: { rules: [{ id: "color-contrast", enabled: false }] },
    },
  },
};
export default meta;

type Story = StoryObj<typeof PrimaryDetailLayout<ProcessInstance>>;

export const Default: Story = {
  render: () => {
    const [selectedId, setSelectedId] = useState<string | null>("PI-1001");
    return (
      <div style={{ height: "calc(100vh - 1rem)" }}>
        <PrimaryDetailLayout<ProcessInstance>
          items={processInstances}
          getItemId={(i) => i.id}
          selectedId={selectedId}
          onSelect={setSelectedId}
          renderListItem={(item) => (
            <Stack hasGutter>
              <StackItem>
                <strong>{item.name}</strong>
              </StackItem>
              <StackItem>
                <small>
                  {item.id} · {item.startedAt}
                </small>
              </StackItem>
            </Stack>
          )}
          renderDetail={(item) => (
            <Stack hasGutter>
              <StackItem>
                <Title headingLevel="h2">{item.name}</Title>
              </StackItem>
              <StackItem>
                <Label>{item.status}</Label>{" "}
                <span style={{ marginInlineStart: 8 }}>{item.id}</span>
              </StackItem>
              <StackItem>{item.description}</StackItem>
            </Stack>
          )}
          labels={primaryDetailLayoutEnLabels}
        />
      </div>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("a different item is selectable by mouse", async () => {
      // Initial selection is PI-1001; pick a different one.
      const target = await canvas.findByRole("option", { name: /PI-1003/ });
      await userEvent.click(target);
      await expect(target).toHaveAttribute("aria-selected", "true");
      // The detail pane shows the selected item's heading.
      await expect(
        await canvas.findByRole("heading", { level: 2, name: /Invoice dispute/ }),
      ).toBeInTheDocument();
    });

    await step("Enter selects a focused item", async () => {
      const target = await canvas.findByRole("option", { name: /PI-1004/ });
      target.focus();
      await expect(target).toHaveFocus();
      await userEvent.keyboard("{Enter}");
      await expect(target).toHaveAttribute("aria-selected", "true");
    });

    await step("Space selects a focused item", async () => {
      const target = await canvas.findByRole("option", { name: /PI-1002/ });
      target.focus();
      await userEvent.keyboard(" ");
      await expect(target).toHaveAttribute("aria-selected", "true");
    });
  },
};

export const NoSelection: Story = {
  render: () => (
    <div style={{ height: "calc(100vh - 1rem)" }}>
      <PrimaryDetailLayout<ProcessInstance>
        items={processInstances}
        getItemId={(i) => i.id}
        selectedId={null}
        onSelect={() => {}}
        renderListItem={(item) => <span>{item.name}</span>}
        renderDetail={(item) => <span>{item.name}</span>}
        labels={primaryDetailLayoutEnLabels}
      />
    </div>
  ),
};

export const Translated: Story = {
  name: "Translated (Spanish labels)",
  render: () => {
    const [selectedId, setSelectedId] = useState<string | null>("PI-1001");
    return (
      <div style={{ height: "calc(100vh - 1rem)" }}>
        <PrimaryDetailLayout<ProcessInstance>
          items={processInstances}
          getItemId={(i) => i.id}
          selectedId={selectedId}
          onSelect={setSelectedId}
          renderListItem={(item) => <span>{item.name}</span>}
          renderDetail={(item) => <p>{item.description}</p>}
          labels={{
            listAriaLabel: "Elementos",
            detailAriaLabel: "Detalles del elemento",
            backToList: "Volver a la lista",
            emptyDetailTitle: "Ningún elemento seleccionado",
            emptyDetailBody:
              "Seleccione un elemento de la lista para ver sus detalles.",
          }}
        />
      </div>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("translated list is labelled in Spanish", async () => {
      // Aria label on the list region must match the labels prop.
      await expect(
        canvas.getByRole("listbox", { name: "Elementos" }),
      ).toBeInTheDocument();
    });

    await step("translated 'back to list' button uses Spanish text", async () => {
      // The back button is always in the DOM but `display: none` at md+
      // viewports (mobile pane toggle pattern). At those widths PF6 may also
      // strip its accessibility role, so query directly by the className we
      // attach to the element — most resilient to PF render changes.
      const backBtn = canvasElement.querySelector(
        ".gp-primary-detail__back-button",
      ) as HTMLElement | null;
      await expect(backBtn).toBeTruthy();
      await expect(backBtn?.textContent ?? "").toContain("Volver a la lista");
    });
  },
};
