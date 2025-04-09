import type { Meta, StoryObj } from "@storybook/react";
import Tag from "./Tag";
import SplitTag from "./SplitTag";
import { Check, X, Info, Bell } from "lucide-react";
import * as React from "react";

// Default icons to use when slots are enabled
const DEFAULT_LEADING_ICON = <Info size={16} />;
const DEFAULT_TRAILING_ICON = <X size={16} />;

// Create a custom component for Storybook that accepts boolean props
const StoryTag = ({
  hasLeadingIcon = false,
  hasTrailingIcon = false,
  ...props
}) => {
  return (
    <Tag
      {...props}
      leadingSlot={hasLeadingIcon ? DEFAULT_LEADING_ICON : undefined}
      trailingSlot={hasTrailingIcon ? DEFAULT_TRAILING_ICON : undefined}
    />
  );
};

const meta = {
  title: "Components/Tag",
  component: StoryTag,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["noFill", "attentive", "subtle"],
      description: "The visual style of the tag",
      table: {
        defaultValue: { summary: "noFill" },
      },
    },
    tagStyle: {
      control: "select",
      options: ["squarical", "rounded"],
      description: "The border style of the tag",
      table: {
        defaultValue: { summary: "squarical" },
      },
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg"],
      description: "The size of the tag",
      table: {
        defaultValue: { summary: "md" },
      },
    },
    color: {
      control: "select",
      options: ["neutral", "primary", "success", "error", "warning", "purple"],
      description: "The color of the tag",
      table: {
        defaultValue: { summary: "neutral" },
      },
    },
    hasLeadingIcon: {
      control: "boolean",
      description: "Whether to show a leading icon",
      table: {
        defaultValue: { summary: false },
      },
    },
    hasTrailingIcon: {
      control: "boolean",
      description: "Whether to show a trailing icon",
      table: {
        defaultValue: { summary: false },
      },
    },
    label: {
      control: "text",
      description: "The text to display in the tag",
    },
  },
};

export default meta;
type Story = StoryObj<typeof StoryTag>;

// Default example with controls
export const Default: Story = {
  args: {
    label: "Default Tag",
    color: "primary",
    variant: "noFill",
    size: "md",
    tagStyle: "squarical",
  },
};

// NoFill variant
export const NoFill: Story = {
  args: {
    label: "No Fill Tag",
    color: "primary",
    variant: "noFill",
    size: "md",
    tagStyle: "squarical",
  },
};

// Attentive variant
export const Attentive: Story = {
  args: {
    label: "Attentive Tag",
    color: "primary",
    variant: "attentive",
    size: "md",
    tagStyle: "squarical",
  },
};

// Subtle variant
export const Subtle: Story = {
  args: {
    label: "Subtle Tag",
    color: "primary",
    variant: "subtle",
    size: "md",
    tagStyle: "squarical",
  },
};

// Primary color
export const Primary: Story = {
  args: {
    label: "Primary Tag",
    color: "primary",
    variant: "noFill",
    size: "md",
    tagStyle: "squarical",
  },
};

// Success color
export const Success: Story = {
  args: {
    label: "Success Tag",
    color: "success",
    variant: "noFill",
    size: "md",
    tagStyle: "squarical",
  },
};

// Error color
export const Error: Story = {
  args: {
    label: "Error Tag",
    color: "error",
    variant: "noFill",
    size: "md",
    tagStyle: "squarical",
  },
};

// Warning color
export const Warning: Story = {
  args: {
    label: "Warning Tag",
    color: "warning",
    variant: "noFill",
    size: "md",
    tagStyle: "squarical",
  },
};

// Purple color
export const Purple: Story = {
  args: {
    label: "Purple Tag",
    color: "purple",
    variant: "noFill",
    size: "md",
    tagStyle: "squarical",
  },
};

// Neutral color
export const Neutral: Story = {
  args: {
    label: "Neutral Tag",
    color: "neutral",
    variant: "noFill",
    size: "md",
    tagStyle: "squarical",
  },
};

// Extra Small size
export const ExtraSmall: Story = {
  args: {
    label: "XS Tag",
    color: "primary",
    variant: "noFill",
    size: "xs",
    tagStyle: "squarical",
  },
};

// Small size
export const Small: Story = {
  args: {
    label: "Small Tag",
    color: "primary",
    variant: "noFill",
    size: "sm",
    tagStyle: "squarical",
  },
};

// Medium size
export const Medium: Story = {
  args: {
    label: "Medium Tag",
    color: "primary",
    variant: "noFill",
    size: "md",
    tagStyle: "squarical",
  },
};

// Large size
export const Large: Story = {
  args: {
    label: "Large Tag",
    color: "primary",
    variant: "noFill",
    size: "lg",
    tagStyle: "squarical",
  },
};

// Squarical style
export const Squarical: Story = {
  args: {
    label: "Squarical Tag",
    color: "primary",
    variant: "noFill",
    size: "md",
    tagStyle: "squarical",
  },
};

// Rounded style
export const Rounded: Story = {
  args: {
    label: "Rounded Tag",
    color: "primary",
    variant: "noFill",
    size: "md",
    tagStyle: "rounded",
  },
};

// With Leading Icon
export const WithLeadingIcon: Story = {
  args: {
    label: "With Leading Icon",
    color: "primary",
    variant: "noFill",
    size: "md",
    tagStyle: "squarical",
    hasLeadingIcon: true,
  },
};

// With Trailing Icon
export const WithTrailingIcon: Story = {
  args: {
    label: "With Trailing Icon",
    color: "primary",
    variant: "noFill",
    size: "md",
    tagStyle: "squarical",
    hasTrailingIcon: true,
  },
};

// With Both Icons
export const WithBothIcons: Story = {
  args: {
    label: "With Both Icons",
    color: "primary",
    variant: "noFill",
    size: "md",
    tagStyle: "squarical",
    hasLeadingIcon: true,
    hasTrailingIcon: true,
  },
};

// SplitTag Basic
export const SplitTagBasic: Story = {
  render: () => (
    <SplitTag
      leftLabel="Status"
      rightLabel="Active"
      color="success"
      size="md"
    />
  ),
};

// SplitTag with Icons
export const SplitTagWithIcons: Story = {
  render: () => (
    <SplitTag
      leftLabel="Notifications"
      leftSlot={<Bell size={16} />}
      rightLabel="3 New"
      rightSlot={<Info size={16} />}
      color="primary"
      size="md"
    />
  ),
};

// Usage Examples
export const UsageExamples: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {/* Status indicators */}
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-medium">Status Indicators</h3>
        <div className="flex gap-2">
          <Tag color="success" variant="subtle" label="Active" leadingSlot={<Check size={16} />} />
          <Tag color="error" variant="subtle" label="Failed" leadingSlot={<X size={16} />} />
          <Tag color="warning" variant="subtle" label="Pending" leadingSlot={<Info size={16} />} />
        </div>
      </div>
      
      {/* Categories */}
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-medium">Categories</h3>
        <div className="flex gap-2">
          <Tag color="primary" variant="noFill" label="Frontend" />
          <Tag color="purple" variant="noFill" label="Backend" />
          <Tag color="neutral" variant="noFill" label="DevOps" />
        </div>
      </div>
    </div>
  ),
}; 