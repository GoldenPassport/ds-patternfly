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
import {
  McpServer,
  ResourceTemplate,
} from "@modelcontextprotocol/sdk/server/mcp.js";
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
import { ThemeProvider, goldenPassport } from "@golden-passport/ds-patternfly";
<ThemeProvider brand={goldenPassport} mode="light" focusRing="outer">
  <App />
</ThemeProvider>
\`\`\`

## Exported components
Beyond theming, the lib exports ready-made components — \`Shell\`,
\`PrimaryDetailLayout\`, \`Hyperlink\`, \`AiAssistant\` — each with a
\`labels\` i18n contract (\`xxxEnLabels\` defaults) and slot props. Their
catalog entries carry \`import\`, \`props\`, and \`usage\`; large ones also
list end-to-end \`examples\` — fetch full example source with
\`getGpExample\`.

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
then \`useGpDocs\` to pull the full entry (Storybook URL, summary, props,
import statement, relevant tokens). Most entries carry a per-story
example file — \`getGpExample(id)\` returns its full, self-contained
source (real package imports, composition, data). \`getGpComponent(name)\`
returns the DS component file itself.
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
      // Example and component sources are large — return names/hints here
      // and point at getGpExample / getGpComponent for the full code.
      const { examples, componentSource, ...rest } = item;
      const payload = {
        ...rest,
        ...(componentSource
          ? {
              componentSourceHint: `Call getGpComponent with name "${item.title}" for the DS component file's full source.`,
            }
          : {}),
        ...(examples
          ? {
              examples: examples.map(({ name, description }) => ({
                name,
                ...(description ? { description } : {}),
              })),
              examplesHint: `Call getGpExample with id "${item.id}" for full, self-contained example source (imports, setup, composition).`,
            }
          : {}),
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

  server.registerTool(
    "getGpExample",
    {
      title: "Fetch a Golden Passport DS end-to-end example",
      description:
        "Return the full source of an exported component's end-to-end example app — real package imports, app-entry setup, composition, and data wiring. Use useGpDocs first to see which examples an entry lists; omit exampleName to get all of them.",
      inputSchema: {
        id: z
          .string()
          .min(1)
          .describe("Catalog id (from searchGpDocs / useGpDocs), e.g. 'ai-chat'."),
        exampleName: z
          .string()
          .optional()
          .describe(
            "Specific example name (from the entry's `examples` list), e.g. 'AssistantInShell'. Omit for all examples on the entry.",
          ),
      },
    },
    async ({ id, exampleName }) => {
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
      const all = item.examples ?? [];
      const selected = exampleName
        ? all.filter((e) => e.name === exampleName)
        : all;
      if (selected.length === 0) {
        return {
          isError: true,
          content: [
            {
              type: "text",
              text:
                all.length === 0
                  ? `"${id}" has no embedded examples. Entries with examples list them in useGpDocs.`
                  : `No example named "${exampleName}" on "${id}". Available: ${all
                      .map((e) => e.name)
                      .join(", ")}.`,
            },
          ],
        };
      }
      return {
        content: selected.map((e) => ({
          type: "text" as const,
          text: `// ${e.name}${e.description ? ` — ${e.description}` : ""}\n${e.source}`,
        })),
      };
    },
  );

  server.registerTool(
    "getGpComponent",
    {
      title: "Fetch a Golden Passport DS component's source",
      description:
        "Return the full source of a DS component file (the thin PF6 wrapper or DS-own component) by its exported name, e.g. 'Button', 'AiAssistant'. Useful to see exactly what the DS layer adds, or to vendor the file. Entries with a componentSourceHint in useGpDocs support this.",
      inputSchema: {
        name: z
          .string()
          .min(1)
          .describe("Component name as exported, e.g. 'Button' or 'Table'."),
      },
    },
    async ({ name }) => {
      const item = catalog.items.find(
        (i) => i.title === name && i.componentSource,
      );
      if (!item) {
        return {
          isError: true,
          content: [
            {
              type: "text",
              text: `No component source for "${name}". Component names match their story titles (searchGpDocs to discover); only DS component files are served.`,
            },
          ],
        };
      }
      return {
        content: [
          {
            type: "text",
            text: `// ${name}.tsx — @golden-passport/ds-patternfly component source\n${item.componentSource}`,
          },
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

  // gp-ds://examples/{id}/{name} — full source of one embedded example.
  server.registerResource(
    "gp-ds-example",
    new ResourceTemplate("gp-ds://examples/{id}/{name}", { list: undefined }),
    {
      title: "Golden Passport DS — example source",
      description:
        "Full source of an exported component's end-to-end example app.",
      mimeType: "text/x.typescript-jsx",
    },
    async (uri, { id, name }) => {
      const item = get(String(id));
      const example = item?.examples?.find((e) => e.name === String(name));
      if (!example) {
        throw new Error(`No example "${name}" on doc item "${id}".`);
      }
      return {
        contents: [
          {
            uri: uri.href,
            mimeType: "text/x.typescript-jsx",
            text: example.source,
          },
        ],
      };
    },
  );

  return server;
}
