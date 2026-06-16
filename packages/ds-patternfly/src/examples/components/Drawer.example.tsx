/**
 * Drawer — a side panel that slides in to reveal contextual content,
 * pushing the main content rather than overlaying it.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { Fragment, useId, useRef, useState } from "react";
import {
  Button,
  Drawer,
  DrawerActions,
  DrawerCloseButton,
  DrawerContent,
  DrawerContentBody,
  DrawerHead,
  DrawerPanelBody,
  DrawerPanelContent,
  DrawerPanelDescription,
  Title,
} from "@golden-passport/ds-patternfly";

const lorem =
  "Detail content goes here. The drawer pushes the main panel instead of overlaying it — main content stays interactive while the drawer is open.";

// #region Basic
export function Basic() {
  const [open, setOpen] = useState(false);
  const focusRef = useRef<HTMLSpanElement>(null);
  const onExpand = () => focusRef.current?.focus();

  const panel = (
    <DrawerPanelContent>
      <DrawerHead>
        <span tabIndex={open ? 0 : -1} ref={focusRef}>
          <Title headingLevel="h2" size="lg">Task details</Title>
        </span>
        <DrawerActions>
          <DrawerCloseButton onClick={() => setOpen(false)} />
        </DrawerActions>
      </DrawerHead>
      <DrawerPanelDescription>
        Detail of the selected task — push-pattern panel.
      </DrawerPanelDescription>
      <DrawerPanelBody>{lorem}</DrawerPanelBody>
    </DrawerPanelContent>
  );

  return (
    <Fragment>
      <Button
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        ouiaId="ToggleBasicDrawer"
      >
        {open ? "Close drawer" : "Open drawer"}
      </Button>
      <Drawer isExpanded={open} onExpand={onExpand}>
        <DrawerContent panelContent={panel}>
          <DrawerContentBody>
            <div style={{ padding: 24, color: "var(--gp-color-text-subtle)" }}>
              Main content stays interactive while the drawer is
              open.
            </div>
          </DrawerContentBody>
        </DrawerContent>
      </Drawer>
    </Fragment>
  );
}
// #endregion

// #region Inline
export function Inline() {
  const [inlineOpen, setInlineOpen] = useState(false);
  const inlineRef = useRef<HTMLSpanElement>(null);

  const inlinePanel = (
    <DrawerPanelContent>
      <DrawerHead>
        <span tabIndex={inlineOpen ? 0 : -1} ref={inlineRef}>
          Inline panel
        </span>
        <DrawerActions>
          <DrawerCloseButton onClick={() => setInlineOpen(false)} />
        </DrawerActions>
      </DrawerHead>
      <DrawerPanelBody>
        Inline drawers participate in document flow — they push the main
        area sideways without absolute positioning.
      </DrawerPanelBody>
    </DrawerPanelContent>
  );

  return (
    <Fragment>
      <Button
        aria-expanded={inlineOpen}
        onClick={() => setInlineOpen((v) => !v)}
        ouiaId="ToggleInlineDrawer"
      >
        {inlineOpen ? "Close inline" : "Open inline"}
      </Button>
      <Drawer
        isExpanded={inlineOpen}
        isInline
        onExpand={() => inlineRef.current?.focus()}
      >
        <DrawerContent panelContent={inlinePanel}>
          <DrawerContentBody>
            <div style={{ padding: 24, color: "var(--gp-color-text-subtle)" }}>
              Main content shifts as the inline panel opens.
            </div>
          </DrawerContentBody>
        </DrawerContent>
      </Drawer>
    </Fragment>
  );
}
// #endregion

// #region Resizable
export function Resizable() {
  const id = useId();
  const [resizeOpen, setResizeOpen] = useState(false);
  const resizeRef = useRef<HTMLSpanElement>(null);

  const resizePanel = (
    <DrawerPanelContent
      isResizable
      defaultSize="320px"
      minSize="200px"
      id={`${id}-resize-panel`}
    >
      <DrawerHead>
        <span tabIndex={resizeOpen ? 0 : -1} ref={resizeRef}>
          Resizable panel
        </span>
        <DrawerActions>
          <DrawerCloseButton onClick={() => setResizeOpen(false)} />
        </DrawerActions>
      </DrawerHead>
      <DrawerPanelBody>
        Drag the edge to resize. <code>defaultSize</code> /{" "}
        <code>minSize</code> bound the range.
      </DrawerPanelBody>
    </DrawerPanelContent>
  );

  return (
    <Fragment>
      <Button
        aria-expanded={resizeOpen}
        onClick={() => setResizeOpen((v) => !v)}
        ouiaId="ToggleResizableDrawer"
      >
        {resizeOpen ? "Close resizable" : "Open resizable"}
      </Button>
      <Drawer
        isExpanded={resizeOpen}
        onExpand={() => resizeRef.current?.focus()}
      >
        <DrawerContent panelContent={resizePanel}>
          <DrawerContentBody>
            <div style={{ padding: 24, color: "var(--gp-color-text-subtle)" }}>
              Drag the panel&rsquo;s leading edge to resize.
            </div>
          </DrawerContentBody>
        </DrawerContent>
      </Drawer>
    </Fragment>
  );
}
// #endregion

// #region FocusTrap
export function FocusTrap() {
  const [trapOpen, setTrapOpen] = useState(false);
  const onEscape = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") setTrapOpen(false);
  };

  const trapPanel = (
    <DrawerPanelContent focusTrap={{ enabled: true }}>
      <DrawerHead>
        <Title headingLevel="h2" size="lg">Focus-trapped panel</Title>
        <DrawerActions>
          <DrawerCloseButton onClick={() => setTrapOpen(false)} />
        </DrawerActions>
      </DrawerHead>
      <DrawerPanelBody>
        Tab is trapped inside the panel — useful when the drawer holds a
        form. Press Escape to close.
      </DrawerPanelBody>
    </DrawerPanelContent>
  );

  return (
    <Fragment>
      <Button
        aria-expanded={trapOpen}
        onClick={() => setTrapOpen((v) => !v)}
        ouiaId="ToggleFocusTrapDrawer"
      >
        {trapOpen ? "Close trapped" : "Open trapped"}
      </Button>
      <Drawer onKeyDown={onEscape} isExpanded={trapOpen}>
        <DrawerContent panelContent={trapPanel}>
          <DrawerContentBody>
            <div style={{ padding: 24, color: "var(--gp-color-text-subtle)" }}>
              Tab cycles inside the panel while open.
            </div>
          </DrawerContentBody>
        </DrawerContent>
      </Drawer>
    </Fragment>
  );
}
// #endregion

// #region BottomAnchored
export function BottomAnchored() {
  const [bottomOpen, setBottomOpen] = useState(false);

  const bottomPanel = (
    <DrawerPanelContent>
      <DrawerHead>
        <Title headingLevel="h2" size="lg">Activity</Title>
        <DrawerActions>
          <DrawerCloseButton onClick={() => setBottomOpen(false)} />
        </DrawerActions>
      </DrawerHead>
      <DrawerPanelBody>
        Bottom-anchored drawers work well for activity feeds, logs, or
        consoles.
      </DrawerPanelBody>
    </DrawerPanelContent>
  );

  return (
    <Fragment>
      <Button
        aria-expanded={bottomOpen}
        onClick={() => setBottomOpen((v) => !v)}
        ouiaId="ToggleBottomDrawer"
      >
        {bottomOpen ? "Hide activity" : "Show activity"}
      </Button>
      <Drawer isExpanded={bottomOpen} position="bottom">
        <DrawerContent panelContent={bottomPanel}>
          <DrawerContentBody>
            <div style={{ padding: 24 }} />
          </DrawerContentBody>
        </DrawerContent>
      </Drawer>
    </Fragment>
  );
}
// #endregion

export default function DrawerExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <div style={{ minHeight: 260 }}><Basic /></div>
      <div style={{ minHeight: 260 }}><Inline /></div>
      <div style={{ minHeight: 280 }}><Resizable /></div>
      <div style={{ minHeight: 260 }}><FocusTrap /></div>
      <div style={{ minHeight: 300 }}><BottomAnchored /></div>
    </div>
  );
}
