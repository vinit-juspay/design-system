import type { Meta, StoryObj } from '@storybook/react';
import { CheckCircle, XCircle } from 'lucide-react';
import { SplitTag } from '../../../lib/components/Tags/Tags';

/**
 * Storybook metadata configuration for the SplitTag component
 * Defines the component, controls, and documentation settings
 */
const meta = {
  title: 'Components/Tags/SplitTag',
  component: SplitTag,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    // Define the shape style control (squarical, rounded)
    tagStyle: {
      control: 'radio',
      options: ['squarical', 'rounded'],
      description: 'The shape style of the tag',
      table: {
        defaultValue: { summary: 'squarical' },
      },
    },
    // Define the size control (xs, sm, md, lg)
    size: {
      control: 'radio',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'The size of the tag',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    // Define the color control
    color: {
      control: 'select',
      options: ['neutral', 'primary', 'success', 'error', 'warning', 'purple'],
      description: 'The color of the tag',
      table: {
        defaultValue: { summary: 'neutral' },
      },
    },
    // Define the left and right label controls
    leftLabel: {
      control: 'text',
      description: 'The text content of the left side',
    },
    rightLabel: {
      control: 'text',
      description: 'The text content of the right side',
    },
    // Controls for showing/hiding slots in the story
    showLeftSlot: {
      control: 'boolean',
      description: 'Show or hide the left slot',
    },
    showRightSlot: {
      control: 'boolean',
      description: 'Show or hide the right slot',
    },
    // Hide the actual slot props from the controls as they're handled by the wrapper
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

/**
 * Extended props type for the SplitTag story
 * Adds boolean controls for showing/hiding slots in the Storybook UI
 */
type SplitTagStoryProps = React.ComponentProps<typeof SplitTag> & {
  showLeftSlot?: boolean;
  showRightSlot?: boolean;
};

/**
 * Story type with the extended props
 */
type Story = StoryObj<typeof SplitTag> & { args: SplitTagStoryProps };

/**
 * Wrapper component that handles the conditional rendering of slots
 * based on the boolean controls in the Storybook UI
 * 
 * @param args - The story arguments including showLeftSlot and showRightSlot
 * @returns A SplitTag component with conditionally rendered slots
 */
const SplitTagWithSlots = (args: any) => {
  const { showLeftSlot, showRightSlot, ...tagProps } = args;
  
  return (
    <SplitTag 
      {...tagProps}
      leftSlot={showLeftSlot === true ? <CheckCircle className="h-3.5 w-3.5" /> : undefined}
      rightSlot={showRightSlot === true ? <XCircle className="h-3.5 w-3.5" /> : undefined}
    />
  );
};

/**
 * Default story - Shows a basic split tag with primary color
 */
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

/**
 * Rounded style - Shows a split tag with fully rounded corners
 */
export const Rounded: Story = {
  args: {
    ...Default.args,
    tagStyle: 'rounded',
  },
  render: SplitTagWithSlots,
};

/**
 * Left slot example - Shows a split tag with an icon in the left section
 */
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

/**
 * Right slot example - Shows a split tag with an icon in the right section
 */
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

/**
 * Both slots example - Shows a split tag with icons in both sections
 */
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

/**
 * Extra small size example
 */
export const ExtraSmall: Story = {
  args: {
    ...Default.args,
    size: 'xs',
    leftLabel: 'XS',
    rightLabel: 'Tag',
  },
  render: SplitTagWithSlots,
};

/**
 * Small size example
 */
export const Small: Story = {
  args: {
    ...Default.args,
    size: 'sm',
    leftLabel: 'Small',
    rightLabel: 'Tag',
  },
  render: SplitTagWithSlots,
};

/**
 * Large size example
 */
export const Large: Story = {
  args: {
    ...Default.args,
    size: 'lg',
    leftLabel: 'Large',
    rightLabel: 'Tag',
  },
  render: SplitTagWithSlots,
}; 