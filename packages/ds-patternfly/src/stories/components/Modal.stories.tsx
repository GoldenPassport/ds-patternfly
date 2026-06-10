import type { Meta, StoryObj } from "@storybook/react-vite";
import { FoundationPage, Section, Card, CodeBlock, Example, ThemingPointer } from "../_kit/StoryKit.js";
import { PropsTable } from "../_kit/DemoKit.js";
import {
  Basic,
  Destructive,
  CustomTitleIcon,
  WithDescription,
  WithForm,
  WithHelp,
  CustomInitialFocus,
  TopAligned,
  CustomWidth,
  BodyOnly,
} from "../../examples/components/Modal.example.js";
import modalExampleSrc from "../../examples/components/Modal.example.tsx?raw";

const meta: Meta = {
  title: "Components/Modal",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
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
          <Example
            source={modalExampleSrc}
            region="Basic"
            fileName="Modal.example.tsx"
          >
            <Basic />
          </Example>
        </Card>
      </Section>

      <Section
        title="Destructive (with title icon)"
        description="Pair a danger primary with a clear cancel. titleIconVariant supports info | warning | danger | success."
      >
        <Card>
          <Example
            source={modalExampleSrc}
            region="Destructive"
            fileName="Modal.example.tsx"
          >
            <Destructive />
          </Example>
        </Card>
      </Section>

      <Section
        title="Custom title icon"
        description="titleIconVariant accepts not just the four string presets but any React component — handy for product-specific announcement / notification icons."
      >
        <Card>
          <Example
            source={modalExampleSrc}
            region="CustomTitleIcon"
            fileName="Modal.example.tsx"
          >
            <CustomTitleIcon />
          </Example>
        </Card>
      </Section>

      <Section
        title="With description"
        description="ModalHeader.description renders static text below the title that does not scroll with the body. Pair descriptorId with the modal's aria-describedby."
      >
        <Card>
          <Example
            source={modalExampleSrc}
            region="WithDescription"
            fileName="Modal.example.tsx"
          >
            <WithDescription />
          </Example>
        </Card>
      </Section>

      <Section
        title="With form"
        description="Wrap the body in <Form id={...}> and tie the footer's primary Button via form={id} so Enter inside any field submits. Per-field labelHelp wires a Popover trigger via FormGroupLabelHelp + ref — the canonical pattern for inline field guidance."
      >
        <Card>
          <Example
            source={modalExampleSrc}
            region="WithForm"
            fileName="Modal.example.tsx"
          >
            <WithForm />
          </Example>
        </Card>
      </Section>

      <Section
        title="With help (header help-icon popover)"
        description="ModalHeader.help slots a help-icon-button into the header's trailing edge. Wrap it in a Popover for contextual guidance the user can dismiss without leaving the modal."
      >
        <Card>
          <Example
            source={modalExampleSrc}
            region="WithHelp"
            fileName="Modal.example.tsx"
          >
            <WithHelp />
          </Example>
        </Card>
      </Section>

      <Section
        title="Custom initial focus"
        description="elementToFocus directs focus to a specific control on open instead of PF6's default first-focusable. Use this to land on the safe action for destructive confirmations (Cancel, not Delete) or the first input in a form."
      >
        <Card>
          <Example
            source={modalExampleSrc}
            region="CustomInitialFocus"
            fileName="Modal.example.tsx"
          >
            <CustomInitialFocus />
          </Example>
        </Card>
      </Section>

      <Section
        title="Top-aligned"
        description="position='top' anchors the modal near the top of the viewport instead of vertical centring. Useful for tall forms (so the first field doesn't drop below the fold on small viewports) and for confirmations triggered from controls near the top of the page."
      >
        <Card>
          <Example
            source={modalExampleSrc}
            region="TopAligned"
            fileName="Modal.example.tsx"
          >
            <TopAligned />
          </Example>
        </Card>
      </Section>

      <Section
        title="Custom width"
        description="Pass an explicit width string to override the variant preset. Use sparingly — match a real layout constraint, not a design whim."
      >
        <Card>
          <Example
            source={modalExampleSrc}
            region="CustomWidth"
            fileName="Modal.example.tsx"
          >
            <CustomWidth />
          </Example>
        </Card>
      </Section>

      <Section
        title="No header / no footer"
        description="Body-only modal. With no ModalHeader, name the modal via aria-label directly on Modal."
      >
        <Card>
          <Example
            source={modalExampleSrc}
            region="BodyOnly"
            fileName="Modal.example.tsx"
          >
            <BodyOnly />
          </Example>
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

      <Section
        title="Full example"
        description="The complete example file behind the demos above — every section composed, ready to drop into an app. The same file ships in the MCP docs catalog."
      >
        <Card>
          <Example source={modalExampleSrc} fileName="Modal.example.tsx" />
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
      <ThemingPointer
        intro="Modal padding, radius, and elevation are brand-root dials. (PF6 names this component Modal; the rendered element carries role='dialog'.)"
        dials={[
          ["--gp-pad-modal", "Body padding (block + inline)."],
          ["--gp-radius-card", "Corner radius (shared with Card)."],
          ["--gp-shadow-modal", "Drop shadow."],
          ["--gp-surface-elevated", "Modal box background."],
        ]}
      />
    </FoundationPage>
  ),
};
