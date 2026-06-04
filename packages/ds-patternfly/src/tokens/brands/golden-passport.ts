import type { BrandTokens } from "../types.js";

const palette = {
  gray: {
    50: "#fbf8f3",
    100: "#f3ede1",
    200: "#e6dcc8",
    300: "#cdbfa3",
    400: "#a39681",
    500: "#7a6f5d",
    600: "#5a5147",
    700: "#3e372f",
    800: "#26211c",
    900: "#1a1611",
  },
  brand: {
    50: "#fbf3e7",
    100: "#f3dcb6",
    200: "#e8c285",
    300: "#d6a558",
    400: "#bc8a40",
    500: "#a4753c",
    600: "#7d572a",
    700: "#5b3f1e",
    800: "#3a2812",
    900: "#1f1408",
  },
  accent: {
    50: "#e8eef1",
    100: "#bfd1d8",
    200: "#90b1bd",
    300: "#5d8a9b",
    400: "#356a7d",
    500: "#1f4e5f",
    600: "#163c4a",
    700: "#0f2b35",
    800: "#091b21",
    900: "#040d10",
  },
  success: {
    50: "#eef4ec",
    100: "#c8dcc1",
    200: "#9bbf8e",
    300: "#6fa05f",
    400: "#4f8240",
    500: "#3a6730",
    600: "#2c4f24",
    700: "#1e371a",
    800: "#122110",
    900: "#070f08",
  },
  // Bright red-orange — the gold brand colour family is close enough to
  // amber that earlier burnt-orange / amber-leaning swatches read as gold.
  // Skewing red so warning is unmistakably ORANGE (not gold), while
  // staying inside AA contrast on white.
  warning: {
    50: "#fff1e6",
    100: "#ffd4ad",
    200: "#ffae6b",
    300: "#fc862c",
    400: "#ea6900",
    500: "#c25500",
    600: "#9a4300",
    700: "#6e3000",
    800: "#421c00",
    900: "#200d00",
  },
  // Vibrant true red — bumped from the earlier brown-red palette so the
  // icon stops (500) read as a clear danger red rather than a muted
  // burgundy. Text stops (700+) stay dark enough for AAA contrast on
  // light surfaces; icon 500 keeps AA for large/UI on white (5.9:1).
  danger: {
    50: "#fde8e8",
    100: "#f8c1c1",
    200: "#f08989",
    300: "#e35454",
    400: "#cf2929",
    500: "#b01818",
    600: "#8b1111",
    700: "#680c0c",
    800: "#410707",
    900: "#1f0303",
  },
  info: {
    50: "#e8eef1",
    100: "#bfd1d8",
    200: "#90b1bd",
    300: "#5d8a9b",
    400: "#356a7d",
    500: "#1f4e5f",
    600: "#163c4a",
    700: "#0f2b35",
    800: "#091b21",
    900: "#040d10",
  },
} as const;

export const goldenPassport = {
  name: "golden-passport",
  palette,
  semantic: {
    brand: {
      // Light-mode default uses the 600 stop so white labels pass AA normal
      // contrast (4.5:1) on primary buttons — the 500 stop only hits 4.05:1.
      default: { light: palette.brand[600], dark: palette.brand[300] },
      hover: { light: palette.brand[700], dark: palette.brand[200] },
      text: { light: palette.brand[600], dark: palette.brand[200] },
      on: { light: "#ffffff", dark: palette.gray[900] },
    },
    background: {
      primary: {
        default: { light: "#fbf8f3", dark: palette.gray[900] },
        hover: { light: palette.gray[100], dark: palette.gray[800] },
      },
      secondary: {
        default: { light: palette.gray[100], dark: palette.gray[800] },
        hover: { light: palette.gray[200], dark: palette.gray[700] },
      },
    },
    text: {
      regular: { light: palette.gray[900], dark: palette.gray[100] },
      subtle: { light: palette.gray[600], dark: palette.gray[300] },
      // Links use the info (blue) palette regardless of brand. Universal
      // blue-link convention reads as "hyperlink" without coupling to the
      // brand colour. info[500] = #1f4e5f gives 7.75:1 against the cream
      // primary surface — well past WCAG AA. Hover deepens to info[600].
      link: { light: palette.info[500], dark: palette.info[300] },
      linkHover: { light: palette.info[600], dark: palette.info[200] },
    },
    icon: {
      regular: { light: palette.gray[700], dark: palette.gray[200] },
      subtle: { light: palette.gray[500], dark: palette.gray[400] },
    },
    status: {
      success: {
        text: { light: palette.success[700], dark: palette.success[200] },
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
        text: { light: palette.danger[700], dark: palette.danger[200] },
        icon: { light: palette.danger[500], dark: palette.danger[300] },
        background: { light: palette.danger[50], dark: palette.danger[800] },
        hover: { light: palette.danger[100], dark: palette.danger[700] },
      },
      info: {
        text: { light: palette.info[700], dark: palette.info[200] },
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
      '"Plus Jakarta Sans", "Helvetica Neue", Helvetica, Arial, sans-serif',
    familyHeading:
      '"DM Sans", "Helvetica Neue", Helvetica, Arial, sans-serif',
    sizeBase: "16px",
  },
  // Aligned to PF6's official semantic radius scale — see BrandRadiusTokens
  // for the per-token intent. Brand-level overrides are uncommon.
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
    duration: { fast: "120ms", normal: "240ms", slow: "440ms" },
    easing: {
      standard: "cubic-bezier(0.32, 0.08, 0.24, 1)",
      in: "cubic-bezier(0.5, 0, 0.75, 0)",
      out: "cubic-bezier(0.16, 1, 0.3, 1)",
    },
  },
} satisfies BrandTokens;
