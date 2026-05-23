import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Button,
  ButtonVariant,
  InputGroup,
  InputGroupItem,
  InputGroupText,
  NumberInput,
  TextInput,
  TextInputGroup,
  TextInputGroupMain,
  TextInputGroupUtilities,
} from "@patternfly/react-core";
import {
  CaretDownIcon,
  CaretUpIcon,
  MinusIcon,
  PlusIcon,
} from "@patternfly/react-icons";
import { FoundationPage, Section, Card, CodeBlock, ThemingPointer } from "../_storyKit.js";
import { DemoFrame, PropsTable } from "../_demoKit.js";

const meta: Meta = {
  title: "Components/Forms/NumberInput",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => {
    const [n, setN] = useState<number | "">(3);
    const [withUnit, setWithUnit] = useState<number | "">(50);
    const [year, setYear] = useState<number>(2026);
    const [minDigits, setMinDigits] = useState<number>(4);

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
        <Section
          title="Basic"
          description="Built from primitives so the ± steppers use the lib's tertiary icon-button styling (matches the DatePicker calendar trigger + the Components/Button icon-only row) rather than PF6's stock grey-fill control chip."
        >
          <Card>
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <DemoFrame>
                <InputGroup style={{ maxWidth: 180 }}>
                  <InputGroupItem>
                    <Button
                      variant={ButtonVariant.tertiary}
                      aria-label="Decrease quantity"
                      icon={<MinusIcon />}
                      isDisabled={typeof n === "number" && n <= 0}
                      onClick={() =>
                        setN(typeof n === "number" ? clamp(n - 1) : 0)
                      }
                      style={{
                        borderRadius:
                          "var(--gp-radius-control, var(--pf-v6-c-button--BorderRadius))",
                        aspectRatio: "1",
                        paddingInline: 0,
                      }}
                    />
                  </InputGroupItem>
                  <InputGroupItem isFill>
                    <TextInput
                      id="quantity"
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={n}
                      onChange={(_e, value) => {
                        if (value === "") {
                          setN("");
                          return;
                        }
                        const v = Number(value);
                        if (!Number.isNaN(v)) setN(clamp(v));
                      }}
                      aria-label="Quantity"
                      style={{ textAlign: "center" }}
                    />
                  </InputGroupItem>
                  <InputGroupItem>
                    <Button
                      variant={ButtonVariant.tertiary}
                      aria-label="Increase quantity"
                      icon={<PlusIcon />}
                      isDisabled={typeof n === "number" && n >= 99}
                      onClick={() =>
                        setN(typeof n === "number" ? clamp(n + 1) : 1)
                      }
                      style={{
                        borderRadius:
                          "var(--gp-radius-control, var(--pf-v6-c-button--BorderRadius))",
                        aspectRatio: "1",
                        paddingInline: 0,
                      }}
                    />
                  </InputGroupItem>
                </InputGroup>
              </DemoFrame>
              <CodeBlock>{`// Lib-style ± stepper — Button (tertiary) + TextInput + Button
// composed inside an InputGroup. The trigger Buttons pick up the
// brand-dial control radius + the lib's icon-only outline styling.

import {
  Button, ButtonVariant, InputGroup, InputGroupItem, TextInput,
} from "@patternfly/react-core";
import { MinusIcon, PlusIcon } from "@patternfly/react-icons";

<InputGroup>
  <InputGroupItem>
    <Button
      variant={ButtonVariant.tertiary}
      aria-label="Decrease quantity"
      icon={<MinusIcon />}
      isDisabled={value <= 0}
      onClick={() => setValue(value - 1)}
      style={{
        borderRadius: "var(--gp-radius-control)",
        aspectRatio: "1", paddingInline: 0,
      }}
    />
  </InputGroupItem>
  <InputGroupItem isFill>
    {/* type="text" + inputMode="numeric" — hides the browser's
       native ± spinner so only the lib ± Buttons drive the value. */}
    <TextInput type="text" inputMode="numeric" pattern="[0-9]*"
      value={value} onChange={(_, v) => setValue(Number(v))}
      aria-label="Quantity" style={{ textAlign: "center" }} />
  </InputGroupItem>
  <InputGroupItem>
    <Button variant={ButtonVariant.tertiary}
      aria-label="Increase quantity" icon={<PlusIcon />}
      isDisabled={value >= max}
      onClick={() => setValue(value + 1)}
      style={{
        borderRadius: "var(--gp-radius-control)",
        aspectRatio: "1", paddingInline: 0,
      }}
    />
  </InputGroupItem>
</InputGroup>`}</CodeBlock>
            </div>
          </Card>
        </Section>

        <Section
          title="With unit"
          description="Same lib-style ± stepper as Basic, with an InputGroupText trailing the field to render the unit. Swap to a leading InputGroupText for prefixed units like '$'."
        >
          <Card>
            <div style={{ padding: 24 }}>
              <DemoFrame>
                <InputGroup style={{ maxWidth: 220 }}>
                  <InputGroupItem>
                    <Button
                      variant={ButtonVariant.tertiary}
                      aria-label="Decrease threshold"
                      icon={<MinusIcon />}
                      isDisabled={typeof withUnit === "number" && withUnit <= 0}
                      onClick={() =>
                        setWithUnit(
                          typeof withUnit === "number"
                            ? clamp(withUnit - 1, 0, 100)
                            : 0,
                        )
                      }
                      style={{
                        borderRadius:
                          "var(--gp-radius-control, var(--pf-v6-c-button--BorderRadius))",
                        aspectRatio: "1",
                        paddingInline: 0,
                      }}
                    />
                  </InputGroupItem>
                  <InputGroupItem isFill>
                    <TextInput
                      id="threshold"
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={withUnit}
                      onChange={(_e, value) => {
                        if (value === "") {
                          setWithUnit("");
                          return;
                        }
                        const v = Number(value);
                        if (!Number.isNaN(v)) setWithUnit(clamp(v, 0, 100));
                      }}
                      aria-label="Threshold percent"
                      style={{ textAlign: "center" }}
                    />
                  </InputGroupItem>
                  <InputGroupText>%</InputGroupText>
                  <InputGroupItem>
                    <Button
                      variant={ButtonVariant.tertiary}
                      aria-label="Increase threshold"
                      icon={<PlusIcon />}
                      isDisabled={typeof withUnit === "number" && withUnit >= 100}
                      onClick={() =>
                        setWithUnit(
                          typeof withUnit === "number"
                            ? clamp(withUnit + 1, 0, 100)
                            : 1,
                        )
                      }
                      style={{
                        borderRadius:
                          "var(--gp-radius-control, var(--pf-v6-c-button--BorderRadius))",
                        aspectRatio: "1",
                        paddingInline: 0,
                      }}
                    />
                  </InputGroupItem>
                </InputGroup>
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
                  className="pf-v6-u-display-none pf-v6-u-display-inline-flex-on-md"
                  style={{
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: 20,
                  }}
                >
                  <div
                    style={{
                      display: "inline-flex",
                      flexDirection: "column",
                      gap: 6,
                      fontSize: 13,
                    }}
                  >
                    {/* Plain span — wrapping the NumberInput in a
                        <label> caused clicks on its +/- buttons to
                        bubble to the label and re-fire on the inner
                        input, which the NumberInput then routed back
                        to BOTH steppers. */}
                    <span>Min digits (drives input min-width):</span>
                    <InputGroup style={{ inlineSize: "max-content" }}>
                      <InputGroupItem>
                        <Button
                          variant={ButtonVariant.tertiary}
                          aria-label="Decrease min digits"
                          icon={<MinusIcon />}
                          isDisabled={minDigits <= 1}
                          onClick={() => setMinDigits((d) => Math.max(1, d - 1))}
                          style={{
                            borderRadius:
                              "var(--gp-radius-control, var(--pf-v6-c-button--BorderRadius))",
                            aspectRatio: "1",
                            paddingInline: 0,
                          }}
                        />
                      </InputGroupItem>
                      <InputGroupItem>
                        <TextInput
                          id="min-digits"
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          value={minDigits}
                          onChange={(_e, value) => {
                            if (value === "") return;
                            const v = Number(value);
                            if (!Number.isNaN(v))
                              setMinDigits(Math.max(1, Math.min(12, v)));
                          }}
                          aria-label="Min digits"
                          style={{ inlineSize: "5rem", textAlign: "center" }}
                        />
                      </InputGroupItem>
                      <InputGroupItem>
                        <Button
                          variant={ButtonVariant.tertiary}
                          aria-label="Increase min digits"
                          icon={<PlusIcon />}
                          isDisabled={minDigits >= 12}
                          onClick={() => setMinDigits((d) => Math.min(12, d + 1))}
                          style={{
                            borderRadius:
                              "var(--gp-radius-control, var(--pf-v6-c-button--BorderRadius))",
                            aspectRatio: "1",
                            paddingInline: 0,
                          }}
                        />
                      </InputGroupItem>
                    </InputGroup>
                  </div>
                  {/* `--gp-min-digits` is a CSS custom property the
                      lib reads to set the input's min-inline-size so
                      `<minDigits>` characters never truncate. 4 fits
                      a 4-digit year cleanly; bump to 10 for a phone
                      number, etc. The wrapper's `inline-size:
                      max-content` lets it shrink-wrap around the
                      input's min-width — so when minDigits changes
                      the whole demo auto-resizes. */}
                  <TextInputGroup
                    style={{
                      ["--gp-min-digits" as string]: minDigits,
                      inlineSize: "max-content",
                    }}
                  >
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
                {/* Touch / mobile fallbacks — render BOTH options
                    side-by-side under md, each labelled, so consumers
                    can compare and choose. At md+ the internal-stepper
                    above takes over and these hide. */}
                <div
                  className="pf-v6-u-display-block pf-v6-u-display-none-on-md"
                  style={{ display: "grid", gap: 24 }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 6,
                      fontSize: 13,
                    }}
                  >
                    <span>
                      <strong>mobileFallback=&quot;stepper&quot;</strong>{" "}
                      <span style={{ color: "var(--gp-color-text-subtle)" }}>
                        — finger-sized ± buttons (default, WCAG 2.5.5).
                      </span>
                    </span>
                    <InputGroup style={{ inlineSize: "max-content" }}>
                      <InputGroupItem>
                        <Button
                          variant={ButtonVariant.tertiary}
                          aria-label="Decrease year (stepper)"
                          icon={<MinusIcon />}
                          onClick={() => setYear((y) => y - 1)}
                          style={{
                            borderRadius:
                              "var(--gp-radius-control, var(--pf-v6-c-button--BorderRadius))",
                            aspectRatio: "1",
                            paddingInline: 0,
                          }}
                        />
                      </InputGroupItem>
                      <InputGroupItem>
                        <TextInput
                          id="year-mobile-stepper"
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          value={year}
                          onChange={(_e, value) => {
                            if (value === "") return;
                            const v = Number(value);
                            if (!Number.isNaN(v)) setYear(v);
                          }}
                          aria-label="Year (stepper fallback)"
                          style={{ inlineSize: "5rem", textAlign: "center" }}
                        />
                      </InputGroupItem>
                      <InputGroupItem>
                        <Button
                          variant={ButtonVariant.tertiary}
                          aria-label="Increase year (stepper)"
                          icon={<PlusIcon />}
                          onClick={() => setYear((y) => y + 1)}
                          style={{
                            borderRadius:
                              "var(--gp-radius-control, var(--pf-v6-c-button--BorderRadius))",
                            aspectRatio: "1",
                            paddingInline: 0,
                          }}
                        />
                      </InputGroupItem>
                    </InputGroup>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 6,
                      fontSize: 13,
                    }}
                  >
                    <span>
                      <strong>mobileFallback=&quot;input-only&quot;</strong>{" "}
                      <span style={{ color: "var(--gp-color-text-subtle)" }}>
                        — bare numeric input; device keyboard does the work.
                      </span>
                    </span>
                    {/* input-only — wider field (7rem) than the
                        stepper's sister input (5rem) since this is the
                        sole entry surface. Wrapper has an explicit
                        inline-size that the form-control span inside
                        inherits, so the focus ring tracks the visible
                        input edge. PF6's TextInput only forwards
                        `style` to the inner <input>, NOT the
                        form-control wrapper — without this constraint
                        the wrapper stretches to the parent flex column
                        and the ring draws on the wrong box. */}
                    <div style={{ inlineSize: "7rem", paddingBlock: "0.375rem" }}>
                      <TextInput
                        id="year-mobile-input-only"
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={year}
                        onChange={(_e, value) => {
                          if (value === "") return;
                          const v = Number(value);
                          if (!Number.isNaN(v)) setYear(v);
                        }}
                        aria-label="Year (input-only fallback)"
                        style={{ textAlign: "center" }}
                      />
                    </div>
                  </div>
                </div>
              </DemoFrame>
              <CodeBlock>{`// Render both variants and let CSS swap by viewport. Internal
// stepper at md+ (mouse); below md the recipe takes a 'mobileFallback'
// prop — 'stepper' (default, ± Buttons + TextInput, WCAG 2.5.5
// compliant) or 'input-only' (bare numeric TextInput, device keyboard).

type MobileFallback = "stepper" | "input-only";

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

{/* Touch / mobile — pick a fallback based on use-case. */}
<div className="pf-v6-u-display-block pf-v6-u-display-none-on-md">
  {mobileFallback === "stepper" ? (
    // Default — finger-sized ± Buttons flanking the input. WCAG 2.5.5.
    <InputGroup>
      <InputGroupItem>
        <Button variant={ButtonVariant.tertiary} icon={<MinusIcon />}
          aria-label="Decrease year"
          onClick={() => setYear(y => y - 1)}
          style={{ aspectRatio: "1", paddingInline: 0 }} />
      </InputGroupItem>
      <InputGroupItem>
        <TextInput type="text" inputMode="numeric" pattern="[0-9]*"
          value={year} onChange={(_, v) => setYear(Number(v))}
          aria-label="Year" />
      </InputGroupItem>
      <InputGroupItem>
        <Button variant={ButtonVariant.tertiary} icon={<PlusIcon />}
          aria-label="Increase year"
          onClick={() => setYear(y => y + 1)}
          style={{ aspectRatio: "1", paddingInline: 0 }} />
      </InputGroupItem>
    </InputGroup>
  ) : (
    // input-only — drop the steppers. Use when the range is wide
    // (years, serials) or the form is dense and ± would crowd it.
    <TextInput type="text" inputMode="numeric" pattern="[0-9]*"
      value={year} onChange={(_, v) => setYear(Number(v))}
      aria-label="Year" />
  )}
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

        <ThemingPointer
          dials={[
            ["--gp-control-pad-y", "Drives input + stepper-button height as a single square unit."],
            ["--gp-radius-control", "Corner radius on the input + stepper buttons."],
            ["--gp-border-default", "Resting border colour."],
            ["--gp-focus-ring", "Focus-ring colour."],
          ]}
        />

      </FoundationPage>
    );
  },
};
