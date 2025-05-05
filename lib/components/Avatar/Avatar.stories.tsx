import type { Meta, StoryObj } from "@storybook/react";
import Avatar from "./Avatar";
import { AvatarSize, AvatarShape } from "./types";

const meta: Meta<typeof Avatar> = {
  title: "Components/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: Object.values(AvatarSize),
      mapping: AvatarSize,
      description: "Controls the size of the avatar.",
      table: { defaultValue: { summary: AvatarSize.REGULAR } },
    },
    shape: {
      control: "select",
      options: Object.values(AvatarShape),
      mapping: AvatarShape,
      description: "Determines the shape of the avatar.",
      table: { defaultValue: { summary: AvatarShape.CIRCULAR } },
    },
    online: {
      control: "boolean",
      description: "If true, displays a green dot indicating online status.",
      table: { defaultValue: { summary: "false" } },
    },
    src: {
      control: "text",
      description: "The URL of the image to display. If invalid or empty, fallback mechanisms are used.",
      table: { defaultValue: { summary: "undefined" } },
    },
    alt: {
      control: "text",
      description: "Alternative text for the image. Used for accessibility and to generate initials if `src` is missing and `fallback` is not provided.",
      table: { defaultValue: { summary: '""' } },
    },
    fallback: {
      control: "text",
      description: "Custom text/initials to display when `src` is missing or invalid. Overrides initials generated from `alt`.",
      table: { defaultValue: { summary: "undefined" } },
    },
    className: {
      control: "text",
      description: "Optional additional CSS classes to apply to the root element. Useful for adding margins or other container-level styles. Example: `mt-2`",
      table: { defaultValue: { summary: "undefined" } },
    }
  },
  args: {
    size: AvatarSize.REGULAR,
    shape: AvatarShape.CIRCULAR,
    online: false,
    alt: "Default Alt Text",
  }
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    src: "https://randomuser.me/api/portraits/women/75.jpg",
    alt: "Default Avatar",
    size: AvatarSize.REGULAR,
  },
};

export const Small: Story = {
  args: {
    src: "https://randomuser.me/api/portraits/men/75.jpg",
    alt: "Small Avatar",
    size: AvatarSize.SM,
  },
};

export const Large: Story = {
  args: {
    src: "https://randomuser.me/api/portraits/women/76.jpg",
    alt: "Large Avatar",
    size: AvatarSize.LG,
  },
};

export const ExtraLarge: Story = {
  args: {
    src: "https://randomuser.me/api/portraits/men/76.jpg",
    alt: "Extra Large Avatar",
    size: AvatarSize.XL,
  },
};

export const WithOnlineIndicator: Story = {
  args: {
    src: "https://randomuser.me/api/portraits/women/76.jpg",
    alt: "Online Avatar",
    size: AvatarSize.REGULAR,
    online: true,
  },
};

export const WithFallbackInitials: Story = {
  args: {
    alt: "Samit Barai",
    size: AvatarSize.REGULAR,
  },
};

export const WithCustomFallback: Story = {
  args: {
    alt: "No Image",
    fallback: "!",
    size: AvatarSize.REGULAR,
  },
};

export const WithImageError: Story = {
  args: {
    src: "invalid-image-url",
    alt: "Error Fallback",
    size: AvatarSize.REGULAR,
  },
}; 