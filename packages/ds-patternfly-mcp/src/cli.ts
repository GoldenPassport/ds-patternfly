#!/usr/bin/env node
/**
 * MCP server entry point — wires the registered tools/resources to
 * the stdio transport. MCP clients spawn this process and talk to it
 * via JSON-RPC over stdin/stdout (and never touch stdout for anything
 * else, hence stderr logging only).
 */
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createServer } from "./server.js";

const args = new Set(process.argv.slice(2));
const verbose = args.has("--verbose") || args.has("-v");

async function main() {
  const server = createServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);
  if (verbose) {
    // stderr only — stdout is the JSON-RPC channel.
    process.stderr.write(
      "[gp-ds-mcp] connected via stdio. Waiting for client...\n",
    );
  }
}

main().catch((err) => {
  process.stderr.write(`[gp-ds-mcp] fatal: ${String(err)}\n`);
  process.exit(1);
});
