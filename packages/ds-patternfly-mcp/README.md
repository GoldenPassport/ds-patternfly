# @golden-passport/ds-patternfly-mcp

Model Context Protocol server for `@golden-passport/ds-patternfly`.

Lets AI coding agents (Claude Code, Cursor, Continue, etc.) discover the
right components, recipes, and brand tokens directly from the lib's
docs catalog — instead of guessing component names, hallucinating CSS
variables, or pulling outdated examples.

## What it exposes

### Tools

| Tool | Purpose |
|---|---|
| `searchGpDocs(query, limit?)` | Fuzzy-search the catalog by component name, intent, brand token, or tag. Returns up to 8 matches. |
| `useGpDocs(id)` | Fetch the full doc entry for a single id (kind, summary, tags, import statement, Storybook URL, key tokens). |

### Resources (`gp-ds://` URI scheme)

| URI | Content |
|---|---|
| `gp-ds://context` | Coding cheat sheet (setup, dials, common pitfalls) |
| `gp-ds://docs/index` | Full catalog as JSON |

The same cheat sheet is also surfaced as the server's `instructions` so
clients that respect it pick up the rules automatically on connect.

## Install

### Claude Code

```bash
claude mcp add gp-ds-mcp -s user -- npx -y @golden-passport/ds-patternfly-mcp@latest
```

### Cursor / Continue / Anything that reads `mcpServers` config

```json
{
  "mcpServers": {
    "gp-ds-mcp": {
      "command": "npx",
      "args": ["-y", "@golden-passport/ds-patternfly-mcp@latest"],
      "description": "Golden Passport DS documentation"
    }
  }
}
```

## Local development

```bash
cd mcp
pnpm install
pnpm dev          # tsx watch — re-runs on source change
pnpm build        # tsup → dist/
pnpm start        # node dist/cli.js
```

To smoke-test against the published Anthropic Inspector:

```bash
npx @modelcontextprotocol/inspector node dist/cli.js
```

## How the catalog is maintained

`src/docs.json` is a hand-curated index of the lib's components,
recipes, and guidelines. Each entry has:

- `id` — stable slash-path used by `useGpDocs`
- `kind` — `foundation | component | recipe | guideline`
- `title`, `summary`, `tags` — searchable surface
- `storybookUrl` — relative Storybook path; combined with the library's
  base URL into a full link at lookup time
- `keyTokens`, `import` — surfaced where relevant

Adding a new entry: edit `src/docs.json`, rebuild, publish a patch
release. No code change needed unless you're adding new tool semantics.

## Architecture

Modelled on [`@patternfly/patternfly-mcp`](https://github.com/patternfly/patternfly-mcp) —
same `searchX / useX` tool shape, same `<scheme>://` resource pattern,
docs bundled statically into the package so the server works offline.

- Built on the official `@modelcontextprotocol/sdk` (server side, stdio
  transport).
- Single bundled ESM output via `tsup`.
- Node 20+ runtime.
