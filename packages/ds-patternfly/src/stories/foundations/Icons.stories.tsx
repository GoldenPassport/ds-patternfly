import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ExclamationCircleIcon,
  InfoCircleIcon,
  BellIcon,
  CogIcon,
  HomeIcon,
  PlusIcon,
  TrashIcon,
  PencilAltIcon,
  SearchIcon,
  UserIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  AngleDownIcon,
  TimesIcon,
  EyeIcon,
  EyeSlashIcon,
  DownloadIcon,
  UploadIcon,
} from "@patternfly/react-icons";
import { FoundationPage, Section, Card } from "../../components/StoryKit.js";

const meta: Meta = {
  title: "Foundations/Icons",
  parameters: { layout: "padded" },
};
export default meta;

const COMMON = [
  { name: "Home", Icon: HomeIcon },
  { name: "Search", Icon: SearchIcon },
  { name: "Bell", Icon: BellIcon },
  { name: "Cog", Icon: CogIcon },
  { name: "User", Icon: UserIcon },
  { name: "Plus", Icon: PlusIcon },
  { name: "Trash", Icon: TrashIcon },
  { name: "Edit", Icon: PencilAltIcon },
  { name: "Download", Icon: DownloadIcon },
  { name: "Upload", Icon: UploadIcon },
  { name: "Eye", Icon: EyeIcon },
  { name: "Eye slash", Icon: EyeSlashIcon },
  { name: "Arrow left", Icon: ArrowLeftIcon },
  { name: "Arrow right", Icon: ArrowRightIcon },
  { name: "Angle down", Icon: AngleDownIcon },
  { name: "Close", Icon: TimesIcon },
];

const SIZES: { label: string; size: number }[] = [
  { label: "sm — 12px", size: 12 },
  { label: "md — 16px", size: 16 },
  { label: "lg — 20px", size: 20 },
  { label: "xl — 24px", size: 24 },
  { label: "2xl — 32px", size: 32 },
];

const STATUS_ICONS = [
  {
    name: "Success",
    Icon: CheckCircleIcon,
    iconColor: "var(--gp-color-status-success-icon)",
    textColor: "var(--gp-color-status-success-text)",
    bg: "var(--gp-color-status-success-bg)",
  },
  {
    name: "Warning",
    Icon: ExclamationTriangleIcon,
    iconColor: "var(--gp-color-status-warning-icon)",
    textColor: "var(--gp-color-status-warning-text)",
    bg: "var(--gp-color-status-warning-bg)",
  },
  {
    name: "Danger",
    Icon: ExclamationCircleIcon,
    iconColor: "var(--gp-color-status-danger-icon)",
    textColor: "var(--gp-color-status-danger-text)",
    bg: "var(--gp-color-status-danger-bg)",
  },
  {
    name: "Info",
    Icon: InfoCircleIcon,
    iconColor: "var(--gp-color-status-info-icon)",
    textColor: "var(--gp-color-status-info-text)",
    bg: "var(--gp-color-status-info-bg)",
  },
];

export const Overview: StoryObj = {
  render: () => (
    <FoundationPage
      title="Icons"
      intro={
        <>
          Icons come from{" "}
          <code>@patternfly/react-icons</code> (declared as a peer dependency).
          They inherit color from <code>currentColor</code>, so you set their
          color by setting CSS <code>color</code> on a parent — typically with
          one of our semantic icon tokens.
        </>
      }
    >
      <Section
        title="Sizes"
        description="Icons are square SVGs sized via width/height (or font-size, since they scale with em)."
      >
        <Card>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: 32,
              padding: 24,
              color: "var(--gp-color-icon-regular)",
            }}
          >
            {SIZES.map(({ label, size }) => (
              <div key={size} style={{ textAlign: "center" }}>
                <BellIcon style={{ width: size, height: size }} />
                <div
                  style={{
                    marginTop: 8,
                    fontSize: 12,
                    color: "var(--gp-color-text-subtle)",
                    fontFamily: "var(--gp-font-family)",
                  }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </Section>

      <Section
        title="Status icons"
        description="Status icons combine a semantic icon color with its matching background fill."
      >
        <Card>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 16,
              padding: 24,
            }}
          >
            {STATUS_ICONS.map(({ name, Icon, iconColor, textColor, bg }) => (
              <div
                key={name}
                style={{
                  background: bg,
                  borderRadius: "var(--gp-radius-md)",
                  padding: 16,
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  // Use the status's TEXT color so the label "Success" passes
                  // AA-normal on the matching status background. The icon
                  // itself is colored separately with the status icon color.
                  color: textColor,
                }}
              >
                <Icon
                  style={{ width: 24, height: 24, color: iconColor }}
                  aria-hidden="true"
                />
                <div>
                  <div style={{ fontWeight: 600 }}>{name}</div>
                  <code style={{ fontSize: 12, color: textColor }}>
                    --gp-color-status-{name.toLowerCase()}-icon
                  </code>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </Section>

      <Section
        title="Common icons"
        description="A small sample of icons from @patternfly/react-icons. The full set ships with PatternFly — import any icon you need by name."
      >
        <Card>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(8, 1fr)",
              gap: 16,
              padding: 24,
              color: "var(--gp-color-icon-regular)",
            }}
          >
            {COMMON.map(({ name, Icon }) => (
              <div key={name} style={{ textAlign: "center" }}>
                <Icon style={{ width: 24, height: 24 }} />
                <div
                  style={{
                    marginTop: 8,
                    fontSize: 11,
                    color: "var(--gp-color-text-subtle)",
                    fontFamily: "var(--gp-font-family)",
                  }}
                >
                  {name}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </Section>

      <Section
        title="Accessibility"
        description="Decorative vs informative."
      >
        <Card>
          <div
            style={{
              padding: 24,
              color: "var(--gp-color-text-regular)",
              lineHeight: 1.6,
            }}
          >
            <p>
              <strong>Decorative</strong> icons next to a text label add no new
              information — mark them with <code>aria-hidden=&quot;true&quot;</code>.
            </p>
            <p>
              <strong>Informative</strong> icons that stand alone (e.g. a pure
              icon button) need an accessible name — pass{" "}
              <code>aria-label</code> on the button, not on the icon.
            </p>
          </div>
        </Card>
      </Section>
    </FoundationPage>
  ),
};
