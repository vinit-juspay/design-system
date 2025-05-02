import type { Meta, StoryObj } from '@storybook/react';
import { AvatarGroup, AvatarData } from './AvatarGroup';

const avatarGroupData: AvatarData[] = [
  { id: 1, src: 'https://randomuser.me/api/portraits/women/10.jpg', alt: 'User 1' },
  { id: 2, src: 'https://randomuser.me/api/portraits/men/20.jpg', alt: 'User 2' },
  { id: 3, alt: 'User 3 Initials' }, // Fallback initials
  { id: 4, src: 'https://randomuser.me/api/portraits/women/30.jpg', alt: 'User 4' },
  { id: 5, fallback: 'U5', alt: 'User 5 Fallback' }, // Custom fallback
  { id: 6, src: 'https://randomuser.me/api/portraits/men/40.jpg', alt: 'User 6' },
  { id: 7, src: 'https://randomuser.me/api/portraits/women/50.jpg', alt: 'User 7' },
  { id: 8, src: 'invalid-url', alt: 'User 8 Bad Src' }, // Bad source, initials fallback
];

const meta: Meta<typeof AvatarGroup> = {
  title: 'Components/AvatarGroup',
  component: AvatarGroup,
  tags: ['autodocs'],
  argTypes: {
    avatars: {
      control: 'object',
      description: 'Array of avatar data objects',
    },
    maxCount: {
      control: 'number',
      description: 'Maximum number of avatars to display before showing overflow count',
    },
    size: {
      control: 'select',
      options: ['sm', 'regular', 'md', 'lg', 'xl'],
      description: 'Size of the avatars within the group',
    },
    className: {
      control: 'text',
      description: 'Optional additional CSS classes',
    },
  },
  args: { // Default args for controls
    avatars: avatarGroupData.slice(0, 5), // Show first 5 by default
    maxCount: 3,
    size: 'regular',
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// --- Basic Stories ---

export const Default: Story = {
  args: {
    avatars: avatarGroupData,
    maxCount: 5,
    size: 'regular',
  },
};

export const WithFewerAvatarsThanMax: Story = {
  args: {
    avatars: avatarGroupData.slice(0, 3), // Only 3 avatars
    maxCount: 5, // Max is 5
    size: 'md',
  },
};

export const WithExactAvatarsAsMax: Story = {
    args: {
      avatars: avatarGroupData.slice(0, 4), // Only 4 avatars
      maxCount: 4, // Max is 4
      size: 'md',
    },
  };


// --- Size Variations ---

export const Small: Story = {
  args: {
    avatars: avatarGroupData,
    maxCount: 4,
    size: 'sm',
  },
};

export const Regular: Story = {
  args: {
    avatars: avatarGroupData,
    maxCount: 4,
    size: 'regular',
  },
};

export const Medium: Story = {
    args: {
      avatars: avatarGroupData,
      maxCount: 4,
      size: 'md', // Already default, but explicit here
    },
  };


export const Large: Story = {
  args: {
    avatars: avatarGroupData,
    maxCount: 4,
    size: 'lg',
  },
};

export const XLarge: Story = {
  args: {
    avatars: avatarGroupData,
    maxCount: 4,
    size: 'xl',
  },
};

// --- MaxCount Variations ---

export const MaxCountThree: Story = {
  args: {
    avatars: avatarGroupData,
    maxCount: 3,
    size: 'md',
  },
};

export const MaxCountOne: Story = {
    args: {
      avatars: avatarGroupData,
      maxCount: 1,
      size: 'md',
    },
  };


export const MaxCountMoreThanAvailable: Story = {
    args: {
      avatars: avatarGroupData,
      maxCount: 10, // More than the 8 avatars provided
      size: 'md',
    },
  };

// --- Other Variations ---

export const WithCustomClass: Story = {
    args: {
      avatars: avatarGroupData.slice(0, 4),
      maxCount: 3,
      size: 'lg',
      className: 'ring-2 ring-offset-2 ring-blue-500 p-1 rounded-full' // Example custom styling
    },
  }; 