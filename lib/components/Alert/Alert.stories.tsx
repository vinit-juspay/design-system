import type { Meta, StoryObj } from "@storybook/react";
import Alert from "./Alert";
import { AlertStyle, AlertVariant, AlertActionPlacement } from "./types";
import { Bell, Info, AlertTriangle, CheckCircle, XCircle, Sparkles, Flame } from "lucide-react";

const meta = {
  title: "Components/Alert",
  component: Alert,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: Object.values(AlertVariant),
      description: "The visual style variant of the alert",
      table: {
        defaultValue: { summary: AlertVariant.PRIMARY },
      },
    },
    style: {
      control: "select",
      options: Object.values(AlertStyle),
      description: "The fill style of the alert",
      table: {
        defaultValue: { summary: AlertStyle.FILL },
      },
    },
    actionPlacement: {
      control: "select",
      options: Object.values(AlertActionPlacement),
      description: "The placement of action buttons",
      table: {
        defaultValue: { summary: AlertActionPlacement.BOTTOM },
      },
    },
    heading: {
      control: "text",
      description: "The heading text of the alert",
    },
    description: {
      control: "text",
      description: "The description text of the alert",
    },
    showPrimaryAction: {
      control: "boolean",
      description: "Show primary action button",
    },
    showSecondaryAction: {
      control: "boolean",
      description: "Show secondary action button",
    },
    showCloseButton: {
      control: "boolean",
      description: "Show close button",
    },
    showCustomIcon: {
      control: "boolean",
      description: "Show custom icon instead of default",
    },
  },
} as Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof Alert>;

const getIconForVariant = (variant: AlertVariant) => {
  switch (variant) {
    case AlertVariant.SUCCESS:
      return <CheckCircle size={16} />;
    case AlertVariant.WARNING:
      return <AlertTriangle size={16} />;
    case AlertVariant.ERROR:
      return <XCircle size={16} />;
    case AlertVariant.PURPLE:
      return <Sparkles size={16} />;
    case AlertVariant.ORANGE:
      return <Flame size={16} />;
    case AlertVariant.NEUTRAL:
      return <Bell size={16} />;
    default:
      return <Info size={16} />;
  }
};

export const Default: Story = {
  render: (args) => {
    const {
      showPrimaryAction,
      showSecondaryAction,
      showCloseButton,
      showCustomIcon,
      ...alertProps
    } = args as any;

    return (
        <div className="max-w-[700px] overflow-x-auto">
          <Alert
            {...alertProps}
          primaryAction={
            showPrimaryAction
              ? {
                  label: "Primary Action",
                  onClick: () => alert("Primary action clicked"),
                }
              : undefined
          }
          secondaryAction={
            showSecondaryAction
              ? {
                  label: "Secondary Action",
                  onClick: () => alert("Secondary action clicked"),
                }
              : undefined
          }
          onClose={showCloseButton ? () => alert("Close clicked") : undefined}
          icon={showCustomIcon ? getIconForVariant(args.variant as AlertVariant) : undefined}
        />
        </div>
    );
  },
  args: {
    heading: "Alert Heading",
    description: "This is a description of the alert message with more details.",
    variant: AlertVariant.PRIMARY,
    style: AlertStyle.FILL,
    actionPlacement: AlertActionPlacement.BOTTOM,
    primaryAction: { label: "Primary Action", onClick: () => alert("Primary action clicked") },
    secondaryAction: { label: "Secondary Action", onClick: () => alert("Secondary action clicked") },
    onClose: () => alert("Close clicked"),
    icon: getIconForVariant(AlertVariant.PRIMARY),
  },
};

export const Success: Story = {
  ...Default,
  args: {
    ...Default.args,
    variant: AlertVariant.SUCCESS,
    heading: "Success Alert",
    description: "Operation completed successfully!",
  },
};

export const Warning: Story = {
  ...Default,
  args: {
    ...Default.args,
    variant: AlertVariant.WARNING,
    heading: "Warning Alert",
    description: "Please review the changes before proceeding.",
  },
};

export const Error: Story = {
  ...Default,
  args: {
    ...Default.args,
    variant: AlertVariant.ERROR,
    heading: "Error Alert",
    description: "An error occurred while processing your request.",
  },
};

export const Subtle: Story = {
  ...Default,
  args: {
    ...Default.args,
    style: AlertStyle.SUBTLE,
    heading: "Subtle Alert",
    description: "This is a subtle variant of the alert component.",
  },
};

export const NoFill: Story = {
  ...Default,
  args: {
    ...Default.args,
    style: AlertStyle.NO_FILL,
    heading: "No Fill Alert",
    description: "This is a no-fill variant of the alert component.",
  },
};

export const RightActions: Story = {
  ...Default,
  args: {
    ...Default.args,
    actionPlacement: AlertActionPlacement.RIGHT,
    heading: "Right-aligned Actions",
    description: "This alert has right-aligned action buttons.",
  },
}; 