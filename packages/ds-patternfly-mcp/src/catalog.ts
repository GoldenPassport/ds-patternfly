/**
 * Catalog loader + helpers.
 *
 * docs.json is bundled into the package at build time so the MCP works
 * offline (no live fetch to the storybook URL). Each item gets a stable
 * `id` (slash-path) and a small set of search terms.
 */
import docs from "./docs.js";

export type DocKind =
  | "foundation"
  | "component"
  | "recipe"
  | "guideline";

/** One prop of an exported component (mirrors the lib's PropsTable rows). */
export interface DocProp {
  name: string;
  type: string;
  default?: string;
  required?: boolean;
  description: string;
}

/** A complete, self-contained example app shipped verbatim. */
export interface DocExample {
  name: string;
  description?: string;
  source: string;
}

export interface DocItem {
  id: string;
  kind: DocKind;
  title: string;
  /** Full Storybook breadcrumb path, e.g. "Components/Forms/TextInput". */
  breadcrumb?: string;
  summary: string;
  /** Longer usage guidance for exported components (when curated). */
  usage?: string;
  tags?: string[];
  keyTokens?: string[];
  import?: string;
  /** Props reference for exported components (when curated). */
  props?: DocProp[];
  /** End-to-end example apps with full source (when curated). */
  examples?: DocExample[];
  storybookUrl?: string;
}

export interface Catalog {
  version: string;
  generatedAt: string;
  library: {
    name: string;
    version: string;
    storybook: string;
    github: string;
  };
  items: DocItem[];
}

export const catalog: Catalog = docs as unknown as Catalog;

/** Lower-case, normalised search blob for fuzzy matching. */
function blob(item: DocItem): string {
  return [
    item.id,
    item.title,
    item.breadcrumb ?? "",
    item.summary,
    item.usage ?? "",
    ...(item.tags ?? []),
    ...(item.keyTokens ?? []),
  ]
    .join(" ")
    .toLowerCase();
}

/**
 * Simple token-OR fuzzy search. Splits query into whitespace tokens,
 * scores each item by how many tokens it contains, returns top N
 * descending. Good enough for a docs catalog of < 1000 entries; if we
 * ever need fuzzier matching, swap in `fuse.js`.
 */
export function search(query: string, limit = 8): DocItem[] {
  const tokens = query
    .toLowerCase()
    .split(/\s+/)
    .filter((t) => t.length > 0);
  if (tokens.length === 0) return [];

  const scored = catalog.items
    .map((item) => {
      const text = blob(item);
      let score = 0;
      for (const t of tokens) {
        if (text.includes(t)) score += 1;
        // Bonus for exact title hit — anchors precise queries.
        if (item.title.toLowerCase() === t) score += 5;
        // Bonus for tag match — tags are curated.
        if (item.tags?.includes(t)) score += 2;
      }
      return { item, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return scored.map((r) => r.item);
}

export function get(id: string): DocItem | undefined {
  return catalog.items.find((i) => i.id === id);
}

/** Full Storybook URL for an item, if it has one. */
export function storybookUrlFor(item: DocItem): string | undefined {
  if (!item.storybookUrl) return undefined;
  return `${catalog.library.storybook}${item.storybookUrl}`;
}
