import type { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";
import { Search, Plus, ArrowRight } from "lucide-react";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    buttonType: {
      control: "select",
      options: ["primary", "secondary", "danger", "success"],
      description: "The visual style of the button",
      table: {
        defaultValue: { summary: "primary" },
      },
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "The size of the button",
      table: {
        defaultValue: { summary: "md" },
      },
    },
    subType: {
      control: "select",
      options: ["default", "iconOnly", "link"],
      description: "The sub-type of the button",
      table: {
        defaultValue: { summary: "default" },
      },
    },
    isLoading: {
      control: "boolean",
      description: "Whether the button is in a loading state",
    },
    isDisabled: {
      control: "boolean",
      description: "Whether the button is disabled",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    buttonType: "primary",
    children: "Primary Button",
  },
};

export const Secondary: Story = {
  args: {
    buttonType: "secondary",
    children: "Secondary Button",
  },
};

export const Danger: Story = {
  args: {
    buttonType: "danger",
    children: "Danger Button",
  },
};

export const Success: Story = {
  args: {
    buttonType: "success",
    children: "Success Button",
  },
};

export const Small: Story = {
  args: {
    buttonType: "primary",
    size: "sm",
    children: "Small Button",
  },
};

export const Medium: Story = {
  args: {
    buttonType: "primary",
    size: "md",
    children: "Medium Button",
  },
};

export const Large: Story = {
  args: {
    buttonType: "primary",
    size: "lg",
    children: "Large Button",
  },
};

export const WithLeadingIcon: Story = {
  args: {
    buttonType: "primary",
    children: "Search",
    leadingIcon: Search,
  },
};

export const WithTrailingIcon: Story = {
  args: {
    buttonType: "primary",
    children: "Next",
    trailingIcon: ArrowRight,
  },
};

export const IconOnly: Story = {
  args: {
    buttonType: "primary",
    subType: "iconOnly",
    leadingIcon: Plus,
    "aria-label": "Add item",
  },
};

export const Loading: Story = {
  args: {
    buttonType: "primary",
    children: "Loading",
    isLoading: true,
  },
};

export const Disabled: Story = {
  args: {
    buttonType: "primary",
    children: "Disabled",
    isDisabled: true,
  },
};

export const Link: Story = {
  args: {
    buttonType: "primary",
    subType: "link",
    children: "Link Button",
  },
}; 