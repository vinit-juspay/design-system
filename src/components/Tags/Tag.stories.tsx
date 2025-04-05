import type { Meta, StoryObj } from '@storybook/react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import Tag from '../../../lib/components/Tags/Tags';

const meta: Meta<typeof Tag> = {
  title: 'Components/Tag',
  component: Tag,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['noFill', 'attentive', 'subtle'],
      description: 'The visual style of the tag',
      table: {
        defaultValue: { summary: 'noFill' },
      },
    },
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
    label: {
      control: 'text',
      description: 'The text content of the tag',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const Default: Story = {
  args: {
    variant: 'noFill',
    tagStyle: 'squarical',
    size: 'md',
    color: 'primary',
    label: 'Tag Label',
  },
};

export const NoFill: Story = {
  args: {
    variant: 'noFill',
    tagStyle: 'squarical',
    size: 'md',
    color: 'primary',
    label: 'No Fill',
  },
};

export const Attentive: Story = {
  args: {
    variant: 'attentive',
    tagStyle: 'squarical',
    size: 'md',
    color: 'primary',
    label: 'Attentive',
  },
};

export const Subtle: Story = {
  args: {
    variant: 'subtle',
    tagStyle: 'squarical',
    size: 'md',
    color: 'primary',
    label: 'Subtle',
  },
};

export const Rounded: Story = {
  args: {
    variant: 'noFill',
    tagStyle: 'rounded',
    size: 'md',
    color: 'primary',
    label: 'Rounded',
  },
};

export const WithLeadingSlot: Story = {
  args: {
    variant: 'noFill',
    tagStyle: 'squarical',
    size: 'md',
    color: 'success',
    label: 'Success',
    leadingSlot: <CheckCircle className="h-3.5 w-3.5" />,
  },
};

export const WithTrailingSlot: Story = {
  args: {
    variant: 'noFill',
    tagStyle: 'squarical',
    size: 'md',
    color: 'error',
    label: 'Error',
    trailingSlot: <XCircle className="h-3.5 w-3.5" />,
  },
};

export const WithBothSlots: Story = {
  args: {
    variant: 'noFill',
    tagStyle: 'squarical',
    size: 'md',
    color: 'warning',
    label: 'Warning',
    leadingSlot: <AlertCircle className="h-3.5 w-3.5" />,
    trailingSlot: <XCircle className="h-3.5 w-3.5" />,
  },
};

export const ExtraSmall: Story = {
  args: {
    variant: 'noFill',
    tagStyle: 'squarical',
    size: 'xs',
    color: 'primary',
    label: 'XS Tag',
  },
};

export const Small: Story = {
  args: {
    variant: 'noFill',
    tagStyle: 'squarical',
    size: 'sm',
    color: 'primary',
    label: 'Small Tag',
  },
};

export const Large: Story = {
  args: {
    variant: 'noFill',
    tagStyle: 'squarical',
    size: 'lg',
    color: 'primary',
    label: 'Large Tag',
  },
}; 