/**
 * Chart themes — PF6 default palettes vs getCustomTheme overrides.
 *
 * Requires @patternfly/react-charts (Victory wrapper).
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import {
  Chart,
  ChartAxis,
  ChartGroup,
  ChartLine,
  ChartThemeColor,
  getCustomTheme,
} from "@patternfly/react-charts/victory";

const data1 = [{ x: 1, y: 1 }, { x: 2, y: 3 }, { x: 3, y: 5 }, { x: 4, y: 4 }, { x: 5, y: 6 }];
const data2 = [{ x: 1, y: 2 }, { x: 2, y: 4 }, { x: 3, y: 3 }, { x: 4, y: 5 }, { x: 5, y: 7 }];

// Build a custom theme once at module scope — passing a fresh object each
// render trashes Victory's diffing.
const customTheme = getCustomTheme(ChartThemeColor.blue, {
  area: { style: { data: { strokeWidth: 3 } } },
  line: { style: { data: { strokeWidth: 3 } } },
});

// #region DefaultVsCustom
export function DefaultVsCustom() {
  return (
    <div style={{ display: "grid", gap: 16, gridTemplateColumns: "1fr 1fr" }}>
      <div>
        <div style={{ marginBottom: 4, color: "var(--gp-color-text-subtle)", fontSize: 13 }}>
          Default theme, themeColor=&quot;blue&quot;
        </div>
        <Chart
          ariaTitle="Default theme"
          themeColor="blue"
          height={200}
          padding={{ left: 60, right: 20, top: 20, bottom: 50 }}
        >
          <ChartAxis />
          <ChartAxis dependentAxis showGrid />
          <ChartGroup>
            <ChartLine data={data1} />
            <ChartLine data={data2} />
          </ChartGroup>
        </Chart>
      </div>
      <div>
        <div style={{ marginBottom: 4, color: "var(--gp-color-text-subtle)", fontSize: 13 }}>
          getCustomTheme — bolder strokes
        </div>
        <Chart
          ariaTitle="Custom theme"
          theme={customTheme}
          height={200}
          padding={{ left: 60, right: 20, top: 20, bottom: 50 }}
        >
          <ChartAxis />
          <ChartAxis dependentAxis showGrid />
          <ChartGroup>
            <ChartLine data={data1} />
            <ChartLine data={data2} />
          </ChartGroup>
        </Chart>
      </div>
    </div>
  );
}
// #endregion

export default function ThemesExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <DefaultVsCustom />
    </div>
  );
}
