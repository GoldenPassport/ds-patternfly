/**
 * Button — the action primitive. Triggers a discrete operation.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useId, useState, type CSSProperties } from "react";
import { Button, FormSelect, FormSelectOption } from "../_lib.js";
import {
  CogIcon,
  EllipsisVIcon,
  PencilAltIcon,
  PlusIcon,
  TimesIcon,
  TrashIcon,
} from "@patternfly/react-icons";

const VARIANTS = ["primary", "secondary", "tertiary", "danger", "warning", "link", "plain"] as const;

/**
 * Border-radius presets used by the configurable demo below. PF6 ships
 * no `shape` prop on Button, so the override lands as an inline style
 * (the value applies to text + icon-only buttons alike).
 */
const RADIUS_PRESETS = {
  none:    { label: "None (0)",                value: "0" },
  default: { label: "Default (brand dial)",    value: "var(--gp-radius-control, var(--pf-v6-c-button--BorderRadius))" },
  rounded: { label: "Rounded (8px)",           value: "8px" },
  strong:  { label: "Strong (12px)",           value: "12px" },
  pill:    { label: "Pill (999px)",            value: "999px" },
} as const;
type RadiusKey = keyof typeof RADIUS_PRESETS;

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
  // Icon-only with background / border, rendered circular. PF6 ships no
  // `circular` variant on Button, so override inline: `border-radius: 50%`,
  // `aspect-ratio: 1`, and zero inline padding so the icon centres in a
  // square.
  const round: CSSProperties = {
    borderRadius: "50%",
    aspectRatio: "1",
    paddingInline: 0,
  };

  return (
    <div style={{ display: "grid", gap: 16 }}>
      {/* Icon + text — the common CTA pattern. icon prop puts the glyph on
          the leading edge; pass `iconPosition` to swap it to the trailing
          edge. */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
        <Button variant="primary" icon={<PlusIcon />}>
          Add resource
        </Button>
        <Button variant="secondary" icon={<PencilAltIcon />}>
          Edit
        </Button>
        <Button variant="danger" icon={<TrashIcon />}>
          Delete
        </Button>
      </div>
      {/* Icon-only with background / border, rendered circular. */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
        <Button variant="primary"   aria-label="Add resource" icon={<PlusIcon />}       style={round} />
        <Button variant="secondary" aria-label="Edit"         icon={<PencilAltIcon />} style={round} />
        <Button variant="tertiary"  aria-label="Settings"     icon={<CogIcon />}       style={round} />
        <Button variant="danger"    aria-label="Delete"       icon={<TrashIcon />}     style={round} />
      </div>
      {/* Icon-only plain buttons — the canonical toolbar / table-row
          pattern. The icon goes in `icon`, NOT as children; that triggers
          PF6's icon-only sizing. */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
        <Button variant="plain" aria-label="Edit" icon={<PencilAltIcon />} />
        <Button variant="plain" aria-label="Settings" icon={<CogIcon />} />
        <Button variant="plain" aria-label="Delete" icon={<TrashIcon />} />
        <Button variant="plain" aria-label="More actions" icon={<EllipsisVIcon />} />
        <Button variant="plain" aria-label="Close" icon={<TimesIcon />} />
      </div>
      {/* PF6 `isSettings` shorthand bakes in the cog icon but does NOT
          inject an aria-label — still your job. */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
        <Button variant="plain" isSettings aria-label="Settings" />
      </div>
    </div>
  );
}
// #endregion

// #region BorderRadius
export function BorderRadius() {
  const selectId = useId();
  const [shape, setShape] = useState<RadiusKey>("default");
  const radius = RADIUS_PRESETS[shape].value;
  const textStyle: CSSProperties = { borderRadius: radius };
  // Icon-only buttons need a square aspect so the chosen radius reads
  // as a true circle / pill instead of an ellipse.
  const iconOnlyStyle: CSSProperties = {
    borderRadius: radius,
    aspectRatio: "1",
    paddingInline: 0,
  };
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <label style={{ display: "grid", gap: 4, fontSize: 13, maxWidth: 240 }}>
        Shape
        <FormSelect
          id={`${selectId}-shape`}
          value={shape}
          onChange={(_e, v) => setShape(v as RadiusKey)}
          aria-label="Border radius preset"
        >
          {(Object.keys(RADIUS_PRESETS) as RadiusKey[]).map((k) => (
            <FormSelectOption key={k} value={k} label={RADIUS_PRESETS[k].label} />
          ))}
        </FormSelect>
      </label>
      <div style={{ display: "grid", gap: 12 }}>
        {/* Text buttons */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
          <Button variant="primary"   style={textStyle}>Primary</Button>
          <Button variant="secondary" style={textStyle}>Secondary</Button>
          <Button variant="tertiary"  style={textStyle}>Tertiary</Button>
          <Button variant="danger"    style={textStyle}>Danger</Button>
        </div>
        {/* Icon + text */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
          <Button variant="primary" icon={<PlusIcon />}      style={textStyle}>Add</Button>
          <Button variant="secondary" icon={<PencilAltIcon />} style={textStyle}>Edit</Button>
          <Button variant="danger" icon={<TrashIcon />}     style={textStyle}>Delete</Button>
        </div>
        {/* Icon-only variants (square aspect, has background/border) */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
          <Button variant="primary"   aria-label="Add"      icon={<PlusIcon />}       style={iconOnlyStyle} />
          <Button variant="secondary" aria-label="Edit"     icon={<PencilAltIcon />} style={iconOnlyStyle} />
          <Button variant="tertiary"  aria-label="Settings" icon={<CogIcon />}       style={iconOnlyStyle} />
          <Button variant="danger"    aria-label="Delete"   icon={<TrashIcon />}     style={iconOnlyStyle} />
        </div>
        {/* Icon-only plain — the radius shows on hover/focus backgrounds
            (PF6 paints a hover halo behind the glyph). */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
          <Button variant="plain" aria-label="Edit"         icon={<PencilAltIcon />} style={iconOnlyStyle} />
          <Button variant="plain" aria-label="Settings"     icon={<CogIcon />}       style={iconOnlyStyle} />
          <Button variant="plain" aria-label="Delete"       icon={<TrashIcon />}     style={iconOnlyStyle} />
          <Button variant="plain" aria-label="More actions" icon={<EllipsisVIcon />} style={iconOnlyStyle} />
          <Button variant="plain" aria-label="Close"        icon={<TimesIcon />}     style={iconOnlyStyle} />
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
      <BorderRadius />
    </div>
  );
}
