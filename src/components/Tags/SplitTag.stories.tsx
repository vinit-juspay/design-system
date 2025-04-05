import type { Meta, StoryObj } from '@storybook/react';
import { CheckCircle, XCircle } from 'lucide-react';
import { SplitTag } from '../../../lib/components/Tags/Tags';

const meta = {
  title: 'Components/Tags/SplitTag',
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
    showLeftSlot: {
      control: 'boolean',
      description: 'Show or hide the left slot',
    },
    showRightSlot: {
      control: 'boolean',
      description: 'Show or hide the right slot',
    },
    leftSlot: {
      table: {
        disable: true,
      },
    },
    rightSlot: {
      table: {
        disable: true,
      },
    },
  },
} as Meta<typeof SplitTag>;

export default meta;

// Add this type definition
type SplitTagStoryProps = React.ComponentProps<typeof SplitTag> & {
  showLeftSlot?: boolean;
  showRightSlot?: boolean;
};

// Update the Story type
type Story = StoryObj<typeof SplitTag> & { args: SplitTagStoryProps };

const SplitTagWithSlots = (args: any) => {
  const { showLeftSlot, showRightSlot, ...tagProps } = args;
  
  // Explicitly set to undefined when false
  return (
    <SplitTag 
      {...tagProps}
      leftSlot={showLeftSlot === true ? <CheckCircle className="h-3.5 w-3.5" /> : undefined}
      rightSlot={showRightSlot === true ? <XCircle className="h-3.5 w-3.5" /> : undefined}
    />
  );
};

export const Default: Story = {
  args: {
    tagStyle: 'squarical',
    size: 'md',
    color: 'primary',
    leftLabel: 'Left',
    rightLabel: 'Right',
    showLeftSlot: false,
    showRightSlot: false,
  },
  render: SplitTagWithSlots,
};

export const Rounded: Story = {
  args: {
    ...Default.args,
    tagStyle: 'rounded',
  },
  render: SplitTagWithSlots,
};

export const WithLeftSlot: Story = {
  args: {
    ...Default.args,
    color: 'success',
    leftLabel: 'Success',
    rightLabel: 'Count',
    showLeftSlot: true,
  },
  render: SplitTagWithSlots,
};

export const WithRightSlot: Story = {
  args: {
    ...Default.args,
    color: 'error',
    leftLabel: 'Error',
    rightLabel: '5',
    showRightSlot: true,
  },
  render: SplitTagWithSlots,
};

export const WithBothSlots: Story = {
  args: {
    ...Default.args,
    color: 'warning',
    leftLabel: 'Warning',
    rightLabel: 'Alert',
    showLeftSlot: true,
    showRightSlot: true,
  },
  render: SplitTagWithSlots,
};

export const ExtraSmall: Story = {
  args: {
    ...Default.args,
    size: 'xs',
    leftLabel: 'XS',
    rightLabel: 'Tag',
  },
  render: SplitTagWithSlots,
};

export const Small: Story = {
  args: {
    ...Default.args,
    size: 'sm',
    leftLabel: 'Small',
    rightLabel: 'Tag',
  },
  render: SplitTagWithSlots,
};

export const Large: Story = {
  args: {
    ...Default.args,
    size: 'lg',
    leftLabel: 'Large',
    rightLabel: 'Tag',
  },
  render: SplitTagWithSlots,
}; 