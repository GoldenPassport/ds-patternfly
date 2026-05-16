import { Fragment, useRef, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Button,
  Form,
  FormGroup,
  FormGroupLabelHelp,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalVariant,
  Popover,
  TextInput,
} from "@patternfly/react-core";
import { BellIcon, HelpIcon } from "@patternfly/react-icons";
import { FoundationPage, Section, Card, CodeBlock } from "../_storyKit.js";
import { DemoFrame, PropsTable } from "../_demoKit.js";

const meta: Meta = {
  title: "Components/Modal",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => {
    const [basicOpen, setBasicOpen] = useState(false);
    const [destroyOpen, setDestroyOpen] = useState(false);
    const [descOpen, setDescOpen] = useState(false);
    const [widthOpen, setWidthOpen] = useState(false);
    const [bareOpen, setBareOpen] = useState(false);
    const [formOpen, setFormOpen] = useState(false);
    const [helpOpen, setHelpOpen] = useState(false);
    const [focusOpen, setFocusOpen] = useState(false);
    const [topOpen, setTopOpen] = useState(false);
    const [iconOpen, setIconOpen] = useState(false);

    // Form state
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const nameHelpRef = useRef<HTMLButtonElement>(null);

    return (
      <FoundationPage
        title="Modal"
        intro={
          <>
            A blocking overlay that demands attention. Use for confirmations,
            destructive actions, focused tasks, and errors that require a
            response. For non-blocking contextual content, use{" "}
            <code>Drawer</code> or <code>Popover</code> instead.
          </>
        }
      >
        <Section title="Basic">
          <Card>
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <DemoFrame>
                <Fragment>
                  <Button
                    variant="primary"
                    onClick={() => setBasicOpen(true)}
                    ouiaId="ShowBasicModal"
                  >
                    Show basic modal
                  </Button>
                  <Modal
                    isOpen={basicOpen}
                    onClose={() => setBasicOpen(false)}
                    ouiaId="BasicModal"
                    aria-labelledby="basic-modal-title"
                    aria-describedby="basic-modal-body"
                  >
                    <ModalHeader title="Invite teammate" labelId="basic-modal-title" />
                    <ModalBody id="basic-modal-body">
                      They&rsquo;ll get an email with a link to join the
                      workspace. You can revoke access at any time from
                      Settings.
                    </ModalBody>
                    <ModalFooter>
                      <Button key="confirm" variant="primary" onClick={() => setBasicOpen(false)}>
                        Send invite
                      </Button>
                      <Button key="cancel" variant="link" onClick={() => setBasicOpen(false)}>
                        Cancel
                      </Button>
                    </ModalFooter>
                  </Modal>
                </Fragment>
              </DemoFrame>
              <CodeBlock>{`<Button variant="primary" onClick={open} ouiaId="ShowBasicModal">
  Show basic modal
</Button>
<Modal
  isOpen={isOpen}
  onClose={close}
  ouiaId="BasicModal"
  aria-labelledby="basic-modal-title"
  aria-describedby="basic-modal-body"
>
  <ModalHeader title="Invite teammate" labelId="basic-modal-title" />
  <ModalBody id="basic-modal-body">...</ModalBody>
  <ModalFooter>
    <Button key="confirm" variant="primary" onClick={onConfirm}>Send invite</Button>
    <Button key="cancel" variant="link" onClick={close}>Cancel</Button>
  </ModalFooter>
</Modal>`}</CodeBlock>
            </div>
          </Card>
        </Section>

        <Section
          title="Destructive (with title icon)"
          description="Pair a danger primary with a clear cancel. titleIconVariant supports info | warning | danger | success."
        >
          <Card>
            <div style={{ padding: 24 }}>
              <DemoFrame>
                <Fragment>
                  <Button variant="danger" onClick={() => setDestroyOpen(true)} ouiaId="ShowDestructiveModal">
                    Delete project
                  </Button>
                  <Modal
                    variant={ModalVariant.small}
                    isOpen={destroyOpen}
                    onClose={() => setDestroyOpen(false)}
                    ouiaId="DestructiveModal"
                    aria-labelledby="destroy-title"
                  >
                    <ModalHeader
                      title="Delete project?"
                      titleIconVariant="danger"
                      labelId="destroy-title"
                    />
                    <ModalBody>
                      This permanently deletes <strong>Onboarding flow</strong>{" "}
                      and all its tasks. This action cannot be undone.
                    </ModalBody>
                    <ModalFooter>
                      <Button key="delete" variant="danger" onClick={() => setDestroyOpen(false)}>
                        Delete project
                      </Button>
                      <Button key="cancel" variant="link" onClick={() => setDestroyOpen(false)}>
                        Cancel
                      </Button>
                    </ModalFooter>
                  </Modal>
                </Fragment>
              </DemoFrame>
            </div>
          </Card>
        </Section>

        <Section
          title="Custom title icon"
          description="titleIconVariant accepts not just the four string presets but any React component — handy for product-specific announcement / notification icons."
        >
          <Card>
            <div style={{ padding: 24 }}>
              <DemoFrame>
                <Fragment>
                  <Button variant="primary" onClick={() => setIconOpen(true)} ouiaId="ShowCustomIconModal">
                    Show custom title icon modal
                  </Button>
                  <Modal
                    isOpen={iconOpen}
                    onClose={() => setIconOpen(false)}
                    ouiaId="CustomIconModal"
                    aria-labelledby="icon-modal-title"
                  >
                    <ModalHeader
                      title="What's new in v2.4"
                      titleIconVariant={BellIcon}
                      labelId="icon-modal-title"
                    />
                    <ModalBody>
                      Pass any icon component as titleIconVariant — PF6 wires
                      the layout while you control the brand voice.
                    </ModalBody>
                    <ModalFooter>
                      <Button variant="primary" onClick={() => setIconOpen(false)}>Got it</Button>
                    </ModalFooter>
                  </Modal>
                </Fragment>
              </DemoFrame>
            </div>
          </Card>
        </Section>

        <Section
          title="With description"
          description="ModalHeader.description renders static text below the title that does not scroll with the body. Pair descriptorId with the modal's aria-describedby."
        >
          <Card>
            <div style={{ padding: 24 }}>
              <DemoFrame>
                <Fragment>
                  <Button variant="primary" onClick={() => setDescOpen(true)} ouiaId="ShowDescriptionModal">
                    Show modal with description
                  </Button>
                  <Modal
                    variant={ModalVariant.small}
                    isOpen={descOpen}
                    onClose={() => setDescOpen(false)}
                    ouiaId="DescriptionModal"
                    aria-labelledby="desc-modal-title"
                    aria-describedby="desc-modal-descriptor"
                  >
                    <ModalHeader
                      title="Modal with description"
                      labelId="desc-modal-title"
                      descriptorId="desc-modal-descriptor"
                      description="A description provides more context than a title can. It stays pinned below the title while the body scrolls."
                    />
                    <ModalBody>Body content goes here.</ModalBody>
                    <ModalFooter>
                      <Button key="ok" variant="primary" onClick={() => setDescOpen(false)}>Confirm</Button>
                      <Button key="cancel" variant="link" onClick={() => setDescOpen(false)}>Cancel</Button>
                    </ModalFooter>
                  </Modal>
                </Fragment>
              </DemoFrame>
            </div>
          </Card>
        </Section>

        <Section
          title="With form"
          description="Wrap the body in <Form id={...}> and tie the footer's primary Button via form={id} so Enter inside any field submits. Per-field labelHelp wires a Popover trigger via FormGroupLabelHelp + ref — the canonical pattern for inline field guidance."
        >
          <Card>
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <DemoFrame>
                <Fragment>
                  <Button variant="primary" onClick={() => setFormOpen(true)} ouiaId="ShowFormModal">
                    Show modal with form
                  </Button>
                  <Modal
                    variant={ModalVariant.small}
                    isOpen={formOpen}
                    onClose={() => setFormOpen(false)}
                    ouiaId="FormModal"
                    aria-labelledby="form-modal-title"
                  >
                    <ModalHeader
                      title="Create account"
                      description="Enter the user's details below."
                      labelId="form-modal-title"
                    />
                    <ModalBody>
                      <Form id="ds-modal-form">
                        <FormGroup
                          label="Name"
                          isRequired
                          fieldId="ds-modal-form-name"
                          labelHelp={
                            <Popover
                              triggerRef={nameHelpRef}
                              headerContent={<div>Name</div>}
                              bodyContent={
                                <div>
                                  Use the person&rsquo;s legal name as it
                                  appears on their ID.
                                </div>
                              }
                            >
                              <FormGroupLabelHelp
                                ref={nameHelpRef}
                                aria-label="More info for name field"
                              />
                            </Popover>
                          }
                        >
                          <TextInput
                            isRequired
                            type="text"
                            id="ds-modal-form-name"
                            name="ds-modal-form-name"
                            value={name}
                            onChange={(_, v) => setName(v)}
                          />
                        </FormGroup>
                        <FormGroup label="Email" isRequired fieldId="ds-modal-form-email">
                          <TextInput
                            isRequired
                            type="email"
                            id="ds-modal-form-email"
                            name="ds-modal-form-email"
                            value={email}
                            onChange={(_, v) => setEmail(v)}
                          />
                        </FormGroup>
                      </Form>
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        key="create"
                        variant="primary"
                        form="ds-modal-form"
                        type="submit"
                        onClick={(e) => {
                          e.preventDefault();
                          setFormOpen(false);
                        }}
                      >
                        Create account
                      </Button>
                      <Button key="cancel" variant="link" onClick={() => setFormOpen(false)}>
                        Cancel
                      </Button>
                    </ModalFooter>
                  </Modal>
                </Fragment>
              </DemoFrame>
              <CodeBlock>{`const nameHelpRef = useRef<HTMLButtonElement>(null);

<Modal aria-labelledby="form-modal-title" ...>
  <ModalHeader title="Create account" description="..." labelId="form-modal-title" />
  <ModalBody>
    <Form id="modal-form">
      <FormGroup
        label="Name"
        isRequired
        fieldId="modal-form-name"
        labelHelp={
          <Popover triggerRef={nameHelpRef} headerContent={<div>Name</div>} bodyContent={<div>...</div>}>
            <FormGroupLabelHelp ref={nameHelpRef} aria-label="More info for name field" />
          </Popover>
        }
      >
        <TextInput isRequired id="modal-form-name" value={name} onChange={(_, v) => setName(v)} />
      </FormGroup>
      {/* ...more fields... */}
    </Form>
  </ModalBody>
  <ModalFooter>
    {/* form={id} + type="submit" lets Enter inside any field submit */}
    <Button variant="primary" form="modal-form" type="submit" onClick={onSubmit}>
      Create account
    </Button>
    <Button variant="link" onClick={close}>Cancel</Button>
  </ModalFooter>
</Modal>`}</CodeBlock>
            </div>
          </Card>
        </Section>

        <Section
          title="With help (header help-icon popover)"
          description="ModalHeader.help slots a help-icon-button into the header's trailing edge. Wrap it in a Popover for contextual guidance the user can dismiss without leaving the modal."
        >
          <Card>
            <div style={{ padding: 24 }}>
              <DemoFrame>
                <Fragment>
                  <Button variant="primary" onClick={() => setHelpOpen(true)} ouiaId="ShowHelpModal">
                    Show modal with help
                  </Button>
                  <Modal
                    variant={ModalVariant.small}
                    isOpen={helpOpen}
                    onClose={() => setHelpOpen(false)}
                    ouiaId="HelpModal"
                    aria-labelledby="help-modal-title"
                  >
                    <ModalHeader
                      title="Schedule deployment"
                      labelId="help-modal-title"
                      help={
                        <Popover
                          headerContent={<div>About scheduling</div>}
                          bodyContent={
                            <div>
                              Deployments are queued and run in the order
                              they&rsquo;re scheduled. You can cancel a
                              deployment anytime before it starts.
                            </div>
                          }
                        >
                          <Button variant="plain" aria-label="Help" icon={<HelpIcon />} />
                        </Popover>
                      }
                    />
                    <ModalBody>
                      Pick a window for the next release.
                    </ModalBody>
                    <ModalFooter>
                      <Button variant="primary" onClick={() => setHelpOpen(false)}>Schedule</Button>
                      <Button variant="link" onClick={() => setHelpOpen(false)}>Cancel</Button>
                    </ModalFooter>
                  </Modal>
                </Fragment>
              </DemoFrame>
            </div>
          </Card>
        </Section>

        <Section
          title="Custom initial focus"
          description="elementToFocus directs focus to a specific control on open instead of PF6's default first-focusable. Use this to land on the safe action for destructive confirmations (Cancel, not Delete) or the first input in a form."
        >
          <Card>
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <DemoFrame>
                <Fragment>
                  <Button variant="primary" onClick={() => setFocusOpen(true)} ouiaId="ShowFocusModal">
                    Show modal with custom focus
                  </Button>
                  <Modal
                    elementToFocus="#ds-focus-cancel"
                    isOpen={focusOpen}
                    onClose={() => setFocusOpen(false)}
                    ouiaId="FocusModal"
                    aria-labelledby="focus-modal-title"
                  >
                    <ModalHeader
                      title="Discard draft?"
                      titleIconVariant="warning"
                      labelId="focus-modal-title"
                    />
                    <ModalBody>
                      Your unsaved changes will be lost. Focus lands on
                      Cancel — press Tab to reach Discard.
                    </ModalBody>
                    <ModalFooter>
                      <Button variant="danger" onClick={() => setFocusOpen(false)}>
                        Discard
                      </Button>
                      <Button id="ds-focus-cancel" variant="link" onClick={() => setFocusOpen(false)}>
                        Cancel
                      </Button>
                    </ModalFooter>
                  </Modal>
                </Fragment>
              </DemoFrame>
              <CodeBlock>{`<Modal elementToFocus="#confirm-cancel-button" ...>
  <ModalHeader title="Discard draft?" titleIconVariant="warning" />
  <ModalBody>...</ModalBody>
  <ModalFooter>
    <Button variant="danger" onClick={onDiscard}>Discard</Button>
    <Button id="confirm-cancel-button" variant="link" onClick={close}>Cancel</Button>
  </ModalFooter>
</Modal>

// elementToFocus also accepts an HTMLElement directly:
<Modal elementToFocus={inputRef.current} ...>`}</CodeBlock>
            </div>
          </Card>
        </Section>

        <Section
          title="Top-aligned"
          description="position='top' anchors the modal near the top of the viewport instead of vertical centring. Useful for tall forms (so the first field doesn't drop below the fold on small viewports) and for confirmations triggered from controls near the top of the page."
        >
          <Card>
            <div style={{ padding: 24 }}>
              <DemoFrame>
                <Fragment>
                  <Button variant="primary" onClick={() => setTopOpen(true)} ouiaId="ShowTopModal">
                    Show top-aligned modal
                  </Button>
                  <Modal
                    position="top"
                    isOpen={topOpen}
                    onClose={() => setTopOpen(false)}
                    ouiaId="TopModal"
                    aria-labelledby="top-modal-title"
                  >
                    <ModalHeader title="Top-aligned modal" labelId="top-modal-title" />
                    <ModalBody>
                      The dialog is anchored to the top of the viewport. Use
                      positionOffset to fine-tune (e.g. positionOffset=&quot;120px&quot;).
                    </ModalBody>
                    <ModalFooter>
                      <Button variant="primary" onClick={() => setTopOpen(false)}>Confirm</Button>
                      <Button variant="link" onClick={() => setTopOpen(false)}>Cancel</Button>
                    </ModalFooter>
                  </Modal>
                </Fragment>
              </DemoFrame>
            </div>
          </Card>
        </Section>

        <Section
          title="Custom width"
          description="Pass an explicit width string to override the variant preset. Use sparingly — match a real layout constraint, not a design whim."
        >
          <Card>
            <div style={{ padding: 24 }}>
              <DemoFrame>
                <Fragment>
                  <Button variant="primary" onClick={() => setWidthOpen(true)} ouiaId="ShowCustomWidthModal">
                    Show 50%-width modal
                  </Button>
                  <Modal
                    width="50%"
                    isOpen={widthOpen}
                    onClose={() => setWidthOpen(false)}
                    ouiaId="CustomWidthModal"
                    aria-labelledby="cw-modal-title"
                  >
                    <ModalHeader title="Custom width modal" labelId="cw-modal-title" />
                    <ModalBody>
                      The modal expands to 50% of the viewport regardless of
                      the chosen variant.
                    </ModalBody>
                    <ModalFooter>
                      <Button key="ok" variant="primary" onClick={() => setWidthOpen(false)}>Confirm</Button>
                      <Button key="cancel" variant="link" onClick={() => setWidthOpen(false)}>Cancel</Button>
                    </ModalFooter>
                  </Modal>
                </Fragment>
              </DemoFrame>
            </div>
          </Card>
        </Section>

        <Section
          title="No header / no footer"
          description="Body-only modal. With no ModalHeader, name the modal via aria-label directly on Modal."
        >
          <Card>
            <div style={{ padding: 24 }}>
              <DemoFrame>
                <Fragment>
                  <Button variant="primary" onClick={() => setBareOpen(true)} ouiaId="ShowBareModal">
                    Show body-only modal
                  </Button>
                  <Modal
                    variant={ModalVariant.large}
                    isOpen={bareOpen}
                    onClose={() => setBareOpen(false)}
                    ouiaId="BareModal"
                    aria-label="Body-only modal"
                    aria-describedby="bare-modal-body"
                  >
                    <ModalBody>
                      <span id="bare-modal-body">
                        When the modal has no visible title, supply{" "}
                        <code>aria-label</code> directly on Modal so screen
                        readers still announce a name.
                      </span>
                    </ModalBody>
                  </Modal>
                </Fragment>
              </DemoFrame>
            </div>
          </Card>
        </Section>

        <Section
          title="Custom header / footer"
          description="Pass children to ModalHeader (instead of the title prop) for non-standard heads — multi-line titles, branded chrome, layout you control. Same with ModalFooter."
        >
          <Card>
            <div style={{ padding: 24 }}>
              <CodeBlock>{`<Modal
  variant={ModalVariant.large}
  isOpen={isOpen}
  onClose={close}
  aria-labelledby="custom-header-title"
>
  <ModalHeader>
    <Content>
      <h1 id="custom-header-title">Custom header modal</h1>
      <p>When you need a multi-line title or layout the title prop can't express.</p>
    </Content>
  </ModalHeader>
  <ModalBody>...</ModalBody>
  <ModalFooter>
    {/* footer is fully custom — buttons, status text, anything */}
    <Title headingLevel="h4" size="md">
      <Flex spaceItems={{ default: "spaceItemsSm" }}>
        <WarningTriangleIcon />
        <span>Custom modal footer.</span>
      </Flex>
    </Title>
  </ModalFooter>
</Modal>`}</CodeBlock>
            </div>
          </Card>
        </Section>

        <Section
          title="Scrolling body"
          description="When body content overflows, set tabIndex={0} on ModalBody so keyboard users can Tab into it and arrow-scroll. Pair with aria-label — PF6 auto-applies role='region' when the label is present."
        >
          <Card>
            <div style={{ padding: 24 }}>
              <CodeBlock>{`<Modal isOpen={isOpen} onClose={close} aria-labelledby="scroll-modal-title">
  <ModalHeader title="Long content" labelId="scroll-modal-title" />
  <ModalBody
    tabIndex={0}
    aria-label="Scrollable modal content"
    id="scroll-modal-body"
  >
    {/* tall content — overflows the modal box and scrolls inside it */}
  </ModalBody>
  <ModalFooter>
    <Button variant="primary" onClick={close}>Done</Button>
  </ModalFooter>
</Modal>`}</CodeBlock>
            </div>
          </Card>
        </Section>

        <Section
          title="With wizard"
          description="Modal hosts the Wizard layout for multi-step flows — onboarding, complex create-resource forms, deployment pipelines. The wizard's own footer replaces ModalFooter; Modal just supplies the dialog chrome and focus trap."
        >
          <Card>
            <div style={{ padding: 24 }}>
              <CodeBlock>{`<Modal
  variant={ModalVariant.large}
  isOpen={isOpen}
  onClose={close}
  aria-label="Create deployment wizard"
>
  <Wizard
    title="Create deployment"
    onClose={close}
    onSave={handleSave}
  >
    <WizardStep name="Source"      id="wizard-source">{/* ... */}</WizardStep>
    <WizardStep name="Target"      id="wizard-target">{/* ... */}</WizardStep>
    <WizardStep name="Schedule"    id="wizard-schedule">{/* ... */}</WizardStep>
    <WizardStep name="Review"      id="wizard-review" footer={{ nextButtonText: "Deploy" }}>
      {/* summary */}
    </WizardStep>
  </Wizard>
</Modal>`}</CodeBlock>
            </div>
          </Card>
        </Section>

        <Section
          title="onEscapePress override"
          description="By default Escape calls onClose. Override onEscapePress to gate dismissal on form-dirty state, an unsaved-changes confirmation, or to do nothing (for wizard mid-step where Escape would lose progress)."
        >
          <Card>
            <div style={{ padding: 24 }}>
              <CodeBlock>{`<Modal
  isOpen={isOpen}
  onClose={close}
  onEscapePress={(event) => {
    if (formDirty) {
      // Show a confirm-discard dialog instead of closing.
      setDiscardConfirmOpen(true);
    } else {
      close(event);
    }
  }}
  aria-labelledby="modal-title"
>
  {/* ... */}
</Modal>`}</CodeBlock>
            </div>
          </Card>
        </Section>

        <Section title="Composition">
          <Card>
            <div style={{ padding: 24 }}>
              <PropsTable
                rows={[
                  { name: "Modal", type: "container", description: "The overlay + dialog. Owns isOpen, variant, focus trap, escape behaviour, position, and size." },
                  { name: "ModalHeader", type: "child", description: "Header with title, optional title icon (info / warning / danger / success / custom component), description, and help slot. Pair labelId with the modal's aria-labelledby; pair descriptorId with aria-describedby when description is set. Pass children to opt out of the title slot entirely." },
                  { name: "ModalBody", type: "child", description: "Scrolling content. tabIndex={0} + aria-label makes it a keyboard-scrollable region. Pair id with the modal's aria-describedby when no descriptorId is set on the header." },
                  { name: "ModalFooter", type: "child", description: "Trailing action row. Primary action first, cancel/dismiss last. Pass children directly to escape the buttons-only convention." },
                ]}
              />
            </div>
          </Card>
        </Section>

        <Section title="Most-used Modal props">
          <Card>
            <div style={{ padding: 24 }}>
              <PropsTable
                rows={[
                  { name: "isOpen", type: "boolean", description: "Open/closed. Controlled." },
                  { name: "onClose", type: "(event) => void", description: "Called by the X button, Escape key, and backdrop click." },
                  { name: "onEscapePress", type: "(event) => void", description: "Override default Escape handling — guard against discarding dirty form state, etc. When provided, replaces (does not augment) onClose for the Escape path." },
                  { name: "variant", type: '"small" | "medium" | "large" | "default"', description: "Width preset. Match the size of the task — confirmations are small, multi-step forms medium." },
                  { name: "width", type: "string | number", description: "Explicit width override (e.g. '50%', '700px'). Wins over variant." },
                  { name: "maxWidth", type: "string | number", description: "Cap the width — pair with width:'100%' for fluid up to a max." },
                  { name: "position", type: '"default" | "top"', description: "Default vertical-centres; top anchors near the viewport top (good for tall forms / above-the-fold confirmations)." },
                  { name: "positionOffset", type: "string", description: "Fine-tune the top offset (any CSS length). Only meaningful with position='top'." },
                  { name: "elementToFocus", type: "HTMLElement | string (selector)", description: "Where focus lands on open. Default first-focusable; override for safe-action focus on destructive confirmations or to skip past a non-essential first element." },
                  { name: "appendTo", type: "HTMLElement | () => HTMLElement", description: "Portal target. Defaults to document.body — change when nesting under a custom portal root." },
                  { name: "ouiaId", type: "string", description: "Stable test selector. Sets data-ouia-component-id on the modal box." },
                  { name: "aria-labelledby", type: "string", description: "Required when ModalHeader is present — points at ModalHeader.labelId." },
                  { name: "aria-label", type: "string", description: "Required when ModalHeader is absent — names the dialog directly." },
                  { name: "aria-describedby", type: "string", description: "Optional — points at ModalBody.id (or ModalHeader.descriptorId when description is set)." },
                  { name: "disableFocusTrap", type: "boolean", description: "Escape hatch — only use when nesting focus traps (rare)." },
                ]}
              />
            </div>
          </Card>
        </Section>

        <Section title="Most-used ModalHeader props">
          <Card>
            <div style={{ padding: 24 }}>
              <PropsTable
                rows={[
                  { name: "title", type: "ReactNode", description: "Visible title text. Ignored if children are passed." },
                  { name: "labelId", type: "string", description: "Id for the title element — pair with the modal's aria-labelledby." },
                  { name: "titleIconVariant", type: '"success" | "warning" | "danger" | "info" | "custom" | ComponentType', description: "Status-tinted icon before the title. Pass a React component (e.g. BellIcon) for fully custom glyphs." },
                  { name: "description", type: "ReactNode", description: "Static text under the title that doesn't scroll with the body." },
                  { name: "descriptorId", type: "string", description: "Id for the description element — pair with the modal's aria-describedby when description is set." },
                  { name: "help", type: "ReactNode", description: "Trailing help slot in the header. Wrap a Popover with a help-icon Button trigger." },
                  { name: "children", type: "ReactNode", description: "Pass to opt out of the title/description/icon slots and render a fully custom header." },
                ]}
              />
            </div>
          </Card>
        </Section>

        <Section title="Accessibility">
          <Card>
            <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
              <li><strong>Always name the dialog.</strong> ModalHeader + labelId/aria-labelledby for visible-title modals; aria-label on Modal for body-only ones.</li>
              <li><strong>Initial focus on the safe action</strong> for destructive confirmations — wire <code>elementToFocus</code> to the Cancel button id, not Delete.</li>
              <li><strong>Escape closes.</strong> Wired automatically. Override with <code>onEscapePress</code> only when the modal contains a multi-step form mid-progress (and offer an explicit dismiss path so users can still escape).</li>
              <li><strong>Focus trap is on by default.</strong> Tab cycles within the modal; Shift+Tab cycles backwards. Don&rsquo;t disable.</li>
              <li><strong>Restore focus on close.</strong> PF6 returns focus to the trigger automatically — preserve that by keeping the trigger mounted.</li>
              <li><strong>Scrollable bodies need <code>aria-label</code>.</strong> When ModalBody has <code>tabIndex=&#123;0&#125;</code> for keyboard scrolling, the label gives the region its accessible name.</li>
            </ul>
          </Card>
        </Section>
      </FoundationPage>
    );
  },
};
