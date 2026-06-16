/**
 * Panel — a lightweight surface container: header, scrollable body, footer.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import {
  Button,
  Panel,
  PanelFooter,
  PanelHeader,
  PanelMain,
  PanelMainBody,
} from "@golden-passport/ds-patternfly";

const filler = (
  <>
    <p style={{ marginTop: 0 }}>
      Panels are surface containers for grouping related content. The
      header, body, and footer slots are all optional — drop the ones
      you don&rsquo;t need.
    </p>
    <p>
      Use the <code>variant</code> prop to differentiate elevation
      (raised, bordered, secondary). For scrollable content, set
      <code>isScrollable</code> on the panel and <code>maxHeight</code>{" "}
      on the main slot.
    </p>
  </>
);

// #region Basic
export function Basic() {
  return (
    <Panel>
      <PanelHeader>
        <strong>Recent activity</strong>
      </PanelHeader>
      <PanelMain>
        <PanelMainBody>{filler}</PanelMainBody>
      </PanelMain>
      <PanelFooter>
        <Button variant="link" isInline>
          View all
        </Button>
      </PanelFooter>
    </Panel>
  );
}
// #endregion

// #region Variants
export function Variants() {
  return (
    <div style={{ display: "grid", gap: 16 }}>
      <Panel variant="raised">
        <PanelMain>
          <PanelMainBody>
            <strong>Raised</strong> — drop shadow, sits above the
            background.
          </PanelMainBody>
        </PanelMain>
      </Panel>
      <Panel variant="bordered">
        <PanelMain>
          <PanelMainBody>
            <strong>Bordered</strong> — outline only, no shadow.
          </PanelMainBody>
        </PanelMain>
      </Panel>
      <Panel variant="secondary">
        <PanelMain>
          <PanelMainBody>
            <strong>Secondary</strong> — tinted background for
            lower-priority groupings.
          </PanelMainBody>
        </PanelMain>
      </Panel>
    </div>
  );
}
// #endregion

// #region Scrollable
export function Scrollable() {
  return (
    <Panel variant="bordered" isScrollable>
      <PanelHeader>
        <strong>Event log</strong>
      </PanelHeader>
      <PanelMain maxHeight="180px">
        <PanelMainBody>
          {Array.from({ length: 20 }).map((_, i) => (
            <p key={i} style={{ margin: "6px 0" }}>
              {new Date(Date.now() - i * 60_000).toISOString()} —
              event #{1000 - i} processed
            </p>
          ))}
        </PanelMainBody>
      </PanelMain>
    </Panel>
  );
}
// #endregion

export default function PanelExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <Basic />
      <Variants />
      <Scrollable />
    </div>
  );
}
