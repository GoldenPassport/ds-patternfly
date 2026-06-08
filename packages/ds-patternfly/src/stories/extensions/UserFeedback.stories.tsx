import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@patternfly/react-core";
import { FeedbackModal } from "@patternfly/react-user-feedback";
import { FoundationPage, Section, Card, CodeBlock } from "../../components/StoryKit.js";
import { DemoFrame, PropsTable } from "../../components/DemoKit.js";

const meta: Meta = {
  title: "Extensions/User feedback",
  parameters: {
    layout: "padded",
    a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } },
  },
};
export default meta;

export const Overview: StoryObj = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <FoundationPage
        title="User feedback"
        intro={
          <>
            A pre-built feedback / bug-report / mailing-list modal — same
            shape as Red Hat&rsquo;s product feedback flow. Configure each
            optional channel (feedback, bug report, mailing list, support
            case) by either passing a URL (redirect) or a callback (handle
            inline). From <code>@patternfly/react-user-feedback</code>.
          </>
        }
      >
        <Section
          title="Inline feedback handler"
          description="Pass a callback to onShareFeedback — the modal renders a textarea + submit button and calls back with the typed message."
        >
          <Card>
            <div style={{ padding: 24, display: "grid", gap: 16 }}>
              <DemoFrame>
                <Button onClick={() => setOpen(true)}>Share feedback</Button>
              </DemoFrame>
              <FeedbackModal
                isOpen={open}
                onClose={() => setOpen(false)}
                email="user@example.com"
                onShareFeedback={async (email, feedback) => {
                  console.log("feedback", { email, feedback });
                  // Replace with your API call. Return true on success.
                  return true;
                }}
                onReportABug={async (email, bug) => {
                  console.log("bug", { email, bug });
                  return true;
                }}
                onJoinMailingList={async (email) => {
                  console.log("mailing list", { email });
                  return true;
                }}
              />
              <CodeBlock>{`const [open, setOpen] = useState(false);

<FeedbackModal
  isOpen={open}
  onClose={() => setOpen(false)}
  email={user.email}
  onShareFeedback={(email, feedback) => api.feedback({ email, feedback })}
  onReportABug={(email, bug) => api.bug({ email, bug })}
  onJoinMailingList={(email) => api.subscribe(email)}
  onOpenSupportCase="https://access.example.com/support/cases/new"
/>`}</CodeBlock>
            </div>
          </Card>
        </Section>

        <Section
          title="Redirect-to-URL handler"
          description="Pass a string instead of a function to redirect the user to an external feedback / bug-report system."
        >
          <Card>
            <div style={{ padding: 24 }}>
              <CodeBlock>{`<FeedbackModal
  isOpen={open}
  onClose={close}
  email={user.email}
  onShareFeedback="https://feedback.example.com/share"
  onReportABug="https://bugzilla.example.com/new"
  onJoinMailingList="https://lists.example.com/subscribe"
/>`}</CodeBlock>
            </div>
          </Card>
        </Section>

        <Section title="Most-used props">
          <Card>
            <div style={{ padding: 24 }}>
              <PropsTable
                rows={[
                  { name: "isOpen", type: "boolean", description: "Required — controlled visibility." },
                  { name: "onClose", type: "() => void", description: "Required — close / cancel handler." },
                  { name: "onShareFeedback", type: "string | (email, feedback) => boolean | Promise<boolean>", description: "Required. URL = redirect; function = inline form. Return true on success." },
                  { name: "email", type: "string", description: "Pre-fill the email field. The user can still edit it." },
                  { name: "onReportABug", type: "string | (email, bug) => boolean | Promise<boolean>", description: "Optional bug-report channel. Omit to hide the 'Report a bug' option." },
                  { name: "onJoinMailingList", type: "string | (email) => boolean | Promise<boolean>", description: "Optional mailing-list signup. Omit to hide the option." },
                  { name: "onOpenSupportCase", type: "string", description: "URL of your support-case system. Renders a 'Open a support case' link." },
                  { name: "feedbackImg", type: "string", description: "Custom header image (URL). Defaults to the package's stock illustration." },
                  { name: "feedbackLocale", type: "FeedbackLocale", description: "Localize every visible string. Pass your own copy of the locale object." },
                ]}
              />
            </div>
          </Card>
        </Section>

        <Section title="Patterns">
          <Card>
            <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
              <li><strong>Trigger from the masthead.</strong> A &ldquo;? &rsaquo; Share feedback&rdquo; menu item is the convention — discoverable but unobtrusive.</li>
              <li><strong>Pre-fill <code>email</code></strong> from the logged-in user. Every field they don&rsquo;t have to fill is a 5% bump in submission rate.</li>
              <li><strong>Return true on success.</strong> The component shows the success screen based on your callback&rsquo;s resolved value — false renders the error screen.</li>
              <li><strong>Localize once.</strong> If you ship in multiple locales, build the <code>feedbackLocale</code> object from your i18n catalog at app boot — don&rsquo;t inline strings here.</li>
            </ul>
          </Card>
        </Section>

        <Section title="Accessibility">
          <Card>
            <ul style={{ margin: 0, padding: "16px 24px 16px 40px", color: "var(--gp-color-text-regular)", lineHeight: 1.8 }}>
              <li><strong>The modal traps focus.</strong> Standard PF6 dialog behaviour — Tab cycles within the modal until close.</li>
              <li><strong>The success / error screens auto-announce.</strong> The component switches the heading on submit; screen readers pick up the change.</li>
              <li><strong>Don&rsquo;t auto-open.</strong> Triggered modals are accessible; modals that pop up on first visit are interruptions and (rightly) hostile to assistive-tech users.</li>
            </ul>
          </Card>
        </Section>
      </FoundationPage>
    );
  },
};
