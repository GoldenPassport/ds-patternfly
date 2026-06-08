import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, ButtonVariant } from "@patternfly/react-core";
import WarningModal from "@patternfly/react-component-groups/dist/dynamic/WarningModal";
import { FoundationPage, Section, Card, CodeBlock } from "../../components/StoryKit.js";
import { DemoFrame, PropsTable } from "../../components/DemoKit.js";

const meta: Meta = {
  title: "Component groups/Error communication/Warning modal",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => {
    const [simple, setSimple] = useState(false);
    const [checkbox, setCheckbox] = useState(false);
    const [confirmText, setConfirmText] = useState(false);

    return (
      <FoundationPage
        title="Warning modal"
        intro={
          <>
            A pre-built confirmation modal for destructive or dangerous
            actions — delete, disable, force-restart. Wraps Modal with
            sensible defaults (warning icon, danger CTA) and offers a
            checkbox-gate or type-to-confirm guard for high-risk
            operations.
          </>
        }
      >
        <Section
          title="Basic confirm"
          description="Simple yes/no — fires `onConfirm` when the danger button is clicked, `onClose` for cancel / X / Escape."
        >
          <Card>
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <DemoFrame>
                <Button variant="danger" onClick={() => setSimple(true)}>
                  Delete workflow
                </Button>
              </DemoFrame>
              <WarningModal
                isOpen={simple}
                onClose={() => setSimple(false)}
                onConfirm={() => setSimple(false)}
                title="Delete workflow?"
                confirmButtonLabel="Delete"
                confirmButtonVariant={ButtonVariant.danger}
              >
                This permanently deletes the workflow and all of its run
                history. This cannot be undone.
              </WarningModal>
              <CodeBlock>{`<WarningModal
  isOpen={open}
  onClose={close}
  onConfirm={confirmDelete}
  title="Delete workflow?"
  confirmButtonLabel="Delete"
  confirmButtonVariant={ButtonVariant.danger}
>
  This permanently deletes the workflow and all of its run history.
</WarningModal>`}</CodeBlock>
            </div>
          </Card>
        </Section>

        <Section
          title="With acknowledge checkbox"
          description="`withCheckbox` adds a 'I understand' checkbox that gates the confirm button. Use for irreversible operations."
        >
          <Card>
            <div style={{ padding: 24 }}>
              <DemoFrame>
                <Button variant="danger" onClick={() => setCheckbox(true)}>
                  Wipe environment
                </Button>
              </DemoFrame>
              <WarningModal
                isOpen={checkbox}
                onClose={() => setCheckbox(false)}
                onConfirm={() => setCheckbox(false)}
                title="Wipe environment?"
                withCheckbox
                checkboxLabel="I understand this destroys all data."
                confirmButtonLabel="Wipe"
                confirmButtonVariant={ButtonVariant.danger}
              >
                All deployments, data volumes, and secrets in this
                environment will be deleted.
              </WarningModal>
            </div>
          </Card>
        </Section>

        <Section
          title="Type-to-confirm"
          description="`confirmationText` requires the user to type the exact phrase before the confirm button enables. Use for catastrophic destructive actions."
        >
          <Card>
            <div style={{ padding: 24 }}>
              <DemoFrame>
                <Button variant="danger" onClick={() => setConfirmText(true)}>
                  Delete account
                </Button>
              </DemoFrame>
              <WarningModal
                isOpen={confirmText}
                onClose={() => setConfirmText(false)}
                onConfirm={() => setConfirmText(false)}
                title="Delete account?"
                confirmationText="DELETE"
                confirmationInputLabel="Type DELETE to confirm:"
                confirmButtonLabel="Delete account"
                confirmButtonVariant={ButtonVariant.danger}
              >
                Your account, all workspaces, and every artifact will be
                permanently destroyed. This cannot be undone.
              </WarningModal>
            </div>
          </Card>
        </Section>

        <Section title="Most-used props">
          <Card>
            <div style={{ padding: 24 }}>
              <PropsTable
                rows={[
                  { name: "isOpen", type: "boolean", description: "Controlled — show/hide the modal." },
                  { name: "onClose", type: "(event) => void", description: "Cancel / dismiss handler." },
                  { name: "onConfirm", type: "() => void", description: "Fired when the user clicks the danger button (and any guards have passed)." },
                  { name: "title", type: "ReactNode", description: "Modal title — phrase as a question (e.g. 'Delete workflow?')." },
                  { name: "confirmButtonLabel", type: "ReactNode", description: "Label on the danger button. Default 'Confirm' — override to be specific ('Delete', 'Wipe')." },
                  { name: "confirmButtonVariant", type: "ButtonVariant", description: "Visual variant of the confirm button. Use `danger` for destructive operations." },
                  { name: "cancelButtonLabel", type: "ReactNode", description: "Label on the cancel button. Default 'Cancel'." },
                  { name: "withCheckbox", type: "boolean", description: "Require an acknowledgement checkbox before confirm enables." },
                  { name: "checkboxLabel", type: "ReactNode", description: "Acknowledgement copy — be specific about consequences." },
                  { name: "confirmationText", type: "string", description: "If set, the user must type this exact string before confirm enables. Use for catastrophic actions." },
                  { name: "confirmationInputLabel", type: "ReactNode", description: "Label for the type-to-confirm input." },
                  { name: "confirmationInputProps", type: "TextInputProps", description: "Pass-through to the inner TextInput (placeholder, autocomplete)." },
                  { name: "ouiaId", type: "string | number", description: "Stable test selector." },
                ]}
              />
            </div>
          </Card>
        </Section>

        <Section title="Accessibility">
          <Card>
            <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
              <li><strong>Phrase the title as a question.</strong> &ldquo;Delete workflow?&rdquo; reads better in a screen-reader than &ldquo;Delete confirmation&rdquo;.</li>
              <li><strong>Default focus on Cancel</strong> for destructive operations — Enter shouldn&rsquo;t accidentally destroy data.</li>
              <li><strong>Use type-to-confirm sparingly.</strong> Save it for catastrophic, irreversible actions — overuse trains users to ignore the friction.</li>
              <li><strong>Don&rsquo;t auto-close on confirm.</strong> Keep the modal open with a spinner while the operation is in flight; close it only on success / error.</li>
            </ul>
          </Card>
        </Section>
      </FoundationPage>
    );
  },
};
