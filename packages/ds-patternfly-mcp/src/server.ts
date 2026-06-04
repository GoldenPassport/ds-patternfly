/**
 * MCP server — registers tools + resources for the DS lib.
 *
 * Tools (callable from any MCP client):
 *   - searchGpDocs(query): fuzzy search the docs catalog
 *   - useGpDocs(id):       fetch full details for a doc item
 *
 * Resources (URI scheme `gp-ds://`):
 *   - gp-ds://context           system prompt / cheat sheet
 *   - gp-ds://docs/index        full catalog (JSON)
 *   - gp-ds://docs/{id}         single doc item (JSON)
 */
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { catalog, get, search, storybookUrlFor } from "./catalog.js";

const CONTEXT_BODY = `# @golden-passport/ds-patternfly — coding rules

You are about to write code that consumes the \`@golden-passport/ds-patternfly\`
design system. The lib is brand-aware via a dial system of CSS custom
properties — don't hard-code values that the dials own.

## Setup (app entry, one time)
\`\`\`ts
import "@patternfly/react-core/dist/styles/base.css";   // PF6 base FIRST
import "@golden-passport/ds-patternfly/styles";         // lib styles LAST
\`\`\`
Wrap the app root:
\`\`\`tsx
import { ThemeProvider } from "@golden-passport/ds-patternfly";
import { goldenPassport } from "@golden-passport/ds-patternfly/brands";
<ThemeProvider brand={goldenPassport} mode="light" focusRing="outer">
  <App />
</ThemeProvider>
\`\`\`

## Things that flow from dials — don't override
- Field / button height → \`--gp-control-pad-y\` (resolves to 2.25rem = 36px via padding + line-height)
- Border thickness → \`--gp-border-width\` (1px) / \`--gp-border-width-strong\` (2px hover/focus)
- Radius → \`--gp-radius-control\`, \`--gp-radius-card\`, \`--gp-radius-pill\`
- Surface colours → \`--gp-color-bg-primary-default\`, \`--gp-color-bg-secondary-default\`, \`--gp-color-bg-elevated\`
- Text → \`--gp-color-text-regular\`, \`--gp-color-text-subtle\`
- Borders on elevated surfaces → \`--gp-popover-stroke\` (color-mix derived, not a raw hex)

## Surface tinting
Popovers and bottom-sheets in light mode are tinted *darker* than the
page (and lighter in dark mode). Borders and text inside them use
\`color-mix()\` recipes that self-balance against the surface. Don't
reach for page-level border tokens inside a popover — use
\`--gp-popover-stroke\`.

## Common pitfalls
- \`height: 36px\` on inputs / buttons — remove, dial owns it
- Custom \`border-radius\` on form-controls — use the dial
- Per-brand colour hex — wrong; the brand object drives this
- \`<NumberInput>\` for full brand styling — prefer the explicit
  \`Button(tertiary) + TextInput + Button(tertiary)\` composition (see
  the NumberInput story)

Use \`searchGpDocs\` to find a component by name, intent, or token,
then \`useGpDocs\` to pull the full entry (Storybook URL, summary,
relevant tokens).
`;

export function createServer(): McpServer {
  const server = new McpServer(
    {
      name: catalog.library.name + "-mcp",
      version: catalog.library.version,
    },
    {
      capabilities: { tools: {}, resources: {}, logging: {} },
      instructions: CONTEXT_BODY,
    },
  );

  // ---------- Tools ----------

  server.registerTool(
    "searchGpDocs",
    {
      title: "Search Golden Passport DS docs",
      description:
        "Fuzzy-search the @golden-passport/ds-patternfly docs catalog by name, intent, token, or tag. Returns up to 8 matches with id, title, summary, and Storybook URL. Use this first to discover the right component / recipe / guideline before calling useGpDocs for details.",
      inputSchema: {
        query: z
          .string()
          .min(1)
          .describe(
            "Free-text query — component name (e.g. 'DatePicker'), intent ('schedule a future task'), brand token ('--gp-control-pad-y'), or tag ('date calendar').",
          ),
        limit: z
          .number()
          .int()
          .min(1)
          .max(20)
          .optional()
          .describe("Max results (default 8)"),
      },
    },
    async ({ query, limit }) => {
      const results = search(query, limit ?? 8);
      const payload = results.map((item) => ({
        id: item.id,
        kind: item.kind,
        title: item.title,
        summary: item.summary,
        ...(item.tags ? { tags: item.tags } : {}),
        ...(storybookUrlFor(item)
          ? { storybookUrl: storybookUrlFor(item) }
          : {}),
      }));
      return {
        content: [
          {
            type: "text",
            text:
              payload.length === 0
                ? `No matches for "${query}". Try a broader query or check Storybook directly: ${catalog.library.storybook}`
                : JSON.stringify(payload, null, 2),
          },
        ],
      };
    },
  );

  server.registerTool(
    "useGpDocs",
    {
      title: "Fetch a Golden Passport DS doc item",
      description:
        "Return the full doc entry for a single catalog item by id (use searchGpDocs to discover ids). Payload includes the item's summary, kind, tags, key brand tokens (when relevant), import statement (when a component), and Storybook URL.",
      inputSchema: {
        id: z
          .string()
          .min(1)
          .describe(
            "Catalog id, e.g. 'components/forms/date-and-time/datepicker' or 'foundations/theming/dials'. Use searchGpDocs first to discover ids.",
          ),
      },
    },
    async ({ id }) => {
      const item = get(id);
      if (!item) {
        return {
          isError: true,
          content: [
            {
              type: "text",
              text: `No doc item found for id "${id}". Use searchGpDocs to discover valid ids.`,
            },
          ],
        };
      }
      const payload = {
        ...item,
        ...(storybookUrlFor(item)
          ? { storybookUrl: storybookUrlFor(item) }
          : {}),
        library: catalog.library,
      };
      return {
        content: [
          { type: "text", text: JSON.stringify(payload, null, 2) },
        ],
      };
    },
  );

  // ---------- Resources ----------

  // gp-ds://context — coding cheat sheet (also surfaced as `instructions`
  // on the server, but resource form lets clients pull it on demand).
  server.registerResource(
    "gp-ds-context",
    "gp-ds://context",
    {
      title: "Golden Passport DS — coding rules",
      description:
        "High-level cheat sheet for authoring code against the lib (setup, dials, common pitfalls).",
      mimeType: "text/markdown",
    },
    async () => ({
      contents: [
        {
          uri: "gp-ds://context",
          mimeType: "text/markdown",
          text: CONTEXT_BODY,
        },
      ],
    }),
  );

  // gp-ds://docs/index — the full catalog as JSON.
  server.registerResource(
    "gp-ds-docs-index",
    "gp-ds://docs/index",
    {
      title: "Golden Passport DS — docs index",
      description: "Full catalog of components, recipes, and guidelines.",
      mimeType: "application/json",
    },
    async () => ({
      contents: [
        {
          uri: "gp-ds://docs/index",
          mimeType: "application/json",
          text: JSON.stringify(catalog, null, 2),
        },
      ],
    }),
  );

  return server;
}
