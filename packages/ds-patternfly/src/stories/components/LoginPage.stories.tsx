import { Fragment, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Button,
  ListItem,
  ListVariant,
  LoginFooterItem,
  LoginForm,
  LoginMainFooterBandItem,
  LoginMainFooterLinksItem,
  LoginPage,
} from "@patternfly/react-core";
import {
  ExclamationCircleIcon,
  GithubIcon,
  GoogleIcon,
} from "@patternfly/react-icons";
import { FoundationPage, Section, Card, CodeBlock } from "../_storyKit.js";
import { DemoFrame, PropsTable } from "../../components/DemoKit.js";
import { useTheme } from "../../theme/ThemeProvider.js";

/** The Acme demo logo (blue badge + "Acme" wordmark) as an inline-SVG
 *  data-URI, so it can feed PF6 LoginPage's `brandImgSrc` (a string).
 *  The wordmark colour adapts to mode so it stays legible on the form
 *  panel — mirrors the shared <AcmeLogo> component used elsewhere. */
function acmeLogo(textColor: string): string {
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 40'>` +
    `<circle cx='20' cy='20' r='20' fill='#0066cc'/>` +
    `<path d='M11 28 L20 10 L29 28 M14.5 22 L25.5 22' stroke='white' ` +
    `stroke-width='3' stroke-linecap='round' stroke-linejoin='round' fill='none'/>` +
    `<text x='52' y='27' fill='${textColor}' font-family='Arial, sans-serif' ` +
    `font-size='22' font-weight='700' letter-spacing='-0.5'>Acme</text>` +
    `</svg>`;
  return "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg);
}

const meta: Meta = {
  title: "Components/LoginPage",
  parameters: {
    layout: "padded",
    a11y: {
      config: {
        // The full LoginPage demo renders multiple <main> landmarks side-by-
        // side for documentation; in a real app there's only one. The doc
        // page also renders form fields outside of typical app-level chrome.
        rules: [
          { id: "landmark-no-duplicate-main", enabled: false },
          { id: "landmark-unique", enabled: false },
          // PF6's LoginPage layers brand-panel + form-panel + form-fields
          // gradients that confuse axe's bg-detection. The actual
          // brand-token contrast is validated independently by tokens.test.ts.
          { id: "color-contrast", enabled: false },
        ],
      },
    },
  },
};
export default meta;

