/**
 * Pagination — page-through controls for long collections: per-page sizing,
 * prev/next, jump-to-page, and a "showing X–Y of Z" summary.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { Fragment, useId, useState } from "react";
import { Pagination, PaginationVariant } from "@golden-passport/ds-patternfly";

// #region TopVariant
export function TopVariant() {
  const id = useId();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  return (
    <Pagination
      itemCount={523}
      page={page}
      perPage={perPage}
      onSetPage={(_e, p) => setPage(p)}
      onPerPageSelect={(_e, pp, p) => {
        setPerPage(pp);
        setPage(p);
      }}
      widgetId={`${id}-pagination-top`}
      ouiaId="PaginationTop"
    />
  );
}
// #endregion

// #region BottomVariant
export function BottomVariant() {
  const id = useId();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  return (
    <Pagination
      itemCount={87}
      page={page}
      perPage={perPage}
      onSetPage={(_e, p) => setPage(p)}
      onPerPageSelect={(_e, pp, p) => {
        setPerPage(pp);
        setPage(p);
      }}
      variant={PaginationVariant.bottom}
      widgetId={`${id}-pagination-bottom`}
      ouiaId="PaginationBottom"
    />
  );
}
// #endregion

// #region Compact
export function Compact() {
  const id = useId();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  return (
    <Pagination
      itemCount={42}
      page={page}
      perPage={perPage}
      onSetPage={(_e, p) => setPage(p)}
      onPerPageSelect={(_e, pp, p) => {
        setPerPage(pp);
        setPage(p);
      }}
      isCompact
      widgetId={`${id}-pagination-compact`}
    />
  );
}
// #endregion

// #region Indeterminate
export function Indeterminate() {
  const id = useId();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  return (
    <Pagination
      page={page}
      perPage={perPage}
      onSetPage={(_e, p) => setPage(p)}
      onPerPageSelect={(_e, pp, p) => {
        setPerPage(pp);
        setPage(p);
      }}
      toggleTemplate={({ firstIndex, lastIndex }) => (
        <Fragment>
          <b>
            {firstIndex} - {lastIndex}
          </b>{" "}
          of <b>many</b>
        </Fragment>
      )}
      widgetId={`${id}-pagination-indeterminate`}
    />
  );
}
// #endregion

// #region Disabled
export function Disabled() {
  const id = useId();
  return (
    <Pagination
      itemCount={523}
      page={1}
      perPage={20}
      isDisabled
      widgetId={`${id}-pagination-disabled`}
    />
  );
}
// #endregion

export default function PaginationExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <TopVariant />
      <BottomVariant />
      <Compact />
      <Indeterminate />
      <Disabled />
    </div>
  );
}
