/**
 * Minimal WCAG 2.x contrast utility — no external deps so it can be used in
 * build-time token tests without pulling in a runtime dependency.
 *
 * Accepts hex colors in `#rgb`, `#rrggbb`, or `#rrggbbaa` form.
 */

function parseHex(hex: string): [number, number, number] {
  let h = hex.trim().replace(/^#/, "");
  if (h.length === 3) {
    h = h
      .split("")
      .map((c) => c + c)
      .join("");
  }
  if (h.length === 8) h = h.slice(0, 6);
  if (h.length !== 6 || !/^[0-9a-fA-F]{6}$/.test(h)) {
    throw new Error(`Invalid hex color: ${hex}`);
  }
  const r = Number.parseInt(h.slice(0, 2), 16);
  const g = Number.parseInt(h.slice(2, 4), 16);
  const b = Number.parseInt(h.slice(4, 6), 16);
  return [r, g, b];
}

function channelLuminance(c: number): number {
  const v = c / 255;
  return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
}

function relativeLuminance([r, g, b]: [number, number, number]): number {
  return (
    0.2126 * channelLuminance(r) +
    0.7152 * channelLuminance(g) +
    0.0722 * channelLuminance(b)
  );
}

/** WCAG 2.x contrast ratio between two hex colors (1.0 to 21.0). */
export function contrastRatio(fg: string, bg: string): number {
  const lFg = relativeLuminance(parseHex(fg));
  const lBg = relativeLuminance(parseHex(bg));
  const [hi, lo] = lFg > lBg ? [lFg, lBg] : [lBg, lFg];
  return (hi + 0.05) / (lo + 0.05);
}

export const WCAG_AA_NORMAL = 4.5;
export const WCAG_AA_LARGE = 3.0;
export const WCAG_AAA_NORMAL = 7.0;
