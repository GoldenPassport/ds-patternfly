import type { Meta, StoryObj } from "@storybook/react-vite";
import { LogViewer, LogViewerSearch } from "@patternfly/react-log-viewer";
import { Toolbar, ToolbarContent, ToolbarItem } from "@patternfly/react-core";
import { FoundationPage, Section, Card, CodeBlock } from "../_storyKit.js";
import { DemoFrame, PropsTable } from "../_demoKit.js";

const meta: Meta = {
  title: "Extensions/Log viewer",
  parameters: {
    layout: "padded",
    a11y: {
      // Log viewer renders a virtualised list with custom focus handling
      // and ANSI-coloured rows; it intentionally diverges from default
      // a11y heuristics. Brand-token contrast is validated by tokens.test.
      config: {
        rules: [
          { id: "color-contrast", enabled: false },
          { id: "scrollable-region-focusable", enabled: false },
        ],
      },
    },
  },
};
export default meta;

const SAMPLE = Array.from({ length: 80 })
  .map((_, i) => {
    const ts = new Date(Date.now() - (80 - i) * 1000).toISOString();
    const lvl = i % 17 === 0 ? "ERROR" : i % 7 === 0 ? "WARN " : "INFO ";
    const code = lvl === "ERROR" ? "ConnectionResetError: connection closed by upstream" :
      lvl === "WARN " ? `step ${i % 5} took ${5 + (i % 11)}.${(i * 17) % 99}s (threshold: 10s)` :
      `processed event #${1000 + i}`;
    return `${ts} [${lvl}] worker-${i % 4}  ${code}`;
  })
  .join("\n");

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Log viewer"
      intro={
        <>
          A virtualised log-streaming component with ANSI colour support,
          search, line numbers, and dark/light themes. From{" "}
          <code>@patternfly/react-log-viewer</code>. Use it whenever you
          need to render &gt; a few hundred lines of machine output without
          freezing the page.
        </>
      }
    >
      <Section
        title="Default"
        description="Pass `data` (string or string[]) and a height. The component virtualises rows internally."
      >
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame height={360}>
              <LogViewer
                data={SAMPLE}
                hasLineNumbers
                height={300}
                theme="dark"
              />
            </DemoFrame>
            <CodeBlock>{`<LogViewer
  data={logText}
  hasLineNumbers
  height={400}
  theme="dark"
/>`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section
        title="With a search toolbar"
        description="Pass a custom toolbar via `toolbar`. Drop LogViewerSearch in the toolbar to add highlight-as-you-type search."
      >
        <Card>
          <div style={{ padding: 24 }}>
            <DemoFrame height={360}>
              <LogViewer
                data={SAMPLE}
                hasLineNumbers
                height={300}
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
            </DemoFrame>
          </div>
        </Card>
      </Section>

      <Section
        title="Light theme"
        description="`theme='light'` switches to a light background — match your app's chrome."
      >
        <Card>
          <div style={{ padding: 24 }}>
            <DemoFrame height={260}>
              <LogViewer
                data={SAMPLE.split("\n").slice(0, 20).join("\n")}
                hasLineNumbers
                height={200}
                theme="light"
              />
            </DemoFrame>
          </div>
        </Card>
      </Section>

      <Section title="Most-used props">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                { name: "data", type: "string | string[]", description: "Log content. Either a single string (split on \\n) or an array of pre-split lines." },
                { name: "height", type: "number | string", description: "Required for virtualisation. Bound the height so the component knows how many rows to render." },
                { name: "width", type: "number | string", description: "Override the natural width." },
                { name: "theme", type: '"dark" | "light"', description: "Surface theme. Default 'dark'." },
                { name: "hasLineNumbers", type: "boolean", description: "Render line numbers in a leading gutter." },
                { name: "isTextWrapped", type: "boolean", description: "Wrap long lines instead of horizontally scrolling." },
                { name: "toolbar", type: "ReactNode", description: "Optional toolbar slot above the log — drop LogViewerSearch here." },
                { name: "header / footer", type: "ReactNode", description: "Custom content above / below the virtualised list." },
                { name: "loadingContent", type: "ReactNode", description: "Render while data is null/empty — use a Spinner or SkeletonTable." },
                { name: "scrollToRow", type: "number", description: "Programmatically scroll to a specific row (e.g. on follow-tail toggle, jump to error line)." },
                { name: "overScanCount", type: "number", description: "How many off-screen rows to render. Bigger = smoother scroll, more memory." },
                { name: "onScroll", type: "({ scrollDirection, scrollOffset, scrollOffsetToBottom, scrollUpdateWasRequested }) => void", description: "Hook into the scroll lifecycle for follow-tail logic." },
                { name: "useAnsiClasses", type: "boolean", description: "Use CSS classes (vs inline styles) for ANSI colour — better for custom theming." },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section title="Patterns">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>Follow tail.</strong> When the user is at the bottom (<code>scrollOffsetToBottom &lt; threshold</code>), keep scrolling to the latest row. When they scroll up, pause.</li>
            <li><strong>Stream chunks, not full re-renders.</strong> Append to the data array and pass it back; LogViewer updates in place.</li>
            <li><strong>Cap line length.</strong> 10MB+ logs will still virtualise, but row-height estimation degrades — link out to a downloadable raw log when sizes get extreme.</li>
            <li><strong>Lazy-load.</strong> Wrap LogViewer in <code>React.lazy</code> — it pulls in xterm-style virtualisation; no need to ship that on every page.</li>
          </ul>
        </Card>
      </Section>

      <Section title="Accessibility">
        <Card>
          <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
            <li><strong>The virtualised list is keyboard-scrollable.</strong> Don&rsquo;t add wrapping focusable divs around it — they&rsquo;ll trap focus.</li>
            <li><strong>Surface critical errors outside the log.</strong> Don&rsquo;t rely on the user spotting an ERROR line in 10k rows — pair the log with a banner or notification when something matters.</li>
            <li><strong>Provide a download link.</strong> Some assistive-tech users prefer to consume long logs in their preferred reader.</li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
