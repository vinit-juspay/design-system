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
  { id: 8, src: 'invalid-url', alt: 'User 8 Bad Src' },
];

const meta: Meta<typeof AvatarGroup> = {
  title: 'Components/AvatarGroup',
  component: AvatarGroup,
  tags: ['autodocs'],
  argTypes: {
    avatars: {
      control: 'object',
      description: 'An array of avatar data objects (`AvatarData[]`). Each object should contain at least an `id`, and optionally `src`, `alt`, and `fallback` properties, similar to the `Avatar` component.',
      table: { 
        type: { summary: 'AvatarData[]' } 
      },
    },
    maxCount: {
      control: 'number',
      description: 'The maximum number of avatars to display inline before collapsing the rest into an overflow count indicator. Must be at least 1.',
      table: { 
        defaultValue: { summary: '5' },
        type: { summary: 'number' },
       },
    },
    size: {
      control: 'select',
      options: ['sm', 'regular', 'md', 'lg', 'xl'],
      description: 'Controls the size of the individual avatars *and* the overflow indicator within the group.',
      table: { 
        defaultValue: { summary: '\'regular\'' }, // Updated default
        type: { summary: "'sm' | 'regular' | 'md' | 'lg' | 'xl'" }
       },
    },
    className: {
      control: 'text',
      description: 'Optional additional CSS classes to apply to the root `div` container of the group. Useful for adding spacing or custom styles. Example: `mt-4`',
      table: { 
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' },
       },
    },
  },
  args: { // Default args for controls
    avatars: avatarGroupData.slice(0, 5), // Show first 5 by default in controls
    maxCount: 5, // Match component default
    size: 'regular', // Match component default
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// --- Basic Stories ---

export const Default: Story = {
  args: {
    avatars: avatarGroupData,
    maxCount: 5,
    size: 'regular', // Align with the new component default
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