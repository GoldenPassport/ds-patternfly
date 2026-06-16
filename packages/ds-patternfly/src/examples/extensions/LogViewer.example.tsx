/**
 * LogViewer (@patternfly/react-log-viewer) — a virtualised log-streaming
 * component with ANSI colour support, search, line numbers, and dark/light
 * themes. Use it whenever you need to render > a few hundred lines of
 * machine output without freezing the page.
 *
 * NOTE: LogViewer mounts an off-screen measurement layer at construction
 * time that breaks under headless-browser test runners — verify the live
 * component in a real browser.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { LogViewer, LogViewerSearch } from "@patternfly/react-log-viewer";
import { Toolbar, ToolbarContent, ToolbarItem } from "@golden-passport/ds-patternfly";

const logText = `2026-05-10T09:21:14.231Z [ERROR] worker-3  ConnectionResetError: connection closed by upstream
2026-05-10T09:21:15.402Z [WARN ] worker-1  step 2 took 14.2s (threshold: 10s)
2026-05-10T09:21:16.118Z [INFO ] worker-0  processed event #1029
2026-05-10T09:21:16.875Z [INFO ] worker-2  processed event #1030`;

// #region Default
export function Default() {
  return (
    <LogViewer
      data={logText}
      hasLineNumbers
      height={400}
      theme="dark"
    />
  );
}
// #endregion

// #region WithSearchToolbar
export function WithSearchToolbar() {
  return (
    <LogViewer
      data={logText}
      hasLineNumbers
      height={400}
      theme="dark"
      toolbar={
        <Toolbar>
          <ToolbarContent>
            <ToolbarItem>
              <LogViewerSearch placeholder="Search logs" minSearchChars={1} />
            </ToolbarItem>
          </ToolbarContent>
        </Toolbar>
      }
    />
  );
}
// #endregion

export default function LogViewerExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <Default />
      <WithSearchToolbar />
    </div>
  );
}
