import type { Meta, StoryObj } from "@storybook/react";
import Alert from "./Alert";
import { Bell } from "lucide-react";

const meta: Meta<typeof Alert> = {
  title: "Components/Alert",
  component: Alert,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "The Alert component displays important messages to users. It can be configured with different styles, types, and actions."
      }
    }
  },
  tags: ["autodocs"],
  args: {
    type: "primary",
    alertStyle: "fill",
    actionButtons: 0,
    actionPlacement: "bottom",
    isDismissible: true,
    primaryActionText: "Primary Action",
    secondaryActionText: "Secondary Action",
    showIcon: true
  },
  argTypes: {
    type: {
      control: "select",
      options: ["primary", "success", "purple", "warning", "neutral", "error", "orange"],
      description: "The type/color variant of the alert",
      table: {
        defaultValue: { summary: "primary" },
        category: "Appearance",
      },
    },
    alertStyle: {
      control: "select",
      options: ["fill", "subtle", "noFill"],
      description: "The visual style of the alert",
      table: {
        defaultValue: { summary: "fill" },
        category: "Appearance",
      },
    },
    showIcon: {
      control: "boolean",
      description: "Whether to show the alert icon",
      table: {
        defaultValue: { summary: "true" },
        category: "Appearance",
      },
    },
    actionButtons: {
      control: "select",
      options: [0, 1, 2],
      description: "Number of action buttons to display",
      table: {
        defaultValue: { summary: "0" },
        category: "Actions",
      },
    },
    actionPlacement: {
      control: "select",
      options: ["bottom", "right"],
      description: "Placement of action buttons",
      table: {
        defaultValue: { summary: "bottom" },
        category: "Layout",
      },
    },
    isDismissible: {
      control: "boolean",
      description: "Whether the alert is dismissible",
      table: {
        defaultValue: { summary: "true" },
        category: "Behavior",
      },
    },
    title: {
      control: "text",
      description: "The title of the alert",
      table: {
        category: "Content",
      },
    },
    description: {
      control: "text",
      description: "The description/content of the alert",
      table: {
        category: "Content",
      },
    },
    primaryActionText: {
      control: "text",
      description: "Text for the primary action button",
      table: {
        defaultValue: { summary: "Primary Action" },
        category: "Actions",
      },
    },
    secondaryActionText: {
      control: "text",
      description: "Text for the secondary action button",
      table: {
        defaultValue: { summary: "Secondary Action" },
        category: "Actions", 
      },
    },
    onPrimaryAction: {
      table: {
        disable: true
      }
    },
    onSecondaryAction: {
      table: {
        disable: true
      }
    },
    onClose: {
      table: {
        disable: true
      }
    },
    icon: {
      table: {
        disable: true
      }
    },
    children: {
      table: {
        disable: true
      }
    }
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

// Base Stories
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

// Style Variations
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

// Action Button Variations
export const WithBottomActions: Story = {
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

// Customization Examples
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

// Add a story with no icon
export const NoIcon: Story = {
  args: {
    type: "primary",
    alertStyle: "fill",
    title: "No Icon Alert",
    description: "This alert doesn't display an icon.",
    showIcon: false,
    isDismissible: true,
  },
};
