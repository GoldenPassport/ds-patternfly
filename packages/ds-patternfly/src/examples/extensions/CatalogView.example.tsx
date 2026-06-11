/**
 * Catalog view (@patternfly/react-catalog-view-extension) — a grid of
 * selectable / linkable CatalogTile cards for catalogs: services, plugins,
 * marketplace items.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useId } from "react";
import {
  CatalogTile,
  CatalogTileBadge,
} from "@patternfly/react-catalog-view-extension";
import { StarIcon, CubeIcon } from "@patternfly/react-icons";
import "@patternfly/react-catalog-view-extension/dist/css/react-catalog-view-extension.css";
import { Gallery, GalleryItem } from "../_lib.js";

const items = [
  { id: "wf",     title: "Workflow engine",    vendor: "Acme",    desc: "Trigger and orchestrate jobs across services.", featured: true },
  { id: "ld",     title: "Log delivery",       vendor: "Acme",    desc: "Stream logs from any source to your data lake." },
  { id: "ci",     title: "CI runner",          vendor: "Beta Co", desc: "Auto-scaling build agents with caching." },
  { id: "mon",    title: "Monitoring stack",   vendor: "Gamma",   desc: "Prometheus + Grafana, batteries included." },
  { id: "sec",    title: "Secrets manager",    vendor: "Acme",    desc: "Rotating credentials with audit log." },
  { id: "alerts", title: "Incident alerts",    vendor: "Delta",   desc: "Route incidents to the right on-call." },
];

// #region TileGrid
export function TileGrid() {
  const id = useId();
  return (
    <Gallery hasGutter minWidths={{ default: "260px" }}>
      {items.map((it) => (
        <GalleryItem key={it.id}>
          <CatalogTile
            id={`${id}-${it.id}`}
            featured={!!it.featured}
            href={`#/${it.id}`}
            icon={<CubeIcon style={{ fontSize: 28 }} />}
            title={it.title}
            vendor={`Provided by ${it.vendor}`}
            description={it.desc}
            badges={
              it.featured
                ? [
                    <CatalogTileBadge key="star" title="Featured">
                      <StarIcon />
                    </CatalogTileBadge>,
                  ]
                : []
            }
          />
        </GalleryItem>
      ))}
    </Gallery>
  );
}
// #endregion

export default function CatalogViewExample() {
  return <TileGrid />;
}
