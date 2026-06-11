import type { ReactNode } from "react";
import {
  Bullseye,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "../base/index.js";

/** One column: a header + a cell renderer over a row. */
export interface DataTableColumn<T> {
  /** Stable key. */
  key: string;
  /** Column header content. */
  header: ReactNode;
  /** Render the cell for a row. */
  cell: (row: T) => ReactNode;
  /** Optional `dataLabel` for responsive stacking (defaults to a string header). */
  dataLabel?: string;
}

/**
 * DataTable — a declarative table over `columns` + `rows`, with optional
 * toolbar and pagination slots and built-in loading / empty states. Composes
 * the base Table family; you bring the data and the column renderers.
 */
export interface DataTableProps<T> {
  /** Column definitions. */
  columns: DataTableColumn<T>[];
  /** Row data. */
  rows: T[];
  /** Stable key for a row. */
  getRowKey: (row: T) => string | number;
  /** Accessible name for the table. */
  ariaLabel: string;
  /** Toolbar slot rendered above the table (filters, bulk select, search). */
  toolbar?: ReactNode;
  /** Pagination slot rendered above (right) and/or below the table. */
  pagination?: ReactNode;
  /** Footer pagination slot. */
  footerPagination?: ReactNode;
  /** Show the loading spinner instead of rows. */
  isLoading?: boolean;
  /** Shown when `rows` is empty and not loading (e.g. a StatusPanel). */
  emptyState?: ReactNode;
  /** PF table density. */
  variant?: "compact" | "default";
}

export function DataTable<T>({
  columns,
  rows,
  getRowKey,
  ariaLabel,
  toolbar,
  pagination,
  footerPagination,
  isLoading,
  emptyState,
  variant = "default",
}: DataTableProps<T>) {
  const colSpan = columns.length;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {toolbar || pagination ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          <div style={{ flex: "1 1 auto", minInlineSize: 0 }}>{toolbar}</div>
          {pagination ? <div>{pagination}</div> : null}
        </div>
      ) : null}
      <Table
        aria-label={ariaLabel}
        {...(variant === "compact" ? { variant: "compact" } : {})}
      >
        <Thead>
          <Tr>
            {columns.map((col) => (
              <Th key={col.key}>{col.header}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {isLoading ? (
            <Tr>
              <Td colSpan={colSpan}>
                <Bullseye style={{ padding: "2rem" }}>
                  <Spinner aria-label="Loading" />
                </Bullseye>
              </Td>
            </Tr>
          ) : rows.length === 0 && emptyState ? (
            <Tr>
              <Td colSpan={colSpan}>{emptyState}</Td>
            </Tr>
          ) : (
            rows.map((row) => (
              <Tr key={getRowKey(row)}>
                {columns.map((col) => (
                  <Td
                    key={col.key}
                    {...(col.dataLabel ||
                    typeof col.header === "string"
                      ? { dataLabel: col.dataLabel ?? String(col.header) }
                      : {})}
                  >
                    {col.cell(row)}
                  </Td>
                ))}
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
      {footerPagination ? (
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          {footerPagination}
        </div>
      ) : null}
    </div>
  );
}
