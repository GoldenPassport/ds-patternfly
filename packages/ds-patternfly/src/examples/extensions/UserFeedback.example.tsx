/**
 * FeedbackModal (@patternfly/react-user-feedback) — a pre-built feedback /
 * bug-report / mailing-list modal. Configure each optional channel
 * (feedback, bug report, mailing list, support case) by either passing a
 * URL (redirect) or a callback (handle inline).
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useState } from "react";
import { FeedbackModal } from "@patternfly/react-user-feedback";
import { Button } from "@golden-passport/ds-patternfly";

// #region InlineFeedbackHandler
export function InlineFeedbackHandler() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Share feedback</Button>
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
    </>
  );
}
// #endregion

export default function UserFeedbackExample() {
  return <InlineFeedbackHandler />;
}
