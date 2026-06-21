/**
 * Application launcher — a grid-style menu of applications (the typical
 * "9-dot" launcher in a masthead). The exported MenuButton owns the open
 * state + toggle; pass an icon-only trigger and grouped items with icons.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { MenuButton, type MenuButtonItem } from "@golden-passport/ds-patternfly";
import {
  ChartBarIcon,
  CodeBranchIcon,
  CogIcon,
  CubesIcon,
  RocketIcon,
  ServerIcon,
  TableIcon,
  ThIcon,
  UsersIcon,
} from "@patternfly/react-icons";

// #region Demo
export function Demo() {
  const items: MenuButtonItem[] = [
    {
      group: "Core",
      items: [
        { id: "workflows", label: "Workflows", icon: <RocketIcon /> },
        { id: "pipelines", label: "Pipelines", icon: <CodeBranchIcon /> },
        { id: "datasets", label: "Datasets", icon: <TableIcon /> },
        { id: "insights", label: "Insights", icon: <ChartBarIcon /> },
      ],
    },
    "divider",
    {
      group: "Admin",
      items: [
        { id: "environments", label: "Environments", icon: <ServerIcon /> },
        { id: "members", label: "Members", icon: <UsersIcon /> },
        { id: "resources", label: "Resources", icon: <CubesIcon /> },
        { id: "settings", label: "Settings", icon: <CogIcon /> },
      ],
    },
  ];
  return (
    <MenuButton
      icon={<ThIcon />}
      toggleVariant="plain"
      ariaLabel="Application launcher"
      items={items}
    />
  );
}
// #endregion

export default function ApplicationLauncherExample() {
  return <Demo />;
}
