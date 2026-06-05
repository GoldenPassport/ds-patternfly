import type { BrandTokens } from "../types.js";

const palette = {
  gray: {
    50: "#fafafa",
    100: "#f0f0f0",
    200: "#d2d2d2",
    300: "#b8bbbe",
    400: "#8a8d90",
    500: "#6a6e73",
    600: "#4f5255",
    700: "#3c3f42",
    800: "#212427",
    900: "#151515",
  },
  brand: {
    50: "#e7f1fa",
    100: "#bee1f4",
    200: "#73bcf7",
    300: "#39a5f9",
    400: "#1f8be5",
    500: "#0066cc",
    600: "#004080",
    700: "#002952",
    800: "#001b35",
    900: "#000d1a",
  },
  accent: {
    50: "#e1f5f5",
    100: "#a2d9d9",
    200: "#73c5c5",
    300: "#3da3a3",
    400: "#008787",
    500: "#005f60",
    600: "#004d4d",
    700: "#003a3a",
    800: "#002626",
    900: "#001313",
  },
  success: {
    50: "#f3faf2",
    100: "#bde5b8",
    200: "#95d58e",
    300: "#6ec664",
    400: "#5ba352",
    500: "#3e8635",
    600: "#1e4f18",
    700: "#0f2c0a",
    800: "#0a1f07",
    900: "#051203",
  },
  // Clearer orange (less yellow) so warning visually separates from brand
  // and from the warm golden-passport palette.
  warning: {
    50: "#fff4eb",
    100: "#ffe1c4",
    200: "#ffc285",
    300: "#ff9b4d",
    400: "#f97316",
    500: "#d65a07",
    600: "#a8470a",
    700: "#7a3309",
    800: "#4a2107",
    900: "#241003",
  },
  danger: {
    50: "#faeaea",
    100: "#f4b5b5",
    200: "#ee7d7c",
    300: "#e63d3c",
    400: "#c9190b",
    500: "#a30000",
    600: "#7d1007",
    700: "#470000",
    800: "#2c0000",
    900: "#1c0000",
  },
  info: {
    50: "#e7f1fa",
    100: "#bee1f4",
    200: "#73bcf7",
    300: "#39a5f9",
    400: "#1f8be5",
    500: "#0066cc",
    600: "#004080",
    700: "#002952",
    800: "#001b35",
    900: "#000d1a",
  },
} as const;

export const defaultBrand = {
  name: "default",
  palette,
  semantic: {
    brand: {
      default: { light: palette.brand[500], dark: palette.brand[300] },
      hover: { light: palette.brand[600], dark: palette.brand[200] },
      text: { light: palette.brand[600], dark: palette.brand[200] },
      on: { light: "#ffffff", dark: palette.gray[900] },
    },
    background: {
      // Page / primary surface. Light mode pulls off pure white to a
      // soft neutral grey (#f5f5f5) so the canvas reads as a clear
      // background rather than washing out against white content —
      // dark mode keeps the deep gray[900] base.
      primary: {
        default: { light: "#f5f5f5", dark: palette.gray[900] },
        hover: { light: palette.gray[100], dark: palette.gray[800] },
      },
      secondary: {
        default: { light: palette.gray[50], dark: palette.gray[800] },
        hover: { light: palette.gray[100], dark: palette.gray[700] },
      },
    },
    text: {
      regular: { light: palette.gray[900], dark: palette.gray[100] },
      subtle: { light: palette.gray[600], dark: palette.gray[300] },
      // Links use the info (blue) palette regardless of brand — universal
      // blue-link convention. info[500] = #0066cc against page bg gives
      // strong contrast and reads as "hyperlink" without coupling to the
      // brand colour. Hover deepens to info[600].
      link: { light: palette.info[500], dark: palette.info[300] },
      linkHover: { light: palette.info[600], dark: palette.info[200] },
    },
    icon: {
      regular: { light: palette.gray[700], dark: palette.gray[200] },
      subtle: { light: palette.gray[500], dark: palette.gray[400] },
    },
    status: {
      success: {
        text: { light: palette.success[600], dark: palette.success[200] },
        icon: { light: palette.success[500], dark: palette.success[300] },
        background: { light: palette.success[50], dark: palette.success[800] },
        hover: { light: palette.success[100], dark: palette.success[700] },
      },
      warning: {
        text: { light: palette.warning[700], dark: palette.warning[200] },
        icon: { light: palette.warning[600], dark: palette.warning[300] },
        background: { light: palette.warning[50], dark: palette.warning[800] },
        hover: { light: palette.warning[100], dark: palette.warning[700] },
      },
      danger: {
        text: { light: palette.danger[600], dark: palette.danger[200] },
        icon: { light: palette.danger[500], dark: palette.danger[300] },
        background: { light: palette.danger[50], dark: palette.danger[800] },
        hover: { light: palette.danger[100], dark: palette.danger[700] },
      },
      info: {
        text: { light: palette.info[600], dark: palette.info[200] },
        icon: { light: palette.info[500], dark: palette.info[300] },
        background: { light: palette.info[50], dark: palette.info[800] },
        hover: { light: palette.info[100], dark: palette.info[700] },
      },
    },
    nonstatus: {
      border: { light: palette.gray[200], dark: palette.gray[700] },
      borderSubtle: { light: palette.gray[100], dark: palette.gray[800] },
    },
  },
  font: {
    family:
      '"RedHatText", "Helvetica Neue", Helvetica, Arial, sans-serif',
    familyHeading:
      '"RedHatDisplay", "Helvetica Neue", Helvetica, Arial, sans-serif',
    sizeBase: "16px",
  },
  // Aligned to PF6's official semantic radius scale — see BrandRadiusTokens
  // for the per-token intent.
  radius: {
    sharp: "0px",
    tiny: "4px",
    sm: "6px",
    md: "16px",
    lg: "24px",
    pill: "999px",
  },
  space: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "40px",
  },
  motion: {
    duration: { fast: "100ms", normal: "200ms", slow: "400ms" },
    easing: {
      standard: "cubic-bezier(0.4, 0, 0.2, 1)",
      in: "cubic-bezier(0.4, 0, 1, 1)",
      out: "cubic-bezier(0, 0, 0.2, 1)",
    },
  },
} satisfies BrandTokens;
