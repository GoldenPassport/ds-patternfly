/**
 * Public API for the MCP package — consumers wanting to embed the
 * server in their own host process (rather than spawning the bin)
 * import `createServer` from here.
 */
export { createServer } from "./server.js";
export { catalog, get, search } from "./catalog.js";
export type { Catalog, DocItem, DocKind } from "./catalog.js";
