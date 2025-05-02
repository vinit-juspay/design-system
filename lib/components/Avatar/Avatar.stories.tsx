import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "./Avatar";

const meta: Meta<typeof Avatar> = {
  title: "Components/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "regular", "md", "lg", "xl"],
    },
    online: {
      control: "boolean",
    },
    src: {
      control: "text",
    },
    alt: {
      control: "text",
    },
    fallback: {
      control: "text",
    },
    shape: {
      control: "select",
      options: ["circular", "rounded"],
      defaultValue: "circular",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    src: "https://randomuser.me/api/portraits/women/75.jpg",
    alt: "Default Avatar",
    size: "regular",
  },
};

export const Small: Story = {
  args: {
    src: "https://randomuser.me/api/portraits/men/75.jpg",
    alt: "Small Avatar",
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    src: "https://randomuser.me/api/portraits/women/76.jpg",
    alt: "Large Avatar",
    size: "lg",
  },
};

export const ExtraLarge: Story = {
  args: {
    src: "https://randomuser.me/api/portraits/men/76.jpg",
    alt: "Extra Large Avatar",
    size: "xl",
  },
};

export const WithOnlineIndicator: Story = {
  args: {
    src: "https://randomuser.me/api/portraits/women/76.jpg",
    alt: "Online Avatar",
    size: "regular",
    online: true,
  },
};

export const WithFallbackInitials: Story = {
  args: {
    alt: "Samit Barai",
    size: "regular",
  },
};

export const WithCustomFallback: Story = {
  args: {
    alt: "No Image",
    fallback: "!",
    size: "regular",
  },
};

export const WithImageError: Story = {
  args: {
    src: "invalid-image-url",
    alt: "Error Fallback",
    size: "regular",
  },
}; 