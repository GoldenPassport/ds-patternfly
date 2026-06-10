// Tokens
export type {
  BrandTokens,
  BrandFontTokens,
  BrandRadiusTokens,
  BrandSpaceTokens,
  BrandMotionTokens,
  BrandPalette,
  BrandColorScale,
  SemanticColors,
  SemanticBrandColors,
  SemanticBackgroundColors,
  SemanticTextColors,
  SemanticIconColors,
  SemanticStatusColors,
  SemanticNonstatusColors,
  StatusColor,
  InteractiveColor,
  ModeValue,
  ColorMode,
} from "./tokens/types.js";
export { toCssVars, brandCssRule } from "./tokens/toCssVars.js";
export { defaultBrand } from "./tokens/brands/default.js";
export { goldenPassport } from "./tokens/brands/golden-passport.js";

// Theme
export { ThemeProvider, useTheme, useBrand } from "./theme/index.js";
export type {
  ThemeProviderProps,
  Direction,
  FocusRing,
} from "./theme/index.js";

// A11y
export { SkipToContent } from "./a11y/SkipToContent.js";
export type { SkipToContentProps } from "./a11y/SkipToContent.js";
export {
  contrastRatio,
  WCAG_AA_NORMAL,
  WCAG_AA_LARGE,
  WCAG_AAA_NORMAL,
} from "./a11y/contrast.js";

// PF6-derived DS components — one thin-wrapper file per PF family
// (Button, Checkbox, Modal, …), scaffolded by scripts/gen-pf-wrappers.mjs.
export * from "./components/pf.js";

// Components + label contracts/defaults
export {
  Shell,
  PrimaryDetailLayout,
  Hyperlink,
  AiAssistant,
  shellEnLabels,
  primaryDetailLayoutEnLabels,
  aiAssistantEnLabels,
} from "./components/index.js";
export type {
  ShellProps,
  ShellLabels,
  PrimaryDetailLayoutProps,
  PrimaryDetailLayoutLabels,
  HyperlinkProps,
  AiAssistantProps,
  AiAssistantLabels,
  ChatMsg,
  ChatPlacement,
} from "./components/index.js";
