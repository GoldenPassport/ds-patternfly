/**
 * CardGrid — a responsive gallery of cards from a data array. Pass `items`
 * and a `renderItem` that returns the card for each; CardGrid handles the
 * responsive layout. The standard alternative to a table for browse-style
 * collections. Show the `emptyState` slot when there's nothing to render.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  CardGrid,
  Label,
  StatusPanel,
} from "@golden-passport/ds-patternfly";
import PlusCircleIcon from "@patternfly/react-icons/dist/esm/icons/plus-circle-icon";

type Template = {
  id: string;
  name: string;
  category: string;
  description: string;
};

const TEMPLATES: Template[] = [
  { id: "t-1", name: "Onboarding flow", category: "Workflow", description: "Welcome new users with a guided setup checklist." },
  { id: "t-2", name: "Weekly digest", category: "Email", description: "Summarize activity and send it out every Monday." },
  { id: "t-3", name: "Incident triage", category: "Ops", description: "Route alerts to the right on-call responder." },
  { id: "t-4", name: "Lead scoring", category: "Sales", description: "Rank inbound leads by fit and engagement." },
  { id: "t-5", name: "Content review", category: "Workflow", description: "Two-step approval before anything publishes." },
  { id: "t-6", name: "Churn watch", category: "Analytics", description: "Flag accounts trending toward cancellation." },
];

// #region Gallery
export function Gallery() {
  return (
    <CardGrid
      items={TEMPLATES}
      getKey={(t) => t.id}
      renderItem={(t) => (
        <Card isFullHeight>
          <CardHeader>
            <CardTitle>{t.name}</CardTitle>
          </CardHeader>
          <CardBody style={{ display: "grid", gap: 12 }}>
            <Label color="blue">{t.category}</Label>
            <span>{t.description}</span>
          </CardBody>
        </Card>
      )}
    />
  );
}
// #endregion

// #region Empty
export function Empty() {
  return (
    <CardGrid<Template>
      items={[]}
      renderItem={() => null}
      emptyState={
        <StatusPanel
          variant="empty"
          title="No templates yet"
          primaryAction={
            <Button variant="primary" icon={<PlusCircleIcon />}>
              Create template
            </Button>
          }
        >
          Templates you create will show up here. Start from scratch or
          duplicate an existing one.
        </StatusPanel>
      }
    />
  );
}
// #endregion

export default function CardGridExample() {
  return (
    <div style={{ display: "grid", gap: 32 }}>
      <Gallery />
      <Empty />
    </div>
  );
}
