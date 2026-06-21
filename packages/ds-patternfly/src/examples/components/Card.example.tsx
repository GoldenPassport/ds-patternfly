/**
 * Card — the workhorse content tile: header, body, footer, optional
 * actions / selection / expansion.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { Fragment, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  ExpandableCard,
  SelectableCard,
} from "@golden-passport/ds-patternfly";

// #region Basic
export function Basic() {
  return (
    <Card ouiaId="BasicCard">
      <CardTitle>Total runs today</CardTitle>
      <CardBody>1,284 successful · 12 failed</CardBody>
      <CardFooter>Updated 2 min ago</CardFooter>
    </Card>
  );
}
// #endregion

// #region WithHeaderActions
export function WithHeaderActions() {
  return (
    <Card>
      <CardHeader
        actions={{
          actions: (
            <Fragment>
              <Button variant="plain" aria-label="More" />
            </Fragment>
          ),
        }}
      >
        <CardTitle>Workspace settings</CardTitle>
      </CardHeader>
      <CardBody>
        Region, retention policy, and member access. Changes apply
        to all projects in this workspace.
      </CardBody>
      <CardFooter>
        <Button variant="primary">Edit settings</Button>
      </CardFooter>
    </Card>
  );
}
// #endregion

// #region Modifiers
export function Modifiers() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
      <Card isCompact>
        <CardTitle>Compact</CardTitle>
        <CardBody>Tighter padding for dense lists.</CardBody>
      </Card>
      <Card isLarge>
        <CardTitle>Large</CardTitle>
        <CardBody>Roomier padding for hero tiles.</CardBody>
      </Card>
      <Card isPlain>
        <CardTitle>Plain</CardTitle>
        <CardBody>No background, no border — sits flush.</CardBody>
      </Card>
      <Card isFullHeight>
        <CardTitle>Full height</CardTitle>
        <CardBody>Stretches to its grid cell.</CardBody>
      </Card>
    </div>
  );
}
// #endregion

// #region SingleSelectGallery
export function SingleSelectGallery() {
  // SelectableCard owns the selectableActions + id / aria plumbing. For a
  // single-select gallery, share one `name` across the cards and track the
  // chosen id here.
  const [sel, setSel] = useState<string | null>(null);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
      {(["small", "medium", "large"] as const).map((size) => (
        <SelectableCard
          key={size}
          name="card-size-radio"
          title={`${size[0]?.toUpperCase()}${size.slice(1)}`}
          isSelected={sel === size}
          onChange={() => setSel(size)}
        >
          1 vCPU · 2 GB RAM
        </SelectableCard>
      ))}
    </div>
  );
}
// #endregion

// #region MultiSelect
export function MultiSelect() {
  const [multi, setMulti] = useState<{ a: boolean; b: boolean; c: boolean }>(
    { a: false, b: false, c: false },
  );

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
      {(["a", "b", "c"] as const).map((key) => (
        <SelectableCard
          key={key}
          selectionVariant="multiple"
          title={`Resource ${key.toUpperCase()}`}
          isSelected={multi[key]}
          onChange={(checked) => setMulti((m) => ({ ...m, [key]: checked }))}
        >
          Pick one or more.
        </SelectableCard>
      ))}
    </div>
  );
}
// #endregion

// #region Expandable
export function Expandable() {
  return (
    <ExpandableCard
      title="Run history"
      footer={<Button variant="link">View full history</Button>}
    >
      Last 10 runs · 9 successful · 1 retry · 0 failed.
    </ExpandableCard>
  );
}
// #endregion

export default function CardExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <Basic />
      <WithHeaderActions />
      <Modifiers />
      <SingleSelectGallery />
      <MultiSelect />
      <Expandable />
    </div>
  );
}
