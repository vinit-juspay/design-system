import type { Meta, StoryObj } from '@storybook/react';
import { CheckCircle, XCircle } from 'lucide-react';
import Tag from '../../../lib/components/Tags/Tags';

/**
 * Storybook metadata configuration for the Tag component
 * Defines the component, controls, and documentation settings
 */
const meta = {
  title: 'Components/Tags/Tag',
  component: Tag,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    // Define the variant control (noFill, attentive, subtle)
    variant: {
      control: 'select',
      options: ['noFill', 'attentive', 'subtle'],
      description: 'The visual style of the tag',
      table: {
        defaultValue: { summary: 'noFill' },
      },
    },
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
    // Define the label control
    label: {
      control: 'text',
      description: 'The text content of the tag',
    },
    // Controls for showing/hiding slots in the story
    showLeadingSlot: {
      control: 'boolean',
      description: 'Show or hide the leading slot',
    },
    showTrailingSlot: {
      control: 'boolean',
      description: 'Show or hide the trailing slot',
    },
    // Hide the actual slot props from the controls as they're handled by the wrapper
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

/**
 * Extended props type for the Tag story
 * Adds boolean controls for showing/hiding slots in the Storybook UI
 */
type TagStoryProps = React.ComponentProps<typeof Tag> & {
  showLeadingSlot?: boolean;
  showTrailingSlot?: boolean;
};

/**
 * Story type with the extended props
 */
type Story = StoryObj<typeof Tag> & { args: TagStoryProps };

/**
 * Wrapper component that handles the conditional rendering of slots
 * based on the boolean controls in the Storybook UI
 * 
 * @param args - The story arguments including showLeadingSlot and showTrailingSlot
 * @returns A Tag component with conditionally rendered slots
 */
const TagWithSlots = (args: any) => {
  const { showLeadingSlot, showTrailingSlot, ...tagProps } = args;
  
  return (
    <Tag 
      {...tagProps}
      leadingSlot={showLeadingSlot === true ? <CheckCircle className="h-3.5 w-3.5" /> : undefined}
      trailingSlot={showTrailingSlot === true ? <XCircle className="h-3.5 w-3.5" /> : undefined}
    />
  );
};

/**
 * Default story - Shows a basic tag with primary color
 */
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

/**
 * NoFill variant - Shows a tag with outline style
 */
export const NoFill: Story = {
  args: {
    ...Default.args,
    variant: 'noFill',
    label: 'No Fill',
  },
  render: TagWithSlots,
};

/**
 * Attentive variant - Shows a tag with solid background for emphasis
 */
export const Attentive: Story = {
  args: {
    ...Default.args,
    variant: 'attentive',
    label: 'Attentive',
  },
  render: TagWithSlots,
};

/**
 * Subtle variant - Shows a tag with light background for less emphasis
 */
export const Subtle: Story = {
  args: {
    ...Default.args,
    variant: 'subtle',
    label: 'Subtle',
  },
  render: TagWithSlots,
};

/**
 * Rounded style - Shows a tag with fully rounded corners
 */
export const Rounded: Story = {
  args: {
    ...Default.args,
    tagStyle: 'rounded',
    label: 'Rounded',
  },
  render: TagWithSlots,
};

/**
 * Leading slot example - Shows a tag with an icon before the label
 */
export const WithLeadingSlot: Story = {
  args: {
    ...Default.args,
    color: 'success',
    label: 'Success',
    showLeadingSlot: true,
  },
  render: TagWithSlots,
};

/**
 * Trailing slot example - Shows a tag with an icon after the label
 */
export const WithTrailingSlot: Story = {
  args: {
    ...Default.args,
    color: 'error',
    label: 'Error',
    showTrailingSlot: true,
  },
  render: TagWithSlots,
};

/**
 * Both slots example - Shows a tag with icons before and after the label
 */
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

/**
 * Extra small size example
 */
export const ExtraSmall: Story = {
  args: {
    ...Default.args,
    size: 'xs',
    label: 'XS Tag',
  },
  render: TagWithSlots,
};

/**
 * Small size example
 */
export const Small: Story = {
  args: {
    ...Default.args,
    size: 'sm',
    label: 'Small Tag',
  },
  render: TagWithSlots,
};

/**
 * Large size example
 */
export const Large: Story = {
  args: {
    ...Default.args,
    size: 'lg',
    label: 'Large Tag',
  },
  render: TagWithSlots,
}; 