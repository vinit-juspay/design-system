import type { Meta, StoryObj } from '@storybook/react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { SplitTag } from '../../../lib/components/Tags/Tags';

const meta: Meta<typeof SplitTag> = {
  title: 'Components/SplitTag',
  component: SplitTag,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    tagStyle: {
      control: 'radio',
      options: ['squarical', 'rounded'],
      description: 'The shape style of the tag',
      table: {
        defaultValue: { summary: 'squarical' },
      },
    },
    size: {
      control: 'radio',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'The size of the tag',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    color: {
      control: 'select',
      options: ['neutral', 'primary', 'success', 'error', 'warning', 'purple'],
      description: 'The color of the tag',
      table: {
        defaultValue: { summary: 'neutral' },
      },
    },
    leftLabel: {
      control: 'text',
      description: 'The text content of the left side',
    },
    rightLabel: {
      control: 'text',
      description: 'The text content of the right side',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SplitTag>;

export const Default: Story = {
  args: {
    tagStyle: 'squarical',
    size: 'md',
    color: 'primary',
    leftLabel: 'Left',
    rightLabel: 'Right',
  },
};

export const Rounded: Story = {
  args: {
    tagStyle: 'rounded',
    size: 'md',
    color: 'primary',
    leftLabel: 'Left',
    rightLabel: 'Right',
  },
};

export const WithLeftSlot: Story = {
  args: {
    tagStyle: 'squarical',
    size: 'md',
    color: 'success',
    leftLabel: 'Success',
    rightLabel: 'Count',
    leftSlot: <CheckCircle className="h-3.5 w-3.5" />,
  },
};

export const WithRightSlot: Story = {
  args: {
    tagStyle: 'squarical',
    size: 'md',
    color: 'error',
    leftLabel: 'Error',
    rightLabel: '5',
    rightSlot: <XCircle className="h-3.5 w-3.5" />,
  },
};

export const WithBothSlots: Story = {
  args: {
    tagStyle: 'squarical',
    size: 'md',
    color: 'warning',
    leftLabel: 'Warning',
    rightLabel: 'Alert',
    leftSlot: <AlertCircle className="h-3.5 w-3.5" />,
    rightSlot: <XCircle className="h-3.5 w-3.5" />,
  },
};

export const ExtraSmall: Story = {
  args: {
    tagStyle: 'squarical',
    size: 'xs',
    color: 'primary',
    leftLabel: 'XS',
    rightLabel: 'Tag',
  },
};

export const Small: Story = {
  args: {
    tagStyle: 'squarical',
    size: 'sm',
    color: 'primary',
    leftLabel: 'Small',
    rightLabel: 'Tag',
  },
};

export const Large: Story = {
  args: {
    tagStyle: 'squarical',
    size: 'lg',
    color: 'primary',
    leftLabel: 'Large',
    rightLabel: 'Tag',
  },
}; 