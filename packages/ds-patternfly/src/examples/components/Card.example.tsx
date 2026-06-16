/**
 * Card — the workhorse content tile: header, body, footer, optional
 * actions / selection / expansion.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { Fragment, useId, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardExpandableContent,
  CardFooter,
  CardHeader,
  CardTitle,
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
  const id = useId();
  const [sel, setSel] = useState<string | null>(null);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
      {(["small", "medium", "large"] as const).map((size) => {
        const cardId = `${id}-size-card-${size}`;
        const inputId = `${id}-card-radio-${size}`;
        return (
          <Card key={size} id={cardId} isSelectable isSelected={sel === size}>
            <CardHeader
              selectableActions={{
                selectableActionId: inputId,
                selectableActionAriaLabelledby: cardId,
                name: `${id}-size-radio`,
                variant: "single",
                onChange: () => setSel(size),
              }}
            >
              <CardTitle>{size[0]?.toUpperCase()}{size.slice(1)}</CardTitle>
            </CardHeader>
            <CardBody>1 vCPU · 2 GB RAM</CardBody>
          </Card>
        );
      })}
    </div>
  );
}
// #endregion

// #region MultiSelect
export function MultiSelect() {
  const id = useId();
  const [multi, setMulti] = useState<{ a: boolean; b: boolean; c: boolean }>(
    { a: false, b: false, c: false },
  );

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
      {(["a", "b", "c"] as const).map((key) => {
        const cardId = `${id}-multi-card-${key}`;
        const inputId = `${id}-card-multi-${key}`;
        return (
          <Card key={key} id={cardId} isSelectable isSelected={multi[key]}>
            <CardHeader
              selectableActions={{
                selectableActionId: inputId,
                selectableActionAriaLabelledby: cardId,
                name: inputId,
                variant: "multiple",
                onChange: (_e, checked) =>
                  setMulti((m) => ({ ...m, [key]: checked })),
              }}
            >
              <CardTitle>Resource {key.toUpperCase()}</CardTitle>
            </CardHeader>
            <CardBody>Pick one or more.</CardBody>
          </Card>
        );
      })}
    </div>
  );
}
// #endregion

// #region Expandable
export function Expandable() {
  const id = useId();
  const [exp, setExp] = useState(false);

  return (
    <Card id={`${id}-expandable`} isExpanded={exp}>
      <CardHeader
        onExpand={() => setExp((v) => !v)}
        toggleButtonProps={{
          id: `${id}-expandable-toggle`,
          "aria-label": "Details",
          "aria-labelledby": `${id}-expandable-title ${id}-expandable-toggle`,
          "aria-expanded": exp,
        }}
      >
        <CardTitle id={`${id}-expandable-title`}>Run history</CardTitle>
      </CardHeader>
      <CardExpandableContent>
        <CardBody>
          Last 10 runs · 9 successful · 1 retry · 0 failed.
        </CardBody>
        <CardFooter>
          <Button variant="link">View full history</Button>
        </CardFooter>
      </CardExpandableContent>
    </Card>
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
