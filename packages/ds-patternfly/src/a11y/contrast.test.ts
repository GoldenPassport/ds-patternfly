import { describe, it, expect } from "vitest";
import {
  contrastRatio,
  WCAG_AA_NORMAL,
  WCAG_AA_LARGE,
  WCAG_AAA_NORMAL,
} from "./contrast.js";

describe("contrastRatio", () => {
  it("returns 21 for pure black on pure white", () => {
    expect(contrastRatio("#000000", "#ffffff")).toBeCloseTo(21, 1);
  });

  it("returns 1 for identical colors", () => {
    expect(contrastRatio("#7f7f7f", "#7f7f7f")).toBeCloseTo(1, 5);
  });

  it("is symmetric (fg/bg order doesn't matter)", () => {
    const a = contrastRatio("#112233", "#eeeeee");
    const b = contrastRatio("#eeeeee", "#112233");
    expect(a).toBeCloseTo(b, 10);
  });

  it("accepts 3-digit shorthand hex", () => {
    // #fff should equal #ffffff.
    expect(contrastRatio("#000", "#fff")).toBeCloseTo(
      contrastRatio("#000000", "#ffffff"),
      10,
    );
  });

  it("accepts 8-digit hex (alpha is ignored)", () => {
    expect(contrastRatio("#000000ff", "#ffffff00")).toBeCloseTo(21, 1);
  });

  it("accepts hex without leading '#'", () => {
    expect(contrastRatio("000000", "ffffff")).toBeCloseTo(21, 1);
  });

  it("throws on invalid hex strings", () => {
    expect(() => contrastRatio("#zzz", "#ffffff")).toThrow(/Invalid hex/);
    expect(() => contrastRatio("#1234", "#ffffff")).toThrow(/Invalid hex/);
    expect(() => contrastRatio("not-a-color", "#ffffff")).toThrow(/Invalid hex/);
  });
});

describe("WCAG threshold constants", () => {
  it("match the WCAG 2.x spec values", () => {
    expect(WCAG_AA_NORMAL).toBe(4.5);
    expect(WCAG_AA_LARGE).toBe(3.0);
    expect(WCAG_AAA_NORMAL).toBe(7.0);
  });
});
