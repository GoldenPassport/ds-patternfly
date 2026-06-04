import type { BrandTokens, ColorMode, ModeValue } from "./types.js";

const pick = (mv: ModeValue, mode: ColorMode): string => mv[mode];

/**
 * Map a `BrandTokens` object to a flat `{ "--var": "value" }` record for the
 * given color mode. Emits three layers of variables:
 *
 *   1. **Semantic** — `--gp-color-<role>` (referenced by components).
 *   2. **Palette** — `--gp-palette-<family>-<stop>` (raw color ramps).
 *   3. **PatternFly 6 overrides** — `--pf-t-*` keys mirroring the brand into
 *      PF's own token names so PF components inherit the brand.
 *
 * Backward-compat aliases for the original v0.1 semantic var names are still
 * emitted (e.g. `--gp-color-primary` → brand.default) so existing component
 * styles keep working while consumers migrate to the richer names.
 */
export function toCssVars(
  brand: BrandTokens,
  mode: ColorMode = "light",
): Record<string, string> {
  const s = brand.semantic;
  const headingFamily = brand.font.familyHeading ?? brand.font.family;

  const vars: Record<string, string> = {
    // -------- Semantic: brand --------
    "--gp-color-brand-default": pick(s.brand.default, mode),
    "--gp-color-brand-hover": pick(s.brand.hover, mode),
    "--gp-color-brand-text": pick(s.brand.text, mode),
    "--gp-color-brand-on": pick(s.brand.on, mode),

    // -------- Semantic: background --------
    "--gp-color-bg-primary-default": pick(s.background.primary.default, mode),
    "--gp-color-bg-primary-hover": pick(s.background.primary.hover, mode),
    "--gp-color-bg-secondary-default": pick(s.background.secondary.default, mode),
    "--gp-color-bg-secondary-hover": pick(s.background.secondary.hover, mode),
    // Elevated surface — opt-in via `gp-is-elevated` class on inputs and
    // used by `gp-calendar-popup` + as the source for floating surfaces
    // (Popover, Tooltip, Menu). White in light mode lifts from the cream
    // page; gray-700 in dark mode is two stops lighter than the gray-900
    // page (gray-800 was too close — barely distinguishable). Combined
    // with the shadow on popup chrome below, surfaces read as clearly
    // "above" the page.
    "--gp-color-bg-elevated":
      mode === "light" ? "#ffffff" : brand.palette.gray[700],
    // Focus ring colour — uses the link palette (info / blue) rather than
    // the brand colour. Blue stands out against gold/orange brand
    // surfaces and reinforces the universal "interactive" association.
    // Used by both the lib's custom-input guard rule and the PF6 focus
    // ring chain (overridden below).
    "--gp-color-focus-ring": pick(s.text.link, mode),

    // -------- Semantic: text --------
    "--gp-color-text-regular": pick(s.text.regular, mode),
    "--gp-color-text-subtle": pick(s.text.subtle, mode),
    "--gp-color-text-link": pick(s.text.link, mode),
    "--gp-color-text-link-hover": pick(s.text.linkHover, mode),

    // -------- Semantic: icon --------
    "--gp-color-icon-regular": pick(s.icon.regular, mode),
    "--gp-color-icon-subtle": pick(s.icon.subtle, mode),

    // -------- Semantic: status --------
    "--gp-color-status-success-text": pick(s.status.success.text, mode),
    "--gp-color-status-success-icon": pick(s.status.success.icon, mode),
    "--gp-color-status-success-bg": pick(s.status.success.background, mode),
    "--gp-color-status-success-hover": pick(s.status.success.hover, mode),
    "--gp-color-status-warning-text": pick(s.status.warning.text, mode),
    "--gp-color-status-warning-icon": pick(s.status.warning.icon, mode),
    "--gp-color-status-warning-bg": pick(s.status.warning.background, mode),
    "--gp-color-status-warning-hover": pick(s.status.warning.hover, mode),
    "--gp-color-status-danger-text": pick(s.status.danger.text, mode),
    "--gp-color-status-danger-icon": pick(s.status.danger.icon, mode),
    "--gp-color-status-danger-bg": pick(s.status.danger.background, mode),
    "--gp-color-status-danger-hover": pick(s.status.danger.hover, mode),
    "--gp-color-status-info-text": pick(s.status.info.text, mode),
    "--gp-color-status-info-icon": pick(s.status.info.icon, mode),
    "--gp-color-status-info-bg": pick(s.status.info.background, mode),
    "--gp-color-status-info-hover": pick(s.status.info.hover, mode),

    // -------- Semantic: nonstatus --------
    "--gp-color-border-default": pick(s.nonstatus.border, mode),
    "--gp-color-border-subtle": pick(s.nonstatus.borderSubtle, mode),

    // -------- Backward-compat aliases (v0.1 names) --------
    "--gp-color-primary": pick(s.brand.default, mode),
    "--gp-color-primary-hover": pick(s.brand.hover, mode),
    "--gp-color-on-primary": pick(s.brand.on, mode),
    "--gp-color-surface": pick(s.background.primary.default, mode),
    "--gp-color-text": pick(s.text.regular, mode),
    "--gp-color-text-muted": pick(s.text.subtle, mode),
    "--gp-color-border": pick(s.nonstatus.border, mode),
    "--gp-color-accent": brand.palette["accent"]?.[500] ?? pick(s.brand.default, mode),

    // -------- Typography, radius, space --------
    "--gp-font-family": brand.font.family,
    "--gp-font-family-heading": headingFamily,
    "--gp-font-size-base": brand.font.sizeBase,
    "--gp-radius-sharp": brand.radius.sharp,
    "--gp-radius-tiny": brand.radius.tiny,
    "--gp-radius-sm": brand.radius.sm,
    "--gp-radius-md": brand.radius.md,
    "--gp-radius-lg": brand.radius.lg,
    "--gp-radius-pill": brand.radius.pill,
    "--gp-space-xs": brand.space.xs,
    "--gp-space-sm": brand.space.sm,
    "--gp-space-md": brand.space.md,
    "--gp-space-lg": brand.space.lg,
    "--gp-space-xl": brand.space.xl,
    "--gp-motion-duration-fast": brand.motion.duration.fast,
    "--gp-motion-duration-normal": brand.motion.duration.normal,
    "--gp-motion-duration-slow": brand.motion.duration.slow,
    "--gp-motion-easing-standard": brand.motion.easing.standard,
    "--gp-motion-easing-in": brand.motion.easing.in,
    "--gp-motion-easing-out": brand.motion.easing.out,

    // -------- PatternFly 6 token overrides --------
    // CRITICAL: PF6 uses double-dash separators between segment groups
    // (e.g. `--pf-t--global--color--brand--default`). An earlier version of
    // this file used single dashes — those names don't match anything PF6
    // reads, so the brand silently never overrode PF6's defaults. Hint, for
    // example, kept resolving to PF6's white. Always verify new keys exist
    // in `node_modules/@patternfly/react-core/dist/styles/base.css` before
    // adding to this map.
    // PF6 has 12 "brand" tokens — one for each combination of {color, border,
    // icon, text} × {default, hover, clicked}. Brand UI elements (button
    // primary, radio dot, checkbox tick, link color, focus ring) read from
    // different ones; without the full set, components like Radio and links
    // silently fall back to PF6's blue. Map all 12 to our brand's three
    // states — keeps the surface consistent.
    "--pf-t--global--color--brand--default": pick(s.brand.default, mode),
    "--pf-t--global--color--brand--hover": pick(s.brand.hover, mode),
    "--pf-t--global--color--brand--clicked": pick(s.brand.hover, mode),
    "--pf-t--global--border--color--brand--default": pick(s.brand.default, mode),
    "--pf-t--global--border--color--brand--hover": pick(s.brand.hover, mode),
    "--pf-t--global--border--color--brand--clicked": pick(s.brand.hover, mode),
    "--pf-t--global--icon--color--brand--default": pick(s.brand.default, mode),
    "--pf-t--global--icon--color--brand--hover": pick(s.brand.hover, mode),
    "--pf-t--global--icon--color--brand--clicked": pick(s.brand.hover, mode),
    "--pf-t--global--text--color--brand--default": pick(s.brand.default, mode),
    "--pf-t--global--text--color--brand--hover": pick(s.brand.hover, mode),
    "--pf-t--global--text--color--brand--clicked": pick(s.brand.hover, mode),
    // Text / icon when rendered ON a brand-coloured surface (Slider active
    // tick, primary Button content, brand-filled Label content).
    "--pf-t--global--text--color--on-brand--default": pick(s.brand.on, mode),
    "--pf-t--global--text--color--on-brand--hover": pick(s.brand.on, mode),
    "--pf-t--global--icon--color--on-brand--default": pick(s.brand.on, mode),
    "--pf-t--global--icon--color--on-brand--hover": pick(s.brand.on, mode),
    "--pf-t--global--background--color--primary--default": pick(
      s.background.primary.default,
      mode,
    ),
    "--pf-t--global--background--color--primary--hover": pick(
      s.background.primary.hover,
      mode,
    ),
    "--pf-t--global--background--color--secondary--default": pick(
      s.background.secondary.default,
      mode,
    ),
    // Form-control surfaces (TextInput, TextArea, FormSelect, NumberInput,
    // SearchInput, DatePicker, TimePicker). Use a transparent background
    // so inputs adopt whatever surface they sit on — page, Card, Modal,
    // Drawer — without colour-mismatch. The border carries the input
    // boundary; focus ring carries the focus state.
    //
    // Read-only stays on secondary (recessed) so users can see at a glance
    // that the field isn't editable.
    "--pf-t--global--background--color--control--default": "transparent",
    "--pf-t--global--background--color--control--read-only": pick(
      s.background.secondary.default,
      mode,
    ),
    "--pf-t--global--text--color--regular": pick(s.text.regular, mode),
    "--pf-t--global--text--color--subtle": pick(s.text.subtle, mode),
    "--pf-t--global--text--color--link--default": pick(s.text.link, mode),
    "--pf-t--global--text--color--link--hover": pick(s.text.linkHover, mode),
    "--pf-t--global--icon--color--regular": pick(s.icon.regular, mode),
    "--pf-t--global--icon--color--subtle": pick(s.icon.subtle, mode),
    "--pf-t--global--border--color--default": pick(s.nonstatus.border, mode),
    // PF6 has no `--border--color--subtle` semantic — use the lightest
    // numeric step (`--50`) which matches the visual intent of "subtle".
    "--pf-t--global--border--color--50": pick(s.nonstatus.borderSubtle, mode),
    "--pf-t--global--font--family--body": brand.font.family,
    "--pf-t--global--font--family--heading": headingFamily,
    "--pf-t--global--font--size--body--default": brand.font.sizeBase,
    "--pf-t--global--border--radius--sharp": brand.radius.sharp,
    "--pf-t--global--border--radius--tiny": brand.radius.tiny,
    "--pf-t--global--border--radius--small": brand.radius.sm,
    "--pf-t--global--border--radius--medium": brand.radius.md,
    "--pf-t--global--border--radius--large": brand.radius.lg,
    "--pf-t--global--border--radius--pill": brand.radius.pill,
    // Focus ring colour — point all three PF6 focus-ring colour tokens at
    // the brand link colour (info / blue) so the ring is visually
    // distinct from brand surfaces. The hover step uses linkHover for a
    // slightly more emphatic shade.
    "--pf-t--global--focus-ring--color--default": pick(s.text.link, mode),
    "--pf-t--global--focus-ring--color--100": pick(s.text.link, mode),
    "--pf-t--global--focus-ring--color--200": pick(s.text.linkHover, mode),
  };

  // -------- Audit pass: key tokens not yet branded --------
  // Cross-referenced against PF6's full token catalog (884 keys in
  // base.css). The set below covers the visible "key items" — surfaces,
  // text, icons, borders that show up in components we've already
  // documented (Phases 1-2) plus the ones Phase 3 will need (Modal,
  // Drawer, Popover, Tooltip, Menu).
  //
  // Skipped on purpose:
  //   - `nonstatus--{color}` palette (8 colours × 12 tokens). These are
  //     intentionally brand-independent — used by Label `color="blue"` etc.
  //     for distinct user-assigned categories.
  //   - Numeric stops (`--color--gray--90`, `--color--blue--400`, etc.).
  //     PF6 uses these as primitives; semantic tokens point at them.
  //   - Spacers (we have our own `--gp-space-*`); PF6 spacer scale is fine.
  //
  // For tokens with no exact brand semantic (text--disabled, text--inverse,
  // border--hover, etc.), approximate from existing brand values. Promote
  // to dedicated brand fields if a brand needs them differentiated.

  // Brand neutrals (mode-swapped pair for "inverse" — dark in light mode,
  // light in dark mode).
  const invDarkSurface =
    mode === "light" ? brand.palette.gray[900] : brand.palette.gray[50];
  const invDarkSurfaceHover =
    mode === "light" ? brand.palette.gray[800] : brand.palette.gray[100];
  const invLightForeground =
    mode === "light" ? brand.palette.gray[50] : brand.palette.gray[900];

  // ---- Background ----
  // Popovers, Menus, floating panels — use the elevated surface so they
  // sit clearly above the page surface. Combined with the shadow on PF6's
  // popover chrome (which we strengthen via CSS for the same reason),
  // floating elements get both a chromatic contrast cue (white vs cream
  // / gray-700 vs gray-900) and a depth cue (drop shadow).
  vars["--pf-t--global--background--color--floating--default"] =
    mode === "light" ? "#ffffff" : brand.palette.gray[700];
  // Inverse surfaces — dark in light mode, light in dark mode.
  vars["--pf-t--global--background--color--inverse--default"] = invDarkSurface;
  vars["--pf-t--global--background--color--inverse--hover"] = invDarkSurfaceHover;

  // Tooltip — override the surface to land on a softer dark in light
  // mode (gray-700 instead of the very dark inverse default) and the
  // lightest stop in dark mode (gray-50). Other inverse-using
  // components (Switch track, etc.) still get the more emphatic
  // gray-900/50 pair via the global inverse token above.
  //
  // Text colour intentionally NOT overridden — falls back to PF6's
  // default `--pf-v6-c-tooltip__content--Color` which chains through
  // `--pf-t--global--text--color--inverse` (already brand-mapped).
  const tooltipBg =
    mode === "light" ? brand.palette.gray[700] : brand.palette.gray[50];
  vars["--pf-v6-c-tooltip__content--BackgroundColor"] = tooltipBg;
  vars["--pf-v6-c-tooltip__arrow--BackgroundColor"] = tooltipBg;
  // Disabled controls — recessed surface.
  vars["--pf-t--global--background--color--disabled--default"] = pick(
    s.background.secondary.default,
    mode,
  );
  // Tertiary — third-tier, treated as secondary in our brand.
  vars["--pf-t--global--background--color--tertiary--default"] = pick(
    s.background.secondary.default,
    mode,
  );
  // Highlight — selected row / callout; uses the info tint.
  vars["--pf-t--global--background--color--highlight--default"] = pick(
    s.status.info.background,
    mode,
  );
  // Modal / Drawer backdrop — static semi-transparent black both modes.
  vars["--pf-t--global--background--color--backdrop--default"] = "rgba(0, 0, 0, 0.5)";

  // ---- Page chrome surfaces (Masthead + Sidebar) ----
  // PF6 defaults Masthead and PageSidebar to the page background. With our
  // brand, that collapses all three surfaces (page / masthead / sidebar)
  // to the same warm secondary tint, erasing the visual separation the PF
  // design guidelines call for. Per
  // https://www.patternfly.org/components/page/design-guidelines, the
  // masthead and sidebar are app chrome that should read as distinct
  // surfaces from the body content.
  //
  // Use the elevated surface (white in light mode / gray-700 in dark mode
  // — same value the floating surface uses for menus and popovers) and
  // add a hairline border on the trailing edge so the chrome reads as a
  // panel even when the elevation difference is subtle.
  const elevatedSurface =
    mode === "light" ? "#ffffff" : brand.palette.gray[700];
  const chromeBorder = pick(s.nonstatus.borderSubtle, mode);
  vars["--pf-v6-c-masthead--BackgroundColor"] = elevatedSurface;
  vars["--pf-v6-c-masthead--BorderBottomWidth"] = "1px";
  vars["--pf-v6-c-masthead--BorderBottomColor"] = chromeBorder;
  vars["--pf-v6-c-page__sidebar--BackgroundColor"] = elevatedSurface;
  vars["--pf-v6-c-page__sidebar-body--BackgroundColor"] = elevatedSurface;
  vars["--pf-v6-c-page__sidebar--BorderRightWidth"] = "1px";
  vars["--pf-v6-c-page__sidebar--BorderRightColor"] = chromeBorder;

  // ---- Text ----
  vars["--pf-t--global--text--color--disabled"] = pick(s.text.subtle, mode);
  vars["--pf-t--global--text--color--inverse"] = invLightForeground;
  vars["--pf-t--global--text--color--link--visited"] = pick(s.text.link, mode);
  vars["--pf-t--global--text--color--placeholder"] = pick(s.text.subtle, mode);
  vars["--pf-t--global--text--color--on-disabled"] = pick(s.text.subtle, mode);
  vars["--pf-t--global--text--color--on-highlight"] = pick(s.text.regular, mode);
  // Required asterisk — danger-coloured text for visibility.
  vars["--pf-t--global--text--color--required"] = pick(s.status.danger.text, mode);

  // ---- Icon ----
  vars["--pf-t--global--icon--color--disabled"] = pick(s.icon.subtle, mode);
  vars["--pf-t--global--icon--color--inverse"] = invLightForeground;

  // ---- Border ----
  vars["--pf-t--global--border--color--hover"] = pick(s.brand.default, mode);
  vars["--pf-t--global--border--color--clicked"] = pick(s.brand.hover, mode);
  vars["--pf-t--global--border--color--disabled"] = pick(s.nonstatus.borderSubtle, mode);
  vars["--pf-t--global--border--color--high-contrast"] = pick(s.text.regular, mode);

  // -------- Status colour grid --------
  // Without these, Label status="info" / Alert / Banner / Progress all use
  // PF6's stock blue/green/yellow/red regardless of brand. Map each of the
  // four statuses across the eight tokens consumers actually read:
  //   color--status--{s}--{default,hover}        → bg surface
  //   text--color--status--on-{s}--{default,hover}  → text on the bg
  //   icon--color--status--on-{s}--{default,hover}  → icon on the bg
  //   text--color--status--{s}--default          → status-coloured text on neutral bg
  //   border--color--status--{s}--default        → status-coloured edge accent
  //
  // For brand-info specifically these resolve to the values surfaced in the
  // info-foundation page: bg #e8eef1, text #0f2b35 (12.65:1), icon #1f4e5f.
  for (const status of ["info", "success", "warning", "danger"] as const) {
    const t = s.status[status];
    // SATURATED status accent — PF6 uses `--color--status--*--default` as
    // the solid status colour for icon fills, accent borders, and the
    // m-danger / m-success button BG. Map to the saturated icon-tone, NOT
    // the soft background tint (which is a different token chain — see
    // `--background--color--status--*--default` below).
    vars[`--pf-t--global--color--status--${status}--default`] = pick(t.icon, mode);
    vars[`--pf-t--global--color--status--${status}--hover`] = pick(t.text, mode);
    // Status icons in the saturated chain (`Alert.icon`, status icons
    // anywhere a saturated colour is expected on a neutral surface).
    vars[`--pf-t--global--icon--color--status--${status}--default`] = pick(t.icon, mode);
    vars[`--pf-t--global--icon--color--status--${status}--hover`] = pick(t.text, mode);
    // Soft status surface for Banner / Alert filled-bg variants /
    // Label color="danger" / etc.
    vars[`--pf-t--global--background--color--status--${status}--default`] = pick(t.background, mode);
    vars[`--pf-t--global--background--color--status--${status}--hover`] = pick(t.hover, mode);
    // Text + icon to use on top of the saturated status accent (e.g. the
    // label text on a m-danger button — needs to be near-white on the
    // saturated red).
    vars[`--pf-t--global--text--color--status--on-${status}--default`] = pick(s.brand.on, mode);
    vars[`--pf-t--global--text--color--status--on-${status}--hover`] = pick(s.brand.on, mode);
    vars[`--pf-t--global--icon--color--status--on-${status}--default`] = pick(s.brand.on, mode);
    vars[`--pf-t--global--icon--color--status--on-${status}--hover`] = pick(s.brand.on, mode);
    // Status-coloured TEXT on a neutral surface (e.g. inline danger text,
    // form field error message colour).
    vars[`--pf-t--global--text--color--status--${status}--default`] = pick(t.text, mode);
    // Status-coloured BORDER on a neutral surface (Alert left rule, etc.).
    vars[`--pf-t--global--border--color--status--${status}--default`] = pick(t.icon, mode);
  }

  // -------- Component-level overrides --------
  // Plain-action button surfaces (Button variant="link" / variant="plain"
  // and any icon button reading from the `action--plain` chain). PF6
  // defaults the hover bg to an unbranded gray (--background--color--600)
  // — the link button looks unstyled on hover. Map to brand secondary so
  // the hover pill picks up the brand's recessed-surface tone, then the
  // m-link--BorderRadius (which already reads `radius--small` = brand's
  // 6px via our mirror) shapes it correctly.
  vars["--pf-t--global--background--color--action--plain--hover"] = pick(
    s.background.secondary.default,
    mode,
  );
  vars["--pf-t--global--background--color--action--plain--clicked"] = pick(
    s.background.secondary.hover,
    mode,
  );

  // Slider — PF6 mistakenly points the filled-track bg at
  // `--border--color--hover` (a generic gray), so the part of the rail
  // representing the current value never picks up the brand. Re-point it
  // to the brand colour itself; the unfilled part stays the nonstatus gray
  // PF6 supplies.
  vars["--pf-v6-c-slider__rail-track--before--fill--BackgroundColor"] = pick(
    s.brand.default,
    mode,
  );

  // Button m-control variant — used by FileUpload's Browse/Clear, NumberInput
  // stepper +/-, and SearchInput's submit. PF6 defaults this variant's bg
  // to the same control--default token as the input field. Once we made
  // input bg = brand primary so inputs blend with the page, the buttons
  // disappeared into the input visually. Recess them to brand secondary so
  // they read as buttons with their own surface, then brighten to brand
  // on hover so the interaction is brand-aware.
  vars["--pf-v6-c-button--m-control--BackgroundColor"] = pick(
    s.background.secondary.default,
    mode,
  );
  vars["--pf-v6-c-button--m-control--hover--BackgroundColor"] = pick(
    s.background.secondary.hover,
    mode,
  );

  // InputGroup wraps NumberInput's input + stepper buttons + unit display.
  // Match the wrapper to the form-control's transparent surface so the
  // whole group adopts whatever container it sits in. Borders carry the
  // input-group structure; the m-control button variant (overrode below)
  // stays opaque so the buttons remain visually identifiable.
  vars["--pf-v6-c-input-group__item--m-box--BackgroundColor"] = "transparent";

  // CalendarMonth day cells are 4ch × 4ch (square). PF6 defaults to a large
  // rounded rectangle for the selected highlight + focus ring; circular
  // shapes read as "selectable points in time" more clearly. The same
  // token is applied to the cell, its ::before (background fill), and its
  // ::after (focus ring), so 50% rounds all three.
  vars["--pf-v6-c-calendar-month__date--BorderRadius"] = "50%";

  // Skeleton: PF6's default base = secondary-bg (gray[100] in our brand for
  // light mode), which sits too prominently against the cream primary
  // surface. Override with subtle transparent overlays so the placeholder
  // reads as "loading" rather than "card with content". Dark mode is left
  // to PF6 + the secondary tokens we already brand-override; the user
  // confirmed dark mode looked correct.
  if (mode === "light") {
    const base = "rgba(0, 0, 0, 0.04)";
    const shimmer = "rgba(0, 0, 0, 0.07)";
    vars["--pf-v6-c-skeleton--BackgroundColor"] = base;
    vars["--pf-v6-c-skeleton--after--LinearGradientColorStop1"] = base;
    vars["--pf-v6-c-skeleton--after--LinearGradientColorStop2"] = shimmer;
    vars["--pf-v6-c-skeleton--after--LinearGradientColorStop3"] = base;
  }

  // -------- Palette families: --gp-palette-<family>-<stop> --------
  for (const [family, scale] of Object.entries(brand.palette)) {
    for (const [stop, hex] of Object.entries(scale)) {
      vars[`--gp-palette-${family}-${stop}`] = hex;
    }
  }

  return vars;
}

/**
 * Render a `toCssVars` map as a CSS rule scoped to
 * `[data-brand="<name>"][data-mode="<mode>"]`. Consumed by `<ThemeProvider>`
 * to inject brand styles at runtime.
 */
export function brandCssRule(
  brand: BrandTokens,
  mode: ColorMode = "light",
): string {
  const vars = toCssVars(brand, mode);
  const body = Object.entries(vars)
    .map(([k, v]) => `  ${k}: ${v};`)
    .join("\n");
  return `[data-brand="${brand.name}"][data-mode="${mode}"] {\n${body}\n}`;
}
