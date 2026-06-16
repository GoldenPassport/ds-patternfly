/**
 * Card view pattern — a responsive Gallery of Cards as the standard
 * alternative to a Table, paired with a Toolbar for search.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useId, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Gallery,
  GalleryItem,
  Label,
  SearchInput,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
} from "@golden-passport/ds-patternfly";
import { CubeIcon } from "@patternfly/react-icons";

type Item = { id: string; name: string; desc: string; status: "Active" | "Paused" };
const ITEMS: Item[] = [
  { id: "wf-1", name: "Quarterly review",   desc: "Hourly · 4 steps",        status: "Active" },
  { id: "wf-2", name: "Nightly build",      desc: "On push · 6 steps",       status: "Active" },
  { id: "wf-3", name: "Backup pipeline",    desc: "Daily · 3 steps",         status: "Paused" },
  { id: "wf-4", name: "Audit export",       desc: "Weekly · 2 steps",        status: "Active" },
  { id: "wf-5", name: "Index rebuilder",    desc: "Every 2h · 4 steps",      status: "Active" },
  { id: "wf-6", name: "Notify on incident", desc: "Webhook · 1 step",        status: "Paused" },
];

// #region SearchableGallery
export function SearchableGallery() {
  const id = useId();
  const [q, setQ] = useState("");
  const filtered = ITEMS.filter((it) =>
    it.name.toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <>
      <Toolbar id={`${id}-cards-toolbar`}>
        <ToolbarContent>
          <ToolbarItem>
            <SearchInput
              placeholder="Filter by name"
              value={q}
              onChange={(_e, v) => setQ(v)}
              onClear={() => setQ("")}
              aria-label="Filter cards"
            />
          </ToolbarItem>
          <ToolbarItem align={{ default: "alignEnd" }}>
            <span style={{ color: "var(--gp-color-text-subtle)" }}>
              {filtered.length} of {ITEMS.length}
            </span>
          </ToolbarItem>
        </ToolbarContent>
      </Toolbar>
      <Gallery hasGutter minWidths={{ default: "260px" }}>
        {filtered.map((it) => (
          <GalleryItem key={it.id}>
            <Card isCompact>
              <CardHeader>
                <CubeIcon />
                <CardTitle>{it.name}</CardTitle>
              </CardHeader>
              <CardBody>
                <p style={{ margin: 0, color: "var(--gp-color-text-subtle)" }}>
                  {it.desc}
                </p>
                <p style={{ margin: "12px 0 0" }}>
                  <Label color={it.status === "Active" ? "green" : "grey"} isCompact>
                    {it.status}
                  </Label>
                </p>
              </CardBody>
            </Card>
          </GalleryItem>
        ))}
      </Gallery>
    </>
  );
}
// #endregion

export default function CardViewExample() {
  return <SearchableGallery />;
}
