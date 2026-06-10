/**
 * DS TextArea — PatternFly 6 TextArea under the Golden Passport dials.
 * Thin wrapper: the dial CSS (src/styles) already brands it; add DS
 * defaults here when the design system diverges from stock PF6.
 * Ref-forwarding: focus management (inline edit, form errors) needs the
 * underlying textarea element.
 */
import { forwardRef } from "react";
import { TextArea as PFTextArea } from "@patternfly/react-core";
import type { ComponentPropsWithoutRef, ComponentRef } from "react";

export type TextAreaProps = ComponentPropsWithoutRef<typeof PFTextArea>;

export const TextArea = forwardRef<
  ComponentRef<typeof PFTextArea>,
  TextAreaProps
>(function TextArea(props, ref) {
  return <PFTextArea ref={ref} {...props} />;
});
