import type { ReactNode } from "react";
import { Gallery, GalleryItem } from "../base/index.js";

/**
 * CardGrid — a responsive gallery of cards from a data array. Pass `items`
 * and a `renderItem` that returns the card body for each; CardGrid handles
 * the responsive `Gallery` layout (auto-fills columns at `minColumnWidth`).
 * The standard alternative to a table for browse-style collections.
 */
export interface CardGridProps<T> {
  /** The data to render, one card each. */
  items: T[];
  /** Render the card for one item. */
  renderItem: (item: T, index: number) => ReactNode;
  /** Stable key for an item. Defaults to the array index. */
  getKey?: (item: T, index: number) => string | number;
  /** Minimum column width before wrapping. Default "260px". */
  minColumnWidth?: string;
  /** Shown when `items` is empty (e.g. a StatusPanel). */
  emptyState?: ReactNode;
}

export function CardGrid<T>({
  items,
  renderItem,
  getKey,
  minColumnWidth = "260px",
  emptyState,
}: CardGridProps<T>) {
  if (items.length === 0 && emptyState) return <>{emptyState}</>;
  return (
    <Gallery hasGutter minWidths={{ default: minColumnWidth }}>
      {items.map((item, i) => (
        <GalleryItem key={getKey ? getKey(item, i) : i}>
          {renderItem(item, i)}
        </GalleryItem>
      ))}
    </Gallery>
  );
}
