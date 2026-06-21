/**
 * Button — the action primitive. The base Button covers variants / states /
 * icons; the exported ActionButton adds a `shape` prop (rounded / pill /
 * circle …) that owns the border-radius and the icon-only squaring, so a
 * circular icon button is one prop, not a hand-rolled inline style.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useId, useState } from "react";
import {
  ActionButton,
  Button,
  FormSelect,
  FormSelectOption,
  type ButtonShape,
} from "@golden-passport/ds-patternfly";
import {
  CogIcon,
  EllipsisVIcon,
  PencilAltIcon,
  PlusIcon,
  TimesIcon,
  TrashIcon,
} from "@patternfly/react-icons";

const VARIANTS = ["primary", "secondary", "tertiary", "danger", "warning", "link", "plain"] as const;

const SHAPES: { value: ButtonShape; label: string }[] = [
  { value: "square", label: "None (square)" },
  { value: "default", label: "Default (brand dial)" },
  { value: "rounded", label: "Rounded (8px)" },
  { value: "strong", label: "Strong (12px)" },
  { value: "pill", label: "Pill" },
];

// #region Variants
export function Variants() {
  return (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      {VARIANTS.map((v) => (
        <Button key={v} variant={v}>
          {v}
        </Button>
      ))}
    </div>
  );
}
// #endregion

// #region States
export function States() {
  return (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
      <Button>Default</Button>
      <Button isDisabled>Disabled</Button>
      <Button isAriaDisabled>aria-disabled</Button>
      <Button isLoading spinnerAriaLabel="Saving">
        Loading
      </Button>
      <Button isBlock>Block (full width)</Button>
    </div>
  );
}
// #endregion

// #region IconButtons
export function IconButtons() {
  return (
    <div style={{ display: "grid", gap: 16 }}>
      {/* Icon + text — the common CTA pattern. */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
        <Button variant="primary" icon={<PlusIcon />}>Add resource</Button>
        <Button variant="secondary" icon={<PencilAltIcon />}>Edit</Button>
        <Button variant="danger" icon={<TrashIcon />}>Delete</Button>
      </div>
      {/* Icon-only, circular — shape="circle" owns the radius + square box. */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
        <ActionButton shape="circle" variant="primary" aria-label="Add resource" icon={<PlusIcon />} />
        <ActionButton shape="circle" variant="secondary" aria-label="Edit" icon={<PencilAltIcon />} />
        <ActionButton shape="circle" variant="tertiary" aria-label="Settings" icon={<CogIcon />} />
        <ActionButton shape="circle" variant="danger" aria-label="Delete" icon={<TrashIcon />} />
      </div>
      {/* Icon-only plain — toolbar / table-row pattern. The icon goes in `icon`. */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
        <Button variant="plain" aria-label="Edit" icon={<PencilAltIcon />} />
        <Button variant="plain" aria-label="Settings" icon={<CogIcon />} />
        <Button variant="plain" aria-label="Delete" icon={<TrashIcon />} />
        <Button variant="plain" aria-label="More actions" icon={<EllipsisVIcon />} />
        <Button variant="plain" aria-label="Close" icon={<TimesIcon />} />
      </div>
    </div>
  );
}
// #endregion

// #region Shape
export function Shape() {
  const selectId = useId();
  const [shape, setShape] = useState<ButtonShape>("default");
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <label style={{ display: "grid", gap: 4, fontSize: 13, maxWidth: 240 }}>
        Shape
        <FormSelect
          id={`${selectId}-shape`}
          value={shape}
          onChange={(_e, v) => setShape(v as ButtonShape)}
          aria-label="Button shape"
        >
          {SHAPES.map((s) => (
            <FormSelectOption key={s.value} value={s.value} label={s.label} />
          ))}
        </FormSelect>
      </label>
      <div style={{ display: "grid", gap: 12 }}>
        {/* Text buttons */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
          <ActionButton shape={shape} variant="primary">Primary</ActionButton>
          <ActionButton shape={shape} variant="secondary">Secondary</ActionButton>
          <ActionButton shape={shape} variant="tertiary">Tertiary</ActionButton>
          <ActionButton shape={shape} variant="danger">Danger</ActionButton>
        </div>
        {/* Icon + text */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
          <ActionButton shape={shape} variant="primary" icon={<PlusIcon />}>Add</ActionButton>
          <ActionButton shape={shape} variant="secondary" icon={<PencilAltIcon />}>Edit</ActionButton>
          <ActionButton shape={shape} variant="danger" icon={<TrashIcon />}>Delete</ActionButton>
        </div>
        {/* Icon-only — the component squares the box so the shape reads true. */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
          <ActionButton shape={shape} variant="primary" aria-label="Add" icon={<PlusIcon />} />
          <ActionButton shape={shape} variant="secondary" aria-label="Edit" icon={<PencilAltIcon />} />
          <ActionButton shape={shape} variant="tertiary" aria-label="Settings" icon={<CogIcon />} />
          <ActionButton shape={shape} variant="plain" aria-label="More actions" icon={<EllipsisVIcon />} />
        </div>
      </div>
    </div>
  );
}
// #endregion

export default function ButtonExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <Variants />
      <States />
      <IconButtons />
      <Shape />
    </div>
  );
}
