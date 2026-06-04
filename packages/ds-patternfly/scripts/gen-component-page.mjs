#!/usr/bin/env node
/**
 * Scaffold a Components/<Name> story page with the standard 5-section
 * skeleton (live demo, props, accessibility, when-to-use, code).
 *
 * Usage:
 *   node scripts/gen-component-page.mjs <Name> [Subgroup]
 *
 * Examples:
 *   node scripts/gen-component-page.mjs Button
 *     → src/stories/components/Button.stories.tsx
 *
 *   node scripts/gen-component-page.mjs TextInput Forms
 *     → src/stories/components/Forms/TextInput.stories.tsx
 *     → title: "Components/Forms/TextInput"
 *
 * Refuses to overwrite an existing file unless --force is passed.
 */
import { mkdir, writeFile, access } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");

const args = process.argv.slice(2);
const force = args.includes("--force");
const positional = args.filter((a) => !a.startsWith("--"));
const [name, subgroup] = positional;

if (!name) {
  console.error("Usage: gen-component-page <Name> [Subgroup] [--force]");
  process.exit(1);
}

if (!/^[A-Z][A-Za-z0-9]*$/.test(name)) {
  console.error(`Name must be PascalCase (got "${name}").`);
  process.exit(1);
}

const subDir = subgroup ? `${subgroup}/` : "";
const titlePath = subgroup ? `Components/${subgroup}/${name}` : `Components/${name}`;
const outPath = resolve(root, `src/stories/components/${subDir}${name}.stories.tsx`);
const demoKitImport = subgroup ? "../../_demoKit.js" : "../_demoKit.js";
const storyKitImport = subgroup ? "../../_storyKit.js" : "../_storyKit.js";

try {
  await access(outPath);
  if (!force) {
    console.error(`✗ ${outPath} already exists. Pass --force to overwrite.`);
    process.exit(1);
  }
} catch {
  // doesn't exist — fine
}

const template = `import type { Meta, StoryObj } from "@storybook/react";
import { ${name} } from "@patternfly/react-core";
import { FoundationPage, Section, Card, CodeBlock } from "${storyKitImport}";
import { DemoFrame, PropsTable } from "${demoKitImport}";

const meta: Meta = {
  title: "${titlePath}",
  parameters: { layout: "padded" },
};
export default meta;

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="${name}"
      intro={
        <>
          {/* TODO: 1–2 sentence summary of what this component does and the
              single most common use case. */}
        </>
      }
    >
      <Section title="Live demo">
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame>
              <${name} />
            </DemoFrame>
            <CodeBlock>{\`import { ${name} } from "@patternfly/react-core";

<${name} />\`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section title="Props" description="Most-used props. See PatternFly docs for the full surface.">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                {
                  name: "TODO",
                  type: "TODO",
                  description: "TODO — paste from \`pnpm gen:props ${name}\`.",
                },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section
        title="Accessibility"
        description="What this component requires from the consumer to stay WCAG 2.2 AA."
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
              {/* TODO: required ARIA props (aria-label, aria-labelledby, role) */}
            </li>
            <li>
              {/* TODO: keyboard model (Tab, Enter, Space, arrow keys) */}
            </li>
          </ul>
        </Card>
      </Section>

      <Section
        title="When to use it"
        description="Decision guidance vs alternatives."
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
            <li><strong>Use ${name} for…</strong> {/* TODO */}</li>
            <li><strong>Prefer X instead when…</strong> {/* TODO */}</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
`;

await mkdir(dirname(outPath), { recursive: true });
await writeFile(outPath, template);
console.log(`✓ ${outPath.replace(root + "/", "")}`);
console.log(`  title: "${titlePath}"`);
console.log(`  next:  fill in the TODOs, then \`pnpm gen:props ${name}\` for the props table.`);