export const Overview: StoryObj = {
  render: () => {
    const { mode } = useTheme();
    const brandImg = acmeLogo(mode === "dark" ? "#f5f5f5" : "#0a0a0a");
    const [showHelper, setShowHelper] = useState(false);
    const [username, setUsername] = useState("");
    const [validUsername, setValidUsername] = useState(true);
    const [password, setPassword] = useState("");
    const [validPassword, setValidPassword] = useState(true);
    const [remember, setRemember] = useState(false);

    const onLogin = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      setValidUsername(!!username);
      setValidPassword(!!password);
      setShowHelper(!username || !password);
    };

    const socialMediaLogin = (
      <Fragment>
        <LoginMainFooterLinksItem>
          <Button variant="plain" aria-label="Log in with Google" icon={<GoogleIcon />} />
        </LoginMainFooterLinksItem>
        <LoginMainFooterLinksItem>
          <Button variant="plain" aria-label="Log in with GitHub" icon={<GithubIcon />} />
        </LoginMainFooterLinksItem>
      </Fragment>
    );

    const signUp = (
      <LoginMainFooterBandItem>
        Need an account? <a href="#sign-up">Sign up.</a>
      </LoginMainFooterBandItem>
    );

    const forgot = (
      <LoginMainFooterBandItem>
        <a href="#forgot">Forgot username or password?</a>
      </LoginMainFooterBandItem>
    );

    const footerLinks = (
      <Fragment>
        <ListItem>
          <LoginFooterItem href="#terms">Terms of use</LoginFooterItem>
        </ListItem>
        <ListItem>
          <LoginFooterItem href="#help">Help</LoginFooterItem>
        </ListItem>
        <ListItem>
          <LoginFooterItem href="#privacy">Privacy policy</LoginFooterItem>
        </ListItem>
      </Fragment>
    );

    const loginForm = (
      <LoginForm
        showHelperText={showHelper}
        helperText="Invalid username or password."
        helperTextIcon={<ExclamationCircleIcon />}
        usernameLabel="Username"
        usernameValue={username}
        onChangeUsername={(_e, v) => setUsername(v)}
        isValidUsername={validUsername}
        passwordLabel="Password"
        passwordValue={password}
        onChangePassword={(_e, v) => setPassword(v)}
        isValidPassword={validPassword}
        rememberMeLabel="Keep me signed in"
        isRememberMeChecked={remember}
        onChangeRememberMe={() => setRemember((v) => !v)}
        onLoginButtonClick={onLogin}
        loginButtonLabel="Sign in"
      />
    );

    return (
      <FoundationPage
        title="LoginPage"
        intro={
          <>
            The full-page sign-in shell — brand panel on the left, form
            panel on the right (or stacked on small viewports), with built-
            in slots for social-login icons, sign-up link, forgot-password
            link, and footer policy links. Pair with <code>LoginForm</code>{" "}
            for the credential fields. Use as the entry shell of an app
            before the user has authenticated.
          </>
        }
      >
        <Section
          title="Full sign-in page"
          description="Slots: brandImgSrc + brandImgAlt (logo), backgroundImgSrc (hero panel art), textContent (intro paragraph), loginTitle / loginSubtitle, socialMediaLoginContent (icon row), signUpForAccountMessage, forgotCredentials, footerListItems. The body holds a LoginForm."
        >
          <Card>
            <div style={{ padding: 24, display: "grid", gap: 32 }}>
              {/* Cap the brand wordmark to a logo-sized height (PF6's
                  LoginPage otherwise scales the brand image to fill the
                  header, which blows the wordmark up huge), and give the
                  page bottom breathing room inside the frame. */}
              <style>{`
                .gp-login-demo .pf-v6-c-login__header img,
                .gp-login-demo .pf-v6-c-login__header .pf-v6-c-brand {
                  block-size: 56px;
                  inline-size: auto;
                }
                .gp-login-demo .pf-v6-c-login__main {
                  margin-block-end: 2rem;
                }
                /* PF6's LoginPage forces min-height to fill the viewport;
                   in a doc demo let it size to its content so the frame
                   (auto height) expands to show the whole example. */
                .gp-login-demo .pf-v6-c-login {
                  min-block-size: auto;
                }
              `}</style>
              <DemoFrame>
                <div className="gp-login-demo">
                  <LoginPage
                    footerListVariants={ListVariant.inline}
                    brandImgSrc={brandImg}
                    brandImgAlt="Acme logo"
                    textContent="Acme is the workflow automation platform for teams that ship software fast."
                    loginTitle="Sign in"
                    loginSubtitle="Use your single sign-on credentials."
                    socialMediaLoginContent={socialMediaLogin}
                    socialMediaLoginAriaLabel="Log in with social media"
                    signUpForAccountMessage={signUp}
                    forgotCredentials={forgot}
                    footerListItems={footerLinks}
                  >
                    {loginForm}
                  </LoginPage>
                </div>
              </DemoFrame>
              <CodeBlock>{`<LoginPage
  brandImgSrc="/logo.svg"
  brandImgAlt="Acme"
  backgroundImgSrc="/login-bg.svg"
  textContent="Acme is the workflow automation platform…"
  loginTitle="Sign in to Acme"
  loginSubtitle="Use your single sign-on credentials."
  socialMediaLoginContent={
    <>
      <LoginMainFooterLinksItem>
        <Button variant="plain" aria-label="Log in with Google" icon={<GoogleIcon />} />
      </LoginMainFooterLinksItem>
      <LoginMainFooterLinksItem>
        <Button variant="plain" aria-label="Log in with GitHub" icon={<GithubIcon />} />
      </LoginMainFooterLinksItem>
    </>
  }
  socialMediaLoginAriaLabel="Log in with social media"
  signUpForAccountMessage={
    <LoginMainFooterBandItem>
      Need an account? <a href="/signup">Sign up.</a>
    </LoginMainFooterBandItem>
  }
  forgotCredentials={
    <LoginMainFooterBandItem>
      <a href="/forgot">Forgot username or password?</a>
    </LoginMainFooterBandItem>
  }
  footerListVariants={ListVariant.inline}
  footerListItems={
    <>
      <ListItem><LoginFooterItem href="/terms">Terms of use</LoginFooterItem></ListItem>
      <ListItem><LoginFooterItem href="/help">Help</LoginFooterItem></ListItem>
      <ListItem><LoginFooterItem href="/privacy">Privacy policy</LoginFooterItem></ListItem>
    </>
  }
>
  <LoginForm
    showHelperText={showHelper}
    helperText="Invalid username or password."
    helperTextIcon={<ExclamationCircleIcon />}
    usernameLabel="Username"
    usernameValue={username}
    onChangeUsername={(_, v) => setUsername(v)}
    isValidUsername={validUsername}
    passwordLabel="Password"
    passwordValue={password}
    onChangePassword={(_, v) => setPassword(v)}
    isValidPassword={validPassword}
    rememberMeLabel="Keep me signed in"
    isRememberMeChecked={remember}
    onChangeRememberMe={() => setRemember(v => !v)}
    onLoginButtonClick={onLogin}
    loginButtonLabel="Sign in"
  />
</LoginPage>`}</CodeBlock>
            </div>
          </Card>
        </Section>

        <Section
          title="Header utilities (language picker etc.)"
          description="The headerUtilities slot sits in the top-right of the form panel — typically used for a language picker, theme toggle, or environment marker."
        >
          <Card>
            <div style={{ padding: 24 }}>
              <CodeBlock>{`<LoginPage
  ...
  headerUtilities={
    <Select
      isOpen={langOpen}
      selected={lang}
      onSelect={(_, v) => { setLang(v); setLangOpen(false); }}
      onOpenChange={setLangOpen}
      toggle={(toggleRef) => (
        <MenuToggle ref={toggleRef} onClick={() => setLangOpen(o => !o)} isExpanded={langOpen}>
          {lang}
        </MenuToggle>
      )}
    >
      <SelectList>
        <SelectOption value="English">English</SelectOption>
        <SelectOption value="Français">Français</SelectOption>
        <SelectOption value="Deutsch">Deutsch</SelectOption>
      </SelectList>
    </Select>
  }
>
  {loginForm}
</LoginPage>`}</CodeBlock>
            </div>
          </Card>
        </Section>

        <Section
          title="Show / hide password toggle"
          description="LoginForm renders a built-in eye toggle when isShowPasswordEnabled is set — handy for users typing complex passwords on shared screens."
        >
          <Card>
            <div style={{ padding: 24 }}>
              <CodeBlock>{`<LoginForm
  ... // standard props
  isShowPasswordEnabled
  hidePasswordAriaLabel="Hide password"
  showPasswordAriaLabel="Show password"
/>`}</CodeBlock>
            </div>
          </Card>
        </Section>

        <Section title="Composition">
          <Card>
            <div style={{ padding: 24 }}>
              <PropsTable
                rows={[
                  { name: "LoginPage", type: "container", description: "The full-page shell. Owns all the slots — brand, hero text, form, social login, footer." },
                  { name: "LoginForm", type: "child", description: "Username / password / remember-me / submit. Pass valid* + helper props for inline validation." },
                  { name: "LoginMainFooterBandItem", type: "child", description: "A single-line footer item — 'Need an account?', 'Forgot password?'. Wraps content cleanly with the band styling." },
                  { name: "LoginMainFooterLinksItem", type: "child", description: "A single icon button in the social-login row." },
                  { name: "LoginFooterItem", type: "child", description: "A footer policy link — wrap inside <ListItem> for the inline footer list." },
                ]}
              />
            </div>
          </Card>
        </Section>

        <Section title="Most-used LoginPage props">
          <Card>
            <div style={{ padding: 24 }}>
              <PropsTable
                rows={[
                  { name: "brandImgSrc", type: "string", description: "The brand logo URL. Sits at the top of the form panel." },
                  { name: "brandImgAlt", type: "string", description: "Alt text for the brand logo — required for screen readers." },
                  { name: "backgroundImgSrc", type: "string", description: "Background image for the hero (left) panel." },
                  { name: "textContent", type: "ReactNode", description: "Intro paragraph above the form on small viewports / in the hero panel on large ones." },
                  { name: "loginTitle", type: "ReactNode", description: "The form panel's headline ('Sign in to Acme')." },
                  { name: "loginSubtitle", type: "ReactNode", description: "Quieter line under the title." },
                  { name: "socialMediaLoginContent", type: "ReactNode", description: "Slot for the icon row of OAuth providers." },
                  { name: "socialMediaLoginAriaLabel", type: "string", description: "Required when social-login is set — names the provider region." },
                  { name: "signUpForAccountMessage", type: "ReactNode", description: "Wrap a 'Need an account?' line in LoginMainFooterBandItem." },
                  { name: "forgotCredentials", type: "ReactNode", description: "Wrap a 'Forgot username or password?' link in LoginMainFooterBandItem." },
                  { name: "footerListItems", type: "ReactNode", description: "Footer policy links — Terms / Help / Privacy. Wrap each in <ListItem><LoginFooterItem>." },
                  { name: "footerListVariants", type: "ListVariant.inline", description: "Lay the footer list out horizontally." },
                  { name: "headerUtilities", type: "ReactNode", description: "Slot in the top-right of the form panel — language picker, theme toggle, environment marker." },
                ]}
              />
            </div>
          </Card>
        </Section>

        <Section title="Most-used LoginForm props">
          <Card>
            <div style={{ padding: 24 }}>
              <PropsTable
                rows={[
                  { name: "usernameLabel / usernameValue / onChangeUsername / isValidUsername", type: "string / string / fn / boolean", description: "Username field control." },
                  { name: "passwordLabel / passwordValue / onChangePassword / isValidPassword", type: "string / string / fn / boolean", description: "Password field control." },
                  { name: "rememberMeLabel / isRememberMeChecked / onChangeRememberMe", type: "string / boolean / fn", description: "Remember-me checkbox. Omit the trio to hide the option." },
                  { name: "loginButtonLabel", type: "string", description: "Submit button label." },
                  { name: "onLoginButtonClick", type: "(event) => void", description: "Form submit. preventDefault() inside; do your own validation + navigation." },
                  { name: "showHelperText / helperText / helperTextIcon", type: "boolean / string / ReactNode", description: "Inline error helper. Set after a failed submit attempt." },
                  { name: "isShowPasswordEnabled", type: "boolean", description: "Show the eye-toggle for password reveal." },
                  { name: "showPasswordAriaLabel / hidePasswordAriaLabel", type: "string", description: "aria-labels for the eye toggle (required when isShowPasswordEnabled)." },
                ]}
              />
            </div>
          </Card>
        </Section>

        <Section title="Pattern guidance">
          <Card>
            <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
              <li><strong>Brand panel = brand voice</strong>. The hero text isn&rsquo;t the place for legal copy — keep it inviting (one sentence about what the app does).</li>
              <li><strong>Always offer SSO when possible</strong> — the social-login row drops password-management overhead.</li>
              <li><strong>Sign-up link beside the form</strong> — users who hit the wrong page should be able to switch to sign-up in one click.</li>
              <li><strong>Footer policy links are required</strong> in most jurisdictions — Terms, Privacy, often Cookies.</li>
              <li><strong>Show inline error after submit, not on blur</strong>. Until the user has tried submitting, don&rsquo;t mark fields invalid — they&rsquo;re typing.</li>
            </ul>
          </Card>
        </Section>

        <Section title="Accessibility">
          <Card>
            <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
              <li><strong>Brand img needs a meaningful alt</strong> — &ldquo;Acme logo&rdquo; (not just &ldquo;logo&rdquo;).</li>
              <li><strong>Social-media row needs aria-label</strong> via socialMediaLoginAriaLabel — otherwise screen readers announce a row of unrelated icon buttons.</li>
              <li><strong>Field labels should be visible</strong> — usernameLabel / passwordLabel render visible labels above the inputs. Don&rsquo;t hand-roll placeholder-only fields.</li>
              <li><strong>Submit on Enter</strong> — LoginForm wraps a &lt;form&gt; so Enter inside any field submits.</li>
              <li><strong>Show password toggle is opt-in</strong> — only enable when the threat model warrants it (some orgs disable it for shared workstations).</li>
            </ul>
          </Card>
        </Section>
      </FoundationPage>
    );
  },
};
