import type { Meta, StoryObj } from "@storybook/react-vite";
import { Brand } from "@patternfly/react-core";
import { FoundationPage, Section, Card, CodeBlock } from "../_storyKit.js";
import { DemoFrame, PropsTable } from "../_demoKit.js";
import { AcmeLogo } from "../../components/AcmeLogo.js";

const meta: Meta = {
  title: "Components/Brand",
  parameters: { layout: "padded" },
};
export default meta;

// Inline SVGs stand in for the four asset files the canonical PF6 pattern
// imports (PF-HorizontalLogo-Color, PF-HorizontalLogo-Reverse,
// PF-IconLogo-color, PF-IconLogo-Reverse). In a real consumer app these
// would be `import pfLogo from "./assets/…svg"` etc.
const svg = (markup: string) =>
  "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(markup);

// Logomark-only (the "picture" — no wordmark). Used at narrow viewports
// where horizontal room is scarce.
const acmeIcon = svg(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
    <circle cx="20" cy="20" r="20" fill="#0066cc"/>
    <path d="M11 28 L20 10 L29 28 M14.5 22 L25.5 22" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  </svg>`,
);
// Dark-theme variant — same Acme identity (blue circle, white chevron)
// so the brand mark stays consistent across themes. Only the wordmark
// text colour flips to a light grey for readability on dark surfaces.
const acmeIconDark = acmeIcon;
// Logomark + wordmark. The same mark plus the "Acme" name beside it.
// Used at md+ where there's room for both.
const acmeWide = svg(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 40">
    <circle cx="20" cy="20" r="20" fill="#0066cc"/>
    <path d="M11 28 L20 10 L29 28 M14.5 22 L25.5 22" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <text x="52" y="27" fill="#0a0a0a" font-family="Arial, sans-serif" font-size="22" font-weight="700" letter-spacing="-0.5">Acme</text>
  </svg>`,
);
const acmeWideDark = svg(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 40">
    <circle cx="20" cy="20" r="20" fill="#0066cc"/>
    <path d="M11 28 L20 10 L29 28 M14.5 22 L25.5 22" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <text x="52" y="27" fill="#f5f5f5" font-family="Arial, sans-serif" font-size="22" font-weight="700" letter-spacing="-0.5">Acme</text>
  </svg>`,
);

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Brand"
      intro={
        <>
          A logo image with PatternFly&apos;s sizing conventions and built-in
          responsive width support. Typically rendered inside a Masthead;
          the Shell shipped by this lib accepts it via the{" "}
          <code>brandLogo</code> prop. For multi-resolution / art-directed
          logos — where you want a different image (e.g. the icon-only
          mark) at narrow widths — pass{" "}
          <code>&lt;source media=&quot;…&quot; srcSet=&quot;…&quot; /&gt;</code>{" "}
          children. Brand renders a <code>&lt;picture&gt;</code> internally
          and the browser picks the first matching source.
        </>
      }
    >
      <Section title="Default">
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame>
              {/* AcmeLogo picks the wordmark colour from the active
                  ThemeProvider mode so the logo stays readable when the
                  Storybook toolbar flips to dark. */}
              <AcmeLogo />
            </DemoFrame>
            <CodeBlock>{`<Brand src="/logo.svg" alt="Acme" heights={{ default: "32px" }} />`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section
        title="Responsive heights"
        description="Smaller on mobile, larger on desktop. Width is computed from the SVG's aspect ratio."
      >
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame>
              <AcmeLogo />
            </DemoFrame>
            <CodeBlock>{`<Brand
  src="/logo.svg"
  alt="Acme"
  heights={{ default: "24px", md: "32px", lg: "40px" }}
/>`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section
        title="Responsive with art-direction"
        description="The PF6 canonical pattern: pass <source> children with media queries to swap the image at different breakpoints — full logo on wide screens, icon-only mark on narrow ones. `widths` drives the rendered size per breakpoint."
      >
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame>
              <AcmeLogo />
            </DemoFrame>
            <CodeBlock>{`import { Brand } from "@patternfly/react-core";
import pfLogo   from "../../assets/PF-HorizontalLogo-Color.svg";
import pfLogoSm from "../../assets/PF-IconLogo-color.svg";

<Brand
  src={pfLogo}
  alt="Acme"
  widths={{ default: "40px", sm: "60px", md: "220px" }}
>
  <source media="(min-width: 1200px)" srcSet={pfLogo} />
  <source media="(min-width: 992px)"  srcSet={pfLogo} />
  <source media="(min-width: 768px)"  srcSet={pfLogo} />
  <source media="(min-width: 576px)"  srcSet={pfLogoSm} />
  <source media="(min-width: 320px)"  srcSet={pfLogoSm} />
  <source                              srcSet={pfLogo} />
</Brand>`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section
        title="Light / dark variants"
        description="Render both variants and let CSS show the right one for the active theme. Pair with this design system's ThemeProvider mode prop (light / dark) or any prefers-color-scheme media query."
      >
        <Card>
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <DemoFrame>
              <div style={{ display: "flex", gap: 32, alignItems: "center", flexWrap: "wrap" }}>
                <div>
                  <div style={{ fontSize: 12, color: "var(--gp-color-text-subtle)", marginBottom: 8 }}>
                    Light theme variant
                  </div>
                  <div style={{ padding: 12, background: "#fff", borderRadius: 6, display: "inline-block" }}>
                    <Brand
                      src={acmeWide}
                      alt="Acme"
                      widths={{ default: "40px", sm: "60px", md: "180px" }}
                    >
                      <source media="(min-width: 576px)" srcSet={acmeWide} />
                      <source srcSet={acmeIcon} />
                    </Brand>
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 12, color: "var(--gp-color-text-subtle)", marginBottom: 8 }}>
                    Dark theme variant
                  </div>
                  <div style={{ padding: 12, background: "#0a0a0a", borderRadius: 6, display: "inline-block" }}>
                    <Brand
                      src={acmeWideDark}
                      alt="Acme"
                      widths={{ default: "40px", sm: "60px", md: "180px" }}
                    >
                      <source media="(min-width: 576px)" srcSet={acmeWideDark} />
                      <source srcSet={acmeIconDark} />
                    </Brand>
                  </div>
                </div>
              </div>
            </DemoFrame>
            <CodeBlock>{`import pfLogo       from "../../assets/PF-HorizontalLogo-Color.svg";
import pfLogoDark   from "../../assets/PF-HorizontalLogo-Reverse.svg";
import pfLogoSm     from "../../assets/PF-IconLogo-color.svg";
import pfLogoSmDark from "../../assets/PF-IconLogo-Reverse.svg";

// Wrapper classes are visibility-toggled by your theme stylesheet:
//   .show-light { display: var(--theme-light-display, block); }
//   .show-dark  { display: var(--theme-dark-display,  none); }
// with [data-mode="dark"] flipping the two vars.

<>
  <div className="show-light">
    <Brand src={pfLogo} alt="Acme" widths={{ default: "40px", sm: "60px", md: "220px" }}>
      <source media="(min-width: 1200px)" srcSet={pfLogo} />
      <source media="(min-width: 992px)"  srcSet={pfLogo} />
      <source media="(min-width: 768px)"  srcSet={pfLogo} />
      <source media="(min-width: 576px)"  srcSet={pfLogoSm} />
      <source media="(min-width: 320px)"  srcSet={pfLogoSm} />
      <source                              srcSet={pfLogo} />
    </Brand>
  </div>
  <div className="show-dark">
    <Brand src={pfLogoDark} alt="Acme" widths={{ default: "40px", sm: "60px", md: "220px" }}>
      <source media="(min-width: 1200px)" srcSet={pfLogoDark} />
      <source media="(min-width: 992px)"  srcSet={pfLogoDark} />
      <source media="(min-width: 768px)"  srcSet={pfLogoDark} />
      <source media="(min-width: 576px)"  srcSet={pfLogoSmDark} />
      <source media="(min-width: 320px)"  srcSet={pfLogoSmDark} />
      <source                              srcSet={pfLogoDark} />
    </Brand>
  </div>
</>`}</CodeBlock>
          </div>
        </Card>
      </Section>

      <Section title="Props">
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                {
                  name: "src",
                  type: "string",
                  description: "Logo image URL. SVG strongly preferred for resolution independence. Used as the <img> fallback inside the <picture> Brand renders.",
                },
                {
                  name: "alt",
                  type: "string",
                  description: 'Required. The brand name (e.g. "Acme"). Empty only when the brand is decorative — rare.',
                },
                {
                  name: "widths",
                  type: "{ default?: string, sm?: string, md?: string, lg?: string, xl?: string, '2xl'?: string }",
                  description: "Per-breakpoint rendered width. Use when the logo is taller than wide or you want to drive sizing by width (the PF6 canonical responsive pattern).",
                },
                {
                  name: "heights",
                  type: "Same shape as widths",
                  description: "Per-breakpoint rendered height. Width is computed from aspect ratio. Use for horizontal logos where height is the controlling dimension.",
                },
                {
                  name: "children",
                  type: "<source media=… srcSet=… /> elements",
                  description: "Optional. Forwarded into a <picture> element — the browser picks the first <source> whose media query matches. Use for art-direction (icon vs full logo per breakpoint).",
                },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section
        title="Accessibility (per PF6)"
        description="The single attribute PF6 documents on the brand element."
      >
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                {
                  name: "alt",
                  type: ".pf-v6-c-brand",
                  description: "Alternate text for the image when it can't be displayed. Required.",
                },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section
        title="CSS class / custom-property API"
        description="The class hooks and CSS custom properties PF6 documents for Brand. Useful when you need to drive the size from outside React (e.g. theme overrides)."
      >
        <Card>
          <div style={{ padding: 24 }}>
            <PropsTable
              rows={[
                {
                  name: ".pf-v6-c-brand",
                  type: "<img>, <picture>",
                  description: "Initiates a brand image. Required on every Brand element.",
                },
                {
                  name: ".pf-m-picture",
                  type: ".pf-v6-c-brand",
                  description: "Modifies a brand image to render as a <picture>. PF6 adds this automatically when Brand receives <source> children.",
                },
                {
                  name: "--pf-v6-c-brand--Width{-on-[breakpoint]}: {width}",
                  type: ".pf-v6-c-brand",
                  description: "Per-breakpoint rendered width. Set via the `widths` prop in React — PF6 emits the equivalent custom properties. Override in CSS for theme-level sizing.",
                },
                {
                  name: "--pf-v6-c-brand--Height{-on-[breakpoint]}: {height}",
                  type: ".pf-v6-c-brand",
                  description: "Per-breakpoint rendered height. Set via the `heights` prop in React.",
                },
              ]}
            />
          </div>
        </Card>
      </Section>

      <Section
        title="Accessibility guidance"
        description="A logo is content, not decoration."
      >
        <Card>
          <ul
            style={{
              margin: 0,
              padding: "16px 24px 16px 40px",
              color: "var(--gp-color-text-regular)",
              lineHeight: 1.8,
            }}
          >
            <li>
              <strong>alt is the brand name.</strong> Not &quot;Acme logo&quot; — just{" "}
              <code>alt=&quot;Acme&quot;</code>. The role is implied.
            </li>
            <li>
              <strong>Make it a link to home.</strong> Wrap with an anchor going
              to <code>/</code>. Convention users rely on.
            </li>
            <li>
              <strong>Don&apos;t use Brand for arbitrary images.</strong> It encodes
              logo-specific sizing conventions — use a plain <code>&lt;img&gt;</code>{" "}
              for product imagery.
            </li>
            <li>
              <strong>One alt across light / dark.</strong> When you render both
              theme variants and toggle via CSS, give them the same alt — the
              user shouldn&rsquo;t hear &ldquo;Acme&rdquo; twice in a row in
              screen-reader output.
            </li>
          </ul>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
