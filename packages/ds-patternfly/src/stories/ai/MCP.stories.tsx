import type { Meta, StoryObj } from "@storybook/react-vite";
import { FoundationPage, Section, Card, CodeBlock } from "../_storyKit.js";

const meta: Meta = {
  title: "AI/MCP",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="MCP — Model Context Protocol"
      intro={
        <>
          The lib ships an MCP server —{" "}
          <code>@golden-passport/ds-patternfly-mcp</code> — that exposes
          the docs catalog (every Storybook story, plus foundations,
          recipes, and guidelines) to AI coding agents. Point your
          agent at the server and it can search the catalog, pull
          summaries, and link directly to Storybook instead of
          hallucinating component names, props, or brand tokens.
        </>
      }
    >
      <Section
        title="What it exposes"
        description="Two callable tools, two URI-addressed resources, and the coding cheat sheet as the server's instructions."
      >
        <Card>
          <ul
            style={{
              margin: 0,
              padding: "16px 24px 16px 40px",
              color: "var(--gp-color-text-regular)",
              lineHeight: 1.8,
            }}
          >
            <li>
              <strong>
                <code>searchGpDocs(query, limit?)</code>
              </strong>{" "}
              — fuzzy-search the catalog by component name, intent,
              brand token, or tag. Returns up to 8 matches as JSON{" "}
              <code>
                {"{ id, kind, title, summary, tags, storybookUrl }"}
              </code>
              .
            </li>
            <li>
              <strong>
                <code>useGpDocs(id)</code>
              </strong>{" "}
              — fetch the full entry for one id (use{" "}
              <code>searchGpDocs</code> first to find ids). Includes
              the import statement, key brand tokens, and the
              full Storybook link.
            </li>
            <li>
              <strong>
                <code>gp-ds://context</code>
              </strong>{" "}
              resource — coding cheat sheet (setup steps, dial
              system, common pitfalls). Also surfaced as the
              server&apos;s <code>instructions</code> so clients that
              respect it auto-prime on connect.
            </li>
            <li>
              <strong>
                <code>gp-ds://docs/index</code>
              </strong>{" "}
              resource — the full catalog JSON for clients that want
              to enumerate offline.
            </li>
          </ul>
        </Card>
      </Section>

      <Section
        title="Install — Claude Code"
        description="One command. Server auto-spawns on demand via npx."
      >
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <CodeBlock>{`claude mcp add gp-ds-mcp -s user -- npx -y @golden-passport/ds-patternfly-mcp@latest`}</CodeBlock>
            <p
              style={{
                margin: 0,
                color: "var(--gp-color-text-subtle)",
                fontSize: 14,
              }}
            >
              <code>-s user</code> registers the server in your user
              config so it&apos;s available across every project, not
              just the current cwd. Drop the flag if you only want it
              for this repo.
            </p>
          </div>
        </Card>
      </Section>

      <Section
        title="Install — Cursor, Continue, anything reading mcpServers"
        description="Drop the entry into the host's mcpServers config (settings.json, .cursor/mcp.json, .continue/config.json — exact path varies by client). Format is standard MCP, so it works in any spec-compliant host."
      >
        <Card>
          <div style={{ padding: 24 }}>
            <CodeBlock>{`{
  "mcpServers": {
    "gp-ds-mcp": {
      "command": "npx",
      "args": ["-y", "@golden-passport/ds-patternfly-mcp@latest"],
      "description": "Golden Passport DS documentation"
    }
  }
}`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section
        title="Verifying it's wired"
        description="Two ways to check the server is alive and the catalog is loaded."
      >
        <Card>
          <ul
            style={{
              margin: 0,
              padding: "16px 24px 16px 40px",
              color: "var(--gp-color-text-regular)",
              lineHeight: 1.8,
            }}
          >
            <li>
              <strong>Ask the agent</strong> &quot;search the GP DS
              docs for DatePicker&quot;. The agent should call{" "}
              <code>searchGpDocs</code> and return a JSON entry with
              the Storybook URL. If you see a guessed import path
              instead, the server isn&apos;t connected.
            </li>
            <li>
              <strong>Run the Anthropic Inspector</strong>:
              <CodeBlock>{`npx @modelcontextprotocol/inspector \\
  npx -y @golden-passport/ds-patternfly-mcp@latest`}</CodeBlock>
              Opens a UI you can use to call the tools and read the
              resources directly — useful when debugging a client that
              isn&apos;t showing the tools list.
            </li>
          </ul>
        </Card>
      </Section>

      <Section
        title="Why use it"
        description="What you gain vs letting the agent guess from training data."
      >
        <Card>
          <ul
            style={{
              margin: 0,
              padding: "16px 24px 16px 40px",
              color: "var(--gp-color-text-regular)",
              lineHeight: 1.8,
            }}
          >
            <li>
              <strong>No hallucinated APIs.</strong> Tools return
              real component names, real Storybook URLs, real brand
              tokens. The agent reads the catalog instead of
              pattern-matching from PF6 docs it scraped at training
              time.
            </li>
            <li>
              <strong>Lib version in the payload.</strong> Each
              response includes the lib version, so the agent
              authors against the version actually installed.
            </li>
            <li>
              <strong>Brand-dial-aware.</strong> The cheat sheet
              tells the agent to use dials (
              <code>--gp-control-pad-y</code>,{" "}
              <code>--gp-popover-stroke</code>, etc.) instead of
              hard-coding pixel values — which is the single most
              common source of brand-fight when an agent writes DS
              code from memory.
            </li>
            <li>
              <strong>Discovers recipes.</strong> The catalog includes
              hand-curated recipes (e.g. PageHeader-with-tabs,
              FuturePicker modal) that don&apos;t exist as importable
              components — the agent finds them by intent instead of
              re-implementing.
            </li>
          </ul>
        </Card>
      </Section>

      <Section
        title="What's in the catalog"
        description="Every Storybook story plus the foundation / guideline pages, auto-generated at MCP build time."
      >
        <Card>
          <ul
            style={{
              margin: 0,
              padding: "16px 24px 16px 40px",
              color: "var(--gp-color-text-regular)",
              lineHeight: 1.8,
            }}
          >
            <li>
              <strong>Components</strong> — every PF6-wrapped or
              lib-native component (Button, TextInput, NumberInput,
              DatePicker, FuturePicker, Modal, …).
            </li>
            <li>
              <strong>Component groups</strong> — composed surfaces
              (PageHeader, ServiceCard, ErrorState, …).
            </li>
            <li>
              <strong>Charts</strong> — every chart variant with its
              recommended use case.
            </li>
            <li>
              <strong>Foundations</strong> — theming, brand dials,
              spacers, radius, focus.
            </li>
            <li>
              <strong>Patterns</strong> — multi-component recipes
              (LoginPage, password strength, …).
            </li>
            <li>
              <strong>Guidelines</strong> — sizing, surface tinting,
              migration notes.
            </li>
          </ul>
        </Card>
      </Section>

      <Section
        title="Architecture (for the curious)"
        description="The MCP is its own sibling npm package so the main lib's runtime deps stay clean."
      >
        <Card>
          <ul
            style={{
              margin: 0,
              padding: "16px 24px 16px 40px",
              color: "var(--gp-color-text-regular)",
              lineHeight: 1.8,
            }}
          >
            <li>
              Lives at <code>mcp/</code> in the lib repo.
              Self-contained <code>package.json</code>, published
              separately as{" "}
              <code>@golden-passport/ds-patternfly-mcp</code>.
            </li>
            <li>
              Built on the official{" "}
              <code>@modelcontextprotocol/sdk</code> with the stdio
              transport. Single bundled ESM output via{" "}
              <code>tsup</code>; Node 20+ runtime.
            </li>
            <li>
              Catalog is <em>generated</em> from the story files at
              MCP build time —{" "}
              <code>mcp/scripts/build-catalog.mjs</code> walks
              <code>src/stories/*.stories.tsx</code>, extracts titles
              and intro JSX, writes <code>docs.data.json</code>. The
              bundler inlines it so the published package works
              offline with no live fetch to Storybook.
            </li>
            <li>
              Adding a new story → it&apos;s in the next MCP release
              automatically. Run <code>pnpm gen</code> inside{" "}
              <code>mcp/</code> to re-sync the catalog locally.
            </li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
