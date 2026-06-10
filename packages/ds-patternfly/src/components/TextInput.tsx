/**
 * DS TextInput — PatternFly 6 TextInput under the Golden Passport dials.
 * Thin wrapper: the dial CSS (src/styles) already brands it; add DS
 * defaults here when the design system diverges from stock PF6.
 * Ref-forwarding: focus management (inline edit, form errors) needs the
 * underlying input element.
 */
import { forwardRef } from "react";
import { TextInput as PFTextInput } from "@patternfly/react-core";
import type { ComponentPropsWithoutRef, ComponentRef } from "react";

export type TextInputProps = ComponentPropsWithoutRef<typeof PFTextInput>;

export const TextInput = forwardRef<
  ComponentRef<typeof PFTextInput>,
  TextInputProps
>(function TextInput(props, ref) {
  return <PFTextInput ref={ref} {...props} />;
});
