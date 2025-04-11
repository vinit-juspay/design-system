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
    style: "fill",
    actionButtons: 0,
    actionPlacement: "bottom",
    hasCloseIcon: true,
    primaryActionText: "Primary Action",
    secondaryActionText: "Secondary Action",
    hasMainIcon: true
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
    style: {
      control: "select",
      options: ["fill", "subtle", "noFill"],
      description: "The visual style of the alert",
      table: {
        defaultValue: { summary: "fill" },
        category: "Appearance",
      },
    },
    hasMainIcon: {
      control: "boolean",
      description: "Whether to show the alert main icon",
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
    hasCloseIcon: {
      control: "boolean",
      description: "Whether the alert has a close icon",
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
    style: "fill",
    title: "Information Alert",
    description: "This is an informational alert that provides important details to the user.",
    hasCloseIcon: true,
  },
};

export const Success: Story = {
  args: {
    type: "success",
    style: "fill",
    title: "Success Alert",
    description: "The operation was completed successfully.",
    hasCloseIcon: true,
  },
};

export const Error: Story = {
  args: {
    type: "error",
    style: "fill",
    title: "Error Alert",
    description: "An error occurred while processing your request.",
    hasCloseIcon: true,
  },
};

export const Warning: Story = {
  args: {
    type: "warning",
    style: "fill",
    title: "Warning Alert",
    description: "This action might have consequences. Please proceed with caution.",
    hasCloseIcon: true,
  },
};

// Style Variations
export const Subtle: Story = {
  args: {
    type: "warning",
    style: "subtle",
    title: "Subtle Warning",
    description: "This is a subtle warning alert with less visual emphasis.",
    hasCloseIcon: true,
  },
};

export const NoFill: Story = {
  args: {
    type: "error",
    style: "noFill",
    title: "No Fill Error",
    description: "This is an error alert with no background fill.",
    hasCloseIcon: true,
  },
};

// Action Button Variations
export const WithBottomActions: Story = {
  args: {
    type: "primary",
    style: "fill",
    title: "Action Required",
    description: "Please take action on this alert by clicking one of the buttons below.",
    actionButtons: 2,
    actionPlacement: "bottom",
    primaryActionText: "Accept",
    secondaryActionText: "Decline",
    hasCloseIcon: true,
  },
};

export const WithRightActions: Story = {
  args: {
    type: "success",
    style: "fill",
    title: "Action Required",
    description: "Please take action on this alert by clicking the button.",
    actionButtons: 1,
    actionPlacement: "right",
    primaryActionText: "Confirm",
    hasCloseIcon: true,
  },
};

// Customization Examples
export const CustomIcon: Story = {
  args: {
    type: "primary",
    style: "fill",
    title: "Custom Icon Alert",
    description: "This alert uses a custom icon instead of the default one.",
    icon: Bell,
    hasCloseIcon: true,
  },
};

export const NonDismissible: Story = {
  args: {
    type: "error",
    style: "fill",
    title: "Important Error",
    description: "This alert cannot be dismissed and will remain visible.",
    hasCloseIcon: false,
  },
};

// Add a story with no icon
export const NoIcon: Story = {
  args: {
    type: "primary",
    style: "fill",
    title: "No Icon Alert",
    description: "This alert doesn't display an icon.",
    hasMainIcon: false,
    hasCloseIcon: true,
  },
};
