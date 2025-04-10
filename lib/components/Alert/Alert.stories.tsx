import type { Meta, StoryObj } from "@storybook/react";
import Alert from "./Alert";
import { Bell } from "lucide-react";

const meta: Meta<typeof Alert> = {
  title: "Components/Alert",
  component: Alert,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["primary", "success", "purple", "warning", "neutral", "error", "orange"],
      description: "The type/color variant of the alert",
      table: {
        defaultValue: { summary: "primary" },
      },
    },
    alertStyle: {
      control: "select",
      options: ["fill", "subtle", "noFill"],
      description: "The visual style of the alert",
      table: {
        defaultValue: { summary: "fill" },
      },
    },
    actionButtons: {
      control: "select",
      options: [0, 1, 2],
      description: "Number of action buttons to display",
      table: {
        defaultValue: { summary: "0" },
      },
    },
    actionPlacement: {
      control: "select",
      options: ["bottom", "right"],
      description: "Placement of action buttons",
      table: {
        defaultValue: { summary: "bottom" },
      },
    },
    isDismissible: {
      control: "boolean",
      description: "Whether the alert is dismissible",
      table: {
        defaultValue: { summary: "true" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Primary: Story = {
  args: {
    type: "primary",
    alertStyle: "fill",
    title: "Information Alert",
    description: "This is an informational alert that provides important details to the user.",
    isDismissible: true,
  },
};

export const Success: Story = {
  args: {
    type: "success",
    alertStyle: "fill",
    title: "Success Alert",
    description: "The operation was completed successfully.",
    isDismissible: true,
  },
};

export const Error: Story = {
  args: {
    type: "error",
    alertStyle: "fill",
    title: "Error Alert",
    description: "An error occurred while processing your request.",
    isDismissible: true,
  },
};

export const Warning: Story = {
  args: {
    type: "warning",
    alertStyle: "fill",
    title: "Warning Alert",
    description: "This action might have consequences. Please proceed with caution.",
    isDismissible: true,
  },
};

export const WithActions: Story = {
  args: {
    type: "primary",
    alertStyle: "fill",
    title: "Action Required",
    description: "Please take action on this alert by clicking one of the buttons below.",
    actionButtons: 2,
    actionPlacement: "bottom",
    primaryActionText: "Accept",
    secondaryActionText: "Decline",
    isDismissible: true,
  },
};

export const WithRightActions: Story = {
  args: {
    type: "success",
    alertStyle: "fill",
    title: "Action Required",
    description: "Please take action on this alert by clicking the button.",
    actionButtons: 1,
    actionPlacement: "right",
    primaryActionText: "Confirm",
    isDismissible: true,
  },
};

export const Subtle: Story = {
  args: {
    type: "warning",
    alertStyle: "subtle",
    title: "Subtle Warning",
    description: "This is a subtle warning alert with less visual emphasis.",
    isDismissible: true,
  },
};

export const NoFill: Story = {
  args: {
    type: "error",
    alertStyle: "noFill",
    title: "No Fill Error",
    description: "This is an error alert with no background fill.",
    isDismissible: true,
  },
};

export const CustomIcon: Story = {
  args: {
    type: "primary",
    alertStyle: "fill",
    title: "Custom Icon Alert",
    description: "This alert uses a custom icon instead of the default one.",
    icon: Bell,
    isDismissible: true,
  },
};

export const NonDismissible: Story = {
  args: {
    type: "error",
    alertStyle: "fill",
    title: "Important Error",
    description: "This alert cannot be dismissed and will remain visible.",
    isDismissible: false,
  },
};
