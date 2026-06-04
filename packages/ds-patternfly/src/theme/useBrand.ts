import type { BrandTokens } from "../tokens/types.js";
import { useTheme } from "./ThemeProvider.js";

/** Convenience hook returning just the active brand. */
export function useBrand(): BrandTokens {
  return useTheme().brand;
}
