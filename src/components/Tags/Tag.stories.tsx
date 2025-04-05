import type { Meta, StoryObj } from '@storybook/react';
import { CheckCircle, XCircle } from 'lucide-react';
import Tag from '../../../lib/components/Tags/Tags';

const meta = {
  title: 'Components/Tags/Tag',
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
    showLeadingSlot: {
      control: 'boolean',
      description: 'Show or hide the leading slot',
    },
    showTrailingSlot: {
      control: 'boolean',
      description: 'Show or hide the trailing slot',
    },
    leadingSlot: {
      table: {
        disable: true,
      },
    },
    trailingSlot: {
      table: {
        disable: true,
      },
    },
  },
} as Meta<typeof Tag>;

export default meta;

// Add this type definition
type TagStoryProps = React.ComponentProps<typeof Tag> & {
  showLeadingSlot?: boolean;
  showTrailingSlot?: boolean;
};

// Update the Story type
type Story = StoryObj<typeof Tag> & { args: TagStoryProps };

const TagWithSlots = (args: any) => {
  const { showLeadingSlot, showTrailingSlot, ...tagProps } = args;
  
  // Explicitly set to undefined when false
  return (
    <Tag 
      {...tagProps}
      leadingSlot={showLeadingSlot === true ? <CheckCircle className="h-3.5 w-3.5" /> : undefined}
      trailingSlot={showTrailingSlot === true ? <XCircle className="h-3.5 w-3.5" /> : undefined}
    />
  );
};

export const Default: Story = {
  args: {
    variant: 'noFill',
    tagStyle: 'squarical',
    size: 'md',
    color: 'primary',
    label: 'Tag Label',
    showLeadingSlot: false,
    showTrailingSlot: false,
  },
  render: TagWithSlots,
};

export const NoFill: Story = {
  args: {
    ...Default.args,
    variant: 'noFill',
    label: 'No Fill',
  },
  render: TagWithSlots,
};

export const Attentive: Story = {
  args: {
    ...Default.args,
    variant: 'attentive',
    label: 'Attentive',
  },
  render: TagWithSlots,
};

export const Subtle: Story = {
  args: {
    ...Default.args,
    variant: 'subtle',
    label: 'Subtle',
  },
  render: TagWithSlots,
};

export const Rounded: Story = {
  args: {
    ...Default.args,
    tagStyle: 'rounded',
    label: 'Rounded',
  },
  render: TagWithSlots,
};

export const WithLeadingSlot: Story = {
  args: {
    ...Default.args,
    color: 'success',
    label: 'Success',
    showLeadingSlot: true,
  },
  render: TagWithSlots,
};

export const WithTrailingSlot: Story = {
  args: {
    ...Default.args,
    color: 'error',
    label: 'Error',
    showTrailingSlot: true,
  },
  render: TagWithSlots,
};

export const WithBothSlots: Story = {
  args: {
    ...Default.args,
    color: 'warning',
    label: 'Warning',
    showLeadingSlot: true,
    showTrailingSlot: true,
  },
  render: TagWithSlots,
};

export const ExtraSmall: Story = {
  args: {
    ...Default.args,
    size: 'xs',
    label: 'XS Tag',
  },
  render: TagWithSlots,
};

export const Small: Story = {
  args: {
    ...Default.args,
    size: 'sm',
    label: 'Small Tag',
  },
  render: TagWithSlots,
};

export const Large: Story = {
  args: {
    ...Default.args,
    size: 'lg',
    label: 'Large Tag',
  },
  render: TagWithSlots,
}; 