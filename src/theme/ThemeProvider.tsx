import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  type ReactNode,
} from "react";

// useLayoutEffect runs synchronously before paint — what we want for the
// dark-theme class so PF6's :root-scoped dark rules land on the first
// frame. Falls back to useEffect on the server to silence React's SSR
// warning (the lib targets the browser anyway).
const useIsomorphicLayoutEffect =
  typeof document === "undefined" ? useEffect : useLayoutEffect;
import type { BrandTokens, ColorMode } from "../tokens/types.js";
import { brandCssRule } from "../tokens/toCssVars.js";

export type Direction = "ltr" | "rtl";
export type { ColorMode };

/**
 * Where the focus ring sits across the system — inputs, buttons, menu
 * toggles, dropdowns, the lot.
 *
 *   "outer" — Default. Ring sits outside the element border via a positive
 *             offset. Consistent with PF6's button/menu defaults and matches
 *             the convention most web apps use.
 *   "inner" — Ring is drawn inset via a negative offset. Compact, doesn't
 *             shift layout, but reads tighter. Matches PF6's stock input
 *             style; we propagate it to buttons and menus too so the system
 *             stays consistent.
 *
 * PF6 ships a mixed default (inputs inner, everything else outer). Both
 * options here normalise that — pick the one that fits the app's density.
 */
export type FocusRing = "inner" | "outer";

interface ThemeContextValue {
  brand: BrandTokens;
  mode: ColorMode;
  dir: Direction;
  focusRing: FocusRing;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export interface ThemeProviderProps {
  brand: BrandTokens;
  /** Color mode: "light" or "dark". Defaults to "light". */
  mode?: ColorMode;
  /** Text direction. Defaults to "ltr". The provider applies it to its container,
   *  not to <html>, so the consuming app stays in control of document-level state. */
  dir?: Direction;
  /**
   * Focus-ring placement across inputs, buttons, menus, and dropdowns.
   * Default `"outer"`. See `FocusRing` for the visual trade-off.
   */
  focusRing?: FocusRing;
  children: ReactNode;
}

export function ThemeProvider({
  brand,
  mode = "light",
  dir = "ltr",
  focusRing = "outer",
  children,
}: ThemeProviderProps) {
  // Inject rules for both modes so a child subtree can override the mode
  // (e.g. a dark callout inside a light page) by re-rendering ThemeProvider.
  //
  // Renders the <style> inline as part of the React tree (not via a useEffect)
  // so the brand CSS is present on the first paint. A useEffect injection
  // would land after first paint — components flash with PF6 defaults
  // (stock blue) and then repaint with brand colours, the FOUC consumers
  // see in dev. Inline render eliminates that gap.
  const css = useMemo(
    () => `${brandCssRule(brand, "light")}\n${brandCssRule(brand, "dark")}`,
    [brand],
  );

  // PatternFly 6 scopes its dark-theme token rules to `:root:where(.pf-v6-theme-dark)`,
  // i.e. the class must be on the document root (<html>) for PF6 dark
  // tokens to flip. Putting the class on a descendant `display: contents`
  // div doesn't satisfy `:root` and silently leaves Tooltip, Skeleton,
  // Label, and any inverse-color component stuck in the light-mode chain.
  // We toggle the class on documentElement here so PF6's dark theme
  // actually activates. The brand `[data-brand][data-mode="dark"]` rule
  // still layers our brand colors on top.
  useIsomorphicLayoutEffect(() => {
    if (mode !== "dark") return;
    const root = document.documentElement;
    const had = root.classList.contains("pf-v6-theme-dark");
    root.classList.add("pf-v6-theme-dark");
    return () => {
      // Only remove if we were the ones who added it.
      if (!had) root.classList.remove("pf-v6-theme-dark");
    };
  }, [mode]);

  // Mirror `data-brand` + `data-mode` onto <html> as well as the wrapper
  // div. Without this, content portaled outside the wrapper (PF6 popovers,
  // menus, modals, drawers — anything using `appendTo: () => document.body`)
  // doesn't see the `[data-brand][data-mode]` rule and falls back to PF6
  // defaults — brand colours don't reach the popover content. Setting on
  // `<html>` makes the brand vars cascade to every node in the tree
  // including portals.
  useIsomorphicLayoutEffect(() => {
    const root = document.documentElement;
    const prevBrand = root.getAttribute("data-brand");
    const prevMode = root.getAttribute("data-mode");
    root.setAttribute("data-brand", brand.name);
    root.setAttribute("data-mode", mode);
    return () => {
      if (prevBrand === null) root.removeAttribute("data-brand");
      else root.setAttribute("data-brand", prevBrand);
      if (prevMode === null) root.removeAttribute("data-mode");
      else root.setAttribute("data-mode", prevMode);
    };
  }, [brand.name, mode]);

  const value = useMemo<ThemeContextValue>(
    () => ({ brand, mode, dir, focusRing }),
    [brand, mode, dir, focusRing],
  );

  // Compose class list:
  //   - `pf-v6-theme-dark`        — see comment above re :root
  //   - `gp-focus-ring-{outer|inner}` — selects the focus-ring style for
  //     inputs, buttons, menus, and dropdowns. Default outer is consistent
  //     with PF6 button/menu defaults. Inner forces the inset style across
  //     the whole system.
  const classes = [
    mode === "dark" ? "pf-v6-theme-dark" : null,
    `gp-focus-ring-${focusRing}`,
  ].filter(Boolean);
  const className = classes.length > 0 ? classes.join(" ") : undefined;

  return (
    <ThemeContext.Provider value={value}>
      {/* Inline brand-rule style — present on first paint, no FOUC. The
          `data-gp-theme` attribute lets dev tools and consumer code find
          the rule block; React de-dupes identical text content across
          re-renders so this isn't churn. */}
      <style data-gp-theme={brand.name}>{css}</style>
      <div
        data-brand={brand.name}
        data-mode={mode}
        dir={dir}
        className={className}
        style={{ display: "contents" }}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error(
      "useTheme must be used within a <ThemeProvider> from @golden-passport/ds-patternfly",
    );
  }
  return ctx;
}
