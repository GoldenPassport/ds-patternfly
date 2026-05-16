import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  NumberInput,
  TextInputGroup,
  TextInputGroupMain,
  TextInputGroupUtilities,
} from "@patternfly/react-core";
import { CaretDownIcon, CaretUpIcon } from "@patternfly/react-icons";
import { FoundationPage, Section, Card, CodeBlock } from "../_storyKit.js";
import { DemoFrame, PropsTable } from "../_demoKit.js";

const meta: Meta = {
  title: "Components/NumberInput",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => {
    const [n, setN] = useState<number | "">(3);
    const [withUnit, setWithUnit] = useState<number | "">(50);
    const [year, setYear] = useState<number>(2026);

    const clamp = (v: number, min = 0, max = 99) =>
      Math.max(min, Math.min(max, v));

    return (
      <FoundationPage
        title="NumberInput"
        intro={
          <>
            A numeric text input with built-in stepper buttons. Best for
            small-range values where users may want to nudge by one — quantity
            pickers, replica counts, retry counts. For values driven by feel
            rather than precision, use Slider.
          </>
        }
      >
        <Section title="Basic">
          <Card>
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <DemoFrame>
                <NumberInput
                  value={n}
                  min={0}
                  max={99}
                  onChange={(e) => {
                    const v = Number((e.target as HTMLInputElement).value);
                    setN(Number.isNaN(v) ? "" : clamp(v));
                  }}
                  onMinus={() => setN(typeof n === "number" ? clamp(n - 1) : 0)}
                  onPlus={() => setN(typeof n === "number" ? clamp(n + 1) : 1)}
                  inputName="quantity"
                  inputAriaLabel="Quantity"
                  minusBtnAriaLabel="Decrease quantity"
                  plusBtnAriaLabel="Increase quantity"
                />
              </DemoFrame>
              <CodeBlock>{`<NumberInput
  value={n}
  min={0}
  max={99}
  onMinus={() => setN(n - 1)}
  onPlus={() => setN(n + 1)}
  onChange={(e) => setN(Number(e.target.value))}
  inputAriaLabel="Quantity"
  minusBtnAriaLabel="Decrease quantity"
  plusBtnAriaLabel="Increase quantity"
/>`}</CodeBlock>
            </div>
          </Card>
        </Section>

        <Section title="With unit">
          <Card>
            <div style={{ padding: 24 }}>
              <DemoFrame>
                <NumberInput
                  value={withUnit}
                  min={0}
                  max={100}
                  unit="%"
                  unitPosition="after"
                  inputAriaLabel="Threshold percent"
                  minusBtnAriaLabel="Decrease threshold"
                  plusBtnAriaLabel="Increase threshold"
                  onChange={(e) =>
                    setWithUnit(Number((e.target as HTMLInputElement).value) || 0)
                  }
                  onMinus={() =>
                    setWithUnit(typeof withUnit === "number" ? clamp(withUnit - 1, 0, 100) : 0)
                  }
                  onPlus={() =>
                    setWithUnit(typeof withUnit === "number" ? clamp(withUnit + 1, 0, 100) : 1)
                  }
                />
              </DemoFrame>
            </div>
          </Card>
        </Section>

        <Section
          title="Internal stepper variants"
          description="Two ways to put up/down controls inside an input — pick by context."
        >
          <Card>
            <div
              style={{
                padding: 24,
                color: "var(--gp-color-text-regular)",
                lineHeight: 1.7,
              }}
            >
              <p style={{ marginTop: 0 }}>
                <strong>1. Browser-native (default).</strong> Use{" "}
                <code>&lt;input type=&quot;number&quot;&gt;</code> and the
                browser draws its own up/down spinner buttons — no extra
                code, keyboard arrow keys work natively. PF6 uses this for
                the year cell inside its calendar popover, and it&apos;s
                the right answer when:
              </p>
              <ul style={{ marginBlockStart: 0, paddingInlineStart: 24 }}>
                <li>The control lives inside a transient surface (popover, tooltip, dropdown) where consistent cross-browser styling matters less.</li>
                <li>Space is tight and the spinner sits inline with adjacent controls (calendar header).</li>
                <li>You want zero JS overhead.</li>
              </ul>
              <p style={{ marginBlockEnd: 0 }}>
                Caveats: the spinner buttons differ between Chrome, Firefox
                and Safari (subtle visual inconsistency); they&apos;re very
                small (~10px) and effectively unusable on touch; and
                they&apos;re not theme-aware.
              </p>
              <p>
                <strong>2. Lib-styled (the recipe below).</strong> Custom
                stacked stepper using <code>gp-stepper-stack</code> +{" "}
                <code>gp-stepper-btn</code> CSS utilities. Square,
                brand-themed, larger hit area (50% of input height each),
                consistent across browsers, and responsive (auto-swaps to
                the standard NumberInput layout below the md breakpoint
                for touch). Use it when:
              </p>
              <ul style={{ marginBlockStart: 0, paddingInlineStart: 24 }}>
                <li>The control sits in a primary form surface where visual consistency with the rest of the system matters.</li>
                <li>You want a clear, branded interaction signal rather than browser default.</li>
                <li>Touch users will hit it on small viewports — the responsive swap takes care of WCAG 2.5.5 minimums.</li>
              </ul>
            </div>
          </Card>
        </Section>

        <Section
          title="Internal stepper layout (recipe — lib-styled)"
          description="Variant 2 from above. Compact desktop UX where up/down controls sit inside the input frame rather than flanking it. On touch / smaller screens the carets are too small for finger tapping, so swap to the standard outer-stepper NumberInput at the md breakpoint."
        >
          <Card>
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <DemoFrame>
                {/* Two variants of the same input rendered side-by-side
                    via PF6 utility classes:
                      - Internal-stepper variant: hidden by default,
                        shown from md+ (>= 768px) where mouse is the
                        primary input.
                      - Standard NumberInput: shown by default (mobile),
                        hidden from md+. WCAG 2.5.5 target-size
                        compliant for touch.
                    Resize the canvas across the md breakpoint to see
                    them swap. */}
                <div
                  className="pf-v6-u-display-none pf-v6-u-display-inline-block-on-md"
                  style={{ width: 180 }}
                >
                  <TextInputGroup>
                    <TextInputGroupMain
                      type="text"
                      inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                      value={year}
                      onChange={(e) => {
                        const v = Number(
                          (e.target as HTMLInputElement).value,
                        );
                        if (!Number.isNaN(v)) setYear(v);
                      }}
                      aria-label="Year"
                    />
                    <TextInputGroupUtilities>
                      <div className="gp-stepper-stack">
                        <button
                          type="button"
                          aria-label="Increase year"
                          onClick={() => setYear((y) => y + 1)}
                          className="gp-stepper-btn"
                        >
                          <CaretUpIcon />
                        </button>
                        <button
                          type="button"
                          aria-label="Decrease year"
                          onClick={() => setYear((y) => y - 1)}
                          className="gp-stepper-btn"
                        >
                          <CaretDownIcon />
                        </button>
                      </div>
                    </TextInputGroupUtilities>
                  </TextInputGroup>
                </div>
                {/* Touch / mobile fallback — standard NumberInput with
                    full-size flanking steppers. */}
                <div
                  className="pf-v6-u-display-block pf-v6-u-display-none-on-md"
                  style={{ display: "inline-block" }}
                >
                  <NumberInput
                    value={year}
                    onChange={(e) =>
                      setYear(
                        Number((e.target as HTMLInputElement).value) || year,
                      )
                    }
                    onMinus={() => setYear((y) => y - 1)}
                    onPlus={() => setYear((y) => y + 1)}
                    inputAriaLabel="Year"
                    minusBtnAriaLabel="Decrease year"
                    plusBtnAriaLabel="Increase year"
                    widthChars={6}
                  />
                </div>
              </DemoFrame>
              <CodeBlock>{`// Render both variants and let CSS swap by viewport. Internal
// stepper at md+ (mouse), standard NumberInput below md (touch).

import {
  NumberInput,
  TextInputGroup,
  TextInputGroupMain,
  TextInputGroupUtilities,
} from "@patternfly/react-core";
import { CaretUpIcon, CaretDownIcon } from "@patternfly/react-icons";

{/* Internal stepper — md+ (≥ 768px), mouse-friendly. */}
<div className="pf-v6-u-display-none pf-v6-u-display-inline-block-on-md">
  <TextInputGroup>
    <TextInputGroupMain
      type="text"
      inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
      value={year}
      onChange={(e) => setYear(Number(e.target.value))}
      aria-label="Year"
    />
    <TextInputGroupUtilities>
      <div className="gp-stepper-stack">
        <button type="button" className="gp-stepper-btn"
          aria-label="Increase year" onClick={() => setYear(y => y + 1)}>
          <CaretUpIcon />
        </button>
        <button type="button" className="gp-stepper-btn"
          aria-label="Decrease year" onClick={() => setYear(y => y - 1)}>
          <CaretDownIcon />
        </button>
      </div>
    </TextInputGroupUtilities>
  </TextInputGroup>
</div>

{/* Touch / small screens — standard NumberInput. WCAG 2.5.5 target size. */}
<div className="pf-v6-u-display-block pf-v6-u-display-none-on-md">
  <NumberInput
    value={year}
    onMinus={() => setYear(y => y - 1)}
    onPlus={() => setYear(y => y + 1)}
    onChange={(e) => setYear(Number(e.target.value) || year)}
    inputAriaLabel="Year"
    minusBtnAriaLabel="Decrease year"
    plusBtnAriaLabel="Increase year"
  />
</div>`}</CodeBlock>
              <p
                style={{
                  margin: 0,
                  color: "var(--gp-color-text-subtle)",
                  fontSize: 14,
                }}
              >
                <strong>Why the swap:</strong> the internal carets are
                ~17×17px squares — fine for a mouse pointer but well below
                the WCAG 2.5.5 minimum 24×24px touch target. On small
                screens the standard NumberInput's full-size stepper
                buttons become finger-friendly. Both variants share state,
                so the user value persists across viewport changes.
              </p>
            </div>
          </Card>
        </Section>

        <Section title="Most-used props">
          <Card>
            <div style={{ padding: 24 }}>
              <PropsTable
                rows={[
                  { name: "value", type: 'number | ""', description: 'Controlled value. Empty string for "no value yet".' },
                  { name: "min / max", type: "number", description: "Range bounds. Component does not enforce them automatically — clamp inside your handlers." },
                  { name: "onChange", type: "(event) => void", description: "Fires on direct text edit." },
                  { name: "onMinus / onPlus", type: "(event) => void", description: "Fires when the stepper buttons are clicked." },
                  { name: "unit", type: "ReactNode", description: 'Display a unit alongside the input ("%", "GB", "min").' },
                  { name: "unitPosition", type: '"before" | "after"', description: "Where the unit sits relative to the input." },
                  { name: "widthChars", type: "number", description: "Character width of the input area. Use to size to expected magnitude (3 for 0–999, 5 for 0–99999)." },
                  { name: "inputAriaLabel", type: "string", description: "Required for the input." },
                  { name: "minusBtnAriaLabel / plusBtnAriaLabel", type: "string", description: "Required for the stepper buttons. Include the field's purpose for clarity." },
                ]}
              />
            </div>
          </Card>
        </Section>

        <Section title="Accessibility">
          <Card>
            <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
              <li><strong>All three a11y labels are required.</strong> Input, plus button, minus button — none have text content, so each needs an aria-label.</li>
              <li><strong>Clamp in your handlers, not by trusting min/max.</strong> Users can paste values that exceed your bounds; the component will accept whatever you set into state.</li>
              <li><strong>Don&apos;t use NumberInput for huge ranges.</strong> Stepping from 0 to 1,000,000 by ones is hostile — use a plain TextInput with type=&quot;number&quot;.</li>
            </ul>
          </Card>
        </Section>

      </FoundationPage>
    );
  },
};
