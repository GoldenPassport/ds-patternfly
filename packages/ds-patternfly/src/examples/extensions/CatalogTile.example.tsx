/**
 * CatalogTile (@patternfly/react-catalog-view-extension) — a single tile in
 * a catalog grid: title, vendor, description, optional icon, badges, footer.
 * Renders as a link with `href`, or as a selectable card with
 * `isSelected` + `onClick`.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useId, useState } from "react";
import {
  CatalogTile,
  CatalogTileBadge,
} from "@patternfly/react-catalog-view-extension";
import { CubeIcon, LockIcon, StarIcon } from "@patternfly/react-icons";
import "@patternfly/react-catalog-view-extension/dist/css/react-catalog-view-extension.css";
import { Gallery, GalleryItem, Button } from "@golden-passport/ds-patternfly";

// #region FeaturedAndStandard
export function FeaturedAndStandard() {
  const id = useId();
  return (
    <Gallery hasGutter minWidths={{ default: "260px" }}>
      <GalleryItem>
        <CatalogTile
          id={`${id}-workflow-engine`}
          featured
          href="#/featured"
          icon={<CubeIcon style={{ fontSize: 28 }} />}
          title="Workflow engine"
          vendor="Provided by Acme"
          description="The headline product — sits front and centre on the catalog landing page."
          badges={[
            <CatalogTileBadge key="star" title="Featured">
              <StarIcon />
            </CatalogTileBadge>,
          ]}
        />
      </GalleryItem>
      <GalleryItem>
        <CatalogTile
          id={`${id}-log-delivery`}
          featured={false}
          href="#/standard"
          icon={<CubeIcon style={{ fontSize: 28 }} />}
          title="Log delivery"
          vendor="Provided by Acme"
          description="A standard tile — equal visual weight as its siblings."
        />
      </GalleryItem>
    </Gallery>
  );
}
// #endregion

// #region Selectable
export function Selectable() {
  const id = useId();
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <>
      <Gallery hasGutter minWidths={{ default: "240px" }}>
        {["small", "medium", "large"].map((size) => (
          <GalleryItem key={size}>
            <CatalogTile
              id={`${id}-size-${size}`}
              featured={false}
              href=""
              title={size}
              vendor="Instance size"
              description={`Pick the ${size} option to right-size your deployment.`}
              isSelected={selected === size}
              onClick={() => setSelected(size)}
            />
          </GalleryItem>
        ))}
      </Gallery>
      <p style={{ marginTop: 8, color: "var(--gp-color-text-subtle)" }}>
        Selected: <strong>{selected ?? "—"}</strong>
      </p>
    </>
  );
}
// #endregion

// #region WithFooter
export function WithFooter() {
  const id = useId();
  return (
    <Gallery hasGutter minWidths={{ default: "260px" }}>
      <GalleryItem>
        <CatalogTile
          id={`${id}-ci-runner`}
          featured={false}
          href=""
          title="CI runner"
          vendor="Beta Co"
          description="Auto-scaling build agents with caching."
          badges={[
            <CatalogTileBadge key="lock" title="License required">
              <LockIcon />
            </CatalogTileBadge>,
          ]}
          footer={<Button variant="primary">Install</Button>}
        />
      </GalleryItem>
    </Gallery>
  );
}
// #endregion

export default function CatalogTileExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <FeaturedAndStandard />
      <Selectable />
      <WithFooter />
    </div>
  );
}
