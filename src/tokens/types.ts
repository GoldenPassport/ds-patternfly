/**
 * Brand token contract. Every brand is a typed object satisfying this interface.
 *
 * Two layers:
 *   1. `palette` — raw color families (50–900 ramps), mode-agnostic.
 *   2. `semantic` — what each color *role* resolves to in light vs. dark mode.
 *
 * Components reference semantic CSS variables (e.g. `--gp-color-bg-primary-default`),
 * never raw palette values, so re-skinning is a matter of swapping the brand.
 */

// ---------------------------------------------------------------------------
// Modes & primitives
// ---------------------------------------------------------------------------

export type ColorMode = "light" | "dark";

/** A semantic value with a hex for each color mode. */
export interface ModeValue {
  light: string;
  dark: string;
}

/** A pair of states for an interactive surface/foreground. */
export interface InteractiveColor {
  default: ModeValue;
  hover: ModeValue;
}

/** Sub-roles every status/state color exposes. */
export interface StatusColor {
  /** Foreground color used for status text. */
  text: ModeValue;
  /** Foreground color used for status icons. */
  icon: ModeValue;
  /** Background fill used for status containers (alerts, banners). */
  background: ModeValue;
  /** Hover state for interactive status surfaces. */
  hover: ModeValue;
}

// ---------------------------------------------------------------------------
// Palette (raw color families)
// ---------------------------------------------------------------------------

/**
 * A single color family rendered as a 50–900 ramp (lightest → darkest).
 * Mirrors PatternFly 6's color-family stops.
 */
export interface BrandColorScale {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
}

/**
 * Raw color families that make up the brand's palette. Required keys are
 * the structural roles every brand must define; brands may add custom
 * families on top.
 */
export interface BrandPalette {
  /** Neutral grayscale used for text, surfaces, borders. */
  gray: BrandColorScale;
  /** Primary brand color family. */
  brand: BrandColorScale;
  /** Secondary accent color family. */
  accent: BrandColorScale;
  /** Success / positive status color family. */
  success: BrandColorScale;
  /** Warning / caution status color family. */
  warning: BrandColorScale;
  /** Danger / error / destructive status color family. */
  danger: BrandColorScale;
  /** Informational status color family. */
  info: BrandColorScale;
  /** Brands may extend with additional families (typed as scales). */
  [key: string]: BrandColorScale;
}

// ---------------------------------------------------------------------------
// Semantic colors (what each role MEANS, per mode)
// ---------------------------------------------------------------------------

export interface SemanticBrandColors {
  /** Brand color used for primary actions, focus, etc. */
  default: ModeValue;
  /** Hover state for the brand color. */
  hover: ModeValue;
  /** Brand color when used as text or icon (often = default; may differ for contrast). */
  text: ModeValue;
  /** Foreground used on top of brand-default fills (e.g. button labels). */
  on: ModeValue;
}

export interface SemanticBackgroundColors {
  /** Primary surface (page background). */
  primary: InteractiveColor;
  /** Secondary surface (panels, cards). */
  secondary: InteractiveColor;
}

export interface SemanticTextColors {
  /** Default body text. */
  regular: ModeValue;
  /** Muted / secondary text. */
  subtle: ModeValue;
  /** Default link color. */
  link: ModeValue;
  /** Link hover state. */
  linkHover: ModeValue;
}

export interface SemanticIconColors {
  /** Default icon color. */
  regular: ModeValue;
  /** Muted / secondary icon color. */
  subtle: ModeValue;
}

export interface SemanticStatusColors {
  success: StatusColor;
  warning: StatusColor;
  danger: StatusColor;
  info: StatusColor;
}

export interface SemanticNonstatusColors {
  /** Default border. */
  border: ModeValue;
  /** Subtle / inner border. */
  borderSubtle: ModeValue;
}

export interface SemanticColors {
  brand: SemanticBrandColors;
  background: SemanticBackgroundColors;
  text: SemanticTextColors;
  icon: SemanticIconColors;
  status: SemanticStatusColors;
  nonstatus: SemanticNonstatusColors;
}

// ---------------------------------------------------------------------------
// Typography, radius, spacing
// ---------------------------------------------------------------------------

export interface BrandFontTokens {
  /** CSS font-family stack used for body text. */
  family: string;
  /** Optional separate stack for headings (defaults to `family`). */
  familyHeading?: string;
  /** Base font size, e.g. "16px". */
  sizeBase: string;
}

/**
 * Brand radius scale — aligned to PatternFly 6's semantic radius tokens.
 * PF6 reference: https://www.patternfly.org/tokens/all-patternfly-tokens
 *
 *   sharp  — 0px      sharp corners
 *   tiny   — 4px      barely rounded
 *   sm     — 6px      slightly rounded (icon buttons, menus)
 *   md     — 16px     moderately rounded (cards)
 *   lg     — 24px     mostly rounded (modals)
 *   pill   — 999px    fully rounded (standard buttons, badges, status pills)
 *
 * Brand-level overrides are uncommon — these defaults match PF6 so PF
 * components inherit the right shape automatically.
 */
export interface BrandRadiusTokens {
  sharp: string;
  tiny: string;
  sm: string;
  md: string;
  lg: string;
  pill: string;
}

export interface BrandSpaceTokens {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface BrandMotionTokens {
  /** Durations for transitions / animations. */
  duration: {
    /** ~100ms — micro-interactions (hover, focus). */
    fast: string;
    /** ~200ms — standard component transitions. */
    normal: string;
    /** ~400ms — entrances, expansions. */
    slow: string;
  };
  /** Easing curves. */
  easing: {
    /** Default ease for most transitions. */
    standard: string;
    /** Acceleration into action (entrances). */
    in: string;
    /** Deceleration into rest (exits). */
    out: string;
  };
}

// ---------------------------------------------------------------------------
// Brand
// ---------------------------------------------------------------------------

export interface BrandTokens {
  /** Stable identifier used as the `data-brand` attribute value. */
  name: string;
  /** Raw color families with 50–900 ramps — what each color *is*. */
  palette: BrandPalette;
  /** Semantic colors keyed by role, with light + dark values. */
  semantic: SemanticColors;
  font: BrandFontTokens;
  radius: BrandRadiusTokens;
  space: BrandSpaceTokens;
  motion: BrandMotionTokens;
}
