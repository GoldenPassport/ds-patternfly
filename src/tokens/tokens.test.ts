import { describe, it, expect } from "vitest";
import {
  contrastRatio,
  WCAG_AA_NORMAL,
  WCAG_AA_LARGE,
} from "../a11y/contrast.js";
import { defaultBrand } from "./brands/default.js";
import { goldenPassport } from "./brands/golden-passport.js";
import type { BrandTokens, ColorMode } from "./types.js";

const brands: BrandTokens[] = [defaultBrand, goldenPassport];
const modes: ColorMode[] = ["light", "dark"];

/**
 * Validate that the brand's semantic color pairs meet WCAG AA in both modes.
 * Components reference these tokens, so failures here mean a real a11y bug.
 */
describe.each(brands)("brand $name", (brand) => {
  describe.each(modes)("in %s mode", (mode) => {
    const s = brand.semantic;
    const surfacePrimary = s.background.primary.default[mode];
    const surfaceSecondary = s.background.secondary.default[mode];

    // ---- Text on backgrounds ----
    it("text.regular on bg.primary ≥ AA normal (4.5:1)", () => {
      expect(
        contrastRatio(s.text.regular[mode], surfacePrimary),
      ).toBeGreaterThanOrEqual(WCAG_AA_NORMAL);
    });

    it("text.regular on bg.secondary ≥ AA normal (4.5:1)", () => {
      expect(
        contrastRatio(s.text.regular[mode], surfaceSecondary),
      ).toBeGreaterThanOrEqual(WCAG_AA_NORMAL);
    });

    it("text.subtle on bg.primary ≥ AA normal (4.5:1)", () => {
      expect(
        contrastRatio(s.text.subtle[mode], surfacePrimary),
      ).toBeGreaterThanOrEqual(WCAG_AA_NORMAL);
    });

    it("text.subtle on bg.secondary ≥ AA normal (4.5:1)", () => {
      expect(
        contrastRatio(s.text.subtle[mode], surfaceSecondary),
      ).toBeGreaterThanOrEqual(WCAG_AA_NORMAL);
    });

    it("text.link on bg.primary ≥ AA normal (4.5:1)", () => {
      expect(
        contrastRatio(s.text.link[mode], surfacePrimary),
      ).toBeGreaterThanOrEqual(WCAG_AA_NORMAL);
    });

    it("text.linkHover on bg.primary ≥ AA normal (4.5:1)", () => {
      expect(
        contrastRatio(s.text.linkHover[mode], surfacePrimary),
      ).toBeGreaterThanOrEqual(WCAG_AA_NORMAL);
    });

    // ---- Brand surface ----
    it("brand.on on brand.default ≥ AA normal (4.5:1) — primary buttons carry body text", () => {
      expect(
        contrastRatio(s.brand.on[mode], s.brand.default[mode]),
      ).toBeGreaterThanOrEqual(WCAG_AA_NORMAL);
    });

    it("brand.on on brand.hover ≥ AA normal (4.5:1)", () => {
      expect(
        contrastRatio(s.brand.on[mode], s.brand.hover[mode]),
      ).toBeGreaterThanOrEqual(WCAG_AA_NORMAL);
    });

    it("brand.default on bg.primary ≥ AA large (3:1) — usable as accent", () => {
      expect(
        contrastRatio(s.brand.default[mode], surfacePrimary),
      ).toBeGreaterThanOrEqual(WCAG_AA_LARGE);
    });

    it("brand.text on bg.primary ≥ AA normal (4.5:1)", () => {
      expect(
        contrastRatio(s.brand.text[mode], surfacePrimary),
      ).toBeGreaterThanOrEqual(WCAG_AA_NORMAL);
    });

    // ---- Icons ----
    it("icon.regular on bg.primary ≥ AA large (3:1)", () => {
      expect(
        contrastRatio(s.icon.regular[mode], surfacePrimary),
      ).toBeGreaterThanOrEqual(WCAG_AA_LARGE);
    });

    it("icon.subtle on bg.primary ≥ AA large (3:1)", () => {
      expect(
        contrastRatio(s.icon.subtle[mode], surfacePrimary),
      ).toBeGreaterThanOrEqual(WCAG_AA_LARGE);
    });

    // ---- Borders ----
    // NOTE: WCAG SC 1.4.11 requires 3:1 only for "essential" UI components.
    // Decorative dividers/card outlines are exempt. We don't enforce the
    // border ≥ 3:1 rule here because that would force heavy "boxy" UI in
    // every brand. Use brand.default (which is enforced ≥ 3:1) for visible
    // structural elements like focus rings or selected-state outlines.
    // Sanity check only: borderSubtle should not be more visible than border.
    it("nonstatus.borderSubtle is no stronger than nonstatus.border", () => {
      const subtle = contrastRatio(s.nonstatus.borderSubtle[mode], surfacePrimary);
      const border = contrastRatio(s.nonstatus.border[mode], surfacePrimary);
      expect(subtle).toBeLessThanOrEqual(border + 0.01);
    });

    // ---- Status colors ----
    describe.each(["success", "warning", "danger", "info"] as const)(
      "status.%s",
      (statusKey) => {
        it("text on its own background ≥ AA normal (4.5:1)", () => {
          const status = s.status[statusKey];
          expect(
            contrastRatio(status.text[mode], status.background[mode]),
          ).toBeGreaterThanOrEqual(WCAG_AA_NORMAL);
        });

        it("text on its hover background ≥ AA normal (4.5:1)", () => {
          const status = s.status[statusKey];
          expect(
            contrastRatio(status.text[mode], status.hover[mode]),
          ).toBeGreaterThanOrEqual(WCAG_AA_NORMAL);
        });

        it("icon on its own background ≥ AA large (3:1)", () => {
          const status = s.status[statusKey];
          expect(
            contrastRatio(status.icon[mode], status.background[mode]),
          ).toBeGreaterThanOrEqual(WCAG_AA_LARGE);
        });

        it("icon on bg.primary ≥ AA large (3:1)", () => {
          const status = s.status[statusKey];
          expect(
            contrastRatio(status.icon[mode], surfacePrimary),
          ).toBeGreaterThanOrEqual(WCAG_AA_LARGE);
        });
      },
    );
  });
});
