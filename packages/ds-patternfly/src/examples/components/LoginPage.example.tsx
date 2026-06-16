/**
 * LoginPage — the full-page sign-in shell: brand panel, LoginForm,
 * social-login row, sign-up / forgot links, footer policy links.
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { Fragment, useState } from "react";
import {
  Button,
  ListItem,
  ListVariant,
  LoginFooterItem,
  LoginForm,
  LoginMainFooterBandItem,
  LoginMainFooterLinksItem,
  LoginPage,
  useTheme,
} from "@golden-passport/ds-patternfly";
import {
  ExclamationCircleIcon,
  GithubIcon,
  GoogleIcon,
} from "@patternfly/react-icons";

/** Demo brand logo (blue badge + "Acme" wordmark) as an inline-SVG
 *  data-URI, so it can feed PF6 LoginPage's `brandImgSrc` (a string).
 *  Real apps point brandImgSrc at a hosted logo asset; the wordmark
 *  colour adapts to mode so it stays legible on the form panel. */
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

// #region FullSignInPage
export function FullSignInPage() {
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

  return (
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
    </LoginPage>
  );
}
// #endregion

export default function LoginPageExample() {
  return <FullSignInPage />;
}
