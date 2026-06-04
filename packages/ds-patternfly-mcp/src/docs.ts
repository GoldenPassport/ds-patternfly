/**
 * Inline import of the docs catalog.
 *
 * The data lives in docs.data.json (hand-edited, plain JSON for tooling
 * support like JSON-schema validation later). At build time we import
 * it via `resolveJsonModule` and re-export as a typed module — that way
 * the bundler inlines the data and node doesn't need ESM JSON-import
 * attributes (`with { type: "json" }`), which tsup currently strips.
 */
import data from "./docs.data.json";
export default data;
