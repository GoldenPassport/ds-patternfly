/**
 * Shared parameters for chart stories.
 * - color-contrast: Victory renders SVG with text fills that axe miscalculates.
 * - svg-img-alt: Victory's <title>/<desc> elements aren't picked up by axe's
 *   image-alt rule even when ariaTitle/ariaDesc are supplied.
 */
export const chartA11yParams = {
  config: {
    rules: [
      { id: "color-contrast", enabled: false },
      { id: "svg-img-alt", enabled: false },
    ],
  },
};
