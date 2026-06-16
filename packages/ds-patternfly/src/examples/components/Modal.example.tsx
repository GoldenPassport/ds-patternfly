/**
 * Modal — a blocking overlay that demands attention: confirmations,
 * destructive actions, focused tasks, errors that require a response.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { Fragment, useId, useRef, useState } from "react";
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
} from "@golden-passport/ds-patternfly";
import { BellIcon, HelpIcon } from "@patternfly/react-icons";

// #region Basic
export function Basic() {
  const id = useId();
  const [open, setOpen] = useState(false);
  return (
    <Fragment>
      <Button
        variant="primary"
        onClick={() => setOpen(true)}
        ouiaId="ShowBasicModal"
      >
        Show basic modal
      </Button>
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        ouiaId="BasicModal"
        aria-labelledby={`${id}-title`}
        aria-describedby={`${id}-body`}
      >
        <ModalHeader title="Invite teammate" labelId={`${id}-title`} />
        <ModalBody id={`${id}-body`}>
          They&rsquo;ll get an email with a link to join the workspace. You
          can revoke access at any time from Settings.
        </ModalBody>
        <ModalFooter>
          <Button key="confirm" variant="primary" onClick={() => setOpen(false)}>
            Send invite
          </Button>
          <Button key="cancel" variant="link" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
}
// #endregion

// #region Destructive
export function Destructive() {
  const id = useId();
  const [open, setOpen] = useState(false);
  return (
    <Fragment>
      <Button variant="danger" onClick={() => setOpen(true)} ouiaId="ShowDestructiveModal">
        Delete project
      </Button>
      <Modal
        variant={ModalVariant.small}
        isOpen={open}
        onClose={() => setOpen(false)}
        ouiaId="DestructiveModal"
        aria-labelledby={`${id}-title`}
      >
        <ModalHeader
          title="Delete project?"
          titleIconVariant="danger"
          labelId={`${id}-title`}
        />
        <ModalBody>
          This permanently deletes <strong>Onboarding flow</strong> and all
          its tasks. This action cannot be undone.
        </ModalBody>
        <ModalFooter>
          <Button key="delete" variant="danger" onClick={() => setOpen(false)}>
            Delete project
          </Button>
          <Button key="cancel" variant="link" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
}
// #endregion

// #region CustomTitleIcon
export function CustomTitleIcon() {
  const id = useId();
  const [open, setOpen] = useState(false);
  return (
    <Fragment>
      <Button variant="primary" onClick={() => setOpen(true)} ouiaId="ShowCustomIconModal">
        Show custom title icon modal
      </Button>
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        ouiaId="CustomIconModal"
        aria-labelledby={`${id}-title`}
      >
        <ModalHeader
          title="What's new in v2.4"
          titleIconVariant={BellIcon}
          labelId={`${id}-title`}
        />
        <ModalBody>
          Pass any icon component as titleIconVariant — PF6 wires the layout
          while you control the brand voice.
        </ModalBody>
        <ModalFooter>
          <Button variant="primary" onClick={() => setOpen(false)}>Got it</Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
}
// #endregion

// #region WithDescription
export function WithDescription() {
  const id = useId();
  const [open, setOpen] = useState(false);
  return (
    <Fragment>
      <Button variant="primary" onClick={() => setOpen(true)} ouiaId="ShowDescriptionModal">
        Show modal with description
      </Button>
      <Modal
        variant={ModalVariant.small}
        isOpen={open}
        onClose={() => setOpen(false)}
        ouiaId="DescriptionModal"
        aria-labelledby={`${id}-title`}
        aria-describedby={`${id}-descriptor`}
      >
        <ModalHeader
          title="Modal with description"
          labelId={`${id}-title`}
          descriptorId={`${id}-descriptor`}
          description="A description provides more context than a title can. It stays pinned below the title while the body scrolls."
        />
        <ModalBody>Body content goes here.</ModalBody>
        <ModalFooter>
          <Button key="ok" variant="primary" onClick={() => setOpen(false)}>Confirm</Button>
          <Button key="cancel" variant="link" onClick={() => setOpen(false)}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
}
// #endregion

// #region WithForm
export function WithForm() {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const nameHelpRef = useRef<HTMLButtonElement>(null);
  return (
    <Fragment>
      <Button variant="primary" onClick={() => setOpen(true)} ouiaId="ShowFormModal">
        Show modal with form
      </Button>
      <Modal
        variant={ModalVariant.small}
        isOpen={open}
        onClose={() => setOpen(false)}
        ouiaId="FormModal"
        aria-labelledby={`${id}-title`}
      >
        <ModalHeader
          title="Create account"
          description="Enter the user's details below."
          labelId={`${id}-title`}
        />
        <ModalBody>
          <Form id={`${id}-form`}>
            <FormGroup
              label="Name"
              isRequired
              fieldId={`${id}-name`}
              labelHelp={
                <Popover
                  triggerRef={nameHelpRef}
                  headerContent={<div>Name</div>}
                  bodyContent={
                    <div>
                      Use the person&rsquo;s legal name as it appears on
                      their ID.
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
                id={`${id}-name`}
                name={`${id}-name`}
                value={name}
                onChange={(_, v) => setName(v)}
              />
            </FormGroup>
            <FormGroup label="Email" isRequired fieldId={`${id}-email`}>
              <TextInput
                isRequired
                type="email"
                id={`${id}-email`}
                name={`${id}-email`}
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
            form={`${id}-form`}
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              setOpen(false);
            }}
          >
            Create account
          </Button>
          <Button key="cancel" variant="link" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
}
// #endregion

// #region WithHelp
export function WithHelp() {
  const id = useId();
  const [open, setOpen] = useState(false);
  return (
    <Fragment>
      <Button variant="primary" onClick={() => setOpen(true)} ouiaId="ShowHelpModal">
        Show modal with help
      </Button>
      <Modal
        variant={ModalVariant.small}
        isOpen={open}
        onClose={() => setOpen(false)}
        ouiaId="HelpModal"
        aria-labelledby={`${id}-title`}
      >
        <ModalHeader
          title="Schedule deployment"
          labelId={`${id}-title`}
          help={
            <Popover
              headerContent={<div>About scheduling</div>}
              bodyContent={
                <div>
                  Deployments are queued and run in the order they&rsquo;re
                  scheduled. You can cancel a deployment anytime before it
                  starts.
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
          <Button variant="primary" onClick={() => setOpen(false)}>Schedule</Button>
          <Button variant="link" onClick={() => setOpen(false)}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
}
// #endregion

// #region CustomInitialFocus
export function CustomInitialFocus() {
  const id = useId();
  const [open, setOpen] = useState(false);
  // elementToFocus takes a CSS selector (or an HTMLElement) — escape the
  // useId-derived id so the selector stays valid.
  const cancelId = `${id}-cancel`;
  return (
    <Fragment>
      <Button variant="primary" onClick={() => setOpen(true)} ouiaId="ShowFocusModal">
        Show modal with custom focus
      </Button>
      <Modal
        elementToFocus={`#${CSS.escape(cancelId)}`}
        isOpen={open}
        onClose={() => setOpen(false)}
        ouiaId="FocusModal"
        aria-labelledby={`${id}-title`}
      >
        <ModalHeader
          title="Discard draft?"
          titleIconVariant="warning"
          labelId={`${id}-title`}
        />
        <ModalBody>
          Your unsaved changes will be lost. Focus lands on Cancel — press
          Tab to reach Discard.
        </ModalBody>
        <ModalFooter>
          <Button variant="danger" onClick={() => setOpen(false)}>
            Discard
          </Button>
          <Button id={cancelId} variant="link" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
}
// #endregion

// #region TopAligned
export function TopAligned() {
  const id = useId();
  const [open, setOpen] = useState(false);
  return (
    <Fragment>
      <Button variant="primary" onClick={() => setOpen(true)} ouiaId="ShowTopModal">
        Show top-aligned modal
      </Button>
      <Modal
        position="top"
        isOpen={open}
        onClose={() => setOpen(false)}
        ouiaId="TopModal"
        aria-labelledby={`${id}-title`}
      >
        <ModalHeader title="Top-aligned modal" labelId={`${id}-title`} />
        <ModalBody>
          The dialog is anchored to the top of the viewport. Use
          positionOffset to fine-tune (e.g. positionOffset=&quot;120px&quot;).
        </ModalBody>
        <ModalFooter>
          <Button variant="primary" onClick={() => setOpen(false)}>Confirm</Button>
          <Button variant="link" onClick={() => setOpen(false)}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
}
// #endregion

// #region CustomWidth
export function CustomWidth() {
  const id = useId();
  const [open, setOpen] = useState(false);
  return (
    <Fragment>
      <Button variant="primary" onClick={() => setOpen(true)} ouiaId="ShowCustomWidthModal">
        Show 50%-width modal
      </Button>
      <Modal
        width="50%"
        isOpen={open}
        onClose={() => setOpen(false)}
        ouiaId="CustomWidthModal"
        aria-labelledby={`${id}-title`}
      >
        <ModalHeader title="Custom width modal" labelId={`${id}-title`} />
        <ModalBody>
          The modal expands to 50% of the viewport regardless of the chosen
          variant.
        </ModalBody>
        <ModalFooter>
          <Button key="ok" variant="primary" onClick={() => setOpen(false)}>Confirm</Button>
          <Button key="cancel" variant="link" onClick={() => setOpen(false)}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
}
// #endregion

// #region BodyOnly
export function BodyOnly() {
  const id = useId();
  const [open, setOpen] = useState(false);
  return (
    <Fragment>
      <Button variant="primary" onClick={() => setOpen(true)} ouiaId="ShowBareModal">
        Show body-only modal
      </Button>
      <Modal
        variant={ModalVariant.large}
        isOpen={open}
        onClose={() => setOpen(false)}
        ouiaId="BareModal"
        aria-label="Body-only modal"
        aria-describedby={`${id}-body`}
      >
        <ModalBody>
          <span id={`${id}-body`}>
            When the modal has no visible title, supply{" "}
            <code>aria-label</code> directly on Modal so screen readers
            still announce a name.
          </span>
        </ModalBody>
      </Modal>
    </Fragment>
  );
}
// #endregion

export default function ModalExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <Basic />
      <Destructive />
      <CustomTitleIcon />
      <WithDescription />
      <WithForm />
      <WithHelp />
      <CustomInitialFocus />
      <TopAligned />
      <CustomWidth />
      <BodyOnly />
    </div>
  );
}
